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

const UPDATED_AT = "2026-08-21";
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
    text: "Memento AI에서의 개발 성과를 인정받아 MediSolve AI 초기 멤버로 영입됐습니다. 법인 설립 전에는 더데이랩스 프리랜서로 제품 개발을 먼저 시작했고(2025.02–04), 2025년 4월 정규직으로 합류해 Tech Lead를 맡았습니다.",
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
      details: [JOINING_PATH, ...currentDetails],
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
    label: "Cloud / Engineering System",
    stack: "Azure · Terraform · Docker · GitHub Actions · ADR · runbook",
    via: "state·drift 변경 gate와 조직 공통 FastAPI·agent 실행 기준 운영",
    claimIds: [
      "infra.terraform-state-safety",
      "be-template.backend-standard",
      "be-template.agent-context",
    ],
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
      text: "백엔드에서는 서비스와 데이터의 책임, migration 정합성, 비동기 작업의 복구 상태, 권한 경계와 인프라 변경 범위를 설계합니다. Vision AI·PM·UX 경험은 제품 정책을 domain model·API·transaction·QA·release 조건으로 구체화하는 데 쓰고, AI를 구현에 적극 활용하되 최종 판단은 검증 gate로 남깁니다.",
      claimIds: [
        "career.ai-pm-backend-continuity",
        "career.product-ux-practice",
        "thready.ai-service-boundary",
        "centurion.bay-async-backend",
        "mediness.product-operations",
        "infra.ai-assisted-change-harness",
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
      "mediness.product-operations",
      "infra.company-azure-ownership",
    ],
    currentDetails: [
      [
        { text: "Thready 제품 운영", tone: "strong" },
        {
          text: "을 기획·QA·마케팅과 함께 리드하고 FastAPI backend·AI 생성/평가 system과 Next.js 핵심 흐름을 직접 구현했습니다. 제품 성과: 월 약 800만~1,000만원 구독료 매출(2026.08 기준)",
        },
      ],
      "초기 prototype의 의존성과 반복 결함을 운영 위험으로 판단해 validation harness를 먼저 구축하고 FastAPI backend를 병렬 재구축·전환했습니다. 전환 전후 해결된 QA issue의 reopen 비율은 26%p 낮아졌습니다.",
      "Centurion 초기 backend와 개발 기준을 세우고, 의료 MSA에서 주문·재고 worker의 상태·retry·실패 기록·재처리와 DAY 예약 정책의 backend·frontend·QA·release 연결을 주도했습니다.",
      "별도의 여러 피부과 운영·예약 backend architecture와 migration 흐름 구축을 주도했습니다. 제품은 예약률 개선을 통해 고객사 매출에 기여했습니다.",
      "조직 표준 FastAPI template과 agent context를 구축하고, 제품별 Decision·SPEC·Work Package·QA approval·release gate를 실행 원장으로 운영했습니다.",
      "회사 Azure·Terraform 인프라 전반을 맡아 6개 독립 state·400개 이상의 state object와 운영 로그·알림을 관리했습니다.",
    ],
  }),
  outcomes: [
    {
      no: "01",
      title: "Thready 0→1 제품 운영과 핵심 시스템 구현",
      description: [
        "잘되는 콘텐츠의 기준을 알기 어렵다는 고객 문제를 데이터·기능·생성 품질 문제로 나누고, 팀과 제품 운영을 이끄는 동시에 핵심 제품 흐름을 직접 구현했습니다.",
        { text: "기능·실험 우선순위, 생성 품질 기준, QA·release 운영 리드", source: "제품 운영" },
        { text: "FastAPI backend·AI 생성/평가와 Next.js 생성·예약·발행·관리 흐름 구현", source: "제품 개발" },
        { text: "URL 기준 최신 상태 13.1만 행·시계열 관측 318만 행을 바탕으로 outcome 후보 5개 설계", source: "시장 데이터" },
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
      title: "소수 인원이 여러 제품을 맡는 backend 실행 기준 통합",
      description: [
        "구조와 작업 규칙을 매번 다시 설명하지 않도록 application architecture와 제품 실행 상태를 재사용 가능한 기준으로 만들었습니다.",
        { text: "layered architecture·DI·ADR·convention·runbook 기반 FastAPI template", source: "조직 표준" },
        { text: "agent context와 반복 작업 automation skill 내장", source: "AI-assisted delivery" },
        { text: "Decision·SPEC·Work Package와 BE·FE·QA owner lane·release gate 운영", source: "제품 운영" },
      ],
      claimIds: [
        "be-template.backend-standard",
        "be-template.team-leverage",
        "be-template.agent-context",
        "mediness.product-operations",
      ],
    },
    {
      no: "05",
      title: "6개 Terraform state로 회사 Azure 변경 범위 격리",
      description: [
        "AI로 resource inventory와 Terraform 구현을 빠르게 진행하되, 실제 변경 여부는 state·plan·live inventory를 사람이 대조해 판단했습니다.",
        { text: "6개 독립 root·remote state와 400개 이상의 state object 운영", source: "회사 Azure" },
        { text: "의도하지 않은 destroy·replace와 환경 간 변경 전파를 apply 전에 차단", source: "change gate" },
        { text: "10대 VM container log 중앙화와 Production alert 8개 운영", source: "observability" },
      ],
      claimIds: [
        "infra.company-azure-ownership",
        "infra.ai-assisted-change-harness",
        "infra.terraform-state-safety",
        "infra.azure-observability",
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
      body: "codebase 파악·inventory·구현에는 AI를 적극 활용하지만 test·state·plan·live 상태를 사람이 비교한 뒤 release와 apply를 결정합니다.",
      claimIds: ["thready.rebuild-decision-execution", "infra.ai-assisted-change-harness"],
    },
    {
      no: "03",
      title: "팀이 다시 쓸 수 있는 기준을 남깁니다",
      body: "결정 이유와 실행 상태를 ADR·runbook·Decision·SPEC·Work Package·agent context로 남겨 다음 제품과 다음 담당자가 재사용하게 합니다.",
      claimIds: ["be-template.backend-standard", "be-template.agent-context", "mediness.product-operations"],
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
      "infra.terraform-state-safety",
      "be-template.backend-standard",
    ],
    currentDetails: [
      "초기 prototype의 의존성과 반복 결함을 운영 위험으로 판단해 validation harness를 먼저 세우고 FastAPI backend를 병렬 재구축·cutover했습니다. 전환 전후 해결된 QA issue의 reopen 비율은 26%p 낮아졌습니다.",
      "AI 실행부와 DB를 제품 backend에서 분리하고 STG 이력 migration, MD5·FK·E2E 검증, Outbox·retry·version fence 기반 원장 전달 경계를 구현했습니다.",
      "Centurion의 주문·재고 API와 RabbitMQ·TaskIQ worker에서 상태·retry·terminal failure·수동 재처리 경계를 구축했습니다.",
      "여러 피부과 운영·예약 backend의 service boundary와 migration을 주도하고, client header 대신 server auth state가 작업 지점을 결정하는 접근 경계를 구현 중입니다.",
      "회사 Azure/Terraform의 6개 독립 state·400개 이상의 object를 운영하고 state·plan·live inventory 대조로 destructive change를 사전에 차단했습니다.",
      "layered architecture·DI·ADR·runbook을 갖춘 조직 표준 FastAPI template과 agent context를 구축했습니다.",
    ],
  }),
  outcomes: [
    {
      no: "01",
      title: "기존 frontend를 유지한 FastAPI backend 병렬 재구축·전환",
      description: [
        "부분 수정과 재구축 범위를 비교해 초기 단계의 전면 재구축을 결정하고, 검증 기준을 먼저 세운 뒤 backend만 병렬 전환했습니다.",
        { text: "architecture·component·infra validation harness 선행", source: "Thready" },
        { text: "기존 Next.js와 release 흐름을 유지한 backend-only cutover", source: "v1.1.0" },
        { text: "전환 전후 해결된 QA issue의 reopen 비율 26%p 하락", source: "Jira 전후 관측" },
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
      body: "서비스·DB·worker·Terraform state를 분리하고, 의도하지 않은 변경이 다른 영역으로 전파되기 전에 확인합니다.",
      claimIds: ["thready.ai-service-boundary", "infra.terraform-state-safety"],
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
      label: "데이터 정합성 / 비동기",
      stack: "RabbitMQ · TaskIQ · Transactional Outbox",
      via: "retry·failure record·manual reprocessing·delivery version fence",
      claimIds: ["centurion.bay-async-backend", "thready.ai-replica-outbox"],
    },
    {
      label: "Cloud / 배포",
      stack: "Azure · Terraform · Docker · GitHub Actions",
      via: "remote state·drift gate·logging·alert",
      claimIds: ["infra.terraform-state-safety", "infra.azure-observability"],
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
      "Threads URL 최신 상태 13.1만 행과 시계열 관측 318만 행에서 5개 outcome 후보를 설계하고, 11.1만 본문·18.5만 이어쓰기 labeling workflow와 3단계 생성 품질 기준을 구축했습니다.",
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
      title: "13.1만 최신 상태·318만 관측을 콘텐츠 성과 기준으로 구조화",
      description: [
        "감에 의존하던 콘텐츠 판단을 비교 가능한 outcome 후보, labeling workflow, 생성 품질 평가 절차로 나눴습니다.",
        { text: "절대·작성자 상대·도메인 상대 등을 포함한 outcome 후보 5개", source: "market data" },
        { text: "11.1만 본문·18.5만 이어쓰기의 typed validation·멱등 importer·API/UI workbench", source: "labeling" },
        { text: "자동 gate 12종·실측 분포·사람 판정의 3단계 품질 기준", source: "quality" },
        { text: "20,256건 8축 rubric을 실험 writer prompt·LLM judge에 적용", source: "experiment" },
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
      title: "검증 하네스를 먼저 세운 AI prototype backend 재구축",
      description: [
        "빠른 검증을 위해 만들어진 초기 backend가 production 운영과 AI 기능 확장의 제약이 된다고 판단해 backend만 병렬 재구축했습니다.",
        { text: "frontend·기존 release 흐름을 유지한 backend-only cutover", source: "Thready" },
        { text: "architecture·component·infra validation harness 선행", source: "verification" },
        { text: "전환 전후 해결된 QA issue의 reopen 비율 26%p 하락", source: "Jira 전후 관측" },
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
      stack: "Azure · Terraform · Docker · GitHub Actions",
      via: "service·DB·worker 배포와 post-deploy verification",
      claimIds: ["infra.company-azure-ownership", "infra.terraform-state-safety"],
    },
  ],
});

export const AX_FDE_RESUME = makeBase({
  ...ROLE_CATALOG["ax-fde"],
  description: "고객 문제 정의·제품 실행·AI-assisted delivery를 전면에 둔 지원본",
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
        "mediness.product-operations",
      ],
    },
    {
      text: "Vision AI 개발과 PM·UX 경험을 바탕으로 모호한 요구를 domain model·API·transaction·작업 상태로 바꿉니다. 최근에는 Decision·SPEC·Work Package와 release gate를 제품 운영에 적용해 기획·개발·QA와 AI agent가 같은 기준으로 움직이게 하고 있습니다.",
      claimIds: [
        "career.ai-pm-backend-continuity",
        "career.product-ux-practice",
        "mediness.product-operations",
        "be-template.agent-context",
      ],
    },
  ],
  careers: makeCareers({
    currentClaimIds: [
      "thready.product-zero-to-one-contribution",
      "thready.frontend-product-delivery",
      "thready.subscription-revenue-band",
      "mediness.product-operations",
      "be-template.backend-standard",
      "be-template.agent-context",
      "centurion.day-product-integration",
      "nexus.hospital-operations-revenue-contribution",
      "nexus.backend-architecture",
      "infra.ai-assisted-change-harness",
    ],
    currentDetails: [
      "고객의 콘텐츠 제작 문제를 기능·실험·품질 기준으로 구체화하고 기획·QA·마케팅과 Thready 제품 운영을 리드했습니다. backend·AI·핵심 frontend도 직접 구현했으며 제품은 월 약 800만~1,000만원의 구독료 매출이 발생합니다(2026.08 기준).",
      "제품별 Decision·SPEC·Work Package와 BE·FE·QA owner lane, QA approval·release gate를 실행 원장으로 운영했습니다.",
      "layered architecture·DI·ADR·runbook 기반 FastAPI template과 agent-readable context를 구축해 소수 인원이 여러 제품을 지원하는 기반을 만들었습니다.",
      "DAY 예약 정책을 backend 판단·frontend 표시·QA·release로 연결하고, 별도 피부과 운영·예약 backend 구축을 주도해 제품의 예약률·고객사 매출 성과에 기여했습니다.",
      "회사 여러 서비스의 Azure 인프라를 한 사람이 관리할 수 있도록 AI-assisted inventory·Terraform 구현과 사람의 state·plan·live 검증 gate를 분리했습니다.",
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
      title: "제품 결정을 실행·검증·release 상태로 연결",
      description: [
        "구두 결정과 직군별 handoff로 흩어질 수 있는 작업을 하나의 실행 원장에서 추적하고, 완료와 검증이 끝난 작업만 release로 넘겼습니다.",
        { text: "Decision·SPEC·Work Package와 pipeline registry", source: "제품 운영" },
        { text: "BE·FE·QA owner lane·QA approval·release gate", source: "delivery" },
        { text: "실제 완료 시점의 version cut·release note 생성·변경 이력", source: "release" },
      ],
      claimIds: ["mediness.product-operations", "mediness.product-system-design-participation"],
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
      body: "제품 요구를 domain model·API·transaction·owner lane·QA approval·release gate로 나눠 담당자와 상태를 드러냅니다.",
      claimIds: ["mediness.product-operations", "centurion.day-product-integration"],
    },
    {
      no: "03",
      title: "AI에게 맡길 일과 사람이 확인할 일을 분리합니다",
      body: "inventory·구현·반복 작업은 AI로 가속하고, 제품 판단·검증 결과·release·apply 책임은 사람이 확인 가능한 gate에 둡니다.",
      claimIds: ["be-template.agent-context", "infra.ai-assisted-change-harness"],
    },
  ],
  skills: [
    {
      label: "Product Delivery / AX",
      stack: "Decision · SPEC · Work Package · QA/release gate · agent context",
      via: "제품 판단을 담당자·상태·검증 조건이 있는 실행 원장으로 전환",
      claimIds: ["mediness.product-operations", "be-template.agent-context"],
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
      stack: "Azure · Terraform · Docker · GitHub Actions",
      via: "제품별 배포·운영 경계와 사람이 승인하는 변경 gate",
      claimIds: ["infra.company-azure-ownership", "infra.ai-assisted-change-harness"],
    },
  ],
});

export const PLATFORM_RESUME = makeBase({
  ...ROLE_CATALOG["backend-platform"],
  description: "IaC 변경 안전성·관측·공통 backend 기반을 전면에 둔 지원본",
  position: "Backend Platform · Cloud Operations",
  summary: [
    {
      text: [
        {
          text: "회사 여러 제품의 backend와 Azure 운영을 함께 맡아, 한 번의 변경이 다른 환경과 서비스로 번지지 않게 만드는 Tech Lead이자 Backend Engineer",
          tone: "strong",
        },
        { text: "입니다. Terraform state·plan·live inventory를 교차 검증하고 application·DB migration과 worker retry까지 배포 전후의 실패 경계를 설계합니다." },
      ],
      claimIds: [
        "career.medisolve-role-evolution",
        "infra.company-azure-ownership",
        "infra.terraform-state-safety",
        "thready.ai-service-migration",
        "centurion.bay-async-backend",
      ],
    },
    {
      text: [
        { text: "AI는 resource inventory와 Terraform 구현에 쓰되 apply 판단은 사람이 확인할 수 있는 gate로 남깁니다. 현재 workload에 맞는 managed runtime을 사용하면서 " },
        { text: "6개 독립 state·400개 이상의 object", tone: "metric" },
        { text: ", 10대 VM log와 Production alert 8개를 소수 인원이 운영할 수 있는 구조로 관리해 왔습니다." },
      ],
      claimIds: [
        "infra.ai-assisted-change-harness",
        "infra.terraform-state-safety",
        "infra.azure-observability",
      ],
    },
  ],
  careers: makeCareers({
    currentClaimIds: [
      "infra.company-azure-ownership",
      "infra.ai-assisted-change-harness",
      "infra.terraform-state-safety",
      "infra.azure-observability",
      "be-template.backend-standard",
      "be-template.team-leverage",
      "be-template.agent-context",
      "thready.ai-service-boundary",
      "thready.ai-service-migration",
      "thready.ai-replica-outbox",
      "centurion.bay-async-backend",
    ],
    currentDetails: [
      "회사 전체 Azure/Terraform 인프라의 설계·구축·운영을 맡고 6개 독립 root·remote state와 400개 이상의 state object를 관리했습니다.",
      "state snapshot·Terraform plan·Azure live inventory를 교차 검증해 destroy·replace와 환경 간 변경 전파를 apply 전에 차단했습니다.",
      "Azure Monitor·Log Analytics와 AMA/DCR로 10대 VM container log를 중앙화하고 API·DB·host 영역의 Production alert 8개를 Terraform으로 운영했습니다.",
      "layered architecture·DI·ADR·convention·runbook 기반 조직 FastAPI template과 agent context를 구축했습니다.",
      "AI application·DB migration과 Outbox·version fence, 주문·재고 worker의 retry·terminal failure·수동 재처리 경계를 구현했습니다.",
    ],
    studioDetails: [
      "Vision AI Engineer에서 Product Manager로 역할을 넓혀 생성형 AI 커머스 제품의 prototype→v1.0 제품화와 기업 PoC를 진행했습니다.",
    ],
  }),
  outcomes: [
    {
      no: "01",
      title: "6개 Terraform state로 변경 범위를 격리하고 destructive apply 사전 차단",
      description: [
        "Shared·B2B·B2C의 환경별 state를 분리하고 운영 리소스와 선언 코드의 차이를 apply 여부를 결정하는 gate로 사용했습니다.",
        { text: "6개 독립 Terraform root·remote state", source: "회사 Azure" },
        { text: "400개 이상의 state object 운영", source: "IaC inventory" },
        { text: "state snapshot·plan·live inventory 교차 검증", source: "apply gate" },
        { text: "의도하지 않은 destroy·replace와 환경 간 전파를 apply 전에 차단", source: "change safety" },
      ],
      claimIds: ["infra.company-azure-ownership", "infra.terraform-state-safety"],
    },
    {
      no: "02",
      title: "10대 VM container log와 Production alert 8개 중앙 운영",
      description: [
        "여러 VM과 서비스에 흩어진 운영 신호를 Azure Monitor·Log Analytics로 모으고 API·DB·host 문제를 같은 방식으로 관찰하게 했습니다.",
        { text: "AMA/DCR 기반 10대 VM container log 중앙화", source: "observability" },
        { text: "CPU·memory·disk·API health/5xx·DB availability/storage/failed connection", source: "coverage" },
        { text: "Production alert 8개를 Terraform으로 구축·운영", source: "alerting" },
      ],
      claimIds: ["infra.azure-observability"],
    },
    {
      no: "03",
      title: "AI로 구현을 가속하고 사람이 apply를 통제하는 운영 harness",
      description: [
        "한 사람이 여러 제품의 인프라를 관리할 수 있도록 AI가 맡는 일과 실제 변경 승인 책임을 분리했습니다.",
        { text: "AI를 resource inventory와 Terraform 구현에 활용", source: "implementation" },
        { text: "state·plan·live inventory 확인 뒤 사람이 apply 판단", source: "control" },
        { text: "post-apply 확인과 runbook 유지", source: "operation" },
      ],
      claimIds: ["infra.ai-assisted-change-harness"],
    },
    {
      no: "04",
      title: "소수 인원이 여러 제품을 운영하는 FastAPI platform 표준",
      description: [
        "제품마다 다른 구조와 운영 규칙을 다시 학습하는 비용을 줄이기 위해 backend architecture와 실행 맥락을 공통 기반으로 만들었습니다.",
        { text: "layered architecture·DI·ADR·convention·runbook", source: "FastAPI template" },
        { text: "logging·monitoring 횡단 적용", source: "platform concern" },
        { text: "2~3명 backend engineer의 다제품 지원", source: "team context" },
        { text: "agent-readable context와 반복 작업 automation", source: "AI-assisted delivery" },
      ],
      claimIds: [
        "be-template.backend-standard",
        "be-template.team-leverage",
        "be-template.agent-context",
      ],
    },
    {
      no: "05",
      title: "서비스·DB 분리 뒤 원장 상태가 수렴하는 migration·Outbox 설계",
      description: [
        "application과 DB를 분리하는 변경에서 기존 데이터 이전뿐 아니라 이후의 지연·중복·역순 전달까지 함께 다뤘습니다.",
        { text: "STG 2,616·795·7,111건 migration", source: "data move" },
        { text: "MD5·FK orphan·API E2E verification", source: "gate" },
        { text: "owner mutation과 Outbox의 동일 transaction", source: "durability" },
        { text: "relay retry·delivery version fence", source: "convergence" },
      ],
      claimIds: [
        "thready.ai-service-boundary",
        "thready.ai-service-migration",
        "thready.ai-replica-outbox",
      ],
    },
  ],
  workStyles: [
    {
      no: "01",
      title: "blast radius를 state와 service 경계로 제한합니다",
      body: "변경이 다른 환경·제품·데이터 소유권으로 전파되지 않도록 remote state와 application·DB·worker 경계를 먼저 나눕니다.",
      claimIds: ["infra.terraform-state-safety", "thready.ai-service-boundary"],
    },
    {
      no: "02",
      title: "apply와 release 전에 live 상태를 대조합니다",
      body: "선언 코드만 믿지 않고 state·plan·cloud inventory와 migration rehearsal·API E2E를 함께 확인합니다.",
      claimIds: ["infra.terraform-state-safety", "thready.ai-service-migration"],
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
      label: "Cloud / IaC",
      stack: "Azure · Terraform · remote state · Docker · GitHub Actions",
      via: "environment boundary·state migration·drift/apply gate",
      claimIds: ["infra.company-azure-ownership", "infra.terraform-state-safety"],
    },
    {
      label: "Observability / Operations",
      stack: "Azure Monitor · Log Analytics · AMA/DCR · health/API/DB/host alert",
      via: "VM log 중앙화와 Production alert의 IaC 운영",
      claimIds: ["infra.azure-observability"],
    },
    {
      label: "Distributed State / Async",
      stack: "PostgreSQL · RabbitMQ · TaskIQ · Transactional Outbox",
      via: "migration·retry·version fence·terminal failure·manual reprocessing",
      claimIds: ["thready.ai-replica-outbox", "centurion.bay-async-backend"],
    },
    {
      label: "Backend Platform",
      stack: "Python · FastAPI · DI · ADR · runbook · CI",
      via: "다제품 공통 architecture·개발 규칙·agent-readable context",
      claimIds: ["be-template.backend-standard", "be-template.agent-context"],
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
