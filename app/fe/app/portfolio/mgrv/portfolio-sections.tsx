import type {
  PortfolioCareerBridge,
  PortfolioDetailItem,
  PortfolioEvidence,
  PortfolioJdFit,
  PortfolioOutcome,
} from "@/content/portfolios/types";

const caseModeLabel: Record<PortfolioOutcome["caseMode"], string> = {
  "single-system": "제품 사례",
  "cross-project-pattern": "반복 적용한 방식",
  "primary-with-prior-lesson": "현재 제품과 이전 경험",
};

const layerLabel: Record<PortfolioOutcome["layers"][number], string> = {
  Product: "제품",
  Backend: "백엔드",
  Operations: "운영",
  Infrastructure: "인프라",
  AI: "AI",
};

const statusTone = {
  verified: "border-success text-success",
  "in-progress": "border-border text-fg-2",
  "pre-production": "border-border text-muted",
} satisfies Record<NonNullable<PortfolioOutcome["status"]>["tone"], string>;

const ownershipLabel: Record<PortfolioEvidence["ownership"], string | null> = {
  owned: null,
  led: "리드",
  contributed: "함께 수행",
  supporting: "관련 경험",
};

const verdictLabel: Record<NonNullable<PortfolioDetailItem["verdict"]>, string> = {
  selected: "선택",
  rejected: "채택하지 않음",
  "not-claimed": "주장 범위 밖",
  proposed: "후속 설계안",
};

export function CareerBridgeSection({ bridge }: { bridge: PortfolioCareerBridge }) {
  return (
    <section
      id="career-bridge"
      className="scroll-mt-6 pt-14"
    >
      <header className="grid grid-cols-[152px_minmax(0,1fr)] border-t-4 border-[var(--portfolio-blue)] bg-[var(--portfolio-blue-soft)] px-7 py-7 max-lg:grid-cols-1 max-lg:gap-3 max-sm:px-5">
        <span className="font-mono text-xs font-semibold text-[var(--portfolio-blue)]">
          {bridge.eyebrow ?? "경력의 연결"}
        </span>
        <div>
          <h2 className="m-0 text-2xl font-semibold leading-[1.3] tracking-[-0.02em]">
            {bridge.title}
          </h2>
          <p className="m-0 mt-4 text-base leading-[1.7] text-fg-2">{bridge.summary}</p>
        </div>
      </header>

      <ol
        className={`m-0 grid list-none border-b border-border p-0 max-lg:grid-cols-1 ${
          bridge.stages.length === 4 ? "grid-cols-2 xl:grid-cols-4" : "grid-cols-3"
        }`}
      >
        {bridge.stages.map((stage, index) => (
          <li
            key={stage.label}
            className="min-w-0 break-inside-avoid border-l border-border-soft px-6 py-7 first:border-l-0 max-lg:border-l-0 max-lg:border-t max-lg:first:border-t-0"
          >
            <div className="flex items-baseline justify-between gap-4">
              <strong className="text-base font-semibold">{stage.label}</strong>
              {bridge.numbered !== false && (
                <span className="font-mono text-xs text-muted">
                  {String(index + 1).padStart(2, "0")}
                </span>
              )}
            </div>
            <p className="m-0 mt-3 text-sm leading-[1.65] text-fg-2">{stage.text}</p>
            <ul className="m-0 mt-4 flex list-none flex-wrap gap-2 p-0">
              {stage.layers.map((layer) => (
                <li
                  key={layer}
                  className="border border-[#a9bceb] bg-[var(--portfolio-blue-soft)] px-2 py-1 font-mono text-xs text-[var(--portfolio-blue)]"
                >
                  {layerLabel[layer]}
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
      <span className="portfolio-chip border px-2.5 py-1 font-mono text-xs font-medium">
        {caseModeLabel[outcome.caseMode]}
      </span>
      {outcome.layers.map((layer) => (
        <span
          key={layer}
          className="portfolio-chip border px-2.5 py-1 font-mono text-xs font-medium"
        >
          {layerLabel[layer]}
        </span>
      ))}
      {outcome.status && (
        <span
          className={`border bg-bg px-2.5 py-1 font-mono text-xs font-medium ${statusTone[outcome.status.tone]}`}
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
        사례 범위
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
      <p className="portfolio-context-bar m-0 text-sm font-medium leading-[1.65]">
        <strong className="mr-2 font-mono text-xs font-semibold">
          상황 ·
        </strong>
        {narrative.context}
      </p>

      {narrative.tracks ? (
        <div className="portfolio-narrative-tracks mt-7 w-full">
          {narrative.tracks.map((track) => (
            <article key={track.title} className="portfolio-narrative-track">
              <h3 className="m-0 text-xl font-semibold leading-[1.4]">
                {track.title}
              </h3>

              <div className="portfolio-narrative-track-section">
                <h4 className="m-0 font-mono text-xs font-semibold text-muted">
                  문제
                </h4>
                <p className="m-0 mt-2 text-base leading-[1.75] text-fg-2">
                  {track.problem}
                </p>
              </div>

              <div className="portfolio-narrative-track-section">
                <h4 className="m-0 font-mono text-xs font-semibold text-muted">
                  대처 방법
                </h4>
                <ul className="m-0 mt-2 grid list-none gap-2 p-0">
                  {track.actions.map((action) => (
                    <li
                      key={action}
                      className="grid grid-cols-[16px_minmax(0,1fr)] gap-3 text-base leading-[1.75] text-fg-2"
                    >
                      <span aria-hidden className="text-muted">—</span>
                      <span>{action}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="portfolio-narrative-track-section" data-track-result>
                <h4 className="m-0 font-mono text-xs font-semibold text-[var(--portfolio-blue)]">
                  결과
                </h4>
                <p className="m-0 mt-2 text-base font-medium leading-[1.7] text-fg">
                  {track.result}
                </p>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="portfolio-narrative-grid mt-7 w-full">
          <section className="portfolio-narrative-panel" data-panel="problem">
            <h3 className="m-0 text-base font-semibold">문제</h3>
            <p className="m-0 mt-3 text-base leading-[1.75] text-fg-2">
              {narrative.problem}
            </p>
          </section>

          <section className="portfolio-narrative-panel" data-panel="action">
            <h3 className="m-0 text-base font-semibold">대처 방법</h3>
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

          <section className="portfolio-narrative-panel" data-panel="result">
            <h3 className="m-0 text-base font-semibold">{narrative.resultLabel}</h3>
            <p className="m-0 mt-3 text-lg font-medium leading-[1.7] text-fg">
              {narrative.result}
            </p>
          </section>

          {narrative.axExtension && (
            <section className="portfolio-narrative-panel" data-panel="extension">
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
      )}
    </section>
  );
}

export function CaseDetails({ details }: Pick<PortfolioOutcome, "details">) {
  return (
    <section data-layer="technical-proof" aria-label="기여 내용" className="mt-12">
      <h3 className="m-0 text-lg font-semibold">기여 내용</h3>
      <p className="m-0 mt-2 text-sm leading-[1.65] text-fg-2">
        해결 과정에서 맡은 기술 판단과 구현 범위입니다.
      </p>
      <div className="portfolio-detail-grid mt-5 w-full">
        {details.map((detail, index) => {
          const isLastOddItem = details.length % 2 === 1 && index === details.length - 1;

          return (
          <section
            key={`${detail.kind}-${detail.label}`}
            data-detail-kind={detail.kind}
            className={`portfolio-detail-section ${isLastOddItem ? "lg:col-span-2" : ""}`}
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
    <section
      data-layer="evidence"
      aria-label="담당 범위"
      className="portfolio-evidence-band mt-10"
    >
      <h3 className="m-0 mb-4 text-lg font-semibold">담당 범위</h3>
      <div className="border-y border-[#34466d]">
        {evidence.map((item) => (
          <article
            key={`${item.project}-${item.scope}`}
            className="break-inside-avoid border-t py-5 first:border-t-0"
          >
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              {ownershipLabel[item.ownership] && (
                <span className="font-mono text-xs text-muted">
                  {ownershipLabel[item.ownership]}
                </span>
              )}
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

export function JdFitSection({
  jdFit,
  companyName = "MGRV",
  showBoundary = true,
}: {
  jdFit: PortfolioJdFit;
  companyName?: string;
  showBoundary?: boolean;
}) {
  return (
    <section className="portfolio-jd-fit mt-10 grid grid-cols-[176px_minmax(0,1fr)] border-y-2 max-lg:grid-cols-1 print:mt-6">
      <h3 className="m-0 px-5 py-6 font-mono text-xs font-semibold uppercase tracking-[0.06em] max-lg:border-b print:bg-transparent print:px-4 print:py-4 print:text-fg">
        {companyName} 지원 직무와의 연결
      </h3>
      <div className="px-6 py-6 print:px-4 print:py-4">
        <ul className="m-0 grid list-none grid-cols-2 gap-x-8 gap-y-3 p-0 max-lg:grid-cols-1">
          {jdFit.matches.map((match) => (
            <li key={match} className="text-sm font-semibold leading-[1.55]">
              {match}
            </li>
          ))}
        </ul>
        {showBoundary && jdFit.boundary && (
          <p className="m-0 mt-5 border-t border-border-soft pt-4 text-sm leading-[1.65] text-fg-2 print:mt-3 print:pt-3">
            {jdFit.boundary}
          </p>
        )}
      </div>
    </section>
  );
}
