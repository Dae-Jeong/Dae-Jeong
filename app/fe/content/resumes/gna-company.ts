import type { TailoredResume } from "./types";

export const GNA_COMPANY_RESUME = {
  slug: "gna-company",
  companyName: "GNA COMPANY",
  position: "Backend Engineer",
  status: "approved",
  visibility: "public",
  updatedAt: "2026-08-15",
  pdfHref: "/resumes/gna-company-resume.pdf",
  header: {
    name: "김대정",
    role: "Tech Lead · Backend Engineer · Python / FastAPI",
    careerLine: [
      { text: "MediSolve AI", tone: "strong" },
      { text: " · Tech Lead · Backend Engineer (2025.04 — 재직 중) / 이전 " },
      { text: "STUDIO LAB", tone: "strong" },
      { text: " · PM (2021.12 — 2024.01)" },
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
      claimIds: ["career.tenure", "career.ai-pm-backend-continuity"],
      text: [
        {
          text: "Python·FastAPI 기반 제품 backend를 구축하고 운영해온 ",
          tone: "strong",
        },
        { text: "실무 4년차", tone: "metric" },
        { text: "입니다. AI 엔지니어와 PM을 거쳐 제품을 끝까지 운영하는 역할로 backend를 선택했습니다." },
      ],
    },
    {
      claimIds: [
        "thready.backend-rebuild",
        "centurion.bay-async-backend",
        "centurion.say-realtime-ai",
      ],
      text: [
        { text: "기존 frontend와 운영 버전은 유지한 채 FastAPI backend를 병렬 구축·전환", tone: "strong" },
        {
          text: "했습니다. RabbitMQ·TaskIQ worker와 WebSocket session lifecycle, API test·CI·cloud 배포까지 함께 다뤄왔습니다.",
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
        "centurion.bay-async-backend",
        "centurion.say-realtime-ai",
        "nexus.quality-automation",
        "infra.company-azure-ownership",
      ],
      role: [
        { text: "Tech Lead · Backend Engineer", tone: "strong" },
        { text: " — PO 역할 병행" },
      ],
      details: [
        [
          {
            text: "AI 기반 Threads 마케팅 대행 서비스(THREADY)의 운영을 유지하면서 FastAPI backend를 병렬 재구축",
            tone: "strong",
          },
          { text: "과 cutover 이후 개발·운영 전담" },
        ],
        [
          { text: "월 수만 건 요청 규모", tone: "metric" },
          { text: "의 production backend 운영" },
        ],
        [
          {
            text: "병원 주문·상품·재고 관리 서비스(BAY)의 API와 RabbitMQ·TaskIQ worker·retry 구축",
            tone: "strong",
          },
          { text: " 주도" },
        ],
        [
          {
            text: "실시간 AI 상담 서비스(SAY)의 WebSocket session lifecycle 안정화",
            tone: "strong",
          },
          { text: " 공동 주 기여" },
        ],
        "의료기관 통합 관리 시스템(NEXUS)의 Swagger·API·DB 문서와 static analysis·pre-commit 기반 구축, Azure·Vercel 배포 환경 구성·기본 운영",
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
        "제품 backend를 초기부터 구축하고 FastAPI 구조·개발 규약·문서·test 기반 마련",
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
        "Stripe 선결제와 결제 실패 시 환불·마일리지·티켓 rollback 안정화 기여",
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
        "생성형 AI 제품 SellerCanvas를 아이디어 단계부터 v1.0 출시까지 PM으로 주도하고 backend 개발까지 역할 확장",
        "기획·디자인·개발 요구사항의 배경과 우선순위를 정리하고 출시까지 조율",
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
  outcomes: [
    {
      no: "01",
      title: "운영을 유지한 FastAPI backend 전환",
      claimIds: [
        "thready.backend-rebuild",
        "thready.production-operation-quality",
        "thready.release-operation",
        "career.memento-payment",
      ],
      description: [
        [
          {
            text: "기존 frontend와 운영 버전은 유지하고, 신규 backend를 병렬 구축해 검증 후 cutover했습니다.",
            tone: "strong",
          },
        ],
        {
          text: "향후 AI 모듈 확장과 누적 복잡도를 고려해 서비스 초기 단계에서 backend 구조 전환 결정",
          source: "Threads 마케팅 서비스",
        },
        {
          text: "기존 Next.js와 운영 버전은 건드리지 않고 신규 FastAPI backend만 병렬 구축",
          source: "Threads 마케팅 서비스",
        },
        {
          text: [
            { text: "검증 뒤 cutover", tone: "strong" },
            { text: "하고, 이후 월 수만 건 요청 규모의 production backend 운영 전담" },
          ],
          source: "Threads 마케팅 서비스",
        },
        {
          text: "결제 실패 시 환불·마일리지·티켓 rollback으로 상태 불일치 안정화에 기여",
          source: "Memento",
        },
      ],
    },
    {
      no: "02",
      title: "Background·realtime 작업의 실패 격리와 복구",
      claimIds: [
        "centurion.bay-async-backend",
        "centurion.async-migration",
        "centurion.say-realtime-ai",
      ],
      description: [
        [
          { text: "요청과 후속 작업의 경계를 나누고, 실패를 다시 처리할 수 있는 상태로 만듭니다.", tone: "strong" },
        ],
        {
          text: "병원 주문·상품·재고 관리 서비스의 API와 RabbitMQ·TaskIQ worker·retry 구축 주도",
          source: "주문·재고 관리 서비스",
        },
        {
          text: "병원 주문·재고 관리 서비스의 Celery 작업을 TaskIQ·RabbitMQ로 점진 전환하고 외부 알림을 독립 domain으로 분리",
          source: "주문·재고 관리 서비스",
        },
        {
          text: "실시간 AI 상담 서비스의 WebSocket session 중복 event를 cancellation·debounce·retry·turn-state guard로 제어",
          source: "실시간 AI 상담 서비스",
        },
      ],
    },
    {
      no: "03",
      title: "API·test·배포 기준의 표준화",
      claimIds: [
        "nexus.quality-automation",
        "centurion.test-ci-foundation",
        "be-template.backend-standard",
        "career.tellingme-backend-infra",
      ],
      description: [
        [
          { text: "한 번 해결한 판단을 규약·문서·자동 검증으로 남겨 팀이 반복해서 사용하게 합니다.", tone: "strong" },
        ],
        {
          text: "의료기관 통합 관리 시스템의 Swagger·API·DB 문서와 Ruff·Pyright·pre-commit 검증 체계 구축",
          source: "통합 관리 시스템",
        },
        {
          text: "병원 주문·재고 관리 서비스의 API test·Docker CI·local onboarding 기반 마련",
          source: "주문·재고 관리 서비스",
        },
        {
          text: "공통 FastAPI template에 DI·transaction·exception·logging 규약과 ADR·convention 정리",
          source: "조직 표준",
        },
        {
          text: "개인 프로젝트 TellingMe의 Spring Boot·JPA·MySQL backend와 AWS 배포·monitoring 주도",
          source: "개인 프로젝트",
        },
      ],
    },
  ],
  workStyles: [
    {
      no: "01",
      title: "문제의 경계를 다시 잡습니다",
      body: "변경 전에 운영 영향과 구조적 복잡도를 함께 검토합니다. 부분 수정이 복잡도를 키운다고 판단하면 범위를 분리하고 검증·rollback 경로를 마련합니다.",
      claimIds: ["thready.rebuild-decision-execution"],
    },
    {
      no: "02",
      title: "실패를 운영 가능한 상태로 만듭니다",
      body: "실패 가능한 작업은 API 요청에서 분리하고 retry·rollback·운영 확인 지점을 함께 설계합니다.",
      claimIds: ["centurion.bay-async-backend", "career.memento-payment"],
    },
    {
      no: "03",
      title: "해결을 표준과 자동화로 확장합니다",
      body: "의사결정과 규약을 ADR·convention·runbook으로 남기고 test·static analysis·CI로 검증합니다.",
      claimIds: ["be-template.backend-standard", "nexus.quality-automation"],
    },
    {
      no: "04",
      title: "제품의 배경부터 배포 이후까지 공유합니다",
      body: "기획·mobile·frontend·QA와 요구사항의 배경을 공유하고, 배포 지표와 장애 대응까지 개발 범위로 봅니다.",
      claimIds: ["mediness.product-operations"],
    },
  ],
  skills: [
    {
      label: "주력",
      stack: "Python, FastAPI",
      via: "아이즈솔·Memento·더데이랩스·MediSolve AI의 backend",
    },
    {
      label: "함께 사용",
      stack: "TypeScript, NestJS",
      via: "병원 운영 제품군·API Gateway·STUDIO LAB legacy",
      claimIds: ["centurion.async-migration"],
    },
    {
      label: "Data / Messaging",
      stack: "MySQL, PostgreSQL, RabbitMQ, TaskIQ",
      via: "제품 API와 background worker",
      claimIds: ["centurion.bay-async-backend"],
    },
    {
      label: "API / Runtime",
      stack: "REST API, Swagger/OpenAPI, WebSocket, SSE",
      via: "제품 API와 realtime session",
      claimIds: ["centurion.say-realtime-ai", "nexus.quality-automation"],
    },
    {
      label: "Infra / Delivery",
      stack: "Docker, GitHub Actions, Azure, Terraform, AWS",
      via: "서비스 배포·환경 설정·기본 로그 확인",
      claimIds: ["infra.company-azure-ownership", "career.tellingme-backend-infra"],
    },
    {
      label: "Quality",
      stack: "pytest, Ruff, Pyright, pre-commit",
      via: "API 검증과 static analysis",
      claimIds: ["nexus.quality-automation"],
    },
    {
      label: "개인 프로젝트",
      stack: "Java, Spring Boot",
      via: "TellingMe backend·AWS — 실무 경력과 구분",
      claimIds: ["career.tellingme-backend-infra"],
    },
  ],
  credentials: [
    {
      period: "2016. 03\n- 2021.08",
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
