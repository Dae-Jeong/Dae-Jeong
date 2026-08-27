import type { TailoredResume } from "./types";

export const PINOKIOLAB_RESUME = {
  slug: "pinokiolab",
  companyName: "피노키오랩",
  position: "Backend Engineer (FastAPI)",
  status: "draft",
  visibility: "local",
  updatedAt: "2026-08-27",
  sectionOrder: ["profile", "outcomes", "career", "skills", "credentials"],
  header: {
    name: "김대정",
    role: "Backend Engineer 3년차 · Python / FastAPI / SQLAlchemy",
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
      text: "아이디어를 새로운 가치로 실현하는 메이커, 김대정입니다.",
      claimIds: ["career.ai-pm-backend-continuity"],
    },
    {
      text: "FastAPI·SQLAlchemy로 제품 backend와 조직의 개발 기준을 설계하고 운영해 왔습니다. AI 분석·결제·권한처럼 서로 다른 시스템의 상태가 얽힌 업무를 명시적인 transaction·delivery·history 경계로 바꿉니다.",
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
      title: "FastAPI·SQLAlchemy를 팀의 반복 가능한 backend 기준으로 만들었습니다",
      description: [
        "FastAPI·SQLAlchemy 2.0 async를 baseline으로 Router → Service → Validator → Repository → Model 계층과 DI를 갖춘 조직 표준 template을 직접 설계·구축했습니다.",
        {
          text: "Repository는 SQL·flush, Service transaction decorator는 commit·rollback을 소유하도록 경계 고정",
          source: "Backend Template · transaction boundary",
        },
        {
          text: "AsyncSession propagation·isolation·read-only·rollback safety를 integration test로 검증",
          source: "Backend Template · session lifecycle",
        },
        {
          text: "ADR·runbook·agent context를 함께 제공해 사람과 coding agent가 같은 구조·검증 기준을 사용",
          source: "Backend Template · engineering context",
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
      title: "AI 결과가 늦거나 중복돼도 최신 업무 상태를 지키는 전달 경계를 만들었습니다",
      description: [
        "제품 원장은 product backend가, 생성 lifecycle과 실행 상태는 독립 FastAPI AI application·DB가 소유하도록 나눴습니다. application 사이의 부분 실패를 예외가 아닌 정상적인 failure mode로 다뤘습니다.",
        {
          text: "원장 변경과 Outbox row를 같은 transaction에 기록하고 AI 실행은 worker로 분리",
          source: "Thready · delivery boundary",
        },
        {
          text: "lease·attempt token·version fence·멱등 consumer로 중단·중복·지연·역순 전달 통제",
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
      title: "Stripe 선결제부터 취소·환불까지 추적 가능한 상태 흐름을 만들었습니다",
      description: [
        "외부 결제와 내부 예약을 하나의 transaction으로 가정하지 않고, local transaction ID로 내부 이력과 provider event를 연결했습니다.",
        {
          text: "Stripe Checkout manual capture 선결제와 Checkout·Webhook event 연결",
          source: "Memento AI · payment",
        },
        {
          text: "예약 실패 시 PaymentIntent 상태별 cancel/refund, 환불 완료 뒤 마일리지·이용권 상태 변경",
          source: "Memento AI · compensation",
        },
      ],
      claimIds: [
        "career.memento-stripe-prepayment",
        "career.memento-payment",
      ],
    },
    {
      no: "04",
      title: "데이터 접근 범위를 client 입력이 아니라 server 인증 상태가 결정하게 했습니다",
      description: [
        "multi-service SSO session 정책과 duplicate login E2E를 담당하고, 병원 운영 backend에서는 사용자의 소속 지점과 현재 작업 지점을 분리했습니다.",
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
    {
      no: "05",
      title: "코드가 아니라 검증된 근거가 다음 개발 사이클을 결정하게 했습니다",
      description: [
        "제품 개발의 결정·구현·검증을 Decision·SPEC·Work Package·ADR·release evidence로 연결하고, 개인 open-source Paperthin에서는 실제 surface 검증을 통과한 lesson·anti-pattern·quality gate만 다음 v0에 남기는 agent cycle을 설계했습니다.",
        {
          text: "기존 codebase의 크기나 구현량을 진척도의 대리값으로 사용하지 않음",
          source: "Paperthin · evidence-first cycle",
        },
        {
          text: "keep·restart·release는 사람이 결정하고 coding agent는 탐색·반복 구현·근거 정리를 수행",
          source: "Human gate · agent execution",
        },
      ],
      claimIds: [
        "mediness.product-operations",
        "be-template.agent-context",
        "paperthin.evidence-first-agent-cycle",
      ],
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
      ],
      claimIds: [
        "career.medisolve-role-evolution",
        "thready.product-zero-to-one-contribution",
        "be-template.fastapi-sqlalchemy-standard",
        "thready.ai-service-boundary",
        "centurion.bay-async-backend",
        "centurion.say-realtime-ai",
        "mediness.company-work-ax-design",
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
          { text: " — FastAPI·SQLAlchemy·MySQL 기반 예약 API와 Stripe Checkout·Webhook·취소·환불 상태 흐름 구현" },
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
      via: "Transaction·API·migration·release 검증과 evidence-first iteration",
      claimIds: ["be-template.agent-context", "paperthin.evidence-first-agent-cycle"],
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
