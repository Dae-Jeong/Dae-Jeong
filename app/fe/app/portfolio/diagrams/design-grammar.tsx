/* 설계 도식 문법 (2026-09-02).
   구조도(무엇이 어디에)가 아니라 설계(순서·실패 분기·불변 조건·버린 대안)를 보여주는 세 가지 형태.
   - Sequence: lane × time. 화살표는 lane 사이 전달, divider는 실패 분기 구간.
   - StateMachine: 상태 chain. 전이 조건은 화살표 라벨.
   - Compare: AS-IS / TO-BE 두 열.
   - StateTable: 상태별 처리 명세. 진입 조건 · 이 상태에서 하는 일 · 성공 전이 · 실패 전이 · 관측·개입.
   - Topology: 경계 상자 중첩(subscription → root/환경 → runtime). 리소스 이름은 서비스명만.
   색 규칙: 중립 + 파랑 하나. 실패는 점선·회색, 사람 개입은 짙은 ink. A4에서도 같은 구조. */
import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/cn";

export type Tone = "normal" | "decision" | "human" | "fail" | "muted";

const toneBox: Record<Tone, string> = {
  normal: "border-border bg-white",
  decision: "border-[var(--portfolio-blue)] bg-[var(--portfolio-blue-soft)]",
  human: "border-[var(--portfolio-ink)] bg-[var(--portfolio-ink)] text-white",
  fail: "border-dashed border-[#9aa3b2] bg-[#f7f8fa]",
  muted: "border-border bg-[#f7f8fa]",
};

export function DesignFrame({
  eyebrow,
  title,
  caption,
  children,
}: {
  eyebrow: string;
  title: string;
  caption?: string;
  children: ReactNode;
}) {
  return (
    <figure className="design-diagram m-0 my-10 border border-border bg-white">
      <figcaption className="flex flex-wrap items-baseline justify-between gap-2 border-b border-border px-5 py-3">
        <span className="text-sm font-semibold text-[var(--portfolio-ink)]">{title}</span>
        <span className="font-mono text-[11px] tracking-[0.06em] text-[var(--portfolio-blue)]">{eyebrow}</span>
      </figcaption>
      <div className="px-5 py-5 sm:px-6">{children}</div>
      {caption ? (
        <p className="m-0 border-t border-border px-5 py-3 text-xs leading-[1.6] text-fg-2">{caption}</p>
      ) : null}
    </figure>
  );
}

/* mark: "impl" = 운영 구현이 확인된 요소, "design" = 설계 단계(미구현). 설계 도식에서 둘을 섞을 때만 쓴다. */
export type Mark = "impl" | "design";

export function MarkBadge({ mark, dark }: { mark: Mark; dark?: boolean }) {
  return (
    <span
      className={cn(
        "inline-block border px-1 font-mono text-[9px] leading-[1.5] tracking-[0.04em]",
        mark === "impl"
          ? dark ? "border-[#c9d3ea] text-[#c9d3ea]" : "border-[var(--portfolio-blue)] text-[var(--portfolio-blue)]"
          : dark ? "border-dashed border-[#9aa3b2] text-[#c9d3ea]" : "border-dashed border-[#9aa3b2] text-muted",
      )}
    >
      {mark === "impl" ? "구현" : "설계"}
    </span>
  );
}

export function Node({
  label,
  sub,
  tone = "normal",
  no,
  mark,
  className,
}: {
  label: string;
  sub?: string;
  tone?: Tone;
  no?: string;
  mark?: Mark;
  className?: string;
}) {
  return (
    <div className={cn("min-w-0 border px-3 py-2.5", toneBox[tone], className)}>
      {no || mark ? (
        <span className="mb-0.5 flex items-center gap-1.5">
          {no ? <span className={cn("font-mono text-[10px]", tone === "human" ? "text-[#c9d3ea]" : "text-muted")}>{no}</span> : null}
          {mark ? <MarkBadge mark={mark} dark={tone === "human"} /> : null}
        </span>
      ) : null}
      <strong className="block text-[13px] leading-[1.4]">{label}</strong>
      {sub ? (
        <span className={cn("mt-0.5 block text-[11.5px] leading-[1.45]", tone === "human" ? "text-[#dce4f4]" : "text-fg-2")}>{sub}</span>
      ) : null}
    </div>
  );
}

/* ---------- Sequence ---------- */
export type Lane = { id: string; label: string; sub?: string };
export type SeqRow =
  | { kind: "step"; lane: string; no?: string; label: string; sub?: string; tone?: Tone; mark?: Mark }
  | { kind: "arrow"; from: string; to: string; label: string; sub?: string; tone?: "normal" | "fail" }
  | { kind: "divider"; label: string };

export function Sequence({ lanes, rows }: { lanes: Lane[]; rows: SeqRow[] }) {
  const idx = (id: string) => lanes.findIndex((l) => l.id === id);
  const cols = `repeat(${lanes.length}, minmax(0, 1fr))`;
  return (
    <div className="design-sequence">
      <div
        className="grid gap-x-4 border-b border-[var(--portfolio-ink)] pb-2 [grid-template-columns:var(--lanes)] max-sm:hidden"
        style={{ "--lanes": cols } as CSSProperties}
      >
        {lanes.map((l) => (
          <div key={l.id} className="min-w-0">
            <span className="block text-[13px] font-semibold text-[var(--portfolio-ink)]">{l.label}</span>
            {l.sub ? <span className="block font-mono text-[10.5px] text-muted">{l.sub}</span> : null}
          </div>
        ))}
      </div>
      <div
        className="grid gap-x-4 gap-y-2 pt-3 [grid-template-columns:var(--lanes)] max-sm:[grid-template-columns:1fr]"
        style={{ "--lanes": cols } as CSSProperties}
      >
        {rows.map((row, i) => {
          if (row.kind === "divider") {
            return (
              <div key={i} className="col-span-full my-2 flex items-center gap-3">
                <span className="h-px flex-1 border-t border-dashed border-[#9aa3b2]" />
                <span className="font-mono text-[10.5px] tracking-[0.06em] text-muted">{row.label}</span>
                <span className="h-px flex-1 border-t border-dashed border-[#9aa3b2]" />
              </div>
            );
          }
          if (row.kind === "step") {
            const c = idx(row.lane) + 1;
            const lane = lanes[c - 1];
            return (
              <div
                key={i}
                className="[grid-column:var(--col)] max-sm:[grid-column:auto]"
                style={{ "--col": `${c} / ${c + 1}` } as CSSProperties}
              >
                <span className="mb-1 hidden font-mono text-[10px] tracking-[0.05em] text-muted max-sm:block">{lane.label}</span>
                <Node no={row.no} label={row.label} sub={row.sub} tone={row.tone} mark={row.mark} />
              </div>
            );
          }
          const a = idx(row.from), b = idx(row.to);
          const left = Math.min(a, b) + 1, right = Math.max(a, b) + 2;
          const forward = b > a;
          const fail = row.tone === "fail";
          return (
            <div
              key={i}
              className="min-w-0 [grid-column:var(--col)] max-sm:[grid-column:auto]"
              style={{ "--col": `${left} / ${right}` } as CSSProperties}
            >
              <span className="mb-0.5 hidden font-mono text-[10px] tracking-[0.05em] text-muted max-sm:block">
                {lanes[a].label} → {lanes[b].label}
              </span>
              <div className={cn("flex items-center gap-2 px-1", fail ? "text-muted" : "text-[var(--portfolio-blue)]")}>
                {!forward ? <span aria-hidden className="font-mono">◀</span> : null}
                <span className={cn("h-px flex-1", fail ? "border-t border-dashed border-[#9aa3b2]" : "border-t border-[var(--portfolio-blue)]")} />
                <span className="min-w-0 shrink-0 text-center max-sm:shrink max-sm:[overflow-wrap:anywhere]">
                  <span className="block text-[11.5px] font-semibold leading-[1.3]">{row.label}</span>
                  {row.sub ? <span className="block font-mono text-[10px] text-muted">{row.sub}</span> : null}
                </span>
                <span className={cn("h-px flex-1", fail ? "border-t border-dashed border-[#9aa3b2]" : "border-t border-[var(--portfolio-blue)]")} />
                {forward ? <span aria-hidden className="font-mono">▶</span> : null}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ---------- State machine ---------- */
export type StateNode = { kind: "state"; label: string; sub?: string; tone?: Tone; mark?: Mark };
export type StateEdge = { kind: "edge"; label: string; sub?: string; tone?: "normal" | "fail" };
export type StateChain = { label?: string; items: (StateNode | StateEdge)[] };

export function StateMachine({ chains }: { chains: StateChain[] }) {
  return (
    <div className="grid gap-4">
      {chains.map((chain, ci) => (
        <div key={ci} className="grid grid-cols-[120px_minmax(0,1fr)] gap-4 max-sm:grid-cols-1">
          <span className="pt-2 font-mono text-[10.5px] tracking-[0.05em] text-muted">{chain.label ?? ""}</span>
          <div className="flex flex-wrap items-center gap-2">
            {chain.items.map((it, i) =>
              it.kind === "state" ? (
                <Node key={i} label={it.label} sub={it.sub} tone={it.tone} mark={it.mark} className="min-w-[132px]" />
              ) : (
                <span key={i} className={cn("flex items-center gap-1.5 px-1", it.tone === "fail" ? "text-muted" : "text-[var(--portfolio-blue)]")}>
                  <span className={cn("w-6", it.tone === "fail" ? "border-t border-dashed border-[#9aa3b2]" : "border-t border-[var(--portfolio-blue)]")} />
                  {it.label || it.sub ? (
                    <span className="text-center">
                      {it.label ? <span className="block text-[11px] font-semibold leading-[1.3]">{it.label}</span> : null}
                      {it.sub ? <span className="block font-mono text-[10px] text-muted">{it.sub}</span> : null}
                    </span>
                  ) : null}
                  <span aria-hidden className="font-mono">▶</span>
                </span>
              ),
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

/* ---------- Compare (AS-IS / TO-BE) ---------- */
export type CompareColumn = {
  eyebrow: string;
  title: string;
  tone: "before" | "after";
  nodes: { label: string; sub?: string; tone?: Tone }[];
  notes?: { label: string; items: string[] }[];
};

export function Compare({ before, after }: { before: CompareColumn; after: CompareColumn }) {
  const Col = ({ col }: { col: CompareColumn }) => (
    <div className={cn("min-w-0 border p-4", col.tone === "after" ? "border-[var(--portfolio-blue)]" : "border-dashed border-[#9aa3b2]")}>
      <div className="flex items-baseline justify-between gap-2 border-b border-border pb-2">
        <strong className={cn("text-[13px]", col.tone === "after" ? "text-[var(--portfolio-ink)]" : "text-fg-2")}>{col.title}</strong>
        <span className={cn("font-mono text-[10.5px] tracking-[0.06em]", col.tone === "after" ? "text-[var(--portfolio-blue)]" : "text-muted")}>{col.eyebrow}</span>
      </div>
      <div className="mt-3 grid gap-0">
        {col.nodes.map((n, i) => (
          <div key={i} className="grid justify-items-start">
            <Node label={n.label} sub={n.sub} tone={n.tone ?? (col.tone === "after" ? "normal" : "muted")} className="w-full" />
            {i < col.nodes.length - 1 ? <span aria-hidden className="ml-5 h-4 border-l border-[#9aa3b2]" /> : null}
          </div>
        ))}
      </div>
      {col.notes?.map((note) => (
        <div key={note.label} className="mt-4 border-t border-border pt-3">
          <span className="font-mono text-[10.5px] tracking-[0.05em] text-muted">{note.label}</span>
          <ul className="m-0 mt-1.5 grid list-none gap-1 p-0 text-[12px] leading-[1.55] text-fg-2">
            {note.items.map((t) => (
              <li key={t} className="pl-3 before:-ml-3 before:mr-1.5 before:text-muted before:content-['·']">{t}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
  return (
    <div className="design-compare grid grid-cols-2 gap-4 max-md:grid-cols-1">
      <Col col={before} />
      <Col col={after} />
    </div>
  );
}

/* ---------- 설계 footer ---------- */
export function DesignFooter({
  invariant,
  rejected,
  evidence,
  observed,
}: {
  invariant: string;
  rejected: string;
  evidence: string;
  observed?: string;
}) {
  const rows: [string, string][] = [
    ["불변 조건", invariant],
    ["버린 대안", rejected],
    ["검증 근거", evidence],
  ];
  if (observed) rows.push(["관측 결과", observed]);
  return (
    <dl className="m-0 mt-5 grid gap-1.5 border-t border-[var(--portfolio-ink)] pt-3">
      {rows.map(([k, v]) => (
        <div key={k} className="grid grid-cols-[84px_minmax(0,1fr)] gap-3 text-[12px] leading-[1.55]">
          <dt className="font-mono text-[10.5px] tracking-[0.05em] text-[var(--portfolio-blue)]">{k}</dt>
          <dd className="m-0 text-fg-2">{v}</dd>
        </div>
      ))}
    </dl>
  );
}

/* ---------- State table (상태별 처리 명세) ---------- */
export type StateRow = {
  state: string;
  sub?: string;
  tone?: Tone;
  mark?: Mark;
  enter: string;
  work: string;
  ok: string;
  fail: string;
  observe: string;
};

export function StateTable({ label, rows, head: headOverride }: { label?: string; rows: StateRow[]; head?: [string, string, string, string, string, string] }) {
  const head = headOverride ?? ["상태", "진입 조건", "이 상태에서 하는 일", "성공 전이", "실패 전이", "관측·개입"];
  return (
    <div className="design-state-table">
      {label ? <span className="mb-3 block font-mono text-[10.5px] tracking-[0.06em] text-muted">{label}</span> : null}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[760px] border-collapse text-[11.5px] leading-[1.5]">
          <thead>
            <tr className="border-b border-[var(--portfolio-ink)]">
              {head.map((h) => (
                <th key={h} className="px-2 py-1.5 text-left align-bottom font-mono text-[10px] font-medium tracking-[0.05em] text-muted first:pl-0">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.state} className="border-b border-border align-top last:border-b-0">
                <td className="py-2 pr-2 pl-0">
                  <Node label={r.state} sub={r.sub} tone={r.tone} mark={r.mark} className="w-[132px] px-2.5 py-2" />
                </td>
                <td className="px-2 py-2 text-fg-2">{r.enter}</td>
                <td className="px-2 py-2 text-[var(--portfolio-ink)]">{r.work}</td>
                <td className="px-2 py-2 text-[var(--portfolio-blue)]">{r.ok}</td>
                <td className="px-2 py-2 text-muted">{r.fail}</td>
                <td className="px-2 py-2 text-fg-2">{r.observe}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ---------- Topology (경계 상자 중첩) ---------- */
export function Boundary({
  label,
  sub,
  tone = "normal",
  className,
  children,
}: {
  label: string;
  sub?: string;
  tone?: "normal" | "decision" | "muted" | "platform";
  className?: string;
  children: ReactNode;
}) {
  const box = {
    normal: "border-[#9aa3b2] bg-white",
    decision: "border-[var(--portfolio-blue)] bg-white",
    muted: "border-dashed border-[#9aa3b2] bg-[#f7f8fa]",
    platform: "border-[var(--portfolio-ink)] bg-white",
  }[tone];
  return (
    <div className={cn("design-boundary min-w-0 border p-3", box, className)}>
      <div className="mb-2 flex flex-wrap items-baseline gap-x-2">
        <span className={cn("text-[12px] font-semibold", tone === "decision" ? "text-[var(--portfolio-blue)]" : "text-[var(--portfolio-ink)]")}>{label}</span>
        {sub ? <span className="font-mono text-[10px] text-muted">{sub}</span> : null}
      </div>
      {children}
    </div>
  );
}

export function Res({ label, sub, tone = "normal", mark }: { label: string; sub?: string; tone?: Tone; mark?: Mark }) {
  return <Node label={label} sub={sub} tone={tone} mark={mark} className="px-2.5 py-1.5 [&_strong]:text-[12px] [&_span:not(.inline-block)]:text-[10.5px]" />;
}

/* 경계를 가로지르는 연결. Topology 안에서 상자 사이 관계를 한 줄로 적는다. */
export function Link({ from, to, label, tone = "normal" }: { from: string; to: string; label: string; tone?: "normal" | "fail" | "muted" }) {
  const dashed = tone !== "normal";
  return (
    <div className={cn("flex items-center gap-2 text-[11px] max-sm:flex-wrap", tone === "normal" ? "text-[var(--portfolio-blue)]" : "text-muted")}>
      <span className="shrink-0 font-mono text-[10.5px] text-muted max-sm:basis-full">{from}</span>
      <span className={cn("h-px flex-1", dashed ? "border-t border-dashed border-[#9aa3b2]" : "border-t border-[var(--portfolio-blue)]")} />
      <span className="min-w-0 shrink-0 font-semibold max-sm:shrink max-sm:[overflow-wrap:anywhere]">{label}</span>
      <span className={cn("h-px flex-1", dashed ? "border-t border-dashed border-[#9aa3b2]" : "border-t border-[var(--portfolio-blue)]")} />
      <span aria-hidden className="font-mono">▶</span>
      <span className="shrink-0 font-mono text-[10.5px] text-muted max-sm:basis-full max-sm:text-right">{to}</span>
    </div>
  );
}

/* ---------- Timeline (시간축 × lane, 겹치는 구간을 보여준다) ---------- */
export type TimelineBar = { start: number; end: number; label?: string; sub?: string; tone?: Tone | "overlap" };
export type TimelineLane = { label: string; sub?: string; bars: TimelineBar[] };

const barTone: Record<Tone | "overlap", string> = {
  normal: "border-[#9aa3b2] bg-white text-[var(--portfolio-ink)]",
  decision: "border-[var(--portfolio-blue)] bg-[var(--portfolio-blue-soft)] text-[var(--portfolio-ink)]",
  human: "border-[var(--portfolio-ink)] bg-[var(--portfolio-ink)] text-white",
  fail: "border-dashed border-[#9aa3b2] bg-[#f7f8fa] text-muted",
  muted: "border-border bg-[#f7f8fa] text-fg-2",
  overlap: "border-[var(--portfolio-blue)] bg-[repeating-linear-gradient(135deg,transparent_0_4px,var(--portfolio-blue-soft)_4px_8px)] text-[var(--portfolio-ink)]",
};

export function Timeline({
  units,
  lanes,
  axis,
  markers,
}: {
  units: number;
  lanes: TimelineLane[];
  axis?: { start: string; end: string };
  markers?: { at: number; label: string }[];
}) {
  const cols = `repeat(${units}, minmax(0, 1fr))`;
  return (
    <div className="overflow-x-auto">
    <div className="design-timeline grid min-w-[640px] grid-cols-[110px_minmax(0,1fr)] gap-x-3 gap-y-2">
      {axis ? (
        <>
          <span />
          <div className="flex items-center justify-between font-mono text-[10px] tracking-[0.05em] text-muted">
            <span>{axis.start}</span>
            <span className="h-px flex-1 mx-2 border-t border-[#9aa3b2]" />
            <span>{axis.end} ▶</span>
          </div>
        </>
      ) : null}
      {lanes.map((lane) => (
        <div key={lane.label} className="contents">
          <div className="min-w-0 pt-1">
            <span className="block text-[12px] font-semibold leading-[1.3] text-[var(--portfolio-ink)]">{lane.label}</span>
            {lane.sub ? <span className="block font-mono text-[10px] leading-[1.4] text-muted">{lane.sub}</span> : null}
          </div>
          <div className="grid gap-y-1 [grid-template-columns:var(--cols)]" style={{ "--cols": cols } as CSSProperties}>
            {lane.bars.map((b, i) => (
              <div
                key={i}
                className={cn("min-w-0 border px-2 py-1 text-[11px] leading-[1.35] [grid-column:var(--span)]", barTone[b.tone ?? "normal"])}
                style={{ "--span": `${b.start + 1} / ${b.end + 1}` } as CSSProperties}
              >
                {b.label ? <strong className="block truncate font-semibold">{b.label}</strong> : null}
                {b.sub ? <span className="block truncate font-mono text-[10px] opacity-80">{b.sub}</span> : null}
              </div>
            ))}
          </div>
        </div>
      ))}
      {markers?.length ? (
        <>
          <span />
          <div className="grid [grid-template-columns:var(--cols)]" style={{ "--cols": cols } as CSSProperties}>
            {markers.map((m) => (
              <div key={m.label} className="[grid-column:var(--c)] font-mono text-[10px] leading-[1.4] text-muted" style={{ "--c": `${m.at + 1} / span 3` } as CSSProperties}>
                ▲ {m.label}
              </div>
            ))}
          </div>
        </>
      ) : null}
    </div>
    </div>
  );
}
