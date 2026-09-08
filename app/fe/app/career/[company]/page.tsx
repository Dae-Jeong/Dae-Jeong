import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { ApplicationVersionNav } from "@/components/site/application-version-nav";
import { canViewDocument, getCareerDescription } from "@/content/documents";
import { CareerDescriptionView } from "../../documents/professional-document";
import { ResumePageShell } from "../../resume/resume-page-shell";

type PageProps = {
  params: Promise<{ company: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { company } = await params;
  const document = getCareerDescription(company);
  if (!document || !canViewDocument(document)) return { title: "경력기술서 — 김대정" };
  return {
    title: `${document.companyName ?? company} 경력기술서 — 김대정`,
    description: document.subtitle,
    robots: { index: false, follow: false, noarchive: true, nosnippet: true },
  };
}

export default async function TailoredCareerPage({ params }: PageProps) {
  const { company } = await params;
  if (company === "common") redirect("/career");
  const document = getCareerDescription(company);
  if (!document || !canViewDocument(document)) notFound();

  return (
    <ResumePageShell crumb={<>Career / {document.companyName}</>} tag="DRAFT · LOCAL">
      {company === "jyp-v2" ? <ApplicationVersionNav slug="jyp-v2" label="JYP v2" active="career" /> : null}
      <CareerDescriptionView document={document} />
    </ResumePageShell>
  );
}
