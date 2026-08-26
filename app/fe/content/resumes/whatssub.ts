import type { TailoredResume } from "./types";

export const WHATSSUB_RESUME = {
  slug: "whatssub",
  companyName: "Whatssub",
  position: "AI-Native Product Engineer · Backend 중심",
  status: "approved",
  visibility: "public",
  updatedAt: "2026-08-26",
  sectionOrder: ["profile", "outcomes", "career", "skills", "credentials"],
  header: {
    name: "김대정",
    role: "Tech Lead · Backend Engineer",
    photoSrc: "/profile/daejeong-profile-v2.png",
    careerLine: [
      { text: "MediSolve AI", tone: "strong" },
      { text: " · Tech Lead · Backend Engineer (2025.04 — 재직 중)" },
    ],
    contacts: [
      { label: "marin.backend@gmail.com", href: "mailto:marin.backend@gmail.com" },
      {
        label: "github.com/Dae-Jeong",
        href: "https://github.com/Dae-Jeong",
        external: true,
      },
      { label: "marinkim.xyz", href: "https://marinkim.xyz", external: true },
    ],
    submissionMeta: process.env.WHATSSUB_CURRENT_SALARY
      ? `제출본 전용 · 현재 연봉 ${process.env.WHATSSUB_CURRENT_SALARY}`
      : undefined,
  },
  summary: [
    {
      text: "고객의 문제를 찾아, 돈을 내고 쓰는 제품까지 만듭니다.",
      claimIds: [
        "thready.product-zero-to-one-contribution",
        "thready.subscription-revenue-band",
        "career.medisolve-role-evolution",
      ],
    },
    {
      text: "마케팅 자동화·실시간 상담·CRM을 Python·FastAPI 기반으로 개발했고, 필요한 AI 기능과 사용자 화면도 직접 구현했습니다. 기획부터 release까지의 판단과 검증 근거를 한 맥락에 쌓아 Claude Code·Codex를 개인 도구가 아닌 팀의 개발·검증 체계로 확장했습니다.",
      claimIds: [
        "thready.frontend-product-delivery",
        "be-template.agent-context",
        "mediness.product-development-coordination-leverage",
      ],
    },
  ],
  careers: [
    {
      org: "MediSolve AI",
      period: "2025.04 —",
      now: true,
      role: [
        { text: "Tech Lead", tone: "strong" },
        { text: " · Backend Engineer · 제품 운영 리드" },
      ],
      details: [
        [
          { text: "고객 문제에서 유료 제품까지", tone: "strong" },
          { text: " — Thready의 제품 운영을 리드하고 backend·AI·핵심 frontend를 직접 구현해, 팀과 실제 고객이 결제하는 제품으로 만들고 운영" },
        ],
        [
          { text: "실시간 AI 상담 backend 설계·통합", tone: "strong" },
          { text: " — 상담 API·WebSocket runtime·사후 LLM 분석 application의 책임을 나누고, 다른 개발자와 함께 session lifecycle과 비동기 event 처리 구조의 핵심 설계·통합을 수행" },
        ],
        [
          { text: "CRM·주문·재고 backend", tone: "strong" },
          { text: " — Centurion 초기 구축부터 참여해 예약 정책을 backend·frontend·QA·release 흐름으로 연결하고, 주문·재고는 RabbitMQ·TaskIQ worker의 상태·retry·최종 실패·수동 재처리 경로로 구성" },
        ],
        [
          { text: "제품 개발 체계", tone: "strong" },
          { text: " — 기획·디자인·개발·QA의 결정과 진행 상태를 Decision·SPEC·Work Package에 쌓고 담당·검증·release gate까지 연결해 제품별 운영을 리드" },
        ],
        [
          { text: "조직 공통 backend·AI 개발 기준", tone: "strong" },
          { text: " — FastAPI template과 agent context를 직접 구축해 사람과 AI가 같은 architecture·작업·검증 기준을 읽게 하고, 이를 회사 업무 AX 구조로 확장하는 설계에 참여" },
        ],
      ],
      claimIds: [
        "career.medisolve-role-evolution",
        "thready.product-zero-to-one-contribution",
        "thready.subscription-revenue-band",
        "thready.frontend-product-delivery",
        "centurion.say-realtime-ai",
        "centurion.bay-async-backend",
        "centurion.async-migration",
        "centurion.day-product-integration",
        "mediness.product-operations",
        "mediness.product-development-coordination-leverage",
        "mediness.company-work-ax-design",
        "be-template.backend-standard",
        "be-template.agent-context",
      ],
    },
    {
      org: "더데이랩스",
      period: "2025.02 — 2025.04",
      role: [
        { text: "Backend Engineer", tone: "strong" },
        { text: " · 프리랜서" },
      ],
      details: [
        [
          { text: "초기 backend와 개발 기준", tone: "strong" },
          { text: " — MediSolve AI 법인 설립 전 Centurion 초기 backend와 개발 기준을 선행 구축하고, 설립과 함께 초기 멤버로 정규 합류해 Tech Lead 역할 수행" },
        ],
      ],
      claimIds: [
        "career.thedaylabs-freelance",
        "career.memento-to-medisolve-early-member",
      ],
    },
    {
      org: "Memento AI",
      period: "2024.10 — 2025.01",
      role: [
        { text: "Backend Engineer", tone: "strong" },
        { text: " · 인턴 1개월 후 정규직 전환 · 회사 폐업으로 종료" },
      ],
      details: [
        [
          { text: "Stripe 선결제", tone: "strong" },
          { text: " — Stripe Checkout의 manual capture 방식으로 선결제를 직접 구축하고, local transaction ID를 provider metadata에 담아 결제 이력과 Checkout·Webhook event를 연결" },
        ],
        [
          { text: "부분 실패 보상", tone: "strong" },
          { text: " — 예약 처리 실패 시 PaymentIntent 상태에 따라 cancel/refund하고, 환불 요청과 완료를 분리해 완료 event 뒤 마일리지 복원·이용권 삭제가 실행되도록 순서를 정리" },
        ],
        [
          { text: "알림 발송 lifecycle", tone: "strong" },
          { text: " — 다국어 알림톡·email의 즉시/예약 발송과 Celery task 취소·재등록·발송 이력 구현" },
        ],
      ],
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
        { text: " · AI Engineer → PM(주 역할) → Backend Engineer" },
      ],
      details: [
        [
          { text: "프로토타입에서 첫 정식 버전까지", tone: "strong" },
          { text: " — SellerCanvas 프로토타입에서 v1.0까지 제품 흐름·기능 범위·출시 우선순위를 정하고 첫 정식 버전 출시를 PM으로 리드" },
        ],
        [
          { text: "외부 요구를 제품 사양으로 전환", tone: "strong" },
          { text: " — 외부 패션 브랜드의 요구를 제품 흐름·기능 범위·검증 기준으로 구체화해 기업 PoC로 연결" },
        ],
      ],
      claimIds: [
        "career.ai-pm-backend-continuity",
        "career.sellercanvas-product-system",
        "career.sellercanvas-enterprise-poc",
      ],
    },
    {
      org: "아이즈솔",
      period: "2020.08 — 2021.06",
      role: [
        { text: "Vision AI Engineer", tone: "strong" },
        { text: " · 인턴" },
      ],
      details: [
        [
          { text: "Vision AI 제품 개발", tone: "strong" },
          { text: " — AI 모델과 데이터 처리 흐름을 제품 기능으로 연결하는 개발·검증에 참여" },
        ],
      ],
      claimIds: ["career.ai-pm-backend-continuity"],
    },
  ],
  outcomes: [
    {
      no: "01",
      title: "글 생성 AI를 실제 고객이 결제하는 제품으로 만들었습니다",
      description: [
        "고객이 Threads 콘텐츠를 만들고 성과를 판단하는 과정의 불편을 기능·실험·품질 기준으로 구체화하고, 기획·QA·마케팅과 제품 운영을 리드했습니다. FastAPI backend·AI 생성 및 평가 system·Next.js 핵심 사용자 흐름을 직접 구현해 초기 제품을 실제 고객이 구독료를 내는 Thready로 발전시켰습니다.",
        {
          text: "콘텐츠 생성·가져오기·예약·발행·dashboard·관리 화면 직접 구현",
          source: "Thready · 제품 구현",
        },
        {
          text: "typed prompt builder·LLM judge·반복 평가·관측 로그를 묶어 생성 결과를 같은 기준으로 비교",
          source: "Thready · 생성 품질",
        },
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
      title: "AI 작업이 중복되거나 늦어져도 최신 결과만 반영했습니다",
      description: [
        "제품 정책과 원장은 product backend가, 생성 lifecycle과 실행 상태는 독립 AI application·DB가 소유하도록 경계를 나눴습니다. 서로 다른 application 사이에서 발생할 수 있는 전달 실패와 worker 중단을 전제로, 복구 가능한 전달 규칙을 구현했습니다.",
        {
          text: "제품 상태 변경과 Outbox 기록만 같은 transaction으로 묶고, AI 실행은 transaction 밖의 worker로 분리",
          source: "Thready · transaction boundary",
        },
        {
          text: "lease·attempt token으로 작업 실행권을 구분하고 중단된 worker 작업을 재점유",
          source: "Thready · worker recovery",
        },
        {
          text: "delivery version fence·멱등 consumer·terminal failure 보존으로 늦거나 중복된 event가 최신 상태를 덮지 않게 처리",
          source: "Thready · durable delivery",
        },
      ],
      claimIds: ["thready.ai-service-boundary", "thready.ai-replica-outbox"],
    },
    {
      no: "03",
      title: "Stripe 선결제부터 취소·환불까지 상태 흐름을 만들었습니다",
      description: [
        "예약이 만들어지기 전에 시작되는 외부 결제를 local transaction과 연결하고, 예약 처리 실패와 비동기 환불 완료를 서로 다른 상태로 다뤘습니다. Stripe Checkout manual capture 선결제 영역은 구축을 주도했고, 공유 결제 domain의 환불·마일리지·이용권 정합성은 담당 범위에서 보완했습니다.",
        {
          text: "local transaction ID를 provider metadata에 연결해 PaymentHistory·PaymentMethod와 Checkout·Webhook event를 매핑",
          source: "Memento AI · 결제",
        },
        {
          text: "예약 실패 시 PaymentIntent 상태별 cancel/refund 보상, 환불 완료 후 마일리지 복원·이용권 삭제",
          source: "Memento AI · 결제",
        },
      ],
      claimIds: [
        "career.memento-stripe-prepayment",
        "career.memento-payment",
      ],
    },
    {
      no: "04",
      title: "중간 전사와 확정 문맥이 충돌하지 않도록 상담 backend를 설계했습니다",
      description: [
        "실시간 AI 상담 서비스에서 상담 orchestration·WebSocket session runtime·상담 종료 후 LLM 분석을 독립 application으로 분리했습니다. 다른 개발자와 함께 HTTP·WebSocket에 걸친 연결 구조의 핵심 설계와 통합을 맡았습니다.",
        {
          text: "DELTA → COMPLETE → optional CORRECTED를 같은 sequence로 연결해 늦은 보정이 다른 turn을 덮지 않도록 구성",
          source: "실시간 AI 상담 · STT",
        },
        {
          text: "DELTA는 domain keyword 기반 조기 판단에, COMPLETE는 확정 context·저장·LLM 판단에 사용",
          source: "실시간 AI 상담 · event flow",
        },
        {
          text: "debounce·task cancel/retry·turn-state guard로 이전 작업을 정리하고, stop guard·timeout·GC·shutdown에서 session 종료 경계를 보강",
          source: "실시간 AI 상담 · lifecycle",
        },
      ],
      claimIds: ["centurion.say-realtime-ai"],
    },
  ],
  workStyles: [],
  skills: [
    {
      label: "Product Backend",
      stack: "Python · FastAPI · PostgreSQL · MySQL · Redis",
      via: "API·domain model·transaction·migration·release·운영",
      claimIds: ["thready.backend-rebuild", "centurion.bay-async-backend"],
    },
    {
      label: "Payment / Async",
      stack: "Stripe Checkout · Webhook · RabbitMQ · TaskIQ · Transactional Outbox",
      via: "선결제·보상·상태 전이·retry·terminal failure·멱등 전달",
      claimIds: [
        "career.memento-stripe-prepayment",
        "career.memento-payment",
        "centurion.async-migration",
        "thready.ai-replica-outbox",
      ],
    },
    {
      label: "AI Service",
      stack: "LLM integration/evaluation · typed prompt · structured output · WebSocket · STT",
      via: "생성 품질 system·실시간 session·외부 provider와 application 책임 분리",
      claimIds: [
        "thready.generation-quality-system",
        "thready.quality-criteria-system",
        "thready.ai-service-boundary",
      ],
    },
    {
      label: "Product Surface",
      stack: "Next.js · TypeScript",
      via: "생성·가져오기·예약·발행·dashboard·admin 핵심 workflow",
      claimIds: ["thready.frontend-product-delivery"],
    },
    {
      label: "Product Development / AX",
      stack: "Decision · SPEC · Work Package · ADR · runbook · agent context",
      via: "사람과 AI agent가 같은 SPEC·검증 기준으로 일하는 개발·release 체계",
      claimIds: [
        "mediness.product-operations",
        "mediness.product-development-coordination-leverage",
        "be-template.backend-standard",
        "be-template.agent-context",
      ],
    },
    {
      label: "Cloud / Delivery",
      stack: "Docker · GitHub Actions · Azure · Terraform · AWS",
      via: "서비스 배포·환경 설정·기본 운영 경험",
      claimIds: ["career.tellingme-backend-infra"],
    },
  ],
  credentials: [
    {
      period: "2016.03\n- 2021.08",
      text: "우송대학교 게임멀티미디어 전공 · 졸업",
      claimIds: ["credentials.education"],
    },
    {
      period: "2024.01",
      text: "CES 2024 Best of Innovation · AI 부문 대상 제품 참여",
      claimIds: ["credentials.ces-2024"],
    },
    {
      period: "2025.12",
      text: "특허 등록 「페이지 출력 방법」 · 등록 10-2898273",
      claimIds: ["credentials.page-output-patent"],
    },
    {
      period: "2021.09",
      text: "ADsP · 데이터분석 준전문가",
      claimIds: ["credentials.adsp"],
    },
  ],
} satisfies TailoredResume;
