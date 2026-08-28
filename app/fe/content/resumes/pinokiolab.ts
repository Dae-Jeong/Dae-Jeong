import type { TailoredResume } from "./types";

export const PINOKIOLAB_RESUME = {
  slug: "pinokiolab",
  companyName: "피노키오랩",
  position: "Backend Engineer (FastAPI)",
  status: "approved",
  visibility: "public",
  updatedAt: "2026-08-28",
  sectionOrder: ["profile", "career", "outcomes", "skills", "credentials"],
  header: {
    name: "김대정",
    role: "제품 개발 실무 4년 · Product Engineer · Backend / FastAPI",
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
      {
        label: "thready.medisolveai.com",
        href: "https://thready.medisolveai.com",
        external: true,
      },
    ],
  },
  summary: [
    {
      text: "고객이 사용하는 AI 제품을 만들고 운영합니다.",
      claimIds: [
        "thready.product-zero-to-one-contribution",
        "career.ai-pm-backend-continuity",
      ],
    },
    {
      text: "제품이 해결할 문제를 정하고 FastAPI 백엔드·AI 서비스·핵심 사용자 흐름을 직접 구현해, 실제 고객이 결제하는 서비스로 출시하고 운영했습니다. 실시간 상담, 주문·재고, 예약·결제처럼 상태가 복잡한 제품도 출시 후 추적하고 복구할 수 있는 구조로 만듭니다.",
      claimIds: [
        "thready.product-zero-to-one-contribution",
        "thready.subscription-revenue-band",
        "centurion.say-realtime-ai",
        "centurion.bay-async-backend",
        "career.memento-payment",
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
        { text: " · Tech Lead · 제품 운영 역할 병행" },
      ],
      details: [
        [
          { text: "유료 AI 콘텐츠 제품", tone: "strong" },
          { text: " — 기획·QA·마케팅 담당자와 고객 문제·기능 우선순위를 정하고 제품 운영을 리드. FastAPI 백엔드·독립 AI 서비스·Next.js 핵심 사용자 및 관리 흐름을 직접 구현해 실제 고객이 결제하는 제품으로 운영" },
        ],
        [
          { text: "실시간 AI 상담·주문·재고", tone: "strong" },
          { text: " — 늦게 도착한 STT 보정이 정확한 발화만 바꾸도록 sequence 계약을 구현. 자동 발주 뒤 병원·공급사 알림을 RabbitMQ·TaskIQ 워커로 분리하고 발송 결과를 주문 상태·재시도·수동 재발송과 연결" },
        ],
        [
          { text: "병원 운영·예약 제품", tone: "strong" },
          { text: " — 여러 병원의 운영·예약을 지원하는 백엔드 구조와 관리·홈페이지 API 구축을 주도. 제품은 예약률 개선을 통해 고객사 매출 성과에 기여" },
        ],
        [
          { text: "FastAPI 개발 기준", tone: "strong" },
          { text: " — 기획·QA·디자인 담당자도 코딩 에이전트로 사내 프로그램을 구현할 수 있도록 계층·DI·트랜잭션·비동기 세션·테스트 기준을 조직 표준 템플릿과 문서로 구축" },
        ],
        [
          { text: "제품 개발 회고", tone: "strong" },
          { text: " — 주 1회 에이전트 활용 경험과 작업 병목을 공유하고, 코드 단위보다 무엇을 만들어야 하는지와 더 정확하고 효율적인 구현 방법을 팀과 검토" },
        ],
      ],
      claimIds: [
        "career.medisolve-role-evolution",
        "thready.product-zero-to-one-contribution",
        "thready.subscription-revenue-band",
        "thready.frontend-product-delivery",
        "thready.ai-service-boundary",
        "thready.generation-quality-system",
        "thready.labeling-corpus-workbench",
        "centurion.say-realtime-ai",
        "centurion.bay-async-backend",
        "nexus.backend-architecture",
        "nexus.admin-backend-ownership",
        "nexus.hospital-operations-revenue-contribution",
        "be-template.fastapi-sqlalchemy-standard",
        "be-template.team-leverage",
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
          { text: "제품 초기 백엔드", tone: "strong" },
          { text: " — MediSolve AI 법인 설립 전 피부과 CRM 제품 개발을 선행하고, 초기 백엔드와 개발 기준을 구축" },
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
          { text: "예약·결제", tone: "strong" },
          { text: " — FastAPI·SQLAlchemy·MySQL 기반 예약 API와 Stripe Checkout 선결제를 구현하고, 취소·환불과 내부 자산 변경 순서를 보완" },
        ],
        [
          { text: "고객 알림", tone: "strong" },
          { text: " — 다국어 알림톡·이메일 즉시/예약 발송과 Celery 작업 취소·재등록·발송 이력을 구현" },
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
          { text: "AI 커머스 콘텐츠 제품", tone: "strong" },
          { text: " — PM 메인 역할로 프로토타입에서 v1.0까지 제품 흐름·기능 범위·출시 우선순위를 정하고 기업 PoC로 연결" },
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
      details: ["Vision AI 모델과 데이터 파이프라인을 제품 기능으로 연결하는 개발·검증에 참여"],
      claimIds: ["career.ai-pm-backend-continuity"],
    },
  ],
  outcomes: [
    {
      no: "01",
      title: "고객의 콘텐츠 제작 문제를 고객이 결제하는 AI 제품으로 만들었습니다",
      description: [
        "기획·QA·마케팅과 고객 문제·기능 우선순위·생성 품질 기준을 정하고, 출시와 운영까지 제품 흐름을 리드했습니다.",
        { text: "FastAPI 제품 백엔드와 독립 AI 서비스·DB를 구축하고 인증된 HTTP 계약으로 연결", source: "Thready · 백엔드/AI" },
        { text: "콘텐츠 생성·가져오기·예약·발행·성과 확인·관리 화면 등 Next.js 핵심 흐름을 직접 구현", source: "Thready · 사용자/관리 화면" },
        { text: "LLM 검수 결과를 1차 판단 이력으로 남기고, 관리자 화면에서 사람이 글의 점수·판단 사유를 축적하는 품질 평가 흐름을 구축", source: "Thready · 품질 운영" },
        { text: "실제 사용자가 이용하고 구독료 매출이 발생하는 제품으로 운영", source: "Thready · 제품 운영" },
      ],
      claimIds: [
        "thready.product-zero-to-one-contribution",
        "thready.subscription-revenue-band",
        "thready.frontend-product-delivery",
        "thready.ai-service-boundary",
        "thready.generation-quality-system",
        "thready.labeling-corpus-workbench",
      ],
    },
    {
      no: "02",
      title: "실시간 AI 상담과 주문·재고 업무를 각각 운영 가능한 서비스로 구축했습니다",
      description: [
        "같은 의료 플랫폼의 별도 서비스에서, 실시간 보정 결과가 정확한 발화에 반영되고 자동 발주 뒤 알림 실패는 주문 상태로 확인·복구되게 했습니다.",
        { text: "DELTA·COMPLETE·CORRECTED에 같은 sequence를 부여해 비동기 보정이 늦게 도착해도 다른 발화를 덮지 않도록 구현", source: "Centurion · 실시간 상담" },
        { text: "자동 발주 뒤 병원·공급사 알림을 TaskIQ 워커로 분리하고 성공·최종 실패·자동 재시도·수동 재발송을 주문 상태와 연결", source: "Centurion · 주문/재고" },
      ],
      claimIds: [
        "centurion.say-realtime-ai",
        "centurion.bay-async-backend",
        "centurion.async-migration",
      ],
    },
    {
      no: "03",
      title: "여러 병원의 운영·예약을 지원하는 제품 백엔드를 구축하고 있습니다",
      description: [
        "관리자와 홈페이지 사용자의 흐름을 분리한 백엔드 구조를 만들고, 데이터 접근 범위는 서버의 인증 상태가 결정하도록 보강하고 있습니다.",
        { text: "관리·홈페이지 API를 독립 모듈로 두고 게이트웨이를 통해 하나의 진입점으로 제공", source: "NEXUS · 제품 백엔드" },
        { text: "운영자의 소속 지점과 현재 작업 지점을 분리하고 409·403으로 복구 가능한 오류를 구분", source: "NEXUS · 접근 범위" },
        { text: "제품은 예약률 개선을 통해 고객사 매출 성과에 기여", source: "NEXUS · 제품/팀 성과" },
      ],
      claimIds: [
        "nexus.backend-architecture",
        "nexus.admin-backend-ownership",
        "nexus.branch-access-boundary",
        "nexus.hospital-operations-revenue-contribution",
      ],
    },
    {
      no: "04",
      title: "예약·선결제·환불·알림이 이어지는 고객 흐름을 구현했습니다",
      description: [
        "외부 결제와 내부 DB를 하나의 트랜잭션으로 가정하지 않고 요청·완료·보상 시점을 나눠 추적했습니다.",
        { text: "Stripe Checkout 선결제와 내부 거래 ID를 연결하고 예약 실패 시 결제 상태에 따라 취소·환불", source: "Memento AI · 결제" },
        { text: "환불 완료 뒤 마일리지·이용권을 변경하도록 처리 순서를 보완", source: "Memento AI · 상태 정합성" },
        { text: "다국어 알림톡·이메일 즉시/예약 발송과 Celery 작업 취소·재등록·발송 이력을 구현", source: "Memento AI · 알림" },
      ],
      claimIds: [
        "career.memento-fastapi-backend",
        "career.memento-stripe-prepayment",
        "career.memento-payment",
        "career.memento-happycall-survey",
      ],
    },
    {
      no: "05",
      title: "여러 제품을 같은 기준으로 개발할 수 있는 FastAPI 기반을 만들었습니다",
      description: [
        "기획·QA·디자인 담당자도 코딩 에이전트로 사내 프로그램을 구현하는 환경에서, 책임과 호출 순서를 해석하기 쉬운 조직 표준 템플릿을 직접 설계·구축했습니다.",
        { text: "Layered Architecture·Service Layer·Repository Pattern·DI로 책임과 의존 방향을 고정", source: "백엔드 템플릿 · 구조" },
        { text: "모든 계층에 session을 전달하는 반복을 없애고 @transactional·ContextVar·SessionProxy로 트랜잭션 정책과 현재 AsyncSession을 연결", source: "백엔드 템플릿 · 트랜잭션" },
        { text: "하위 태스크의 동일 세션 접근을 차단하고 취소 시 롤백·연결 정리를 통합 테스트로 검증", source: "백엔드 템플릿 · 비동기 세션" },
      ],
      claimIds: [
        "be-template.backend-standard",
        "be-template.fastapi-sqlalchemy-standard",
        "be-template.team-leverage",
        "be-template.agent-context",
      ],
    },
  ],
  workStyles: [],
  skills: [
    {
      label: "제품 백엔드",
      stack: "Python · FastAPI · SQLAlchemy 2.0 · PostgreSQL · MySQL",
      via: "제품 API·도메인 모델·트랜잭션·데이터 이전·관리 기능을 설계하고 운영",
      claimIds: ["thready.ai-service-boundary", "nexus.backend-architecture", "career.memento-fastapi-backend"],
    },
    {
      label: "비동기 / 실시간",
      stack: "RabbitMQ · TaskIQ · Celery · WebSocket · SSE",
      via: "자동 발주 알림의 상태·재시도·재발송과 실시간 상담의 sequence 기반 보정 반영을 처리",
      claimIds: ["centurion.bay-async-backend", "centurion.say-realtime-ai"],
    },
    {
      label: "AI 제품",
      stack: "독립 FastAPI AI 서비스 · LLM/STT 연동 · 구조화 출력",
      via: "제품 기준 데이터와 AI 실행 상태를 분리하고 생성·평가·실시간 상담 흐름을 제품에 연결",
      claimIds: ["thready.ai-service-boundary", "centurion.say-realtime-ai"],
    },
    {
      label: "외부 상태",
      stack: "Stripe Checkout/Webhook · SSO 세션 · 알림 작업",
      via: "결제·환불·권한·예약 발송의 요청과 완료 시점, 변경 이력, 복구 경로를 분리",
      claimIds: ["career.memento-stripe-prepayment", "career.memento-payment", "centurion.sso-session"],
    },
    {
      label: "개발 기준",
      stack: "pytest · Ruff · Pyright · Docker CI · ADR · 운영 절차서",
      via: "계층·의존성·트랜잭션·비동기 세션 규칙과 검증 명령을 템플릿과 문서로 제공",
      claimIds: ["be-template.backend-standard", "be-template.fastapi-sqlalchemy-standard", "be-template.agent-context"],
    },
  ],
  credentials: [
    { period: "2016.03\n- 2021.08", text: "우송대학교 게임멀티미디어 전공 · 졸업", claimIds: ["credentials.education"] },
    { period: "2024.01", text: "CES 2024 Best of Innovation · AI 부문 대상 제품 참여", claimIds: ["credentials.ces-2024"] },
    { period: "2022.11", text: "KCL AI 정확도 부문 인증 통과 제품 참여", claimIds: ["credentials.ai-accuracy-certification"] },
    { period: "2025.12", text: "특허 등록 「페이지 출력 방법」 · 등록 10-2898273", claimIds: ["credentials.page-output-patent"] },
    { period: "2021.09", text: "ADsP · 데이터분석 준전문가", claimIds: ["credentials.adsp"] },
  ],
} satisfies TailoredResume;
