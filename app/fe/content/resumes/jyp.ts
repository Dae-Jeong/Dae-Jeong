import type { TailoredResume } from "./types";

// 2026-09-07: 검토한 v2를 JYP 기본 이력서(v1)로 승격. 사실·문장 owner: 해당 지원본 content-draft.md.
export const JYP_RESUME = {
  slug: "jyp",
  companyName: "JYP ENTERTAINMENT",
  position: "Software Engineer / AI",
  status: "draft",
  visibility: "local",
  updatedAt: "2026-09-07",
  sectionOrder: [
    "profile",
    "career",
    "outcomes",
    "skills",
    "credentials"
  ],
  header: {
    name: "김대정",
    role: "Software Engineer / AI · Backend Engineer",
    photoSrc: "/profile/daejeong-profile-v2.png",
    careerLine: "실무 4년차 · MediSolve AI · 2025.04 — 재직 중",
    contacts: [
      {
        label: "marin.backend@gmail.com",
        href: "mailto:marin.backend@gmail.com"
      },
      {
        label: "github.com/Dae-Jeong",
        href: "https://github.com/Dae-Jeong",
        external: true
      },
      {
        label: "marinkim.xyz",
        href: "https://marinkim.xyz",
        external: true
      }
    ]
  },
  summary: [
    {
      text: "가능성을 기회로 바꾸고, 제품으로 가치를 전하는 메이커 김대정입니다."
    },
    {
      text: "기획자로 시작해 백엔드로 왔고, 아이디어를 제안한 AI 콘텐츠 제품의 백엔드와 생성·평가 시스템을 직접 구축해 기획·QA·마케팅과 함께 구독 고객이 있는 제품으로 운영합니다. 핵심 화면은 coding agent로 완성하고, 기획·QA·디자인 담당자도 제품을 만들 수 있도록 백엔드 구현·검증 기준과 agent 작업 맥락을 공통 템플릿에 내장했습니다.",
      claimIds: [
        "career.ai-pm-backend-continuity",
        "thready.product-zero-to-one-contribution",
        "thready.threads-content-workflow-automation",
        "thready.frontend-product-delivery",
        "thready.generation-quality-system",
        "be-template.backend-standard",
        "be-template.fastapi-sqlalchemy-standard",
        "be-template.team-leverage",
        "be-template.agent-context",
        "career.coding-agent-usage"
      ]
    }
  ],
  careers: [
    {
      org: "MediSolve AI",
      period: "2025.04 — 재직 중",
      now: true,
      role: "Tech Lead · Backend Engineer · 초기 멤버 영입",
      details: [
        "법인 설립 전 더데이랩스 프리랜서 선행 개발 · 2025.02 — 2025.04",
        "구독형 AI 콘텐츠 제품 — Thready 아이디어 제안부터 제품화·출시·운영까지 주도. 기획·QA·마케팅과 함께 월 1천만원 수준의 구독 매출이 발생하는 제품 운영(2026년 8월 기준)",
        "피부과 운영·예약 시스템 — 여러 피부과의 홈페이지·관리 API를 분리한 백엔드 설계·구축 주도. 관리자 API의 작업 지점은 요청 값 대신 서버 인증 상태로 결정하고, 권한 검증을 거쳐야 전환하도록 설계",
        "주문·재고 자동화 — 주문·재고 API 구축 주도. 자동 발주 뒤 알림을 비동기로 처리하고 최종 발송 실패를 주문 상태·이력에 반영해, 재시도 이후에도 실패한 알림을 수동 재발송할 수 있도록 구현",
        "실시간 AI 상담 — 종료된 세션이 다시 연결되는 경합을 정리하고, 전사·보정 결과를 같은 발화 식별자로 연결해 늦은 보정이 다른 발화를 덮지 않도록 공동 안정화",
        "팀 개발 기준 — 동료가 기능마다 DB 세션을 직접 관리하지 않도록 공통 템플릿과 agent 작업 맥락 구축. 같은 세션을 여러 비동기 작업이 공유하지 못하게 하고, 취소 시 롤백·연결 반환을 통합 테스트로 검증"
      ],
      claimIds: [
        "career.medisolve-role-evolution",
        "career.thedaylabs-freelance",
        "career.memento-to-medisolve-early-member",
        "thready.product-zero-to-one-contribution",
        "thready.subscription-revenue-band",
        "nexus.backend-architecture",
        "nexus.admin-backend-ownership",
        "nexus.branch-access-boundary",
        "centurion.bay-async-backend",
        "centurion.say-realtime-ai",
        "be-template.backend-standard",
        "be-template.fastapi-sqlalchemy-standard",
        "be-template.team-leverage",
        "be-template.agent-context"
      ]
    },
    {
      org: "Memento AI",
      period: "2024.10 — 2025.01",
      role: "Backend Engineer · 인턴 합류 후 정규직 전환 · 회사 폐업으로 종료",
      details: [
        "예약 API와 외부 선결제 연동 개발, 예약 실패 시 결제 상태에 따른 취소·환불 처리와 환불 완료 시점의 마일리지·이용권 정합성 보완",
        "다국어 알림톡·이메일의 즉시·예약 발송, 예약 작업 취소·재등록과 발송 이력 구현"
      ],
      claimIds: [
        "career.memento-fastapi-backend",
        "career.memento-stripe-prepayment",
        "career.memento-payment",
        "career.memento-happycall-survey"
      ]
    },
    {
      org: "STUDIO LAB",
      period: "2021.12 — 2024.01",
      role: "Product Manager · AI Engineer → PM(주 역할) → Backend Engineer",
      details: [
        "생성형 AI 커머스 콘텐츠 제품의 PM으로 프로토타입 사용 데이터를 바탕으로 제품 흐름·기능 범위·출시 우선순위를 정하고 v1.0과 외부 패션 브랜드 PoC로 연결",
        "상세페이지 제작 흐름 재설계로 특허 「페이지 출력 방법」 등록에 기여. AI Engineer 구간에서는 의류 이미지 분석 모델 개발에 참여"
      ],
      claimIds: [
        "career.sellercanvas-product-system",
        "career.sellercanvas-enterprise-poc",
        "career.sellercanvas-vision-model-development",
        "credentials.page-output-patent"
      ]
    },
    {
      org: "아이즈솔",
      period: "2020.08 — 2021.06",
      role: "Vision AI Engineer · 인턴",
      details: [
        "안면 인식 기반 자동 출결 시스템의 인식 모델·데이터 파이프라인 개발에 참여"
      ],
      claimIds: [
        "career.ai-pm-backend-continuity"
      ]
    }
  ],
  outcomes: [
    {
      no: "01",
      title: "AI 콘텐츠 제품의 0→1 제품화와 구독 운영 주도",
      description: [
        "Thready · MediSolve AI",
        {
          text: "AI 콘텐츠 제품 아이디어 제안부터 제품화·출시·운영까지 주도. 기획·QA·마케팅과 함께 실제 고객이 구독하고 매출이 발생하는 제품으로 발전"
        },
        {
          text: "고객의 반복적인 콘텐츠 제작 업무를 기능 우선순위와 제품 흐름으로 구체화. AI가 자료 정리·초안·1차 검수를 맡고 사용자가 수정·예약·발행을 결정하도록 구성"
        },
        {
          text: "제품 백엔드와 AI 생성·평가 시스템을 직접 구축하고, 핵심 화면은 coding agent로 완성해 요구 정의·검수·배포까지 담당"
        },
        {
          text: "구조화한 프롬프트와 LLM 검수의 점수·통과 여부·사유·개선안을 이력으로 저장해 생성 품질 판단에 활용. 자사 출력이 품질 기준으로 되먹임되던 순환을 재측정으로 발견하고 기준 재수립"
        },
        {
          text: "배포 상태 확인에 실제 생성 API의 사용자 흐름 검증을 추가하고, 독립 AI 서비스·DB를 운영. 외부 AI 모델 장애는 팀과 함께 감지하고 반복 장애 모델을 선택지에서 일시 제외해 정상 모델로 작업을 이어가도록 지원"
        }
      ],
      claimIds: [
        "thready.product-zero-to-one-contribution",
        "thready.subscription-revenue-band",
        "thready.threads-content-workflow-automation",
        "thready.frontend-product-delivery",
        "thready.generation-quality-system",
        "thready.measurement-correction",
        "thready.ai-service-boundary",
        "thready.ai-service-migration",
        "thready.provider-failure-continuity",
        "career.coding-agent-usage"
      ]
    },
    {
      no: "02",
      title: "기획·QA·디자인 담당자도 제품을 만드는 백엔드 기준 구축",
      description: [
        "공통 백엔드 템플릿 · MediSolve AI",
        {
          text: "기획·QA·디자인 담당자가 coding agent와 템플릿으로 사내 프로그램을 직접 구현하고, 백엔드의 지원 범위를 기능 구현의 상시 개입에서 결과 피드백·배포 지원으로 축소"
        },
        {
          text: "개발 환경에서는 드러나지 않던 세션 미반납·연결 풀 고갈을 STG QA 이슈에서 확인하고, 기능마다 세션 수명주기를 설명하는 대신 트랜잭션·세션 관리를 공통 기본값으로 제공"
        },
        {
          text: "서비스가 트랜잭션 정책을 선언하면 템플릿이 세션 생성·참여·커밋·롤백·정리를 담당하도록 구현. 비동기 작업 간 동일 세션의 잘못된 공유를 차단하고 취소 시 롤백·연결 정리를 통합 테스트로 검증"
        },
        {
          text: "계층별 책임·API 계약·검증 규칙·agent 작업 맥락을 템플릿에 내장하고, 정기 개발팀 회의에서 받은 구조·사용 피드백을 구현에 반영"
        },
        {
          text: "신규 프로그램에는 템플릿 전체를, 기존 제품에는 세션 관리부터 점진 도입. 템플릿 전체로 시작한 신규 프로그램의 STG QA에서 같은 세션 미반납·연결 풀 고갈 문제가 다시 관측되지 않음"
        }
      ],
      claimIds: [
        "be-template.backend-standard",
        "be-template.fastapi-sqlalchemy-standard",
        "be-template.team-leverage",
        "be-template.agent-context",
        "career.coding-agent-usage"
      ]
    }
  ],
  workStyles: [],
  skills: [
    {
      label: "Backend",
      stack: "Python · FastAPI · SQLAlchemy 2.0 async · PostgreSQL · MySQL · Redis · Celery",
      via: "",
      claimIds: [
        "be-template.fastapi-sqlalchemy-standard",
        "thready.ai-service-boundary",
        "career.memento-fastapi-backend",
        "career.memento-happycall-survey"
      ]
    },
    {
      label: "AI / LLM",
      stack: "LangGraph · LLM 연동·평가",
      via: "",
      claimIds: [
        "thready.langgraph-generation-graph",
        "thready.generation-quality-system"
      ]
    },
    {
      label: "Frontend",
      stack: "TypeScript · Next.js",
      via: "coding agent를 활용한 핵심 화면 구현",
      claimIds: [
        "thready.frontend-product-delivery",
        "career.coding-agent-usage"
      ]
    },
    {
      label: "Engineering Tools",
      stack: "Claude Code · Codex · pytest · Ruff · Pyright · Docker · GitHub Actions · Sentry · Jira",
      via: "",
      claimIds: [
        "career.coding-agent-usage",
        "be-template.fastapi-sqlalchemy-standard",
        "be-template.agent-context",
        "thready.release-operation",
        "thready.provider-failure-continuity"
      ]
    }
  ],
  additionalSkills: [{
    label: "추가 기술",
    stack: "Java · Spring · Spring Boot",
    via: "사이드 프로젝트 3개에서 활용",
    claimIds: ["career.java-spring-side-projects"]
  }],
  credentials: [
    {
      period: "",
      text: "특허 「페이지 출력 방법」 · 등록 10-2898273",
      claimIds: [
        "credentials.page-output-patent"
      ]
    },
    {
      period: "",
      text: "CES 2024 Best of Innovation · AI 부문 수상 제품 참여",
      claimIds: [
        "credentials.ces-2024"
      ]
    },
    {
      period: "",
      text: "한국건설생활환경시험연구원(KCL) AI 정확도 부문 인증 통과 제품 참여",
      claimIds: [
        "credentials.ai-accuracy-certification"
      ]
    },
    {
      period: "",
      text: "ADsP · 데이터분석 준전문가 · 2021.09",
      claimIds: [
        "credentials.adsp"
      ]
    },
    {
      period: "",
      text: "우송대학교 게임멀티미디어 전공 · 2016.03 — 2021.08 · 졸업",
      claimIds: [
        "credentials.education"
      ]
    }
  ]
} satisfies TailoredResume;
