import Link from "next/link";
import type { RolePortfolio } from "@/content/portfolios";
import type { RolePortfolioCaseSelection } from "@/content/portfolios/types";
import { CASES, type CaseMeta } from "@/lib/cases";
import { cn } from "@/lib/cn";
import { CaseDossier } from "../case-dossier";

export type RolePortfolioOption = {
  slug: string;
  label: string;
  shortLabel: string;
  description: string;
};

function RolePortfolioNav({
  activeSlug,
  options,
}: {
  activeSlug: string;
  options: readonly RolePortfolioOption[];
}) {
  const active = options.find((option) => option.slug === activeSlug);

  return (
    <nav
      aria-label="직군별 포트폴리오 초안"
      className="mb-8 border-y border-border-soft py-4 print:hidden"
    >
      <div className="mb-3 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
        <p className="m-0 font-mono text-xs font-medium tracking-[0.06em] text-fg">
          ROLE PORTFOLIOS
        </p>
        {active ? (
          <p className="m-0 text-sm text-fg-2">{active.description}</p>
        ) : null}
      </div>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => {
          const isActive = option.slug === activeSlug;

          return (
            <Link
              key={option.slug}
              href={`/portfolio/role/${option.slug}`}
              aria-current={isActive ? "page" : undefined}
              title={option.label}
              className={cn(
                "focus-ring inline-flex min-h-11 items-center border px-3 font-mono text-xs transition-colors duration-100",
                isActive
                  ? "border-fg bg-fg text-accent-on"
                  : "border-border bg-bg text-fg-2 hover:border-fg hover:text-fg",
              )}
            >
              {option.shortLabel}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

function SupportingCaseDossier({
  meta,
  selection,
  displayNo,
}: {
  meta: CaseMeta;
  selection: Extract<RolePortfolioCaseSelection, { kind: "supporting" }>;
  displayNo: string;
}) {
  return (
    <article
      id={`case-${meta.slug}`}
      className="portfolio-role-support scroll-mt-6 border-t-2 border-fg pb-16 pt-10"
    >
      <p className="m-0 mb-4 font-mono text-xs font-semibold tracking-[0.08em] text-accent">
        SUPPORTING EVIDENCE
      </p>
      <div className="flex items-baseline justify-between gap-6 font-mono text-xs text-muted max-sm:grid max-sm:gap-1">
        <span>
          {displayNo} · {meta.tag}
        </span>
        <span>{meta.role}</span>
      </div>
      <h2 className="m-0 mt-4 text-3xl font-semibold leading-[1.12] tracking-[-0.035em] text-balance sm:text-4xl">
        {meta.name}
      </h2>
      <p className="m-0 mt-5 max-w-4xl text-base leading-[1.7] text-fg-2 text-pretty">
        {meta.blurb}
      </p>
      <div className="mt-7 grid grid-cols-[170px_minmax(0,1fr)] gap-6 border-y border-border py-4 max-sm:grid-cols-1 max-sm:gap-1">
        <span className="font-mono text-xs text-muted">이 버전에서 보는 지점</span>
        <strong className="text-sm leading-[1.6]">{selection.focus}</strong>
      </div>
      <div className="mt-7 grid grid-cols-[170px_minmax(0,1fr)] gap-6 max-sm:grid-cols-1 max-sm:gap-3">
        <p className="m-0 font-mono text-xs text-muted">확인할 근거</p>
        <ul className="m-0 grid gap-3 pl-5 text-sm leading-[1.6] text-fg-2">
          {meta.proof.map((proof) => (
            <li key={proof}>{proof}</li>
          ))}
        </ul>
      </div>
    </article>
  );
}

export function RolePortfolioView({
  portfolio,
  options,
}: {
  portfolio: RolePortfolio;
  options: readonly RolePortfolioOption[];
}) {
  const selectedCases = portfolio.cases.map((selection) => {
    const meta = CASES.find((item) => item.slug === selection.slug);
    if (!meta) {
      throw new Error(`Unknown portfolio case: ${selection.slug}`);
    }
    return { selection, meta };
  });

  return (
    <>
      <RolePortfolioNav activeSlug={portfolio.slug} options={options} />
      <main data-portfolio-document>
        <header className="border-b-2 border-fg pb-10 pt-6 print:pt-0">
          <div className="flex flex-wrap items-baseline justify-between gap-3">
            <p className="m-0 font-mono text-xs text-muted">
              Tech Lead · Backend Engineer · {portfolio.label}
            </p>
            <Link
              href={`/resume/${portfolio.slug}`}
              className="focus-ring font-mono text-xs font-semibold text-accent hover:underline print:hidden"
            >
              같은 직군 이력서 →
            </Link>
          </div>
          <p className="m-0 mt-4 text-base font-medium leading-relaxed">
            {portfolio.brandLine}
          </p>
          <h1 className="mt-4 text-[clamp(2.2rem,5vw,4.8rem)] font-semibold leading-[0.98] tracking-[-0.04em] text-balance">
            {portfolio.headline}
          </h1>
          <p className="m-0 mt-8 max-w-4xl text-lg leading-[1.72] text-fg-2 text-pretty">
            {portfolio.introduction}
          </p>
          <dl className="mt-8 grid grid-cols-3 border-y border-border max-md:grid-cols-1">
            {portfolio.proofAxes.map((axis, index) => (
              <div
                key={axis.title}
                className={cn(
                  "px-5 py-5",
                  index > 0
                    ? "border-l border-border max-md:border-l-0 max-md:border-t"
                    : "",
                )}
              >
                <dt className="font-mono text-xs text-muted">{axis.title}</dt>
                <dd className="m-0 mt-3 text-sm font-semibold leading-[1.6]">
                  {axis.description}
                </dd>
              </div>
            ))}
          </dl>
        </header>

        <nav aria-label="선택한 사례 바로가기" className="py-12 print:py-8">
          <div className="flex items-end justify-between gap-6 border-b border-border pb-4">
            <h2 className="m-0 text-2xl font-semibold tracking-[-0.025em]">
              이 직군에서 먼저 볼 사례
            </h2>
            <span className="font-mono text-xs text-muted">
              {selectedCases.length} CASES
            </span>
          </div>
          <ol className="m-0 grid list-none p-0">
            {selectedCases.map(({ selection, meta }, index) => (
              <li key={meta.slug} className="border-b border-border">
                <a
                  href={`#case-${meta.slug}`}
                  className="focus-ring grid grid-cols-[52px_minmax(0,0.72fr)_minmax(260px,1.28fr)] gap-5 py-5 hover:bg-surface max-md:grid-cols-[42px_minmax(0,1fr)]"
                >
                  <span className="font-mono text-sm text-muted">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <strong className="block text-base">{meta.shortName}</strong>
                  <span className="text-sm leading-[1.6] text-fg-2 max-md:col-start-2 max-sm:line-clamp-2 max-sm:text-xs">
                    {selection.focus}
                  </span>
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <div className="grid gap-0 print:gap-0">
          {selectedCases.map(({ selection, meta }, index) => {
            const displayNo = String(index + 1).padStart(2, "0");

            if (selection.kind === "supporting") {
              return (
                <SupportingCaseDossier
                  key={meta.slug}
                  meta={meta}
                  selection={selection}
                  displayNo={displayNo}
                />
              );
            }

            return (
              <CaseDossier
                key={meta.slug}
                meta={meta}
                displayNo={displayNo}
                focus={selection.focus}
              />
            );
          })}
        </div>
      </main>
    </>
  );
}
