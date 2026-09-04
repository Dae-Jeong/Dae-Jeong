import {
  ArchitectureBoundary,
  ArchitectureFrame,
  ArchitectureNode,
} from "./reference-architecture";

const currentFlow = [
  {
    code: "01",
    title: "요청 · 기획 · 디자인",
    detail: "고객·운영 요구를 제품 범위로 정리",
  },
  {
    code: "02",
    title: "Decision · SPEC",
    detail: "판단 배경, 사용자·API·UX 계약",
  },
  {
    code: "03",
    title: "Work Package",
    detail: "BE · FE · QA 담당과 검증 조건",
  },
  {
    code: "04",
    title: "Release Gate",
    detail: "QA 승인 → Git/CI/CD → 실행 환경",
  },
] as const;

const contextRecords = [
  ["WHY", "결정 배경"],
  ["WHO", "담당 · 상태"],
  ["PROOF", "QA · 검증 근거"],
  ["WHEN", "버전 · 후속 작업"],
] as const;

const currentFlowLabels = ["계약", "담당", "검증"] as const;

const axFlow = [
  {
    code: "IN",
    title: "회의 · 요청",
    detail: "새로운 판단과 실행이 필요한 업무 신호",
    tone: "slate" as const,
  },
  {
    code: "AI",
    title: "Agent가 준비",
    detail: "맥락 탐색, 초안 작성, 반복 실행, 검증 근거",
    tone: "blue" as const,
  },
  {
    code: "HUMAN",
    title: "사람이 판단하고 승인",
    detail: "제품 우선순위, 아키텍처, 담당, QA, release",
    tone: "dark" as const,
  },
  {
    code: "OUT",
    title: "배정 · 후속 작업",
    detail: "승인된 실행과 결과를 맥락에 다시 연결",
    tone: "green" as const,
  },
] as const;

const axFlowLabels = ["맥락", "초안·근거", "승인"] as const;

export function CompanyAxOperatingModel() {
  return (
    <figure
      aria-labelledby="company-ax-operating-model-title"
      className="portfolio-keep m-0 mt-6"
    >
      <div className="print:hidden">
        <ArchitectureFrame
          product="COMPANY AX · OPERATING MODEL"
          title="제품 실행 기록을 회사 업무의 다음 행동까지 연결"
          status="CURRENT · EXTENSION DESIGN"
        >
          <div className="grid gap-4 p-4">
            <ArchitectureBoundary
              eyebrow="CURRENT · PRODUCT DELIVERY"
              title="결정이 구현·검증·릴리스까지 이어지는 제품 운영 흐름"
              meta="제품별 운영 리드"
              tone="blue"
            >
              <div className="grid grid-cols-4 gap-10 p-4 max-[900px]:grid-cols-1 max-[900px]:gap-0">
                {currentFlow.map((step, index) => (
                  <FlowCell
                    key={step.code}
                    connector={currentFlowLabels[index]}
                    isLast={index === currentFlow.length - 1}
                  >
                    <ArchitectureNode
                      code={step.code}
                      title={step.title}
                      detail={step.detail}
                      tone={index === currentFlow.length - 1 ? "green" : "blue"}
                      className="h-full"
                    />
                  </FlowCell>
                ))}
              </div>
            </ArchitectureBoundary>

            <div aria-hidden className="grid justify-items-center text-[#158442]">
              <span className="h-5 border-l-2 border-[#158442]" />
              <span className="font-mono text-xs">실행 과정과 결과를 기록</span>
              <span className="text-base leading-none">↓</span>
            </div>

            <ArchitectureBoundary
              eyebrow="SHARED EXECUTION CONTEXT"
              title="Agent와 사람이 함께 읽는 실행 맥락"
              meta="MEDINESS 운영 plane"
              tone="green"
            >
              <div className="grid grid-cols-4 max-md:grid-cols-2 print:grid-cols-4">
                {contextRecords.map(([code, label], index) => (
                  <div
                    key={code}
                    className={`min-w-0 px-4 py-3 ${index > 0 ? "border-l border-[#cfe8d8]" : ""} ${index === 2 ? "max-md:border-l-0 max-md:border-t print:border-l print:border-t-0" : ""} ${index === 3 ? "max-md:border-t print:border-t-0" : ""}`}
                  >
                    <span className="font-mono text-xs text-[#2f6b45]">{code}</span>
                    <strong className="mt-1 block text-sm font-semibold text-[#174d2c]">{label}</strong>
                  </div>
                ))}
              </div>
            </ArchitectureBoundary>

            <div aria-hidden className="grid justify-items-center text-[#44515c]">
              <span className="text-base leading-none">↓</span>
              <span className="font-mono text-xs">맥락을 읽고 실행안을 준비</span>
              <span className="h-5 border-l-2 border-dashed border-[#44515c]" />
            </div>

            <ArchitectureBoundary
              eyebrow="AX EXTENSION · DESIGN PARTICIPATION"
              title="회사 업무는 Agent의 준비와 사람의 판단을 분리"
              meta="확장 설계"
              tone="slate"
              className="border-dashed"
            >
              <div className="grid grid-cols-4 gap-10 p-4 max-[900px]:grid-cols-1 max-[900px]:gap-0">
                {axFlow.map((step, index) => (
                  <FlowCell
                    key={step.code}
                    connector={axFlowLabels[index]}
                    isLast={index === axFlow.length - 1}
                    dashed
                  >
                    {step.tone === "dark" ? (
                      <div className="h-full min-w-0 border-2 border-[#111111] bg-[#111111] p-4 text-white">
                        <span className="font-mono text-xs text-white/70">HUMAN AUTHORITY</span>
                        <strong className="mt-2 block text-pretty text-sm font-semibold">{step.title}</strong>
                        <span className="mt-2 block text-pretty text-xs leading-[1.5] text-white/80">
                          {step.detail}
                        </span>
                      </div>
                    ) : (
                      <ArchitectureNode
                        code={step.code}
                        title={step.title}
                        detail={step.detail}
                        tone={step.tone}
                        className="h-full"
                      />
                    )}
                  </FlowCell>
                ))}
              </div>
            </ArchitectureBoundary>
          </div>
        </ArchitectureFrame>
      </div>

      <div className="hidden print:block">
        <ArchitectureFrame
          product="COMPANY AX · OPERATING MODEL"
          title="제품 실행 기록을 다음 업무의 입력으로 연결"
          status="CURRENT · EXTENSION"
        >
          <div className="grid gap-2 p-2">
            <section className="border border-[#5b9bd5] bg-white">
              <header className="flex items-center justify-between border-b border-[#cfe5f6] bg-[#edf7ff] px-2 py-1.5">
                <span>
                  <span className="block font-mono text-[10px] font-semibold text-[#0067b8]">
                    01 · CURRENT PRODUCT DELIVERY
                  </span>
                  <strong className="block text-[11px] text-[#183b56]">결정부터 릴리스까지 실제 운영</strong>
                </span>
                <span className="whitespace-nowrap font-mono text-[10px] text-[#47677f]">제품별 운영 리드</span>
              </header>
              <div className="grid grid-cols-4 gap-1.5 p-2">
                {currentFlow.map((step) => (
                  <div key={step.code} className="min-w-0 border border-[#b7d7f0] bg-[#f7fbff] p-2">
                    <span className="font-mono text-[10px] text-[#0078d4]">{step.code}</span>
                    <strong className="mt-0.5 block text-[12px] leading-[1.25] text-[#183b56]">
                      {step.title}
                    </strong>
                    <span className="mt-0.5 block text-[10px] leading-[1.35] text-[#526778]">
                      {step.detail}
                    </span>
                  </div>
                ))}
              </div>
            </section>

            <section className="border border-[#65ad83] bg-white">
              <header className="flex items-center justify-between border-b border-[#cfe8d8] bg-[#f1faf4] px-2 py-1.5">
                <span>
                  <span className="block font-mono text-[10px] font-semibold text-[#2f6b45]">
                    02 · SHARED EXECUTION CONTEXT
                  </span>
                  <strong className="block text-[11px] text-[#174d2c]">제품 실행 과정과 결과를 같은 맥락으로 기록</strong>
                </span>
                <span className="whitespace-nowrap font-mono text-[10px] text-[#2f6b45]">MEDINESS 운영 plane</span>
              </header>
              <div className="grid grid-cols-4">
                {contextRecords.map(([code, label], index) => (
                  <div
                    key={code}
                    className={`min-w-0 px-2 py-1.5 ${index > 0 ? "border-l border-[#cfe8d8]" : ""}`}
                  >
                    <span className="font-mono text-[10px] text-[#2f6b45]">{code}</span>
                    <strong className="ml-1 text-[11px] text-[#174d2c]">{label}</strong>
                  </div>
                ))}
              </div>
            </section>

            <section className="border border-dashed border-[#9ca8b1] bg-white">
              <header className="flex items-center justify-between border-b border-[#dce3e8] bg-[#f4f6f8] px-2 py-1.5">
                <span>
                  <span className="block font-mono text-[10px] font-semibold text-[#44515c]">
                    03 · AX EXTENSION DESIGN
                  </span>
                  <strong className="block text-[11px] text-[#1f2933]">Agent는 준비하고, 사람은 판단과 승인을 소유</strong>
                </span>
                <span className="whitespace-nowrap font-mono text-[10px] text-[#526778]">확장 설계</span>
              </header>
              <div className="grid grid-cols-[0.8fr_1.15fr_1.3fr_0.9fr] gap-1.5 p-2">
                <PrintAxNode code="IN" title="회의 · 요청" detail="새 판단과 실행 신호" />
                <PrintAxNode code="AI" title="Agent가 준비" detail="탐색 · 초안 · 실행안 · 근거" tone="blue" />
                <PrintAxNode
                  code="HUMAN"
                  title="판단 · 승인"
                  detail="우선순위 · 아키텍처 · 담당 · QA · release"
                  tone="dark"
                />
                <PrintAxNode code="OUT" title="배정 · 후속 작업" detail="승인 결과를 다시 기록" tone="green" />
              </div>
            </section>
          </div>
        </ArchitectureFrame>
      </div>

      <figcaption className="mt-3 space-y-1 text-xs leading-[1.6] text-fg-2">
        <span className="block">실선 영역은 제품별로 실제 적용·운영한 흐름입니다.</span>
        <span className="block">
          점선 영역은 제품 운영에서 쌓인 기록을 회사 업무 AX로 넓히는 설계 범위입니다.
          Agent는 실행안을 준비하고 제품 판단과 최종 승인은 사람이 소유합니다.
        </span>
      </figcaption>
    </figure>
  );
}

function PrintAxNode({
  code,
  title,
  detail,
  tone = "slate",
}: {
  code: string;
  title: string;
  detail: string;
  tone?: "slate" | "blue" | "green" | "dark";
}) {
  const toneClass = {
    slate: "border-[#b9c3cb] bg-[#f4f6f8] text-[#1f2933]",
    blue: "border-[#5b9bd5] bg-[#f7fbff] text-[#183b56]",
    green: "border-[#65ad83] bg-[#f5fbf7] text-[#174d2c]",
    dark: "border-[#111111] bg-[#111111] text-white",
  }[tone];

  return (
    <div className={`min-w-0 border p-2 ${toneClass}`}>
      <span className="font-mono text-[10px] opacity-70">{code}</span>
      <strong className="mt-0.5 block text-[12px] leading-[1.25]">{title}</strong>
      <span className="mt-0.5 block text-[10px] leading-[1.35] opacity-75">{detail}</span>
    </div>
  );
}

function FlowCell({
  children,
  connector,
  isLast,
  dashed = false,
}: {
  children: React.ReactNode;
  connector?: string;
  isLast: boolean;
  dashed?: boolean;
}) {
  return (
    <div className="relative min-w-0">
      {children}
      {!isLast ? (
        <>
          <div
            aria-hidden
            className="absolute left-full top-1/2 flex w-10 -translate-y-1/2 items-center text-[#44515c] max-[900px]:hidden"
          >
            <span className="absolute bottom-[calc(100%+0.2rem)] left-1/2 -translate-x-1/2 whitespace-nowrap font-mono text-[10px] text-[#526778]">
              {connector}
            </span>
            <span className={`h-px flex-1 border-t-2 ${dashed ? "border-dashed" : "border-solid"}`} />
            <span className="text-sm leading-none">→</span>
          </div>
          <div
            aria-hidden
            className="hidden h-12 flex-col items-center justify-center font-mono text-[10px] text-[#526778] max-[900px]:flex"
          >
            <span>{connector}</span>
            <span className={`h-5 border-l-2 ${dashed ? "border-dashed" : "border-solid"}`} />
            <span className="-mt-1 text-sm leading-none">↓</span>
          </div>
        </>
      ) : null}
    </div>
  );
}
