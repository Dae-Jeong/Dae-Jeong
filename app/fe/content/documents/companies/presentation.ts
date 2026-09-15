import miridihR3Emphasis from "./miridih/revisions/20260912-R3/emphasis.json";

/** Presentation-only preset for one local review revision. Copy, order, claims and approval
 *  state live in the revision JSON and are not touched here; this only selects a template and
 *  the phrases to emphasise. Revisions without a preset keep the default classic template. */
/** photo: optional header portrait (presentation only, same asset the tailored resume already uses; no copy/claims). */
export type ResumePresentation = { template: "editorial"; emphasis: string[]; photo?: { src: string; alt: string; width: number; height: number } };

const presentations: Record<string, ResumePresentation> = {
  "miridih:20260912-R3": {
    template: "editorial",
    emphasis: miridihR3Emphasis.phrases,
    // 2026-09-13 user approval: reuse content/resumes/miridih.ts photoSrc (public/profile/daejeong-profile-v2.png, 1122×1402, natural ratio).
    photo: { src: "/profile/daejeong-profile-v2.png", alt: "", width: 1122, height: 1402 },
  },
};

export function getResumePresentation(slug: string, revision: string): ResumePresentation | undefined {
  return presentations[`${slug}:${revision}`];
}

/** Career-description layout preset (presentation only). "a4-sheet" shows the document as the approved
 *  portrait A4-width sheet (794px, 60px side margins, diagrams inside the text column, project-level
 *  contents) on screen; copy, order and claims stay in the revision JSON. Other revisions keep the
 *  default screen layout with the desktop diagram breakout. */
export type CareerPresentation = { layout: "a4-sheet" };

const careerPresentations: Record<string, CareerPresentation> = {
  // 2026-09-14 user approval: output/reviews/miridih-career-vertical-full-20260914 (A4 폭 세로 시안).
  "miridih:20260912-R3": { layout: "a4-sheet" },
};

export function getCareerPresentation(slug: string, revision: string): CareerPresentation | undefined {
  return careerPresentations[`${slug}:${revision}`];
}
