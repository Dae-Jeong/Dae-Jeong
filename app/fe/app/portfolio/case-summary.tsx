import Link from "next/link";
import type { ReactNode } from "react";
import type { CaseMeta } from "@/lib/cases";
import { CenturionContributionDiagram } from "./centurion-contribution-diagram";
import { CompanyAxOperatingModel } from "./company-ax-operating-model";
import { ThreadyRuntimeDiagram } from "./thready-runtime-diagram";

type Proof = {
  label: string;
  value: string;
};

function SummaryHeader({
  meta,
  lead,
  outcome,
}: {
  meta: CaseMeta;
  lead: ReactNode;
  outcome: ReactNode;
}) {
  return (
    <header className="portfolio-case-header">
      <div className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2">
        <p className="m-0 text-sm font-medium leading-[1.55] text-fg-2">{meta.tag}</p>
        <p className="m-0 text-sm text-muted">{meta.role}</p>
      </div>
      <h2 className="m-0 mt-4 text-pretty text-[clamp(1.75rem,3vw,2.35rem)] font-semibold leading-[1.18] tracking-[-0.03em]">
        {meta.name}
      </h2>
      <p className="m-0 mt-5 text-base leading-[1.75] text-fg-2 text-pretty [&_strong]:font-semibold [&_strong]:text-fg">
        {lead}
      </p>
      <div className="mt-6 border-y border-fg py-4">
        <p className="m-0 text-lg font-semibold leading-[1.55] text-pretty">{outcome}</p>
      </div>
    </header>
  );
}

function ProofStrip({ items }: { items: Proof[] }) {
  return (
    <dl className="portfolio-keep m-0 mt-6 grid grid-cols-3 border-y border-border max-md:grid-cols-1 print:grid-cols-3">
      {items.map((item, index) => (
        <div
          key={item.label}
          className={`min-w-0 px-5 py-4 ${
            index > 0
              ? "border-l border-border max-md:border-l-0 max-md:border-t print:border-l print:border-t-0"
              : ""
          }`}
        >
          <dt className="text-sm font-semibold text-fg">{item.label}</dt>
          <dd className="m-0 mt-2 text-sm leading-[1.6] text-fg-2">{item.value}</dd>
        </div>
      ))}
    </dl>
  );
}

function RevenueTrack() {
  return (
    <section
      aria-label="Thready 수익 모델의 현재와 다음 실험"
      className="portfolio-keep mt-7 grid grid-cols-2 border-y border-fg max-md:grid-cols-1 print:grid-cols-2"
    >
      <div className="px-5 py-5 max-md:border-b max-md:border-border print:border-b-0">
        <p className="m-0 font-mono text-xs font-semibold text-success">CURRENT · SUBSCRIPTION</p>
        <strong className="mt-3 block text-xl leading-[1.3]">유료 제품 운영</strong>
        <span className="mt-2 block text-sm leading-[1.6] text-fg-2">
          실제 고객 결제 · 제품·팀 outcome
        </span>
      </div>
      <div className="border-l border-border px-5 py-5 max-md:border-l-0 print:border-l">
        <p className="m-0 font-mono text-xs font-semibold text-muted">NEXT · ADVERTISING</p>
        <strong className="mt-3 block text-xl leading-[1.3]">광고 수익 모델 검증</strong>
        <span className="mt-2 block text-sm leading-[1.6] text-fg-2">
          적용 시작 · 운영 데이터 수집 중 · 성과 미집계
        </span>
      </div>
    </section>
  );
}

function MobileFlow({
  title,
  nodes,
}: {
  title: string;
  nodes: { label: string; detail: string }[];
}) {
  return (
    <div className="portfolio-keep hidden border-y border-fg max-md:block print:block">
      <p className="m-0 border-b border-border py-3 text-sm font-semibold">{title}</p>
      <ol className="m-0 grid list-none p-0 print:grid-cols-5">
        {nodes.map((node, index) => (
          <li
            key={node.label}
            className="grid grid-cols-[34px_minmax(0,1fr)] gap-3 border-b border-border py-4 last:border-b-0 print:block print:border-b-0 print:border-l print:px-3 print:py-3 print:first:border-l-0"
          >
            <span className="font-mono text-sm font-semibold text-muted print:text-[11px]">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span>
              <strong className="block text-sm print:mt-2 print:text-[11px]">{node.label}</strong>
              <span className="mt-1 block text-sm leading-[1.55] text-fg-2 print:text-[11px] print:leading-[1.45]">
                {node.detail}
              </span>
            </span>
          </li>
        ))}
      </ol>
    </div>
  );
}

function DetailLink({ slug, label }: { slug: string; label: string }) {
  return (
    <div className="mt-7 flex justify-end print:hidden">
      <Link
        href={`/portfolio/${slug}`}
        className="focus-ring inline-flex min-h-11 items-center border-b border-fg text-sm font-semibold transition-colors duration-100 hover:text-muted"
      >
        {label} →
      </Link>
    </div>
  );
}

function ThreadySummary({ meta }: { meta: CaseMeta }) {
  return (
    <article
      id={`case-${meta.slug}`}
      className="portfolio-case scroll-mt-6 py-11 print:pt-8"
    >
      <SummaryHeader
        meta={meta}
        lead={
          <>
            고객이 돈을 내는 이유를 기획·QA·마케팅과 함께 구체화하고, 기능 우선순위부터
            출시·운영까지 이끌었습니다. 제품에 필요한 Next.js 핵심 흐름과 FastAPI·AI
            backend를 직접 구축하고, 초기 backend를 운영 가능한 구조로 다시 설계했습니다.
          </>
        }
        outcome={
          <>
            팀과 실제 고객이 결제하는 유료 제품으로 만들고, 출시 이후에도 계속 운영하고
            있습니다.
          </>
        }
      />

      <RevenueTrack />

      <section className="mt-8">
        <div className="max-md:hidden print:hidden">
          <ThreadyRuntimeDiagram />
        </div>
        <MobileFlow
          title="제품 원장과 AI 실행을 나눈 핵심 흐름"
          nodes={[
            { label: "제품 화면", detail: "Next.js에서 사용자·운영 흐름을 제공" },
            { label: "제품 backend", detail: "정책·계정·콘텐츠·발행 원장을 소유" },
            { label: "Outbox 전달", detail: "원장 변경과 전달 event를 같은 transaction에 기록" },
            { label: "AI application", detail: "생성 lifecycle과 실행 상태를 별도 DB에서 관리" },
            { label: "검증과 배포", detail: "이관 리허설·API E2E 뒤 Vercel·Azure에 배포" },
          ]}
        />
      </section>

      <ProofStrip
        items={[
          { label: "제품 리딩", value: "고객 문제 · 우선순위 · 품질 · QA · release" },
          { label: "직접 구현", value: "Next.js 핵심 흐름 · FastAPI · data · AI" },
          { label: "운영 경계", value: "제품 원장과 AI 실행 상태의 소유권 분리" },
        ]}
      />
      <DetailLink slug={meta.slug} label="Thready의 기술 판단과 검증 근거 보기" />
    </article>
  );
}

function CompanyAxSummary({ meta }: { meta: CaseMeta }) {
  return (
    <article
      id={`case-${meta.slug}`}
      className="portfolio-case scroll-mt-6 py-11 print:pt-8"
    >
      <SummaryHeader
        meta={meta}
        lead={
          <>
            제품의 요구·판단·작업·QA·release가 서로 다른 문서와 대화에 흩어지지 않도록
            실행 흐름을 운영했습니다. 이 기록을 바탕으로 회사 업무까지 agent가 준비하고
            사람이 판단하는 AX 전환 구조 설계에 참여했습니다.
          </>
        }
        outcome={
          <>
            제품 운영에서 쌓인 맥락을 회사 업무로 확장하되, 제품 판단·아키텍처·QA·최종
            승인은 사람이 소유하도록 경계를 뒀습니다.
          </>
        }
      />

      <section className="mt-8">
        <div className="max-md:hidden print:hidden">
          <CompanyAxOperatingModel />
        </div>
        <MobileFlow
          title="현재 운영과 AX 확장 설계"
          nodes={[
            { label: "제품 요구", detail: "Decision·SPEC으로 판단 배경과 계약을 남김" },
            { label: "실행", detail: "Work Package로 담당과 검증 조건을 연결" },
            { label: "QA·release", detail: "사람의 승인 뒤 Git·CI/CD로 실행" },
            { label: "Agent 준비", detail: "회의·요청에서 맥락·초안·근거를 준비" },
            { label: "Human gate", detail: "우선순위와 최종 판단은 사람이 소유" },
          ]}
        />
      </section>

      <ProofStrip
        items={[
          { label: "현재 운영", value: "Decision → SPEC → 작업 → QA → release" },
          { label: "설계 참여", value: "의사결정·회의·배정·승인·후속 작업의 AX 확장" },
          { label: "직접 구축", value: "FastAPI Backend Template · agent context" },
        ]}
      />
      <DetailLink slug={meta.slug} label="회사 AX의 역할 경계와 실행 구조 보기" />
    </article>
  );
}

function CenturionSummary({ meta }: { meta: CaseMeta }) {
  return (
    <article
      id={`case-${meta.slug}`}
      className="portfolio-case scroll-mt-6 py-11 print:pt-8"
    >
      <SummaryHeader
        meta={meta}
        lead={
          <>
            의료 플랫폼에는 즉시 끝나야 하는 요청, 실패 뒤 다시 실행할 후속 작업,
            연결이 계속 바뀌는 실시간 상담이 함께 있습니다. 모든 서비스에 같은 패턴을
            강요하지 않고 각 workload의 transaction·state·recovery 경계를 나눴습니다.
          </>
        }
        outcome={
          <>
            주문·재고는 실패한 후속 작업만 다시 처리하게 했고, 실시간 상담은 중간 전사와
            확정 판단·세션 종료를 분리했습니다.
          </>
        }
      />

      <section className="mt-8">
        <div className="max-md:hidden print:hidden">
          <CenturionContributionDiagram />
        </div>
        <MobileFlow
          title="세 workload에 서로 다른 복구 경계를 적용"
          nodes={[
            { label: "공통 진입", detail: "Gateway와 SSO가 인증된 service context를 전달" },
            { label: "예약 정책", detail: "backend 판단부터 화면·QA·release까지 연결" },
            { label: "주문·재고", detail: "RabbitMQ·TaskIQ 작업 상태와 retry·수동 복구" },
            { label: "실시간 상담", detail: "DELTA·COMPLETE 전사와 session lifecycle 분리" },
            { label: "종료 경계", detail: "stop guard와 GC로 종료 뒤 재연결을 차단" },
          ]}
        />
      </section>

      <ProofStrip
        items={[
          { label: "주문·재고", value: "작업 상태 · retry · terminal failure · 수동 재처리" },
          { label: "실시간 상담", value: "DELTA / COMPLETE · sequence · stop guard" },
          { label: "기여 범위", value: "주문·재고 구축 주도 · 실시간 상담 공동 개발" },
        ]}
      />
      <DetailLink slug={meta.slug} label="Centurion의 failure boundary와 검증 근거 보기" />
    </article>
  );
}

export function CaseSummary({ meta }: { meta: CaseMeta }) {
  switch (meta.slug) {
    case "thready":
      return <ThreadySummary meta={meta} />;
    case "be-template":
      return <CompanyAxSummary meta={meta} />;
    case "centurion-platform":
      return <CenturionSummary meta={meta} />;
    default:
      return null;
  }
}
