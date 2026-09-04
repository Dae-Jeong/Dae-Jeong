import {
  ArchitectureArrow,
  ArchitectureBoundary,
  ArchitectureFrame,
  ArchitectureNode,
} from "./reference-architecture";

function SharedAccessLayer() {
  return (
    <div className="border-b border-[#b7d7f0] bg-white p-5 print:p-3">
      <div className="grid grid-cols-[minmax(0,0.8fr)_64px_minmax(0,1fr)_64px_minmax(0,1fr)] items-center gap-3 max-md:grid-cols-1 print:grid-cols-[minmax(0,0.8fr)_42px_minmax(0,1fr)_42px_minmax(0,1fr)] print:gap-2">
        <ArchitectureNode code="UI" detail="사용자 · 운영자" title="Product Clients" />
        <ArchitectureArrow label="HTTPS" />
        <ArchitectureNode
          code="GW"
          detail="Express · service routing"
          title="API Gateway"
          tone="blue"
        />
        <ArchitectureArrow dashed tone="slate" />
        <ArchitectureNode
          code="SSO"
          detail="NestJS · session validation"
          title="Common SSO"
          tone="slate"
        />
      </div>
      <div className="mt-4 flex items-center gap-3 font-mono text-xs text-[#526778] print:mt-2">
        <span className="h-px flex-1 bg-[#b7d7f0]" />
        <span>AUTHENTICATED SERVICE ROUTES</span>
        <span className="h-px flex-1 bg-[#b7d7f0]" />
      </div>
    </div>
  );
}

function ProductLane({
  eyebrow,
  title,
  role,
  summary,
  steps,
  tone = "blue",
}: {
  eyebrow: string;
  title: string;
  role: string;
  summary: string;
  steps: [string, string][];
  tone?: "blue" | "green" | "slate";
}) {
  return (
    <ArchitectureBoundary eyebrow={eyebrow} meta={role} title={title} tone={tone}>
      <div className="p-4 print:p-2">
        <p className="m-0 min-h-[3.8rem] text-sm leading-[1.55] text-[#334e62] print:min-h-0 print:text-[10px]">
          {summary}
        </p>
        <div className="mt-4 grid gap-2 print:mt-2">
          {steps.map(([code, label], index) => (
            <div className="grid grid-cols-[36px_minmax(0,1fr)] items-center gap-3" key={code}>
              <span
                aria-hidden
                className="grid size-9 place-items-center border border-current font-mono text-xs font-semibold"
              >
                {code}
              </span>
              <span className="relative border-b border-[#dce8f2] py-2 text-xs font-semibold leading-[1.35] text-[#183b56] last:border-b-0 print:py-1.5">
                {label}
                {index < steps.length - 1 ? (
                  <span aria-hidden className="absolute -bottom-[9px] left-[-31px] text-[#0078d4]">
                    ↓
                  </span>
                ) : null}
              </span>
            </div>
          ))}
        </div>
      </div>
    </ArchitectureBoundary>
  );
}

function ServiceLanes() {
  return (
    <div className="grid grid-cols-3 gap-3 border-b border-[#b7d7f0] p-5 max-lg:grid-cols-1 print:grid-cols-3 print:gap-2 print:p-3">
      <ProductLane
        eyebrow="DAY · CRM"
        role="연결 주도"
        summary="예약 정책을 백엔드 판단부터 화면 표시, QA와 릴리스까지 같은 기준으로 연결했습니다."
        title="예약 정책을 제품 흐름으로 연결"
        steps={[
          ["BE", "예약 정책 · API 판단"],
          ["FE", "화면 상태 · 사용자 흐름"],
          ["QA", "검증 기준 · Release"],
        ]}
        tone="slate"
      />

      <ProductLane
        eyebrow="BAY · ORDER / INVENTORY"
        role="구축 주도"
        summary="요청 처리와 외부 연동의 실패 경계를 나누고 작업 상태를 기록해 실패한 후속 작업만 다시 처리하게 했습니다."
        title="요청 경계와 작업 상태를 분리"
        steps={[
          ["TX", "API 판정 · 작업 상태 생성"],
          ["RUN", "RabbitMQ → TaskIQ"],
          ["REC", "FAILED · retry · manual"],
        ]}
      />

      <ProductLane
        eyebrow="SAY · REALTIME AI"
        role="공동 개발"
        summary="실시간 전사와 조언 생성, 상담 종료를 서로 다른 lifecycle로 나눠 공동 개발했습니다."
        title="실시간 반응과 세션 종료를 분리"
        tone="green"
        steps={[
          ["WS", "WebSocket session"],
          ["STT", "DELTA · COMPLETE"],
          ["END", "Sequence · stop guard"],
        ]}
      />
    </div>
  );
}

function CrossServiceContribution() {
  return (
    <div className="grid grid-cols-[190px_minmax(0,1fr)_minmax(0,1fr)] bg-white max-md:grid-cols-1 print:grid-cols-[125px_minmax(0,1fr)_minmax(0,1fr)]">
      <div className="bg-[#f4f6f8] px-5 py-4 print:px-3 print:py-2">
        <span className="block font-mono text-xs font-semibold text-[#44515c]">CROSS-SERVICE</span>
        <strong className="mt-1 block text-sm text-[#1f2933]">공통 경계 기여</strong>
      </div>
      <div className="border-l border-[#dce3e8] px-5 py-4 max-md:border-l-0 max-md:border-t print:px-3 print:py-2">
        <strong className="block text-xs text-[#1f2933]">시설 · 재고 연동</strong>
        <span className="mt-1 block text-xs leading-[1.45] text-[#5f6b75]">
          재고 연동 실패가 시술 완료를 되돌리지 않도록 작업을 분리
        </span>
      </div>
      <div className="border-l border-[#dce3e8] px-5 py-4 max-md:border-l-0 max-md:border-t print:px-3 print:py-2">
        <strong className="block text-xs text-[#1f2933]">로그인 세션 정책</strong>
        <span className="mt-1 block text-xs leading-[1.45] text-[#5f6b75]">
          여러 서비스가 같은 인증 경계를 사용하도록 정책 연결
        </span>
      </div>
    </div>
  );
}

export function CenturionContributionDiagram() {
  return (
    <figure className="portfolio-keep m-0 mt-6" data-centurion-contribution-diagram>
      <ArchitectureFrame
        product="CENTURION"
        status="SCOPE MAP"
        title="공통 진입 경계와 세 서비스의 책임 범위"
      >
        <SharedAccessLayer />
        <ServiceLanes />
        <CrossServiceContribution />
      </ArchitectureFrame>
      <figcaption className="sr-only">
        공통 Express API Gateway와 NestJS SSO 아래에서 DAY 예약 정책은 백엔드부터 화면,
        QA와 릴리스까지 연결을 주도했습니다. BAY 주문·재고는 요청 처리와 외부 연동의
        실패 경계를 분리하고 작업 상태·재시도·수동 복구가 가능한 backend 구축을
        주도했습니다. SAY 실시간
        AI 상담은 WebSocket session, DELTA와 COMPLETE 전사, 종료 후 재연결 차단을 공동
        개발했습니다. 시설·재고 연동과 여러 서비스의 로그인 세션 정책에도 기여했습니다.
      </figcaption>
    </figure>
  );
}
