export const APPLICATION_STATUSES = [
  "pre-apply",
  "in-progress",
  "accepted",
  "declined",
  "rejected",
  "unknown",
] as const;

export type ApplicationStatus = (typeof APPLICATION_STATUSES)[number];
export type ApplicationArtifactState = "mutable" | "approved" | "frozen" | "unknown";
export type SnapshotVerification = "unknown" | "partial" | "verified";
export type WorkSessionState = "active" | "waiting-review" | "paused" | "complete" | "unknown";
export const DOCUMENT_ARTIFACT_KEYS = [
  "resume",
  "career-description",
  "portfolio",
  "cv",
] as const;
export type DocumentArtifactKey = (typeof DOCUMENT_ARTIFACT_KEYS)[number];
export type ApplicationArtifactMode = "common" | "tailored" | "omitted";
export type ArtifactRevisionMap = Partial<Record<DocumentArtifactKey, number>>;
export type ArtifactReferenceMap = Partial<Record<DocumentArtifactKey, string>>;

export type ApplicationDocumentArtifact = {
  mode: ApplicationArtifactMode;
  route?: string;
};

export type CommonDocumentArtifact = {
  required: true;
  state: "drafting" | "review-ready" | "active";
  route: string;
  visibility: "local" | "public";
};

export type CommonPackageProjection = {
  id: "common";
  artifacts: Record<DocumentArtifactKey, CommonDocumentArtifact>;
};

export type PackageCheckpoint = {
  kind?: string;
  packageRevision?: number;
  artifactRevisions?: ArtifactRevisionMap;
  checkpointAt?: string;
};

export type SubmissionSnapshot = {
  id?: string;
  verification: SnapshotVerification;
  capturedAt?: string;
  submittedAt?: string;
  packageRevision?: number;
  artifactRevisions?: ArtifactRevisionMap;
  artifactRefs?: ArtifactReferenceMap;
};

export type ApplicationWorkSession = {
  state: WorkSessionState;
  scope: string;
  lastSynced?: string;
  nextAction?: string;
};

export type ApplicationAttemptProjection = {
  id: string;
  postingId?: string;
  company: string;
  role: string;
  status: ApplicationStatus;
  tracking?: string;
  artifactState: ApplicationArtifactState;
  sourcePath: string;
  lastConfirmed?: string;
  artifacts?: Partial<Record<DocumentArtifactKey, ApplicationDocumentArtifact>>;
  current?: PackageCheckpoint;
  snapshot?: SubmissionSnapshot;
  workSession?: ApplicationWorkSession;
};

export type ApplicationProjectionState =
  | {
      kind: "ready";
      attempts: ApplicationAttemptProjection[];
      commonPackage: CommonPackageProjection;
      generatedAt?: string;
    }
  | { kind: "missing" }
  | { kind: "error" };

export const APPLICATION_STATUS_LABEL: Record<ApplicationStatus, string> = {
  "pre-apply": "지원 전",
  "in-progress": "진행중",
  accepted: "합격",
  declined: "거절",
  rejected: "탈락",
  unknown: "상태 미확인",
};

export const ARTIFACT_STATE_LABEL: Record<ApplicationArtifactState, string> = {
  mutable: "수정 가능",
  approved: "승인됨",
  frozen: "동결됨",
  unknown: "확인 필요",
};

export const SNAPSHOT_VERIFICATION_LABEL: Record<SnapshotVerification, string> = {
  unknown: "검증 미상",
  partial: "일부 확인",
  verified: "검증 완료",
};

export const WORK_SESSION_STATE_LABEL: Record<WorkSessionState, string> = {
  active: "작업 중",
  "waiting-review": "검토 대기",
  paused: "일시 중지",
  complete: "범위 완료",
  unknown: "상태 미확인",
};

export const DOCUMENT_ARTIFACT_LABEL: Record<DocumentArtifactKey, string> = {
  resume: "이력서",
  "career-description": "경력기술서",
  portfolio: "포트폴리오",
  cv: "CV",
};

export const ARTIFACT_MODE_LABEL: Record<ApplicationArtifactMode, string> = {
  common: "Common 사용",
  tailored: "회사 맞춤",
  omitted: "이번 지원에서 제외",
};
