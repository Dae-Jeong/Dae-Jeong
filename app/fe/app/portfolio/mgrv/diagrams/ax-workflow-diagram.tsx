import type { PortfolioVisual } from "@/content/portfolios/types";

type AxWorkflowVisual = Extract<PortfolioVisual, { kind: "ax-workflow" }>;

const stageMeta: Record<
  AxWorkflowVisual["stages"][number]["role"],
  { owner: string; surface: string }
> = {
  human: { owner: "사람이 결정", surface: "bg-white" },
  contract: { owner: "공유 계약", surface: "bg-[#f8fafc]" },
  ai: { owner: "Agent가 수행", surface: "bg-white" },
  system: { owner: "시스템이 검증", surface: "bg-[#f8fafc]" },
};

export function AxWorkflowDiagram({
  visual,
}: {
  visual: AxWorkflowVisual;
}) {
  return (
    <figure
      aria-label={visual.title}
      className="m-0 break-inside-avoid border-0 p-0"
    >
      <ol className="m-0 flex list-none items-stretch p-0 max-lg:flex-col">
        {visual.stages.map((stage, index) => {
          const hasNext = index < visual.stages.length - 1;

          return (
            <li
              key={`${stage.role}-${stage.label}`}
              className="flex min-w-0 flex-1 items-center max-lg:flex-col"
            >
              <div
                data-role={stage.role}
                className={`flex min-h-[96px] w-full min-w-0 flex-col justify-center border-y border-[#cbd5e1] px-3 py-3 text-[#102044] ${stageMeta[stage.role].surface}`}
              >
                <span className="font-mono text-[10px] leading-[1.4] text-muted">
                  {stageMeta[stage.role].owner}
                </span>
                <strong className="mt-1 break-words text-sm font-semibold leading-[1.4] [overflow-wrap:anywhere]">
                  {stage.label}
                </strong>
                {stage.items.length > 0 && (
                  <ul className="m-0 mt-2 grid list-none gap-0.5 p-0 text-[11px] leading-[1.5] text-fg-2">
                    {stage.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                )}
              </div>

              {hasNext && (
                <span
                  aria-hidden="true"
                  className="flex shrink-0 items-center justify-center px-1.5 font-mono text-sm text-[#2854d7] max-lg:h-8 max-lg:rotate-90 max-lg:px-0"
                >
                  →
                </span>
              )}
            </li>
          );
        })}
      </ol>

      <div className="mt-5 grid gap-3">
        {visual.evidenceBands.map((band) => (
          <section
            key={band.label}
            className="grid grid-cols-[196px_minmax(0,1fr)] border-y border-[#cbd5e1] max-lg:grid-cols-1"
          >
            <h5 className="m-0 flex items-center gap-2 bg-white px-5 py-4 text-sm font-semibold leading-[1.45] text-[#102044] max-lg:border-b max-lg:border-border-soft">
              <span aria-hidden="true" className="h-2 w-2 bg-[#2854d7]" />
              {band.label}
            </h5>
            <p className="m-0 border-l border-border px-5 py-4 text-sm leading-[1.65] text-fg-2 max-lg:border-l-0">
              {band.text}
            </p>
          </section>
        ))}
      </div>

      <figcaption className="mt-4 text-sm leading-[1.65] text-fg-2">
        {visual.caption}
      </figcaption>
    </figure>
  );
}
