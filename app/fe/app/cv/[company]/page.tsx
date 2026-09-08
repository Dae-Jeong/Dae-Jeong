import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { canViewDocument, getCv } from "@/content/documents";
import { CvView } from "../../documents/professional-document";
import { ResumePageShell } from "../../resume/resume-page-shell";

type PageProps = {
  params: Promise<{ company: string }>;
};

export const metadata: Metadata = {
  title: "CV — 김대정",
  robots: { index: false, follow: false, noarchive: true, nosnippet: true },
};

export default async function TailoredCvPage({ params }: PageProps) {
  const { company } = await params;
  if (company === "common") redirect("/cv");
  const document = getCv(company);
  if (!document || !canViewDocument(document)) notFound();

  return (
    <ResumePageShell crumb={<>CV / {document.companyName}</>} tag="DRAFT · LOCAL">
      <CvView document={document} />
    </ResumePageShell>
  );
}
