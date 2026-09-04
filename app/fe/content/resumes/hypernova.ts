import type { TailoredResume } from "./types";

// 문안 owner: wiki/products/resume/tailored/hypernova/2026-09-03_groupby_product-engineer/content-draft.md (2026-09-04 승인)
// Application Copy Harness P2 두 번째 실전. 이력서=판단·결과, 기전·검증은 경력기술서. 헤더는 registry header_role(Product Engineer).
export const HYPERNOVA_RESUME = {
  slug: "hypernova",
  companyName: "하이퍼노바",
  position: "[헤이링] Product Engineer",
  status: "approved",
  visibility: "local",
  updatedAt: "2026-09-04",
  printFlow: "compact",
  sectionOrder: ["profile", "outcomes", "career", "skills", "credentials"],
  header: {
    name: "김대정",
    role: "Product Engineer · Tech Lead",
    photoSrc: "/profile/daejeong-profile-v2.png",
    careerLine: [
      { text: "실무 4년차", tone: "strong" },
      { text: " · MediSolve AI (2025.04 — 재직 중)" },
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
      claimIds: [
        "career.tenure",
        "career.medisolve-role-evolution",
        "career.ai-pm-backend-continuity",
        "thready.product-zero-to-one-contribution",
        "thready.subscription-revenue-band",
      ],
    },
    {
      text: "기획자로 시작해 백엔드로 왔고, 아이디어를 제안한 AI 콘텐츠 제품의 FastAPI 백엔드와 AI 생성·평가 시스템을 직접 만들고 핵심 화면은 coding agent로 완성해 월 1천만원 수준의 구독 매출이 발생하는 제품으로 운영합니다. AI 활용이 본격화되면서 모두가 메이커로 제품을 만들고 운영하는 팀에서, 백엔드 경험이 적은 팀원도 같은 기준으로 만들 수 있게 FastAPI 조직 표준과 agent 작업 맥락, evidence로 닫는 QA 판정 규칙을 직접 세웠습니다.",
      claimIds: [
        "thready.product-zero-to-one-contribution",
        "thready.frontend-product-delivery",
        "career.coding-agent-usage",
        "be-template.backend-standard",
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
        { text: " · Backend Engineer — 초기 멤버 영입 · 법인 설립 전 더데이랩스 프리랜서 선행 개발(2025.02–04)" },
      ],
      details: [
        [{ text: "조직 표준·AI 코드 검증", tone: "strong" }, { text: " — 백엔드 경험이 적은 팀원도 coding agent로 운영 제품을 만들 수 있게 FastAPI template(계층·DI·transaction·session·integration test)과 agent 작업 맥락 직접 구축, QA 팀원의 서포트를 받아 evidence로 닫는 QA 판정 규칙 설계" }],
        [{ text: "Thready", tone: "strong" }, { text: " — 아이디어 제안 · 제품 운영 리드 · FastAPI 백엔드·AI 생성/평가 직접 구현 · 핵심 화면은 coding agent로 완성 · 고객이 구독하는 제품으로 출시" }],
        [{ text: "backend 재구축·운영", tone: "strong" }, { text: " — 검증 하네스를 먼저 세우고 prototype backend를 FastAPI로 병렬 재구축해 v1.1.0 전환, v1.3.0부터 실사용 backend 운영 전담" }],
        [{ text: "AI 기능 설계", tone: "strong" }, { text: " — LangGraph 생성 파이프라인을 planner·writer로 분리하고 판정 위치를 실측으로 재배치, legacy 그래프를 단일 파이프라인으로 축소, 제품 기능을 대화로 제어하는 planner-executor Agent prototype 설계·구현·검증" }],
        [{ text: "실시간 AI 상담", tone: "strong" }, { text: " — 실시간 음성 상담 backend의 세션 lifecycle과 STT 전사 순서 경계 공동 안정화, 주문·재고 API와 RabbitMQ·TaskIQ worker의 상태·재시도·재처리 경계 구축 주도" }],
        [{ text: "제품 개발 체계", tone: "strong" }, { text: " — 결정·명세·작업·릴리스 기록을 사람과 AI가 같은 맥락으로 읽는 체계 운영, QA 팀과 AI QA 에이전트 팀 운영 참여, 주 1회 agent 활용 회고" }],
      ],
      claimIds: [
        "career.medisolve-role-evolution",
        "career.thedaylabs-freelance",
        "career.memento-to-medisolve-early-member",
        "be-template.backend-standard",
        "be-template.fastapi-sqlalchemy-standard",
        "be-template.team-leverage",
        "be-template.agent-context",
        "mediness.quality-evidence-harness",
        "thready.product-zero-to-one-contribution",
        "thready.subscription-revenue-band",
        "thready.frontend-product-delivery",
        "thready.backend-rebuild",
        "thready.rebuild-decision-execution",
        "thready.prototype-to-user-operation",
        "thready.release-operation",
        "thready.langgraph-generation-graph",
        "thready.agent-pipeline-design",
        "thready.conversational-editorial-agent-prototype",
        "centurion.say-realtime-ai",
        "centurion.bay-async-backend",
        "mediness.product-operations",
        "mediness.ai-qa-team-operation",
        "career.weekly-role-based-agent-retrospective",
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
        "FastAPI·SQLAlchemy 2.0·MySQL 예약·결제 backend에서 Stripe Checkout 선결제 영역을 구축하고, 환불 유형별 처리 순서와 마일리지 복원 시점을 조정해 결제 상태 정합성 보완",
      ],
      claimIds: [
        "career.memento-fastapi-backend",
        "career.memento-stripe-prepayment",
        "career.memento-payment",
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
        "생성형 AI 커머스 콘텐츠 제품 SellerCanvas의 PM 메인 역할로 프로토타입을 v1.0과 외부 패션 브랜드 PoC까지 연결, 제작 flow 재설계가 페이지 출력 방법 특허로 등록",
        "Vision AI 기반 의류 이미지 분석 모델 개발에 참여 (CES 2024·KCL 인증은 Credentials)",
      ],
      claimIds: [
        "career.sellercanvas-product-system",
        "career.sellercanvas-enterprise-poc",
        "career.sellercanvas-vision-model-development",
        "career.ai-pm-backend-continuity",
      ],
    },
    {
      org: "아이즈솔",
      period: "2020.08 — 2021.06",
      role: [
        { text: "Vision AI Engineer", tone: "strong" },
        { text: " · 인턴 — 안면 인식 기반 자동 출결 시스템 개발" },
      ],
      details: [],
      claimIds: ["career.ai-pm-backend-continuity"],
    },
  ],
  outcomes: [
    {
      no: "01",
      title: "백엔드 경험이 적은 팀원도 coding agent로 운영 제품을 만들 수 있게 FastAPI 기준을 template으로 설계하고, AI가 만든 코드는 integration test와 evidence로 닫는 QA 판정 규칙으로 신뢰를 검증하게 했습니다",
      description: [
        "팀이 coding agent로 기능을 만들기 시작하면서 백엔드 경험이 적은 담당자도 구현에 참여했습니다. QA와 운영 준비 단계에서 사용량이나 동시 요청 조건에 따라 구조적인 문제가 자주 드러났고, 실행이 성공하면 통과로 보는 경우가 있어 AI 기능의 품질 판정이 흐려졌습니다.",
        {
          text: "기능마다 완벽한 구조를 요구하는 대신 자주 틀리는 경계를 기본값으로 제공했습니다. Service가 transaction 정책을 선언하고 Repository는 현재 session만 resolve하게 했고, tool이 늘어나는 Agent 기능만 Hexagonal, 나머지는 MVC를 기본 구조로 두었습니다. QA는 요구사항을 REQ로 쪼개 evidence로 닫는 판정 규칙(PASS/FAIL/UNKNOWN)을 QA 팀원의 서포트를 받아 세우고, 실행 성공과 품질 통과를 분리하고 LLM judge 단독 승인을 금지했습니다.",
          source: "조직 표준 Template · QA 판정 규칙",
        },
        {
          text: "propagation·isolation·CancelledError rollback·connection cleanup을 integration test로 고정한 template과 agent 작업 맥락 위에서, full template으로 시작한 신규 프로그램의 STG QA에서 같은 유형의 session·connection 문제가 재관측되지 않았습니다. 기획·QA·디자인 담당자가 직접 구현하는 동안 백엔드는 결과 피드백과 배포 지원으로 개입 범위가 줄었고, 판정 규칙은 QA 팀의 AI QA 에이전트 파이프라인의 판정 layer로 연결됐습니다.",
          source: "조직 표준 Template · QA 판정 규칙",
        },
      ],
      claimIds: [
        "be-template.backend-standard",
        "be-template.fastapi-sqlalchemy-standard",
        "be-template.team-leverage",
        "be-template.agent-context",
        "mediness.quality-evidence-harness",
        "mediness.ai-qa-team-operation",
        "career.weekly-role-based-agent-retrospective",
      ],
    },
    {
      no: "02",
      title: "규칙을 먼저 설계한 뒤 돌아가는 제품을 멈추지 않고 backend를 교체했고, 결함 재발이 약 94% 줄어 배포 보장을 지켰습니다",
      description: [
        "빠른 검증 중심으로 만들어진 초기 backend는 도메인 의존성이 얽혀 회원 로직 변경이 AI 생성 중단으로 이어졌고, 해결된 QA 이슈가 같은 영역에서 다른 형태로 재발했습니다.",
        {
          text: "부분 수정과 backend만 병렬 재구축하는 안을 비교해, 서비스가 작고 AI 확장이 예정된 시점이라 재구축을 택하되 기존 frontend와 릴리스 흐름은 유지했습니다. 패턴·계층·검증 하네스를 먼저 세우고 그 위에서 coding agent와 새 backend를 나란히 만들어 응답을 비교한 뒤 전환했습니다. 재구축 범위·architecture·검증·전환 판단은 직접 소유하고, coding agent는 codebase 파악·기능 inventory·반복 구현에 썼습니다.",
          source: "Thready · Jira",
        },
        {
          text: [
            { text: "같은 기준의 Jira 집계에서 해결된 QA 이슈 재오픈 비율 " },
            { text: "37% → 11%", tone: "metric" },
            { text: ", 재발 발생 일평균 " },
            { text: "약 94% 감소(하루 4.5건 → 0.3건)", tone: "metric" },
            { text: ". 전환 뒤 실제 사용자가 쓰는 제품의 backend 배포·QA·운영을 계속 전담하고 있습니다." },
          ],
          source: "Thready · Jira",
        },
      ],
      claimIds: [
        "thready.rebuild-decision-execution",
        "thready.backend-rebuild",
        "thready.qa-reopen-reduction",
        "thready.release-operation",
        "career.coding-agent-usage",
      ],
    },
    {
      no: "03",
      title: "제품 기능을 대화로 제어하는 Agent를 planner-executor로 설계하고, 판정 위치·컨텍스트 압축·멱등 receipt를 실측으로 검증했습니다",
      description: [
        "생성 파이프라인에서 글 유형 분기 판정을 writer에 뒀을 때 18건 전부 미발동했습니다. 화면마다 기능을 찾아 들어가는 대신 사용자가 원하는 작업을 말하면 제품이 허용된 기능을 골라 실행해 주는 흐름도 검증해야 했습니다.",
        {
          text: [
            { text: "판단을 어느 역할에 둘 것인가가 agent 설계의 핵심이라 보고 판정 위치를 planner로 옮겼습니다. 생성 파이프라인은 LangGraph StateGraph로 구현·운영하되, 15노드 legacy 그래프를 publishable 단일 파이프라인으로 축소하고 SDK 기반 단일 agent 엔진을 같은 guard·repair 코드로 병존시켜 실 파이프라인에서 실행 시간을 비교했습니다(" },
            { text: "agent 엔진 43초 vs 그래프 294초", tone: "metric" },
            { text: "). 대화형 제어는 multi-agent 대신 하나의 planner-executor로 두고, planner는 typed plan만 만들고 실행 권한은 capability registry가 확인한 뒤 dispatch하도록 했습니다. 예약·발행·삭제 같은 변경은 다음 turn의 typed confirmation을 통과할 때만 실행되도록 사람 승인 경계를 뒀습니다. 생성 품질은 typed prompt builder·LLM judge·평가 이력으로 판정하되, 프롬프트 기준값이 자사 출력을 되먹이던 순환을 재실측으로 발견해 기준을 교정했습니다." },
          ],
          source: "Thready · Agent",
        },
        {
          text: [
            { text: "편집 7개·운영 13개 capability, append-only 활동 이력, token-aware context compaction, receipt 기반 idempotency, Mock 운영 gateway로 구성한 독립 prototype에서 승인 전 무변경·승인 뒤 상태 전이·새로고침 뒤 복원을 검증했습니다 (" },
            { text: "test 679 passed", tone: "metric" },
            { text: ")." },
          ],
          source: "Thready · Agent",
        },
      ],
      claimIds: [
        "thready.langgraph-generation-graph",
        "thready.agent-pipeline-design",
        "thready.conversational-editorial-agent-prototype",
        "thready.generation-quality-system",
        "thready.measurement-correction",
      ],
    },
    {
      no: "04",
      title: "실시간 음성 AI 상담 backend의 세션과 전사 순서 경계를 공동으로 안정화해, 늦게 도착한 보정이 다른 발화를 덮지 않게 정합을 지켰습니다",
      description: [
        "실시간 STT가 내보내는 부분 전사와 완성 전사, 비동기로 뒤늦게 도착하는 보정 결과가 같은 WebSocket 세션 안에서 섞여, 늦은 보정이 다른 turn을 덮거나 중복 event가 상태를 흔들었습니다.",
        {
          text: "부분 전사는 domain keyword 우선 판정에, 완성 전사는 문맥 판단·저장에 쓰도록 역할을 나누고, 부분·완성·보정을 같은 sequence로 묶어 순서로 정합을 보장했습니다. 중복 event는 task cancellation·debounce·retry·turn-state guard로 제어했습니다.",
          source: "피부과 운영 제품군 · 실시간 상담",
        },
        {
          text: "보정이 뒤늦게 와도 같은 sequence의 발화만 교체되고, 외부 모델 세션이 끊겨도 발화 순서가 유지되는 경계를 확보했습니다. provider 후보 비교를 위한 WER·CER·keyword retention·latency benchmark를 함께 구축했습니다.",
          source: "피부과 운영 제품군 · 실시간 상담",
        },
      ],
      claimIds: ["centurion.say-realtime-ai"],
    },
  ],
  workStyles: [],
  skills: [
    {
      label: "AI Runtime",
      stack: "LangGraph(StateGraph) · LLM API 연동 · typed prompt builder · structured output · LLM judge · context compaction · 평가 루프 · Sentry",
      via: "생성 lifecycle과 품질 평가 직접 구축, planner-executor·capability registry 직접 설계, 외부 모델 장애를 실패 유형으로 분류해 정상 모델로 작업을 잇는 운영",
      claimIds: [
        "thready.langgraph-generation-graph",
        "thready.generation-quality-system",
        "thready.ai-service-boundary",
        "thready.provider-failure-continuity",
      ],
    },
    {
      label: "Coding Agent",
      stack: "Claude Code · Codex · agent context · automation skill",
      via: "codebase 분석·기능 inventory·반복 구현·검증에 활용. architecture·test·release 판단은 직접 소유. 팀이 같은 기준으로 쓰도록 template에 agent 작업 맥락 내장",
      claimIds: ["career.coding-agent-usage", "be-template.agent-context"],
    },
    {
      label: "Quality",
      stack: "pytest · integration test · Ruff · Pyright · pre-commit · QA 판정 규칙(PASS/FAIL/UNKNOWN) · Jira release gate",
      via: "transaction/session 경계를 integration test로 고정, 요구사항별 evidence로 닫는 QA 판정, 결정·명세·작업·릴리스 기록을 release gate에 연결",
      claimIds: [
        "be-template.fastapi-sqlalchemy-standard",
        "mediness.quality-evidence-harness",
        "mediness.product-operations",
        "nexus.quality-automation",
      ],
    },
    {
      label: "Backend",
      stack: "Python · FastAPI · SQLAlchemy 2.0 async · PostgreSQL · MySQL · Redis · RabbitMQ · TaskIQ · WebSocket",
      via: "제품 API·도메인 모델·transaction/session 경계, 비동기 worker의 상태·재시도·재처리, 실시간 세션 lifecycle",
      claimIds: [
        "be-template.fastapi-sqlalchemy-standard",
        "centurion.bay-async-backend",
        "centurion.say-realtime-ai",
      ],
    },
    {
      label: "Product Delivery",
      stack: "TypeScript · Next.js · React · REST API 계약",
      via: "콘텐츠 생성·가져오기·예약·발행·대시보드·관리 화면을 backend·AI 계약과 함께 구현. 핵심 화면은 coding agent로 완성하고 계약·검수·배포는 직접 소유",
      claimIds: ["thready.frontend-product-delivery", "career.coding-agent-usage"],
    },
    {
      label: "Cloud / Delivery",
      stack: "Docker · GitHub Actions · Azure · Terraform · AWS · Vercel · Kubernetes(kubeadm · ArgoCD)",
      via: "서비스 배포·환경 설정·기본 운영. 개인 프로젝트 AWS 배포·모니터링, 회사 k8s 설계 검토와 개인 재구축",
      claimIds: [
        "infra.company-azure-ownership",
        "career.tellingme-backend-infra",
        "infra.k8s-lab-rebuild",
      ],
    },
  ],
  credentials: [
    {
      period: "2022.10 출원\n2025.12경 등록",
      text: "특허 등록 10-2898273 · 페이지 출력 방법 (주식회사 스튜디오랩)",
      claimIds: ["credentials.page-output-patent"],
    },
    {
      period: "2024.01",
      text: "CES 2024 Best of Innovation, AI 부문 · SellerCanvas",
      claimIds: ["credentials.ces-2024"],
    },
    {
      period: "2022.11경",
      text: "한국건설생활환경시험연구원(KCL) AI 정확도 인증 통과 · SellerCanvas 의류 이미지 분석 모델",
      claimIds: ["credentials.ai-accuracy-certification"],
    },
    {
      period: "2021.09",
      text: "ADsP · 2021.09",
      claimIds: ["credentials.adsp"],
    },
    {
      period: "2016.03\n- 2021.08",
      text: "우송대학교 게임멀티미디어 전공 · 2016.03 — 2021.08",
      claimIds: ["credentials.education"],
    },
  ],
} satisfies TailoredResume;
