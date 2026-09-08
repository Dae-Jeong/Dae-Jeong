import type {
  ResumeCareer,
  ResumeCredential,
  ResumeExternalActivity,
  ResumeSkill,
  ResumeText,
  TailoredResume,
} from "./types";
import { ROLE_CATALOG, ROLE_VARIANT_SLUGS } from "../role-catalog";
import type { RoleVariantSlug } from "../role-catalog";

const UPDATED_AT = "2026-08-26";
const MAKER_HOOK = "가능성을 기회로 바꾸고, 제품으로 가치를 전하는 메이커 김대정입니다.";

const CONTACTS = [
  { label: "marin.backend@gmail.com", href: "mailto:marin.backend@gmail.com" },
  {
    label: "github.com/Dae-Jeong",
    href: "https://github.com/Dae-Jeong",
    external: true,
  },
  { label: "marinkim.xyz", href: "https://marinkim.xyz", external: true },
] as const;

const JOINING_PATH: ResumeText = [
  { text: "합류 경로 · ", tone: "strong" },
  {
    text: "Memento AI 개발 성과를 인정받아 MediSolve AI 초기 멤버로 영입됐고, 법인 설립 전 더데이랩스 프리랜서 기간(2025.02–04)을 거쳐 2025년 4월 정규 합류했습니다.",
  },
];

const MEMENTO_DETAILS: readonly ResumeText[] = [
  [
    { text: "Stripe 선결제부터 Webhook·취소·환불까지 결제 상태 흐름", tone: "strong" },
    {
      text: "을 구축했습니다. manual capture와 내부 결제 ID 매핑을 적용하고, 예약 처리 실패 시 PaymentIntent 상태에 따라 취소·환불하도록 구성했습니다.",
    },
  ],
  "환불 요청과 완료를 분리하고 마일리지 복원·이용권 삭제를 완료 transition으로 옮겼습니다. 다국어 Happy Call의 즉시·예약 발송과 Celery 작업 취소·재등록·발송 이력도 구현했습니다.",
];

const STUDIO_DETAILS: readonly ResumeText[] = [
  [
    {
      text: "생성형 AI 커머스 제품의 prototype부터 v1.0까지 제품 흐름·기능 범위·출시 우선순위를 정하는 PM",
      tone: "strong",
    },
    { text: "으로 첫 제품을 구체화하고 외부 패션 브랜드 PoC까지 확장했습니다." },
  ],
  "상세 페이지 제작 흐름은 특허 「페이지 출력 방법」으로 출원·등록됐고, 제품은 CES 2024 Best of Innovation을 수상했습니다.",
];

const EXTERNAL_ACTIVITIES: readonly ResumeExternalActivity[] = [
  {
    label: "UX 컨설팅",
    title: "운영 서비스 UX 컨설팅",
    description:
      "보상 포인트를 알아차리기 어렵고 재방문 이유가 약한 흐름을 문제로 정의해 badge·push 개선 가설과 Figma 화면안을 제안했습니다.",
    outcome:
      "여러 개선안이 반영된 뒤 3개월 안에 App Store 순위가 9위에서 5위로 오르고 DAU가 기존의 200% 수준이 됐다는 결과를 공유받았습니다. 제안은 이 공동 성과에 기여했습니다.",
    claimIds: [
      "career.product-ux-practice",
      "career.ux-consulting-product-outcome",
    ],
  },
  {
    label: "UX 스터디",
    title: "Speak 개선안 제안 · YouTube Music UX 원리 리뷰",
    description:
      "Speak 학습 직후의 추천이 단조롭고 직전 맥락과 이어지지 않는 문제를 분석해 다음 콘텐츠 흐름을 설계했습니다. YouTube Music 사례에서는 사용자 선택을 이끄는 UX 원리를 분석·발표했습니다.",
    outcome: "Speak 개선안 발표로 IPS 12기 MVP에 선정됐습니다.",
    claimIds: ["career.product-ux-practice"],
  },
];

const CREDENTIALS: readonly ResumeCredential[] = [
  {
    period: "2016.03\n— 2021.08",
    text: "우송대학교 게임멀티미디어 전공",
    claimIds: ["credentials.education"],
  },
  {
    period: "2024.01",
    text: "CES 2024 Best of Innovation · AI 부문 대상 제품 참여",
    claimIds: ["credentials.ces-2024"],
  },
  {
    period: "2022.10 출원\n2025.12경 등록",
    text: "특허 「페이지 출력 방법」 · 등록 10-2898273",
    claimIds: ["credentials.page-output-patent"],
  },
  {
    period: "2022.11경",
    text: "한국건설생활환경시험연구원(KCL) · AI 정확도 부문 인증 통과 제품 참여",
    claimIds: ["credentials.ai-accuracy-certification"],
  },
  {
    period: "2021.09",
    text: "ADsP · 데이터분석 준전문가",
    claimIds: ["credentials.adsp"],
  },
];

function makeCareers({
  currentDetails,
  currentClaimIds,
  mementoDetails = MEMENTO_DETAILS,
  studioDetails = STUDIO_DETAILS,
}: {
  currentDetails: readonly ResumeText[];
  currentClaimIds: readonly string[];
  mementoDetails?: readonly ResumeText[];
  studioDetails?: readonly ResumeText[];
}): readonly ResumeCareer[] {
  return [
    {
      org: "MediSolve AI",
      period: "2025.04 —",
      now: true,
      role: [
        { text: "Tech Lead · Backend Engineer", tone: "strong" },
        { text: " — 제품 운영 리드" },
      ],
      details: [...currentDetails, JOINING_PATH],
      claimIds: [
        "career.medisolve-role-evolution",
        "career.thedaylabs-freelance",
        "career.memento-to-medisolve-early-member",
        ...currentClaimIds,
      ],
    },
    {
      org: "Memento AI",
      period: "2024.10 — 2025.01",
      role: [
        { text: "Backend Engineer", tone: "strong" },
        { text: " — 인턴 합류 후 정규직 전환 · 회사 폐업으로 종료" },
      ],
      details: mementoDetails,
      claimIds: [
        "career.memento-stripe-prepayment",
        "career.memento-payment",
        "career.memento-happycall-survey",
      ],
    },
    {
      org: "STUDIO LAB",
      period: "2021.12 — 2024.01",
      role: [
        { text: "Product Manager", tone: "strong" },
        { text: " — AI Engineer → PM(주 역할) → Backend Engineer" },
      ],
      details: studioDetails,
      claimIds: [
        "career.ai-pm-backend-continuity",
        "career.sellercanvas-product-system",
        "career.sellercanvas-enterprise-poc",
        "credentials.page-output-patent",
        "credentials.ces-2024",
      ],
    },
    {
      org: "아이즈솔",
      period: "2020.08 — 2021.06",
      role: [
        { text: "Vision AI Engineer", tone: "strong" },
        { text: " — 인턴" },
      ],
      details: [
        "Vision AI 모델과 데이터 pipeline을 제품 기능으로 연결하는 개발·검증에 참여했습니다.",
      ],
      claimIds: ["career.ai-pm-backend-continuity"],
    },
  ];
}

function makeBase({
  slug,
  label,
  shortLabel,
  signals,
  description,
  includeMakerHook = true,
  position,
  summary,
  careers,
  outcomes,
  workStyles,
  skills,
}: Pick<
  TailoredResume,
  "slug" | "position" | "summary" | "careers" | "outcomes" | "workStyles" | "skills"
> & {
  label: string;
  shortLabel: string;
  signals: readonly string[];
  description: string;
  includeMakerHook?: boolean;
}): TailoredResume {
  return {
    slug,
    companyName: "Role Draft",
    position,
    roleVariant: { label, shortLabel, signals, description },
    sectionOrder: [
      "profile",
      "outcomes",
      "career",
      "skills",
      "workStyles",
      "externalActivities",
      "credentials",
    ],
    status: "draft",
    visibility: "local",
    updatedAt: UPDATED_AT,
    header: {
      name: "김대정",
      role: "Tech Lead · Backend Engineer",
      photoSrc: "/profile/daejeong-profile-v2.png",
      careerLine: [
        { text: "MediSolve AI", tone: "strong" },
        { text: " · Tech Lead · Backend Engineer (2025.04 — 재직 중)" },
      ],
      contacts: CONTACTS,
    },
    summary: includeMakerHook
      ? [
          {
            text: [{ text: MAKER_HOOK, tone: "strong" }],
          },
          ...summary,
        ]
      : summary,
    careers,
    outcomes,
    workStyles,
    skills,
    externalActivities: EXTERNAL_ACTIVITIES,
    credentials: CREDENTIALS,
  };
}

const TECH_LEAD_SKILLS: readonly ResumeSkill[] = [
  {
    label: "제품 백엔드",
    stack: "Python · FastAPI · PostgreSQL · TypeScript · Next.js",
    via: "요구를 API·domain·transaction으로 구체화하고 핵심 사용자 workflow까지 직접 구현",
    claimIds: [
      "thready.backend-rebuild",
      "thready.frontend-product-delivery",
      "nexus.backend-architecture",
    ],
  },
  {
    label: "데이터 / 상태 정합성",
    stack: "PostgreSQL · MySQL · Redis · RabbitMQ · TaskIQ · Transactional Outbox",
    via: "migration·retry·version fence·terminal failure·manual reprocessing 경계 설계",
    claimIds: [
      "thready.ai-service-migration",
      "thready.ai-replica-outbox",
      "centurion.bay-async-backend",
    ],
  },
  {
    label: "AI 제품 런타임",
    stack: "LLM integration/evaluation · typed prompt · structured output · WebSocket · SSE · STT",
    via: "생성 품질 판정과 realtime session lifecycle을 제품 운영 흐름에 연결",
    claimIds: [
      "thready.generation-quality-system",
      "thready.quality-criteria-system",
      "centurion.say-realtime-ai",
    ],
  },
  {
    label: "제품 실행 / AX",
    stack: "Decision · SPEC · Work Package · human gate · agent context",
    via: "제품 개발과 의사결정·회의·업무 배정·승인·후속 작업의 상태와 책임을 연결",
    claimIds: [
      "mediness.company-work-ax-design",
      "mediness.product-system-design-participation",
      "mediness.product-operations",
    ],
  },
  {
    label: "Engineering System",
    stack: "FastAPI · layered architecture · DI · ADR · runbook · agent context",
    via: "사람과 agent가 함께 쓰는 backend 구조·작업 규칙을 조직 표준으로 구축",
    claimIds: [
      "be-template.backend-standard",
      "be-template.team-leverage",
      "be-template.agent-context",
    ],
  },
  {
    label: "Cloud / Delivery",
    stack: "Docker · GitHub Actions · Azure · Terraform",
    via: "서비스 배포·환경 설정·기본 로그 확인 경험",
    claimIds: ["infra.company-azure-ownership"],
  },
];

export const TECH_LEAD_PRODUCT_RESUME = makeBase({
  ...ROLE_CATALOG["tech-lead-product"],
  description: "고객 문제를 매출이 발생하는 제품으로 만든 경험과 직접 구현 범위를 함께 보여주는 기본 지원본",
  position: "Product-led Tech Lead · Product Engineer",
  summary: [
    {
      text: [
        {
          text: "고객이 돈을 내는 이유를 찾고, 제품 판단부터 구현·출시·운영까지 연결하는 Tech Lead이자 Backend Engineer",
          tone: "strong",
        },
        { text: "입니다. 기획·QA·마케팅과 Thready의 제품 운영을 리드했고, 팀과 함께 " },
        { text: "실제 고객이 결제하는 유료 제품", tone: "metric" },
        { text: "으로 만들었습니다. 제품에 필요한 backend·AI·핵심 frontend도 직접 구축했습니다." },
      ],
      claimIds: [
        "career.medisolve-role-evolution",
        "thready.product-zero-to-one-contribution",
        "thready.frontend-product-delivery",
        "thready.subscription-revenue-band",
      ],
    },
    {
      text: "백엔드에서는 서비스와 데이터의 책임, migration 정합성, 비동기 작업의 복구 상태를 설계합니다. 최근에는 제품 개발과 의사결정·회의·업무 배정·승인·후속 작업을 잇는 회사 AX 구조 설계에 참여하고, 제품별 적용·운영을 리드했습니다.",
      claimIds: [
        "thready.ai-service-boundary",
        "centurion.bay-async-backend",
        "mediness.company-work-ax-design",
        "mediness.product-system-design-participation",
        "mediness.product-operations",
      ],
    },
  ],
  careers: makeCareers({
    currentClaimIds: [
      "thready.product-zero-to-one-contribution",
      "thready.frontend-product-delivery",
      "thready.subscription-revenue-band",
      "thready.rebuild-decision-execution",
      "centurion.msa-platform-context",
      "centurion.bay-async-backend",
      "centurion.day-product-integration",
      "centurion.say-realtime-ai",
      "nexus.hospital-operations-revenue-contribution",
      "nexus.backend-architecture",
      "be-template.backend-standard",
      "be-template.team-leverage",
      "be-template.agent-context",
      "mediness.company-work-ax-design",
      "mediness.product-system-design-participation",
      "mediness.product-operations",
      "infra.company-azure-ownership",
    ],
    currentDetails: [
      [
        { text: "Thready의 제품 판단·출시·운영", tone: "strong" },
        {
          text: "을 기획·QA·마케팅과 함께 리드했습니다. 팀과 실제 고객이 결제하는 유료 제품으로 만들었고, FastAPI backend·AI 생성/평가 system과 Next.js 핵심 흐름을 직접 구현했습니다.",
        },
      ],
      "백엔드 전환을 위한 validation harness를 먼저 구축하고 FastAPI backend를 병렬 재구축·전환했습니다. 기존 화면의 API 계약을 유지하며 응답 비교와 검증을 거쳐 실사용 backend의 개발·운영으로 연결했습니다.",
      "Centurion 초기 backend와 개발 기준을 세우고, 의료 MSA에서 주문·재고 worker의 상태·retry·실패 기록·재처리와 DAY 예약 정책의 backend·frontend·QA·release 연결을 주도했습니다.",
      "별도의 여러 피부과 운영·예약 backend architecture와 migration 흐름 구축을 주도했습니다. 제품은 예약률 개선을 통해 고객사 매출에 기여했습니다.",
      "MEDINESS의 제품 요구·운영 흐름 설계에 참여하고, 제품별 Decision·SPEC·Work Package·QA approval·release gate 적용과 운영을 리드했습니다. 회사 AX 구조는 회의·의사결정·업무 배정·승인·후속 작업에서 agent가 맥락·실행안을 준비하고 판단은 사람이 확정하도록 설계하는 데 참여했습니다.",
      "layered architecture·DI·ADR·runbook을 갖춘 조직 표준 FastAPI template과 agent context를 직접 구축했습니다.",
      "여러 사내 서비스의 Azure·Vercel 배포 환경을 서비스가 동작하도록 구성하고 기본 운영을 맡았습니다.",
    ],
  }),
  outcomes: [
    {
      no: "01",
      title: "고객 문제를 팀과 실제 매출이 발생하는 Thready 제품으로 만들고 운영",
      description: [
        "고객이 돈을 내는 이유를 찾고 콘텐츠 제작·성과 판단 문제를 데이터·기능·생성 품질 기준으로 나눴습니다. 팀과 제품 판단부터 출시·운영까지 이끌었습니다.",
        { text: "기능·실험 우선순위, 생성 품질 기준, QA·release 운영 리드", source: "제품 운영" },
        { text: "제품 성과: 실제 고객이 결제하는 유료 제품 운영", source: "팀 outcome" },
        { text: "FastAPI backend·AI 생성/평가와 Next.js 생성·예약·발행·관리 흐름 구현", source: "제품 개발" },
        { text: "최근 1년 내 게시된 공개 콘텐츠와 반응 추이를 바탕으로 콘텐츠 outcome 후보 설계", source: "시장 데이터" },
      ],
      claimIds: [
        "thready.product-zero-to-one-contribution",
        "thready.frontend-product-delivery",
        "thready.threads-market-outcome-design",
        "thready.subscription-revenue-band",
      ],
    },
    {
      no: "02",
      title: "AI 실행부 분리와 STG 실데이터 migration 검증",
      description: [
        "제품 정책·원장과 생성 lifecycle의 책임을 분리하고, 기존 데이터 이관과 이후 원장 변경 전달을 하나의 정합성 문제로 다뤘습니다.",
        { text: "독립 FastAPI application·DB와 authenticated HTTP contract", source: "Thready" },
        { text: "STG 생성 2,616건·품질 snapshot 795건·trace 7,111건 이관", source: "STG migration" },
        { text: "row count·MD5 fingerprint·FK orphan·생성 API E2E 검증", source: "migration gate" },
        { text: "원장 변경과 Outbox를 같은 transaction으로 기록하고 retry·delivery version fence 적용", source: "durable delivery" },
      ],
      claimIds: [
        "thready.ai-service-boundary",
        "thready.ai-service-migration",
        "thready.ai-replica-outbox",
      ],
    },
    {
      no: "03",
      title: "재시도 이후에도 복구할 수 있는 주문·재고 worker",
      description: [
        "실패 가능한 후속 작업을 API 요청에서 분리하고, 실패가 사라지지 않고 운영자가 다시 처리할 수 있는 상태로 남겼습니다.",
        { text: "RabbitMQ·TaskIQ worker와 상태·retry·terminal failure·manual reprocess 경계", source: "Centurion · 주문·재고" },
        { text: "async FastAPI 실행 모델을 기준으로 Celery에서 TaskIQ로 전환", source: "worker migration" },
        { text: "worker image를 API와 분리하고 API test·Docker CI 기반 마련", source: "delivery" },
      ],
      claimIds: [
        "centurion.bay-async-backend",
        "centurion.async-migration",
        "centurion.test-ci-foundation",
      ],
    },
    {
      no: "04",
      title: "회사 AX 구조 설계에 참여하고 제품 적용·운영을 리드",
      description: [
        "제품 개발과 의사결정·회의·업무 배정·승인·후속 작업이 끊기지 않게 연결하되, agent가 준비할 일과 사람이 판단할 일을 나눴습니다.",
        { text: "MEDINESS 제품 요구·운영 흐름과 회사 업무 구조 설계 참여", source: "회사 AX 설계" },
        { text: "Decision·SPEC·Work Package와 BE·FE·QA owner lane·approval 상태 운영", source: "제품 적용" },
        { text: "완료 시점의 version cut·release note·변경 이력 운영", source: "제품 운영" },
      ],
      claimIds: [
        "mediness.company-work-ax-design",
        "mediness.product-system-design-participation",
        "mediness.product-operations",
      ],
    },
    {
      no: "05",
      title: "FastAPI 구조와 agent 작업 규칙을 조직 표준으로 구축",
      description: [
        "제품마다 architecture와 작업 규칙을 다시 설명하지 않도록 직접 실행 가능한 backend 기준을 만들었습니다.",
        { text: "layered architecture·DI·ADR·convention·runbook 기반 FastAPI template", source: "조직 표준" },
        { text: "logging·monitoring 등 횡단 관심사의 공통 적용", source: "team leverage" },
        { text: "계층형 agent context와 반복 작업 automation skill", source: "AI-assisted delivery" },
      ],
      claimIds: [
        "be-template.backend-standard",
        "be-template.team-leverage",
        "be-template.agent-context",
      ],
    },
  ],
  workStyles: [
    {
      no: "01",
      title: "제품 판단을 기술 경계로 바꿉니다",
      body: "요구를 domain model·API·transaction으로, 실패 조건을 worker state와 운영 절차로, 출시 기준을 QA·release gate로 구체화합니다.",
      claimIds: ["mediness.product-operations", "centurion.day-product-integration"],
    },
    {
      no: "02",
      title: "AI는 구현을 빠르게 하고 검증은 gate에 남깁니다",
      body: "codebase 파악과 반복 구현에는 AI를 적극 활용하지만 test 결과와 실제 동작을 사람이 비교한 뒤 release를 결정합니다.",
      claimIds: ["thready.rebuild-decision-execution"],
    },
    {
      no: "03",
      title: "팀이 다시 쓸 수 있는 기준을 남깁니다",
      body: "backend 구조와 작업 규칙을 ADR·runbook·agent context로 남겨 다음 제품과 다음 담당자가 그대로 쓸 수 있게 합니다.",
      claimIds: ["be-template.backend-standard", "be-template.agent-context"],
    },
  ],
  skills: TECH_LEAD_SKILLS,
});

export const PRODUCT_OWNER_RESUME = makeBase({
  ...ROLE_CATALOG["product-owner"],
  description: "고객 문제·우선순위·유료 운영과 이를 직접 닫은 기술 실행을 전면에 둔 지원본",
  position: "Product Ownership · Product Engineer",
  summary: [
    {
      text: [
        {
          text: "고객의 불편을 제품 우선순위로 바꾸고, 실제 고객이 결제하는 제품까지 운영해 본 Tech Lead · Backend Engineer",
          tone: "strong",
        },
        { text: "입니다. 기획·QA·마케팅과 Thready의 제품 운영을 리드하고, 필요한 backend·AI·핵심 frontend를 직접 구현했습니다." },
      ],
      claimIds: [
        "career.medisolve-role-evolution",
        "thready.product-zero-to-one-contribution",
        "thready.subscription-revenue-band",
        "thready.frontend-product-delivery",
      ],
    },
    {
      text: "요청을 그대로 구현하기보다 고객이 막히는 지점과 돈을 내는 이유를 먼저 찾습니다. 그 판단을 기능·품질·QA·release 기준으로 구체화하고, 기술 제약을 직접 확인해 출시 가능한 범위로 닫습니다.",
      claimIds: [
        "thready.generation-quality-system",
        "mediness.product-operations",
        "centurion.day-product-integration",
      ],
    },
  ],
  careers: makeCareers({
    currentClaimIds: [
      "thready.product-zero-to-one-contribution",
      "thready.subscription-revenue-band",
      "thready.frontend-product-delivery",
      "thready.generation-quality-system",
      "thready.release-operation",
      "centurion.day-product-integration",
      "centurion.say-realtime-ai",
      "mediness.product-system-design-participation",
      "mediness.product-operations",
      "mediness.product-development-coordination-leverage",
      "be-template.backend-standard",
      "be-template.agent-context",
    ],
    currentDetails: [
      [
        { text: "Thready의 고객 문제·기능 우선순위·생성 품질·출시 판단", tone: "strong" },
        { text: "을 기획·QA·마케팅과 함께 운영했습니다. 팀과 실제 고객이 결제하는 제품으로 만들었고 backend·AI·핵심 frontend를 직접 구현했습니다." },
      ],
      "시장 데이터와 사용자 반응을 제품 판단의 근거로 사용하고, 콘텐츠 생성·가져오기·예약·발행·관리 흐름과 writer prompt·평가 체계를 제품 안에 연결했습니다.",
      "Centurion에서는 초기 backend 기준을 세우고, DAY 예약 정책을 backend 판단·frontend 표시·QA·release가 같은 기준으로 움직이도록 연결했습니다. 실시간 AI 상담은 공동 주 기여로 구조 설계와 통합을 수행했습니다.",
      "MEDINESS의 제품 요구·운영 흐름 설계에 참여하고, 제품별 Decision·SPEC·Work Package·owner·QA approval·release gate 적용과 운영을 리드했습니다.",
      "FastAPI template과 agent context를 직접 구축해 다음 담당자와 AI agent가 같은 architecture·작업·검증 기준을 읽을 수 있게 했습니다.",
    ],
    studioDetails: [
      [
        { text: "생성형 AI 커머스 제품의 prototype부터 v1.0까지 고객 흐름·기능 범위·출시 우선순위", tone: "strong" },
        { text: "를 정하고 첫 제품을 구체화해 외부 패션 브랜드 PoC까지 확장했습니다." },
      ],
      "상세 페이지 제작 흐름은 특허 「페이지 출력 방법」으로 등록됐고, 제품은 CES 2024 Best of Innovation을 수상했습니다.",
    ],
  }),
  outcomes: [
    {
      no: "01",
      title: "고객의 불편을 팀과 실제 고객이 결제하는 Thready 제품으로 전환",
      description: [
        "콘텐츠 제작과 성과 판단의 막힘을 기능·실험·생성 품질 문제로 나누고, 기획·QA·마케팅과 우선순위부터 출시·운영까지 리드했습니다.",
        { text: "제품 성과: 실제 고객이 결제하는 유료 제품 운영", source: "팀 outcome" },
        { text: "기능·실험 우선순위와 생성 품질·QA·release 기준 운영", source: "제품 판단" },
        { text: "FastAPI backend·AI 생성/평가·Next.js 핵심 workflow 직접 구현", source: "기술 실행" },
      ],
      claimIds: [
        "thready.product-zero-to-one-contribution",
        "thready.subscription-revenue-band",
        "thready.frontend-product-delivery",
        "thready.generation-quality-system",
      ],
    },
    {
      no: "02",
      title: "제품 판단이 QA와 release까지 같은 기준으로 이어지는 운영 체계",
      description: [
        "기획 문서에서 끝나지 않도록 Decision·SPEC·Work Package에 판단과 작업 상태를 남기고 담당·검증·release gate로 연결했습니다.",
        { text: "제품 요구·운영 흐름 설계 참여", source: "MEDINESS" },
        { text: "제품별 owner·QA approval·release gate 적용·운영 리드", source: "제품 운영" },
        { text: "설명과 재동기화 비용을 줄이는 agent-readable context", source: "실행 기반" },
      ],
      claimIds: [
        "mediness.product-system-design-participation",
        "mediness.product-operations",
        "mediness.product-development-coordination-leverage",
        "be-template.agent-context",
      ],
    },
    {
      no: "03",
      title: "예약 정책을 backend 판단에서 화면·QA·출시까지 연결",
      description: [
        "운영 정책이 API와 화면에서 다르게 해석되지 않도록 예약 상태와 예외 조건을 backend contract로 정하고, frontend 표시·QA 시나리오·release까지 같은 기준으로 맞췄습니다.",
        { text: "예약 정책의 backend·frontend·QA·release 연결 주도", source: "Centurion · DAY" },
        { text: "실시간 AI 상담 구조 설계·통합 공동 주 기여", source: "AI 상담" },
      ],
      claimIds: ["centurion.day-product-integration", "centurion.say-realtime-ai"],
    },
    {
      no: "04",
      title: "첫 제품의 범위와 출시 순위를 정해 외부 PoC까지 확장",
      description: [
        "생성형 AI 커머스 제품의 고객 흐름과 기능 범위를 정하고 prototype에서 v1.0까지 제품화를 이끌었습니다.",
        { text: "외부 패션 브랜드 PoC 진행", source: "제품 확장" },
        { text: "특허 등록·CES 2024 Best of Innovation", source: "외부 검증" },
      ],
      claimIds: [
        "career.sellercanvas-product-system",
        "career.sellercanvas-enterprise-poc",
        "credentials.page-output-patent",
        "credentials.ces-2024",
      ],
    },
  ],
  workStyles: [
    {
      no: "01",
      title: "고객의 막힘부터 정의합니다",
      body: "요청보다 사용자가 멈추는 지점과 돈을 내는 이유를 먼저 보고, 관측 근거를 기능·실험 우선순위로 바꿉니다.",
      claimIds: ["thready.product-zero-to-one-contribution"],
    },
    {
      no: "02",
      title: "판단을 실행 계약으로 남깁니다",
      body: "제품 판단을 API·상태·담당·QA 승인·release gate로 구체화해 직군마다 다르게 해석되는 일을 줄입니다.",
      claimIds: ["mediness.product-operations", "centurion.day-product-integration"],
    },
    {
      no: "03",
      title: "기술 제약은 직접 확인합니다",
      body: "backend·AI·핵심 화면을 직접 구현해 아이디어의 가능성과 비용을 확인하고, 운영 가능한 범위까지 제품을 닫습니다.",
      claimIds: ["thready.frontend-product-delivery", "thready.generation-quality-system"],
    },
  ],
  skills: [
    {
      label: "제품 운영",
      stack: "Problem framing · prioritization · quality criteria · QA · release",
      via: "고객 문제를 기능·실험·품질 기준으로 바꾸고 cross-functional 운영을 리드",
      claimIds: ["thready.product-zero-to-one-contribution", "mediness.product-operations"],
    },
    {
      label: "제품 개발",
      stack: "Python · FastAPI · PostgreSQL · TypeScript · Next.js",
      via: "제품 판단을 backend·AI·핵심 사용자 workflow로 직접 구현",
      claimIds: ["thready.frontend-product-delivery", "thready.backend-rebuild"],
    },
    {
      label: "AI 제품",
      stack: "LLM integration/evaluation · typed prompt · structured output · STT",
      via: "생성 품질과 실시간 상담을 제품 운영 흐름에 연결",
      claimIds: ["thready.generation-quality-system", "centurion.say-realtime-ai"],
    },
    {
      label: "실행 체계",
      stack: "Decision · SPEC · Work Package · human gate · agent context",
      via: "기획·디자인·개발·QA의 판단과 상태를 담당·검증·release 기준으로 연결",
      claimIds: ["mediness.product-operations", "be-template.agent-context"],
    },
  ],
});

export const BACKEND_RESUME = makeBase({
  ...ROLE_CATALOG.backend,
  description: "안전한 전환·서비스 간 상태 전달·비동기 복구·외부 결제를 먼저 보여주는 지원본",
  includeMakerHook: false,
  position: "Backend Engineer",
  summary: [
    {
      text: [
        {
          text: "운영 중인 Python·FastAPI 서비스를 안전하게 바꾸고, 하나의 DB transaction으로 끝나지 않는 상태를 복구 가능하게 설계해 온 Backend Engineer",
          tone: "strong",
        },
        { text: "입니다." },
      ],
      claimIds: [
        "thready.backend-rebuild",
        "thready.ai-replica-outbox",
        "centurion.bay-async-backend",
        "career.memento-stripe-prepayment",
      ],
    },
    {
      text: "기존 제품 흐름을 유지한 backend cutover, 원장 변경을 AI 실행부로 전달하는 Outbox·lease·version fence, 재시도 소진 뒤에도 실패 상태를 남기는 worker, 외부 결제 보상 흐름을 구현했습니다. Vision AI와 PM을 거쳐 제품과 운영을 함께 보는 실무 4년차입니다.",
      claimIds: [
        "career.tenure",
        "career.ai-pm-backend-continuity",
        "thready.backend-rebuild",
        "thready.ai-service-migration",
        "thready.ai-replica-outbox",
        "centurion.bay-async-backend",
        "career.memento-stripe-prepayment",
      ],
    },
  ],
  careers: makeCareers({
    currentClaimIds: [
      "thready.rebuild-decision-execution",
      "thready.backend-rebuild",
      "thready.ai-service-boundary",
      "thready.ai-service-migration",
      "thready.ai-replica-outbox",
      "centurion.bay-async-backend",
      "centurion.async-migration",
      "nexus.backend-architecture",
      "nexus.branch-access-boundary",
      "be-template.backend-standard",
      "be-template.team-leverage",
      "be-template.agent-context",
    ],
    currentDetails: [
      "Thready의 기존 화면과 release 흐름을 유지한 채 백엔드를 FastAPI로 병렬 재구축·cutover했습니다. contract·component·운영 흐름을 확인하는 validation harness를 전환 전에 세웠습니다.",
      "제품 원장과 AI 실행을 독립 application·DB로 분리하고, 원장 변경과 Outbox를 같은 transaction에 기록했습니다. lease 재점유·attempt token·delivery version fence·멱등 consumer로 worker 중단과 중복·역순 전달을 제어했습니다.",
      "Centurion 주문·재고 backend의 Celery 작업을 TaskIQ·RabbitMQ로 전환하고, PENDING→SENDING→SUCCESS/FAILED 상태·retry 상한·최종 실패 기록·수동 재처리 경계를 구축했습니다.",
      "외부 병원 운영·예약 backend의 service boundary와 migration을 주도하고, client header 대신 검증된 server auth state가 작업 지점을 결정하는 접근 경계를 구현 중입니다.",
      "2~3명의 백엔드 엔지니어가 다수 제품을 담당하는 환경에서 layered architecture·DI·ADR·runbook·agent context를 갖춘 조직 표준 FastAPI template을 구축했습니다.",
    ],
  }),
  outcomes: [
    {
      no: "01",
      title: "기존 제품 흐름을 유지한 채 backend를 FastAPI로 교체",
      description: [
        "초기 prototype을 부분 수정할지 재구축할지 비교한 뒤, frontend와 release 흐름은 그대로 두고 backend만 병렬 구축해 전환했습니다.",
        { text: "contract·component·운영 흐름을 확인하는 validation harness", source: "검증 기준" },
        { text: "기존 Next.js와 release 흐름을 유지한 backend-only cutover", source: "Thready v1.1.0" },
        { text: "기존 API 계약을 유지한 응답 비교·검증 후 실사용 backend로 전환", source: "Thready" },
      ],
      claimIds: [
        "thready.rebuild-decision-execution",
        "thready.backend-rebuild",
        "thready.prototype-to-user-operation",
        "thready.release-operation",
      ],
    },
    {
      no: "02",
      title: "원장 변경이 AI 실행부에 안전하게 도달하도록 전달 경계 설계",
      description: [
        "제품 원장과 AI 실행 상태를 독립 application·DB로 나누면서, commit 뒤 event 유실과 worker 중단·중복·역순 전달까지 함께 다뤘습니다.",
        { text: "STG migration rehearsal과 row count·MD5·FK·생성 API E2E", source: "데이터 이전 검증" },
        { text: "원장 변경과 Outbox를 같은 transaction에 기록하고 lease로 전달 row 재점유", source: "durable delivery" },
        { text: "attempt·delivery version fence, 멱등 consumer, 최대 재시도 뒤 실패 상태 보존", source: "수렴·복구" },
      ],
      claimIds: [
        "thready.ai-service-boundary",
        "thready.ai-service-migration",
        "thready.ai-replica-outbox",
      ],
    },
    {
      no: "03",
      title: "재시도가 끝난 작업도 운영자가 다시 처리할 수 있게 설계",
      description: [
        "실패 가능한 주문·재고 후속 작업을 API 요청에서 분리하고, 자동 재시도가 끝나도 원인과 상태를 확인해 실패 건만 다시 처리할 수 있게 했습니다.",
        { text: "async FastAPI 실행 모델에 맞춰 Celery에서 TaskIQ·RabbitMQ로 전환", source: "worker 선택" },
        { text: "PENDING→SENDING→SUCCESS/FAILED와 retry 상한", source: "상태 전이" },
        { text: "최종 실패 기록·수동 재처리·worker 별도 배포", source: "운영 복구" },
      ],
      claimIds: [
        "centurion.bay-async-backend",
        "centurion.async-migration",
        "centurion.test-ci-foundation",
      ],
    },
    {
      no: "04",
      title: "외부 결제와 로컬 예약이 어긋날 때 취소·환불로 보상",
      description: [
        "예약보다 먼저 시작되는 외부 결제와 로컬 결제 이력을 연결하고, 예약 처리 실패와 비동기 환불 완료를 서로 다른 상태로 처리했습니다.",
        { text: "manual-capture Checkout과 local transaction ID metadata 연결", source: "결제 추적" },
        { text: "Checkout·Webhook event를 PaymentHistory·PaymentMethod와 매핑", source: "상태 연결" },
        { text: "예약 실패 시 PaymentIntent 상태에 따라 cancel·refund", source: "provider 보상" },
      ],
      claimIds: [
        "career.memento-stripe-prepayment",
        "career.memento-payment",
      ],
    },
    {
      no: "05",
      title: "다수 제품을 같은 기준으로 관리할 FastAPI 기반 구축",
      description: [
        "2~3명의 백엔드 엔지니어가 여러 제품을 오가도 제품 정책만 파악하면 같은 구조에서 작업할 수 있도록 공통 기반을 만들었습니다.",
        { text: "layered architecture·DI·response/error convention·type safety", source: "application base" },
        { text: "ADR·runbook으로 선택 이유와 운영 절차 보존", source: "decision context" },
        { text: "횡단 관심사 일괄 반영과 agent context·반복 작업 automation", source: "team leverage" },
      ],
      claimIds: [
        "be-template.backend-standard",
        "be-template.team-leverage",
        "be-template.agent-context",
      ],
    },
  ],
  workStyles: [],
  skills: [
    {
      label: "백엔드 코어",
      stack: "Python · FastAPI · PostgreSQL · MySQL · Redis",
      via: "API·domain model·transaction·migration·authorization",
      claimIds: ["thready.backend-rebuild", "nexus.backend-architecture", "career.memento-stripe-prepayment"],
    },
    {
      label: "서비스 간 상태",
      stack: "PostgreSQL · Transactional Outbox · HTTP",
      via: "same-transaction event·lease·attempt/version fence·멱등 consumer",
      claimIds: ["thready.ai-service-migration", "thready.ai-replica-outbox"],
    },
    {
      label: "비동기 작업",
      stack: "RabbitMQ · TaskIQ",
      via: "상태 전이·retry 상한·최종 실패 기록·수동 재처리",
      claimIds: ["centurion.bay-async-backend", "centurion.async-migration"],
    },
    {
      label: "실시간 / AI 통합",
      stack: "LLM integration/evaluation · structured output · WebSocket · SSE · STT",
      via: "독립 AI application·generation lifecycle·realtime session 경계",
      claimIds: ["thready.ai-service-boundary", "centurion.say-realtime-ai"],
    },
    {
      label: "개발 기반",
      stack: "FastAPI Template · DI · ADR · runbook · agent context",
      via: "다수 제품의 공통 구조·횡단 관심사·결정 배경을 재사용",
      claimIds: ["be-template.backend-standard", "be-template.team-leverage", "be-template.agent-context"],
    },
  ],
});

export const AI_PRODUCT_BACKEND_RESUME = makeBase({
  ...ROLE_CATALOG["ai-product-backend"],
  description: "AI 실행 경계·data migration·생성 품질을 전면에 둔 지원본",
  position: "AI Product Backend",
  summary: [
    {
      text: [
        {
          text: "AI 기능을 붙이는 데서 끝내지 않고, 생성이 실패하거나 데이터가 늦게·중복으로 전달돼도 제품 상태가 어긋나지 않게 만드는 Tech Lead이자 Backend Engineer",
          tone: "strong",
        },
        { text: "입니다. FastAPI 제품 backend와 AI 실행부의 경계, 실데이터 migration, Outbox·worker·WebSocket session을 다뤄왔습니다." },
      ],
      claimIds: [
        "thready.ai-service-boundary",
        "thready.ai-service-migration",
        "thready.ai-replica-outbox",
        "centurion.say-realtime-ai",
      ],
    },
    {
      text: [
        { text: "Vision AI와 PM 경험으로 고객 문제를 생성 기능과 품질 기준으로 구체화합니다. Thready에서는 제품 판단부터 출시·운영까지 리드했고, 팀과 " },
        { text: "실제 고객이 결제하는 유료 제품", tone: "metric" },
        { text: "으로 만들었습니다. 필요한 backend·AI·핵심 frontend도 직접 구현했습니다." },
      ],
      claimIds: [
        "career.ai-pm-backend-continuity",
        "thready.product-zero-to-one-contribution",
        "thready.frontend-product-delivery",
        "thready.subscription-revenue-band",
      ],
    },
  ],
  careers: makeCareers({
    currentClaimIds: [
      "thready.product-zero-to-one-contribution",
      "thready.frontend-product-delivery",
      "thready.subscription-revenue-band",
      "thready.ai-service-boundary",
      "thready.ai-service-migration",
      "thready.ai-replica-outbox",
      "thready.threads-market-outcome-design",
      "thready.labeling-corpus-workbench",
      "thready.hook-rubric-experiment",
      "thready.quality-criteria-system",
      "centurion.say-realtime-ai",
      "centurion.bay-async-backend",
    ],
    currentDetails: [
      "고객 문제를 제품 기능·품질 기준으로 구체화하고 기획·QA·마케팅과 Thready의 출시·운영을 리드했습니다. 팀과 실제 고객이 결제하는 유료 제품으로 만들었고, FastAPI backend·AI 생성/평가 system과 Next.js 핵심 사용자·관리 흐름을 직접 구현했습니다.",
      "AI application과 DB를 product backend에서 분리하고 STG 생성 이력 2,616건·품질 snapshot 795건·trace 7,111건을 이관했습니다. MD5·FK·API E2E와 Outbox·version fence로 정합성을 검증했습니다.",
      "최근 1년 내 게시된 Threads 공개 콘텐츠와 반응 추이를 중심으로 outcome 후보를 설계하고, 본문·이어쓰기 labeling workflow와 3단계 생성 품질 기준을 구축했습니다.",
      "실시간 AI 상담 backend의 session lifecycle과 provider 경계 안정화에 공동 주 기여하고, 주문·재고 worker의 상태·retry·재처리 경계를 구축했습니다.",
    ],
  }),
  outcomes: [
    {
      no: "01",
      title: "고객 문제를 실제 매출이 발생하는 AI 콘텐츠 제품으로 운영",
      description: [
        "고객이 돈을 내는 이유를 기능·실험 우선순위와 생성 품질 기준으로 바꾸고, 팀과 제품 판단부터 출시·운영까지 이끌었습니다.",
        { text: "기획·QA·마케팅과 제품 운영 리드", source: "Thready" },
        { text: "제품 성과: 실제 고객이 결제하는 유료 제품 운영", source: "팀 outcome" },
        { text: "FastAPI backend와 AI 생성·평가 system 직접 개발·운영", source: "AI product" },
        { text: "Next.js 콘텐츠 생성·가져오기·예약·발행·관리 workflow 구현", source: "product flow" },
      ],
      claimIds: [
        "thready.product-zero-to-one-contribution",
        "thready.frontend-product-delivery",
        "thready.subscription-revenue-band",
      ],
    },
    {
      no: "02",
      title: "제품 원장과 AI 실행 상태 분리·STG migration 검증",
      description: [
        "제품 정책·원장과 생성 lifecycle·실행 상태의 소유권을 분리하고, 서비스 분리 이후 데이터의 이관과 전달을 함께 검증했습니다.",
        { text: "독립 FastAPI application·DB와 authenticated HTTP contract", source: "service boundary" },
        { text: "STG 2,616·795·7,111건 migration과 MD5·FK·API E2E", source: "migration" },
        { text: "owner mutation과 Outbox의 동일 transaction·retry·version fence", source: "delivery" },
      ],
      claimIds: [
        "thready.ai-service-boundary",
        "thready.ai-service-migration",
        "thready.ai-replica-outbox",
      ],
    },
    {
      no: "03",
      title: "공개 콘텐츠와 반응 추이를 콘텐츠 성과 기준으로 구조화",
      description: [
        "감에 의존하던 콘텐츠 판단을 비교 가능한 outcome 후보, labeling workflow, 생성 품질 평가 절차로 나눴습니다.",
        { text: "절대·작성자 상대·도메인 상대 관점의 outcome 후보", source: "market data" },
        { text: "본문·이어쓰기의 typed validation·멱등 importer·API/UI workbench", source: "labeling" },
        { text: "자동 gate 12종·실측 분포·사람 판정의 3단계 품질 기준", source: "quality" },
        { text: "hook-quality rubric을 실험 writer prompt·LLM judge에 적용", source: "experiment" },
      ],
      claimIds: [
        "thready.threads-market-outcome-design",
        "thready.labeling-corpus-workbench",
        "thready.hook-rubric-experiment",
        "thready.generation-quality-system",
        "thready.quality-criteria-system",
      ],
    },
    {
      no: "04",
      title: "중복 event와 provider lifecycle을 제어한 realtime AI session",
      description: [
        "WebSocket 기반 상담에서 같은 event가 겹치거나 provider 상태가 어긋나는 경우를 session lifecycle 안에서 제어했습니다.",
        { text: "session lifecycle·STT/LLM provider boundary 공동 주 기여", source: "실시간 AI 상담" },
        { text: "task cancellation·debounce·retry·turn-state guard", source: "WebSocket" },
      ],
      claimIds: ["centurion.say-realtime-ai"],
    },
    {
      no: "05",
      title: "검증 하네스와 함께 백엔드 병렬 재구축",
      description: [
        "production 운영과 AI 기능 확장의 제약을 확인하고 backend만 병렬 재구축했습니다.",
        { text: "frontend·기존 release 흐름을 유지한 backend-only cutover", source: "Thready" },
        { text: "contract·component·operational-flow validation harness 선행", source: "verification" },
        { text: "도메인·저장소·트랜잭션 책임을 분리하고 기존 API 계약을 유지한 채 전환", source: "Thready" },
      ],
      claimIds: [
        "thready.rebuild-decision-execution",
        "thready.backend-rebuild",
      ],
    },
  ],
  workStyles: [
    {
      no: "01",
      title: "제품 원장과 AI 실행 상태의 소유자를 분리합니다",
      body: "제품 정책은 product backend가, 생성 lifecycle은 AI application이 갖게 하고 전달은 durable contract로 연결합니다.",
      claimIds: ["thready.ai-service-boundary", "thready.ai-replica-outbox"],
    },
    {
      no: "02",
      title: "AI 품질을 한 점수로 감추지 않습니다",
      body: "결정적 형식 오류·실측 분포·사람 판단을 다른 층으로 나눠 자동화가 가능한 범위와 최종 판단의 한계를 드러냅니다.",
      claimIds: ["thready.quality-criteria-system"],
    },
    {
      no: "03",
      title: "실험 자산과 production contract를 구분합니다",
      body: "corpus·rubric·judge가 어느 환경과 시점에서 검증됐는지 분리하고, 실험 결과를 현재 production 동작으로 확대하지 않습니다.",
      claimIds: ["thready.hook-rubric-experiment", "thready.labeling-corpus-workbench"],
    },
  ],
  skills: [
    {
      label: "AI Product Runtime",
      stack: "LLM integration/evaluation · typed prompt · structured output · WebSocket · STT",
      via: "생성 lifecycle·품질 판정·realtime session 경계",
      claimIds: ["thready.generation-quality-system", "centurion.say-realtime-ai"],
    },
    {
      label: "Backend Core",
      stack: "Python · FastAPI · PostgreSQL · Redis",
      via: "product ledger·AI application·API contract·migration",
      claimIds: ["thready.backend-rebuild", "thready.ai-service-boundary"],
    },
    {
      label: "Data / Async",
      stack: "RabbitMQ · TaskIQ · Transactional Outbox · MySQL",
      via: "retry·version fence·terminal failure·manual reprocessing",
      claimIds: ["thready.ai-replica-outbox", "centurion.bay-async-backend"],
    },
    {
      label: "Cloud / Delivery",
      stack: "Docker · GitHub Actions · Azure · Terraform",
      via: "service·DB·worker 배포와 기본 post-deploy 확인",
      claimIds: ["infra.company-azure-ownership"],
    },
  ],
});

export const AX_FDE_RESUME = makeBase({
  ...ROLE_CATALOG["ax-fde"],
  description: "고객·현장 문제를 production system으로 바꾸고 적용·운영까지 책임진 경험",
  position: "Forward Deployed Engineer · Product Systems",
  summary: [
    {
      text: [
        {
          text: "고객과 운영 조직의 모호한 문제를 제품 요구와 실행 가능한 시스템으로 바꾸고, 설계·구현·출시·운영까지 이어가는 Forward Deployed Engineer",
          tone: "strong",
        },
        { text: "입니다." },
      ],
      claimIds: [
        "career.medisolve-role-evolution",
        "career.product-ux-practice",
        "thready.product-zero-to-one-contribution",
        "nexus.backend-architecture",
        "career.sellercanvas-enterprise-poc",
      ],
    },
    {
      text: "Thready에서는 고객의 콘텐츠 제작 문제를 실제 고객이 결제하는 AI 제품으로 만들었고, 여러 피부과의 운영·예약 요구는 multi-brand backend와 권한 경계로 구현했습니다. 외부 기업 PoC와 제품 운영에서 반복해 온 방식을 제품별 Decision·SPEC·Work Package·QA·release와 회사 AX 구조로 확장했습니다.",
      claimIds: [
        "thready.subscription-revenue-band",
        "nexus.hospital-operations-revenue-contribution",
        "nexus.branch-access-boundary",
        "career.sellercanvas-product-system",
        "career.sellercanvas-enterprise-poc",
        "mediness.company-work-ax-design",
        "mediness.product-operations",
      ],
    },
  ],
  careers: makeCareers({
    currentClaimIds: [
      "thready.product-zero-to-one-contribution",
      "thready.frontend-product-delivery",
      "thready.subscription-revenue-band",
      "mediness.company-work-ax-design",
      "mediness.product-system-design-participation",
      "mediness.product-operations",
      "be-template.backend-standard",
      "be-template.agent-context",
      "centurion.day-product-integration",
      "nexus.hospital-operations-revenue-contribution",
      "nexus.backend-architecture",
      "nexus.admin-backend-ownership",
      "nexus.branch-access-boundary",
      "centurion.day-product-integration",
      "centurion.say-realtime-ai",
    ],
    currentDetails: [
      "고객이 돈을 내는 이유를 기능·실험·품질 기준으로 구체화하고 기획·QA·마케팅과 Thready의 제품 판단·출시·운영을 리드했습니다. 팀과 실제 고객이 결제하는 유료 제품으로 만들었고, 필요한 backend·AI·핵심 frontend도 직접 구현했습니다.",
      "여러 피부과의 홈페이지·관리·예약 흐름을 지원하는 backend의 service boundary와 migration을 주도하고, 운영자의 소속 지점과 현재 작업 지점을 나눈 권한 경계를 설계했습니다. 제품은 예약률 개선을 통해 고객사 매출 성과에 기여했습니다.",
      "Centurion에서는 예약 정책을 backend 판단·frontend 표시·QA·release까지 연결했고, 실시간 AI 상담은 공동 주 기여로 세션과 외부 AI 연동 구조를 설계·통합했습니다.",
      "MEDINESS의 제품 요구·운영 흐름 설계에 참여하고 Decision·SPEC·Work Package·owner·QA approval·release gate 적용과 운영을 리드했습니다. 이 경험을 의사결정·회의·업무 배정·승인·후속 작업까지 잇는 회사 AX 구조 설계로 확장했습니다.",
      "layered architecture·DI·ADR·runbook 기반 FastAPI template과 agent-readable context를 직접 구축했습니다.",
    ],
  }),
  outcomes: [
    {
      no: "01",
      title: "고객의 콘텐츠 제작 문제를 실제 고객이 결제하는 AI 제품으로 만들었습니다",
      description: [
        "무엇을 써야 반응을 얻을지 알기 어렵다는 문제를 기능·실험·품질 기준으로 나누고, 기획·QA·마케팅과 제품 운영을 리드하며 필요한 시스템을 직접 구현했습니다.",
        { text: "고객 문제→기능·실험 우선순위→품질·release 기준 연결", source: "Thready" },
        { text: "제품 성과: 실제 고객이 결제하는 유료 제품 운영", source: "팀 outcome" },
        { text: "backend·AI·핵심 frontend 직접 구현", source: "product delivery" },
      ],
      claimIds: [
        "thready.product-zero-to-one-contribution",
        "thready.frontend-product-delivery",
        "thready.subscription-revenue-band",
      ],
    },
    {
      no: "02",
      title: "여러 피부과의 운영·예약 요구를 backend와 권한 경계로 구현했습니다",
      description: [
        "여러 현장의 홈페이지·관리·예약 흐름을 하나의 제품에서 지원하도록 service boundary와 migration을 주도하고, 지점 단위 접근 규칙을 서버가 소유하는 상태로 만들었습니다.",
        { text: "Homepage/Admin API를 분리한 Clean Architecture monorepo", source: "system design" },
        { text: "소속 지점과 현재 작업 지점을 나눈 server-owned 권한 상태", source: "authorization" },
        { text: "제품의 예약률 개선과 고객사 매출 성과에 기여", source: "팀 outcome" },
      ],
      claimIds: [
        "nexus.hospital-operations-revenue-contribution",
        "nexus.backend-architecture",
        "nexus.admin-backend-ownership",
        "nexus.branch-access-boundary",
      ],
    },
    {
      no: "03",
      title: "생성형 AI 제품을 prototype에서 v1.0·외부 기업 PoC까지 구체화했습니다",
      description: [
        "PM을 주 역할로 고객 흐름·기능 범위·출시 우선순위를 정해 prototype을 첫 제품으로 구체화하고, 외부 패션 브랜드의 요구를 기술 검증 범위로 바꿔 PoC를 진행했습니다.",
        { text: "prototype에서 v1.0까지 제품 흐름·기능 범위 구체화", source: "SellerCanvas" },
        { text: "외부 패션 브랜드의 비즈니스 요구를 기술 검증 범위로 전환", source: "enterprise delivery" },
        { text: "상세 페이지 제작 흐름 특허 등록·CES 2024 Best of Innovation", source: "외부 검증" },
      ],
      claimIds: [
        "career.sellercanvas-product-system",
        "career.sellercanvas-enterprise-poc",
        "credentials.page-output-patent",
        "credentials.ces-2024",
      ],
    },
    {
      no: "04",
      title: "제품 개발에서 검증한 실행 방식을 회사 AX 구조로 확장했습니다",
      description: [
        "제품의 요구·판단·작업·검증을 같은 맥락에서 운영한 경험을 바탕으로, 의사결정·회의·업무 배정·승인·후속 작업까지 이어지는 구조 설계에 참여했습니다.",
        { text: "Decision·SPEC·Work Package와 owner·QA approval·release gate 운영", source: "제품 적용" },
        { text: "회의·요청에서 agent가 맥락·초안·근거를 준비", source: "agent execution" },
        { text: "우선순위·배정·승인·release 판단은 사람이 소유", source: "human gate" },
      ],
      claimIds: [
        "mediness.company-work-ax-design",
        "mediness.product-system-design-participation",
        "mediness.product-operations",
      ],
    },
    {
      no: "05",
      title: "여러 제품을 함께 만드는 팀의 FastAPI 시작점을 표준화했습니다",
      description: [
        "2~3명의 backend engineer가 여러 제품을 맡는 환경에서 architecture와 작업 규칙을 매번 다시 설명하지 않도록 공통 기반을 만들었습니다.",
        { text: "layered architecture·DI·ADR·convention·runbook", source: "FastAPI template" },
        { text: "logging·monitoring 등 횡단 관심사의 공통 반영", source: "team leverage" },
        { text: "계층형 agent context와 반복 작업 automation skill", source: "AI-assisted delivery" },
      ],
      claimIds: [
        "be-template.backend-standard",
        "be-template.team-leverage",
        "be-template.agent-context",
      ],
    },
  ],
  workStyles: [
    {
      no: "01",
      title: "요청보다 실제 업무 흐름부터 봅니다",
      body: "고객과 운영자가 어디에서 멈추는지 확인한 뒤 문제·제약·성공 조건을 나눠 기술 범위를 정합니다.",
      claimIds: ["career.product-ux-practice", "thready.product-zero-to-one-contribution", "nexus.backend-architecture"],
    },
    {
      no: "02",
      title: "업무 규칙을 시스템 경계로 바꿉니다",
      body: "모호한 요구를 domain model·API·transaction·authorization·작업 상태로 나눠 구현과 검증이 가능한 계약으로 만듭니다.",
      claimIds: ["nexus.backend-architecture", "nexus.branch-access-boundary", "centurion.day-product-integration"],
    },
    {
      no: "03",
      title: "한 번의 구축을 다음 실행 방식으로 남깁니다",
      body: "현장에서 확인한 판단과 검증 기준을 Decision·SPEC·runbook·agent context로 남겨 다음 제품과 담당자가 다시 사용할 수 있게 합니다.",
      claimIds: ["mediness.product-operations", "be-template.agent-context"],
    },
  ],
  skills: [
    {
      label: "Forward Deployment",
      stack: "Problem discovery · technical scoping · build · rollout · operation",
      via: "고객·현장 문제를 제품 범위로 정하고 구현·출시·운영까지 연결",
      claimIds: [
        "thready.product-zero-to-one-contribution",
        "nexus.backend-architecture",
        "career.sellercanvas-enterprise-poc",
      ],
    },
    {
      label: "Backend Core",
      stack: "Python · FastAPI · PostgreSQL · Redis",
      via: "업무 규칙을 domain·API·transaction·authorization·migration 경계로 구현",
      claimIds: ["thready.backend-rebuild", "nexus.backend-architecture", "nexus.branch-access-boundary"],
    },
    {
      label: "AI Product",
      stack: "LLM integration/evaluation · typed prompt · structured output",
      via: "생성 기능과 품질 판단 기준을 제품 workflow에 연결",
      claimIds: ["thready.generation-quality-system", "thready.quality-criteria-system"],
    },
    {
      label: "Product Implementation",
      stack: "TypeScript · Next.js · API contract",
      via: "콘텐츠 생성·예약·발행·관리의 핵심 사용자 흐름을 backend와 연결",
      claimIds: ["thready.frontend-product-delivery", "centurion.day-product-integration"],
    },
    {
      label: "AX Delivery System",
      stack: "Decision · SPEC · Work Package · QA/release gate · agent context",
      via: "현장에서 반복된 판단과 검증 기준을 사람·agent가 함께 읽는 실행 방식으로 남김",
      claimIds: ["mediness.company-work-ax-design", "mediness.product-operations", "be-template.agent-context"],
    },
  ],
});

export const PLATFORM_RESUME = makeBase({
  ...ROLE_CATALOG["backend-platform"],
  description: "공통 backend 기반·data migration·async recovery를 전면에 둔 지원본",
  position: "Backend Platform Engineer",
  summary: [
    {
      text: [
        {
          text: "여러 제품에서 반복되는 backend 구조를 공통 기반으로 만들고, 서비스와 데이터의 책임·비동기 작업의 복구 상태를 명시하는 Tech Lead이자 Backend Engineer",
          tone: "strong",
        },
        { text: "입니다. application·DB migration과 Outbox 전달, worker retry부터 수동 재처리까지 운영 중 실패할 수 있는 경계를 설계합니다." },
      ],
      claimIds: [
        "career.medisolve-role-evolution",
        "be-template.backend-standard",
        "thready.ai-service-migration",
        "centurion.bay-async-backend",
      ],
    },
    {
      text: "layered architecture·DI·ADR·runbook과 agent context를 갖춘 조직 표준 FastAPI template을 직접 구축했습니다. 배포 환경은 제품을 운영하는 데 필요한 수준으로 구성하고, 핵심 전문성은 application과 data boundary에 둡니다.",
      claimIds: [
        "be-template.backend-standard",
        "be-template.team-leverage",
        "be-template.agent-context",
        "infra.company-azure-ownership",
      ],
    },
  ],
  careers: makeCareers({
    currentClaimIds: [
      "be-template.backend-standard",
      "be-template.team-leverage",
      "be-template.agent-context",
      "thready.ai-service-boundary",
      "thready.ai-service-migration",
      "thready.ai-replica-outbox",
      "centurion.bay-async-backend",
      "infra.company-azure-ownership",
    ],
    currentDetails: [
      "layered architecture·DI·ADR·convention·runbook 기반 조직 FastAPI template과 agent context를 구축했습니다.",
      "AI application·DB migration과 Outbox·version fence, 주문·재고 worker의 retry·terminal failure·수동 재처리 경계를 구현했습니다.",
      "여러 사내 서비스의 Azure·Vercel 배포 환경을 서비스가 동작하도록 구성하고 기본 운영을 맡았습니다.",
    ],
    studioDetails: [
      "Vision AI Engineer에서 Product Manager로 역할을 넓혀 생성형 AI 커머스 제품의 prototype→v1.0 제품화와 기업 PoC를 진행했습니다.",
    ],
  }),
  outcomes: [
    {
      no: "01",
      title: "소수 인원이 여러 제품을 운영하는 FastAPI platform 표준",
      description: [
        "제품마다 다른 구조와 운영 규칙을 다시 학습하는 비용을 줄이기 위해 backend architecture와 실행 맥락을 공통 기반으로 만들었습니다.",
        { text: "layered architecture·DI·ADR·convention·runbook", source: "FastAPI template" },
        { text: "logging·monitoring 등 횡단 관심사의 공통 적용", source: "platform concern" },
        { text: "agent-readable context와 반복 작업 automation", source: "AI-assisted delivery" },
      ],
      claimIds: [
        "be-template.backend-standard",
        "be-template.team-leverage",
        "be-template.agent-context",
      ],
    },
    {
      no: "02",
      title: "서비스·DB 분리 뒤 원장 상태가 수렴하는 migration·Outbox 설계",
      description: [
        "application과 DB를 분리하는 변경에서 기존 데이터 이전뿐 아니라 이후의 지연·중복·역순 전달까지 함께 다뤘습니다.",
        { text: "STG migration과 MD5·FK orphan·API E2E verification", source: "data move" },
        { text: "owner mutation과 Outbox의 동일 transaction", source: "durability" },
        { text: "relay retry·delivery version fence", source: "convergence" },
      ],
      claimIds: [
        "thready.ai-service-boundary",
        "thready.ai-service-migration",
        "thready.ai-replica-outbox",
      ],
    },
    {
      no: "03",
      title: "재시도 이후에도 운영자가 복구할 수 있는 주문·재고 worker",
      description: [
        "실패 가능한 후속 작업을 API 요청에서 분리하고, 자동 재시도가 끝난 뒤에도 원인과 상태를 남겨 다시 처리할 수 있게 했습니다.",
        { text: "RabbitMQ·TaskIQ worker와 API 실행 경계 분리", source: "Centurion · 주문·재고" },
        { text: "상태·retry·terminal failure·manual reprocess", source: "worker lifecycle" },
        { text: "API test·Docker CI·onboarding 기반", source: "delivery" },
      ],
      claimIds: [
        "centurion.bay-async-backend",
        "centurion.async-migration",
        "centurion.test-ci-foundation",
      ],
    },
  ],
  workStyles: [
    {
      no: "01",
      title: "서비스와 데이터의 소유자를 먼저 나눕니다",
      body: "변경이 다른 제품 원장과 실행 상태로 번지지 않도록 application·DB·worker 경계를 먼저 나눕니다.",
      claimIds: ["thready.ai-service-boundary"],
    },
    {
      no: "02",
      title: "migration은 데이터와 기능을 따로 검증합니다",
      body: "rehearsal·count·fingerprint·FK를 확인한 뒤 post-deploy API 동작을 별도 gate로 검증합니다.",
      claimIds: ["thready.ai-service-migration"],
    },
    {
      no: "03",
      title: "운영자가 복구할 수 있는 상태를 남깁니다",
      body: "retry가 끝난 worker와 불확실한 외부 상태를 기록·조회·수동 재처리할 수 있게 만들고 runbook에 운영 경계를 남깁니다.",
      claimIds: ["centurion.bay-async-backend", "be-template.backend-standard"],
    },
  ],
  skills: [
    {
      label: "Backend Platform",
      stack: "Python · FastAPI · DI · ADR · runbook · CI",
      via: "다제품 공통 architecture·개발 규칙·agent-readable context",
      claimIds: ["be-template.backend-standard", "be-template.agent-context"],
    },
    {
      label: "Distributed State / Async",
      stack: "PostgreSQL · RabbitMQ · TaskIQ · Transactional Outbox",
      via: "migration·retry·version fence·terminal failure·manual reprocessing",
      claimIds: ["thready.ai-replica-outbox", "centurion.bay-async-backend"],
    },
    {
      label: "Cloud / Delivery",
      stack: "Docker · GitHub Actions · Azure · Terraform",
      via: "서비스 배포·환경 설정·기본 로그 확인 경험",
      claimIds: ["infra.company-azure-ownership"],
    },
  ],
});

const ROLE_RESUMES_BY_SLUG = {
  "tech-lead-product": TECH_LEAD_PRODUCT_RESUME,
  "product-owner": PRODUCT_OWNER_RESUME,
  backend: BACKEND_RESUME,
  "ai-product-backend": AI_PRODUCT_BACKEND_RESUME,
  "ax-fde": AX_FDE_RESUME,
  "backend-platform": PLATFORM_RESUME,
} satisfies Record<RoleVariantSlug, TailoredResume>;

export const ROLE_RESUMES = ROLE_VARIANT_SLUGS.map(
  (slug) => ROLE_RESUMES_BY_SLUG[slug],
);
