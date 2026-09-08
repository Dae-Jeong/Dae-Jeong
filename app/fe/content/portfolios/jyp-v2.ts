import type { NarrativePortfolio } from "./narrative-types";

// Prose owner: wiki/products/resume/tailored/jyp-entertainment/2026-08-29_jype-career_software-engineer-ai/content-draft.md
// JYP-W1 · 2026-09-07. Separate preview; the original JYP package is preserved.
export const JYP_V2_PORTFOLIO = {
  slug: "jyp-v2",
  label: "JYP ENTERTAINMENT · Software Engineer / AI",
  visibility: "local",
  updatedAt: "2026-09-07",
  name: "김대정",
  role: "Software Engineer / AI · Backend Engineer",
  contacts: [
    { label: "marin.backend@gmail.com", href: "mailto:marin.backend@gmail.com" },
    { label: "github.com/Dae-Jeong", href: "https://github.com/Dae-Jeong", external: true },
    { label: "marinkim.xyz", href: "https://marinkim.xyz", external: true },
  ],
  headline: "가능성을 기회로 바꾸고, 제품으로 가치를 전하는 메이커 김대정입니다.",
  introduction: "기획자로 시작해 백엔드로 왔고, 고객이 반복하던 콘텐츠 제작을 AI 제품으로 구현해 기획·QA·마케팅과 함께 구독 서비스로 운영합니다. 제품 백엔드와 생성·평가 시스템을 직접 구축하고 핵심 화면은 coding agent로 완성했으며, 동료들도 제품을 만들 수 있도록 공통 백엔드 템플릿을 구축했습니다.",
  cases: [
    {
      id: "thready",
      title: "AI 콘텐츠 제품의 0→1 제품화와 구독 운영 주도",
      scope: "Thready · MediSolve AI · 제품화·운영 주도, 백엔드·AI 시스템 직접 구축",
      claimIds: [
        "thready.product-zero-to-one-contribution", "thready.subscription-revenue-band", "thready.frontend-product-delivery",
        "thready.threads-content-workflow-automation", "thready.generation-quality-system",
        "thready.labeling-corpus-workbench", "thready.measurement-correction",
        "thready.langgraph-generation-graph", "thready.ai-replica-outbox",
        "thready.ai-service-migration", "career.coding-agent-usage",
        "thready.ai-service-boundary", "thready.provider-failure-continuity",
      ],
      sections: [
        {
          title: "고객의 반복 업무에서 시작한 제품",
          paragraphs: [
            "고객은 참고 자료를 모아 글로 정리하고 검수해 예약·발행하는 과정을 반복해야 했습니다. 아이디어 제안부터 제품화를 주도하며, 기획·QA·마케팅과 함께 고객 불편을 기능 우선순위와 생성 품질 기준으로 구체화했습니다.",
            "자료 준비부터 생성·검수·예약·발행까지 이어지는 제품 백엔드와 AI 시스템을 구축했습니다. 핵심 사용자·관리 화면은 coding agent로 완성하고 요구 정의·검수·배포를 맡아 구독 고객이 실제로 사용하는 흐름으로 연결했습니다.",
          ],
          table: {
            columns: ["단계", "제품이 처리하는 일", "사용자가 결정하는 일"],
            rows: [
              ["자료 준비", "콘텐츠 가져오기, URL 미리보기·정리", "사용할 자료 선택"],
              ["생성·검수", "초안 생성, LLM 1차 검수, 점수·사유·개선안 기록", "결과 확인·수정"],
              ["예약·발행", "예약·발행 기능과 콘텐츠 상태 관리", "예약·발행 여부 결정"],
            ],
          },
        },
        {
          title: "생성 결과와 평가 기준을 함께 검증",
          paragraphs: [
            "검수 결과를 통과·실패만으로 남기면 생성 문제의 원인을 되짚기 어렵습니다. 점수·사유·개선안을 생성 이력과 함께 저장하고, 자동 검수와 사람이 남긴 품질 라벨을 나눠 판단 근거를 쌓았습니다.",
            "평가 기준도 다시 확인했습니다. 품질 기준값이 자사 출력을 근거로 되먹임하던 순환을 재측정으로 발견하고, 기존 기준에 규칙을 더하기보다 문제와 개선 축을 다시 정해 기준을 교정했습니다.",
            "생성 실행부에서는 복잡한 그래프를 단일 파이프라인으로 줄였습니다. 같은 검수·보정 코드를 공유하는 단일 agent 엔진과 그래프 엔진을 실제 생성 흐름에서 비교해, 공통 품질 검사 위에서 두 실행 방식을 함께 사용할 수 있도록 구성했습니다.",
          ],
        },
        {
          title: "제품 원장과 AI 실행을 나눠 운영",
          paragraphs: [
            "제품 정책·원장은 제품 백엔드가, 생성 과정·실행 상태는 독립 AI 서비스가 소유하도록 서비스와 DB를 분리했습니다. 두 서비스는 인증된 HTTP 계약으로 연결하고, 원장 변경과 전달 기록을 같은 트랜잭션에 저장했습니다.",
          ],
          table: {
            columns: ["실패 가능성", "구현한 처리", "검증 근거"],
            rows: [
              ["원장 변경 후 전달 실패", "전달 기록을 남기고 별도 재시도, 최대 재시도 후 실패 상태 보존", "백엔드·AI 서비스 회귀 테스트"],
              ["이전 데이터가 늦게 도착하거나 중복 전달", "전달 버전·실행 시도 검증, 이미 반영한 변경의 멱등 처리", "오래된 수정·삭제 요청의 차단 테스트"],
              ["데이터 이관 후 참조·내용 불일치", "참조 순서에 맞춰 이관하고 행 수·내용 지문·참조 무결성 대조", "STG 실데이터 사전 실행과 이관 검증"],
              ["배포 성공 후 실제 생성 실패", "상태 확인과 실제 생성 API 검증을 분리", "배포 후 사용자 생성 흐름 검증"],
            ],
          },
          afterTable: ["독립 AI 서비스·DB를 운영하면서 외부 모델 장애도 처리했습니다. 팀과 함께 오류를 감지하고 반복 장애 모델을 선택지에서 일시 제외해, 사용자가 정상 모델로 작업을 이어갈 수 있도록 지원했습니다."],
        },
        {
          title: "기술 스택",
          paragraphs: ["Python · FastAPI · SQLAlchemy 2.0 async · PostgreSQL · LangGraph · LLM judge · Transactional Outbox · TypeScript · Next.js · Claude Code · Codex · Sentry · Jira"],
        },
      ],
    },
    {
      id: "backend-template",
      title: "기획·QA·디자인 담당자도 제품을 만드는 백엔드 기준 구축",
      scope: "공통 백엔드 템플릿 · MediSolve AI · 설계·구축 전담",
      claimIds: ["be-template.backend-standard", "be-template.fastapi-sqlalchemy-standard", "be-template.team-leverage", "be-template.agent-context", "career.coding-agent-usage"],
      sections: [
        {
          title: "반복되던 구현 지원을 공통 기본값으로 전환",
          paragraphs: [
            "기획·QA·디자인 담당자도 coding agent로 제품을 만드는 팀에서, 세션 미반납과 연결 풀 고갈이 STG QA에 이르러 드러나곤 했습니다. 기능마다 세션·트랜잭션을 설명하고 코드를 보완하는 일을 줄이기 위해 구현·검증 규칙을 템플릿에 넣었습니다.",
            "서비스가 제품 정책과 트랜잭션 범위를 선언하면 세션 생성·참여·커밋·롤백·정리는 공통 구현이 담당하도록 구성했습니다. 계층별 책임과 API 계약, agent 작업 맥락을 함께 제공해 기능 담당자가 같은 기준으로 구현하게 했습니다.",
          ],
          table: {
            columns: ["구분", "담당하는 책임"],
            rows: [
              ["기능 담당자·서비스", "제품 정책, 기능 흐름, 트랜잭션 정책 선언"],
              ["공통 템플릿", "세션 수명주기, 트랜잭션 참여·분리·저장점, 취소 시 정리"],
              ["데이터 접근 계층", "현재 세션을 이용한 조회·변경"],
              ["검증 기준", "세션 소유권, 하위 작업의 잘못된 공유 차단, 롤백·연결 정리 테스트"],
            ],
          },
        },
        {
          title: "오류를 만드는 경계까지 테스트",
          paragraphs: [
            "하위 비동기 작업이 같은 세션을 상속받아 동시에 접근하면 세션의 소유권이 흐려질 수 있습니다. 하나의 작업과 세션이 트랜잭션을 소유하도록 하고, 같은 세션의 잘못된 공유를 즉시 차단했습니다. 취소 시 롤백과 연결 정리도 통합 테스트로 검증했습니다.",
            "병렬 DB 작업은 트랜잭션을 어디서 나누고 어떤 데이터를 볼 수 있어야 하는지, 실패를 어떻게 복구하고 연결 비용을 감당할지를 먼저 정하도록 문서화했습니다. 기능마다 구조를 새로 해석하지 않도록 계층별 책임과 호출 규칙도 기본값으로 제공했습니다.",
          ],
        },
        {
          title: "실제 사용과 피드백으로 이어진 결과",
          paragraphs: [
            "신규 사내 프로그램은 템플릿 전체로 시작하고 기존 제품은 세션 관리부터 점진 도입했습니다. 정기 개발팀 회의에서 구조를 검토하고 피드백을 구현에 반영하면서 사용 기준을 다듬었습니다.",
            "기획·QA·디자인 담당자가 coding agent와 템플릿으로 사내 프로그램을 직접 구현했습니다. 백엔드의 지원은 기능 구현의 상시 개입에서 결과 피드백·배포 지원 중심으로 좁아졌고, 템플릿 전체를 적용한 신규 프로그램의 STG QA에서 같은 세션 미반납·연결 풀 고갈 문제가 다시 관측되지 않았습니다.",
          ],
        },
        {
          title: "기술 스택",
          paragraphs: ["Python · FastAPI · SQLAlchemy 2.0 async · ContextVar · pytest · Claude Code · Codex"],
        },
      ],
    },
  ],
} satisfies NarrativePortfolio;
