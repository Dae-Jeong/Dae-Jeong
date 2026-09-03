import {
  FEATURING_CASE_DETAILS,
  type FeaturingCaseDetail,
} from "@/content/portfolios/featuring";
import type { RolePortfolioCaseSelection } from "@/content/portfolios/types";
import type { CaseMeta } from "@/lib/cases";
import { cn } from "@/lib/cn";
import { DesignSection } from "../diagrams/design-section";

function getDetail(slug: CaseMeta["slug"]): FeaturingCaseDetail {
  const detail = FEATURING_CASE_DETAILS.find((item) => item.slug === slug);

  if (!detail) {
    throw new Error(`Missing Featuring case detail: ${slug}`);
  }

  return detail;
}

export function FeaturingCase({
  meta,
  selection,
  displayNo,
}: {
  meta: CaseMeta;
  selection: Extract<RolePortfolioCaseSelection, { kind: "dossier" }>;
  displayNo: string;
}) {
  const detail = getDetail(meta.slug);

  return (
    <article
      id={`case-${meta.slug}`}
      className="portfolio-case featuring-case scroll-mt-20 border-t-2 border-[var(--portfolio-ink)] pb-16 pt-10"
    >
      <header>
        <div className="flex flex-wrap items-baseline justify-between gap-3 text-xs text-muted max-sm:grid max-sm:gap-2">
          <span>
            {displayNo} · {detail.eyebrow}
          </span>
          <span>{selection.scope}</span>
        </div>
        <h2 className="m-0 mt-4 max-w-[26ch] text-[clamp(1.6rem,2.6vw,2.3rem)] font-semibold leading-[1.18] tracking-[-0.03em] text-balance">
          {detail.title}
        </h2>
        <p className="m-0 mt-5 max-w-[66ch] text-base leading-[1.72] text-fg-2 text-pretty">
          {detail.summary}
        </p>
        <div className="mt-7 grid grid-cols-[170px_minmax(0,1fr)] gap-6 border-y border-border py-4 max-sm:grid-cols-1 max-sm:gap-1">
          <span className="font-mono text-xs text-muted">이 버전에서 보는 지점</span>
          <strong className="text-sm leading-[1.65]">{selection.focus}</strong>
        </div>
      </header>

      <figure className="m-0 mt-10 border-y border-border bg-surface px-5 py-6 sm:px-7">
        <div className="mb-5 flex flex-wrap items-baseline justify-between gap-3 border-b border-border pb-4">
          <strong className="text-sm text-[var(--portfolio-ink)]">
            핵심 책임과 상태 흐름
          </strong>
          <span className="font-mono text-[11px] text-[var(--portfolio-blue)]">
            상태 흐름
          </span>
        </div>
        <ol className="m-0 grid list-none grid-cols-[repeat(7,minmax(0,1fr))] items-stretch gap-3 p-0 max-lg:grid-cols-1">
          {detail.flow.map((node, index) => (
            <li key={node.label} className="contents max-lg:block">
              <div
                className={cn(
                  "border px-4 py-4",
                  node.tone === "decision" &&
                    "border-[var(--portfolio-blue)] bg-[var(--portfolio-blue-soft)]",
                  node.tone === "outcome" &&
                    "border-[var(--portfolio-ink)] bg-[var(--portfolio-ink)] text-white",
                  (!node.tone || node.tone === "context") &&
                    "border-border bg-white",
                )}
              >
                <strong className="block text-sm leading-[1.45]">{node.label}</strong>
                <span
                  className={cn(
                    "mt-1 block text-xs leading-[1.5]",
                    node.tone === "outcome" ? "text-[#dce4f4]" : "text-fg-2",
                  )}
                >
                  {node.detail}
                </span>
              </div>
              {index < detail.flow.length - 1 ? (
                <span
                  aria-hidden="true"
                  className="grid place-items-center font-mono text-muted max-lg:h-7 max-lg:rotate-90"
                >
                  →
                </span>
              ) : null}
            </li>
          ))}
        </ol>
      </figure>

      <div className="mt-12 grid gap-12">
        {detail.blocks.map((block) => (
          <section
            key={block.label}
            className="grid grid-cols-[170px_minmax(0,1fr)] gap-6 max-sm:grid-cols-1 max-sm:gap-3"
          >
            <p className="m-0 font-mono text-xs font-semibold tracking-[0.06em] text-[var(--portfolio-blue)]">
              {block.label}
            </p>
            <div>
              <h3 className="m-0 text-2xl font-semibold tracking-[-0.025em] text-[var(--portfolio-ink)]">
                {block.title}
              </h3>
              <p className="m-0 mt-4 text-sm leading-[1.72] text-fg-2 text-pretty">
                {block.text}
              </p>
              {block.items?.length ? (
                <ul className="m-0 mt-6 grid gap-3 border-y border-border py-5 pl-5 text-sm leading-[1.68] text-fg-2">
                  {block.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              ) : null}
            </div>
          </section>
        ))}
      </div>

      <DesignSection ids={detail.designs} />

      <section className="mt-12 grid grid-cols-2 border-y border-border max-md:grid-cols-1">
        <div className="px-6 py-7 max-md:border-b max-md:border-border">
          <p className="m-0 font-mono text-[11px] font-semibold tracking-[0.08em] text-muted">
            담당 범위와 한계
          </p>
          <p className="m-0 mt-4 text-sm leading-[1.72] text-fg-2 text-pretty">
            {detail.boundary}
          </p>
        </div>
        <div className="border-l border-border bg-[var(--portfolio-blue-soft)] px-6 py-7 max-md:border-l-0">
          <p className="m-0 font-mono text-[11px] font-semibold tracking-[0.08em] text-[var(--portfolio-blue)]">
            피처링 JD와의 연결
          </p>
          <p className="m-0 mt-4 text-sm font-medium leading-[1.72] text-[var(--portfolio-ink)] text-pretty">
            {detail.jdFit}
          </p>
        </div>
      </section>
    </article>
  );
}
