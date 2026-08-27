export const ROLE_CATALOG = {
  "tech-lead-product": {
    slug: "tech-lead-product",
    label: "Product-led Tech Lead · Product Engineer",
    shortLabel: "Tech Lead",
    signals: ["제품 판단", "직접 구현", "팀 실행 기준"],
  },
  "product-owner": {
    slug: "product-owner",
    label: "Product Ownership",
    shortLabel: "Product",
    signals: ["고객 문제·우선순위", "유료 제품 운영", "기획→출시 연결"],
  },
  backend: {
    slug: "backend",
    label: "Backend Engineer",
    shortLabel: "Backend",
    signals: ["운영 흐름을 지킨 전환", "Outbox·상태 수렴", "비동기·결제 복구"],
  },
  "ai-product-backend": {
    slug: "ai-product-backend",
    label: "AI Product Backend",
    shortLabel: "AI Backend",
    signals: ["AI runtime 경계", "생성 품질 평가", "realtime lifecycle"],
  },
  "ax-fde": {
    slug: "ax-fde",
    label: "AX / Forward Deployed Engineer",
    shortLabel: "AX / FDE",
    signals: ["고객 문제·technical scoping", "제품 구축·현장 적용", "운영 방식의 재사용"],
  },
  "backend-platform": {
    slug: "backend-platform",
    label: "Backend Platform Engineer",
    shortLabel: "Platform",
    signals: ["공통 backend 기반", "data ownership", "worker recovery"],
  },
} as const;

export type RoleVariantSlug = keyof typeof ROLE_CATALOG;

// 지원 관점은 네 가지로만 운영한다. Tech Lead 책임은 Backend 안에서
// 증명하고, Platform은 별도 지원본으로 노출하지 않는다.
export const ROLE_VARIANT_SLUGS = [
  "product-owner",
  "backend",
  "ai-product-backend",
  "ax-fde",
] as const satisfies readonly RoleVariantSlug[];
