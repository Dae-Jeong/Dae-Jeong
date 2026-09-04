import { COMMON_CAREER_DESCRIPTION, MEDISOLVE_COMPANY } from "./common";
import type { CareerDescriptionDocument, CareerProject } from "./types";

/* 미리디 경력기술서 (2026-09-03, Application Copy Harness P2 첫 실전) — 이력서 v2(판단·결과)의 기전·검증 층.
   항목 순서 = 이력서 성과 01~04(제품화·품질 → 데이터 검수 → Agent PoC → 시술 지식 hybrid retrieval), 그 뒤 supporting 3건(재구축, 제품 개발 체계·QA, AI 실행부).
   항목마다 문제 → 판단 → 구현 ≤3 → 검증 ≤2 → 결과 → 경계. 내부 제품명 없음. 화면은 coding agent로 구현·직접 검수.
*/

const THREADY_PRODUCT: CareerProject = {
  id: "thready-paid-product",
  title: "Thready · 반복하던 글 제작을 제품 흐름으로, 글의 기준은 실측으로 신뢰를 쌓은 유료 AI 제품",
  context: "아이디어 제안 → prototype 이후 제품화 주도 → 고객이 구독하는 서비스 운영",
  role: "제품 운영 리드 · Backend/AI 직접 구현 · 핵심 화면은 coding agent로 완성",
  problem:
    "여러 채널을 운영하는 고객은 자료 수집·작성·검수·예약을 매번 반복했고 반응이 좋은 글의 기준은 감에 의존했습니다.",
  decision:
    "글쓰기만 AI에 맡기지 않고 자료 수집·정체성·작성·검수 역할을 나눠 AI는 초안과 1차 검수를, 사람은 최종 수정과 발행 판단을 맡게 했습니다. 좋은 글의 기준은 판정기가 아니라 판단 데이터를 쌓는 장치로 LLM judge를 두고 기준 자체는 직접 수집한 실측 corpus로 다시 쟀습니다.",
  implementation: [
    "FastAPI 제품 API와 별도 AI application·DB를 인증된 HTTP 경계로 분리했습니다. 콘텐츠 가져오기·URL preview·source 검증과 생성·예약·발행·대시보드·관리 화면은 coding agent로 구현해 직접 검수·배포했습니다.",
    "typed prompt builder·planner/writer 생성·LLM judge·사람 라벨링을 분리해 평가 이력을 남기고 대량 corpus importer는 (source, source_key) upsert와 batch rollback으로 재적재를 멱등하게 만들었습니다.",
    "품질 기준값이 자사 출력을 되먹이던 순환을 재실측으로 발견해 교정하고 반증된 접근은 '다시 시도하지 말 것' 로그로 남겨 실험 범위를 좁혔습니다.",
  ],
  verification: [
    "local 격리 DB에서 corpus를 두 번 적재해 건수 불변과 기존 라벨 보존을 확인했고 release·QA·task 기준으로 실제 사용자 흐름의 회귀를 확인했습니다.",
    "외부 AI 5xx는 실패 유형으로 분류해 재시도·최종 실패·사용자 재시도 경로를 두고 반복 장애 모델은 Sentry 확인 뒤 선택지에서 일시 제외했습니다.",
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

const SNS_DATA: CareerProject = {
  id: "thready-sns-data",
  title: "SNS 관측 데이터 · 성과 기준과 재적재 멱등 평가 workflow",
  context: "Threads 관측 데이터(최신 상태·시계열·원문 corpus·사람 평가)를 제품 기준과 평가 workflow로 전환",
  role: "outcome 기준 설계 · importer·API·평가 workbench 직접 구축 · 측정 기준 재실측",
  problem:
    "반응이 좋은 콘텐츠를 임계값 하나로 정의하기 어려웠고, 게시물의 최신 상태·반복 관측·원문·사람 평가가 서로 다른 생명주기를 가져 한 table로는 정합이 깨졌습니다.",
  decision:
    "URL별 최신 상태와 시계열 관측을 분리하고 절대·저자 상대·도메인 상대·참여 품질·합의의 outcome 후보를 병렬로 설계했습니다. 품질 판정은 틀리지 않았는가(자동 게이트)·플랫폼다운가(실측 분포)·통하는가(사람) 3층으로 나눠 아래층을 못 넘으면 위층을 묻지 않게 했습니다.",
  implementation: [
    "기존 제품 projection과 FK를 공유하지 않는 독립 labeling bounded context(schema·migration·repository·service·API·UI workbench)를 구축했습니다.",
    "importer는 JSONL을 typed batch로 검증하고 post는 (source, source_key) upsert, 이어쓰기는 source post 단위 replace, malformed line은 batch rollback으로 처리해 재적재를 멱등하게 만들었습니다.",
    "사람 평가는 (source_post, labeler) unique와 upsert로 평가자별 최신 라벨만 보존하고 진행률·다음 미평가 글을 이어 볼 수 있게 했습니다.",
  ],
  verification: [
    "local 격리 DB에서 전체 corpus를 두 번 적재해 건수 불변을, 증분 병합에서 기존 라벨 보존과 신규분 반영을 확인하고 API·UI·DB를 교차 대조했습니다.",
    "측정 표본을 소표본에서 대량 corpus로 늘리는 과정에서 프롬프트 기준값이 자사 출력을 되먹이던 순환을 재실측으로 발견해 교정했고 반증된 접근은 로그로 남겨 재시도를 막았습니다.",
  ],
  result: "감에 의존하던 글쓰기 기준이 직접 수집한 실측 corpus 기반 생성·평가 기준으로 바뀌었고 재적재·증분 병합이 정합을 깨지 않는 평가 workflow가 됐습니다.",
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

const AGENT_PROTOTYPE: CareerProject = {
  id: "agent-prototype",
  title: "대화형 제품 제어 Agent · 계획과 실행 권한을 나누고 변경은 사람 확인과 멱등 receipt를 거치는 prototype",
  context: "Thready 기능을 대화로 제어하는 흐름의 성립 여부와 변경 작업의 위임 범위 검증",
  role: "planner-executor·capability registry·상태 원장 설계·구현·검증",
  problem:
    "원하는 작업을 말하면 제품이 허용된 기능을 골라 실행하는 흐름이 실제로 성립하는지, 예약·발행·삭제 같은 변경 작업을 어디까지 agent에 맡길지 검증이 필요했습니다.",
  decision:
    "multi-agent 대신 planner-executor 하나로 두고 planner는 typed plan만 만들게 했습니다. 실행은 capability registry가 등록·일치를 확인한 action만 dispatch하고 변경 작업은 다음 turn의 typed confirmation과 receipt idempotency를 통과할 때만 상태를 바꿉니다.",
  implementation: [
    "글감 탐색·기획·작성·수정 7개 편집 action과 계정·게시물·성과 13개 운영 action을 capability로 등록하고 편집은 기존 writer를 재사용했습니다.",
    "conversation·message·turn·tool result·versioned artifact를 분리한 원장과 append-only activity event, token-aware context selection과 compaction snapshot을 구현했습니다.",
    "명확한 읽기 요청은 deterministic fast lane으로 처리하고 모호한 mutation 요청은 planner fallback으로 실행하지 않게 했습니다.",
  ],
  verification: [
    "승인 전 무변경·승인 뒤 상태 전이·새로고침 뒤 activity와 artifact 복원을 확인했고 prototype 전체 test 679개가 통과했습니다.",
  ],
  result: "agent가 준비할 일과 사람이 확정할 일의 경계를 코드로 검증했습니다.",
  boundary: "독립 prototype입니다. 운영 action은 Mock gateway까지만 연결했고 실제 예약·발행·삭제와 운영용 durable worker는 구현 범위 밖입니다.",
  claimIds: ["thready.agent-pipeline-design", "thready.conversational-editorial-agent-prototype"],
};

const CLINICAL_RETRIEVAL: CareerProject = {
  id: "procedure-hub-retrieval",
  title: "시술 정보 지식 플랫폼 · canonical 데이터 전환과 구조화 조회가 판단하고 문헌 검색이 근거를 보강하는 hybrid retrieval API",
  context: "시술·제품·안전 규칙·문헌 지식의 canonical 데이터 전환·retrieval API·평가 게이트 설계·구현 (진행 중)",
  role: "hybrid retrieval 설계·구현 · canonical 데이터 전환·publication gate 구현 · 평가·shadow 게이트 구현",
  problem:
    "시술·고민·제품·금기·간격·추천 패키지·문헌 근거가 JSON과 문서에 흩어져 있어 자연어 질의에 답하려면 사람이 찾아 조합해야 했고 검색 결과가 안전·추천 판정을 새로 만들어 버릴 위험이 있었습니다.",
  decision:
    "지식의 대부분이 관계가 명확한 구조화 데이터라 문서를 전부 벡터화하는 방식으로 시작하지 않았습니다. 자연어 질의를 canonical 엔티티로 확정한 뒤 구조화 조회가 판단하고 문헌 검색이 근거를 보강하는 hybrid retrieval로 정했고, 실측 규모(수십~수백 건)에서 vector DB·chunking·reranker는 평가셋에서 recall 부족이 증명될 때만 추가하기로 했습니다. LLM은 출처 ID와 content revision이 붙은 Context Pack의 문장화만 맡고, 안전·추천 판정은 구조화 규칙만 내리게 경계를 뒀습니다.",
  implementation: [
    "질의 해석 → canonical ID 확정 → 의도별 SQL 조회 → 안전 규칙 우선 판정 → 문헌 근거 보강 → 출처 포함 Context Pack 반환의 pipeline을 구현했습니다. 검색 순서는 code·alias 확정 → 정규화 alias → bounded fuzzy match → 관계형 SQL → 문헌 lexical rank로 두고 embedding은 평가 근거가 생길 때 추가하는 자리로 남겼습니다.",
    "현행 JSON 지식을 Master·Rule·Document·Release aggregate의 canonical 관계형 데이터로 옮기면서 기존 API 계약을 동결 테스트로 고정했고, 재실행해도 결과가 바뀌지 않는 결정적 importer와 draft·published를 구분하는 release 단위 publication gate로 공개를 통제했습니다.",
    "검수 승인이 없는 fixture는 거부하는 평가 실행기와, 새 canonical 검색 경로를 승격하기 전 기존 판정과 안전 판정 일치를 비교하는 shadow 게이트를 구현했습니다. 생성형 answer는 Context Pack만 입력으로 받는 로컬·배포 adapter로 두었습니다.",
  ],
  verification: [
    "대표 예시 몇 개로 RAG 품질을 승인하지 않고 의사가 검수한 query fixture로 recall·안전 규칙 통과·false-clear·응답 시간을 자동 측정하도록 했습니다. 안전 fixture는 100% 통과·false-clear 0을 기준으로 둡니다.",
    "canonical 데이터 적재를 빈 DB에서 재실행해 결과 불변을 확인했고 기존 API 회귀 baseline으로 응답 계약이 유지되는지 검증했습니다.",
  ],
  result:
    "구조화 Context Pack API·로컬 실행 CLI·평가 실행기 구현을 마쳤고 지식 데이터의 등록·검수·공개를 review queue와 publication gate로 운영 가능한 형태로 만들었습니다. 생성형 answer adapter는 임상 검수 대기 상태입니다.",
  boundary:
    "생성형 answer는 임상 검수 대기이고 최초 content release는 미공개이며 전환은 진행 중입니다. frontend와 데이터 검수는 다른 담당의 범위입니다. 벡터 DB·검색 엔진 운영 경험으로 확대하지 않습니다.",
  claimIds: [
    "procedure-hub.hybrid-retrieval-design",
    "procedure-hub.canonical-data-platform",
    "procedure-hub.retrieval-evaluation-gate",
  ],
};

const REBUILD: CareerProject = {
  id: "thready-backend-rebuild",
  title: "Thready Backend 재구축 · 규칙을 먼저 설계하고 돌아가는 제품을 멈추지 않고 교체",
  context: "기존 frontend contract를 유지한 병렬 재구축과 단계적 전환, 이후 실사용 backend 운영 전담",
  role: "대안 비교·설득·설계·구현·검증·전환 판단 직접 수행",
  problem:
    "빠른 검증 중심으로 만들어진 초기 backend는 도메인 의존성이 얽혀 회원 로직 변경이 AI 생성 중단으로 이어졌고 해결된 QA 이슈가 같은 영역에서 다른 형태로 재발했습니다.",
  decision:
    "부분 수정을 누적하는 안과 backend만 병렬 재구축하는 안을 비교해 서비스가 작고 AI 모듈 확장이 예정된 시점이라 재구축을 택하되 기존 frontend와 릴리스 흐름은 유지하는 범위로 한정했습니다. \"돌아가는 기능을 왜 다시 만드나\"에는 문제 누적 속도·AI 확장성·하네스 기반 이관 속도로 답했습니다.",
  implementation: [
    "패턴·계층·검증 하네스를 먼저 세우고 그 규칙 위에서 API·기능 inventory를 만든 뒤 새 FastAPI backend를 나란히 구현했습니다.",
    "domain·repository·transaction 책임을 분리하고 전환 단위를 release로 관리해 frontend 호출을 단계적으로 옮겼습니다.",
    "재구축 범위·architecture·검증·전환 판단은 직접 소유하고 coding agent는 codebase 파악·기능 inventory·반복 구현에 썼습니다.",
  ],
  verification: [
    "동일 기능의 응답 비교와 QA acceptance를 통과한 범위만 전환했고 전환 뒤에도 같은 Jira 정의로 재발을 계속 측정했습니다.",
  ],
  result: "같은 기준의 Jira 집계에서 해결된 QA 이슈 재오픈 비율이 37%에서 11%로, 재발 발생 일평균이 약 94% 줄었습니다(하루 4.5건에서 0.3건). 전환 이후 실제 사용자가 쓰는 backend의 배포·QA·운영을 계속 전담하고 있습니다.",
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

const PRODUCT_SYSTEM: CareerProject = {
  id: "product-system-qa-harness",
  title: "제품 개발 체계 · 판단의 정합이 유지되는 기록 구조와 evidence로 닫는 QA 판정 규칙",
  context: "제품별 결정·명세·작업·QA·릴리스 운영 리드, QA 팀과의 하네스화, 회사 AX 구조 설계 참여",
  role: "제품 단위 운영 리드 · QA 판정 규칙 설계 · 회사 AX 설계 참여",
  problem:
    "제품 간 맥락 공유가 사람에 의존해 요구·판단을 재확인하는 비용이 컸고 담당 교체·병행 시 실행이 지연되는 병목이 잦았습니다. QA는 실행이 성공하면 통과로 보는 경우가 있어 AI 기능의 품질 판정이 흐려졌습니다.",
  decision:
    "결정·명세·작업·릴리스 근거를 실행 원장으로 축적해 사람과 AI가 같은 맥락을 읽게 하되, 우선순위·승인·릴리스처럼 판단이 필요한 단계는 사람이 확정하는 경계를 지켰습니다. QA는 요구사항을 REQ로 쪼개 evidence로 닫는 판정 규칙을 세우고 실행 성공과 품질 통과를 분리했습니다.",
  implementation: [
    "제품별 pipeline registry에 결정·명세·작업 기록을 실행 원장으로 적용하고 BE·FE·QA 담당 lane과 QA 승인을 release gate에 연결해 release note 생성을 자동화했습니다.",
    "전 제품 공통 Quality Evidence Harness를 QA 팀원의 서포트를 받아 작성했습니다. REQ별 evidence plan(FE·DB·Log·Network·AI quality), PASS/FAIL/UNKNOWN 판정, 반복 이슈의 자동화 승격, LLM judge 단독 승인 금지가 규칙입니다.",
    "이 판정 layer를 QA 팀이 운영하는 AI QA 에이전트 파이프라인(시나리오→TC→자동화→버그 등록)에 연결하고 백그라운드 작업의 고장 모드 카탈로그와 fault-injection QA를 설계로 제안했습니다.",
  ],
  verification: [
    "팀 주 1회 agent 활용 회고로 무엇을 만들지와 구현 방법을 함께 정했고 Slack에서 접수한 이슈를 사내 시스템에 남겨 해결 상태를 추적하는 흐름을 제안했습니다.",
  ],
  result:
    "담당자가 바뀌어도 기록에서 업무를 이어가 인수인계·맥락 복원 비용이 낮아졌고 유사 기능에서 기존 판단을 재사용해 lead time 단축에 기여했습니다. 이 구조를 회의·의사결정·업무 배정·승인으로 넓히는 회사 AX 설계에 참여했습니다.",
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

const AI_RUNTIME: CareerProject = {
  id: "thready-ai-runtime",
  title: "Thready AI 실행부 · 전달 보장·멱등 소비·정합 검증으로 원장과 AI 상태를 분리",
  context: "AI 실행부의 독립 application·DB 분리, STG 실데이터 이관, 서비스 간 durable delivery, 생성 원장의 경합 중재",
  role: "경계 설계·구현·migration·검증 직접 수행",
  problem:
    "제품 정책·원장과 AI 생성 lifecycle이 한 backend·DB에 있어 AI 확장과 장애가 원장에 결합됐고 분리하면 전달 유실과 역순 도착이 최신 상태를 덮을 수 있었습니다. 다중 worker가 같은 생성 원장을 두고 경합했습니다.",
  decision:
    "DB를 공유하지 않고 독립 FastAPI application·DB로 분리해 인증된 HTTP 계약으로만 연결하고 전달은 원장 변경과 같은 transaction에 기록하는 Transactional Outbox로 두었습니다. 생성 원장은 상태 전이 규칙을 entity에 복원하고 version CAS로 경합을 중재했습니다.",
  implementation: [
    "relay는 짧은 lease로 row를 claim하고 delivery version·attempt count를 fencing token으로 붙이며, 소비 쪽은 더 높은 version만 반영하고 stable id·natural key 충돌을 최신 row 하나로 수렴시키는 멱등 upsert/delete를 소유합니다. 최대 시도를 넘긴 전달은 terminal failure로 보존합니다.",
    "생성 원장은 optimistic lock으로 worker 승자를 정하고 멱등 replay 판별과 전이가 같은 판정을 쓰게 했습니다. quota는 예약 시점에 잡고 admission gate가 확정 사용량과 진행 중 예약을 함께 봐 동시 요청의 초과 실행을 막습니다.",
    "STG 생성 이력·품질 기록·실행 추적을 parent→child 순서로 streaming copy했고 영구 cross-DB link는 쓰지 않았습니다.",
  ],
  verification: [
    "local rehearsal·건수·id·status·사유를 결합한 MD5 fingerprint·FK orphan 0건으로 이관 정합성을 확인했고 stale PUT/DELETE fence test와 양쪽 서비스 전체 회귀를 통과했습니다.",
    "health가 성공해도 생성이 실패한 사례를 계기로 배포 성공과 기능 동작을 분리한 post-deploy 생성 API E2E gate를 세웠습니다.",
  ],
  result: "독립 AI application·DB를 STG·Prod에서 운영 중이며 지연·중복·역순 전달이 최신 원장 상태를 덮지 않는 복구 경계를 확보했습니다.",
  boundary: "Prod migration 완료와 무중단 전환은 주장하지 않습니다.",
  claimIds: [
    "thready.ai-service-boundary",
    "thready.ai-service-migration",
    "thready.ai-replica-outbox",
    "thready.generation-aggregate-optimistic-lock",
    "thready.generation-quota-admission",
  ],
};

export const MIRIDIH_CAREER_DESCRIPTION: CareerDescriptionDocument = {
  ...COMMON_CAREER_DESCRIPTION,
  slug: "miridih",
  companyName: "미리디",
  targetRole: "[미리캔버스] Product Engineer",
  title: "경력기술서",
  subtitle: "가능성을 기회로 바꾸고, 제품으로 가치를 전하는 메이커 김대정입니다.",
  role: "Product Engineer · Tech Lead",
  updatedAt: "2026-09-03",
  summary: [
    "기획자로 시작해 백엔드로 왔고, 아이디어를 제안한 AI 콘텐츠 제품의 FastAPI 백엔드와 AI 생성·평가 시스템을 직접 만들고 핵심 화면은 coding agent로 완성해 월 1천만원 수준의 구독 매출이 발생하는 제품으로 운영합니다.",
    "커머스(생성형 AI 상세페이지)·피부과 운영·SNS 콘텐츠 세 도메인에서 현업의 반복 업무를 실제로 쓰이는 제품으로 만들었고 대규모 콘텐츠 데이터를 검수 가능한 구조와 사람 평가 워크벤치로 바꿨습니다.",
    "이 문서는 이력서의 성과를 같은 순서로 풀어 각 항목에서 무엇이 문제였고 무엇을 판단했으며 어떤 경계를 구현하고 어떻게 검증했는지를 적었습니다. 화면은 coding agent로 구현하고 직접 검수했으며 수치는 측정된 것만 썼습니다.",
  ],
  companies: [
    {
      ...MEDISOLVE_COMPANY,
      role: "Tech Lead · Backend Engineer",
      summary:
        "AI 활용이 본격화되면서 모두가 메이커로 제품을 만들고 운영하는 팀에서, 제품별 결정·QA·릴리스 운영을 리드하고 Backend·AI application을 직접 구현했습니다. 팀이 같은 기준으로 만들 수 있는 Backend Template과 QA 판정 규칙은 직접 설계했습니다.",
      projects: [THREADY_PRODUCT, SNS_DATA, AGENT_PROTOTYPE, CLINICAL_RETRIEVAL, REBUILD, PRODUCT_SYSTEM, AI_RUNTIME],
    },
    ...COMMON_CAREER_DESCRIPTION.companies.filter((company) => company.id !== "medisolve-ai"),
  ],
};
