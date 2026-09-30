import type { Metadata } from "next";
import { DocumentShell } from "../_components/documents/document-shell";
import copy from "@/content/common/resume.json";
import { CommonNav } from "../_components/documents/navigation";
import { ResumeDocument } from "../_components/documents/resume/resume-document";
import type { ResumeCopy } from "../../content/documents/resume-copy";
import { commonResumePresentation } from "@/content/common/presentation";

export const metadata: Metadata = {
  title: "Resume — 김대정 · Maker",
  description:
    "호기심을 현실로, 메이커 김대정의 제품 기획·개발·운영 경험",
};

export default function ResumePage() {
  return (
    <DocumentShell>
      <CommonNav active="/resume" />
      <ResumeDocument copy={copy as ResumeCopy} prefix="resume" presentation={commonResumePresentation} footerRole={copy.role} scope="common" />
    </DocumentShell>
  );
}
