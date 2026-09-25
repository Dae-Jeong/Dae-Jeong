import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/site/container";
import { SiteFooter } from "@/components/site/site-footer";
import { TopBar } from "@/components/site/topbar";
import {
  AgentPrototypeDiagram,
  AzureTopologyDiagram,
  BayWorkerFlowDiagram,
  IdempotentImporterDiagram,
  MedinessWorkDivisionDiagram,
  OutboxSwimlaneDiagram,
  QualityLayersDiagram,
  RebuildDecisionDiagram,
  SayOverlapSessionDiagram,
  SequenceFenceDiagram,
  SplitMigrationFlowDiagram,
  StripePrepaymentDiagram,
  TenantBoundaryDiagram,
  ThreadyAgentFlowDiagram,
  ThreadyAxPipelineDiagram,
  ThreadyAxRolesDiagram,
  TransactionTemplateDiagram,
} from "../diagrams/design-diagrams";

export const metadata: Metadata = {
  title: "설계 도식 검토 · local",
  robots: { index: false, follow: false, noarchive: true, nosnippet: true },
};

export default function DesignLabPage() {
  if (process.env.NODE_ENV === "production") notFound();
  return (
    <>
      <div className="print:hidden">
        <TopBar variant="subpage" crumb={<>Portfolio / 설계 도식</>} tag="LOCAL" />
      </div>
      <Container variant="doc" className="flex-1 pb-24">
        <main data-portfolio-document data-portfolio-slug="design-lab" className="pt-8">
          <p className="m-0 font-mono text-xs text-muted">설계 도식 문법 검토 · 2026-09-02 · 흐름 / 상태별 처리 / 판단 비교 / topology / 시간축</p>
          <h1 className="m-0 mt-3 text-2xl font-semibold tracking-[-0.02em]">구조가 아니라 설계를 보여주는 열일곱 장</h1>
          <ol className="m-0 mt-6 grid list-none grid-cols-2 gap-x-8 gap-y-1 p-0 text-sm max-md:grid-cols-1">
            <li className="flex items-baseline gap-2 border-b border-border py-1.5"><span className="w-6 shrink-0 font-mono text-[11px] text-muted">01</span><a href="#outbox-delivery" className="text-[var(--portfolio-ink)] underline-offset-2 hover:underline">Outbox durable delivery</a><span className="ml-auto shrink-0 font-mono text-[10.5px] text-muted">Thready · 흐름</span></li>
            <li className="flex items-baseline gap-2 border-b border-border py-1.5"><span className="w-6 shrink-0 font-mono text-[11px] text-muted">02</span><a href="#bay-worker" className="text-[var(--portfolio-ink)] underline-offset-2 hover:underline">주문·알림 worker</a><span className="ml-auto shrink-0 font-mono text-[10.5px] text-muted">피부과 운영 제품군 · 흐름</span></li>
            <li className="flex items-baseline gap-2 border-b border-border py-1.5"><span className="w-6 shrink-0 font-mono text-[11px] text-muted">03</span><a href="#thready-agent" className="text-[var(--portfolio-ink)] underline-offset-2 hover:underline">AI 생성 파이프라인</a><span className="ml-auto shrink-0 font-mono text-[10.5px] text-muted">Thready · 흐름</span></li>
            <li className="flex items-baseline gap-2 border-b border-border py-1.5"><span className="w-6 shrink-0 font-mono text-[11px] text-muted">04</span><a href="#split-migration" className="text-[var(--portfolio-ink)] underline-offset-2 hover:underline">운영 DB 분리 이관</a><span className="ml-auto shrink-0 font-mono text-[10.5px] text-muted">Thready · 흐름</span></li>
            <li className="flex items-baseline gap-2 border-b border-border py-1.5"><span className="w-6 shrink-0 font-mono text-[11px] text-muted">05</span><a href="#rebuild-decision" className="text-[var(--portfolio-ink)] underline-offset-2 hover:underline">prototype backend 재구축 판단</a><span className="ml-auto shrink-0 font-mono text-[10.5px] text-muted">Thready · 비교</span></li>
            <li className="flex items-baseline gap-2 border-b border-border py-1.5"><span className="w-6 shrink-0 font-mono text-[11px] text-muted">06</span><a href="#stripe-prepayment" className="text-[var(--portfolio-ink)] underline-offset-2 hover:underline">선결제 예약·보상 처리</a><span className="ml-auto shrink-0 font-mono text-[10.5px] text-muted">Memento · 흐름</span></li>
            <li className="flex items-baseline gap-2 border-b border-border py-1.5"><span className="w-6 shrink-0 font-mono text-[11px] text-muted">07</span><a href="#agent-prototype" className="text-[var(--portfolio-ink)] underline-offset-2 hover:underline">대화형 제품 제어 agent</a><span className="ml-auto shrink-0 font-mono text-[10.5px] text-muted">Thready · 흐름</span></li>
            <li className="flex items-baseline gap-2 border-b border-border py-1.5"><span className="w-6 shrink-0 font-mono text-[11px] text-muted">08</span><a href="#transaction-template" className="text-[var(--portfolio-ink)] underline-offset-2 hover:underline">transaction·session 경계</a><span className="ml-auto shrink-0 font-mono text-[10.5px] text-muted">Template · 비교</span></li>
            <li className="flex items-baseline gap-2 border-b border-border py-1.5"><span className="w-6 shrink-0 font-mono text-[11px] text-muted">09</span><a href="#tenant-boundary" className="text-[var(--portfolio-ink)] underline-offset-2 hover:underline">multi-tenant 접근 경계</a><span className="ml-auto shrink-0 font-mono text-[10.5px] text-muted">multi-tenant backend · 비교</span></li>
            <li className="flex items-baseline gap-2 border-b border-border py-1.5"><span className="w-6 shrink-0 font-mono text-[11px] text-muted">10</span><a href="#azure-topology" className="text-[var(--portfolio-ink)] underline-offset-2 hover:underline">클라우드 운영 topology</a><span className="ml-auto shrink-0 font-mono text-[10.5px] text-muted">Infra · topology</span></li>
            <li className="flex items-baseline gap-2 border-b border-border py-1.5"><span className="w-6 shrink-0 font-mono text-[11px] text-muted">11</span><a href="#thready-ax-pipeline" className="text-[var(--portfolio-ink)] underline-offset-2 hover:underline">개인 계정 AX ① 지식 파이프라인</a><span className="ml-auto shrink-0 font-mono text-[10.5px] text-muted">Thready · 설계</span></li>
            <li className="flex items-baseline gap-2 border-b border-border py-1.5"><span className="w-6 shrink-0 font-mono text-[11px] text-muted">12</span><a href="#thready-ax-roles" className="text-[var(--portfolio-ink)] underline-offset-2 hover:underline">개인 계정 AX ② 역할 그래프</a><span className="ml-auto shrink-0 font-mono text-[10.5px] text-muted">Thready · 설계</span></li>
            <li className="flex items-baseline gap-2 border-b border-border py-1.5"><span className="w-6 shrink-0 font-mono text-[11px] text-muted">13</span><a href="#mediness-work-division" className="text-[var(--portfolio-ink)] underline-offset-2 hover:underline">제품 개발·의사결정 업무 분장</a><span className="ml-auto shrink-0 font-mono text-[10.5px] text-muted">Mediness · topology</span></li>
            <li className="flex items-baseline gap-2 border-b border-border py-1.5"><span className="w-6 shrink-0 font-mono text-[11px] text-muted">14</span><a href="#say-overlap-sessions" className="text-[var(--portfolio-ink)] underline-offset-2 hover:underline">실시간 전사 · 겹치는 세션</a><span className="ml-auto shrink-0 font-mono text-[10.5px] text-muted">실시간 상담 session · 시간축</span></li>
            <li className="flex items-baseline gap-2 border-b border-border py-1.5"><span className="w-6 shrink-0 font-mono text-[11px] text-muted">15</span><a href="#sequence-fence" className="text-[var(--portfolio-ink)] underline-offset-2 hover:underline">전사 보정 sequence fence</a><span className="ml-auto shrink-0 font-mono text-[10.5px] text-muted">실시간 상담 session · 시퀀스</span></li>
            <li className="flex items-baseline gap-2 border-b border-border py-1.5"><span className="w-6 shrink-0 font-mono text-[11px] text-muted">16</span><a href="#idempotent-importer" className="text-[var(--portfolio-ink)] underline-offset-2 hover:underline">재적재 가능한 importer</a><span className="ml-auto shrink-0 font-mono text-[10.5px] text-muted">Thready · 비교</span></li>
            <li className="flex items-baseline gap-2 border-b border-border py-1.5"><span className="w-6 shrink-0 font-mono text-[11px] text-muted">17</span><a href="#quality-layers" className="text-[var(--portfolio-ink)] underline-offset-2 hover:underline">AI 글 품질 판정 3층</a><span className="ml-auto shrink-0 font-mono text-[10.5px] text-muted">Thready · 구조</span></li>
          </ol>
          <div id="outbox-delivery" className="scroll-mt-20"><OutboxSwimlaneDiagram /></div>
          <div id="bay-worker" className="scroll-mt-20"><BayWorkerFlowDiagram /></div>
          <div id="thready-agent" className="scroll-mt-20"><ThreadyAgentFlowDiagram /></div>
          <div id="split-migration" className="scroll-mt-20"><SplitMigrationFlowDiagram /></div>
          <div id="rebuild-decision" className="scroll-mt-20"><RebuildDecisionDiagram /></div>
          <div id="stripe-prepayment" className="scroll-mt-20"><StripePrepaymentDiagram /></div>
          <div id="agent-prototype" className="scroll-mt-20"><AgentPrototypeDiagram /></div>
          <div id="transaction-template" className="scroll-mt-20"><TransactionTemplateDiagram /></div>
          <div id="tenant-boundary" className="scroll-mt-20"><TenantBoundaryDiagram /></div>
          <div id="azure-topology" className="scroll-mt-20"><AzureTopologyDiagram /></div>
          <div id="thready-ax-pipeline" className="scroll-mt-20"><ThreadyAxPipelineDiagram /></div>
          <div id="thready-ax-roles" className="scroll-mt-20"><ThreadyAxRolesDiagram /></div>
          <div id="mediness-work-division" className="scroll-mt-20"><MedinessWorkDivisionDiagram /></div>
          <div id="say-overlap-sessions" className="scroll-mt-20"><SayOverlapSessionDiagram /></div>
          <div id="sequence-fence" className="scroll-mt-20"><SequenceFenceDiagram /></div>
          <div id="idempotent-importer" className="scroll-mt-20"><IdempotentImporterDiagram /></div>
          <div id="quality-layers" className="scroll-mt-20"><QualityLayersDiagram /></div>
        </main>
      </Container>
      <SiteFooter />
    </>
  );
}
