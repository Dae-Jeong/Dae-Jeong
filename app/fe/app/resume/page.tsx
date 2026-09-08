import type { Metadata } from "next";
import { ResumePageShell } from "./resume-page-shell";
import copy from "@/content/common/resume.json";
import { CommonNav } from "../common/common-nav";
import { ComparisonDocument } from "./compare/document";
import type { ResumeCopy } from "./compare/source";
import styles from "./compare/compare.module.css";

export const metadata: Metadata = {
  title: "Resume — 김대정 · Tech Lead · Backend Engineer",
  description:
    "가능성을 기회로 바꾸고, 제품으로 가치를 전하는 메이커 김대정의 Tech Lead · Backend Engineer 이력서",
};

export default function ResumePage() {
  return (
    <ResumePageShell>
      <CommonNav active="/resume" />
      <main className={`${styles.pane} ${styles.standalone}`} data-template="classic" data-common-document="resume">
        <ComparisonDocument copy={copy as ResumeCopy} prefix="resume" />
      </main>
    </ResumePageShell>
  );
}
