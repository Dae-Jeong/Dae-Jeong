import { notFound } from "next/navigation";
import { getDocument } from "@/lib/documents/repository";
import type { Metadata } from "next";
import { DocumentShell } from "../_components/documents/document-shell";
import { ResumeDocument } from "../_components/documents/resume/resume-document";

export const metadata: Metadata = {
  title: "Resume — 김대정 · Maker",
  description:
    "호기심을 현실로, 메이커 김대정의 제품 기획·개발·운영 경험",
};

export default async function ResumePage() {
  const document = await getDocument({ scope: "common", kind: "resume" });
  if (!document || document.kind !== "resume") notFound();
  return (
    <DocumentShell>
      <ResumeDocument copy={document.content} prefix="resume" presentation={document.presentation} footerRole={document.position} scope="common" />
    </DocumentShell>
  );
}
