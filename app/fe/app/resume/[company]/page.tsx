import { resolveCompanyRequest } from "@/features/company-documents/urls";
import { notFound, permanentRedirect } from "next/navigation";

type PageProps = { params: Promise<{ company: string }> };

/** Former /resume/{company} address (with or without ?revision=): normalised to the same company's representative
 *  /{company}/resume URL without the query. /resume/common is the common document. Unknown companies are not redirected. */
export default async function FormerResumePage({ params }: PageProps) {
  const { company } = await params;
  const resolved = await resolveCompanyRequest(company, "resume", false, true);
  if (!resolved) notFound();
  permanentRedirect(resolved.href!);
}
