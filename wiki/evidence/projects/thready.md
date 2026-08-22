---
type: project-evidence
title: Thready Evidence
description: AI content product operation, full-stack delivery, backend rebuild, generation quality, and operation evidence.
timestamp: 2026-08-18
source_roots: [workspace]
tags: [thready, ai-product, full-stack, backend, frontend, evidence]
---

# Thready Evidence

Source locator: `workspace:thready`

## Backend Rebuild

- Code-backed: 합류 첫 변경부터 FastAPI layered backend가 구성됐고 `v1.1.0 - backend-new cutover`에서 초기 backend를 대체했다.
- Code-backed: cutover 이후 version cycle의 backend 개발·운영에서 주 기여가 지속됐다.
- Contribution boundary: backend rebuild와 이후 backend operation은 `owned`; frontend 포함 제품 전체 구축은 아니다.

## Prototype To User Operation

- Code-backed: 2026-03-30 다른 구성원이 Next.js·Supabase 기반 초기 prototype을 시작했고, 김대정은 2026-04-14 합류해 FastAPI backend와 API Gateway, 인증·계정·콘텐츠 생성·발행 흐름을 구축했다.
- User-confirmed (2026-08-22): 초기 prototype의 구현은 김대정의 작업이 아니다. 공개 문구에서는 이를 김대정의 바이브 코딩 경험으로 귀속하지 않고, 기존 prototype을 인계받아 재구축 범위·architecture·validation·cutover를 맡은 경험으로 구분한다.
- Code-backed: `v1.0`~`v1.2`는 release·QA와 `v1.1.0` backend cutover를 포함한 제품화 구간이다. release milestone과 실제 사용자 운영 시작은 같은 의미로 사용하지 않는다.
- User-confirmed (2026-08-17): 실제 사용자가 제품을 사용하기 시작한 시점은 `v1.3.0`부터다.
- Code-backed: `v1.3.0` release에는 고객 생성·계약 기간·AI 사용 한도·Threads account slot·삭제/복구·비밀번호 재설정·고객 session stream 등 실제 고객 운영을 위한 변경이 포함됐다.
- Tool-backed: 실제 사용자 운영 시작 이후를 포함하는 Azure App Service 30일 집계에서 월 수만 건 규모의 production request가 확인됐다. 이 수치는 runtime 근거이며 사람 사용자 수로 해석하지 않는다.
- Contribution boundary: 초기 prototype을 처음 만든 사람이나 제품 전체의 단독 구축자는 아니다. 초기 prototype 이후 실제 사용자 운영까지 backend 전환·핵심 frontend 개발·release·QA·operation 범위는 `led`, 제품 전체 0→1 기여는 `co-led` 이하로 표현한다.

## Frontend Product Delivery

- User-confirmed (2026-08-20): Thready에서 backend·AI뿐 아니라 frontend 개발도 함께 진행했다.
- Git-backed (`workspace:thready`, `release/v1.8.0` at `8d0a529b…`): 현재 release branch의 `frontend/` 비병합 commit 546개 중 `KimMarin <marin@medisolveai.com>` authored commit은 410개다. release/version 문서를 포함한 활동량 지표이므로 공개 성과 수치로 사용하지 않고 지속적인 직접 기여를 확인하는 내부 근거로만 둔다.
- Blame-backed: copy·rename 추적을 적용한 현재 `frontend/src` 49,603행 중 38,366행(77.35%)이 같은 author identity로 귀속됐다. 생성 코드·이동·리팩터링 영향을 포함할 수 있으므로 개인 생산성이나 제품 전체 ownership 비율로 해석하지 않는다.
- Code-backed: Next.js frontend에서 콘텐츠 생성·가져오기, 콘텐츠 목록·상태, 예약·발행 calendar, dashboard, account/settings, super-admin과 labeling workbench의 사용자·관리 workflow를 구현·보완했다.
- Commit-backed examples: `workspace:thready@44828203…`에서 콘텐츠 가져오기 UI·state·API 연동 12개 파일을 구현했고, `workspace:thready@5144d998…`에서 labeling API client와 평가 workbench 22개 파일을 backend bounded context와 함께 구축했다. 그 밖에도 생성 실패·발행 상태·계정 관리·관리자 화면의 release 변경이 현재 branch에 포함돼 있다.
- Contribution boundary: 핵심 사용자·관리 workflow의 frontend 구현·운영은 `led`. 2026-03-30 초기 prototype UI의 최초 개발, frontend 전체 단독 구축, design 전담은 주장하지 않는다.

## Product Zero-To-One Contribution

- User-confirmed (2026-08-19): 기획자로 일한 경험을 바탕으로 Threads 콘텐츠 제작과 성과 판단 과정의 고객 불편을 제품 문제로 구체화하고, 시장·콘텐츠 data 분석에서 생성·평가 기능 요구를 도출했다.
- User-confirmed (2026-08-20): Thready에서는 PO 역할을 병행하며 기획·QA·마케팅 담당자와 함께 제품 운영·관리를 리드했다. 고객 문제 정의, 기능·실험 우선순위, 생성 품질 기준, QA·release·production operation을 하나의 제품 실행 흐름으로 조율했다.
- User-confirmed: 초기 prototype 이후 제품 요구 구체화, backend·frontend·AI 품질 system 구축, QA·release·production operation을 실제 사용자 운영까지 연결하는 0→1 실행을 주도했다.
- Evidence-backed support: 아래 market data·labeling·quality evidence와 backend rebuild·release evidence가 각 실행 영역을 독립적으로 뒷받침한다.
- Business boundary: 2026년 8월 기준 월 약 800만~1,000만원 구독료 매출이 발생하는 제품에 문제 정의부터 기술 구현·운영까지 상당 부분 기여했다. 매출은 제품·팀 outcome이며 특정 기능 또는 개인의 단독 인과가 아니다.
- Contribution boundary: cross-functional team과 함께한 PO 역할의 제품 운영과 제품 0→1 실행은 `led`; PO가 공식 등재 직함이라고 단정하거나 기획·QA·마케팅·design·acquisition의 실행까지 혼자 담당한 것으로 표현하지 않는다. frontend는 별도 code-backed claim 범위에서 직접 개발로 표현하되, 제품 전체 frontend를 단독 구축한 것으로 확대하지 않는다. 공개 문구는 responsibility map과 함께 사용한다.

## Threads Market Data And Outcome Design

- User-confirmed (2026-08-18): 별도 PC의 trend-crawler에서 Threads 마케팅 데이터를 수집·분석하고, 반응이 높은 글을 판정하는 기준을 설계해 Thready의 품질 실험과 labeling 제품으로 연결했다.
- Snapshot-backed (`external-snapshot:trend-crawler-backfill-20260807`, 2026-08-06 실측): `thread_posts`는 URL을 PK로 한 게시물 최신 상태 **131,736행**, `post_observations`는 반복 수집된 시계열 관측 **3,188,563행**이다. `post_hook_scores`는 20,256행이고 `post_llm_analyses`는 0행이다.
- Design-backed: 절대 조회, 저자 상대, 세부 도메인 상대, 참여 품질, 3개 기준 합의의 5개 candidate outcome을 병렬로 두고 정의를 하나로 조기 고정하지 않았다. 서로 다른 기준의 일치율과 표본 편향을 비교할 수 있는 분석 구조다.
- Identity boundary: `thread_posts`는 `post_url`이 PK라 handle 변경 시 같은 `post_id`가 복수 URL 행으로 존재할 수 있다. 따라서 131,736은 `URL 기준 최신 상태 행`이며 semantic unique 게시물 수가 아니다. 3,188,563은 게시물 수가 아니라 시계열 관측 행 수다.
- Execution boundary: LLM 분석 table은 0행이므로 10만 건 전체를 LLM·AI로 분석하거나 학습에 사용했다고 표현하지 않는다. 데이터셋·SQL/heuristic 분석과 아래의 20,256건 rubric 실험을 구분한다.
- Contribution boundary: 문제 정의·outcome 후보와 Thready 연결은 `owned`; 원 trend-crawler source code가 전달 bundle에 없어 crawler 구현 ownership은 별도 검증 전 주장하지 않는다.

## Labeling Corpus Productization

- Data-backed (`external-snapshot:trend-crawler-backfill-20260807`): 메인 131,736 URL 행에서 한국어 본문 108,341건을 정제하고 backfill 신규 2,750건을 병합해 **111,091건**의 labeling corpus를 만들었다. 작성자 이어쓰기는 **185,475건**이며 제3자 답글은 평가 단위에서 제외했다.
- Code-backed (`workspace:thready@5144d998…`, KimMarin): 기존 Thready projection과 FK를 공유하지 않는 `labeling_source_posts`·`labeling_source_continuations`·`post_quality_labels` bounded context, migration, repository, service, importer CLI, API와 UI workbench를 구현했다.
- Contract-backed: JSONL을 typed batch로 검증하고 post는 `(source, source_key)` upsert, continuation은 source post별 replace로 처리해 재적재를 멱등하게 만들었다. malformed line·batch rollback·기존 label 보존·chain 변경 replace를 test로 고정했다.
- Verification-backed: 로컬 격리 DB에서 메인 corpus 108,341건·이어쓰기 185,475건을 두 차례 적재해 count 불변을 확인했고, backfill 병합 corpus 111,091건을 재적재해 기존 label 보존과 2,750건 증분 반영을 확인했다. API·UI·DB도 교차 대조했다.
- Deployment boundary: code와 local 전체 corpus 검증은 완료됐지만 전체 111,091건의 STG·Production 적재 완료는 확인되지 않았다. corpus 행은 source key 단위 평가 대상이며 semantic unique 게시물이나 완료된 사람 label 수가 아니다.
- Contribution boundary: 독립 schema·importer·API/UI workbench의 설계·구현은 `owned`.

## Hook Rubric Experiment

- Analysis-backed (`external-snapshot:trend-crawler-backfill-20260807`): `post_hook_scores` **20,256행**에서 훅 품질을 PI·EC·SP·CG·ST·AU·BR·PD의 8개 축으로 구조화했다. exploded 표본 평균 5.9, baseline 4.2였으나 heuristic 정확도는 65~75% 범위라 사람 판단의 정답으로 표현하지 않는다.
- Code-backed (`workspace:thready@427580d3…`, KimMarin): 이 20k 분석 자산의 8축 rubric을 writer prompt와 실험 LLM judge에 반영했다.
- Lifecycle boundary: 8축 judge는 후속 실험을 위한 자산이었고 2026-07-22 제거됐다. 현재 production writer·judge가 이 rubric을 사용하거나 10만 건 전체 분석에서 바로 도출됐다고 표현하지 않는다.
- Contribution boundary: rubric의 Thready writer/judge 실험 반영은 `owned`.

## Threads Marketing Criteria

- User-confirmed (2026-08-18): Threads 마케팅 게시물을 수집·분석해 반응이 높은 글의 기준을 수립하는 역할을 맡았다.
- Scope boundary: 아래 4,039건은 위의 13.1만 URL 행·318만 관측 dataset과 구분되는 후속 local lab snapshot이다. 더 큰 dataset을 대체하거나 그 전체에 대한 LLM 분석을 뜻하지 않는다.
- Tool-backed (2026-08-18, `workspace:thready-lab` local untracked snapshot): corpus를 재계산한 결과 4,039행·고유 href 4,039건이며, 내부 휴리스틱상 상위 반응 표본 839건·초상위 표본 139건이 분포 기록과 일치했다. snapshot hash는 corpus `01fdcd32…`, 분포 `2f370ae8…`, 본문 분석 `3a0ec305…`다.
- Code-/analysis-backed: 초상위 표본을 전수 독해하고 상위 표본에서 정규식 검증해 첫 줄 3형, 글의 골격 6종, 어체·마무리 기준을 도출했다.
- Code-backed: 분석 기준은 실험 writer prompt와 판정 harness에 반영됐다. 이 corpus 기반 기준의 production writer 전면 적용은 아직 확인되지 않았다.
- Code-backed, 별도 선행 작업 (`workspace:thready@2b49f9f…`): 8축 viral-hook rubric을 writer prompt와 judge에 반영한 기록이 있다. 이 작업은 4,039건 corpus 수집보다 앞서므로 corpus에서 8축 rubric을 도출했다고 결합하지 않는다. 해당 8축 judge script는 이후 일회성 실험 자산으로 제거됐으며 현재 production judge의 축으로 표현하지 않는다.
- Measurement boundary: corpus는 검색 노출·keyword·목록 접힘과 지표 해석의 편향을 가진다. 플랫폼 전체를 대표하는 통계나 바이럴 보장이 아니라 관측된 표본의 경향으로만 표현한다.
- Contribution boundary: 수집·분석과 기준 수립·실험 prompt/harness 반영은 `owned`. 제3자 계정명·개별 게시물 지표·prompt 원문은 공개하지 않는다.

## Subscription Revenue

- User-confirmed (2026-08-18): Thready에서 현재 월 약 800만~1,000만원의 구독료 매출이 발생한다.
- Verification boundary: billing/accounting 자료, gross/net·VAT·refund 처리, `MRR` 정의, 지속 기간과 월평균은 확인되지 않았다. 따라서 날짜가 고정된 월 구독료 매출 band만 공개한다.
- Attribution boundary: 제품·팀의 business outcome이며 개인 단독 성과가 아니다. 김대정의 검증된 기여는 초기 prototype 이후 backend 전환·release·QA·operation을 실제 사용자 운영까지 이끈 범위다.
- Causality boundary: Threads 마케팅 기준이나 backend 재구축이 매출을 직접 만들었다는 인과는 검증되지 않았다. 기술·제품 기여와 매출 결과는 병렬 성과로만 제시한다.
- Public wording: `2026년 8월 기준 월 약 800만~1,000만원의 구독료 매출이 발생하는 AI 콘텐츠 제품` 또는 더 약한 표현만 허용한다.

## Generation Quality System

- Code-backed: typed prompt builder와 `source_context` 계약, generation pipeline, LLM judge, local evaluation sweep, observability logging이 확인됐다.
- Tool-backed/operation-backed: 생성 품질 이슈를 evaluation과 release/QA task로 연결한 운영 기록이 있다.
- Contribution boundary: 품질 system 구축은 말할 수 있으나 품질 배수나 business outcome과의 직접 인과는 검증되지 않았다.

## AI Service Boundary And Durable Delivery

- Code-backed (2026-08-16): AI 실행부를 별도 FastAPI application과 DB로 분리하고, product backend는 authenticated HTTP client로만 접근하도록 경계를 구현했다.
- Code-backed: 제품 정책과 원장 데이터는 backend, 생성 lifecycle과 실행 상태는 AI application이 소유하도록 구분했다.
- Code-backed: owner mutation과 durable outbox 기록을 같은 transaction에서 처리하고, relay retry와 `delivery_version` fence로 역순 전달이 최신 상태를 덮지 않도록 구현했다.
- Code-backed (2026-08-22 re-audit): outbox relay는 짧은 lease로 전달 row를 claim하고 `delivery_version`과 `attempt_count`를 함께 fencing token으로 사용한다. worker가 중단된 마지막 claim은 lease 만료 뒤 terminal failure로 보존하고, 최대 시도 전 실패는 재시도 가능한 상태로 되돌린다.
- Code-backed (2026-08-22 re-audit): AI replica consumer는 delivery fence가 이미 처리했거나 더 최신인 version을 no-op으로 끝내고, stable id·natural key 충돌을 최신 row 하나로 수렴시키는 멱등 upsert/delete 경계를 소유한다.
- Test-backed: backend와 AI application의 전체 회귀, migration 왕복, stale PUT/DELETE fence를 검증한 기록이 있다.
- Verification boundary: 독립 서비스 분리와 outbox/fence의 설계·구현은 확인됐지만, production 전환 완료·무중단·유실 0건은 검증되지 않았다.
- Contribution boundary: 해당 backend/AI 경계와 전달 안전성 설계·구현은 `owned`.

## AI Application Split Migration

- Operation-backed (2026-08-10): AI 실행부 분리 과정에서 STG의 `ai_generations` **2,616건**, `ai_generation_quality_snapshots` **795건**, `ai_generation_trace_runs` **7,111건**을 BE DB에서 독립 AI DB로 이관했다 (`workspace:thready/docs/operations/ai-app-split-stg-migration-record.md`).
- Operation-backed: STG dump를 local DB에 복원해 schema·history migration을 먼저 rehearsal하고, FK 순서에 맞춰 parent generation → child quality snapshot·trace 순으로 streaming copy했다. permanent `dblink`·`postgres_fdw`는 운영 DB에 흔적을 남겨 사용하지 않았다.
- Verification-backed: row count뿐 아니라 id·status·domain·failure reason을 결합한 MD5 fingerprint를 양쪽 DB에서 대조해 세 table이 일치했고, migration 후 FK orphan 0건을 확인했다.
- Incident/operation-backed: workflow·health·authenticated ping이 성공했는데도 실제 생성은 실패한 사례를 확인했다. 이후 배포 성공과 기능 정상 동작을 분리해 URL 없음·외부 소재 URL·개인 분야 생성 API E2E를 post-deploy gate로 명시했다.
- Verification boundary: 위 수치와 검증 결과는 **STG 실데이터 이관**이다. Prod migration 완료, 무중단 전환, production 데이터 유실 0건으로 확대하지 않는다. Prod dump rehearsal은 당시 checklist상 미완료였다.
- Contribution boundary: application/DB 분리와 migration·검증 절차의 설계·실행은 `owned`.

## Release Operation

- Code-backed: v1.2-v1.5 사이 release/QA/task structure와 backend operation 변경이 확인됐다.
- Public-safe summary: release·QA·task 구조 기반 backend 운영.

## Production Operation Quality

- Tool-backed: Azure App Service platform metric 30일 집계(2026-06-15~2026-07-15)에서 요청 50,650건, HTTP 5xx 133건(0.26%)을 확인했다. 2026-07-11 스냅샷(약 41k, 0.32%)과 일관된다. 정확 수치는 내부 검증용이다.
- Measurement boundary: 현재 운영 상태의 증거다. "개선" claim에는 변경 전후 기간과 commit/PR 연결이 추가로 필요하다.
- Public wording: 범위화 표현(월 수만 건 규모, HTTP 5xx 0.3% 수준 / 성공률 99.7%+)만 공개한다. 기존 "1% 미만" 밴딩은 실측(0.26~0.32%)보다 나쁘게 읽혀 2026-07-16 persona review에서 역효과로 판정 — 실측에 근접한 상한으로 재조정했다.
- Resume selection decision (2026-08-19): 2026-06~07의 30일 snapshot은 개선 전 baseline·SLO·user-impact incident 구분이 없어 standalone 성과로는 약하고, 일별 error count로 환산될 때 오히려 부정적으로 읽힐 수 있다. 최신 30/90일 재측정과 endpoint·incident 분류 전까지 active resume에서는 제외하고 historical evidence로만 보존한다.

## Rebuild Context And Decision

- User-confirmed (2026-07-19 인터뷰): 인계 시점 상태 — AI 도구 중심으로 빠르게 구축된 초기 제품. 유사 메서드·컴포넌트 중복과 데드코드 다수(AI 활용 시 불필요한 context 낭비, 온보딩 시 동작/비동작 로직 분리에 시간 소모), 디자인 패턴·폴더 구조 부재, 도메인 간 의존성 얽힘 — 회원 로직 수정이 AI 생성 중단으로 이어진 실사례. QA 티켓이 닫힌 뒤 같은 영역에서 다른 형태로 재발하는 패턴이 반복돼 프로젝트가 이관됐다.
- User-confirmed (2026-07-19): 재구축 판단 — 서비스 규모가 작은 시점 + AI 모듈 확장 필요 → backend를 FastAPI로 분리 도입, FE는 Next.js 유지. "돌아가는 기능을 왜 다시 만드나" 반대를 문제 누적·AI 확장성·하네스 기반 이관 속도로 설득.
- User-confirmed + code-backed (2026-07-19): 실행 — 디자인 패턴·컴포넌트 설계·인프라 하네스를 먼저 세팅하고 그 규칙 위에서 AI와 협업, 파악→기능 정의→재구축을 **총 36시간(작업 시간 기준)**에 완수. commit 실측: 2026-04-14 17:24 monorepo 분리 → 같은 날 23:14까지 스캐폴딩·레이어 구조·예외 계층·로깅·core 완성 → 04-16 Sprint 0-1(auth·accounts) → 04-20 FE→BE 호출 전환. backend 커밋 443/517건 KimMarin. PM 경력의 기획 이해가 파악·기능 정의를 가속.
- 표현 가드레일: 전임 작업 폄하 표현 금지 — "속도 우선으로 빠르게 검증된 초기 제품의 운영 단계 전환" 프레임만 사용. "36시간"은 작업 시간 기준임을 병기(달력 기간 오독 방지).

## QA Reopen Signal

- User-confirmed (2026-07-19): QA 조직은 해결된 이슈가 재발하면 티켓을 Reopened 상태로 전환한다. backend 이관 이후 재발이 대폭 감소했고, 잔여 케이스도 원인 영역이 파악된 상태로 관리된다.
- Tool-backed (2026-07-19 Jira 실측): THRDY 프로젝트 버그 236건, 상태 전이 944건 전수 분석 (분기점 v1.1.0 backend cutover = 2026-06-05, repo 태그 실측).
  - **재발률(월별 Resolved 전이 대비 Reopened 전이)**: 4월 37% → 5월 31% → 6월 20% → **7월(1~19일) 11%** — 단조 감소, 4월 대비 약 70% 하락.
  - **재발 발생 일평균**: 4월(4/20~30) 4.45건/일 → 7월 0.26건/일 = **-94.1%** — 구술 "95% 이상"과 정합. 단 4월은 QA 집중 테스트 초기라 활동량 교란 있음 — 공개 표현의 1축은 활동량 보정된 재발률(37%→11%)을 권장.
  - 한계: 티켓에 BE/FE 라벨이 없어 backend 단독 효과 분리는 불가 — "제품 전체 품질" 지표로 서술.
- Public wording: "QA 버그 재발률(해결 대비 reopen) 37%→11%" 및 "재발 발생 일평균 약 94% 감소(v1.0 QA기 대비)"까지 허용. "95%"는 실측(94.1%)을 넘는 표현이라 금지.
- Interpretation boundary (2026-08-19): 이 수치는 QA ticket 총건수 감소가 아니라 `Resolved`로 닫힌 issue가 다시 `Reopened`된 반복 결함 signal이다. active resume에서는 validation harness 선행과 backend cutover의 시간 순서를 함께 보여주되, harness 또는 backend만의 단독 인과로 단정하지 않는다.

## Judge Rationale

- User-confirmed (2026-07-19): LLM judge 도입 이유 — "좋은 글"의 기준 자체가 부재했다(정성적 감만 존재, 대표의 성공 사례도 본인 계정 n=1이라 일반화 불가). judge를 품질 게이트가 아니라 **기준을 발견하기 위한 판단 데이터 축적 장치**로 설계 — 가설을 정량 판단으로 바꿔 데이터를 쌓고 기준을 증명해가는 루프.

## Public Disclosure

- 제품명 Thready와 AI 콘텐츠 생성 제품 설명은 공개 가능하다.
- Threads corpus의 범위화된 표본 규모와 기준 수립·실험 반영 사실은 공개 가능하다.
- 2026년 8월 기준 월 구독료 매출은 claim registry의 banded copy만 공개 가능하다.
- provider 실명, private repository path, internal metric은 공개하지 않는다.

## Rejected Or Unverified Claims

- 제품 전체 단독 구축
- 초기 prototype frontend의 최초 개발 또는 frontend 전체 단독 구축
- 품질 N배 개선 또는 품질 완전 해결
- `MRR`·`ARR`, 월평균·지속 기간, 순매출·영업이익·고객 수 등 확인되지 않은 business outcome 정의
- backend 재구축이나 Threads 마케팅 기준이 구독 매출을 직접 만들었다는 개인 단독 인과
