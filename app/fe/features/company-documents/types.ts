import type { CompanyDocument } from "@/content/documents/companies";
import type { ResumePresentation } from "@/content/documents/companies/presentation";
import type { ContentDocument } from "@/content/documents/parse-markdown";
import type { ResumeCopy } from "@/content/documents/resume-copy";
export type CompanyKind = "resume" | "career";
export const companyKinds = [
  { slug: "resume", label: "이력서" },
  { slug: "career", label: "경력기술서" },
] as const;

/** Top-level path segments owned by other routes; a company slug may never use them. */
export const RESERVED_SEGMENTS = new Set([
  "resume",
  "career",
  "cv",
  "portfolio",
  "admin",
  "dashboard",
  "api",
  "_map",
  "_platforms",
  "common",
  "applications",
  "documents",
  "view",
  "blog",
  "labs",
  "chat",
  "design",
  "resumes",
  "profile",
  "favicon.ico",
  "robots.txt",
  "sitemap.xml",
]);

/** Earlier typed documents stored under a version slug belong to this company. */
const COMPANY_ALIASES: Record<string, string> = { "jyp-v2": "jyp" };
export const companySlug = (slug: string) => COMPANY_ALIASES[slug] ?? slug;

type RepresentativeBase = {
  company: string;
  kind: CompanyKind;
  companyName: string;
  position: string;
  date: string;
  order: string;
  label: string;
  status: CompanyDocument["status"];
  pdfHref?: string;
  /** The document consumes the common body; no company-specific copy was authored. */
  mode?: "common";
};
export type Representative =
  | (RepresentativeBase & {
      kind: "resume";
      copy: ResumeCopy;
      presentation?: ResumePresentation;
    })
  | (RepresentativeBase & {
      kind: "career";
      content: ContentDocument;
    });
