import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  canViewTailoredResume,
  getTailoredResume,
  listRoleResumes,
} from "@/content/resumes";
import { ResumePageShell } from "../resume-page-shell";
import { TailoredResumeView } from "../tailored-resume-view";

type PageProps = {
  params: Promise<{ company: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { company } = await params;
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
export default async function CompanyResumePage({ params }: PageProps) {
  const { company } = await params;
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
      <TailoredResumeView resume={resume} roleOptions={roleOptions} />
    </ResumePageShell>
  );
}
