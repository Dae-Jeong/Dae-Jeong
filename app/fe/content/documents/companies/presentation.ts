import { readOptionalDocumentJson } from "../storage";

/** Presentation data for one resume. Copy, order, claims and approval state live in the document JSON; this only
 *  supplies phrases to emphasise and an optional header portrait. Print composition is one shared policy for every
 *  resume (resume-print-pages.tsx) and is never configured per company or revision (2026-09-29). */
export type ResumePresentation = { emphasis: string[]; photo?: { src: string; alt: string; width: number; height: number } };

/** Revision-local data wins; base presentation belongs only to its base resume revision. */
export function getResumePresentation(slug: string, revision: string): ResumePresentation | undefined {
  const base = ["documents", "companies", slug];
  const revisionPath = [...base, "revisions", revision];
  function read(segments: string[]): ResumePresentation | undefined {
    const presentation = readOptionalDocumentJson<ResumePresentation>(...segments, "presentation.json");
    if (presentation) return presentation;
    const emphasis = readOptionalDocumentJson<{ phrases: string[]; photo?: ResumePresentation["photo"] }>(...segments, "emphasis.json");
    return emphasis ? { emphasis: emphasis.phrases, ...(emphasis.photo ? { photo: emphasis.photo } : {}) } : undefined;
  }
  const presentation = read(revisionPath);
  if (presentation) return presentation;
  const resume = readOptionalDocumentJson<{ revision: string }>(...base, "resume.json");
  return resume?.revision === revision ? read(base) : undefined;
}
