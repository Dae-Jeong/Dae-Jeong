import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Container } from "@/components/site/container";
import { ReviewLauncher } from "@/components/site/review-launcher";
import { SiteFooter } from "@/components/site/site-footer";
import { TopBar } from "@/components/site/topbar";
import { SectionHead } from "@/components/ui/section-head";
import { PINOKIOLAB_PORTFOLIO } from "@/content/portfolios/pinokiolab";
import type { TailoredPortfolio } from "@/content/portfolios/types";

import { WorkSystemDiagram } from "../mgrv/diagrams";
import {
  OutcomeNavigator,
  type PortfolioNavItem,
} from "../mgrv/outcome-navigator";
import { OutcomeVisual } from "../mgrv/outcome-visual";
import {
  CareerBridgeSection,
  CaseDetails,
  CaseMeta,
  CaseNarrative,
  EvidenceRows,
  JdFitSection,
} from "../mgrv/portfolio-sections";

export const metadata: Metadata = {
  title: "피노키오랩 Backend Engineer 지원 포트폴리오 · 김대정",
  description: PINOKIOLAB_PORTFOLIO.introduction.join(" "),
  robots: {
    index: false,
    follow: false,
    noarchive: true,
    nosnippet: true,
  },
};

const navigationItems: PortfolioNavItem[] = [
  {
    id: "career-bridge",
    no: "00",
    title: PINOKIOLAB_PORTFOLIO.careerBridge.title,
  },
  ...PINOKIOLAB_PORTFOLIO.outcomes.map((outcome) => ({
    id: `outcome-${outcome.no}`,
    no: outcome.no,
    title: outcome.title,
  })),
  {
    id: "work-system",
    no: String(PINOKIOLAB_PORTFOLIO.outcomes.length + 1).padStart(2, "0"),
    title: PINOKIOLAB_PORTFOLIO.workSystem.title,
  },
];

export default function PinokiolabPortfolioPage() {
  const portfolio: TailoredPortfolio = PINOKIOLAB_PORTFOLIO;

  if (
    process.env.NODE_ENV === "production" &&
    portfolio.visibility !== "public"
  ) {
    notFound();
  }

  return (
    <>
      <div className="print:hidden">
        <TopBar
          variant="subpage"
          crumb={
            <>
              <Link href="/portfolio" className="focus-ring hover:text-fg">
                Portfolio
              </Link>{" "}
              / 피노키오랩
            </>
          }
        />
      </div>

      <Container variant="doc" className="flex-1">
        <main
          data-portfolio-document
          className="w-full pb-24 pt-12 print:pb-0 print:pt-0"
        >
          <header className="portfolio-hero pb-10">
            <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-3">
              <p className="m-0 font-mono text-xs font-medium text-muted">
                {portfolio.companyName} · {portfolio.position}
              </p>
              <div className="flex flex-wrap items-center gap-4 font-mono text-xs text-muted">
                <span>DRAFT · {portfolio.updatedAt}</span>
                <Link
                  href="/resume/pinokiolab"
                  className="focus-ring border-b border-fg pb-0.5 font-medium text-fg hover:border-transparent"
                >
                  맞춤 이력서 보기
                </Link>
              </div>
            </div>
            <h1 className="mt-4 text-4xl font-semibold leading-[1.08] tracking-[-0.03em] max-sm:text-3xl">
              Backend Engineering Portfolio
            </h1>
            <div className="mt-6 grid max-w-[920px] gap-2 text-lg font-medium leading-[1.65]">
              {portfolio.introduction.map((paragraph) => (
                <p key={paragraph} className="m-0 text-pretty">
                  {paragraph}
                </p>
              ))}
            </div>
          </header>

          <nav aria-label="사례 빠른 보기" className="pt-14">
            <p className="m-0 mb-3 font-mono text-xs font-medium text-muted">
              Technical Cases · {portfolio.outcomes.length}
            </p>
            <ol className="portfolio-case-index m-0 grid list-none border-y border-border p-0">
              {portfolio.outcomes.map((outcome) => (
                <li
                  key={outcome.no}
                  className="border-t border-border-soft first:border-t-0"
                >
                  <a
                    href={`#outcome-${outcome.no}`}
                    className="focus-ring group grid grid-cols-[52px_380px_minmax(0,1fr)] items-baseline gap-5 py-5 transition-colors duration-100 hover:bg-surface max-lg:grid-cols-[52px_minmax(0,1fr)]"
                  >
                    <span className="font-mono text-xs text-muted">
                      {outcome.no}
                    </span>
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

          <CareerBridgeSection bridge={portfolio.careerBridge} />

          <div className="pt-6">
            {portfolio.outcomes.map((outcome) => (
              <section
                key={outcome.no}
                id={`outcome-${outcome.no}`}
                className="portfolio-case scroll-mt-6 border-t-2 border-fg pt-16 first:border-t-0 first:pt-14"
              >
                <header className="portfolio-case-header break-inside-avoid">
                  <div className="[&>div>h2]:font-sans [&>div>h2]:tracking-normal">
                    <SectionHead
                      no={outcome.no}
                      title={outcome.title}
                      size="doc"
                    />
                  </div>
                  <p className="m-0 max-w-[980px] text-xl font-semibold leading-[1.55] tracking-[-0.01em] max-sm:text-lg">
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
                <JdFitSection
                  jdFit={outcome.jdFit}
                  companyName={portfolio.companyName}
                />
              </section>
            ))}
          </div>

          <section id="work-system" className="scroll-mt-6 pt-20">
            <WorkSystemDiagram workSystem={portfolio.workSystem} />
          </section>
        </main>

        <div className="print:hidden">
          <SiteFooter />
        </div>
      </Container>

      <OutcomeNavigator items={navigationItems} />
      <ReviewLauncher />
    </>
  );
}
