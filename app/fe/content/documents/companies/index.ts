import { loadCompanySources } from "../storage";
import type { ResumeCopy } from "../resume-copy";
import type { ContentDocument } from "../parse-markdown";

export type DocumentKind = "resume" | "career" | "portfolio";
// Stored portfolio JSON (featuring/miridih/jyp/toss-place portfolio.json) stays as the submission record read by the
// validator; the retired portfolio screens no longer import it (site-remove-extra-surfaces, 2026-09-30).
export type CompanyDocument = {
  slug: string; companyName: string; position: string;
  status: "draft" | "approved" | "closed"; visibility: "local" | "public"; approved: boolean;
  revision: string; updatedAt: string; applicationId: string; focus: string;
  document: DocumentKind; content: ResumeCopy | ContentDocument; pdfHref?: string;
};
// Discover document files on the server. Portfolio files remain submission evidence only.
const sources = loadCompanySources<CompanyDocument>();
export const companyDocuments = sources.base;
export const revisionDocuments = sources.revisions;
const publicRevisionKeys = new Set([
  "sagak:20260921-R1",
  "ajungnetworks:20260921-R1",
  "socar:20260921-R1",
]);
export function isPublicRevision(document: Pick<CompanyDocument, "slug" | "revision" | "visibility">) {
  return document.visibility === "public" || publicRevisionKeys.has(`${document.slug}:${document.revision}`);
}
export function canViewDraft(environment: string | undefined) {
  return environment === "development" || environment === "test";
}
