#!/usr/bin/env node
/**
 * Admin mode secret helper (site-admin-auth). Reads the admin password without echoing it and writes only
 *   ADMIN_PASSWORD_HASH=scrypt.<N>.<r>.<p>.<salt base64url>.<hash base64url>
 *   ADMIN_SESSION_SECRET=<48 random bytes, base64url>
 * to an env file (existing ADMIN_PASSWORD_HASH / ADMIN_SESSION_SECRET lines are replaced, all other lines are kept).
 * Prints nothing about the password, the hash or the secret. "." separates fields because .env loaders expand "$".
 *
 * Usage (from the repo root):
 *   node tools/admin-secret.mjs [--out <env file>] [--keep-secret]
 *     interactive: hidden TTY prompt, asked twice
 *     non-interactive: the password is read from stdin (first line), e.g. from a private file or a password manager pipe
 *   --out          target file, default app/fe/.env.local (use a private vault file to prepare it elsewhere)
 *   --keep-secret  keep an existing ADMIN_SESSION_SECRET (sessions stay valid only if the hash is also unchanged)
 * Rotating either value revokes every admin session.
 */
import { randomBytes, scryptSync } from "node:crypto";
import { chmodSync, existsSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const args = process.argv.slice(2);
const outIndex = args.indexOf("--out");
const out = path.resolve(outIndex >= 0 ? args[outIndex + 1] ?? "" : path.join(root, "app/fe/.env.local"));
const keepSecret = args.includes("--keep-secret");
const N = 2 ** 15, r = 8, p = 1;

function readHidden(prompt) {
  return new Promise((resolve, reject) => {
    const stdin = process.stdin;
    process.stderr.write(prompt);
    stdin.setRawMode(true);
    stdin.resume();
    stdin.setEncoding("utf8");
    let value = "";
    const onData = (chunk) => {
      for (const char of chunk) {
        if (char === "\u0003") { stdin.setRawMode(false); process.stderr.write("\n"); reject(new Error("cancelled")); return; }
        if (char === "\r" || char === "\n") {
          stdin.setRawMode(false); stdin.pause(); stdin.off("data", onData); process.stderr.write("\n"); resolve(value); return;
        }
        if (char === "\u007f" || char === "\b") value = value.slice(0, -1);
        else value += char;
      }
    };
    stdin.on("data", onData);
  });
}

async function readStdinLine() {
  let data = "";
  for await (const chunk of process.stdin) data += chunk;
  return data.split(/\r?\n/)[0];
}

async function main() {
  let password;
  if (process.stdin.isTTY) {
    password = await readHidden("Admin password: ");
    const again = await readHidden("Repeat: ");
    if (password !== again) throw new Error("passwords differ");
  } else {
    password = await readStdinLine();
  }
  // No minimum length: the owner-designated password is kept as given. Brute force is bounded by the login attempt limit.
  if (!password) throw new Error("empty password");
  if (password.length > 1024) throw new Error("password longer than 1024 characters");
  const salt = randomBytes(16);
  const hash = scryptSync(password, salt, 32, { N, r, p, maxmem: 256 * N * r });
  password = undefined;
  const lines = existsSync(out) ? readFileSync(out, "utf8").split(/\r?\n/) : [];
  const existingSecret = lines.find((line) => line.startsWith("ADMIN_SESSION_SECRET="))?.slice("ADMIN_SESSION_SECRET=".length);
  const secret = keepSecret && existingSecret ? existingSecret : randomBytes(48).toString("base64url");
  const kept = lines.filter((line) => !/^ADMIN_(PASSWORD_HASH|SESSION_SECRET)=/.test(line));
  while (kept.length && kept.at(-1) === "") kept.pop();
  kept.push(`ADMIN_PASSWORD_HASH=scrypt.${N}.${r}.${p}.${salt.toString("base64url")}.${hash.toString("base64url")}`, `ADMIN_SESSION_SECRET=${secret}`, "");
  writeFileSync(out, kept.join("\n"), { mode: 0o600 });
  chmodSync(out, 0o600);
  process.stderr.write(`wrote ADMIN_PASSWORD_HASH and ADMIN_SESSION_SECRET to ${path.relative(process.cwd(), out) || out}\n`);
}

main().catch((error) => { process.stderr.write(`admin-secret: ${error.message}\n`); process.exit(1); });
