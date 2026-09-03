"use client";

import { useMemo, useRef, useState, useSyncExternalStore } from "react";
import {
  APPLICATION_POSTINGS,
  APPLICATION_TRACKS,
  type ApplicationPosting,
  type ApplicationPriority,
} from "@/content/applications";
import { cn } from "@/lib/cn";
import { ApplicationDetail } from "./application-detail";
import { ApplicationList } from "./application-list";
import {
  APPLICATION_STATUSES,
  APPLICATION_STATUS_LABEL,
  DOCUMENT_ARTIFACT_KEYS,
  DOCUMENT_ARTIFACT_LABEL,
  type ApplicationAttemptProjection,
  type ApplicationProjectionState,
  type ApplicationStatus,
} from "./application-types";

type ApplicationStage =
  | "watching"
  | "tailoring"
  | "ready"
  | "applied"
  | "interview"
  | "offer";

type ChecklistKey = "rechecked" | "resume" | "portfolio" | "submitted";

type PostingState = {
  stage: ApplicationStage;
  note: string;
  checklist: Partial<Record<ChecklistKey, boolean>>;
};

type WorkspaceState = Record<string, PostingState>;

const STORAGE_KEY = "daejeong.application-workspace.v1";
const STORAGE_EVENT = "daejeong-application-workspace-change";
const VIEW_EVENT = "daejeong-application-workspace-view-change";
const DEFAULT_POSTING_STATE: PostingState = {
  stage: "watching",
  note: "",
  checklist: {},
};

const STAGES: { value: ApplicationStage; label: string }[] = [
  { value: "watching", label: "검토 중" },
  { value: "tailoring", label: "서류 작업" },
  { value: "ready", label: "제출 준비" },
  { value: "applied", label: "지원 완료" },
  { value: "interview", label: "인터뷰" },
  { value: "offer", label: "오퍼" },
];

const CHECKLIST: { key: ChecklistKey; label: string; hint: string }[] = [
  { key: "rechecked", label: "공고 상태 재확인", hint: "원문에서 지원 버튼과 조건을 다시 확인" },
  { key: "resume", label: "이력서 맞춤", hint: "추천 사례·키워드·경력 표현 반영" },
  { key: "portfolio", label: "포트폴리오 선택", hint: "JD에 맞는 사례 링크만 연결" },
  { key: "submitted", label: "지원 제출", hint: "제출일과 회신 채널을 메모에 기록" },
];

const PRIORITY_COPY: Record<ApplicationPriority, string> = {
  A: "우선 지원",
  B: "조건부",
  C: "실사 우선",
};

function getPostingState(workspace: WorkspaceState, id: string): PostingState {
  return workspace[id] ?? DEFAULT_POSTING_STATE;
}

function readWorkspaceSnapshot() {
  return window.localStorage.getItem(STORAGE_KEY) ?? "{}";
}

function subscribeToWorkspace(onStoreChange: () => void) {
  window.addEventListener("storage", onStoreChange);
  window.addEventListener(STORAGE_EVENT, onStoreChange);
  return () => {
    window.removeEventListener("storage", onStoreChange);
    window.removeEventListener(STORAGE_EVENT, onStoreChange);
  };
}

function readWorkspaceView(): WorkspaceView {
  return new URLSearchParams(window.location.search).get("view") === "manage" ? "manage" : "explore";
}

function subscribeToWorkspaceView(onStoreChange: () => void) {
  window.addEventListener("popstate", onStoreChange);
  window.addEventListener(VIEW_EVENT, onStoreChange);
  return () => {
    window.removeEventListener("popstate", onStoreChange);
    window.removeEventListener(VIEW_EVENT, onStoreChange);
  };
}

function parseWorkspace(snapshot: string): WorkspaceState {
  try {
    return JSON.parse(snapshot) as WorkspaceState;
  } catch {
    return {};
  }
}

function daysSince(date: string) {
  const checked = new Date(`${date}T00:00:00+09:00`).getTime();
  return Math.max(0, Math.floor((Date.now() - checked) / 86_400_000));
}

function PriorityMark({ priority }: { priority: ApplicationPriority }) {
  return (
    <span
      className={cn(
        "inline-flex h-6 min-w-6 items-center justify-center border px-1.5 font-mono text-xs font-semibold",
        priority === "A" && "border-fg bg-fg text-bg",
        priority === "B" && "border-border bg-surface text-fg",
        priority === "C" && "border-border-soft text-muted",
      )}
      aria-label={`${priority} 우선순위`}
    >
      {priority}
    </span>
  );
}

function ArrowUpRight() {
  return (
    <svg aria-hidden viewBox="0 0 16 16" className="size-4 fill-none stroke-current" strokeWidth="1.5">
      <path d="M4 12 12 4M6 4h6v6" />
    </svg>
  );
}

function SectionTitle({ index, children }: { index: string; children: React.ReactNode }) {
  return (
    <div className="flex items-baseline gap-3 border-b border-border-soft pb-2.5">
      <span className="font-mono text-xs text-muted">{index}</span>
      <h3 className="text-lg font-semibold tracking-[-0.015em]">{children}</h3>
    </div>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="mt-3 grid list-none gap-2 p-0 text-sm leading-relaxed text-fg-2">
      {items.map((item) => (
        <li key={item} className="grid grid-cols-[12px_1fr] gap-2">
          <span aria-hidden className="mt-[0.7em] h-px bg-border" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

type WorkspaceView = "explore" | "manage";

function ApplicationManagement({ projection }: { projection: ApplicationProjectionState }) {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<"ALL" | ApplicationStatus>("ALL");
  const [selectedId, setSelectedId] = useState<string>();
  const [mobileDetailOpen, setMobileDetailOpen] = useState(false);
  const listRef = useRef<HTMLElement>(null);
  const detailRef = useRef<HTMLDivElement>(null);

  const attempts = useMemo(() => (projection.kind === "ready" ? projection.attempts : []), [projection]);
  const filtered = useMemo(() => {
    const needle = query.trim().toLocaleLowerCase("ko-KR");
    return attempts.filter((attempt) => {
      const matchesStatus = status === "ALL" || attempt.status === status;
      const haystack = `${attempt.company} ${attempt.role} ${attempt.tracking ?? ""}`.toLocaleLowerCase("ko-KR");
      return matchesStatus && (!needle || haystack.includes(needle));
    });
  }, [attempts, query, status]);
  const selected = filtered.find((attempt) => attempt.id === selectedId) ?? filtered[0];

  function chooseAttempt(attempt: ApplicationAttemptProjection) {
    setSelectedId(attempt.id);
    if (window.matchMedia("(max-width: 1023px)").matches) {
      setMobileDetailOpen(true);
      window.requestAnimationFrame(() => detailRef.current?.scrollIntoView({ behavior: "smooth" }));
    }
  }

  if (projection.kind === "missing") {
    return (
      <section className="mx-auto w-full max-w-[1440px] px-4 py-16 md:px-7 lg:px-9">
        <p className="font-mono text-xs uppercase tracking-[0.12em] text-muted">Local projection</p>
        <h2 className="mt-3 text-2xl font-semibold tracking-[-0.025em]">지원 관리 projection을 아직 찾을 수 없습니다.</h2>
        <p className="mt-4 max-w-[62ch] text-sm leading-relaxed text-fg-2">
          registry에서 생성한 local projection만 이 화면에 표시합니다. application을 새로 만들거나 상태를 바꾸려면 wiki workflow에서 먼저 갱신하세요.
        </p>
      </section>
    );
  }

  if (projection.kind === "error") {
    return (
      <section className="mx-auto w-full max-w-[1440px] px-4 py-16 md:px-7 lg:px-9">
        <p className="font-mono text-xs uppercase tracking-[0.12em] text-danger">Projection unavailable</p>
        <h2 className="mt-3 text-2xl font-semibold tracking-[-0.025em]">지원 관리 데이터를 읽을 수 없습니다.</h2>
        <p className="mt-4 max-w-[62ch] text-sm leading-relaxed text-fg-2">
          임의의 fallback으로 상태를 표시하지 않았습니다. registry와 generated projection의 형식을 확인한 뒤 다시 생성하세요.
        </p>
      </section>
    );
  }

  if (attempts.length === 0) {
    return (
      <section className="mx-auto w-full max-w-[1440px] px-4 py-16 md:px-7 lg:px-9">
        <p className="font-mono text-xs uppercase tracking-[0.12em] text-muted">Application management</p>
        <h2 className="mt-3 text-2xl font-semibold tracking-[-0.025em]">관리 중인 지원이 없습니다.</h2>
        <p className="mt-4 max-w-[62ch] text-sm leading-relaxed text-fg-2">
          지원하기로 정한 공고는 agent/wiki workflow에서 application attempt로 시작합니다. 이 화면에서는 상태를 직접 만들거나 수정하지 않습니다.
        </p>
      </section>
    );
  }

  return (
    <section className="mx-auto w-full max-w-[1440px] px-4 pb-8 pt-8 md:px-7 lg:px-9 lg:pt-10">
      <div className="flex flex-wrap items-end justify-between gap-5 border-b border-border pb-5">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.12em] text-muted">Application management · read only</p>
          <h2 className="mt-2 text-2xl font-semibold tracking-[-0.025em]">회사별 지원 상태</h2>
        </div>
        <p className="font-mono text-xs text-muted">{filtered.length} / {attempts.length} attempts</p>
      </div>

      <section className="mt-5 border-y border-border-soft" aria-labelledby="common-package-title">
        <div className="grid gap-4 py-4 md:grid-cols-[220px_minmax(0,1fr)] md:items-center">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.1em] text-muted">Common package</p>
            <h3 id="common-package-title" className="mt-1 text-base font-semibold">
              기본 지원 문서 4종
            </h3>
          </div>
          <div className="grid divide-y divide-border-soft border-y border-border-soft sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-4">
            {DOCUMENT_ARTIFACT_KEYS.map((artifact) => {
              const config = projection.commonPackage.artifacts[artifact];
              return (
                <a
                  key={artifact}
                  href={config.route}
                  target="_blank"
                  rel="noreferrer"
                  className="focus-ring min-w-0 px-4 py-3 transition-colors hover:bg-surface"
                >
                  <span className="block text-sm font-medium">{DOCUMENT_ARTIFACT_LABEL[artifact]}</span>
                  <span className="mt-1 block font-mono text-xs text-muted">
                    {config.state} · {config.visibility}
                  </span>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      <div className="mt-4 flex flex-col gap-3 border-b border-border-soft pb-4 md:flex-row md:items-center">
        <label className="relative min-w-0 flex-1 lg:max-w-[420px]">
          <span className="sr-only">회사, 직무, tracking 검색</span>
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="회사, 직무, tracking 검색"
            className="focus-ring h-11 w-full border border-border bg-bg px-3 text-sm outline-none placeholder:text-muted"
          />
        </label>
        <label className="min-w-[180px]">
          <span className="sr-only">지원 상태</span>
          <select
            value={status}
            onChange={(event) => setStatus(event.target.value as "ALL" | ApplicationStatus)}
            className="focus-ring h-11 w-full border border-border bg-bg px-3 font-mono text-xs text-fg outline-none"
          >
            <option value="ALL">전체 상태</option>
            {APPLICATION_STATUSES.map((value) => (
              <option key={value} value={value}>
                {APPLICATION_STATUS_LABEL[value]}
              </option>
            ))}
          </select>
        </label>
      </div>

      {filtered.length === 0 ? (
        <div className="py-14 text-center">
          <p className="text-sm font-medium">조건에 맞는 지원이 없습니다.</p>
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setStatus("ALL");
            }}
            className="focus-ring mt-3 min-h-11 font-mono text-xs text-muted underline underline-offset-4 hover:text-fg"
          >
            필터 초기화
          </button>
        </div>
      ) : (
        <div className="grid items-start lg:grid-cols-[350px_minmax(0,1fr)]">
          <aside
            ref={listRef}
            className={cn(
              "border-border-soft lg:sticky lg:top-[70px] lg:max-h-[calc(100vh-70px)] lg:overflow-y-auto lg:border-r",
              mobileDetailOpen && "max-lg:hidden",
            )}
            aria-label="지원 목록"
          >
            <ApplicationList attempts={filtered} selectedId={selected?.id} onSelect={chooseAttempt} />
          </aside>
          <div ref={detailRef} className={cn(!mobileDetailOpen && "max-lg:hidden")}>
            {selected && (
              <ApplicationDetail
                attempt={selected}
                onBack={() => {
                  setMobileDetailOpen(false);
                  window.requestAnimationFrame(() => listRef.current?.scrollIntoView({ behavior: "smooth" }));
                }}
              />
            )}
          </div>
        </div>
      )}
    </section>
  );
}

export function ApplicationWorkspace({ projection }: { projection: ApplicationProjectionState }) {
  const view = useSyncExternalStore(subscribeToWorkspaceView, readWorkspaceView, () => "explore");
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const [query, setQuery] = useState("");
  const [priority, setPriority] = useState<"ALL" | ApplicationPriority>("ALL");
  const [track, setTrack] = useState("ALL");
  const [selectedId, setSelectedId] = useState(APPLICATION_POSTINGS[0].id);
  const [mobileDetailOpen, setMobileDetailOpen] = useState(false);
  const listRef = useRef<HTMLElement>(null);
  const detailRef = useRef<HTMLElement>(null);
  const workspaceSnapshot = useSyncExternalStore(
    subscribeToWorkspace,
    readWorkspaceSnapshot,
    () => "{}",
  );
  const workspace = useMemo(() => parseWorkspace(workspaceSnapshot), [workspaceSnapshot]);

  function selectView(nextView: WorkspaceView) {
    const url = new URL(window.location.href);
    if (nextView === "manage") {
      url.searchParams.set("view", "manage");
    } else {
      url.searchParams.delete("view");
    }
    window.history.replaceState(null, "", `${url.pathname}${url.search}${url.hash}`);
    window.dispatchEvent(new Event(VIEW_EVENT));
  }

  function moveTab(event: React.KeyboardEvent<HTMLButtonElement>, index: number) {
    const nextIndex =
      event.key === "ArrowRight" ? (index + 1) % 2 : event.key === "ArrowLeft" ? (index + 1) % 2 : event.key === "Home" ? 0 : event.key === "End" ? 1 : undefined;
    if (nextIndex === undefined) return;
    event.preventDefault();
    const nextView: WorkspaceView = nextIndex === 0 ? "explore" : "manage";
    selectView(nextView);
    tabRefs.current[nextIndex]?.focus();
  }

  const filtered = useMemo(() => {
    const needle = query.trim().toLocaleLowerCase("ko-KR");
    return APPLICATION_POSTINGS.filter((posting) => {
      const matchesPriority = priority === "ALL" || posting.priority === priority;
      const matchesTrack = track === "ALL" || posting.track === track;
      const haystack = `${posting.company} ${posting.role} ${posting.track} ${posting.strengths.join(" ")}`.toLocaleLowerCase("ko-KR");
      return matchesPriority && matchesTrack && (!needle || haystack.includes(needle));
    });
  }, [priority, query, track]);

  const selected =
    filtered.find((posting) => posting.id === selectedId) ?? filtered[0] ?? APPLICATION_POSTINGS[0];
  const selectedState = getPostingState(workspace, selected.id);
  const appliedCount = APPLICATION_POSTINGS.filter((posting) => {
    const stage = getPostingState(workspace, posting.id).stage;
    return stage === "applied" || stage === "interview" || stage === "offer";
  }).length;
  const preparingCount = APPLICATION_POSTINGS.filter((posting) => {
    const stage = getPostingState(workspace, posting.id).stage;
    return stage === "tailoring" || stage === "ready";
  }).length;
  const staleCount = APPLICATION_POSTINGS.filter((posting) => daysSince(posting.verifiedAt) > 7).length;

  function patchPosting(id: string, patch: Partial<PostingState>) {
    const current = parseWorkspace(readWorkspaceSnapshot());
    const before = getPostingState(current, id);
    const next = { ...current, [id]: { ...before, ...patch } };
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    window.dispatchEvent(new Event(STORAGE_EVENT));
  }

  function toggleChecklist(key: ChecklistKey) {
    patchPosting(selected.id, {
      checklist: {
        ...selectedState.checklist,
        [key]: !selectedState.checklist[key],
      },
    });
  }

  function choosePosting(posting: ApplicationPosting) {
    setSelectedId(posting.id);
    if (window.matchMedia("(max-width: 1023px)").matches) {
      setMobileDetailOpen(true);
      window.requestAnimationFrame(() => detailRef.current?.scrollIntoView({ behavior: "smooth" }));
    }
  }

  return (
    <main>
      <section className="border-b border-border-soft">
        <div className="mx-auto flex w-full max-w-[1440px] px-4 md:px-7 lg:px-9" role="tablist" aria-label="지원 워크스페이스 보기">
          {([
            ["explore", "공고 탐색"],
            ["manage", "지원 관리"],
          ] as const).map(([tabView, label], index) => (
            <button
              key={tabView}
              ref={(element) => {
                tabRefs.current[index] = element;
              }}
              id={`${tabView}-tab`}
              type="button"
              role="tab"
              aria-selected={view === tabView}
              aria-controls={`${tabView}-panel`}
              tabIndex={view === tabView ? 0 : -1}
              onClick={() => selectView(tabView)}
              onKeyDown={(event) => moveTab(event, index)}
              className={cn(
                "focus-ring min-h-12 border-b-2 px-4 font-mono text-xs transition-colors",
                view === tabView ? "border-fg text-fg" : "border-transparent text-muted hover:text-fg",
              )}
            >
              {label}
            </button>
          ))}
        </div>
      </section>

      <div id="explore-panel" role="tabpanel" aria-labelledby="explore-tab" hidden={view !== "explore"}>
      <section className="mx-auto w-full max-w-[1440px] px-4 pb-8 pt-10 md:px-7 lg:px-9 lg:pt-14">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.12em] text-muted">Active application system</p>
            <h1 className="mt-3 max-w-[18ch] text-[clamp(2rem,5vw,3.5rem)] font-semibold leading-[1.03] tracking-[-0.045em]">
              지원할 수 있는 공고만,
              <br />다음 행동까지.
            </h1>
            <p className="mt-4 max-w-[64ch] text-base leading-relaxed text-fg-2">
              활성 상태를 확인한 25개 공고에 기업·JD 분석, 증거 claim, 이력서 어필 방향을 연결했습니다.
              진행 상태와 메모는 이 브라우저에만 저장됩니다.
            </p>
          </div>
          <div className="max-w-[34ch] border-l-2 border-fg pl-4 text-sm leading-relaxed text-fg-2">
            종료 공고 12개와 재확인 필요 공고 2개는 이 화면에서 제외했습니다. 활성 확인 후 7일이 지나면 다시 확인 대상으로 표시합니다.
          </div>
        </div>

        <dl className="mt-10 grid border-y border-border md:grid-cols-4">
          {[
            ["ACTIVE", String(APPLICATION_POSTINGS.length), "확인된 공고"],
            ["PRIORITY A", "11", "먼저 지원"],
            ["IN PROGRESS", String(preparingCount), "서류 작업 중"],
            ["APPLIED", String(appliedCount), "제출 이후"],
          ].map(([label, value, hint], index) => (
            <div
              key={label}
              className={cn(
                "grid grid-cols-[1fr_auto] items-end gap-3 border-border-soft py-4 md:block md:px-5 md:py-5",
                index > 0 && "border-t md:border-l md:border-t-0",
                index === 0 && "md:pl-0",
              )}
            >
              <dt className="font-mono text-xs tracking-[0.08em] text-muted">{label}</dt>
              <dd className="m-0 text-2xl font-semibold tabular-nums md:mt-3 md:text-3xl">{value}</dd>
              <dd className="col-span-2 m-0 text-xs text-muted md:mt-1">{hint}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="sticky top-0 z-30 border-y border-border-soft bg-bg/95 backdrop-blur-md">
        <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-3 px-4 py-3 md:px-7 lg:flex-row lg:items-center lg:px-9">
          <label className="relative min-w-0 flex-1 lg:max-w-[420px]">
            <span className="sr-only">회사, 직무, 기술 검색</span>
            <svg
              aria-hidden
              viewBox="0 0 16 16"
              className="absolute left-3 top-1/2 size-4 -translate-y-1/2 fill-none stroke-muted"
              strokeWidth="1.5"
            >
              <circle cx="7" cy="7" r="4.25" />
              <path d="m10.25 10.25 3 3" />
            </svg>
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="회사, 직무, 기술 검색"
              className="focus-ring h-11 w-full border border-border bg-bg pl-10 pr-3 text-sm outline-none placeholder:text-muted"
            />
          </label>

          <div className="flex min-w-0 gap-2 overflow-x-auto" aria-label="우선순위 필터">
            {(["ALL", "A", "B", "C"] as const).map((value) => (
              <button
                key={value}
                type="button"
                onClick={() => setPriority(value)}
                aria-pressed={priority === value}
                className={cn(
                  "focus-ring min-h-11 whitespace-nowrap border px-3 font-mono text-xs transition-colors",
                  priority === value
                    ? "border-fg bg-fg text-bg"
                    : "border-border bg-bg text-muted hover:text-fg",
                )}
              >
                {value === "ALL" ? "전체 우선순위" : `${value} · ${PRIORITY_COPY[value]}`}
              </button>
            ))}
          </div>

          <label className="min-w-[180px]">
            <span className="sr-only">지원 트랙</span>
            <select
              value={track}
              onChange={(event) => setTrack(event.target.value)}
              className="focus-ring h-11 w-full border border-border bg-bg px-3 font-mono text-xs text-fg outline-none"
            >
              <option value="ALL">전체 트랙</option>
              {APPLICATION_TRACKS.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </label>
        </div>
      </section>

      <section className="mx-auto grid w-full max-w-[1440px] items-start px-4 md:px-7 lg:grid-cols-[370px_minmax(0,1fr)] lg:px-9">
        <aside
          ref={listRef}
          className={cn(
            "border-border-soft lg:sticky lg:top-[70px] lg:block lg:max-h-[calc(100vh-70px)] lg:overflow-y-auto lg:border-r",
            mobileDetailOpen && "max-lg:hidden",
          )}
        >
          <div className="flex items-center justify-between border-b border-border-soft py-4 pr-4">
            <p className="font-mono text-xs tracking-[0.08em] text-muted">SHORTLIST</p>
            <p className="font-mono text-xs tabular-nums text-muted">{filtered.length} / 25</p>
          </div>
          <div className="divide-y divide-border-soft lg:pr-4">
            {filtered.map((posting) => {
              const state = getPostingState(workspace, posting.id);
              const stageLabel = STAGES.find((item) => item.value === state.stage)?.label;
              const isSelected = posting.id === selected.id;
              const stale = daysSince(posting.verifiedAt) > 7;
              return (
                <button
                  key={posting.id}
                  type="button"
                  onClick={() => choosePosting(posting)}
                  aria-pressed={isSelected}
                  className={cn(
                    "focus-ring group grid w-full gap-3 px-3 py-4 text-left transition-colors",
                    isSelected ? "bg-surface" : "hover:bg-surface/70",
                  )}
                >
                  <span className="flex items-start gap-3">
                    <PriorityMark priority={posting.priority} />
                    <span className="min-w-0 flex-1">
                      <span className="block text-sm font-semibold">{posting.company}</span>
                      <span className="mt-0.5 block text-sm leading-snug text-fg-2">{posting.role}</span>
                    </span>
                    <span aria-hidden className="font-mono text-sm text-muted transition-transform group-hover:translate-x-0.5">
                      →
                    </span>
                  </span>
                  <span className="flex flex-wrap items-center gap-x-2 gap-y-1 pl-9 font-mono text-xs text-muted">
                    <span>{posting.track}</span>
                    <span aria-hidden>·</span>
                    <span>{stageLabel}</span>
                    {stale && (
                      <>
                        <span aria-hidden>·</span>
                        <span className="text-danger">재확인 필요</span>
                      </>
                    )}
                  </span>
                </button>
              );
            })}
          </div>
          {filtered.length === 0 && (
            <div className="py-12 pr-4 text-center">
              <p className="text-sm font-medium">조건에 맞는 공고가 없습니다.</p>
              <button
                type="button"
                onClick={() => {
                  setQuery("");
                  setPriority("ALL");
                  setTrack("ALL");
                }}
                className="focus-ring mt-3 font-mono text-xs text-muted underline underline-offset-4 hover:text-fg"
              >
                필터 초기화
              </button>
            </div>
          )}
        </aside>

        <article
          ref={detailRef}
          className={cn(
            "min-w-0 scroll-mt-40 pb-20 pt-5 lg:block lg:scroll-mt-20 lg:px-10 lg:pb-28 lg:pt-10 xl:px-14",
            !mobileDetailOpen && "max-lg:hidden",
          )}
        >
          <button
            type="button"
            onClick={() => {
              setMobileDetailOpen(false);
              window.requestAnimationFrame(() => listRef.current?.scrollIntoView({ behavior: "smooth" }));
            }}
            className="focus-ring mb-5 inline-flex min-h-11 items-center font-mono text-xs text-muted hover:text-fg lg:hidden"
          >
            ← 지원 목록으로
          </button>
          <div className="flex flex-wrap items-start justify-between gap-5 border-b border-border pb-7">
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <PriorityMark priority={selected.priority} />
                <span className="font-mono text-xs uppercase tracking-[0.08em] text-muted">
                  {PRIORITY_COPY[selected.priority]} · {selected.track}
                </span>
              </div>
              <p className="mt-5 text-base font-semibold">{selected.company}</p>
              <h2 className="mt-1 max-w-[24ch] text-[clamp(1.75rem,4vw,2.5rem)] font-semibold leading-[1.12] tracking-[-0.035em]">
                {selected.role}
              </h2>
              <p className="mt-3 max-w-[66ch] text-base leading-relaxed text-fg-2">{selected.verdict}</p>
            </div>
            <a
              href={selected.url}
              target="_blank"
              rel="noopener noreferrer"
              className="focus-ring inline-flex min-h-11 items-center gap-2 border border-fg bg-fg px-4 font-mono text-xs text-bg transition-colors hover:bg-accent-hover"
            >
              원문 공고 확인
              <ArrowUpRight />
            </a>
          </div>

          <div className="grid border-b border-border-soft md:grid-cols-2 xl:grid-cols-4">
            {[
              ["LOCATION", selected.location],
              ["EXPERIENCE", selected.experience],
              ["SOURCE", selected.source],
              ["VERIFIED", `${selected.verifiedAt} · ${daysSince(selected.verifiedAt)}일 전`],
            ].map(([label, value], index) => (
              <div
                key={label}
                className={cn(
                  "border-border-soft py-4 md:px-4",
                  index % 2 === 1 && "md:border-l",
                  index > 1 && "border-t xl:border-t-0",
                  index > 0 && "xl:border-l",
                  index === 0 && "md:pl-0",
                )}
              >
                <p className="font-mono text-xs tracking-[0.08em] text-muted">{label}</p>
                <p className="mt-1.5 text-sm text-fg-2">{value}</p>
              </div>
            ))}
          </div>

          {daysSince(selected.verifiedAt) > 7 && (
            <div className="mt-5 border-l-2 border-danger bg-surface px-4 py-3 text-sm leading-relaxed text-fg-2">
              마지막 활성 확인 후 7일이 지났습니다. 서류 작업 전에 원문 공고의 지원 버튼을 다시 확인하세요.
            </div>
          )}

          <div className="mt-9 grid gap-9 xl:grid-cols-[minmax(0,1fr)_300px]">
            <div className="grid gap-10">
              <section>
                <SectionTitle index="01">기업과 역할 해석</SectionTitle>
                <div className="mt-4 grid gap-5 md:grid-cols-2">
                  <div>
                    <p className="font-mono text-xs tracking-[0.08em] text-muted">COMPANY SIGNAL</p>
                    <p className="mt-2 text-sm leading-relaxed text-fg-2">{selected.companyAnalysis}</p>
                  </div>
                  <div>
                    <p className="font-mono text-xs tracking-[0.08em] text-muted">JD SIGNAL</p>
                    <p className="mt-2 text-sm leading-relaxed text-fg-2">{selected.roleAnalysis}</p>
                  </div>
                </div>
                <div className="mt-5 border-l-2 border-fg pl-4">
                  <p className="font-mono text-xs tracking-[0.08em] text-muted">ELIGIBILITY</p>
                  <p className="mt-1.5 text-sm leading-relaxed">{selected.eligibility}</p>
                </div>
              </section>

              <section>
                <SectionTitle index="02">적합도 판정</SectionTitle>
                <div className="mt-4 grid gap-6 md:grid-cols-2">
                  <div>
                    <p className="font-mono text-xs tracking-[0.08em] text-success">MATCH</p>
                    <BulletList items={selected.strengths} />
                  </div>
                  <div>
                    <p className="font-mono text-xs tracking-[0.08em] text-danger">GAP / CHECK</p>
                    <BulletList items={selected.gaps} />
                  </div>
                </div>
              </section>

              <section>
                <SectionTitle index="03">이력서 어필 방향</SectionTitle>
                <blockquote className="mt-4 border-l-2 border-fg py-1 pl-5 text-lg font-medium leading-relaxed tracking-[-0.01em]">
                  “{selected.pitch}”
                </blockquote>
                <div className="mt-5">
                  <p className="font-mono text-xs tracking-[0.08em] text-muted">RESUME EDIT</p>
                  <BulletList items={selected.resumeFocus} />
                </div>
                <div className="mt-5 flex flex-wrap gap-1.5" aria-label="연결된 evidence claim">
                  {selected.evidenceIds.map((id) => (
                    <span key={id} className="border border-border-soft px-2 py-1 font-mono text-xs text-muted">
                      {id}
                    </span>
                  ))}
                </div>
              </section>

              <section>
                <SectionTitle index="04">지원 전 물어볼 것</SectionTitle>
                <ol className="mt-4 grid list-none gap-3 p-0">
                  {selected.questions.map((question, index) => (
                    <li key={question} className="grid grid-cols-[28px_1fr] gap-3 text-sm leading-relaxed text-fg-2">
                      <span className="font-mono text-xs text-muted">{String(index + 1).padStart(2, "0")}</span>
                      <span>{question}</span>
                    </li>
                  ))}
                </ol>
              </section>
            </div>

            <aside className="self-start border-t-2 border-fg bg-surface px-4 py-5 xl:sticky xl:top-[88px]">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="font-mono text-xs tracking-[0.08em] text-muted">MY PROGRESS</p>
                  <h3 className="mt-1 text-base font-semibold">지원 세팅</h3>
                </div>
                <span className="font-mono text-xs text-muted">LOCAL</span>
              </div>

              <label className="mt-5 block">
                <span className="font-mono text-xs text-muted">진행 상태</span>
                <select
                  value={selectedState.stage}
                  onChange={(event) =>
                    patchPosting(selected.id, { stage: event.target.value as ApplicationStage })
                  }
                  className="focus-ring mt-2 h-11 w-full border border-border bg-bg px-3 text-sm outline-none"
                >
                  {STAGES.map((stage) => (
                    <option key={stage.value} value={stage.value}>
                      {stage.label}
                    </option>
                  ))}
                </select>
              </label>

              <div className="mt-6 border-t border-border-soft pt-5">
                <p className="font-mono text-xs text-muted">체크리스트</p>
                <div className="mt-2 grid">
                  {CHECKLIST.map((item) => {
                    const checked = Boolean(selectedState.checklist[item.key]);
                    return (
                      <button
                        key={item.key}
                        type="button"
                        onClick={() => toggleChecklist(item.key)}
                        aria-pressed={checked}
                        className="focus-ring group grid grid-cols-[20px_1fr] gap-3 border-t border-border-soft py-3 text-left first:border-t-0"
                      >
                        <span
                          aria-hidden
                          className={cn(
                            "mt-0.5 flex size-5 items-center justify-center border font-mono text-xs",
                            checked ? "border-fg bg-fg text-bg" : "border-border bg-bg text-transparent",
                          )}
                        >
                          ✓
                        </span>
                        <span>
                          <span className={cn("block text-sm", checked && "line-through text-muted")}>{item.label}</span>
                          <span className="mt-0.5 block text-xs leading-relaxed text-muted">{item.hint}</span>
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <label className="mt-6 block border-t border-border-soft pt-5">
                <span className="font-mono text-xs text-muted">개인 메모</span>
                <textarea
                  value={selectedState.note}
                  onChange={(event) => patchPosting(selected.id, { note: event.target.value })}
                  rows={6}
                  placeholder="담당자, 제출일, 답변 초안…"
                  className="focus-ring mt-2 w-full resize-y border border-border bg-bg px-3 py-2.5 text-sm leading-relaxed outline-none placeholder:text-muted"
                />
              </label>
              <p className="mt-2 text-xs leading-relaxed text-muted">
                자동 저장 · 서버 전송 없음. 브라우저 데이터를 지우면 함께 삭제됩니다.
              </p>
            </aside>
          </div>
        </article>
      </section>

      <footer className="border-t border-border-soft">
        <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-2 px-4 py-6 font-mono text-xs text-muted md:flex-row md:items-center md:justify-between md:px-7 lg:px-9">
          <span>ACTIVE SOURCE SNAPSHOT · 2026-08-31</span>
          <span>
            {staleCount > 0 ? `${staleCount}개 재확인 필요` : "모든 공고 freshness 기준 통과"} · noindex는 접근 제어가 아닙니다
          </span>
        </div>
      </footer>
      </div>

      <div id="manage-panel" role="tabpanel" aria-labelledby="manage-tab" hidden={view !== "manage"}>
        <ApplicationManagement projection={projection} />
      </div>
    </main>
  );
}
