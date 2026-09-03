import { COMMON_CAREER_DESCRIPTION, MEDISOLVE_COMPANY } from "./common";
import type { CareerDescriptionDocument, CareerProject } from "./types";

/* JYP 경력기술서 (2026-09-03 v2 정본화) — 이력서 v2(판단·결과)와 짝을 이루는 기전·검증 층.
   원칙: 이력서 성과 순서와 같은 항목, 항목마다 문제 → 판단 → 구현 ≤3 → 검증 ≤2 → 결과 → 경계.
   내부 코드명 없음. 화면은 coding agent로 구현·직접 검수. 여섯 축(설계·보장·멱등·정합·신뢰·성능)이 제목에 드러난다.
*/

const TEMPLATE: CareerProject = {
  id: "backend-template",
  title: "Backend Template · 팀이 같은 기준으로 만들도록 설계한 FastAPI 기본값",
  context: "AI 활용이 본격화되면서 모두가 메이커로 제품을 만들고 운영하는 팀의 공통 기준",
  role: "Template 설계·구축 · 정기 개발 회의 피드백 반영 · 도입 지원",
  problem:
    "팀이 coding agent로 기능을 만들기 시작하면서 백엔드 경험이 적은 담당자도 구현에 참여했습니다. QA와 운영 준비 단계에서 사용량이나 동시 요청 조건에 따라 구조적인 문제가 자주 드러났고, 그때마다 백엔드 엔지니어의 리소스가 원인 파악과 보완에 쓰였습니다.",
  decision:
    "기능마다 완벽한 구조를 요구하는 대신 자주 틀리는 경계를 기본값으로 제공했습니다. Router가 받은 session을 모든 계층에 넘기는 반복을 없애고 Service가 transaction 정책을 선언하게 했고, tool이 늘어나는 Agent 기능만 port·adapter로 나누는 Hexagonal을, 나머지는 MVC를 기본 구조로 두었습니다.",
  implementation: [
    "@transactional decorator(REQUIRED·REQUIRES_NEW·NESTED)와 ContextVar 기반 AsyncSession resolve, 하나의 transaction을 하나의 asyncio task가 소유하는 owner-task guard를 구현했습니다.",
    "계층·책임·API 응답·검증 규칙과 ADR·runbook, agent 작업 맥락과 반복 작업 automation skill을 template에 함께 넣었습니다.",
    "ORM entity와 raw query 결과를 typed DTO로 분리하고 naming·timezone·soft delete·cursor pagination 규칙을 convention으로 고정했습니다.",
  ],
  verification: [
    "propagation·isolation·read-only·CancelledError rollback·connection cleanup을 integration test로 고정했습니다.",
    "정기 개발 회의에서 패턴 선택 기준과 구조화 비용을 검토해 반영했고, 신규 사내 프로그램은 full template으로, 기존 제품은 session 관리부터 순차 도입했습니다.",
  ],
  result:
    "full template으로 시작한 신규 프로그램의 STG QA에서 같은 유형의 session·connection 문제가 재관측되지 않았고, 기획·QA·디자인 담당자가 직접 구현하는 동안 백엔드는 결과 피드백과 배포 지원으로 개입을 줄였습니다.",
  boundary: "Template의 설계·구축은 직접 했고 각 기능 구현은 담당자의 몫입니다. 개발 속도·결함 수의 정확한 수치는 측정하지 않았습니다.",
  claimIds: [
    "be-template.backend-standard",
    "be-template.fastapi-sqlalchemy-standard",
    "be-template.team-leverage",
    "be-template.agent-context",
    "career.coding-agent-usage",
  ],
};

const THREADY_PRODUCT: CareerProject = {
  id: "thready-paid-product",
  title: "Thready · 반복하던 글 제작을 제품 흐름으로, 글의 기준은 실측으로 신뢰를 쌓은 유료 AI 제품",
  context: "아이디어 제안 → prototype 이후 제품화 주도 → 고객이 구독하는 서비스 운영",
  role: "제품 운영 리드 · Backend/AI 직접 구현 · 핵심 화면은 coding agent로 완성",
  problem:
    "여러 채널을 운영하는 고객은 자료 수집·작성·검수·예약을 매번 반복했고, 반응이 좋은 글의 기준은 감에 의존했습니다.",
  decision:
    "글쓰기만 AI에 맡기지 않고 자료 수집·정체성·작성·검수 역할을 나눠 AI는 초안과 1차 검수를, 사람은 최종 수정과 발행 판단을 맡게 했습니다. 좋은 글의 기준은 판정기가 아니라 판단 데이터를 쌓는 장치로 LLM judge를 두고, 기준 자체는 직접 수집한 실측 corpus로 다시 쟀습니다.",
  implementation: [
    "FastAPI 제품 API와 별도 AI application·DB를 인증된 HTTP 경계로 분리했습니다. 콘텐츠 가져오기·URL preview·source 검증과 생성·예약·발행·대시보드·관리 화면은 coding agent로 구현해 직접 검수·배포했습니다.",
    "typed prompt builder·planner/writer 생성·LLM judge·사람 라벨링을 분리해 평가 이력을 남기고, 대량 corpus importer는 (source, source_key) upsert와 batch rollback으로 재적재를 멱등하게 만들었습니다.",
    "품질 기준값이 자사 출력을 되먹이던 순환을 재실측으로 발견해 교정하고, 반증된 접근은 '다시 시도하지 말 것' 로그로 남겨 실험 범위를 좁혔습니다.",
  ],
  verification: [
    "local 격리 DB에서 corpus를 두 번 적재해 건수 불변과 기존 라벨 보존을 확인했고, release·QA·task 기준으로 실제 사용자 흐름의 회귀를 확인했습니다.",
    "외부 AI 5xx는 실패 유형으로 분류해 재시도·최종 실패·사용자 재시도 경로를 두고, 반복 장애 모델은 Sentry 확인 뒤 선택지에서 일시 제외했습니다.",
  ],
  result: "기획·QA·마케팅과 제품 운영을 리드해 실제 고객이 구독료를 내는 제품으로 출시·운영 중입니다.",
  boundary: "매출은 팀·제품의 결과입니다. 초기 prototype은 다른 engineer가 만들었고, 제 범위는 아이디어 제안과 prototype 이후 제품화·Backend·AI·운영 리드입니다.",
  claimIds: [
    "thready.product-zero-to-one-contribution",
    "thready.subscription-revenue-band",
    "thready.frontend-product-delivery",
    "thready.threads-content-workflow-automation",
    "thready.ai-service-boundary",
    "thready.generation-quality-system",
    "thready.threads-marketing-criteria",
    "thready.labeling-corpus-workbench",
    "thready.measurement-correction",
    "thready.falsification-log",
    "thready.provider-failure-continuity",
  ],
};

const PRODUCT_SYSTEM: CareerProject = {
  id: "product-system-qa-harness",
  title: "제품 개발 체계 · 판단의 정합이 유지되는 기록 구조와 evidence로 닫는 QA 판정 규칙",
  context: "제품별 결정·명세·작업·QA·릴리스 운영 리드, QA 팀과의 하네스화, 회사 AX 구조 설계 참여",
  role: "제품 단위 운영 리드 · QA 판정 규칙 설계 · 회사 AX 설계 참여",
  problem:
    "제품 간 맥락 공유가 사람에 의존해 요구·판단을 재확인하는 비용이 컸고, 담당 교체·병행 시 실행이 지연되는 병목이 잦았습니다. QA는 실행이 성공하면 통과로 보는 경우가 있어 AI 기능의 품질 판정이 흐려졌습니다.",
  decision:
    "결정·명세·작업·릴리스 근거를 실행 원장으로 축적해 사람과 AI가 같은 맥락을 읽게 하되, 우선순위·승인·릴리스처럼 판단이 필요한 단계는 사람이 확정하는 경계를 지켰습니다. QA는 요구사항을 REQ로 쪼개 evidence로 닫는 판정 규칙을 세우고, 실행 성공과 품질 통과를 분리했습니다.",
  implementation: [
    "제품별 pipeline registry에 결정·명세·작업 기록을 실행 원장으로 적용하고, BE·FE·QA 담당 lane과 QA 승인을 release gate에 연결해 release note 생성을 자동화했습니다.",
    "전 제품 공통 Quality Evidence Harness를 QA 팀원의 서포트를 받아 작성했습니다. REQ별 evidence plan(FE·DB·Log·Network·AI quality), PASS/FAIL/UNKNOWN 판정, 반복 이슈의 자동화 승격, LLM judge 단독 승인 금지가 규칙입니다.",
    "이 판정 layer를 QA 팀이 운영하는 AI QA 에이전트 파이프라인(시나리오→TC→자동화→버그 등록)에 연결하고, 백그라운드 작업의 고장 모드 카탈로그와 fault-injection QA를 설계로 제안했습니다.",
  ],
  verification: [
    "팀 주 1회 agent 활용 회고로 무엇을 만들지와 구현 방법을 함께 정했고, Slack에서 접수한 이슈를 사내 시스템에 남겨 해결 상태를 추적하는 흐름을 제안했습니다.",
  ],
  result:
    "담당자가 바뀌어도 기록에서 업무를 이어가 인수인계·맥락 복원 비용이 낮아졌고, 유사 기능에서 기존 판단을 재사용해 lead time 단축에 기여했습니다. 이 구조를 회의·의사결정·업무 배정·승인으로 넓히는 회사 AX 설계에 참여했습니다.",
  boundary:
    "전사 문서 규칙 정의와 QA AI 에이전트 플러그인 구현은 다른 담당자가 주도했습니다. 제 범위는 제품 단위 적용·운영 리드, 공통 QA 판정 규칙 설계, AI QA 팀 운영 참여입니다. lead time·QA 시간의 수치는 측정하지 않았습니다.",
  claimIds: [
    "mediness.product-operations",
    "mediness.product-development-coordination-leverage",
    "mediness.company-work-ax-design",
    "mediness.quality-evidence-harness",
    "mediness.ai-qa-team-operation",
    "mediness.slack-issue-intake-flow-proposal",
    "career.weekly-role-based-agent-retrospective",
  ],
};

const AGENT_PROTOTYPE: CareerProject = {
  id: "agent-prototype",
  title: "대화형 제품 제어 Agent · 계획과 실행 권한을 나누고 변경은 사람 확인과 멱등 receipt를 거치는 prototype",
  context: "Thready 기능을 대화로 제어하는 흐름의 성립 여부와 변경 작업의 위임 범위 검증",
  role: "planner-executor·capability registry·상태 원장 설계·구현·검증",
  problem:
    "원하는 작업을 말하면 제품이 허용된 기능을 골라 실행하는 흐름이 실제로 성립하는지, 예약·발행·삭제 같은 변경 작업을 어디까지 agent에 맡길지 검증이 필요했습니다.",
  decision:
    "multi-agent 대신 planner-executor 하나로 두고 planner는 typed plan만 만들게 했습니다. 실행은 capability registry가 등록·일치를 확인한 action만 dispatch하고, 변경 작업은 다음 turn의 typed confirmation과 receipt idempotency를 통과할 때만 상태를 바꿉니다.",
  implementation: [
    "글감 탐색·기획·작성·수정 7개 편집 action과 계정·게시물·성과 13개 운영 action을 capability로 등록하고, 편집은 기존 writer를 재사용했습니다.",
    "conversation·message·turn·tool result·versioned artifact를 분리한 원장과 append-only activity event, token-aware context selection과 compaction snapshot을 구현했습니다.",
    "명확한 읽기 요청은 deterministic fast lane으로 처리하고, 모호한 mutation 요청은 planner fallback으로 실행하지 않게 했습니다.",
  ],
  verification: [
    "승인 전 무변경·승인 뒤 상태 전이·새로고침 뒤 activity와 artifact 복원을 확인했고 prototype 전체 test 679개가 통과했습니다.",
  ],
  result: "agent가 준비할 일과 사람이 확정할 일의 경계를 코드로 검증했습니다.",
  boundary: "독립 prototype입니다. 운영 action은 Mock gateway까지만 연결했고 실제 예약·발행·삭제와 운영용 durable worker는 구현 범위 밖입니다.",
  claimIds: ["thready.agent-pipeline-design", "thready.conversational-editorial-agent-prototype"],
};

const AI_RUNTIME: CareerProject = {
  id: "thready-ai-runtime",
  title: "Thready AI 실행부 · 전달 보장·멱등 소비·정합 검증으로 원장과 AI 상태를 분리",
  context: "AI 실행부의 독립 application·DB 분리, STG 실데이터 이관, 서비스 간 durable delivery, 생성 원장의 경합 중재",
  role: "경계 설계·구현·migration·검증 직접 수행",
  problem:
    "제품 정책·원장과 AI 생성 lifecycle이 한 backend·DB에 있어 AI 확장과 장애가 원장에 결합됐고, 분리 뒤에는 전달 유실과 역순 도착이 최신 상태를 덮을 수 있었습니다. 다중 worker가 같은 생성 원장을 두고 경합하는 문제도 있었습니다.",
  decision:
    "DB를 공유하지 않고 독립 FastAPI application·DB로 분리해 인증된 HTTP 계약으로만 연결하고, 전달은 원장 변경과 같은 transaction에 기록하는 Transactional Outbox로 두었습니다. 생성 원장은 상태 전이 규칙을 entity에 복원하고 version CAS로 경합을 중재했습니다.",
  implementation: [
    "lease 기반 claim·attempt token·delivery version fence·멱등 consumer·최대 재시도 뒤 terminal failure 보존을 구현했습니다.",
    "생성 원장은 optimistic lock으로 다중 worker 승자를 정하고, 멱등 replay 판별과 전이가 같은 판정을 쓰게 해 이중 정의를 없앴습니다. quota는 예약 시점에 잡고 admission gate가 확정 사용량과 진행 중 예약을 함께 봐 동시 요청의 초과 실행을 막습니다.",
    "STG 생성 이력·품질 기록·실행 추적을 parent→child 순서로 streaming copy했고 영구 cross-DB link는 쓰지 않았습니다.",
  ],
  verification: [
    "local rehearsal·건수·id·status·사유를 결합한 MD5 fingerprint·FK orphan 0건으로 이관 정합성을 확인했고, stale PUT/DELETE fence test와 양쪽 서비스 전체 회귀를 통과했습니다.",
    "health가 성공해도 생성이 실패한 사례를 계기로 배포 성공과 기능 동작을 분리한 post-deploy 생성 API E2E gate를 세웠습니다.",
  ],
  result: "독립 AI application·DB를 STG·Prod에서 운영 중이며, 지연·중복·역순 전달이 최신 원장 상태를 덮지 않는 복구 경계를 확보했습니다.",
  boundary: "Prod migration 완료와 무중단 전환은 주장하지 않습니다. 경합·초과 실행 건수는 측정하지 않았습니다.",
  claimIds: [
    "thready.ai-service-boundary",
    "thready.ai-service-migration",
    "thready.ai-replica-outbox",
    "thready.generation-aggregate-optimistic-lock",
    "thready.generation-quota-admission",
  ],
};

export const JYP_CAREER_DESCRIPTION: CareerDescriptionDocument = {
  ...COMMON_CAREER_DESCRIPTION,
  slug: "jyp",
  companyName: "JYP Entertainment",
  targetRole: "Software Engineer / AI",
  title: "경력기술서",
  subtitle: "가능성을 제품으로 만들고, 끝까지 책임지는 Product Engineer 김대정입니다.",
  role: "Software Engineer / AI · Backend Engineer",
  updatedAt: "2026-09-03",
  summary: [
    "기획자로 시작해 백엔드로 왔고, 지금은 고객이 구독하는 AI 제품을 만들고 운영합니다.",
    "이 문서는 이력서의 성과를 같은 순서로 풀어, 각 항목에서 무엇이 문제였고 무엇을 판단했으며 어떤 경계를 구현하고 어떻게 검증했는지를 적었습니다. 화면은 coding agent로 구현하고 직접 검수했으며, 수치는 측정된 것만 썼습니다.",
  ],
  companies: [
    {
      ...MEDISOLVE_COMPANY,
      role: "Tech Lead · Backend Engineer",
      summary:
        "AI 활용이 본격화되면서 모두가 메이커로 제품을 만들고 운영하는 팀에서, 제품별 결정·QA·릴리스 운영을 리드하고 Backend·AI application을 직접 구현했습니다. 팀이 같은 기준으로 만들 수 있는 Backend Template과 QA 판정 규칙은 직접 설계했습니다.",
      projects: [TEMPLATE, THREADY_PRODUCT, PRODUCT_SYSTEM, AGENT_PROTOTYPE, AI_RUNTIME],
    },
    ...COMMON_CAREER_DESCRIPTION.companies.filter((company) => company.id !== "medisolve-ai"),
  ],
};
