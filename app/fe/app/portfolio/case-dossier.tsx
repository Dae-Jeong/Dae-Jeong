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
  const productFlow = [
    ["01", "문제 확인", "꾸준히 써도 잘되는 글을 알기 어려움"],
    ["02", "데이터 수집", "잘되는 글의 공통점 찾기"],
    ["03", "우선순위 결정", "생성과 평가 기능으로 정리"],
    ["04", "제품 구현", "FE·API·데이터·AI 실행 구조"],
    ["05", "출시", "QA와 배포"],
    ["06", "운영", "실제 사용자와 유료 구독"],
  ];

  return (
    <article id={`case-${meta.slug}`} className="portfolio-case scroll-mt-6 border-t-2 border-fg pt-10">
      <CaseHeader
        meta={meta}
        displayNo={displayNo}
        focus={focus}
        summary={
          <>
            콘텐츠를 꾸준히 만들어도 어떤 글이 잘되는지 알기 어렵다는 고객의 말에서
            시작했습니다. 기획·QA·마케팅과 함께 제품 운영을 이끌며 기능·실험 우선순위와
            품질 기준을 정했습니다. 바이브 코딩으로 빠르게 만든 초기 FastAPI 백엔드는
            팀이 이해하고 운영할 수 있는 구조로 다시 만들고, Next.js의 콘텐츠
            생성·가져오기·예약·발행·관리 흐름과 AI 실행 서비스, 배포·운영까지 직접
            맡았습니다. 제품의
            <strong> 월 구독료 매출은 2026년 8월 기준 약 800만~1,000만원</strong>입니다.
          </>
        }
      />

      <dl className="portfolio-keep mt-8 border-y border-border">
        {[
          ["내가 리드한 일", "제품 운영·관리 · 기능·실험 우선순위 · 품질·QA·릴리스 기준"],
          ["직접 맡은 일", "FastAPI 백엔드 · Next.js 핵심 workflow · 데이터 · AI 생성·평가 · 배포·운영"],
          ["함께한 역할", "기획 · QA · 마케팅 · 디자인"],
          ["제품 성과", "월 약 800만~1,000만원의 구독료 매출 (2026.08 기준)"],
        ].map(([label, value]) => (
          <div key={label} className="grid grid-cols-[170px_minmax(0,1fr)] gap-6 border-b border-border-soft py-4 last:border-b-0 max-sm:grid-cols-1 max-sm:gap-1">
            <dt className="font-mono text-xs text-muted">{label}</dt>
            <dd className="m-0 text-sm font-medium leading-[1.55]">{value}</dd>
          </div>
        ))}
      </dl>

      <section className="pt-10">
        <Subhead note="문제 → 제품">고객 문제를 제품으로 만든 과정</Subhead>
        <ol className="portfolio-keep m-0 mt-6 grid list-none grid-cols-6 border-y border-border p-0 max-lg:grid-cols-3 max-sm:grid-cols-1">
          {productFlow.map(([step, title, desc], index) => (
            <li
              key={step}
              className={`relative min-w-0 px-4 py-5 ${index > 0 ? "border-l border-border max-sm:border-l-0 max-sm:border-t" : ""} ${index === 3 ? "max-lg:border-l-0 max-lg:border-t max-sm:border-l-0" : ""}`}
            >
              <span className="font-mono text-xs text-muted">{step}</span>
              <strong className="mt-3 block text-sm">{title}</strong>
              <span className="mt-2 block text-xs leading-[1.55] text-fg-2">{desc}</span>
            </li>
          ))}
        </ol>
      </section>

      <section className="pt-12">
        <Subhead note="백엔드 재구축">바이브 코딩으로 시작한 백엔드를 팀이 운영할 수 있는 구조로 다시 만들었습니다.</Subhead>
        <div className="mt-6 grid grid-cols-[minmax(0,0.92fr)_minmax(360px,1.08fr)] gap-10 max-lg:grid-cols-1">
          <div className="grid content-start gap-5 text-sm leading-[1.7] text-fg-2">
            <p className="m-0"><strong className="text-fg">무엇이 문제였나</strong> · 초기 백엔드는 시장을 확인하기 위해 바이브 코딩으로 빠르게 만들어졌습니다. 기능은 돌아갔지만 어떤 코드가 무엇을 책임지는지, 수정 영향이 어디까지 퍼지는지 설명하기 어려웠습니다.</p>
            <p className="m-0"><strong className="text-fg">어떻게 풀었나</strong> · 기존 API와 기능을 먼저 목록으로 만들고, 현재 동작을 확인할 테스트와 검증 기준을 세웠습니다. 프론트엔드는 그대로 둔 채 새 백엔드를 옆에서 만들었고, AI는 코드 파악과 반복 구현에 활용했습니다. 구조와 작업 범위, 전환 시점은 직접 결정했습니다.</p>
            <p className="m-0"><strong className="text-fg">무엇이 달라졌나</strong> · 기존 백엔드와 새 백엔드의 응답을 비교한 뒤 전환했습니다. 전환 전후 같은 기준으로 비교했을 때, 해결된 QA 항목의 재오픈 비율은 26%p 낮아졌습니다. 이후 배포와 운영도 계속 맡았습니다.</p>
          </div>
          <div className="portfolio-keep border border-border bg-surface p-5 print:bg-transparent">
            <p className="m-0 font-mono text-xs text-muted">기존 서비스와 나란히 만든 뒤 전환</p>
            <div className="mt-5 grid gap-3">
              {[
                ["유지", "기존 API", "사용자 흐름은 그대로"],
                ["정리", "기능 목록", "기존 동작과 응답 확인"],
                ["재구축", "FastAPI 백엔드", "AI로 반복 작업 가속"],
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

      <section className="pt-12">
        <Subhead note="AI 실행 구조">제품 백엔드와 AI 실행 서비스를 나누고, 데이터 전달은 Outbox로 관리했습니다.</Subhead>
        <div className="portfolio-keep mt-6 grid grid-cols-[minmax(0,1fr)_160px_minmax(0,1fr)] border-y border-border max-md:grid-cols-1 print:grid-cols-[minmax(0,1fr)_110px_minmax(0,1fr)]">
          <div className="p-6 print:p-4">
            <span className="font-mono text-xs text-muted">제품 백엔드</span>
            <h4 className="m-0 mt-3 text-lg font-semibold">사용자와 제품 데이터</h4>
            <p className="m-0 mt-3 text-sm leading-[1.65] text-fg-2">제품 정책과 사용자가 생성·수정하는 원본 데이터를 관리합니다.</p>
          </div>
          <div className="grid place-items-center border-x border-border bg-fg p-5 text-center text-bg max-md:border-x-0 max-md:border-y print:border-x print:border-y-0 print:bg-transparent print:p-3 print:text-fg">
            <div>
              <span className="font-mono text-xs opacity-70">데이터 전달</span>
              <strong className="mt-2 block text-sm">Transactional Outbox</strong>
              <span className="mt-2 block text-xs leading-[1.45] opacity-80">재시도 · 재점유<br />버전 확인</span>
            </div>
          </div>
          <div className="p-6 print:p-4">
            <span className="font-mono text-xs text-muted">AI 서비스 / DB</span>
            <h4 className="m-0 mt-3 text-lg font-semibold">생성 작업과 실행 기록</h4>
            <p className="m-0 mt-3 text-sm leading-[1.65] text-fg-2">중복되거나 늦게 도착한 작업이 최신 상태를 덮어쓰지 않게 처리합니다.</p>
          </div>
        </div>
        <div className="mt-6 grid grid-cols-[180px_minmax(0,1fr)] gap-6 border-y border-border py-5 max-sm:grid-cols-1 max-sm:gap-2">
          <strong className="font-mono text-sm">데이터 이전 검증</strong>
          <p className="m-0 text-sm leading-[1.65] text-fg-2">STG의 생성 이력 2,616건·품질 기록 795건·실행 추적 7,111건을 옮겼습니다. 운영 데이터로 로컬 리허설을 진행한 뒤 행 수와 MD5 fingerprint, 참조 누락, API 동작을 확인했습니다.</p>
        </div>
      </section>

      <section className="pb-16 pt-10">
        <Subhead note="콘텐츠 데이터">11만 건의 게시글을 제품에서 다시 쓸 수 있게 만들었습니다.</Subhead>
        <div className="mt-5 grid grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-x-10 max-md:grid-cols-1">
          <div className="border-b border-border py-5">
            <strong className="block text-base">라벨링 도구</strong>
            <p className="m-0 mt-2 text-sm leading-[1.65] text-fg-2">한국어 게시글 111,091건과 작성자가 이어 쓴 글 185,475건을 별도 DB로 옮겼습니다. 다시 실행해도 중복되지 않는 가져오기 도구와 API·평가 화면을 함께 만들었습니다.</p>
          </div>
          <div className="border-b border-border py-5">
            <strong className="block text-base">잘되는 글의 기준</strong>
            <p className="m-0 mt-2 text-sm leading-[1.65] text-fg-2">별도 표본 20,256건에서 첫 문장인 훅의 품질을 8개 기준으로 나눠 평가했습니다. 이 기준은 글 생성 프롬프트와 실험용 LLM 평가기에 반영해 결과를 비교했습니다.</p>
          </div>
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
    ["실시간 AI 상담", "공동 개발", "상담 연결 상태와 STT·LLM 연동 코드를 나누고, 중복 응답과 재연결을 처리했습니다."],
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
        <div className="mt-8 grid grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] gap-10 border-y border-border py-6 max-md:grid-cols-1 max-md:gap-5 print:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] print:gap-6 print:py-4">
          <div>
            <span className="font-mono text-xs text-muted">실시간 상담</span>
            <h4 className="m-0 mt-2 text-base font-semibold">이전 응답이 현재 상담을 덮어쓰지 않게</h4>
          </div>
          <p className="m-0 text-sm leading-[1.65] text-fg-2">WebSocket이 다시 연결되거나 같은 이벤트가 여러 번 와도 이전 작업을 취소하고 현재 대화 순서를 확인합니다. STT와 LLM 연동 코드는 상담 상태 관리와 분리했습니다.</p>
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

function EngineeringSystemCase({
  meta,
  displayNo,
  focus,
}: {
  meta: CaseMeta;
  displayNo?: string;
  focus?: string;
}) {
  const layers = [
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

  return (
    <article
      id={`case-${meta.slug}`}
      className="portfolio-case scroll-mt-6 border-t-2 border-fg pb-16 pt-10"
      data-claim="be-template.backend-standard be-template.team-leverage be-template.agent-context"
    >
      <CaseHeader
        meta={meta}
        displayNo={displayNo}
        focus={focus}
        summary={
          <>
            새 백엔드마다 구조·의존성 주입·트랜잭션·오류 계약과 작업 맥락을 다시
            정하면, 소수 인원이 여러 제품을 오갈수록 같은 판단 비용이 반복됩니다.
            반복되는 core는 조직 표준 FastAPI template로 고정하고,
            multi-tenancy·ID·인증·storage 같은 제품 차이는 명시적 option으로
            분리했습니다. <strong>사람과 AI agent가 같은 ADR·convention·runbook을
            읽고 contract test·Pyright·automation skill로 같은 기준을 검증하도록
            구성했습니다.</strong>
          </>
        }
      />

      <section className="pt-10">
        <Subhead note="STANDARD · OPTIONS · EXECUTION">
          반복되는 것은 고정하고, 제품마다 다른 것은 드러냈습니다.
        </Subhead>
        <div className="portfolio-keep mt-6 grid grid-cols-[repeat(3,minmax(0,1fr))] border-y border-border max-md:grid-cols-1 print:grid-cols-3">
          {layers.map((layer, index) => (
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
        <p className="m-0 mt-4 text-sm leading-[1.65] text-fg-2">
          모든 제품을 하나의 generic framework로 만들지 않고, 반복되는 판단만
          표준화했습니다.
        </p>
      </section>

      <section className="pt-10">
        <Subhead note="DESIGN DECISION">
          문서 가이드가 아니라 실행 가능한 시작점을 택했습니다.
        </Subhead>
        <div className="mt-6 grid grid-cols-[repeat(3,minmax(0,1fr))] border-y border-border max-md:grid-cols-1 print:grid-cols-3">
          {[
            ["제품별 개별 구조", "이동 비용과 규약 drift가 남습니다."],
            ["문서만 배포", "계약을 코드와 검증 단계에서 강제할 수 없습니다."],
            ["과도한 공통화", "option 조합과 도입 비용이 커집니다."],
          ].map(([title, body], index) => (
            <div key={title} className={`${index > 0 ? "border-l border-border max-md:border-l-0 max-md:border-t print:border-l print:border-t-0" : ""} p-5 print:p-3`}>
              <strong className="block text-sm">{title}</strong>
              <span className="mt-2 block text-sm leading-[1.6] text-fg-2">{body}</span>
            </div>
          ))}
        </div>
        <p className="m-0 mt-5 text-sm leading-[1.7] text-fg-2">
          그래서 반복되는 core만 실행 가능한 template로 고정하고, 제품 차이는 처음부터
          option과 ADR에 드러내도록 설계했습니다.
        </p>
      </section>

      <section className="portfolio-keep pt-10">
        <Subhead note="IMPLEMENTED SCOPE">조직에서 실제로 공유하는 기준</Subhead>
        <dl className="mt-5 border-t border-border">
          {[
            ["Architecture", "layered core · DI · transaction · error contract"],
            ["Contract", "response wrapper · ErrorCode · contract test · Pyright"],
            ["Context", "ADR · convention · runbook · Hub-and-Spoke routing"],
            ["Automation", "init-project · add-domain · db-reset · local-setup skill"],
          ].map(([label, value]) => (
            <div key={label} className="grid grid-cols-[170px_minmax(0,1fr)] gap-6 border-b border-border py-4 max-sm:grid-cols-1 max-sm:gap-1">
              <dt className="font-mono text-xs text-muted">{label}</dt>
              <dd className="m-0 text-sm font-medium leading-[1.6]">{value}</dd>
            </div>
          ))}
        </dl>
        <p className="m-0 mt-6 max-w-4xl text-sm leading-[1.7] text-fg-2">
          조직 표준 template의 설계·구축과 agent context 내장은 직접 맡았습니다. 공통
          logging·monitoring 같은 횡단 변경을 같은 기준으로 반영하고, FE 엔지니어도
          패턴과 규약 아래 backend 로직을 구현할 수 있는 시작점을 만들었습니다. 도입
          프로젝트 수나 setup 시간, 생산성·품질 개선율은 아직 측정하지 않았습니다.
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
      return <EngineeringSystemCase meta={meta} displayNo={displayNo} focus={focus} />;
    case "memento-payment":
      return <MementoCase meta={meta} displayNo={displayNo} focus={focus} />;
    default:
      return null;
  }
}
