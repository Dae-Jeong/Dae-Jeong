import { CompanyDocumentPage, type DocumentSearch } from "../../documents/company-document";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Container } from "@/components/site/container";
import { ReviewLauncher } from "@/components/site/review-launcher";
import { SiteFooter } from "@/components/site/site-footer";
import { TopBar } from "@/components/site/topbar";
import { MIRIDIH_PORTFOLIO } from "@/content/portfolios/miridih";
import type { RolePortfolio } from "@/content/portfolios/types";

import { RolePortfolioView } from "../role/role-portfolio-view";

export const metadata: Metadata = {
  title: "김대정 Portfolio · 미리디 [미리캔버스] Product Engineer",
  description: MIRIDIH_PORTFOLIO.description,
  robots: {
    index: false,
    follow: false,
    noarchive: true,
    nosnippet: true,
  },
};

export default async function MiridihPortfolioPage({ searchParams }: { searchParams: DocumentSearch }) {
  const { revision } = await searchParams;
  if (revision) return <CompanyDocumentPage company="miridih" kind="portfolio" revision={revision} />;
  const portfolio: RolePortfolio<"miridih"> = MIRIDIH_PORTFOLIO;

  if (process.env.NODE_ENV === "production") {
    notFound();
  }

  return (
    <>
      <div className="print:hidden">
        <TopBar
          variant="subpage"
          crumb={<>Portfolio / 미리디</>}
          tag="DRAFT"
        />
      </div>
      <Container variant="doc" className="flex-1 pb-24 print:pb-0">
        <RolePortfolioView
          portfolio={portfolio}
          contextLabel="미리디 · Product Engineer"
          resumeHref="/resume/miridih"
          indexHeading="미리디 지원에서 먼저 볼 사례"
        />
      </Container>
      <div className="print:hidden">
        <SiteFooter />
      </div>
      <ReviewLauncher />
    </>
  );
}
