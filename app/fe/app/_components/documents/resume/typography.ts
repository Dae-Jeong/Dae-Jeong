/** Shared semantic type roles for the common and company resume renderer.
 * Copy and section selection vary; the typographic hierarchy stays the same. */
export const resumeType = {
  commonDocumentHeader: "break-inside-avoid border-b border-fg pb-8",
  commonIdentityBlock: "flex min-w-0 flex-wrap items-baseline justify-between gap-x-8 gap-y-2",
  commonIdentity: "m-0 text-3xl font-semibold leading-tight tracking-[-0.025em]",
  commonRoleMeta: "m-0 text-sm font-medium leading-relaxed text-fg-2",
  commonMetaBlock: "mt-5 grid gap-4 border-t border-border-soft pt-4 md:grid-cols-[minmax(0,1fr)_auto] md:items-start",
  careerMeta: "m-0 font-mono text-sm leading-relaxed text-fg-2",
  commonContactRow: "flex flex-wrap gap-2 md:justify-end",
  summaryStack: "mt-7 grid gap-3 text-fg-2",
  profileTitle: "m-0 text-pretty text-xl font-semibold leading-snug tracking-[-0.015em] text-fg",
  profileDescription: "m-0 text-pretty text-base font-normal leading-relaxed text-fg-2",
} as const;
