"use client";

import { useState } from "react";

import { cn } from "@/lib/cn";

import { ApplicationStatusText } from "./application-list";
import {
  APPLICATION_STATUS_LABEL,
  ARTIFACT_MODE_LABEL,
  ARTIFACT_STATE_LABEL,
  DOCUMENT_ARTIFACT_KEYS,
  DOCUMENT_ARTIFACT_LABEL,
  SNAPSHOT_VERIFICATION_LABEL,
  WORK_SESSION_STATE_LABEL,
  type ApplicationAttemptProjection,
} from "./application-types";

type ApplicationDetailProps = {
  attempt: ApplicationAttemptProjection;
  onBack?: () => void;
};

function RevisionValue({ label, value }: { label: string; value?: number }) {
  return (
    <div>
      <p className="font-mono text-xs tracking-[0.08em] text-muted">{label}</p>
      <p className="mt-1.5 text-sm text-fg-2">{value === undefined ? "버전 미상" : `r${value}`}</p>
    </div>
  );
}

function ArtifactSurface({
  artifact,
  mode,
  href,
  revision,
}: {
  artifact: (typeof DOCUMENT_ARTIFACT_KEYS)[number];
  mode?: "common" | "tailored" | "omitted";
  href?: string;
  revision?: number;
}) {
  if (!mode) {
    return (
      <div className="grid gap-2 border-t border-border-soft py-4 first:border-t-0 md:grid-cols-[160px_170px_minmax(0,1fr)_90px] md:items-center">
        <p className="text-sm font-semibold">{DOCUMENT_ARTIFACT_LABEL[artifact]}</p>
        <p className="font-mono text-xs text-muted">상태 미확인</p>
        <p className="text-sm text-muted">기존 package에 대한 artifact 기록이 없습니다.</p>
        <p className="font-mono text-xs text-muted md:text-right">버전 미상</p>
      </div>
    );
  }

  const omitted = mode === "omitted";
  return (
    <div className="grid gap-2 border-t border-border-soft py-4 first:border-t-0 md:grid-cols-[160px_170px_minmax(0,1fr)_90px] md:items-center">
      <p className="text-sm font-semibold">{DOCUMENT_ARTIFACT_LABEL[artifact]}</p>
      <p className="font-mono text-xs text-muted">{ARTIFACT_MODE_LABEL[mode]}</p>
      {href && !omitted ? (
        <a
          href={href}
          target="_blank"
          rel="noreferrer"
          className="focus-ring inline-flex min-h-11 items-center font-mono text-sm text-fg underline decoration-border underline-offset-4 hover:decoration-fg"
        >
          {href} ↗
        </a>
      ) : (
        <p className="text-sm text-muted">
          {omitted ? "이번 지원 package에는 포함하지 않습니다." : "local route 준비 전입니다."}
        </p>
      )}
      <p className="font-mono text-xs text-muted md:text-right">
        {revision === undefined ? "버전 미상" : `r${revision}`}
      </p>
    </div>
  );
}

export function ApplicationDetail({ attempt, onBack }: ApplicationDetailProps) {
  const [copyState, setCopyState] = useState<"idle" | "done" | "failed">("idle");
  const [historyOpen, setHistoryOpen] = useState(false);
  const checkpoint = attempt.current;
  const snapshot = attempt.snapshot;
  const isFrozen = attempt.artifactState === "frozen";
  const isLegacyImport = checkpoint?.kind === "legacy-import";
  const hasSnapshotDetails = Boolean(
    snapshot &&
      (snapshot.id ||
        snapshot.capturedAt ||
        snapshot.submittedAt ||
        snapshot.packageRevision !== undefined ||
        Object.keys(snapshot.artifactRevisions ?? {}).length > 0 ||
        Object.keys(snapshot.artifactRefs ?? {}).length > 0),
  );

  async function copySourcePath() {
    try {
      await navigator.clipboard.writeText(attempt.sourcePath);
      setCopyState("done");
    } catch {
      setCopyState("failed");
    }
  }

  return (
    <article className="min-w-0 scroll-mt-36 pb-20 pt-5 lg:px-10 lg:pb-28 lg:pt-10 xl:px-14">
      {onBack && (
        <button
          type="button"
          onClick={onBack}
          className="focus-ring mb-5 inline-flex min-h-11 items-center font-mono text-xs text-muted hover:text-fg lg:hidden"
        >
          ← 지원 목록으로
        </button>
      )}

      <header className="border-b border-border pb-7">
        <div className="flex flex-wrap items-start justify-between gap-5">
          <div className="min-w-0">
            <ApplicationStatusText status={attempt.status} />
            <p className="mt-5 text-base font-semibold">{attempt.company}</p>
            <h2 className="mt-1 max-w-[26ch] text-3xl font-semibold leading-[1.12] tracking-[-0.035em] text-balance">
              {attempt.role}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-fg-2">
              {attempt.tracking ?? "세부 진행 위치를 아직 확인하지 않았습니다."}
            </p>
          </div>
          <p className="font-mono text-xs text-muted">
            {attempt.lastConfirmed ? `마지막 확인 · ${attempt.lastConfirmed}` : "마지막 확인일 미상"}
          </p>
        </div>
      </header>

      <section className="grid border-b border-border-soft md:grid-cols-2 xl:grid-cols-4">
        <div className="border-border-soft py-4 md:pr-4 xl:pr-5">
          <p className="font-mono text-xs tracking-[0.08em] text-muted">STATUS</p>
          <p className="mt-1.5 text-sm text-fg-2">{APPLICATION_STATUS_LABEL[attempt.status]}</p>
        </div>
        <div className="border-t border-border-soft py-4 md:border-l md:border-t-0 md:px-4 xl:px-5">
          <p className="font-mono text-xs tracking-[0.08em] text-muted">ARTIFACT</p>
          <p className="mt-1.5 text-sm text-fg-2">{ARTIFACT_STATE_LABEL[attempt.artifactState]}</p>
        </div>
        <div className="border-t border-border-soft py-4 md:px-4 xl:border-l xl:border-t-0 xl:px-5">
          <p className="font-mono text-xs tracking-[0.08em] text-muted">CHECKPOINT</p>
          <p className="mt-1.5 text-sm text-fg-2">
            {checkpoint?.packageRevision === undefined ? "미발급 또는 legacy" : `Package r${checkpoint.packageRevision}`}
          </p>
        </div>
        <div className="border-t border-border-soft py-4 md:border-l md:px-4 xl:px-5">
          <p className="font-mono text-xs tracking-[0.08em] text-muted">SNAPSHOT</p>
          <p className="mt-1.5 text-sm text-fg-2">{snapshot?.id ?? (isFrozen ? "legacy · exact revision unknown" : "미생성")}</p>
        </div>
      </section>

      <div className="mt-9 grid gap-10">
        {attempt.workSession && (
          <section>
            <div className="flex flex-wrap items-baseline justify-between gap-3 border-b border-border-soft pb-2.5">
              <div className="flex items-baseline gap-3">
                <span className="font-mono text-xs text-muted">WORK</span>
                <h3 className="text-lg font-semibold tracking-[-0.015em]">작업 세션</h3>
              </div>
              <span className="font-mono text-xs text-muted">
                {WORK_SESSION_STATE_LABEL[attempt.workSession.state]}
              </span>
            </div>
            <div className="mt-4 grid gap-4 md:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)]">
              <div>
                <p className="font-mono text-xs tracking-[0.08em] text-muted">SCOPE</p>
                <p className="mt-1.5 text-sm leading-relaxed text-fg-2">{attempt.workSession.scope}</p>
              </div>
              <div>
                <p className="font-mono text-xs tracking-[0.08em] text-muted">NEXT ACTION</p>
                <p className="mt-1.5 text-sm leading-relaxed text-fg-2">
                  {attempt.workSession.nextAction ?? "다음 작업을 아직 확정하지 않았습니다."}
                </p>
              </div>
            </div>
            <p className="mt-3 font-mono text-xs text-muted">
              {attempt.workSession.lastSynced
                ? `마지막 동기화 · ${attempt.workSession.lastSynced}`
                : "마지막 동기화 시점 미상"}
            </p>
          </section>
        )}

        <section>
          <div className="flex items-baseline gap-3 border-b border-border-soft pb-2.5">
            <span className="font-mono text-xs text-muted">01</span>
            <h3 className="text-lg font-semibold tracking-[-0.015em]">현재 checkpoint</h3>
          </div>
          {isLegacyImport ? (
            <p className="mt-4 text-sm leading-relaxed text-muted">
              기존 지원본을 보존한 기록입니다. 당시 Package와 UI revision은 확인 전까지 추정하지 않습니다.
            </p>
          ) : checkpoint ? (
            <div className="mt-4 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
              <RevisionValue label="PACKAGE" value={checkpoint.packageRevision} />
              {DOCUMENT_ARTIFACT_KEYS.map((artifact) => (
                <RevisionValue
                  key={artifact}
                  label={DOCUMENT_ARTIFACT_LABEL[artifact].toUpperCase()}
                  value={checkpoint.artifactRevisions?.[artifact]}
                />
              ))}
              <div className="sm:col-span-2 xl:col-span-4">
                <p className="font-mono text-xs tracking-[0.08em] text-muted">CHECKPOINT AT</p>
                <p className="mt-1.5 text-sm text-fg-2">{checkpoint.checkpointAt ?? "확인일 미상"}</p>
              </div>
            </div>
          ) : (
            <p className="mt-4 text-sm leading-relaxed text-muted">
              아직 review checkpoint가 발급되지 않았습니다.
            </p>
          )}
        </section>

        <section>
          <div className="flex items-baseline gap-3 border-b border-border-soft pb-2.5">
            <span className="font-mono text-xs text-muted">02</span>
            <h3 className="text-lg font-semibold tracking-[-0.015em]">지원 표면</h3>
          </div>
          <div className="mt-4 border-y border-border-soft">
            {DOCUMENT_ARTIFACT_KEYS.map((artifact) => (
              <ArtifactSurface
                key={artifact}
                artifact={artifact}
                mode={attempt.artifacts?.[artifact]?.mode}
                href={attempt.artifacts?.[artifact]?.route}
                revision={checkpoint?.artifactRevisions?.[artifact]}
              />
            ))}
          </div>
        </section>

        <section>
          <div className="flex items-baseline gap-3 border-b border-border-soft pb-2.5">
            <span className="font-mono text-xs text-muted">03</span>
            <h3 className="text-lg font-semibold tracking-[-0.015em]">제출 Snapshot</h3>
          </div>
          {snapshot && hasSnapshotDetails ? (
            <div className={cn("mt-4 border border-border-soft px-4 py-4", isFrozen && "border-fg")}>
              <div className="flex flex-wrap items-center justify-between gap-3">
                <p className="text-sm font-semibold">{snapshot.id ?? "Snapshot ID 미상"}</p>
                <p className="font-mono text-xs text-muted">{SNAPSHOT_VERIFICATION_LABEL[snapshot.verification]}</p>
              </div>
              <div className="mt-4 grid gap-4 text-sm text-fg-2 md:grid-cols-3">
                <p>보존 시점 · {snapshot.capturedAt ?? "확인 필요"}</p>
                <p>제출일 · {snapshot.submittedAt ?? "확인 필요"}</p>
                <p>Package {snapshot.packageRevision === undefined ? "미상" : `r${snapshot.packageRevision}`}</p>
              </div>
              {(Object.keys(snapshot.artifactRevisions ?? {}).length > 0 ||
                Object.keys(snapshot.artifactRefs ?? {}).length > 0) && (
                <div className="mt-4 border-t border-border-soft pt-4">
                  {DOCUMENT_ARTIFACT_KEYS.map((artifact) => {
                    const revision = snapshot.artifactRevisions?.[artifact];
                    const reference = snapshot.artifactRefs?.[artifact];
                    if (revision === undefined && !reference) return null;
                    return (
                      <div
                        key={artifact}
                        className="grid gap-1 border-t border-border-soft py-2 first:border-t-0 md:grid-cols-[160px_90px_minmax(0,1fr)]"
                      >
                        <p className="text-sm font-medium">{DOCUMENT_ARTIFACT_LABEL[artifact]}</p>
                        <p className="font-mono text-xs text-muted">
                          {revision === undefined ? "버전 미상" : `r${revision}`}
                        </p>
                        <p className="break-all font-mono text-xs text-muted">{reference ?? "artifact ref 미상"}</p>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          ) : (
            <p className="mt-4 text-sm leading-relaxed text-muted">
              {isFrozen
                ? "동결된 legacy 제출본입니다. 정확한 Snapshot 조합과 제출 artifact는 확인 전까지 추정하지 않습니다."
                : "아직 제출 Snapshot이 없습니다. 제출 시점의 조합만 별도로 보존합니다."}
            </p>
          )}
        </section>

        <section>
          <div className="flex items-baseline gap-3 border-b border-border-soft pb-2.5">
            <span className="font-mono text-xs text-muted">04</span>
            <h3 className="text-lg font-semibold tracking-[-0.015em]">출처와 이력</h3>
          </div>
          <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-b border-border-soft pb-4">
            <code className="min-w-0 break-all font-mono text-xs text-fg-2">{attempt.sourcePath}</code>
            <button
              type="button"
              onClick={copySourcePath}
              className="focus-ring min-h-11 shrink-0 border border-border px-3 font-mono text-xs text-fg transition-colors hover:border-fg"
            >
              경로 복사
            </button>
          </div>
          <p aria-live="polite" className="mt-2 min-h-5 text-xs text-muted">
            {copyState === "done" && "source path를 복사했습니다."}
            {copyState === "failed" && "복사할 수 없습니다. 경로를 직접 선택해 복사하세요."}
          </p>
          <button
            type="button"
            onClick={() => setHistoryOpen((open) => !open)}
            aria-expanded={historyOpen}
            className="focus-ring mt-2 inline-flex min-h-11 items-center font-mono text-xs text-muted hover:text-fg"
          >
            {historyOpen ? "이력 접기" : "이력 보기"}
          </button>
          {historyOpen && (
            <p className="mt-2 text-sm leading-relaxed text-muted">
              이 projection은 현재 checkpoint와 제출 Snapshot만 제공합니다. 세부 변경 이력은 source 문서에서 확인합니다.
            </p>
          )}
        </section>
      </div>
    </article>
  );
}
