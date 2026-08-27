import { GNA_COMPANY_RESUME } from "./gna-company";
import { MGRV_RESUME } from "./mgrv";
import { PINOKIOLAB_RESUME } from "./pinokiolab";
import { ROLE_RESUMES } from "./role-variants";
import { WHATSSUB_RESUME } from "./whatssub";
import type { TailoredResume } from "./types";

const TAILORED_RESUMES: Readonly<Record<string, TailoredResume>> = {
  [GNA_COMPANY_RESUME.slug]: GNA_COMPANY_RESUME,
  [MGRV_RESUME.slug]: MGRV_RESUME,
  [PINOKIOLAB_RESUME.slug]: PINOKIOLAB_RESUME,
  [WHATSSUB_RESUME.slug]: WHATSSUB_RESUME,
  ...Object.fromEntries(ROLE_RESUMES.map((resume) => [resume.slug, resume])),
};

export function getTailoredResume(slug: string) {
  return TAILORED_RESUMES[slug];
}

export function canViewTailoredResume(resume: TailoredResume) {
  if (process.env.NODE_ENV !== "production") return true;
  return resume.visibility === "public";
}

export function listRoleResumes() {
  return ROLE_RESUMES.map((resume) => ({
    slug: resume.slug,
    label: resume.roleVariant?.label ?? resume.position,
    shortLabel: resume.roleVariant?.shortLabel ?? resume.position,
    description: resume.roleVariant?.description ?? "",
    signals: resume.roleVariant?.signals ?? [],
  }));
}
