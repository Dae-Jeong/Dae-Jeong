import type { CSSProperties } from "react";

import type { PortfolioVisual } from "@/content/portfolios/types";

type CutoverMapVisual = Extract<PortfolioVisual, { kind: "cutover-map" }>;
type CutoverNode = CutoverMapVisual["lanes"][number]["nodes"][number];

const laneTone = {
  continuity: "bg-surface",
  change: "bg-bg",
  verification: "bg-bg",
} satisfies Record<CutoverMapVisual["lanes"][number]["tone"], string>;

const nodeTone: Record<NonNullable<CutoverNode["emphasis"]>, string> = {
  selected: "border-fg bg-fg text-bg print:bg-transparent print:text-fg",
  gate: "border-fg border-2 bg-bg text-fg",
  evidence: "border-success bg-bg text-success",
};

function nodeStyle(node: CutoverNode, phaseCount: number): CSSProperties {
  const start = Math.max(1, Math.min(phaseCount, node.phase + 1));
  const span = Math.max(1, Math.min(node.span ?? 1, phaseCount - start + 1));

  return {
    gridColumn: `${start} / span ${span}`,
  };
}

export function CutoverMapDiagram({
  visual,
}: {
  visual: CutoverMapVisual;
}) {
  const phaseColumns = {
    gridTemplateColumns: `repeat(${visual.phases.length}, minmax(0, 1fr))`,
  } satisfies CSSProperties;

  return (
    <figure
      aria-label={visual.title}
      className="m-0 break-inside-avoid border-y border-border py-6"
    >
      <div className="max-lg:hidden">
        <div className="grid grid-cols-[148px_minmax(0,1fr)] border-y border-border">
          <div className="border-r border-border px-4 py-3 font-mono text-xs text-muted">
            PHASE
          </div>
          <ol className="m-0 grid list-none p-0" style={phaseColumns}>
            {visual.phases.map((phase, index) => (
              <li
                key={phase}
                className="border-l border-border-soft px-4 py-3 first:border-l-0"
              >
                <span className="font-mono text-xs text-muted">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <strong className="mt-1 block text-sm leading-[1.45]">
                  {phase}
                </strong>
              </li>
            ))}
          </ol>

          {visual.lanes.map((lane) => (
            <div key={lane.label} className="contents">
              <div
                className={`border-r border-t border-border px-4 py-5 ${laneTone[lane.tone]}`}
              >
                <strong className="text-sm leading-[1.45]">{lane.label}</strong>
              </div>
              <div
                className="grid min-h-24 gap-2 border-t border-border p-3"
                style={phaseColumns}
              >
                {lane.nodes.map((node) => (
                  <div
                    key={`${node.phase}-${node.text}`}
                    style={nodeStyle(node, visual.phases.length)}
                    className={`self-center border px-4 py-3 text-sm font-semibold leading-[1.5] ${
                      node.emphasis
                        ? nodeTone[node.emphasis]
                        : "border-border bg-bg text-fg"
                    }`}
                  >
                    {node.text}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="hidden max-lg:grid max-lg:gap-5">
        {visual.phases.map((phase, phaseIndex) => {
          const phaseNodes = visual.lanes.flatMap((lane) =>
            lane.nodes
              .filter((node) => node.phase === phaseIndex)
              .map((node) => ({ lane, node })),
          );

          return (
            <section key={phase} className="border-t border-border pt-4">
              <div className="flex items-baseline gap-3">
                <span className="font-mono text-xs text-muted">
                  {String(phaseIndex + 1).padStart(2, "0")}
                </span>
                <h5 className="m-0 text-base font-semibold">{phase}</h5>
              </div>
              <div className="mt-3 grid gap-2">
                {phaseNodes.map(({ lane, node }) => (
                  <div
                    key={`${lane.label}-${node.text}`}
                    className="grid grid-cols-[112px_minmax(0,1fr)] border border-border max-sm:grid-cols-1"
                  >
                    <strong className="bg-surface px-3 py-3 text-xs leading-[1.45]">
                      {lane.label}
                    </strong>
                    <span className="px-3 py-3 text-sm font-medium leading-[1.5]">
                      {node.text}
                    </span>
                  </div>
                ))}
              </div>
            </section>
          );
        })}
      </div>

      <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 font-mono text-xs text-muted">
        <span>■ 선택 경로</span>
        <span>▣ 전환 gate</span>
        <span className="text-success">□ 검증 근거</span>
      </div>
      <figcaption className="mt-4 max-w-[76ch] text-sm leading-[1.65] text-fg-2">
        {visual.caption}
      </figcaption>
    </figure>
  );
}
