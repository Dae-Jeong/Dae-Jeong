import { COMMON_CAREER_DESCRIPTION, COMMON_CV } from "./common";
import { FEATURING_CAREER_DESCRIPTION } from "./featuring";
import { JYP_CAREER_DESCRIPTION } from "./jyp";
import type { CareerDescriptionDocument, CvDocument } from "./types";

const CAREER_DOCUMENTS: Record<string, CareerDescriptionDocument> = {
  common: COMMON_CAREER_DESCRIPTION,
  jyp: JYP_CAREER_DESCRIPTION,
  featuring: FEATURING_CAREER_DESCRIPTION,
};

const CV_DOCUMENTS: Record<string, CvDocument> = {
  common: COMMON_CV,
};

export function getCareerDescription(slug = "common") {
  return CAREER_DOCUMENTS[slug];
}

export function getCv(slug = "common") {
  return CV_DOCUMENTS[slug];
}

export function canViewDocument(document: CareerDescriptionDocument | CvDocument) {
  return process.env.NODE_ENV !== "production" || document.visibility === "public";
}

export function listCareerDescriptions() {
  return Object.entries(CAREER_DOCUMENTS).map(([slug, document]) => ({
    slug,
    label: document.title,
    visibility: document.visibility,
  }));
}

export function listCvs() {
  return Object.entries(CV_DOCUMENTS).map(([slug, document]) => ({
    slug,
    label: document.title,
    visibility: document.visibility,
  }));
}

export type {
  CareerCompany,
  CareerDescriptionDocument,
  CareerProject,
  CvDocument,
  DocumentContact,
  ProfessionalDocument,
} from "./types";
