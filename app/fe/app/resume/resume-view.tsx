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

/* ⚠️ 콘텐츠 임시 수동 사본 — canonical 은 wiki/products/resume/master/v2/content.md.
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
  { id: "s2", ko: "핵심 역량" },
  { id: "s3", ko: "기술" },
  { id: "s4", ko: "대표 프로젝트" },
  { id: "s5", ko: "경력" },
  { id: "s6", ko: "일하는 방식" },
  { id: "s7", ko: "credentials" },
];

const SKILLS = [
  { k: "Language / FW", v: "Python, FastAPI, TypeScript, NestJS, Java, Spring Boot" },
  { k: "Data / Messaging", v: "PostgreSQL, MySQL, Redis, RabbitMQ, TaskIQ" },
  { k: "Infra / Delivery", v: "Azure, AWS, Terraform, Docker, GitHub Actions" },
  {
    k: "AI Product",
    v: "LLM integration/evaluation, typed prompt, structured output, WebSocket, SSE, STT",
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
          AI 제품을 운영 가능한 시스템으로 만드는 백엔드 엔지니어
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
            <>Vision AI로 시작해 <Metric>6년째 AI 제품</Metric>을 만들어온 백엔드 엔지니어 — AI 엔지니어·PM을 거쳐 제품을 끝까지 책임지는 층으로 백엔드를 선택</>,
            <>AI 도구로 빠르게 구축된 생성 backend를 <strong>전면 재구축</strong>해 QA 버그 재발률을 <Metric>37%에서 11%로</Metric> 낮추고, 월 수만 건 규모 요청을 <Metric>HTTP 5xx 0.3% 수준</Metric>으로 운영</>,
            <>CES 2024 Best of Innovation <strong>수상 제품의 PM 메인 역할</strong>과 특허 등록 1건</>,
            <>Backend Engineer 합류 후 <strong>Tech Lead·PO 역할 병행</strong></>,
            <>스펙·이슈·릴리스 게이트를 agent가 읽고 실행하는 <strong>agent-readable workflow</strong>를 설계·리드</>,
          ]}
        />
      </Sec>

      <Sec id="s2" no="02" title="핵심 역량" meta="Core Capabilities">
        <CardGrid cols={2}>
          <CapCard title="AI Product Systems">
            typed prompt builder, LLM judge, 평가 루프, 관측 로깅 기반 생성 품질 시스템 구축
          </CapCard>
          <CapCard title="Product Backend Ownership">
            주문·재고 API와 RabbitMQ·TaskIQ worker, retry·test·CI·onboarding 구축 주도, 병원 product monorepo service boundary·migration·domain audit 주도
          </CapCard>
          <CapCard title="Async & Realtime">
            실패 가능한 작업을 API 경계 밖 worker로 분리하고 retry 가능한 비동기 흐름 구축 주도, realtime session lifecycle과 provider 경계 안정화 공동 주 기여
          </CapCard>
          <CapCard title="Infra-Aware Delivery">
            회사 Azure/Terraform infra 전반 담당 — 환경별 resource boundary, 배포, runbook / 외부 product IaC 전담
          </CapCard>
          <CapCard title="Engineering Standard">
            layered architecture·DI·ADR·convention·runbook 기반 조직 표준 FastAPI template 설계·구축 전담
          </CapCard>
          <CapCard title="Agent-Readable Operations">
            pipeline registry·release gate 기반 제품팀 운영과 릴리스 노트 자동화 리드, daily briefing agent 구축·운영
          </CapCard>
        </CardGrid>
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
                <>typed prompt builder, LLM judge, 평가 루프, 관측 로깅 기반 생성 품질 시스템 구축</>,
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
                <>주문·재고 API와 RabbitMQ·TaskIQ 비동기 worker, retry, test·CI·onboarding 구축 주도</>,
                <>realtime AI 상담 backend의 세션 lifecycle과 provider 경계 안정화 공동 주 기여</>,
              ]}
            />
          </article>
          <article>
            <h3 className="m-0 mb-2 font-mono text-base font-semibold">
              BE Template <span className="text-sm font-normal text-muted">· Engineering Standard</span>
            </h3>
            <PlainList
              items={[
                <><strong>소수 백엔드 인원이 다수 제품을 담당하는 체제</strong>에서 조직 표준 FastAPI template 설계·구축 전담 — 어떤 프로젝트든 정책 파악만으로 대응 가능하게 하고 logging·모니터링 등 횡단 관심사를 전 제품에 일괄 반영</>,
                <>agent context system과 반복 작업 automation skill 내장</>,
                <>FE 엔지니어도 패턴·규약·하네스 아래에서 BE 로직을 구현할 수 있도록 지원</>,
              ]}
            />
          </article>
        </div>
      </Sec>

      <Sec id="s5" no="05" title="경력" meta="Career">
        <NumberedList className="border-t border-border-soft">
          <CareerRow org="MediSolve AI" now period="2025.04 —">
            AI product backend와 제품 운영·engineering standard 담당, Tech Lead·PO 역할 병행
          </CareerRow>
          <CareerRow org="더데이랩스" period="2025.02 — 2025.04">
            현 MediSolve AI 대표와 프리랜서로 협업 시작 — Centurion 초기 backend 구축과 개발팀 시스템·기준 수립, 창업과 함께 합류
          </CareerRow>
          <CareerRow org="Memento AI" period="2024.10 — 2025.01">
            예약·결제 backend의 Stripe 선결제 도입과 환불·마일리지·티켓 rollback 안정화 — 회사 폐업으로 재직 종료
          </CareerRow>
          <CareerRow org="TellingMe" period="2024.01 — 2024.12">
            개인 프로젝트 · Spring Boot backend와 AWS 배포·모니터링 리드 (Memento 재직과 병행)
          </CareerRow>
          <CareerRow org="STUDIO LAB" period="2021.12 — 2024.01">
            SellerCanvas(생성형 AI 커머스 콘텐츠, CES 2024 최고혁신상 제품)의 PM 메인 역할로 제품 시스템 기획·구축
          </CareerRow>
          <CareerRow org="아이즈솔" period="2020.08 — 2021.06">
            Vision AI에서 시작한 AI product engineering 경력
          </CareerRow>
        </NumberedList>
      </Sec>

      <Sec id="s6" no="06" title="일하는 방식" meta="Agent Workflow">
        <PlainList
          items={[
            <>AI agent를 코드 자동완성보다 <strong>engineering operating layer</strong>로 활용</>,
            <>project rules와 source-of-truth routing을 사람과 agent가 함께 읽는 실행 경계로 구성</>,
            <>스펙·이슈·릴리스 게이트를 agent가 읽고 실행하고, 릴리스 노트 자동화로 버전 관리</>,
            <>daily briefing agent로 협업 도구 활동 집계와 blocker triage 지원</>,
          ]}
        />
      </Sec>

      <Sec id="s7" no="07" title="학력·교육 / 수상·특허·자격" meta="Credentials">
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
          Backend engineer who turns AI products into reliable production systems.
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
            <>Started in Vision AI and have spent <Metric>six years building AI products</Metric>, moving through AI engineering and PM before choosing backend as the layer that owns products end to end</>,
            <>Rebuilt an AI content generation backend <strong>end to end</strong>, lowering QA reopen rate from <Metric>37% to 11%</Metric>; own development and operations since cutover while serving tens of thousands of monthly requests at <Metric>~0.3% HTTP 5xx</Metric></>,
            <>Served as the <strong>primary PM</strong> for a CES 2024 Best of Innovation-winning product; hold one registered patent</>,
            <>Joined as a Backend Engineer, while also serving as <strong>Tech Lead and Product Owner</strong></>,
            <>Designed and lead an <strong>agent-readable workflow</strong> where AI agents read specs, execute issues, and gate releases</>,
          ]}
        />
      </Sec>

      <Sec no="02" title="Core Capabilities">
        <CardGrid cols={2}>
          <CapCard title="AI Product Systems">
            Built a generation quality system — typed prompt builder, LLM judge, evaluation loop, observability logging
          </CapCard>
          <CapCard title="Product Backend Ownership">
            Led order/inventory APIs, RabbitMQ/TaskIQ workers, retry, test/CI/onboarding; led service boundaries, migrations, and domain audits in a hospital product monorepo
          </CapCard>
          <CapCard title="Async & Realtime">
            Separated failure-prone operations from the API boundary into retryable background workers; co-led realtime session lifecycle and provider-boundary stabilization
          </CapCard>
          <CapCard title="Infra-Aware Delivery">
            Own company-wide Azure/Terraform infrastructure — per-environment resource boundaries, deployment, runbooks; built external product IaC as the sole engineer
          </CapCard>
          <CapCard title="Engineering Standards">
            Designed and built the org-standard FastAPI template as the sole engineer — layered architecture, DI, ADR, conventions
          </CapCard>
          <CapCard title="Agent-Readable Operations">
            Lead product operations on a pipeline registry and release gates, including automated release notes; built and operate a daily briefing agent
          </CapCard>
        </CardGrid>
      </Sec>

      <Sec no="03" title="Skills">
        <KeyValueRows items={SKILLS} />
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
                <>Built the generation quality system — typed prompt builder, LLM judge, evaluation loop, observability logging</>,
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
                <>Led order/inventory APIs, RabbitMQ/TaskIQ async workers, retry, and test/CI/onboarding setup</>,
                <>Co-led session lifecycle and provider-boundary stabilization for a realtime AI consultation backend</>,
              ]}
            />
          </article>
          <article>
            <h3 className="m-0 mb-2 font-mono text-base font-semibold">
              BE Template <span className="text-sm font-normal text-muted">· Engineering standard</span>
            </h3>
            <PlainList
              items={[
                <>In an environment where a <strong>small backend team supports many products</strong>, solely designed and built the org-standard FastAPI template — layered architecture, DI, ADR, conventions, runbooks; made project onboarding policy-driven and applied cross-cutting logging and monitoring consistently</>,
                <>Embedded an agent context system and automation skills for repetitive work</>,
                <>Enabled frontend engineers to implement backend logic within shared patterns, conventions, and harnesses</>,
              ]}
            />
          </article>
        </div>
      </Sec>

      <Sec no="05" title="Career">
        <NumberedList className="border-t border-border-soft">
          <CareerRow org="MediSolve AI" now period="Apr 2025 —">
            AI product backend, product operations, engineering standards; also serving as Tech Lead and Product Owner
          </CareerRow>
          <CareerRow org="TheDayLabs" period="Feb — Apr 2025">
            Began working with MediSolve AI&apos;s founder as a freelancer — started Centurion&apos;s early backend and set up the new dev team&apos;s systems and standards
          </CareerRow>
          <CareerRow org="Memento AI" period="Oct 2024 — Jan 2025">
            Introduced Stripe prepayment and stabilized refund, mileage, and ticket rollback flows; role ended when the company ceased operations
          </CareerRow>
          <CareerRow org="TellingMe" period="Jan — Dec 2024">
            Side project · Led the Spring Boot backend and AWS deployment/monitoring (concurrent with Memento)
          </CareerRow>
          <CareerRow org="STUDIO LAB" period="Dec 2021 — Jan 2024">
            Primary PM for SellerCanvas (generative-AI commerce content, CES 2024 Best of Innovation); planned and built the systems that kept the product running
          </CareerRow>
          <CareerRow org="아이즈솔" period="2020.08 — 2021.06">
            Started in AI product engineering with Vision AI
          </CareerRow>
        </NumberedList>
      </Sec>

      <Sec no="06" title="Agent Workflow">
        <PlainList
          items={[
            <>Uses AI agents as an <strong>engineering operating layer</strong>, not code autocomplete</>,
            <>Composes project rules and source-of-truth routing that humans and agents read together</>,
            <>Agents read and execute specs, issues, and release gates; automated release notes support version management</>,
            <>Built a daily briefing agent that aggregates collaboration-tool activity for blocker triage</>,
          ]}
        />
      </Sec>

      <Sec no="07" title="Education & Credentials">
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
