import type { PortfolioVisual } from "@/content/portfolios/types";

type RuntimeRecoveryVisual = Extract<
  PortfolioVisual,
  { kind: "runtime-recovery" }
>;

export function RuntimeRecoveryDiagram({
  visual,
}: {
  visual: RuntimeRecoveryVisual;
}) {
  return (
    <figure
      aria-label={visual.title}
      className="m-0 break-inside-avoid border-y border-border py-6"
    >
      <div className="grid grid-cols-[minmax(0,1fr)_48px_minmax(0,1fr)] items-stretch max-sm:grid-cols-1">
        <section className="border border-border px-5 py-4">
          <span className="font-mono text-xs text-muted">API</span>
          <p className="m-0 mt-2 text-base font-semibold leading-[1.5]">
            {visual.request}
          </p>
        </section>
        <div
          aria-hidden="true"
          className="flex items-center justify-center font-mono text-sm text-muted max-sm:h-8 max-sm:rotate-90"
        >
          →
        </div>
        <section className="border-2 border-fg px-5 py-4">
          <span className="font-mono text-xs text-muted">WORKER</span>
          <p className="m-0 mt-2 text-base font-semibold leading-[1.5]">
            {visual.worker}
          </p>
        </section>
      </div>

      <ol
        aria-label="작업 상태 흐름"
        className="m-0 mt-5 flex list-none items-stretch p-0 max-md:flex-col"
      >
        {visual.states.map((state, index) => (
          <li key={state} className="flex min-w-0 flex-1 items-center max-md:flex-col">
            {index > 0 && (
              <span
                aria-hidden="true"
                className="px-2 font-mono text-sm text-muted max-md:py-1 max-md:rotate-90"
              >
                →
              </span>
            )}
            <div className="w-full border border-border px-4 py-4">
              <span className="font-mono text-xs text-muted">
                STATE {String(index + 1).padStart(2, "0")}
              </span>
              <strong className="mt-2 block text-sm leading-[1.45]">
                {state}
              </strong>
            </div>
          </li>
        ))}
      </ol>

      <div className="mt-4 grid grid-cols-[minmax(180px,0.7fr)_minmax(0,1.3fr)] border-y border-border max-md:grid-cols-1">
        <section className="bg-fg px-5 py-5 text-bg print:bg-transparent print:text-fg">
          <span className="font-mono text-xs opacity-65">FAILURE</span>
          <p className="m-0 mt-2 text-base font-semibold leading-[1.5]">
            {visual.failure}
          </p>
        </section>
        <section className="border-l border-border px-5 py-5 max-md:border-l-0 max-md:border-t">
          <span className="font-mono text-xs text-muted">RECOVERY PATH</span>
          <ol className="m-0 mt-3 flex list-none flex-wrap items-center gap-y-2 p-0">
            {visual.recovery.map((step, index) => (
              <li key={step} className="flex items-center">
                {index > 0 && (
                  <span aria-hidden="true" className="px-2 font-mono text-muted">
                    →
                  </span>
                )}
                <span className="border border-border bg-surface px-3 py-2 text-sm font-semibold leading-[1.45]">
                  {step}
                </span>
              </li>
            ))}
          </ol>
        </section>
      </div>

      <div className="mt-4 grid grid-cols-[132px_minmax(0,1fr)] border-y border-border-soft py-4 max-sm:grid-cols-1 max-sm:gap-2">
        <strong className="font-mono text-xs text-muted">
          PRIOR LESSON · 별도 사례
        </strong>
        <p className="m-0 text-sm leading-[1.65] text-fg-2">
          {visual.priorLesson}
        </p>
      </div>

      <figcaption className="mt-4 text-sm leading-[1.65] text-fg-2">
        {visual.caption}
      </figcaption>
    </figure>
  );
}
