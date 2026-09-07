export type DocumentStatus = "draft" | "review-ready" | "active";
export type DocumentVisibility = "local" | "public";

export type DocumentContact = {
  label: string;
  href?: string;
  external?: boolean;
};

export type CareerProject = {
  id: string;
  title: string;
  claimIds: readonly string[];
} & (
  | {
      context: string;
      role: string;
      problem: string;
      decision: string;
      implementation: readonly string[];
      verification: readonly string[];
      result: string;
      boundary?: string;
    }
  | {
      sections: readonly {
        title: string;
        paragraphs?: readonly string[];
        bullets?: readonly string[];
      }[];
    }
);

export type CareerCompany = {
  id: string;
  organization: string;
  period: string;
  role: string;
  summary: string | readonly string[];
  projects: readonly CareerProject[];
  claimIds: readonly string[];
};

export type CareerDescriptionDocument = {
  kind: "career-description";
  presentation?: "narrative";
  slug: string;
  companyName?: string;
  targetRole?: string;
  status: DocumentStatus;
  visibility: DocumentVisibility;
  locale: "ko";
  updatedAt: string;
  title: string;
  subtitle: string;
  name: string;
  role: string;
  contacts: readonly DocumentContact[];
  summary: readonly string[];
  companies: readonly CareerCompany[];
  skills: readonly {
    label: string;
    value: string;
  }[];
};

export type CvEmployment = {
  organization: string;
  period: string;
  role: string;
  highlights: readonly string[];
  claimIds: readonly string[];
};

export type CvDocument = {
  kind: "cv";
  slug: string;
  companyName?: string;
  targetRole?: string;
  status: DocumentStatus;
  visibility: DocumentVisibility;
  locale: "ko";
  updatedAt: string;
  title: string;
  name: string;
  role: string;
  contacts: readonly DocumentContact[];
  summary: string;
  employment: readonly CvEmployment[];
  projects: readonly {
    title: string;
    description: string;
    claimIds: readonly string[];
  }[];
  skills: readonly {
    label: string;
    value: string;
  }[];
  education: readonly string[];
  credentials: readonly string[];
};

export type ProfessionalDocument = CareerDescriptionDocument | CvDocument;
