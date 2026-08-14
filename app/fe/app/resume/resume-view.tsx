"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";
import { Badge } from "@/components/ui/badge";
import { Banner } from "@/components/ui/banner";
import { Button } from "@/components/ui/button";
import { Card, CardGrid } from "@/components/ui/card-grid";
import { Chip } from "@/components/ui/chip";
import { KeyValueRows } from "@/components/ui/key-value-list";
import { NumberedList, NumberedRow } from "@/components/ui/numbered-row";
import { SectionHead } from "@/components/ui/section-head";

/* 콘텐츠 SoT (2026-08-13 user-confirmed: "홈페이지를 SoT로 둔 다음에 플랫폼들에 sync를 맞추자").
   이 파일과 app/page.tsx 의 문안이 **표현의 기준선**이다 — 플랫폼 프로필은 여기서 파생된다.
   단 사실·강도는 여전히 wiki/evidence/claims/*.yaml 이 소유한다 (allowed_copy / forbidden_copy).
   즉 "무엇을 말할 수 있는가"는 claim registry, "어떻게 말하는가"는 이 파일.
   전화번호는 웹에 넣지 않는다(정책). */

/* — 로컬 프리미티브 (두 번째 사용처가 생기면 ui/ 로 승격) — */

function PlainList({
  items,
  emphasis = "strong",
}: {
  items: React.ReactNode[];
  emphasis?: "strong" | "quiet";
}) {
  return (
    <ul className="m-0 grid list-none gap-2 p-0">
      {items.map((item, i) => (
        <li
          key={i}
          className={cn(
            "relative pl-4 text-fg-2 before:absolute before:left-0 before:font-mono before:text-muted before:content-['—'] [&_strong]:text-fg",
            emphasis === "quiet" ? "[&_strong]:font-medium" : "[&_strong]:font-semibold",
          )}
        >
          {item}
        </li>
      ))}
    </ul>
  );
}

function CapCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <Card className="gap-1.5 p-4">
      <h3 className="m-0 font-mono text-sm font-semibold">{title}</h3>
      <p className="m-0 text-sm text-fg-2">{children}</p>
    </Card>
  );
}

function CareerRow({
  org,
  now,
  period,
  "data-claim": dataClaim,
  children,
}: {
  org: string;
  now?: boolean;
  period: string;
  "data-claim"?: string;
  children: React.ReactNode;
}) {
  return (
    <NumberedRow
      label={
        <>
          {org}
          {now && <Badge>NOW</Badge>}
        </>
      }
      labelWidth="lg"
      labelClassName="font-semibold text-fg"
      trailing={period}
      data-claim={dataClaim}
      className="border-border-soft py-3"
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
  claim,
  items,
  first,
  "data-claim": dataClaim,
}: {
  no: string;
  title: string;
  claim: React.ReactNode;
  items: React.ReactNode[];
  first?: boolean;
  "data-claim"?: string;
}) {
  return (
    <NumberedRow
      label={no}
      labelWidth="sm"
      labelClassName="font-mono text-xs text-muted"
      data-claim={dataClaim}
      className={cn("py-4", first && "border-t-0")}
    >
      <div className="max-w-[70ch] text-base font-normal [&_[data-metric]]:font-medium">
        <h3 className="m-0 mb-2 text-balance font-mono text-xl font-semibold leading-snug">
          {title}
        </h3>
        <p className="m-0 mb-3.5 text-pretty text-lg font-medium leading-normal text-fg">
          {claim}
        </p>
        <PlainList items={items} emphasis="quiet" />
      </div>
    </NumberedRow>
  );
}

function Metric({ children }: { children: React.ReactNode }) {
  return (
    <span data-metric className="font-semibold tabular-nums text-success">
      {children}
    </span>
  );
}

const SECTIONS = [
  { id: "s1", ko: "요약" },
  { id: "s2", ko: "경력" },
  { id: "s3", ko: "핵심 역량" },
  { id: "s4", ko: "일하는 방식" },
  { id: "s5", ko: "기술" },
  { id: "s6", ko: "학력·수상·자격" },
];

/* 스킬은 나열이 아니라 근거와 함께 둔다 — 각 항목이 어디서 쓰였는지까지 적는다 */
function Skill({ stack, via }: { stack: string; via: string }) {
  return (
    <>
      {stack}
      <span className="mt-0.5 block font-mono text-xs text-muted">{via}</span>
    </>
  );
}

const SKILLS = [
  {
    k: "주력",
    v: (
      <Skill
        stack="Python, FastAPI"
        via="아이즈솔·메멘토·더데이랩스·메디솔브 — 실무 백엔드 개발의 주 언어"
      />
    ),
  },
  {
    k: "함께 씀",
    "data-claim": "be-template.backend-standard centurion.async-migration",
    v: (
      <Skill
        stack="TypeScript, NestJS"
        via="Centurion · API Gateway (MediSolve) · 스튜디오랩 레거시 이관"
      />
    ),
  },
  {
    k: "데이터 / 메시징",
    "data-claim": "centurion.bay-async-backend",
    v: (
      <Skill
        stack="PostgreSQL, MySQL, Redis, RabbitMQ, TaskIQ"
        via="Centurion 주문·재고 비동기 워커 · Thready"
      />
    ),
  },
  {
    k: "인프라 / 배포",
    "data-claim": "infra.company-azure-ownership career.tellingme-backend-infra",
    v: (
      <Skill
        stack="Azure, AWS, Terraform, Docker, GitHub Actions"
        via="사내 인프라 저장소 책임 · TellingMe 배포·모니터링"
      />
    ),
  },
  {
    k: "AI 제품",
    v: (
      <Skill
        stack="LLM integration/evaluation, typed prompt, structured output, WebSocket, SSE, STT"
        via="Thready 생성 품질 판정 · Centurion 실시간 상담 세션"
      />
    ),
  },
  {
    k: "개인 프로젝트",
    "data-claim": "career.tellingme-backend-infra",
    v: (
      <Skill
        stack="Java, Spring Boot"
        via="TellingMe — 10명 규모 팀에서 백엔드 개발자 2명 중 한 명으로 개발을 주도, iOS 정식 출시 (2024.01 — 2024.12). 실무 경력과 구분해 표기"
      />
    ),
  },
];

const SKILLS_EN = [
  {
    k: "Primary",
    v: (
      <Skill
        stack="Python, FastAPI"
        via="Izsol, Memento, TheDayLabs, MediSolve — the language behind every production backend I have shipped"
      />
    ),
  },
  {
    k: "Alongside",
    "data-claim": "be-template.backend-standard centurion.async-migration",
    v: (
      <Skill
        stack="TypeScript, NestJS"
        via="Centurion · API Gateway (MediSolve) · STUDIO LAB legacy migration"
      />
    ),
  },
  {
    k: "Data / Messaging",
    "data-claim": "centurion.bay-async-backend",
    v: (
      <Skill
        stack="PostgreSQL, MySQL, Redis, RabbitMQ, TaskIQ"
        via="Centurion order/inventory async workers · Thready"
      />
    ),
  },
  {
    k: "Infra / Delivery",
    "data-claim": "infra.company-azure-ownership career.tellingme-backend-infra",
    v: (
      <Skill
        stack="Azure, AWS, Terraform, Docker, GitHub Actions"
        via="Owned the company infra repository · TellingMe deployment/monitoring"
      />
    ),
  },
  {
    k: "AI Product",
    v: (
      <Skill
        stack="LLM integration/evaluation, typed prompt, structured output, WebSocket, SSE, STT"
        via="Thready generation-quality judgement · Centurion realtime consultation sessions"
      />
    ),
  },
  {
    k: "Personal project",
    "data-claim": "career.tellingme-backend-infra",
    v: (
      <Skill
        stack="Java, Spring Boot"
        via="TellingMe — primary of two backend engineers on a 10-person team; shipped on the App Store (Jan — Dec 2024). Listed separately from production experience on purpose"
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
    <section id={id} data-claim={dataClaim} className="pt-9">
      <SectionHead no={no} title={title} meta={meta} size="doc" />
      {children}
    </section>
  );
}

/* — 한국어 마스터 — */

function DocKo() {
  return (
    <div>
      <header className="border-b-2 border-fg pb-7">
        <h1 className="m-0 font-mono text-3xl font-semibold tracking-[-0.02em]">김대정</h1>
        <p className="mt-2.5 font-mono text-sm uppercase tracking-[0.06em] text-fg-2">
          Backend Engineer · AI Product Systems
        </p>
        <p className="mt-1.5 font-mono text-sm text-fg-2">
          <b className="font-semibold text-fg">MediSolve AI</b> · Backend Engineer ·
          <span className="text-fg-2">기업부설연구소장</span> <span className="text-muted">(2025.04 — 재직 중)</span>
          <span className="mx-2 text-muted">/</span>
          이전 <b className="font-semibold text-fg">STUDIO LAB</b> · PM
          <span className="text-muted"> (2021.12 — 2024.01)</span>
        </p>
        <p className="mt-4 text-lg font-medium">
          AI 제품을 만들고, 무엇을 만들지도 함께 정하는 백엔드 엔지니어
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          <Chip variant="contact" href="mailto:marin.backend@gmail.com">
            marin.backend@gmail.com
          </Chip>
          <Chip variant="contact" href="https://github.com/Dae-Jeong" external>
            github.com/Dae-Jeong
          </Chip>
          <Chip variant="contact">경기 안양시</Chip>
        </div>
      </header>

      <Sec id="s1" no="01" title="요약" meta="Summary">
        <div className="grid gap-3.5 text-fg-2">
          <p className="m-0" data-claim="career.tenure career.ai-pm-backend-continuity">
            <strong className="font-semibold text-fg">AI 제품을 만들어온 <Metric>실무 4년차</Metric></strong>. AI 모델 개발과 제품 기획을 거쳐 백엔드로 왔고, 지금은 백엔드를 개발하면서 제품 방향을 정하는 역할도 함께 맡는다.
          </p>
          <p className="m-0" data-claim="career.ai-pm-backend-continuity">
            백엔드를 택한 데는 이유가 있다. <strong className="font-semibold text-fg">AI가 구현을 더 많이 맡을수록, 보안과 안정성처럼 사람이 끝까지 책임져야 할 영역은 더 중요해진다</strong>고 봤다. 지금도 매일 AI와 함께 제품을 만들며 그 판단을 확인하고 있다.
          </p>
        </div>
      </Sec>

      <Sec id="s2" no="02" title="경력" meta="Career">
        <NumberedList className="border-t border-border-soft">
          <CareerRow org="MediSolve AI" now period="2025.04 —" data-claim="career.medisolve-role-evolution thready.qa-reopen-reduction thready.production-operation-quality infra.company-azure-ownership mediness.product-operations">
            <span className="mb-1.5 block font-medium text-fg">Backend Engineer · 기업부설연구소장 <span className="font-normal text-fg-2">— Tech Lead·PO 역할 병행</span></span>
            <PlainList
              items={[
                <>의료 AI 플랫폼과 AI 콘텐츠 생성 제품의 <strong>백엔드 전반을 담당</strong>. 재구축·평가 체계·에이전트 파이프라인·어드민·인프라까지 제품 운영에 필요한 영역을 맡음</>,
                <>개발 표준 수립과 제품 의사결정·릴리스 운영을 병행 — 직접 만드는 일과 무엇을 만들지 정하는 일을 함께 담당</>,
                <>회사 <strong>Azure·Terraform 인프라 전반을 담당</strong> — B2B·B2C·제품·환경별 리소스 경계와 배포·운영 절차를 직접 관리</>,
                <>대표 성과: 전환 전후 QA 버그 재발률 <strong>37% → 11%</strong>, 월 수만 건 규모의 요청을 <strong>HTTP 5xx 0.3% 수준</strong>으로 운영</>,
              ]}
            />
          </CareerRow>
          <CareerRow org="더데이랩스" period="2025.02 — 2025.04" data-claim="career.thedaylabs-freelance">
            <span className="mb-1.5 block font-medium text-fg">Backend Engineer <span className="font-normal text-fg-2">— 프리랜서</span></span>
            <PlainList
              items={[
                <>현 MediSolve AI 대표와 협업하며 <strong>제품 백엔드를 처음부터 구축</strong>. 새로 꾸려지는 개발팀에는 코드보다 기준이 먼저 필요하다고 판단해 저장소를 만들 때부터 구조·규약·문서를 함께 마련</>,
                <>이후 창업 시점에 합류해 같은 제품의 백엔드를 계속 담당</>,
              ]}
            />
          </CareerRow>
          <CareerRow org="Memento AI" period="2024.10 — 2025.01" data-claim="career.memento-payment">
            <span className="mb-1.5 block font-medium text-fg">Backend Engineer <span className="font-normal text-fg-2">— 인턴 1개월 → 정규직</span></span>
            <PlainList
              items={[
                <>예약·결제 백엔드에 <strong>Stripe 선결제를 도입</strong>하고, 결제 실패 시 환불·마일리지·티켓에 남는 상태 불일치를 롤백 흐름으로 해소</>,
                <>회사 폐업으로 재직 종료</>,
              ]}
            />
          </CareerRow>
          <CareerRow org="STUDIO LAB" period="2021.12 — 2024.01" data-claim="career.sellercanvas-product-system credentials.page-output-patent credentials.ces-2024">
            <span className="mb-1.5 block font-medium text-fg">Product Manager <span className="font-normal text-fg-2">— AI Engineer → PM(메인 롤) → Backend Engineer</span></span>
            <PlainList
              items={[
                <>커머스 AI 제품의 <strong>프로토타입부터 v1.0까지 PM을 담당</strong> — 무엇을 만들지 정하는 일부터 제품 운영 구조를 세우는 일까지 수행</>,
                <>패션 대기업 브랜드 POC를 진행하고 상세페이지 제작 흐름을 재설계 — <strong>특허 「페이지 출력 방법」 출원·등록으로 이어짐</strong></>,
                <>PM 재직 중에도 의류 색상 분류 모델을 직접 개발했으며, 해당 제품은 <strong>CES 2024 Best of Innovation</strong> 수상</>,
              ]}
            />
          </CareerRow>
          <CareerRow org="아이즈솔" period="2020.08 — 2021.06" data-claim="career.ai-pm-backend-continuity">
            <span className="mb-1.5 block font-medium text-fg">Vision AI Engineer <span className="font-normal text-fg-2">— 인턴</span></span>
            <PlainList
              items={[
                <>유아 안면 인식 기반 비접촉 출결 시스템에서 인식 모델·데이터 파이프라인·Python 백엔드를 담당</>,
                <>인턴이었지만 기능 요구사항 정의와 일정·태스크 관리를 함께 맡았다 — 만드는 일과 정하는 일의 병행이 이 시기에 시작됐다</>,
              ]}
            />
          </CareerRow>
        </NumberedList>
      </Sec>

      <Sec id="s3" no="03" title="핵심 역량" meta="Capabilities">
        <NumberedList>
          <Axis
            first
            no="01"
            title="AI 제품 백엔드 구축·재구축"
            data-claim="thready.rebuild-decision-execution thready.backend-rebuild thready.qa-reopen-reduction thready.production-operation-quality centurion.async-migration centurion.bay-async-backend career.memento-payment"
            claim="기술부채를 언제 갚을지 계산하고, 갚는 동안 서비스가 흔들리지 않게 만듭니다."
            items={[
              <>재구축 후 새 결함이 늘어나는지 QA 재발률로 추적 — <strong>37% → 11%로 감소</strong> (해결된 이슈 중 재발한 비율, 전환 전후 관측)<Src>AI 콘텐츠 생성 제품</Src></>,
              <>부분 수정으로는 의존성 구조가 남는다고 판단해 <strong>서비스 규모가 작을 때</strong> 재구축을 결정 — 반대가 있는 상황에서도 필요성을 설득했고, 나중보다 지금 부채를 갚는 비용이 더 낮다고 판단<Src>AI 콘텐츠 생성 제품</Src></>,
              <>범위를 <strong>백엔드로 한정</strong>(프론트엔드는 Next.js 유지)하고 <strong>검증 하네스를 먼저 구축</strong>한 뒤 AI와 협업 — 시스템 파악부터 재구축까지 <Metric>총 36시간</Metric>(작업 시간 기준)<Src>AI 콘텐츠 생성 제품</Src></>,
              <>전환 이후 개발·운영 전담 — 월 수만 건 요청을 <Metric>HTTP 5xx 0.3% 수준</Metric>으로 운영<Src>AI 콘텐츠 생성 제품</Src></>,
              <>재구축뿐 아니라 <strong>Celery→TaskIQ 점진 전환</strong>, 레거시 <strong>NestJS 이관</strong>, 모노레포의 <strong>서비스 경계 재설계</strong>도 수행<Src>AI 메디컬 플랫폼 · 커머스 AI</Src></>,
              <>결제 실패 시 롤백·정합성을 수습한 경험을 바탕으로, 주문·재고 중 실패 시 복구가 필요한 작업을 <strong>제품 시작 시점부터</strong> RabbitMQ·TaskIQ 워커와 재시도로 API 요청 흐름에서 분리<Src>AI 메디컬 플랫폼</Src></>,
            ]}
          />
          <Axis
            no="02"
            title="AI 출력 품질 판정·평가"
            data-claim="thready.quality-criteria-system thready.measurement-correction thready.falsification-log thready.corpus-measurement"
            claim="&ldquo;품질이 나쁘다&rdquo;를 무엇을 고칠지 정할 수 있는 문제로 바꿉니다."
            items={[
              <>AI 생성물의 품질을 <strong>자동 게이트·실측 분포·사람의 판단이라는 3단계</strong>로 나눠 측정 — 자동화할 영역과 사람이 판단할 영역을 구분해 설계<Src>AI 콘텐츠 생성 제품</Src></>,
              <>자동 게이트 12종으로 형식 오류를 차단하고, 품질 기준을 6개 축으로 측정해 축별 개선 순서를 관리<Src>AI 콘텐츠 생성 제품</Src></>,
              <>직접 수집한 실측 데이터로 프롬프트 규칙의 근거를 검증(<Metric>n=19 → 4,039</Metric>), 반증된 접근은 기록으로 남겨 재시도를 방지<Src>AI 콘텐츠 생성 제품</Src></>,
              <>품질 기준값에 <strong>자사 출력이 다시 섞여 들어가는 순환</strong>을 확인 — 순환을 끊고 기준을 다시 세우며 문제 정의 자체의 오류까지 발견<Src>AI 콘텐츠 생성 제품</Src></>,
            ]}
          />
          <Axis
            no="03"
            title="어드민 시스템 구축·운영"
            data-claim="nexus.backend-architecture nexus.admin-backend-ownership nexus.quality-automation"
            claim="병원에서 실제 사용하는 통합 관리 시스템의 백엔드를 계층 구조로 설계하고 있습니다."
            items={[
              <>통합 관리 시스템 백엔드를 <strong>Clean Architecture 기반으로 설계하고 구축을 주도</strong> (진행 중)<Src>AI 메디컬 플랫폼</Src></>,
              <>홈페이지·어드민 API를 독립 모듈로 구성하고 게이트웨이에서 단일 엔드포인트를 제공, Generic Repository로 공통 CRUD 표준화<Src>AI 메디컬 플랫폼</Src></>,
              <>멀티테넌시와 Soft Delete 자동 필터링으로 <strong>데이터 격리</strong><Src>AI 메디컬 플랫폼</Src></>,
              <>백엔드 모노레포의 <strong>서비스 경계와 마이그레이션 흐름을 주도</strong><Src>AI 메디컬 플랫폼</Src></>,
              <>코드 컨벤션 정립과 Ruff·Pyright·pre-commit 기반 품질 자동 검증 체계 구축<Src>AI 메디컬 플랫폼</Src></>,
            ]}
          />
          <Axis
            no="04"
            title="에이전트 워크플로우 · AX"
            data-claim="thready.agent-pipeline-design be-template.backend-standard be-template.agent-context mediness.product-operations"
            claim="사람과 코딩 에이전트가 같은 규칙 위에서 일하도록 만듭니다."
            items={[
              <>생성 파이프라인을 <strong>planner와 writer 역할로 분리해 설계·구현</strong> — writer에 둔 유형 분기 판정이 18건 모두 작동하지 않아 판정 위치를 planner로 옮겨 해결<Src>AI 콘텐츠 생성 제품</Src></>,
              <>조직 표준 FastAPI 템플릿 설계·구축 — 계층형 아키텍처·의존성 주입·응답 규약·ADR 포함<Src>조직 표준</Src></>,
              <>템플릿에 <strong>에이전트용 컨텍스트 체계와 반복 작업 자동화 스킬을 내장</strong><Src>조직 표준</Src></>,
              <>스펙·이슈·릴리스 게이트를 <strong>사람과 에이전트가 함께 읽는 실행 기준</strong>으로 구성 — 이 사이트도 같은 방식으로 구축<Src>제품팀 운영</Src></>,
            ]}
          />
          <Axis
            no="05"
            title="인프라 · 플랫폼 운영"
            data-claim="infra.company-azure-ownership nexus.terraform-infra centurion.shared-infra"
            claim="제품이 운영되는 환경을 직접 책임지고 관리합니다."
            items={[
              <><strong>회사 Azure·Terraform 인프라 전반</strong>의 설계·구축·운영 담당<Src>MediSolve AI</Src></>,
              <>B2B·B2C·제품·환경별 리소스 경계와 배포·운영 절차 관리<Src>MediSolve AI</Src></>,
              <>외부 제품의 Terraform IaC 구축을 전담하고, Centurion Azure·Terraform 인프라와 운영 절차서·문서화를 담당<Src>AI 메디컬 플랫폼</Src></>,
            ]}
          />
          <Axis
            no="06"
            title="제품 운영 · 의사결정"
            data-claim="mediness.product-operations career.medisolve-role-evolution career.sellercanvas-product-system credentials.page-output-patent credentials.ces-2024"
            claim="무엇을 만들지 정하고, 만들어진 뒤의 운영 구조까지 설계합니다."
            items={[
              <>AI 제품 백엔드를 개발하면서 <strong>제품팀 운영도 함께 주도</strong> — Backend Engineer로 합류해 기업부설연구소장·Tech Lead·PO 역할을 병행<Src>MediSolve AI</Src></>,
              <>파이프라인 레지스트리와 릴리스 게이트를 기반으로 제품팀의 일정·이슈·릴리스를 운영 — 제품 의사결정을 BE·FE·QA의 실행과 릴리스 기준으로 연결<Src>제품팀 운영</Src></>,
              <>CES 2024 수상 제품의 <strong>프로토타입부터 v1.0까지 PM을 담당</strong><Src>커머스 AI 제품</Src></>,
              <>상세페이지 제작 흐름 재설계가 <strong>특허 「페이지 출력 방법」 출원·등록으로 이어짐</strong><Src>커머스 AI 제품</Src></>,
              <><strong>제품이 원활하게 운영되는 구조</strong>를 기획·구축 — 개발 도구가 아니라 제품 자체의 운영 구조를 설계한 경험으로, 현재 제품 운영 역할의 기반이 됨<Src>커머스 AI 제품</Src></>,
              <><strong>LLM 대중화 이전(2021~22)부터</strong> Vision AI 기반 생성 제품의 운영 체계를 기획·구축하고, PM 재직 중에도 색상 분류 모델을 직접 개발<Src>커머스 AI 제품</Src></>,
            ]}
          />
        </NumberedList>
      </Sec>

      <Sec id="s4" no="04" title="일하는 방식" meta="How I Work">
        <NumberedList>
          <NumberedRow label="01" labelWidth="sm" labelClassName="font-mono text-xs text-muted" className="border-t-0 py-3" data-claim="thready.rebuild-decision-execution thready.measurement-correction">
            <div>
              <p className="m-0 mb-1 font-semibold text-fg">문제의 경계를 다시 잡는다</p>
              <p className="m-0 text-sm text-fg-2">
                증상을 고치기 전에 문제 정의부터 점검한다. 반대가 있는 상황에서도 재구축의 필요성을 설득했고, 자사 출력이 품질 기준값에 다시 섞이는 순환을 발견해 문제의 기준 자체를 다시 세웠다.
              </p>
            </div>
          </NumberedRow>
          <NumberedRow label="02" labelWidth="sm" labelClassName="font-mono text-xs text-muted" className="py-3" data-claim="thready.quality-criteria-system mediness.product-operations">
            <div>
              <p className="m-0 mb-1 font-semibold text-fg">측정과 게이트로 판정 가능하게 만든다</p>
              <p className="m-0 text-sm text-fg-2">
                &ldquo;좋다/나쁘다&rdquo;만으로는 무엇을 고칠지 알 수 없다. 생성 품질 판정을 자동 게이트·실측 분포·사람의 판단이라는 3단계로 나누고, 릴리스와 QA도 명확한 통과 기준에 따라 운영한다.
              </p>
            </div>
          </NumberedRow>
          <NumberedRow label="03" labelWidth="sm" labelClassName="font-mono text-xs text-muted" className="py-3" data-claim="be-template.agent-context mediness.product-operations">
            <div>
              <p className="m-0 mb-1 font-semibold text-fg">해결을 표준과 자동화로 확장한다</p>
              <p className="m-0 text-sm text-fg-2">
                한 번 해결한 문제는 팀이 다시 활용할 수 있어야 한다. 조직 표준 템플릿에 에이전트용 컨텍스트를 내장하고, 스펙·이슈·릴리스 게이트를 사람과 에이전트가 함께 읽는 실행 기준으로 구성했다.
              </p>
            </div>
          </NumberedRow>
          <NumberedRow label="04" labelWidth="sm" labelClassName="font-mono text-xs text-muted" className="py-3" data-claim="thready.rebuild-decision-execution thready.measurement-correction centurion.bay-async-backend be-template.agent-context">
            <div>
              <p className="m-0 mb-1 font-semibold text-fg">문제가 티켓이 되기 전에 잡는다</p>
              <p className="m-0 mb-2 text-sm text-fg-2">대체로 다음과 같은 계기에서 먼저 움직였다.</p>
              <ul className="m-0 grid list-none gap-1.5 p-0 text-sm text-fg-2">
                <li className="grid grid-cols-[132px_minmax(0,1fr)] gap-3 max-sm:grid-cols-1 max-sm:gap-0.5">
                  <span className="font-mono text-xs text-muted">백엔드 재구축</span>
                  <span>요청받은 일이 아니었고 반대가 있었다</span>
                </li>
                <li className="grid grid-cols-[132px_minmax(0,1fr)] gap-3 max-sm:grid-cols-1 max-sm:gap-0.5">
                  <span className="font-mono text-xs text-muted">품질 기준값 오류</span>
                  <span>문제가 제기되기 전에 직접 재측정하며 발견</span>
                </li>
                <li className="grid grid-cols-[132px_minmax(0,1fr)] gap-3 max-sm:grid-cols-1 max-sm:gap-0.5">
                  <span className="font-mono text-xs text-muted">워커 분리</span>
                  <span>장애가 나기 전의 예방책</span>
                </li>
                <li className="grid grid-cols-[132px_minmax(0,1fr)] gap-3 max-sm:grid-cols-1 max-sm:gap-0.5">
                  <span className="font-mono text-xs text-muted">조직 표준 템플릿</span>
                  <span>팀이 새 프로젝트를 시작할 때 드는 비용을 보고 착수</span>
                </li>
              </ul>
            </div>
          </NumberedRow>
        </NumberedList>
      </Sec>

      <Sec id="s5" no="05" title="기술" meta="Skills">
        <KeyValueRows items={SKILLS} />
      </Sec>

      <Sec id="s6" no="06" title="학력·교육 / 수상·특허·자격" meta="Credentials">
        <NumberedList>
          <NumberedRow label="2016 — 2021" labelWidth="md" labelClassName="text-xs" className="border-t-0 py-1" data-claim="credentials.education">
            <span className="text-sm text-fg-2">우송대학교 게임멀티미디어 전공</span>
          </NumberedRow>
          <NumberedRow label="2024.01" labelWidth="md" labelClassName="text-xs" className="border-t-0 py-1" data-claim="credentials.ces-2024">
            <span className="text-sm text-fg-2">CES 2024 Best of Innovation · AI 부문 대상 제품 참여</span>
          </NumberedRow>
          <NumberedRow label="2025.12" labelWidth="md" labelClassName="text-xs" className="border-t-0 py-1" data-claim="credentials.page-output-patent">
            <span className="text-sm text-fg-2">특허 등록 「페이지 출력 방법」 · 등록 10-2898273</span>
          </NumberedRow>
          <NumberedRow label="2021.09" labelWidth="md" labelClassName="text-xs" className="border-t-0 py-1" data-claim="credentials.adsp">
            <span className="text-sm text-fg-2">ADsP · 데이터분석 준전문가</span>
          </NumberedRow>
          <NumberedRow label="인증" labelWidth="md" labelClassName="text-xs" className="border-t-0 py-1" data-claim="credentials.ai-accuracy-certification">
            <span className="text-sm text-fg-2">한국건설생활환경시험연구원(KCL) · AI 정확도 부문 인증 통과</span>
          </NumberedRow>
        </NumberedList>
      </Sec>
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
      <header className="border-b-2 border-fg pb-7">
        <h1 className="m-0 font-mono text-3xl font-semibold tracking-[-0.02em]">Daejeong Kim</h1>
        <p className="mt-2.5 font-mono text-sm uppercase tracking-[0.06em] text-fg-2">
          Backend Engineer · AI Product Systems
        </p>
        <p className="mt-1.5 font-mono text-sm text-fg-2">
          <b className="font-semibold text-fg">MediSolve AI</b> · Backend Engineer ·
          <span className="text-fg-2">Head of the R&amp;D Center</span>{" "}
          <span className="text-muted">(Apr 2025 — present)</span>
          <span className="mx-2 text-muted">/</span>
          Previously <b className="font-semibold text-fg">STUDIO LAB</b> · PM
          <span className="text-muted"> (Dec 2021 — Jan 2024)</span>
        </p>
        <p className="mt-4 text-lg font-medium">
          Backend engineer who builds AI products — and helps decide what to build and why.
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          <Chip variant="contact" href="mailto:marin.backend@gmail.com">
            marin.backend@gmail.com
          </Chip>
          <Chip variant="contact" href="https://github.com/Dae-Jeong" external>
            github.com/Dae-Jeong
          </Chip>
          <Chip variant="contact">Anyang-si, Gyeonggi-do, KR</Chip>
        </div>
      </header>

      <Sec no="01" title="Summary">
        <div className="grid gap-3.5 text-fg-2">
          <p className="m-0" data-claim="career.tenure career.ai-pm-backend-continuity">
            <strong className="font-semibold text-fg">Four years of building AI products</strong>. I moved from model engineering to product planning to backend, and now I both build the backend and help decide what to build and why.
          </p>
          <p className="m-0" data-claim="career.ai-pm-backend-continuity">
            Choosing backend was a judgement call. <strong className="font-semibold text-fg">As AI takes on more of the implementation, the layers a human has to own to the end — security, stability — only grow heavier.</strong> Building products alongside AI every day has made that conviction firmer.
          </p>
        </div>
      </Sec>

      <Sec no="02" title="Career">
        <NumberedList className="border-t border-border-soft">
          <CareerRow org="MediSolve AI" now period="Apr 2025 —" data-claim="career.medisolve-role-evolution thready.qa-reopen-reduction thready.production-operation-quality infra.company-azure-ownership mediness.product-operations">
            <span className="mb-1.5 block font-medium text-fg">Backend Engineer · Head of the R&amp;D Center <span className="font-normal text-fg-2">— also serving as Tech Lead and PO</span></span>
            <PlainList
              items={[
                <>Own the <strong>backend across an AI medical platform and an AI content product</strong> — rebuilds, evaluation systems, agent pipelines, admin and infrastructure: whatever layer the product needs to keep running</>,
                <>Set the engineering standards and carry product decisions and release operations — building and deciding what to build sit with the same person</>,
                <>Own the <strong>company-wide Azure and Terraform infrastructure</strong> — resource boundaries across B2B, B2C, product and environment splits, plus deploys and runbooks</>,
                <>Headline result: QA reopen rate <strong>37% to 11%</strong> across the cutover, and tens of thousands of monthly requests at <strong>~0.3% HTTP 5xx</strong></>,
              ]}
            />
          </CareerRow>
          <CareerRow org="TheDayLabs" period="Feb 2025 — Apr 2025" data-claim="career.thedaylabs-freelance">
            <span className="mb-1.5 block font-medium text-fg">Backend Engineer <span className="font-normal text-fg-2">— freelance</span></span>
            <PlainList
              items={[
                <>Started the product backend <strong>from zero</strong> with the person who now leads MediSolve AI. For a team being assembled for the first time, conventions mattered before code — so structure, conventions and docs went in with the repository itself</>,
                <>Joined at incorporation and carried the same product forward</>,
              ]}
            />
          </CareerRow>
          <CareerRow org="Memento AI" period="Oct 2024 — Jan 2025" data-claim="career.memento-payment">
            <span className="mb-1.5 block font-medium text-fg">Backend Engineer <span className="font-normal text-fg-2">— intern for one month, then full-time</span></span>
            <PlainList
              items={[
                <>Contributed to the booking and payment backend by <strong>introducing Stripe prepayment</strong> and stabilizing rollback across refunds, mileage and tickets when a payment failed mid-flow</>,
                <>Employment ended when the company shut down</>,
              ]}
            />
          </CareerRow>
          <CareerRow org="STUDIO LAB" period="Dec 2021 — Jan 2024" data-claim="career.sellercanvas-product-system credentials.page-output-patent credentials.ces-2024">
            <span className="mb-1.5 block font-medium text-fg">Product Manager <span className="font-normal text-fg-2">— AI Engineer, then PM (primary role), then Backend Engineer</span></span>
            <PlainList
              items={[
                <>Took a commerce AI product <strong>from prototype to v1.0 as its PM</strong> — from deciding what to build to building the structure that kept it running</>,
                <>Ran a proof of concept with a major fashion brand along the way, and the detail-page production flow I redesigned <strong>led to a registered patent</strong></>,
                <>Built a color-classification model hands-on while serving as PM. The product won <strong>CES 2024 Best of Innovation</strong></>,
              ]}
            />
          </CareerRow>
          <CareerRow org="Izsol" period="Aug 2020 — Jun 2021" data-claim="career.ai-pm-backend-continuity">
            <span className="mb-1.5 block font-medium text-fg">Vision AI Engineer <span className="font-normal text-fg-2">— intern</span></span>
            <PlainList
              items={[
                <>Built the recognition model, data pipeline and Python backend for a contactless attendance system based on child face recognition</>,
                <>Though an intern, I also handled requirement definition and schedule management — building and deciding have run together since then</>,
              ]}
            />
          </CareerRow>
        </NumberedList>
      </Sec>

      <Sec no="03" title="Capabilities">
        <NumberedList>
          <Axis
            first
            no="01"
            title="Building and rebuilding AI product backends"
            data-claim="thready.rebuild-decision-execution thready.backend-rebuild thready.qa-reopen-reduction thready.production-operation-quality centurion.async-migration centurion.bay-async-backend career.memento-payment"
            claim="I work out when technical debt is cheapest to repay, and keep the service steady while repaying it."
            items={[
              <>The main risk in a rebuild is new defects — across the cutover the <strong>QA reopen rate (resolved-to-reopened) went from 37% to 11%</strong>, with daily reopen incidence down <Metric>~94%</Metric>. The risk did not materialise, and the metric shows it<Src>AI 콘텐츠 생성 제품</Src></>,
              <>Judged that partial fixes would leave the dependency structure intact, so I picked the moment <strong>while the service was still small</strong> and argued for the rebuild — repaying then was cheaper than repaying later<Src>AI 콘텐츠 생성 제품</Src></>,
              <>Scoped it to the <strong>backend only</strong> (keeping Next.js on the frontend) and <strong>set up the harness first</strong> before pairing with AI — <Metric>36 work hours</Metric> from discovery to rebuild, then owned development and operations at <Metric>~0.3% HTTP 5xx</Metric> across tens of thousands of monthly requests<Src>AI 콘텐츠 생성 제품</Src></>,
              <>Rebuilding is not the only tool — migrated the messaging layer <strong>incrementally from Celery to TaskIQ</strong>, moved legacy code <strong>onto NestJS</strong>, and reshaped a monorepo through <strong>service boundaries and migration flow</strong><Src>AI 메디컬 플랫폼 · 커머스 AI</Src></>,
              <>Applied lessons from resolving payment rollback and consistency failures to separate failure-prone order and inventory work <strong>outside the API boundary from product inception</strong> with RabbitMQ·TaskIQ workers and retry<Src>AI 메디컬 플랫폼</Src></>,
            ]}
          />
          <Axis
            no="02"
            title="Judging and evaluating AI output quality"
            data-claim="thready.quality-criteria-system thready.measurement-correction thready.falsification-log thready.corpus-measurement"
            claim="I turn &ldquo;the quality is bad&rdquo; into a problem you can actually act on."
            items={[
              <>Split generation-quality judgement into <strong>three layers</strong> — automated gates, measured-distribution checks, human review — separating what automation reaches from what it does not<Src>AI 콘텐츠 생성 제품</Src></>,
              <>Built 12 deterministic gates that block format errors automatically, and quantified quality on six axes to manage the order of improvement<Src>AI 콘텐츠 생성 제품</Src></>,
              <>Validated prompt rules against a corpus I collected myself (<Metric>n=19 → 4,039</Metric>); refuted approaches are kept on record to prevent retries<Src>AI 콘텐츠 생성 제품</Src></>,
              <>Found that a quality baseline we had trusted as measured was actually <strong>feeding on our own output</strong> — breaking the loop also surfaced an error in the problem definition itself<Src>AI 콘텐츠 생성 제품</Src></>,
            ]}
          />
          <Axis
            no="03"
            title="Building and running admin systems"
            data-claim="nexus.backend-architecture nexus.admin-backend-ownership nexus.quality-automation"
            claim="I am building the backend for the integrated management system clinics actually run on."
            items={[
              <>Leading the design and build of the integrated management system backend on a <strong>Clean Architecture layering</strong> (in progress)<Src>AI 메디컬 플랫폼</Src></>,
              <>Kept Homepage and Admin APIs as independent modules behind a single gateway endpoint, and standardised shared CRUD through a generic repository<Src>AI 메디컬 플랫폼</Src></>,
              <>Isolated data with multi-tenancy and automatic soft-delete filtering; led the service boundary and migration flow of the hospital product backend monorepo<Src>AI 메디컬 플랫폼</Src></>,
              <>Established code conventions and a Ruff/Pyright/pre-commit quality verification pipeline<Src>AI 메디컬 플랫폼</Src></>,
            ]}
          />
          <Axis
            no="04"
            title="Agent workflow · AX"
            data-claim="thready.agent-pipeline-design be-template.backend-standard be-template.agent-context mediness.product-operations"
            claim="I make people and coding agents work off the same set of rules."
            items={[
              <>Designed and built the <strong>generation pipeline as planner and writer roles</strong> — type-branch judgement placed in the writer never fired across 18 cases, so I moved it to the planner<Src>AI 콘텐츠 생성 제품</Src></>,
              <>Put layered architecture, dependency injection, response conventions and ADRs into the organization-wide FastAPI template, with an <strong>agent context system and automation skills embedded</strong><Src>조직 표준</Src></>,
              <>Turned specs, issues and release gates into an <strong>execution boundary both people and agents read</strong> — this site was built the same way<Src>제품팀 운영</Src></>,
            ]}
          />
          <Axis
            no="05"
            title="Infrastructure · platform operations"
            data-claim="infra.company-azure-ownership nexus.terraform-infra centurion.shared-infra"
            claim="I own and operate the environments the products actually run on."
            items={[
              <>Own the design, build and operation of the <strong>company-wide Azure/Terraform infrastructure</strong><Src>MediSolve AI</Src></>,
              <>Manage resource boundaries and deploy/runbook practice across B2B, B2C, product and environment splits<Src>MediSolve AI</Src></>,
              <>Own the Terraform IaC build for the external product, and run Centurion&rsquo;s Azure/Terraform infrastructure with its runbooks and documentation<Src>AI 메디컬 플랫폼</Src></>,
            ]}
          />
          <Axis
            no="06"
            title="Product operations · decisions"
            data-claim="mediness.product-operations career.medisolve-role-evolution career.sellercanvas-product-system credentials.page-output-patent credentials.ces-2024"
            claim="I help decide what to build, and design how it runs once it exists."
            items={[
              <>Build AI product backends while <strong>helping run the product team</strong> — joined as a Backend Engineer and now also serve as head of the R&amp;D center, Tech Lead and PO<Src>MediSolve AI</Src></>,
              <>Lead product-team scheduling, issues and releases on a pipeline registry and release gates — connecting product decisions to BE, FE, QA and release execution<Src>제품팀 운영</Src></>,
              <>Took a CES 2024 Best of Innovation-winning product <strong>from prototype to v1.0 as its primary PM</strong> — ran a proof of concept with a major fashion brand along the way, and the detail-page production flow I redesigned led to a registered patent<Src>커머스 AI 제품</Src></>,
              <>Planned and built <strong>the systems that kept the product running</strong> — not developer tooling but the operating structure of the product itself, the earlier form of the product operations I lead today<Src>커머스 AI 제품</Src></>,
              <>Was planning and building product systems for generative Vision-AI products <strong>before the LLM boom (2021&ndash;22)</strong>, and built a color-classification model hands-on while serving as PM<Src>커머스 AI 제품</Src></>,
            ]}
          />
        </NumberedList>
      </Sec>

      <Sec no="04" title="How I Work">
        <NumberedList>
          <NumberedRow label="01" labelWidth="sm" labelClassName="font-mono text-xs text-muted" className="border-t-0 py-3" data-claim="thready.rebuild-decision-execution thready.measurement-correction">
            <div>
              <p className="m-0 mb-1 font-semibold text-fg">Redraw the boundary of the problem</p>
              <p className="m-0 text-sm text-fg-2">
                Before fixing symptoms, I check whether the problem is framed correctly. I decided and argued for a full backend rebuild, and found a loop where our quality baseline was feeding on our own output — then redefined the axis itself.
              </p>
            </div>
          </NumberedRow>
          <NumberedRow label="02" labelWidth="sm" labelClassName="font-mono text-xs text-muted" className="py-3" data-claim="thready.quality-criteria-system mediness.product-operations">
            <div>
              <p className="m-0 mb-1 font-semibold text-fg">Make judgement measurable and gated</p>
              <p className="m-0 text-sm text-fg-2">
                &ldquo;Good or bad&rdquo; tells you nothing about what to fix. I split generation-quality judgement into three layers — automated gates, measured-distribution checks, human review — and run releases and QA as gates.
              </p>
            </div>
          </NumberedRow>
          <NumberedRow label="03" labelWidth="sm" labelClassName="font-mono text-xs text-muted" className="py-3" data-claim="be-template.agent-context mediness.product-operations">
            <div>
              <p className="m-0 mb-1 font-semibold text-fg">Scale the fix into standards and automation</p>
              <p className="m-0 text-sm text-fg-2">
                A problem solved once should be reusable by the team. I embedded agent context into the organization-wide backend template and turned specs, issues, and release gates into an execution boundary that both people and agents read.
              </p>
            </div>
          </NumberedRow>
          <NumberedRow label="04" labelWidth="sm" labelClassName="font-mono text-xs text-muted" className="py-3" data-claim="thready.rebuild-decision-execution thready.measurement-correction centurion.bay-async-backend be-template.agent-context">
            <div>
              <p className="m-0 mb-1 font-semibold text-fg">Catch the problem before it becomes a ticket</p>
              <p className="m-0 mb-2 text-sm text-fg-2">How these usually started:</p>
              <ul className="m-0 grid list-none gap-1.5 p-0 text-sm text-fg-2">
                <li className="grid grid-cols-[148px_minmax(0,1fr)] gap-3 max-sm:grid-cols-1 max-sm:gap-0.5">
                  <span className="font-mono text-xs text-muted">Backend rebuild</span>
                  <span>Not assigned to me, and there was pushback</span>
                </li>
                <li className="grid grid-cols-[148px_minmax(0,1fr)] gap-3 max-sm:grid-cols-1 max-sm:gap-0.5">
                  <span className="font-mono text-xs text-muted">Baseline error</span>
                  <span>Surfaced while re-measuring something nobody had flagged</span>
                </li>
                <li className="grid grid-cols-[148px_minmax(0,1fr)] gap-3 max-sm:grid-cols-1 max-sm:gap-0.5">
                  <span className="font-mono text-xs text-muted">Worker split</span>
                  <span>Preventive, not a response to an incident</span>
                </li>
                <li className="grid grid-cols-[148px_minmax(0,1fr)] gap-3 max-sm:grid-cols-1 max-sm:gap-0.5">
                  <span className="font-mono text-xs text-muted">Org-wide template</span>
                  <span>Came from the team&rsquo;s switching cost, not my own product&rsquo;s</span>
                </li>
              </ul>
            </div>
          </NumberedRow>
        </NumberedList>
      </Sec>

      <Sec no="05" title="Skills">
        <KeyValueRows items={SKILLS_EN} />
      </Sec>

      <Sec no="06" title="Education & Credentials">
        <NumberedList>
          <NumberedRow label="2016 — 2021" labelWidth="md" labelClassName="text-xs" className="border-t-0 py-1" data-claim="credentials.education">
            <span className="text-sm text-fg-2">Woosong University, Game Multimedia major</span>
          </NumberedRow>
          <NumberedRow label="2024.01" labelWidth="md" labelClassName="text-xs" className="border-t-0 py-1" data-claim="credentials.ces-2024">
            <span className="text-sm text-fg-2">CES 2024 Best of Innovation — contributed to the awarded AI product</span>
          </NumberedRow>
          <NumberedRow label="2025.12" labelWidth="md" labelClassName="text-xs" className="border-t-0 py-1" data-claim="credentials.page-output-patent">
            <span className="text-sm text-fg-2">Patent registered: &quot;Page Output Method&quot; · KR 10-2898273</span>
          </NumberedRow>
          <NumberedRow label="2021.09" labelWidth="md" labelClassName="text-xs" className="border-t-0 py-1" data-claim="credentials.adsp">
            <span className="text-sm text-fg-2">ADsP · Advanced Data Analytics Semi-Professional</span>
          </NumberedRow>
          <NumberedRow label="Cert." labelWidth="md" labelClassName="text-xs" className="border-t-0 py-1" data-claim="credentials.ai-accuracy-certification">
            <span className="text-sm text-fg-2">Korea Conformity Laboratories (KCL) — AI accuracy certification</span>
          </NumberedRow>
        </NumberedList>
      </Sec>
    </div>
  );
}

export function ResumeView() {
  const [lang, setLang] = useState<"ko" | "en">("ko");
  return (
    <div className="grid grid-cols-[minmax(0,1fr)_240px] gap-12 max-lg:grid-cols-1">
      <main className="max-w-[800px] pb-24 pt-12 max-lg:order-2 max-lg:pt-6">
        {lang === "ko" ? <DocKo /> : <DocEn />}
      </main>

      <aside className="sticky top-0 grid content-start gap-5 self-start py-12 max-lg:static max-lg:order-1 max-lg:grid-cols-[1fr_auto] max-lg:items-center max-lg:gap-3 max-lg:py-5">
        <Button href="#" disabled title="export 스크립트 단계에서 연결" className="justify-center">
          ↓ PDF 다운로드 (A4)
        </Button>
        <div className="flex border border-border" role="group" aria-label="언어">
          {(
            [
              ["ko", "KO"],
              ["en", "EN · DRAFT"],
            ] as const
          ).map(([value, label]) => (
            <button
              key={value}
              type="button"
              onClick={() => setLang(value)}
              className={cn(
                "focus-ring flex-1 cursor-pointer whitespace-nowrap bg-bg px-3 py-2 font-mono text-xs text-muted",
                lang === value && "bg-fg text-accent-on",
              )}
            >
              {label}
            </button>
          ))}
        </div>
        {lang === "ko" && (
          <nav aria-label="목차" className="max-lg:hidden">
            <h2 className="m-0 mb-2.5 font-mono text-xs uppercase tracking-[0.1em] text-muted">
              Contents
            </h2>
            <ol className="m-0 grid list-none gap-[7px] p-0">
              {SECTIONS.map((s, i) => (
                <li key={s.id}>
                  <a href={`#${s.id}`} className="focus-ring font-mono text-xs text-fg-2 hover:text-fg">
                    <span className="mr-2 text-muted">{String(i + 1).padStart(2, "0")}</span>
                    {s.ko}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        )}
        <p className="m-0 border-t border-border-soft pt-3 font-mono text-xs leading-relaxed text-muted max-lg:hidden">
          성과 문장은 claim registry의 public 표현 범위 안에서 씁니다 — 강도(owned·led·co-led)와
          금지 표현을 문서로 관리합니다. 연락처 중 전화번호는 PDF 배포본에만 포함됩니다.
        </p>
      </aside>
    </div>
  );
}
