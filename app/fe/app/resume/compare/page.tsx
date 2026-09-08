import copy from "@/content/common/resume.json";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CompareView } from "./compare-view";
import { ComparisonDocument } from "./document";
import type { ResumeCopy } from "./source";

export const metadata: Metadata = {
  title: "이력서 양식 비교 — 김대정",
  robots: { index: false, follow: false, noarchive: true, nosnippet: true },
};

export const dynamic = "force-dynamic";

export default async function ResumeComparePage() {
  // Review authorization is not publication authorization. Never ship the draft.
  if (process.env.NODE_ENV === "production") notFound();
  return <CompareView
    sections={copy.sections.map((section) => section.title)}
    existing={<ComparisonDocument copy={copy as ResumeCopy} prefix="existing" />}
    classic={<ComparisonDocument copy={copy as ResumeCopy} prefix="classic" />}
  />;
}
