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

const UPDATED_AT = "2026-08-22";
const MAKER_HOOK = "아이디어를 새로운 가치로 실현하는 메이커, 김대정입니다.";

const CONTACTS = [
  { label: "marin.backend@gmail.com", href: "mailto:marin.backend@gmail.com" },
  {
    label: "github.com/Dae-Jeong",
    href: "https://github.com/Dae-Jeong",
    external: true,
  },
  { label: "marinkim.xyz", href: "https://marinkim.xyz", external: true },
  { label: "경기 안양시" },
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
    { text: "으로 0→1 구간을 이끌고 외부 패션 브랜드 PoC를 진행했습니다." },
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
    text: "특허 「페이지 출력 방법」 · 출원 10-2022-0130234 · 등록 10-2898273",
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
  description,
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
  description: string;
}): TailoredResume {
  return {
    slug,
    companyName: "Role Draft",
    position,
    roleVariant: { label, shortLabel, description },
    sectionOrder: [
      "profile",
      "career",
      "outcomes",
      "workStyles",
      "skills",
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
    summary: [
      {
        text: [{ text: MAKER_HOOK, tone: "strong" }],
      },
      ...summary,
    ],
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
  description: "제품 판단과 backend 실행, 운영 결과를 함께 보여주는 기본 지원본",
  position: "Backend-first Tech Lead · Product Engineer",
  summary: [
    {
      text: [
        {
          text: "고객이 어디에서 막히는지 찾고, 그 문제를 제품 범위로 정한 뒤 백엔드·AI·핵심 화면까지 직접 만들어 운영하는 Tech Lead이자 Backend Engineer",
          tone: "strong",
        },
        { text: "입니다. 기획·QA·마케팅과 Thready 제품 운영을 이끌었고, 제품은 " },
        { text: "2026년 8월 기준 월 약 800만~1,000만원", tone: "metric" },
        { text: "의 구독료 매출이 발생하고 있습니다." },
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
      "thready.qa-reopen-reduction",
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
        { text: "Thready 제품 운영", tone: "strong" },
        {
          text: "을 기획·QA·마케팅과 함께 리드하고 FastAPI backend·AI 생성/평가 system과 Next.js 핵심 흐름을 직접 구현했습니다. 제품은 2026년 8월 기준 월 약 800만~1,000만원의 구독료 매출이 발생하고 있습니다.",
        },
      ],
      "빠른 기능 검증 중심으로 만들어진 초기 prototype backend를 인계받아 validation harness를 먼저 구축하고 FastAPI backend를 병렬 재구축·전환했습니다. 전환 전후 같은 기준의 Jira 집계에서 해결된 QA issue의 reopen 비율은 26%p 낮게 관측됐습니다.",
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
      title: "고객 문제에서 시작해 팀과 함께 Thready를 유료 제품으로 만들고 운영",
      description: [
        "잘되는 콘텐츠의 기준을 알기 어렵다는 고객 문제를 데이터·기능·생성 품질 문제로 나누고, 팀과 제품 운영을 이끄는 동시에 핵심 제품 흐름을 직접 구현했습니다.",
        { text: "기능·실험 우선순위, 생성 품질 기준, QA·release 운영 리드", source: "제품 운영" },
        { text: "FastAPI backend·AI 생성/평가와 Next.js 생성·예약·발행·관리 흐름 구현", source: "제품 개발" },
        { text: "최근 1년 내 게시된 공개 콘텐츠와 반응 추이를 바탕으로 콘텐츠 outcome 후보 설계", source: "시장 데이터" },
        { text: "제품 성과: 월 약 800만~1,000만원 구독료 매출(2026.08 기준)", source: "팀 outcome" },
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

export const BACKEND_RESUME = makeBase({
  ...ROLE_CATALOG.backend,
  description: "transaction·migration·async failure·authorization을 전면에 둔 지원본",
  position: "Backend Engineer",
  summary: [
    {
      text: [
        {
          text: "데이터나 후속 작업이 어긋날 수 있는 지점을 transaction·service·worker·권한 경계로 나누고, 구현부터 migration·배포·운영까지 책임지는 Backend Engineer",
          tone: "strong",
        },
        { text: "입니다. FastAPI 제품 backend를 재구축·전환해 실제 사용자 운영까지 이어왔으며, Vision AI·PM 경력을 포함한 " },
        { text: "실무 4년차", tone: "metric" },
        { text: "입니다." },
      ],
      claimIds: [
        "career.tenure",
        "career.ai-pm-backend-continuity",
        "thready.backend-rebuild",
        "thready.prototype-to-user-operation",
      ],
    },
    {
      text: "정상 동작보다 실패한 뒤의 상태를 먼저 봅니다. 서비스 분리 뒤의 데이터 이관과 역순 전달, 재시도 소진 뒤의 작업 보존, 클라이언트 입력에 의존한 지점 권한, 외부 결제사와 로컬 DB의 상태 차이를 각각 Outbox·version fence·수동 재처리·server auth state·보상 처리로 다뤘습니다.",
      claimIds: [
        "thready.ai-service-migration",
        "thready.ai-replica-outbox",
        "centurion.bay-async-backend",
        "nexus.branch-access-boundary",
        "career.memento-stripe-prepayment",
        "career.memento-payment",
      ],
    },
  ],
  careers: makeCareers({
    currentClaimIds: [
      "thready.rebuild-decision-execution",
      "thready.backend-rebuild",
      "thready.qa-reopen-reduction",
      "thready.ai-service-boundary",
      "thready.ai-service-migration",
      "thready.ai-replica-outbox",
      "centurion.bay-async-backend",
      "centurion.async-migration",
      "nexus.backend-architecture",
      "nexus.branch-access-boundary",
      "be-template.backend-standard",
    ],
    currentDetails: [
      "빠른 기능 검증 중심으로 만들어진 초기 prototype backend를 인계받아 validation harness를 먼저 세우고 FastAPI backend를 병렬 재구축·cutover했습니다. 전환 전후 같은 기준의 Jira 집계에서 해결된 QA issue의 reopen 비율은 26%p 낮게 관측됐습니다.",
      "AI 실행부와 DB를 제품 backend에서 분리하고 STG 이력 migration, MD5·FK·E2E 검증, Outbox·retry·version fence 기반 원장 전달 경계를 구현했습니다.",
      "Centurion의 주문·재고 API와 RabbitMQ·TaskIQ worker에서 상태·retry·terminal failure·수동 재처리 경계를 구축했습니다.",
      "여러 피부과 운영·예약 backend의 service boundary와 migration을 주도하고, client header 대신 server auth state가 작업 지점을 결정하는 접근 경계를 구현 중입니다.",
      "여러 사내 서비스의 Azure·Vercel 배포 환경을 구성하고 기본 운영을 맡았습니다.",
      "layered architecture·DI·ADR·runbook을 갖춘 조직 표준 FastAPI template과 agent context를 구축했습니다.",
    ],
  }),
  outcomes: [
    {
      no: "01",
      title: "인계받은 초기 backend를 production 운영 단계에 맞게 FastAPI로 재구축",
      description: [
        "빠른 기능 검증 중심의 초기 prototype backend를 인계받아 부분 수정과 재구축 범위를 비교하고, 검증 기준을 먼저 세운 뒤 backend만 병렬 전환했습니다.",
        { text: "contract·component·operational-flow validation harness 선행", source: "Thready" },
        { text: "기존 Next.js와 release 흐름을 유지한 backend-only cutover", source: "v1.1.0" },
        { text: "전환 전후 같은 기준에서 QA issue reopen 비율 26%p 낮게 관측", source: "Jira 전후 관측" },
      ],
      claimIds: [
        "thready.rebuild-decision-execution",
        "thready.backend-rebuild",
        "thready.prototype-to-user-operation",
        "thready.qa-reopen-reduction",
        "thready.release-operation",
      ],
    },
    {
      no: "02",
      title: "AI application·DB 분리와 migration·Outbox 정합성 검증",
      description: [
        "product ledger와 generation lifecycle의 소유권을 나누고, 기존 데이터 이관과 이후 원장 변경 전달을 함께 설계했습니다.",
        { text: "STG 생성 2,616건·품질 snapshot 795건·trace 7,111건 이관", source: "STG migration" },
        { text: "row count·MD5 fingerprint·FK orphan·생성 API E2E gate", source: "verification" },
        { text: "transactional Outbox·retry·delivery version fence", source: "delivery" },
      ],
      claimIds: [
        "thready.ai-service-boundary",
        "thready.ai-service-migration",
        "thready.ai-replica-outbox",
      ],
    },
    {
      no: "03",
      title: "재시도 소진 뒤에도 복구 가능한 worker 상태 설계",
      description: [
        "API와 후속 작업의 실행·배포 경계를 나누고 자동 재시도 뒤에도 원인과 상태를 확인해 다시 처리할 수 있게 했습니다.",
        { text: "Celery에서 TaskIQ·RabbitMQ로 전환", source: "Centurion · 주문·재고" },
        { text: "상태·retry·terminal failure·manual reprocess", source: "worker lifecycle" },
        { text: "API test·Docker CI·onboarding 기반", source: "delivery" },
      ],
      claimIds: [
        "centurion.bay-async-backend",
        "centurion.async-migration",
        "centurion.test-ci-foundation",
      ],
    },
    {
      no: "04",
      title: "tenant 범위를 client header에서 server auth state로 이동",
      description: [
        "운영자의 소속 지점과 현재 작업 지점을 분리하고, 권한 검증을 통과한 API만 작업 지점을 바꾸게 설계했습니다. 이 영역은 현재 구축 중입니다.",
        { text: "Homepage/Admin API 분리와 gateway 단일 진입점", source: "병원 운영 backend" },
        { text: "multi-tenancy·Soft Delete 자동 filtering", source: "data boundary" },
        { text: "본사 미선택 409·권한 밖 지점 접근 403 구분", source: "authorization" },
      ],
      claimIds: [
        "nexus.backend-architecture",
        "nexus.admin-backend-ownership",
        "nexus.branch-access-boundary",
      ],
    },
    {
      no: "05",
      title: "Stripe 선결제부터 Webhook·취소·환불까지 결제 상태 흐름 구축",
      description: [
        "예약보다 먼저 시작되는 외부 결제와 로컬 결제 이력을 연결하고, 예약 실패와 비동기 환불 완료 시점을 각각 처리했습니다.",
        { text: "manual-capture Checkout과 local transaction ID metadata 연결", source: "Memento" },
        { text: "PaymentIntent 상태별 cancel/refund provider-side 보상", source: "booking failure" },
        { text: "환불 완료 transition 뒤 mileage 복원·ticket 삭제", source: "refund state" },
      ],
      claimIds: ["career.memento-stripe-prepayment", "career.memento-payment"],
    },
  ],
  workStyles: [
    {
      no: "01",
      title: "happy path보다 실패 상태를 먼저 정의합니다",
      body: "재시도·최종 실패·수동 재처리와 외부 provider의 불확실한 결과까지 상태 전이 안에 넣습니다.",
      claimIds: ["centurion.bay-async-backend", "career.memento-payment"],
    },
    {
      no: "02",
      title: "migration은 배포와 기능 검증을 분리합니다",
      body: "rehearsal·count·fingerprint·FK를 확인한 뒤 배포 성공과 post-deploy API 정상 동작을 별도 gate로 검증합니다.",
      claimIds: ["thready.ai-service-migration"],
    },
    {
      no: "03",
      title: "변경 범위와 되돌릴 경계를 먼저 정합니다",
      body: "서비스·DB·worker의 책임을 분리하고, 의도하지 않은 변경이 다른 영역으로 전파되기 전에 확인합니다.",
      claimIds: ["thready.ai-service-boundary"],
    },
  ],
  skills: [
    {
      label: "백엔드 코어",
      stack: "Python · FastAPI · PostgreSQL · MySQL · Redis",
      via: "API·domain model·transaction·migration·authorization",
      claimIds: ["thready.backend-rebuild", "nexus.backend-architecture", "career.memento-stripe-prepayment"],
    },
    {
      label: "메시징 / 비동기 처리",
      stack: "RabbitMQ · TaskIQ · Transactional Outbox",
      via: "retry·failure record·manual reprocessing·delivery version fence",
      claimIds: ["centurion.bay-async-backend", "thready.ai-replica-outbox"],
    },
    {
      label: "Cloud / 배포",
      stack: "Docker · GitHub Actions · Azure · Terraform",
      via: "서비스 배포·환경 설정·기본 로그 확인",
      claimIds: ["infra.company-azure-ownership"],
    },
    {
      label: "AI 런타임",
      stack: "LLM integration/evaluation · structured output · WebSocket · SSE · STT",
      via: "독립 AI application과 realtime session lifecycle",
      claimIds: ["thready.ai-service-boundary", "centurion.say-realtime-ai"],
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
        { text: "Vision AI와 PM 경험으로 고객 문제를 생성 기능과 품질 기준으로 구체화합니다. Thready에서는 제품 운영과 backend·AI·핵심 frontend 구현을 맡았고, 제품은 " },
        { text: "2026년 8월 기준 월 약 800만~1,000만원", tone: "metric" },
        { text: "의 구독료 매출이 발생하고 있습니다." },
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
      "기획·QA·마케팅과 Thready 제품 운영을 리드하며 FastAPI backend·AI 생성/평가 system과 Next.js의 핵심 사용자·관리 흐름을 직접 구현했습니다. 제품 성과: 월 약 800만~1,000만원 구독료 매출(2026.08 기준)",
      "AI application과 DB를 product backend에서 분리하고 STG 생성 이력 2,616건·품질 snapshot 795건·trace 7,111건을 이관했습니다. MD5·FK·API E2E와 Outbox·version fence로 정합성을 검증했습니다.",
      "최근 1년 내 게시된 Threads 공개 콘텐츠와 반응 추이를 중심으로 outcome 후보를 설계하고, 본문·이어쓰기 labeling workflow와 3단계 생성 품질 기준을 구축했습니다.",
      "실시간 AI 상담 backend의 session lifecycle과 provider 경계 안정화에 공동 주 기여하고, 주문·재고 worker의 상태·retry·재처리 경계를 구축했습니다.",
    ],
  }),
  outcomes: [
    {
      no: "01",
      title: "유료 AI 콘텐츠 제품의 운영·개발 리드",
      description: [
        "고객 문제를 기능·실험 우선순위와 생성 품질 기준으로 바꾸고, backend·AI·핵심 frontend를 실제 사용자 흐름까지 구현했습니다.",
        { text: "기획·QA·마케팅과 제품 운영 리드", source: "Thready" },
        { text: "FastAPI backend와 AI 생성·평가 system 직접 개발·운영", source: "AI product" },
        { text: "Next.js 콘텐츠 생성·가져오기·예약·발행·관리 workflow 구현", source: "product flow" },
        { text: "제품 성과: 월 약 800만~1,000만원 구독료 매출(2026.08 기준)", source: "팀 outcome" },
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
      title: "인계받은 prototype backend를 검증 하네스와 함께 재구축",
      description: [
        "빠른 기능 검증 중심으로 만들어진 초기 backend를 인계받아 production 운영과 AI 기능 확장의 제약을 확인하고 backend만 병렬 재구축했습니다.",
        { text: "frontend·기존 release 흐름을 유지한 backend-only cutover", source: "Thready" },
        { text: "contract·component·operational-flow validation harness 선행", source: "verification" },
        { text: "전환 전후 같은 기준에서 QA issue reopen 비율 26%p 낮게 관측", source: "Jira 전후 관측" },
      ],
      claimIds: [
        "thready.rebuild-decision-execution",
        "thready.backend-rebuild",
        "thready.qa-reopen-reduction",
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
  description: "제품과 회사 업무를 사람·agent가 함께 실행하는 구조를 전면에 둔 지원본",
  position: "Product Delivery · AI Transformation",
  summary: [
    {
      text: [
        {
          text: "요구사항을 받아 구현하는 데서 멈추지 않고, 고객이 어디에서 막히는지 찾은 뒤 만들 기능과 품질 기준을 정해 backend·frontend·QA·release까지 연결하는 Tech Lead이자 Backend Engineer",
          tone: "strong",
        },
        { text: "입니다." },
      ],
      claimIds: [
        "career.medisolve-role-evolution",
        "career.product-ux-practice",
        "thready.product-zero-to-one-contribution",
      ],
    },
    {
      text: "Vision AI 개발과 PM·UX 경험을 바탕으로 모호한 요구를 domain model·API·transaction·작업 상태로 바꿉니다. 최근에는 제품 개발뿐 아니라 의사결정·회의·업무 배정·승인·후속 작업까지 이어지는 회사 AX 구조 설계에 참여했고, 제품별 Decision·SPEC·Work Package·release gate 적용과 운영을 리드했습니다.",
      claimIds: [
        "career.ai-pm-backend-continuity",
        "career.product-ux-practice",
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
      "mediness.company-work-ax-design",
      "mediness.product-system-design-participation",
      "mediness.product-operations",
      "be-template.backend-standard",
      "be-template.agent-context",
      "centurion.day-product-integration",
      "nexus.hospital-operations-revenue-contribution",
      "nexus.backend-architecture",
      "infra.company-azure-ownership",
    ],
    currentDetails: [
      "고객의 콘텐츠 제작 문제를 기능·실험·품질 기준으로 구체화하고 기획·QA·마케팅과 Thready 제품 운영을 리드했습니다. backend·AI·핵심 frontend도 직접 구현했으며 제품은 월 약 800만~1,000만원의 구독료 매출이 발생합니다(2026.08 기준).",
      "MEDINESS의 제품 요구·운영 흐름 설계에 참여하고, 제품별 Decision·SPEC·Work Package와 BE·FE·QA owner lane, QA approval·release gate 적용과 운영을 리드했습니다. 회사 AX 구조는 회의·의사결정·업무 배정·승인·후속 작업에서 agent가 맥락·실행안을 준비하고 판단은 사람이 확정하도록 설계하는 데 참여했습니다.",
      "layered architecture·DI·ADR·runbook 기반 FastAPI template과 agent-readable context를 직접 구축했습니다.",
      "DAY 예약 정책을 backend 판단·frontend 표시·QA·release로 연결하고, 별도 피부과 운영·예약 backend 구축을 주도해 제품의 예약률·고객사 매출 성과에 기여했습니다.",
      "여러 사내 서비스의 Azure·Vercel 배포 환경을 구성하고 기본 운영을 맡았습니다.",
    ],
  }),
  outcomes: [
    {
      no: "01",
      title: "고객의 콘텐츠 제작 문제를 유료 AI 제품으로 구체화",
      description: [
        "무엇을 써야 반응을 얻을지 알기 어렵다는 문제를 기능·실험·품질 기준으로 나누고, 팀과 제품 운영을 리드하며 실제 제품 흐름을 구현했습니다.",
        { text: "고객 문제→기능·실험 우선순위→품질·release 기준 연결", source: "Thready" },
        { text: "backend·AI·핵심 frontend 직접 구현", source: "product delivery" },
        { text: "제품 성과: 월 약 800만~1,000만원 구독료 매출(2026.08 기준)", source: "팀 outcome" },
      ],
      claimIds: [
        "thready.product-zero-to-one-contribution",
        "thready.frontend-product-delivery",
        "thready.subscription-revenue-band",
      ],
    },
    {
      no: "02",
      title: "회사 AX 구조 설계에 참여하고 제품 적용·운영을 리드",
      description: [
        "제품 개발과 의사결정·회의·업무 배정·승인·후속 작업을 연결하되, agent가 준비할 일과 사람이 판단할 일을 분리했습니다.",
        { text: "MEDINESS 제품 요구·운영 흐름과 회사 업무 구조 설계 참여", source: "회사 AX 설계" },
        { text: "Decision·SPEC·Work Package와 BE·FE·QA owner lane·QA approval 상태 운영", source: "제품 적용" },
        { text: "실제 완료 시점의 version cut·release note·변경 이력 운영", source: "제품 운영" },
      ],
      claimIds: [
        "mediness.company-work-ax-design",
        "mediness.product-system-design-participation",
        "mediness.product-operations",
      ],
    },
    {
      no: "03",
      title: "사람과 AI agent가 같은 규칙을 읽는 FastAPI 표준 구축",
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
    {
      no: "04",
      title: "피부과 운영·예약 요구를 backend와 권한 경계로 구현",
      description: [
        "현장 운영과 예약을 지원하는 backend 구축을 주도하고, 운영자의 소속 지점과 현재 작업 지점을 서버가 소유하는 권한 상태로 분리했습니다.",
        { text: "Homepage/Admin API가 분리된 Clean Architecture monorepo", source: "병원 운영 system" },
        { text: "working branch를 권한 검증 API로만 전환", source: "authorization" },
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
      no: "05",
      title: "생성형 AI 제품을 prototype에서 v1.0·기업 PoC까지 연결",
      description: [
        "PM 메인 역할로 제품 흐름·기능 범위·출시 우선순위를 정하며 생성형 AI 커머스 제품의 0→1 구간을 통과했습니다.",
        { text: "prototype에서 v1.0 제품화", source: "SellerCanvas" },
        { text: "외부 패션 브랜드 PoC 진행", source: "enterprise delivery" },
        { text: "상세 페이지 제작 방식 특허·CES 2024 Best of Innovation", source: "product outcome" },
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
      title: "요청보다 막히는 지점을 먼저 확인합니다",
      body: "고객·운영자의 현재 흐름을 보고 문제와 제약을 분리한 뒤 기능 범위와 검증 조건을 정합니다.",
      claimIds: ["career.product-ux-practice", "thready.product-zero-to-one-contribution"],
    },
    {
      no: "02",
      title: "문장을 실행 가능한 계약으로 바꿉니다",
      body: "제품 요구와 회사 업무를 domain model·API·transaction·owner lane·human gate로 나눠 담당자와 상태를 드러냅니다.",
      claimIds: ["mediness.company-work-ax-design", "mediness.product-operations", "centurion.day-product-integration"],
    },
    {
      no: "03",
      title: "AI에게 맡길 일과 사람이 확인할 일을 분리합니다",
      body: "탐색·구현·반복 작업은 AI로 가속하고, 제품 판단·검증 결과·release 책임은 사람이 확인 가능한 gate에 둡니다.",
      claimIds: ["be-template.agent-context"],
    },
  ],
  skills: [
    {
      label: "Product Delivery / AX",
      stack: "Decision · SPEC · Work Package · QA/release gate · agent context",
      via: "제품 개발과 회사 업무를 담당자·상태·human gate가 있는 실행 흐름으로 연결",
      claimIds: [
        "mediness.company-work-ax-design",
        "mediness.product-system-design-participation",
        "mediness.product-operations",
      ],
    },
    {
      label: "Backend Core",
      stack: "Python · FastAPI · PostgreSQL · Redis",
      via: "요구를 domain·API·transaction·authorization으로 구현",
      claimIds: ["thready.backend-rebuild", "nexus.backend-architecture"],
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
      via: "콘텐츠 생성·예약·발행·관리의 핵심 사용자 흐름 구현",
      claimIds: ["thready.frontend-product-delivery"],
    },
    {
      label: "Cloud / Delivery",
      stack: "Docker · GitHub Actions · Azure · Terraform",
      via: "서비스 배포·환경 설정·기본 로그 확인 경험",
      claimIds: ["infra.company-azure-ownership"],
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
  backend: BACKEND_RESUME,
  "ai-product-backend": AI_PRODUCT_BACKEND_RESUME,
  "ax-fde": AX_FDE_RESUME,
  "backend-platform": PLATFORM_RESUME,
} satisfies Record<RoleVariantSlug, TailoredResume>;

export const ROLE_RESUMES = ROLE_VARIANT_SLUGS.map(
  (slug) => ROLE_RESUMES_BY_SLUG[slug],
);
