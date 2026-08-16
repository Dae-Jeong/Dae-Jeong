/*
 * Resume semantic type roles.
 *
 * Daejeong Design Profile review (2026-08-16):
 * - primary ladder: 40 / 28 / 22 / 18 / 16
 * - supporting metadata: 13 / 12
 * - structural headings: 600, claims and inline emphasis: 500, body: 400
 *
 * Keep master and tailored resumes on the same roles; company variants may
 * change copy and section selection, not the typographic hierarchy.
 */
export const resumeType = {
  documentHeader: "border-b-2 border-fg pb-6",
  documentSection: "pt-10 max-sm:pt-8",
  identityBlock: "min-w-0",
  identity: "m-0 font-mono text-3xl font-semibold leading-tight tracking-[-0.02em]",
  roleMeta:
    "mt-1.5 whitespace-nowrap font-mono text-sm font-medium leading-relaxed tracking-[0.04em] text-fg max-sm:whitespace-normal",
  metaBlock: "mt-4",
  careerMeta: "m-0 font-mono text-sm leading-relaxed text-fg-2",
  contactRow: "mt-3 flex flex-wrap gap-2",
  summaryStack: "grid gap-4 text-fg-2",
  careerRow: "border-border-soft py-4",
  achievementRow: "py-5",
  workStyleRow: "py-4",
  credentialRow: "py-2",
  achievementTitle: "m-0 mb-1.5 text-balance text-xl font-semibold leading-snug text-fg",
  achievementDescription: "grid gap-2 text-pretty",
  achievementParagraph: "m-0 text-base font-normal leading-relaxed text-fg",
  achievementEvidenceList:
    "m-0 grid list-none gap-1.5 p-0 text-cred font-normal leading-relaxed text-fg-2",
  achievementEvidenceItem:
    "relative pl-4 before:absolute before:left-0 before:font-mono before:text-muted before:content-['—'] [&_strong]:font-medium [&_strong]:text-fg",
  itemTitle: "m-0 mb-1 text-base font-semibold leading-normal text-fg",
  inlineStrong: "font-medium text-fg",
  metric: "font-medium tabular-nums text-success",
} as const;
