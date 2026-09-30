import "server-only";
import { requireAdmin } from "../admin-auth/guard";
import { ADMIN_DATA } from "../admin-data/mapping";
import { readPrivateData } from "../admin-data/source";
export async function loadApplications() {
  await requireAdmin();
  return readPrivateData(ADMIN_DATA.applications);
}
