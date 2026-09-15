import type { Metadata } from "next";
import { ResumePageShell } from "./resume-page-shell";
import copy from "@/content/common/resume.json";
import { CommonNav } from "../common/common-nav";
import { ComparisonDocument } from "../documents/classic-resume";
import type { ResumeCopy } from "../../content/documents/resume-copy";
import styles from "../documents/classic-resume.module.css";
import { commonResumePresentation } from "@/content/common/presentation";
import { PagedResume } from "../documents/paged-resume";

export const metadata: Metadata = {
  title: "Resume — 김대정 · Maker",
  description:
    "호기심을 현실로, 메이커 김대정의 제품 기획·개발·운영 경험",
};

export default async function ResumePage({ searchParams }: { searchParams: Promise<{ paged?: string }> }) {
  const paged = (await searchParams).paged === "1";
  if (paged) return <main className={`${styles.pane} ${styles.standalone}`} data-template="editorial" data-common-document="resume" data-paged="true">
    <style>{"@page{size:A4;margin:0}"}</style>
    <ComparisonDocument copy={copy as ResumeCopy} prefix="resume" presentation={commonResumePresentation} />
    <PagedResume author={copy.name} role={copy.role} />
  </main>;
  return (
    <ResumePageShell>
      <CommonNav active="/resume" />
      <main className={`${styles.pane} ${styles.standalone}`} data-template="editorial" data-common-document="resume">
        <ComparisonDocument copy={copy as ResumeCopy} prefix="resume" presentation={commonResumePresentation} />
      </main>
    </ResumePageShell>
  );
}
