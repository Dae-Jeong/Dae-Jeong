import { notFound } from "next/navigation";
import { getDocument } from "@/lib/documents/repository";
import type { Metadata } from "next";
import { DocumentShell } from "../_components/documents/document-shell";
import { CvDocument } from "../_components/documents/cv/cv-document";

export const metadata: Metadata = {
  title: "Daejeong Kim | CV",
  description: "Tech Lead and Backend Engineer. Experience, projects, technical skills, education, patents, and professional activities.",
  robots: {
    index: false,
    follow: false,
    noarchive: true,
    nosnippet: true,
  },
};

export default async function CvPage() {
  const document = await getDocument({ scope: "common", kind: "cv" });
  if (!document || document.kind !== "cv") notFound();
  return (
    <DocumentShell>
      <CvDocument document={document.content} />
    </DocumentShell>
  );
}
