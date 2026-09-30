import { NextResponse, type NextRequest } from "next/server";
import {
  ADMIN_COOKIE,
  verifySessionToken,
} from "./features/admin-auth/session";

/**
 * Admin boundary (site-admin-auth). Admin pages and their data answer 404 without a valid session, before any page
 * code or data is loaded; pages repeat the check (features/admin-auth/guard.ts). The visitor site is not matched.
 */
export { isAdminPath } from "./lib/routes";
import { isAdminPath } from "./lib/routes";

export function proxy(request: NextRequest) {
  if (!isAdminPath(request.nextUrl.pathname)) return NextResponse.next();
  if (verifySessionToken(request.cookies.get(ADMIN_COOKIE)?.value)) {
    const response = NextResponse.next();
    response.headers.set("Cache-Control", "private, no-store");
    return response;
  }
  return new NextResponse("Not Found", {
    status: 404,
    headers: { "Cache-Control": "no-store", "X-Robots-Tag": "noindex" },
  });
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/data/:path*"],
};
