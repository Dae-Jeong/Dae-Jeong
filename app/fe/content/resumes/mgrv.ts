import type { TailoredResume } from "./types";

export const MGRV_RESUME = {
  slug: "mgrv",
  companyName: "MGRV",
  position: "Backend Engineer",
  status: "approved",
  visibility: "public",
  updatedAt: "2026-08-16",
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
        "nexus.admin-backend-ownership",
        "mediness.product-operations",
        "thready.release-operation",
      ],
      text: "운영 현장의 요구를 권한·상태·데이터 규칙으로 구조화하고, 이를 API·QA·배포·운영까지 연결해 온 Backend Engineer입니다.",
    },
    {
      claimIds: [
        "centurion.day-product-integration",
        "centurion.ray-backend",
        "centurion.bay-async-backend",
        "career.memento-payment",
        "mediness.product-operations",
      ],
      text: [
        { text: "FastAPI·SQLAlchemy", tone: "strong" },
        {
          text: "를 주력으로 예약·시설·결제·주문·재고처럼 상태 변화와 복구가 중요한 제품을 개발했습니다. 운영팀·PM·프론트엔드·QA와 요구사항의 배경을 구체화하고, 실패 가능한 후속 작업은 worker·retry·rollback 경계로 분리합니다. 여러 제품에 반복되는 개발 기준은 공통 백엔드 표준으로 고정합니다.",
        },
      ],
    },
  ],
  careers: [
    {
      org: "MediSolve AI",
      period: "2025. 04 —",
      now: true,
      claimIds: [
        "career.medisolve-role-evolution",
        "thready.backend-rebuild",
        "thready.production-operation-quality",
        "thready.release-operation",
        "centurion.bay-async-backend",
        "centurion.day-product-integration",
        "centurion.ray-backend",
        "nexus.admin-backend-ownership",
        "be-template.backend-standard",
        "be-template.team-leverage",
      ],
      role: [
        { text: "Backend Engineer", tone: "strong" },
        { text: " · 기업부설연구소장 — Tech Lead·PO 역할 병행" },
      ],
      details: [
        [
          { text: "의료기관 통합 관리", tone: "strong" },
          { text: " — 운영 어드민·홈페이지 백엔드와 API gateway·service boundary 설계·구축 주도(진행 중)" },
        ],
        [
          { text: "Centurion CRM", tone: "strong" },
          { text: " — 예약·시설·주문·재고 백엔드와 worker 개발, 정책 변경을 프론트엔드·QA·배포까지 연결" },
        ],
        [
          { text: "AI 콘텐츠 생성", tone: "strong" },
          { text: " — 기존 Next.js를 유지한 채 FastAPI 백엔드를 병렬 구축·전환하고 이후 배포·QA·운영 담당" },
        ],
        [
          { text: "Backend Standard", tone: "strong" },
          { text: " — FastAPI template과 코드 품질·테스트·CI·onboarding 기준을 여러 제품의 공통 기반으로 구축" },
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
          { text: "Centurion CRM 초기 구축", tone: "strong" },
          { text: " — 제품 시작 단계부터 백엔드 구조·개발 규약·문서·테스트 기반을 마련하고, MediSolve AI 합류 후 같은 제품군의 개발·운영 지속" },
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
          { text: " — FastAPI·SQLAlchemy·MySQL 기반 API를 개발하고 선결제·환불·마일리지·티켓 rollback 흐름 안정화에 기여" },
        ],
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
        [
          { text: "SellerCanvas", tone: "strong" },
          { text: " — 생성형 AI 커머스 제품을 아이디어 단계부터 v1.0 출시까지 PM으로 이끌고 이후 백엔드 개발까지 담당" },
        ],
        "기획·디자인·개발 요구사항의 배경과 우선순위를 정리하며 제품의 0→1 출시를 조율",
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
      details: [
        [
          { text: "Vision AI 제품 개발", tone: "strong" },
          { text: " — AI 모델과 데이터 pipeline을 제품 기능으로 연결하는 개발·검증에 참여" },
        ],
      ],
    },
  ],
  outcomes: [
    {
      no: "01",
      title: "운영 요구를 백엔드가 판단할 수 있는 규칙으로 바꿨습니다",
      claimIds: [
        "nexus.backend-architecture",
        "nexus.admin-backend-ownership",
        "mediness.product-operations",
      ],
      description: [
        "운영팀의 요구는 화면을 추가하는 것만으로 해결되지 않았습니다. 누가 어떤 상태에서 어떤 데이터를 조회하고 변경할 수 있는지 백엔드에서 먼저 정의해야 어드민·API·QA·배포가 같은 기준으로 움직일 수 있다고 판단했습니다.",
        {
          text: "의료기관 통합 관리 시스템의 운영 어드민·홈페이지 API와 service boundary·migration flow 설계·구축 주도(진행 중)",
          source: "의료기관 통합 관리",
        },
        {
          text: "제품 요구사항을 SPEC·Work Package·QA approval·release gate로 연결해 개발부터 배포까지 같은 실행 기준으로 운영",
          source: "제품팀 운영",
        },
      ],
    },
    {
      no: "02",
      title: "예약 정책을 배포 가능한 변경 단위로 연결했습니다",
      claimIds: [
        "centurion.day-product-integration",
        "centurion.ray-backend",
      ],
      description: [
        "예약 정책은 API에 구현하는 것만으로 실제 운영에 반영되지 않았습니다. 백엔드의 판단, 프론트엔드의 표시, QA 검증 데이터, release 문서까지 하나의 변경 단위로 다뤘습니다.",
        {
          text: "예약 정책을 백엔드의 판단·프론트엔드의 표시·QA seed/test·release 문서로 연결",
          source: "예약 운영",
        },
        {
          text: "시설 현황·긴급 호출·재고 연동 백엔드에 참여해 예약 이후의 운영 흐름까지 제품 안에서 연결",
          source: "시설 운영",
        },
      ],
    },
    {
      no: "03",
      title: "부분 실패를 복구 가능한 경계로 나눴습니다",
      claimIds: [
        "centurion.bay-async-backend",
        "centurion.async-migration",
        "career.memento-payment",
      ],
      description: [
        "주문·결제·재고처럼 여러 상태가 함께 바뀌는 기능에서는 후속 작업 하나의 실패도 데이터 불일치로 이어질 수 있습니다. 실패 가능한 작업을 API 요청에서 분리하고 각 단계에 retry와 rollback 경계를 뒀습니다.",
        {
          text: "주문·상품·재고 API와 RabbitMQ·TaskIQ worker를 구축하고, 실패 가능한 후속 작업을 제품 시작 단계부터 요청 경계 밖으로 분리",
          source: "주문·재고",
        },
        {
          text: "결제 실패 시 환불·마일리지·티켓 rollback 흐름 안정화에 기여",
          source: "예약·결제",
        },
      ],
    },
    {
      no: "04",
      title: "기존 운영을 유지한 채 백엔드를 전환했습니다",
      claimIds: [
        "thready.backend-rebuild",
        "thready.rebuild-decision-execution",
        "thready.release-operation",
      ],
      description: [
        "AI 기능 확장을 앞두고 기존 구조의 복잡도가 커질 것으로 예상했습니다. 다만 프론트엔드까지 한꺼번에 교체하면 변경 범위와 검증 부담도 함께 커질 수 있었습니다.",
        {
          text: "아키텍처·컴포넌트·인프라 검증 기반을 먼저 세운 뒤, AI와 함께 코드베이스 파악·기능 정의·재구축을 총 36시간(작업 시간 기준)에 완료",
          source: "AI 콘텐츠 서비스",
        },
        "프론트엔드까지 한꺼번에 바꾸지 않고 기존 Next.js를 유지한 채 FastAPI 백엔드만 병렬로 구축·검증해 전환 범위를 제한했습니다.",
        {
          text: [
            { text: "v1.1.0 cutover 이후 배포·QA·백엔드 운영을 이어가며 월 수만 건 요청을 " },
            { text: "HTTP 5xx 약 0.3%", tone: "metric" },
            { text: " 수준으로 운영" },
          ],
          source: "AI 콘텐츠 서비스",
        },
      ],
    },
    {
      no: "05",
      title: "여러 제품을 효율적으로 관리할 공통 백엔드 기준을 만들었습니다",
      claimIds: [
        "be-template.backend-standard",
        "be-template.team-leverage",
        "nexus.quality-automation",
        "centurion.test-ci-foundation",
      ],
      description: [
        "제품마다 구조와 개발 규칙이 다르면 담당 제품이 바뀔 때마다 코드베이스 파악, 환경 구성, 품질 검증을 반복해야 합니다. 제품별 정책과 공통 기술 기준을 분리하고, 반복되는 판단은 template과 자동 검증에 고정했습니다.",
        {
          text: "layered architecture·DI·ADR·convention·runbook을 FastAPI template으로 구성해 여러 제품이 같은 백엔드 기반을 사용",
          source: "조직 표준",
        },
        {
          text: "Ruff·Pyright·pre-commit, API test·Docker CI·로컬 실행 및 onboarding 문서를 적용해 환경 구성과 품질 검증의 반복을 줄임",
          source: "통합 관리 · 주문·재고",
        },
      ],
    },
  ],
  workStyles: [],
  skills: [
    {
      label: "주력",
      stack: "Python, FastAPI, SQLAlchemy",
      via: "예약·결제, 운영 어드민, AI 콘텐츠 제품 백엔드",
    },
    {
      label: "Data / ORM",
      stack: "PostgreSQL, MySQL, SQLAlchemy",
      via: "제품 schema·transaction·데이터 정합성",
      claimIds: ["career.memento-payment", "thready.backend-rebuild"],
    },
    {
      label: "Async / Messaging",
      stack: "RabbitMQ, TaskIQ",
      via: "주문·재고 background worker·retry",
      claimIds: ["centurion.bay-async-backend", "centurion.async-migration"],
    },
    {
      label: "API / Auth",
      stack: "REST API, Swagger/OpenAPI, JWT/session",
      via: "REST API·gateway·multi-service session",
      claimIds: ["nexus.backend-architecture", "centurion.sso-session"],
    },
    {
      label: "Quality / Delivery",
      stack: "pytest, Ruff, Pyright, pre-commit, GitHub Actions, Docker",
      via: "API test·static analysis·Docker CI",
      claimIds: ["nexus.quality-automation", "centurion.test-ci-foundation"],
    },
    {
      label: "Cloud / Infra",
      stack: "Azure, AWS, Terraform",
      via: "제품 인프라 운영과 배포",
      claimIds: ["infra.company-azure-ownership", "centurion.shared-infra"],
    },
    {
      label: "보조",
      stack: "TypeScript, NestJS",
      via: "API Gateway·multi-service session",
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
