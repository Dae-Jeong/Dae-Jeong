import type { Metadata } from "next";
import Link from "next/link";
import { AskLauncher } from "@/components/site/ask-launcher";
import { Container } from "@/components/site/container";
import { SiteFooter } from "@/components/site/site-footer";
import { TopBar } from "@/components/site/topbar";
import { Banner } from "@/components/ui/banner";
import { SectionHead } from "@/components/ui/section-head";
import { cn } from "@/lib/cn";
import { CASES, type CaseMeta } from "@/lib/cases";

export const metadata: Metadata = {
  title: "Portfolio — 김대정 · Backend Engineer",
  description: "문제·결정·시스템·운영 근거를 케이스 단위로 검증하는 포트폴리오",
};

function Arrow() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-4"
    >
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

function CaseRowBody({ c }: { c: CaseMeta }) {
  return (
    <>
      <span className="mono self-start pt-0.5 font-mono text-lg tracking-[0.06em] text-muted">
        {c.no}
      </span>
      <span className="grid gap-1.5">
        <span className="font-mono text-xl font-semibold tracking-[-0.01em]">{c.name}</span>
        <span className="font-mono text-xs uppercase tracking-[0.05em] text-muted">{c.tag}</span>
        <span className="mt-0.5 max-w-[54ch] text-sm leading-[1.55] text-fg-2">{c.blurb}</span>
      </span>
      <span className="grid content-center gap-3 max-md:mt-2 max-md:grid-flow-col max-md:justify-start max-md:gap-6">
        {[
          ["Role", c.role],
          ["Scope", c.scope],
        ].map(([k, v]) => (
          <span key={k} className="grid gap-0.5">
            <span className="font-mono text-xs uppercase tracking-[0.06em] text-muted">{k}</span>
            <span className="font-mono text-xs text-fg">{v}</span>
          </span>
        ))}
      </span>
      <span
        aria-hidden
        className="grid size-10 place-items-center justify-self-end border border-border transition-colors duration-100 group-hover:border-accent group-hover:bg-accent group-hover:text-accent-on max-md:self-center"
      >
        <Arrow />
      </span>
    </>
  );
}

const ROW_GRID =
  "grid grid-cols-[64px_minmax(0,1fr)_260px_auto] items-center gap-5 border-b border-border px-1 py-6 " +
  "max-md:grid-cols-[48px_minmax(0,1fr)_auto] max-md:gap-x-4 max-md:gap-y-3 max-md:[grid-template-areas:'no_main_go'_'no_meta_go'] " +
  "max-md:[&>*:nth-child(1)]:[grid-area:no] max-md:[&>*:nth-child(2)]:[grid-area:main] max-md:[&>*:nth-child(3)]:[grid-area:meta] max-md:[&>*:nth-child(4)]:[grid-area:go]";

export default function PortfolioPage() {
  return (
    <>
      <TopBar variant="subpage" crumb="Portfolio" />

      <Container variant="doc" className="flex-1 pb-24">
        <section className="border-b-2 border-fg pb-8 pt-14">
          <span className="font-mono text-xs uppercase tracking-[0.1em] text-muted">
            Selected Cases · 5
          </span>
          <h1 className="mt-3 font-mono text-3xl font-semibold leading-[1.06] tracking-[-0.025em]">
            Portfolio
          </h1>
          <p className="mt-4 max-w-[52ch] text-lg font-medium">
            문제 · 결정 · 시스템 · 운영 근거를 케이스 단위로 검증하는 곳. 이력서가
            요약이라면, 여기는 깊이를 확인하는 페이지입니다.
          </p>
          <div className="mt-6 flex flex-wrap gap-4 font-mono text-xs tracking-[0.04em] text-muted">
            <span>
              ROLE <b className="font-semibold text-fg">Backend Engineer</b>
            </span>
            <span>
              DOMAIN <b className="font-semibold text-fg">AI Product Systems</b>
            </span>
            <span>
              CASES <b className="font-semibold text-fg">5</b>
            </span>
          </div>
        </section>

        <section className="pt-12">
          <SectionHead no="01" title="Cases" meta="클릭해 상세로 · 5" />
          <div>
            {CASES.map((c) =>
              c.available ? (
                <Link
                  key={c.slug}
                  href={`/portfolio/${c.slug}`}
                  className={cn(
                    ROW_GRID,
                    "group focus-ring transition-[background,padding-left] duration-[180ms] hover:bg-surface hover:pl-4",
                  )}
                >
                  <CaseRowBody c={c} />
                </Link>
              ) : (
                <div
                  key={c.slug}
                  aria-disabled
                  title="상세 준비 중"
                  className={cn(ROW_GRID, "opacity-70")}
                >
                  <CaseRowBody c={c} />
                </div>
              ),
            )}
          </div>

          <Banner tag="NOTICE" variant="warn" className="mt-8">
            현재 상세가 열리는 케이스는 <b>Thready 1건</b>입니다. 나머지 4건은 상세 준비 중.
          </Banner>
        </section>
      </Container>

      <SiteFooter />
      <AskLauncher />
    </>
  );
}
