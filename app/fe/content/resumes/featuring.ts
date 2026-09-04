import type { TailoredResume } from "./types";

// 문안 owner: wiki/products/resume/tailored/featuring/2026-08-31_wanted_backend-engineer/content-draft.md
// 2026-09-03 v2 정본화: 이력서=판단·결과, 기전·검증은 경력기술서. 코드명 제거, 화면은 coding agent. (2026-09-02 개정: wiki/rules/application-copy-standard.md 적용 (헤더 공고 직무명 우선, 15초 소개,
// reopen 수치 복원, 블록 D·F 추가, 경계 종결 문장 제거). 블록 원형: products/resume/resume-block-library.md
export const FEATURING_RESUME = {
  slug: "featuring",
  companyName: "피처링",
  position: "[프로덕트] 백엔드 개발 엔지니어",
  status: "draft",
  visibility: "local",
  updatedAt: "2026-09-03",
  printFlow: "compact",
  sectionOrder: [
    "profile",
    "outcomes",
    "career",
    "skills",
    "externalActivities",
    "credentials",
  ],
  header: {
    name: "김대정",
    role: "Backend Engineer · Tech Lead",
    photoSrc: "/profile/daejeong-profile-v2.png",
    careerLine: [
      { text: "실무 4년차", tone: "strong" },
      { text: " · MediSolve AI (2025.04 — 현재)" },
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
      text: "가능성을 기회로 바꾸고, 제품으로 가치를 전하는 메이커 김대정입니다.",
      claimIds: ["career.medisolve-role-evolution", "thready.product-zero-to-one-contribution", "career.ai-pm-backend-continuity", "career.sellercanvas-product-system"],
    },
    {
      text: "기획자로 시작해 백엔드로 왔고, 아이디어를 제안한 AI 콘텐츠 제품의 FastAPI 백엔드와 AI 실행부를 직접 만들어 월 1천만원 수준의 구독 매출이 발생하는 제품으로 운영합니다. AI 활용이 본격화되면서 모두가 메이커로 제품을 만들고 운영하는 팀에서, 백엔드 경험이 적은 팀원도 같은 기준으로 만들 수 있게 FastAPI 표준 template과 transaction·session 경계를 직접 구축했습니다.",
      claimIds: [
        "thready.product-zero-to-one-contribution",
        "thready.subscription-revenue-band",
        "thready.frontend-product-delivery",
        "thready.threads-market-outcome-design",
        "thready.labeling-corpus-workbench",
        "be-template.fastapi-sqlalchemy-standard",
        "be-template.team-leverage",
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
        { text: " · Backend Engineer" },
      ],
      details: [
        "합류 경로 — 초기 멤버로 영입. 법인 설립 전 더데이랩스 프리랜서 기간(2025.02–04)에 피부과 CRM 초기 backend·개발 기준을 선행 구축한 뒤 2025.04 정규 합류",
        [{ text: "Thready", tone: "strong" }, { text: " — 아이디어 제안 · 제품 운영 리드 · FastAPI backend·AI 생성/평가 직접 구현 · 핵심 화면은 coding agent로 완성 · 고객이 구독하는 제품으로 출시" }],
        [{ text: "backend 재구축·AI 실행부 분리", tone: "strong" }, { text: " — prototype backend를 FastAPI로 병렬 재구축해 전환, 독립 AI application·DB 분리와 Transactional Outbox 전달 경계, 실사용 backend 운영 전담" }],
        [{ text: "SNS 데이터", tone: "strong" }, { text: " — Threads 관측 데이터의 outcome 기준 설계, corpus 멱등 importer·사람 평가 workbench 구축" }],
        [{ text: "피부과 운영 제품군 backend", tone: "strong" }, { text: " — 주문·재고 worker 복구 경계, 여러 지점 운영·예약 backend 구축 주도, 실시간 상담 runtime 안정화 공동 수행" }],
        [{ text: "조직 표준", tone: "strong" }, { text: " — transaction·session 기준을 FastAPI template으로, 요구사항별 evidence로 닫는 QA 판정 규칙 설계" }],
      ],
      claimIds: [
        "career.medisolve-role-evolution",
        "career.thedaylabs-freelance",
        "career.memento-to-medisolve-early-member",
        "thready.product-zero-to-one-contribution",
        "thready.subscription-revenue-band",
        "thready.frontend-product-delivery",
        "thready.backend-rebuild",
        "thready.rebuild-decision-execution",
        "thready.qa-reopen-reduction",
        "thready.prototype-to-user-operation",
        "thready.threads-market-outcome-design",
        "thready.labeling-corpus-workbench",
        "thready.ai-service-boundary",
        "thready.ai-service-migration",
        "thready.ai-replica-outbox",
        "nexus.backend-architecture",
        "nexus.admin-backend-ownership",
        "nexus.branch-access-boundary",
        "centurion.msa-platform-context",
        "centurion.bay-async-backend",
        "centurion.async-migration",
        "be-template.backend-standard",
        "be-template.fastapi-sqlalchemy-standard",
        "be-template.team-leverage",
      ],
    },
    {
      org: "Memento AI",
      period: "2024.10 — 2025.01",
      role: [
        { text: "Backend Engineer", tone: "strong" },
        { text: " — 인턴 합류 후 정규직 전환 · 회사 폐업으로 종료" },
      ],
      details: [
        [
          { text: "예약·결제", tone: "strong" },
          {
            text: " — FastAPI·SQLAlchemy·MySQL 기반 예약·결제 API와 Stripe Checkout manual-capture 선결제를 구현하고, 예약 실패 시 PaymentIntent 상태에 따라 cancel/refund하는 provider-side 보상과 환불 완료 시점의 마일리지·이용권 상태 전이로 정합성 보완",
          },
        ],
        [
          { text: "고객 알림", tone: "strong" },
          {
            text: " — 다국어 알림톡·이메일 즉시/예약 발송, Celery ETA 작업 취소·재등록·발송 이력 구현",
          },
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
        { text: " — AI Engineer → PM(주 역할) → Backend Engineer" },
      ],
      details: [
        "생성형 AI 커머스 콘텐츠 제품(CES 2024 Best of Innovation, AI 부문)을 PM 메인 역할로 prototype에서 v1.0까지 세우고 외부 패션 브랜드 PoC로 연결, 상세페이지 제작 flow 재설계가 특허 「페이지 출력 방법」 등록으로 이어짐",
        "AI Engineer 구간에서 Vision AI 기반 의류 이미지 분석 모델 개발에 참여",
      ],
      claimIds: [
        "career.sellercanvas-product-system",
        "career.sellercanvas-enterprise-poc",
        "career.sellercanvas-vision-model-development",
        "career.ai-pm-backend-continuity",
        "credentials.page-output-patent",
        "credentials.ces-2024",
      ],
    },
    {
      org: "아이즈솔",
      period: "2020.08 — 2021.06",
      role: [
        { text: "Vision AI Engineer", tone: "strong" },
        { text: " · 인턴" },
      ],
      details: ["안면 인식 기반 자동 출결 시스템의 인식 모델·데이터 파이프라인 개발에 참여"],
      claimIds: ["career.ai-pm-backend-continuity"],
    },
  ],
  outcomes: [
    {
      no: "01",
      title: "SNS 관측 데이터를 성과 기준과 재적재해도 같은 결과가 나오는 멱등 평가 workflow로 바꿨습니다",
      description: [
        "반응이 좋은 콘텐츠를 임계값 하나로 정의하기 어려웠고, 게시물의 최신 상태·반복 관측·원문·사람 평가가 서로 다른 생명주기를 가졌습니다.",
        {
          text: "URL별 최신 상태와 시계열 관측을 분리하고 절대·저자 상대·도메인 상대 등 5개 outcome 후보를 병렬로 설계했습니다. 품질 판정은 자동 게이트·실측 분포·사람 판정 3층으로 나눴습니다.",
          source: "Thready · 데이터",
        },
        {
          text: [
            { text: "독립 labeling schema와 typed batch·source key upsert의 멱등 importer, 1~10점·사유·진행률을 남기는 평가 workbench를 구축해 " },
            { text: "전체·증분 재적재에서 건수 불변과 기존 라벨 보존", tone: "metric" },
            { text: "을 확인했습니다. 감에 의존하던 글쓰기 기준은 실측 corpus 기반으로 바뀌었습니다." },
          ],
          source: "Thready · 데이터",
        },
      ],
      claimIds: [
        "thready.threads-marketing-criteria",
        "thready.threads-market-outcome-design",
        "thready.labeling-corpus-workbench",
        "thready.quality-criteria-system",
        "thready.corpus-measurement",
        "thready.measurement-correction",
      ],
    },
    {
      no: "02",
      title: "규칙을 먼저 설계한 뒤 돌아가는 제품을 멈추지 않고 backend를 교체했고, 결함 재발이 약 94% 줄었습니다",
      description: [
        "빠른 검증 중심으로 만들어진 초기 backend는 도메인 의존성이 얽혀 회원 로직 변경이 AI 생성 중단으로 이어졌고, 해결된 QA 이슈가 같은 영역에서 다른 형태로 재발했습니다.",
        {
          text: "부분 수정과 backend만 병렬 재구축하는 안을 비교해, 서비스가 작고 AI 확장이 예정된 시점이라 재구축을 택하되 기존 frontend와 릴리스 흐름은 유지했습니다. 패턴·계층·검증 하네스를 먼저 세우고 그 위에서 새 backend를 나란히 만들어 응답을 비교한 뒤 전환했습니다.",
          source: "Thready",
        },
        {
          text: [
            { text: "같은 기준의 Jira 집계에서 해결된 QA 이슈 재오픈 비율 " },
            { text: "37% → 11%", tone: "metric" },
            { text: ", 재발 발생 일평균 " },
            { text: "약 94% 감소", tone: "metric" },
            { text: "(하루 4.5건 → 0.3건). 전환 뒤 실제 사용자가 쓰는 제품의 backend 배포·QA·운영을 계속 전담하고 있습니다." },
          ],
          source: "Thready · Jira",
        },
      ],
      claimIds: [
        "thready.rebuild-decision-execution",
        "thready.backend-rebuild",
        "thready.prototype-to-user-operation",
        "thready.qa-reopen-reduction",
        "thready.release-operation",
        "career.coding-agent-usage",
      ],
    },
    {
      no: "03",
      title: "실패를 숨기지 않고 순서를 보장하는 service·worker·transaction 기준을 만들어 신규 service가 같은 곳에서 시작하게 했습니다",
      description: [
        "주문 생성 뒤 외부 알림이 따로 실패할 수 있었고, service마다 계층·session 규칙이 달라 복구와 review 기준도 달랐습니다. 팀이 coding agent로 만들기 시작하면서 QA와 운영 준비 단계에서 사용량·동시 요청 조건에 따른 구조적 문제가 자주 드러나 백엔드 리소스가 보완에 쓰였습니다.",
        {
          text: "실패 가능한 작업은 API 요청 밖 worker 경계에서 처리하고 실패를 주문 상태로 승격했습니다. session을 모든 계층에 넘기는 대신 Service가 transaction 정책을 선언하는 template을 세웠고, 실시간 상담(공동 주 기여)에서는 외부 모델 세션이 끊겨도 겹치는 세션 풀과 sequence 병합으로 순서를 보장했습니다.",
          source: "피부과 운영 제품군 · 주문·재고 / 실시간 상담 / 조직 표준",
        },
        {
          text: [
            { text: "재시도가 끝나도 원인과 상태가 남아 운영자가 다시 처리할 수 있고, " },
            { text: "full template으로 시작한 신규 프로그램의 STG QA에서 같은 유형의 session·connection 문제가 재관측되지 않았습니다", tone: "metric" },
            { text: ". 실시간 상담은 외부 모델 세션이 끊겨도 발화 순서가 유지되는 경계를 확보했습니다." },
          ],
          source: "피부과 운영 제품군 · 조직 표준",
        },
      ],
      claimIds: [
        "centurion.say-realtime-ai",
        "centurion.msa-platform-context",
        "centurion.bay-async-backend",
        "centurion.async-migration",
        "centurion.test-ci-foundation",
        "be-template.backend-standard",
        "be-template.fastapi-sqlalchemy-standard",
        "be-template.team-leverage",
      ],
    },
    {
      no: "04",
      title: "제품 원장과 AI 실행 상태를 분리하고, 전달 보장·멱등 소비·정합 검증으로 지연·중복·역순 전달이 최신 상태를 덮지 않게 했습니다",
      description: [
        "제품 정책·원장과 AI 생성 lifecycle이 한 backend·DB에 있어 AI 확장과 장애가 원장에 결합됐고, 분리하면 전달 유실과 역순 도착이 최신 상태를 덮을 수 있었습니다.",
        {
          text: "DB를 공유하지 않고 독립 FastAPI application·DB로 분리해 인증된 HTTP 계약으로만 연결하고, 전달은 원장 변경과 같은 transaction에 기록하는 Transactional Outbox로 두었습니다. 소비 쪽은 더 높은 version만 받아들이는 멱등 consumer로, 생성 원장은 version CAS로 worker 경합을 중재했습니다.",
          source: "Thready · AI",
        },
        {
          text: [
            { text: "STG 실데이터를 parent→child 순서로 이관해 " },
            { text: "세 table fingerprint 일치·FK orphan 0건", tone: "metric" },
            { text: "을 확인했고, health가 성공해도 생성이 실패한 사례를 계기로 기능 E2E를 배포 gate로 세웠습니다. 독립 AI application·DB를 STG·Prod에서 운영 중입니다." },
          ],
          source: "Thready · AI",
        },
      ],
      claimIds: [
        "thready.ai-service-boundary",
        "thready.ai-service-migration",
        "thready.ai-replica-outbox",
        "thready.generation-aggregate-optimistic-lock",
        "thready.generation-quota-admission",
      ],
    },
  ],
  workStyles: [],
  skills: [
    {
      label: "Backend",
      stack: "Python · FastAPI · SQLAlchemy 2.0 async · PostgreSQL · MySQL · Redis",
      via: "제품 API·도메인 모델·transaction/session 경계·데이터 이전 주력. TypeScript·Express·NestJS는 gateway·SSO 연동 경험, Java·Spring Boot는 개인 프로젝트",
      claimIds: [
        "thready.backend-rebuild",
        "be-template.fastapi-sqlalchemy-standard",
        "career.memento-fastapi-backend",
        "centurion.msa-platform-context",
        "career.tellingme-backend-infra",
      ],
    },
    {
      label: "Data / Async",
      stack: "RabbitMQ · TaskIQ · Celery · Transactional Outbox",
      via: "latest/history 분리, typed validation·멱등 import, worker 상태·retry·수동 재처리, delivery version fence·멱등 consumer",
      claimIds: [
        "thready.labeling-corpus-workbench",
        "thready.ai-replica-outbox",
        "centurion.bay-async-backend",
        "centurion.async-migration",
      ],
    },
    {
      label: "Architecture / Test",
      stack: "Layered Architecture · DI · Repository Pattern · pytest · Ruff · Pyright · Docker CI · ADR · runbook",
      via: "service·repository·transaction 책임과 integration test 기준 운영. QA 팀원의 서포트를 받아 요구사항별 evidence로 닫는 QA 판정 규칙(PASS/FAIL/UNKNOWN)을 설계해 QA 팀의 AI QA 에이전트 파이프라인과 연결",
      claimIds: [
        "mediness.quality-evidence-harness",
        "be-template.backend-standard",
        "be-template.fastapi-sqlalchemy-standard",
        "centurion.test-ci-foundation",
      ],
    },
    {
      label: "Coding Agent",
      stack: "Claude Code · Codex",
      via: "codebase 분석·기능 inventory·반복 구현·검증에 활용, architecture·test·release 판단은 직접 소유",
      claimIds: ["career.coding-agent-usage"],
    },
    {
      label: "연동·관측",
      stack: "Stripe · 카카오 알림톡 · STT/LLM provider · Sentry",
      via: "외부 결제 보상 처리, 알림 worker, 외부 AI 장애 감지·모델 격리 운영",
      claimIds: [
        "career.memento-stripe-prepayment",
        "centurion.bay-async-backend",
        "thready.provider-failure-continuity",
      ],
    },
    {
      label: "Product Delivery",
      stack: "TypeScript · Next.js · QA · release · 운영",
      via: "고객 문제와 기능 우선순위를 backend·data·핵심 사용자 화면으로 연결",
      claimIds: [
        "thready.product-zero-to-one-contribution",
        "thready.frontend-product-delivery",
        "thready.release-operation",
      ],
    },
    {
      label: "Cloud / Delivery",
      stack: "Docker · GitHub Actions · Terraform · Azure · AWS · Kubernetes(kubeadm · Calico · MetalLB · ArgoCD)",
      via: "서비스 배포·환경 구성·기본 운영 경험. 회사 k8s 클러스터(kubeadm·GitOps) 설계 검토에 참여하고 같은 설계를 개인 Mac에 Lima+kubeadm 3노드로 직접 재구축",
      claimIds: [
        "infra.k8s-lab-rebuild",
        "infra.k8s-cluster-design-review","centurion.shared-infra", "infra.company-azure-ownership", "career.tellingme-backend-infra"],
    },
  ],
  externalActivities: [
    {
      label: "제품·UX 활동",
      title: "사용자 흐름을 개선 가설과 제품 요구사항으로 구체화",
      description: "운영 서비스의 pain point와 추천 맥락을 분석해 개선 가설·Figma 화면안·판단 근거로 정리했습니다.",
      outcome: "Speak 개선안 발표로 IPS 12기 MVP 선정",
      claimIds: ["career.product-ux-practice"],
    },
  ],
  credentials: [
    {
      period: "2022.10 출원\n2025.12경 등록",
      text: "특허 「페이지 출력 방법」 · 등록 10-2898273",
      claimIds: ["credentials.page-output-patent"],
    },
    {
      period: "2024.01",
      text: "CES 2024 Best of Innovation · AI 부문 수상 제품 참여",
      claimIds: ["credentials.ces-2024"],
    },
    {
      period: "2022.11경",
      text: "한국건설생활환경시험연구원(KCL) AI 정확도 인증 통과 제품 참여",
      claimIds: ["credentials.ai-accuracy-certification"],
    },
    {
      period: "2021.09",
      text: "ADsP · 데이터분석 준전문가",
      claimIds: ["credentials.adsp"],
    },
    {
      period: "2016.03\n- 2021.08",
      text: "우송대학교 게임멀티미디어 전공",
      claimIds: ["credentials.education"],
    },
  ],
} satisfies TailoredResume;
