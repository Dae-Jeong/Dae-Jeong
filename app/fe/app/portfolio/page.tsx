import type { Metadata } from "next";
import Link from "next/link";
import { AskLauncher } from "@/components/site/ask-launcher";
import { Container } from "@/components/site/container";
import { SiteFooter } from "@/components/site/site-footer";
import { TopBar } from "@/components/site/topbar";
import { Banner } from "@/components/ui/banner";
import { SectionHead } from "@/components/ui/section-head";
import { ACHIEVEMENTS, CASES } from "@/lib/cases";

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
          <p className="mt-4 text-lg font-medium">
            <b className="font-semibold">성과를 먼저 두고, 그 근거가 된 프로젝트를 예시로 답니다.</b>{" "}
            이력서가 요약이라면 여기는 문제·결정·시스템·운영 근거까지 확인하는 곳입니다.
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
          <SectionHead no="01" title="성과" meta="Achievements · 4" />
          <div className="grid gap-px bg-border-soft">
            {ACHIEVEMENTS.map((a) => (
              <div key={a.no} data-claim={a.claimIds.join(" ")} className="bg-bg py-7">
                <div className="grid grid-cols-[64px_minmax(0,1fr)] gap-5 max-md:grid-cols-[48px_minmax(0,1fr)] max-md:gap-4">
                  <span className="font-mono text-lg tracking-[0.06em] text-muted">{a.no}</span>
                  <div className="grid gap-2.5">
                    <h3 className="m-0 text-xl font-semibold leading-[1.35] tracking-[-0.01em] max-md:text-lg">
                      {a.claim}
                    </h3>
                    <p className="m-0 text-sm leading-[1.6] text-fg-2">{a.proof}</p>
                    <div className="mt-1 grid gap-px bg-border-soft">
                      {a.cases.map((slug) => {
                        const c = CASES.find((x) => x.slug === slug);
                        if (!c) return null;
                        return (
                          <Link
                            key={slug}
                            href={`/portfolio/${c.slug}`}
                            className="group focus-ring flex items-center gap-3 bg-bg py-2.5 transition-[background,padding-left] duration-[180ms] hover:bg-surface hover:pl-3"
                          >
                            <span className="font-mono text-xs tracking-[0.06em] text-muted">
                              예시 {c.no}
                            </span>
                            <span className="font-mono text-sm font-semibold">{c.name}</span>
                            <span className="font-mono text-xs text-muted max-sm:hidden">{c.tag}</span>
                            <span
                              aria-hidden
                              className="ml-auto grid size-7 place-items-center border border-border transition-colors duration-100 group-hover:border-accent group-hover:bg-accent group-hover:text-accent-on"
                            >
                              <Arrow />
                            </span>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <Banner tag="NOTICE" className="mt-8">
            케이스 하나가 <b>여러 성과의 근거</b>가 되기도 합니다. 각 상세 페이지에서
            문제·결정·시스템·운영 근거를 확인할 수 있습니다.
          </Banner>
        </section>

      </Container>

      <SiteFooter />
      <AskLauncher />
    </>
  );
}
