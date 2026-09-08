import type { RolePortfolio } from "./types";
import type { DesignDiagramKey } from "@/app/portfolio/diagrams/design-diagrams";

export type FeaturingCaseDetail = {
  slug: "thready" | "thready-rebuild" | "centurion-platform" | "be-template";
  eyebrow: string;
  title: string;
  summary: string;
  flow: readonly {
    label: string;
    detail: string;
    tone?: "context" | "decision" | "outcome";
  }[];
  blocks: readonly {
    label: string;
    title: string;
    text: string;
    items?: readonly string[];
  }[];
  boundary: string;
  jdFit: string;
  /** 설계 도식 (시퀀스·상태·판단 비교). 구조도가 아니라 설계를 보여준다. 배열 순서 = 우선순위. */
  designs?: readonly DesignDiagramKey[];
};

export const FEATURING_CASE_DETAILS: readonly FeaturingCaseDetail[] = [
  {
    slug: "thready",
    // 데이터 케이스: 멱등 importer + 품질 판정 3층
    designs: ["idempotent-importer", "quality-layers"],
    eyebrow: "SNS 데이터 · 사람 평가",
    title: "SNS 관측 데이터를 제품 기준과 재적재 가능한 평가 workflow로 바꿨습니다",
    summary:
      "직접 분석한 표본, 별도 시장 data의 latest·history, 원문 corpus와 사람 평가의 책임을 나눠 변경과 재처리가 가능한 workflow로 만들었습니다.",
    flow: [
      { label: "Latest state", detail: "URL별 현재 상태", tone: "context" },
      { label: "History", detail: "반복 관측", tone: "context" },
      { label: "Outcome", detail: "5개 후보 비교", tone: "decision" },
      { label: "Human review", detail: "API/UI 평가", tone: "outcome" },
    ],
    blocks: [
      {
        label: "문제·판단",
        title: "하나의 숫자 대신 데이터의 생명주기를 나눴습니다",
        text: "반응이 좋은 콘텐츠를 단일 threshold로 고정하지 않고, 최신 상태·시계열 관측·원문 corpus·사람 평가를 서로 다른 책임으로 분리했습니다.",
        items: [
          "Threads 게시물 4,039건을 직접 수집·분석해 생성 기준 수립",
          "별도 시장 data의 latest 13.1만 행·observation 318만 행을 기반으로 절대·저자 상대·domain 상대·참여 품질·합의 기준의 5개 outcome 후보를 병렬 설계",
        ],
      },
      {
        label: "운영 범위",
        title: "정제·적재·평가 구간을 재적재 가능한 workflow로 만들었습니다",
        text: "수집기는 별도 파이프라인이고, 정제·적재·평가 구간을 설계·구현했습니다.",
        items: [
          "한국어 본문 11.1만 건·작성자 이어쓰기 18.5만 건을 독립 labeling schema로 이관",
          "typed validation·source key upsert·continuation replace 기반 멱등 importer와 API/UI workbench 구축",
          "malformed batch rollback·기존 label 보존·count 정합성을 local 전체 적재와 증분 재적재로 검증",
        ],
      },
    ],
    boundary:
      "수집기는 별도 파이프라인이고, outcome·schema·importer·API/UI workbench의 정제·적재·평가 구간을 직접 설계·구현했습니다.",
    jdFit:
      "피처링의 SNS data engine에 identity·history·idempotency·human evaluation을 분리한 경험으로 답할 수 있습니다.",
  },
  {
    slug: "thready-rebuild",
    // 백엔드 지원본: 재구축 판단 → 전달 정합성 → 구현 agent. AX는 역할 그래프 한 장만 뒤에 (지원자 결정: 낮은 우선순위로 포함).
    designs: ["rebuild-contract", "outbox-delivery", "thready-agent", "thready-ax-roles"],
    eyebrow: "backend 전환 · 실제 사용자 운영",
    title: "검증용 prototype backend를 실제 사용자가 쓰는 운영 구조로 전환했습니다",
    summary:
      "제품과 frontend를 유지하면서 부분 수정과 backend 병렬 재구축을 비교하고, 검증 harness와 cutover 기준으로 팀의 합의를 만든 뒤 FastAPI backend를 교체했습니다.",
    flow: [
      { label: "Prototype", detail: "빠른 기능 검증", tone: "context" },
      { label: "Inventory", detail: "API·기능 비교", tone: "decision" },
      { label: "v1.1.0", detail: "Backend cutover", tone: "decision" },
      { label: "v1.3.0", detail: "실제 사용자 운영", tone: "outcome" },
    ],
    blocks: [
      {
        label: "대안·선택",
        title: "부분 수정과 병렬 재구축의 비용을 먼저 비교했습니다",
        text: "기능 검증에는 빨랐던 초기 backend의 domain 의존성과 회귀 위험이 커졌습니다. 서비스가 작고 AI module 확장이 예정된 시점이어서 backend 범위만 병렬 재구축했습니다.",
        items: [
          "API·기능 inventory와 응답 비교 harness를 팀의 합의 근거로 사용",
          "FastAPI backend 경계를 새로 두고 기존 frontend는 유지",
          "coding agent는 codebase 분석·inventory·반복 구현에 활용하고 architecture·검증·cutover 판단은 직접 소유",
        ],
      },
      {
        label: "검증·결과",
        title: "API 호환성을 검증하며 백엔드를 전환했습니다",
        text: "기존 동작과 새 backend 응답을 비교하고 test acceptance를 통과한 범위부터 전환했습니다. 기존 화면의 API 계약을 유지하면서 도메인·저장소·트랜잭션 책임을 분리했습니다.",
        items: [
          "패턴·계층·검증 하네스를 먼저 구성한 뒤 v1.1.0에서 backend cutover",
          "v1.3.0부터 실제 사용자가 쓰는 backend를 계속 개발·운영",
        ],
      },
      {
        label: "운영 전환 이후",
        title: "제품 원장과 AI 실행 상태를 분리하고 전달 정합성을 검증했습니다",
        text: "AI 실행부를 독립 FastAPI application·DB로 분리하고, 원장 변경과 같은 transaction에 기록하는 Transactional Outbox로 지연·중복·역순 전달이 최신 상태를 덮지 않게 했습니다.",
        items: [
          "lease 기반 claim·attempt token·delivery version fence·멱등 consumer·terminal failure 보존",
          "STG 생성 이력 2,616건·품질 795건·추적 7,111건 이관을 MD5 fingerprint·FK orphan 0건으로 검증",
          "배포 성공과 기능 동작을 분리한 post-deploy 생성 API E2E gate",
        ],
      },
    ],
    boundary:
      "FastAPI backend 재구축과 이후 개발·운영을 전담하고, 기존 화면의 API 계약을 유지하며 전환을 주도했습니다.",
    jdFit:
      "검증 중인 제품을 멈추지 않고 신규 backend로 전환하고 안정화한 판단·설득·실행 경험입니다.",
  },
  {
    slug: "centurion-platform",
    // 외부 의존성 실패를 구조로 흡수한 사례를 worker 옆에.
    designs: ["bay-worker", "say-overlap-sessions"],
    eyebrow: "MSA · 비동기 복구",
    title: "비동기 실패를 제품 상태와 재처리 흐름으로 드러냈습니다",
    summary:
      "Gateway·SSO·FastAPI service가 연결된 의료 MSA에서 주문·재고 API와 RabbitMQ·TaskIQ worker를 구축하고, 외부 알림 실패를 찾고 다시 처리할 수 있는 운영 경계로 만들었습니다.",
    flow: [
      { label: "Order API", detail: "핵심 transaction", tone: "context" },
      { label: "TaskIQ worker", detail: "외부 알림 분리", tone: "decision" },
      { label: "PENDING / FAILED", detail: "상태 기록", tone: "decision" },
      { label: "Retry / resend", detail: "자동·수동 복구", tone: "outcome" },
    ],
    blocks: [
      {
        label: "문제·선택",
        title: "API 성공이 외부 작업 완료를 뜻하지 않게 했습니다",
        text: "주문 transaction이 끝난 뒤 공급사·병원 알림은 별도로 실패할 수 있었습니다. API 요청 안에서 모든 작업을 끝내지 않고 worker로 분리했습니다.",
        items: [
          "async FastAPI 실행 모델과의 정합성을 기준으로 Celery에서 TaskIQ·RabbitMQ로 전환",
          "알림 domain·service·worker와 worker image를 별도 배포 단위로 분리",
        ],
      },
      {
        label: "구현·검증",
        title: "실패 상태와 복구 방법을 주문 흐름에 연결했습니다",
        text: "발송 결과를 PENDING·FAILED 상태와 연결하고 자동 retry·최종 실패·수동 재발송 경계를 구현했습니다.",
        items: [
          "실패 기록을 남겨 API 성공 뒤 남은 작업을 다시 찾을 수 있게 구성",
          "API test infrastructure·Docker CI와 local 실행·onboarding 문서 구축",
        ],
      },
    ],
    boundary:
      "주문·재고 backend와 worker 구축은 주도했고, Gateway·SSO는 연동 범위에서 담당했습니다.",
    jdFit:
      "피처링 engine의 service 배포·운영과 데이터 작업 실패 복구를 상태·retry·재처리 관점에서 설명하는 근거입니다.",
  },
  {
    slug: "be-template",
    designs: ["transaction-template"],
    eyebrow: "FastAPI 표준 · transaction",
    title: "service·repository·transaction 책임을 실행 가능한 기본값으로 만들었습니다",
    summary:
      "여러 FastAPI service가 entity·business logic·DB 접근과 transaction 책임을 다르게 해석하지 않도록 조직 template에 계층·DI·session ownership·검증 기준을 구현했습니다.",
    flow: [
      { label: "Router", detail: "request input", tone: "context" },
      { label: "Service", detail: "@transactional policy", tone: "decision" },
      { label: "SessionProxy", detail: "현재 AsyncSession", tone: "decision" },
      { label: "Repository", detail: "SQL·flush", tone: "outcome" },
    ],
    blocks: [
      {
        label: "문제·판단",
        title: "session 전달 반복보다 transaction 책임의 위치를 먼저 정했습니다",
        text: "Router에서 받은 session이 모든 계층의 signature를 통과하고, transaction을 참여·분리·중첩할 위치가 호출부마다 달라질 수 있었습니다.",
        items: [
          "Router·Service·Validator·Repository·Model과 DI로 책임과 의존 방향을 고정",
          "Repository는 SQL 실행·flush, Service는 transaction policy를 소유",
        ],
      },
      {
        label: "failure mode·검증",
        title: "편의보다 session ownership과 실패 복구를 예측할 수 있게 했습니다",
        text: "ContextVar·SessionProxy로 현재 AsyncSession을 resolve하되 하나의 transaction은 하나의 asyncio task와 session이 소유하도록 제한했습니다.",
        items: [
          "REQUIRED·REQUIRES_NEW·NESTED propagation과 SAVEPOINT 동작 구현",
          "child task의 동일 session 접근을 fail-fast",
          "cancellation rollback·connection cleanup·transaction propagation을 integration test로 검증",
          "병렬 DB 작업의 데이터 가시성·복구·connection 비용을 ADR·runbook에 기록",
        ],
      },
    ],
    boundary:
      "FastAPI·SQLAlchemy 조직 template은 직접 구축·적용했고, 모든 service의 동일 version 전환을 의미하지는 않습니다.",
    jdFit:
      "피처링 JD의 entity 구조·modular development·test 요구를 구체적인 transaction/session contract와 검증 방식으로 보여줍니다.",
  },
];

export const FEATURING_PORTFOLIO = {
  slug: "featuring",
  label: "피처링 · Backend Engineer",
  shortLabel: "피처링",
  signals: [
    "SNS data → 평가 workflow",
    "prototype → production backend",
    "service·worker 복구",
    "transaction 기준",
  ],
  description:
    "SNS data 생명주기, backend cutover, MSA·transaction 복구 경계를 피처링 JD 순서로",
  status: "draft",
  visibility: "local",
  updatedAt: "2026-09-03",
  heroVariant: "light",
  // hero: Product Engineer 한 줄이 메인. 보조 줄·상태 라벨·중복 목차는 두지 않는다 (2026-09-03).
  brandLine: "",
  headline: "가능성을 기회로 바꾸고, 제품으로 가치를 전하는 메이커 김대정입니다.",
  // hero 문단은 두 문장까지. 세부는 오른쪽 목차와 케이스가 맡는다 (2026-09-03).
  introduction:
    "기획자로 시작해 백엔드로 왔고, 지금은 아이디어를 제안한 AI 콘텐츠 제품의 백엔드·AI 실행부를 직접 만들고 핵심 화면은 coding agent로 완성해 월 1천만원 수준의 구독 매출이 발생하는 제품으로 운영합니다. AI 활용이 본격화되면서 모두가 메이커로 제품을 만들고 운영하는 팀이라, 백엔드 경험이 적은 팀원도 같은 기준으로 만들 수 있는 FastAPI 표준을 직접 세웠습니다.",
  proofAxes: [
    {
      title: "SNS 관측 데이터를 제품 기준과 평가 workflow로",
      description:
        "게시물 데이터를 최신 상태·시계열·원문·사람 평가로 나누고, 다시 넣어도 결과가 같은 평가 workflow로 연결했습니다.",
    },
    {
      title: "검증용 prototype을 실제 운영 backend로",
      description:
        "기존 화면의 API 계약을 유지하며 FastAPI backend로 전환하고 실제 사용자의 기능 개발·배포·운영을 이어갔습니다.",
    },
    {
      title: "실패를 상태와 복구 흐름으로",
      description:
        "외부 작업이 실패해도 주문이 멈추지 않도록 재시도·최종 실패·수동 재처리를 제품 흐름에 넣었습니다.",
    },
    {
      title: "팀이 같은 기준으로 만드는 FastAPI 표준",
      description:
        "백엔드 경험이 적은 팀원도 같은 구조로 운영 제품을 만들 수 있게 transaction·session 기준을 template로 만들었습니다.",
    },
  ],
  cases: [
    {
      kind: "dossier",
      slug: "thready",
      label: "SNS 관측 데이터 · 평가 workflow",
      focus:
        "직접 분석한 표본, 시장 data의 latest·history, local corpus 적재와 사람 평가를 구분해 봅니다.",
      scope: "Outcome 설계 · Importer·API/UI 직접 구축",
    },
    {
      kind: "dossier",
      slug: "thready-rebuild",
      label: "prototype backend 재구축 · 운영",
      focus:
        "부분 수정과 병렬 재구축의 비교, 팀 설득, validation harness, cutover와 실제 사용자 운영을 봅니다.",
      scope: "FastAPI Backend 재구축·운영 전담",
    },
    {
      kind: "dossier",
      slug: "centurion-platform",
      label: "MSA·비동기 작업 복구",
      focus:
        "주문 transaction과 외부 작업을 분리하고 상태·retry·최종 실패·수동 재처리를 제품 흐름에 연결한 경험을 봅니다.",
      scope: "주문·재고 Backend · Worker 주도",
    },
    {
      kind: "dossier",
      slug: "be-template",
      label: "FastAPI service·transaction 기준",
      variant: "backend-template",
      focus:
        "entity·service·repository·transaction 책임과 AsyncSession ownership을 반복 가능한 조직 기준으로 만든 경험을 봅니다.",
      scope: "FastAPI Template 직접 구축",
    },
  ],
} satisfies RolePortfolio<"featuring">;
