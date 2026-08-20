---
type: project-audit
title: Cross-Workspace Career Source Audit
description: workspace, agentspace, personal-workspace, ai-workspace를 교차 점검해 기존 evidence와 다른 신규·보강·보류 소재를 분류한 원장.
timestamp: 2026-08-20
tags: [workspace, contribution, backend, infra, ax, personal-project, evidence]
source_roots: [workspace, agentspace, personal-workspace, ai-workspace]
---

# Cross-Workspace Career Source Audit

## Purpose

이 문서는 이력서 문장을 만들기 전에 네 source root의 실제 프로젝트와 현재 Dae-Jeong evidence를 대조한 감사 원장이다.

작업 순서는 다음으로 고정한다.

1. repository·문서·Git에서 수행 사실과 경계를 수집한다.
2. 병합 상태, 실행·배포 검증, 개인 기여 범위와 공개 안전성을 분리한다.
3. project evidence와 stable claim으로 승격한다.
4. 마지막에 resume·portfolio 문장으로 압축한다.

이 문서 자체는 public copy가 아니며, commit 수나 commit subject만으로 ownership·성과를 확정하지 않는다.

## Scope And Method

Checked date: 2026-08-20

물리적 Git history 기준 inventory:

| Source root | Git histories | User author signal | Treatment |
| --- | ---: | ---: | --- |
| `workspace:` | 64 | 40 | 2026-07-02 감사 이후 delta를 우선 확인 |
| `agentspace:` | 3 | 2 | 제품 운영과 orchestration 실행 자산 확인 |
| `personal-workspace:` | 22 | 10 | 본인 repo와 upstream clone을 분리 |
| `ai-workspace:` | 1 | 0 | authored code evidence가 아닌 snapshot·private artifact로 분리 |

총 90개 물리적 Git history를 inventory했다. 같은 logical product의 worktree·clone·branch는 별도 경력으로 합산하지 않는다.

확인 방법:

- Git common directory로 worktree 중복을 줄였다.
- author aliases와 email을 기준으로 user-authored history를 찾았다.
- current HEAD·remote branch 포함 여부를 대조했다.
- README·AGENTS·architecture·task·test·release 문서를 필요한 범위에서 확인했다.
- 현재 Dae-Jeong의 `profile/`, `evidence/`, `products/`에 source와 claim이 연결돼 있는지 검색했다.
- dirty worktree의 미커밋 내용은 성과 근거로 사용하지 않았다.
- meeting note, QA spreadsheet, local settings, credential·secret 가능성이 있는 파일은 public evidence로 읽거나 전사하지 않았다.

## Existing Coverage Verdict

2026-07-02의 `workspace-project-audit.md`와 `project-work-log.md`는 당시 snapshot으로는 유효하지만 현재 coverage 원장으로는 불완전하다.

- 기존 감사는 `workspace:` 47 entries / 31 deduplicated histories를 대상으로 했다.
- 이번 inventory는 네 root의 90 physical histories를 확인했다.
- 기존 감사 뒤에 생긴 7~8월 작업과 `personal-workspace:`의 최근 프로젝트가 충분히 반영되지 않았다.
- 현재 Graphify coverage에도 claim registry, Thready, Centurion, infra, mediness는 잡히지만 아래 신규 후보의 project evidence node는 대부분 없다.

오래된 감사 문서는 당시 판정을 보존하고, 이 문서를 delta·교정 source로 사용한다.

## Material Differences

### 1. Thready Customer Messaging Reliability

Source: `workspace:thready`

기존 evidence의 `BE -> AI replica Outbox`와 다른 failure model이다.

- Code-/task-backed: message delivery에 provider snapshot, request fingerprint, 상태 전이, reconciliation 경계를 둔 구현이 있다.
- Code-/task-backed: `PENDING/RETRY_WAIT/CLAIMED`의 cancel, 안전한 `FAILED/CANCELLED`만 새 lineage로 resend, `SENDING/ACCEPTED/AMBIGUOUS/DELIVERED`의 재발송 차단을 구현했다.
- Tool-backed record: local/test LOG adapter에서 Browser·Network·DB 교차 E2E와 NCP network 0회 검증이 기록돼 있다.
- Boundary: 실제 NCP live readiness task는 `in_progress`다. local/test 완료를 상용 provider 운영 완료나 중복 발송 0건으로 확대하지 않는다.
- Boundary: 2026-08-19~20 승인 발행은 domain design과 일부 설정 작업이 진행 중이다. 완료 claim으로 승격하지 않는다.
- Re-audit trigger: NCP live readiness와 승인 발행의 release·operation evidence가 닫히는 시점에 다시 검증한다.

Verdict: **new high-signal backend evidence**, stable claim 전 live/merge/운영 범위를 별도 검증한다.

### 2. Procedure Hub Backend Stabilization

Source: `workspace:PROCEDURE-HUB`

기존 2026-07-02 감사의 `no user commit signal / Skip` 판정은 현재 사실과 다르다.

- Git-backed: 현재 release history에서 김대정 author signal 46 commits가 확인된다.
- Code-backed: 13 domain의 transaction·DI 전환, 14 repository의 공통 경계 정리, 9 domain의 internal DTO·response contract, assembler·domain exception·central handler·application factory·settings·CI를 구축했다.
- Test-/document-backed: DB bootstrap·seed UPSERT와 E2E 시나리오 결과가 기록돼 있다.
- Code-backed: 결정적 안전 판정과 AI vocabulary fallback을 결합한 insight query API와 probe/test harness가 release branch에 포함돼 있다.
- Boundary: 의료 데이터·제품 전체 ownership이 아니라 **backend stabilization/refactor slice**가 개인 기여 범위다.
- User-confirmed (2026-08-20): 아직 개발 중이며 실제 사용·production 운영을 하지 않았다. 따라서 장애 감소·QA 변화·사용자 결과는 없다.
- Boundary: release branch 포함은 개발 이력일 뿐 production deploy나 운영 성과를 뜻하지 않는다.

Verdict: **pre-production implementation evidence**. 구조 개선·test harness를 설명하는 보조 근거로만 보존하고, 운영 성과 case나 active resume의 우선 소재로 승격하지 않는다.

### 3. SSO Admin Control Plane

Source: `workspace:SSO-BE-API`

현재 stable claim은 session policy·duplicate login·E2E 참여만 소유하며, 별도의 admin control-plane slice가 누락돼 있다.

- Code-backed: branch, staff, master service, subscription, dashboard를 12 vertical slices의 BE·FE로 구현했다.
- Code-/test-backed: branch/staff 생성 saga, multi-DB sync, CRUD·subscription·dashboard E2E가 있다.
- Code-backed: admin frontend를 backend container의 `/sso/admin` 경로로 함께 서빙하고, password reset 시 강제 logout을 연결했다.
- Code-backed: 3-DB 조회의 UUID guard와 domain exception으로 목록 500 경계를 보완했다.
- Merge boundary: admin slice는 current `dev`·`stg`에 포함되지만 `prod` branch에는 포함되지 않는다.
- User-confirmed (2026-08-20): Prod에서 사용할 예정이지만 아직 production 사용·운영 결과는 없다.
- Boundary: SSO 인증 core 전체 ownership이나 production admin 운영 완료로 표현하지 않는다.

Verdict: **new pre-production supporting backend/product case**. 기존 `centurion.sso-session`과 합치지 않고 별도 evidence boundary로 두며, production 반영 뒤 배포·사용 근거를 다시 확인한다.

### 3-a. NEXUS And DAY Product Boundary Correction

Sources: `workspace:NEXUS`, `workspace:CENTURION_DAY`, user confirmation

- User-confirmed correction (2026-08-20): DAY는 Centurion을 구성하는 범용 피부과 CRM 영역이고, NEXUS는 Centurion과 별도 프로젝트다.
- NEXUS는 외부 피부과 여러 곳의 홈페이지·관리·예약 운영을 지원하는 multi-brand system이다.
- DAY는 Centurion 안에서 범용 피부과를 대상으로 하는 CRM 영역이다.
- User-confirmed outcome: NEXUS 적용 뒤 예약률 개선과 고객사 매출 성과에 기여했다. 전후 수치·매출 증분·기능별 인과는 확인되지 않아 제품·팀 outcome의 `contributed/medium` 상한으로 기록한다.
- Boundary: NEXUS를 Centurion repository label, DAY의 기반·이전 버전 또는 Centurion MSA의 통합 관리 backend로 설명하지 않는다.

Verdict: 기존 `NEXUS ≡ Centurion` 기록을 supersede하고, NEXUS와 Centurion/DAY의 evidence·claim·public copy를 분리한다.

### 4. Local Multi-Agent Orchestration Pack

Source: `agentspace:orchestration-pack`

기존 문서에서 public evidence gap으로 남아 있던 multi-agent orchestration에 직접 실행 자산이 생겼다.

- Code-/document-backed: runtime abstraction, project config, allowed path, worker brief, audit workflow, long-lived product branch routing을 구성했다.
- Tool-/document-backed: 실제 PR 2건을 통한 pipeline 검증 기록과 장수 branch 일일 검사 script가 있다.
- Boundary: local main history이며 remote가 없다. 공개 repository나 조직 전사 adoption으로 표현하지 않는다.
- Boundary: product operation 문서 원장인 mediness와 execution orchestration runtime을 같은 ownership으로 합치지 않는다.

Verdict: **new AX/engineering-system evidence**, public copy는 generic mechanism과 검증 범위만 사용한다.

### 5. Daejeong Design Fork Work

Source: `personal-workspace:daejeong-design`

현재 profile은 design harness가 별도 project에 있다는 사실만 기록하고 구현 경계는 없다.

- Git-backed: Open Design upstream을 바탕으로 한 local fork에 김대정 author 46 commits가 있다.
- Code-/document-backed: fork identity·CLI/MCP/daemon 경로 정리, unused upstream surface 제거, headless workflow, machine-readable CLI output, no-frontend caller의 chat persistence를 보완했다.
- Code-backed: Thready design system과 component snapshot을 등록하고 token drift를 수정했다.
- Boundary: upstream product 전체를 처음부터 만들었다고 표현하지 않는다.
- Boundary: 현재 own origin 없이 upstream remote만 있으며, fork-specific branch도 upstream에 병합된 근거가 없다.

Verdict: **new personal tooling evidence**, public copy는 `fork adaptation and workflow extension`으로 한정한다.

### 6. Company Homepage GEO And Product Fact Sheet

Source: `workspace:MEDI-HOMEPAGE-RENEWAL-FE`

기존 감사의 `1 commit / footer fix only` 판정은 현재 사실과 다르다.

- Git-backed: 현재 author signal은 35 commits이며 7~8월에 product·deploy·AI search 관련 변경이 추가됐다.
- Code-backed: robots, sitemap, `llms.txt`, structured data와 GEO probe checklist를 추가했다.
- Code-/product-backed: impact page를 product fact sheet로 바꾸고 revenue/cost value proposition과 광고 landing/analytics를 다뤘다.
- Boundary: backend core가 아니라 product/marketing engineering supporting evidence다.
- Boundary: 검색 노출·유입·전환 개선 수치는 확인되지 않았다.

Verdict: **new supporting product/UX/GEO evidence**, backend resume headline에는 사용하지 않는다.

### 7. Casty Runtime And Infra Bootstrap

Source: `workspace:casty`

- Code-/document-backed: STG VM runtime contract, SQLite container bootstrap, DNS/TLS and onboarding runbook을 작성했다.
- Boundary: feature branch의 supporting infra slice이며 회사 전체 infra ownership claim과 중복시키지 않는다.
- Boundary: dirty worktree의 추가 문서는 이번 근거에서 제외했다.

Verdict: **existing infra claim의 supporting example**, 독립 대표 case 우선순위는 낮다.

## Personal Engineering Inventory

개인 프로젝트는 회사 프로젝트 evidence를 대체하지 않는다. 기본 이력서와 포트폴리오에서는 선택하지 않고, 회사 경력에서 JD 요구를 증명할 소재가 없을 때만 reserve evidence로 검토한다.

### Reserve Pool

| Source | Verified scope | Boundary | Verdict |
| --- | --- | --- | --- |
| `personal-workspace:lets_talk` | Rust·Axum·SeaORM messaging backend, SSE, idempotency/security fixes, testcontainers, Flutter/Tauri surface, local deploy assets | local-only repo, feature branch의 후반 기능과 배포 준비를 production 운영으로 표현 금지 | reserve only |
| `personal-workspace:reelsup-backend` | Kotlin·Spring Boot 4, auth/content, external publishing port, async publish, Testcontainers E2E, Gatling·CI | `feat/initialize-proj` branch, shipped product·production 운영 아님 | reserve only |
| `personal-workspace:ANDROMEDA` | Java Spring inventory/order/inbound/outbound/analytics domain과 TDD·E2E infrastructure | 개인 학습/구현 프로젝트, 회사 BAY 성과와 혼합 금지 | reserve only |

### Archive But Do Not Lead

| Source | Reason |
| --- | --- |
| `personal-workspace:onjaewa` | 제품·문서 harness와 Flutter mock vertical slice까지이며 backend/product delivery는 미완료 |
| `personal-workspace:tellingme-python-server` | 작은 FastAPI template 수준이고 기존 TellingMe evidence와 중복 |
| `personal-workspace:open-pencil` | canvas remount fix 1건은 fork branch에만 있고 upstream merge 근거 없음 |

### Learning Repositories — Exclude

- `personal-workspace:DIARY-BE-API`: User-confirmed (2026-08-20) Java를 간단히 공부하기 위해 만든 학습용 저장소다. 경력·개인 프로젝트·기술 성과 후보에서 제외한다. README의 Terraform 설명도 career evidence로 사용하지 않는다.

### Already Covered

- `personal-workspace:tellingme-server`: 기존 `career.tellingme-backend-infra`가 소유한다.
- `personal-workspace:Dae-Jeong`: 이 evidence/resume workspace 자체이며 별도 경력 프로젝트로 세지 않는다.

### Not Personal Contribution Evidence

User author signal이 없는 upstream clone·research mirror는 reference source일 뿐 개인 경력으로 쓰지 않는다.

Examples: OpenHands, upstream Open Design, OpenAI/Anthropic cookbook, Graphify, x-algorithm, autoTHREADS.

## ai-workspace Verdict

- `ai-workspace:PROTON`은 `workspace:PROTON`과 동일한 최초 commit `a2ca7df`만 가진 오래된 clone이다. 별도 프로젝트나 별도 기여로 세지 않는다.
- User-confirmed / Git-backed (2026-08-20): 초기 PROTON은 독립 실시간 상담 backend였고, 김대정은 이후 이를 SAY 제품 cluster로 가져왔다. `workspace:SAY-BE-API`의 `4a46ad6`은 SAY·PROTON·STARGATE를 독립 app으로 유지한 monorepo 통합, `5a52b8a`는 공통 model·enum의 `say_core` 통합을 기록한다. SAY→PROTON session lifecycle과 HTTP/WebSocket·Blob 연동도 current docs에 남아 있다.
- Contribution evidence는 stale clone이 아니라 `workspace:PROTON`의 후속 김대정 commits와 `workspace:SAY-BE-API`의 통합 history가 소유한다. 현재 `centurion.say-realtime-ai`의 cluster framing과 일치한다.
- `meeting-notes`는 private coordination artifact다. 고객·팀·회의 원문을 public evidence로 사용하지 않는다.
- `qa_processor`는 private QA spreadsheet와 analysis note다. 별도 기여 경계와 공개 승인 없이는 수치·고객 내용을 추출하지 않는다.
- `ideation`은 planning agent instruction 자산으로, 실행된 제품 성과가 아니다.
- `hugging-face`는 확인 시점에 career evidence가 없다.

Verdict: `ai-workspace:` 자체의 새 독립 career evidence는 없지만, PROTON snapshot은 SAY cluster 통합의 출발점 provenance로만 보존한다.

## Corrections Required In Current SoT

1. `workspace-project-audit.md`의 Procedure Hub `Skip` 판정은 superseded다.
2. 같은 문서의 homepage renewal `1 commit / footer only` 판정도 superseded다.
3. `project-work-log.md`의 SSO 범위는 session에서 admin control plane까지 재감사해야 한다.
4. multi-agent orchestration은 더 이상 evidence gap만은 아니다. local execution asset과 remote/public boundary를 함께 기록해야 한다.
5. personal stack을 `Java/Spring Boot personal project` 하나로만 설명하면 최근 Rust·Axum, Kotlin·Spring Boot work를 놓친다. 다만 이들은 production career가 아니라 personal case로 분리한다.
6. Daejeong Design은 independent-from-scratch product가 아니라 upstream fork를 재단·확장한 범위로 써야 한다.
7. `ai-workspace:PROTON` snapshot은 별도 기여로 세지 않고, SAY cluster 통합의 출발점 provenance로만 사용한다. 개인 기여는 `workspace:PROTON`과 `workspace:SAY-BE-API`가 소유한다.
8. DIARY는 사용자 확인에 따라 Java 학습용 저장소로 분류하고 career selection에서 제외한다.
9. `NEXUS ≡ Centurion` 판정은 superseded다. DAY는 Centurion의 범용 피부과 CRM 영역이고, NEXUS는 Centurion과 별도의 외부 피부과 운영·예약 시스템이다.

## Promotion Queue

### P0 — Project Evidence First

1. Thready customer messaging reliability evidence section
2. SSO admin control-plane evidence section — pre-production 상한
3. agent workflow에 orchestration-pack과 Daejeong Design fork boundary 추가
4. recent personal engineering evidence record

### P1 — Stable Claim Review

다음은 project evidence와 merge/verification boundary가 닫힌 뒤에만 신설한다.

- SSO admin control plane
- Local multi-agent orchestration

### Hold

- Thready approval publishing: implementation·release 완료 전 보류
- NCP live messaging outcome: live readiness와 운영 근거 전 보류
- Homepage GEO result: visibility·traffic outcome 전 보류
- personal projects의 production·revenue·user outcome: 외부 검증 전 보류
- personal projects 전체: 회사 경력 evidence가 부족하고 JD stack이 직접 요구할 때만 reserve pool에서 선택
- open-source upstream contribution: merge 전 보류
- Procedure Hub production·운영 outcome: 실제 사용 시작 전까지 보류

## Resume Selection Implication

이번 감사는 resume를 무조건 더 길게 만들 근거가 아니다.

- Core는 여전히 Thready 0→1·backend/data/AI boundary, company infra, Centurion, NEXUS, Memento Stripe다. Centurion과 NEXUS는 별도 project로 선택한다.
- Procedure Hub는 미사용 pre-production 구현 근거로만 보존한다. SSO admin은 Prod 예정인 supporting candidate이며 실제 배포·사용 전에는 production 성과로 쓰지 않는다.
- NEXUS는 `여러 피부과 운영·예약 backend 구축 + 예약률·매출 기여`의 제품·backend 사례로 다룬다. 수치와 개인 단독 인과는 사용하지 않는다.
- orchestration-pack은 AX를 buzzword가 아니라 execution mechanism으로 설명할 때 사용한다.
- LetsTalk·ReelsUp을 포함한 개인 프로젝트는 회사 프로젝트로 증명할 수 없는 JD stack이 있을 때만 최후순위로 선택한다.
- homepage GEO·Daejeong Design은 제품·UX·tooling breadth를 보일 때 supporting evidence로 사용한다.

즉, archive는 넓게 유지하고 resume는 JD와 독자의 판단 시간에 맞춰 좁게 선택한다.
