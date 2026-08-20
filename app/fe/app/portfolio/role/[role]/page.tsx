import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/site/container";
import { ReviewLauncher } from "@/components/site/review-launcher";
import { SiteFooter } from "@/components/site/site-footer";
import { TopBar } from "@/components/site/topbar";
import {
  canViewRolePortfolio,
  getRolePortfolio,
  listRolePortfolios,
} from "@/content/portfolios";
import { RolePortfolioView } from "../role-portfolio-view";

type PageProps = {
  params: Promise<{ role: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { role } = await params;
  const portfolio = getRolePortfolio(role);

  if (!portfolio || !canViewRolePortfolio(portfolio)) {
    return { title: "Portfolio — 김대정" };
  }

  return {
    title: `${portfolio.label} Portfolio — 김대정`,
    description: portfolio.description,
    robots: {
      index: false,
      follow: false,
      noarchive: true,
      nosnippet: true,
    },
  };
}

export default async function RolePortfolioPage({ params }: PageProps) {
  const { role } = await params;
  const portfolio = getRolePortfolio(role);

  if (!portfolio || !canViewRolePortfolio(portfolio)) notFound();

  return (
    <>
      <div className="print:hidden">
        <TopBar
          variant="subpage"
          crumb={<>Portfolio / {portfolio.shortLabel}</>}
          tag="DRAFT"
        />
      </div>
      <Container variant="doc" className="flex-1 pb-24 print:pb-0">
        <RolePortfolioView
          portfolio={portfolio}
          options={listRolePortfolios()}
        />
      </Container>
      <div className="print:hidden">
        <SiteFooter />
      </div>
      <ReviewLauncher />
    </>
  );
}
