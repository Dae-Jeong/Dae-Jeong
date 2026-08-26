import type { TailoredPortfolio } from "@/content/portfolios/types";

import { QualityDecisionDiagram } from "./quality-decision-diagram";

type WorkSystem = TailoredPortfolio["workSystem"];
type WorkLane = WorkSystem["lanes"][number];

const laneTone = {
  human: {
    label: "border-fg bg-fg text-bg print:bg-transparent print:text-fg",
    item: "border-fg bg-bg text-fg",
  },
  ai: {
    label: "border-border bg-surface text-fg",
    item: "border-border bg-surface text-fg",
  },
  automated: {
    label: "border-success bg-bg text-success",
    item: "border-success bg-bg text-fg",
  },
} satisfies Record<WorkLane["kind"], { label: string; item: string }>;

export function WorkSystemDiagram({ workSystem }: { workSystem: WorkSystem }) {
  return (
    <figure
      aria-label={workSystem.title}
      className="m-0 border-y-2 border-fg py-8"
    >
      <h3 className="m-0 text-2xl font-semibold leading-[1.25] tracking-[-0.02em] text-balance">
        {workSystem.title}
      </h3>
      <div className="mt-4 grid gap-2 text-base leading-[1.65] text-fg-2">
        {workSystem.summary.map((paragraph) => (
          <p key={paragraph} className="m-0">
            {paragraph}
          </p>
        ))}
      </div>

      <section className="mt-7 grid break-inside-avoid grid-cols-[180px_minmax(0,1fr)] border-y border-border max-lg:grid-cols-1 print:grid-cols-[140px_minmax(0,1fr)]">
        <h4 className="m-0 border-r border-border bg-fg px-5 py-4 font-mono text-xs font-semibold text-bg max-lg:border-b max-lg:border-r-0 print:border-b-0 print:border-r print:bg-transparent print:px-3 print:py-3 print:text-fg">
          SHARED CONTEXT
        </h4>
        <ol className="m-0 grid list-none grid-cols-4 p-0 max-md:grid-cols-2 print:grid-cols-4">
          {workSystem.foundation.map((item, index) => (
            <li
              key={item}
              className="relative flex min-w-0 items-center border-l border-border-soft px-4 py-4 first:border-l-0 max-md:border-t max-md:odd:border-l-0 max-md:[&:nth-child(-n+2)]:border-t-0 print:border-l print:border-t-0 print:px-2 print:py-3 print:first:border-l-0"
            >
              {index > 0 && (
                <span
                  aria-hidden="true"
                  className="absolute -left-2.5 top-1/2 z-10 flex h-5 w-5 -translate-y-1/2 items-center justify-center bg-bg font-mono text-xs text-muted max-md:hidden"
                >
                  →
                </span>
              )}
              <span className="text-sm font-semibold leading-[1.45] print:text-[9px]">
                {item}
              </span>
            </li>
          ))}
        </ol>
      </section>

      <div className="mt-5 border-y border-border">
        {workSystem.lanes.map((lane) => (
          <section
            key={lane.kind}
 className="grid break-inside-avoid grid-cols-[180px_minmax(0,1fr)] border-t border-border-soft first:border-t-0 max-lg:grid-cols-1 print:grid-cols-[140px_minmax(0,1fr)]"
          >
            <h4
 className={`m-0 flex items-center border-r px-5 py-5 text-sm font-semibold leading-[1.4] max-lg:border-b max-lg:border-r-0 print:border-b-0 print:border-r print:px-3 print:py-3 print:text-xs ${laneTone[lane.kind].label}`}
            >
              {lane.label}
            </h4>
          <ol className="m-0 flex list-none items-stretch overflow-visible p-0 max-lg:grid print:flex">
              {lane.items.map((item, index) => (
                <li
                  key={item}
                className="relative flex min-w-0 flex-1 items-center border-l border-border-soft px-5 py-5 first:border-l-0 max-lg:border-l-0 max-lg:border-t max-lg:first:border-t-0 print:border-l print:border-t-0 print:px-2 print:py-3 print:first:border-l-0"
                >
                  {index > 0 && (
                    <span
                      aria-hidden="true"
 className="absolute -left-3 top-1/2 z-10 flex h-6 w-6 -translate-y-1/2 items-center justify-center bg-bg font-mono text-xs text-muted max-lg:-top-3 max-lg:left-5 max-lg:translate-y-0 max-lg:rotate-90 print:-left-3 print:top-1/2 print:-translate-y-1/2 print:rotate-0"
                    >
                      →
                    </span>
                  )}
                  <span
                    className={`w-full border px-3 py-3 text-sm font-semibold leading-[1.5] print:px-2 print:py-2 print:text-[10px] ${laneTone[lane.kind].item}`}
                  >
                    {item}
                  </span>
                </li>
              ))}
            </ol>
          </section>
        ))}
      </div>

      <QualityDecisionDiagram qualityLab={workSystem.qualityLab} />

      <section
        aria-label="작업 방식 근거"
 className="mt-5 grid grid-cols-[180px_minmax(0,1fr)] border-y border-success max-lg:grid-cols-1 print:grid-cols-[140px_minmax(0,1fr)]"
      >
        <h4 className="m-0 px-5 py-5 font-mono text-xs font-semibold text-success max-lg:border-b max-lg:border-success print:border-b-0 print:px-3 print:py-3">
          실제 적용 범위
        </h4>
        <div className="grid border-l border-success max-lg:border-l-0 print:border-l">
          {workSystem.evidence.map((evidence) => (
            <article
              key={`${evidence.project}-${evidence.scope}`}
              className="grid break-inside-avoid grid-cols-[minmax(180px,0.38fr)_minmax(0,1fr)] border-t border-border-soft px-5 py-4 first:border-t-0 max-lg:grid-cols-1 max-lg:gap-2 print:grid-cols-[minmax(140px,0.38fr)_minmax(0,1fr)] print:gap-3 print:px-3 print:py-3"
            >
              <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
                <strong className="text-sm">{evidence.project}</strong>
                <span className="font-mono text-xs text-muted">{evidence.scope}</span>
              </div>
              <p className="m-0 text-sm leading-[1.6] text-fg-2">
                {evidence.text}
              </p>
            </article>
          ))}
        </div>
      </section>

      <figcaption className="mt-5 text-sm leading-[1.65] text-fg-2">
        제품 판단이 실행 중 유실되지 않도록 결정→작업→검증→release 근거를 연결하고,
        AI는 그 경계 안에서 탐색과 반복 구현을 맡습니다.
      </figcaption>
    </figure>
  );
}
