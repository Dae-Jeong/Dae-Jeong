"use client";

import Image from "next/image";
import { Children, isValidElement, useEffect, useState } from "react";
import { cn } from "@/lib/cn";
import { Banner } from "@/components/ui/banner";
import { Chip } from "@/components/ui/chip";
import { KeyValueRows } from "@/components/ui/key-value-list";
import { NumberedList, NumberedRow } from "@/components/ui/numbered-row";
import { SectionHead } from "@/components/ui/section-head";
import { ResumeLayout } from "./resume-layout";
import { ResumePeriod } from "./resume-period";
import { resumeType } from "./resume-typography";

/* 콘텐츠 SoT (2026-08-13 user-confirmed: "홈페이지를 SoT로 둔 다음에 플랫폼들에 sync를 맞추자").
   이 파일과 app/page.tsx 의 문안이 **표현의 기준선**이다 — 플랫폼 프로필은 여기서 파생된다.
   단 사실·강도는 여전히 wiki/evidence/claims/*.yaml 이 소유한다 (allowed_copy / forbidden_copy).
   즉 "무엇을 말할 수 있는가"는 claim registry, "어떻게 말하는가"는 이 파일.
   전화번호는 웹에 넣지 않는다(정책). */

/* — 로컬 프리미티브 (두 번째 사용처가 생기면 ui/ 로 승격) — */

function PlainList({ items }: { items: React.ReactNode[] }) {
  return (
    <ul className="m-0 grid list-none gap-2 p-0">
      {items.map((item, i) => (
        <li
          key={i}
          className="relative pl-4 text-fg-2 before:absolute before:left-0 before:font-mono before:text-muted before:content-['—'] [&_strong]:font-medium [&_strong]:text-fg"
        >
          {item}
        </li>
      ))}
    </ul>
  );
}

function CareerRow({
  org,
  period,
  currentLabel,
  "data-claim": dataClaim,
  children,
}: {
  org: string;
  period: string;
  currentLabel?: string;
  "data-claim"?: string;
  children: React.ReactNode;
}) {
  return (
    <NumberedRow
      label={
        <span className="grid gap-1">
          <span>
            {org}
          </span>
          <ResumePeriod value={period} currentLabel={currentLabel} />
        </span>
      }
      labelWidth="lg"
      labelClassName="font-semibold text-fg"
      data-claim={dataClaim}
      className={resumeType.careerRow}
    >
      <span className="text-sm text-fg-2">{children}</span>
    </NumberedRow>
  );
}

/* 역량 축 — 성과가 주어, 프로젝트는 근거로 뒤에 붙는다 (2026-08-12 구조 반전) */
function Src({ children }: { children: React.ReactNode }) {
  return (
    <span className="ml-1.5 whitespace-nowrap font-mono text-xs text-muted">[{children}]</span>
  );
}

function Axis({
  no,
  title,
  description,
  evidence,
  first,
  "data-claim": dataClaim,
}: {
  no: string;
  title: string;
  description: React.ReactNode;
  evidence: React.ReactNode[];
  first?: boolean;
  "data-claim"?: string;
}) {
  return (
    <NumberedRow
      label={no}
      labelWidth="sm"
      labelClassName="font-mono text-xs text-muted"
      data-claim={dataClaim}
      className={cn(resumeType.achievementRow, first && "border-t-0")}
    >
    <div className="text-base font-normal [&_[data-metric]]:font-medium">
        <h3 className={resumeType.achievementTitle}>
          {title}
        </h3>
        <div className={resumeType.achievementDescription}>
          <p className={resumeType.achievementParagraph}>{description}</p>
          <ul className={resumeType.achievementEvidenceList}>
            {evidence.map((item, index) => (
              <li key={index} className={resumeType.achievementEvidenceItem}>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </NumberedRow>
  );
}

function Metric({ children }: { children: React.ReactNode }) {
  return (
    <span data-metric className={resumeType.metric}>
      {children}
    </span>
  );
}

function ProfilePhoto() {
  return (
    <div className={resumeType.profilePhoto}>
      <Image
        src="/profile/daejeong-profile-v2.png"
        alt=""
        fill
        priority
        sizes="(max-width: 639px) 80px, 112px"
        className="object-contain"
      />
    </div>
  );
}

const SECTIONS_KO = [
  { id: "s1", label: "소개" },
  { id: "s3", label: "경력" },
  { id: "s2", label: "백엔드·AI 시스템" },
  { id: "s4", label: "제품 운영·엔지니어링 시스템" },
  { id: "s5", label: "기술" },
  { id: "s6", label: "외부 활동" },
  { id: "s7", label: "수상·특허·자격" },
] as const;

const SECTIONS_EN = [
  { id: "s1", label: "Profile" },
  { id: "s3", label: "Career" },
  { id: "s2", label: "Backend & AI Systems" },
  { id: "s4", label: "Product Delivery & Engineering Systems" },
  { id: "s5", label: "Skills" },
  { id: "s6", label: "External Activities" },
  { id: "s7", label: "Credentials · Education" },
] as const;

function OrderedSections({
  children,
  order,
}: {
  children: React.ReactNode;
  order: readonly string[];
}) {
  const sections = Children.toArray(children);

  return (
    <>
      {order.map((id) =>
        sections.find(
          (section) => isValidElement<{ id: string }>(section) && section.props.id === id,
        ),
      )}
    </>
  );
}

/* 스킬은 나열이 아니라 근거와 함께 둔다 — 각 항목이 어디서 쓰였는지까지 적는다 */
function Skill({ stack, via }: { stack: string; via: string }) {
  return (
    <>
      <span className="block text-base font-medium leading-normal text-fg">{stack}</span>
      <span className="mt-1 block text-pretty text-sm leading-relaxed text-fg-2">{via}</span>
    </>
  );
}

function ExternalActivity({
  title,
  description,
  outcome,
  outcomeLabel,
}: {
  title: string;
  description: string;
  outcome: string;
  outcomeLabel: string;
}) {
  return (
    <>
      <span className="block text-base font-medium leading-normal text-fg">{title}</span>
      <span className="mt-1 block text-pretty text-sm leading-relaxed text-fg-2">{description}</span>
      <span className="mt-1.5 block text-pretty text-sm font-medium leading-relaxed text-fg">
        <span className="text-success">{outcomeLabel}</span> · {outcome}
      </span>
    </>
  );
}

const SKILLS = [
  {
    k: "백엔드 코어",
    "data-claim": "thready.backend-rebuild nexus.backend-architecture career.memento-stripe-prepayment career.tellingme-backend-infra",
    v: (
      <Skill
        stack="Python · FastAPI · PostgreSQL · Redis"
        via="API·domain·transaction·migration 주력 · TypeScript·Express·NestJS Gateway·연동 · Java·Spring Boot 개인 프로젝트"
      />
    ),
  },
  {
    k: "데이터 / 비동기",
    "data-claim": "centurion.bay-async-backend thready.ai-replica-outbox",
    v: (
      <Skill
        stack="MySQL · RabbitMQ · TaskIQ · Transactional Outbox"
        via="주문·재고 worker와 retry·fencing·idempotency 기반 장애 복구"
      />
    ),
  },
  {
    k: "AI 런타임",
    "data-claim": "thready.ai-service-boundary thready.quality-criteria-system centurion.say-realtime-ai",
    v: (
      <Skill
        stack="LLM integration/evaluation · typed prompt · structured output · WebSocket · SSE · STT"
        via="생성 lifecycle·품질 판정과 실시간 AI 상담 session 운영"
      />
    ),
  },
  {
    k: "클라우드 / 배포",
    "data-claim": "infra.company-azure-ownership infra.terraform-state-safety infra.azure-observability career.tellingme-backend-infra",
    v: (
      <Skill
        stack="Azure · Terraform · Docker · GitHub Actions · AWS"
        via="remote state·drift gate·배포와 production log·alert 운영"
      />
    ),
  },
];

const SKILLS_EN = [
  {
    k: "Backend Core",
    "data-claim": "thready.backend-rebuild nexus.backend-architecture career.memento-stripe-prepayment career.tellingme-backend-infra",
    v: (
      <Skill
        stack="Python · FastAPI · PostgreSQL · Redis"
        via="Primary: API, domain, transaction, migration · TypeScript·Express·NestJS gateway work · Java·Spring Boot personal project"
      />
    ),
  },
  {
    k: "Data / Async",
    "data-claim": "centurion.bay-async-backend thready.ai-replica-outbox",
    v: (
      <Skill
        stack="MySQL · RabbitMQ · TaskIQ · Transactional Outbox"
        via="Order and inventory workers with retry, fencing, idempotency, and recovery boundaries"
      />
    ),
  },
  {
    k: "AI Runtime",
    "data-claim": "thready.ai-service-boundary thready.quality-criteria-system centurion.say-realtime-ai",
    v: (
      <Skill
        stack="LLM integration/evaluation · typed prompt · structured output · WebSocket · SSE · STT"
        via="Generation lifecycle and quality evaluation · realtime AI consultation sessions"
      />
    ),
  },
  {
    k: "Cloud / Delivery",
    "data-claim": "infra.company-azure-ownership infra.terraform-state-safety infra.azure-observability career.tellingme-backend-infra",
    v: (
      <Skill
        stack="Azure · Terraform · Docker · GitHub Actions · AWS"
        via="Remote state, drift gates, deployment, and production log/alert operations"
      />
    ),
  },
];

function Sec({
  id,
  no,
  title,
  meta,
  "data-claim": dataClaim,
  children,
}: {
  id?: string;
  no: string;
  title: string;
  meta?: string;
  "data-claim"?: string;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      data-claim={dataClaim}
      className={cn(resumeType.documentSection, "scroll-mt-6")}
    >
      <SectionHead no={no} title={title} meta={meta} size="doc" />
      {children}
    </section>
  );
}

/* — 한국어 마스터 — */

function DocKo() {
  return (
    <div>
      <header className={resumeType.documentHeader}>
        <div className={resumeType.identityBlock}>
          <h1 className={resumeType.identity}>김대정</h1>
          <p className={resumeType.roleMeta}>Tech Lead · Backend Engineer</p>
        </div>
        <div className={resumeType.metaBlock}>
          <p className={resumeType.careerMeta}>
            <b className="font-medium text-fg">MediSolve AI</b> · Tech Lead · Backend Engineer{" "}
            <span className="text-muted">(2025.04 — 재직 중)</span>
          </p>
          <div className={resumeType.contactRow}>
            <Chip variant="contact" href="mailto:marin.backend@gmail.com">
              marin.backend@gmail.com
            </Chip>
            <Chip variant="contact" href="https://github.com/Dae-Jeong" external>
              github.com/Dae-Jeong
            </Chip>
            <Chip variant="contact">경기 안양시</Chip>
          </div>
        </div>
        <ProfilePhoto />
      </header>

      <OrderedSections order={SECTIONS_KO.map((section) => section.id)}>
      <Sec id="s1" no="01" title="소개" meta="Profile">
        <div className={resumeType.summaryStack}>
          <p className="m-0" data-claim="career.tenure career.thedaylabs-freelance thready.backend-rebuild thready.release-operation thready.ai-service-boundary thready.ai-replica-outbox centurion.bay-async-backend be-template.team-leverage infra.terraform-state-safety">
            소수의 backend가 여러 제품을 담당하는 환경에서, <strong className={resumeType.inlineStrong}>제품 초기 구축부터 운영 서비스 재구축까지 책임지는 Tech Lead이자 Backend Engineer</strong>입니다. service·data boundary, migration 정합성, 비동기 작업의 상태·retry·재처리, Terraform state·drift를 설계·운영해온 <Metric>실무 4년차</Metric>입니다.
          </p>
          <p className="m-0" data-claim="career.ai-pm-backend-continuity career.product-ux-practice centurion.day-product-integration mediness.product-operations be-template.backend-standard be-template.agent-context thready.ai-service-boundary thready.quality-criteria-system">
            Vision AI 개발과 PM·UX 분석 경험으로 사용자·운영 요구와 기술 제약을 함께 판단하고, <strong className={resumeType.inlineStrong}>그 결과를 backend contract로 만듭니다.</strong> 요구를 domain model·API·transaction·worker state·QA/release gate로 구체화하고, 팀과 agent가 같은 기준으로 실행할 수 있도록 decision·runbook·automation으로 남깁니다.
          </p>
        </div>
      </Sec>

      <Sec id="s3" no="02" title="경력" meta="Career">
        <NumberedList className="border-t border-border-soft">
          <CareerRow org="MediSolve AI" period="2025. 04 —" currentLabel="재직중" data-claim="career.medisolve-role-evolution career.thedaylabs-freelance career.memento-to-medisolve-early-member">
            <span className="mb-1.5 block text-base font-medium text-fg">Tech Lead · Backend Engineer <span className="font-normal text-fg-2">— PO 역할 병행</span></span>
            <PlainList
              items={[
                <span key="joining-path" data-claim="career.memento-to-medisolve-early-member career.thedaylabs-freelance"><strong>합류 경로</strong> · Memento AI에서의 개발 성과를 인정받아 MediSolve AI 초기 멤버로 영입 → 더데이랩스 프리랜서로 법인 설립 전 제품 개발 선행(2025.02–04) → MediSolve AI 설립과 함께 정규 합류·Tech Lead 역할</span>,
                <span key="thready-business" data-claim="thready.prototype-to-user-operation thready.subscription-revenue-band">초기 prototype 이후 Thready의 <strong>FastAPI backend 전환·release·QA·운영을 리드</strong>해 실제 사용자 운영까지 연결. 제품 성과: <Metric>월 약 800만~1,000만원 구독료 매출</Metric> (2026.08 기준)</span>,
                <span key="operation" data-claim="thready.rebuild-decision-execution thready.qa-reopen-reduction">architecture·component·infra <strong>validation harness를 먼저 세운 뒤 backend를 재구축</strong>했고, 전환 전후 해결된 QA issue의 <strong>reopen 비율이 26%p 감소</strong></span>,
                <span key="centurion" data-claim="career.thedaylabs-freelance centurion.msa-platform-context centurion.bay-async-backend centurion.say-realtime-ai centurion.ray-backend centurion.sso-session">법인 설립 전 Centurion의 <strong>초기 backend·개발 기준</strong>을 세웠고, 이후 API Gateway·SSO 기반 의료 MSA에서 주문·재고 worker와 통합 관리 backend 구축을 주도하고 realtime AI session·시설/재고 연동·SSO 정책에 공동/부분 기여</span>,
                <span key="mediness" data-claim="mediness.product-system-design-participation mediness.product-operations">MEDINESS의 <strong>제품 요구·운영 흐름 설계에 참여</strong>하고, 제품별 decision·SPEC·Work Package를 BE·FE·QA owner lane·release gate로 연결해 일정·이슈·릴리스 운영을 리드</span>,
                <span key="infra" data-claim="infra.company-azure-ownership"><strong>회사 Azure·Terraform 인프라 전반을 담당</strong> — B2B·B2C·제품·환경별 resource boundary와 배포·운영 절차 관리</span>,
              ]}
            />
          </CareerRow>
          <CareerRow org="Memento AI" period="2024.10 — 2025.01" data-claim="career.memento-happycall-survey career.memento-stripe-prepayment career.memento-payment">
            <span className="mb-1.5 block text-base font-medium text-fg">Backend Engineer <span className="font-normal text-fg-2">— 인턴 합류 후 정규직 전환 · 회사 폐업으로 종료</span></span>
            <PlainList
              items={[
                <>입사 초기 기존 다국어 Happy Call 흐름을 알림톡·이메일 즉시/예약 발송으로 확장하고, <strong>Celery ETA 작업의 취소·재등록·발송 이력</strong>과 설문 당첨 결과 조회·filter 구현</>,
                <>정규직 전환 후 <strong>Stripe Checkout manual-capture 선결제 영역</strong>을 구축하고 local transaction ID로 결제 이력과 Checkout·Webhook event를 연결. 예약 실패 시 PaymentIntent 상태별 cancel/refund 보상 처리와 환불 완료 시 mileage·ticket 상태 전이로 정합성 보완</>,
              ]}
            />
          </CareerRow>
          <CareerRow org="STUDIO LAB" period="2021.12 — 2024.01" data-claim="career.ai-pm-backend-continuity career.sellercanvas-product-system career.sellercanvas-enterprise-poc credentials.page-output-patent credentials.ces-2024">
            <span className="mb-1.5 block text-base font-medium text-fg">Product Manager <span className="font-normal text-fg-2">— AI Engineer → PM(메인 롤) → Backend Engineer</span></span>
            <PlainList
              items={[
                <>커머스 AI 제품의 <strong>프로토타입부터 v1.0까지 제품 흐름·기능 범위·출시 우선순위를 정한 PM 메인 역할</strong>로 0→1 구간을 이끎</>,
                <>프로토타입·v1.0 제품을 외부 패션 브랜드 PoC로 연결하고 상세페이지 제작 flow 재설계</>,
                <>해당 flow는 <strong>특허 「페이지 출력 방법」 출원·등록</strong>으로 이어졌고, 제품은 <strong>CES 2024 Best of Innovation</strong> 수상</>,
              ]}
            />
          </CareerRow>
          <CareerRow org="아이즈솔" period="2020.08 — 2021.06" data-claim="career.ai-pm-backend-continuity">
            <span className="mb-1.5 block text-base font-medium text-fg">Vision AI Engineer <span className="font-normal text-fg-2">— 인턴</span></span>
            <PlainList
              items={[
                <>Vision AI Engineer 인턴으로 제품 개발 경력을 시작했고, 이후 PM과 Backend Engineer로 확장한 product-system 경험의 출발점</>,
              ]}
            />
          </CareerRow>
        </NumberedList>
      </Sec>

      <Sec id="s2" no="03" title="백엔드·AI 제품 시스템" meta="Backend · AI Product Systems">
        <NumberedList>
          <Axis
            first
            no="01"
            title="AI를 활용한 36시간 FastAPI backend 재구축과 production cutover"
            data-claim="thready.rebuild-decision-execution thready.backend-rebuild thready.qa-reopen-reduction thready.release-operation"
            description="AI 도구로 빠르게 검증한 prototype을 실제 사용자 운영 단계로 옮겼습니다. 검증 harness로 기준을 먼저 고정하고, AI는 codebase 파악부터 기능 inventory·구현까지 적극 활용했습니다."
            evidence={[
              <>부분 수정으로는 의존성 구조가 남고 AI 모듈 확장이 어렵다고 판단해 <strong>서비스 규모가 작을 때 전면 재구축을 결정·설득</strong><Src>AI 콘텐츠 생성 제품</Src></>,
              <>frontend와 기존 release 흐름은 유지하고 <strong>FastAPI backend만 parallel rebuild</strong> — architecture·component·infra validation harness를 먼저 세운 뒤 <Metric>총 36시간</Metric>(작업 시간 기준)에 cutover<Src>AI 콘텐츠 생성 제품</Src></>,
              <>전환 전후 <strong>해결된 QA issue의 reopen 비율이 26%p 감소</strong> — QA 총건수가 아니라 반복 결함이 줄어든 신호로 측정<Src>Thready · Jira</Src></>,
              <>cutover 뒤에도 release·QA·task 구조와 production backend를 계속 책임<Src>AI 콘텐츠 생성 제품</Src></>,
            ]}
          />
          <Axis
            no="02"
            title="AI 실행부·DB 분리 — 실데이터 migration과 Outbox 전달까지 검증"
            data-claim="thready.ai-service-boundary thready.ai-service-migration thready.ai-replica-outbox"
            description="application·DB ownership을 나누는 데서 끝내지 않고, 기존 이력의 정합성과 이후 원장 전달의 failure mode까지 검증했습니다."
            evidence={[
              <>제품 정책·원장은 product backend가, 생성 lifecycle·실행 상태는 <strong>독립 FastAPI application·DB</strong>가 소유하도록 분리하고 authenticated HTTP 계약으로 연결<Src>Thready</Src></>,
              <>STG 생성 이력 <Metric>2,616건</Metric>·품질 snapshot <Metric>795건</Metric>·trace <Metric>7,111건</Metric>을 parent→child 순서로 이관<Src>Thready · STG migration</Src></>,
              <>실데이터 local rehearsal 뒤 row count·<strong>MD5 fingerprint·FK orphan 0건</strong>을 대조하고, health 성공과 실제 생성 성공을 분리한 post-deploy API E2E gate 수립<Src>Thready · STG migration</Src></>,
              <>원장 변경과 <strong>Outbox 기록을 같은 transaction</strong>으로 처리하고 relay retry·delivery version fence로 AI 장애와 역순 전달이 최신 상태를 덮지 않도록 구성<Src>Thready</Src></>,
            ]}
          />
          <Axis
            no="03"
            title="재시도로 끝내지 않은 주문·재고 worker 복구 흐름"
            data-claim="centurion.async-migration centurion.bay-async-backend"
            description="실패 가능한 작업을 API 밖으로 분리하고, 최대 retry 이후에도 운영자가 다시 처리할 수 있는 상태를 남겼습니다."
            evidence={[
              <>주문·재고 API와 RabbitMQ·TaskIQ worker를 분리하고 <strong>상태·retry·실패 기록·재처리 경계 구축을 주도</strong><Src>AI 메디컬 플랫폼</Src></>,
              <>async FastAPI 실행 모델과의 정합성을 기준으로 Celery에서 TaskIQ + RabbitMQ로 전환<Src>AI 메디컬 플랫폼</Src></>,
              <>알림 책임을 domain·service·worker로 나누고 수동 재발송까지 운영 흐름에 연결했으며, worker image도 별도 배포 단위로 분리<Src>AI 메디컬 플랫폼</Src></>,
            ]}
          />
          <Axis
            no="04"
            title="잘되는 글을 데이터로 정의하고, AI 생성 결과를 evaluation으로 검증"
            data-claim="thready.threads-market-outcome-design thready.labeling-corpus-workbench thready.hook-rubric-experiment thready.generation-quality-system thready.quality-criteria-system"
            description="마케팅 관찰을 감으로 남기지 않고 성과 기준·labeling workflow·생성 품질 판정으로 연결했습니다. 데이터 규모와 실제 prompt 적용 범위는 구분했습니다."
            evidence={[
              <>Threads URL 기준 <Metric>최신 상태 13.1만 행·시계열 관측 318만 행</Metric>을 분석해 절대·저자 상대·도메인 상대를 포함한 <strong>5개 outcome 후보를 병렬 설계</strong><Src>Thready</Src></>,
              <>한국어 본문 <Metric>11.1만 건</Metric>·작성자 이어쓰기 <Metric>18.5만 건</Metric>을 정제해 독립 labeling schema로 이관하고, typed batch validation·멱등 upsert/replace·API/UI workbench 구축<Src>Thready</Src></>,
              <>typed prompt builder·<code>source_context</code>·critique/revise·LLM judge·evaluation sweep·관측 logging으로 생성 품질 workflow 구축<Src>Thready</Src></>,
              <>품질 판정을 <strong>결정적 자동 gate 12종·실측 분포·사람 판정</strong>의 3층으로 나눠 자동화의 범위와 한계를 명시<Src>Thready</Src></>,
              <>hook-quality <Metric>20,256건</Metric>의 8축 rubric을 <strong>실험 writer prompt·LLM judge</strong>에 반영<Src>Thready · experiment</Src></>,
            ]}
          />
          <Axis
            no="05"
            title="client header가 아니라 server auth state가 결정하는 지점 권한"
            data-claim="centurion.msa-platform-context nexus.backend-architecture nexus.admin-backend-ownership nexus.branch-access-boundary"
            description="API Gateway·SSO 기반 의료 MSA의 통합 관리 backend에서 소속 지점과 현재 작업 지점을 서로 다른 권한 상태로 다뤘습니다."
            evidence={[
              <>Clean Architecture 기반 monorepo에 Homepage·Admin API를 독립 모듈로 두고 gateway로 단일 endpoint 제공, Generic Repository로 공통 CRUD 표준화<Src>AI 메디컬 플랫폼</Src></>,
              <>Multi-tenancy와 Soft Delete 자동 filter로 데이터 격리를 구성하고 service boundary·migration flow를 주도<Src>AI 메디컬 플랫폼</Src></>,
              <>운영자의 소속 지점과 작업 지점을 분리해 접근 범위를 server auth state가 결정하도록 설계 — <strong>X-Branch-Id로 변경할 수 없고 권한 검증 API로만 전환</strong><Src>AI 메디컬 플랫폼</Src></>,
              <>본사 미선택은 409, 권한 밖 지점은 403으로 구분하면서 shared auth middleware와 Homepage API의 기존 계약은 유지<Src>AI 메디컬 플랫폼</Src></>,
            ]}
          />
          <Axis
            no="06"
            title="예약이 실패해도 결제만 남지 않게 — Stripe 보상 처리"
            data-claim="career.memento-stripe-prepayment career.memento-payment"
            description="예약보다 먼저 시작되는 선결제에서 local DB와 provider 상태가 갈라지는 경우를 PaymentIntent 상태별 보상 흐름으로 다뤘습니다."
            evidence={[
              <>Stripe Checkout manual-capture 선결제를 구축하고 local transaction ID를 metadata에 실어 PaymentHistory·PaymentMethod와 Checkout·Webhook event를 연결<Src>Memento AI</Src></>,
              <>예약 처리 실패 시 PaymentIntent가 <code>requires_capture</code>면 cancel, <code>succeeded</code>면 refund하는 <strong>provider-side 보상 처리</strong> 적용<Src>Memento AI</Src></>,
              <>환불 요청과 완료를 분리하고 mileage 복원·ticket 삭제를 환불 완료 transition으로 이동해 현금·Stripe·0원·전액 mileage 경로의 상태 변경 순서를 보완<Src>Memento AI</Src></>,
            ]}
          />
        </NumberedList>
      </Sec>

      <Sec id="s4" no="04" title="제품 운영·엔지니어링 시스템" meta="AX · Engineering Systems">
        <NumberedList>
          <Axis
            first
            no="01"
            title="제품 결정이 문서에서 끝나지 않도록 release까지 상태를 연결"
            data-claim="mediness.product-system-design-participation mediness.product-operations"
            description="서비스 구현 담당자와 요구·운영 흐름을 함께 구체화하고, 제품별 실행·검증·릴리스 체계의 적용과 운영을 리드했습니다."
            evidence={[
              <span key="design" data-claim="mediness.product-system-design-participation">MEDINESS 서비스 구현 담당자와 <strong>제품 요구·운영 흐름을 구체화하는 설계에 참여</strong><Src>MEDINESS</Src></span>,
              <span key="ledger" data-claim="mediness.product-operations">pipeline registry에서 제품 결정을 Decision·SPEC·Work Package로 분해해 실행 원장으로 운영<Src>제품 운영</Src></span>,
              <span key="gate" data-claim="mediness.product-operations">BE·FE·QA owner lane과 QA approval을 release gate로 연결해 <strong>일정·이슈·릴리스 운영을 리드</strong><Src>제품 운영</Src></span>,
              <span key="release" data-claim="mediness.product-operations">release gate·version cut을 실제 완료 시점에 연결해 release note 자동 생성과 버전 변경 추적을 운영<Src>제품 운영</Src></span>,
            ]}
          />
          <Axis
            no="02"
            title="백엔드 2~3명이 여러 제품을 맡기 위한 FastAPI·agent 공통 기반"
            data-claim="be-template.backend-standard be-template.team-leverage be-template.agent-context"
            description="소수의 backend가 여러 제품을 지원하는 환경에서 구조·규약·운영 문맥을 한 번 정의해 사람과 agent가 함께 재사용하도록 만들었습니다."
            evidence={[
              <>layered architecture·DI·ADR·convention·runbook을 갖춘 조직 표준 FastAPI template을 설계·구축<Src>조직 표준</Src></>,
              <>logging·monitoring 같은 횡단 관심사를 template에서 반영해 여러 제품에 같은 기준을 적용<Src>조직 표준</Src></>,
              <>10명 안팎의 엔지니어 조직에서 2~3명의 backend가 다수 제품을 담당하고, FE도 같은 pattern·규약 아래 BE 로직을 구현할 수 있게 함<Src>조직 표준</Src></>,
              <>계층적 agent context와 반복 작업 automation skill을 template에 내장해 architecture decision과 작업 규칙을 실행 문맥으로 제공<Src>조직 표준</Src></>,
            ]}
          />
          <Axis
            no="03"
            title="Terraform을 배포 도구가 아니라 production 변경 gate로 운영"
            data-claim="infra.company-azure-ownership infra.terraform-state-safety infra.azure-observability"
            description="Azure live resource와 Terraform 선언의 차이를 숨기지 않고, state·plan·운영 관측을 production 변경 gate로 만들었습니다."
            evidence={[
              <>Shared·B2B·B2C의 STG·Prod를 <strong>6개 독립 Terraform root·remote state</strong>로 분리하고 <Metric>400+ state object</Metric> 운영<Src>회사 Azure infrastructure</Src></>,
              <>state snapshot·Terraform plan·Azure live inventory를 교차 검증해 PostgreSQL 강제 교체 같은 destructive plan은 중단하고, 기존 B2C resource 편입은 <strong>0 add·0 destroy</strong> 조건으로 준비<Src>회사 Azure infrastructure</Src></>,
              <>Azure Monitor·Log Analytics와 AMA/DCR로 <Metric>10대 VM</Metric>의 container log를 중앙화하고 API·DB·host를 포함한 <Metric>8개 Production alert</Metric>를 Terraform으로 운영<Src>회사 Azure infrastructure</Src></>,
            ]}
          />
        </NumberedList>
      </Sec>

      <Sec id="s5" no="05" title="기술" meta="Skills">
        <KeyValueRows items={SKILLS} />
      </Sec>

      <Sec id="s6" no="06" title="외부 활동" meta="External Activities">
        <NumberedList className="border-t border-border-soft">
          <NumberedRow label="UX 컨설팅" labelWidth="lg" className={resumeType.careerRow} data-claim="career.product-ux-practice career.ux-consulting-product-outcome">
            <ExternalActivity
              title="운영 서비스 UX 컨설팅"
              description="보상 포인트를 인지하고 다시 방문하기 어려운 사용자 흐름을 문제로 정의해, badge·push 중심의 개선 가설과 Figma 화면안을 제안했습니다."
              outcomeLabel="성과"
              outcome="사후 공유 결과, 개선안 반영 후 3개월 이내 App Store 순위 9위→5위·DAU 기존 대비 200% 수준 — 복수 개선의 공동 결과에 기여"
            />
          </NumberedRow>
          <NumberedRow label="UX 스터디" labelWidth="lg" className={resumeType.careerRow} data-claim="career.product-ux-practice">
            <ExternalActivity
              title="Speak 개선안 제안 · YouTube Music UX 원리 리뷰"
              description="학습 완료 후 다음 콘텐츠가 단조롭고 현재 학습과 연결되지 않는 문제를 분석해 추천 흐름 요구사항을 설계하고, YouTube Music 사례의 UX 심리 원리를 분석·발표했습니다."
              outcomeLabel="성과"
              outcome="Speak 개선안 발표로 IPS 12기 MVP 선정"
            />
          </NumberedRow>
        </NumberedList>
      </Sec>

      <Sec id="s7" no="07" title="수상·특허·자격 / 학력" meta="Credentials">
        <NumberedList className="border-t border-border-soft">
          <NumberedRow label={"특허\n2022.10.13 출원"} labelWidth="lg" labelClassName="whitespace-pre-line" className={resumeType.credentialRow} data-claim="credentials.page-output-patent">
            <span className="text-base text-fg"><strong className="font-medium">「페이지 출력 방법」</strong> · 출원 10-2022-0130234 · 등록 10-2898273 (2025.12경)</span>
          </NumberedRow>
          <NumberedRow label={"수상\n2024.01"} labelWidth="lg" labelClassName="whitespace-pre-line" className={resumeType.credentialRow} data-claim="credentials.ces-2024">
            <span className="text-base text-fg"><strong className="font-medium">CES 2024 Best of Innovation</strong> · AI 부문 대상 제품 참여</span>
          </NumberedRow>
          <NumberedRow label={"인증\n2022.11경"} labelWidth="lg" labelClassName="whitespace-pre-line" className={resumeType.credentialRow} data-claim="credentials.ai-accuracy-certification">
            <span className="text-base text-fg"><strong className="font-medium">KCL AI 정확도 부문 인증 통과</strong> · 한국건설생활환경시험연구원</span>
          </NumberedRow>
          <NumberedRow label={"자격\n2021.09"} labelWidth="lg" labelClassName="whitespace-pre-line" className={resumeType.credentialRow} data-claim="credentials.adsp">
            <span className="text-base text-fg"><strong className="font-medium">ADsP</strong> · 데이터분석 준전문가</span>
          </NumberedRow>
          <NumberedRow label={"학력\n2016—2021"} labelWidth="lg" labelClassName="whitespace-pre-line" className={resumeType.credentialRow} data-claim="credentials.education">
            <span className="text-base text-fg-2">우송대학교 게임멀티미디어 전공</span>
          </NumberedRow>
        </NumberedList>
      </Sec>
      </OrderedSections>
    </div>
  );
}

/* — 영문 초안 (claim registry allowed_copy_en 등록 전) — */

function DocEn() {
  return (
    <div>
      <Banner tag="DRAFT" className="mb-6">
        This English resume is a <b>draft</b> — under review against the Korean master.
      </Banner>
      <header className={resumeType.documentHeader}>
        <div className={resumeType.identityBlock}>
          <h1 className={resumeType.identity}>Daejeong Kim</h1>
          <p className={resumeType.roleMeta}>Tech Lead · Backend Engineer</p>
        </div>
        <div className={resumeType.metaBlock}>
          <p className={resumeType.careerMeta}>
            <b className="font-medium text-fg">MediSolve AI</b> · Tech Lead · Backend Engineer{" "}
            <span className="text-muted">(Apr 2025 — present)</span>
          </p>
          <div className={resumeType.contactRow}>
            <Chip variant="contact" href="mailto:marin.backend@gmail.com">
              marin.backend@gmail.com
            </Chip>
            <Chip variant="contact" href="https://github.com/Dae-Jeong" external>
              github.com/Dae-Jeong
            </Chip>
            <Chip variant="contact">Anyang-si, Gyeonggi-do, KR</Chip>
          </div>
        </div>
        <ProfilePhoto />
      </header>

      <OrderedSections order={SECTIONS_EN.map((section) => section.id)}>
      <Sec id="s1" no="01" title="Profile">
        <div className={resumeType.summaryStack}>
          <p className="m-0" data-claim="career.tenure career.thedaylabs-freelance thready.backend-rebuild thready.release-operation thready.ai-service-boundary thready.ai-replica-outbox centurion.bay-async-backend be-template.team-leverage infra.terraform-state-safety">
            In a small backend team responsible for multiple products, I own work from initial foundations through live-service rebuilds as a <strong className={resumeType.inlineStrong}>Tech Lead and Backend Engineer</strong>. Across <Metric>four years</Metric>, I have designed and operated service and data boundaries, migration integrity, explicit async state with retry and reprocessing, and Terraform state and drift controls.
          </p>
          <p className="m-0" data-claim="career.ai-pm-backend-continuity career.product-ux-practice centurion.day-product-integration mediness.product-operations be-template.backend-standard be-template.agent-context thready.ai-service-boundary thready.quality-criteria-system">
            Drawing on Vision AI development and PM/UX analysis, I evaluate user, operational, and technical constraints together and <strong className={resumeType.inlineStrong}>turn the result into backend contracts.</strong> I make requirements executable as domain models, APIs, transaction and worker states, and QA/release gates, then preserve decisions as runbooks and automation that teams and agents can reuse.
          </p>
        </div>
      </Sec>

      <Sec id="s3" no="02" title="Career">
        <NumberedList className="border-t border-border-soft">
          <CareerRow org="MediSolve AI" period="Apr 2025 —" currentLabel="Present" data-claim="career.medisolve-role-evolution career.thedaylabs-freelance career.memento-to-medisolve-early-member">
            <span className="mb-1.5 block text-base font-medium text-fg">Tech Lead · Backend Engineer <span className="font-normal text-fg-2">— also serving as PO</span></span>
            <PlainList
              items={[
                <span key="joining-path" data-claim="career.memento-to-medisolve-early-member career.thedaylabs-freelance"><strong>Joining path</strong> · Recruited as an early member of MediSolve AI after my engineering work at Memento AI was recognized; started pre-incorporation development through a TheDayLabs freelance engagement (Feb&ndash;Apr 2025), then joined MediSolve AI full-time when it was incorporated and took on Tech Lead responsibilities</span>,
                <span key="thready-business" data-claim="thready.prototype-to-user-operation thready.subscription-revenue-band">Led Thready&rsquo;s <strong>FastAPI backend transition, release, QA, and operations after the initial prototype</strong> through live-user operation. Product outcome: <Metric>about KRW 8&ndash;10M in monthly subscription revenue</Metric> (Aug 2026)</span>,
                <span key="operation" data-claim="thready.rebuild-decision-execution thready.qa-reopen-reduction">Established <strong>architecture, component, and infrastructure validation harnesses before rebuilding the backend</strong>; across the cutover, the reopen rate of resolved QA issues fell by <strong>26 percentage points</strong></span>,
                <span key="centurion" data-claim="career.thedaylabs-freelance centurion.msa-platform-context centurion.bay-async-backend centurion.say-realtime-ai centurion.ray-backend centurion.sso-session">Established Centurion&rsquo;s <strong>initial backend and engineering standards</strong> before incorporation; later led order/inventory workers and integrated-management backends in its API Gateway/SSO-based medical MSA, while contributing to realtime AI sessions, facility/inventory integration, and SSO policy</span>,
                <span key="mediness" data-claim="mediness.product-system-design-participation mediness.product-operations">Contributed to <strong>MEDINESS product-requirement and operating-flow design</strong>, then connected product-level decisions, SPECs, and Work Packages to BE·FE·QA owner lanes and release gates to lead schedule, issue, and release operations</span>,
                <span key="infra" data-claim="infra.company-azure-ownership">Own the <strong>company-wide Azure and Terraform infrastructure</strong> — resource boundaries by B2B/B2C, product, and environment, plus deploy and operating procedures</span>,
              ]}
            />
          </CareerRow>
          <CareerRow org="Memento AI" period="Oct 2024 — Jan 2025" data-claim="career.memento-happycall-survey career.memento-stripe-prepayment career.memento-payment">
            <span className="mb-1.5 block text-base font-medium text-fg">Backend Engineer <span className="font-normal text-fg-2">— joined as an intern, converted full-time · role ended when the company closed</span></span>
            <PlainList
              items={[
                <>Early in the role, extended the existing multilingual Happy Call flow with immediate/scheduled messaging and email, then implemented <strong>Celery ETA cancellation, rescheduling, and send history</strong> plus survey-winner result queries and filters</>,
                <>After converting full-time, built the <strong>Stripe Checkout manual-capture prepayment slice</strong> and mapped local transaction IDs to payment history and Checkout/Webhook events. Added PaymentIntent-state-aware cancel/refund compensation and refund-completed mileage/ticket transitions to improve consistency</>,
              ]}
            />
          </CareerRow>
          <CareerRow org="STUDIO LAB" period="Dec 2021 — Jan 2024" data-claim="career.ai-pm-backend-continuity career.sellercanvas-product-system career.sellercanvas-enterprise-poc credentials.page-output-patent credentials.ces-2024">
            <span className="mb-1.5 block text-base font-medium text-fg">Product Manager <span className="font-normal text-fg-2">— AI Engineer, then PM (primary role), then Backend Engineer</span></span>
            <PlainList
              items={[
                <>Led the commerce AI product&rsquo;s <strong>prototype-to-v1.0 product flow, feature scope, and release priorities as the primary PM</strong></>,
                <>Connected the prototype/v1.0 product to an external fashion-brand PoC and redesigned the product-detail-page creation flow</>,
                <>That flow led to the registered patent <strong>&ldquo;Page Output Method&rdquo;</strong>; the product won <strong>CES 2024 Best of Innovation</strong></>,
              ]}
            />
          </CareerRow>
          <CareerRow org="Izsol" period="Aug 2020 — Jun 2021" data-claim="career.ai-pm-backend-continuity">
            <span className="mb-1.5 block text-base font-medium text-fg">Vision AI Engineer <span className="font-normal text-fg-2">— intern</span></span>
            <PlainList
              items={[
                <>Started my product-development career as a Vision AI Engineer intern, the first step in an experience path that later expanded through PM into backend engineering</>,
              ]}
            />
          </CareerRow>
        </NumberedList>
      </Sec>

      <Sec id="s2" no="03" title="Backend & AI Product Systems">
        <NumberedList>
          <Axis
            first
            no="01"
            title="AI-assisted 36-hour FastAPI backend rebuild and production cutover"
            data-claim="thready.rebuild-decision-execution thready.backend-rebuild thready.qa-reopen-reduction thready.release-operation"
            description="I moved an AI-assisted rapid-validation prototype into live-user operations. I fixed the validation criteria first, while AI accelerated codebase discovery, feature inventory, and implementation."
            evidence={[
              <>Concluded that partial fixes would preserve the dependency structure and constrain AI-module expansion, then <strong>chose and argued for a full rebuild while the service was still small</strong><Src>AI content product</Src></>,
              <>Kept the frontend and existing release flow, rebuilding only the <strong>FastAPI backend in parallel</strong>; established architecture, component, and infrastructure validation harnesses before cutting over in <Metric>36 work hours</Metric><Src>AI content product</Src></>,
              <>Across the cutover, the <strong>reopen rate of resolved QA issues fell by 26 percentage points</strong> — a recurrence signal, not a raw QA-ticket count<Src>Thready · Jira</Src></>,
              <>Continued owning release, QA, task operations, and the production backend after cutover<Src>AI content product</Src></>,
            ]}
          />
          <Axis
            no="02"
            title="Split AI execution and its database, then verified migration and Outbox delivery"
            data-claim="thready.ai-service-boundary thready.ai-service-migration thready.ai-replica-outbox"
            description="I went beyond application and database ownership, verifying migrated-history consistency and the failure modes of subsequent ledger delivery."
            evidence={[
              <>Separated ownership so the product backend holds policy and the ledger while an <strong>independent FastAPI application and database</strong> hold generation lifecycle and execution state, linked by an authenticated HTTP contract<Src>Thready</Src></>,
              <>Migrated <Metric>2,616 generation records</Metric>, <Metric>795 quality snapshots</Metric>, and <Metric>7,111 traces</Metric> in parent-to-child order on STG<Src>Thready · STG migration</Src></>,
              <>Rehearsed against restored real data, compared row counts, <strong>MD5 fingerprints, and zero FK orphans</strong>, then separated healthy deployment from successful generation through post-deploy API E2E gates<Src>Thready · STG migration</Src></>,
              <>Committed ledger mutation and the <strong>Outbox record in one transaction</strong>, using relay retry and delivery-version fencing so AI faults or out-of-order delivery could not overwrite the latest state<Src>Thready</Src></>,
            ]}
          />
          <Axis
            no="03"
            title="Order and inventory worker recovery that did not stop at retry"
            data-claim="centurion.async-migration centurion.bay-async-backend"
            description="I moved failure-prone work outside the API path and preserved a state that operators could reprocess after retry exhaustion."
            evidence={[
              <>Separated order/inventory APIs from RabbitMQ·TaskIQ workers and <strong>led the state, retry, failure-recording, and reprocessing boundary</strong><Src>Medical AI platform</Src></>,
              <>Moved from Celery to TaskIQ + RabbitMQ based on compatibility with the async FastAPI execution model<Src>Medical AI platform</Src></>,
              <>Split notification responsibility across domain, service, and worker; connected manual resend to operations and deployed the worker as a separate image<Src>Medical AI platform</Src></>,
            ]}
          />
          <Axis
            no="04"
            title="Defined successful content from data, then evaluated AI-generated output"
            data-claim="thready.threads-market-outcome-design thready.labeling-corpus-workbench thready.hook-rubric-experiment thready.generation-quality-system thready.quality-criteria-system"
            description="I turned marketing observations into outcome criteria, a labeling workflow, and generation-quality evaluation, while keeping corpus scale separate from prompt rollout scope."
            evidence={[
              <>Analyzed <Metric>131K URL-keyed latest-state rows and 3.19M time-series observations</Metric>, designing <strong>five parallel outcome candidates</strong> including absolute, author-relative, and domain-relative measures<Src>Thready</Src></>,
              <>Curated roughly <Metric>111K Korean posts</Metric> and <Metric>185K author continuations</Metric> into an isolated labeling schema, with typed batch validation, idempotent upsert/replace, and an API/UI workbench<Src>Thready</Src></>,
              <>Built a generation-quality workflow with a typed prompt builder, <code>source_context</code>, critique/revise, an LLM judge, evaluation sweeps, and observability logging<Src>Thready</Src></>,
              <>Separated quality decisions into <strong>12 deterministic gates, empirical-distribution checks, and human judgment</strong>, making automation&rsquo;s boundary explicit<Src>Thready</Src></>,
              <>Translated an eight-dimension rubric scored across <Metric>20,256 hook-quality rows</Metric> into an <strong>experimental writer prompt and LLM judge</strong><Src>Thready · experiment</Src></>,
            ]}
          />
          <Axis
            no="05"
            title="Branch access decided by server auth state, not a client header"
            data-claim="centurion.msa-platform-context nexus.backend-architecture nexus.admin-backend-ownership nexus.branch-access-boundary"
            description="In the integrated-management backend of an API Gateway/SSO-based medical MSA, I modeled assigned branch and current working branch as distinct authorization states."
            evidence={[
              <>Placed independent Homepage and Admin API modules in a Clean Architecture monorepo behind one gateway endpoint, with shared CRUD standardized through a Generic Repository<Src>Medical AI platform</Src></>,
              <>Built data isolation through multi-tenancy and automatic Soft Delete filtering, and led service-boundary and migration flow<Src>Medical AI platform</Src></>,
              <>Separated an operator&rsquo;s assigned branch from working branch so server auth state decides scope: <strong>X-Branch-Id cannot switch it; only a permission-checked API can</strong><Src>Medical AI platform</Src></>,
              <>Distinguished unselected headquarters state as 409 and unauthorized branch access as 403 while preserving shared auth middleware and the Homepage API contract<Src>Medical AI platform</Src></>,
            ]}
          />
          <Axis
            no="06"
            title="Stripe compensation so a failed booking did not leave payment behind"
            data-claim="career.memento-stripe-prepayment career.memento-payment"
            description="For prepayment that begins before booking creation, I handled divergence between local records and provider state with PaymentIntent-aware compensation."
            evidence={[
              <>Built Stripe Checkout manual-capture prepayment and mapped local transaction IDs through metadata to PaymentHistory, PaymentMethod, and Checkout/Webhook events<Src>Memento AI</Src></>,
              <>On booking failure, cancelled <code>requires_capture</code> intents and refunded <code>succeeded</code> intents as <strong>provider-side compensation</strong><Src>Memento AI</Src></>,
              <>Separated refund request from completion, moving mileage restoration and ticket deletion to the completed transition across cash, Stripe, zero-amount, and full-mileage paths<Src>Memento AI</Src></>,
            ]}
          />
        </NumberedList>
      </Sec>

      <Sec id="s4" no="04" title="Product Delivery & Engineering Systems" meta="AX · Engineering Systems">
        <NumberedList>
          <Axis
            first
            no="01"
            title="Kept product decisions alive through release"
            data-claim="mediness.product-system-design-participation mediness.product-operations"
            description="I worked with the service implementers to refine requirements and operating flows, then led the application and operation of product-level execution, verification, and release contracts."
            evidence={[
              <span key="design" data-claim="mediness.product-system-design-participation">Worked with the MEDINESS service implementers to <strong>refine product requirements and operating flows</strong><Src>MEDINESS</Src></span>,
              <span key="ledger" data-claim="mediness.product-operations">Turned product decisions into Decision records, SPECs, and Work Packages in a pipeline registry used as the execution ledger<Src>Product operations</Src></span>,
              <span key="gate" data-claim="mediness.product-operations">Connected BE·FE·QA owner lanes and QA approval to release gates, <strong>leading schedule, issue, and release operations</strong><Src>Product operations</Src></span>,
              <span key="release" data-claim="mediness.product-operations">Tied release gates and version cuts to actual completion, running release-note generation and version-change tracking<Src>Product operations</Src></span>,
            ]}
          />
          <Axis
            no="02"
            title="A FastAPI and agent foundation for two to three backend engineers supporting multiple products"
            data-claim="be-template.backend-standard be-template.team-leverage be-template.agent-context"
            description="In an environment where a small backend team supports multiple products, I defined structure, conventions, and operating context once so people and agents could reuse them."
            evidence={[
              <>Designed and built an organization-wide FastAPI template with layered architecture, DI, ADRs, conventions, and runbooks<Src>Engineering standard</Src></>,
              <>Applied cross-cutting concerns such as logging and monitoring through the template so products consumed the same standard<Src>Engineering standard</Src></>,
              <>In a roughly ten-engineer organization where two to three backend engineers cover multiple products, enabled frontend engineers to implement backend logic under the same patterns and conventions<Src>Engineering standard</Src></>,
              <>Embedded hierarchical agent context and recurring-task automation skills so architecture decisions and work rules were available as execution context<Src>Engineering standard</Src></>,
            ]}
          />
          <Axis
            no="03"
            title="Used Terraform as a production change gate, not just a deployment tool"
            data-claim="infra.company-azure-ownership infra.terraform-state-safety infra.azure-observability"
            description="I treated differences between Azure live resources and Terraform declarations as production-change gates rather than hidden drift."
            evidence={[
              <>Split Shared, B2B, and B2C STG/Prod into <strong>six independent Terraform roots and remote states</strong>, operating <Metric>400+ state objects</Metric><Src>Company Azure infrastructure</Src></>,
              <>Cross-checked state snapshots, Terraform plans, and Azure live inventory; stopped destructive plans such as forced PostgreSQL replacement and prepared the adoption of existing B2C resources with <strong>zero add and zero destroy</strong><Src>Company Azure infrastructure</Src></>,
              <>Centralized container logs from <Metric>10 VMs</Metric> with Azure Monitor, Log Analytics, and AMA/DCR, and operate <Metric>eight Production alerts</Metric> across API, database, and host signals in Terraform<Src>Company Azure infrastructure</Src></>,
            ]}
          />
        </NumberedList>
      </Sec>

      <Sec id="s5" no="05" title="Skills">
        <KeyValueRows items={SKILLS_EN} />
      </Sec>

      <Sec id="s6" no="06" title="External Activities">
        <NumberedList className="border-t border-border-soft">
          <NumberedRow label="UX Consulting" labelWidth="lg" className={resumeType.careerRow} data-claim="career.product-ux-practice career.ux-consulting-product-outcome">
            <ExternalActivity
              title="Live-service UX consulting"
              description="Defined weak reward-point awareness and return paths as user-flow problems, then proposed badge and notification hypotheses with Figma screens."
              outcomeLabel="Outcome"
              outcome="Shared post-launch result: within three months, App Store rank moved from 9th to 5th and DAU reached 200% of its prior level; contributed alongside other product changes."
            />
          </NumberedRow>
          <NumberedRow label="UX Study" labelWidth="lg" className={resumeType.careerRow} data-claim="career.product-ux-practice">
            <ExternalActivity
              title="Speak improvement proposal · YouTube Music UX principles review"
              description="Analyzed post-lesson recommendations that felt repetitive and disconnected from the current lesson, designed a context-aware recommendation flow, and presented the UX psychology behind YouTube Music."
              outcomeLabel="Outcome"
              outcome="Selected as the IPS 12th-cohort MVP for the Speak improvement proposal."
            />
          </NumberedRow>
        </NumberedList>
      </Sec>

      <Sec id="s7" no="07" title="Credentials & Education">
        <NumberedList className="border-t border-border-soft">
          <NumberedRow label={"Patent\nFiled Oct 13, 2022"} labelWidth="lg" labelClassName="whitespace-pre-line" className={resumeType.credentialRow} data-claim="credentials.page-output-patent">
            <span className="text-base text-fg"><strong className="font-medium">&ldquo;Method for Displaying Page&rdquo;</strong> · application 10-2022-0130234 · registration 10-2898273 (c. Dec 2025)</span>
          </NumberedRow>
          <NumberedRow label={"Award\nJan 2024"} labelWidth="lg" labelClassName="whitespace-pre-line" className={resumeType.credentialRow} data-claim="credentials.ces-2024">
            <span className="text-base text-fg"><strong className="font-medium">CES 2024 Best of Innovation</strong> · contributed to the awarded AI product</span>
          </NumberedRow>
          <NumberedRow label={"Certification\nc. Nov 2022"} labelWidth="lg" labelClassName="whitespace-pre-line" className={resumeType.credentialRow} data-claim="credentials.ai-accuracy-certification">
            <span className="text-base text-fg"><strong className="font-medium">KCL AI accuracy certification</strong> · Korea Conformity Laboratories</span>
          </NumberedRow>
          <NumberedRow label={"Credential\nSep 2021"} labelWidth="lg" labelClassName="whitespace-pre-line" className={resumeType.credentialRow} data-claim="credentials.adsp">
            <span className="text-base text-fg"><strong className="font-medium">ADsP</strong> · Advanced Data Analytics Semi-Professional</span>
          </NumberedRow>
          <NumberedRow label={"Education\n2016—2021"} labelWidth="lg" labelClassName="whitespace-pre-line" className={resumeType.credentialRow} data-claim="credentials.education">
            <span className="text-base text-fg-2">Woosong University, Game Multimedia major</span>
          </NumberedRow>
        </NumberedList>
      </Sec>
      </OrderedSections>
    </div>
  );
}

export function ResumeView() {
  const [lang, setLang] = useState<"ko" | "en">("ko");

  useEffect(() => {
    document.documentElement.lang = lang;

    return () => {
      document.documentElement.lang = "ko";
    };
  }, [lang]);

  return (
    <ResumeLayout
      sections={lang === "ko" ? SECTIONS_KO : SECTIONS_EN}
      language={{
        value: lang,
        options: [
          { value: "ko", label: "KO" },
          { value: "en", label: "EN" },
        ],
        onChange: (value) => setLang(value === "en" ? "en" : "ko"),
      }}
    >
      {lang === "ko" ? <DocKo /> : <DocEn />}
    </ResumeLayout>
  );
}
