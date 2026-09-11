import { CompanyDocumentPage, type DocumentSearch } from "../../documents/company-document";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Container } from "@/components/site/container";
import { ReviewLauncher } from "@/components/site/review-launcher";
import { SiteFooter } from "@/components/site/site-footer";
import { TopBar } from "@/components/site/topbar";
import { JYP_PORTFOLIO } from "@/content/portfolios/jyp";
import type { RolePortfolio } from "@/content/portfolios/types";

import { RolePortfolioView } from "../role/role-portfolio-view";

export const metadata: Metadata = {
  title: "김대정 Portfolio · JYP ENTERTAINMENT Software Engineer / AI",
  description: JYP_PORTFOLIO.description,
  robots: {
    index: false,
    follow: false,
    noarchive: true,
    nosnippet: true,
  },
};

export default async function JypPortfolioPage({ searchParams }: { searchParams: DocumentSearch }) {
  const { revision } = await searchParams;
  if (revision) return <CompanyDocumentPage company="jyp" kind="portfolio" revision={revision} />;
  const portfolio: RolePortfolio<"jyp"> = JYP_PORTFOLIO;

  if (process.env.NODE_ENV === "production") {
    notFound();
  }

  return (
    <>
      <div className="print:hidden">
        <TopBar
          variant="subpage"
          crumb={<>Portfolio / JYP ENTERTAINMENT</>}
          tag="DRAFT"
        />
      </div>
      <Container variant="doc" className="flex-1 pb-24 print:pb-0">
        <RolePortfolioView
          portfolio={portfolio}
          contextLabel="JYP ENTERTAINMENT · Software Engineer / AI"
          resumeHref="/resume/jyp"
          indexHeading="JYP 지원에서 먼저 볼 사례"
        />
      </Container>
      <div className="print:hidden">
        <SiteFooter />
      </div>
      <ReviewLauncher />
    </>
  );
}
