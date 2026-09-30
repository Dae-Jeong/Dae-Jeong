import "server-only";
import {
  mkdir,
  readFile,
  rename,
  rmdir,
  stat,
  writeFile,
} from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { checkRateLimit } from "@vercel/firewall";

/**
 * Login attempt limit: every attempt (right or wrong) counts, and the limit is checked before the password is
 * verified, so a locked-out client cannot succeed with the right password either.
 *
 * - Vercel (VERCEL=1): Vercel WAF Rate Limiting SDK rule `admin-login-attempt` (Fixed window, 5 requests / 10 minutes,
 *   key = client IP). Counters are shared by every function instance but tracked per Vercel region. Hobby allows at
 *   most a 10-minute window, hence 10 minutes instead of 15. A missing rule, a firewall block or an SDK error denies
 *   the attempt (fail closed).
 * - Elsewhere (local dev/start): a fixed-window counter in one file under the OS temp directory, guarded by a lock
 *   directory, so several local processes share the same limit.
 */
export const LOGIN_RATE_LIMIT_ID = "admin-login-attempt";
export const LOGIN_LIMIT = 5;
export const LOGIN_WINDOW_SECONDS = 10 * 60;

export type LimitResult =
  | { allowed: true }
  | { allowed: false; reason: "limited" | "unavailable"; retryAfter?: number };

async function vercelLimit(request: Request): Promise<LimitResult> {
  try {
    const { rateLimited, error } = await checkRateLimit(LOGIN_RATE_LIMIT_ID, {
      request,
    });
    if (error) return { allowed: false, reason: "unavailable" };
    return rateLimited
      ? { allowed: false, reason: "limited", retryAfter: LOGIN_WINDOW_SECONDS }
      : { allowed: true };
  } catch {
    return { allowed: false, reason: "unavailable" };
  }
}

const STORE =
  process.env.ADMIN_LOGIN_LIMIT_FILE ||
  path.join(tmpdir(), "dae-jeong-admin-login-limit.json");
const LOCK = `${STORE}.lock`;
const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

async function withLock<T>(work: () => Promise<T>): Promise<T | undefined> {
  for (let attempt = 0; attempt < 100; attempt++) {
    try {
      await mkdir(/*turbopackIgnore: true*/ LOCK);
    } catch {
      // A lock left by a crashed process is released after 5 seconds.
      const age = await stat(/*turbopackIgnore: true*/ LOCK)
        .then((info) => Date.now() - info.mtimeMs)
        .catch(() => 0);
      if (age > 5000)
        await rmdir(/*turbopackIgnore: true*/ LOCK).catch(() => undefined);
      await sleep(20);
      continue;
    }
    try {
      return await work();
    } finally {
      await rmdir(/*turbopackIgnore: true*/ LOCK).catch(() => undefined);
    }
  }
  return undefined;
}

function clientKey(request: Request) {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip")?.trim() ||
    "local"
  );
}

async function localLimit(
  request: Request,
  now = Date.now(),
): Promise<LimitResult> {
  const key = clientKey(request);
  const result = await withLock(async () => {
    let store: Record<string, { start: number; count: number }> = {};
    try {
      store = JSON.parse(
        await readFile(/*turbopackIgnore: true*/ STORE, "utf8"),
      );
    } catch {
      store = {};
    }
    const windowMs = LOGIN_WINDOW_SECONDS * 1000;
    for (const [entryKey, entry] of Object.entries(store))
      if (now - entry.start >= windowMs) delete store[entryKey];
    const entry = store[key] ?? { start: now, count: 0 };
    entry.count += 1;
    store[key] = entry;
    const temp = `${STORE}.${process.pid}.tmp`;
    await writeFile(/*turbopackIgnore: true*/ temp, JSON.stringify(store), {
      mode: 0o600,
    });
    await rename(/*turbopackIgnore: true*/ temp, STORE);
    return entry.count > LOGIN_LIMIT
      ? ({
          allowed: false,
          reason: "limited",
          retryAfter: Math.ceil((entry.start + windowMs - now) / 1000),
        } as const)
      : ({ allowed: true } as const);
  });
  return result ?? { allowed: false, reason: "unavailable" };
}

export function consumeLoginAttempt(request: Request): Promise<LimitResult> {
  return process.env.VERCEL === "1"
    ? vercelLimit(request)
    : localLimit(request);
}
