import type { Metadata } from "next";
import { ResumePageShell } from "./resume-page-shell";
import { ResumeView } from "./resume-view";

export const metadata: Metadata = {
  title: "Resume — 김대정 · Tech Lead · Backend Engineer",
  description:
    "가능성을 기회로 바꾸고, 제품으로 가치를 전하는 메이커 김대정의 Tech Lead · Backend Engineer 이력서 (KO/EN)",
};

export default function ResumePage() {
  return (
    <ResumePageShell>
      <ResumeView />
    </ResumePageShell>
  );
}
