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
  documentHeader:
    "grid break-inside-avoid grid-cols-[minmax(0,1fr)_auto] gap-x-6 border-b-2 border-fg pb-6 max-sm:gap-x-4",
  documentSection: "pt-10 max-sm:pt-8",
  identityBlock: "col-start-1 row-start-1 min-w-0",
  identity: "m-0 font-mono text-3xl font-semibold leading-tight tracking-[-0.02em]",
  roleMeta:
    "mt-1.5 whitespace-nowrap font-mono text-sm font-medium leading-relaxed tracking-[0.04em] text-fg max-sm:whitespace-normal",
  metaBlock: "col-start-1 row-start-2 mt-4 max-sm:col-span-2",
  profilePhoto:
    "relative col-start-2 row-start-1 row-span-2 aspect-[4/5] w-28 overflow-hidden border border-border bg-surface max-sm:row-span-1 max-sm:w-20 print:w-28",
  careerMeta: "m-0 font-mono text-sm leading-relaxed text-fg-2",
  contactRow: "mt-3 flex flex-wrap gap-2",
  summaryStack: "grid gap-4 text-fg-2",
  careerRow: "border-border-soft py-4",
  achievementRow: "py-5",
  workStyleRow: "py-4",
  credentialRow: "py-2",
  achievementTitle: "m-0 mb-1.5 text-balance text-xl font-semibold leading-snug text-fg",
  achievementDescription: "flex min-w-0 flex-col gap-2 break-words text-pretty",
  achievementParagraph: "m-0 text-base font-normal leading-relaxed text-fg",
  achievementEvidenceList:
    "m-0 flex min-w-0 list-none flex-col gap-1.5 p-0 text-cred font-normal leading-relaxed text-fg-2",
  achievementEvidenceItem:
    "relative pl-4 before:absolute before:left-0 before:font-mono before:text-muted before:content-['—'] [&_strong]:font-medium [&_strong]:text-fg",
  itemTitle: "m-0 mb-1 text-base font-semibold leading-normal text-fg",
  inlineStrong: "font-medium text-fg",
  metric: "font-medium tabular-nums text-success",
} as const;
