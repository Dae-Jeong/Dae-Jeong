import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Container } from "@/components/site/container";
import { ReviewLauncher } from "@/components/site/review-launcher";
import { SiteFooter } from "@/components/site/site-footer";
import { TopBar } from "@/components/site/topbar";
import { HYPERNOVA_PORTFOLIO } from "@/content/portfolios/hypernova";
import type { RolePortfolio } from "@/content/portfolios/types";

import { RolePortfolioView } from "../role/role-portfolio-view";

export const metadata: Metadata = {
  title: "김대정 Portfolio · 하이퍼노바 [헤이링] Product Engineer",
  description: HYPERNOVA_PORTFOLIO.description,
  robots: {
    index: false,
    follow: false,
    noarchive: true,
    nosnippet: true,
  },
};

export default function HypernovaPortfolioPage() {
  const portfolio: RolePortfolio<"hypernova"> = HYPERNOVA_PORTFOLIO;

  if (process.env.NODE_ENV === "production") {
    notFound();
  }

  return (
    <>
      <div className="print:hidden">
        <TopBar
          variant="subpage"
          crumb={<>Portfolio / 하이퍼노바</>}
          tag="DRAFT"
        />
      </div>
      <Container variant="doc" className="flex-1 pb-24 print:pb-0">
        <RolePortfolioView
          portfolio={portfolio}
          contextLabel="하이퍼노바 · Product Engineer"
          resumeHref="/resume/hypernova"
          indexHeading="하이퍼노바 지원에서 먼저 볼 사례"
        />
      </Container>
      <div className="print:hidden">
        <SiteFooter />
      </div>
      <ReviewLauncher />
    </>
  );
}
