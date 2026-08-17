import type {
  PortfolioCareerBridge,
  PortfolioDetailItem,
  PortfolioEvidence,
  PortfolioJdFit,
  PortfolioOutcome,
} from "@/content/portfolios/types";

const caseModeLabel: Record<PortfolioOutcome["caseMode"], string> = {
  "single-system": "단일 시스템 사례",
  "cross-project-pattern": "여러 제품에서 반복된 설계 패턴",
  "primary-with-prior-lesson": "주 사례 + 이전 사례의 교훈",
};

const statusTone = {
  verified: "border-success text-success",
  "in-progress": "border-border text-fg-2",
  "pre-production": "border-border text-muted",
} satisfies Record<NonNullable<PortfolioOutcome["status"]>["tone"], string>;

const ownershipLabel: Record<PortfolioEvidence["ownership"], string> = {
  owned: "직접 소유",
  led: "리드",
  contributed: "기여",
  supporting: "보조 근거",
};

const verdictLabel: Record<NonNullable<PortfolioDetailItem["verdict"]>, string> = {
  selected: "선택",
  rejected: "채택하지 않음",
  "not-claimed": "주장 범위 밖",
};

export function CareerBridgeSection({ bridge }: { bridge: PortfolioCareerBridge }) {
  return (
    <section
      id="career-bridge"
      className="scroll-mt-6 pt-14"
    >
 <header className="grid grid-cols-[152px_minmax(0,1fr)] border-t-2 border-fg py-6 max-lg:grid-cols-1 max-lg:gap-3">
        <span className="font-mono text-xs uppercase tracking-[0.08em] text-muted">
          Career bridge
        </span>
        <div>
          <h2 className="m-0 text-2xl font-semibold leading-[1.3] tracking-[-0.02em]">
            {bridge.title}
          </h2>
          <p className="m-0 mt-4 text-base leading-[1.7] text-fg-2">{bridge.summary}</p>
        </div>
      </header>

 <ol className="m-0 grid list-none grid-cols-3 border-y border-border p-0 max-lg:grid-cols-1">
        {bridge.stages.map((stage, index) => (
          <li
            key={stage.label}
 className="min-w-0 border-l border-border-soft px-6 py-6 first:border-l-0 max-lg:border-l-0 max-lg:border-t max-lg:first:border-t-0"
          >
            <div className="flex items-baseline justify-between gap-4">
              <strong className="text-base font-semibold">{stage.label}</strong>
              <span className="font-mono text-xs text-muted">
                {String(index + 1).padStart(2, "0")}
              </span>
            </div>
            <p className="m-0 mt-3 text-sm leading-[1.65] text-fg-2">{stage.text}</p>
            <ul className="m-0 mt-4 flex list-none flex-wrap gap-2 p-0">
              {stage.layers.map((layer) => (
                <li
                  key={layer}
                  className="border border-border px-2 py-1 font-mono text-[11px] uppercase tracking-[0.04em] text-muted"
                >
                  {layer}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ol>

      <p className="m-0 mt-4 text-sm leading-[1.65] text-fg-2">{bridge.caption}</p>
    </section>
  );
}

export function CaseMeta({ outcome }: { outcome: PortfolioOutcome }) {
  return (
    <div className="mt-5 flex flex-wrap items-center gap-2">
      <span className="border border-border px-2.5 py-1 font-mono text-xs text-fg-2">
        {caseModeLabel[outcome.caseMode]}
      </span>
      {outcome.layers.map((layer) => (
        <span
          key={layer}
          className="border border-border px-2.5 py-1 font-mono text-xs uppercase text-muted"
        >
          {layer}
        </span>
      ))}
      {outcome.status && (
        <span
          className={`border px-2.5 py-1 font-mono text-xs ${statusTone[outcome.status.tone]}`}
        >
          {outcome.status.label}
        </span>
      )}
    </div>
  );
}

export function CaseScope({ caption }: { caption: string }) {
  return (
    <div className="mt-5 grid grid-cols-[152px_minmax(0,1fr)] border-y border-border-soft py-4 max-lg:grid-cols-1 max-lg:gap-2">
      <strong className="font-mono text-xs uppercase tracking-[0.06em] text-muted">
        Case scope
      </strong>
      <p className="m-0 text-sm leading-[1.65] text-fg-2">{caption}</p>
    </div>
  );
}

export function CaseNarrative({
  narrative,
}: Pick<PortfolioOutcome, "narrative">) {
  return (
    <section data-layer="narrative" aria-label="사례 설명" className="mt-8">
      <p className="m-0 border-y border-border py-4 text-sm font-medium leading-[1.65] text-fg-2">
        <strong className="mr-2 font-mono text-xs uppercase tracking-[0.06em] text-muted">
          맥락 ·
        </strong>
        {narrative.context}
      </p>

      <div className="mt-8 grid w-full gap-8">
        <section>
          <h3 className="m-0 text-base font-semibold">어떤 문제가 있었나</h3>
          <p className="m-0 mt-3 text-base leading-[1.75] text-fg-2">
            {narrative.problem}
          </p>
        </section>

        <section>
          <h3 className="m-0 text-base font-semibold">내가 판단하고 한 일</h3>
          <ul className="m-0 mt-3 grid list-none gap-3 p-0">
            {narrative.actions.map((action) => (
              <li
                key={action}
                className="grid grid-cols-[16px_minmax(0,1fr)] gap-3 text-base leading-[1.75] text-fg-2"
              >
                <span aria-hidden className="text-muted">
                  —
                </span>
                <span>{action}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="border-t border-border pt-7">
          <h3 className="m-0 text-base font-semibold">{narrative.resultLabel}</h3>
          <p className="m-0 mt-3 text-lg font-medium leading-[1.7] text-fg">
            {narrative.result}
          </p>
        </section>

        {narrative.axExtension && (
          <section
            className="border-t border-border pt-7"
          >
            <h3 className="m-0 text-base font-semibold">
              {narrative.axExtension.title}
            </h3>
            <div className="mt-3 grid gap-3">
              {narrative.axExtension.paragraphs.map((paragraph) => (
                <p
                  key={paragraph}
                  className="m-0 text-base leading-[1.75] text-fg-2"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </section>
        )}
      </div>
    </section>
  );
}

export function CaseDetails({ details }: Pick<PortfolioOutcome, "details">) {
  return (
    <section data-layer="technical-proof" aria-label="기술 상세" className="mt-12">
      <h3 className="m-0 text-lg font-semibold">기술 상세</h3>
      <p className="m-0 mt-2 text-sm leading-[1.65] text-fg-2">
        위에서 설명한 판단을 구현 단위와 선택 근거로 확인합니다.
      </p>
      <div className="mt-5 flex w-full flex-wrap border-y border-border">
        {details.map((detail, index) => {
          const isLastOddItem = details.length % 2 === 1 && index === details.length - 1;
          const isFirstDesktopRow = index < 2;

          return (
          <section
            key={detail.kind}
            className={`w-full border-t border-border-soft py-5 first:border-t-0 ${
              isLastOddItem
                ? "lg:w-full"
                : "lg:w-1/2 lg:odd:border-r lg:odd:pr-6 lg:even:pl-6"
            } ${isFirstDesktopRow ? "lg:border-t-0" : ""}`}
          >
            <h4 className="m-0 font-mono text-xs font-semibold uppercase tracking-[0.06em] text-muted">
              {detail.label}
            </h4>
            <div className="mt-3 divide-y divide-border-soft">
              {detail.items.map((item, index) => (
                <article
                  key={`${detail.kind}-${item.title ?? index}`}
                  className="min-w-0 py-3 first:pt-0 last:pb-0"
                >
                  {(item.title || item.verdict) && (
                    <div className="flex flex-wrap items-baseline justify-between gap-3">
                      {item.title && <h5 className="m-0 text-sm font-semibold">{item.title}</h5>}
                      {item.verdict && (
                        <span className="font-mono text-[11px] uppercase tracking-[0.04em] text-muted">
                          {verdictLabel[item.verdict]}
                        </span>
                      )}
                    </div>
                  )}
                  <p className="m-0 mt-2 text-sm leading-[1.65] text-fg-2 first:mt-0">
                    {item.text}
                  </p>
                </article>
              ))}
            </div>
          </section>
          );
        })}
      </div>
    </section>
  );
}

export function EvidenceRows({ evidence }: { evidence: PortfolioEvidence[] }) {
  return (
    <section data-layer="evidence" aria-label="담당 범위" className="mt-10">
      <h3 className="m-0 mb-4 text-lg font-semibold">담당 범위</h3>
      <div className="border-y border-border">
        {evidence.map((item) => (
          <article
            key={`${item.project}-${item.scope}`}
            className="break-inside-avoid border-t border-border-soft py-5 first:border-t-0"
          >
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <span className="font-mono text-xs text-muted">
                {ownershipLabel[item.ownership]}
              </span>
              <h4 className="m-0 text-base font-semibold leading-[1.45]">
                {item.scope}
              </h4>
            </div>
            <p className="m-0 mt-2 text-sm leading-[1.65] text-fg-2">
              {item.text}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}

export function JdFitSection({ jdFit }: { jdFit: PortfolioJdFit }) {
  return (
    <section className="mt-10 grid grid-cols-[176px_minmax(0,1fr)] border-y-2 border-fg max-lg:grid-cols-1">
      <h3 className="m-0 bg-fg px-5 py-6 font-mono text-xs font-semibold uppercase tracking-[0.06em] text-bg max-lg:border-b max-lg:border-fg print:bg-transparent print:text-fg">
        MGRV JD fit
      </h3>
      <div className="px-6 py-6">
        <ul className="m-0 grid list-none grid-cols-2 gap-x-8 gap-y-3 p-0 max-lg:grid-cols-1">
          {jdFit.matches.map((match) => (
            <li key={match} className="text-sm font-semibold leading-[1.55]">
              {match}
            </li>
          ))}
        </ul>
        {jdFit.boundary && (
          <p className="m-0 mt-5 border-t border-border-soft pt-4 text-sm leading-[1.65] text-fg-2">
            {jdFit.boundary}
          </p>
        )}
      </div>
    </section>
  );
}
