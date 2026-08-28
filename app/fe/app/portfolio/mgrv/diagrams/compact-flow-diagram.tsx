import type { PortfolioVisual } from "@/content/portfolios/types";

import { MermaidDiagram } from "./mermaid-diagram";

type CompactFlowVisual = Extract<PortfolioVisual, { kind: "compact-flow" }>;
type FlowLane = CompactFlowVisual["lanes"][number];
type FlowStage = FlowLane["stages"][number];

const laneTone = {
  context: "border-[#a9b5c6] bg-[#f1f4f8] text-[#536176]",
  decision: "border-[#a9b5c6] bg-white text-[#2854d7]",
  delivery: "border-[#a9b5c6] bg-white text-[#2854d7]",
  failure: "border-[#b45309] bg-[#fff3e4] text-[#b45309]",
  proposed: "border-dashed border-[#b45309] bg-[#fff3e4] text-[#b45309]",
} satisfies Record<FlowLane["tone"], string>;

function stageClass(stage: FlowStage, tone: FlowLane["tone"]) {
  if (stage.emphasis === "outcome") {
    return "border-[#087f5b] bg-[#eaf8f2]";
  }

  if (stage.emphasis === "strong") {
    return "border-2 border-[#2854d7] bg-[#edf3ff]";
  }

  if (tone === "failure" || tone === "proposed") {
    return "border-dashed border-[#b45309] bg-[#fff3e4]";
  }

  return "border-[#d6deea] bg-white";
}

export function CompactFlowDiagram({ visual }: { visual: CompactFlowVisual }) {
  const tableHeaders = visual.loadBehavior?.headers ?? {
    situation: "상황",
    behavior: "설계한 동작",
    watch: "확인할 신호",
  };

  return (
    <figure aria-label={visual.title} className="m-0 border-0 p-0">
      <div className="grid gap-4 break-inside-avoid">
        {visual.chart && (
          <section
            aria-label={`${visual.title} architecture`}
            className="hidden overflow-hidden border border-[#d6deea] bg-white px-5 py-6 md:block print:block print:px-3 print:py-4"
          >
            <MermaidDiagram chart={visual.chart} title={visual.title} />
          </section>
        )}

        {visual.lanes.map((lane) => (
          <section
            key={`${lane.note ?? "flow"}-${lane.label}`}
            className={`border p-5 ${laneTone[lane.tone]}`}
          >
            <div className="flex flex-wrap items-baseline justify-between gap-3">
              <h4 className="m-0 text-base font-semibold text-[#102044]">{lane.label}</h4>
              {lane.note && (
                <span className="font-mono text-xs font-semibold uppercase text-current">
                  {lane.note}
                </span>
              )}
            </div>

            <div className="mt-5 flex min-w-0 items-stretch max-md:flex-col print:flex-row">
              {lane.stages.map((stage, index) => (
                <div
                  key={`${lane.label}-${stage.label}`}
                  className="contents max-md:flex max-md:w-full max-md:flex-col max-md:items-center print:contents"
                >
                  <article
                    className={`flex min-w-0 flex-1 flex-col justify-center border px-4 py-4 text-center text-[#102044] max-md:w-full print:w-auto print:px-2 print:py-3 ${stageClass(stage, lane.tone)}`}
                  >
                    <strong className="break-words text-sm font-semibold leading-[1.4] [overflow-wrap:anywhere]">
                      {stage.label}
                    </strong>
                    {stage.detail && (
                      <span className="mt-1 break-words text-xs leading-[1.45] text-[#536176] [overflow-wrap:anywhere]">
                        {stage.detail}
                      </span>
                    )}
                  </article>

                  {index < lane.stages.length - 1 && (
                    <span
                      aria-hidden="true"
                      className="flex w-8 shrink-0 items-center justify-center font-mono text-lg text-[#536176] max-md:h-8 max-md:w-auto max-md:rotate-90 print:h-auto print:w-6 print:rotate-0"
                    >
                      →
                    </span>
                  )}
                </div>
              ))}
            </div>
          </section>
        ))}

        <figcaption className="border-t border-border-soft pt-4 text-sm leading-[1.65] text-fg-2">
          {visual.caption}
        </figcaption>
      </div>

      {visual.loadBehavior && (
        <section
          className="mt-7 border-t border-[#a9b5c6] pt-6"
          aria-label={visual.loadBehavior.title}
        >
          <div className="grid grid-cols-[minmax(0,1fr)_auto] items-end gap-5 max-lg:grid-cols-1">
            <div>
              <span className="font-mono text-xs font-semibold text-[#2854d7]">
                실행 방식
              </span>
              <h4 className="m-0 mt-2 text-lg font-semibold text-[#102044]">
                {visual.loadBehavior.title}
              </h4>
            </div>
            <p className="m-0 text-sm leading-[1.65] text-fg-2 lg:text-right">
              {visual.loadBehavior.description}
            </p>
          </div>

          <div className="mt-5 overflow-hidden border border-[#a9b5c6] bg-white">
            <div className="grid grid-cols-[128px_minmax(0,1fr)_180px] gap-5 border-b border-[#a9b5c6] bg-[#f1f4f8] px-5 py-3 font-mono text-xs font-semibold text-[#102044] max-md:hidden print:grid print:grid-cols-[110px_minmax(0,1fr)_150px] print:gap-3 print:px-4">
              <span>{tableHeaders.situation}</span>
              <span>{tableHeaders.behavior}</span>
              <span>{tableHeaders.watch}</span>
            </div>
            {visual.loadBehavior.rows.map((row, index) => (
              <article
                key={row.situation}
                className={`grid break-inside-avoid grid-cols-[128px_minmax(0,1fr)_180px] gap-5 border-t border-[#d6deea] px-5 py-5 first:border-t-0 max-md:grid-cols-1 max-md:gap-2 print:grid-cols-[110px_minmax(0,1fr)_150px] print:gap-3 print:px-4 print:py-3 ${
                  index % 2 === 1 ? "bg-[#f8fafc]" : "bg-white"
                }`}
              >
                <strong className="break-words text-sm font-semibold leading-[1.55] text-[#2854d7] [overflow-wrap:anywhere]">
                  {row.situation}
                </strong>
                <p className="m-0 break-words text-sm leading-[1.65] text-fg-2 [overflow-wrap:anywhere]">{row.behavior}</p>
                <p className="m-0 break-words font-mono text-xs leading-[1.65] text-[#536176] [overflow-wrap:anywhere] max-md:border-t max-md:border-[#d6deea] max-md:pt-2">
                  {row.watch}
                </p>
              </article>
            ))}
          </div>
        </section>
      )}
    </figure>
  );
}
