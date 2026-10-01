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

export default function CvPage() {
  return (
    <DocumentShell>
      <CvDocument />
    </DocumentShell>
  );
}
