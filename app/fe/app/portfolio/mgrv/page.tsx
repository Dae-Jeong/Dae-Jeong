import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Container } from "@/components/site/container";
import { SiteFooter } from "@/components/site/site-footer";
import { TopBar } from "@/components/site/topbar";
import { SectionHead } from "@/components/ui/section-head";
import { MGRV_PORTFOLIO } from "@/content/portfolios/mgrv";
import type { TailoredPortfolio } from "@/content/portfolios/types";

import { WorkSystemDiagram } from "./diagrams";
import { OutcomeNavigator, type PortfolioNavItem } from "./outcome-navigator";
import { OutcomeVisual } from "./outcome-visual";
import {
  CareerBridgeSection,
  CaseDetails,
  CaseMeta,
  CaseNarrative,
  EvidenceRows,
  JdFitSection,
} from "./portfolio-sections";

export const metadata: Metadata = {
  title: "MGRV Backend Engineer 지원 포트폴리오 · 김대정",
  description: MGRV_PORTFOLIO.introduction.join(" "),
  robots: { index: false, follow: false },
};

const navigationItems: PortfolioNavItem[] = [
  {
    id: "career-bridge",
    no: "00",
    title: MGRV_PORTFOLIO.careerBridge.title,
  },
  ...MGRV_PORTFOLIO.outcomes.map((outcome) => ({
    id: `outcome-${outcome.no}`,
    no: outcome.no,
    title: outcome.title,
  })),
  {
    id: "work-system",
    no: String(MGRV_PORTFOLIO.outcomes.length + 1).padStart(2, "0"),
    title: MGRV_PORTFOLIO.workSystem.title,
  },
];

export default function MgrvPortfolioPage() {
  const portfolio: TailoredPortfolio = MGRV_PORTFOLIO;

  if (
    process.env.NODE_ENV === "production" &&
    portfolio.visibility !== "public"
  ) {
    notFound();
  }

  return (
    <>
      <TopBar
        variant="subpage"
        crumb={
          <>
            <Link href="/portfolio" className="focus-ring hover:text-fg">
              Portfolio
            </Link>{" "}
            / MGRV
          </>
        }
      />

      <Container variant="doc" className="flex-1">
        <main className="w-full pb-24 pt-12">
          <header className="border-b-2 border-fg pb-10">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="m-0 font-mono text-xs uppercase tracking-[0.08em] text-muted">
                {MGRV_PORTFOLIO.companyName} · {MGRV_PORTFOLIO.position}
              </p>
              <p className="m-0 font-mono text-xs uppercase tracking-[0.06em] text-muted">
                Updated · {MGRV_PORTFOLIO.updatedAt}
              </p>
            </div>
            <h1 className="mt-4 text-4xl font-semibold leading-[1.08] tracking-[-0.03em] max-sm:text-3xl">
              지원 포트폴리오
            </h1>
            <div className="mt-6 grid gap-2 text-lg font-medium leading-[1.65]">
              {MGRV_PORTFOLIO.introduction.map((paragraph) => (
                <p key={paragraph} className="m-0">
                  {paragraph}
                </p>
              ))}
            </div>
          </header>

          <nav aria-label="사례 빠른 보기" className="pt-14">
            <p className="m-0 mb-3 font-mono text-xs uppercase tracking-[0.08em] text-muted">
              Cases · {MGRV_PORTFOLIO.outcomes.length}
            </p>
            <ol className="m-0 grid list-none border-y border-border p-0">
              {MGRV_PORTFOLIO.outcomes.map((outcome) => (
                <li
                  key={outcome.no}
                  className="border-t border-border-soft first:border-t-0"
                >
                  <a
                    href={`#outcome-${outcome.no}`}
                    className="focus-ring group grid grid-cols-[52px_340px_minmax(0,1fr)] items-baseline gap-5 py-5 transition-colors duration-100 hover:bg-surface max-lg:grid-cols-[52px_minmax(0,1fr)]"
                  >
                    <span className="font-mono text-xs text-muted">{outcome.no}</span>
                    <strong className="text-base font-semibold leading-[1.45]">
                      {outcome.title}
                    </strong>
                    <span className="text-sm leading-[1.65] text-fg-2 max-lg:col-start-2">
                      {outcome.outcomeLine}
                    </span>
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          <CareerBridgeSection bridge={MGRV_PORTFOLIO.careerBridge} />

          <div className="pt-6">
            {MGRV_PORTFOLIO.outcomes.map((outcome) => (
              <section
                key={outcome.no}
                id={`outcome-${outcome.no}`}
                className="scroll-mt-6 border-t-2 border-fg pt-16 first:border-t-0 first:pt-14"
              >
                <header className="break-inside-avoid">
                  <div className="[&>div>h2]:font-sans [&>div>h2]:tracking-normal">
                    <SectionHead no={outcome.no} title={outcome.title} size="doc" />
                  </div>
                  <p className="m-0 text-xl font-semibold leading-[1.55] tracking-[-0.01em] max-sm:text-lg">
                    {outcome.outcomeLine}
                  </p>
                  <CaseMeta outcome={outcome} />
                </header>

                <CaseNarrative narrative={outcome.narrative} />
                <OutcomeVisual
                  visual={outcome.visual}
                  lead={outcome.narrative.visualLead}
                />
                <CaseDetails details={outcome.details} />
                <EvidenceRows evidence={outcome.evidence.slice(0, 2)} />
                <JdFitSection jdFit={outcome.jdFit} />
              </section>
            ))}
          </div>

          <section id="work-system" className="scroll-mt-6 pt-20">
            <WorkSystemDiagram workSystem={MGRV_PORTFOLIO.workSystem} />
          </section>
        </main>

        <SiteFooter />
      </Container>

      <OutcomeNavigator items={navigationItems} />
    </>
  );
}
