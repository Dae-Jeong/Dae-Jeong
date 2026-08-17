import type { PortfolioVisual } from "@/content/portfolios/types";

type AxWorkflowVisual = Extract<PortfolioVisual, { kind: "ax-workflow" }>;

const stageTone: Record<
  AxWorkflowVisual["stages"][number]["role"],
  string
> = {
  human: "border-border bg-bg",
  contract: "border-fg bg-surface print:bg-transparent",
  ai: "border-border bg-bg",
  system: "border-border bg-bg",
};

export function AxWorkflowDiagram({
  visual,
}: {
  visual: AxWorkflowVisual;
}) {
  return (
    <figure
      aria-label={visual.title}
      className="m-0 break-inside-avoid border-y border-border py-6"
    >
      <ol className="m-0 flex list-none items-stretch p-0 max-lg:flex-col">
        {visual.stages.map((stage, index) => {
          const isContract = stage.role === "contract";
          const hasNext = index < visual.stages.length - 1;

          return (
            <li
              key={`${stage.role}-${stage.label}`}
              className="flex min-w-0 flex-1 items-center max-lg:flex-col"
            >
              <div
                data-role={stage.role}
                className={`flex min-h-[86px] w-full min-w-0 flex-col justify-center border-y px-3 py-3 ${stageTone[stage.role]} ${isContract ? "border-y-2" : ""}`}
              >
                <strong className="whitespace-nowrap text-sm font-semibold leading-[1.4]">
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
                  className="flex shrink-0 items-center justify-center px-1.5 font-mono text-sm text-muted max-lg:h-8 max-lg:rotate-90 max-lg:px-0"
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
            className="grid grid-cols-[196px_minmax(0,1fr)] border-y border-border max-lg:grid-cols-1"
          >
            <h5 className="m-0 bg-surface px-5 py-4 text-sm font-semibold leading-[1.45] max-lg:border-b max-lg:border-border-soft print:bg-transparent">
              {band.label}
            </h5>
            <p className="m-0 border-l border-border px-5 py-4 text-sm leading-[1.65] text-fg-2 max-lg:border-l-0">
              {band.text}
            </p>
          </section>
        ))}
      </div>

      <figcaption className="mt-4 max-w-[76ch] text-sm leading-[1.65] text-fg-2">
        {visual.caption}
      </figcaption>
    </figure>
  );
}
