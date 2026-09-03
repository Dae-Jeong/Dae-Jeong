import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { TopBar } from "@/components/site/topbar";
import { loadApplicationProjection } from "./application-data.server";
import { ApplicationWorkspace } from "./application-workspace";

export const metadata: Metadata = {
  title: "지원 워크스페이스",
  description: "활성 공고의 적합도, JD 분석, 이력서 포지셔닝과 지원 상태를 관리합니다.",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function ApplicationsPage() {
  if (process.env.NODE_ENV === "production") {
    notFound();
  }

  const projection = await loadApplicationProjection();

  return (
    <div className="min-h-screen bg-bg">
      <TopBar variant="subpage" crumb="Applications · 지원 워크스페이스" tag="LOCAL" />
      <ApplicationWorkspace projection={projection} />
    </div>
  );
}
