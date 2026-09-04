---
type: product-reference
title: Resume Block Library
description: 이력서·경력기술서·포트폴리오·플랫폼 프로필에 그대로 끼워 넣는 재사용 문안 블록. 블록마다 문제·판단·구현 경계·결과 네 칸, claim ID, 강도, 허용 수치, 사용 preset을 함께 둔다.
timestamp: 2026-09-02
canonical: true
derived_from:
  - profile/identity.md
  - profile/career.md
  - evidence/claims/
  - evidence/projects/
  - products/resume/backend-case-achievements.md
  - products/resume/product-decision-achievements.md
  - backlog/resume-assembly-kit/initial-case-inventory.md
tags: [resume, blocks, assembly, sot, tailored]
---

# Resume Block Library

**이 문서는 재사용 문안의 원형을 소유한다.** 사실·강도·공개 범위는 `evidence/claims/`가, 문서별 포함 깊이는
[common-content-inventory.yaml](common-content-inventory.yaml)이, 각 공개 surface의 최종 순서·강조·연결 문장은
그 surface(`app/fe`, 회사별 `content-draft.md`)가 계속 소유한다.

소유 경계를 한 줄로 쓰면 이렇다.

| 층 | owner | 이 문서와의 관계 |
| --- | --- | --- |
| 무엇이 사실이고 얼마나 강하게 말할 수 있는가 | `evidence/claims/*.yaml` | 모든 블록 문안은 `allowed_copy` 안에 있다 |
| 어느 문서에 어느 깊이로 넣는가 | `common-content-inventory.yaml` | 블록 ID를 공유한다 |
| **블록 하나의 문안 원형 (제목 + 네 칸)** | **이 문서** | 회사별 문안은 여기서 시작한다 (기본값이지 원형 강제가 아니다) |
| 실제 지면의 순서·강조·연결 문장·후킹 | `app/fe`, `content-draft.md` | 사실·금지 수치·동사 강도 상한만 지키고 나머지는 자유롭게 쓴다 |

규칙: [application-copy-standard](../../rules/application-copy-standard.md). 문장 형식: [persuasive-writing §10](../../rules/persuasive-writing.md).

## 블록 형식

```
### <ID> · <제목 한 줄>
강도 · claim · 허용 수치 · 사용 preset
- 문제     무엇이 문제였고 왜 중요했는가
- 판단     어떤 선택지가 있었고 왜 그것을 골랐는가 (근거 없으면 비운다)
- 구현 경계  어떤 data·transaction·API·worker·service 경계를 직접 만들었는가
- 결과     무엇이 달라졌는가 (간접 효과·검증 artifact 포함)
```

- 네 칸은 각각 한 문장이고 개조식·명사형으로 끝난다. surface가 서술체(`~했습니다`)를 쓰면 종결만 바꾼다.
- 범위 한정은 문장 중간에 둔다. `범위 밖`·`미측정`·`참여`·`일부`로 끝내지 않는다.
- 내부 코드명은 블록 제목에만 두고, 공개 문안에서는 제품 성격(`AI 콘텐츠 제품`, `피부과 운영·예약 시스템`)으로 바꿀 수 있다.
- 블록 ID 앞의 대문자(A~F)는 [대표 성과 풀](../../rules/application-copy-standard.md#1-3-대표-성과-풀)의 순번이다. 나머지는 supporting이다.

### 회사별로 블록 안에서 바꿔도 되는 것

| 층 | 회사별 변경 | 예 |
| --- | --- | --- |
| 제목 한 줄 | 같은 사실을 그 회사가 묻는 질문 방향으로 다시 쓴다 | B: 백엔드 공고 `운영 가능한 FastAPI backend로 전환` / AX 공고 `돌아가는 제품을 멈추지 않고 교체한 판단과 검증` |
| 문제 칸 첫 문장 | 어떤 맥락에서 문제였는지를 회사 도메인에 붙인다 | B: 백엔드 `도메인 의존성과 회귀 위험` / AX `현업이 이미 쓰는 도구를 어디까지 바꿀지` |
| 칸의 길이 | 네 칸 중 회사가 묻는 칸을 늘린다 | 백엔드 → 구현 경계, AX·PO → 판단, 데이터 → 결과의 검증 절차 |
| 결과 칸 끝 연결 문장 | `이 경험이 귀사의 ○○에 쓰인다`는 한 줄 | 회사별 `content-draft.md`에서만 |

하드 제약은 세 개뿐이다. **사실이 아닌 것을 쓰지 않는다, 금지 수치를 쓰지 않는다, 동사 강도(주도·공동·참여) 상한을 넘지 않는다.** 이건 [evidence-policy](../../rules/evidence-policy.md)가 이미 정한 것이라 새 제약이 아니다.

그 밖은 전부 자유다. 제목, 첫 문장, 어느 칸을 앞세울지, 어떤 사실을 후킹으로 쓸지, mechanism을 얼마나 풀어 쓸지는 지원본마다 다르게 쓴다. 블록은 "여기서 시작하면 빠르다"는 기본값이지 문장 원형을 지키라는 뜻이 아니다. 블록을 원문 그대로 붙이는 것이 오히려 실패다.

후킹은 근거 있는 반직관 사실이 가장 세다 ([persuasive-writing §12](../../rules/persuasive-writing.md)). 예: `돌아가는 backend를 갈아엎었는데 결함 재발이 3분의 1로 줄었다`, `품질 기준이 자사 출력을 되먹이고 있었다는 걸 재측정하다 발견했다`, `백엔드를 모르는 기획자가 coding agent로 운영 제품을 만들었다`, `PM 1년 한 백엔드`. 전부 사실이고 전부 후킹이다. 막히는 것은 `3분의 1`을 `5분의 1`로 쓰는 것뿐이다.

---

## 0. 소개 블록 (`intro.*`)

회사별 소개 첫 줄은 이 셋을 JD 순서로 조합한다. 브랜드 문장은 공통에만 둔다.

### intro.brand · 브랜딩 한 문장 (모든 소개의 첫 줄, 2026-09-03 재확정)
강도 — · owner [identity.md](../../profile/identity.md#canonical-one-line)

> 가능성을 기회로 바꾸고, 제품으로 가치를 전하는 메이커 김대정입니다.

- **브랜딩 문장은 하나다. 문서·회사·플랫폼별로 바꾸지 않는다** (2026-09-03 user-confirmed). 이력서 summary[0]·경력기술서 부제·포폴 headline이 이 문장과 다르면 게이트 16 FAIL.
- 2026-09-03 오전에 만든 확장형(`가능성을 제품으로 만들고, 끝까지 책임지는 Product Engineer 김대정입니다.`)은 같은 날 폐기했다. Product Engineer는 헤더 직함·역할 표기로만 쓴다.
- 둘째 문단은 `intro.planner-backend`의 첫 사실로 시작한다: `기획자로 시작해 백엔드로 왔고, 아이디어를 제안한 AI 콘텐츠 제품의 …을 직접 만들고 핵심 화면은 coding agent로 완성해 월 1천만원 수준의 구독 매출이 발생하는 제품으로 운영합니다.` 추상적인 `지금은 고객이 구독하는 AI 제품을 만들고 운영합니다`는 쓰지 않는다(2026-09-03: 어색함).

### intro.planner-backend · 기획자 출신 백엔드 엔지니어
강도 `led` · claim `career.ai-pm-backend-continuity`, `career.sellercanvas-product-system`

> 기획자 출신 백엔드 엔지니어. 생성형 AI 커머스 제품의 PM으로 프로토타입을 v1.0과 기업 PoC까지 끌고 간 경험을 바탕으로, 고객 문제를 기능 우선순위와 구현 범위로 좁힌 뒤 직접 구현한다.

### intro.paid-product · 결제 고객이 있는 AI 제품을 아이디어부터 직접 구현·운영
강도 `led` · claim `thready.product-zero-to-one-contribution`, `thready.frontend-product-delivery`, `thready.subscription-revenue-band`

> 아이디어를 제안하고 초기 프로토타입 이후 제품화를 주도해, 실제 고객이 결제하는 AI 콘텐츠 제품으로 발전시켰다. 그 제품의 FastAPI 백엔드·AI 생성/평가 시스템을 직접 구현하고, 핵심 화면은 coding agent로 완성해 운영한다.

### intro.team-standard · 모두가 메이커로 제품을 만드는 팀의 조직 표준을 직접 구축
강도 `owned` · claim `be-template.backend-standard`, `be-template.team-leverage`, `career.coding-agent-usage`

> AI 활용이 본격화되면서 모두가 메이커로 제품을 만들고 운영하는 팀이라, 백엔드 경험이 적은 팀원도 Claude Code·Codex와 같은 기준으로 운영 제품을 만들 수 있도록 FastAPI 구현·검증 기준을 조직 표준 template과 agent 작업 맥락으로 직접 구축했다. (2026-09-03: 인원 부족 서사 대신 팀 구조로)

### intro.domain-switch · 세 도메인에서 현업 흐름을 제품으로 만든 경험 (도메인 우려 선제 답)
강도 `led` · claim `career.sellercanvas-product-system`, `nexus.backend-architecture`, `thready.product-zero-to-one-contribution`

> 커머스(생성형 AI 상세페이지), 피부과 운영(CRM·예약·발주), SNS 콘텐츠(Threads 자동화) 세 도메인에서 현업의 반복 업무를 파악해 실제로 쓰이는 제품으로 만들었다.

### intro.ai-leverage · AI 활용 방식 (형용사 대신 목록)
강도 `owned` · claim `career.coding-agent-usage`, `career.weekly-role-based-agent-retrospective`

> Claude Code·Codex를 codebase 분석·기능 inventory·반복 구현·검증에 쓰고, architecture·test 기준·release 판단은 직접 소유한다. 팀에서는 주 1회 agent 활용 회고로 무엇을 만들지와 더 효율적인 구현 방법을 함께 정한다.

---

## 1. 대표 성과 블록 (A~F)

### A · thready.paid-product · 아이디어를 제안하고 초기 프로토타입 이후 제품화를 주도해, 실제 고객이 결제하는 서비스로 발전
강도 제품화·운영 `led`, backend·AI `owned`, frontend `led`, 매출 `contributed` · claim `thready.product-zero-to-one-contribution`, `thready.threads-content-workflow-automation`, `thready.frontend-product-delivery`, `thready.generation-quality-system`, `thready.subscription-revenue-band` · 허용 수치 **없음** (매출 마스킹) · preset 전체 · inventory `thready.paid-product`

- 문제 — Threads 글을 만들 때 참고 자료 가져오기·정리, 글 구성, 1차 검수, 예약·발행 준비를 사람이 매번 반복하고 있었고, 무엇이 좋은 글인지 판단 기준도 감에 의존.
- 판단 — 기획자 경험으로 고객 불편을 기능 우선순위와 생성 품질 기준으로 구체화하고, AI는 자료 정리·초안·1차 검수를 맡고 최종 수정·예약·발행 판단은 사람이 하도록 제품 흐름을 설계.
- 구현 경계 — FastAPI 제품 백엔드, typed prompt builder·LLM judge·평가 이력 기반 생성 품질 시스템, 콘텐츠 생성·가져오기·예약·발행·대시보드·관리 화면을 직접 구현.
- 결과 — 기획·QA·마케팅과 제품 운영을 리드해 팀과 함께 실제 고객이 결제하는 유료 제품으로 출시·운영 중.

금지: 초기 prototype 직접 구현, 제품 전체 단독, 매출액·MRR, 매출 단독 인과, PO 공식 직함 단정.

### B · thready.backend-rebuild · 인계받은 prototype backend를 프런트엔드를 유지한 채 FastAPI로 병렬 재구축·전환, QA reopen 37%→11%
강도 `owned` · claim `thready.rebuild-decision-execution`, `thready.backend-rebuild`, `thready.prototype-to-user-operation`, `thready.qa-reopen-reduction`, `thready.release-operation` · 허용 수치 `37% → 11%` 또는 `26%p`, `일평균 4.45건 → 0.26건`, `약 94% 감소` (반드시 하네스·cutover와 같은 자리), `36시간` 조건부 · preset 전체 · inventory `thready.backend-rebuild`

- 문제 — 빠른 기능 검증 중심으로 만들어진 초기 backend를 인계받았을 때 도메인 간 의존성이 얽혀 회원 로직 변경이 AI 생성 중단으로 이어지고, 해결된 QA 이슈가 같은 영역에서 다른 형태로 재발.
- 판단 — 부분 수정을 이어가는 안과 backend만 병렬 재구축하는 안을 비교해, 서비스가 작고 AI 모듈 확장이 예정된 시점이라 재구축을 선택하되 기존 프런트엔드와 릴리스 흐름은 유지하는 범위로 한정.
- 구현 경계 — 기존 API 동작을 고정할 계약·컴포넌트·운영 흐름 검증 하네스를 먼저 세우고, 새 FastAPI backend를 나란히 만들어 응답을 비교한 뒤 v1.1.0에서 전환. 재구축 범위·architecture·검증·전환 판단은 직접 소유하고 Claude Code·Codex는 codebase 파악·기능 inventory·구현에 활용.
- 결과 — 같은 기준의 Jira 집계에서 해결된 QA 이슈의 재오픈 비율이 37%에서 11%로, 재발 발생이 하루 4.5건에서 0.3건으로 낮아졌고, v1.3.0부터 실제 사용자가 쓰는 제품의 backend 배포·QA·운영을 계속 전담.

금지: 전임 폄하, `36시간` 단독, 95% 이상, backend 단독 인과, QA 총건수 감소.
경계(면접용): 티켓에 BE/FE 라벨이 없어 backend 단독 효과는 분리 불가. 4월은 QA 집중 초기라 활동량 교란.

### C · centurion.bay-async · 주문·재고 API와 실패 가능한 후속 작업을 worker로 분리하고 상태·재시도·수동 재처리 경계 구축
강도 `led` · claim `centurion.bay-async-backend`, `centurion.async-migration`, `centurion.test-ci-foundation`, `centurion.msa-platform-context` · 허용 수치 없음 (최대 3회 retry는 mechanism 설명으로 가능) · preset Backend·AI Backend·데이터 · inventory `centurion.async-realtime`

- 문제 — 피부과 CRM의 자동 발주에서 주문 생성 뒤 공급사·병원 알림이 외부 연동에서 실패할 수 있어, 실패가 주문 상태와 운영자의 재처리 흐름에 어떻게 남을지가 설계 과제.
- 판단 — 실패 가능한 작업은 제품 시작 시점부터 API 요청 밖 worker 경계에서 처리하기로 하고(Memento에서 결제 실패를 수습한 경험의 전이), FastAPI를 async로 운용하는 상황에서 Celery가 asyncio 실행 모델을 공식 지원하지 않아 TaskIQ·RabbitMQ로 전환.
- 구현 경계 — 알림 worker의 `PENDING → SENDING → SUCCESS/FAILED` 상태, 최대 3회 재시도, 최종 실패 기록, 전용 API의 조건 검증 후 수동 재발송 경계를 구현하고, 워커 이미지를 API와 분리해 배포 단위를 나눔. API test infrastructure·Docker CI·온보딩 문서로 API·broker·worker 흐름을 재현 가능하게 구성.
- 결과 — 자동 재시도가 끝난 뒤에도 원인과 상태가 남아 운영자가 다시 처리할 수 있고, 신규 담당자가 같은 환경을 재현할 수 있는 개발 기반 확보.

금지: 비동기 최초 도입, 사후 대응 서술, 성능·지연 수치, Centurion 전체 단독.

### D · thready.ai-boundary · 제품 원장과 AI 실행 상태를 분리하고 STG 이관·Outbox 전달 정합성 검증
강도 `owned` · claim `thready.ai-service-boundary`, `thready.ai-service-migration`, `thready.ai-replica-outbox` · 허용 수치 `2,616 · 795 · 7,111` (강조 없이 검증 절차의 근거로) · preset Backend·AI Backend·데이터 · inventory `thready.ai-runtime`

- 문제 — 제품 정책·원장과 AI 생성 lifecycle·실행 상태가 한 backend·DB에 있어 AI 확장과 장애가 제품 원장에 결합되고, 분리 뒤에는 원장 변경만 성공하고 전달이 사라지거나 오래된 전달이 늦게 도착해 최신 상태를 덮는 failure mode가 생김.
- 판단 — DB를 공유하지 않고 AI 실행부를 독립 FastAPI application·DB로 분리해 authenticated HTTP 계약으로만 연결하고, 전달은 원장 변경과 같은 transaction에 기록하는 Transactional Outbox로 분리.
- 구현 경계 — lease 기반 claim·attempt token·retry·delivery version fence·멱등 consumer·최대 재시도 뒤 terminal failure 보존으로 지연·중복·역순 전달 통제. STG 실데이터 생성 이력 2,616건·품질 기록 795건·실행 추적 7,111건을 parent→child 순서로 이관하고 local rehearsal·행 수·MD5 fingerprint·FK orphan 0건·post-deploy 생성 API E2E gate로 검증.
- 결과 — 독립 AI application·DB를 STG·Prod에서 운영 중이며, AI 장애나 역순 전달이 최신 원장 상태를 덮지 않는 복구 경계 확보.

금지: 무중단·유실 0건·exactly-once, Prod migration 완료·Prod rehearsal.

### E · be-template.standard · 백엔드 경험이 적은 팀원도 coding agent와 함께 운영 제품을 만들 수 있게 FastAPI 조직 표준 template 구축
강도 `owned` · claim `be-template.backend-standard`, `be-template.fastapi-sqlalchemy-standard`, `be-template.team-leverage`, `be-template.agent-context`, `career.coding-agent-usage` · 허용 수치 `10명 안팎 · 백엔드 2~3명 · 다수 제품` · preset 전체 (JYP·AX/FDE·Platform에서는 첫 번째) · inventory `be-template.standard`

- 문제 — AI 활용이 본격화되면서 기획·QA·디자인 담당자도 메이커로 coding agent와 구현에 참여하게 되자, DB session 수명주기를 몰라 session 미반납·connection pool 고갈·반복 500이 STG에서 발생하고 backend가 상시 개입해야 했음.
- 판단 — Router에서 받은 session을 모든 계층에 전달하는 반복을 없애고 Service method가 `@transactional`로 정책을 선언하도록 바꾸며, Python의 자유도를 사람마다 다시 해석하지 않도록 Java/Spring식 명시적 계층·의존성·transaction 규칙을 기본값으로 채택. AI Agent 기능은 tool·provider 교체에 대비해 Hexagonal, 나머지는 MVC를 기본 구조로 guide.
- 구현 경계 — FastAPI·SQLAlchemy 2.0 async 기반 Router·Service·Validator·Repository·Model 계층, `REQUIRED/REQUIRES_NEW/NESTED` transaction propagation, ContextVar 기반 session resolve, owner-task guard와 integration test, ADR·runbook·agent context·반복 작업 automation skill을 template에 내장.
- 결과 — full template으로 시작한 신규 사내 프로그램의 STG QA에서 같은 session·pool 문제가 재관측되지 않았고, 기획·QA·디자인 담당자가 coding agent와 template으로 사내 프로그램을 직접 구현하며 backend는 결과 피드백과 배포 지원으로 개입 범위가 줄어 담당자별 속도·품질 편차를 일정 수준으로 유지.

금지: 정확한 프로그램 수·제품명, 결함·시간 정량, deadlock 표현, production incident 감소, 전사 전환 완료, `70~80점`.

### F · nexus.multi-tenant · 여러 피부과의 운영·예약 backend를 multi-tenant monorepo로 설계·구축 주도하고 지점 접근 범위를 server-owned로 전환 (진행 중)
강도 architecture `led`, IaC `owned`, outcome `contributed` · claim `nexus.backend-architecture`, `nexus.admin-backend-ownership`, `nexus.branch-access-boundary`, `nexus.quality-automation`, `nexus.terraform-infra`, `nexus.hospital-operations-revenue-contribution` · 허용 수치 없음 (커밋 83%는 내부 근거) · preset Backend·데이터·B2B SaaS · inventory `nexus.external-product`

- 문제 — 외부 피부과 여러 곳의 홈페이지·관리·예약 운영을 한 backend가 지원해야 하고, 운영자의 데이터 접근 범위를 client가 보내는 `X-Branch-Id` header가 결정하던 구조가 tenant 격리의 failure mode.
- 판단 — Admin/Homepage API를 독립 모듈로 두고 API Gateway를 단일 진입점으로 하는 계층 구조를 택하고, working branch는 로그인 시 server auth state로 소유해 권한 검증 전용 API로만 전환하되 Homepage API의 기존 header 계약은 유지하는 범위로 migration.
- 구현 경계 — Router–Service–Repository–Model과 DI, Generic Repository, multi-tenancy(BranchMixin)·soft delete 자동 필터, 본사 미선택 `409`·권한 밖 `403` 구분, Ruff·Pyright·pre-commit 정적 검증과 API·DB 설계 가이드, 이 시스템의 Terraform IaC 전담.
- 결과 — 제품은 예약률 개선을 통해 고객사 매출 성과에 기여했고, tenant 접근 범위가 client 입력이 아니라 server 상태로 결정되는 경계로 전환 중.

금지: 고객사 실명, 단독 구축, 도메인 개수, Closure Table, 500 완전 해결, 예약률·매출 수치, 완료형.

---

## 2. Supporting 블록

### G · centurion.say-realtime · 실시간 AI 상담 backend의 session lifecycle과 STT 전사 순서 경계 공동 안정화
강도 `co-led` · claim `centurion.say-realtime-ai` · 허용 수치 E2E `DELTA 586 · COMPLETE 25 · sequence 1–25 누락 없음` (protocol 검증 수치, 정확도 수치 아님) · preset AI Backend·Backend(2순위)

- 문제 — 상담 중 발화가 계속 이어지는데 STT의 DELTA는 순서대로 오지만 COMPLETE와 늦게 도착하는 CORRECTED가 순서를 보장하지 않아, 보정 결과가 다른 turn을 덮어쓰면 상담 기록이 바뀔 위험.
- 판단 — COMPLETE 도착 순서를 재정렬하는 대신 DELTA·COMPLETE·CORRECTED를 같은 sequence로 묶어 보정이 같은 발화만 교체하도록 하고, VAD silence 실험에서 주 병목이 모델 추론임을 확인해 VAD 조정보다 DELTA 조기 trigger와 provider 경계 분리에 집중.
- 구현 경계 — WebSocket session의 중복 event를 task cancellation·debounce·retry·turn-state guard로 제어, 종료 뒤 재연결되던 session의 timer·GC·shutdown 정리 경계 보강, reconnect race 8개·GC TTL 5개의 13개 regression scenario 고정, provider 후보 benchmark(WER·CER·keyword retention·latency) 구축.
- 결과 — 같은 문장이 반복되거나 보정이 늦게 도착해도 다른 turn을 덮어쓰지 않는 protocol 경계와 회귀 테스트 확보.

금지: provider 실명, 단독 구축, STT 정확도 개선 단정, asyncio 심화 전문성, keyword numeric weight.

### H · thready.data-quality · SNS 관측 데이터를 성과 기준과 재적재 가능한 사람 평가 workflow로 전환
강도 `owned` · claim `thready.threads-market-outcome-design`, `thready.labeling-corpus-workbench`, `thready.threads-marketing-criteria`, `thready.quality-criteria-system`, `thready.measurement-correction` · 허용 수치 데이터 JD에서 `13.1만 행 · 318만 관측` 두 개까지 · preset 데이터·AI Backend

- 문제 — 반응이 좋은 콘텐츠를 고정 임계값 하나로 정의하기 어려웠고, 최신 상태·반복 관측·원문 corpus·사람 평가가 서로 다른 생명주기를 가짐.
- 판단 — 절대 조회·저자 상대·도메인 상대·참여 품질·합의의 5개 outcome 후보를 병렬로 두어 정의를 조기 고정하지 않고, 품질 판정을 자동 게이트·실측 분포·사람 판정 3층으로 나눠 자동화가 닿는 층과 닿지 않는 층을 분리.
- 구현 경계 — URL 기준 최신 상태와 시계열 관측을 분리한 분석 구조, 기존 제품 projection과 FK를 공유하지 않는 독립 labeling schema, typed batch validation·source key upsert·continuation replace의 멱등 importer, super-admin API/UI workbench(1~10점·사유·진행률).
- 결과 — 감에 의존하던 글쓰기 기준을 실측 corpus 기반 생성·평가 기준으로 전환했고, 프롬프트 기준값이 자사 출력을 되먹이던 순환을 재실측으로 발견해 교정.

금지: 고유 게시물 N건, 전량 LLM 분석·학습, 전량 사람 labeling 완료, STG·Prod 적재 완료, 플랫폼 대표 통계, 반응·매출 인과.
경계(면접용): 수집기(crawler)는 별도 파이프라인이고 담당 범위는 정제·적재·평가 구간.

### I · thready.agent-prototype · Thready 기능을 대화로 제어하는 Agent prototype 설계·구현·검증
강도 `owned` (prototype) · claim `thready.conversational-editorial-agent-prototype`, `thready.agent-pipeline-design` · 허용 수치 `편집 7 · 운영 13 capability`, `679 test` · preset AI/AX·JYP류

- 문제 — 화면마다 기능을 찾아 들어가는 대신 사용자가 원하는 작업을 말하면 제품이 허용된 기능을 골라 실행해 주는 흐름을 검증할 필요.
- 판단 — multi-agent가 아니라 하나의 planner-executor로 두고, planner는 typed plan만 만들고 실행 권한은 capability registry가 확인한 뒤 dispatch. 예약·발행·삭제 같은 mutation은 다음 turn의 typed confirmation을 통과할 때만 실행되도록 사람 승인 경계를 둠.
- 구현 경계 — 대화·message·turn·tool result·versioned artifact 원장, append-only activity event, token-aware context compaction, receipt 기반 idempotency, Mock operation gateway.
- 결과 — 글감 탐색·기획·작성·수정과 계정·게시물 관리 흐름을 하나의 대화 인터페이스로 재구성하고 승인 전 무변경·승인 뒤 상태 전이·새로고침 뒤 복원을 검증한 독립 prototype.

금지: production 배포, 실제 Threads 계정 조작, durable worker 완료, multi-agent, 생성 파이프라인 단독 설계.
경계(면접용): 운영 Thready에 연결되지 않은 독립 prototype. 이 경계는 이력서 본문이 아니라 구두로 전달한다 (2026-08-31 user-confirmed).

### J · product-operations.ax · 결정·명세·작업·릴리스 기록을 사람과 AI가 같은 맥락으로 읽는 제품 개발 체계 운영, 회사 AX 설계 참여
강도 운영 `led`, 설계 `contributed` · claim `mediness.product-operations`, `mediness.product-development-coordination-leverage`, `mediness.company-work-ax-design`, `mediness.product-system-design-participation`, `mediness.slack-issue-intake-flow-proposal` · 허용 수치 없음 · preset AX/FDE·JYP류(첫 번째), 공통 경력 bullet

- 문제 — 제품마다 요구·진행 상태·과거 판단을 다시 설명하고 확인하는 반복 커뮤니케이션이 쌓이고, 담당자가 바뀌면 구두 인수인계로 맥락을 다시 구성해야 했음.
- 판단 — 기획·디자인·개발·QA·릴리스에서 나온 결정과 상태를 결정·명세·작업 기록·ADR·release 근거·agent context로 계속 축적해 사람과 agent가 같은 맥락을 읽게 하고, 우선순위·의사결정·업무 배정·승인·release처럼 판단이 필요한 단계는 사람이 확정하는 경계를 유지.
- 구현 경계 — 제품별 pipeline registry에 결정·명세·작업 기록을 실행 원장으로 적용하고 BE·FE·QA owner lane과 QA approval을 release gate에 연결, release gate·version cut을 완료 시점에 연결해 release note 생성 자동화. Slack 접수 이슈를 사내 시스템에 남기고 해결 상태를 추적하는 흐름은 제안하고 연동 구현은 다른 담당자가 수행.
- 결과 — 담당자가 바뀌어도 누적 기록에서 업무를 이어갈 수 있어 인수인계·맥락 복원 비용이 낮아졌고, 유사 기능·후속 변경에서 기존 판단을 재사용해 lead time 단축에 기여. 회의·의사결정·업무 배정·승인을 같은 구조로 잇는 회사 AX 설계에 참여.

금지: 내부 용어(Decision·SPEC·Work Package·human gate) 그대로 노출, 전사 전환 완료, 인력 대체, 수치, Slack Bot 구축, 서비스 직접 구현.

### K · memento.payment · Stripe 선결제와 provider 보상 처리로 예약·결제 상태 정합성 보완
강도 Stripe slice `led`, 공유 domain `contributed` · claim `career.memento-stripe-prepayment`, `career.memento-payment`, `career.memento-fastapi-backend`, `career.memento-happycall-survey` · 허용 수치 없음 · preset Backend·결제 JD, 공통 경력 bullet

- 문제 — 예약 처리가 실패했을 때 외부 결제와 내부 예약·마일리지·이용권 상태가 어긋나는 failure mode.
- 판단 — manual capture로 예약 확정 전 결제를 보류하고, 예약 실패 시 PaymentIntent 상태가 `requires_capture`면 cancel, `succeeded`면 refund하는 provider-side 보상을 두며, 마일리지 복원·이용권 삭제는 환불 요청이 아니라 환불 완료 transition으로 이동.
- 구현 경계 — FastAPI·SQLAlchemy·MySQL 기반 예약·결제 API, Stripe Checkout·Webhook과 독립 PaymentHistory·PaymentMethod, local transaction ID를 provider metadata에 실어 이력과 event를 연결, 현금·Stripe·0원·전액 마일리지 경로 분기. 입사 초기에는 다국어 Happy Call의 알림톡·이메일 즉시/예약 발송과 Celery ETA 취소·재등록·발송 이력 구현.
- 결과 — 실패 경로별 상태 변경 순서가 정리됐고, 이 경험이 이후 실패 가능한 작업을 처음부터 worker로 분리하는 예방 설계의 배경이 됨.

금지: atomic rollback, webhook idempotency·exactly-once, 결제 시스템 전체 ownership, 구독·다국가.

### L · studio-lab.sellercanvas · 생성형 AI 커머스 제품의 PM으로 프로토타입을 v1.0과 기업 PoC까지 연결, 제작 flow 재설계가 특허로
강도 `led` (PM), 모델·특허·수상 `contributed` · claim `career.sellercanvas-product-system`, `career.sellercanvas-enterprise-poc`, `career.sellercanvas-vision-model-development`, `credentials.page-output-patent`, `credentials.ces-2024` · 허용 수치 없음 · preset 전체 (경력 행), PO·AX/FDE에서 확장

- 문제 — 합류 당시 SellerCanvas는 프로토타입 단계였고, 무엇을 남기고 바꿀지와 출시 우선순위를 정할 제품 판단이 필요.
- 판단 — PM 메인 역할로 프로토타입 사용 데이터를 보고 제품 흐름·기능 범위·출시 우선순위를 정해 v1.0으로 세우고, 그 과정에서 외부 패션 브랜드 PoC의 비즈니스 요구를 기술 스펙으로 변환.
- 구현 경계 — 상세페이지 제작 flow 재설계, PoC의 기획·일정·기술 검증 범위 조율. AI Engineer 구간(2021.12–2022.09)에서는 Vision AI 기반 의류 이미지 분석 모델 개발 참여. (Backend 구간의 NestJS template은 코드가 없어 구두 설명용.)
- 결과 — 제작 flow 재설계가 특허 「페이지 출력 방법」 등록(10-2898273)으로 이어졌고, 제품은 CES 2024 Best of Innovation(AI 부문) 수상.

금지: 단독 발명·단독 수상, 창업 시점 참여, 0에서 혼자, 고객사 실명·PoC 건수, 매출·전환율, 과거 모델 정확도 수치.

### M · career.foundation · 법인 설립 전 Centurion 초기 backend와 개발팀 기준 선행 구축 (합류 경로)
강도 `led` · claim `career.thedaylabs-freelance`, `career.memento-to-medisolve-early-member` · preset 전체 (경력 행 제목줄 또는 합류 경로 bullet)

> Memento AI 개발 성과를 인정받아 MediSolve AI 초기 멤버로 영입됐고, 법인 설립 전 더데이랩스 프리랜서 기간(2025.02–04)에 피부과 CRM의 초기 backend와 repository 구조·환경·문서·ISSUE/PR 기준을 선행 구축한 뒤 2025.04 설립과 함께 정규 합류해 Tech Lead 역할을 맡음.

금지: 법인 전환·승진·고용 연속·공동창업자·같은 회사, 프리랜서 기간 성과 수치.

### N · infra.deployment · 여러 사내 서비스의 Azure·Vercel 배포 환경 구성과 기본 운영 (supporting only)
강도 `owned` (범위 한정) · claim `infra.company-azure-ownership`, `centurion.shared-infra` · preset 기술 섹션 한 줄, 경력 bullet 반 줄

> 여러 사내 서비스가 동작하도록 Docker·GitHub Actions·Azure·Terraform·Vercel 배포 환경을 구성하고 기본 운영을 담당.

금지: 대표 성과 사용, topology·400+ object·VM·alert 수치, infrastructure architecture 전문성.

### O · external.ux · 사용자 흐름의 문제를 개선 가설·요구사항·Figma 화면으로 구체화 (외부 활동)
강도 `contributed` · claim `career.product-ux-practice`, `career.ux-consulting-product-outcome` · preset 공통·PO (외부 활동 섹션), Backend 지원본에서는 생략 가능

> 운영 서비스의 보상 포인트 인지·재방문 문제를 badge·push 개선 가설과 Figma 화면으로 제안하고, Speak 학습 완료 후 추천 흐름 개선안을 설계·발표해 IPS 12기 MVP 선정. 개선안이 반영된 뒤 서비스의 App Store 순위·DAU 상승에 기여.

금지: `DAU 200%`·`9위→5위` 수치, 단독 인과, UX Designer.

### P · tellingme.personal · 개인 프로젝트 Spring Boot backend와 AWS 배포·모니터링 리드
강도 `led` · claim `career.tellingme-backend-infra` · preset 개인 프로젝트 섹션, 기술 섹션 `Java·Spring Boot 개인 프로젝트`

> 10명 팀의 백엔드 2명 중 주도로 Spring Boot/JPA backend와 OAuth2/JWT, 게임화 도메인, AWS 배포·모니터링을 리드. 경력이 아니라 개인 프로젝트로 표기.

금지: package·endpoint 수, 경력란 표기, 실무 스택과 같은 층.

### Q · credentials · 검증 자산
claim `credentials.page-output-patent`, `credentials.ces-2024`, `credentials.ai-accuracy-certification`, `credentials.adsp`, `credentials.education`

| 항목 | 문안 |
| --- | --- |
| 특허 | 「페이지 출력 방법」 · 등록 10-2898273 (2022.10 출원, 2025.12경 등록) |
| 수상 | CES 2024 Best of Innovation · AI 부문 수상 제품 참여 (2024.01) |
| 인증 | 한국건설생활환경시험연구원(KCL) AI 정확도 인증 통과 제품 참여 (2022.11경) |
| 자격 | ADsP (2021.09) |
| 학력 | 우송대학교 게임멀티미디어 전공 (2016.03–2021.08) |

금지: 출원번호, 정확도 수치·모델명, 단독 발명·수상.

---

## 3. 경력 행 제목줄 (`career.rows`)

회사 행의 **제목줄**에 재직 사유를 붙인다. bullet 안에 숨기지 않는다 (게이트 3).

| 회사 | 기간 | 제목줄 |
| --- | --- | --- |
| MediSolve AI | 2025.04 — 재직 중 | `Tech Lead · Backend Engineer` (회사별: 공고 직무명 · 병행 역할) — 초기 멤버 영입 · 법인 설립 전 더데이랩스 프리랜서 선행 개발(2025.02–04) |
| 더데이랩스 | 2025.02 — 2025.04 | `Backend Engineer · 프리랜서` — MediSolve AI 법인 설립 전 선행 개발 (별도 행으로 둘 때) |
| Memento AI | 2024.10 — 2025.01 | `Backend Engineer` — 인턴 합류 후 정규직 전환 · 회사 폐업으로 종료 |
| STUDIO LAB | 2021.12 — 2024.01 | `Product Manager` — AI Engineer → PM(주 역할) → Backend Engineer |
| 아이즈솔 | 2020.08 — 2021.06 | `Vision AI Engineer · 인턴` — 안면 인식 기반 자동 출결 시스템 개발 |
| TellingMe | 2024.01 — 2024.12 | 개인 프로젝트 · Backend Lead & Infra (경력란이 아닌 별도 섹션) |

**기본값은 MediSolve 행에 그룹화**다 (2026-09-02 user-confirmed: MediSolve AI 설립 전 임시로 구축한 구간이고 대표가 이어진다). 합류 경로 bullet 또는 제목줄에 더데이랩스 명칭·기간·프리랜서 형태를 반드시 표기한다. 공개 문안에서는 `대표가 같다`로 단순화하지 않고 `법인 설립 전 선행 개발`로 쓴다 (2026-08-18 guardrail). 경력증명 대조가 명시된 공고에서만 별도 행으로 분리한다.

---

## 4. 기술 섹션 블록 (`skills.*`)

내부 용어를 쓰지 않고 도구명을 명시한다 (게이트 5·6).

| lane | stack | 사용 맥락 (via) |
| --- | --- | --- |
| Backend | Python · FastAPI · SQLAlchemy 2.0 async · PostgreSQL · MySQL · Redis | 제품 API·도메인 모델·transaction/session 경계·데이터 이전 주력. TypeScript·Express·NestJS는 gateway·SSO 연동 경험, Java·Spring Boot는 개인 프로젝트 |
| Data / Async | RabbitMQ · TaskIQ · Celery · Transactional Outbox | 주문·재고 worker의 상태·retry·수동 재처리, delivery version fence·멱등 consumer |
| AI Runtime | LLM integration/evaluation · typed prompt · structured output · WebSocket · SSE · STT | 생성 lifecycle·품질 평가 직접 구축, 실시간 상담 session lifecycle·provider 경계 공동 안정화 |
| 제품 실행 체계 | Jira · release gate · ADR · runbook · agent context | 결정·명세·작업·릴리스 기록을 사람과 agent가 같은 맥락으로 읽는 체계 운영 |
| Coding Agent | Claude Code · Codex | codebase 분석·기능 inventory·반복 구현·검증에 활용, architecture·test·release 판단은 직접 소유 |
| 연동·관측 | Stripe · 카카오 알림톡 · STT/LLM provider · Sentry | 외부 결제 보상 처리, 알림 worker, 외부 AI 장애 감지·모델 격리 운영 |
| Cloud / Delivery | Docker · GitHub Actions · Azure · Terraform · AWS · Vercel | 서비스 배포·환경 설정·기본 운영 경험 |

---

## 5. Preset별 기본 순서

회사별 지원본은 아래 preset에서 시작해 JD 질문 세 개에 맞춰 순서만 바꾼다.

| preset | 대표 성과 순서 | 소개 첫 줄 | 비고 |
| --- | --- | --- | --- |
| Backend (일반·SaaS) | B → C → F → D → E | intro.planner-backend + intro.paid-product | 헤더 `Backend Engineer · Tech Lead 역할 병행` |
| AI Product Backend | A → D → B → G → H | intro.paid-product + intro.ai-leverage | |
| 데이터 (SNS·corpus JD) | H → B → D → C → F | intro.paid-product + intro.planner-backend | corpus 수치 두 개 허용 |
| Product Ownership | A → L → J → B → E | intro.planner-backend + intro.paid-product | Tech Lead 앞에 둘 수 있음 |
| AX / FDE · 사내 AI 도구 | E → J → A → I → B | intro.team-standard + intro.planner-backend + intro.domain-switch | 헤더는 공고 직무명 |
| 리드 포지션 | E → A → B → J → D | intro.team-standard + intro.paid-product | 헤더 `Tech Lead · Backend Engineer` |

---

## 6. 항목별 후킹 데이터 — 허용 범위 안에서 가장 센 표현

지어내지 않고도 드라마틱한 표현은 이미 `allowed_copy`에 있다. 회사별 문안은 이 표에서 골라 쓴다.
`승격하면 더 세지는 것`은 evidence 문서에는 실측이 있지만 아직 claim `allowed_copy`에 오르지 않은 것이다. 쓰려면 claim을 먼저 고친다.

| 블록 | 가장 센 허용 표현 (그대로 써도 되는 것) | 근거 claim | 승격하면 더 세지는 것 (evidence 실측, claim 미반영) |
| --- | --- | --- | --- |
| A Thready 제품화 | `아이디어를 제안하고 초기 프로토타입 이후 제품화를 주도해, 실제 고객이 결제하는 서비스로 발전` · `사람이 반복하던 Threads 콘텐츠 제작 업무를 자료 정리→초안→1차 검수→예약·발행 준비의 제품 흐름으로 연결` | `product-zero-to-one-contribution`, `threads-content-workflow-automation` | 유료 운영 기간(v1.3.0 이후 개월 수), 운영 고객 계정 수 — evidence 없음, 확보 시 규모 신호 |
| B 재구축 | **`재발 발생 일평균 약 94% 감소`** · `재발률 37% → 11%` · `4월 대비 약 70% 하락` · `잔여 이슈도 원인 영역이 파악된 상태로 관리` · `하네스를 먼저 세팅하고 AI와 협업해 파악부터 재구축까지 총 36시간(작업 시간)` | `qa-reopen-reduction`, `rebuild-decision-execution` | 재발 **일평균 4.45건 → 0.26건** (Jira 실측, thready.md QA Reopen Signal) — 절대값 병기 승격 후보. 합류 4/14 → cutover 6/5 → 실사용 v1.3.0 timeline |
| C BAY 비동기 | `실패 가능한 작업을 API 요청과 분리된 worker 경계에서 처리` · `발송 결과를 주문 상태·자동 retry·최종 실패·수동 재발송과 연결` · `async FastAPI 실행 모델 정합성을 기준으로 TaskIQ 선택` | `bay-async-backend`, `async-migration` | 없음 (성능·지연 측정값 부재). 후킹은 판단 서사(Celery가 asyncio 실행 모델 미지원 → 전환)로 |
| D AI 분리·Outbox | `AI 장애나 역순 전달이 최신 원장 상태를 덮지 않도록` · `lease 기반 재점유·delivery version·attempt token` · `STG 생성 이력 2,616건·품질 795건·trace 7,111건 이관, MD5 fingerprint·FK orphan 검증` · `배포 성공과 기능 정상 동작을 분리해 post-deploy E2E gate` | `ai-replica-outbox`, `ai-service-migration` | `FK orphan 0건` 명시 (evidence에 있음, allowed_copy는 "FK orphan 검증"까지) · `workflow·health 성공인데 생성 실패한 사례를 계기로 gate 수립` (evidence incident) |
| E Template | **`백엔드를 모르는 기획·QA·디자인 담당자가 coding agent와 template으로 운영 제품 구현`** · `full template 신규 프로그램 STG QA에서 session 미반납·pool 고갈 재관측 없음` · `backend는 결과 피드백과 배포만 지원하는 수준으로 개입 축소` · `10명 안팎·백엔드 2~3명·다수 제품` | `team-leverage` | 사내 프로그램 **4개**, 엔지니어 8명(BE 3·FE 5)·제품 12개 — 정확 수치는 forbidden. 승격 대상 아님, 면접 구두용 |
| F NEXUS | `client가 보내는 header가 아니라 server auth state가 데이터 접근 범위를 결정` · `본사 미선택 409·권한 밖 403` · `예약률 개선을 통해 고객사 매출 성과에 기여` | `branch-access-boundary`, `hospital-operations-revenue-contribution` | 커밋 **734/881(83%)** — 내부 근거, 공개 금지 유지. 예약률 전후 수치는 없음(2026-09-02) — `기여`까지가 상한으로 고정 |
| G SAY 실시간 | **`4분 37초 상담 E2E에서 DELTA 586건·COMPLETE 25건, sequence 1–25 누락·중복 없음`** · `13개 focused regression scenario` · `주 병목이 모델 추론(P50 2.4초, 약 80%)임을 확인해 VAD 조정 대신 DELTA 조기 trigger에 집중` · `383개 domain keyword hint` | `say-realtime-ai` | 없음. 단 co-led 강도 유지 |
| H 데이터·품질 | **`측정 표본 n=19 → 4,039`** · **`유형 분기 판정 18건 전부 미발동 → planner로 재배치해 해결`** · `품질 기준값이 자사 출력을 되먹이던 순환을 재실측으로 발견` · `결정적 게이트 12종` · `13.1만 행·318만 관측` | `corpus-measurement`, `agent-pipeline-design`, `measurement-correction`, `quality-criteria-system` | 6축 점수 62→68→75 — forbidden(자가 채점). 승격 대상 아님 |
| I Agent prototype | `7개 편집·13개 운영 capability` · `planner는 계획만, registry가 확인한 capability만 실행` · `confirmation 전 무변경·확인 뒤 상태 전이·새로고침 뒤 복원 검증` | `conversational-editorial-agent-prototype` | test **679 passed** — evidence에 있음, allowed_copy 미반영. 승격 후보 (수치보다 검증 사실로) |
| J 제품 개발 체계·AX | `담당자가 바뀌어도 구두 인수인계 없이 이어지는 개발 체계` · `release note 생성 자동화·버전 변경 이력 추적` · `유사 기능·후속 변경의 lead time 단축에 기여` | `product-development-coordination-leverage`, `product-operations` | 없음 (수치 부재). 후킹은 "인수인계 0회" 같은 표현이 아니라 mechanism으로 |
| K Memento 결제 | `예약 실패 시 PaymentIntent 상태에 따라 cancel/refund하는 provider-side 보상` · `환불 완료 transition으로 마일리지 복원·이용권 삭제 이동` | `memento-stripe-prepayment` | Stripe package **6개 파일 594/594 lines 본인 작성** — 내부 근거. 공개는 `Stripe 선결제 영역 구축`까지 |
| L SellerCanvas | **`CES 2024 Best of Innovation AI 부문 수상 제품`** · **`특허 「페이지 출력 방법」 등록 10-2898273`** · `프로토타입에서 v1.0까지 0→1 구간을 PM으로 통과` · `외부 패션 브랜드 PoC` · `Vision AI 기반 의류 이미지 분석 모델 개발`(AI Engineer 구간) | `sellercanvas-product-system`, `sellercanvas-vision-model-development`, credentials | 상세페이지 제작 95% 단축·KCL 99% — recency 원칙으로 공개 금지 유지. "PM 재직 중 모델 개발"은 철회(2026-09-02) |
| M 합류 경로 | `Memento AI 개발 성과를 인정받아 MediSolve AI 초기 멤버로 영입` · `법인 설립 전 선행 개발 후 설립과 함께 정규 합류·Tech Lead 역할` | `memento-to-medisolve-early-member` | 프리랜서 기간 커밋 132건 — 내부 근거 |
| N 배포 환경 | `여러 사내 서비스의 Azure·Vercel 배포 환경 구성과 기본 운영` | `company-azure-ownership` | 6 root·400+ state object·VM 21·App Service 9 — 사용자 결정으로 공개 비선택. 인프라 JD에서만 재검토 |
| O 외부 UX | `Speak 개선안 발표로 IPS 12기 MVP 선정` · `순위·DAU 상승에 기여` | `product-ux-practice` | `9위→5위·DAU 200% 수준`은 allowed지만 confidence medium이라 이력서 비사용 결정 |
| P TellingMe | `10명 팀의 백엔드 2명 중 주도` · `iOS 앱 정식 출시` | `tellingme-backend-infra` | 38/42/22/89 규모 — 공개 금지 |
| Q Credentials | 특허 등록번호 · CES · KCL 통과 · ADsP | credentials | 특허 정확 등록일은 KIPRIS로 확인 가능. KCL 인증서 실물은 없음(2026-09-02) — 사실은 유지하되 `경`과 confidence medium 그대로 |

### claim 승격 기록 (2026-09-02 반영)

사용자 확인("SoT에는 사실을 모두 적재")에 따라 evidence 실측이 있는 3건은 allowed_copy에 추가했고, 근거 확인이 남은 3건은 `public: false` claim으로 등록했다.

| 대상 claim | 추가할 allowed_copy | 근거 |
| --- | --- | --- |
| `thready.qa-reopen-reduction` | **반영** `재발 발생 일평균 4.45건 → 0.26건`, `하루 4.5건에서 0.3건으로` | thready.md QA Reopen Signal, Jira 실측 2026-07-19 |
| `thready.ai-service-migration` | **반영** `FK orphan 0건·MD5 일치`, `health 성공·생성 실패 사례를 계기로 gate 수립` | thready.md AI Application Split Migration |
| `thready.conversational-editorial-agent-prototype` | **반영** `test 679 passed·Ruff 통과` | thready-quality-lab.md Verification |
| `career.sellercanvas-vision-model-development` | **public 등록** `Vision AI 기반 의류 이미지 분석 모델 개발` (AI Engineer 기간). "PM 재직 중 모델 개발"은 철회 | previous-career.md 2026-09-02 user-confirmed |
| `career.sellercanvas-nestjs-template` | **public:false, 승격 경로 없음** — 코드 미보존(2026-09-02). 면접 구두용 | 플랫폼 자기 기록 |
| `centurion.sso-auth-foundation` | **public:false 등록** — 범위는 Centurion SSO로 확정(2026-09-02). `workspace:SSO-BE-API` Git author 대조 후 `centurion.sso-session` 상향 | centurion.md SSO Auth Foundation |

## 7. 승격 대기 — 대화에서 확정됐지만 claim이 없는 것

아래는 사용자 확정 발언은 있으나 stable claim이 없어 **블록으로 쓰지 않는다.** evidence → claim 승격 뒤 블록을 추가한다.

| 후보 | 근거 | 필요한 것 |
| --- | --- | --- |
| Centurion SSO 인증·세션 로직 설계·구현 ("회사 인증 로직의 기반") | 2026-08-28 user-confirmed, 2026-09-02 SSO로 확정 · claim `centurion.sso-auth-foundation` public:false | `workspace:SSO-BE-API` Git author 대조 후 `centurion.sso-session` 강도 상향 |
| STUDIO LAB NestJS 개발 template 제작 (2023.08–12) | 플랫폼 자기 기록 · claim `career.sellercanvas-nestjs-template` public:false | **승격 경로 없음** (코드 미보존, 2026-09-02). 면접 구두용 |
| ~~PM 재직 중 Deep Scan 모델 직접 개발~~ | 2026-09-02 user-refuted. AI Engineer 기간의 일이며 `career.sellercanvas-vision-model-development`(public)로 등록 | 해소됨 |
| MEDINESS daily briefing | `public: false` | Git author 재검증 |
| 아이즈솔 Kidsly UX 흐름·요구사항·일정 관리 | 자기 기록 | 인턴 `contributed` 상한 claim |
| Thready 최신 30/90일 5xx·reopen 재측정 | todo A2 | 재측정 뒤 수치 정책 갱신 |

---

## 관련

- [Application Copy Standard](../../rules/application-copy-standard.md) — 고정·포장·게이트
- [Engineering Keywords](../../profile/engineering-keywords.md) — 기술 주장의 여섯 축 (성능·보장·신뢰·멱등·정합·설계)
- [Common Content Inventory](common-content-inventory.yaml) — 문서별 포함 깊이
- [Backend Case Achievement Inventory](backend-case-achievements.md) — 사례별 깊이 설명과 한계
- [Product Decision Achievement Inventory](product-decision-achievements.md) — 과거 회사 제품 판단
- [Initial Case Inventory](../../backlog/resume-assembly-kit/initial-case-inventory.md) — dossier·시각화 계약 초안
- [Claim Registry](../../evidence/claims/README.md)
