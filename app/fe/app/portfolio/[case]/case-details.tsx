/* 케이스 상세 콘텐츠 — canonical 은 app/design/portfolio-case-prototype.html.
   ⚠️ 창작 수치 금지 — 미확정 값은 [TBD] 유지 (rail note 계약) */

export type CaseDetail = {
  eyebrow: string;
  positioning: string;
  kv: { k: string; v: string }[];
  problem: React.ReactNode[];
  decisionIntro: React.ReactNode;
  decisions: { k: string; t: React.ReactNode }[];
  systemIntro: React.ReactNode;
  system: { title: string; desc: string }[];
  opsIntro: React.ReactNode;
  evidence: {
    index: string;
    label: string;
    claim: string;
    source: string;
  }[];
};

export const DETAILS: Record<string, CaseDetail> = {
  thready: {
    eyebrow: "Case 01 / 05 · AI Content Generation",
    positioning:
      "AI 콘텐츠 생성 backend를 전면 재구축하고, cutover 이후 개발·운영을 전담한 케이스.",
    kv: [
      { k: "Role", v: "Rebuild · Ownership" },
      { k: "Scope", v: "Generation Quality" },
      { k: "Stack", v: "FastAPI · LLM" },
      { k: "Status", v: "운영 중" },
    ],
    problem: [
      <>
        AI 콘텐츠 생성 제품 Thready의 backend를 인계받았을 때, 생성 품질이
        프롬프트·모델 호출에 흩어져 있어{" "}
        <strong>무엇이 좋은 출력인지 판정하고 회귀를 잡을 기준</strong>이 없었다.
        프롬프트는 문자열로 조립되어 타입 안전성과 재사용이 약했고, 실패·품질
        저하를 관측할 로깅 축도 부족했다.
      </>,
      <>
        그래서 부분 수정이 아니라 <strong>backend 전면 재구축</strong>과 cutover를
        선택하고, 이후 개발·운영을 전담하기로 했다.
      </>,
    ],
    decisionIntro: (
      <>
        품질을 &ldquo;감&rdquo;이 아니라 <strong>시스템</strong>으로 다루기 위해 세
        가지를 결정했다.
      </>
    ),
    decisions: [
      {
        k: "Typed Prompt",
        t: (
          <>
            프롬프트를 문자열이 아닌 <strong>typed prompt builder</strong>로 구성 —
            입력 계약을 타입으로 고정하고 재사용 가능하게 만든다.
          </>
        ),
      },
      {
        k: "Judge Loop",
        t: (
          <>
            <strong>LLM judge 기반 평가 루프</strong>를 도입 — 출력 품질을 판정
            가능한 축으로 만들어 회귀를 감지한다.
          </>
        ),
      },
      {
        k: "Observability",
        t: (
          <>
            <strong>관측 로깅</strong>을 표준으로 심어 — 생성 흐름과 실패를 사후에
            추적할 수 있게 한다.
          </>
        ),
      },
    ],
    systemIntro: (
      <>
        결정을 실제 backend 구조로 옮긴 결과, 생성 품질이{" "}
        <strong>재구축된 FastAPI backend 위의 시스템</strong>으로 자리 잡았다.
      </>
    ),
    system: [
      {
        title: "Typed Prompt Builder",
        desc: "프롬프트 조립을 타입으로 계약화 — 입력 누락·형 오류를 호출 전에 차단하고 재사용을 표준화.",
      },
      {
        title: "LLM Judge · 평가 루프",
        desc: "생성 출력을 judge로 채점하는 루프 — 품질을 판정 가능한 값으로 만들어 회귀 감지에 사용.",
      },
      {
        title: "관측 로깅",
        desc: "생성 흐름·실패 지점을 로깅 — 운영 중 문제를 사후 추적하고 원인을 좁힘.",
      },
      {
        title: "Rebuild + Cutover",
        desc: "부분 패치가 아닌 전면 재구축 후 cutover — 이후 개발·운영을 전담하는 단일 오너십.",
      },
    ],
    opsIntro: (
      <>
        재구축 이후 이 backend는 <strong>월 수만 건 규모의 요청</strong>을 처리하는
        production으로 운영되고 있다. 아래 근거 chip을 눌러 claim 요약을 확인할 수
        있다.
      </>
    ),
    evidence: [
      {
        index: "근거 1",
        label: "HTTP 5xx 0.3% 수준 운영",
        claim:
          "월 수만 건 규모 요청을 처리하는 production backend를 HTTP 5xx 0.3% 수준으로 운영",
        source: "Thready 운영 지표 · 운영 시점 기준",
      },
      {
        index: "근거 2",
        label: "월 수만 건 규모 요청 처리",
        claim:
          "production backend가 월 수만 건 규모의 생성 요청을 처리 — 구체 처리량 수치는 [TBD]",
        source: "운영 지표 (수치 확정 전)",
      },
    ],
  },
};
