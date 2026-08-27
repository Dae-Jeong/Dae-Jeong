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
  allowBreak = false,
  "data-claim": dataClaim,
  children,
}: {
  org: string;
  period: string;
  currentLabel?: string;
  allowBreak?: boolean;
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
      className={cn(
        resumeType.careerRow,
        "resume-career-row",
        !allowBreak && "resume-career-row-keep",
      )}
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

function PortfolioCaseLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener"
      aria-label={label}
      className="focus-ring font-medium text-fg underline decoration-border underline-offset-[3px] transition-colors hover:text-accent hover:decoration-accent"
    >
      {children}
    </a>
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
  { id: "s2", label: "대표 성과" },
  { id: "s3", label: "경력" },
  { id: "s5", label: "기술" },
  { id: "s6", label: "외부 활동" },
  { id: "s7", label: "수상·특허·자격" },
] as const;

const SECTIONS_EN = [
  { id: "s1", label: "Profile" },
  { id: "s2", label: "Selected Impact" },
  { id: "s3", label: "Career" },
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
        via="API·도메인 모델·트랜잭션·데이터 이전 주력 · TypeScript·Express·NestJS 게이트웨이·연동 경험 · Java·Spring Boot 개인 프로젝트"
      />
    ),
  },
  {
    k: "데이터 / 비동기",
    "data-claim": "centurion.bay-async-backend thready.ai-replica-outbox",
    v: (
      <Skill
        stack="MySQL · RabbitMQ · TaskIQ · Transactional Outbox"
        via="주문·재고 워커와 재시도·delivery version fence·실패 기록·수동 재처리 경계"
      />
    ),
  },
  {
    k: "AI 런타임",
    "data-claim": "thready.ai-service-boundary thready.quality-criteria-system centurion.say-realtime-ai",
    v: (
      <Skill
        stack="LLM integration/evaluation · typed prompt · structured output · WebSocket · SSE · STT"
        via="LLM 생성 흐름·품질 평가와 실시간 AI 상담의 session lifecycle·provider 경계 공동 안정화"
      />
    ),
  },
  {
    k: "제품 실행 / AX",
    "data-claim": "mediness.company-work-ax-design mediness.product-system-design-participation mediness.product-operations",
    v: (
      <Skill
        stack="Decision · SPEC · Work Package · human gate · agent context"
        via="제품 개발과 의사결정·회의·업무 배정·승인·후속 작업의 상태와 책임을 연결"
      />
    ),
  },
  {
    k: "클라우드 / 배포",
    "data-claim": "infra.company-azure-ownership career.tellingme-backend-infra",
    v: (
      <Skill
        stack="Docker · GitHub Actions · Azure · Terraform · AWS"
        via="서비스 배포·환경 설정·기본 로그 확인 경험"
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
        via="Order and inventory workers with retry, delivery-version fencing, durable failure records, and manual reprocessing"
      />
    ),
  },
  {
    k: "AI Runtime",
    "data-claim": "thready.ai-service-boundary thready.quality-criteria-system centurion.say-realtime-ai",
    v: (
      <Skill
        stack="LLM integration/evaluation · typed prompt · structured output · WebSocket · SSE · STT"
        via="Generation lifecycle and quality evaluation · co-led stabilization of realtime AI session lifecycle and provider boundaries"
      />
    ),
  },
  {
    k: "Product Execution / AX",
    "data-claim": "mediness.company-work-ax-design mediness.product-system-design-participation mediness.product-operations",
    v: (
      <Skill
        stack="Decision · SPEC · Work Package · human gate · agent context"
        via="Connects product delivery with decisions, meetings, assignments, approvals, and follow-up actions through explicit state and ownership"
      />
    ),
  },
  {
    k: "Cloud / Delivery",
    "data-claim": "infra.company-azure-ownership career.tellingme-backend-infra",
    v: (
      <Skill
        stack="Docker · GitHub Actions · Azure · Terraform · AWS"
        via="Hands-on experience with service deployment, environment configuration, and basic log checks"
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
            <Chip variant="contact" href="https://marinkim.xyz" external>
              marinkim.xyz
            </Chip>
          </div>
        </div>
        <ProfilePhoto />
      </header>

      <OrderedSections order={SECTIONS_KO.map((section) => section.id)}>
      <Sec id="s1" no="01" title="소개" meta="Profile">
        <div className={resumeType.summaryStack}>
          <p className={resumeType.profileTitle}>
            아이디어를 새로운 가치로 실현하는 메이커, 김대정입니다.
          </p>
          <p
            className={resumeType.profileDescription}
            data-claim="career.medisolve-role-evolution thready.product-zero-to-one-contribution thready.frontend-product-delivery thready.subscription-revenue-band"
          >
            기획자 출신 Tech Lead로, 고객의 문제를 제품 우선순위와 구현 범위로 구체화합니다. 필요한 백엔드·AI·핵심 화면은 직접 만들고, 기획·QA·마케팅과 함께 출시와 유료 운영까지 이끌어 왔습니다.
          </p>
        </div>
      </Sec>

      <Sec id="s3" no="03" title="경력" meta="Career">
        <NumberedList className="border-t border-border-soft">
          <CareerRow org="MediSolve AI" period="2025.04 —" currentLabel="재직 중" allowBreak data-claim="career.medisolve-role-evolution career.thedaylabs-freelance career.memento-to-medisolve-early-member">
            <span className="mb-1.5 block text-base font-medium text-fg">Tech Lead · Backend Engineer <span className="font-normal text-fg-2">— 제품 운영 리드</span></span>
            <PlainList
              items={[
                <span key="thready-business" data-claim="thready.product-zero-to-one-contribution thready.frontend-product-delivery thready.prototype-to-user-operation thready.generation-quality-system thready.subscription-revenue-band"><PortfolioCaseLink href="https://marinkim.xyz/portfolio/thready" label="Thready 포트폴리오 사례 보기">Thready</PortfolioCaseLink>에서 고객 문제를 기능 우선순위와 품질 기준으로 구체화하고, <strong>기획·QA·마케팅과 제품 운영을 리드</strong>했습니다. 팀과 함께 실제 고객이 결제하는 유료 제품으로 만들었고, 이를 위해 FastAPI 백엔드·AI 생성/평가 시스템과 Next.js 핵심 사용자·관리 흐름을 직접 구현·운영했습니다.</span>,
                <span key="centurion" data-claim="career.thedaylabs-freelance centurion.msa-platform-context centurion.bay-async-backend centurion.day-product-integration centurion.say-realtime-ai centurion.ray-backend centurion.sso-session">Centurion에서는 법인 설립 전 <strong>초기 백엔드와 개발 기준</strong>을 세웠습니다. 이후 주문·재고 워커와 DAY 예약 정책의 백엔드·프런트엔드·QA·릴리스 연결을 주도했고, 실시간 AI 상담은 공동 주 기여, 시설·재고 연동과 SSO 정책은 일부 기능을 맡았습니다.</span>,
                <span key="hospital-operations" data-claim="nexus.backend-architecture nexus.admin-backend-ownership">별도의 여러 피부과 운영·예약 시스템에서는 <strong>백엔드 architecture와 migration flow, Admin·Homepage API 구축을 주도</strong>하고 있습니다.</span>,
                <span key="company-ax" data-claim="mediness.company-work-ax-design mediness.product-system-design-participation mediness.product-operations">MEDINESS의 제품 요구·운영 흐름 설계에 참여하고, Decision·SPEC·Work Package·QA·릴리스는 제품별로 적용·운영했습니다. 회사 AX 구조는 회의·의사결정·업무 배정·승인·후속 작업에서 agent가 맥락·실행안을 준비하고 판단은 사람이 확정하도록 설계하는 데 참여했습니다.</span>,
                <span key="engineering-system" data-claim="be-template.backend-standard be-template.team-leverage be-template.agent-context infra.company-azure-ownership">조직 표준 FastAPI 템플릿과 agent 작업 맥락을 직접 구축했습니다. 여러 사내 서비스의 Azure·Vercel 배포 환경도 서비스가 동작하도록 구성하고 기본 운영을 맡았습니다.</span>,
                <span key="joining-path" data-claim="career.memento-to-medisolve-early-member career.thedaylabs-freelance"><strong>합류 경로</strong> · Memento AI 개발 성과를 인정받아 MediSolve AI 초기 멤버로 영입됐고, 법인 설립 전 더데이랩스 프리랜서 기간(2025.02–04)을 거쳐 2025.04 정규 합류했습니다.</span>,
              ]}
            />
          </CareerRow>
          <CareerRow org="Memento AI" period="2024.10 — 2025.01" data-claim="career.memento-happycall-survey career.memento-stripe-prepayment career.memento-payment">
            <span className="mb-1.5 block text-base font-medium text-fg">Backend Engineer <span className="font-normal text-fg-2">— 인턴 합류 후 정규직 전환 · 회사 폐업으로 종료</span></span>
            <PlainList
              items={[
                <>입사 초기에는 기존 다국어 Happy Call을 알림톡·이메일 즉시/예약 발송으로 확장했습니다. <strong>Celery ETA 작업의 취소·재등록·발송 이력</strong>과 설문 당첨 결과 조회·필터도 구현했습니다.</>,
                <>정규직 전환 후 <strong>Stripe Checkout의 manual capture 기반 선결제</strong>를 구축하고, 내부 결제 ID로 결제 이력과 Checkout·Webhook 이벤트를 연결했습니다. 예약 실패 시 PaymentIntent 상태에 따라 취소·환불하고, 환불 완료 뒤 마일리지와 이용권 상태를 바꿔 정합성을 보완했습니다.</>,
              ]}
            />
          </CareerRow>
          <CareerRow org="STUDIO LAB" period="2021.12 — 2024.01" data-claim="career.ai-pm-backend-continuity career.sellercanvas-product-system career.sellercanvas-enterprise-poc credentials.page-output-patent credentials.ces-2024">
            <span className="mb-1.5 block text-base font-medium text-fg">Product Manager <span className="font-normal text-fg-2">— AI Engineer → PM(주 역할) → Backend Engineer</span></span>
            <PlainList
              items={[
                <>커머스 AI 제품의 <strong>프로토타입부터 v1.0까지 제품 흐름·기능 범위·출시 우선순위를 정하는 PM</strong>으로 첫 제품을 구체화하고 외부 패션 브랜드 PoC까지 확장했습니다.</>,
                <>해당 상세 페이지 제작 방식은 <strong>특허 「페이지 출력 방법」으로 출원·등록</strong>됐고, 제품은 <strong>CES 2024 Best of Innovation</strong>을 수상했습니다.</>,
              ]}
            />
          </CareerRow>
          <CareerRow org="아이즈솔" period="2020.08 — 2021.06" data-claim="career.ai-pm-backend-continuity">
            <span className="mb-1.5 block text-base font-medium text-fg">Vision AI Engineer <span className="font-normal text-fg-2">— 인턴</span></span>
            <PlainList
              items={[
                <>Vision AI Engineer 인턴으로 제품 개발 경력을 시작했고, 이후 PM과 Backend Engineer로 역할을 넓혔습니다.</>,
              ]}
            />
          </CareerRow>
        </NumberedList>
      </Sec>

      <Sec id="s2" no="02" title="대표 성과" meta="Selected Impact">
        <NumberedList>
          <Axis
            first
            no="01"
            title="아이디어를 팀과 실제 고객이 결제하는 Thready 제품으로 만들고 운영"
            data-claim="thready.product-zero-to-one-contribution thready.frontend-product-delivery thready.prototype-to-user-operation thready.subscription-revenue-band thready.release-operation thready.generation-quality-system"
            description="고객이 돈을 내는 이유를 찾고, 콘텐츠 제작과 성과 판단의 불편을 기능·실험·품질 기준으로 나눴습니다. 기획·QA·마케팅과 제품 판단부터 출시·운영까지 리드했습니다."
            evidence={[
              <>기능·실험 우선순위와 생성 품질·QA·릴리스 기준을 조율했습니다.<Src>Thready · 제품 운영</Src></>,
              <>팀과 함께 Thready를 <Metric>실제 고객이 결제하는 유료 제품</Metric>으로 만들고 운영하고 있습니다.<Src>Thready · 제품·팀 성과</Src></>,
              <>FastAPI 백엔드와 AI 생성·평가 시스템, Next.js의 생성·가져오기·예약·발행·관리 흐름을 직접 개발했습니다.<Src>Thready</Src></>,
            ]}
          />
          <Axis
            no="02"
            title="인계받은 초기 백엔드를 production 운영 단계에 맞게 FastAPI로 재구축"
            data-claim="thready.rebuild-decision-execution thready.backend-rebuild thready.prototype-to-user-operation thready.qa-reopen-reduction thready.release-operation"
            description="빠른 기능 검증 중심으로 만들어진 기존 프로토타입을 인계받았습니다. 기존 프런트엔드와 릴리스 흐름을 유지한 채 백엔드만 병렬로 교체할 범위와 전환 기준을 정했습니다."
            evidence={[
              <>기존 API 동작을 고정할 계약·컴포넌트·운영 흐름 <strong>검증 하네스를 먼저 구축</strong>했습니다.<Src>Thready</Src></>,
              <>기존 프런트엔드와 릴리스 흐름은 유지하고 새 FastAPI 백엔드를 나란히 만들어 응답을 비교한 뒤 전환했습니다.<Src>Thready</Src></>,
              <>전환 전후 같은 기준의 Jira 집계에서 해결된 QA 이슈의 <strong>재오픈 비율이 26%p 낮게 관측</strong>됐고, 이후 배포·QA·운영을 계속 맡았습니다.<Src>Thready · Jira</Src></>,
            ]}
          />
          <Axis
            no="03"
            title="주문·재고 후속 작업을 API와 분리하고, 실패 상태를 다시 처리할 수 있게 설계"
            data-claim="centurion.bay-async-backend centurion.async-migration centurion.test-ci-foundation"
            description="Centurion BAY의 주문·재고 API와 실패 가능한 후속 작업을 나누고, 자동 재시도가 끝난 뒤에도 원인과 상태를 남겨 운영자가 다시 처리할 수 있게 했습니다."
            evidence={[
              <>async FastAPI 실행 모델과의 정합성을 기준으로 Celery에서 TaskIQ·RabbitMQ로 전환하고, 워커 이미지를 API와 분리했습니다.<Src>Centurion · BAY</Src></>,
              <>작업 상태·retry·terminal failure를 기록하고 수동 재처리 경계를 뒀습니다.<Src>Centurion · BAY</Src></>,
              <>API test infrastructure·Docker CI·onboarding 문서로 API·broker·worker 흐름을 재현할 수 있는 개발 환경을 만들었습니다.<Src>Centurion · BAY</Src></>,
            ]}
          />
          <Axis
            no="04"
            title="제품 원장과 AI 실행 상태를 분리하고 STG 이전·전달 정합성을 검증"
            data-claim="thready.ai-service-boundary thready.ai-service-migration thready.ai-replica-outbox"
            description="제품 정책·원장과 AI 생성 lifecycle·실행 상태의 책임을 나눴습니다. 기존 데이터 이전과 이후의 지연·중복·역순 전달을 하나의 정합성 문제로 다뤘습니다."
            evidence={[
              <>제품 정책·원장은 제품 백엔드가, 생성 이력·실행 상태는 독립 FastAPI 애플리케이션과 DB가 맡도록 분리했습니다.<Src>Thready</Src></>,
              <>STG 생성 이력 <Metric>2,616건</Metric>·품질 기록 <Metric>795건</Metric>·실행 추적 <Metric>7,111건</Metric>을 옮기고 행 수·MD5 fingerprint·참조 누락·생성 API를 검증했습니다.<Src>Thready · STG 데이터 이전</Src></>,
              <>원장 변경과 Outbox 기록을 한 트랜잭션으로 처리하고, 전달이 지연·중복되거나 순서가 뒤바뀌어도 최신 상태를 덮지 않도록 retry·delivery version fence를 뒀습니다.<Src>Thready</Src></>,
            ]}
          />
          <Axis
            no="05"
            title="FastAPI·AI 에이전트 실행 기준을 조직 표준으로 구축"
            data-claim="be-template.backend-standard be-template.team-leverage be-template.agent-context"
            description="프로젝트마다 반복되던 구조와 작업 규칙을 실행 가능한 템플릿으로 만들고, 사람과 AI 에이전트가 같은 기준을 읽도록 했습니다."
            evidence={[
              <>계층형 아키텍처·DI·트랜잭션·오류 계약·ADR·운영 문서를 갖춘 조직 표준 FastAPI 템플릿을 설계·구축했습니다.<Src>조직 표준</Src></>,
              <>제품별 차이는 명시적인 선택지로 남기고, 로깅·모니터링 같은 공통 기능은 같은 기준으로 적용했습니다.<Src>조직 표준</Src></>,
              <>계층형 AI 에이전트 맥락과 반복 작업 자동화 스킬을 내장해 작업 전 아키텍처 결정과 규칙을 읽도록 했습니다.<Src>조직 표준</Src></>,
            ]}
          />
        </NumberedList>
      </Sec>

      <Sec id="s5" no="04" title="기술" meta="Skills">
        <KeyValueRows items={SKILLS} />
      </Sec>

      <Sec id="s6" no="05" title="외부 활동" meta="External Activities">
        <NumberedList className="border-t border-border-soft">
          <NumberedRow label="UX 컨설팅" labelWidth="lg" className={resumeType.careerRow} data-claim="career.product-ux-practice career.ux-consulting-product-outcome">
            <ExternalActivity
              title="운영 서비스 UX 컨설팅"
              description="사용자가 보상 포인트를 알아차리기 어렵고 다시 방문할 이유도 약하다고 보고, 배지와 푸시 알림을 활용한 개선 가설과 Figma 화면을 제안했습니다."
              outcomeLabel="성과"
              outcome="서비스 측은 여러 개선안이 반영된 뒤 3개월 안에 App Store 순위가 9위에서 5위로 오르고, DAU가 기존 대비 200% 수준이 됐다고 공유했습니다. 제안은 이 공동 성과에 기여했습니다."
            />
          </NumberedRow>
          <NumberedRow label="UX 스터디" labelWidth="lg" className={resumeType.careerRow} data-claim="career.product-ux-practice">
            <ExternalActivity
              title="Speak 개선안 제안 · YouTube Music UX 원리 리뷰"
              description="Speak에서 학습을 마친 뒤 추천 콘텐츠가 단조롭고 직전 학습 내용과 이어지지 않는 문제를 분석해 추천 흐름 개선안을 설계했습니다. YouTube Music 사례에서는 사용자 선택을 이끄는 UX 원리를 분석·발표했습니다."
              outcomeLabel="성과"
              outcome="Speak 개선안 발표로 IPS 12기 MVP 선정"
            />
          </NumberedRow>
        </NumberedList>
      </Sec>

      <Sec id="s7" no="06" title="수상·특허·자격 / 학력" meta="Credentials">
        <NumberedList className="border-t border-border-soft">
          <NumberedRow label={"특허\n2022.10.13 출원"} labelWidth="lg" labelClassName="whitespace-pre-line" className={resumeType.credentialRow} data-claim="credentials.page-output-patent">
            <span className="text-base text-fg"><strong className="font-medium">「페이지 출력 방법」</strong> · 등록 10-2898273 (2025.12경)</span>
          </NumberedRow>
          <NumberedRow label={"수상\n2024.01"} labelWidth="lg" labelClassName="whitespace-pre-line" className={resumeType.credentialRow} data-claim="credentials.ces-2024">
            <span className="text-base text-fg"><strong className="font-medium">CES 2024 Best of Innovation</strong> · AI 부문 대상 제품 참여</span>
          </NumberedRow>
          <NumberedRow label={"인증\n2022.11경"} labelWidth="lg" labelClassName="whitespace-pre-line" className={resumeType.credentialRow} data-claim="credentials.ai-accuracy-certification">
            <span className="text-base text-fg"><strong className="font-medium">AI 정확도 부문 인증 통과 제품 참여</strong> · 한국건설생활환경시험연구원(KCL)</span>
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
            <Chip variant="contact" href="https://marinkim.xyz" external>
              marinkim.xyz
            </Chip>
          </div>
        </div>
        <ProfilePhoto />
      </header>

      <OrderedSections order={SECTIONS_EN.map((section) => section.id)}>
      <Sec id="s1" no="01" title="Profile">
        <div className={resumeType.summaryStack}>
          <p className={resumeType.profileTitle}>
            I&apos;m Daejeong Kim, a maker who turns ideas into new value.
          </p>
          <p
            className={resumeType.profileDescription}
            data-claim="career.medisolve-role-evolution thready.product-zero-to-one-contribution thready.frontend-product-delivery thready.subscription-revenue-band"
          >
            As a former product planner and current Tech Lead, I turn customer problems into product priorities and implementation scope. I build the backend, AI systems, and core product flows needed to bring products from launch into paid operation with planning, QA, and marketing.
          </p>
        </div>
      </Sec>

      <Sec id="s3" no="03" title="Career">
        <NumberedList className="border-t border-border-soft">
          <CareerRow org="MediSolve AI" period="Apr 2025 —" currentLabel="Present" allowBreak data-claim="career.medisolve-role-evolution career.thedaylabs-freelance career.memento-to-medisolve-early-member">
            <span className="mb-1.5 block text-base font-medium text-fg">Tech Lead · Backend Engineer <span className="font-normal text-fg-2">— product operations lead</span></span>
            <PlainList
              items={[
                <span key="thready-business" data-claim="thready.product-zero-to-one-contribution thready.frontend-product-delivery thready.prototype-to-user-operation thready.generation-quality-system thready.subscription-revenue-band">At <PortfolioCaseLink href="https://marinkim.xyz/portfolio/thready" label="View the Thready portfolio case">Thready</PortfolioCaseLink>, I turn customer problems into product priorities and quality criteria, then lead <strong>product operations with planning, QA, and marketing</strong>. Together, we turned it into a paid product with real customer payments. I directly build and operate the FastAPI backend, AI generation/evaluation system, and core Next.js user and admin flows needed to run it.</span>,
                <span key="centurion" data-claim="career.thedaylabs-freelance centurion.msa-platform-context centurion.bay-async-backend centurion.day-product-integration centurion.say-realtime-ai centurion.ray-backend centurion.sso-session">For Centurion, I established the <strong>initial backend and engineering standards</strong> before incorporation. I later led order/inventory workers and the backend&ndash;frontend&ndash;QA&ndash;release integration of DAY reservation policy, co-led realtime AI consultation work, and contributed to facility/inventory integration and SSO policy</span>,
                <span key="hospital-operations" data-claim="nexus.backend-architecture nexus.admin-backend-ownership">Separately, I am leading <strong>backend architecture, migration flows, and the Admin/Homepage API build</strong> for a multi-clinic dermatology operations and booking system</span>,
                <span key="company-ax" data-claim="mediness.company-work-ax-design mediness.product-system-design-participation mediness.product-operations">I contributed to the product-requirement and operating-flow design of MEDINESS, then led the product-level application of Decision, SPEC, Work Package, QA, and release criteria. Building on that work, I contributed to a <strong>company AX structure</strong> that separates the tasks agents can prepare from the decisions people retain across meetings, assignments, approvals, and follow-up actions</span>,
                <span key="engineering-system" data-claim="be-template.backend-standard be-template.team-leverage be-template.agent-context infra.company-azure-ownership">I directly built the organization-wide FastAPI template and agent context. I also configured Azure and Vercel deployment environments for several internal services and handled their basic operation</span>,
                <span key="joining-path" data-claim="career.memento-to-medisolve-early-member career.thedaylabs-freelance"><strong>Joining path</strong> · Recruited as an early member of MediSolve AI after my engineering work at Memento AI was recognized. I began pre-incorporation product development through a TheDayLabs freelance engagement (Feb&ndash;Apr 2025), then joined full-time in Apr 2025</span>,
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
                <>As the primary PM, I led the commerce AI product&rsquo;s <strong>prototype-to-v1.0 flow, feature scope, and release priorities</strong>, then extended it into an external fashion-brand PoC</>,
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

      <Sec id="s2" no="02" title="Selected Impact">
        <NumberedList>
          <Axis
            first
            no="01"
            title="Turned an idea into a Thready product customers pay for with the team"
            data-claim="thready.product-zero-to-one-contribution thready.frontend-product-delivery thready.prototype-to-user-operation thready.subscription-revenue-band thready.release-operation thready.generation-quality-system"
            description="I identified why customers would pay, broke their content creation and performance problem into product, experiment, and quality criteria, and led the path from product decisions to launch and operations."
            evidence={[
              <>Coordinated feature and experiment priorities, generation-quality criteria, QA, and releases with planning, QA, and marketing<Src>Thready · product operations</Src></>,
              <>Together, we turned Thready into <Metric>a paid product with real customer payments</Metric><Src>Thready · product/team outcome</Src></>,
              <>Directly implemented the FastAPI backend, AI generation/evaluation, and Next.js flows for creation, import, scheduling, publishing, and administration<Src>Thready</Src></>,
            ]}
          />
          <Axis
            no="02"
            title="Rebuilt an inherited prototype backend for production while preserving the frontend"
            data-claim="thready.rebuild-decision-execution thready.backend-rebuild thready.prototype-to-user-operation thready.qa-reopen-reduction thready.release-operation"
            description="I inherited a prototype built for rapid feature validation, then defined a parallel backend-only replacement scope that preserved the existing frontend and release flow."
            evidence={[
              <>Built contract, component, and operational-flow <strong>validation harnesses before the rebuild</strong><Src>Thready</Src></>,
              <>Kept the frontend and release flow intact, ran the new FastAPI backend in parallel, compared responses, then cut over<Src>Thready</Src></>,
              <>In like-for-like Jira measurements across the cutover, the reopen rate of resolved QA issues was <strong>26 percentage points lower</strong>; I continued owning release, QA, and operations<Src>Thready · Jira</Src></>,
            ]}
          />
          <Axis
            no="03"
            title="Separated order and inventory follow-up work from the API and kept failures recoverable"
            data-claim="centurion.bay-async-backend centurion.async-migration centurion.test-ci-foundation"
            description="For Centurion BAY, I separated failure-prone follow-up work from order and inventory APIs, retaining the cause and state after retries are exhausted so operators can reprocess it."
            evidence={[
              <>Migrated from Celery to TaskIQ and RabbitMQ to align with the async FastAPI runtime, then separated the worker image from the API<Src>Centurion · BAY</Src></>,
              <>Recorded explicit task state, retries, and terminal failures with a manual-reprocessing boundary<Src>Centurion · BAY</Src></>,
              <>Built API test infrastructure, Docker CI, and onboarding documentation to make the API&ndash;broker&ndash;worker flow reproducible<Src>Centurion · BAY</Src></>,
            ]}
          />
          <Axis
            no="04"
            title="Separated the product ledger from AI execution and verified STG migration and delivery consistency"
            data-claim="thready.ai-service-boundary thready.ai-service-migration thready.ai-replica-outbox"
            description="I separated ownership of product policy and source-of-truth data from the AI generation lifecycle and execution state, treating historical migration plus delayed, duplicate, and out-of-order delivery as one consistency problem."
            evidence={[
              <>Assigned product policy and source-of-truth data to the product backend, while an independent FastAPI application and database own generation lifecycle and execution state<Src>Thready</Src></>,
              <>Migrated <Metric>2,616 generation records</Metric>, <Metric>795 quality records</Metric>, and <Metric>7,111 traces</Metric> on STG, verifying row counts, MD5 fingerprints, reference integrity, and the generation API<Src>Thready · STG migration</Src></>,
              <>Committed source-of-truth changes and Outbox records together, with retry and delivery-version fencing so delayed, duplicate, or out-of-order delivery cannot overwrite newer state<Src>Thready</Src></>,
            ]}
          />
          <Axis
            no="05"
            title="Built an organization-wide FastAPI and AI-agent execution standard"
            data-claim="be-template.backend-standard be-template.team-leverage be-template.agent-context"
            description="I converted recurring architecture and work rules into an executable template so people and AI agents could begin from the same context."
            evidence={[
              <>Designed and built an organization-wide FastAPI template with layered architecture, DI, transaction/error contracts, ADRs, and runbooks<Src>Engineering standard</Src></>,
              <>Kept product-specific differences explicit while applying cross-cutting concerns such as logging and monitoring through the shared baseline<Src>Engineering standard</Src></>,
              <>Embedded hierarchical AI-agent context and recurring-task automation so architecture decisions and work rules are read before implementation<Src>Engineering standard</Src></>,
            ]}
          />
        </NumberedList>
      </Sec>

      <Sec id="s5" no="04" title="Skills">
        <KeyValueRows items={SKILLS_EN} />
      </Sec>

      <Sec id="s6" no="05" title="External Activities">
        <NumberedList className="border-t border-border-soft">
          <NumberedRow label="UX Consulting" labelWidth="lg" className={resumeType.careerRow} data-claim="career.product-ux-practice career.ux-consulting-product-outcome">
            <ExternalActivity
              title="Live-service UX consulting"
              description="Defined weak reward-point awareness and return paths as user-flow problems, then proposed badge and notification hypotheses with Figma screens."
              outcomeLabel="Outcome"
              outcome="The service team reported that, after several improvements were released, App Store rank moved from 9th to 5th within three months and DAU reached 200% of its prior level. My proposal contributed to that shared outcome."
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

      <Sec id="s7" no="06" title="Credentials & Education">
        <NumberedList className="border-t border-border-soft">
          <NumberedRow label={"Patent\nFiled Oct 13, 2022"} labelWidth="lg" labelClassName="whitespace-pre-line" className={resumeType.credentialRow} data-claim="credentials.page-output-patent">
            <span className="text-base text-fg"><strong className="font-medium">&ldquo;Method for Displaying Page&rdquo;</strong> · registration 10-2898273 (c. Dec 2025)</span>
          </NumberedRow>
          <NumberedRow label={"Award\nJan 2024"} labelWidth="lg" labelClassName="whitespace-pre-line" className={resumeType.credentialRow} data-claim="credentials.ces-2024">
            <span className="text-base text-fg"><strong className="font-medium">CES 2024 Best of Innovation</strong> · contributed to the awarded AI product</span>
          </NumberedRow>
          <NumberedRow label={"Certification\nc. Nov 2022"} labelWidth="lg" labelClassName="whitespace-pre-line" className={resumeType.credentialRow} data-claim="credentials.ai-accuracy-certification">
            <span className="text-base text-fg"><strong className="font-medium">Contributed to a product that passed KCL AI accuracy certification</strong> · Korea Conformity Laboratories</span>
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
