import "server-only";
import { readDocumentJson } from "@/content/documents/storage";
import type { CompanyDocument } from "@/content/documents/companies";
import type { ResumeCopy } from "@/content/documents/resume-copy";
import type { ContentDocument } from "@/content/documents/parse-markdown";
import type { ResumePresentation } from "@/content/documents/companies/presentation";
import { commonResumePresentation } from "@/content/common/presentation";
import { getRepresentative, listRepresentativeEntries } from "@/features/company-documents/policy";
import { companySlug, RESERVED_SEGMENTS } from "@/features/company-documents/types";

export type DocumentQuery = {
  scope: "common" | "company";
  kind: "resume" | "career" | "cv";
  company?: string;
};

type DocumentMetadata = {
  scope: DocumentQuery["scope"];
  slug: string;
  title: string;
  companyName?: string;
  position: string;
  status: CompanyDocument["status"] | "active" | "review-ready";
  revision?: string;
  pdfHref?: string;
  presentation?: ResumePresentation;
};
export type DocumentRecord = DocumentMetadata & (
  | { kind: "resume"; content: ResumeCopy }
  | { kind: "career"; content: ContentDocument }
  | { kind: "cv"; content: ContentDocument }
);

/** Returns the latest representative through the common document interface. */
export async function getDocument(query: DocumentQuery): Promise<DocumentRecord | null> {
  if (!["resume", "career", "cv"].includes(query.kind)) return null;
  if (query.scope === "common") {
    if (query.company !== undefined) return null;
    const metadata: DocumentMetadata = {
      scope: "common", slug: "common", title: "", position: "",
      status: query.kind === "cv" ? "review-ready" : "active",
    };
    if (query.kind === "resume") {
      const content = readDocumentJson<ResumeCopy>("common", "resume.json");
      return { ...metadata, title: content.name, position: content.role, kind: "resume", content, presentation: commonResumePresentation };
    }
    const content = readDocumentJson<ContentDocument>("common", query.kind === "career" ? "career-description.json" : "cv.json");
    return { ...metadata, title: content.title, kind: query.kind, content };
  }
  if (query.scope !== "company" || query.kind === "cv" || !query.company ||
      !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(query.company) || RESERVED_SEGMENTS.has(query.company)) return null;
  const slug = companySlug(query.company);
  const representative = getRepresentative(slug, query.kind);
  if (!representative) return null;
  const metadata: DocumentMetadata = {
    scope: "company", slug, title: representative.companyName,
    companyName: representative.companyName, position: representative.position,
    status: representative.status,
    revision: representative.label, pdfHref: representative.pdfHref,
  };
  return representative.kind === "resume"
    ? { ...metadata, kind: "resume", content: representative.copy, presentation: representative.presentation }
    : { ...metadata, kind: "career", content: representative.content };
}

/** Lists all latest representatives using the same interface as getDocument. */
export async function listDocuments(filter: Partial<DocumentQuery> = {}): Promise<DocumentRecord[]> {
  const queries: DocumentQuery[] = [
    ...(["resume", "career", "cv"] as const).map(kind => ({ scope: "common" as const, kind })),
    ...listRepresentativeEntries().map(({ document }) => ({
      scope: "company" as const, kind: document.kind, company: document.company,
    })),
  ];
  const selected = queries.filter(query =>
    (filter.scope === undefined || query.scope === filter.scope) &&
    (filter.kind === undefined || query.kind === filter.kind) &&
    (filter.company === undefined || query.company === companySlug(filter.company)));
  const records = await Promise.all(selected.map(getDocument));
  return records.filter((record): record is DocumentRecord => record !== null);
}

/** Admin inventory lists metadata for all latest representatives. */
export async function listDocumentEntries(): Promise<(DocumentMetadata & { kind: "resume" | "career"; viewable: boolean })[]> {
  return listRepresentativeEntries().map(({ document }) => ({
    scope: "company", slug: document.company, title: document.companyName,
    companyName: document.companyName, position: document.position,
    status: document.status,
    revision: document.label, pdfHref: document.pdfHref, kind: document.kind, viewable: true,
  }));
}
