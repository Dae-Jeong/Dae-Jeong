import { NextResponse } from "next/server";
import { ADMIN_COOKIE, ADMIN_UI_COOKIE, adminConfigured, createSessionToken, sessionCookieOptions, uiCookieOptions, verifyPassword } from "@/features/admin-auth/session";
import { consumeLoginAttempt } from "@/features/admin-auth/rate-limit";

export const dynamic = "force-dynamic";

const noStore = { "Cache-Control": "no-store" };
const json = (body: object, status: number, headers: Record<string, string> = {}) => NextResponse.json(body, { status, headers: { ...noStore, ...headers } });

/** Same-origin JSON only (SameSite=Strict cookies plus an Origin check against cross-site form posts). */
function sameOrigin(request: Request) {
  const origin = request.headers.get("origin");
  const host = request.headers.get("x-forwarded-host") ?? request.headers.get("host");
  try {
    return Boolean(origin && host && new URL(origin).host === host);
  } catch {
    return false;
  }
}

export async function POST(request: Request) {
  if (!sameOrigin(request) || !request.headers.get("content-type")?.startsWith("application/json")) return json({ error: "forbidden" }, 403);
  // Missing or malformed settings never allow a login.
  if (!adminConfigured()) return json({ error: "unavailable" }, 503);
  // The attempt limit is consumed before the password is checked, so a locked client cannot pass with the right password.
  const limit = await consumeLoginAttempt(request);
  if (!limit.allowed) return limit.reason === "limited"
    ? json({ error: "locked", retryAfter: limit.retryAfter }, 429, limit.retryAfter ? { "Retry-After": String(limit.retryAfter) } : {})
    : json({ error: "unavailable" }, 503);
  let password: unknown;
  try {
    password = ((await request.json()) as { password?: unknown }).password;
  } catch {
    return json({ error: "invalid" }, 400);
  }
  if (typeof password !== "string" || !(await verifyPassword(password))) return json({ error: "invalid" }, 401);
  const { token, exp } = createSessionToken();
  const maxAge = exp - Math.floor(Date.now() / 1000);
  const response = json({ ok: true, expiresAt: exp }, 200);
  response.cookies.set(ADMIN_COOKIE, token, sessionCookieOptions(maxAge));
  response.cookies.set(ADMIN_UI_COOKIE, "1", uiCookieOptions(maxAge));
  return response;
}
