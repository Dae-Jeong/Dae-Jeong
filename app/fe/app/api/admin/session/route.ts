import { NextResponse, type NextRequest } from "next/server";
import { ADMIN_COOKIE, ADMIN_UI_COOKIE, uiCookieOptions, verifySessionToken } from "@/features/admin-auth/session";

export const dynamic = "force-dynamic";

/** Admin state for the visitor page: { admin, expiresAt }. An invalid or expired session also clears the UI cookie. */
export async function GET(request: NextRequest) {
  const exp = verifySessionToken(request.cookies.get(ADMIN_COOKIE)?.value);
  const response = NextResponse.json(exp ? { admin: true, expiresAt: exp } : { admin: false }, { headers: { "Cache-Control": "no-store" } });
  if (!exp) response.cookies.set(ADMIN_UI_COOKIE, "", uiCookieOptions(0));
  return response;
}
