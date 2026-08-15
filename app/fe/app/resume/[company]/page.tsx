import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  canViewTailoredResume,
  getTailoredResume,
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

  return {
    title: `${resume.companyName} ${resume.position} Resume — 김대정`,
    description: `${resume.companyName} ${resume.position} 지원용 맞춤 이력서`,
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

  return (
    <ResumePageShell
      crumb={
        <>
          Resume / {resume.companyName}
        </>
      }
      tag={resume.status === "draft" ? "DRAFT" : undefined}
    >
      <TailoredResumeView resume={resume} />
    </ResumePageShell>
  );
}
