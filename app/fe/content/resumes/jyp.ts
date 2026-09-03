import type { TailoredResume } from "./types";

// 문안 owner: wiki/products/resume/tailored/jyp-entertainment/2026-08-29_jype-career_software-engineer-ai/content-draft.md
// 2026-09-03 v2 정본화: 이력서=판단·결과, 기전·검증은 경력기술서. 코드명 제거, 화면은 coding agent. (2026-09-02 개정: wiki/rules/application-copy-standard.md 적용 (15초 소개, 성과 순서 E 우선, 더데이랩스 그룹화,
// 폐업 사유, 측정 문장 제거, 도구명 명시, Slack 제안). 블록 원형: products/resume/resume-block-library.md
export const JYP_RESUME = {
  slug: "jyp",
  companyName: "JYP ENTERTAINMENT",
  position: "Software Engineer / AI (경력)",
  status: "draft",
  visibility: "local",
  updatedAt: "2026-09-03",
  uiRevision: 3,
  printFlow: "compact",
  sectionOrder: ["profile", "outcomes", "career", "skills", "credentials"],
  header: {
    name: "김대정",
    role: "Software Engineer / AI · Backend Engineer",
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
      text: "가능성을 제품으로 만들고, 끝까지 책임지는 Product Engineer 김대정입니다. 기획자로 시작해 백엔드로 왔고, 지금은 고객이 구독하는 AI 제품을 만들고 운영합니다.",
      claimIds: ["career.medisolve-role-evolution", "thready.product-zero-to-one-contribution", "career.ai-pm-backend-continuity", "career.sellercanvas-product-system"],
    },    {
      text: "커머스·피부과 운영·SNS 콘텐츠 세 도메인에서 현업의 반복 업무를 제품으로 만들었습니다. AI 활용이 본격화되면서 모두가 메이커로 제품을 만들고 운영하는 팀에서, 백엔드 경험이 적은 팀원도 같은 기준으로 만들 수 있게 FastAPI 조직 표준과 agent 작업 맥락을 직접 구축했습니다.",
      claimIds: [
        "nexus.backend-architecture",
        "thready.product-zero-to-one-contribution",
        "thready.subscription-revenue-band",
        "be-template.team-leverage",
        "be-template.agent-context",
        "career.coding-agent-usage",
        "mediness.product-development-coordination-leverage",
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
        { text: " · Tech Lead 역할 병행" },
      ],
      details: [
        "합류 경로 — 초기 멤버로 영입. 법인 설립 전 더데이랩스 프리랜서 기간(2025.02–04)에 피부과 CRM 초기 backend를 선행 구축한 뒤 2025.04 정규 합류",
        [{ text: "유료 AI 콘텐츠 제품", tone: "strong" }, { text: " — Thready 아이디어 제안, FastAPI 백엔드·별도 AI 실행부·주요 화면(coding agent로 구현) 완성, 생성 품질·외부 AI 장애 운영, 고객이 구독하는 제품으로 출시·운영" }],
        [{ text: "팀이 함께 쓰는 Backend 기준", tone: "strong" }, { text: " — 백엔드를 모르는 기획·QA·디자인 담당자가 Claude Code·Codex로 운영 제품을 만들 수 있게 FastAPI 조직 표준 template·agent 작업 맥락 직접 구축" }],
        [{ text: "제품 개발 체계·회사 AX", tone: "strong" }, { text: " — 결정·명세·작업·릴리스 기록을 사람과 AI가 같은 맥락으로 읽는 체계 운영, release note 자동화, 요구사항별 evidence로 닫는 QA 판정 규칙과 AI QA 에이전트 파이프라인 연결, 회사 AX 설계 참여" }],
        [{ text: "피부과 운영 제품군 backend", tone: "strong" }, { text: " — 주문·재고 후속 작업의 worker 복구 경계, 여러 지점 운영·예약 backend 구축 주도, 실시간 상담 runtime 안정화 공동 수행" }],
      ],
      claimIds: [
        "career.medisolve-role-evolution",
        "career.thedaylabs-freelance",
        "career.memento-to-medisolve-early-member",
        "be-template.backend-standard",
        "be-template.fastapi-sqlalchemy-standard",
        "be-template.team-leverage",
        "be-template.agent-context",
        "career.coding-agent-usage",
        "mediness.product-operations",
        "mediness.product-development-coordination-leverage",
        "mediness.company-work-ax-design",
        "mediness.slack-issue-intake-flow-proposal",
        "thready.product-zero-to-one-contribution",
        "thready.subscription-revenue-band",
        "thready.frontend-product-delivery",
        "thready.threads-content-workflow-automation",
        "thready.ai-service-boundary",
        "thready.generation-quality-system",
        "thready.provider-failure-continuity",
        "centurion.bay-async-backend",
        "nexus.backend-architecture",
        "centurion.say-realtime-ai",
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
            text: " — FastAPI·SQLAlchemy·MySQL 기반 예약 API와 Stripe 선결제를 연동하고, 예약 실패 시 결제 취소·환불과 마일리지·이용권 상태 변경 시점을 나눠 정합성 보완",
          },
        ],
        [
          { text: "고객 알림", tone: "strong" },
          {
            text: " — 다국어 알림톡·이메일의 즉시·예약 발송, Celery 작업 취소·재등록, 발송 이력 구현",
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
        [
          { text: "생성형 AI 커머스 제품", tone: "strong" },
          {
            text: " — CES 2024 Best of Innovation(AI 부문) 제품의 PM 메인 역할로 프로토타입 사용 데이터를 보고 제품 흐름·기능 범위·출시 우선순위를 정해 v1.0과 외부 패션 브랜드 PoC로 발전. 상세페이지 제작 flow 재설계는 특허 「페이지 출력 방법」 등록으로 이어짐",
          },
        ],
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
      title: "백엔드를 모르는 기획자가 coding agent로 운영 제품을 만들 수 있게 FastAPI 기준을 template으로 설계했습니다",
      description: [
        "팀이 Claude Code·Codex로 기능을 만들기 시작하면서 백엔드 경험이 적은 담당자도 구현에 참여하게 됐습니다. 그러자 QA와 운영 준비 단계에서 사용량이나 동시 요청 조건에 따라 구조적인 문제가 자주 드러났고, 그때마다 백엔드 엔지니어의 리소스가 원인 파악과 보완에 쓰였습니다.",
        {
          text: "기능마다 완벽한 구조를 요구하는 대신 자주 틀리는 경계(session·transaction·계층)를 template 기본값으로 제공하고, Service가 transaction 정책을 선언하게 했습니다.",
          source: "조직 표준 Template",
        },
        {
          text: [
            { text: "full template으로 시작한 신규 프로그램의 STG QA에서 " },
            { text: "같은 session·pool 문제가 재관측되지 않았고", tone: "metric" },
            { text: ", 기획·QA·디자인 담당자가 직접 구현하는 동안 백엔드는 피드백·배포 지원으로 개입을 줄였습니다." },
          ],
          source: "조직 표준 Template",
        },
      ],
      claimIds: [
        "be-template.backend-standard",
        "be-template.fastapi-sqlalchemy-standard",
        "be-template.team-leverage",
        "be-template.agent-context",
        "career.coding-agent-usage",
      ],
    },
    {
      no: "02",
      title: "사람이 반복하던 Threads 글 제작을 제품 흐름으로 바꿔 고객이 결제하는 서비스로 운영하고, 글의 기준은 실측으로 신뢰를 쌓았습니다",
      description: [
        "여러 채널을 운영하는 고객은 자료 수집·작성·검수·예약을 매번 반복했고, 좋은 글의 기준은 감에 의존했습니다.",
        {
          text: "글쓰기만 AI에 맡기지 않고 자료 수집·정체성·작성·검수 역할을 나눠 AI가 초안과 1차 검수를, 사람이 최종 수정과 발행 판단을 하게 했습니다. 기준은 직접 수집한 실측 corpus로 다시 쟀습니다.",
          source: "Thready",
        },
        {
          text: [
            { text: "기획·QA·마케팅과 운영을 리드해 " },
            { text: "실제 고객이 구독료를 내는 제품", tone: "metric" },
            { text: "으로 출시·운영 중. FastAPI 백엔드·별도 AI 실행부를 직접 구현하고, 핵심 화면은 coding agent로 만들어 검수·배포했습니다." },
          ],
          source: "Thready",
        },
      ],
      claimIds: [
        "thready.product-zero-to-one-contribution",
        "thready.subscription-revenue-band",
        "thready.frontend-product-delivery",
        "thready.threads-content-workflow-automation",
        "thready.ai-service-boundary",
        "thready.generation-quality-system",
        "thready.threads-marketing-criteria",
        "thready.provider-failure-continuity",
        "thready.labeling-corpus-workbench",
        "thready.measurement-correction",
        "thready.falsification-log",
      ],
    },
    {
      no: "03",
      title: "결정·명세·작업·릴리스 기록을 사람과 AI가 같은 맥락으로 읽게 해, 담당자가 바뀌어도 판단의 정합이 유지되는 개발 체계를 운영했습니다",
      description: [
        "제품 간 맥락 공유가 사람에 의존해 요구·판단을 재확인하는 비용이 컸고, 담당 교체·병행 시 실행이 지연되는 병목이 잦았습니다.",
        {
          text: "결정·명세·작업·릴리스 근거를 실행 원장으로 축적해 사람과 AI가 같은 맥락을 읽게 하되, 우선순위·승인·릴리스 같은 판단은 사람이 확정하는 경계를 지켰습니다. QA는 요구사항별 evidence로 닫는 판정 규칙을 세워 QA 팀의 AI QA 에이전트 파이프라인과 연결했습니다.",
          source: "제품 개발 체계",
        },
        {
          text: "담당자가 바뀌어도 기록에서 업무를 이어가 인수인계·맥락 복원 비용이 낮아졌고 release note 생성을 자동화했습니다. 이 구조를 회사 업무로 넓히는 AX 설계에 참여했습니다.",
          source: "제품 개발 체계",
        },
      ],
      claimIds: [
        "mediness.product-operations",
        "mediness.product-development-coordination-leverage",
        "mediness.company-work-ax-design",
        "mediness.product-system-design-participation",
        "mediness.slack-issue-intake-flow-proposal",
        "career.weekly-role-based-agent-retrospective",
        "mediness.quality-evidence-harness",
        "mediness.ai-qa-team-operation",
      ],
    },
    {
      no: "04",
      title: "Thready 기능을 대화 하나로 제어하되, 변경 작업은 사람 확인과 멱등 receipt를 거쳐야 실행되는 Agent를 prototype으로 검증했습니다",
      description: [
        "원하는 작업을 말하면 제품이 허용된 기능을 골라 실행하는 흐름이 성립하는지, 변경 작업을 어디까지 agent에 맡길지 검증이 필요했습니다.",
        {
          text: "multi-agent 대신 planner-executor 하나로 두고, planner는 계획만 만들며 실행은 등록된 capability만, 변경은 다음 turn의 typed confirmation과 멱등 receipt를 통과할 때만 하게 했습니다.",
          source: "Agent prototype",
        },
        {
          text: [
            { text: "승인 전 무변경·승인 뒤 상태 전이·새로고침 뒤 복원을 검증했고 " },
            { text: "prototype test 679개 통과", tone: "metric" },
            { text: ". agent가 준비할 일과 사람이 확정할 일의 경계를 코드로 검증했습니다." },
          ],
          source: "Agent prototype",
        },
      ],
      claimIds: [
        "thready.agent-pipeline-design",
        "thready.conversational-editorial-agent-prototype",
      ],
    },
  ],
  workStyles: [],
  skills: [
    {
      label: "제품 실행 체계",
      stack: "Jira · release gate · ADR · runbook · agent context",
      via: "결정·명세·작업·릴리스 기록을 사람과 agent가 같은 맥락으로 읽는 체계 운영, 요구사항 구체화·사용자 피드백 반영",
      claimIds: [
        "mediness.product-operations",
        "mediness.product-development-coordination-leverage",
        "mediness.company-work-ax-design",
      ],
    },
    {
      label: "Coding Agent",
      stack: "Claude Code · Codex",
      via: "codebase 분석·기능 inventory·반복 구현·검증에 활용, architecture·test·release 판단은 직접 소유. 팀 주 1회 agent 활용 회고",
      claimIds: ["career.coding-agent-usage", "career.weekly-role-based-agent-retrospective"],
    },
    {
      label: "AI Application",
      stack: "LLM 연동 · typed prompt · LLM judge/evaluation · 품질 라벨링 · 외부 모델 장애 대응",
      via: "LLM 기능을 백엔드·관리 화면·품질 검수·외부 모델 장애 대응까지 포함해 운영",
      claimIds: [
        "thready.ai-service-boundary",
        "thready.generation-quality-system",
        "thready.labeling-corpus-workbench",
        "thready.provider-failure-continuity",
      ],
    },
    {
      label: "Agent Engineering",
      stack: "planner-executor · capability registry · artifact ledger · confirmation gate",
      via: "자연어 요청을 실행 계획과 등록 capability로 연결하고 상태 기록·사람 승인 경계를 구현",
      claimIds: [
        "thready.agent-pipeline-design",
        "thready.conversational-editorial-agent-prototype",
      ],
    },
    {
      label: "Backend / API",
      stack: "Python · FastAPI · SQLAlchemy 2.0 async · PostgreSQL · MySQL · Redis · RabbitMQ · TaskIQ · WebSocket",
      via: "제품 API·AI 서비스·transaction/session·외부 시스템 연동을 설계하고 운영",
      claimIds: [
        "thready.ai-service-boundary",
        "be-template.fastapi-sqlalchemy-standard",
        "centurion.bay-async-backend",
        "career.memento-fastapi-backend",
      ],
    },
    {
      label: "연동·관측",
      stack: "Stripe · 카카오 알림톡 · STT/LLM provider · Sentry",
      via: "외부 결제 보상 처리, 알림 worker, 외부 AI 장애 감지·모델 격리 운영",
      claimIds: [
        "career.memento-stripe-prepayment",
        "career.memento-happycall-survey",
        "thready.provider-failure-continuity",
      ],
    },
    {
      label: "Frontend / Delivery",
      stack: "TypeScript · Next.js · Docker · GitHub Actions · Kubernetes(kubeadm · ArgoCD) · pytest · Ruff · Pyright",
      via: "주요 사용자 화면과 관리 기능을 coding agent로 구현하고, 직접 검수해 공통 검증 기준을 통과한 뒤 배포. 회사 k8s 클러스터 설계 검토에 참여하고 같은 설계를 개인 Mac에 직접 재구축",
      claimIds: [
        "infra.k8s-lab-rebuild",
        "thready.frontend-product-delivery",
        "be-template.backend-standard",
        "be-template.agent-context",
      ],
    },
  ],
  credentials: [
    { period: "2022.10 출원\n2025.12경 등록", text: "특허 「페이지 출력 방법」 · 등록 10-2898273", claimIds: ["credentials.page-output-patent"] },
    { period: "2024.01", text: "CES 2024 Best of Innovation · AI 부문 수상 제품 참여", claimIds: ["credentials.ces-2024"] },
    { period: "2022.11경", text: "한국건설생활환경시험연구원(KCL) AI 정확도 인증 통과 제품 참여", claimIds: ["credentials.ai-accuracy-certification"] },
    { period: "2021.09", text: "ADsP · 데이터분석 준전문가", claimIds: ["credentials.adsp"] },
    { period: "2016.03\n- 2021.08", text: "우송대학교 게임멀티미디어 전공 · 졸업", claimIds: ["credentials.education"] },
  ],
} satisfies TailoredResume;
