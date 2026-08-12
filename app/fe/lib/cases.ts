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
    name: "Thready Rebuild",
    tag: "AI Content Generation · Backend",
    blurb:
      "AI 콘텐츠 생성 backend를 전면 재구축하고 이후 개발·운영을 전담. 자동 게이트·실측 분포 대조·사람 판정 3층으로 생성 품질을 판정 가능하게 만들고, 파이프라인을 planner·writer 역할로 분리해 설계·구현했다.",
    role: "Rebuild · Ownership",
    scope: "Quality · Agent",
    available: true,
  },
  {
    slug: "bay-async",
    no: "02",
    name: "BAY Async",
    tag: "Order · Inventory · Worker",
    blurb:
      "주문·재고 API와 RabbitMQ·TaskIQ 비동기 worker를 설계하고, retry·test·CI 구축을 주도. 실패 가능한 작업을 worker로 분리해 처리 경계를 명확히 했다.",
    role: "Lead",
    scope: "Async · CI",
    available: true,
  },
  {
    slug: "say-realtime",
    no: "03",
    name: "SAY Realtime",
    tag: "Realtime AI · Session",
    blurb:
      "realtime AI 상담 backend의 세션 lifecycle과 provider 경계 안정화에 공동 주 기여. realtime session의 시작·유지·종료 흐름을 다뤘다.",
    role: "Co-Lead Contrib.",
    scope: "Session Lifecycle",
    available: true,
  },
  {
    slug: "be-template",
    no: "04",
    name: "BE Template",
    tag: "FastAPI · Agent Context",
    blurb:
      "조직 표준 FastAPI template과 agent context system을 설계·구축 전담. layered architecture·DI·ADR·convention을 표준으로 정립했다.",
    role: "Owner",
    scope: "Org Standard",
    available: true,
  },
  {
    slug: "mediness-ops",
    no: "05",
    name: "Mediness Ops",
    tag: "Decision · Spec · Release Gate",
    blurb:
      "decision·spec·work·release gate로 이어지는 제품 운영 구조를 구조화·리드. 일정·이슈·릴리스 운영을 agent-readable workflow로 정리했다.",
    role: "Lead",
    scope: "Product Ops",
    available: true,
  },
];
