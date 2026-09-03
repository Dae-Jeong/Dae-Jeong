import type { Metadata } from "next";
import { getCv } from "@/content/documents";
import { CvView } from "../documents/professional-document";
import { ResumePageShell } from "../resume/resume-page-shell";

export const metadata: Metadata = {
  title: "CV — 김대정",
  description: "김대정의 전체 경력·프로젝트·기술·학력·자격 기록",
  robots: {
    index: false,
    follow: false,
    noarchive: true,
    nosnippet: true,
  },
};

export default function CvPage() {
  const document = getCv();
  return (
    <ResumePageShell crumb="CV" tag="LOCAL REVIEW">
      <CvView document={document} />
    </ResumePageShell>
  );
}
