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
      data-claim={workSystem.claimIds.join(" ")}
      aria-label={workSystem.title}
      className="m-0 border-y-2 border-fg py-8"
    >
      <h3 className="m-0 text-2xl font-semibold leading-[1.25] tracking-[-0.02em] text-balance">
        {workSystem.title}
      </h3>
      <div className="mt-4 grid max-w-[76ch] gap-2 text-base leading-[1.65] text-fg-2">
        {workSystem.summary.map((paragraph) => (
          <p key={paragraph} className="m-0">
            {paragraph}
          </p>
        ))}
      </div>

 <section className="mt-7 grid break-inside-avoid grid-cols-[180px_minmax(0,1fr)] border-y border-border max-lg:grid-cols-1">
 <h4 className="m-0 border-r border-border bg-fg px-5 py-4 font-mono text-xs font-semibold text-bg max-lg:border-b max-lg:border-r-0 print:bg-transparent print:text-fg">
          DESIGN FOUNDATION
        </h4>
        <ul className="m-0 flex list-none flex-wrap items-center gap-x-5 gap-y-2 px-5 py-4">
          {workSystem.foundation.map((item) => (
            <li key={item} className="text-sm font-semibold leading-[1.45]">
              {item}
            </li>
          ))}
        </ul>
      </section>

      <div className="mt-5 border-y border-border">
        {workSystem.lanes.map((lane) => (
          <section
            key={lane.kind}
 className="grid break-inside-avoid grid-cols-[180px_minmax(0,1fr)] border-t border-border-soft first:border-t-0 max-lg:grid-cols-1"
          >
            <h4
 className={`m-0 flex items-center border-r px-5 py-5 text-sm font-semibold leading-[1.4] max-lg:border-b max-lg:border-r-0 ${laneTone[lane.kind].label}`}
            >
              {lane.label}
            </h4>
          <ol className="m-0 flex list-none items-stretch overflow-visible p-0 max-lg:grid">
              {lane.items.map((item, index) => (
                <li
                  key={item}
                className="relative flex min-w-0 flex-1 items-center border-l border-border-soft px-5 py-5 first:border-l-0 max-lg:border-l-0 max-lg:border-t max-lg:first:border-t-0"
                >
                  {index > 0 && (
                    <span
                      aria-hidden="true"
 className="absolute -left-3 top-1/2 z-10 flex h-6 w-6 -translate-y-1/2 items-center justify-center bg-bg font-mono text-xs text-muted max-lg:-top-3 max-lg:left-5 max-lg:translate-y-0 max-lg:rotate-90"
                    >
                      →
                    </span>
                  )}
                  <span
                    className={`w-full border px-3 py-3 text-sm font-semibold leading-[1.5] ${laneTone[lane.kind].item}`}
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
 className="mt-5 grid grid-cols-[180px_minmax(0,1fr)] border-y border-success max-lg:grid-cols-1"
      >
 <h4 className="m-0 px-5 py-5 font-mono text-xs font-semibold text-success max-lg:border-b max-lg:border-success">
          VERIFIED EVIDENCE
        </h4>
        <div className="grid border-l border-success max-lg:border-l-0">
          {workSystem.evidence.map((evidence) => (
            <article
              key={`${evidence.project}-${evidence.scope}`}
              data-claim={evidence.claimIds.join(" ")}
              className="grid break-inside-avoid grid-cols-[minmax(180px,0.38fr)_minmax(0,1fr)] border-t border-border-soft px-5 py-4 first:border-t-0 max-lg:grid-cols-1 max-lg:gap-2"
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

      <section className="mt-5 grid grid-cols-[180px_minmax(0,1fr)] border-y border-border-soft py-4 max-lg:grid-cols-1 max-lg:gap-3">
        <h4 className="m-0 font-mono text-xs font-semibold text-muted">
          RESPONSIBILITY LIMIT
        </h4>
        <ul className="m-0 grid list-none gap-2 p-0">
          {workSystem.limits.map((limit) => (
            <li key={limit} className="text-sm leading-[1.6] text-fg-2">
              {limit}
            </li>
          ))}
        </ul>
      </section>

      <figcaption className="mt-5 max-w-[82ch] text-sm leading-[1.65] text-fg-2">
        설계·검증·릴리스 판단은 사람이 소유하고, AI는 정해진 작업 경계 안에서 실행하며,
        자동 검증 결과는 다시 다음 판단의 근거로 돌아옵니다.
      </figcaption>
    </figure>
  );
}
