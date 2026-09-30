import "server-only";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import { ADMIN_COOKIE, verifySessionToken } from "./session";

/** Server-side gate for admin pages and their data (defence in depth behind proxy.ts): no valid session → 404. */
export async function requireAdmin() {
  const exp = verifySessionToken((await cookies()).get(ADMIN_COOKIE)?.value);
  if (!exp) notFound();
  return exp;
}
