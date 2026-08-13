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

/* ⚠️ 콘텐츠 임시 수동 사본 — canonical 은 wiki/profile/canonical-baseline.md + wiki/products/resume/master/v3/content.md.
   export 스크립트 도입 시 파생 콘텐츠 소비로 교체한다. 전화번호는 웹에 넣지 않는다(정책). */

/* — 로컬 프리미티브 (두 번째 사용처가 생기면 ui/ 로 승격) — */

function PlainList({ items }: { items: React.ReactNode[] }) {
  return (
    <ul className="m-0 grid list-none gap-2 p-0">
      {items.map((item, i) => (
        <li
          key={i}
          className="relative pl-4 text-fg-2 before:absolute before:left-0 before:font-mono before:text-muted before:content-['—'] [&_strong]:font-semibold [&_strong]:text-fg"
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
  children,
}: {
  org: string;
  now?: boolean;
  period: string;
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
}: {
  no: string;
  title: string;
  claim: React.ReactNode;
  items: React.ReactNode[];
  first?: boolean;
}) {
  return (
    <NumberedRow
      label={no}
      labelWidth="sm"
      labelClassName="font-mono text-xs text-muted"
      className={cn("py-4", first && "border-t-0")}
    >
      <div>
        <h3 className="m-0 mb-1 font-mono text-base font-semibold">{title}</h3>
        <p className="m-0 mb-2.5 text-sm text-fg-2">{claim}</p>
        <PlainList items={items} />
      </div>
    </NumberedRow>
  );
}

function Metric({ children }: { children: React.ReactNode }) {
  return <span className="font-semibold text-success">{children}</span>;
}

const SECTIONS = [
  { id: "s1", ko: "요약" },
  { id: "s2", ko: "할 수 있는 일" },
  { id: "s3", ko: "일하는 방식" },
  { id: "s4", ko: "기술" },
  { id: "s5", ko: "경력" },
  { id: "s6", ko: "credentials" },
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
        via="아이즈솔·메멘토·더데이랩스·메디솔브 — 실무 backend의 주 언어"
      />
    ),
  },
  {
    k: "함께 씀",
    v: (
      <Skill
        stack="TypeScript, NestJS"
        via="Centurion · API Gateway (MediSolve) · 스튜디오랩 레거시 이관"
      />
    ),
  },
  {
    k: "Data / Messaging",
    v: (
      <Skill
        stack="PostgreSQL, MySQL, Redis, RabbitMQ, TaskIQ"
        via="Centurion 주문·재고 비동기 worker · Thready"
      />
    ),
  },
  {
    k: "Infra / Delivery",
    v: (
      <Skill
        stack="Azure, AWS, Terraform, Docker, GitHub Actions"
        via="사내 infra repository 소유 · TellingMe 배포·모니터링"
      />
    ),
  },
  {
    k: "AI Product",
    v: (
      <Skill
        stack="LLM integration/evaluation, typed prompt, structured output, WebSocket, SSE, STT"
        via="Thready 생성 품질 판정 · Centurion realtime 상담 세션"
      />
    ),
  },
  {
    k: "개인 프로젝트",
    v: (
      <Skill
        stack="Java, Spring Boot"
        via="TellingMe — 10명 팀의 백엔드 2명 중 주도, iOS 정식 출시 (2024.01 — 2024.12). 실무 경험이 아닌 구간을 구분해 표기한다"
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
    v: (
      <Skill
        stack="TypeScript, NestJS"
        via="Centurion · API Gateway (MediSolve) · STUDIO LAB legacy migration"
      />
    ),
  },
  {
    k: "Data / Messaging",
    v: (
      <Skill
        stack="PostgreSQL, MySQL, Redis, RabbitMQ, TaskIQ"
        via="Centurion order/inventory async workers · Thready"
      />
    ),
  },
  {
    k: "Infra / Delivery",
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
  children,
}: {
  id?: string;
  no: string;
  title: string;
  meta?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="pt-9">
      <SectionHead no={no} title={title} meta={meta} />
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
          기업부설연구소장 <span className="text-muted">(2025.04 — 재직 중)</span>
          <span className="mx-2 text-muted">/</span>
          이전 <b className="font-semibold text-fg">STUDIO LAB</b> · PM
          <span className="text-muted"> (2021.12 — 2023.12)</span>
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
        <PlainList
          items={[
            <><strong>AI 제품을 만들어온 <Metric>실무 4년차</Metric></strong> — 모델을 만들다 기획을 거쳐 백엔드로 왔고, 지금은 백엔드를 만들면서 무엇을 만들지 정하는 역할도 같이 맡는다</>,
            <>백엔드를 택한 데는 이유가 있다 — <strong>AI가 구현을 점점 더 많이 맡을수록, 보안과 안정성처럼 사람이 끝까지 책임져야 하는 층이 더 무거워진다고 봤다</strong>. 매일 AI와 같이 제품을 만드는 지금, 그 판단이 틀리지 않았다고 느낀다</>,
            <><strong>기업부설연구소장·Tech Lead·PO 역할을 병행</strong>하며 AI 제품 backend를 만들면서 제품팀 운영을 함께 리드</>,
            <><strong>문제의 경계를 다시 잡고</strong>, <strong>측정과 게이트로 판정 가능하게 만들고</strong>, <strong>그 해결을 표준으로 확장하는 것</strong>이 일하는 방식 — AI 도구로 빠르게 구축된 생성 backend를 전면 재구축하고 cutover 이후 개발·운영을 전담</>,
            <>CES 2024 Best of Innovation <strong>수상 제품의 PM 메인 역할</strong> — 상세페이지 제작 방식은 특허 등록으로 이어짐 (10-2898273)</>,
          ]}
        />
      </Sec>

      <Sec id="s2" no="02" title="할 수 있는 일" meta="Capabilities">
        <NumberedList>
          <Axis
            first
            no="01"
            title="AI 제품 backend 구축·재구축"
            claim="기술부채를 언제 갚을지 계산하고, 갚는 동안 서비스가 흔들리지 않게 만듭니다."
            items={[
              <>재구축의 가장 큰 위험은 새 결함이다 — <strong>cutover 전후 관측에서 QA 버그 재발률(해결 대비 reopen)이 37% → 11%로 감소</strong>, 재발 발생 일평균 <Metric>약 94% 감소</Metric>. 위험이 현실화되지 않았음을 지표로 확인<Src>Thready</Src></>,
              <>부분 수정으로는 의존성 구조가 남는다고 판단, <strong>서비스가 작은 시점</strong>을 골라 재구축을 결정·설득 — 지금 갚는 비용이 나중보다 싸다는 계산이었다<Src>Thready</Src></>,
              <>범위를 <strong>backend로 한정</strong>(FE는 Next.js 유지)하고 <strong>하네스를 먼저 세운 뒤</strong> AI와 협업 — 파악부터 재구축까지 <Metric>총 36시간(작업 시간 기준)</Metric>, 이후 개발·운영 전담하며 월 수만 건 요청을 <Metric>HTTP 5xx 0.3% 수준</Metric>으로 운영<Src>Thready</Src></>,
              <>재구축만 하는 것은 아니다 — 메시지 계층은 <strong>Celery에서 TaskIQ로 점진 전환</strong>, 레거시는 <strong>NestJS로 이관</strong>, monorepo는 <strong>service boundary와 migration flow</strong>로 옮겼다<Src>Centurion · SellerCanvas</Src></>,
              <>주문·재고 API와 RabbitMQ·TaskIQ 비동기 worker·retry 구축 주도 — 실패 가능한 작업을 <strong>제품 시작 시점부터</strong> API 경계 밖으로 분리한 예방 설계<Src>Centurion</Src></>,
            ]}
          />
          <Axis
            no="02"
            title="AI 출력 품질 판정·평가"
            claim="&ldquo;품질이 나쁘다&rdquo;를 무엇을 고칠지 정할 수 있는 문제로 바꿉니다."
            items={[
              <>AI 생성 품질을 <strong>자동 게이트·실측 분포·사람 판정 3층</strong>으로 나눠 계량 — 자동화가 닿는 층과 닿지 않는 층을 갈라 설계<Src>Thready</Src></>,
              <>결정적 게이트 12종으로 형식 오류를 자동 차단하고, 품질 판정 기준을 6축으로 계량해 축별 개선 순서를 관리<Src>Quality Lab</Src></>,
              <>직접 수집한 실측 코퍼스로 프롬프트 규칙의 근거를 검증(<Metric>n=19 → 4,039</Metric>), 반증된 접근은 기록으로 남겨 재시도를 막음<Src>Quality Lab</Src></>,
              <>실측으로 믿고 쓰던 품질 기준값이 <strong>자사 출력을 되먹이고 있었음</strong>을 확인 — 순환을 끊고 기준을 다시 세우는 과정에서 문제 정의 자체의 오류도 함께 드러남<Src>Quality Lab</Src></>,
            ]}
          />
          <Axis
            no="03"
            title="어드민 시스템 구축·운영"
            claim="병원이 실제로 쓰는 통합 관리 시스템 backend를 계층 구조로 세우고 있습니다."
            items={[
              <>통합 관리 시스템 backend를 <strong>Clean Architecture 계층 구조로 설계·구축 주도</strong> (진행 중)<Src>Centurion</Src></>,
              <>Homepage/Admin API를 독립 모듈로 두고 gateway로 단일 엔드포인트 제공, Generic Repository로 공통 CRUD 표준화<Src>Centurion</Src></>,
              <>Multi-tenancy와 Soft Delete 자동 필터링으로 데이터 격리, 병원 product backend monorepo의 service boundary와 migration flow 주도<Src>Centurion</Src></>,
              <>코드 컨벤션 정립과 Ruff·Pyright·pre-commit 기반 품질 자동 검증 체계 구축<Src>Centurion</Src></>,
            ]}
          />
          <Axis
            no="04"
            title="Agent 워크플로우 · AX"
            claim="사람과 코딩 에이전트가 같은 규칙 위에서 일하도록 만듭니다."
            items={[
              <>생성 파이프라인을 <strong>planner·writer 역할로 분리 설계·구현</strong> — 유형 분기 판정이 writer에서 18건 전부 미발동하자 판정 위치를 planner로 재배치해 해결<Src>Thready</Src></>,
              <>조직 표준 FastAPI template에 layered architecture·의존성 주입·응답 규약·ADR을 담고, <strong>agent context system과 반복 작업 automation skill 내장</strong><Src>BE Template</Src></>,
              <>스펙·이슈·릴리스 게이트를 <strong>사람과 agent가 함께 읽는 실행 경계</strong>로 구성 — 이 사이트도 같은 방식으로 만들었다<Src>Mediness Ops</Src></>,
            ]}
          />
          <Axis
            no="05"
            title="인프라 · 플랫폼 운영"
            claim="제품이 도는 환경을 직접 소유하고 운영합니다."
            items={[
              <><strong>회사 Azure/Terraform infra 전반</strong>의 설계·구축·운영 담당<Src>MediSolve AI</Src></>,
              <>B2B/B2C·제품·환경별 resource boundary와 deploy·runbook 관리<Src>MediSolve AI</Src></>,
              <>외부 product Terraform IaC 구축 전담, Centurion Azure/Terraform infra 구축·운영과 runbook·문서화 담당<Src>Centurion</Src></>,
            ]}
          />
          <Axis
            no="06"
            title="제품 운영 · 결정"
            claim="무엇을 만들지 정하고, 만들어진 뒤의 운영 구조까지 설계합니다."
            items={[
              <>Backend Engineer 합류 후 <strong>기업부설연구소장·Tech Lead·PO 역할 병행</strong> — AI 제품 backend를 만들면서 제품팀 운영을 함께 리드<Src>MediSolve AI</Src></>,
              <>pipeline registry와 release gate 기반으로 제품팀 일정·이슈·릴리스 운영 리드 — 제품 결정을 BE·FE·QA·release gate 실행으로 연결<Src>Mediness Ops</Src></>,
              <>CES 2024 Best of Innovation 수상 제품에서 <strong>프로토타입 단계부터 v1.0까지 0→1 구간을 PM으로 통과</strong> — 그 과정에서 패션 대기업 브랜드 POC를 함께 진행했고, 상세페이지 제작 Flow 재설계가 특허 「페이지 출력 방법」 출원·등록으로 이어짐<Src>SellerCanvas</Src></>,
              <><strong>제품이 원활하게 돌아가는 시스템</strong>을 기획·구축 — 개발 시스템이 아니라 제품이 굴러가는 구조를 설계하는 일이었고, 지금의 제품 운영 리드와 같은 근육의 이전 형태<Src>SellerCanvas</Src></>,
              <><strong>LLM 붐 이전(2021~22)부터</strong> Vision AI 기반 생성 제품의 제품 시스템을 기획·구축, PM 재직 중에도 색상 분류 모델을 직접 개발<Src>SellerCanvas</Src></>,
            ]}
          />
        </NumberedList>
      </Sec>

      <Sec id="s3" no="03" title="일하는 방식" meta="How I Work">
        <NumberedList>
          <NumberedRow label="01" labelWidth="sm" labelClassName="font-mono text-xs text-muted" className="border-t-0 py-3">
            <div>
              <p className="m-0 mb-1 font-semibold text-fg">문제의 경계를 다시 잡는다</p>
              <p className="m-0 text-sm text-fg-2">
                증상을 고치기 전에 문제 정의가 맞는지 본다. 재구축을 결정·설득했고, 품질 기준값이 자사 출력을 되먹이던 순환을 발견해 문제 축 자체를 재정의했다.
              </p>
            </div>
          </NumberedRow>
          <NumberedRow label="02" labelWidth="sm" labelClassName="font-mono text-xs text-muted" className="py-3">
            <div>
              <p className="m-0 mb-1 font-semibold text-fg">측정과 게이트로 판정 가능하게 만든다</p>
              <p className="m-0 text-sm text-fg-2">
                &ldquo;좋다/나쁘다&rdquo;로는 무엇을 고칠지 알 수 없다. 생성 품질 판정을 자동 게이트·실측 분포·사람 판정 3층으로 나누고, 릴리스·QA를 게이트 구조로 운영한다.
              </p>
            </div>
          </NumberedRow>
          <NumberedRow label="03" labelWidth="sm" labelClassName="font-mono text-xs text-muted" className="py-3">
            <div>
              <p className="m-0 mb-1 font-semibold text-fg">해결을 표준과 자동화로 확장한다</p>
              <p className="m-0 text-sm text-fg-2">
                한 번 푼 문제를 팀이 반복해서 쓸 수 있어야 한다. 조직 표준 template에 agent context를 내장하고, 스펙·이슈·릴리스 게이트를 사람과 agent가 함께 읽는 실행 경계로 구성했다.
              </p>
            </div>
          </NumberedRow>
        </NumberedList>
      </Sec>

      <Sec id="s4" no="04" title="기술" meta="Skills">
        <KeyValueRows items={SKILLS} />
      </Sec>

      <Sec id="s5" no="05" title="경력" meta="Career">
        <NumberedList className="border-t border-border-soft">
          <CareerRow org="MediSolve AI" now period="2025.04 —">
            <span className="mb-1 block text-fg-2">Backend Engineer · 기업부설연구소장 · Tech Lead·PO 역할 병행</span>
            <PlainList
              items={[
                <>AI 콘텐츠 생성 backend 전면 재구축과 cutover 이후 개발·운영 전담 — cutover 전후 관측에서 QA 버그 재발률(해결 대비 reopen) <strong>37% → 11%</strong>, 월 수만 건 규모를 30일 기준 <strong>HTTP 5xx 0.3% 수준</strong>으로 운영</>,
                <>피부과 운영 플랫폼의 주문·재고 backend와 비동기 worker 흐름 구축 주도 — 실패 가능한 작업을 API 경계 밖으로 분리</>,
                <>조직 표준 FastAPI template 설계·구축과 agent context 내장 — <strong>소수 백엔드 인원이 다수 제품을 담당하는 체제</strong>에서 컨텍스트 전환 비용을 낮추고 횡단 관심사를 일괄 반영</>,
              ]}
            />
          </CareerRow>
          <CareerRow org="더데이랩스" period="2025.02 — 2025.04">
            현 MediSolve AI 대표와 프리랜서로 협업 시작 — Centurion 초기 backend 구축과 개발팀 시스템·기준 수립, 창업과 함께 합류
          </CareerRow>
          <CareerRow org="Memento AI" period="2024.10 — 2025.01">
            예약·결제 backend의 Stripe 선결제 도입과 환불·마일리지·티켓 rollback 안정화 (인턴 1개월 → 정규직) — 회사 폐업으로 재직 종료
          </CareerRow>
          <CareerRow org="STUDIO LAB" period="2021.12 — 2023.12">
            SellerCanvas(생성형 AI 커머스 콘텐츠)의 <strong>PM 메인 역할</strong> — 프로토타입 단계부터 v1.0까지 0→1 구간을 통과했고, 패션 대기업 브랜드 POC와 상세페이지 제작 Flow 재설계가 <strong>특허 「페이지 출력 방법」 출원·등록으로 이어짐</strong>. PM 중에도 색상 분류 모델을 직접 개발 (AI Engineer → PM → Backend Engineer)
          </CareerRow>
          <CareerRow org="아이즈솔" period="2020.08 — 2021.06">
            Vision AI에서 시작한 AI product engineering 경력 (인턴)
          </CareerRow>
        </NumberedList>
      </Sec>

      <Sec id="s6" no="06" title="학력·교육 / 수상·특허·자격" meta="Credentials">
        <NumberedList>
          <NumberedRow label="2016 — 2021" labelWidth="md" labelClassName="text-xs" className="border-t-0 py-1">
            <span className="text-sm text-fg-2">우송대학교 게임멀티미디어 전공</span>
          </NumberedRow>
          <NumberedRow label="2024.01" labelWidth="md" labelClassName="text-xs" className="border-t-0 py-1">
            <span className="text-sm text-fg-2">CES 2024 Best of Innovation · AI 부문 대상 제품 참여</span>
          </NumberedRow>
          <NumberedRow label="2025.12" labelWidth="md" labelClassName="text-xs" className="border-t-0 py-1">
            <span className="text-sm text-fg-2">특허 등록 「페이지 출력 방법」 · 등록 10-2898273</span>
          </NumberedRow>
          <NumberedRow label="2021.09" labelWidth="md" labelClassName="text-xs" className="border-t-0 py-1">
            <span className="text-sm text-fg-2">ADsP · 데이터분석 준전문가</span>
          </NumberedRow>
          <NumberedRow label="인증" labelWidth="md" labelClassName="text-xs" className="border-t-0 py-1">
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
          Head of the R&amp;D Center{" "}
          <span className="text-muted">(Apr 2025 — present)</span>
          <span className="mx-2 text-muted">/</span>
          Previously <b className="font-semibold text-fg">STUDIO LAB</b> · PM
          <span className="text-muted"> (Dec 2021 — Dec 2023)</span>
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
        <PlainList
          items={[
            <><strong>Four years of building AI products</strong> — moving from model engineering to product planning to backend, now both building the backend and helping decide what to build and why</>,
            <>Chose backend on a judgement call: <strong>as AI takes on more of the implementation, the layers humans must own to the end — security and stability — only grow heavier</strong>; building products alongside AI today has made that conviction firmer</>,
            <>Serving as <strong>Head of the corporate R&amp;D center, Tech Lead, and Product Owner</strong> — building AI product backends while leading how the product team operates</>,
            <>My way of working: <strong>redraw the problem boundary</strong>, <strong>make judgement measurable and gated</strong>, then <strong>scale the fix into standards</strong> — rebuilt an AI content generation backend end to end and has owned it since cutover</>,
            <>Served as the <strong>primary PM</strong> for a CES 2024 Best of Innovation-winning product — the page-generation method led to a registered patent (10-2898273)</>,
          ]}
        />
      </Sec>

      <Sec no="02" title="Capabilities">
        <NumberedList>
          <Axis
            first
            no="01"
            title="Building and rebuilding AI product backends"
            claim="I work out when technical debt is cheapest to repay, and keep the service steady while repaying it."
            items={[
              <>The main risk in a rebuild is new defects — across the cutover the <strong>QA reopen rate (resolved-to-reopened) went from 37% to 11%</strong>, with daily reopen incidence down <Metric>~94%</Metric>. The risk did not materialise, and the metric shows it<Src>Thready</Src></>,
              <>Judged that partial fixes would leave the dependency structure intact, so I picked the moment <strong>while the service was still small</strong> and argued for the rebuild — repaying then was cheaper than repaying later<Src>Thready</Src></>,
              <>Scoped it to the <strong>backend only</strong> (keeping Next.js on the frontend) and <strong>set up the harness first</strong> before pairing with AI — <Metric>36 work hours</Metric> from discovery to rebuild, then owned development and operations at <Metric>~0.3% HTTP 5xx</Metric> across tens of thousands of monthly requests<Src>Thready</Src></>,
              <>Rebuilding is not the only tool — migrated the messaging layer <strong>incrementally from Celery to TaskIQ</strong>, moved legacy code <strong>onto NestJS</strong>, and reshaped a monorepo through <strong>service boundaries and migration flow</strong><Src>Centurion · SellerCanvas</Src></>,
              <>Led order/inventory APIs, RabbitMQ/TaskIQ async workers and retry — moved failure-prone work outside the API boundary <strong>from product inception</strong> as preventive design<Src>Centurion</Src></>,
            ]}
          />
          <Axis
            no="02"
            title="Judging and evaluating AI output quality"
            claim="I turn &ldquo;the quality is bad&rdquo; into a problem you can actually act on."
            items={[
              <>Split generation-quality judgement into <strong>three layers</strong> — automated gates, measured-distribution checks, human review — separating what automation reaches from what it does not<Src>Thready</Src></>,
              <>Built 12 deterministic gates that block format errors automatically, and quantified quality on six axes to manage the order of improvement<Src>Quality Lab</Src></>,
              <>Validated prompt rules against a corpus I collected myself (<Metric>n=19 → 4,039</Metric>); refuted approaches are kept on record to prevent retries<Src>Quality Lab</Src></>,
              <>Found that a quality baseline we had trusted as measured was actually <strong>feeding on our own output</strong> — breaking the loop also surfaced an error in the problem definition itself<Src>Quality Lab</Src></>,
            ]}
          />
          <Axis
            no="03"
            title="Building and running admin systems"
            claim="I am building the backend for the integrated management system clinics actually run on."
            items={[
              <>Leading the design and build of the integrated management system backend on a <strong>Clean Architecture layering</strong> (in progress)<Src>Centurion</Src></>,
              <>Kept Homepage and Admin APIs as independent modules behind a single gateway endpoint, and standardised shared CRUD through a generic repository<Src>Centurion</Src></>,
              <>Isolated data with multi-tenancy and automatic soft-delete filtering; led the service boundary and migration flow of the hospital product backend monorepo<Src>Centurion</Src></>,
              <>Established code conventions and a Ruff/Pyright/pre-commit quality verification pipeline<Src>Centurion</Src></>,
            ]}
          />
          <Axis
            no="04"
            title="Agent workflow · AX"
            claim="I make people and coding agents work off the same set of rules."
            items={[
              <>Designed and built the <strong>generation pipeline as planner and writer roles</strong> — type-branch judgement placed in the writer never fired across 18 cases, so I moved it to the planner<Src>Thready</Src></>,
              <>Put layered architecture, dependency injection, response conventions and ADRs into the organization-wide FastAPI template, with an <strong>agent context system and automation skills embedded</strong><Src>BE Template</Src></>,
              <>Turned specs, issues and release gates into an <strong>execution boundary both people and agents read</strong> — this site was built the same way<Src>Mediness Ops</Src></>,
            ]}
          />
          <Axis
            no="05"
            title="Infrastructure · platform operations"
            claim="I own and operate the environments the products actually run on."
            items={[
              <>Own the design, build and operation of the <strong>company-wide Azure/Terraform infrastructure</strong><Src>MediSolve AI</Src></>,
              <>Manage resource boundaries and deploy/runbook practice across B2B, B2C, product and environment splits<Src>MediSolve AI</Src></>,
              <>Own the Terraform IaC build for the external product, and run Centurion&rsquo;s Azure/Terraform infrastructure with its runbooks and documentation<Src>Centurion</Src></>,
            ]}
          />
          <Axis
            no="06"
            title="Product operations · decisions"
            claim="I help decide what to build, and design how it runs once it exists."
            items={[
              <>Joined as a Backend Engineer and now also serve as <strong>head of the R&amp;D center while taking on Tech Lead and PO roles</strong><Src>MediSolve AI</Src></>,
              <>Lead product-team scheduling, issues and releases on a pipeline registry and release gates — connecting product decisions to BE, FE, QA and release execution<Src>Mediness Ops</Src></>,
              <>Took a CES 2024 Best of Innovation-winning product <strong>from prototype to v1.0 as its primary PM</strong> — ran a proof of concept with a major fashion brand along the way, and the detail-page production flow I redesigned led to a registered patent<Src>SellerCanvas</Src></>,
              <>Planned and built <strong>the systems that kept the product running</strong> — not developer tooling but the operating structure of the product itself, the earlier form of the product operations I lead today<Src>SellerCanvas</Src></>,
              <>Was planning and building product systems for generative Vision-AI products <strong>before the LLM boom (2021&ndash;22)</strong>, and built a color-classification model hands-on while serving as PM<Src>SellerCanvas</Src></>,
            ]}
          />
        </NumberedList>
      </Sec>

      <Sec no="03" title="How I Work">
        <NumberedList>
          <NumberedRow label="01" labelWidth="sm" labelClassName="font-mono text-xs text-muted" className="border-t-0 py-3">
            <div>
              <p className="m-0 mb-1 font-semibold text-fg">Redraw the boundary of the problem</p>
              <p className="m-0 text-sm text-fg-2">
                Before fixing symptoms, I check whether the problem is framed correctly. I decided and argued for a full backend rebuild, and found a loop where our quality baseline was feeding on our own output — then redefined the axis itself.
              </p>
            </div>
          </NumberedRow>
          <NumberedRow label="02" labelWidth="sm" labelClassName="font-mono text-xs text-muted" className="py-3">
            <div>
              <p className="m-0 mb-1 font-semibold text-fg">Make judgement measurable and gated</p>
              <p className="m-0 text-sm text-fg-2">
                &ldquo;Good or bad&rdquo; tells you nothing about what to fix. I split generation-quality judgement into three layers — automated gates, measured-distribution checks, human review — and run releases and QA as gates.
              </p>
            </div>
          </NumberedRow>
          <NumberedRow label="03" labelWidth="sm" labelClassName="font-mono text-xs text-muted" className="py-3">
            <div>
              <p className="m-0 mb-1 font-semibold text-fg">Scale the fix into standards and automation</p>
              <p className="m-0 text-sm text-fg-2">
                A problem solved once should be reusable by the team. I embedded agent context into the organization-wide backend template and turned specs, issues, and release gates into an execution boundary that both people and agents read.
              </p>
            </div>
          </NumberedRow>
        </NumberedList>
      </Sec>

      <Sec no="04" title="Skills">
        <KeyValueRows items={SKILLS_EN} />
      </Sec>

      <Sec no="05" title="Career">
        <NumberedList className="border-t border-border-soft">
          <CareerRow org="MediSolve AI" now period="Apr 2025 —">
            <span className="mb-1 block text-fg-2">Backend Engineer · Head of corporate R&amp;D center · Tech Lead / Product Owner</span>
            <PlainList
              items={[
                <>Rebuilt the AI content generation backend end to end and have owned development and operations since cutover — QA reopen rate (resolved-to-reopened) <strong>37% to 11%</strong>, tens of thousands of monthly requests at <strong>~0.3% HTTP 5xx</strong> over a 30-day window</>,
                <>Led the order/inventory backend and asynchronous worker flows for a clinic operations platform, moving failure-prone work outside the API boundary</>,
                <>Designed and built the organization-wide FastAPI template with embedded agent context — lowering context-switching cost and applying cross-cutting concerns at once in a setup where <strong>a small backend team covers many products</strong></>,
              ]}
            />
          </CareerRow>
          <CareerRow org="TheDayLabs" period="Feb — Apr 2025">
            Began working with MediSolve AI&apos;s founder as a freelancer — started Centurion&apos;s early backend and set up the new dev team&apos;s systems and standards
          </CareerRow>
          <CareerRow org="Memento AI" period="Oct 2024 — Jan 2025">
            Introduced Stripe prepayment and stabilized refund, mileage, and ticket rollback flows; role ended when the company ceased operations
          </CareerRow>
          <CareerRow org="STUDIO LAB" period="Dec 2021 — Dec 2023">
            <strong>Primary PM</strong> for SellerCanvas (generative-AI commerce content) — took it from prototype to v1.0, ran a proof of concept with a major fashion brand, and the detail-page production flow I redesigned led to a registered patent; also built a color-classification model hands-on while serving as PM (AI Engineer to PM to Backend Engineer)
          </CareerRow>
          <CareerRow org="Eyesol" period="Aug 2020 — Jun 2021">
            Started in AI product engineering with Vision AI (internship)
          </CareerRow>
        </NumberedList>
      </Sec>

      <Sec no="06" title="Education & Credentials">
        <NumberedList>
          <NumberedRow label="2016 — 2021" labelWidth="md" labelClassName="text-xs" className="border-t-0 py-1">
            <span className="text-sm text-fg-2">Woosong University, Game Multimedia major</span>
          </NumberedRow>
          <NumberedRow label="2024.01" labelWidth="md" labelClassName="text-xs" className="border-t-0 py-1">
            <span className="text-sm text-fg-2">CES 2024 Best of Innovation — contributed to the awarded AI product</span>
          </NumberedRow>
          <NumberedRow label="2025.12" labelWidth="md" labelClassName="text-xs" className="border-t-0 py-1">
            <span className="text-sm text-fg-2">Patent registered: &quot;Page Output Method&quot; · KR 10-2898273</span>
          </NumberedRow>
          <NumberedRow label="2021.09" labelWidth="md" labelClassName="text-xs" className="border-t-0 py-1">
            <span className="text-sm text-fg-2">ADsP · Advanced Data Analytics Semi-Professional</span>
          </NumberedRow>
          <NumberedRow label="Cert." labelWidth="md" labelClassName="text-xs" className="border-t-0 py-1">
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
          모든 성과 문장은 검증된 claim registry의 public 표현만 사용합니다. 연락처 중
          전화번호는 PDF 배포본에만 포함됩니다.
        </p>
      </aside>
    </div>
  );
}
