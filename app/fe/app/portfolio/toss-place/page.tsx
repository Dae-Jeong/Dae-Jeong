import type { Metadata } from "next";
import { CompanyDocumentPage, type DocumentSearch } from "../../documents/company-document";

export const metadata: Metadata = { title: "토스플레이스 포트폴리오 초안 — 김대정", robots: { index: false, follow: false, noarchive: true, nosnippet: true } };
export default async function TossPortfolioPage({ searchParams }: { searchParams: DocumentSearch }) {
  const { revision } = await searchParams;
  return <CompanyDocumentPage company="toss-place" kind="portfolio" revision={revision ?? "20260910-R1"} />;
}
