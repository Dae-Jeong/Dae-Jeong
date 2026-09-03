import type { RolePortfolioCaseSelection } from "@/content/portfolios/types";
import type { CaseMeta } from "@/lib/cases";
import { DesignSection } from "../diagrams/design-section";

const CASE_BRIEF = [
  {
    label: "한 일",
    content:
      "백엔드 경험이 적은 담당자도 Claude Code·Codex로 기능을 구현할 수 있도록 FastAPI·SQLAlchemy async 기반 Backend Template을 직접 설계·구축했습니다. 신규 사내 프로그램은 이 Template으로 시작하고, 기존 제품은 DB session 관리부터 순차적으로 적용했습니다.",
  },
  {
    label: "문제",
    content:
      "Local에서 정상처럼 보이던 코드가 STG QA에서 session 미반납으로 connection pool을 고갈시키고 500 오류를 만들었습니다. Backend 담당자가 매번 원인을 찾고 코드를 보완해야 했습니다.",
  },
  {
    label: "해결의 핵심",
    content:
      "Service가 @transactional로 transaction policy를 선언하고 Repository가 ContextVar의 현재 AsyncSession을 사용하도록 했습니다. Session·transaction·API contract는 공통값으로 두고, 일반 기능은 MVC, AI Agent 기능은 Hexagonal 구조를 선택하도록 기준을 정했습니다.",
  },
  {
    label: "결과",
    content:
      "Full Template으로 시작한 신규 프로그램의 STG QA에서는 같은 session·pool 문제가 다시 관측되지 않았습니다. Backend의 개입도 기능 구현 지원에서 결과 피드백과 배포 지원 중심으로 줄었습니다.",
  },
] as const;

export function JypProductDevelopmentCase({
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
      className="jyp-product-development-case scroll-mt-20 border-t-2 border-[var(--portfolio-ink)] pb-16 pt-10"
    >
      <header className="grid grid-cols-[170px_minmax(0,1fr)] gap-6 max-sm:grid-cols-1 max-sm:gap-4">
        <div>
          <p className="m-0 text-sm font-semibold text-[var(--portfolio-blue)]">
            팀 개발 체계
          </p>
          <p className="m-0 mt-3 text-xs leading-relaxed text-muted">
            {displayNo}
          </p>
        </div>
        <div>
          <h2 className="m-0 text-[clamp(1.65rem,2.5vw,2.3rem)] font-semibold leading-[1.2] tracking-[-0.03em] text-[var(--portfolio-ink)] text-balance">
            백엔드 경험이 적은 팀원도 Coding Agent로 운영 제품의 기능을 만들 수 있게 했습니다
          </h2>
          <p className="m-0 mt-4 text-base leading-[1.7] text-fg-2 text-pretty">
            기능 구현을 대신하는 방식이 아니라, 반복해서 문제가 생기던
            session·transaction 경계를 FastAPI Template의 기본값으로 만들었습니다.
          </p>
        </div>
      </header>

      <section className="mt-9 grid grid-cols-[170px_minmax(0,1fr)] gap-6 max-sm:grid-cols-1 max-sm:gap-3">
        <h3 className="m-0 text-sm font-semibold text-[var(--portfolio-blue)]">
          사례 요약
        </h3>
        <dl className="m-0 border-y border-border">
          {CASE_BRIEF.map((item) => (
            <div
              key={item.label}
              className="grid grid-cols-[112px_minmax(0,1fr)] gap-5 border-t border-border py-4 first:border-t-0 max-sm:grid-cols-1 max-sm:gap-1"
            >
              <dt className="text-sm font-semibold text-[var(--portfolio-ink)]">
                {item.label}
              </dt>
              <dd className="m-0 text-sm leading-[1.7] text-fg-2 text-pretty">
                {item.content}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      <DesignSection ids={selection.designs} className="mt-10" />

      <section className="mt-7 grid grid-cols-[170px_minmax(0,1fr)] gap-6 border-y border-border py-5 max-sm:grid-cols-1 max-sm:gap-2">
        <h3 className="m-0 text-sm font-semibold text-[var(--portfolio-blue)]">
          담당 범위
        </h3>
        <div className="text-sm leading-[1.75] text-fg-2">
          <p className="m-0">
            <strong className="text-[var(--portfolio-ink)]">직접 구축</strong>
            {" · "}FastAPI Template·transaction/session 기준·architecture guide
          </p>
          <p className="m-0 mt-1">
            <strong className="text-[var(--portfolio-ink)]">운영 주도</strong>
            {" · "}제품별 결정→명세→작업→QA→릴리스 흐름
          </p>
          <p className="m-0 mt-1">
            <strong className="text-[var(--portfolio-ink)]">설계 참여</strong>
            {" · "}회사 업무 AX 확장 구조
          </p>
        </div>
      </section>

      <p className="m-0 mt-5 text-xs leading-[1.65] text-muted">
        기능 구현은 각 담당자와 Claude Code·Codex가 수행했고, 저는 결과 피드백과 인프라
        배포를 지원했습니다. 관측 범위는 신규 프로그램의 STG QA입니다.
      </p>
    </article>
  );
}
