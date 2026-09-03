import { FEATURING_RESUME } from "./featuring";
import { GNA_COMPANY_RESUME } from "./gna-company";
import { JYP_RESUME } from "./jyp";
import { MGRV_RESUME } from "./mgrv";
import { MIRIDIH_RESUME } from "./miridih";
import { PINOKIOLAB_RESUME } from "./pinokiolab";
import { ROLE_RESUMES } from "./role-variants";
import { TEAMREBOOT_RESUME } from "./teamreboot";
import { WHATSSUB_RESUME } from "./whatssub";
import type { TailoredResume } from "./types";

const TAILORED_RESUMES: Readonly<Record<string, TailoredResume>> = {
  [FEATURING_RESUME.slug]: FEATURING_RESUME,
  [GNA_COMPANY_RESUME.slug]: GNA_COMPANY_RESUME,
  [JYP_RESUME.slug]: JYP_RESUME,
  [MGRV_RESUME.slug]: MGRV_RESUME,
  [MIRIDIH_RESUME.slug]: MIRIDIH_RESUME,
  [PINOKIOLAB_RESUME.slug]: PINOKIOLAB_RESUME,
  [TEAMREBOOT_RESUME.slug]: TEAMREBOOT_RESUME,
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

export function listTailoredResumes() {
  return Object.values(TAILORED_RESUMES).map((resume) => ({
    slug: resume.slug,
    label: resume.roleVariant?.label ?? `${resume.companyName} · ${resume.position}`,
    visibility: resume.visibility,
  }));
}
