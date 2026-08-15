import type { TailoredResume } from "./types";

export const MGRV_RESUME = {
  slug: "mgrv",
  companyName: "MGRV",
  position: "Backend Engineer",
  status: "draft",
  visibility: "public",
  updatedAt: "2026-08-15",
  header: {
    name: "김대정",
    role: "Backend Engineer · Python / FastAPI / SQLAlchemy",
    careerLine: [
      { text: "MediSolve AI", tone: "strong" },
      { text: " · Backend Engineer · 기업부설연구소장 (2025.04 — 재직 중) / 이전 " },
      { text: "STUDIO LAB", tone: "strong" },
      { text: " · PM (2021.12 — 2024.01)" },
    ],
    tagline: [
      {
        text: "운영 업무를 제품으로 바꾸고, 데이터 정합성과 서비스 안정성을 책임지는 백엔드 엔지니어",
        tone: "strong",
      },
    ],
    contacts: [
      { label: "marin.backend@gmail.com", href: "mailto:marin.backend@gmail.com" },
      {
        label: "github.com/Dae-Jeong",
        href: "https://github.com/Dae-Jeong",
        external: true,
      },
      { label: "marinkim.xyz", href: "https://marinkim.xyz", external: true },
      { label: "경기 안양시" },
    ],
  },
  summary: [
    {
      claimIds: ["career.tenure", "career.ai-pm-backend-continuity"],
      text: [
        { text: "AI 엔지니어와 PM을 거쳐 제품을 끝까지 운영하기 위해 backend를 주 역할로 선택한 " },
        { text: "실무 4년차", tone: "metric" },
        { text: "입니다." },
      ],
    },
    {
      claimIds: [
        "thready.backend-rebuild",
        "centurion.bay-async-backend",
        "career.memento-payment",
      ],
      text: [
        { text: "Python·FastAPI·SQLAlchemy 기반 제품 backend", tone: "strong" },
        {
          text: "를 구축·재구축했고, 운영 요구를 admin·API·데이터 규칙으로 구체화해왔습니다. 실패 가능한 후속 작업은 worker·retry·rollback 경계로 분리하며 테스트·배포·운영 지표까지 함께 책임집니다.",
        },
      ],
    },
  ],
  careers: [
    {
      org: "MediSolve AI",
      period: "2025.04 —",
      now: true,
      claimIds: [
        "career.medisolve-role-evolution",
        "thready.backend-rebuild",
        "thready.qa-reopen-reduction",
        "thready.production-operation-quality",
        "centurion.bay-async-backend",
        "nexus.backend-architecture",
        "nexus.admin-backend-ownership",
      ],
      role: [
        { text: "Backend Engineer · 기업부설연구소장", tone: "strong" },
        { text: " — Tech Lead·PO 역할 병행" },
      ],
      details: [
        "THREADY FastAPI·SQLAlchemy·PostgreSQL backend 전면 재구축과 cutover 이후 개발·운영 전담",
        [
          { text: "QA 재오픈율 37% → 11%", tone: "metric" },
          { text: ", 월 수만 건 요청의 " },
          { text: "HTTP 5xx 약 0.3%", tone: "metric" },
          { text: " 수준 유지" },
        ],
        "BAY 주문·상품·재고 API와 RabbitMQ·TaskIQ worker·retry 구축 주도, 알림 처리를 독립 domain으로 분리",
        "NEXUS 운영자용 admin·homepage backend와 gateway·service boundary 설계·구축",
        "제품 요구사항 구체화, release gate, QA·운영 기준을 backend 개발과 함께 관리",
      ],
    },
    {
      org: "더데이랩스",
      period: "2025.02 — 2025.04",
      claimIds: ["career.thedaylabs-freelance"],
      role: [
        { text: "Backend Engineer", tone: "strong" },
        { text: " — 프리랜서" },
      ],
      details: [
        "제품 backend를 초기부터 구축하고 FastAPI 구조·개발 규약·문서·test 기반을 저장소 생성 시점부터 마련",
        "이후 MediSolve AI 창업 멤버로 합류해 같은 제품군의 개발과 운영 지속",
      ],
    },
    {
      org: "Memento AI",
      period: "2024.10 — 2025.01",
      claimIds: ["career.memento-payment"],
      role: [
        { text: "Backend Engineer", tone: "strong" },
        { text: " — 인턴 1개월 후 정규직 전환" },
      ],
      details: [
        "FastAPI·SQLAlchemy·MySQL 기반 예약·결제 API 개발 참여",
        "Stripe 선결제와 결제 실패 시 환불·마일리지·티켓 rollback 흐름 안정화 기여",
      ],
    },
    {
      org: "STUDIO LAB",
      period: "2021.12 — 2024.01",
      claimIds: [
        "career.sellercanvas-product-system",
        "credentials.ces-2024",
        "credentials.page-output-patent",
      ],
      role: [
        { text: "Product Manager", tone: "strong" },
        { text: " — AI Engineer → PM(메인 역할) → Backend Engineer" },
      ],
      details: [
        "생성형 AI 제품 SellerCanvas를 아이디어 단계부터 v1.0 출시까지 PM으로 이끌고 backend 개발까지 역할 확장",
        "기획·디자인·개발 요구사항의 배경과 우선순위를 정리하고 실제 제품 출시까지 조율",
        "CES 2024 Best of Innovation AI 부문 대상 제품 참여",
      ],
    },
    {
      org: "아이즈솔",
      period: "2020.08 — 2021.06",
      claimIds: ["career.ai-pm-backend-continuity"],
      role: [
        { text: "Vision AI Engineer", tone: "strong" },
        { text: " — 인턴" },
      ],
      details: ["Vision AI 모델과 데이터 pipeline을 제품 기능으로 연결하는 개발·검증"],
    },
  ],
  capabilities: [
    {
      no: "01",
      title: "운영팀의 반복 업무를 제품 기능과 데이터 규칙으로 바꿉니다",
      claim: [
        { text: "운영자의 업무를 admin·API·권한·상태·데이터 규칙으로 옮깁니다.", tone: "strong" },
      ],
      claimIds: [
        "nexus.backend-architecture",
        "nexus.admin-backend-ownership",
        "mediness.product-operations",
      ],
      details: [
        {
          text: "운영자용 admin과 homepage API를 독립 module로 두고 gateway 단일 endpoint와 service boundary·migration flow를 설계",
          source: "NEXUS",
        },
        {
          text: "요구사항을 화면 단위 구현보다 권한·상태·데이터 규칙으로 구체화하고 기획·frontend·QA와 release 기준까지 조율",
          source: "NEXUS",
        },
      ],
    },
    {
      no: "02",
      title: "계약·결제·재고처럼 함께 움직이는 상태를 복구 가능한 흐름으로 만듭니다",
      claim: [
        { text: "부분 실패가 전체 요청과 데이터 정합성 문제로 번지지 않게 경계를 나눕니다.", tone: "strong" },
      ],
      claimIds: [
        "centurion.bay-async-backend",
        "centurion.async-migration",
        "career.memento-payment",
      ],
      details: [
        {
          text: "주문·상품·재고 API와 RabbitMQ·TaskIQ worker·retry 구축 주도, Celery 작업을 TaskIQ·RabbitMQ로 점진 전환",
          source: "BAY",
        },
        {
          text: "결제 실패 시 환불·마일리지·티켓 rollback으로 여러 상태의 불일치 안정화에 기여",
          source: "Memento",
        },
        {
          text: "동기 응답과 실패 가능한 후속 작업을 분리하고 retry·rollback·운영 확인 지점을 함께 모델링",
          source: "BAY · Memento",
        },
      ],
    },
    {
      no: "03",
      title: "운영 중인 backend를 다시 만들고 품질·배포·장애 신호까지 책임집니다",
      claim: [
        { text: "기능을 옮기는 데서 끝내지 않고 전환 이후의 품질과 운영 상태를 수치로 확인합니다.", tone: "strong" },
      ],
      claimIds: [
        "thready.backend-rebuild",
        "thready.qa-reopen-reduction",
        "thready.production-operation-quality",
        "thready.release-operation",
        "nexus.quality-automation",
        "centurion.test-ci-foundation",
      ],
      details: [
        {
          text: "THREADY FastAPI backend 전면 재구축과 cutover 이후 개발·운영 전담",
          source: "THREADY",
        },
        {
          text: [
            { text: "QA 재오픈율 37% → 11%", tone: "metric" },
            { text: ", 월 수만 건 요청을 " },
            { text: "HTTP 5xx 약 0.3%", tone: "metric" },
            { text: " 수준으로 운영" },
          ],
          source: "THREADY",
        },
        {
          text: "Ruff·Pyright·pre-commit 검증 체계와 API test·Docker CI·local onboarding 기반 마련",
          source: "NEXUS · BAY",
        },
      ],
    },
  ],
  workStyles: [
    {
      no: "01",
      title: "업무와 사업 목표부터 확인합니다",
      body: "요청받은 기능보다 먼저 사용자의 업무와 사업 목표를 확인하고 권한·상태·데이터 규칙을 명확히 합니다.",
      claimIds: ["mediness.product-operations"],
    },
    {
      no: "02",
      title: "부분 실패를 운영 가능한 상태로 만듭니다",
      body: "실패 가능한 작업은 API 요청에서 분리하고 retry·rollback·운영 확인 지점을 함께 설계합니다.",
      claimIds: ["centurion.bay-async-backend", "career.memento-payment"],
    },
    {
      no: "03",
      title: "해결을 표준과 자동 검증으로 확장합니다",
      body: "ADR·convention·runbook을 남기고 test·static analysis·CI로 같은 판단을 반복하지 않게 합니다.",
      claimIds: ["be-template.backend-standard", "nexus.quality-automation"],
    },
    {
      no: "04",
      title: "배포 이후까지 개발 범위로 봅니다",
      body: "기획·frontend·QA·운영과 결정을 공유하고 배포 지표와 장애 대응까지 함께 관리합니다.",
      claimIds: ["mediness.product-operations", "thready.release-operation"],
    },
  ],
  skills: [
    {
      label: "주력",
      stack: "Python, FastAPI, SQLAlchemy",
      via: "아이즈솔·Memento·더데이랩스·MediSolve AI backend",
    },
    {
      label: "함께 사용",
      stack: "TypeScript, NestJS",
      via: "Centurion·API Gateway·STUDIO LAB legacy",
      claimIds: ["centurion.async-migration"],
    },
    {
      label: "Data / Messaging",
      stack: "PostgreSQL, MySQL, RabbitMQ, TaskIQ",
      via: "제품 API·background worker·transaction",
      claimIds: ["centurion.bay-async-backend", "thready.backend-rebuild"],
    },
    {
      label: "API / Runtime",
      stack: "REST API, Swagger/OpenAPI, WebSocket, SSE",
      via: "제품 API와 service 연동",
      claimIds: ["nexus.backend-architecture"],
    },
    {
      label: "Quality / Delivery",
      stack: "pytest, Ruff, Pyright, pre-commit, GitHub Actions, Docker",
      via: "API 검증·static analysis·CI",
      claimIds: ["nexus.quality-automation", "centurion.test-ci-foundation"],
    },
    {
      label: "Cloud / Infra",
      stack: "Azure, AWS, Terraform",
      via: "제품 인프라 운영과 배포",
      claimIds: ["infra.company-azure-ownership"],
    },
  ],
  credentials: [
    {
      period: "2016 — 2021",
      text: "우송대학교 게임멀티미디어 전공",
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
