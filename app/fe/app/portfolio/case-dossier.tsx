import type { ReactNode } from "react";
import type { CaseMeta } from "@/lib/cases";
import { AzureArchitectureDiagram } from "./azure-architecture-diagram";
import { CenturionContributionDiagram } from "./centurion-contribution-diagram";
import { CompanyAxOperatingModel } from "./company-ax-operating-model";
import { SayRealtimeDiagram } from "./say-realtime-diagram";
import { ThreadyRuntimeDiagram } from "./thready-runtime-diagram";

function CaseHeader({
  meta,
  summary,
  displayNo,
  focus,
  title,
  roleLabel,
  tagLabel,
}: {
  meta: CaseMeta;
  summary: ReactNode;
  displayNo?: string;
  focus?: string;
  title?: string;
  roleLabel?: string;
  tagLabel?: string;
}) {
  return (
    <header className="portfolio-case-header">
      <div className="flex items-baseline justify-between gap-6 font-mono text-xs text-muted max-sm:grid max-sm:gap-1">
        <span>{displayNo ?? meta.no} · {tagLabel ?? meta.tag}</span>
        <span>{roleLabel ?? meta.role}</span>
      </div>
      <h2 className="m-0 mt-4 text-[clamp(1.8rem,3.6vw,3.25rem)] font-semibold leading-[1.12] tracking-[-0.04em] text-balance">
        {title ?? meta.name}
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

function BackendTemplateCase({
  meta,
  displayNo,
  focus,
}: {
  meta: CaseMeta;
  displayNo?: string;
  focus?: string;
}) {
  const propagationRows = [
    [
      "REQUIRED",
      "기존 트랜잭션에 참여하고, 없으면 새로 시작",
      "같은 session을 사용하며 바깥 트랜잭션과 함께 rollback",
    ],
    [
      "REQUIRES_NEW",
      "바깥 트랜잭션을 멈추고 새 connection·AsyncSession에서 실행",
      "독립적으로 commit·rollback한 뒤 바깥 작업을 재개",
    ],
    [
      "NESTED",
      "같은 session·connection에 SAVEPOINT 생성",
      "안쪽 작업만 rollback하고 바깥 트랜잭션은 계속 진행 가능",
    ],
    [
      "TASK GUARD",
      "child task가 같은 AsyncSession에 접근하면 즉시 실패",
      "task마다 트랜잭션·session·복구 방법을 따로 결정",
    ],
  ];

  const requestFlow = [
    ["FastAPI Router", "요청과 domain input"],
    ["@transactional Service", "트랜잭션 정책 선언"],
    ["ContextVar → SessionProxy", "현재 AsyncSession 연결"],
    ["Repository → DB", "SQL 실행·flush"],
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
        title="FastAPI에서 트랜잭션과 AsyncSession의 책임을 Service 계층에 두었습니다."
        roleLabel="Backend Template 직접 설계·구축"
        tagLabel="Backend Engineering · FastAPI"
        summary={
          <>
            Router에서 받은 session을 모든 계층에 전달하던 반복에서 시작했습니다.
            업무를 시작하는 Service method가 트랜잭션 범위를 선언하고, Repository는
            현재 session을 찾아 SQL 실행에만 집중하도록 나눴습니다. 하나의 트랜잭션을
            하나의 asyncio task와 AsyncSession이 사용하게 해 <strong>편의보다
            데이터 가시성과 실패 복구를 먼저 예측할 수 있는 구조</strong>를 택했습니다.
          </>
        }
      />

      <section className="pt-10">
        <Subhead note="문제 · 선택">반복 인자를 없애는 데서 끝내지 않고 트랜잭션 책임을 코드로 고정했습니다.</Subhead>
        <div className="mt-6 grid grid-cols-2 border-y border-border max-md:grid-cols-1 print:grid-cols-2">
          <div className="p-6 max-md:border-b max-md:border-border print:border-b-0 print:p-4">
            <h4 className="m-0 text-base font-semibold">왜 바꿨나</h4>
            <ul className="m-0 mt-4 grid gap-3 pl-5 text-sm leading-[1.65] text-fg-2">
              <li>session 인자가 Router부터 Repository까지 업무와 무관하게 반복됐습니다.</li>
              <li>트랜잭션을 참여·분리·중첩할 위치가 호출부마다 달라질 수 있었습니다.</li>
              <li>여러 직군이 Coding Agent로 구현해도 같은 구조를 따를 기본값이 필요했습니다.</li>
            </ul>
          </div>
          <div className="border-l border-border p-6 max-md:border-l-0 print:border-l print:p-4">
            <h4 className="m-0 text-base font-semibold">무엇을 기본값으로 뒀나</h4>
            <ul className="m-0 mt-4 grid gap-3 pl-5 text-sm leading-[1.65] text-fg-2">
              <li>Router·Service·Validator·Repository·Model의 책임과 의존 방향을 고정했습니다.</li>
              <li>Service가 트랜잭션을 시작하고 Repository는 SQL 실행과 flush만 담당합니다.</li>
              <li>FastAPI의 Depends를 부정하지 않고, 업무 단위 정책을 Service에 모았습니다.</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="pt-10">
        <Subhead note="RUNTIME BEHAVIOR">중첩 호출에서 달라지는 동작과 실패 범위를 명시했습니다.</Subhead>
        <div className="mt-6 overflow-hidden border-y border-border">
          <div className="grid grid-cols-[180px_minmax(0,1fr)_minmax(280px,0.9fr)] bg-surface px-5 py-4 text-sm font-semibold max-md:hidden print:grid">
            <span>구분</span>
            <span>설계한 동작</span>
            <span>실패·복구 범위</span>
          </div>
          {propagationRows.map(([name, behavior, failure]) => (
            <div
              key={name}
              className="grid grid-cols-[180px_minmax(0,1fr)_minmax(280px,0.9fr)] gap-5 border-t border-border px-5 py-5 text-sm leading-[1.65] first:border-t-0 max-md:grid-cols-1 max-md:gap-2 print:grid-cols-[150px_minmax(0,1fr)_minmax(220px,0.9fr)] print:gap-3 print:py-3"
            >
              <strong className="font-mono text-sm text-accent">{name}</strong>
              <span>{behavior}</span>
              <span className="text-fg-2">{failure}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="portfolio-keep pt-10">
        <Subhead note="REQUEST RESOURCE BINDING">Service가 정한 트랜잭션을 하위 계층이 반복 인자 없이 사용합니다.</Subhead>
        <ol className="m-0 mt-6 grid list-none grid-cols-[1fr_auto_1.15fr_auto_1.2fr_auto_1fr] items-stretch gap-3 p-0 max-lg:grid-cols-1 print:grid-cols-[1fr_auto_1.15fr_auto_1.2fr_auto_1fr]">
          {requestFlow.map(([title, description], index) => (
            <li key={title} className="contents max-lg:block print:contents">
              <div className={`border-y border-border p-5 print:p-3 ${index === 1 ? "border border-accent bg-surface print:bg-transparent" : ""}`}>
                <strong className="block text-sm">{title}</strong>
                <span className="mt-2 block text-xs leading-[1.55] text-fg-2">{description}</span>
              </div>
              {index < requestFlow.length - 1 ? (
                <span aria-hidden className="grid place-items-center font-mono text-muted max-lg:rotate-90 print:rotate-0">→</span>
              ) : null}
            </li>
          ))}
        </ol>
        <p className="m-0 mt-4 border-y border-border py-3 text-center font-mono text-xs text-muted">
          session 인자 반복 없음 · 1 transaction · 1 task · 1 AsyncSession
        </p>
      </section>

      <section className="pt-10">
        <Subhead note="TRADE-OFF · VERIFICATION">내부 병렬성을 제한한 이유와 예외 처리 방법을 함께 남겼습니다.</Subhead>
        <div className="mt-6 grid grid-cols-2 border-y border-border max-md:grid-cols-1 print:grid-cols-2">
          <div className="p-6 max-md:border-b max-md:border-border print:border-b-0 print:p-4">
            <h4 className="m-0 text-base font-semibold">의도한 제약</h4>
            <p className="m-0 mt-4 text-sm leading-[1.7] text-fg-2">
              같은 트랜잭션 안에서 여러 task가 AsyncSession을 공유하지 못하게 했습니다.
              병렬 DB 작업이 필요하면 task별 트랜잭션, 데이터 가시성, 실패 복구와
              connection 비용을 먼저 결정하도록 ADR·runbook에 기록했습니다.
            </p>
          </div>
          <div className="border-l border-border p-6 max-md:border-l-0 print:border-l print:p-4">
            <h4 className="m-0 text-base font-semibold">검증한 실패 경로</h4>
            <p className="m-0 mt-4 text-sm leading-[1.7] text-fg-2">
              child task의 동일 session 접근을 즉시 실패시키고, CancelledError가 발생하면
              rollback과 connection cleanup이 실행되는지 통합 테스트로 확인했습니다.
              propagation별 commit·rollback과 SAVEPOINT 동작도 함께 고정했습니다.
            </p>
          </div>
        </div>
      </section>
    </article>
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
            고객이 돈을 내는 이유를 기획·QA·마케팅과 함께 구체화하고, 제품 판단부터
            출시·운영까지 이끌었습니다. 제품에 필요한 Next.js 핵심 흐름을 직접 구현하고,
            빠른 기능 검증 중심의 초기 백엔드를 인계받아 팀이 운영할 수 있는 FastAPI
            구조로 재구축했습니다. 이어 제품 기준 데이터와 AI 실행 상태의
            관리 책임을 나눴습니다.
            팀과 함께 <strong>구독료를 내는 고객이 쓰는 제품</strong>으로 만들었습니다.
          </>
        }
      />

      <section className="portfolio-keep mt-7 grid grid-cols-2 border-y border-fg max-md:grid-cols-1 print:grid-cols-2">
        <div className="px-5 py-5 max-md:border-b max-md:border-border print:border-b-0">
          <p className="m-0 font-mono text-xs font-semibold text-success">CURRENT · SUBSCRIPTION</p>
          <strong className="mt-3 block text-lg">유료 제품 운영</strong>
          <span className="mt-2 block text-sm text-fg-2">구독 결제 · 제품 운영</span>
        </div>
        <div className="border-l border-border px-5 py-5 max-md:border-l-0 print:border-l">
          <p className="m-0 font-mono text-xs font-semibold text-muted">NEXT · ADVERTISING</p>
          <strong className="mt-3 block text-lg">광고 수익 모델 검증</strong>
          <span className="mt-2 block text-sm text-fg-2">적용 시작 · 운영 데이터 수집 중</span>
        </div>
      </section>

      <section className="pt-10">
        <Subhead note="PRODUCT · RUNTIME ARCHITECTURE">제품 운영과 실제 실행 환경을 한 구조로 연결했습니다.</Subhead>
        <ThreadyRuntimeDiagram />
        <dl className="portfolio-keep m-0 mt-5 grid grid-cols-3 border-y border-border max-md:grid-cols-1 print:grid-cols-3">
          {[
            ["리드", "제품 운영 · 우선순위 · 품질 · QA · 릴리스"],
            ["직접 구현", "제품 핵심 흐름 · Next.js · FastAPI · 데이터 · AI"],
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
        <Subhead note="외부 AI 장애 대응">한 모델의 장애가 전체 생성 기능 중단으로 번지지 않게 운영했습니다.</Subhead>
        <div className="portfolio-keep mt-5 grid grid-cols-3 border-y border-border max-md:grid-cols-1 print:grid-cols-3">
          {[
            ["감지", "Sentry 알림", "반복되는 외부 AI 5xx를 운영자가 확인"],
            ["격리", "문제 모델 일시 제외", "오류가 반복되는 모델을 사용자 선택지에서 제거"],
            ["작업 지속", "정상 모델 선택", "서비스 중인 다른 모델로 생성을 계속 진행"],
          ].map(([step, title, desc], index) => (
            <div
              key={step}
              className={`min-w-0 p-5 ${index > 0 ? "border-l border-border max-md:border-l-0 max-md:border-t print:border-l print:border-t-0" : ""}`}
            >
              <span className="font-mono text-xs text-muted">{step}</span>
              <strong className="mt-3 block text-sm">{title}</strong>
              <span className="mt-2 block text-xs leading-[1.6] text-fg-2">{desc}</span>
            </div>
          ))}
        </div>
        <p className="m-0 mt-4 text-xs leading-[1.65] text-muted">
          5xx는 재시도 가능한 실패로 분류하고 최대 시도 뒤 최종 실패 상태와 사용자 재시도 경로를 남겼습니다. 당시 사용자·트래픽 규모에서는 복잡한 자동 복구보다 운영자가 문제 모델만 격리하는 방식이 적절하다고 판단했습니다.
        </p>
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
    ["주문·재고", "구축 주도", "요청 처리와 외부 연동의 실패 경계를 나누고, 명시적인 작업 상태·재시도·최종 실패·수동 복구 경계를 만들었습니다."],
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
        <Subhead note="CONTRIBUTION MAP">
          예약 정책은 출시 기준까지 연결하고, 실패한 작업은 다시 처리할 수 있게, 실시간 상담은 재연결·종료 경계를 검증했습니다.
        </Subhead>
        <CenturionContributionDiagram />
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
        <Subhead note="TRANSACTION · STATE · RECOVERY">외부 연동 실패가 사용자 요청 전체를 되돌리지 않게 했습니다.</Subhead>
        <p className="m-0 mt-5 max-w-[920px] text-sm leading-[1.7] text-fg-2">
          기존에도 Celery로 API 밖의 작업을 처리하고 있었습니다. 전환의 이유는
          비동기 분리 자체가 아니라, async FastAPI 코드베이스와 worker의 실행
          모델을 맞추기 위함이었습니다. RabbitMQ는 유지하고 TaskIQ로 전환하며
          상태·재시도·최종 실패·수동 재발송을 주문 운영 흐름에 연결했습니다.
        </p>
        <div className="portfolio-keep mt-6 grid grid-cols-[1fr_auto_1fr_auto_1.15fr] items-stretch gap-3 max-lg:grid-cols-1 print:grid-cols-[1fr_auto_1fr_auto_1.15fr]">
          <div className="border-y border-border p-5 print:p-3">
            <span className="font-mono text-xs text-muted">TRANSACTION BOUNDARY</span>
            <strong className="mt-3 block">판정·작업 상태 생성</strong>
            <p className="m-0 mt-2 text-sm leading-[1.55] text-fg-2">사용자 요청과 외부 연동의 실패 경계를 분리</p>
          </div>
          <span aria-hidden className="grid place-items-center font-mono text-muted max-lg:rotate-90 print:rotate-0">→</span>
          <div className="border-y border-border p-5 print:p-3">
            <span className="font-mono text-xs text-muted">EXECUTION HANDOFF</span>
            <strong className="mt-3 block">RabbitMQ</strong>
            <p className="m-0 mt-2 text-sm leading-[1.55] text-fg-2">실패 가능한 후속 작업을 worker 경계로 전달</p>
          </div>
          <span aria-hidden className="grid place-items-center font-mono text-muted max-lg:rotate-90 print:rotate-0">→</span>
          <div className="border border-fg p-5 print:p-3">
            <span className="font-mono text-xs text-muted">STATE CONSISTENCY · RECOVERY</span>
            <strong className="mt-3 block">TaskIQ 작업 상태</strong>
            <p className="m-0 mt-2 text-sm leading-[1.55] text-fg-2">SUCCESS·FAILED 기록 → retry → terminal failure → 수동 재처리</p>
          </div>
        </div>
        <p className="m-0 mt-4 border-y border-border py-3 text-sm leading-[1.6] text-fg-2 print:mt-2 print:py-2">
          <strong className="text-fg">설계 원칙</strong> · 실패 상태를 기록으로 남겨 사용자 요청 전체가 아니라 실패한 후속 작업만 다시 실행합니다.
        </p>
      </section>

      <section className="portfolio-signal-section pt-10 print:pt-0">
        <Subhead note="SAY · REALTIME ARCHITECTURE">실시간 상담의 진입·전사·생성·종료 경계를 한 구조로 묶었습니다.</Subhead>
        <p className="m-0 mt-5 max-w-[920px] text-sm leading-[1.7] text-fg-2">
          Gateway와 SSO를 거친 상담 연결은 WebSocket session orchestrator가 관리합니다.
          STT에서 나온 중간 전사 DELTA는 도메인 키워드를 먼저 확인하는 데 사용하고,
          COMPLETE는 확정 문맥과 저장에 사용합니다. 다만 COMPLETE의 도착 순서가
          보장되지 않아 DELTA·COMPLETE·CORRECTED를 같은 sequence로 연결했고,
          늦은 보정이 다른 발화를 덮지 않게 했습니다. 상담 종료 뒤에는
          timer·GC·shutdown의 정리 책임을 stop guard로 모았습니다.
        </p>

        <SayRealtimeDiagram />

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
            제품 개발에서는 요구를 <span className="whitespace-nowrap">Decision·SPEC·Work Package</span>로 나누고{" "}
            <span className="whitespace-nowrap">BE·FE·QA·release</span>까지 이어지는 흐름을 실제 제품에 적용해 운영했습니다.
            여기서 쌓이는 결정·작업·검증 기록을 바탕으로, <strong>의사결정·회의·업무
            배정·승인·후속 작업까지 사람과 agent가 같은 맥락을 읽는 <span className="whitespace-nowrap">회사 AX</span> 전환
            구조 설계</strong>에 참여했습니다. MEDINESS 앱·데이터·도구는 담당 개발팀이
            구현했고, 저는 제품 요구·운영 구조 설계에 참여하면서 제품별 적용과 운영을
            리드했습니다. <span className="whitespace-nowrap">Backend Template</span>과 <span className="whitespace-nowrap">agent context</span>는 직접 설계·구축했습니다.
          </>
        }
      />

      <section className="pt-10">
        <Subhead note="OPERATING MODEL">
          제품 운영 기록을 회사 업무 AX의 입력으로 확장했습니다.
        </Subhead>
        <CompanyAxOperatingModel />
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
  variant,
}: {
  meta: CaseMeta;
  displayNo?: string;
  focus?: string;
  variant?: "backend-template";
}) {
  switch (meta.slug) {
    case "thready":
      return <ThreadyCase meta={meta} displayNo={displayNo} focus={focus} />;
    case "centurion-platform":
      return <CenturionCase meta={meta} displayNo={displayNo} focus={focus} />;
    case "infrastructure-delivery":
      return <InfrastructureCase meta={meta} displayNo={displayNo} focus={focus} />;
    case "be-template":
      if (variant === "backend-template") {
        return <BackendTemplateCase meta={meta} displayNo={displayNo} focus={focus} />;
      }
      return <CompanyAxCase meta={meta} displayNo={displayNo} focus={focus} />;
    case "memento-payment":
      return <MementoCase meta={meta} displayNo={displayNo} focus={focus} />;
    default:
      return null;
  }
}
