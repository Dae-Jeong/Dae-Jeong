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

function Metric({ children }: { children: React.ReactNode }) {
  return <span className="font-semibold text-success">{children}</span>;
}

const SECTIONS = [
  { id: "s1", ko: "요약" },
  { id: "s2", ko: "일하는 방식" },
  { id: "s3", ko: "기술" },
  { id: "s4", ko: "대표 프로젝트" },
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
    k: "Language / FW",
    v: (
      <Skill
        stack="Python, FastAPI, TypeScript, NestJS"
        via="Thready · Centurion · 고객사 product backend"
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
        via="TellingMe — 10명 팀의 백엔드 2명 중 주도, iOS 정식 출시 (2024.01 — 2024.12)"
      />
    ),
  },
];

const SKILLS_EN = [
  {
    k: "Language / FW",
    v: (
      <Skill
        stack="Python, FastAPI, TypeScript, NestJS"
        via="Thready · Centurion · client product backend"
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
        via="TellingMe — primary of two backend engineers on a 10-person team; shipped on the App Store (Jan — Dec 2024)"
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
            <><strong>AI 제품만 <Metric>4년째</Metric> 만들고 있다</strong> — 모델을 만들다 기획을 거쳐 백엔드로 왔고, 지금은 백엔드를 만들면서 무엇을 만들지 정하는 역할도 같이 맡는다</>,
            <>백엔드를 택한 데는 이유가 있다 — <strong>AI가 구현을 점점 더 많이 맡을수록, 보안과 안정성처럼 사람이 끝까지 책임져야 하는 층이 더 무거워진다고 봤다</strong>. 매일 AI와 같이 제품을 만드는 지금, 그 판단이 틀리지 않았다고 느낀다</>,
            <><strong>기업부설연구소장·Tech Lead·PO 역할을 병행</strong>하며 AI 제품 backend를 만들면서 제품팀 운영을 함께 리드</>,
            <><strong>문제의 경계를 다시 잡고</strong>, <strong>측정과 게이트로 판정 가능하게 만들고</strong>, <strong>그 해결을 표준으로 확장하는 것</strong>이 일하는 방식 — AI 도구로 빠르게 구축된 생성 backend를 전면 재구축하고 cutover 이후 개발·운영을 전담</>,
            <>CES 2024 Best of Innovation <strong>수상 제품의 PM 메인 역할</strong>과 특허 등록 1건</>,
          ]}
        />
      </Sec>

      <Sec id="s2" no="02" title="일하는 방식" meta="How I Work">
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

      <Sec id="s3" no="03" title="기술" meta="Skills">
        <KeyValueRows items={SKILLS} />
      </Sec>

      <Sec id="s4" no="04" title="대표 프로젝트" meta="Selected Projects">
        <div className="grid gap-5">
          <article>
            <h3 className="m-0 mb-2 font-mono text-base font-semibold">
              Thready <span className="text-sm font-normal text-muted">· AI 콘텐츠 생성 제품</span>
            </h3>
            <PlainList
              items={[
                <>AI 도구로 빠르게 구축돼 재발 이슈 통제가 어려웠던 생성 backend를 인계받아, 서비스가 작은 시점에 <strong>전면 재구축을 결정·설득</strong> — 하네스를 먼저 세팅하고 AI와 협업해 파악부터 재구축까지 <Metric>총 36시간(작업 시간 기준)</Metric>에 완수</>,
                <>cutover 이후 <strong>QA 버그 재발률(해결 대비 reopen) 37% → 11%</strong>, 재발 발생 일평균 <Metric>약 94% 감소</Metric> — 잔여 이슈도 원인 영역이 파악된 상태로 관리</>,
                <>AI 모듈 확장을 근거로 <strong>FastAPI 분리 도입</strong>(FE는 Next.js 유지), cutover 이후 개발·운영 전담 — 월 수만 건 규모 요청을 <Metric>HTTP 5xx 0.3% 수준</Metric>으로 운영</>,
                <>생성 품질 판정을 <strong>자동 게이트·실측 분포·사람 판정 3층</strong>으로 나누고, 프롬프트 규칙의 근거를 직접 수집한 실측 데이터로 검증 — 반증된 접근은 기록으로 남겨 재시도를 막음</>,
                <>품질 기준값을 실측으로 믿고 쓰던 중 재측정에서 <strong>자사 출력을 되먹이고 있었음</strong>을 확인 — 순환을 끊고 기준을 다시 세우는 과정에서 문제 정의 자체의 오류도 함께 드러남</>,
              ]}
            />
          </article>
          <article>
            <h3 className="m-0 mb-2 font-mono text-base font-semibold">
              Centurion{" "}
              <span className="text-sm font-normal text-muted">
                · 피부과 운영 AI 메디컬 플랫폼 · 제품 시작 시점부터 구축
              </span>
            </h3>
            <PlainList
              items={[
                <>주문·재고 API와 RabbitMQ·TaskIQ 비동기 worker, retry 구축 주도 — 실패 가능한 작업(주문·결제)을 <strong>제품 시작 시점부터</strong> API 경계 밖으로 분리한 예방 설계</>,
                <>비동기 처리를 <strong>Celery에서 TaskIQ + RabbitMQ로 전환</strong>하고 알림 발송을 독립 도메인으로 분리</>,
                <>API test infrastructure와 Docker CI 구축, 로컬 실행·온보딩 문서 정비로 재현 가능한 개발 환경 구성</>,
              ]}
            />
          </article>
        </div>
      </Sec>

      <Sec id="s5" no="05" title="경력" meta="Career">
        <NumberedList className="border-t border-border-soft">
          <CareerRow org="MediSolve AI" now period="2025.04 —">
            <span className="mb-1 block text-fg-2">Backend Engineer · 기업부설연구소장 · Tech Lead·PO 역할 병행</span>
            <PlainList
              items={[
                <>AI 콘텐츠 생성 backend 전면 재구축과 cutover 이후 개발·운영 전담 — QA 버그 재발률(해결 대비 reopen) <strong>37% → 11%</strong>, 월 수만 건 규모를 30일 기준 <strong>HTTP 5xx 0.3% 수준</strong>으로 운영</>,
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
            SellerCanvas(생성형 AI 커머스 콘텐츠)의 PM 메인 역할로 제품 시스템 기획·구축 — AI Engineer → PM → Backend Engineer
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
            <>Served as the <strong>primary PM</strong> for a CES 2024 Best of Innovation-winning product; hold one registered patent</>,
          ]}
        />
      </Sec>

      <Sec no="02" title="How I Work">
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

      <Sec no="03" title="Skills">
        <KeyValueRows items={SKILLS_EN} />
      </Sec>

      <Sec no="04" title="Selected Projects">
        <div className="grid gap-5">
          <article>
            <h3 className="m-0 mb-2 font-mono text-base font-semibold">
              Thready <span className="text-sm font-normal text-muted">· AI content generation product</span>
            </h3>
            <PlainList
              items={[
                <>Inherited a generation backend built quickly with AI tools and difficult-to-control recurring issues; made and defended the decision to rebuild it while the service was still small, then completed discovery through rebuild in <Metric>36 work hours</Metric> with an AI collaboration harness</>,
                <>Reduced the QA reopen rate (resolved-to-reopened) from <strong>37% to 11%</strong>; daily reopen incidence fell by <Metric>~94%</Metric></>,
                <>Introduced FastAPI as a separate backend based on planned AI-module expansion (keeping Next.js on the frontend); owned development and operations after cutover, serving tens of thousands of monthly requests at <Metric>~0.3% HTTP 5xx</Metric></>,
                <>Split generation-quality judgement into <strong>three layers</strong> — automated gates, measured-distribution checks, human review — and validated prompt rules against a corpus I collected myself; refuted approaches are kept on record to prevent retries</>,
                <>Found that a quality baseline we had trusted as measured was actually <strong>feeding on our own output</strong> — breaking the loop and rebuilding the baseline also surfaced an error in the problem definition itself</>,
              ]}
            />
          </article>
          <article>
            <h3 className="m-0 mb-2 font-mono text-base font-semibold">
              Centurion{" "}
              <span className="text-sm font-normal text-muted">
                · AI medical platform for dermatology operations, built from product inception
              </span>
            </h3>
            <PlainList
              items={[
                <>Led order/inventory APIs, RabbitMQ/TaskIQ async workers and retry — moved failure-prone work (orders, payments) outside the API boundary <strong>from product inception</strong> as preventive design</>,
                <>Migrated async processing <strong>from Celery to TaskIQ + RabbitMQ</strong> and split notification delivery into its own domain</>,
                <>Built API test infrastructure and Docker CI, and set up local-run and onboarding docs for a reproducible dev environment</>,
              ]}
            />
          </article>
        </div>
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
            Primary PM for SellerCanvas (generative-AI commerce content); planned and built the systems that kept the product running — AI Engineer to PM to Backend Engineer
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
