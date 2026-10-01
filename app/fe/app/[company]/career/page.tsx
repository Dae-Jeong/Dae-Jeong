import type { Metadata } from "next";
import { notFound, permanentRedirect } from "next/navigation";
import { CompanyDocumentPage } from "../../_components/documents/company-document";
import { resolveCompanyRequest } from "@/features/company-documents/urls";
import { getRepresentative } from "@/features/company-documents/policy";

type PageProps = {
  params: Promise<{ company: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { company } = await params;
  const document = getRepresentative(company, "career");
  return {
    title: document
      ? `${document.companyName} 경력기술서 — 김대정`
      : "경력기술서 — 김대정",
    robots: { index: false, follow: false, noarchive: true, nosnippet: true },
  };
}

/** /{company}/career: the one representative URL for this company and kind. The company, kind and public/draft
 *  boundary are validated first; unknown, reserved or malformed slugs are not found and never redirected. A query
 *  never selects another version: it is dropped by redirecting to the validated canonical URL, as is a version alias. */
export default async function CompanyPage({ params, searchParams }: PageProps) {
  const { company } = await params;
  const resolved = resolveCompanyRequest(
    company,
    "career",
    Object.keys(await searchParams).length > 0,
  );
  if (!resolved?.document) notFound();
  if (resolved.href) permanentRedirect(resolved.href);
  const document = resolved.document;
  return <CompanyDocumentPage company={document.company} kind="career" />;
}
