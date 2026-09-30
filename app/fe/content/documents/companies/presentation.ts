import gnaR2Emphasis from "./gna-company/revisions/20260928-R2/emphasis.json";
import miridihR3Emphasis from "./miridih/revisions/20260912-R3/emphasis.json";
import sagakR1Emphasis from "./sagak/revisions/20260921-R1/emphasis.json";
import ajungR1Emphasis from "./ajungnetworks/revisions/20260921-R1/emphasis.json";
import socarR1Emphasis from "./socar/revisions/20260921-R1/emphasis.json";
import featuringR1Emphasis from "./featuring/revisions/20260921-R1/emphasis.json";

/** Presentation data for one resume. Copy, order, claims and approval state live in the document JSON; this only
 *  supplies phrases to emphasise and an optional header portrait. Print composition is one shared policy for every
 *  resume (resume-print-pages.tsx) and is never configured per company or revision (2026-09-29). */
export type ResumePresentation = { emphasis: string[]; photo?: { src: string; alt: string; width: number; height: number } };

const presentations: Record<string, ResumePresentation> = {
  "gna-company:20260928-R2": {
    emphasis: gnaR2Emphasis.phrases,
    photo: { src: "/profile/daejeong-profile-v2.png", alt: "김대정", width: 1122, height: 1402 },
  },
  "miridih:20260912-R3": {
    emphasis: miridihR3Emphasis.phrases,
    // 2026-09-13 user approval: reuse content/resumes/miridih.ts photoSrc (public/profile/daejeong-profile-v2.png, 1122×1402, natural ratio).
    photo: { src: "/profile/daejeong-profile-v2.png", alt: "", width: 1122, height: 1402 },
  },
  "sagak:20260921-R1": {
    emphasis: sagakR1Emphasis.phrases,
    photo: { src: "/profile/daejeong-profile-v2.png", alt: "", width: 1122, height: 1402 },
  },
  "ajungnetworks:20260921-R1": {
    emphasis: ajungR1Emphasis.phrases,
    photo: { src: "/profile/daejeong-profile-v2.png", alt: "", width: 1122, height: 1402 },
  },
  "socar:20260921-R1": {
    emphasis: socarR1Emphasis.phrases,
    photo: { src: "/profile/daejeong-profile-v2.png", alt: "", width: 1122, height: 1402 },
  },
  "featuring:20260921-R1": {
    emphasis: featuringR1Emphasis.phrases,
    photo: { src: "/profile/daejeong-profile-v2.png", alt: "", width: 1122, height: 1402 },
  },
};

export function getResumePresentation(slug: string, revision: string): ResumePresentation | undefined {
  return presentations[`${slug}:${revision}`];
}
