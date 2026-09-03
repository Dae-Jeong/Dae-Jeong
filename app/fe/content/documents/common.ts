import type { CareerDescriptionDocument, CvDocument } from "./types";

const CONTACTS = [
  { label: "marin.backend@gmail.com", href: "mailto:marin.backend@gmail.com" },
  { label: "github.com/Dae-Jeong", href: "https://github.com/Dae-Jeong", external: true },
  { label: "marinkim.xyz", href: "https://marinkim.xyz", external: true },
] as const;

const MEDISOLVE_COMPANY = {
  id: "medisolve-ai",
  organization: "MediSolve AI",
  period: "2025.04 — 현재 · 더데이랩스 프리랜서 2025.02 — 2025.04",
  role: "Tech Lead · Backend Engineer",
  summary:
    "제품별 일정·이슈·릴리스 운영을 리드하면서 Backend·AI application을 직접 구현하고 핵심 화면은 coding agent로 완성했습니다. 회사 AX 구조에는 설계로 참여했고, 실행 기반인 Backend Template은 직접 구축했습니다.",
  claimIds: [
    "career.medisolve-role-evolution",
    "career.thedaylabs-freelance",
    "career.memento-to-medisolve-early-member",
  ],
  projects: [
    {
      id: "thready-paid-product",
      title: "Thready · Threads 콘텐츠 제작을 유료 AI 제품으로 전환",
      context: "아이디어 제안 이후 제품 판단·Backend·AI application·핵심 화면·출시 운영",
      role: "제품 운영 리드 · Backend/AI 직접 구현 · 핵심 화면은 coding agent로 완성",
      problem:
        "Threads를 시작하거나 다른 SNS와 병행하기 어려운 사용자가 소재 탐색부터 글 작성·수정·예약·발행까지 반복해서 수행해야 했습니다.",
      decision:
        "완전 자동 작성보다 탐색·초안·검수·발행을 하나의 제품 흐름으로 묶고, 최종 선택은 사람이 유지하는 방향을 택했습니다.",
      implementation: [
        "FastAPI 제품 API와 별도 AI application·DB를 인증된 HTTP 경계로 분리했습니다.",
        "소재 탐색·글 생성·수정·예약·발행·품질 라벨링의 주요 화면을 coding agent로 구현하고 직접 검수·배포했습니다.",
        "typed prompt builder·LLM judge·사람 라벨링을 분리해 생성 결과의 평가 이력을 남겼습니다.",
      ],
      verification: [
        "release·QA·task 기준으로 기능을 운영하고 실제 사용자 흐름에서 회귀를 확인했습니다.",
        "외부 AI 5xx는 Sentry에서 확인하고 반복 실패 모델만 일시 제외해 다른 모델로 작업을 이어가게 했습니다.",
      ],
      result: "팀과 함께 실제 고객이 구독료를 내고 사용하는 제품으로 출시·운영했습니다.",
      boundary: "매출은 팀·제품의 결과이며, 제 기여는 아이디어 제안과 prototype 이후 Backend·AI·핵심 화면 구현과 운영 리드입니다.",
      claimIds: [
        "thready.product-zero-to-one-contribution",
        "thready.subscription-revenue-band",
        "thready.frontend-product-delivery",
        "thready.ai-service-boundary",
        "thready.generation-quality-system",
        "thready.labeling-corpus-workbench",
        "thready.provider-failure-continuity",
      ],
    },
    {
      id: "thready-backend-rebuild",
      title: "Thready · 운영 전환을 위한 FastAPI Backend 재구축",
      context: "기존 frontend contract를 유지한 병렬 재구축과 단계적 전환",
      role: "대안 비교·설계·구현·검증·전환 판단 직접 수행",
      problem:
        "검증에 유리했던 초기 Backend의 domain 의존성과 회귀 위험이 커져 제품 기능을 이어가면서 구조를 바꿔야 했습니다.",
      decision:
        "부분 수정을 누적하는 안과 Backend만 병렬 재구축하는 안을 비교하고, 서비스 규모와 AI module 확장 시점을 고려해 병렬 재구축을 선택했습니다.",
      implementation: [
        "API·기능 inventory와 응답 비교 기준을 먼저 만들고 기존 frontend contract를 유지했습니다.",
        "domain·repository·transaction 책임을 분리하고 전환 단위를 release로 관리했습니다.",
      ],
      verification: [
        "동일 기능 비교와 QA acceptance를 통과한 범위만 전환했습니다.",
        "전환 이후 실제 사용자가 쓰는 Backend를 계속 개발·운영했습니다.",
      ],
      result: "같은 기준의 Jira 집계에서 해결된 QA 이슈 재오픈 비율이 37%에서 11%로, 재발 발생이 하루 4.5건에서 0.3건으로 낮아졌고, 전환 이후 실제 사용자가 쓰는 Backend를 계속 운영했습니다.",
      claimIds: [
        "thready.rebuild-decision-execution",
        "thready.backend-rebuild",
        "thready.qa-reopen-reduction",
        "thready.production-operation-quality",
      ],
    },
    {
      id: "centurion-async-realtime",
      title: "Centurion · 주문 후속 작업과 실시간 상담의 실패 경계",
      context: "주문 worker의 실패 승격과 실시간 상담 runtime의 순서 보장·지연 병목 실측",
      role: "BAY 비동기 Backend 직접 구축 · SAY 실시간 상담 안정화 공동 수행",
      problem:
        "주문 transaction 이후의 외부 알림은 별도로 실패할 수 있었고, 실시간 상담에서는 delta 순서와 complete 도착 순서가 달라 문맥이 바뀔 수 있었습니다.",
      decision:
        "요청 성공과 후속 작업 성공을 분리하고, 복구 가능한 상태와 상담 발화의 순서 기준을 명시했습니다.",
      implementation: [
        "RabbitMQ·TaskIQ worker에 상태·retry·최종 실패·수동 재처리 기준을 연결했습니다.",
        "상담 세션의 VAD·DELTA·COMPLETE·CORRECTED를 같은 순서 번호로 묶고 중복과 종료 후 재연결을 제어했습니다.",
        "외부 음성 모델 세션이 발화 중 끊기는 문제를 겹치는 세션 풀과 sequence 병합으로 순서를 보장하며 흡수했고, 모델 교체 뒤 우회 코드를 걷어냈습니다.",
      ],
      verification: [
        "주문·재고 API와 worker를 분리해 실패 작업을 다시 찾고 처리할 수 있게 했습니다.",
        "VAD silence 200·350·500ms E2E에서 P50 차이가 작고 모델 추론이 약 80%임을 실측해 VAD tuning이 병목이 아님을 확인하고 DELTA 조기 trigger에 집중했습니다.",
        "종료 뒤 재연결되던 경합 경로를 재현해 13개 focused regression으로 고정했고, 실시간 상담 회귀 테스트에서 발화 문맥과 완료 순서를 대조했습니다.",
      ],
      result: "API 성공 뒤 실패를 숨기지 않고 운영자가 복구 지점을 확인할 수 있는 흐름을 만들었습니다.",
      boundary: "주문 worker는 주도, 실시간 상담은 공동 주 기여이며 두 runtime을 하나의 시스템처럼 합치지 않습니다.",
      claimIds: [
        "centurion.bay-async-backend",
        "centurion.async-migration",
        "centurion.test-ci-foundation",
        "centurion.say-realtime-ai",
        "centurion.sso-session",
      ],
    },
    {
      id: "backend-template",
      title: "Backend Template · Coding Agent가 따를 FastAPI 기본값",
      context: "백엔드 경험이 적은 담당자도 운영 제품 기능을 만들 수 있는 공통 기준",
      role: "Template 직접 설계·구축 · 팀 피드백 반영 · 도입 지원",
      problem:
        "Agent가 만든 코드는 Local에서 정상처럼 보여도 STG QA에서 DB session 미반납·connection pool 고갈·반복 500으로 드러났고 Backend 담당자의 재검토가 반복됐습니다.",
      decision:
        "기능마다 완벽한 구조를 요구하기보다, 반복 실패를 막는 session·transaction·API contract를 기본값으로 제공했습니다. 일반 기능은 MVC, tool 확장이 많은 Agent 기능은 Hexagonal 경계를 권장했습니다.",
      implementation: [
        "@transactional decorator와 ContextVar 기반 AsyncSession resolve를 구현했습니다.",
        "폴더·책임·API 응답·검증 규칙과 Agent context를 Template에 함께 넣었습니다.",
      ],
      verification: [
        "정기 개발 미팅에서 구조화 비용과 패턴 선택 기준을 피드백 받아 구현에 반영했습니다.",
        "신규 사내 프로그램은 Full Template으로 시작했고 기존 제품은 session 관리부터 순차 도입했습니다.",
      ],
      result: "Full Template을 적용한 신규 프로그램의 STG QA에서는 같은 session 미반납·connection pool 고갈 문제가 다시 관측되지 않았고, 기획·QA·디자인 담당자가 coding agent와 Template으로 직접 구현하며 Backend는 결과 피드백과 배포 지원으로 개입 범위가 줄었습니다.",
      boundary: "Template의 설계·구축은 직접 했고 각 기능 구현은 담당자의 몫이었으며, 회사 AX 전체 구현과는 구분합니다.",
      claimIds: [
        "be-template.backend-standard",
        "be-template.fastapi-sqlalchemy-standard",
        "be-template.team-leverage",
        "be-template.agent-context",
      ],
    },
    {
      id: "thready-ai-runtime",
      title: "Thready · 제품 원장과 AI 실행 상태의 분리·Outbox 전달",
      context: "AI 실행부의 독립 application·DB 분리, STG 실데이터 이관, 전달 보장·멱등 소비·정합 검증",
      role: "경계 설계·구현·migration·검증 직접 수행",
      problem:
        "제품 정책·원장과 AI 생성 lifecycle이 한 Backend·DB에 있어 AI 확장과 장애가 원장에 결합됐고, 분리 뒤에는 전달 유실과 역순 도착이 최신 상태를 덮을 수 있었습니다.",
      decision:
        "DB를 공유하지 않고 독립 FastAPI application·DB로 분리해 인증된 HTTP 계약으로만 연결하고, 전달은 원장 변경과 같은 transaction에 기록하는 Transactional Outbox로 분리했습니다.",
      implementation: [
        "lease 기반 claim·attempt token·retry·delivery version fence·멱등 consumer·terminal failure 보존을 구현했습니다.",
        "STG 생성 이력 2,616건·품질 기록 795건·실행 추적 7,111건을 parent→child 순서로 이관했습니다.",
        "생성 원장은 version CAS로 다중 worker 경합을 중재하고 상태 전이 규칙을 entity에 복원했으며, quota는 예약과 admission gate로 동시 요청의 초과 실행을 막았습니다.",
      ],
      verification: [
        "local rehearsal·행 수·MD5 fingerprint·FK orphan 0건으로 이관 정합성을 확인했습니다.",
        "workflow·health가 성공해도 생성이 실패한 사례를 계기로 배포 성공과 기능 동작을 분리한 post-deploy 생성 API E2E gate를 세웠습니다.",
      ],
      result: "독립 AI application·DB를 STG·Prod에서 운영 중이며, 지연·중복·역순 전달이 최신 원장 상태를 덮지 않는 복구 경계를 확보했습니다.",
      boundary: "Prod migration 완료나 무중단 전환은 주장하지 않습니다.",
      claimIds: [
        "thready.ai-service-boundary",
        "thready.ai-service-migration",
        "thready.ai-replica-outbox",
        "thready.generation-aggregate-optimistic-lock",
        "thready.generation-quota-admission",
      ],
    },
    {
      id: "nexus-external-product",
      title: "여러 피부과의 운영·예약 Backend와 지점 접근 경계",
      context: "외부 피부과 여러 곳의 홈페이지·관리·예약을 지원하는 multi-tenant backend monorepo (진행 중)",
      role: "Backend architecture·Admin/Homepage API 구축 주도 · Terraform IaC 전담",
      problem:
        "여러 피부과의 운영·예약을 한 Backend가 지원해야 했고, client가 보내는 header가 tenant 접근 범위를 결정하던 구조가 격리의 failure mode였습니다.",
      decision:
        "Admin·Homepage API를 gateway 뒤 독립 모듈로 나누고, working branch를 server auth state로 소유해 권한 검증 전용 API로만 전환하되 Homepage API의 기존 계약은 유지했습니다.",
      implementation: [
        "Router–Service–Repository–Model과 DI, Generic Repository, multi-tenancy·soft delete 자동 필터를 구성했습니다.",
        "본사 미선택 409·권한 밖 403을 구분하고 Ruff·Pyright·pre-commit 정적 검증과 API·DB 설계 가이드를 구축했습니다.",
      ],
      verification: [
        "shared auth middleware와 Homepage API 계약을 유지한 채 Admin API 범위에서 접근 경계를 전환했습니다.",
      ],
      result: "제품은 예약률 개선으로 고객사 매출 성과에 기여했고, tenant 접근 범위가 server 상태로 결정되는 경계로 전환하고 있습니다.",
      boundary: "2026-08 기준 진행 중이며 예약률·매출은 제품·팀 outcome입니다.",
      claimIds: [
        "nexus.backend-architecture",
        "nexus.admin-backend-ownership",
        "nexus.branch-access-boundary",
        "nexus.quality-automation",
        "nexus.terraform-infra",
        "nexus.hospital-operations-revenue-contribution",
      ],
    },
  ],
} as const;

export const COMMON_CAREER_DESCRIPTION: CareerDescriptionDocument = {
  kind: "career-description",
  slug: "common",
  status: "review-ready",
  visibility: "local",
  locale: "ko",
  updatedAt: "2026-09-01",
  title: "경력기술서",
  subtitle: "제품 판단을 운영 가능한 Backend와 AI 기능으로 연결해 온 경험",
  name: "김대정",
  role: "Tech Lead · Backend Engineer · 실무 4년차",
  contacts: CONTACTS,
  summary: [
    "고객이 돈을 내는 이유를 찾고, 제품 판단부터 구현·출시·운영까지 연결해 왔습니다.",
    "Python·FastAPI를 중심으로 API·transaction·비동기 worker·AI runtime을 구축하며, 실패를 확인하고 복구할 수 있는 운영 경계를 함께 만듭니다.",
  ],
  companies: [
    MEDISOLVE_COMPANY,
    {
      id: "memento-ai",
      organization: "Memento AI",
      period: "2024.10 — 2025.01",
      role: "Backend Engineer",
      summary: "예약·결제·고객 알림 Backend를 구현했습니다. 회사 폐업으로 경력이 종료됐습니다.",
      claimIds: ["career.memento-fastapi-backend", "career.memento-payment"],
      projects: [
        {
          id: "memento-reservation-payment",
          title: "예약·결제·고객 알림 Backend",
          context: "FastAPI·SQLAlchemy·MySQL 기반 예약 서비스",
          role: "예약 API·외부 결제·알림 작업 구현",
          problem: "외부 결제 결과와 내부 예약 자산 변경이 한 번에 성공하지 않을 수 있었습니다.",
          decision: "결제 취소·환불과 내부 상태 변경 시점을 분리해 실패 지점을 확인할 수 있게 했습니다.",
          implementation: [
            "예약 API와 외부 결제를 연동하고 결제 상태에 따라 내부 자산 변경을 제어했습니다.",
            "다국어 알림의 즉시·예약 발송과 작업 취소·재등록·발송 이력을 구현했습니다.",
          ],
          verification: ["결제·예약·알림 상태를 분리해 실패 시 재처리 범위를 확인했습니다."],
          result: "예약과 결제, 후속 알림의 책임을 나눠 운영 가능한 상태 흐름을 만들었습니다.",
          claimIds: [
            "career.memento-fastapi-backend",
            "career.memento-payment",
            "career.memento-stripe-prepayment",
            "career.memento-happycall-survey",
          ],
        },
      ],
    },
    {
      id: "studio-lab",
      organization: "STUDIO LAB",
      period: "2021.12 — 2024.01",
      role: "Vision AI Engineer → Product Manager → Backend Engineer",
      summary: "AI 모델에서 시작해 제품 기획과 Backend까지 역할을 넓히며 생성형 AI 커머스 제품을 만들었습니다.",
      claimIds: ["career.ai-pm-backend-continuity"],
      projects: [
        {
          id: "sellercanvas",
          title: "SellerCanvas · 생성형 AI 커머스 제품",
          context: "prototype에서 v1.0과 외부 기업 PoC까지 발전",
          role: "PM 중심 · AI/Backend 경험을 바탕으로 제품 범위와 출시 우선순위 결정",
          problem: "AI 기능을 데모가 아니라 실제 업무 흐름에서 쓸 수 있는 제품으로 구체화해야 했습니다.",
          decision: "사용자 흐름과 기능 범위를 먼저 정하고 모델·Backend·화면을 제품 단위로 연결했습니다.",
          implementation: ["프로토타입의 기능 범위를 정리하고 v1.0 제품과 기업 PoC로 확장했습니다."],
          verification: ["사용 시나리오와 PoC 요구를 기준으로 기능 범위와 우선순위를 조정했습니다."],
          result: "CES 2024 Best of Innovation AI 부문 대상 제품에 참여했습니다.",
          boundary: "회사·팀 제품 성과이며 개인 단독 수상으로 표현하지 않습니다.",
          claimIds: [
            "career.ai-pm-backend-continuity",
            "career.sellercanvas-product-system",
            "career.sellercanvas-enterprise-poc",
            "credentials.ces-2024",
          ],
        },
      ],
    },
    {
      id: "tellingme",
      organization: "TellingMe · 개인 프로젝트",
      period: "2024.01 — 2024.12",
      role: "Backend Lead · Infra",
      summary: "Memento AI 재직 기간과 일부 겹치는 개인 프로젝트이며 정규 경력과 분리해 기록합니다.",
      claimIds: ["career.tellingme-backend-infra"],
      projects: [
        {
          id: "tellingme-backend",
          title: "TellingMe · 개인 프로젝트 Backend",
          context: "Spring Boot Backend와 AWS 배포",
          role: "Backend Lead · Infra",
          problem: "개인 프로젝트의 API와 배포 환경을 한 흐름으로 운영해야 했습니다.",
          decision: "Spring Boot Backend와 AWS 기반 배포 구성을 함께 맡았습니다.",
          implementation: ["Backend API 개발과 서비스 배포 환경을 구성했습니다."],
          verification: ["개인 프로젝트의 운영 범위에서 배포와 기본 운영을 확인했습니다."],
          result: "제품 Backend와 배포를 함께 맡은 개인 프로젝트 경험을 확보했습니다.",
          boundary: "정규 경력이 아니며 개인 프로젝트로만 표기합니다.",
          claimIds: ["career.tellingme-backend-infra"],
        },
      ],
    },
    {
      id: "eyesol",
      organization: "아이즈솔",
      period: "2020.08 — 2021.06",
      role: "Vision AI Engineer · Intern",
      summary: "Vision AI 모델과 데이터 파이프라인을 제품 기능으로 연결하는 개발·검증에 참여했습니다.",
      claimIds: ["career.ai-pm-backend-continuity"],
      projects: [],
    },
  ],
  skills: [
    { label: "Backend", value: "Python · FastAPI · PostgreSQL · MySQL · Redis · SQLAlchemy" },
    { label: "Async / Realtime", value: "RabbitMQ · TaskIQ · WebSocket · SSE · STT" },
    { label: "AI Product", value: "LLM integration · typed prompt · structured output · evaluation · labeling" },
    { label: "Delivery", value: "Docker · GitHub Actions · Azure · Terraform · AWS" },
  ],
};

export const COMMON_CV: CvDocument = {
  kind: "cv",
  slug: "common",
  status: "review-ready",
  visibility: "local",
  locale: "ko",
  updatedAt: "2026-09-01",
  title: "Curriculum Vitae",
  name: "김대정",
  role: "Tech Lead · Backend Engineer · 실무 4년차",
  contacts: CONTACTS,
  summary:
    "Vision AI Engineer와 Product Manager를 거쳐 Backend Engineer로 역할을 넓혔습니다. 현재는 유료 AI 제품의 제품 운영과 FastAPI Backend·AI application을 함께 맡고 있습니다.",
  employment: [
    {
      organization: "MediSolve AI",
      period: "2025.04 — 현재",
      role: "Tech Lead · Backend Engineer",
      highlights: ["Thready 유료 AI 제품 운영", "Centurion Backend", "NEXUS Backend", "FastAPI Backend Template"],
      claimIds: ["career.medisolve-role-evolution"],
    },
    {
      organization: "더데이랩스",
      period: "2025.02 — 2025.04",
      role: "Backend Engineer · Freelance",
      highlights: ["MediSolve AI 법인 설립 전 Centurion 선행 개발"],
      claimIds: ["career.thedaylabs-freelance"],
    },
    {
      organization: "Memento AI",
      period: "2024.10 — 2025.01",
      role: "Backend Engineer",
      highlights: ["예약·결제 API", "고객 알림 작업"],
      claimIds: ["career.memento-fastapi-backend", "career.memento-payment"],
    },
    {
      organization: "STUDIO LAB",
      period: "2021.12 — 2024.01",
      role: "Vision AI Engineer → Product Manager → Backend Engineer",
      highlights: ["SellerCanvas 제품 시스템", "외부 기업 PoC"],
      claimIds: ["career.ai-pm-backend-continuity", "career.sellercanvas-product-system"],
    },
    {
      organization: "아이즈솔",
      period: "2020.08 — 2021.06",
      role: "Vision AI Engineer · Intern",
      highlights: ["Vision AI 모델·데이터 파이프라인 개발·검증 참여"],
      claimIds: ["career.ai-pm-backend-continuity"],
    },
  ],
  projects: [
    {
      title: "Thready",
      description: "Threads 콘텐츠 탐색·생성·검수·예약·발행을 연결한 유료 AI 제품",
      claimIds: ["thready.product-zero-to-one-contribution", "thready.subscription-revenue-band"],
    },
    {
      title: "Centurion",
      description: "의료 CRM·ERP의 주문·재고 비동기 Backend와 실시간 AI 상담",
      claimIds: ["centurion.bay-async-backend", "centurion.say-realtime-ai"],
    },
    {
      title: "Backend Template",
      description: "FastAPI·SQLAlchemy async의 session·transaction·API contract 기본값",
      claimIds: ["be-template.backend-standard", "be-template.fastapi-sqlalchemy-standard"],
    },
    {
      title: "TellingMe",
      description: "개인 프로젝트 Backend Lead · Spring Boot Backend와 AWS 배포",
      claimIds: ["career.tellingme-backend-infra"],
    },
  ],
  skills: [
    { label: "Language / Framework", value: "Python · FastAPI · TypeScript · NestJS · Java · Spring Boot" },
    { label: "Data / Messaging", value: "PostgreSQL · MySQL · Redis · RabbitMQ · TaskIQ" },
    { label: "AI / Realtime", value: "LLM integration/evaluation · structured output · WebSocket · SSE · STT" },
    { label: "Cloud / Delivery", value: "Docker · GitHub Actions · Azure · Terraform · AWS" },
  ],
  education: ["우송대학교 게임멀티미디어 전공 · 2016.03 — 2021.08"],
  credentials: [
    "CES 2024 Best of Innovation · AI 부문 대상 제품 참여",
    "특허 등록 · 페이지 출력 방법 · 10-2898273",
    "KCL AI 정확도 부문 인증 통과 제품 참여",
    "ADsP · 2021.09",
  ],
};

export { MEDISOLVE_COMPANY };
