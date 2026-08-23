import {
  ArchitectureArrow,
  ArchitectureBoundary,
  ArchitectureFrame,
  ArchitectureNode,
} from "./reference-architecture";

function AccessPath() {
  return (
    <div className="border-b border-[#b7d7f0] bg-white p-5 print:p-3">
      <div className="grid grid-cols-[minmax(0,0.9fr)_44px_minmax(0,1fr)_44px_minmax(0,0.9fr)_44px_minmax(0,1fr)] items-center gap-2 max-lg:grid-cols-1 print:grid-cols-[minmax(0,0.9fr)_30px_minmax(0,1fr)_30px_minmax(0,0.9fr)_30px_minmax(0,1fr)]">
        <ArchitectureNode code="UI" detail="HTTPS · WSS" title="Consultation UI" />
        <ArchitectureArrow />
        <ArchitectureNode code="GW" detail="Express" title="API Gateway" tone="blue" />
        <ArchitectureArrow label="auth" />
        <ArchitectureNode code="SSO" detail="NestJS" title="Common SSO" />
        <ArchitectureArrow label="session" />
        <ArchitectureNode code="WS" detail="WebSocket · API" title="Realtime Boundary" tone="blue" />
      </div>
    </div>
  );
}

function RuntimePath() {
  return (
    <div className="grid grid-cols-[minmax(0,0.9fr)_50px_minmax(0,1fr)_50px_minmax(0,1fr)_50px_minmax(0,1fr)] items-center gap-2 border-b border-[#b7d7f0] p-5 max-lg:grid-cols-1 print:grid-cols-[minmax(0,0.9fr)_28px_minmax(0,1fr)_28px_minmax(0,1fr)_28px_minmax(0,1fr)] print:p-3">
      <ArchitectureNode
        code="SES"
        detail="connect · pause · complete · timeout"
        title="Session Orchestrator"
        tone="slate"
      />
      <ArchitectureArrow />
      <ArchitectureNode code="STT" detail="provider event adapter" title="STT Adapter" tone="blue" />
      <ArchitectureArrow />
      <ArchitectureNode code="EVT" detail="DELTA · COMPLETE · CORRECTED" title="Transcript Events" tone="blue" />
      <ArchitectureArrow />
      <ArchitectureNode code="AI" detail="Advice · Upsell · Process" title="Advice Engine" tone="green" />
    </div>
  );
}

function TranscriptAndLifecycle() {
  return (
    <div className="grid grid-cols-[minmax(0,1.5fr)_minmax(0,0.75fr)] gap-4 border-b border-[#b7d7f0] p-5 max-lg:grid-cols-1 print:grid-cols-[minmax(0,1.5fr)_minmax(0,0.75fr)] print:gap-2 print:p-3">
      <ArchitectureBoundary eyebrow="TRANSCRIPT EVENT DETAIL" title="빠른 반응과 확정 문맥을 다른 경로로 처리">
        <div className="grid grid-cols-[70px_minmax(0,1fr)_minmax(0,1fr)] gap-x-3 gap-y-2 p-4 max-sm:grid-cols-1 print:grid-cols-[46px_minmax(0,1fr)_minmax(0,1fr)] print:p-2">
          <div className="row-span-2 grid place-items-center border border-[#b7d7f0] bg-white font-mono text-xs text-[#183b56] max-sm:row-span-1 print:row-span-2">
            AUDIO
          </div>
          <ArchitectureNode code="Δ" detail="같은 발화의 최신 중간 전사" title="DELTA" tone="blue" />
          <ArchitectureNode code="KEY" detail="일치 시 generation 시작" title="Domain keyword match" tone="blue" />
          <ArchitectureNode code="✓" detail="확정 전사" title="COMPLETE" tone="green" />
          <div className="grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-2">
            <span className="border border-dashed border-[#65ad83] bg-white px-2 py-3 text-center text-xs text-[#174d2c]">
              CORRECTED <span className="block opacity-70">optional</span>
            </span>
            <span aria-hidden className="font-mono text-[#158442]">→</span>
            <span className="border border-[#65ad83] bg-[#f5fbf7] px-2 py-3 text-center text-xs font-semibold text-[#174d2c]">
              Context · Save
            </span>
          </div>
        </div>
        <div className="border-t border-[#cfe5f6] bg-[#f7fbff] px-4 py-3 text-xs leading-[1.5] text-[#526778] print:px-2 print:py-2">
          VAD는 발화 시작·종료 경계를 보조하고, optional correction은 같은 sequence의
          전사만 교체합니다.
        </div>
      </ArchitectureBoundary>

      <ArchitectureBoundary eyebrow="SESSION LIFECYCLE" title="종료를 재연결 차단까지 수렴" tone="slate">
        <div className="grid gap-2 p-4 print:p-2">
          <ArchitectureNode code="END" title="Session closed" />
          <ArchitectureArrow tone="slate" />
          <ArchitectureNode code="G" detail="timer · GC · shutdown" title="Stop guard" tone="slate" />
          <ArchitectureArrow tone="slate" />
          <ArchitectureNode code="X" title="Reconnect blocked" tone="green" />
        </div>
      </ArchitectureBoundary>
    </div>
  );
}

function VerificationLane() {
  return (
    <div className="bg-white p-5 print:p-3">
      <div className="mb-3 flex flex-wrap items-baseline justify-between gap-3">
        <span>
          <span className="block font-mono text-xs font-semibold tracking-[0.04em] text-[#44515c]">
            DELIVERY · TEST · OPERATIONS
          </span>
          <strong className="mt-1 block text-sm text-[#1f2933]">
            provider 변경과 session failure를 재생 가능한 검증으로 보호
          </strong>
        </span>
        <span className="font-mono text-xs text-[#526778]">
          공동 주 기여 · 4분 37초 E2E · seq 1—25 integrity
        </span>
      </div>
      <div className="grid grid-cols-4 border border-[#c7d1d9] max-lg:grid-cols-2 max-sm:grid-cols-1 print:grid-cols-4">
        {[
          ["01", "Provider benchmark", "WER · CER · latency · 용어 보존율"],
          ["02", "E2E replay", "sequence · event integrity"],
          ["03", "Regression tests", "reconnect · GC · stop guard"],
          ["04", "Release boundary", "resource 분리 · migration 문서"],
        ].map(([step, title, detail], index) => (
          <div
            className={`${index > 0 ? "border-l border-[#dce3e8] max-sm:border-l-0 max-sm:border-t print:border-l print:border-t-0" : ""} min-w-0 p-3`}
            key={step}
          >
            <span className="font-mono text-xs text-[#65727d]">{step}</span>
            <strong className="mt-2 block text-xs text-[#1f2933]">{title}</strong>
            <span className="mt-1 block text-xs leading-[1.45] text-[#5f6b75]">{detail}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function SayRealtimeDiagram() {
  return (
    <figure className="portfolio-keep m-0 mt-6" data-say-realtime-diagram>
      <ArchitectureFrame
        product="CENTURION · SAY"
        status="REALTIME CONSULTATION"
        title="Session · transcription · advice reference architecture"
      >
        <AccessPath />
        <RuntimePath />
        <TranscriptAndLifecycle />
        <VerificationLane />
      </ArchitectureFrame>
      <figcaption className="sr-only">
        상담 화면은 Express API Gateway와 NestJS SSO, WebSocket 경계를 거쳐 session
        orchestrator에 연결됩니다. STT adapter는 provider event를 DELTA와 COMPLETE로
        변환합니다. DELTA에서 도메인 키워드가 일치하면 조언 생성을 먼저 시작하고,
        COMPLETE는 확정 문맥과 저장에 사용합니다. 선택적 보정은 같은 sequence의 전사만
        교체합니다. session 종료 뒤 stop guard가 timer와 GC, shutdown 정리를 거쳐 재연결을
        차단하며, provider benchmark와 E2E replay, 회귀 테스트가 변경을 검증합니다.
      </figcaption>
    </figure>
  );
}
