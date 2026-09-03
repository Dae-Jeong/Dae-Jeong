import { COMMON_CAREER_DESCRIPTION, MEDISOLVE_COMPANY } from "./common";
import type { CareerDescriptionDocument, CareerProject } from "./types";

/* 피처링 경력기술서 (2026-09-03 v2 정본화) — 이력서 v2(판단·결과)의 기전·검증 층.
   항목 순서 = 이력서 성과 01~04, 그 뒤 supporting 2건(조직 표준, 여러 지점 backend).
   항목마다 문제 → 판단 → 구현 ≤3 → 검증 ≤2 → 결과 → 경계. 내부 코드명 없음. 화면은 coding agent로 구현·직접 검수.
*/

const SNS_DATA: CareerProject = {
  id: "thready-sns-data",
  title: "SNS 관측 데이터 · 성과 기준과 재적재 멱등 평가 workflow",
  context: "Threads 관측 데이터(최신 상태·시계열·원문 corpus·사람 평가)를 제품 기준과 평가 workflow로 전환",
  role: "outcome 기준 설계 · importer·API·평가 workbench 직접 구축 · 측정 기준 재실측",
  problem:
    "반응이 좋은 콘텐츠를 임계값 하나로 정의하기 어려웠고, 게시물의 최신 상태·반복 관측·원문·사람 평가가 서로 다른 생명주기를 가져 한 table로는 정합이 깨졌습니다.",
  decision:
    "URL별 최신 상태와 시계열 관측을 분리하고, 절대·저자 상대·도메인 상대·참여 품질·합의의 outcome 후보를 병렬로 설계했습니다. 품질 판정은 틀리지 않았는가(자동 게이트)·플랫폼다운가(실측 분포)·통하는가(사람) 3층으로 나눠 아래층을 못 넘으면 위층을 묻지 않게 했습니다.",
  implementation: [
    "기존 제품 projection과 FK를 공유하지 않는 독립 labeling bounded context(schema·migration·repository·service·API·UI workbench)를 구축했습니다.",
    "importer는 JSONL을 typed batch로 검증하고 post는 (source, source_key) upsert, 이어쓰기는 source post 단위 replace, malformed line은 batch rollback으로 처리해 재적재를 멱등하게 만들었습니다.",
    "사람 평가는 (source_post, labeler) unique와 upsert로 평가자별 최신 라벨만 보존하고 진행률·다음 미평가 글을 이어 볼 수 있게 했습니다.",
  ],
  verification: [
    "local 격리 DB에서 전체 corpus를 두 번 적재해 건수 불변을, 증분 병합에서 기존 라벨 보존과 신규분 반영을 확인하고 API·UI·DB를 교차 대조했습니다.",
    "측정 표본을 소표본에서 대량 corpus로 늘리는 과정에서 프롬프트 기준값이 자사 출력을 되먹이던 순환을 재실측으로 발견해 교정했고, 반증된 접근은 로그로 남겨 재시도를 막았습니다.",
  ],
  result: "감에 의존하던 글쓰기 기준이 직접 수집한 실측 corpus 기반 생성·평가 기준으로 바뀌었고, 재적재·증분 병합이 정합을 깨지 않는 평가 workflow가 됐습니다.",
  boundary: "수집기는 별도 파이프라인이고 제 범위는 정제·적재·평가 구간입니다. 전체 corpus의 STG·Production 적재 완료는 주장하지 않습니다.",
  claimIds: [
    "thready.threads-marketing-criteria",
    "thready.threads-market-outcome-design",
    "thready.labeling-corpus-workbench",
    "thready.quality-criteria-system",
    "thready.corpus-measurement",
    "thready.measurement-correction",
    "thready.falsification-log",
  ],
};

const REBUILD: CareerProject = {
  id: "thready-backend-rebuild",
  title: "Thready Backend 재구축 · 규칙을 먼저 설계하고 돌아가는 제품을 멈추지 않고 교체",
  context: "기존 frontend contract를 유지한 병렬 재구축과 단계적 전환, 이후 실사용 backend 운영 전담",
  role: "대안 비교·설득·설계·구현·검증·전환 판단 직접 수행",
  problem:
    "빠른 검증 중심으로 만들어진 초기 backend는 도메인 의존성이 얽혀 회원 로직 변경이 AI 생성 중단으로 이어졌고, 해결된 QA 이슈가 같은 영역에서 다른 형태로 재발했습니다.",
  decision:
    "부분 수정을 누적하는 안과 backend만 병렬 재구축하는 안을 비교해, 서비스가 작고 AI 모듈 확장이 예정된 시점이라 재구축을 택하되 기존 frontend와 릴리스 흐름은 유지하는 범위로 한정했습니다. \"돌아가는 기능을 왜 다시 만드나\"에는 문제 누적 속도·AI 확장성·하네스 기반 이관 속도로 답했습니다.",
  implementation: [
    "디자인 패턴·컴포넌트 설계·검증 하네스를 먼저 세우고, 그 규칙 위에서 API·기능 inventory를 만든 뒤 새 FastAPI backend를 나란히 구현했습니다.",
    "domain·repository·transaction 책임을 분리하고 전환 단위를 release로 관리해 frontend 호출을 단계적으로 옮겼습니다.",
    "재구축 범위·architecture·검증·전환 판단은 직접 소유하고, Claude Code·Codex는 codebase 파악·기능 inventory·반복 구현에 썼습니다.",
  ],
  verification: [
    "동일 기능의 응답 비교와 QA acceptance를 통과한 범위만 전환했고, 전환 뒤에도 같은 Jira 정의로 재발을 계속 측정했습니다.",
  ],
  result: "같은 기준의 Jira 집계에서 해결된 QA 이슈 재오픈 비율이 37%에서 11%로, 재발 발생이 하루 4.5건에서 0.3건으로 낮아졌습니다. 전환 이후 실제 사용자가 쓰는 backend의 배포·QA·운영을 계속 전담하고 있습니다.",
  boundary: "티켓에 BE/FE 라벨이 없어 제품 전체 품질 지표로 서술합니다. 초기 prototype은 다른 engineer가 만들었습니다.",
  claimIds: [
    "thready.rebuild-decision-execution",
    "thready.backend-rebuild",
    "thready.prototype-to-user-operation",
    "thready.qa-reopen-reduction",
    "thready.release-operation",
    "career.coding-agent-usage",
  ],
};

const WORKER_REALTIME: CareerProject = {
  id: "centurion-async-realtime",
  title: "주문 후속 작업과 실시간 상담 · 실패를 상태로 승격하고 순서를 보장",
  context: "피부과 CRM의 주문·재고 worker(주도)와 실시간 AI 상담 runtime(공동 주 기여)",
  role: "주문·재고 backend·worker 흐름 주도 · 실시간 상담 session·provider 경계 공동 안정화",
  problem:
    "주문 생성 뒤 공급사·병원 알림이 외부 연동에서 따로 실패할 수 있었고, 실시간 상담에서는 외부 음성 모델 세션이 발화 중간에 끊기거나 보정 결과가 늦게 도착해 문맥이 바뀔 수 있었습니다.",
  decision:
    "실패 가능한 작업은 API 요청 밖 worker 경계에서 처리하고 실패를 숨기지 않고 주문 상태로 승격했습니다. 실시간 상담은 세션이 끊겨도 전사가 멈추지 않도록 겹치는 세션 풀로 흡수하고, 순서는 도착 순서가 아니라 sequence가 정하게 했습니다.",
  implementation: [
    "기존 task queue가 asyncio 실행 모델과 맞지 않아 교체하면서 알림 job의 PENDING → SENDING → SUCCESS/FAILED 상태, 고정 간격 재시도, 최종 실패 이력, 전용 API의 수동 재발송을 주문 상태와 연결했습니다.",
    "외부 음성 모델의 세션 종료 문제를 겹치는 window로 여러 세션을 시간차로 열고 세션별 버퍼와 sequence로 병합해 흡수했고, 비용 증가와 첫 응답 지연은 문서로 명시한 뒤 모델 교체 후 우회 코드를 걷어냈습니다.",
    "DELTA·COMPLETE·CORRECTED를 같은 sequence로 묶어 늦게 도착한 보정이 다른 turn을 덮지 않게 했고, 종료 뒤 재연결되던 경합 경로의 정리 책임과 stop guard를 보강했습니다.",
  ],
  verification: [
    "VAD silence 200·350·500ms E2E에서 P50 차이가 작고 모델 추론이 약 80%임을 실측해 VAD tuning이 병목이 아님을 확인하고 DELTA 조기 trigger에 집중했습니다.",
    "재연결 경합 8개·GC TTL 5개를 합친 13개 focused regression으로 회귀를 고정했고, 상담 길이 E2E에서 sequence 누락·중복 없음을 확인했습니다.",
  ],
  result: "API 성공 뒤 실패를 숨기지 않고 운영자가 복구 지점을 확인할 수 있는 흐름과, 외부 모델이 끊겨도 순서가 유지되는 실시간 전사 경계를 확보했습니다.",
  boundary: "주문 worker는 주도, 실시간 상담은 공동 주 기여입니다. 전환에 따른 성능·지연 개선 수치는 측정하지 않았습니다.",
  claimIds: [
    "centurion.bay-async-backend",
    "centurion.async-migration",
    "centurion.test-ci-foundation",
    "centurion.say-realtime-ai",
  ],
};

const AI_RUNTIME: CareerProject = {
  id: "thready-ai-runtime",
  title: "Thready AI 실행부 · 전달 보장·멱등 소비·정합 검증으로 원장과 AI 상태를 분리",
  context: "AI 실행부의 독립 application·DB 분리, STG 실데이터 이관, 서비스 간 durable delivery, 생성 원장의 경합 중재",
  role: "경계 설계·구현·migration·검증 직접 수행",
  problem:
    "제품 정책·원장과 AI 생성 lifecycle이 한 backend·DB에 있어 AI 확장과 장애가 원장에 결합됐고, 분리하면 전달 유실과 역순 도착이 최신 상태를 덮을 수 있었습니다. 다중 worker가 같은 생성 원장을 두고 경합했습니다.",
  decision:
    "DB를 공유하지 않고 독립 FastAPI application·DB로 분리해 인증된 HTTP 계약으로만 연결하고, 전달은 원장 변경과 같은 transaction에 기록하는 Transactional Outbox로 두었습니다. 생성 원장은 상태 전이 규칙을 entity에 복원하고 version CAS로 경합을 중재했습니다.",
  implementation: [
    "relay는 짧은 lease로 row를 claim하고 delivery version·attempt count를 fencing token으로 붙이며, 소비 쪽은 더 높은 version만 반영하고 stable id·natural key 충돌을 최신 row 하나로 수렴시키는 멱등 upsert/delete를 소유합니다. 최대 시도를 넘긴 전달은 terminal failure로 보존합니다.",
    "생성 원장은 optimistic lock으로 worker 승자를 정하고 멱등 replay 판별과 전이가 같은 판정을 쓰게 했습니다. quota는 예약 시점에 잡고 admission gate가 확정 사용량과 진행 중 예약을 함께 봐 동시 요청의 초과 실행을 막습니다.",
    "STG 생성 이력·품질 기록·실행 추적을 parent→child 순서로 streaming copy했고 영구 cross-DB link는 쓰지 않았습니다.",
  ],
  verification: [
    "local rehearsal·건수·id·status·사유를 결합한 MD5 fingerprint·FK orphan 0건으로 이관 정합성을 확인했고, stale PUT/DELETE fence test와 양쪽 서비스 전체 회귀를 통과했습니다.",
    "health가 성공해도 생성이 실패한 사례를 계기로 배포 성공과 기능 동작을 분리한 post-deploy 생성 API E2E gate를 세웠습니다.",
  ],
  result: "독립 AI application·DB를 STG·Prod에서 운영 중이며, 지연·중복·역순 전달이 최신 원장 상태를 덮지 않는 복구 경계를 확보했습니다.",
  boundary: "Prod migration 완료와 무중단 전환은 주장하지 않습니다.",
  claimIds: [
    "thready.ai-service-boundary",
    "thready.ai-service-migration",
    "thready.ai-replica-outbox",
    "thready.generation-aggregate-optimistic-lock",
    "thready.generation-quota-admission",
  ],
};

const TEMPLATE_QA: CareerProject = {
  id: "backend-template",
  title: "조직 표준 · 팀이 같은 기준으로 만드는 FastAPI template과 evidence로 닫는 QA 판정 규칙",
  context: "AI 활용이 본격화되면서 모두가 메이커로 제품을 만들고 운영하는 팀의 공통 기준",
  role: "Template 설계·구축 · QA 판정 규칙 설계 · 도입 지원",
  problem:
    "팀이 Claude Code·Codex로 기능을 만들기 시작하면서 백엔드 경험이 적은 담당자도 구현에 참여했습니다. QA와 운영 준비 단계에서 사용량이나 동시 요청 조건에 따라 구조적인 문제가 자주 드러나 백엔드 엔지니어의 리소스가 원인 파악과 보완에 쓰였고, QA는 실행이 성공하면 통과로 보는 경우가 있어 AI 기능의 품질 판정이 흐려졌습니다.",
  decision:
    "기능마다 완벽한 구조를 요구하는 대신 자주 틀리는 경계를 기본값으로 제공했습니다. Service가 transaction 정책을 선언하고 Repository는 현재 session만 resolve하게 했고, tool이 늘어나는 Agent 기능만 Hexagonal, 나머지는 MVC를 기본 구조로 두었습니다. QA는 요구사항을 REQ로 쪼개 evidence로 닫는 판정 규칙을 세워 실행 성공과 품질 통과를 분리했습니다.",
  implementation: [
    "@transactional(REQUIRED·REQUIRES_NEW·NESTED)·ContextVar 기반 AsyncSession resolve·owner-task guard, typed DTO 경계, naming·timezone·soft delete·cursor pagination convention, ADR·runbook·agent 작업 맥락을 template에 넣었습니다.",
    "전 제품 공통 Quality Evidence Harness를 작성했습니다. REQ별 evidence plan(FE·DB·Log·Network·AI quality), PASS/FAIL/UNKNOWN 판정, 반복 이슈의 자동화 승격, LLM judge 단독 승인 금지가 규칙이며, QA 팀이 운영하는 AI QA 에이전트 파이프라인의 판정 layer로 연결했습니다.",
  ],
  verification: [
    "propagation·isolation·read-only·CancelledError rollback·connection cleanup을 integration test로 고정했고, 정기 개발 회의에서 패턴 선택 기준과 구조화 비용을 검토해 반영했습니다.",
  ],
  result: "full template으로 시작한 신규 프로그램의 STG QA에서 같은 session·pool 문제가 재관측되지 않았고, 기획·QA·디자인 담당자가 직접 구현하는 동안 백엔드는 결과 피드백과 배포 지원으로 개입을 줄였습니다.",
  boundary: "Template과 판정 규칙의 설계는 직접 했고 각 기능 구현과 QA 에이전트 플러그인 구현은 담당자의 몫입니다. 개발 속도·결함 수의 수치는 측정하지 않았습니다.",
  claimIds: [
    "be-template.backend-standard",
    "be-template.fastapi-sqlalchemy-standard",
    "be-template.team-leverage",
    "be-template.agent-context",
    "mediness.quality-evidence-harness",
    "mediness.ai-qa-team-operation",
    "career.coding-agent-usage",
  ],
};

const MULTI_TENANT: CareerProject = {
  id: "nexus-external-product",
  title: "여러 피부과의 운영·예약 Backend · 접근 범위는 client 입력이 아니라 서버 상태가 정한다",
  context: "외부 피부과 여러 곳의 홈페이지·관리·예약을 지원하는 multi-tenant backend monorepo (진행 중)",
  role: "Backend architecture·Admin/Homepage API 구축 주도 · IaC 전담",
  problem:
    "여러 피부과의 운영·예약을 한 backend가 지원해야 했고, client가 보내는 header가 tenant 접근 범위를 결정하던 구조가 격리의 failure mode였습니다.",
  decision:
    "Admin·Homepage API를 gateway 뒤 독립 모듈로 나누고, 작업 지점을 server auth state로 소유해 권한 검증 전용 API로만 전환하되 Homepage API의 기존 계약은 유지해 변경 범위를 Admin API로 한정했습니다.",
  implementation: [
    "Router–Service–Repository–Model과 DI, Generic Repository, multi-tenancy·soft delete 자동 필터를 구성하고 본사 미선택 409·권한 밖 403을 구분했습니다.",
    "Ruff·Pyright·pre-commit 정적 검증과 API·DB 설계 가이드를 구축했습니다.",
  ],
  verification: [
    "shared auth middleware와 Homepage API 계약을 유지한 채 Admin API 범위에서 접근 경계를 전환했습니다. 일부 test의 skip·xfail이 남아 전체 회귀 완료는 주장하지 않습니다.",
  ],
  result: "tenant 접근 범위가 server 상태로 결정되는 경계로 전환하고 있습니다.",
  boundary: "2026-08 기준 진행 중이며 예약률·매출은 제품·팀 outcome입니다.",
  claimIds: [
    "nexus.backend-architecture",
    "nexus.admin-backend-ownership",
    "nexus.branch-access-boundary",
    "nexus.quality-automation",
    "nexus.terraform-infra",
  ],
};

export const FEATURING_CAREER_DESCRIPTION: CareerDescriptionDocument = {
  ...COMMON_CAREER_DESCRIPTION,
  slug: "featuring",
  companyName: "피처링",
  targetRole: "백엔드 개발 엔지니어",
  title: "피처링 지원 경력기술서",
  subtitle: "가능성을 제품으로 만들고, 끝까지 책임지는 Product Engineer. SNS 데이터를 제품 기준으로, prototype을 운영 가능한 FastAPI Backend로.",
  role: "Backend Engineer · Tech Lead 역할 병행",
  updatedAt: "2026-09-03",
  summary: [
    "가능성을 제품으로 만들고, 끝까지 책임지는 Product Engineer 김대정입니다. 기획자로 시작해 백엔드로 왔고, 지금은 고객이 구독하는 AI 제품의 FastAPI 백엔드와 AI 실행부를 직접 만들고 운영합니다.",
    "이 문서는 이력서의 성과를 같은 순서로 풀어, 각 항목에서 무엇이 문제였고 무엇을 판단했으며 어떤 경계를 구현하고 어떻게 검증했는지를 적었습니다. 화면은 coding agent로 구현하고 직접 검수했으며, 수치는 측정된 것만 썼습니다.",
  ],
  companies: [
    {
      ...MEDISOLVE_COMPANY,
      role: "Backend Engineer · Tech Lead 역할 병행",
      summary:
        "AI 활용이 본격화되면서 모두가 메이커로 제품을 만들고 운영하는 팀에서, 제품별 결정·QA·릴리스 운영을 리드하고 Backend·AI application을 직접 구현했습니다. 팀이 같은 기준으로 만들 수 있는 Backend Template과 QA 판정 규칙은 직접 설계했습니다.",
      projects: [SNS_DATA, REBUILD, WORKER_REALTIME, AI_RUNTIME, TEMPLATE_QA, MULTI_TENANT],
    },
    ...COMMON_CAREER_DESCRIPTION.companies.filter((company) => company.id !== "medisolve-ai"),
  ],
};
