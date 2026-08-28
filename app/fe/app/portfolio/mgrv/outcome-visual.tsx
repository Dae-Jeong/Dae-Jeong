import type { PortfolioVisual } from "@/content/portfolios/types";

import {
  AiSystemDiagram,
  AxWorkflowDiagram,
  CompactFlowDiagram,
  CutoverMapDiagram,
  IndependentLanesDiagram,
  InfraOwnershipDiagram,
  RuntimeRecoveryDiagram,
} from "./diagrams";

export function OutcomeVisual({
  visual,
  lead,
}: {
  visual: PortfolioVisual;
  lead: string;
}) {
  return (
    <section
      data-layer="visual-reference"
      aria-label={`${visual.title} 시각 참고 자료`}
      className="portfolio-visual-band mt-12 min-w-0 break-inside-avoid"
    >
      <header className="mb-5">
        <div className="flex flex-wrap items-baseline justify-between gap-3">
          <h3 className="m-0 text-lg font-semibold leading-[1.4]">{visual.title}</h3>
          <span className="font-mono text-xs font-semibold text-muted">
            구조
          </span>
        </div>
        <p className="m-0 mt-3 text-sm leading-[1.7] text-fg-2">
          {lead}
        </p>
      </header>

      {visual.kind === "independent-lanes" && (
        <IndependentLanesDiagram visual={visual} />
      )}
      {visual.kind === "runtime-recovery" && (
        <RuntimeRecoveryDiagram visual={visual} />
      )}
      {visual.kind === "cutover-map" && <CutoverMapDiagram visual={visual} />}
      {visual.kind === "infra-ownership" && (
        <InfraOwnershipDiagram visual={visual} />
      )}
      {visual.kind === "ai-system" && <AiSystemDiagram visual={visual} />}
      {visual.kind === "ax-workflow" && <AxWorkflowDiagram visual={visual} />}
      {visual.kind === "compact-flow" && (
        <CompactFlowDiagram visual={visual} />
      )}
    </section>
  );
}
