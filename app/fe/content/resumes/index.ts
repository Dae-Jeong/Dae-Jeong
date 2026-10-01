import { GNA_COMPANY_RESUME } from "./gna-company";
import { HYPERNOVA_RESUME } from "./hypernova";
import { MGRV_RESUME } from "./mgrv";
import { PINOKIOLAB_RESUME } from "./pinokiolab";
import { TEAMREBOOT_RESUME } from "./teamreboot";
import { WHATSSUB_RESUME } from "./whatssub";
import type { TailoredResume } from "./types";

const TAILORED_RESUMES: Readonly<Record<string, TailoredResume>> = {
  [GNA_COMPANY_RESUME.slug]: GNA_COMPANY_RESUME,
  [HYPERNOVA_RESUME.slug]: HYPERNOVA_RESUME,
  [MGRV_RESUME.slug]: MGRV_RESUME,
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
