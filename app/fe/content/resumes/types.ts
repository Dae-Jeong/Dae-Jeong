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

export type ResumeOutcomeEvidence = {
  text: ResumeText;
  source?: string;
};

export type ResumeOutcomeDescriptionItem = ResumeText | ResumeOutcomeEvidence;

export type ResumeOutcome = {
  no: string;
  title: string;
  description: readonly ResumeOutcomeDescriptionItem[];
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

export type ResumeExternalActivity = {
  label: string;
  title: string;
  description: string;
  outcome: string;
  claimIds?: readonly string[];
};

export type ResumeRoleVariant = {
  label: string;
  shortLabel: string;
  description: string;
  signals: readonly string[];
};

export type ResumeSectionKey =
  | "profile"
  | "outcomes"
  | "career"
  | "workStyles"
  | "skills"
  | "externalActivities"
  | "credentials";

export type TailoredResume = {
  slug: string;
  companyName: string;
  position: string;
  roleVariant?: ResumeRoleVariant;
  sectionOrder?: readonly ResumeSectionKey[];
  status: "draft" | "approved" | "closed";
  visibility: "local" | "public";
  updatedAt: string;
  /** UI revision. 3 = 2026-09-02 A안(문서형): 사진·섹션 번호 없음, 소개는 header에 흡수, 성과 → 경력 순서. registry artifact_revisions와 맞춘다. */
  /** "compact" = 인쇄에서 성과·기술 블록을 통째로 넘기지 않고 흐르게 한다 (짧은 압축층 이력서용, 2026-09-03). */
  printFlow?: "compact";
  pdfHref?: string;
  header: {
    name: string;
    role: string;
    photoSrc?: string;
    careerLine: ResumeText;
    contacts: readonly ResumeContact[];
    submissionMeta?: string;
  };
  summary: readonly {
    text: ResumeText;
    claimIds?: readonly string[];
  }[];
  careers: readonly ResumeCareer[];
  outcomes: readonly ResumeOutcome[];
  workStyles: readonly ResumeWorkStyle[];
  skills: readonly ResumeSkill[];
  externalActivities?: readonly ResumeExternalActivity[];
  credentials: readonly ResumeCredential[];
};
