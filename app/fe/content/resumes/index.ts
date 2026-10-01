import { FEATURING_RESUME } from "./featuring";
import { GNA_COMPANY_RESUME } from "./gna-company";
import { HYPERNOVA_RESUME } from "./hypernova";
import { JYP_RESUME } from "./jyp";
import { MGRV_RESUME } from "./mgrv";
import { MIRIDIH_RESUME } from "./miridih";
import { PINOKIOLAB_RESUME } from "./pinokiolab";
import { TEAMREBOOT_RESUME } from "./teamreboot";
import { WHATSSUB_RESUME } from "./whatssub";
import type { TailoredResume } from "./types";

const TAILORED_RESUMES: Readonly<Record<string, TailoredResume>> = {
  [FEATURING_RESUME.slug]: FEATURING_RESUME,
  [GNA_COMPANY_RESUME.slug]: GNA_COMPANY_RESUME,
  [HYPERNOVA_RESUME.slug]: HYPERNOVA_RESUME,
  [JYP_RESUME.slug]: JYP_RESUME,
  [MGRV_RESUME.slug]: MGRV_RESUME,
  [MIRIDIH_RESUME.slug]: MIRIDIH_RESUME,
  [PINOKIOLAB_RESUME.slug]: PINOKIOLAB_RESUME,
  [TEAMREBOOT_RESUME.slug]: TEAMREBOOT_RESUME,
  [WHATSSUB_RESUME.slug]: WHATSSUB_RESUME,
};

export function getTailoredResume(slug: string) {
  return TAILORED_RESUMES[slug];
}

export function listTailoredResumes() {
  return Object.values(TAILORED_RESUMES).map((resume) => ({
    slug: resume.slug,
    label: `${resume.companyName} · ${resume.position}`,
    visibility: resume.visibility,
  }));
}
