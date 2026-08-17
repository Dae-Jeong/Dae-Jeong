import type { PortfolioFrame } from "@/content/portfolios/types";

const frameTone = {
  context: "border-border bg-bg text-fg",
  decision:
    "border-fg bg-fg text-bg print:border-fg print:bg-transparent print:text-fg",
  outcome: "border-success bg-bg text-fg",
} satisfies Record<PortfolioFrame["tone"], string>;

export function TransformationBand({
  title,
  frame,
}: {
  title: string;
  frame: PortfolioFrame[];
}) {
  return (
    <section
      aria-label={`${title} 변화 구조`}
      className="mt-7 break-inside-avoid border-y border-border"
    >
      <dl className="m-0 grid grid-cols-3 max-lg:grid-cols-1">
        {frame.map((stage, index) => (
          <div
            key={`${stage.label}-${stage.tone}`}
            className={`min-w-0 border-l px-6 py-6 first:border-l-0 max-lg:border-l-0 max-lg:border-t max-lg:first:border-t-0 ${frameTone[stage.tone]}`}
          >
            <dt className="m-0 flex items-baseline justify-between gap-4 text-sm font-semibold leading-[1.45]">
              <span>{stage.label}</span>
              <span className="font-mono text-xs opacity-60">
                {String(index + 1).padStart(2, "0")}
              </span>
            </dt>
            <dd className="m-0 mt-3 text-base font-medium leading-[1.65]">
              {stage.text}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
