export type ResumeTextTone = "strong" | "metric";

export type ResumeTextSegment = {
  text: string;
  tone?: ResumeTextTone;
};
export type ResumeText = string | readonly ResumeTextSegment[];

export type ResumeContact = {
  label: string;
  href?: string;
  external?: boolean;
};

export type ResumeCareer = {
  org: string;
  period: string;
  now?: boolean;
  role: ResumeText;
  details: readonly ResumeText[];
  claimIds?: readonly string[];
};

export type ResumeCapabilityDetail = {
  text: ResumeText;
  source?: string;
};

export type ResumeCapability = {
  no: string;
  title: string;
  claim: ResumeText;
  details: readonly ResumeCapabilityDetail[];
  claimIds?: readonly string[];
};

export type ResumeWorkStyle = {
  no: string;
  title: string;
  body: ResumeText;
  claimIds?: readonly string[];
};

export type ResumeSkill = {
  label: string;
  stack: string;
  via: string;
  claimIds?: readonly string[];
};

export type ResumeCredential = {
  period: string;
  text: string;
  claimIds?: readonly string[];
};

export type TailoredResume = {
  slug: string;
  companyName: string;
  position: string;
  status: "draft" | "approved";
  visibility: "local" | "public";
  updatedAt: string;
  pdfHref?: string;
  header: {
    name: string;
    role: string;
    careerLine: ResumeText;
    tagline: ResumeText;
    contacts: readonly ResumeContact[];
  };
  summary: readonly {
    text: ResumeText;
    claimIds?: readonly string[];
  }[];
  careers: readonly ResumeCareer[];
  capabilities: readonly ResumeCapability[];
  workStyles: readonly ResumeWorkStyle[];
  skills: readonly ResumeSkill[];
  credentials: readonly ResumeCredential[];
};
