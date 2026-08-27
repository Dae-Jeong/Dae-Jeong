import type { PortfolioVisual } from "@/content/portfolios/types";

type IndependentLanesVisual = Extract<
  PortfolioVisual,
  { kind: "independent-lanes" }
>;

const laneTone = {
  context: "border-[#2854d7] bg-[#edf3ff] text-[#102044]",
  contract: "border-[#6d42c7] bg-[#6d42c7] text-white print:bg-transparent print:text-fg",
  delivery: "border-[#087f5b] bg-[#eaf8f2] text-[#102044]",
} satisfies Record<IndependentLanesVisual["lanes"][number]["tone"], string>;

export function IndependentLanesDiagram({
  visual,
}: {
  visual: IndependentLanesVisual;
}) {
  return (
    <figure
      aria-label={visual.title}
      className="m-0 break-inside-avoid border-0 p-0"
    >
      <div className="mb-4 flex items-baseline justify-between gap-5 border-b border-border-soft pb-3 max-sm:block">
        <strong className="font-mono text-xs uppercase tracking-[0.06em] text-muted">
          Cross-project pattern
        </strong>
        <p className="m-0 text-right text-sm leading-[1.55] text-fg-2 max-sm:mt-2 max-sm:text-left">
          하나의 end-to-end 시스템이 아니라, 서로 다른 사례에서 반복 확인된 설계 축입니다.
        </p>
      </div>

      <div className="grid gap-3">
        {visual.lanes.map((lane, index) => (
          <section
            key={lane.label}
          className="grid min-w-0 grid-cols-[196px_minmax(0,1fr)] border-y border-border max-lg:grid-cols-1"
          >
            <div
            className={`flex items-baseline justify-between gap-4 border-x px-5 py-4 max-lg:border-b ${laneTone[lane.tone]}`}
            >
              <h5 className="m-0 text-base font-semibold leading-[1.4]">
                {lane.label}
              </h5>
              <span className="shrink-0 font-mono text-[10px] uppercase tracking-[0.06em] opacity-65">
                Lane {String(index + 1).padStart(2, "0")}
              </span>
            </div>
          <ul className="m-0 flex list-none flex-wrap items-center gap-x-6 gap-y-2 border-r border-border px-5 py-4 max-lg:border-l p-0">
              {lane.items.map((item) => (
                <li
                  key={item}
                  className="text-sm font-semibold leading-[1.5]"
                >
                  {item}
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
      <figcaption className="mt-4 text-sm leading-[1.65] text-fg-2">
        {visual.caption}
      </figcaption>
    </figure>
  );
}
