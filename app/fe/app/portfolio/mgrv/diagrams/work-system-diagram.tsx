import type { TailoredPortfolio } from "@/content/portfolios/types";

import { QualityDecisionDiagram } from "./quality-decision-diagram";

type WorkSystem = TailoredPortfolio["workSystem"];
type WorkLane = WorkSystem["lanes"][number];

const laneMeta = {
  human: {
    role: "판단",
    owner: "사람이 결정",
    description: "문제·아키텍처·배포",
    surface: "bg-white",
  },
  ai: {
    role: "실행",
    owner: "에이전트가 수행",
    description: "탐색·비교·반복 구현",
    surface: "bg-[#f8fafc]",
  },
  automated: {
    role: "검증",
    owner: "시스템이 확인",
    description: "규격·테스트·근거",
    surface: "bg-white",
  },
} satisfies Record<
  WorkLane["kind"],
  { role: string; owner: string; description: string; surface: string }
>;

export function WorkSystemDiagram({ workSystem }: { workSystem: WorkSystem }) {
  return (
    <figure
      aria-label={workSystem.title}
      className="m-0 border-y border-[#cbd5e1] bg-[#f7f8fa] px-8 py-10 max-sm:px-5"
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
        <h4 className="m-0 flex flex-col justify-center border-r border-[#cbd5e1] bg-white px-5 py-4 max-lg:border-b max-lg:border-r-0 print:border-b-0 print:border-r print:px-3 print:py-3">
          <span className="font-mono text-xs font-semibold text-[#102044]">공유 기준</span>
          <span className="mt-1 text-[11px] font-normal leading-[1.4] text-muted">
            모두가 읽는 맥락
          </span>
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
                  className="absolute -left-2.5 top-1/2 z-10 flex h-5 w-5 -translate-y-1/2 items-center justify-center bg-bg font-mono text-xs text-[#2854d7] max-md:hidden"
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
 className={`grid break-inside-avoid grid-cols-[180px_minmax(0,1fr)] border-t border-border-soft first:border-t-0 max-lg:grid-cols-1 print:grid-cols-[140px_minmax(0,1fr)] ${laneMeta[lane.kind].surface}`}
          >
            <h4
 className="m-0 flex flex-col justify-center border-r border-[#cbd5e1] px-5 py-5 leading-[1.4] max-lg:border-b max-lg:border-r-0 print:border-b-0 print:border-r print:px-3 print:py-3"
            >
              <span className="font-mono text-[11px] text-muted">
                {lane.meta?.role ?? laneMeta[lane.kind].role}
              </span>
              <strong className="mt-1 text-sm font-semibold text-[#102044]">
                {lane.meta?.owner ?? laneMeta[lane.kind].owner}
              </strong>
              <span className="mt-1 text-[11px] font-normal text-muted">
                {lane.meta?.description ?? laneMeta[lane.kind].description}
              </span>
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
 className="absolute -left-3 top-1/2 z-10 flex h-6 w-6 -translate-y-1/2 items-center justify-center bg-bg font-mono text-xs text-[#2854d7] max-lg:-top-3 max-lg:left-5 max-lg:translate-y-0 max-lg:rotate-90 print:-left-3 print:top-1/2 print:-translate-y-1/2 print:rotate-0"
                    >
                      →
                    </span>
                  )}
                  <span
                    className="w-full border border-[#cbd5e1] bg-white px-3 py-3 text-sm font-semibold leading-[1.5] text-[#102044] print:px-2 print:py-2 print:text-[10px]"
                  >
                    {item}
                  </span>
                </li>
              ))}
            </ol>
          </section>
        ))}
      </div>

      {workSystem.qualityLab && (
        <QualityDecisionDiagram qualityLab={workSystem.qualityLab} />
      )}

      <section
        aria-label="작업 방식 근거"
 className="mt-5 grid grid-cols-[180px_minmax(0,1fr)] border-y border-[#cbd5e1] bg-white max-lg:grid-cols-1 print:grid-cols-[140px_minmax(0,1fr)]"
      >
        <h4 className="m-0 flex items-center gap-2 px-5 py-5 font-mono text-xs font-semibold text-[#087f5b] max-lg:border-b max-lg:border-[#e3e8f0] print:border-b-0 print:px-3 print:py-3">
          <span aria-hidden="true" className="h-2 w-2 bg-[#087f5b]" />
          실제 적용 범위
        </h4>
        <div className="grid border-l border-[#e3e8f0] max-lg:border-l-0 print:border-l">
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
        {workSystem.caption ??
          "제품 판단이 실행 중 유실되지 않도록 결정→작업→검증→배포 근거를 연결하고, AI는 그 범위 안에서 탐색과 반복 구현을 맡습니다."}
      </figcaption>
    </figure>
  );
}
