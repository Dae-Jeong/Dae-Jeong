import type { TailoredResume } from "./types";

export const PINOKIOLAB_RESUME = {
  slug: "pinokiolab",
  companyName: "피노키오랩",
  position: "Backend Engineer (FastAPI)",
  status: "approved",
  visibility: "public",
  updatedAt: "2026-08-28",
  sectionOrder: ["profile", "outcomes", "career", "skills", "credentials"],
  header: {
    name: "김대정",
    role: "제품 개발 실무 4년 · Backend Engineer 3년차 · Python / FastAPI",
    photoSrc: "/profile/daejeong-profile-v2.png",
    careerLine: [
      { text: "MediSolve AI", tone: "strong" },
      { text: " · Backend Engineer · Tech Lead 역할 병행 (2025.04 — 재직 중)" },
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
  },
  summary: [
    {
      text: "AI 결과를 실제 업무로 연결하는 백엔드를 설계합니다.",
      claimIds: ["career.ai-pm-backend-continuity", "thready.ai-service-boundary"],
    },
    {
      text: "Vision AI 모델과 데이터 pipeline을 제품 기능으로 연결하는 일에서 시작해, 현재는 FastAPI·SQLAlchemy로 AI 서비스와 업무 backend의 책임을 나누고 있습니다. 결제·권한·알림처럼 외부 상태가 얽힌 흐름은 transaction 책임, 변경 이력, 재처리 기준을 명확히 해 추적할 수 있게 만듭니다.",
      claimIds: [
        "be-template.fastapi-sqlalchemy-standard",
        "thready.ai-service-boundary",
        "career.memento-payment",
      ],
    },
  ],
  outcomes: [
    {
      no: "01",
      title: "FastAPI async 환경에서 transaction과 AsyncSession의 소유권을 명확히 했습니다",
      description: [
        "여러 직군이 coding agent로 backend 구현에 참여하는 환경에서, Service method를 transaction boundary로 삼고 하나의 transaction은 하나의 asyncio task와 AsyncSession이 소유하도록 조직 표준 FastAPI template을 직접 설계·구축했습니다.",
        {
          text: "Layered Architecture에 Service Layer·Repository Pattern·DI를 적용해 명시적인 구현 경로를 제공",
          source: "Backend Template · architecture defaults",
        },
        {
          text: "@transactional이 REQUIRED 참여·REQUIRES_NEW 독립 실행·NESTED SAVEPOINT와 commit·rollback·cleanup을 관리",
          source: "Backend Template · propagation",
        },
        {
          text: "ContextVar·SessionProxy로 transaction boundary의 AsyncSession을 bind해 반복적인 session 인자를 제거",
          source: "Backend Template · resource binding",
        },
        {
          text: "owner-task guard로 child task의 동일 session 접근을 fail-fast하고, CancelledError rollback·connection cleanup을 integration test로 검증",
          source: "Backend Template · transaction safety",
        },
        {
          text: "병렬 DB 작업은 task별 transaction·데이터 가시성·실패 복구·connection 비용을 먼저 정하도록 ADR·runbook에 규칙화",
          source: "Backend Template · concurrency trade-off",
        },
      ],
      claimIds: [
        "be-template.fastapi-sqlalchemy-standard",
        "be-template.backend-standard",
        "be-template.team-leverage",
        "be-template.agent-context",
      ],
    },
    {
      no: "02",
      title: "원장 변경이 늦거나 중복 전달돼도 AI application이 최신 상태로 수렴하게 했습니다",
      description: [
        "제품 정책·원장은 product backend가, AI application은 생성 lifecycle·실행 상태와 필요한 local replica를 소유하도록 나눴습니다. 서비스 간 전달 실패를 예외가 아닌 운영 조건으로 다뤘습니다.",
        {
          text: "원장 변경과 Outbox row를 같은 transaction에 기록하고 AI 실행은 worker로 분리",
          source: "Thready · delivery boundary",
        },
        {
          text: "relay lease·attempt_count·version fence·멱등 consumer로 중단·중복·지연·역순 원장 event 통제",
          source: "Thready · worker recovery",
        },
        {
          text: "STG migration을 row count·MD5 fingerprint·FK orphan·생성 API E2E로 검증",
          source: "Thready · migration rehearsal",
        },
      ],
      claimIds: [
        "thready.ai-service-boundary",
        "thready.ai-service-migration",
        "thready.ai-replica-outbox",
      ],
    },
    {
      no: "03",
      title: "AI 생성 품질을 자동 점수로 확정하지 않고, 검증 근거와 사람 판단을 분리했습니다",
      description: [
        "고객에게 제공할 AI 글의 품질 기준을 정의하기 위한 독립 실험 하네스에서 자동 게이트·실측 분포·사람 판정의 책임을 나눴습니다.",
        {
          text: "결정적 게이트 12종으로 형식 오류를 자동 차단",
          source: "Thready · quality gate",
        },
        {
          text: "자사 출력이 기준값으로 되먹임되던 문제를 재실측으로 발견하고 판정 기준을 교정",
          source: "Thready · measurement correction",
        },
        {
          text: "최종 품질 판단은 사람이 소유하고, 6개 축으로 개선 순서를 관리",
          source: "Thready · human judgment",
        },
      ],
      claimIds: ["thready.quality-criteria-system", "thready.measurement-correction"],
    },
    {
      no: "04",
      title: "결제·알림처럼 외부 완료 시점이 다른 작업을 상태와 이력으로 추적했습니다",
      description: [
        "외부 provider와 내부 DB를 하나의 transaction으로 가정하지 않고, 요청·완료·보상 상태를 나눠 추적했습니다.",
        {
          text: "Stripe Checkout manual capture 선결제와 local transaction ID 기반 event 연결",
          source: "Memento AI · payment",
        },
        {
          text: "예약 실패 시 PaymentIntent 상태별 cancel/refund와 환불 완료 뒤 내부 자산 변경",
          source: "Memento AI · compensation",
        },
        {
          text: "다국어 알림톡·이메일 즉시/예약 발송과 Celery task 취소·재등록·발송 이력",
          source: "Memento AI · notification lifecycle",
        },
      ],
      claimIds: [
        "career.memento-stripe-prepayment",
        "career.memento-payment",
        "career.memento-happycall-survey",
      ],
    },
    {
      no: "05",
      title: "서버 인증 상태가 데이터 접근 범위를 결정하도록 권한 경계를 재구성하고 있습니다",
      description: [
        "multi-service SSO session 정책과 duplicate login E2E를 담당하고, 병원 운영 backend에서는 사용자의 소속 지점과 현재 작업 지점을 분리하고 있습니다.",
        {
          text: "작업 지점은 권한 검증 API를 통해서만 전환하고 server auth state에서 query scope 결정",
          source: "NEXUS · authorization boundary",
        },
        {
          text: "작업 범위 미선택과 권한 밖 접근을 409·403으로 구분",
          source: "NEXUS · error contract",
        },
      ],
      claimIds: ["centurion.sso-session", "nexus.branch-access-boundary"],
    },
  ],
  careers: [
    {
      org: "MediSolve AI",
      period: "2025.04 —",
      now: true,
      role: [
        { text: "Backend Engineer", tone: "strong" },
        { text: " · Tech Lead·제품 운영 역할 병행" },
      ],
      details: [
        [
          { text: "제품 backend와 AI application", tone: "strong" },
          { text: " — FastAPI backend·AI application·Next.js 핵심 workflow를 직접 구축하고, 기획·QA·마케팅과 실제 고객이 결제하는 AI 콘텐츠 제품 운영을 리드" },
        ],
        [
          { text: "FastAPI·SQLAlchemy 조직 표준", tone: "strong" },
          { text: " — 계층·DI·transaction·session·error·test 기준을 template·ADR·runbook·agent context로 구현" },
        ],
        [
          { text: "비동기·실시간 backend", tone: "strong" },
          { text: " — 주문·재고 worker, AI 작업 delivery, WebSocket 상담 session·STT event의 상태·retry·복구 경계를 설계·구현" },
        ],
        [
          { text: "제품 개발 체계", tone: "strong" },
          { text: " — 제품별 Decision·SPEC·Work Package·QA·release gate 적용·운영을 리드하고 회사 업무 AX 구조 설계에 참여" },
        ],
        [
          { text: "Agent 활용 주간 회고", tone: "strong" },
          { text: " — 1인 1제품 개발 환경에서 주 1회, 코드 단위 리뷰보다 무엇을 만들어야 하는지 정확히 정의하고 더 효율적으로 구현할 방향·방법을 팀과 검토" },
        ],
      ],
      claimIds: [
        "career.medisolve-role-evolution",
        "thready.product-zero-to-one-contribution",
        "be-template.fastapi-sqlalchemy-standard",
        "thready.ai-service-boundary",
        "centurion.bay-async-backend",
        "centurion.say-realtime-ai",
        "mediness.company-work-ax-design",
        "career.weekly-role-based-agent-retrospective",
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
          { text: "초기 backend 구축", tone: "strong" },
          { text: " — 법인 설립 전 피부과 CRM을 제품 시작 시점부터 구축하고 backend·개발 기준을 선행 정리" },
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
        { text: " · 인턴 합류 후 정규직 전환 · 회사 폐업으로 종료" },
      ],
      details: [
        [
          { text: "예약·결제 backend", tone: "strong" },
          { text: " — FastAPI·SQLAlchemy·MySQL 기반 예약 API와 Stripe Checkout 선결제 구현, 취소·환불 상태 흐름 보완" },
        ],
        [
          { text: "알림 lifecycle", tone: "strong" },
          { text: " — 다국어 알림톡·email 즉시/예약 발송과 Celery task 취소·재등록·발송 이력 구현" },
        ],
      ],
      claimIds: [
        "career.memento-fastapi-backend",
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
        { text: " · Vision AI Engineer → PM → Backend Engineer" },
      ],
      details: [
        [
          { text: "생성형 AI 제품화", tone: "strong" },
          { text: " — 커머스 콘텐츠 제품의 prototype부터 v1.0까지 흐름·범위·출시 우선순위를 정하고 외부 기업 PoC로 확장" },
        ],
      ],
      claimIds: [
        "career.sellercanvas-product-system",
        "career.sellercanvas-enterprise-poc",
        "career.ai-pm-backend-continuity",
      ],
    },
    {
      org: "아이즈솔",
      period: "2020.08 — 2021.06",
      role: [
        { text: "Vision AI Engineer", tone: "strong" },
        { text: " · 인턴" },
      ],
      details: ["Vision AI 모델과 데이터 pipeline을 제품 기능으로 연결하는 개발·검증에 참여"],
      claimIds: ["career.ai-pm-backend-continuity"],
    },
  ],
  workStyles: [],
  skills: [
    {
      label: "FastAPI / ORM",
      stack: "Python · FastAPI · SQLAlchemy 2.0 async · Pydantic · Alembic",
      via: "Layered API·DI·Repository·transaction·session lifecycle·migration",
      claimIds: ["be-template.fastapi-sqlalchemy-standard"],
    },
    {
      label: "Data / Async",
      stack: "PostgreSQL · MySQL · Redis · RabbitMQ · TaskIQ · Celery",
      via: "Outbox·retry·lease·version fence·terminal failure·scheduled task",
      claimIds: ["thready.ai-replica-outbox", "centurion.bay-async-backend"],
    },
    {
      label: "AI Application",
      stack: "FastAPI AI application · LLM/STT integration · structured output",
      via: "실행 lifecycle·제품 원장 경계·authenticated HTTP·실시간 session",
      claimIds: ["thready.ai-service-boundary", "centurion.say-realtime-ai"],
    },
    {
      label: "Auth / External API",
      stack: "SSO session · Stripe Checkout/Webhook · Notification",
      via: "Role scope·duplicate login·cancel/refund·예약 발송·이력",
      claimIds: ["centurion.sso-session", "career.memento-payment"],
    },
    {
      label: "Quality / Agent",
      stack: "pytest · Ruff · Pyright · Docker CI · ADR · runbook · Claude Code · Codex",
      via: "Transaction·API·migration 검증과 작업 목표·구현 방향·효율을 점검하는 주간 Agent 활용 회고",
      claimIds: [
        "be-template.agent-context",
        "career.coding-agent-usage",
        "career.weekly-role-based-agent-retrospective",
      ],
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
      period: "2022.11",
      text: "KCL AI 정확도 부문 인증 통과 제품 참여",
      claimIds: ["credentials.ai-accuracy-certification"],
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
