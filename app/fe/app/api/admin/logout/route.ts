import { NextResponse } from "next/server";
import { ADMIN_COOKIE, ADMIN_UI_COOKIE, sessionCookieOptions, uiCookieOptions } from "@/features/admin-auth/session";

export const dynamic = "force-dynamic";

/** Ends admin mode: both cookies are expired. Sessions are stateless; rotating the password or ADMIN_SESSION_SECRET revokes all. */
export async function POST() {
  const response = NextResponse.json({ ok: true }, { headers: { "Cache-Control": "no-store" } });
  response.cookies.set(ADMIN_COOKIE, "", sessionCookieOptions(0));
  response.cookies.set(ADMIN_UI_COOKIE, "", uiCookieOptions(0));
  return response;
}
