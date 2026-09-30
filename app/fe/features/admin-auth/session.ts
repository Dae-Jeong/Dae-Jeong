import "server-only";
import {
  createHmac,
  randomBytes,
  scrypt as scryptCallback,
  timingSafeEqual,
} from "node:crypto";
import { promisify } from "node:util";

/**
 * Admin mode server core (site-admin-auth, 2026-09-30). The raw password never exists here: the server holds only
 * ADMIN_PASSWORD_HASH (scrypt, written by tools/admin-secret.mjs) and ADMIN_SESSION_SECRET. Missing or malformed
 * settings deny every login and every admin request (fail closed).
 */
const scrypt = promisify(scryptCallback) as (
  password: string,
  salt: Buffer,
  keylen: number,
  options: { N: number; r: number; p: number; maxmem: number },
) => Promise<Buffer>;

export const ADMIN_COOKIE = "admin_session";
/** Non-secret companion cookie so the visitor page knows to ask for the admin menu; it grants nothing. */
export const ADMIN_UI_COOKIE = "admin_ui";
export const SESSION_TTL_SECONDS = 8 * 60 * 60;

type PasswordHash = {
  N: number;
  r: number;
  p: number;
  salt: Buffer;
  hash: Buffer;
};

/** Format: scrypt.<N>.<r>.<p>.<salt base64url>.<hash base64url> ("." because .env loaders expand "$"). */
function parseHash(value: string | undefined): PasswordHash | undefined {
  const parts = value?.trim().split(".");
  if (!parts || parts.length !== 6 || parts[0] !== "scrypt") return undefined;
  const [N, r, p] = parts.slice(1, 4).map(Number);
  const salt = Buffer.from(parts[4], "base64url");
  const hash = Buffer.from(parts[5], "base64url");
  if (
    ![N, r, p].every(Number.isInteger) ||
    N < 2 ** 14 ||
    salt.length < 16 ||
    hash.length < 32
  )
    return undefined;
  return { N, r, p, salt, hash };
}

function sessionSecret() {
  const secret = process.env.ADMIN_SESSION_SECRET?.trim();
  return secret && secret.length >= 32 ? secret : undefined;
}

/** True only when both settings are present and well formed. */
export function adminConfigured() {
  return Boolean(parseHash(process.env.ADMIN_PASSWORD_HASH) && sessionSecret());
}

export async function verifyPassword(password: string) {
  const stored = parseHash(process.env.ADMIN_PASSWORD_HASH);
  if (
    !stored ||
    typeof password !== "string" ||
    !password ||
    password.length > 1024
  )
    return false;
  const derived = await scrypt(password, stored.salt, stored.hash.length, {
    N: stored.N,
    r: stored.r,
    p: stored.p,
    maxmem: 256 * stored.N * stored.r,
  });
  return (
    derived.length === stored.hash.length &&
    timingSafeEqual(derived, stored.hash)
  );
}

/** Binds sessions to the current password hash: rotating the password (or the secret) revokes every session. */
function epoch() {
  return createHmac("sha256", sessionSecret() ?? "")
    .update(process.env.ADMIN_PASSWORD_HASH ?? "")
    .digest("base64url")
    .slice(0, 16);
}

function sign(payload: string) {
  return createHmac("sha256", sessionSecret()!)
    .update(payload)
    .digest("base64url");
}

export function createSessionToken(now = Date.now()) {
  const exp = Math.floor(now / 1000) + SESSION_TTL_SECONDS;
  const payload = Buffer.from(
    JSON.stringify({
      v: 1,
      exp,
      e: epoch(),
      n: randomBytes(9).toString("base64url"),
    }),
  ).toString("base64url");
  return { token: `${payload}.${sign(payload)}`, exp };
}

/** Returns the session expiry (unix seconds) for a valid token, otherwise undefined. */
export function verifySessionToken(
  token: string | undefined,
  now = Date.now(),
): number | undefined {
  if (!token || !adminConfigured() || token.length > 512) return undefined;
  const [payload, signature, extra] = token.split(".");
  if (!payload || !signature || extra !== undefined) return undefined;
  const expected = Buffer.from(sign(payload));
  const given = Buffer.from(signature);
  if (expected.length !== given.length || !timingSafeEqual(expected, given))
    return undefined;
  try {
    const data = JSON.parse(
      Buffer.from(payload, "base64url").toString("utf8"),
    ) as { v?: number; exp?: number; e?: string };
    if (data.v !== 1 || typeof data.exp !== "number" || data.e !== epoch())
      return undefined;
    return data.exp > Math.floor(now / 1000) ? data.exp : undefined;
  } catch {
    return undefined;
  }
}

export function sessionCookieOptions(maxAge: number) {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict" as const,
    path: "/",
    maxAge,
  };
}
export function uiCookieOptions(maxAge: number) {
  return {
    httpOnly: false,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict" as const,
    path: "/",
    maxAge,
  };
}
