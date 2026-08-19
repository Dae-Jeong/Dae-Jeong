import type { TailoredResume } from "./types";

export const MGRV_RESUME = {
  slug: "mgrv",
  companyName: "MGRV",
  position: "Backend Engineer",
  status: "closed",
  visibility: "local",
  updatedAt: "2026-08-18",
  pdfHref: "/resumes/mgrv-resume.pdf",
  header: {
    name: "김대정",
    role: "Backend Engineer · Python / FastAPI / SQLAlchemy",
    careerLine: [
      { text: "MediSolve AI", tone: "strong" },
      { text: " · Backend Engineer (2025. 04 — 재직중)" },
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
      claimIds: [
        "thready.prototype-to-user-operation",
        "thready.backend-rebuild",
        "thready.release-operation",
      ],
      text: "제품을 실제 사용자에게 전달하고 운영하는 Backend Engineer입니다.",
    },
    {
      claimIds: [
        "career.sellercanvas-product-system",
        "career.ai-pm-backend-continuity",
        "centurion.day-product-integration",
        "nexus.branch-access-boundary",
      ],
      text: "AI Engineer와 Product Manager로 일하며 제품의 0→1을 이끌었던 경험을 바탕으로, 사용자·운영자의 흐름을 상태·권한·데이터·실패 복구 규칙으로 설계하고 구현합니다.",
    },
  ],
  careers: [
    {
      org: "MediSolve AI",
      period: "2025. 04 —",
      now: true,
      claimIds: [
        "career.medisolve-role-evolution",
        "thready.prototype-to-user-operation",
        "thready.backend-rebuild",
        "thready.release-operation",
        "centurion.bay-async-backend",
        "centurion.day-product-integration",
        "centurion.ray-backend",
        "nexus.backend-architecture",
        "nexus.admin-backend-ownership",
        "nexus.branch-access-boundary",
        "infra.company-azure-ownership",
      ],
      role: [
        { text: "Backend Engineer", tone: "strong" },
        { text: " · Tech Lead·PO 역할 병행" },
      ],
      details: [
        [
          { text: "Thready · AI 콘텐츠 제품", tone: "strong" },
          {
            text: " — FastAPI 백엔드 개발과 실제 사용자 대상 배포·QA·운영",
          },
        ],
        [
          { text: "피부과 운영 어드민·홈페이지", tone: "strong" },
          {
            text: " — 백엔드 서비스 경계와 API Gateway를 설계·구축 중",
          },
        ],
        [
          { text: "피부과 예약·시설·주문·재고", tone: "strong" },
          {
            text: " — API와 RabbitMQ·TaskIQ worker 개발·운영",
          },
        ],
        [
          { text: "회사 인프라", tone: "strong" },
          {
            text: " — Azure·Terraform 기반으로 제품·환경별 인프라 경계를 나누고 배포·운영 절차를 관리",
          },
        ],
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
        [
          { text: "제품 초기 백엔드 구축", tone: "strong" },
          {
            text: " — FastAPI 구조·개발 규칙·문서·테스트 기반을 마련하고, 이후 같은 제품군의 개발·운영 지속",
          },
        ],
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
        [
          { text: "예약·결제 서비스", tone: "strong" },
          {
            text: " — FastAPI·SQLAlchemy·MySQL 기반 API 개발과 선결제 실패 시 환불·마일리지·티켓 상태 복구에 기여",
          },
        ],
      ],
    },
    {
      org: "STUDIO LAB",
      period: "2021.12 — 2024.01",
    claimIds: [
      "career.sellercanvas-product-system",
      "career.sellercanvas-enterprise-poc",
    ],
      role: [
        { text: "Product Manager", tone: "strong" },
        { text: " — AI Engineer → PM(메인 역할)" },
      ],
      details: [
        [
        { text: "SellerCanvas · 생성형 AI 제품", tone: "strong" },
        {
          text: " — 프로토타입에서 v1.0까지 0→1 제품 기획·운영",
        },
      ],
      [
        { text: "기업 PoC", tone: "strong" },
        {
          text: " — 외부 패션 브랜드 요구를 제품 흐름과 검증 범위로 구체화하고 진행",
        },
      ],
    ],
    },
    {
      org: "아이즈솔",
      period: "2020.08 — 2021.06",
      claimIds: ["career.ai-pm-backend-continuity"],
      role: [
        { text: "AI Engineer", tone: "strong" },
        { text: " — 인턴" },
      ],
      details: [
        [
          { text: "Vision AI 제품 개발", tone: "strong" },
          {
            text: " — AI 모델과 데이터 파이프라인을 제품 기능으로 연결하는 개발·검증에 참여",
          },
        ],
      ],
    },
  ],
  outcomes: [
    {
      no: "01",
      title: "초기 프로토타입의 백엔드 전환부터 실제 사용자 운영까지 책임졌습니다",
      claimIds: [
        "thready.prototype-to-user-operation",
        "thready.backend-rebuild",
        "thready.release-operation",
        "thready.production-operation-quality",
      ],
      description: [
        "Next.js·Supabase 기반 초기 프로토타입 단계에 합류해 FastAPI 백엔드를 설계·구축하고, 인증·계정·콘텐츠 생성·발행 흐름을 운영 가능한 구조로 전환했습니다.",
        {
          text: "v1.0~v1.2 동안 출시 준비·QA를 진행하고 v1.1.0에 백엔드를 전환한 뒤, v1.3.0부터 실제 사용자 운영 시작",
          source: "Thready · AI 콘텐츠 제품",
        },
        {
          text: [
            {
              text: "실제 사용자 운영 시작 이후 릴리스·QA·백엔드 운영을 이어가며, 30일간 수만 건의 요청에서 ",
            },
            { text: "HTTP 5xx 약 0.3%", tone: "metric" },
            { text: "를 확인" },
          ],
          source: "Thready · AI 콘텐츠 제품",
        },
      ],
    },
    {
      no: "02",
      title: "비동기 작업의 실패를 확인하고 복구할 수 있게 만들었습니다",
      claimIds: [
        "centurion.bay-async-backend",
        "centurion.async-migration",
        "career.memento-payment",
      ],
      description: [
        "API 요청과 후속 작업의 책임을 나누고, 실패가 사라지지 않도록 상태·재시도·최종 실패 기록·수동 재처리 경계를 설계했습니다.",
        {
          text: "FastAPI의 비동기 실행 모델과 맞는 TaskIQ·RabbitMQ로 전환해 API와 worker의 배포·실행 경계를 분리",
          source: "Centurion · 주문·재고",
        },
        {
          text: "알림 작업의 상태·최대 3회 재시도·최종 실패 기록·수동 재처리 경로 구축",
          source: "Centurion · 주문·재고",
        },
        {
          text: "예약 실패 시 환불·마일리지·티켓 상태를 되돌리는 흐름 안정화에 기여",
          source: "Memento AI · 예약·결제",
        },
      ],
    },
    {
      no: "03",
      title: "운영자의 권한과 작업 범위를 분리하는 다지점 데이터 경계를 설계·구축하고 있습니다",
      claimIds: [
        "nexus.branch-access-boundary",
        "nexus.backend-architecture",
        "nexus.admin-backend-ownership",
      ],
      description: [
        "운영 어드민과 홈페이지를 독립 FastAPI 서비스로 나누고 API Gateway로 연결하는 백엔드를 구축 중입니다. Admin API에서는 운영자의 소속 지점과 현재 작업 지점을 분리해, 데이터 접근 범위를 클라이언트 입력이 아니라 서버 인증 상태가 결정하도록 설계하고 있습니다.",
        {
        text: "FastAPI·SQLAlchemy 2.0 기반으로 Admin·Homepage API를 분리하고, 공통 모델·Repository와 migration 흐름을 설계·구축 중",
          source: "피부과 운영 어드민·홈페이지",
        },
        {
          text: "작업 지점 전환을 권한 검증 전용 API로 제한하고, 본사 미선택과 권한 밖 접근을 구분해 차단하도록 구현 중. Homepage API의 기존 지점 식별 계약은 유지",
          source: "피부과 운영 어드민·홈페이지",
        },
      ],
    },
    {
      no: "04",
      title: "AI 실행부를 분리하고 데이터 전달의 일관성을 설계했습니다",
      claimIds: [
        "thready.ai-service-boundary",
        "thready.ai-replica-outbox",
      ],
      description: [
      "AI 실행부를 독립 FastAPI 애플리케이션과 DB로 분리했습니다. 제품 정책과 원장 데이터는 백엔드가, 생성 과정과 실행 상태는 AI 애플리케이션이 맡도록 책임을 나눴습니다.",
        {
          text: "원장 변경과 Outbox 기록을 같은 트랜잭션으로 처리하고, 전달 작업은 트랜잭션 이후로 분리해 재시도·버전 검증으로 보호",
          source: "Thready · AI 콘텐츠 제품",
        },
        {
          text: "운영 전환 전에 전체 회귀, migration 왕복, 이전 버전의 PUT/DELETE 요청 차단까지 검증",
          source: "Thready · AI 콘텐츠 제품",
        },
      ],
    },
    {
      no: "05",
      title: "프로토타입을 v1.0 제품과 기업 PoC로 연결했습니다",
      claimIds: [
        "career.sellercanvas-product-system",
        "career.sellercanvas-enterprise-poc",
        "credentials.page-output-patent",
      ],
      description: [
        "AI Engineer로 합류한 SellerCanvas에서 Product Manager 메인 역할을 맡았습니다. 이미지 입력부터 AI 분석·상세페이지 생성·편집·출력까지 제품 흐름을 정의하고, 프로토타입을 v1.0으로 발전시키는 0→1 구간을 이끌었습니다.",
        {
          text: "사용자·비즈니스 요구를 기능 범위·생성 흐름·출시 우선순위로 구체화",
          source: "SellerCanvas · Product Manager",
        },
        {
          text: "외부 패션 브랜드 PoC를 진행하고, 상세페이지 출력 흐름을 발전시켜 관련 특허 등록에 기여",
          source: "SellerCanvas · Product Manager",
        },
      ],
    },
  ],
  workStyles: [
    {
      no: "01",
      title: "제품 요구를 실행 가능한 기준으로 바꿉니다",
      body: "사용자·운영 흐름과 비즈니스 목표를 먼저 맞춘 뒤 상태·권한·데이터 규칙과 QA·배포 조건으로 구체화합니다.",
      claimIds: [
        "centurion.day-product-integration",
        "mediness.product-system-design-participation",
        "mediness.product-operations",
      ],
    },
    {
      no: "02",
      title: "반복되는 판단을 공통 기반에 남깁니다",
      body: "FastAPI·SQLAlchemy 구조와 ADR·개발 규칙·운영 문서를 정리하고, Ruff·Pyright·테스트·CI로 자동 검증합니다.",
      claimIds: [
        "be-template.backend-standard",
        "nexus.quality-automation",
        "centurion.test-ci-foundation",
      ],
    },
    {
      no: "03",
      title: "AI의 속도를 검증 가능한 작업으로 바꿉니다",
      body: "AI에는 탐색·비교·초안을 맡기되 경계 설계와 완료 판단은 사람이 맡고, 결과를 테스트·CI·배포 근거로 확인합니다.",
      claimIds: [
        "be-template.agent-context",
        "thready.rebuild-decision-execution",
      ],
    },
  ],
  skills: [
    {
      label: "주력",
      stack: "Python, FastAPI, SQLAlchemy",
      via: "예약·결제, 운영 어드민, AI 콘텐츠 제품 백엔드",
      claimIds: [
        "thready.backend-rebuild",
        "centurion.bay-async-backend",
        "nexus.admin-backend-ownership",
      ],
    },
    {
      label: "Data / ORM",
      stack: "PostgreSQL, MySQL, SQLAlchemy",
      via: "제품 스키마·트랜잭션·데이터 정합성",
      claimIds: ["career.memento-payment", "thready.backend-rebuild"],
    },
    {
      label: "Async / Queue",
      stack: "RabbitMQ, TaskIQ",
      via: "작업 상태·재시도·백그라운드 처리",
      claimIds: ["centurion.bay-async-backend", "centurion.async-migration"],
    },
    {
      label: "API / Auth",
      stack: "REST API, Swagger/OpenAPI, JWT/session",
      via: "API Gateway·다중 서비스 세션·다지점 접근 경계",
      claimIds: [
        "nexus.branch-access-boundary",
        "nexus.backend-architecture",
        "centurion.sso-session",
      ],
    },
    {
      label: "Quality / CI",
      stack: "pytest, Ruff, Pyright, pre-commit, GitHub Actions, Docker",
      via: "API 테스트·정적 분석·Docker CI",
      claimIds: ["nexus.quality-automation", "centurion.test-ci-foundation"],
    },
    {
      label: "Cloud / Delivery",
      stack: "Azure, Terraform, AWS, Render, Vercel",
      via: "제품·환경별 인프라와 배포 운영",
      claimIds: ["infra.company-azure-ownership", "centurion.shared-infra"],
    },
    {
      label: "보조",
      stack: "TypeScript, NestJS",
      via: "API Gateway·다중 서비스 세션",
      claimIds: ["centurion.sso-session"],
    },
  ],
  credentials: [
    {
      period: "2016. 03\n- 2021.08",
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
