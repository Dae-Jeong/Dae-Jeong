import type { RolePortfolioCaseSelection } from "@/content/portfolios/types";
import type { CaseMeta } from "@/lib/cases";
import { DesignSection } from "../diagrams/design-section";

const MANUAL_STEPS = [
  ["01", "소재 포착", "글감 찾기"],
  ["02", "각도 잡기", "첫 문장 정하기"],
  ["03", "초안 작성", "내 톤으로 쓰기"],
  ["04", "검수·발행", "최종 판단"],
  ["05", "반응 해석", "다음 글에 반영"],
] as const;

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="m-0 text-sm font-semibold text-[var(--portfolio-blue)]">
      {children}
    </p>
  );
}

function FlowArrow() {
  return (
    <span
      aria-hidden="true"
      className="grid w-8 shrink-0 place-items-center font-mono text-muted max-lg:h-8 max-lg:w-auto max-lg:rotate-90"
    >
      →
    </span>
  );
}

function FlowNode({
  title,
  description,
  tone = "designed",
}: {
  title: string;
  description: string;
  tone?: "context" | "designed" | "implemented" | "human";
}) {
  const toneClass = {
    context: "border-border bg-surface",
    designed: "border-dashed border-[#7b8aa0] bg-white",
    implemented:
      "border-[var(--portfolio-blue)] bg-[var(--portfolio-blue-soft)]",
    human: "border-[var(--portfolio-ink)] bg-[var(--portfolio-ink)] text-white",
  }[tone];

  return (
    <div
      className={`min-w-0 flex-1 border px-4 py-4 text-center max-lg:w-full max-lg:text-left ${toneClass}`}
    >
      <strong className="block text-sm leading-[1.45]">{title}</strong>
      <span
        className={`mt-1 block text-xs leading-[1.5] ${tone === "human" ? "text-[#dce4f4]" : "text-fg-2"}`}
      >
        {description}
      </span>
    </div>
  );
}

export function JypThreadyAutomationCase({
  meta,
  selection,
  displayNo,
}: {
  meta: CaseMeta;
  selection: Extract<RolePortfolioCaseSelection, { kind: "dossier" }>;
  displayNo: string;
}) {
  return (
    <article
      id={`case-${meta.slug}`}
      className="portfolio-case jyp-thready-case scroll-mt-20 border-t-2 border-fg pb-16 pt-10"
    >
      <header className="portfolio-case-header">
        <div className="flex flex-wrap items-baseline justify-between gap-3 text-xs text-muted max-sm:grid max-sm:gap-1">
          <span>
            {displayNo} · 고객이 구독하는 AI 제품
          </span>
          <span>{selection.scope}</span>
        </div>
        <h2 className="m-0 mt-4 max-w-[25ch] text-[clamp(1.75rem,2.8vw,2.6rem)] font-semibold leading-[1.14] tracking-[-0.03em] text-balance">
          Threads 글쓰기의 반복을 고객이 구독하는 제품으로 만들었습니다
        </h2>
        <p className="m-0 mt-6 max-w-[72ch] text-base leading-[1.75] text-fg-2 text-pretty">
          여러 채널을 함께 운영하느라 Threads를 꾸준히 관리하기 어려운 고객의
          문제에서 출발했습니다. 참고 자료 수집부터 생성·검수·예약·발행까지
          이어지는 흐름을 만들고, 팀과 함께 고객이 구독료를 내는 제품으로
          출시·운영했습니다.
        </p>
        <div className="mt-7 grid grid-cols-[170px_minmax(0,1fr)] gap-6 border-y border-border py-4 max-sm:grid-cols-1 max-sm:gap-1">
          <span className="font-mono text-xs text-muted">이 버전에서 보는 지점</span>
          <strong className="max-w-[72ch] text-sm leading-[1.65]">
            {selection.focus}
          </strong>
        </div>
        <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-sm print:hidden">
          <a
            className="focus-ring font-semibold text-[var(--portfolio-blue)] hover:underline"
            href="https://www.medisolveai.com/ads/thready"
            target="_blank"
            rel="noreferrer"
          >
            제품 소개 보기 ↗
          </a>
          <a
            className="focus-ring font-semibold text-[var(--portfolio-blue)] hover:underline"
            href="https://thready.medisolveai.com"
            target="_blank"
            rel="noreferrer"
          >
            Thready 서비스 보기 ↗
          </a>
        </div>
      </header>

      <section className="pt-12">
        <div className="grid grid-cols-[170px_minmax(0,1fr)] gap-6 max-sm:grid-cols-1 max-sm:gap-2">
          <SectionLabel>사람이 하던 일</SectionLabel>
          <div>
            <h3 className="m-0 text-2xl font-semibold tracking-[-0.025em] text-[var(--portfolio-ink)]">
              짧은 글 한 편에도 다섯 단계의 판단이 반복됐습니다
            </h3>
            <p className="m-0 mt-3 max-w-[70ch] text-sm leading-[1.7] text-fg-2">
              소재를 찾고 각도를 정하고, 초안을 쓰고, 발행한 뒤 반응을 다음 글에
              연결하는 일을 한 사람이 계속 기억해야 했습니다.
            </p>
          </div>
        </div>
        <figure className="m-0 mt-6 border border-border bg-white px-5 py-6">
          <div
            className="grid grid-cols-5 items-stretch gap-2 max-lg:grid-cols-1 max-lg:gap-0"
            aria-label="사람이 Threads 글을 직접 운영하던 다섯 단계"
          >
            {MANUAL_STEPS.map(([no, title, description], index) => (
              <div
                key={no}
                className="relative min-w-0 border border-border bg-surface px-4 py-5 max-lg:mb-7"
              >
                <span className="font-mono text-[10px] text-[var(--portfolio-blue)]">
                  {no}
                </span>
                <strong className="mt-3 block text-sm text-[var(--portfolio-ink)]">
                  {title}
                </strong>
                <span className="mt-1 block text-xs leading-relaxed text-fg-2">
                  {description}
                </span>
                {index < MANUAL_STEPS.length - 1 ? (
                  <span
                    aria-hidden="true"
                    className="absolute -right-[13px] top-1/2 z-10 grid size-6 -translate-y-1/2 place-items-center bg-white font-mono text-muted max-lg:-bottom-[26px] max-lg:left-1/2 max-lg:right-auto max-lg:top-auto max-lg:-translate-x-1/2 max-lg:translate-y-0 max-lg:rotate-90"
                  >
                    →
                  </span>
                ) : null}
              </div>
            ))}
          </div>
          <div className="mt-4 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 border border-dashed border-[#7b8aa0] px-4 py-3 text-xs leading-relaxed text-fg-2 max-sm:grid-cols-1">
            <span>
              발행 반응을 다시 소재와 방향으로 연결해야 다음 글을 이어갈 수 있음
            </span>
            <span className="font-semibold text-[var(--portfolio-ink)]">
              기억과 반복이 사람에게 남음
            </span>
          </div>
          <figcaption className="mt-4 border-t border-border pt-4 text-sm leading-[1.65] text-fg-2">
            반응을 다시 소재와 방향으로 연결하지 못하면 글 작성의 반복도 함께
            멈췄습니다.
          </figcaption>
        </figure>
      </section>

      <section className="pt-12">
        <div className="grid grid-cols-[170px_minmax(0,1fr)] gap-6 max-sm:grid-cols-1 max-sm:gap-2">
          <SectionLabel>제품으로 바꾼 흐름</SectionLabel>
          <div>
            <h3 className="m-0 text-2xl font-semibold tracking-[-0.025em] text-[var(--portfolio-ink)]">
              반복 업무는 역할과 데이터 흐름으로 나누고, 방향과 발행은 사람이 결정하게 했습니다
            </h3>
            <p className="m-0 mt-3 max-w-[70ch] text-sm leading-[1.7] text-fg-2">
              글쓰기 기능 하나를 붙인 것이 아니라 소재·정체성·작성·검수·학습을
              나누고, 승인된 개인 맥락만 다음 생성에 다시 쓰는 흐름을
              설계했습니다.
            </p>
          </div>
        </div>
        <figure className="m-0 mt-6 border border-border bg-white px-5 py-6">
          <div className="mb-5 flex flex-wrap items-center justify-end gap-x-5 gap-y-2 border-b border-border pb-4 font-mono text-[10px] text-muted">
            <span>운영 제품에 구현</span>
            <span>설계·단계 검증</span>
            <span>사람이 결정</span>
          </div>

          <div className="grid gap-0">
            <section className="grid grid-cols-[130px_minmax(0,1fr)] items-center border-b border-border py-5 max-md:grid-cols-1 max-md:gap-3">
              <p className="m-0 font-mono text-[11px] font-semibold text-muted">
                01 · CONTEXT
              </p>
              <div className="flex min-w-0 items-stretch max-lg:flex-col">
                <FlowNode
                  title="개인 맥락"
                  description="설문 · 목표 · 내 콘텐츠"
                  tone="context"
                />
                <FlowArrow />
                <FlowNode
                  title="사람이 승인한 맥락"
                  description="Identity · Evidence · Learning"
                />
              </div>
            </section>

            <section className="grid grid-cols-[130px_minmax(0,1fr)] items-center border-b border-border py-5 max-md:grid-cols-1 max-md:gap-3">
              <p className="m-0 font-mono text-[11px] font-semibold text-muted">
                02 · CREATE
              </p>
              <div className="flex min-w-0 items-stretch max-lg:flex-col">
                <div className="grid min-w-0 flex-1 grid-rows-2 gap-2">
                  <FlowNode title="Scout" description="소재 · 근거" />
                  <FlowNode title="Friend" description="관점 · 톤" />
                </div>
                <FlowArrow />
                <FlowNode
                  title="Creator / Writer"
                  description="초안 생성"
                  tone="implemented"
                />
                <FlowArrow />
                <FlowNode
                  title="Critic / Guard"
                  description="품질 검수"
                  tone="implemented"
                />
                <FlowArrow />
                <FlowNode title="Draft Feed" description="고를 수 있는 초안" />
              </div>
            </section>

            <section className="grid grid-cols-[130px_minmax(0,1fr)] items-center py-5 max-md:grid-cols-1 max-md:gap-3">
              <p className="m-0 font-mono text-[11px] font-semibold text-muted">
                03 · DECIDE
              </p>
              <div className="flex min-w-0 items-stretch max-lg:flex-col">
                <FlowNode
                  title="사람"
                  description="고르기 · 수정 · 승인"
                  tone="human"
                />
                <FlowArrow />
                <FlowNode
                  title="예약 · 발행"
                  description="승인된 결과만 반영"
                  tone="implemented"
                />
                <FlowArrow />
                <FlowNode
                  title="반응 · 수정"
                  description="다음 생성에 쓸 변경안 제안"
                />
              </div>
            </section>
          </div>

          <p className="m-0 border-t border-dashed border-[#7b8aa0] pt-4 text-center text-xs leading-[1.6] text-fg-2">
            사용자 수정과 반응은 자동으로 장기 기억에 넣지 않고, 사람 검토를 거쳐
            승인된 내용만 다음 생성에 다시 사용합니다.
          </p>
          <figcaption className="mt-4 grid grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-6 border-t border-border pt-4 text-sm leading-[1.65] text-fg-2 max-md:grid-cols-1">
            <span>
              <strong className="text-fg">운영 제품에 구현</strong> · 콘텐츠
              가져오기·초안 생성·1차 검수·사람 수정·예약·발행
            </span>
            <span>
              <strong className="text-fg">설계·단계 검증</strong> · Scout와
              Friend가 승인된 개인 맥락을 읽고 변경안을 다시 검토로 돌리는 흐름
            </span>
          </figcaption>
        </figure>
      </section>

      <section className="mt-12 grid grid-cols-[170px_minmax(0,1fr)] gap-6 border-y border-border bg-surface px-6 py-8 max-sm:grid-cols-1 max-sm:gap-3 sm:px-8">
        <SectionLabel>구현과 운영</SectionLabel>
        <div>
          <h3 className="m-0 text-2xl font-semibold tracking-[-0.025em] text-[var(--portfolio-ink)]">
            제품 판단부터 Backend·AI·주요 화면과 운영까지 이어 맡았습니다
          </h3>
          <ul className="m-0 mt-6 grid gap-4 pl-5 text-sm leading-[1.7] text-fg-2">
            <li>
              FastAPI 제품 API, 별도 AI 애플리케이션과 DB, 콘텐츠 가져오기·URL
              preview·생성·예약·발행·대시보드·관리자 화면을 구현했습니다.
            </li>
            <li>
              planner/writer가 초안을 만들고 LLM judge가 1차 검수 근거를 남기며,
              사용자가 수정과 최종 발행을 결정하도록 구성했습니다.
            </li>
            <li>
              외부 AI 5xx는 Sentry로 감지하고 반복 장애 모델을 일시 제외해 정상
              모델로 작업을 이어갈 수 있게 운영했습니다.
            </li>
          </ul>
        </div>
      </section>

      <DesignSection ids={selection.designs} />

      <aside className="mt-10 grid grid-cols-[170px_minmax(0,1fr)] gap-6 border-t border-border pt-5 max-sm:grid-cols-1 max-sm:gap-2">
        <p className="m-0 font-mono text-[11px] font-semibold tracking-[0.08em] text-muted">
          담당 범위
        </p>
        <p className="m-0 max-w-[72ch] text-sm leading-[1.7] text-fg-2">
          제품 운영을 리드하고 백엔드·AI·주요 프론트엔드 흐름을 직접
          구현했습니다. 기획·QA·마케팅은 각 담당자와 함께 수행했으며, 제품 매출은
          팀의 결과로 구분합니다. 외부 채널에서 소재를 자동으로 찾는 기능과 사람
          확인 없는 자동 발행은 구현 범위로 주장하지 않습니다.
        </p>
      </aside>
    </article>
  );
}
