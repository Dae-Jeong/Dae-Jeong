import type { Metadata } from "next";
import { AskLauncher } from "@/components/site/ask-launcher";
import { Container } from "@/components/site/container";
import { SiteFooter } from "@/components/site/site-footer";
import { TopBar } from "@/components/site/topbar";
import { ResumeView } from "./resume-view";

export const metadata: Metadata = {
  title: "Resume — 김대정 · Backend Engineer",
  description:
    "AI 제품을 만들고, 무엇을 만들지도 함께 정하는 백엔드 엔지니어 — 이력서 (KO/EN)",
};

export default function ResumePage() {
  return (
    <>
      <TopBar variant="subpage" crumb="Resume" />
      <Container variant="doc" className="flex-1">
        <ResumeView />
      </Container>
      <SiteFooter />
      <AskLauncher />
    </>
  );
}
