import type { Metadata } from "next";
import { CommonDocumentPage } from "../common/common-document";

export const metadata: Metadata = {
  title: "Portfolio — 김대정 · Tech Lead · Backend Engineer",
  description: "크리에이터의 새로운 채널 운영, 업무 정책을 구현한 백엔드, 팀의 개발 기반을 담은 김대정의 포트폴리오",
};

export default function PortfolioPage() {
  return <CommonDocumentPage kind="portfolio" />;
}
