import "server-only";

import { readFile } from "node:fs/promises";
import { resolve } from "node:path";

import {
  APPLICATION_STATUSES,
  DOCUMENT_ARTIFACT_KEYS,
  type ApplicationArtifactMode,
  type ApplicationArtifactState,
  type ApplicationAttemptProjection,
  type ApplicationProjectionState,
  type ApplicationWorkSession,
  type ApplicationStatus,
  type ArtifactReferenceMap,
  type ArtifactRevisionMap,
  type CommonDocumentArtifact,
  type CommonPackageProjection,
  type DocumentArtifactKey,
  type PackageCheckpoint,
  type SnapshotVerification,
  type SubmissionSnapshot,
  type WorkSessionState,
} from "./application-types";

const PROJECTION_PATH = resolve(
  process.cwd(),
  "..",
  "..",
  "output/application-workspace/application-attempts.json",
);

const ARTIFACT_STATES = new Set<ApplicationArtifactState>(["mutable", "approved", "frozen", "unknown"]);
const SNAPSHOT_VERIFICATIONS = new Set<SnapshotVerification>(["unknown", "partial", "verified"]);
const APPLICATION_STATUS_SET = new Set<ApplicationStatus>(APPLICATION_STATUSES);
const WORK_SESSION_STATES = new Set<WorkSessionState>(["active", "waiting-review", "paused", "complete", "unknown"]);
const ARTIFACT_MODES = new Set<ApplicationArtifactMode>(["common", "tailored", "omitted"]);
const COMMON_ARTIFACT_STATES = new Set<CommonDocumentArtifact["state"]>([
  "drafting",
  "review-ready",
  "active",
]);
const ARTIFACT_VISIBILITIES = new Set<CommonDocumentArtifact["visibility"]>(["local", "public"]);

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function optionalString(value: unknown) {
  return typeof value === "string" && value.trim() ? value : undefined;
}

function optionalNumber(value: unknown) {
  return typeof value === "number" && Number.isFinite(value) ? value : undefined;
}

function parseRevisionMap(value: unknown): ArtifactRevisionMap | undefined {
  if (!isRecord(value)) return undefined;
  const revisions: ArtifactRevisionMap = {};
  for (const artifact of DOCUMENT_ARTIFACT_KEYS) {
    const revision = optionalNumber(value[artifact]);
    if (revision !== undefined) revisions[artifact] = revision;
  }
  return Object.keys(revisions).length > 0 ? revisions : undefined;
}

function parseReferenceMap(value: unknown): ArtifactReferenceMap | undefined {
  if (!isRecord(value)) return undefined;
  const references: ArtifactReferenceMap = {};
  for (const artifact of DOCUMENT_ARTIFACT_KEYS) {
    const reference = optionalString(value[artifact]);
    if (reference) references[artifact] = reference;
  }
  return Object.keys(references).length > 0 ? references : undefined;
}

function parseCheckpoint(value: unknown): PackageCheckpoint | undefined {
  if (!isRecord(value)) return undefined;

  return {
    kind: optionalString(value.kind),
    packageRevision: optionalNumber(value.packageRevision),
    artifactRevisions: parseRevisionMap(value.artifactRevisions),
    checkpointAt: optionalString(value.checkpointAt),
  };
}

function parseSnapshot(value: unknown): SubmissionSnapshot | undefined {
  if (!isRecord(value)) return undefined;
  const verification = value.verification;
  if (typeof verification !== "string" || !SNAPSHOT_VERIFICATIONS.has(verification as SnapshotVerification)) {
    return undefined;
  }

  return {
    id: optionalString(value.id),
    verification: verification as SnapshotVerification,
    capturedAt: optionalString(value.capturedAt),
    submittedAt: optionalString(value.submittedAt),
    packageRevision: optionalNumber(value.packageRevision),
    artifactRevisions: parseRevisionMap(value.artifactRevisions),
    artifactRefs: parseReferenceMap(value.artifactRefs),
  };
}

function parseWorkSession(value: unknown): ApplicationWorkSession | undefined {
  if (!isRecord(value)) return undefined;
  const state = value.state;
  const scope = optionalString(value.scope);
  if (typeof state !== "string" || !WORK_SESSION_STATES.has(state as WorkSessionState) || !scope) {
    return undefined;
  }

  return {
    state: state as WorkSessionState,
    scope,
    lastSynced: optionalString(value.lastSynced),
    nextAction: optionalString(value.nextAction),
  };
}

function parseArtifacts(value: unknown): ApplicationAttemptProjection["artifacts"] {
  if (!isRecord(value)) return undefined;
  const artifacts: NonNullable<ApplicationAttemptProjection["artifacts"]> = {};
  for (const artifact of DOCUMENT_ARTIFACT_KEYS) {
    const raw = value[artifact];
    if (!isRecord(raw)) continue;
    const mode = raw.mode;
    if (typeof mode !== "string" || !ARTIFACT_MODES.has(mode as ApplicationArtifactMode)) continue;
    artifacts[artifact] = {
      mode: mode as ApplicationArtifactMode,
      route: optionalString(raw.route),
    };
  }
  return Object.keys(artifacts).length > 0 ? artifacts : undefined;
}

function parseCommonPackage(value: unknown): CommonPackageProjection | undefined {
  if (!isRecord(value) || value.id !== "common" || !isRecord(value.artifacts)) return undefined;
  const artifacts = {} as Record<DocumentArtifactKey, CommonDocumentArtifact>;
  for (const artifact of DOCUMENT_ARTIFACT_KEYS) {
    const raw = value.artifacts[artifact];
    if (!isRecord(raw)) return undefined;
    const state = raw.state;
    const visibility = raw.visibility;
    const route = optionalString(raw.route);
    if (
      raw.required !== true ||
      typeof state !== "string" ||
      !COMMON_ARTIFACT_STATES.has(state as CommonDocumentArtifact["state"]) ||
      typeof visibility !== "string" ||
      !ARTIFACT_VISIBILITIES.has(visibility as CommonDocumentArtifact["visibility"]) ||
      !route
    ) {
      return undefined;
    }
    artifacts[artifact] = {
      required: true,
      state: state as CommonDocumentArtifact["state"],
      route,
      visibility: visibility as CommonDocumentArtifact["visibility"],
    };
  }
  return { id: "common", artifacts };
}

function parseAttempt(value: unknown): ApplicationAttemptProjection | undefined {
  if (!isRecord(value)) return undefined;
  const id = optionalString(value.id);
  const company = optionalString(value.company);
  const role = optionalString(value.role);
  const sourcePath = optionalString(value.sourcePath);
  const status = value.status;
  const artifactState = value.artifactState;

  if (
    !id ||
    !company ||
    !role ||
    !sourcePath ||
    typeof status !== "string" ||
    !APPLICATION_STATUS_SET.has(status as ApplicationStatus) ||
    typeof artifactState !== "string" ||
    !ARTIFACT_STATES.has(artifactState as ApplicationArtifactState)
  ) {
    return undefined;
  }

  return {
    id,
    postingId: optionalString(value.postingId),
    company,
    role,
    status: status as ApplicationStatus,
    tracking: optionalString(value.tracking),
    artifactState: artifactState as ApplicationArtifactState,
    sourcePath,
    lastConfirmed: optionalString(value.lastConfirmed),
    artifacts: parseArtifacts(value.artifacts),
    current: parseCheckpoint(value.current),
    snapshot: parseSnapshot(value.snapshot),
    workSession: parseWorkSession(value.workSession),
  };
}

export async function loadApplicationProjection(): Promise<ApplicationProjectionState> {
  try {
    const source = await readFile(PROJECTION_PATH, "utf8");
    const parsed: unknown = JSON.parse(source);
    const rawAttempts = isRecord(parsed) ? parsed.attempts : undefined;
    const commonPackage = isRecord(parsed) ? parseCommonPackage(parsed.commonPackage) : undefined;

    if (!Array.isArray(rawAttempts) || !commonPackage) return { kind: "error" };

    const attempts = rawAttempts.map(parseAttempt);
    if (attempts.some((attempt) => !attempt)) return { kind: "error" };

    return {
      kind: "ready",
      attempts: attempts as ApplicationAttemptProjection[],
      commonPackage,
      generatedAt: isRecord(parsed) ? optionalString(parsed.generatedAt) : undefined,
    };
  } catch (error) {
    if (isRecord(error) && error.code === "ENOENT") return { kind: "missing" };
    return { kind: "error" };
  }
}
