import type { Metadata } from "next";
import { ResumePageShell } from "./resume-page-shell";
import { ResumeView } from "./resume-view";

export const metadata: Metadata = {
  title: "Resume — 김대정 · Backend Engineer",
  description:
    "AI 제품을 만들고, 무엇을 만들지도 함께 정하는 백엔드 엔지니어 — 이력서 (KO/EN)",
};

export default function ResumePage() {
  return (
    <ResumePageShell>
      <ResumeView />
    </ResumePageShell>
  );
}
