/** Shared resume projection types. Markdown export is owned by tools/build_revision_documents.mjs. */
export type CopyBlock = {
  kind: "paragraph" | "bullet" | "skill" | "row";
  text: string;
  label?: string;
  /** "row" only (구분 | 내용 | 시기 credential table): the right-aligned period column. */
  meta?: string;
  claims: string[];
  /** "project-meta": grey one-line stack summary directly under a project heading (R3 adapter). */
  /** "service-heading": sub-heading one level under a project heading, grouping the bullets of one service (R3 adapter). */
  presentation?: "role" | "metadata" | "heading" | "subheading" | "project-meta" | "service-heading";
};
export type CopyEntry = { title?: string; blocks: CopyBlock[] };
export type CopySection = { title: string; entries: CopyEntry[] };
export type ResumeCopy = {
  name: string;
  role: string;
  careerLine: string;
  specialtyLine?: string;
  contacts: { label: string; href: string }[];
  sections: CopySection[];
};
