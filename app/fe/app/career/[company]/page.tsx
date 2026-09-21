import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { ApplicationVersionNav } from "@/components/site/application-version-nav";
import { canViewDocument, getCareerDescription } from "@/content/documents";
import { CareerDescriptionView } from "../../documents/professional-document";
import { ResumePageShell } from "../../resume/resume-page-shell";
import { CompanyDocumentPage, LocalRevisionLinks, type DocumentSearch } from "../../documents/company-document";
import { publicRevisionFor } from "@/content/documents/companies";

type PageProps = {
  params: Promise<{ company: string }>;
  searchParams: DocumentSearch;
};

export async function generateMetadata({ params, searchParams }: PageProps): Promise<Metadata> {
  const { company } = await params;
  const requestedRevision = (await searchParams).revision;
  const published = requestedRevision
    ? publicRevisionFor(company, "career")?.revision === requestedRevision
    : publicRevisionFor(company, "career")?.revision;
  if (requestedRevision || published || company === "toss-place") return {
    title: `${company} 경력기술서${published ? "" : " 초안"} — 김대정`,
    robots: { index: false, follow: false, noarchive: true, nosnippet: true },
  };
  const document = getCareerDescription(company);
  if (!document || !canViewDocument(document)) return { title: "경력기술서 — 김대정" };
  return {
    title: `${document.companyName ?? company} 경력기술서 — 김대정`,
    description: document.subtitle,
    robots: { index: false, follow: false, noarchive: true, nosnippet: true },
  };
}

export default async function TailoredCareerPage({ params, searchParams }: PageProps) {
  const { company } = await params;
  const { revision } = await searchParams;
  const publicDocument = publicRevisionFor(company, "career");
  if (revision || publicDocument || company === "toss-place") return <CompanyDocumentPage company={company} kind="career" revision={revision ?? publicDocument?.revision ?? "20260910-R1"} />;
  if (company === "common") redirect("/career");
  const document = getCareerDescription(company);
  if (!document || !canViewDocument(document)) notFound();

  return (
    <ResumePageShell crumb={<>Career / {document.companyName}</>} tag="DRAFT · LOCAL">
      {company === "jyp-v2" ? <ApplicationVersionNav slug="jyp-v2" label="JYP v2" active="career" /> : null}
      <LocalRevisionLinks company={company} kind="career" />
      <CareerDescriptionView document={document} />
    </ResumePageShell>
  );
}
