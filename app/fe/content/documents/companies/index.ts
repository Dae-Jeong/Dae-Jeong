import gnaR2Resume from "./gna-company/revisions/20260928-R2/resume.json";
import gnaR2Career from "./gna-company/revisions/20260928-R2/career.json";
import featuringResume from "./featuring/resume.json";
import featuringCareer from "./featuring/career.json";
import miridihResume from "./miridih/resume.json";
import miridihCareer from "./miridih/career.json";
import jypResume from "./jyp/resume.json";
import jypCareer from "./jyp/career.json";
import tossResume from "./toss-place/resume.json";
import tossCareer from "./toss-place/career.json";
import miridihR3Resume from "./miridih/revisions/20260912-R3/resume.json";
import miridihR3Career from "./miridih/revisions/20260912-R3/career.json";
import sagakR1Resume from "./sagak/revisions/20260921-R1/resume.json";
import sagakR1Career from "./sagak/revisions/20260921-R1/career.json";
import ajungR1Resume from "./ajungnetworks/revisions/20260921-R1/resume.json";
import ajungR1Career from "./ajungnetworks/revisions/20260921-R1/career.json";
import socarR1Resume from "./socar/revisions/20260921-R1/resume.json";
import socarR1Career from "./socar/revisions/20260921-R1/career.json";
import featuringR1Resume from "./featuring/revisions/20260921-R1/resume.json";
import featuringR1Career from "./featuring/revisions/20260921-R1/career.json";
import type { ResumeCopy } from "../resume-copy";
import type { ContentDocument } from "../parse-markdown";

export type DocumentKind = "resume" | "career" | "portfolio";
// Stored portfolio JSON (featuring/miridih/jyp/toss-place portfolio.json) stays as the submission record read by the
// validator; the retired portfolio screens no longer import it (site-remove-extra-surfaces, 2026-09-30).
export type CompanyDocument = {
  slug: string; companyName: string; position: string;
  status: "draft"; visibility: "local"; approved: false;
  revision: string; updatedAt: string; applicationId: string; focus: string;
  document: DocumentKind; content: ResumeCopy | ContentDocument;
};
export const companyDocuments = [featuringResume, featuringCareer, miridihResume, miridihCareer,
  jypResume, jypCareer, tossResume, tossCareer] as CompanyDocument[];
// Extra review revisions. Regenerated from the wiki content-draft by tools/build_revision_documents.mjs; kept out of
// `companyDocuments` so the 12-document application contract and its registry checks are unchanged. Which stored
// revision is shown on the web is decided only by features/company-documents/policy.ts.
export const revisionDocuments = [gnaR2Resume, gnaR2Career, miridihR3Resume, miridihR3Career, sagakR1Resume, sagakR1Career, ajungR1Resume, ajungR1Career, socarR1Resume, socarR1Career, featuringR1Resume, featuringR1Career] as CompanyDocument[];
/** Review routes which consume current common copy, without authoring tailored documents. */
export const commonDocumentCompanies: readonly {
  slug: string;
  companyName: string;
  position: string;
  updatedAt: string;
  visibility: "local" | "public";
  mode: "common";
  documents: readonly ("resume" | "career")[];
}[] = [{
  slug: "miridih-pe",
  companyName: "미리디",
  position: "Product Engineer · 공통 본문",
  updatedAt: "2026-09-30",
  visibility: "local",
  mode: "common",
  documents: ["resume", "career"],
}];
const publicRevisionKeys = new Set([
  "sagak:20260921-R1",
  "ajungnetworks:20260921-R1",
  "socar:20260921-R1",
]);
export function isPublicRevision(document: Pick<CompanyDocument, "slug" | "revision">) {
  return publicRevisionKeys.has(`${document.slug}:${document.revision}`);
}
export function canViewDraft(environment: string | undefined) {
  return environment === "development" || environment === "test";
}
