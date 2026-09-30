import type { ResumeCopy } from "@/content/documents/resume-copy";
import commonResume from "@/content/common/resume.json";
import commonCareer from "@/content/common/career-description.json";
import { commonResumePresentation } from "@/content/common/presentation";
import type { ContentDocument } from "@/content/documents/parse-markdown";
import { careerDescriptionToContent } from "@/content/documents/career-content-adapter";
import {
  companyDocuments,
  commonDocumentCompanies,
  isPublicRevision,
  revisionDocuments,
  type CompanyDocument,
} from "@/content/documents/companies";
import { getResumePresentation } from "@/content/documents/companies/presentation";
import {
  getCareerDescription,
  listCareerDescriptions,
} from "@/content/documents/index";
import { getTailoredResume, listTailoredResumes } from "@/content/resumes";
import { tailoredResumeToCopy } from "@/content/resumes/resume-copy-adapter";

import type { Representative } from "./types";

const revisionDate = (revision: string) => revision.slice(0, 8);
const isoDate = (date: string) => date.replaceAll("-", "");

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
  for (const config of commonDocumentCompanies) {
    const base = {
      company: normalizeCompany(config.slug),
      companyName: config.companyName,
      position: config.position,
      date: isoDate(config.updatedAt),
      order: `${isoDate(config.updatedAt)}-common`,
      public: config.visibility === "public",
      label: config.mode,
      mode: config.mode,
    };
    for (const kind of config.documents) {
      list.push(kind === "resume"
        ? { ...base, kind, copy: commonResume as ResumeCopy, presentation: commonResumePresentation }
        : { ...base, kind, content: commonCareer as ContentDocument });
    }
  }
  for (const document of [...companyDocuments, ...revisionDocuments]) {
    const candidate = fromRevision(document, normalizeCompany);
    if (candidate) list.push(candidate);
  }
  for (const entry of listTailoredResumes()) {
    const resume = getTailoredResume(entry.slug);
    if (!resume || resume.roleVariant) continue;
    const { copy, presentation } = tailoredResumeToCopy(resume);
    list.push({
      kind: "resume",
      company: normalizeCompany(resume.slug),
      companyName: resume.companyName,
      position: resume.position,
      date: isoDate(resume.updatedAt),
      order: `${isoDate(resume.updatedAt)}-1-typed`,
      public: resume.visibility === "public",
      label: `typed ${resume.updatedAt}`,
      copy,
      presentation,
      pdfHref: resume.pdfHref,
      tag:
        resume.status === "draft"
          ? "DRAFT"
          : resume.status === "closed"
            ? "CLOSED"
            : undefined,
    });
  }
  for (const entry of listCareerDescriptions()) {
    if (entry.slug === "common") continue;
    const document = getCareerDescription(entry.slug);
    if (!document) continue;
    list.push({
      kind: "career",
      company: normalizeCompany(entry.slug),
      companyName: document.companyName ?? entry.slug,
      position: document.targetRole ?? "",
      date: isoDate(document.updatedAt),
      order: `${isoDate(document.updatedAt)}-1-typed-${entry.slug}`,
      public: document.visibility === "public",
      label: `typed ${document.updatedAt}`,
      content: careerDescriptionToContent(document),
      tag: "DRAFT · LOCAL",
    });
  }
  return list;
}
