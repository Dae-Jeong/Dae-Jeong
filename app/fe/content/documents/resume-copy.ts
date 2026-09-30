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
/** kind: section meaning for styling. Omitted in exported JSON, where the renderer derives it from the title
 *  (대표 성과 → outcomes, 경력 → career); adapters of other resume sources set it explicitly. */
export type CopySection = { title: string; kind?: "outcomes" | "career" | "other"; entries: CopyEntry[] };
export type ResumeCopy = {
  name: string;
  role: string;
  careerLine: string;
  specialtyLine?: string;
  contacts: { label: string; href: string }[];
  sections: CopySection[];
};
