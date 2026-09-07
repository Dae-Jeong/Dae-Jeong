import type { CareerDescriptionDocument } from "./types";

// JYP-W1 공개 경력기술서 문안 export. 소제목·문단·목록은 원문 순서대로 유지한다.
export const JYP_V2_CAREER_DESCRIPTION = {
  "kind": "career-description",
  "slug": "jyp-v2",
  "companyName": "JYP ENTERTAINMENT",
  "targetRole": "Software Engineer / AI",
  "status": "draft",
  "visibility": "local",
  "locale": "ko",
  "updatedAt": "2026-09-07",
  "presentation": "narrative",
  "title": "경력기술서",
  "subtitle": "가능성을 기회로 바꾸고, 제품으로 가치를 전하는 메이커 김대정입니다.",
  "name": "김대정",
  "role": "Software Engineer / AI · Backend Engineer",
  "contacts": [
    {
      "label": "marin.backend@gmail.com",
      "href": "mailto:marin.backend@gmail.com"
    },
    {
      "label": "github.com/Dae-Jeong",
      "href": "https://github.com/Dae-Jeong",
      "external": true
    },
    {
      "label": "marinkim.xyz",
      "href": "https://marinkim.xyz",
      "external": true
    }
  ],
  "summary": [
    "기획자로 시작해 백엔드로 왔고, AI 콘텐츠 제품의 기능 우선순위와 생성 품질 기준을 구현·출시·운영으로 연결해 왔습니다. 제품 백엔드와 AI 시스템을 직접 구축하고 핵심 화면은 coding agent로 완성했으며, 동료들의 제품 구현을 지원하는 공통 백엔드 템플릿도 설계·구축했습니다."
  ],
  "companies": [
    {
      "id": "medisolve-ai",
      "organization": "MediSolve AI",
      "period": "2025.04 — 재직 중 · 초기 멤버 영입",
      "role": "Tech Lead · Backend Engineer",
      "summary": [
        "법인 설립 전 더데이랩스 프리랜서 선행 개발 · 2025.02 — 2025.04"
      ],
      "projects": [
        {
          "id": "thready-paid-product",
          "title": "프로젝트 01. Thready · 구독형 AI 콘텐츠 제품",
          "claimIds": [
            "thready.product-zero-to-one-contribution",
            "thready.threads-content-workflow-automation",
            "thready.frontend-product-delivery",
            "thready.generation-quality-system",
            "thready.labeling-corpus-workbench",
            "thready.measurement-correction",
            "thready.langgraph-generation-graph",
            "thready.ai-service-boundary",
            "thready.ai-replica-outbox",
            "thready.ai-service-migration",
            "thready.provider-failure-continuity",
            "career.coding-agent-usage"
          ],
          "sections": [
            {
              "title": "고객 업무를 제품으로 구체화",
              "paragraphs": [
                "고객은 Threads에 올릴 참고 자료를 정리하고, 초안을 쓰고, 검수해 예약·발행하는 일을 반복하고 있었습니다. 제품 아이디어를 제안한 뒤 초기 프로토타입 이후 제품화를 맡아 기획·QA·마케팅과 고객 문제, 기능 우선순위, 생성 품질 기준을 구체화했습니다.",
                "자료 정리·초안·1차 검수는 AI가 처리하고 사용자는 결과를 수정해 예약·발행을 결정하도록 구성했습니다. 제품 백엔드와 AI 생성·평가 시스템은 직접 구축하고, 콘텐츠 가져오기·생성·예약·발행·관리의 핵심 화면은 coding agent로 완성해 요구 정의·검수·배포를 맡았습니다. 이 구현을 QA와 릴리스로 연결하며 구독 고객이 사용하는 제품의 운영을 주도했습니다."
              ]
            },
            {
              "title": "생성 기준을 검증하는 품질 체계",
              "bullets": [
                "생성 입력과 출력 형식을 구조화하고 LLM 검수의 점수·통과 여부·사유·개선안을 이력으로 저장하는 평가 체계 구축",
                "자동 검수 이력과 사람이 남긴 품질 라벨을 분리해 생성·프롬프트 품질의 판단 근거로 사용",
                "품질 기준값이 자사 출력을 다시 근거로 삼던 순환을 재측정으로 발견하고, 문제 정의와 개선 축을 다시 정해 기준 교정",
                "복잡하게 나뉘어 있던 생성 그래프를 단일 파이프라인으로 축소하고, 같은 검수·보정 코드를 쓰는 단일 agent 엔진과 실제 생성 흐름에서 실행 시간 비교",
                "두 엔진을 병존시켜 공통 품질 검사 위에서 실행 방식을 비교할 수 있도록 구성"
              ]
            },
            {
              "title": "제품 데이터와 AI 실행의 분리",
              "paragraphs": [
                "제품 정책·원장은 제품 백엔드가, 생성 과정과 실행 상태는 독립 AI 서비스가 맡도록 서비스·DB를 분리하고 인증된 HTTP 계약으로 연결했습니다. 분리된 서비스 사이에서 원장 변경만 성공하거나 이전 데이터가 늦게 도착하는 문제를 다루기 위해 전달 기록과 처리 상태를 명시적으로 남겼습니다."
              ],
              "bullets": [
                "원장 변경과 전달 기록을 같은 트랜잭션으로 묶고, 전달 작업의 재시도를 별도 처리",
                "전달 버전과 실행 시도 식별자를 검증해 중복·지연 전달이 최신 상태를 덮지 않도록 제어",
                "이미 반영된 변경은 멱등하게 처리하고, 최대 재시도 이후의 실패 기록을 보존해 운영자가 상태를 확인하도록 구성",
                "STG 이관 전 실데이터 복원·사전 실행을 거치고, 참조 순서에 따른 이관 뒤 행 수·내용 지문·참조 무결성 대조",
                "배포와 상태 확인이 성공해도 실제 생성이 실패한 사례를 반영해, 배포 후 생성 API의 사용자 흐름 검증 추가"
              ]
            },
            {
              "title": "운영 중의 판단",
              "paragraphs": [
                "독립 AI 서비스와 DB를 STG·운영 환경에서 사용하고 있습니다. 외부 AI 모델 장애 대응에서는 팀과 함께 오류를 확인하고 반복 장애 모델을 사용자 선택지에서 일시 제외해 정상 모델로 작업을 이어가도록 지원했습니다. 당시 사용자·트래픽 규모에 맞춰 운영자가 문제 모델을 판단하고 격리하는 방식을 선택했습니다."
              ]
            },
            {
              "title": "기술 스택",
              "paragraphs": [
                "Python · FastAPI · SQLAlchemy 2.0 async · PostgreSQL · LangGraph · LLM judge · Transactional Outbox · TypeScript · Next.js · Claude Code · Codex · Sentry · Jira"
              ]
            }
          ]
        },
        {
          "id": "backend-template",
          "title": "프로젝트 02. 공통 백엔드 템플릿 · 팀의 제품 구현 기준",
          "claimIds": [
            "be-template.backend-standard",
            "be-template.fastapi-sqlalchemy-standard",
            "be-template.team-leverage",
            "be-template.agent-context",
            "career.coding-agent-usage"
          ],
          "sections": [
            {
              "title": "동료들이 직접 구현하는 팀에 맞춘 기준",
              "paragraphs": [
                "기획·QA·디자인 담당자도 coding agent와 함께 제품을 만드는 팀에서 백엔드 구현·검증 기준을 직접 설계·구축했습니다. 개발 환경에서 정상처럼 보이던 기능이 STG QA에서 세션 미반납·연결 풀 고갈·반복 오류로 드러나면 백엔드 담당자가 원인을 찾고 코드를 보완해야 했습니다.",
                "이 문제를 기능별 지원으로만 처리하지 않고 트랜잭션·세션·API 계약을 구현 기본값에 넣었습니다. 담당자가 제품 정책을 정하면 템플릿과 coding agent가 같은 구조 안에서 구현하도록 계층별 책임과 호출 규칙을 정리했습니다."
              ]
            },
            {
              "title": "트랜잭션 정책과 세션 수명주기의 분리",
              "bullets": [
                "서비스가 트랜잭션 정책을 선언하고 데이터 접근 계층이 현재 세션을 사용하도록 구성해, 모든 계층으로 세션 인자를 전달하던 반복 제거",
                "기존 트랜잭션 참여, 새 연결·세션을 사용하는 독립 트랜잭션, 저장점을 사용하는 중첩 처리를 구분해 구현",
                "하나의 비동기 작업과 세션이 트랜잭션을 소유하도록 하고, 하위 작업이 같은 세션을 잘못 공유하면 즉시 차단",
                "작업 취소 시 롤백과 연결 정리를 통합 테스트로 검증하고, 병렬 DB 작업의 데이터 가시성·복구·연결 비용을 개발 기준으로 문서화",
                "계층별 책임·API 요청과 응답·검증 규칙·agent 작업 맥락·반복 작업 자동화를 템플릿에 내장"
              ]
            },
            {
              "title": "도입과 피드백",
              "paragraphs": [
                "신규 사내 프로그램은 템플릿 전체로 시작하고, 기존 제품은 세션 관리부터 점진적으로 도입했습니다. 세션·트랜잭션·API 계약은 공통으로 유지하면서 일반 기능과 도구 확장이 많은 AI 기능에 맞춰 구조 선택 기준을 제공했습니다. 정기 개발팀 회의에서는 템플릿 설계를 검토하고 받은 피드백을 실제 구현에 반영했습니다.",
                "기획·QA·디자인 담당자가 이 템플릿과 coding agent로 사내 프로그램을 구현했습니다. 저는 기능 구현에 상시 개입하던 방식에서 결과 피드백·배포 지원 중심으로 역할을 좁혔고, 템플릿 전체로 시작한 신규 프로그램의 STG QA에서는 같은 세션 미반납·연결 풀 고갈 문제가 다시 관측되지 않았습니다."
              ]
            },
            {
              "title": "기술 스택",
              "paragraphs": [
                "Python · FastAPI · SQLAlchemy 2.0 async · ContextVar · pytest · Claude Code · Codex"
              ]
            }
          ]
        }
      ],
      "claimIds": [
        "career.medisolve-role-evolution",
        "career.thedaylabs-freelance",
        "career.memento-to-medisolve-early-member",
        "thready.product-zero-to-one-contribution",
        "thready.threads-content-workflow-automation",
        "thready.frontend-product-delivery",
        "thready.generation-quality-system",
        "thready.labeling-corpus-workbench",
        "thready.measurement-correction",
        "thready.langgraph-generation-graph",
        "thready.ai-service-boundary",
        "thready.ai-replica-outbox",
        "thready.ai-service-migration",
        "thready.provider-failure-continuity",
        "career.coding-agent-usage",
        "be-template.backend-standard",
        "be-template.fastapi-sqlalchemy-standard",
        "be-template.team-leverage",
        "be-template.agent-context"
      ]
    },
    {
      "id": "memento-ai",
      "organization": "Memento AI",
      "period": "2024.10 — 2025.01 · 인턴 합류 후 정규직 전환 · 회사 폐업으로 종료",
      "role": "Backend Engineer",
      "summary": [
        "예약·결제 백엔드 개발에서 선결제와 예약 처리의 실패 순서를 다뤘습니다. 결제 이력과 외부 결제 이벤트를 로컬 거래 식별자로 연결하고, 예약 처리 실패 시 결제 상태에 따라 취소 또는 환불하도록 선결제 영역을 구축했습니다. 환불 요청과 완료를 구분해 마일리지 복원·이용권 정리를 환불 완료 시점에 맞췄습니다.",
        "다국어 고객 알림에서는 알림톡·이메일의 즉시·예약 발송, 예약 변경에 따른 작업 취소·재등록, 발송 이력을 구현했습니다.",
        "기술 스택: Python · FastAPI · SQLAlchemy · MySQL · Stripe · Celery"
      ],
      "projects": [],
      "claimIds": [
        "career.memento-fastapi-backend",
        "career.memento-stripe-prepayment",
        "career.memento-payment",
        "career.memento-happycall-survey"
      ]
    },
    {
      "id": "studio-lab",
      "organization": "STUDIO LAB",
      "period": "2021.12 — 2024.01 · AI Engineer → PM(주 역할) → Backend Engineer",
      "role": "Product Manager",
      "summary": [
        "생성형 AI 커머스 콘텐츠 제품의 PM으로 프로토타입 사용 데이터를 바탕으로 제품 흐름·기능 범위·출시 우선순위를 정하고 v1.0과 외부 패션 브랜드 PoC로 연결했습니다. 상세페이지 제작 흐름 재설계는 특허 「페이지 출력 방법」 등록으로 이어졌고, 제품은 CES 2024 Best of Innovation AI 부문을 수상했습니다.",
        "AI Engineer 구간에는 의류 이미지 분석 모델 개발에 참여했고, 이후 PM과 Backend Engineer로 역할을 넓혔습니다."
      ],
      "projects": [],
      "claimIds": [
        "career.sellercanvas-product-system",
        "career.sellercanvas-enterprise-poc",
        "career.sellercanvas-vision-model-development",
        "credentials.page-output-patent",
        "credentials.ces-2024"
      ]
    },
    {
      "id": "eyesoul",
      "organization": "아이즈솔",
      "period": "2020.08 — 2021.06",
      "role": "Vision AI Engineer · 인턴",
      "summary": [
        "안면 인식 기반 자동 출결 시스템의 인식 모델·데이터 파이프라인 개발에 참여했습니다."
      ],
      "projects": [],
      "claimIds": [
        "career.ai-pm-backend-continuity"
      ]
    }
  ],
  "skills": []
} satisfies CareerDescriptionDocument;
