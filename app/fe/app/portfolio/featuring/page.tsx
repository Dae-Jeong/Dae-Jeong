import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Container } from "@/components/site/container";
import { ReviewLauncher } from "@/components/site/review-launcher";
import { SiteFooter } from "@/components/site/site-footer";
import { TopBar } from "@/components/site/topbar";
import { FEATURING_PORTFOLIO } from "@/content/portfolios/featuring";
import type { RolePortfolio } from "@/content/portfolios/types";

import { RolePortfolioView } from "../role/role-portfolio-view";

export const metadata: Metadata = {
  title: "김대정 Portfolio · 피처링 Backend Engineer",
  description: FEATURING_PORTFOLIO.description,
  robots: {
    index: false,
    follow: false,
    noarchive: true,
    nosnippet: true,
  },
};

export default function FeaturingPortfolioPage() {
  const portfolio: RolePortfolio<"featuring"> = FEATURING_PORTFOLIO;

  if (process.env.NODE_ENV === "production") {
    notFound();
  }

  return (
    <>
      <div className="print:hidden">
        <TopBar
          variant="subpage"
          crumb={<>Portfolio / 피처링</>}
          tag="DRAFT"
        />
      </div>
      <Container variant="doc" className="flex-1 pb-24 print:pb-0">
        <RolePortfolioView
          portfolio={portfolio}
          contextLabel="피처링 · Backend Engineer"
          resumeHref="/resume/featuring"
          indexHeading="피처링 지원에서 먼저 볼 사례"
        />
      </Container>
      <div className="print:hidden">
        <SiteFooter />
      </div>
      <ReviewLauncher />
    </>
  );
}
