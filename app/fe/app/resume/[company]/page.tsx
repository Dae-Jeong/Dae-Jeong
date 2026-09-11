import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { ApplicationVersionNav } from "@/components/site/application-version-nav";
import {
  canViewTailoredResume,
  getTailoredResume,
  listRoleResumes,
} from "@/content/resumes";
import { ResumePageShell } from "../resume-page-shell";
import { TailoredResumeView } from "../tailored-resume-view";
import { CompanyDocumentPage, type DocumentSearch } from "../../documents/company-document";

type PageProps = {
  params: Promise<{ company: string }>;
  searchParams: DocumentSearch;
};

export async function generateMetadata({ params, searchParams }: PageProps): Promise<Metadata> {
  const { company } = await params;
  if ((await searchParams).revision || company === "toss-place") return {
    title: `${company} 이력서 초안 — 김대정`,
    robots: { index: false, follow: false, noarchive: true, nosnippet: true },
  };
  if (company === "jyp-v2") redirect("/resume/jyp");
  const resume = getTailoredResume(company);

  if (!resume || !canViewTailoredResume(resume)) {
    return { title: "Resume — 김대정" };
  }

  const target = resume.roleVariant?.label ?? `${resume.companyName} ${resume.position}`;

  return {
    title: `${target} Resume — 김대정`,
    description: resume.roleVariant?.description ?? `김대정 이력서 · ${target}`,
    robots: {
      index: false,
      follow: false,
      noarchive: true,
      nosnippet: true,
    },
  };
}
export default async function CompanyResumePage({ params, searchParams }: PageProps) {
  const { company } = await params;
  const { revision } = await searchParams;
  if (revision || company === "toss-place") return <CompanyDocumentPage company={company} kind="resume" revision={revision ?? "20260910-R1"} />;
  if (company === "jyp-v2") redirect("/resume/jyp");
  const resume = getTailoredResume(company);

  if (!resume || !canViewTailoredResume(resume)) notFound();

  const roleOptions = resume.roleVariant ? listRoleResumes() : undefined;
  const crumbLabel = resume.roleVariant?.shortLabel ?? resume.companyName;

  return (
    <ResumePageShell
      crumb={
        <>
          Resume / {crumbLabel}
        </>
      }
      tag={
        resume.status === "draft"
          ? "DRAFT"
          : resume.status === "closed"
            ? "CLOSED"
            : undefined
      }
    >
      {company === "jyp" ? <ApplicationVersionNav slug="jyp-v2" label="JYP · 이력서 v1" active="resume" /> : null}
      <TailoredResumeView resume={resume} roleOptions={roleOptions} />
    </ResumePageShell>
  );
}
