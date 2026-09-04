import type { TailoredResume } from "./types";

// 문안 owner: wiki/products/resume/tailored/miridih/2026-09-03_wanted_product-engineer/content-draft.md (2026-09-03 승인)
// Application Copy Harness P2 첫 실전. 이력서=판단·결과, 기전·검증은 경력기술서. 헤더는 registry header_role(Product Engineer).
export const MIRIDIH_RESUME = {
  slug: "miridih",
  companyName: "미리디",
  position: "[미리캔버스] Product Engineer",
  status: "approved",
  visibility: "local",
  updatedAt: "2026-09-03",
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
      text: "기획자로 시작해 백엔드로 왔고, 아이디어를 제안한 AI 콘텐츠 제품의 FastAPI 백엔드와 AI 생성·평가 시스템을 직접 만들고 핵심 화면은 coding agent로 완성해 월 1천만원 수준의 구독 매출이 발생하는 제품으로 운영합니다. 커머스(생성형 AI 상세페이지)·피부과 운영·SNS 콘텐츠 세 도메인에서 현업의 반복 업무를 실제로 쓰이는 제품으로 만들었고 대규모 콘텐츠 데이터를 검수 가능한 구조와 사람 평가 워크벤치로 바꿨습니다.",
      claimIds: [
        "thready.product-zero-to-one-contribution",
        "thready.frontend-product-delivery",
        "career.coding-agent-usage",
        "career.sellercanvas-product-system",
        "thready.labeling-corpus-workbench",
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
        [{ text: "Thready", tone: "strong" }, { text: " — 아이디어 제안 · 제품 운영 리드 · FastAPI 백엔드·AI 생성/평가 직접 구현 · 핵심 화면은 coding agent로 완성 · 고객이 구독하는 제품으로 출시" }],
        [{ text: "데이터 검수 시스템", tone: "strong" }, { text: " — Threads 관측 데이터의 성과 기준 설계, 독립 labeling schema·멱등 importer·super-admin 평가 워크벤치(API/UI) 구축" }],
        [{ text: "AI 기능 PoC", tone: "strong" }, { text: " — 제품 기능을 대화로 제어하는 planner-executor Agent prototype 설계·구현·검증" }],
        [{ text: "시술 지식 검색 API", tone: "strong" }, { text: " — 시술·제품·안전 규칙·문헌 지식을 canonical 데이터로 옮기고, 구조화 조회가 판단하고 문헌 검색이 근거를 보강하는 hybrid retrieval API와 의사 검수 fixture 평가 게이트 설계·구현 (임상 검수 대기)" }],
        [{ text: "backend 재구축·운영", tone: "strong" }, { text: " — prototype backend를 FastAPI로 병렬 재구축해 v1.1.0 전환, v1.3.0부터 실사용 backend 운영 전담" }],
        [{ text: "제품 개발 체계·조직 표준", tone: "strong" }, { text: " — 결정·명세·작업·릴리스 기록을 사람과 AI가 같은 맥락으로 읽는 체계 운영, QA 팀원의 서포트를 받아 evidence로 닫는 QA 판정 규칙 설계, 백엔드 경험이 적은 팀원도 같은 기준으로 만들 수 있게 FastAPI template·agent 작업 맥락 직접 구축" }],
      ],
      claimIds: [
        "career.medisolve-role-evolution",
        "career.thedaylabs-freelance",
        "career.memento-to-medisolve-early-member",
        "thready.product-zero-to-one-contribution",
        "thready.subscription-revenue-band",
        "thready.frontend-product-delivery",
        "thready.threads-market-outcome-design",
        "thready.labeling-corpus-workbench",
        "thready.conversational-editorial-agent-prototype",
        "procedure-hub.hybrid-retrieval-design",
        "procedure-hub.canonical-data-platform",
        "procedure-hub.retrieval-evaluation-gate",
        "thready.backend-rebuild",
        "thready.prototype-to-user-operation",
        "thready.release-operation",
        "mediness.product-operations",
        "mediness.quality-evidence-harness",
        "be-template.backend-standard",
        "be-template.team-leverage",
        "nexus.admin-backend-ownership",
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
        "FastAPI·SQLAlchemy 2.0·MySQL 예약·결제 backend에서 Stripe Checkout 선결제 영역을 구축하고 환불 유형별 처리 순서와 마일리지 복원 시점을 조정해 결제 상태 정합성 보완",
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
      title: "아이디어를 제안한 AI 콘텐츠 제품을 고객이 구독하는 서비스로 만들고, 생성 품질 기준을 실측으로 설계해 신뢰를 쌓았습니다",
      description: [
        "Threads 글을 만들 때 자료 정리·초안·1차 검수·예약 준비를 사람이 매번 반복했고, 무엇이 좋은 글인지 판단 기준은 감에 의존했습니다.",
        {
          text: "기획·QA·마케팅과 고객 불편을 기능 우선순위와 생성 품질 기준으로 구체화하고, AI는 자료 정리·초안·1차 검수를 맡고 최종 수정·예약·발행은 사람이 판단하는 흐름으로 설계했습니다. 품질 판정은 자동 게이트·실측 분포·사람 판정 3층으로 나눠 자동화가 닿는 층과 닿지 않는 층을 갈랐습니다.",
          source: "Thready",
        },
        {
          text: "FastAPI 백엔드와 typed prompt builder·LLM judge·평가 이력 기반 생성 품질 시스템을 직접 구현하고 핵심 화면은 coding agent로 완성해, 팀과 함께 실제 고객이 구독하는 유료 제품으로 출시·운영 중입니다. 프롬프트 기준값이 자사 출력을 되먹이던 순환을 재실측으로 발견해 기준을 교정했습니다.",
          source: "Thready",
        },
      ],
      claimIds: [
        "thready.product-zero-to-one-contribution",
        "thready.threads-content-workflow-automation",
        "thready.frontend-product-delivery",
        "thready.generation-quality-system",
        "thready.quality-criteria-system",
        "thready.measurement-correction",
        "thready.subscription-revenue-band",
      ],
    },
    {
      no: "02",
      title: "SNS 관측 데이터를 독립 schema와 멱등 importer, 사람 평가 워크벤치로 바꿔 검수 가능한 데이터 운영 체계를 만들었습니다",
      description: [
        "반응이 좋은 콘텐츠를 임계값 하나로 정의하기 어려웠고, 게시물의 최신 상태·반복 관측·원문·사람 평가가 서로 다른 생명주기를 가졌습니다.",
        {
          text: "절대·저자 상대·도메인 상대·참여 품질·합의의 5개 성과 기준 후보를 병렬로 두어 정의를 조기 고정하지 않았고, 평가 데이터는 기존 제품 projection과 FK를 공유하지 않는 독립 labeling schema로 분리했습니다.",
          source: "Thready · 데이터",
        },
        {
          text: [
            { text: "typed batch validation·source key upsert·continuation replace 기반 멱등 importer와 super-admin 평가 워크벤치(1~10점·사유·진행률, API/UI)를 구축해, " },
            { text: "전체·증분 재적재에서 기존 label 보존과 count 정합성", tone: "metric" },
            { text: "을 확인했습니다. 감에 의존하던 글쓰기 기준이 실측 corpus 기반 생성·평가 기준으로 바뀌었습니다." },
          ],
          source: "Thready · 데이터",
        },
      ],
      claimIds: [
        "thready.threads-market-outcome-design",
        "thready.labeling-corpus-workbench",
        "thready.quality-criteria-system",
      ],
    },
    {
      no: "03",
      title: "제품 기능을 대화로 제어하는 Agent PoC를 planner-executor로 설계하고, 변경 작업은 사람 확인과 멱등 receipt를 거쳐야 실행되게 검증했습니다",
      description: [
        "화면마다 기능을 찾아 들어가는 대신 사용자가 원하는 작업을 말하면 제품이 허용된 기능을 골라 실행해 주는 흐름을 검증해야 했습니다.",
        {
          text: "multi-agent 대신 하나의 planner-executor로 두고, planner는 typed plan만 만들고 실행 권한은 capability registry가 확인한 뒤 dispatch하도록 했습니다. 예약·발행·삭제 같은 변경은 다음 turn의 typed confirmation을 통과할 때만 실행되도록 사람 승인 경계를 뒀습니다. 생성 파이프라인에서는 유형 분기 판정을 writer에 뒀을 때 18건 전부 미발동함을 확인하고 판정 위치를 planner로 옮겼습니다.",
          source: "Thready · Agent Prototype",
        },
        {
          text: [
            { text: "편집 7개·운영 13개 capability, append-only 활동 이력, token-aware context compaction, receipt 기반 idempotency, Mock 운영 gateway로 구성한 독립 prototype에서 승인 전 무변경·승인 뒤 상태 전이·새로고침 뒤 복원을 검증했습니다 (" },
            { text: "test 679 passed", tone: "metric" },
            { text: ")." },
          ],
          source: "Thready · Agent Prototype",
        },
      ],
      claimIds: [
        "thready.conversational-editorial-agent-prototype",
        "thready.agent-pipeline-design",
      ],
    },
    {
      no: "04",
      title: "의료 시술 지식을 canonical 데이터로 옮기고, 구조화 조회가 판단하고 문헌 검색이 근거를 보강하는 hybrid retrieval API를 설계해 출처 정합성을 지켰습니다",
      description: [
        "시술·고민·제품·금기·간격·추천 패키지·문헌 근거가 JSON과 문서에 흩어져 있어 자연어 질의에 답하려면 사람이 찾아 조합해야 했고 검색 결과가 안전·추천 판정을 새로 만들어 버릴 위험이 있었습니다.",
        {
          text: "지식의 대부분이 관계가 명확한 구조화 데이터라 문서를 전부 벡터화하는 방식으로 시작하지 않았습니다. 자연어 질의를 canonical 엔티티로 확정한 뒤 구조화 조회가 판단하고 문헌 검색이 근거를 보강하는 hybrid retrieval로 정했고, 실측 규모(수십~수백 건)에서 vector DB·chunking·reranker는 평가셋에서 recall 부족이 증명될 때만 추가하기로 했습니다. LLM은 출처 ID와 content revision이 붙은 Context Pack의 문장화만 맡고, 안전·추천 판정은 구조화 규칙만 내리게 경계를 뒀습니다.",
          source: "시술 정보 지식 플랫폼",
        },
        {
          text: "현행 JSON 지식을 canonical 관계형 데이터로 옮기면서 기존 API 계약을 동결 테스트로 고정하고 release 단위 publication gate로 공개를 통제했습니다. 대표 예시 몇 개로 품질을 승인하지 않고, 의사가 검수한 query fixture로 recall·안전 규칙 통과·응답 시간을 자동 측정하는 평가 게이트와 기존 판정과의 safety 일치를 비교하는 shadow 게이트를 구현했습니다. 구조화 Context Pack API와 평가 실행기는 구현을 마쳤고 생성형 answer는 임상 검수 대기 상태입니다.",
          source: "시술 정보 지식 플랫폼",
        },
      ],
      claimIds: [
        "procedure-hub.hybrid-retrieval-design",
        "procedure-hub.canonical-data-platform",
        "procedure-hub.retrieval-evaluation-gate",
      ],
    },
  ],
  workStyles: [],
  skills: [
    {
      label: "Product Delivery",
      stack: "TypeScript · Next.js · React · REST API 계약",
      via: "콘텐츠 생성·가져오기·예약·발행·대시보드·관리 화면을 backend·AI 계약과 함께 구현. 핵심 화면은 coding agent로 완성하고 계약·화면 흐름·검수·배포는 직접 소유",
      claimIds: [
        "thready.frontend-product-delivery",
        "career.coding-agent-usage",
        "thready.release-operation",
      ],
    },
    {
      label: "Backend",
      stack: "Python · FastAPI · SQLAlchemy 2.0 async · PostgreSQL · MySQL · Redis",
      via: "제품 API·도메인 모델·transaction/session 경계·데이터 이전 주력. 쿼리와 정합성 검증 직접 작성",
      claimIds: [
        "thready.backend-rebuild",
        "be-template.fastapi-sqlalchemy-standard",
        "career.memento-fastapi-backend",
      ],
    },
    {
      label: "AI Runtime",
      stack: "LLM API 연동 · typed prompt builder · structured output · LLM judge · hybrid retrieval · Context Pack · Sentry",
      via: "생성 lifecycle과 품질 평가 직접 구축, 구조화 조회가 판단하고 문헌 검색이 근거를 보강하는 RAG 설계·구현, 외부 모델 장애를 실패 유형으로 분류해 정상 모델로 작업을 잇는 운영",
      claimIds: [
        "thready.generation-quality-system",
        "thready.ai-service-boundary",
        "procedure-hub.hybrid-retrieval-design",
        "thready.provider-failure-continuity",
      ],
    },
    {
      label: "Data · 내부 도구",
      stack: "typed batch validation · 멱등 importer · canonical 데이터 전환 · publication gate · super-admin 워크벤치 · Jira release gate",
      via: "대규모 corpus 정제·적재·사람 평가, 지식 데이터의 등록·검수·공개를 review queue와 release 경계로 운영, 결정·명세·작업·릴리스 기록을 사람과 AI가 같은 맥락으로 읽는 체계 운영",
      claimIds: [
        "thready.labeling-corpus-workbench",
        "procedure-hub.canonical-data-platform",
        "mediness.product-operations",
      ],
    },
    {
      label: "Coding Agent",
      stack: "Claude Code · Codex",
      via: "codebase 분석·기능 inventory·반복 구현·검증에 활용. architecture·test·release 판단은 직접 소유",
      claimIds: ["career.coding-agent-usage"],
    },
    {
      label: "Cloud / Delivery",
      stack: "Docker · GitHub Actions · Azure · Terraform · Vercel · Kubernetes(kubeadm · ArgoCD)",
      via: "서비스 배포·환경 설정·기본 운영. 회사 k8s 클러스터 설계 검토에 참여하고 같은 설계를 개인 Mac에 3노드로 재구축",
      claimIds: [
        "infra.company-azure-ownership",
        "infra.k8s-lab-rebuild",
        "infra.k8s-cluster-design-review",
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
