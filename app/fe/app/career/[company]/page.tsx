import { resolveCompanyRequest } from "@/features/company-documents/urls";
import { notFound, permanentRedirect } from "next/navigation";

type PageProps = { params: Promise<{ company: string }> };

/** Former /career/{company} address (with or without ?revision=): normalised to the same company's representative
 *  /{company}/career URL without the query. /career/common is the common document. Unknown companies are not redirected. */
export default async function FormerCareerPage({ params }: PageProps) {
  const { company } = await params;
  const resolved = await resolveCompanyRequest(company, "career", false, true);
  if (!resolved) notFound();
  permanentRedirect(resolved.href!);
}
