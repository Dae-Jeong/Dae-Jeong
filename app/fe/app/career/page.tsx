import type { Metadata } from "next";
import { getCareerDescription } from "@/content/documents";
import { ResumePageShell } from "../resume/resume-page-shell";
import { CareerDescriptionView } from "../documents/professional-document";

export const metadata: Metadata = {
  title: "경력기술서 — 김대정",
  description: "제품 판단을 운영 가능한 Backend와 AI 기능으로 연결해 온 김대정의 경력기술서",
  robots: {
    index: false,
    follow: false,
    noarchive: true,
    nosnippet: true,
  },
};

export default function CareerPage() {
  const document = getCareerDescription();
  return (
    <ResumePageShell crumb="Career Description" tag="LOCAL REVIEW">
      <CareerDescriptionView document={document} />
    </ResumePageShell>
  );
}
