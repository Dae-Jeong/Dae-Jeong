import type { RolePortfolioCaseSelection } from "@/content/portfolios/types";
import type { CaseMeta } from "@/lib/cases";
import { DesignSection } from "../diagrams/design-section";

const CURRENT_SURFACES = [
  ["계정", "작업 계정 선택"],
  ["소재", "글감 찾기"],
  ["작성", "기획·초안·수정"],
  ["게시물", "저장·예약·발행"],
  ["대시보드", "성과 확인"],
] as const;

const CAPABILITIES = [
  ["콘텐츠 제작", "탐색·기획·작성·검토·수정"],
  ["제품 운영", "계정·글 조회·저장·예약·발행"],
  ["성과 확인", "지표 갱신·분석"],
] as const;

const EXECUTION_RULES = [
  {
    type: "조회",
    example: "계정 · 게시물 · 성과",
    rule: "바로 실행하고 대화에 결과 반환",
  },
  {
    type: "생성·수정",
    example: "초안 · 편집 · 재작성",
    rule: "결과물 버전을 남긴 뒤 다음 요청과 연결",
  },
  {
    type: "외부 상태 변경",
    example: "예약 · 발행 · 삭제",
    rule: "사용자 확인과 중복 실행 방지를 거쳐 실행",
  },
] as const;

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="m-0 text-sm font-semibold text-[var(--portfolio-blue)]">
      {children}
    </p>
  );
}

export function JypConversationalAgentCase({
  meta,
  selection,
  displayNo,
}: {
  meta: CaseMeta;
  selection: Extract<RolePortfolioCaseSelection, { kind: "supporting" }>;
  displayNo: string;
}) {
  return (
    <article
      id={`case-${meta.slug}`}
      className="jyp-agent-case scroll-mt-6 border-t-2 border-[var(--portfolio-ink)] pb-16 pt-10"
    >
      <header className="grid grid-cols-[minmax(0,0.72fr)_minmax(320px,1.28fr)] gap-10 max-lg:grid-cols-1 max-lg:gap-5">
        <div>
          <SectionLabel>대화형 제품 인터페이스</SectionLabel>
          <p className="m-0 mt-4 text-xs leading-relaxed text-muted">
            {displayNo}
          </p>
          <p className="m-0 mt-2 text-xs leading-relaxed text-muted">
            {selection.scope}
          </p>
        </div>
        <div>
          <h2 className="m-0 max-w-[25ch] text-[clamp(1.75rem,2.8vw,2.6rem)] font-semibold leading-[1.14] tracking-[-0.03em] text-[var(--portfolio-ink)] text-balance">
            여러 화면의 기능을 대화 하나로 다루는 방식을 검증했습니다
          </h2>
          <p className="m-0 mt-5 max-w-[68ch] text-base leading-[1.75] text-fg-2 text-pretty">
            {meta.blurb}
          </p>
        </div>
      </header>

      <div className="mt-9 grid grid-cols-[170px_minmax(0,1fr)] gap-6 border-y border-border py-4 max-sm:grid-cols-1 max-sm:gap-1">
        <span className="font-mono text-xs text-muted">이 버전에서 보는 지점</span>
        <strong className="max-w-[72ch] text-sm leading-[1.65]">
          {selection.focus}
        </strong>
      </div>

      <section className="mt-12">
        <div className="mb-6 grid grid-cols-[170px_minmax(0,1fr)] gap-6 max-sm:grid-cols-1 max-sm:gap-2">
          <SectionLabel>사용 흐름 비교</SectionLabel>
          <div>
            <h3 className="m-0 text-2xl font-semibold tracking-[-0.025em] text-[var(--portfolio-ink)]">
              기능을 찾아다니던 사용 흐름을 대화 하나로 모았습니다
            </h3>
            <p className="m-0 mt-3 max-w-[68ch] text-sm leading-[1.7] text-fg-2">
              화면을 하나 더 만드는 실험이 아니라, 이미 동작하는 Thready 기능을
              사용자의 의도에 맞춰 고르고 이어서 실행하는 인터페이스를 검증했습니다.
            </p>
          </div>
        </div>

        <div className="grid gap-6">
          <figure className="m-0 border border-border bg-white px-5 py-6">
            <div className="mb-5 flex items-baseline justify-between gap-4 border-b border-border pb-4">
              <strong className="text-sm text-[var(--portfolio-ink)]">
                사용자가 기능과 순서를 직접 찾아 실행
              </strong>
              <span className="font-mono text-[11px] text-muted">AS-IS</span>
            </div>
            <div aria-label="사용자가 여러 Thready 화면을 직접 오가던 흐름">
              <div className="grid grid-cols-5 gap-2 max-lg:grid-cols-2 max-sm:grid-cols-1">
                {CURRENT_SURFACES.map(([title, description], index) => (
                  <div
                    key={title}
                    className="relative min-w-0 border border-border bg-surface px-4 py-4"
                  >
                    <span className="font-mono text-[10px] text-muted">
                      화면 {String(index + 1).padStart(2, "0")}
                    </span>
                    <strong className="mt-2 block text-sm text-[var(--portfolio-ink)]">
                      {title}
                    </strong>
                    <span className="mt-1 block text-xs leading-relaxed text-fg-2">
                      {description}
                    </span>
                  </div>
                ))}
              </div>
              <div className="mt-4 grid grid-cols-[auto_minmax(0,1fr)] items-center gap-4 border border-dashed border-[#7b8aa0] px-4 py-3 max-sm:grid-cols-1">
                <strong className="text-sm text-[var(--portfolio-ink)]">
                  사용자가 직접 연결
                </strong>
                <span className="text-xs leading-relaxed text-fg-2">
                  화면의 위치와 실행 순서, 이전 작업의 맥락을 기억해 다음 화면으로 이동
                </span>
              </div>
            </div>
            <figcaption className="mt-4 border-t border-border pt-4 text-sm leading-[1.65] text-fg-2">
              기능이 준비되어 있어도 사용자는 어디서 무엇을 해야 하는지 알고,
              화면을 옮길 때마다 현재 작업의 맥락을 직접 이어야 했습니다.
            </figcaption>
          </figure>

          {/* TO-BE: 손으로 그린 상자 대신 흐름형 설계 도식 (2026-09-03) */}
          <DesignSection ids={selection.designs} label="TO-BE · 설계" className="mt-0" />
        </div>
      </section>

      <section className="mt-12 border-y border-border bg-surface px-6 py-8 sm:px-8">
        <div className="grid grid-cols-[170px_minmax(0,1fr)] gap-6 max-sm:grid-cols-1 max-sm:gap-2">
          <SectionLabel>실행 기준</SectionLabel>
          <div>
            <h3 className="m-0 text-2xl font-semibold tracking-[-0.025em] text-[var(--portfolio-ink)]">
              작업의 위험도에 따라 실행 규칙을 나눴습니다
            </h3>
            <p className="m-0 mt-3 max-w-[68ch] text-sm leading-[1.7] text-fg-2">
              Agent가 계획을 만들더라도 모든 기능을 같은 방식으로 실행하지
              않습니다. 조회, 결과물 생성, 외부 상태 변경에 서로 다른 경계를
              적용했습니다.
            </p>
          </div>
        </div>
        <dl className="m-0 mt-7 grid grid-cols-3 border-t border-border max-lg:grid-cols-1">
          {EXECUTION_RULES.map((item, index) => (
            <div
              key={item.type}
              className={`min-w-0 py-5 ${
                index > 0
                  ? "border-l border-border pl-6 max-lg:border-l-0 max-lg:border-t max-lg:pl-0"
                  : "pr-6 max-lg:pr-0"
              }`}
            >
              <dt className="text-base font-semibold text-[var(--portfolio-ink)]">
                {item.type}
              </dt>
              <dd className="m-0 mt-2 font-mono text-[11px] leading-relaxed text-muted">
                {item.example}
              </dd>
              <dd className="m-0 mt-4 text-sm leading-[1.65] text-fg-2">
                {item.rule}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="mt-12 grid grid-cols-[170px_minmax(0,1fr)] gap-6 max-sm:grid-cols-1 max-sm:gap-3">
        <SectionLabel>구현</SectionLabel>
        <div>
          <h3 className="m-0 text-2xl font-semibold tracking-[-0.025em] text-[var(--portfolio-ink)]">
            계획, 실행, 결과를 다시 이어갈 수 있게 기록했습니다
          </h3>
          <ul className="m-0 mt-6 grid grid-cols-2 gap-x-10 gap-y-4 pl-5 text-sm leading-[1.7] text-fg-2 max-md:grid-cols-1">
            <li>콘텐츠 제작 7개, 제품 운영 13개 동작을 capability로 등록</li>
            <li>계획 단계와 실제 기능 실행 권한을 분리</li>
            <li>대화·turn·도구 결과·결과물 버전을 실행 기록에 적재</li>
            <li>작업 큐와 activity event로 진행 상태를 대화에 복원</li>
            <li>대화가 길어지면 이전 맥락을 요약해 다음 요청에 연결</li>
            <li>확인 절차와 idempotency key로 중복 상태 변경 방지</li>
          </ul>
        </div>
      </section>

      <aside className="mt-10 grid grid-cols-[170px_minmax(0,1fr)] gap-6 border-t border-border pt-5 max-sm:grid-cols-1 max-sm:gap-2">
        <p className="m-0 font-mono text-[11px] font-semibold tracking-[0.08em] text-muted">
          검증 범위
        </p>
        <p className="m-0 max-w-[72ch] text-sm leading-[1.7] text-fg-2">
          기존 Writer와 소재 관리에서 검증한 기능을 재사용한 독립
          프로토타입입니다. 실제 예약·발행·삭제는 Mock gateway까지만
          연결했으며, 운영용 durable worker와 실제 외부 상태 변경은 구현 범위에
          포함하지 않았습니다.
        </p>
      </aside>
    </article>
  );
}
