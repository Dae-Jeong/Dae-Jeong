import { COMMON_CAREER_DESCRIPTION } from "./common";
import { HYPERNOVA_CAREER_DESCRIPTION } from "./hypernova";
import type { CareerDescriptionDocument } from "./types";

const CAREER_DOCUMENTS: Record<string, CareerDescriptionDocument> = {
  common: COMMON_CAREER_DESCRIPTION,
  hypernova: HYPERNOVA_CAREER_DESCRIPTION,
};

export function getCareerDescription(slug = "common") {
  return CAREER_DOCUMENTS[slug];
}

export function listCareerDescriptions() {
  return Object.entries(CAREER_DOCUMENTS).map(([slug, document]) => ({
    slug,
    label: document.title,
    visibility: document.visibility,
  }));
}

export type {
  CareerCompany,
  CareerDescriptionDocument,
  CareerProject,
  DocumentContact,
} from "./types";

