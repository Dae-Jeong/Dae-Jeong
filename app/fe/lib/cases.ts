/* 포트폴리오 목록·상세·rail이 공유하는 표현 SoT.
   사실과 ownership 상한은 wiki/evidence, case 범위는 wiki/products/portfolio/cases를 따른다. */

export type CaseTier = "primary" | "supporting" | "archive";

export type DossierCaseSlug =
  | "thready"
  | "centurion-platform"
  | "infrastructure-delivery"
  | "memento-payment"
  | "be-template";

export type SupportingCaseSlug =
  | "memento-payment"
  | "mediness-ops"
  | "nexus-operations"
  | "sellercanvas-poc";

export type ArchiveCaseSlug =
  | "bay-async"
  | "say-realtime"
  | "thready-ai-system"
  | "operating-policy-delivery";

export type CaseSlug =
  | DossierCaseSlug
  | SupportingCaseSlug
  | ArchiveCaseSlug;

export type CaseMeta = {
  slug: CaseSlug;
  no: string;
  name: string;
  shortName: string;
  tag: string;
  blurb: string;
  role: string;
  scope: string;
  proof: string[];
  claimIds: string[];
  tier: CaseTier;
  available: boolean;
};

export const CASES: CaseMeta[] = [
  {
    slug: "thready",
    no: "01",
    name: "아이디어를 팀과 실제 고객이 결제하는 제품으로 만들고, 운영에 필요한 시스템을 직접 구축했습니다.",
    shortName: "AI 콘텐츠 제품 0→1·운영",
    tag: "AI 콘텐츠 제품 · Thready",
    blurb:
      "고객이 돈을 내는 이유를 기획·QA·마케팅과 함께 구체화하고, 기능 우선순위부터 출시·운영까지 이끌었습니다. 제품에 필요한 Next.js 핵심 흐름·FastAPI backend·AI 생성/평가 system을 직접 구축하고, 제품 원장과 AI 실행부의 경계를 분리했습니다.",
    role: "제품 운영 리드 · 핵심 제품 시스템 직접 구현",
    scope: "제품 0→1 · Backend · AI · 핵심 Frontend",
    proof: [
      "고객 문제 정의 · 기능 우선순위 · 출시·운영 리드",
      "실제 고객이 결제하는 유료 제품 운영",
      "FastAPI·AI·Next.js 핵심 흐름 직접 구현",
    ],
    claimIds: [
      "thready.product-zero-to-one-contribution",
      "thready.frontend-product-delivery",
      "thready.prototype-to-user-operation",
      "thready.subscription-revenue-band",
      "thready.ad-revenue-experiment",
      "thready.backend-rebuild",
      "thready.rebuild-decision-execution",
      "thready.qa-reopen-reduction",
      "thready.generation-quality-system",
      "thready.agent-pipeline-design",
      "thready.threads-market-outcome-design",
      "thready.labeling-corpus-workbench",
      "thready.hook-rubric-experiment",
      "thready.ai-service-boundary",
      "thready.ai-service-migration",
      "thready.ai-replica-outbox",
      "thready.release-operation",
    ],
    tier: "primary",
    available: true,
  },
  {
    slug: "centurion-platform",
    no: "03",
    name: "실패한 작업은 다시 돌리고, 실시간 상담은 빠르게 반응하면서도 엉뚱한 발화를 덮지 않게 만들었습니다.",
    shortName: "의료 MSA · 작업 복구와 실시간 상담",
    tag: "의료 통합 플랫폼 · Centurion",
    blurb:
      "주문·재고 backend는 요청 처리와 외부 연동의 실패 경계를 나누고, 명시적인 작업 상태·재시도·수동 복구 흐름을 구축했습니다. 실시간 AI 상담은 공동 개발하며 VAD 발화 감지, DELTA·COMPLETE 전사 흐름, session lifecycle을 분리했습니다.",
    role: "주문·재고 주도 · 실시간 상담 공동 기여",
    scope: "멀티 서비스 · 비동기 작업 · 실시간 통신",
    proof: [
      "요청 경계와 RabbitMQ·TaskIQ 작업 상태·복구 흐름 주도",
      "VAD 발화 감지·DELTA/COMPLETE·sequence 기반 실시간 상담 공동 개발",
      "외부 연동이 실패해도 핵심 업무는 완료되도록 분리",
    ],
    claimIds: [
      "centurion.msa-platform-context",
      "centurion.bay-async-backend",
      "centurion.async-migration",
      "centurion.test-ci-foundation",
      "centurion.say-realtime-ai",
      "centurion.day-product-integration",
      "centurion.ray-backend",
      "centurion.sso-session",
    ],
    tier: "primary",
    available: true,
  },
  {
    slug: "infrastructure-delivery",
    no: "04",
    name: "여러 제품의 Azure 실행 경계를 나누고, state·plan·실제 리소스를 대조해 변경을 통제했습니다.",
    shortName: "회사 Azure 변경 통제",
    tag: "회사 인프라 · MediSolve AI",
    blurb:
      "기존 Shared·B2B·B2C 리소스를 제품군·환경별 root/state로 통합하고, workload별 runtime·managed data·환경별 관측 체계와 사람이 승인하는 변경 gate를 운영합니다.",
    role: "회사 Azure topology·변경 운영 전담",
    scope: "Azure · Runtime topology · Terraform · Observability",
    proof: [
      "B2B App Service Gateway·VM runtime과 B2C App Service·VM workload 분리",
      "6개 root · 400개 이상 state object로 제품·환경 변경 범위 격리",
      "10대 VM 로그 중앙화 · 운영 알림 8개",
    ],
    claimIds: [
      "infra.company-azure-ownership",
      "infra.workload-runtime-topology",
      "infra.ai-assisted-change-harness",
      "infra.terraform-state-safety",
      "infra.azure-observability",
      "centurion.shared-infra",
    ],
    tier: "archive",
    available: false,
  },
  {
    slug: "memento-payment",
    no: "S1",
    name: "Stripe 선결제부터 Webhook·취소·환불까지 결제 상태 흐름을 구축했습니다.",
    shortName: "Memento 예약·결제",
    tag: "예약·결제 백엔드 · Memento AI",
    blurb:
      "선결제와 비동기 환불에서 예약·결제·마일리지·티켓의 처리 순서가 어긋나지 않도록 상태 변경 시점을 정리했습니다.",
    role: "Stripe 선결제 구축 주도 · 결제 도메인 기여",
    scope: "결제 · 상태 정합성",
    proof: [
      "Stripe Checkout manual-capture 선결제 영역 구축",
      "예약 실패 시 PaymentIntent 상태별 취소·환불 보상",
      "환불 완료 뒤 마일리지 복원·이용권 삭제",
    ],
    claimIds: ["career.memento-stripe-prepayment", "career.memento-payment"],
    tier: "supporting",
    available: true,
  },
  {
    slug: "be-template",
    no: "02",
    name: "제품 개발과 회사 업무를 같은 실행 맥락으로 잇는 AX 전환 구조 설계에 참여했습니다.",
    shortName: "회사 AX 실행 체계",
    tag: "Company AX · MediSolve AI",
    blurb:
      "제품의 Decision·SPEC·Work Package·QA·release 흐름을 먼저 운영하고, 의사결정·회의·업무 배정·승인·후속 작업까지 같은 맥락에서 이어지는 회사 AX 구조 설계에 참여했습니다.",
    role: "AX 구조 설계 참여 · 제품 운영 Lead · Backend System Owner",
    scope: "Product · Work System · Agent Context · Human Gate",
    proof: [
      "Decision → SPEC → Work Package → QA → release 제품 흐름 운영",
      "의사결정·회의·업무 배정·승인·후속 작업 AX 확장 설계",
      "FastAPI template·agent context 직접 설계·구축",
    ],
    claimIds: [
      "mediness.company-work-ax-design",
      "mediness.product-system-design-participation",
      "mediness.product-operations",
      "be-template.backend-standard",
      "be-template.team-leverage",
      "be-template.agent-context",
    ],
    tier: "primary",
    available: true,
  },
  {
    slug: "mediness-ops",
    no: "S2",
    name: "제품 결정을 명세·작업·QA·릴리스까지 추적했습니다.",
    shortName: "Product Operations",
    tag: "Product Operations · MediSolve AI",
    blurb:
      "제품 요구와 운영 흐름의 설계에 참여하고, Decision·SPEC·Work Package를 실제 작업·QA 승인·릴리스 조건으로 구체화했습니다.",
    role: "Operations Lead · Design Contributor",
    scope: "AX · Product Operations",
    proof: ["Decision → SPEC → 작업 → 릴리스 조건", "제품별 버전 확정·릴리스 노트 추적"],
    claimIds: [
      "mediness.company-work-ax-design",
      "mediness.product-system-design-participation",
      "mediness.product-operations",
    ],
    tier: "supporting",
    available: false,
  },
  {
    slug: "nexus-operations",
    no: "S3",
    name: "여러 피부과의 운영·예약 요구를 backend와 권한 경계로 구현했습니다.",
    shortName: "피부과 운영·예약 시스템",
    tag: "현장 운영 제품 · NEXUS",
    blurb:
      "여러 피부과의 홈페이지·관리·예약 흐름을 지원하는 multi-brand backend의 service boundary와 migration을 주도하고, 운영자의 소속 지점과 현재 작업 지점을 분리한 접근 경계를 설계했습니다.",
    role: "Backend Architecture · Admin Backend Lead",
    scope: "Customer Operations · FastAPI · Authorization · Migration",
    proof: [
      "Homepage/Admin API를 분리한 Clean Architecture monorepo",
      "운영자의 소속 지점과 현재 작업 지점을 나눈 server-owned 권한 상태",
      "제품의 예약률 개선과 고객사 매출 성과에 기여",
    ],
    claimIds: [
      "nexus.hospital-operations-revenue-contribution",
      "nexus.backend-architecture",
      "nexus.admin-backend-ownership",
      "nexus.branch-access-boundary",
    ],
    tier: "supporting",
    available: false,
  },
  {
    slug: "sellercanvas-poc",
    no: "S4",
    name: "생성형 AI 커머스 제품을 prototype에서 v1.0·외부 기업 PoC까지 구체화했습니다.",
    shortName: "생성형 AI 제품·기업 PoC",
    tag: "Enterprise PoC · SellerCanvas",
    blurb:
      "PM을 주 역할로 고객 흐름·기능 범위·출시 우선순위를 정해 prototype을 첫 제품으로 구체화하고, 외부 패션 브랜드의 요구를 기술 검증 범위로 바꿔 PoC를 진행했습니다.",
    role: "Product Manager · Technical Delivery",
    scope: "Product Scoping · AI Product · Enterprise PoC",
    proof: [
      "prototype에서 v1.0까지 제품 흐름·기능 범위 구체화",
      "외부 패션 브랜드의 비즈니스 요구를 기술 검증 범위로 전환",
      "상세 페이지 제작 흐름 특허 등록 · CES 2024 Best of Innovation",
    ],
    claimIds: [
      "career.sellercanvas-product-system",
      "career.sellercanvas-enterprise-poc",
      "credentials.page-output-patent",
      "credentials.ces-2024",
    ],
    tier: "supporting",
    available: false,
  },
  {
    slug: "bay-async",
    no: "A1",
    name: "주문·재고 백엔드의 비동기 운영 경계",
    shortName: "BAY Async Backend",
    tag: "Centurion · 주문·재고 백엔드",
    blurb: "Centurion 대표 사례에 포함된 주문·재고 워커 상세 기록입니다.",
    role: "Lead",
    scope: "Async · CI",
    proof: ["Celery → TaskIQ·RabbitMQ", "상태·재시도·실패 기록·수동 재처리"],
    claimIds: [
      "centurion.bay-async-backend",
      "centurion.async-migration",
      "centurion.test-ci-foundation",
    ],
    tier: "archive",
    available: true,
  },
  {
    slug: "say-realtime",
    no: "A2",
    name: "실시간 AI 상담의 세션 흐름",
    shortName: "SAY Realtime Session",
    tag: "Centurion · 실시간 상담 백엔드",
    blurb: "Centurion 대표 사례에 포함된 실시간 상담 세션 상세 기록입니다.",
    role: "Co-Lead Contributor",
    scope: "Realtime · Session",
    proof: ["WebSocket 세션 흐름", "외부 AI 경계·대화 순서 검증"],
    claimIds: ["centurion.say-realtime-ai"],
    tier: "archive",
    available: true,
  },
  {
    slug: "thready-ai-system",
    no: "A3",
    name: "AI 실행 경계와 장애 뒤에도 수렴하는 데이터 전달",
    shortName: "Thready AI Boundary",
    tag: "Thready · AI 실행",
    blurb: "Thready 대표 사례에 포함된 AI 애플리케이션·Outbox 상세 기록입니다.",
    role: "Owner",
    scope: "AI Service Boundary",
    proof: ["애플리케이션·DB 분리", "Outbox·재시도·전달 버전 검증"],
    claimIds: ["thready.ai-service-boundary", "thready.ai-replica-outbox"],
    tier: "archive",
    available: false,
  },
  {
    slug: "operating-policy-delivery",
    no: "A4",
    name: "운영 요청을 제품 규칙과 실행 계약으로 연결",
    shortName: "Operating Policy Delivery",
    tag: "Product Rules · Delivery",
    blurb: "관리 백엔드·예약 정책·제품 운영에서 반복된 정책 전달 방식입니다.",
    role: "Lead · Contributor",
    scope: "Product Rules · Delivery",
    proof: ["권한·상태·데이터 규칙", "ADR·SPEC·Work Package·Agent Context"],
    claimIds: [
      "nexus.hospital-operations-revenue-contribution",
      "nexus.backend-architecture",
      "nexus.admin-backend-ownership",
      "centurion.day-product-integration",
      "mediness.product-system-design-participation",
      "mediness.product-operations",
      "be-template.agent-context",
      "nexus.quality-automation",
    ],
    tier: "archive",
    available: false,
  },
];

export const PRIMARY_CASES = CASES.filter((item) => item.tier === "primary").sort(
  (a, b) => a.no.localeCompare(b.no),
);
export const SUPPORTING_CASES = CASES.filter((item) => item.tier === "supporting");
export const NAVIGABLE_CASES = [...PRIMARY_CASES, ...SUPPORTING_CASES].filter(
  (item) => item.available,
);
