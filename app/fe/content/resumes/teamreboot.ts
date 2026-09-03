import type { TailoredResume } from "./types";

export const TEAMREBOOT_RESUME = {
  slug: "teamreboot",
  companyName: "팀리부뜨",
  position: "AI-Native Engineer (Backend) (3년 이상)",
  status: "draft",
  visibility: "local",
  updatedAt: "2026-09-01",
  sectionOrder: ["profile", "outcomes", "career", "skills", "credentials"],
  header: {
    name: "김대정",
    role: "제품 개발 실무 4년 · Backend Engineer 3년차 · AI-Native Product Engineer",
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
      text: "가능성을 기회로 바꾸고, 제품으로 가치를 전하는 메이커 김대정입니다.",
      claimIds: [
        "thready.product-zero-to-one-contribution",
        "thready.subscription-revenue-band",
      ],
    },
    {
      text: "FastAPI 제품 백엔드와 별도 AI 서비스, 핵심 사용자 흐름을 직접 구현해 구독 매출이 발생하는 서비스로 출시·운영했습니다. 기획·QA·마케팅과 우선순위와 품질 기준을 정하고, AI·실시간·비동기 작업이 실패해도 상태를 확인하고 다시 처리할 수 있게 만들었습니다.",
      claimIds: [
        "thready.ai-service-boundary",
        "thready.ai-replica-outbox",
        "thready.provider-failure-continuity",
        "centurion.bay-async-backend",
        "centurion.say-realtime-ai",
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
          { text: " — 기획·QA·마케팅과 고객 문제·기능 우선순위를 정하고 제품 운영을 리드. FastAPI 백엔드·별도 AI 서비스·Next.js 핵심 흐름을 직접 구현해 구독 매출이 발생하는 제품으로 출시·운영" },
        ],
        [
          { text: "AI 실행·비동기 전달", tone: "strong" },
          { text: " — 제품 백엔드는 기준 데이터를, AI 서비스는 실행 상태를 관리하도록 애플리케이션·DB를 분리. Outbox로 중단·중복·역순 전달에 대응하고, 외부 AI 장애는 Sentry로 확인해 반복 오류 모델을 선택지에서 일시 제외" },
        ],
        [
          { text: "실시간 상담·주문/재고", tone: "strong" },
          { text: " — 완료 이벤트의 도착 순서가 보장되지 않는 STT 보정은 발화별 sequence로 반영. async FastAPI와 worker 실행 모델을 맞추기 위해 Celery 작업을 RabbitMQ·TaskIQ로 전환하고 재시도·최종 실패·수동 재발송을 주문 상태와 연결" },
        ],
        [
          { text: "FastAPI 개발 기준", tone: "strong" },
          { text: " — 모든 계층으로 session 인자를 넘기는 대신 Service가 @transactional로 트랜잭션 정책을 선언하도록 구성. ContextVar·SessionProxy로 현재 AsyncSession을 연결하고 하나의 트랜잭션을 하나의 asyncio task가 사용하도록 제한" },
        ],
        [
          { text: "Coding Agent 활용", tone: "strong" },
          { text: " — 코드베이스 분석·기능 목록화·반복 구현·검증에 활용하고, 아키텍처·테스트 통과 기준·배포 여부는 사람이 직접 결정. 주 1회 적용 결과·병목·재사용할 방법을 팀과 검토" },
        ],
      ],
      claimIds: [
        "career.medisolve-role-evolution",
        "thready.product-zero-to-one-contribution",
        "thready.subscription-revenue-band",
        "thready.frontend-product-delivery",
        "thready.ai-service-boundary",
        "thready.ai-replica-outbox",
        "thready.provider-failure-continuity",
        "thready.generation-quality-system",
        "thready.release-operation",
        "centurion.say-realtime-ai",
        "centurion.bay-async-backend",
        "centurion.async-migration",
        "be-template.backend-standard",
        "be-template.fastapi-sqlalchemy-standard",
        "be-template.team-leverage",
        "be-template.agent-context",
        "career.coding-agent-usage",
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
          { text: " — MediSolve AI 법인 설립 전 피부과 CRM 제품 개발을 선행하고 초기 백엔드와 개발 기준을 구축" },
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
          { text: " — FastAPI·SQLAlchemy·MySQL 기반 예약 API와 Stripe Checkout 선결제를 구현하고, 외부 결제 취소·환불과 내부 자산 변경 시점을 분리" },
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
          { text: " — PM 메인 역할로 prototype에서 v1.0까지 제품 흐름·기능 범위·출시 우선순위를 정하고 기업 PoC로 연결" },
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
      title: "고객의 콘텐츠 제작 문제를 구독 매출이 발생하는 AI 제품으로 만들었습니다",
      description: [
        "기획·QA·마케팅과 문제·우선순위·생성 품질 기준을 정하고, 출시와 운영까지 제품 흐름을 리드했습니다.",
        { text: "FastAPI 제품 백엔드와 별도 AI 애플리케이션·DB를 구축하고 인증된 HTTP 계약으로 연결", source: "Thready · 백엔드/AI" },
        { text: "생성·가져오기·예약·발행·성과 확인·관리 화면 등 Next.js 핵심 흐름을 직접 구현", source: "Thready · 제품 구현" },
        { text: "LLM 검수 이력과 사람의 라벨링 화면을 분리해 생성 품질 판단을 운영 데이터로 축적", source: "Thready · 품질 운영" },
        { text: "고객이 이용하고 구독료 매출이 발생하는 제품으로 운영", source: "Thready · 유료 운영" },
        { text: "백엔드 재구축 이후에도 배포·QA·운영을 지속적으로 담당", source: "Thready · 배포·운영" },
      ],
      claimIds: [
        "thready.product-zero-to-one-contribution",
        "thready.subscription-revenue-band",
        "thready.frontend-product-delivery",
        "thready.ai-service-boundary",
        "thready.generation-quality-system",
        "thready.labeling-corpus-workbench",
        "thready.release-operation",
      ],
    },
    {
      no: "02",
      title: "AI 실행과 실시간·비동기 작업을 추적하고 실패 뒤 복구할 수 있게 만들었습니다",
      description: [
        "작업마다 실패 방식이 달라 제품 데이터 전달·worker·WebSocket session에 각각 상태와 복구 방법을 두었습니다.",
        { text: "제품 변경과 Outbox를 같은 트랜잭션에 기록하고 작업 점유 시간·재시도·버전 검사·최종 실패 상태로 전달을 분리", source: "Thready · 전달·복구" },
        { text: "외부 AI 5xx를 재시도 가능한 실패로 분류하고 반복 장애는 Sentry로 확인해 문제 모델을 선택지에서 일시 제외, 사용자가 정상 모델로 작업을 계속할 수 있게 운영", source: "Thready · 모델 장애 대응" },
        { text: "async FastAPI와 worker 실행 모델을 맞추기 위해 Celery 작업을 RabbitMQ·TaskIQ로 전환하고 재시도·최종 실패·수동 재발송을 주문 상태와 연결", source: "Centurion · 주문 알림 worker" },
        { text: "완료 이벤트의 도착 순서가 보장되지 않아 DELTA·COMPLETE·CORRECTED를 같은 sequence로 묶고 늦은 보정이 다른 발화를 덮지 않게 처리", source: "Centurion · 실시간 상담" },
      ],
      claimIds: [
        "thready.ai-replica-outbox",
        "thready.provider-failure-continuity",
        "centurion.bay-async-backend",
        "centurion.async-migration",
        "centurion.say-realtime-ai",
      ],
    },
    {
      no: "03",
      title: "FastAPI에서 트랜잭션과 AsyncSession의 책임을 Service 계층에 두었습니다",
      description: [
        "모든 계층으로 session 인자를 넘기던 반복을 없애고, 업무를 시작하는 Service method가 트랜잭션 범위를 선언하도록 만들었습니다.",
        { text: "Layered Architecture·Service Layer·Repository Pattern·DI로 책임과 의존 방향을 고정", source: "Backend Template · Architecture" },
        { text: "@transactional로 기존 트랜잭션 참여(REQUIRED)·새 세션 분리(REQUIRES_NEW)·SAVEPOINT(NESTED)를 선언하고 ContextVar·SessionProxy로 현재 AsyncSession을 연결", source: "Backend Template · Transaction" },
        { text: "하나의 트랜잭션은 하나의 asyncio task와 AsyncSession이 사용하도록 제한하고 child-task 접근·취소 rollback·connection cleanup을 통합 테스트로 검증", source: "Backend Template · Async session" },
        { text: "같은 트랜잭션 안의 병렬 DB 작업은 제한되므로 task별 트랜잭션·데이터 가시성·복구 비용을 먼저 결정하도록 ADR·runbook에 기록", source: "Backend Template · Trade-off" },
      ],
      claimIds: [
        "be-template.backend-standard",
        "be-template.fastapi-sqlalchemy-standard",
        "be-template.team-leverage",
      ],
    },
    {
      no: "04",
      title: "외부 결제 결과와 내부 예약·자산 상태가 어긋나지 않게 처리했습니다",
      description: [
        "외부 결제와 로컬 DB를 하나의 트랜잭션으로 가정하지 않고 결제 요청·완료·취소·환불 뒤 내부 상태를 바꾸는 시점을 나눴습니다.",
        { text: "내부 결제 ID로 결제 이력과 Checkout·Webhook event를 연결하고 예약 실패 시 결제 상태에 따라 취소·환불", source: "Memento · Payment" },
        { text: "환불 완료 Webhook을 확인한 뒤 마일리지를 복원하고 이용권을 삭제하도록 변경 순서를 보완", source: "Memento · Consistency" },
        { text: "여러 서비스의 인증·세션 정책과 중복 로그인·E2E 검증을 담당", source: "Centurion · Auth/session" },
      ],
      claimIds: [
        "career.memento-fastapi-backend",
        "career.memento-stripe-prepayment",
        "career.memento-payment",
        "centurion.sso-session",
      ],
    },
    {
      no: "05",
      title: "Coding Agent로 분석과 반복 구현을 진행하고, 설계와 배포 기준은 직접 정했습니다",
      description: [
        "기존 동작과 새 백엔드를 비교할 검증 환경을 먼저 만들고, Coding Agent가 구현한 결과도 같은 기준을 통과해야 배포했습니다.",
        { text: "기존 API·기능을 목록화하고 기존·신규 응답을 비교하는 검증 기준을 먼저 구성", source: "Thready rebuild · Verification" },
        { text: "Claude Code·Codex를 코드베이스 분석·기능 목록화·반복 구현·검증에 활용해 백엔드 재구축을 총 36시간의 작업 시간 안에 완료", source: "Thready rebuild · Execution" },
        { text: "아키텍처·테스트 통과 기준·전환 시점은 직접 결정하고, 전환 전후 해결된 QA 항목의 reopen 비율이 37%에서 11%로 하락한 것을 확인", source: "Thready rebuild · Outcome" },
        { text: "주 1회 실제 활용 결과·작업 병목·새 방법을 다른 작업에 재사용할 수 있는지 팀과 검토", source: "Engineering workflow · Retrospective" },
      ],
      claimIds: [
        "career.coding-agent-usage",
        "career.weekly-role-based-agent-retrospective",
        "be-template.agent-context",
        "thready.rebuild-decision-execution",
        "thready.qa-reopen-reduction",
      ],
    },
  ],
  workStyles: [],
  skills: [
    {
      label: "제품 백엔드",
      stack: "Python · FastAPI · SQLAlchemy 2.0 · PostgreSQL · MySQL · Redis",
      via: "제품 API·도메인 모델·트랜잭션·데이터 이전·관리 기능을 설계하고 운영",
      claimIds: ["thready.backend-rebuild", "career.memento-fastapi-backend"],
    },
    {
      label: "비동기 / 실시간",
      stack: "RabbitMQ · TaskIQ · Celery · WebSocket · SSE",
      via: "AI·알림 작업의 재시도·최종 실패·수동 복구와 실시간 세션 종료·재연결을 처리",
      claimIds: [
        "thready.ai-replica-outbox",
        "centurion.bay-async-backend",
        "centurion.say-realtime-ai",
      ],
    },
    {
      label: "AI 제품",
      stack: "별도 FastAPI AI 서비스 · LLM/STT 연동 · 구조화 출력 · LLM 평가",
      via: "제품의 기준 데이터와 AI 실행 상태를 나누고 외부 모델 장애를 격리해 생성·평가·실시간 상담을 운영",
      claimIds: [
        "thready.ai-service-boundary",
        "thready.provider-failure-continuity",
        "thready.generation-quality-system",
        "centurion.say-realtime-ai",
      ],
    },
    {
      label: "인증 / 결제",
      stack: "SSO session · Stripe Checkout/Webhook · 예약 알림",
      via: "외부 결제와 내부 상태의 완료 시점·보상·변경 이력·복구 경로를 분리",
      claimIds: [
        "career.memento-stripe-prepayment",
        "career.memento-payment",
        "centurion.sso-session",
      ],
    },
    {
      label: "검증 / 전달",
      stack: "pytest · Ruff · Pyright · Docker · GitHub Actions · ADR · runbook",
      via: "Coding Agent가 같은 작업 문서·테스트 기준을 읽게 하고 사람의 검토 뒤 배포",
      claimIds: [
        "be-template.backend-standard",
        "be-template.agent-context",
        "career.coding-agent-usage",
      ],
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
