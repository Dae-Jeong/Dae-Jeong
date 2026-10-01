import { getDocument } from "@/lib/documents/repository";
import { companySlug, type CompanyKind } from "./types";
/** Only validated representative paths can become redirect destinations. */
export const companyDocumentHref = (company: string, kind: CompanyKind) =>
  `/${company}/${kind}`;
export async function resolveCompanyRequest(
  company: string,
  kind: CompanyKind,
  hasQuery = false,
  former = false,
) {
  if (former && company === "common") return { href: `/${kind}` };
  const canonical = companySlug(company);
  const document = await getDocument({ scope: "company", company: canonical, kind });
  if (!document) return undefined;
  return {
    document,
    href:
      former || canonical !== company || hasQuery
        ? companyDocumentHref(document.slug, kind)
        : undefined,
  };
}
