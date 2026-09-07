import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ApplicationVersionNav } from "@/components/site/application-version-nav";
import { JYP_V2_PORTFOLIO } from "@/content/portfolios/jyp-v2";
import { ResumePageShell } from "@/app/resume/resume-page-shell";
import { NarrativePortfolioView } from "../narrative-portfolio-view";

export const metadata: Metadata = {
  title: "JYP v2 Portfolio — 김대정",
  description: JYP_V2_PORTFOLIO.introduction,
  robots: { index: false, follow: false, noarchive: true, nosnippet: true },
};

export default function JypV2PortfolioPage() {
  if (process.env.NODE_ENV === "production") notFound();

  return (
    <ResumePageShell crumb="Portfolio / JYP ENTERTAINMENT / v2" tag="DRAFT · V2">
      <ApplicationVersionNav slug="jyp-v2" label="JYP v2" active="portfolio" />
      <NarrativePortfolioView portfolio={JYP_V2_PORTFOLIO} />
    </ResumePageShell>
  );
}
