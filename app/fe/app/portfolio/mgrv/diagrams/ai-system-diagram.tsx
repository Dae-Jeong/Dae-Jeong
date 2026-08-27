import type { ReactNode } from "react";

import type { PortfolioVisual } from "@/content/portfolios/types";

type AiSystemVisual = Extract<PortfolioVisual, { kind: "ai-system" }>;

function OwnershipBlock({
  eyebrow,
  title,
  database,
  items,
  children,
}: {
  eyebrow: string;
  title: string;
  database: string;
  items: readonly string[];
  children: ReactNode;
}) {
  return (
    <section className="min-w-0 border border-[#cbd5e1] bg-white p-5">
      <p className="m-0 break-words font-mono text-xs font-semibold text-[#2854d7] [overflow-wrap:anywhere]">
        {eyebrow}
      </p>
      <h5 className="m-0 mt-2 break-words text-base font-semibold text-[#102044] [overflow-wrap:anywhere]">
        {title}
      </h5>
      <p className="m-0 mt-1 break-words text-sm text-[#536176] [overflow-wrap:anywhere]">
        {database}
      </p>
      <ul className="m-0 mt-4 grid list-none gap-1 border-t border-[#e3e8f0] p-0 pt-3 text-sm leading-[1.5] text-[#1b315f]">
        {items.map((item) => (
          <li key={item} className="break-words [overflow-wrap:anywhere]">
            {item}
          </li>
        ))}
      </ul>
      {children}
    </section>
  );
}

function FlowConnector() {
  return (
    <div
      aria-hidden="true"
      className="flex min-w-0 items-center gap-1 px-1 max-lg:flex-col max-lg:py-1"
    >
      <span className="h-px min-w-0 flex-1 bg-[#2854d7] max-lg:h-5 max-lg:w-px max-lg:flex-none" />
      <span className="font-mono text-sm leading-none text-[#2854d7] max-lg:rotate-90">→</span>
    </div>
  );
}

function DeliveryBoundary({ visual }: { visual: AiSystemVisual }) {
  return (
    <section className="flex min-w-0 flex-col justify-center border-y border-[#102044] bg-[#f8fafc] px-4 py-5 text-center">
      <p className="m-0 font-mono text-xs font-semibold text-[#102044]">
        DELIVERY BOUNDARY
      </p>
      <div className="mt-3 border-y border-[#d6deea] py-2">
        <span className="block font-mono text-[10px] font-semibold tracking-[0.08em] text-[#2854d7]">
          INPUT
        </span>
        <strong className="mt-0.5 block break-words text-xs text-[#102044] [overflow-wrap:anywhere]">
          pending delivery
        </strong>
      </div>
      <h5 className="m-0 mt-3 break-words text-base font-semibold text-[#102044] [overflow-wrap:anywhere]">
        {visual.delivery.worker}
      </h5>
      <p className="m-0 mt-3 break-words text-xs leading-[1.55] text-[#536176] [overflow-wrap:anywhere]">
        {visual.delivery.retry}
      </p>
      <p className="m-0 mt-2 break-words border-t border-[#d6deea] pt-2 text-xs leading-[1.55] text-[#536176] [overflow-wrap:anywhere]">
        {visual.delivery.transport}
        <br />
        {visual.delivery.authentication}
      </p>
      <div className="mt-3 border-t border-[#d6deea] pt-2">
        <span className="block font-mono text-[10px] font-semibold tracking-[0.08em] text-[#2854d7]">
          OUTPUT
        </span>
        <strong className="mt-0.5 block break-words text-xs text-[#102044] [overflow-wrap:anywhere]">
          authenticated event
        </strong>
      </div>
    </section>
  );
}

export function AiSystemDiagram({ visual }: { visual: AiSystemVisual }) {
  const product = visual.ownership.productBackend;
  const runtime = visual.ownership.aiRuntime;

  return (
    <figure aria-label={visual.title} className="m-0 break-inside-avoid border-0 p-0">
      <div
        className="grid grid-cols-[minmax(0,1fr)_48px_minmax(210px,0.75fr)_48px_minmax(0,1fr)] items-stretch gap-0 border-y border-[#cbd5e1] bg-white py-6 max-lg:grid-cols-1 max-lg:gap-3 max-lg:px-4"
        role="group"
        aria-label={`${visual.title} 구조`}
      >
        <OwnershipBlock
          eyebrow="PRODUCT OWNERSHIP"
          title={product.label}
          database={product.database}
          items={product.owns}
        >
          <div className="mt-5 border border-dashed border-[#a9b5c6] bg-[#f8fafc] p-3">
            <strong className="block font-mono text-[11px] text-[#536176]">
              {visual.transaction.label}
            </strong>
            <div className="mt-2 grid gap-2 text-xs leading-[1.45] text-[#1b315f]">
              <span className="break-words [overflow-wrap:anywhere]">
                {visual.transaction.items.join(" · ")}
              </span>
              <span className="break-words border-t border-[#d6deea] pt-2 font-semibold [overflow-wrap:anywhere]">
                + {visual.transaction.outbox}
              </span>
            </div>
          </div>
        </OwnershipBlock>

        <FlowConnector />
        <DeliveryBoundary visual={visual} />
        <FlowConnector />

        <OwnershipBlock
          eyebrow="AI OWNERSHIP"
          title={runtime.label}
          database={runtime.database}
          items={runtime.owns}
        >
          <div className="mt-5 border border-[#cbd5e1] p-3">
            <strong className="block break-words text-sm text-[#102044] [overflow-wrap:anywhere]">
              {visual.versionFence.rule}
            </strong>
            <p className="m-0 mt-2 break-words text-xs leading-[1.5] text-[#536176] [overflow-wrap:anywhere]">
              {visual.versionFence.outcomes.join(" · ")}
            </p>
          </div>
        </OwnershipBlock>
      </div>

      <section
        aria-label="검증 근거"
        className="mt-4 grid grid-cols-[148px_minmax(0,1fr)] border-y border-[#cbd5e1] bg-white max-sm:grid-cols-1"
      >
        <h5 className="m-0 flex items-center gap-2 px-4 py-4 font-mono text-xs font-semibold text-[#087f5b] max-sm:border-b max-sm:border-[#e3e8f0]">
          <span aria-hidden="true" className="h-2 w-2 bg-[#087f5b]" />
          VERIFIED BY
        </h5>
        <ul className="m-0 flex list-none flex-wrap items-center gap-x-5 gap-y-2 border-l border-[#e3e8f0] px-4 py-4 max-sm:border-l-0">
          {visual.verificationRail.map((item) => (
            <li
              key={item}
              className="break-words text-sm font-semibold leading-[1.45] text-[#102044] [overflow-wrap:anywhere]"
            >
              {item}
            </li>
          ))}
        </ul>
      </section>

      <figcaption className="mt-4 text-sm leading-[1.65] text-fg-2">
        {visual.caption}
      </figcaption>
    </figure>
  );
}
