import featuringResume from "./featuring/resume.json";
import featuringCareer from "./featuring/career.json";
import featuringPortfolio from "./featuring/portfolio.json";
import miridihResume from "./miridih/resume.json";
import miridihCareer from "./miridih/career.json";
import miridihPortfolio from "./miridih/portfolio.json";
import jypResume from "./jyp/resume.json";
import jypCareer from "./jyp/career.json";
import jypPortfolio from "./jyp/portfolio.json";
import tossResume from "./toss-place/resume.json";
import tossCareer from "./toss-place/career.json";
import tossPortfolio from "./toss-place/portfolio.json";
import miridihR3Resume from "./miridih/revisions/20260912-R3/resume.json";
import miridihR3Career from "./miridih/revisions/20260912-R3/career.json";
import type { ResumeCopy } from "../resume-copy";
import type { ContentDocument } from "../parse-markdown";

export type DocumentKind = "resume" | "career" | "portfolio";
export type CompanyDocument = {
  slug: string; companyName: string; position: string;
  status: "draft"; visibility: "local"; approved: false;
  revision: string; updatedAt: string; applicationId: string; focus: string;
  document: DocumentKind; content: ResumeCopy | ContentDocument;
};
export const companyDocuments = [featuringResume, featuringCareer, featuringPortfolio,
  miridihResume, miridihCareer, miridihPortfolio, jypResume, jypCareer, jypPortfolio,
  tossResume, tossCareer, tossPortfolio] as CompanyDocument[];
export const documentKinds = [
  { slug: "resume", label: "이력서" }, { slug: "career", label: "경력기술서" },
  { slug: "portfolio", label: "포트폴리오" },
] as const;
// Extra local review revisions. Regenerated from the wiki content-draft by
// tools/build_revision_documents.mjs; kept out of `companyDocuments` so the 12-document
// application contract and its registry checks are unchanged.
export const revisionDocuments = [miridihR3Resume, miridihR3Career] as CompanyDocument[];
export function documentHref(document: CompanyDocument, kind = document.document) {
  return `/${kind}/${document.slug}?revision=${encodeURIComponent(document.revision)}`;
}
export function findCompanyDocument(company: string, kind: DocumentKind, revision?: string) {
  if (revision === undefined) return companyDocuments.find((document) => document.slug === company && document.document === kind);
  return [...companyDocuments, ...revisionDocuments].find((document) => document.slug === company && document.document === kind && document.revision === revision);
}
/** True only for companies that have extra review revisions beyond the 12-document contract. */
export function hasExtraRevisions(company: string, kind: DocumentKind) {
  return revisionDocuments.some((document) => document.slug === company && document.document === kind);
}
/** Every local draft revision of one company document, latest revision first. */
export function listDocumentRevisions(company: string, kind: DocumentKind) {
  return [...companyDocuments, ...revisionDocuments]
    .filter((document) => document.slug === company && document.document === kind)
    .sort((a, b) => b.revision.localeCompare(a.revision));
}
export function canViewDraft(environment: string | undefined) {
  return environment === "development" || environment === "test";
}
