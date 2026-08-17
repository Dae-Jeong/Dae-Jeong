import type { PortfolioQualityLab } from "@/content/portfolios/types";

const stages = [
  { key: "automated", label: "자동 게이트", question: "틀리지 않았는가" },
  { key: "measurement", label: "실측 분포 대조", question: "기준에 부합하는가" },
  { key: "human", label: "사람 판정", question: "실제로 통하는가" },
] as const;

export function QualityDecisionDiagram({
  qualityLab,
}: {
  qualityLab: PortfolioQualityLab;
}) {
  return (
    <figure
      data-claim={qualityLab.claimIds.join(" ")}
      aria-label={qualityLab.title}
      className="m-0 mt-5 break-inside-avoid border-y border-border py-6"
    >
      <div className="mb-4 flex items-baseline justify-between gap-5 border-b border-border-soft pb-3 max-lg:block">
        <strong className="text-base font-semibold">{qualityLab.title}</strong>
        <p className="m-0 text-right text-sm leading-[1.55] text-fg-2 max-lg:mt-2 max-lg:text-left">
          {qualityLab.description}
        </p>
      </div>

 <div className="grid grid-cols-3 items-stretch max-lg:grid-cols-1">
        {stages.map((stage, index) => (
          <section key={stage.key} className="relative min-w-0">
            {index > 0 && (
              <span
                aria-hidden="true"
 className="absolute -left-3 top-1/2 z-10 flex h-6 w-6 -translate-y-1/2 items-center justify-center bg-bg font-mono text-muted max-lg:-top-3 max-lg:left-1/2 max-lg:-translate-x-1/2 max-lg:translate-y-0 max-lg:rotate-90"
              >
                →
              </span>
            )}
 <div className="h-full border-y border-r border-border px-5 py-5 first:border-l max-lg:border-x max-lg:border-b-0 max-lg:last:border-b">
              <div className="flex items-baseline justify-between gap-3 border-b border-border-soft pb-3">
                <h5 className="m-0 text-base font-semibold">{stage.label}</h5>
                <span className="font-mono text-xs text-muted">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>
              <p className="m-0 mt-3 text-sm font-semibold leading-[1.5]">
                {stage.question}
              </p>
              <ul className="m-0 mt-3 grid list-none gap-2 border-t border-border-soft pt-3 p-0">
                {qualityLab[stage.key].map((item) => (
                  <li key={item} className="text-sm leading-[1.55] text-fg-2">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </section>
        ))}
      </div>

      <figcaption className="mt-4 grid grid-cols-[148px_minmax(0,1fr)] border-y border-border-soft py-4 text-sm leading-[1.65] max-sm:grid-cols-1 max-sm:gap-2">
        <strong className="font-mono text-xs text-muted">AUTOMATION LIMIT</strong>
        <span className="text-fg-2">{qualityLab.boundary}</span>
      </figcaption>
    </figure>
  );
}
