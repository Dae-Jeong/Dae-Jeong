import type { PortfolioVisual } from "@/content/portfolios/types";

import { MermaidDiagram } from "./mermaid-diagram";

type CompactFlowVisual = Extract<PortfolioVisual, { kind: "compact-flow" }>;

function label(text: string) {
  return text.replaceAll('"', "'").replaceAll("\n", " ");
}

function toMermaid(visual: CompactFlowVisual) {
  const multipleLanes = visual.lanes.length > 1;
  const lines = [`flowchart ${multipleLanes ? "TB" : "LR"}`];
  const classes = new Map<string, string[]>();

  visual.lanes.forEach((lane, laneIndex) => {
    const laneId = `lane${laneIndex}`;
    if (multipleLanes) {
      lines.push(
        `subgraph ${laneId}["${label(lane.note ? `${lane.note} · ${lane.label}` : lane.label)}"]`,
        "direction LR",
      );
    }

    const nodeIds = lane.stages.map((stage, stageIndex) => {
      const nodeId = `L${laneIndex}N${stageIndex}`;
      const detail = stage.detail ? `<br/>${label(stage.detail)}` : "";
      lines.push(`${nodeId}["${label(stage.label)}${detail}"]`);

      const className =
        stage.emphasis === "strong"
          ? "strong"
          : stage.emphasis === "outcome"
            ? "outcome"
            : lane.tone === "failure" || lane.tone === "proposed"
              ? "proposed"
              : "base";
      classes.set(className, [...(classes.get(className) ?? []), nodeId]);
      return nodeId;
    });

    lines.push(nodeIds.join(" --> "));
    if (multipleLanes) lines.push("end");
  });

  if (multipleLanes) {
    lines.push(visual.lanes.map((_, index) => `lane${index}`).join(" ~~~ "));
  }

  lines.push(
    "classDef base fill:#ffffff,stroke:#9ca3af,color:#111827",
    "classDef strong fill:#ffffff,stroke:#111827,stroke-width:2px,color:#111827",
    "classDef outcome fill:#f0fdf4,stroke:#15803d,stroke-width:2px,color:#111827",
    "classDef proposed fill:#f8fafc,stroke:#64748b,stroke-dasharray:5 4,color:#111827",
  );
  classes.forEach((nodeIds, className) => {
    lines.push(`class ${nodeIds.join(",")} ${className}`);
  });

  return lines.join("\n");
}

export function CompactFlowDiagram({
  visual,
}: {
  visual: CompactFlowVisual;
}) {
  return (
    <figure
      aria-label={visual.title}
      className="m-0 border-y border-border py-6"
    >
      <div className="break-inside-avoid">
        <MermaidDiagram chart={visual.chart ?? toMermaid(visual)} title={visual.title} />

        <figcaption className="mt-6 border-t border-border-soft pt-4 text-sm leading-[1.65] text-fg-2">
          {visual.caption}
        </figcaption>
      </div>

      {visual.loadBehavior && (
        <section className="mt-7 border-t border-border pt-6" aria-label={visual.loadBehavior.title}>
          <div className="flex flex-wrap items-baseline justify-between gap-3">
            <h4 className="m-0 text-base font-semibold">{visual.loadBehavior.title}</h4>
            <span className="font-mono text-xs text-muted">동작 · 검증 지점</span>
          </div>
          <p className="m-0 mt-2 text-sm leading-[1.65] text-fg-2">
            {visual.loadBehavior.description}
          </p>

          <div className="mt-5 border-y border-border">
            <div className="grid grid-cols-[112px_minmax(0,1fr)_168px] gap-5 py-3 font-mono text-xs text-muted max-md:hidden">
              <span>상황</span>
              <span>Transaction·worker 동작</span>
              <span>부하 검증 항목</span>
            </div>
            {visual.loadBehavior.rows.map((row) => (
              <div
                key={row.situation}
                className="grid break-inside-avoid grid-cols-[112px_minmax(0,1fr)_168px] gap-5 border-t border-border-soft py-4 max-md:grid-cols-1 max-md:gap-2"
              >
                <strong className="text-sm font-semibold leading-[1.55]">{row.situation}</strong>
                <p className="m-0 text-sm leading-[1.65] text-fg-2">{row.behavior}</p>
                <p className="m-0 font-mono text-xs leading-[1.65] text-muted max-md:border-t max-md:border-border-soft max-md:pt-2">
                  {row.watch}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}
    </figure>
  );
}
