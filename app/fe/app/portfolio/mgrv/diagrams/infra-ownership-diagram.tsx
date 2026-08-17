import type { PortfolioVisual } from "@/content/portfolios/types";

type InfraOwnershipVisual = Extract<
  PortfolioVisual,
  { kind: "infra-ownership" }
>;

export function InfraOwnershipDiagram({
  visual,
}: {
  visual: InfraOwnershipVisual;
}) {
  return (
    <figure
      aria-label={visual.title}
      className="m-0 break-inside-avoid border-y border-border py-6"
    >
 <section className="grid grid-cols-[180px_minmax(0,1fr)] border-y border-border max-lg:grid-cols-1">
 <h5 className="m-0 border-r border-border bg-surface px-5 py-4 text-sm font-semibold max-lg:border-b max-lg:border-r-0">
          제품·환경 경계
        </h5>
        <ul className="m-0 flex list-none flex-wrap gap-2 p-4">
          {visual.productBoundaries.map((boundary) => (
            <li
              key={boundary}
              className="border border-border px-3 py-2 text-sm font-semibold leading-[1.4]"
            >
              {boundary}
            </li>
          ))}
        </ul>
      </section>

      <div className="mt-4 border-y border-border">
        {visual.layers.map((layer) => (
          <section
            key={layer.label}
 className="grid grid-cols-[180px_minmax(0,1fr)_84px] border-t border-border-soft first:border-t-0 max-lg:grid-cols-[minmax(0,1fr)_84px]"
          >
 <h5 className="m-0 border-r border-border-soft bg-surface px-5 py-5 text-sm font-semibold leading-[1.45] max-lg:col-span-2 max-lg:border-b max-lg:border-r-0 max-lg:px-4 max-lg:py-3">
              {layer.label}
            </h5>
 <ul className="m-0 flex list-none flex-wrap items-center gap-x-5 gap-y-2 px-5 py-5 max-lg:px-4 max-lg:py-4">
              {layer.items.map((item) => (
                <li
                  key={item}
                  className="text-sm font-medium leading-[1.5] text-fg-2"
                >
                  {item}
                </li>
              ))}
            </ul>
            <div className="flex items-center justify-center border-l border-border-soft px-3 py-4">
              <span
                className={
                  layer.owned
                    ? "border border-fg bg-fg px-2 py-1 font-mono text-xs font-semibold text-bg print:bg-transparent print:text-fg"
                    : "font-mono text-xs text-muted"
                }
              >
                {layer.owned ? "OWNED" : "USES"}
              </span>
            </div>
          </section>
        ))}
      </div>

      {visual.supportingProof && (
 <section className="mt-4 grid grid-cols-[180px_minmax(0,1fr)] border-y border-success max-lg:grid-cols-1">
 <h5 className="m-0 bg-bg px-5 py-4 text-sm font-semibold text-success max-lg:border-b max-lg:border-success">
            {visual.supportingProof.label}
          </h5>
 <ul className="m-0 flex list-none flex-wrap items-center gap-x-5 gap-y-2 border-l border-success px-5 py-4 max-lg:border-l-0">
            {visual.supportingProof.items.map((item) => (
              <li key={item} className="text-sm font-medium leading-[1.5]">
                {item}
              </li>
            ))}
          </ul>
        </section>
      )}

      <figcaption className="mt-4 max-w-[76ch] text-sm leading-[1.65] text-fg-2">
        {visual.caption}
      </figcaption>
    </figure>
  );
}
