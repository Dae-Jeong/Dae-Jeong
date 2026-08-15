import { GNA_COMPANY_RESUME } from "./gna-company";
import type { TailoredResume } from "./types";

const TAILORED_RESUMES: Readonly<Record<string, TailoredResume>> = {
  [GNA_COMPANY_RESUME.slug]: GNA_COMPANY_RESUME,
};

export function getTailoredResume(slug: string) {
  return TAILORED_RESUMES[slug];
}

export function canViewTailoredResume(resume: TailoredResume) {
  if (process.env.NODE_ENV !== "production") return true;
  return resume.visibility === "public";
}
