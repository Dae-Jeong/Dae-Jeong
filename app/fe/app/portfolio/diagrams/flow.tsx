"use client";
/* Swimlane flow 문법 (2026-09-03).
   열 = 서비스 경계(lane), 노드는 (lane, row) 격자에 고정, 화살표는 SVG 직각 선.
   정상 실선(파랑) · 실패 점선(회색) · 판단 마름모 · 사람 개입 짙은 박스 · 저장소 원통.
   mermaid 자동 배치 대신 자리를 직접 정한다 — A4에서 글자 크기가 유지된다. */
import { useLayoutEffect, useRef, useState, type CSSProperties } from "react";
import { cn } from "@/lib/cn";
import { MarkBadge, type Mark, type Tone } from "./design-grammar";

export type FlowLane = { id: string; label: string; sub?: string };
export type FlowNodeKind = "box" | "decision" | "store" | "human" | "end";
export type FlowNode = {
  id: string;
  lane: string;
  row: number;
  label: string;
  sub?: string;
  kind?: FlowNodeKind;
  tone?: Tone;
  no?: string;
  mark?: Mark;
};
export type FlowEdge = { from: string; to: string; label?: string; tone?: "normal" | "fail"; side?: "left" | "right" };

const BLUE = "var(--portfolio-blue)";
const GREY = "#9aa3b2";

const toneBox: Record<Tone, string> = {
  normal: "border-[#9aa3b2] bg-white text-[var(--portfolio-ink)]",
  decision: "border-[var(--portfolio-blue)] bg-[var(--portfolio-blue-soft)] text-[var(--portfolio-ink)]",
  human: "border-[var(--portfolio-ink)] bg-[var(--portfolio-ink)] text-white",
  fail: "border-dashed border-[#9aa3b2] bg-[#f7f8fa] text-fg-2",
  muted: "border-border bg-[#f7f8fa] text-fg-2",
};

type Pt = { x: number; y: number };
type Rect = { left: number; right: number; top: number; bottom: number; cx: number; cy: number };

function route(s: Rect, t: Rect, sLane: number, tLane: number, sRow: number, tRow: number, laneRects: Rect[], gap: number, lastLane: number, off: number, side?: "left" | "right"): Pt[] {
  const g = Math.max(10, gap / 2);
  // 같은 행, 다른 lane: 두 lane 사이 gutter에서 꺾는다 (노드 높이가 달라도 직각)
  if (tRow === sRow && sLane !== tLane) {
    const right = sLane < tLane;
    const gx = (right ? (laneRects[sLane].right + laneRects[tLane].left) / 2 : (laneRects[sLane].left + laneRects[tLane].right) / 2) + off;
    const exit: Pt = right ? { x: s.right, y: s.cy } : { x: s.left, y: s.cy };
    const enter: Pt = right ? { x: t.left, y: t.cy } : { x: t.right, y: t.cy };
    if (Math.abs(s.cy - t.cy) < 2) return [exit, enter];
    return [exit, { x: gx, y: s.cy }, { x: gx, y: t.cy }, enter];
  }
  if (tRow > sRow) {
    if (sLane === tLane) {
      if (tRow - sRow === 1) return [{ x: s.cx, y: s.bottom }, { x: t.cx, y: t.top }];
      // 사이 행을 건너뛴다: lane 바깥 gutter로 우회
      const useRight = side ? side === "right" : sLane < lastLane;
      const gx = (useRight ? laneRects[sLane].right + 10 : laneRects[sLane].left - 10) + off;
      const exit: Pt = useRight ? { x: s.right, y: s.cy } : { x: s.left, y: s.cy };
      const enter: Pt = useRight ? { x: t.right, y: t.cy } : { x: t.left, y: t.cy };
      return [exit, { x: gx, y: s.cy }, { x: gx, y: t.cy }, enter];
    }
    const y1 = s.bottom + g;
    const y2 = t.top - g;
    const gx = (sLane < tLane ? laneRects[tLane].left - 1 : laneRects[tLane].right + 1) + off;
    return [
      { x: s.cx, y: s.bottom },
      { x: s.cx, y: y1 },
      { x: gx, y: y1 },
      { x: gx, y: y2 },
      { x: t.cx, y: y2 },
      { x: t.cx, y: t.top },
    ];
  }
  // back edge (tRow <= sRow): 바깥 gutter로 나가 위로 올라간다
  const goLeft = side ? side === "left" : tLane <= sLane;
  const gx = (goLeft ? laneRects[sLane].left - 1 : laneRects[sLane].right + 1) + off;
  const exit: Pt = goLeft ? { x: s.left, y: s.cy } : { x: s.right, y: s.cy };
  const enter: Pt = tLane === sLane ? (goLeft ? { x: t.left, y: t.cy } : { x: t.right, y: t.cy }) : goLeft ? { x: t.right, y: t.cy } : { x: t.left, y: t.cy };
  return [exit, { x: gx, y: s.cy }, { x: gx, y: t.cy }, enter];
}

type Box = { left: number; right: number; top: number; bottom: number };
function boxDist(p: Pt, b: Box): number {
  const dx = Math.max(b.left - p.x, 0, p.x - b.right);
  const dy = Math.max(b.top - p.y, 0, p.y - b.bottom);
  return Math.hypot(dx, dy);
}
/* 라벨 폭 추정: CJK는 넓다 */
function labelWidth(label: string): number {
  let w = 12;
  for (const ch of label) w += ch.charCodeAt(0) > 0x2e80 ? 10.5 : 6.4;
  return Math.max(24, w);
}
/* 라벨 자리: 각 segment 위의 지점과 그 지점에서 선 옆으로 비껴 놓은 지점 중, 노드 박스와 이미 놓인 라벨에서 가장 먼 곳. */
function labelPoint(pts: Pt[], label: string, nodeBoxes: Box[], placed: Box[]): Pt {
  const w = labelWidth(label), h = 16;
  let best = { score: -Infinity, p: pts[0] };
  const consider = (p: Pt, bonus: number) => {
    const me: Box = { left: p.x - w / 2, right: p.x + w / 2, top: p.y - h / 2, bottom: p.y + h / 2 };
    let score = Math.min(...nodeBoxes.map((nb) => boxDist(p, nb)), 60) + bonus;
    for (const nb of nodeBoxes) if (me.left < nb.right && me.right > nb.left && me.top < nb.bottom && me.bottom > nb.top) score -= 40;
    for (const pl of placed) if (me.left < pl.right && me.right > pl.left && me.top < pl.bottom && me.bottom > pl.top) score -= 60;
    if (score > best.score) best = { score, p };
  };
  for (let i = 0; i < pts.length - 1; i++) {
    const a = pts[i], b = pts[i + 1];
    const horizontal = Math.abs(a.y - b.y) < 1;
    const len = Math.hypot(a.x - b.x, a.y - b.y);
    if (len < 12) continue;
    for (const t of [0.5, 0.35, 0.65, 0.2, 0.8]) {
      const p = { x: a.x + (b.x - a.x) * t, y: a.y + (b.y - a.y) * t };
      const base = (horizontal ? 6 : 0) + (t === 0.5 ? 2 : 0);
      consider(p, base);                                   // 선 위
      if (horizontal) { consider({ x: p.x, y: p.y - h / 2 - 3 }, base - 10); consider({ x: p.x, y: p.y + h / 2 + 3 }, base - 10); } // 선 위·아래 (선 위가 비어 있으면 선 위 우선)
      else { consider({ x: p.x + w / 2 + 5, y: p.y }, base - 10); consider({ x: p.x - w / 2 - 5, y: p.y }, base - 10); }       // 선 좌·우
    }
  }
  return best.p;
}

export function Flow({
  lanes,
  nodes,
  edges,
  rowGap = 44,
}: {
  lanes: FlowLane[];
  nodes: FlowNode[];
  edges: FlowEdge[];
  rowGap?: number;
}) {
  const rootRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const laneRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const [paths, setPaths] = useState<{ d: string; tone: "normal" | "fail"; label?: string; lp: Pt; end: Pt; dir: "down" | "up" | "left" | "right" }[]>([]);
  const [size, setSize] = useState({ w: 0, h: 0 });
  const rows = Math.max(...nodes.map((n) => n.row)) + 1;
  const laneIdx = (id: string) => lanes.findIndex((l) => l.id === id);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const compute = () => {
      const base = root.getBoundingClientRect();
      const rect = (el: HTMLElement): Rect => {
        const r = el.getBoundingClientRect();
        return { left: r.left - base.left, right: r.right - base.left, top: r.top - base.top, bottom: r.bottom - base.top, cx: (r.left + r.right) / 2 - base.left, cy: (r.top + r.bottom) / 2 - base.top };
      };
      const laneRects = lanes.map((l) => {
        const el = laneRefs.current[l.id];
        return el ? rect(el) : { left: 0, right: 0, top: 0, bottom: 0, cx: 0, cy: 0 };
      });
      const byId = Object.fromEntries(nodes.map((n) => [n.id, n]));
      const nodeBoxes: Box[] = nodes.map((n) => nodeRefs.current[n.id]).filter((el): el is HTMLDivElement => !!el).map((el) => rect(el));
      const placed: Box[] = [];
      const out = edges.flatMap((e, ei) => {
        const sEl = nodeRefs.current[e.from], tEl = nodeRefs.current[e.to];
        const sN = byId[e.from], tN = byId[e.to];
        if (!sEl || !tEl || !sN || !tN) return [];
        const s = rect(sEl), t = rect(tEl);
        const pts = route(s, t, laneIdx(sN.lane), laneIdx(tN.lane), sN.row, tN.row, laneRects, rowGap, lanes.length - 1, ((ei % 3) - 1) * 7, e.side);
        const d = pts.map((p, i) => `${i === 0 ? "M" : "L"}${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(" ");
        const last = pts[pts.length - 1], prev = pts[pts.length - 2];
        const dir: "down" | "up" | "left" | "right" = Math.abs(last.x - prev.x) > Math.abs(last.y - prev.y) ? (last.x > prev.x ? "right" : "left") : last.y > prev.y ? "down" : "up";
        const lp = e.label ? labelPoint(pts, e.label, nodeBoxes, placed) : last;
        if (e.label) { const w = labelWidth(e.label); placed.push({ left: lp.x - w / 2, right: lp.x + w / 2, top: lp.y - 8, bottom: lp.y + 8 }); }
        return [{ d, tone: e.tone ?? "normal", label: e.label, lp, end: last, dir }];
      });
      setPaths(out);
      setSize({ w: base.width, h: base.height });
    };
    compute();
    const ro = new ResizeObserver(compute);
    ro.observe(root);
    const mq = window.matchMedia("print");
    const onPrint = () => compute();
    mq.addEventListener?.("change", onPrint);
    window.addEventListener("beforeprint", onPrint);
    return () => {
      ro.disconnect();
      mq.removeEventListener?.("change", onPrint);
      window.removeEventListener("beforeprint", onPrint);
    };
  }, [lanes, nodes, edges, rowGap]);

  const cols = `repeat(${lanes.length}, minmax(0, 1fr))`;
  const arrow = (end: Pt, dir: string, color: string) => {
    const s = 6;
    const tip = { down: `${end.x},${end.y} ${end.x - s},${end.y - s * 1.6} ${end.x + s},${end.y - s * 1.6}`, up: `${end.x},${end.y} ${end.x - s},${end.y + s * 1.6} ${end.x + s},${end.y + s * 1.6}`, right: `${end.x},${end.y} ${end.x - s * 1.6},${end.y - s} ${end.x - s * 1.6},${end.y + s}`, left: `${end.x},${end.y} ${end.x + s * 1.6},${end.y - s} ${end.x + s * 1.6},${end.y + s}` }[dir];
    return <polygon points={tip} fill={color} />;
  };

  return (
    <div className="design-flow overflow-x-auto">
      <div className="min-w-[720px]">
        <div className="grid gap-x-8 border-b border-[var(--portfolio-ink)] pb-2 [grid-template-columns:var(--cols)]" style={{ "--cols": cols } as CSSProperties}>
          {lanes.map((l) => (
            <div key={l.id} className="min-w-0">
              <span className="block text-[13px] font-semibold text-[var(--portfolio-ink)]">{l.label}</span>
              {l.sub ? <span className="block font-mono text-[10.5px] text-muted">{l.sub}</span> : null}
            </div>
          ))}
        </div>
        <div ref={rootRef} className="relative">
          <div className="grid gap-x-8 pt-4 [grid-template-columns:var(--cols)]" style={{ "--cols": cols, rowGap } as CSSProperties}>
            {/* lane 배경: 모든 행을 세로로 관통해 gutter x를 잰다 */}
            {lanes.map((l, li) => (
              <div
                key={`lane-${l.id}`}
                ref={(el) => { laneRefs.current[l.id] = el; }}
                aria-hidden
                className={cn("pointer-events-none", li > 0 && "border-l border-dashed border-[#e3e7ee]")}
                style={{ gridColumn: li + 1, gridRow: `1 / ${rows + 1}` }}
              />
            ))}
            {/* 노드: 하나의 grid를 공유해 같은 row는 같은 높이에 놓인다 */}
            {nodes.map((n) => (
              <div key={n.id} className="flex w-full items-center justify-center" style={{ gridColumn: laneIdx(n.lane) + 1, gridRow: n.row + 1 }}>
                <FlowNodeBox node={n} refCb={(el) => { nodeRefs.current[n.id] = el; }} />
              </div>
            ))}
          </div>
          <svg className="pointer-events-none absolute inset-0 overflow-visible" width={size.w} height={size.h} aria-hidden>
            {paths.map((p, i) => {
              const color = p.tone === "fail" ? GREY : BLUE;
              return (
                <g key={i}>
                  <path d={p.d} fill="none" stroke={color} strokeWidth={1.4} strokeDasharray={p.tone === "fail" ? "4 3" : undefined} />
                  {arrow(p.end, p.dir, color)}
                </g>
              );
            })}
          </svg>
          {paths.map((p, i) =>
            p.label ? (
              <span
                key={`l${i}`}
                className={cn("pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 whitespace-nowrap bg-white px-1.5 py-0.5 font-mono text-[10px] leading-[1.3]", p.tone === "fail" ? "text-muted" : "text-[var(--portfolio-blue)]")}
                style={{ left: p.lp.x, top: p.lp.y }}
              >
                {p.label}
              </span>
            ) : null,
          )}
        </div>
      </div>
    </div>
  );
}

function FlowNodeBox({ node, refCb }: { node: FlowNode; refCb: (el: HTMLDivElement | null) => void }) {
  const kind = node.kind ?? "box";
  const tone = node.tone ?? (kind === "human" ? "human" : kind === "decision" ? "decision" : "normal");
  if (kind === "decision") {
    return (
      <div ref={refCb} className="relative flex min-h-[76px] w-[78%] items-center justify-center px-6 py-3 text-center">
        <span aria-hidden className={cn("absolute inset-x-[14%] inset-y-0 rotate-45 border", toneBox[tone].split(" ").filter((c) => c.startsWith("border") || c.startsWith("bg")).join(" "))} style={{ aspectRatio: "1 / 1", margin: "auto", height: "100%" }} />
        <span className="relative">
          <strong className="block text-[12.5px] leading-[1.35]">{node.label}</strong>
          {node.sub ? <span className="block font-mono text-[10px] text-muted">{node.sub}</span> : null}
        </span>
      </div>
    );
  }
  return (
    <div
      ref={refCb}
      className={cn(
        "w-[88%] border px-3 py-2.5",
        toneBox[tone],
        kind === "store" && "rounded-[14px] [box-shadow:inset_0_6px_0_-3px_#9aa3b2]",
        kind === "end" && "w-auto min-w-[120px] rounded-full text-center",
      )}
    >
      {node.no || node.mark ? (
        <span className="mb-0.5 flex items-center gap-1.5">
          {node.no ? <span className={cn("font-mono text-[10px]", tone === "human" ? "text-[#c9d3ea]" : "text-muted")}>{node.no}</span> : null}
          {node.mark ? <MarkBadge mark={node.mark} dark={tone === "human"} /> : null}
        </span>
      ) : null}
      <strong className="block text-[12.5px] leading-[1.35]">{node.label}</strong>
      {node.sub ? <span className={cn("mt-0.5 block text-[11px] leading-[1.4]", tone === "human" ? "text-[#dce4f4]" : "text-fg-2")}>{node.sub}</span> : null}
    </div>
  );
}
