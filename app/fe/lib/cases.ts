/* 케이스 메타 — 목록·상세·rail 이 공유하는 단일 소스.
   ⚠️ 표현은 확정 프로토타입(index pf 아코디언·portfolio 프로토타입) 범위 안에서만 */

export type CaseMeta = {
  slug: string;
  no: string;
  name: string;
  tag: string;
  blurb: string;
  role: string;
  scope: string;
  /** 상세 페이지 준비 여부 — false 면 목록에서 비활성 행 */
  available: boolean;
};

export const CASES: CaseMeta[] = [
  {
    slug: "thready",
    no: "01",
    name: "AI 콘텐츠 생성 backend 재구축",
    tag: "AI 콘텐츠 생성 제품 · Thready",
    blurb:
      "AI 콘텐츠 생성 backend를 전면 재구축하고 이후 개발·운영을 전담. 자동 게이트·실측 분포 대조·사람 판정 3층으로 생성 품질을 판정 가능하게 만들고, 파이프라인을 planner·writer 역할로 분리해 설계·구현했다.",
    role: "Rebuild · Ownership",
    scope: "Quality · Agent",
    available: true,
  },
  {
    slug: "bay-async",
    no: "02",
    name: "주문·재고 비동기 처리",
    tag: "AI 메디컬 플랫폼 · Centurion",
    blurb:
      "주문·재고 API와 RabbitMQ·TaskIQ 비동기 worker를 설계하고, retry·test·CI 구축을 주도. 실패 가능한 작업을 worker로 분리해 처리 경계를 명확히 했다.",
    role: "Lead",
    scope: "Async · CI",
    available: true,
  },
  {
    slug: "say-realtime",
    no: "03",
    name: "실시간 상담 AI 세션",
    tag: "AI 메디컬 플랫폼 · Centurion",
    blurb:
      "realtime AI 상담 backend의 세션 lifecycle과 provider 경계 안정화에 공동 주 기여. realtime session의 시작·유지·종료 흐름을 다뤘다.",
    role: "Co-Lead Contrib.",
    scope: "Session Lifecycle",
    available: true,
  },
  {
    slug: "be-template",
    no: "04",
    name: "조직 표준 백엔드 템플릿",
    tag: "조직 표준 · MediSolve AI",
    blurb:
      "조직 표준 FastAPI template과 agent context system을 설계·구축 전담. layered architecture·DI·ADR·convention을 표준으로 정립했다.",
    role: "Owner",
    scope: "Org Standard",
    available: true,
  },
  {
    slug: "mediness-ops",
    no: "05",
    name: "제품 운영 게이트",
    tag: "제품팀 운영 · MediSolve AI",
    blurb:
      "decision·spec·work·release gate로 이어지는 제품 운영 구조를 구조화·리드. 일정·이슈·릴리스 운영을 agent-readable workflow로 정리했다.",
    role: "Lead",
    scope: "Product Ops",
    available: true,
  },
];

/* 성과 축 — 포트폴리오 목록의 조직 단위 (2026-08-13).
   프로젝트가 아니라 성과가 항목이고, 케이스는 그 근거 예시로 붙는다.
   한 케이스가 여러 축의 근거가 될 수 있다 — 의도된 것이다. */
export type Achievement = {
  no: string;
  claim: string;
  proof: string;
  cases: string[]; // cases.slug
};

export const ACHIEVEMENTS: Achievement[] = [
  {
    no: "01",
    claim: "AI 출력 품질을 판정 가능한 대상으로 만든다",
    proof:
      "자동 게이트 12종 · 직접 수집한 실측 코퍼스 n=19 → 4,039 · 자동화가 닿는 층과 닿지 않는 층을 가른 3층 판정",
    cases: ["thready"],
  },
  {
    no: "02",
    claim: "기술부채를 언제 갚을지 계산하고, 갚는 동안 서비스가 흔들리지 않게 한다",
    proof:
      "QA 버그 재발률 37% → 11% (cutover 전후 관측) · 파악부터 재구축까지 36시간 · 범위를 backend로 한정하고 하네스를 먼저 세움",
    cases: ["thready"],
  },
  {
    no: "03",
    claim: "실패 가능한 작업을 제품 시작 시점부터 경계 밖으로 분리한다",
    proof:
      "주문·재고 API와 RabbitMQ·TaskIQ worker·retry · 실시간 세션의 lifecycle과 provider 경계 안정화",
    cases: ["bay-async", "say-realtime"],
  },
  {
    no: "04",
    claim: "사람과 코딩 에이전트가 같은 규칙 위에서 일하게 만든다",
    proof:
      "agent context를 내장한 조직 표준 템플릿 · 스펙·이슈·릴리스를 사람과 agent가 함께 읽는 게이트로 구성",
    cases: ["be-template", "mediness-ops"],
  },
];
