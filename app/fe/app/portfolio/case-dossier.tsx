import Image from "next/image";
import type { ReactNode } from "react";
import type { CaseMeta } from "@/lib/cases";
import { AzureArchitectureDiagram } from "./azure-architecture-diagram";

function CaseHeader({
  meta,
  summary,
  displayNo,
  focus,
}: {
  meta: CaseMeta;
  summary: ReactNode;
  displayNo?: string;
  focus?: string;
}) {
  return (
    <header>
      <div className="flex items-baseline justify-between gap-6 font-mono text-xs text-muted max-sm:grid max-sm:gap-1">
        <span>{displayNo ?? meta.no} · {meta.tag}</span>
        <span>{meta.role}</span>
      </div>
      <h2 className="m-0 mt-4 text-[clamp(1.8rem,3.6vw,3.25rem)] font-semibold leading-[1.12] tracking-[-0.04em] text-balance">
        {meta.name}
      </h2>
      <p className="m-0 mt-6 max-w-4xl text-lg leading-[1.72] text-fg-2 text-pretty [&_strong]:font-semibold [&_strong]:text-fg">
        {summary}
      </p>
      {focus ? (
        <div className="mt-7 grid grid-cols-[170px_minmax(0,1fr)] gap-6 border-y border-border py-4 max-sm:grid-cols-1 max-sm:gap-1">
          <span className="font-mono text-xs text-muted">이 버전에서 보는 지점</span>
          <strong className="text-sm leading-[1.6]">{focus}</strong>
        </div>
      ) : null}
    </header>
  );
}

function Subhead({
  children,
  note,
  noteClassName,
}: {
  children: ReactNode;
  note?: string;
  noteClassName?: string;
}) {
  return (
    <div className="portfolio-subhead flex items-end justify-between gap-6 border-b border-border pb-3 max-sm:grid max-sm:gap-1">
      <h3 className="m-0 text-xl font-semibold tracking-[-0.02em] text-balance">
        {children}
      </h3>
      {note ? (
        <span className={`shrink-0 font-mono text-xs text-muted ${noteClassName ?? ""}`}>
          {note}
        </span>
      ) : null}
    </div>
  );
}

function ThreadyCase({
  meta,
  displayNo,
  focus,
}: {
  meta: CaseMeta;
  displayNo?: string;
  focus?: string;
}) {
  return (
    <article id={`case-${meta.slug}`} className="portfolio-case scroll-mt-6 border-t-2 border-fg pt-10">
      <CaseHeader
        meta={meta}
        displayNo={displayNo}
        focus={focus}
        summary={
          <>
            콘텐츠 제작 고객의 문제를 기능·품질 기준으로 바꾸고, 기획·QA·마케팅과 함께
            실제 유료 운영 단계까지 제품을 이끌었습니다. Next.js 핵심 흐름을 직접 구현하고,
            빠른 기능 검증 중심의 초기 백엔드를 인계받아 팀이 운영할 수 있는 FastAPI
            구조로 재구축했습니다. 이어 제품 원장과 AI 실행 상태의 소유권을 분리했습니다.
            제품의
            <strong> 월 구독료 매출은 2026년 8월 기준 약 800만~1,000만원</strong>입니다.
          </>
        }
      />

      <section className="pt-10">
        <Subhead note="PRODUCT · RUNTIME ARCHITECTURE">제품 운영과 실제 실행 환경을 한 구조로 연결했습니다.</Subhead>
        <figure className="portfolio-keep m-0 mt-6">
          <a
            href="/portfolio/thready-product-runtime-architecture-v2.svg"
            target="_blank"
            rel="noreferrer"
            aria-label="Thready 제품 런타임과 배포 운영 아키텍처 원본 크게 보기"
            className="hidden border border-border bg-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-fg md:block print:block print:border-0"
          >
            <Image
              src="/portfolio/thready-product-runtime-architecture-v2.svg"
              alt="사용자 브라우저에서 Vercel Next.js, Azure FastAPI 제품 API와 PostgreSQL·Object Storage, 외부 콘텐츠 API, 구현·STG 검증한 AI application·DB, GitHub Actions 배포와 관측 경계를 연결한 Thready reference architecture"
              width={1774}
              height={1050}
              loading="eager"
              unoptimized
              sizes="(max-width: 1024px) calc(100vw - 48px), 1124px"
              className="block h-auto w-full print:mx-auto print:w-[94%]"
            />
          </a>
          <ol className="m-0 grid list-none border-y border-border p-0 md:hidden print:hidden">
            {[
              ["사용자 경로", "Browser → Next.js / Vercel → FastAPI Product API"],
              ["제품 원장", "PostgreSQL · Object Storage · 외부 콘텐츠 API"],
              ["AI 경계", "인증된 HTTP · 별도 AI application / DB · STG 검증"],
              ["배포·운영", "GitHub Actions · Container Registry · Azure · observability"],
            ].map(([label, value]) => (
              <li key={label} className="grid grid-cols-[76px_minmax(0,1fr)] gap-3 border-b border-border-soft py-4 last:border-b-0">
                <strong className="font-mono text-xs text-muted">{label}</strong>
                <span className="text-sm leading-[1.6] text-fg-2">{value}</span>
              </li>
            ))}
          </ol>
          <figcaption className="border-b border-border px-1 pb-5 pt-4 text-sm leading-[1.7] text-fg-2">
            <span className="flex items-center justify-between gap-4 font-mono text-xs text-muted">
              <span>THREADY · PRODUCT &amp; RUNTIME ARCHITECTURE</span>
              <a
                href="/portfolio/thready-product-runtime-architecture-v2.svg"
                target="_blank"
                rel="noreferrer"
                className="shrink-0 underline decoration-border underline-offset-4 hover:text-fg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-fg print:hidden"
              >
                원본 크게 보기 ↗
              </a>
            </span>
            <span className="mt-2 block">
              사용자 화면은 Vercel의 Next.js가, 제품 정책과 원장은 Azure App Service의
              FastAPI backend와 PostgreSQL이 소유합니다. AI 실행부는 별도 application·DB로
              분리해 인증된 HTTP로 연결하고, 원장 변경은 같은 transaction의 Outbox와
              retry·delivery version fence로 전달했습니다. FE·제품 backend 경로는 현재 운영,
              AI 분리 경계는 구현·STG 검증 범위입니다.
            </span>
          </figcaption>
        </figure>
        <dl className="portfolio-keep m-0 mt-5 grid grid-cols-3 border-y border-border max-md:grid-cols-1 print:grid-cols-3">
          {[
            ["리드", "제품 운영 · 우선순위 · 품질 · QA · 릴리스"],
            ["직접 구현", "Next.js · FastAPI · 데이터 · AI"],
            ["팀 협업", "기획 · QA · 마케팅 · 디자인"],
          ].map(([label, value], index) => (
            <div
              key={label}
              className={`min-w-0 px-5 py-4 ${index > 0 ? "border-l border-border max-md:border-l-0 max-md:border-t print:border-l print:border-t-0" : ""}`}
            >
              <dt className="font-mono text-xs font-semibold text-fg">{label}</dt>
              <dd className="m-0 mt-2 text-xs leading-[1.6] text-fg-2">{value}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="pt-12">
        <Subhead note="콘텐츠 데이터">공개 콘텐츠 분석을 제품 판단과 생성·평가 실험에 연결했습니다.</Subhead>
        <div className="mt-5 grid grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-x-10 max-md:grid-cols-1">
          <div className="border-b border-border py-5">
            <strong className="block text-base">라벨링 도구</strong>
            <p className="m-0 mt-2 text-sm leading-[1.65] text-fg-2">Threads 공개 게시글과 작성자의 이어쓰기를 독립된 라벨링 영역으로 정리했습니다. 같은 자료를 다시 가져와도 중복되지 않는 가져오기 도구와 API·평가 화면을 함께 만들었습니다.</p>
          </div>
          <div className="border-b border-border py-5">
            <strong className="block text-base">잘되는 글의 기준</strong>
            <p className="m-0 mt-2 text-sm leading-[1.65] text-fg-2">최근 1년 내 게시된 콘텐츠를 중심으로 첫 문장·구조·어체·마무리의 관측 기준을 만들었습니다. 이 기준은 글 생성 프롬프트와 평가 실험에 반영해 결과를 비교했습니다.</p>
          </div>
        </div>
      </section>

      <section className="pt-12">
        <Subhead note="백엔드 재구축">인계받은 초기 백엔드를 팀이 운영할 수 있는 FastAPI 구조로 재구축했습니다.</Subhead>
        <div className="mt-6 grid grid-cols-[minmax(0,0.92fr)_minmax(360px,1.08fr)] gap-10 max-lg:grid-cols-1">
          <div className="grid content-start gap-5 text-sm leading-[1.7] text-fg-2">
            <p className="m-0"><strong className="text-fg">무엇이 문제였나</strong> · 인계받은 초기 백엔드는 빠른 기능 검증 중심으로 만들어져 있었습니다. 기능은 돌아갔지만 어떤 코드가 무엇을 책임지는지, 수정 영향이 어디까지 퍼지는지 설명하기 어려웠습니다.</p>
            <p className="m-0"><strong className="text-fg">어떻게 풀었나</strong> · 기존 API와 기능을 먼저 목록으로 만들고, 현재 동작을 확인할 테스트와 검증 기준을 세웠습니다. 프론트엔드는 그대로 둔 채 새 백엔드를 옆에서 만들었고, AI는 코드 분석과 반복 구현에 활용했습니다. 아키텍처와 검증 기준, 작업 범위, 전환 시점은 직접 판단했습니다.</p>
            <p className="m-0"><strong className="text-fg">무엇이 달라졌나</strong> · 기존 백엔드와 새 백엔드의 응답을 비교한 뒤 전환했습니다. 전환 전후 같은 기준으로 비교했을 때, 해결된 QA 항목의 재오픈 비율은 26%p 낮아졌습니다. 이후 배포와 운영도 계속 맡았습니다.</p>
          </div>
          <div className="portfolio-keep border border-border bg-surface p-5 print:bg-transparent">
            <p className="m-0 font-mono text-xs text-muted">기존 서비스와 나란히 만든 뒤 전환</p>
            <div className="mt-5 grid gap-3">
              {[
                ["유지", "기존 API", "사용자 흐름은 그대로"],
                ["정리", "기능 목록", "기존 동작과 응답 확인"],
                ["재구축", "FastAPI 백엔드", "AI로 분석·반복 구현 보조"],
              ].map(([label, title, desc]) => (
                <div key={label} className="grid grid-cols-[70px_minmax(0,1fr)_minmax(0,0.9fr)] items-center gap-4 border-b border-border bg-bg px-4 py-3 last:border-b-0 max-sm:grid-cols-[56px_minmax(0,1fr)] max-sm:gap-x-3 max-sm:gap-y-1">
                  <span className="font-mono text-xs text-muted">{label}</span>
                  <strong className="text-sm">{title}</strong>
                  <span className="text-xs text-fg-2 max-sm:col-start-2">{desc}</span>
                </div>
              ))}
            </div>
            <div className="mt-4 grid grid-cols-[1fr_auto_1fr] items-center gap-3 text-center">
              <span className="border-y border-border py-3 text-xs">기존·신규 동작 비교</span>
              <span aria-hidden className="font-mono text-muted">→</span>
              <strong className="bg-fg py-3 text-xs text-bg print:border print:border-fg print:bg-transparent print:text-fg">전환 결정</strong>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-16 pt-12">
        <Subhead note="BE–AI 분리 설계">제품 원장과 AI 실행을 나누고, 중복·지연·역순 전달에도 최신 상태로 수렴하도록 설계했습니다.</Subhead>
        <ol className="portfolio-keep m-0 mt-6 grid list-none grid-cols-4 border-y border-border p-0 max-lg:grid-cols-2 max-sm:grid-cols-1 print:grid-cols-4">
          {[
            ["01 · OWNER TX", "원장 변경 + Outbox", "제품 원장 변경과 전달할 event를 같은 transaction에 기록"],
            ["02 · RELAY", "retry", "일시적인 전달 실패는 원장 transaction과 분리해 다시 시도"],
            ["03 · VERSION FENCE", "최신 상태 보호", "늦거나 역순인 변경이 더 최신 상태를 덮지 않도록 차단"],
            ["04 · AI STATE", "별도 application · DB", "생성 lifecycle과 실행 상태는 AI 경계가 소유"],
          ].map(([step, title, desc], index) => (
            <li
              key={step}
              className={`min-w-0 p-5 print:p-3 ${index > 0 ? "border-l border-border max-sm:border-l-0 max-sm:border-t print:border-l print:border-t-0" : ""} ${index === 2 ? "max-lg:border-l-0 max-lg:border-t max-sm:border-l-0 print:border-l print:border-t-0" : ""}`}
            >
              <span className="font-mono text-xs text-muted">{step}</span>
              <strong className="mt-3 block text-sm">{title}</strong>
              <span className="mt-2 block text-xs leading-[1.6] text-fg-2">{desc}</span>
            </li>
          ))}
        </ol>
        <div className="mt-6 grid grid-cols-[180px_minmax(0,1fr)] gap-6 border-y border-border py-5 max-sm:grid-cols-1 max-sm:gap-2">
          <strong className="font-mono text-sm">데이터 이전 검증</strong>
          <p className="m-0 text-sm leading-[1.65] text-fg-2">STG의 생성 이력 2,616건·품질 기록 795건·실행 추적 7,111건을 로컬에 복원해 이관 리허설을 진행했습니다. 이후 행 수와 MD5 fingerprint, 참조 누락, API 동작을 확인했습니다.</p>
        </div>
      </section>
    </article>
  );
}

function CenturionCase({
  meta,
  displayNo,
  focus,
}: {
  meta: CaseMeta;
  displayNo?: string;
  focus?: string;
}) {
  const contributions = [
    ["주문·재고", "구축 주도", "API 요청과 후속 작업을 나누고, 실패 기록·재시도·수동 복구 기능을 만들었습니다."],
    ["실시간 AI 상담", "공동 개발", "DELTA→COMPLETE 전사 흐름과 session lifecycle을 나누고, 도메인 키워드 우선 판정·sequence guard·재연결 정리를 구현했습니다."],
    ["DAY 예약 정책", "연결 주도", "예약 정책을 백엔드 판단부터 프론트엔드 표시·QA·릴리스까지 같은 기준으로 연결했습니다."],
    ["시설·재고·공통 인증", "주요 기능 개발", "재고 연동이 실패해도 시술 완료가 취소되지 않도록 작업을 분리했습니다."],
  ];

  return (
    <article id={`case-${meta.slug}`} className="portfolio-case scroll-mt-6 border-t-2 border-fg pb-16 pt-10">
      <CaseHeader
        meta={meta}
        displayNo={displayNo}
        focus={focus}
        summary={
          <>
            병원 운영 플랫폼에는 예약·주문·재고처럼 즉시 저장해야 하는 업무,
            실패하면 다시 실행해야 하는 후속 작업, 연결을 유지해야 하는 실시간 상담이
            함께 있습니다. 하나의 패턴을 모든 서비스에 강요하지 않고, <strong>각 서비스가
            저장할 데이터와 복구할 작업</strong>을 따로 정했습니다.
          </>
        }
      />

      <section className="pt-10">
        <Subhead note="담당 범위">어디까지 맡았는지</Subhead>
        <div className="portfolio-keep mt-6 border-y border-border py-6">
          <div className="mx-auto grid w-fit gap-2 text-center">
            <div className="border border-border px-6 py-3 text-sm font-semibold">Express API Gateway</div>
            <span aria-hidden className="font-mono text-muted">↓</span>
            <div className="border border-border px-6 py-3 text-sm font-semibold">NestJS SSO</div>
          </div>
          <div className="mt-6 grid grid-cols-3 border border-border max-md:grid-cols-1">
            {[
              ["연결 주도", "DAY / CRM", "Backend · Frontend · QA · Release"],
              ["주도", "주문 / 재고", "RabbitMQ · TaskIQ"],
              ["공동 개발", "실시간 AI 상담", "WebSocket · 외부 AI 연동"],
            ].map(([role, title, desc], index) => (
              <div key={title} className={`p-5 ${index > 0 ? "border-l border-border max-md:border-l-0 max-md:border-t" : ""}`}>
                <span className="font-mono text-xs text-muted">{role}</span>
                <h4 className="m-0 mt-3 text-base font-semibold">{title}</h4>
                <p className="m-0 mt-2 text-sm text-fg-2">{desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-3 grid grid-cols-[180px_minmax(0,1fr)] gap-5 border-y border-border-soft px-4 py-3 text-sm max-sm:grid-cols-1 max-sm:gap-1">
            <span className="font-mono text-xs text-muted">기여</span>
            <span>시설·재고 연동 · 여러 서비스의 로그인 세션 정책</span>
          </div>
        </div>
      </section>

      <section className="pt-10">
        <Subhead note="구현 내용">서비스별로 해결한 문제</Subhead>
        <div className="mt-5 border-t border-border">
          {contributions.map(([service, role, decision]) => (
            <div key={service} className="portfolio-row grid grid-cols-[170px_150px_minmax(0,1fr)] gap-5 border-b border-border py-5 text-sm leading-[1.6] max-md:grid-cols-[150px_minmax(0,1fr)] max-sm:grid-cols-1 max-sm:gap-1">
              <strong>{service}</strong>
              <span className="font-mono text-xs text-muted">{role}</span>
              <span className="text-fg-2 max-md:col-span-2 max-sm:col-span-1">{decision}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="portfolio-keep pt-10">
        <Subhead note="비동기 작업">주문은 끝내고, 실패한 후속 작업만 다시 돌리게 했습니다.</Subhead>
        <div className="portfolio-keep mt-6 grid grid-cols-[1fr_auto_1fr_auto_1.15fr] items-stretch gap-3 max-lg:grid-cols-1 print:grid-cols-[1fr_auto_1fr_auto_1.15fr]">
          <div className="border-y border-border p-5 print:p-3">
            <span className="font-mono text-xs text-muted">API</span>
            <strong className="mt-3 block">주문 상태 저장</strong>
            <p className="m-0 mt-2 text-sm text-fg-2">사용자 요청은 여기서 완료</p>
          </div>
          <span aria-hidden className="grid place-items-center font-mono text-muted max-lg:rotate-90 print:rotate-0">→</span>
          <div className="border-y border-border p-5 print:p-3">
            <span className="font-mono text-xs text-muted">메시지 큐</span>
            <strong className="mt-3 block">RabbitMQ</strong>
            <p className="m-0 mt-2 text-sm text-fg-2">후속 작업을 워커로 전달</p>
          </div>
          <span aria-hidden className="grid place-items-center font-mono text-muted max-lg:rotate-90 print:rotate-0">→</span>
          <div className="border border-fg p-5 print:p-3">
            <span className="font-mono text-xs text-muted">작업 처리</span>
            <strong className="mt-3 block">TaskIQ</strong>
            <p className="m-0 mt-2 text-sm leading-[1.55] text-fg-2">성공 · 재시도 · 최종 실패를 기록하고 필요하면 수동 복구</p>
          </div>
        </div>
      </section>

      <section className="portfolio-signal-section pt-10 print:pt-0">
        <Subhead note="SAY · REALTIME ARCHITECTURE">실시간 상담의 진입·전사·생성·종료 경계를 한 구조로 묶었습니다.</Subhead>
        <p className="m-0 mt-5 max-w-[920px] text-sm leading-[1.7] text-fg-2">
          Gateway와 SSO를 거친 상담 연결은 WebSocket session orchestrator가 관리합니다.
          STT에서 나온 중간 전사 DELTA는 도메인 키워드를 먼저 확인하는 데 사용하고,
          COMPLETE는 확정 문맥과 저장에 사용합니다. 상담 종료 뒤에는 timer·GC·shutdown의
          정리 책임을 stop guard로 모았습니다.
        </p>

        <figure className="portfolio-keep m-0 mt-6 border-y border-border py-6 print:mt-3 print:py-2">
          <a
            href="/portfolio/centurion-say-realtime-architecture-v2.svg"
            target="_blank"
            rel="noreferrer"
            aria-label="SAY 실시간 AI 상담 reference architecture 원본 크게 보기"
            className="hidden md:block print:block"
          >
            <Image
              src="/portfolio/centurion-say-realtime-architecture-v2.svg"
              alt="Express API Gateway와 NestJS SSO를 거쳐 WebSocket session orchestrator, STT adapter, event와 판단 pipeline, AI 조언과 client event로 이어지고 DELTA·COMPLETE·optional CORRECTED 및 stop guard를 확대 영역으로 보여주는 SAY 실시간 AI 상담 reference architecture"
              width={1774}
              height={1050}
              loading="eager"
              unoptimized
              sizes="(max-width: 1024px) calc(100vw - 48px), 960px"
              className="block h-auto w-full print:mx-auto print:w-[90%]"
            />
          </a>
          <ol className="m-0 grid list-none border-y border-border p-0 md:hidden print:hidden">
            {[
              ["진입", "상담 화면 → Express Gateway → NestJS SSO → WebSocket session"],
              ["전사", "STT adapter → VAD / DELTA / COMPLETE event"],
              ["반응", "DELTA keyword match → 상담 중 조언 생성 시작"],
              ["종료", "COMPLETE / context · optional same-sequence correction · stop guard"],
            ].map(([label, value]) => (
              <li key={label} className="grid grid-cols-[56px_minmax(0,1fr)] gap-3 border-b border-border-soft py-4 last:border-b-0">
                <strong className="font-mono text-xs text-muted">{label}</strong>
                <span className="text-sm leading-[1.6] text-fg-2">{value}</span>
              </li>
            ))}
          </ol>
          <figcaption className="mt-5 grid grid-cols-[190px_minmax(0,1fr)] gap-6 border-t border-border pt-5 max-sm:grid-cols-1 max-sm:gap-2 print:mt-3 print:grid-cols-[150px_minmax(0,1fr)] print:gap-4 print:pt-3">
            <div>
              <span className="block font-mono text-xs text-muted">SAY · REALTIME AI CONSULTATION ARCHITECTURE</span>
              <a
                href="/portfolio/centurion-say-realtime-architecture-v2.svg"
                target="_blank"
                rel="noreferrer"
                className="mt-2 inline-block text-xs font-medium text-fg underline decoration-border underline-offset-4 print:hidden"
              >
                원본 크게 보기 ↗
              </a>
            </div>
            <div>
              <p className="m-0 text-sm leading-[1.65] text-fg-2">
                상담 요청은 Gateway·SSO와 WebSocket session lifecycle을 거쳐 STT·판단·AI 조언
                경로로 이어집니다. DELTA는 같은 발화의 최신 중간 전사로 교체하고 키워드가
                확인되면 생성을 먼저 시작하며, COMPLETE만 확정 문맥과 저장에 사용합니다.
                선택적 보정은 같은 sequence만 교체하고, 종료 뒤에는 stop guard가 재연결을 막습니다.
              </p>
              <p className="m-0 mt-3 text-sm leading-[1.65] text-fg-2">
                Provider 차이는 adapter 뒤로 격리하고, benchmark·E2E replay·회귀 테스트를
                runtime 밖의 검증 경계로 뒀습니다. 전체 구조의 단독 구축이 아니라 실시간 상담
                cluster의 공동 주 기여 범위입니다.
              </p>
              <p className="m-0 mt-3 font-mono text-xs leading-[1.55] text-muted">
                4분 37초 E2E · DELTA 586 · COMPLETE 25 · ADVICE 14 · sequence 1—25 누락·중복 없음
              </p>
            </div>
          </figcaption>
        </figure>

        <div className="portfolio-keep mt-8 grid grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] gap-10 border-y border-border py-6 max-md:grid-cols-1 max-md:gap-5 print:mt-3 print:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] print:gap-6 print:py-3">
          <div>
            <span className="font-mono text-xs text-muted">SESSION LIFECYCLE</span>
            <h4 className="m-0 mt-2 text-base font-semibold">상담이 끝난 뒤 다시 연결되던 세션을 멈췄습니다.</h4>
          </div>
          <div>
            <p className="m-0 text-sm leading-[1.65] text-fg-2">
              WebSocket 종료 뒤 reconnect timer가 남아 외부 AI 연결이 다시 살아나는 경로를
              재현했습니다. pause·complete·timeout·GC·shutdown의 정리 책임을 나누고,
              재연결 진입 전과 backoff 이후에 stop guard를 두었습니다.
            </p>
            <p className="m-0 mt-3 font-mono text-xs leading-[1.55] text-muted">
              reconnect race 8개 · GC TTL 5개 — 13개 회귀 시나리오로 고정
            </p>
          </div>
        </div>
      </section>

    </article>
  );
}

function InfrastructureCase({
  meta,
  displayNo,
  focus,
}: {
  meta: CaseMeta;
  displayNo?: string;
  focus?: string;
}) {
  const gateSteps = [
    ["01", "범위 확인", "어느 제품·환경까지 영향을 받는지 확인"],
    ["02", "AI로 초안", "실제 리소스를 조사해 Terraform 초안 작성"],
    ["03", "코드 검사", "state 백업 · fmt · validate · plan"],
    ["04", "Azure 대조", "삭제·교체·drift 여부 확인"],
    ["05", "적용 판단", "근거를 확인한 뒤 apply"],
    ["06", "적용 후 확인", "헬스 체크 · 로그 · 알림 확인과 문서 갱신"],
  ];
  return (
    <article id={`case-${meta.slug}`} className="portfolio-case scroll-mt-6 border-t-2 border-fg pb-16 pt-10 print:pt-0">
      <CaseHeader
        meta={meta}
        displayNo={displayNo}
        focus={focus}
        summary={
          <>
            회사 Azure 운영을 맡아 기존 Shared·B2B·B2C 리소스를 제품군·환경별
            root와 state로 통합하고, 현재 운영 구조와 변경 체계를 관리합니다. 공통
            이미지는 Shared ACR에서 공급하되 B2B와 B2C의 runtime·data·state는
            분리했습니다. <strong>실행 환경은 workload에 맞게 App Service와 VM을 병행하고,
            운영 신호는 환경별 Azure Monitor·Log Analytics에서 같은 기준으로 봅니다.</strong>
          </>
        }
      />

      <section className="pt-10 print:pt-0">
        <Subhead note="CURRENT AZURE TOPOLOGY" noteClassName="print:hidden">
          제품군·환경은 분리하고, 배포와 관측 기준은 공통화했습니다.
        </Subhead>
        <AzureArchitectureDiagram />
      </section>

      <section className="portfolio-keep pt-10">
        <Subhead note="HUMAN CHANGE GATE">AI가 초안을 만들더라도 운영 상태와 대조한 변경만 적용합니다.</Subhead>
        <ol className="m-0 mt-6 grid list-none grid-cols-6 border-y border-border p-0 max-lg:grid-cols-3 max-sm:grid-cols-1 print:grid-cols-6">
          {gateSteps.map(([step, title, desc], index) => (
            <li key={step} className={`relative min-w-0 p-4 print:p-3 ${index > 0 ? "border-l border-border max-sm:border-l-0 max-sm:border-t" : ""} ${index === 3 ? "max-lg:border-l-0 max-lg:border-t max-sm:border-l-0 print:border-l print:border-t-0" : ""} ${index === 4 ? "bg-fg text-bg print:border-2 print:border-fg print:bg-transparent print:text-fg" : ""}`}>
              <span className={`font-mono text-xs ${index === 4 ? "text-bg/70 print:text-muted" : "text-muted"}`}>{step}</span>
              <strong className="mt-3 block text-sm">{title}</strong>
              <span className={`mt-2 block text-xs leading-[1.55] ${index === 4 ? "text-bg/80 print:text-fg-2" : "text-fg-2"}`}>{desc}</span>
            </li>
          ))}
        </ol>
      </section>

      <section className="pt-10">
        <Subhead note="운영 규모">지금 실제로 관리하는 범위</Subhead>
        <dl className="mt-5 border-t border-border">
          {[
            ["변경 경계", "6개 root, 400개 이상 state object", "제품군과 환경별로 나눠 다른 root·환경으로의 변경 전파를 제한"],
            ["변경 검토", "삭제·재생성 위험을 적용 전에 확인", "리전 불일치로 발생하는 강제 교체와 로그·헬스 체크 설정 제거를 사전에 발견"],
            ["모니터링", "10대 VM 로그, 운영 알림 8개", "환경별 Azure Monitor·Log Analytics에서 같은 기준으로 확인"],
            ["실행 환경", "현재 규모에 맞는 Azure 관리형 서비스", "별도 플랫폼 운영 인력을 늘리지 않고 필요한 수준으로 구성"],
          ].map(([label, value, note]) => (
            <div key={label} className="portfolio-row grid grid-cols-[170px_minmax(0,0.8fr)_minmax(0,1.2fr)] gap-5 border-b border-border py-5 print:py-3 max-md:grid-cols-[150px_minmax(0,1fr)] max-sm:grid-cols-1 max-sm:gap-1">
              <dt className="font-mono text-xs text-muted">{label}</dt>
              <dd className="m-0 text-sm font-semibold">{value}</dd>
              <dd className="m-0 text-sm leading-[1.6] text-fg-2 max-md:col-start-2 max-sm:col-start-auto">{note}</dd>
            </div>
          ))}
        </dl>
      </section>

    </article>
  );
}

function CompanyAxCase({
  meta,
  displayNo,
  focus,
}: {
  meta: CaseMeta;
  displayNo?: string;
  focus?: string;
}) {
  const productFlow = [
    "요청 · 기획 · 디자인",
    "Decision · SPEC",
    "Work Package",
    "BE · FE · QA",
    "Release Gate",
    "Git · CI/CD · Azure/Vercel",
  ];
  const companyFlow = [
    "회의 · 요청",
    "의사결정",
    "업무 배정",
    "승인",
    "후속 작업",
  ];
  const engineeringLayers = [
    {
      label: "Stable Core",
      title: "반복 코어",
      body: "Router → Service → Repository",
      detail: "DI · transaction · error contract",
    },
    {
      label: "Explicit Options",
      title: "제품별 옵션",
      body: "tenancy · ID · authentication",
      detail: "storage · product policy",
    },
    {
      label: "Shared Execution",
      title: "공유 실행 기준",
      body: "ADR · convention · runbook",
      detail: "agent context · contract test · Pyright",
    },
  ];
  const responsibility = [
    ["MEDINESS 제품 요구·운영 구조", "설계 참여", "제품 요구와 운영 흐름을 구체화하는 설계에 참여"],
    ["제품별 실행", "운영 리드", "Decision·SPEC·Work Package·QA·release 상태를 실제 제품에 적용"],
    ["회사 업무 AX 확장", "설계 참여", "의사결정·회의·업무 배정·승인·후속 작업을 같은 맥락으로 잇는 구조 설계"],
    ["Backend Template·agent context", "직접 설계·구축", "아키텍처·계약·runbook·automation을 실행 가능한 기준으로 구현"],
    ["MEDINESS 앱·데이터·도구", "담당 개발팀", "플랫폼 서비스 구현은 담당 개발자들이 수행"],
  ];

  return (
    <article
      id={`case-${meta.slug}`}
      className="portfolio-case scroll-mt-6 border-t-2 border-fg pb-16 pt-10"
    >
      <CaseHeader
        meta={meta}
        displayNo={displayNo}
        focus={focus}
        summary={
          <>
            제품 개발에서는 요구를 Decision·SPEC·Work Package로 나누고
            BE·FE·QA·release까지 이어지는 흐름을 실제 제품에 적용해 운영했습니다.
            여기서 쌓이는 결정·작업·검증 기록을 바탕으로, <strong>의사결정·회의·업무
            배정·승인·후속 작업까지 사람과 agent가 같은 맥락을 읽는 회사 AX 전환
            구조 설계</strong>에 참여했습니다. MEDINESS 앱·데이터·도구는 담당 개발팀이
            구현했고, 저는 제품 요구·운영 구조 설계에 참여하면서 제품별 적용과 운영을
            리드했습니다. Backend Template과 agent context는 직접 설계·구축했습니다.
          </>
        }
      />

      <section className="pt-10">
        <Subhead note="CURRENT · NEXT">
          지금 운영하는 제품 흐름과 회사 업무로 넓힐 범위를 나눴습니다.
        </Subhead>
        <div className="mt-5 flex flex-wrap gap-x-8 gap-y-2 text-xs text-fg-2">
          <span className="inline-flex items-center gap-3">
            <span aria-hidden className="w-10 border-t-2 border-fg" />
            현재 제품 운영
          </span>
          <span className="inline-flex items-center gap-3">
            <span aria-hidden className="w-10 border-t border-dashed border-fg" />
            회사 업무 AX 확장 설계
          </span>
        </div>
        <div className="portfolio-keep mt-5 border-y-2 border-fg">
          <div className="grid grid-cols-[150px_minmax(0,1fr)] max-md:grid-cols-1">
            <div className="border-r border-border px-4 py-5 max-md:border-b max-md:border-r-0">
              <span className="font-mono text-xs text-muted">제품 개발</span>
              <strong className="mt-2 block text-sm">현재 운영</strong>
            </div>
            <div className="grid grid-cols-6 max-md:grid-cols-2 print:grid-cols-6">
              {productFlow.map((step, index) => (
                <div
                  key={step}
                  className={`${index > 0 ? "border-l border-border" : ""} px-3 py-5 text-center text-xs font-medium leading-[1.5] max-md:border-b print:border-b-0`}
                >
                  {step}
                </div>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-[150px_minmax(0,1fr)] border-t border-dashed border-fg max-md:grid-cols-1">
            <div className="border-r border-dashed border-border px-4 py-5 max-md:border-b max-md:border-r-0">
              <span className="font-mono text-xs text-muted">회사 업무</span>
              <strong className="mt-2 block text-sm">확장 설계</strong>
            </div>
            <div className="grid grid-cols-5 max-md:grid-cols-1 print:grid-cols-5">
              {companyFlow.map((step, index) => (
                <div
                  key={step}
                  className={`${index > 0 ? "border-l border-dashed border-border max-md:border-l-0 max-md:border-t print:border-l print:border-t-0" : ""} px-3 py-5 text-center text-xs font-medium leading-[1.5] max-md:text-left print:text-center`}
                >
                  {step}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="portfolio-keep pt-10">
        <Subhead note="AGENT · HUMAN GATE">
          Agent가 준비하고, 사람이 판단합니다.
        </Subhead>
        <div className="mt-6 grid grid-cols-2 border-y border-border max-md:grid-cols-1 print:grid-cols-2">
          <div className="p-6 print:p-4">
            <span className="font-mono text-xs text-muted">Agent</span>
            <h4 className="m-0 mt-3 text-lg font-semibold">탐색하고 초안을 준비</h4>
            <p className="m-0 mt-3 text-sm leading-[1.65] text-fg-2">
              필요한 맥락을 찾고, 회의·요청을 작업안으로 정리하고, 반복 실행과 검증
              근거를 준비합니다.
            </p>
          </div>
          <div className="border-l border-border bg-fg p-6 text-bg max-md:border-l-0 max-md:border-t print:border-l print:border-t-0 print:bg-transparent print:p-4 print:text-fg">
            <span className="font-mono text-xs text-bg/70 print:text-muted">Human Gate</span>
            <h4 className="m-0 mt-3 text-lg font-semibold">판단과 승인을 소유</h4>
            <p className="m-0 mt-3 text-sm leading-[1.65] text-bg/80 print:text-fg-2">
              제품 우선순위·아키텍처·업무 담당을 정하고, QA와 release의 최종 승인을
              맡습니다.
            </p>
          </div>
        </div>
      </section>

      <section className="pt-10">
        <Subhead note="RESPONSIBILITY">
          하나의 그림 안에서도 책임 범위는 섞지 않았습니다.
        </Subhead>
        <dl className="mt-5 border-t border-border">
          {responsibility.map(([area, role, scope]) => (
            <div key={area} className="portfolio-row grid grid-cols-[220px_150px_minmax(0,1fr)] gap-5 border-b border-border py-4 text-sm max-md:grid-cols-[170px_minmax(0,1fr)] max-sm:grid-cols-1 max-sm:gap-1 print:grid-cols-[190px_130px_minmax(0,1fr)] print:gap-3 print:py-3">
              <dt className="font-semibold">{area}</dt>
              <dd className="m-0 font-mono text-xs text-muted">{role}</dd>
              <dd className="m-0 leading-[1.6] text-fg-2 max-md:col-span-2 max-sm:col-span-1 print:col-span-1">{scope}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="pt-10">
        <Subhead note="ENGINEERING EXECUTION">
          반복되는 백엔드 판단은 실행 가능한 기준으로 직접 만들었습니다.
        </Subhead>
        <div className="portfolio-keep mt-6 grid grid-cols-[repeat(3,minmax(0,1fr))] border-y border-border max-md:grid-cols-1 print:grid-cols-3">
          {engineeringLayers.map((layer, index) => (
            <div
              key={layer.label}
              className={`${index > 0 ? "border-l border-border max-md:border-l-0 max-md:border-t print:border-l print:border-t-0" : ""} p-6 print:p-4`}
            >
              <span className="font-mono text-xs text-muted">{layer.label}</span>
              <h4 className="m-0 mt-3 text-lg font-semibold">{layer.title}</h4>
              <p className="m-0 mt-4 text-sm font-semibold leading-[1.6]">{layer.body}</p>
              <p className="m-0 mt-2 text-xs leading-[1.6] text-fg-2">{layer.detail}</p>
            </div>
          ))}
        </div>
        <p className="m-0 mt-6 max-w-4xl text-sm leading-[1.7] text-fg-2">
          Router→Service→Repository, DI·transaction·error contract는 stable core로
          고정하고 tenancy·ID·인증·storage는 제품별 option으로 남겼습니다. 사람과
          agent가 같은 ADR·convention·runbook을 읽고 contract test·Pyright·automation
          skill로 검증합니다. 이 기준을 통과한 변경은 Git·CI/CD를 거쳐 제품별
          Azure·Vercel 실행 환경으로 전달됩니다.
        </p>
      </section>
    </article>
  );
}

function MementoCase({
  meta,
  displayNo,
  focus,
}: {
  meta: CaseMeta;
  displayNo?: string;
  focus?: string;
}) {
  return (
    <article id={`case-${meta.slug}`} className="portfolio-case scroll-mt-6 border-t-2 border-fg pb-16 pt-10">
      <CaseHeader
        meta={meta}
        displayNo={displayNo}
        focus={focus}
        summary={
          <>
            예약이 확정되기 전에 카드 승인이 시작되고, 환불은 나중에 Webhook으로
            완료됩니다. 두 상태를 하나의 DB 트랜잭션으로 묶을 수 없어서 Stripe Checkout
            선결제를 만들고, <strong>내부 결제 ID를 Stripe metadata에 기록해 예약과 결제
            이력을 추적했습니다.</strong>
          </>
        }
      />

      <div className="mt-9 grid grid-cols-[minmax(0,0.72fr)_minmax(420px,1.28fr)] gap-10 max-lg:grid-cols-1">
        <section>
          <Subhead note="담당 범위">내가 맡은 일</Subhead>
          <ul className="m-0 mt-5 grid gap-4 pl-5 text-sm leading-[1.65] text-fg-2">
            <li>Stripe Checkout과 manual capture 기반 선결제 구현</li>
            <li>예약이 실패하면 Stripe 결제 상태를 확인해 취소하거나 환불</li>
            <li>환불 완료 Webhook을 받은 뒤 마일리지를 돌려주고 이용권 삭제</li>
          </ul>
        </section>
        <section className="portfolio-keep border border-border p-6">
          <p className="m-0 font-mono text-xs text-muted">예약 실패 시 결제 처리</p>
          <div className="mt-5 grid grid-cols-[1fr_auto_1fr_auto_1fr] items-center gap-3 text-center max-sm:grid-cols-1">
            <div className="border-y border-border py-4">
              <strong className="block text-sm">내부 결제 이력</strong>
              <span className="mt-1 block text-xs text-fg-2">결제 ID 생성</span>
            </div>
            <span aria-hidden className="font-mono text-muted max-sm:rotate-90">→</span>
            <div className="border-y border-border py-4">
              <strong className="block text-sm">Stripe 승인</strong>
              <span className="mt-1 block text-xs text-fg-2">manual capture</span>
            </div>
            <span aria-hidden className="font-mono text-muted max-sm:rotate-90">→</span>
            <div className="border border-fg py-4">
              <strong className="block text-sm">예약 결과</strong>
              <span className="mt-1 block text-xs text-fg-2">승인 / 취소 / 환불</span>
            </div>
          </div>
          <div className="mt-7 border-t border-border pt-5">
            <p className="m-0 font-mono text-xs text-muted">환불이 끝난 뒤</p>
            <p className="m-0 mt-3 text-sm font-semibold leading-[1.65]">환불 요청 → Stripe 처리 → Webhook 확인 → 환불 상태 확정 → 마일리지 복원 · 이용권 삭제</p>
          </div>
        </section>
      </div>

    </article>
  );
}

export function CaseDossier({
  meta,
  displayNo,
  focus,
}: {
  meta: CaseMeta;
  displayNo?: string;
  focus?: string;
}) {
  switch (meta.slug) {
    case "thready":
      return <ThreadyCase meta={meta} displayNo={displayNo} focus={focus} />;
    case "centurion-platform":
      return <CenturionCase meta={meta} displayNo={displayNo} focus={focus} />;
    case "infrastructure-delivery":
      return <InfrastructureCase meta={meta} displayNo={displayNo} focus={focus} />;
    case "be-template":
      return <CompanyAxCase meta={meta} displayNo={displayNo} focus={focus} />;
    case "memento-payment":
      return <MementoCase meta={meta} displayNo={displayNo} focus={focus} />;
    default:
      return null;
  }
}
