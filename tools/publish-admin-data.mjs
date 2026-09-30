#!/usr/bin/env node
/**
 * Publish minimised admin projections to the private Vercel Blob store `dae-jeong-admin` (site-admin-surfaces).
 *
 * Usage (from the repo root):
 *   node tools/publish-admin-data.mjs            # build + upload the applications projection
 *   node tools/publish-admin-data.mjs --dry-run  # build only; writes output/admin-data/*.json for review
 * Credentials: BLOB_READ_WRITE_TOKEN from the environment, otherwise from the git-ignored repo-root .env.local that
 * `vercel blob create-store` / `vercel env pull` wrote. The token is never printed.
 *
 * Refresh procedure: update the local original (tools/build_application_projection.py), then run this
 * script. The deployed admin screens read the new copy on the next request (get with useCache:false). Each payload
 * records sourceUpdatedAt (mtime of the local original) so the screen shows how fresh the copy is.
 */
import { createHash } from "node:crypto";
import { existsSync, mkdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { createRequire } from "node:module";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const app = path.join(root, "app/fe");
const { ADMIN_DATA } = await import(pathToFileURL(path.join(app, "features/admin-data/mapping.ts")).href);
const dryRun = process.argv.includes("--dry-run");

function token() {
  if (process.env.BLOB_READ_WRITE_TOKEN) return process.env.BLOB_READ_WRITE_TOKEN;
  const file = path.join(root, ".env.local");
  if (!existsSync(file)) return undefined;
  const line = readFileSync(file, "utf8").split(/\r?\n/).find((item) => item.startsWith("BLOB_READ_WRITE_TOKEN="));
  return line?.slice("BLOB_READ_WRITE_TOKEN=".length).replace(/^"|"$/g, "") || undefined;
}

const outputs = [];
for (const [name, spec] of Object.entries(ADMIN_DATA)) {
  const source = path.join(root, spec.source);
  const projection = spec.build(JSON.parse(readFileSync(source, "utf8")), statSync(source).mtime.toISOString());
  if (!spec.valid(projection)) throw new Error(`publish-admin-data: ${name} projection failed its shape check`);
  const payload = JSON.stringify(projection);
  outputs.push({ name, pathname: spec.blob, payload, sha256: createHash("sha256").update(payload).digest("hex").slice(0, 12) });
}

if (dryRun) {
  const dir = path.join(root, "output/admin-data");
  mkdirSync(dir, { recursive: true });
  for (const item of outputs) writeFileSync(path.join(dir, `${item.name}.json`), item.payload, { mode: 0o600 });
  for (const item of outputs) console.log(`dry-run ${item.pathname} ${item.payload.length}B sha256:${item.sha256}`);
  process.exit(0);
}

const credential = token();
if (!credential) {
  console.error("publish-admin-data: BLOB_READ_WRITE_TOKEN not found (env or repo-root .env.local)");
  process.exit(1);
}
const { put } = createRequire(path.join(app, "package.json"))("@vercel/blob");
for (const item of outputs) {
  const result = await put(item.pathname, item.payload, {
    access: "private", token: credential, addRandomSuffix: false, allowOverwrite: true,
    contentType: "application/json; charset=utf-8", cacheControlMaxAge: 60,
  });
  console.log(`uploaded ${result.pathname} ${item.payload.length}B sha256:${item.sha256}`);
}
