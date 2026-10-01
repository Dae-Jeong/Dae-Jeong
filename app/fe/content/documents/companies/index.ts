import MiridihPeResume from "./miridih-pe/resume.json";
import MiridihPeCareer from "./miridih-pe/career.json";
import AblyResume from "./ably/resume.json";
import AblyCareer from "./ably/career.json";
import NriseResume from "./nrise/resume.json";
import NriseCareer from "./nrise/career.json";
import SoomgoResume from "./soomgo/resume.json";
import SoomgoCareer from "./soomgo/career.json";
import PaytalabResume from "./paytalab/resume.json";
import PaytalabCareer from "./paytalab/career.json";
import WrtnResume from "./wrtn/resume.json";
import WrtnCareer from "./wrtn/career.json";
import HybeResume from "./hybe/resume.json";
import HybeCareer from "./hybe/career.json";
import featuringR2Resume from "./featuring/revisions/20260921-R2/resume.json";
import featuringR2Career from "./featuring/revisions/20260921-R2/career.json";
import tossR2Resume from "./toss-place/revisions/20261001-R2/resume.json";
import tossR2Career from "./toss-place/revisions/20261001-R2/career.json";
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
  jypResume, jypCareer, tossResume, tossCareer,
  MiridihPeResume, MiridihPeCareer, AblyResume, AblyCareer, NriseResume, NriseCareer, SoomgoResume, SoomgoCareer, PaytalabResume, PaytalabCareer, WrtnResume, WrtnCareer, HybeResume, HybeCareer] as CompanyDocument[];
// Preserved review revisions, regenerated from their Markdown owners by the revision/company preview tools.
// Historical base records and submission artifacts stay intact. The policy selects one representative per URL.
export const revisionDocuments = [gnaR2Resume, gnaR2Career, miridihR3Resume, miridihR3Career, sagakR1Resume, sagakR1Career, ajungR1Resume, ajungR1Career, socarR1Resume, socarR1Career, featuringR1Resume, featuringR1Career, featuringR2Resume, featuringR2Career, tossR2Resume, tossR2Career] as CompanyDocument[];
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
