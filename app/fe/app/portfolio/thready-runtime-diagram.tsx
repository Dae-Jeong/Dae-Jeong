import {
  ArchitectureArrow,
  ArchitectureBoundary,
  ArchitectureFrame,
  ArchitectureNode,
} from "./reference-architecture";

function EntryPath() {
  return (
    <div className="border-b border-[#b7d7f0] bg-white p-5 print:p-3">
      <div className="grid grid-cols-[minmax(0,0.8fr)_70px_minmax(0,1fr)_70px_minmax(0,1fr)] items-center gap-3 max-md:grid-cols-1 print:grid-cols-[minmax(0,0.8fr)_44px_minmax(0,1fr)_44px_minmax(0,1fr)] print:gap-2">
        <ArchitectureNode code="UI" detail="사용자 · 운영자" title="Browser" />
        <ArchitectureArrow />
        <ArchitectureNode code="FE" detail="Next.js · Vercel" title="Product Frontend" tone="blue" />
        <ArchitectureArrow label="HTTPS" />
        <ArchitectureNode code="API" detail="FastAPI · Azure App Service" title="Product Backend" tone="blue" />
      </div>
    </div>
  );
}

function RuntimeBoundaries() {
  return (
    <div className="grid grid-cols-[minmax(0,1fr)_150px_minmax(0,1fr)] gap-4 border-b border-[#b7d7f0] p-5 max-lg:grid-cols-1 print:grid-cols-[minmax(0,1fr)_104px_minmax(0,1fr)] print:gap-2 print:p-3">
      <ArchitectureBoundary
        eyebrow="PRODUCT BOUNDARY"
        meta="OWNER"
        title="제품 정책과 원장"
      >
        <div className="grid gap-2 p-4 print:p-2">
          <ArchitectureNode
            code="DB"
            detail="계정 · quota · 콘텐츠 · 발행 정책"
            title="Product PostgreSQL"
          />
          <div className="grid grid-cols-2 gap-2 max-sm:grid-cols-1 print:grid-cols-2">
            <ArchitectureNode code="OBJ" detail="media · PDF" title="Object Storage" />
            <ArchitectureNode code="EXT" detail="OAuth · publish · metrics" title="Threads API" />
          </div>
          <ArchitectureNode
            code="TX"
            detail="원장 변경과 전달 event를 함께 기록"
            title="Owner mutation + Outbox"
            tone="blue"
          />
        </div>
      </ArchitectureBoundary>

      <div className="grid content-center gap-3 px-1 max-lg:py-1 print:gap-2">
        <ArchitectureNode
          code="R"
          detail="전달 실패를 원장 transaction과 분리"
          title="Relay"
          tone="slate"
          className="print:[&_span_span]:hidden"
        />
        <ArchitectureArrow label="auth HTTP" tone="slate" />
        <ArchitectureNode
          code="V"
          detail="늦거나 역순인 update 차단"
          title="Version fence"
          tone="green"
          className="print:[&_span_span]:hidden"
        />
      </div>

      <ArchitectureBoundary
        eyebrow="AI EXECUTION BOUNDARY"
        title="생성 lifecycle과 실행 상태"
        tone="green"
      >
        <div className="grid gap-2 p-4 print:p-2">
          <ArchitectureNode
            code="AI"
            detail="internal-only FastAPI application"
            title="AI Application"
            tone="green"
          />
          <div className="grid grid-cols-2 gap-2 max-sm:grid-cols-1 print:grid-cols-2">
            <ArchitectureNode code="DB" detail="snapshot · trace · replica" title="AI PostgreSQL" />
            <ArchitectureNode code="WK" detail="DB-backed claim · lease" title="Execution Worker" />
          </div>
          <div className="grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-2 font-mono text-xs text-[#526778]">
            <span className="border border-[#b7d7f0] bg-white px-2 py-2 text-center">PENDING · RUNNING</span>
            <span aria-hidden>→</span>
            <span className="border border-[#65ad83] bg-[#f5fbf7] px-2 py-2 text-center text-[#174d2c]">SUCCESS · FAILED</span>
          </div>
          <ArchitectureNode
            code="EXT"
            detail="LLM · source providers"
            title="External AI Services"
          />
        </div>
      </ArchitectureBoundary>
    </div>
  );
}

function DeliveryAndVerification() {
  return (
    <div className="grid grid-cols-2 gap-4 bg-white p-5 max-lg:grid-cols-1 print:grid-cols-2 print:gap-2 print:p-3">
      <ArchitectureBoundary eyebrow="DELIVERY" title="코드에서 실행 환경까지" tone="slate">
        <div className="grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)_auto_minmax(0,1.15fr)] items-center gap-2 p-3 text-center max-sm:grid-cols-1 print:hidden">
          <ArchitectureNode code="GIT" title="GitHub" />
          <span aria-hidden className="font-mono text-[#526778] max-sm:rotate-90">→</span>
          <ArchitectureNode code="CI" detail="test · build" title="Actions" tone="slate" />
          <span aria-hidden className="font-mono text-[#526778] max-sm:rotate-90">→</span>
          <ArchitectureNode code="RUN" detail="Vercel · Container Registry · Azure" title="Deploy" tone="blue" />
        </div>
        <div className="hidden grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)_auto_minmax(0,1.5fr)] items-center gap-2 p-2 text-center font-mono text-[9px] leading-[1.25] text-[#183b56] print:grid">
          <span className="border border-[#b7d7f0] bg-white px-2 py-3">GitHub</span>
          <span aria-hidden className="text-[#526778]">→</span>
          <span className="border border-[#b9c3cb] bg-[#f4f6f8] px-2 py-3">CI · build</span>
          <span aria-hidden className="text-[#526778]">→</span>
          <span className="border border-[#5b9bd5] bg-[#f7fbff] px-2 py-3">
            Vercel · Registry · Azure
          </span>
        </div>
      </ArchitectureBoundary>

      <ArchitectureBoundary eyebrow="MIGRATION EVIDENCE" title="STG 데이터 이관 리허설" tone="green">
        <div className="grid grid-cols-4 p-3 max-sm:grid-cols-2 print:grid-cols-4">
          {[
            ["01", "Row count"],
            ["02", "MD5"],
            ["03", "FK integrity"],
            ["04", "API E2E"],
          ].map(([step, label], index) => (
            <div
              className={`${index > 0 ? "border-l border-[#cfe8d8]" : ""} min-w-0 px-2 py-3 text-center`}
              key={step}
            >
              <span className="block font-mono text-xs text-[#4f715d]">{step}</span>
              <strong className="mt-1 block text-xs leading-[1.3] text-[#174d2c]">{label}</strong>
            </div>
          ))}
        </div>
      </ArchitectureBoundary>
    </div>
  );
}

export function ThreadyRuntimeDiagram() {
  return (
    <figure className="portfolio-keep m-0 mt-6" data-thready-runtime-diagram>
      <ArchitectureFrame
        product="THREADY"
        status="CURRENT RUNTIME · STG / PROD"
        title="Product · backend · AI reference architecture"
      >
        <EntryPath />
        <RuntimeBoundaries />
        <DeliveryAndVerification />
      </ArchitectureFrame>
      <figcaption className="sr-only">
        사용자와 운영자는 Vercel의 Next.js 화면에서 Azure App Service의 FastAPI 제품
        백엔드로 요청합니다. 제품 백엔드는 제품 정책과 PostgreSQL 원장, 파일 저장소와
        외부 콘텐츠 API를 소유합니다. 원장 변경과 Outbox event는 같은 transaction에
        기록되고 relay retry와 delivery version fence를 거쳐 별도 FastAPI AI application과
        AI PostgreSQL로 전달됩니다. 제품 백엔드와 AI application은 STG와 Production에서
        운영하며, 데이터 이관 근거는 STG 리허설에서 row count, MD5, 참조 무결성, API
        E2E로 확인했습니다.
      </figcaption>
    </figure>
  );
}
