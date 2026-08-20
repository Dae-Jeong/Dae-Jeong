---
type: product-reference
title: Backend Case Achievement Inventory
description: 검증된 claim을 backend 채용 관점에서 재선별한 사례별 성과 후보와 기술 설명·증거 한계.
timestamp: 2026-08-19
derived_from:
  - evidence/claims/
  - evidence/projects/
  - products/portfolio/cases/
tags: [resume, backend, cases, achievements, evidence]
---

# Backend Case Achievement Inventory

이 문서는 새로운 사실을 소유하지 않는다. 사실·기여 강도·공개 범위는
[claim registry](../../evidence/claims/README.md)와 [evidence](../../evidence/README.md)가 소유하며,
이 문서는 그중 backend 채용에서 판정 근거가 되는 성과를 case 단위로 선별한다.

## 사용 원칙

- page 수를 먼저 정하지 않는다. 첫 장은 빠르게 읽혀야 하고, 이후 지면은 검증 가능한 technical signal을 추가해야 한다.
- 대표 case는 resume 안에서 `문제·제약 → 실제 대안과 선택 → 구현 경계 → failure mode → 검증·운영 → 결과·한계`가 이어져야 한다.
- 정량 outcome이 없는 case는 성능 개선을 만들지 않는다. 대신 실제 제약, 실패 가능한 경계, 설계 판단, test와 운영 가능성을 성과로 쓴다.
- `구축`과 `운영`, `주도`와 `공동 주 기여`, `production 결과`와 `pre-production 검증`을 섞지 않는다.
- general master는 검증된 case inventory를 넓게 보존한다. 실제 JD 지원본에서는 요구하는 문제와 가장 가까운 주력 2~3개를 깊게 쓰고 나머지는 짧은 supporting evidence로 둔다.
- 이 문서의 문장도 각 claim의 `allowed_copy` 상한을 넘을 수 없다.

## 권장 우선순위

| 우선순위 | Case | 가장 강한 backend signal | 현재 판정 |
| --- | --- | --- | --- |
| A | 주문·재고 비동기 처리 | API/worker 경계, 상태·retry·최종 실패·재처리 | 즉시 주력 가능 |
| A | 외부 피부과 운영·예약 backend | service boundary, multi-tenancy, server-owned access scope | 현재 재구축이 진행 중임을 밝히고 주력 가능 |
| A | AI 콘텐츠 backend 재구축·운영 | rebuild/cutover, release·QA, production ownership | 즉시 주력 가능 |
| A-특화 | AI service 분리·migration·durable delivery | DB ownership, 실데이터 이관 검증, transactional Outbox, stale-write fence | STG migration과 구현·test 성과로 사용; Prod 완료는 보류 |
| A-특화 | realtime AI 상담 backend | WebSocket session lifecycle와 경쟁 조건 | 공동 주 기여 범위로 사용 가능 |
| B | 조직 표준 FastAPI template | architecture convention, contract, team leverage | platform/스타트업 JD에 강함 |
| B-AX | 제품별 decision→release 운영 체계 | Decision·SPEC·Work Package, owner lane, QA·release gate, version trace | AX·product operating system 주력 가능 |
| B | Azure/Terraform change safety | 6개 state 경계, 400+ object, drift gate, 중앙 관측 | platform/infra JD의 주력 case 가능 |
| B-특화 | AI 생성 품질·evaluation system | typed contract, evaluation loop, 측정 오류 교정 | AI backend JD에 강함 |
| C | SSO·세션 정책 | Redis/JTI session, duplicate login, E2E | supporting case |
| C | 예약 정책 전달 | backend rule을 FE·QA·release 계약으로 연결 | product backend supporting case |
| C | 결제 정합성 | manual capture, provider 보상 처리, 환불 완료 상태 전이 | 초기 경력 supporting case |
| C | 개인 서비스 backend·infra | Spring Boot/JPA, AWS deploy·monitoring | 초기 경력 supporting case |
| C | 실시간 현황·재고 연동 | 시설 현황·긴급 호출·재고 연동 backend | 현재는 한 줄만 사용 |
| C | 초기 backend foundation | 초기 제품 backend와 개발 기준 수립에서 현재 역할까지의 continuity | career trajectory 보조 근거 |

## 현재 General Resume의 최종 결합 구조

| No. | Resume case | 결합 판단 |
| --- | --- | --- |
| 01 | AI를 활용한 36시간 FastAPI backend 재구축과 production cutover | 재구축 판단·AI 활용·validation harness·QA/운영 결과가 하나의 전환 서사이므로 결합 |
| 02 | AI 실행부·DB 분리와 migration·Outbox | service/data boundary 이후 기존 이력 이관과 이후 원장 전달이 같은 정합성 문제이므로 결합 |
| 03 | 주문·재고 worker 복구 흐름 | async runtime 선택·retry·terminal failure·manual reprocess가 하나의 운영 상태 계약이므로 유지 |
| 04 | Threads 데이터 기반 성과 기준과 AI 생성 품질 evaluation | `잘되는 글을 어떻게 정의하고 생성 결과를 어떻게 판정할 것인가`라는 같은 제품 질문이므로 결합하되, 13.1만/318만·11.1만/18.5만 corpus와 20,256건 prompt/judge 실험의 범위는 별도 bullet로 분리 |
| 05 | server auth state 기반 지점 권한 | 여러 피부과 운영·예약 시스템의 독립 사례로 두고, client input·tenant scope·HTTP 상태 계약이라는 구체적 backend 판단을 중심에 둠 |
| 06 | Stripe 선결제 provider-side 보상 | local DB와 외부 provider의 원자성 부재를 다룬 초기 경력의 독립 failure-mode 사례라 유지 |

Centurion의 MSA 경험은 별도 유행어 case로 만들지 않는다. Express API Gateway·NestJS SSO·FastAPI product backend·RabbitMQ/TaskIQ worker·WebSocket realtime service가 분리된 환경이라는 context는 BAY·DAY·SAY·RAY·SSO claim에만 사용한다. DAY는 Centurion의 범용 피부과 CRM 영역이며, NEXUS의 Admin/Homepage backend와 지점 권한은 Centurion과 분리된 외부 피부과 운영·예약 시스템 사례로 둔다.

## A. 일반 Backend 주력 Case

### 1. 주문·재고 비동기 처리

Claims: `centurion.bay-async-backend` (`led/high`), `centurion.async-migration`
(`led/high`), `centurion.test-ci-foundation` (`led/high`)

성과 후보:

- 주문·재고 API와 RabbitMQ·TaskIQ worker flow를 설계·구축하고, 작업 상태·retry·최종 실패 기록·수동 재처리를 하나의 운영 가능한 흐름으로 연결했다.
- async FastAPI 실행 모델과의 정합성을 기준으로 기존 Celery 작업을 TaskIQ로 전환하고 API와 worker의 실행·배포 경계를 분리했다.
- API test infrastructure, Docker CI, local setup과 onboarding 문서를 구축해 API·broker·worker 흐름을 재현 가능한 개발 환경으로 만들었다.

깊이를 만드는 설명:

- 기존에도 Celery 기반 비동기 처리는 존재했다. 성과는 “비동기 최초 도입”이 아니라 실행 모델 선택, 명시적 상태 전이, 최대 3회 retry, 최종 실패 기록과 수동 재처리 경계를 완결한 것이다.
- exactly-once, latency·성공률 개선, retry 회복률은 근거가 없다. 외부 연동 실패가 기존 API 응답에 직접 결합돼 있었다고도 쓰지 않는다.

### 2. 외부 피부과 운영·예약 backend의 멀티테넌시·접근 경계

Claims: `nexus.backend-architecture` (`led/high`), `nexus.admin-backend-ownership`
(`led/high`, 진행 중), `nexus.branch-access-boundary` (`led/high`, 진행 중),
`nexus.quality-automation` (`led/high`), `nexus.terraform-infra` (`owned/high`),
`nexus.domain-audit-governance` (`contributed/high`), `nexus.pool-stabilization`
(`led/medium`, 운영 효과 미확인), `nexus.hospital-operations-revenue-contribution`
(`contributed/medium`)

성과 후보:

- 여러 피부과의 홈페이지·관리·예약 backend에서 Admin/Homepage API를 독립 모듈로 분리하고 API Gateway를 단일 진입점으로 두는 계층 구조의 설계·구축을 주도하고 있다.
- Router–Service–Repository–Model과 DI, Tortoise ORM 기반 Generic Repository를 적용하고 multi-tenancy·soft delete 자동 필터로 공통 CRUD와 데이터 격리 경계를 구성했다.
- 운영자의 소속 지점과 현재 작업 지점을 분리하고, client header가 아니라 server auth state와 권한 검증 전용 API가 접근 범위를 결정하도록 전환을 설계·구현했다.
- 미선택과 권한 밖 접근을 `409`와 `403`으로 구분하면서 shared middleware와 기존 Homepage API 계약을 유지했다.
- Ruff·Pyright·pre-commit 기반 정적 분석·타입 검증과 API·DB 설계 가이드를 구축하고, 이 시스템의 Terraform IaC repository를 전담 구축했다.
- 제품은 예약률 개선을 통해 고객사 매출 성과에 기여했다. 이는 제품·팀 outcome이며 정확한 예약률·매출 증분과 backend 단독 인과는 확인되지 않았다.

깊이를 만드는 설명:

- 핵심 failure mode는 untrusted client input이 tenant access scope를 결정하는 것이다. 이를 server-owned auth state로 이동하면서 일부 기존 client 계약은 보존하는 migration 판단이 중심이다.
- 진행 중 case다. 회귀 test에 남은 `skip`·`xfail`, 미확인 운영 효과를 숨기지 않는다. connection pool 변경은 작업 사실만 확인됐으므로 5xx 해소·성능 개선으로 쓰지 않는다.
- domain audit·documentation governance는 `contributed`이며 architecture와 함께 전부 `led`로 묶지 않는다.
- DAY는 Centurion의 CRM 영역이고 NEXUS는 Centurion과 별도다. NEXUS의 접근 경계·business outcome을 Centurion 또는 DAY의 성과로 합치지 않는다.

### 3. AI 콘텐츠 backend 재구축·cutover·production 운영

Claims: `thready.backend-rebuild` (`owned/high`), `thready.frontend-product-delivery`
(`led/high`), `thready.prototype-to-user-operation`
(`led/high`), `thready.subscription-revenue-band` (`contributed/medium`),
`thready.rebuild-decision-execution` (`owned/high`),
`thready.release-operation` (`owned/high`), `thready.qa-reopen-reduction` (`owned/high`).
`thready.production-operation-quality` (`owned/high`)는 historical evidence로 보존하되 최신 재측정 전 active resume에서 제외한다.

성과 후보:

- AI 도구로 빠르게 검증한 초기 prototype을 production 운영 단계로 전환하면서, 재구축 범위·architecture·validation harness·cutover 판단은 직접 소유하고 AI를 codebase 파악·기능 inventory·구현에 적극 활용했다.
- 기존 release·QA 흐름과 Next.js frontend를 유지하면서 FastAPI backend를 parallel rebuild해 `v1.1.0`에서 cutover하고 이후 개발·release·운영을 전담했다.
- backend cutover 이후 Next.js의 콘텐츠 생성·가져오기·예약·발행·dashboard·관리·labeling workflow도 직접 구현·운영해 backend·AI 기능을 실제 사용자·관리 흐름으로 닫았다.
- 작은 서비스 단계에서 AI 모듈 확장 비용을 근거로 부분 수정 대신 backend 재구축을 선택하고, architecture·component·infra validation harness를 먼저 세운 뒤 auth/account와 frontend 호출 전환까지 실행했다.
- `v1.3.0`부터 실제 사용자가 쓰는 AI 콘텐츠 제품의 backend version cycle과 생성 품질 blocker의 판단·수정·배포를 운영했다.
- 제품은 2026년 8월 기준 월 약 800만~1,000만원의 구독료 매출이 발생한다. 이 수치는 제품·팀 outcome이며, 개인 기여는 초기 prototype 이후 backend 전환·release·QA·operation을 실제 사용자 운영까지 이끈 범위로 분리한다.
- architecture·component·infra validation harness를 먼저 세운 backend cutover 전후, 해결된 QA issue의 reopen 비율이 26%p 낮아졌다. 이는 QA 총건수가 아니라 반복 결함 signal이다.

깊이를 만드는 설명:

- 회원 로직 변경이 AI 생성 중단으로 이어졌던 도메인 의존성과, 두 버전을 병행 관리해야 하는 비용을 재구축 결정의 제약으로 설명한다.
- `36시간`은 달력 기간이 아닌 순수 작업 시간이며 backend 범위다. 속도만 앞세우지 말고 validation harness와 scope 판단의 결과로 보조 사용한다.
- 2026-06~07의 5xx 0.3%는 개선 전후가 아닌 30일 운영 snapshot이고 baseline·SLO·user-impact incident 구분이 없어 active resume 성과로 쓰지 않는다. 최근 30/90일을 endpoint·incident 단위로 재측정한 뒤 다시 판단한다.
- QA reopen은 제품 전체의 반복 결함 signal이다. validation harness·backend cutover와 시간 순서는 함께 제시할 수 있지만 harness 또는 backend 단독 인과로 귀속하지 않는다.
- 구독료 매출은 날짜가 고정된 band만 사용한다. `MRR`·`ARR`, 지속 기간, 순매출, 고객 수는 확인되지 않았고 backend 재구축이나 품질 기준의 직접 효과로 연결하지 않는다.
- DB migration·rollback·traffic 전환, latency percentile, SLO, incident·MTTR는 추가 evidence가 필요하다.

## B. AI Backend 특화 Case

### 4. AI service 분리·실데이터 migration·durable delivery

Claims: `thready.ai-service-boundary` (`owned/high`), `thready.ai-service-migration`
(`owned/high`), `thready.ai-replica-outbox` (`owned/high`)

성과 후보:

- AI 실행부를 독립 FastAPI application·DB로 분리하고 product backend와 authenticated HTTP 계약으로 연결해, 제품 정책·원장과 생성 lifecycle·execution state의 ownership을 분리했다.
- STG 생성 이력 2,616건·품질 snapshot 795건·trace 7,111건을 parent→child 순서로 이관하고, 실데이터 local rehearsal·row count·MD5 fingerprint·FK orphan 0건으로 정합성을 검증했다.
- workflow·health가 성공해도 실제 생성이 실패한 사례를 반영해 배포 성공과 기능 정상 동작을 분리하고, URL 없음·외부 소재 URL·개인 분야 생성 API E2E를 post-deploy gate로 만들었다.
- 원장 변경과 Outbox 기록을 같은 transaction으로 처리하고 relay retry와 delivery version fence를 두어 AI 장애와 역순 PUT/DELETE가 최신 상태를 덮는 failure mode를 다뤘다.
- backend·AI application 전체 회귀, migration 왕복, stale PUT/DELETE fence를 test로 검증했다.

깊이를 만드는 설명:

- DB를 직접 공유하지 않은 이유, dual-write에서 owner mutation만 성공하고 전달 기록이 사라지는 경우, 오래된 delivery가 늦게 도착하는 경우를 중심으로 설명한다.
- migration 수치와 정합성 검증은 STG 실데이터 기준이다. Prod migration 완료·Prod dump rehearsal·data loss 0건·무중단 전환으로 확대하지 않는다.
- idempotency·duplicate delivery, retry exhaustion·DLQ, Outbox lag monitoring, timeout·backpressure는 추가 확인이 필요하다.

### 5. Realtime AI 상담의 session lifecycle

Claim: `centurion.say-realtime-ai` (`co-led/high`)

성과 후보:

- realtime AI 상담 backend의 WebSocket session lifecycle과 STT/LLM provider boundary 안정화에 공동 주 기여했다.
- 중복 event를 task cancellation·debounce·retry·turn-state guard로 제어해 실시간 session의 경쟁 조건을 다뤘다.

깊이를 만드는 설명:

- zombie session, reconnect race, provider별 인증·언어·종료 semantics, audio sequence matching은 좋은 심화 소재지만 현재 `allowed_copy`보다 넓다. claim을 확장하기 전에는 내부 설명 후보로만 둔다.
- traffic·latency·availability 수치는 없으며 전체 realtime backend 단독 구축이나 provider 실명은 쓰지 않는다.

### 6. Threads 데이터 제품화·AI 생성 품질 evaluation system

Claims: `thready.generation-quality-system`, `thready.threads-market-outcome-design`,
`thready.labeling-corpus-workbench`, `thready.hook-rubric-experiment`,
`thready.quality-criteria-system`, `thready.agent-pipeline-design`,
`thready.measurement-correction`, `thready.falsification-log`,
`thready.corpus-measurement`, `thready.threads-marketing-criteria`

성과 후보:

- typed prompt builder와 `source_context` 계약으로 입력 경로를 단일화하고 critique/revise pipeline, LLM judge, local evaluation sweep, observability logging을 갖춘 생성 품질 시스템을 구축했다.
- Threads URL 기준 게시물 최신 상태 131,736행과 시계열 관측 3,188,563행을 분석해 절대·저자 상대·도메인 상대 기준을 포함한 5개 outcome 후보를 병렬 설계했다.
- 한국어 본문 111,091건과 작성자 이어쓰기 185,475건을 정제해 독립 labeling bounded context로 이관하고, typed batch importer·멱등 upsert/replace·API/UI workbench를 구축했다.
- hook-quality 20,256건의 8축 rubric을 실험 writer prompt와 LLM judge에 반영했다.
- 품질 판단을 결정적 자동 gate 12종, 실측 분포, 사람 판정의 3층으로 분리해 자동화 가능한 오류와 사람이 판단해야 할 품질을 구분했다.
- writer 단계에 원본 유형 정보가 없어 18건 모두 분기하지 못한 failure를 확인하고, 필요한 context를 가진 planner로 판단 책임을 이동했다.
- 자사 출력을 기준값으로 다시 쓰는 self-feedback을 발견해 measurement baseline과 문제 축을 재정의했고, corpus를 `n=19 → 4,039`로 확대해 소표본 결론을 재검증했다.
- 반증된 접근을 삭제하지 않고 재시도 금지 로그로 남겨 다음 실험의 판단 근거로 재사용했다.

깊이를 만드는 설명:

- judge를 정답 판정기로 표현하지 않는다. 6축 score는 self-assessment이며 corpus에도 수집 편향이 있다.
- 131,736은 URL 기준 최신 상태 행이고 3,188,563은 시계열 관측 행이다. semantic unique 게시물·318만 게시물로 바꾸지 않는다.
- 111,091건 corpus의 code·local 적재는 검증됐지만 STG·Production 전체 적재나 사람 labeling 완료로 확대하지 않는다.
- 20,256건 8축 rubric과 4,039건 후속 lab 기준은 서로 다른 실험이다. 둘 다 현재 production 전면 적용, 바이럴 보장, 반응·구독·매출 개선 인과로 확대하지 않는다.
- prompt/version reproducibility, judge-human agreement, gate false positive/negative, 품질·latency·token cost 전후 비교가 추가로 필요하다.
- `thready-rebuild` 한 case에 이 내용을 모두 넣지 않는다. 일반 backend 재구축·운영과 evaluation system을 분리해야 두 전문성이 모두 보인다.

## C. Platform·Engineering System Case

### 7. 조직 표준 FastAPI template

Claims: `be-template.backend-standard`, `be-template.team-leverage`,
`be-template.agent-context` (모두 `owned/high`)

성과 후보:

- Router–Service–Repository, DI, transaction·error contract, ADR, convention, runbook을 포함한 조직 표준 FastAPI template을 설계·구축했다.
- multi-tenancy, ID·JWT·SSO, storage를 선택 가능한 경계로 만들고 response matrix, domain ErrorCode, contract test, Pyright로 공통 규칙을 실행 가능하게 했다.
- 2~3명의 backend engineer가 여러 제품을 지원하는 환경에서 cross-cutting change와 frontend 규칙 기반 backend 구현을 재사용할 수 있는 team leverage를 만들었다.
- architecture decision과 작업 context를 agent-readable하게 구성해 사람과 agent가 같은 구현 규칙을 소비하도록 했다.

깊이를 만드는 설명:

- “조직의 모든 backend 표준을 단독 결정”으로 확대하지 않는다.
- onboarding·project setup 시간, drift·defect 감소, 실제 재사용 제품 수는 추가 evidence가 있어야 정량 outcome으로 쓸 수 있다.

### 8. Azure/Terraform state·drift change safety

Claims: `infra.company-azure-ownership` (`owned/high`), `infra.terraform-state-safety`
(`owned/high`), `infra.azure-observability` (`owned/high`), `centurion.shared-infra`
(`owned/high`), `nexus.terraform-infra` (`owned/high`)

성과 후보:

- 회사 Azure/Terraform infrastructure를 Shared·B2B·B2C STG/Prod의 6개 독립 root·remote state로 나눠 400+ state object를 운영했다.
- state snapshot·Terraform plan·Azure live inventory를 교차 검증하고, PostgreSQL 강제 교체 같은 destructive plan은 apply 전에 중단했다. 기존 B2C resource 편입도 0 add·0 destroy 조건으로 검토했다.
- Azure Monitor·Log Analytics와 AMA/DCR로 10대 VM container log를 중앙화하고, API·DB·host signal을 포함한 8개 Production alert를 Terraform으로 운영했다.
- App Service·container registry·storage·VM의 deploy/runtime 경계를 나누고 service 추가·배포·운영 runbook을 유지했다.

깊이를 만드는 설명:

- `400+`는 2026-08-18 `terraform state list`의 426개 address를 범위화한 snapshot이며 Azure live resource 수와 같지 않다.
- 가용성·MTTR·장애율·deploy time 개선과 실제 비용 절감은 확인되지 않았다. 모든 resource의 최초 생성이나 완전 자동 apply로 확대하지 않는다.

## D. Supporting Case

### 9. Multi-service SSO·session 정책

Claim: `centurion.sso-session` (`contributed/high`)

성과 후보:

- multi-service 인증에서 Redis/JTI 기반 session 정책, duplicate login 처리와 E2E 검증을 담당·참여했다.

깊이를 만드는 설명:

- JWT device, revoked token, missing session 같은 세부 failure boundary는 claim 확장 후 사용한다. 전체 auth architecture나 SSO 단독 구축으로 확대하지 않는다.

### 10. 예약 정책을 backend 계약으로 연결

Claim: `centurion.day-product-integration` (`led/high`)

성과 후보:

- 예약 마감·slot 상태 같은 운영 정책을 backend 판단, frontend 표시, QA seed/test, release 문서로 연결하는 전달을 리드했다.

깊이를 만드는 설명:

- backend와 화면이 서로 다른 상태를 보거나 취소 후 capacity state가 풀리지 않는 failure mode가 심화 소재다. 세부 scenario는 claim 확장 전까지 내부 후보로 둔다.
- 예약 오류 감소나 운영 시간 절감 수치는 없다.

### 11. Stripe 선결제와 provider-side 보상 처리

Claims: `career.memento-stripe-prepayment` (`led/high`),
`career.memento-payment` (`contributed/high`)

성과 후보:

- Stripe Checkout manual-capture 선결제 영역을 구축하고 local transaction ID와 payment type을 provider metadata에 실어 PaymentHistory·PaymentMethod와 Checkout·Webhook event를 연결했다.
- 예약 처리 실패 시 PaymentIntent 상태가 `requires_capture`이면 cancel, `succeeded`이면 refund하는 provider-side 보상 처리를 추가했다.
- 환불 요청과 완료를 분리하고 mileage 복원·ticket 삭제를 환불 완료 transition으로 이동해 현금·Stripe·0원·전액 마일리지 경로의 상태 변경 순서를 보완했다.

깊이를 만드는 설명:

- local DB 확정 뒤 provider capture가 수행되므로 DB+provider atomic rollback이 아니다. `완전한 rollback` 대신 `provider-side cancel/refund 보상 처리`라고 쓴다.
- Stripe live-call test는 skip 상태고 webhook event dedup·reconciliation도 없다. exactly-once·결제 불일치 0건·production 운영 전담으로 확대하지 않는다.

### 12. 개인 서비스 backend·deploy·monitoring

Claim: `career.tellingme-backend-infra` (`led/high`)

성과 후보:

- 개인 서비스의 Spring Boot/JPA backend와 AWS 배포·monitoring을 리드하고 OAuth2/JWT, gamification, GitHub Actions·CodeDeploy, 환경 분리, Actuator·Prometheus, error notification을 연결했다.

깊이를 만드는 설명:

- 사용자·traffic·운영 기간, 장애·관측 사례, 2명 backend 팀 내 세부 ownership, auth trade-off와 배포 전후 결과가 추가로 필요하다.
- package·endpoint 수는 검증되지 않아 쓰지 않는다.

### 13. 실시간 현황·긴급 호출·재고 연동 backend

Claim: `centurion.ray-backend` (`contributed/high`)

성과 후보:

- 시설 현황 조회, 긴급 호출, 주문·재고 시스템 연동 backend에 주 기여했다.

깊이를 만드는 설명:

- SSE per-user queue, heartbeat, timeout, disconnect cleanup과 재고 차감 event는 좋은 후보지만 현재 active evidence와 contribution boundary가 부족하다.
- 재검증과 stable claim 확장 전에는 SSE 구현이나 production 안정성을 공개 성과로 쓰지 않는다.

## AX·Product Operating System Case

### 14. AX 제품 운영 체계

Claims: `mediness.product-operations` (`led/high`),
`mediness.product-system-design-participation` (`contributed/medium`)

성과 후보:

- MEDINESS 서비스 구현 담당자와 제품 요구·운영 흐름을 구체화하는 설계에 참여했다.
- 제품별 pipeline registry에서 Decision·SPEC·Work Package를 실행 원장으로 적용하고 BE·FE·QA owner lane과 QA approval을 release gate에 연결해 일정·이슈·릴리스 운영을 리드했다.
- release gate와 version cut을 실제 완료 시점에 연결해 release note 생성을 자동화하고 버전 변경 이력을 추적했다.

깊이를 만드는 설명:

- application code가 없다는 이유로 제외하지 않는다. 실행 가능한 contract·state·gate와 실제 운영 artifact가 있으므로 AX·Engineering Operating System 사례로 사용할 수 있다.
- 설계 참여는 `contributed`, 제품별 적용·운영은 `led`다. 서비스 architecture나 전사 pipeline 최초 설계로 올리지 않는다.
- `mediness.daily-briefing`의 직접 구축 ownership은 Git author 기록과 registry가 충돌하므로 재검증 전 기본 이력서에서 제외한다.

## Career Continuity

### 15. 초기 backend foundation과 역할 continuity

Claims: `career.thedaylabs-freelance` (`led/high`),
`career.memento-to-medisolve-early-member` (`contributed/high`)

성과 후보:

- Memento AI에서의 개발 성과를 인정받아 MediSolve AI 초기 멤버로 영입됐고, 법인 설립 전 더데이랩스 프리랜서 구간에서 Centurion 초기 backend와 개발팀 system·backend 기준을 선행 구축했다.
- 2025.04 MediSolve AI 설립과 함께 정규 합류해 같은 제품군의 backend를 계속 맡고 Tech Lead 역할로 범위를 넓혔다.

깊이를 만드는 설명:

- 독립 flagship case라기보다 초기 foundation에서 현재 production ownership까지 이어지는 career trajectory 근거다.
- Memento AI·더데이랩스·MediSolve AI는 별도 법적 관계다. 법인 전환·고용 연속·사업 승계·승진·공동창업자로 표현하지 않는다.
- 당시 architecture·구현 boundary·검증 결과를 현재 claim보다 세밀하게 쓰려면 repository evidence와 contribution 분리가 더 필요하다.

## 보류

### SellerCanvas backend migration

`career.sellercanvas-product-system`과 `career.sellercanvas-enterprise-poc`는 PM·제품 성과 claim이다.
Node.js에서 NestJS로의 backend migration은 현재 self-report만 있고 stable public claim이 없다.
새 evidence record와 contribution boundary를 만들기 전에는 backend 성과로 사용하지 않는다.

## 지원본 선택 예시

| JD 성격 | 주력 case | Supporting evidence |
| --- | --- | --- |
| 일반 Backend / SaaS | 주문·재고 비동기 처리 + 피부과 운영·예약 backend + AI 콘텐츠 backend 재구축 | SSO, 결제 정합성 |
| AI Backend | AI 콘텐츠 backend 재구축 + AI service boundary + realtime session | AI evaluation system |
| Platform / 초기 스타트업 | 조직 표준 FastAPI template + Azure/Terraform delivery + 피부과 운영·예약 backend | agent 기반 제품 운영 |
| AX / Engineering Productivity | 제품별 decision→release 운영 + 조직 표준 FastAPI template | Azure/Terraform delivery, 제품 정책 전달 |
| Product Backend | 주문·재고 비동기 처리 + 예약 정책 전달 + 결제 정합성 | AI 콘텐츠 production 운영 |

선택 후에는 각 주력 case를 한두 줄 기술명 나열로 줄이지 않는다. 독자가 “왜 그 구조였는지,
어디서 실패할 수 있었는지, 본인이 어디까지 구현·검증·운영했는지”를 resume만으로 답할 수 있어야 한다.
