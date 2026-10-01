import type { ResumeCopy } from "@/content/documents/resume-copy";
import type { ContentDocument } from "@/content/documents/parse-markdown";
import {
  companyDocuments,
  isPublicRevision,
  revisionDocuments,
  type CompanyDocument,
} from "@/content/documents/companies";
import { getResumePresentation } from "@/content/documents/companies/presentation";
import type { Representative } from "./types";

const revisionDate = (revision: string) => revision.slice(0, 8);

function fromRevision(
  document: CompanyDocument,
  normalizeCompany: (slug: string) => string,
): Representative | undefined {
  const base = {
    company: normalizeCompany(document.slug),
    companyName: document.companyName,
    position: document.position,
    date: revisionDate(document.revision),
    order: `${revisionDate(document.revision)}-2-${document.revision}`,
    public: isPublicRevision(document),
    label: document.revision,
    status: document.status,
    pdfHref: document.pdfHref,
  };
  if (document.document === "resume")
    return {
      ...base,
      kind: "resume",
      copy: document.content as ResumeCopy,
      presentation: getResumePresentation(document.slug, document.revision),
    };
  if (document.document === "career")
    return {
      ...base,
      kind: "career",
      content: document.content as ContentDocument,
    };
  return undefined;
}

export function collectCandidates(
  normalizeCompany: (slug: string) => string,
): Representative[] {
  const list: Representative[] = [];
  for (const document of [...companyDocuments, ...revisionDocuments]) {
    const candidate = fromRevision(document, normalizeCompany);
    if (candidate) list.push(candidate);
  }
  return list;
}
