import { resolveCompanyRequest } from "@/features/company-documents/urls";
import { notFound, permanentRedirect } from "next/navigation";

type PageProps = { params: Promise<{ company: string }> };

/** Former /cv/{company} address (with or without ?revision=): normalised to the same company's representative
 *  /{company}/cv URL without the query. /cv/common is the common document. Unknown companies are not redirected. */
export default async function FormerCvPage({ params }: PageProps) {
  const { company } = await params;
  const resolved = resolveCompanyRequest(company, "cv", false, true);
  if (!resolved) notFound();
  permanentRedirect(resolved.href!);
}
