---
type: project-evidence
title: Thready Quality Lab Evidence
description: AI 글 생성 품질 하네스와 대화형 편집 에이전트를 검증한 독립 prototype evidence.
timestamp: 2026-08-27
source_roots: [workspace]
tags: [thready, ai-quality, agentic-application, measurement, evidence]
---

# Thready Quality Lab Evidence

Source locator: `workspace:thready-lab` (브랜치 `lab/prompt-node-experiments`)

기존 [thready.md](thready.md) 「Generation Quality System」이 "typed prompt builder, LLM judge, 평가 루프, 관측 로깅"으로 요약한 영역의 **후속 심화 근거**다. 제품 코드와 분리된 실험 워크트리에서 진행됐다.

## Measurement Architecture

- Code-backed: "잘 만든 글"을 한 덩어리로 묻지 않고 성격이 다른 세 층으로 분리했다. 층마다 판정 주체가 다르고, 아래층을 통과하지 못하면 위층을 묻지 않는다.

| 층 | 질문 | 판정 주체 |
| --- | --- | --- |
| 3층 천장 | 이 글이 통하는가 | 사람 |
| 2층 분포 | 플랫폼다운가 | 코드 (실측 분포 대조) |
| 1층 바닥 | 틀리지 않았는가 | 코드 (자동 게이트) |

- Code-backed: 1층은 결정적 게이트 **12종**이며 하나라도 걸리면 재생성 대상이다 — 접힘 방지(40자 초과 줄), 첫 줄 결론, 문서체 종결 차단, 계정 어체 일치, 기관 언어 차단, 이월 표지 정합, 수치 날조 차단(±2% 허용), 수치 보존율 하한, 판정 조합 유효성 등.
- 설계 원칙(문서 명시): **"프롬프트와 게이트는 바닥만 높인다. 천장은 체크리스트가 못 만든다"** — 자동화가 닿는 층과 닿지 않는 층을 갈라 설계하고, 3층은 자동화하지 않고 판정 질문만 고정했다.
- Contribution boundary: 판정 체계 설계·구현은 `owned`. 3층 판정에는 사람 합의가 개입한다.

## Scoring Discipline

- Code-backed: 품질을 6축(컨셉 단일성·수요·한 사람·독자 이득·목적 정합·wow)으로 계량하고 점수 이력을 파일로 관리한다. **62 → 68 → 75** (2026-08-01 ~ 08-02).
- 규율(문서 명시): **"매 실험은 어느 축을 올리려는 것인지를 먼저 말하고 시작한다. 축이 없는 실험은 하지 않는다."**
- 채점 원칙: 점수만 던지지 않고 축마다 "왜 이 점수인가(게이트 수치·원문 사례·실측 대조) → 뭘 고치면 오르나 → 그 근거"를 붙인다. 기준이 바뀌면 "기준 변경"을 명시하고 이전 점수와 직접 비교하지 않는다.
- **"100은 도달점이 아니라 지평선이다"** — 점수를 절대값이 아니라 현 기준의 스냅샷으로 정의했다.
- 자가 채점과 합의 채점을 구분해 표기한다 (사람 합의 전까지 `자가 채점` 유지).

## Self Feedback Error

**이 프로젝트에서 가장 강한 판단 사례다.**

- Code-backed: formatter 프롬프트가 "실측 16자"를 기준으로 줄 길이를 규정하고 있었다. 재실측 결과 그 16자는 **실측 코퍼스가 아니라 자사 출력의 body 값**이었고, 같은 설계 문서의 다른 절은 실측을 23자로 적고 있었다. 재측정값도 23.5자였다.
- 즉 **자신의 과교정 결과를 목표로 되먹임**하는 순환이 형성돼 있었다. 이를 발견하고 기준을 재수립했다(23자 기준 formatter 분리).
- 같은 맥락에서 문제 축 자체가 틀렸음을 인정하고 재정의했다: "글을 짧게 만드는 문제" → **"정보당 줄 수를 줄이는 문제"**. 같은 121자에 자사 출력은 정보 1~2개, 실측은 4~7개를 담고 있었다.
- 근본 원인 규명: planner가 만든 요약을 writer가 배경·설명·마무리를 붙여 다시 칼럼으로 복원하고 있었다. 처방은 **"재료가 그대로 글이다"** — 규칙 추가가 아니라 역할 재정의였다.

## Measurement Scale

- Tool-backed 측정 계보: **n=19 → n=5 → n=15 → n=4,039**. 최종 대량 코퍼스는 릴레이 방식 16웨이브로 키워드 150개(정보·일상·경험·학습 4층)를 소진해 수집했고, 분석 모수는 상위 반응 839건·초상위 139건이다. 분포 스냅샷을 파일로 고정했다.
- 매 측정마다 한계를 함께 기록했다: 표본 수, 검색 노출 편향("이미 도달한 글만 표본에 든다"), 주제 편향, 수집 방식의 하향 편향. **"통계가 아니라 경향이다"**를 명시.
- **"검색어가 표본을 결정한다"**를 발견해 이전 결론을 수정했다 — 일상 키워드 표본에서 0/19였던 유형이 정보성 키워드에서는 3/9로 나타났다. 소표본 결론 중 유지된 것과 기각된 것을 구분해 기록했다.
- 대량 코퍼스로 소표본 결론 다수가 유지됐고(줄당 중앙값, 차단선, 유형 비율), 일부는 기각·강등됐다.

## Falsification Log

- Code-backed: **「반증된 것 — 다시 시도하지 말 것」** 섹션을 별도 유지한다. 실패한 접근과 그 이유를 지우지 않고 남긴다.
- 문서 명시: **"기록을 지우지 않고 남긴다 — 어디서 어떻게 틀렸는지가 다음 실험의 재료다."**
- 자기 규칙도 반증되면 스스로 제거한다 — 근거 없이 넣었던 진술을 재실측 후 삭제한 기록이 있다.
- 대표 반증: 글자 수 상한 지시는 형태를 바꿔도(목표/상한/자유/예시/예외 규정) 일관되게 과교정을 유발했고, 최종적으로 "상한은 쪼개기로 귀결된다"로 확정해 **분포·총량 비례 방식으로 전환**했다.
- 실패 이력이 하지 않을 것 목록으로 승격돼 이후 실험 범위를 좁힌다.

## Role Decomposition

- Code-backed: 분기 판정을 writer에 두었을 때 18건 전부 발동하지 않았다. writer는 추려진 재료만 받아 **원본이 어떤 유형인지 알 수 없는 자리**였기 때문이다. 판정을 planner로 옮기자 유형별로 정확히 갈렸다.
- 일반화: 프롬프트 문구를 고치는 대신 **판단에 필요한 정보를 가진 자리로 책임을 이동**시켜 해결한 사례다.
- 파이프라인 역할 분리: planner(재료 추림) / writer(글) / formatter(형태)로 나누고, 각 단계가 받는 컨텍스트를 최소화했다(형태 규칙은 전체의 7%만 전달).

## Public Wording

- 공개 가능: 3층 판정 체계, 게이트 자동화 12종, 6축 계량과 점수 이력, 자기 되먹임 오류 발견·교정, 측정 표본 확대(n=19 → 4,039), 반증 로그 운영, 역할 재배치 사례.
- **공개 금지**: 제3자 플랫폼 계정명과 개별 게시물 지표(무관한 개인 정보), 내부 소재·화자 명칭, 회사 내부 운영 수치, 프롬프트 원문.
- 표현 가드레일: 수집 규모(n=4,039)는 "직접 수집한 실측 코퍼스" 범위로만 말하고, 플랫폼 전체를 대표하는 통계로 표현하지 않는다 — 원 기록이 "통계가 아니라 경향"으로 한정했다.
- 강도: 실험 하네스 설계·측정 체계·반증 관리는 `owned`. 3층 천장 판정은 사람 합의를 포함한다.

## Claim Candidates

이 문서를 근거로 [claims/thready.yaml](../claims/thready.yaml)에 추가할 후보 — 승격 전 문안 확정 필요.

| 후보 ID | statement 초안 | strength |
| --- | --- | --- |
| `thready.quality-criteria-system` | AI 글 생성 품질을 3층(자동 게이트·분포 대조·사람 판정) 체계와 6축 점수로 계량화하고, 자동화가 닿는 층과 닿지 않는 층을 갈라 설계 | owned |
| `thready.measurement-correction` | 프롬프트 기준값이 자사 출력을 근거로 되먹임하던 순환을 재실측으로 발견하고, 문제 축을 재정의해 기준을 재수립 | owned |
| `thready.falsification-log` | 반증된 접근을 삭제하지 않고 "다시 시도하지 말 것" 로그로 관리해 실험 범위를 좁히는 방식 확립 | owned |
| `thready.corpus-measurement` | 자체 수집 실측 코퍼스를 n=19에서 n=4,039로 확대하고, 표본 편향을 명시해 소표본 결론을 유지/기각으로 재판정 | owned |

## Agent Structure Design

2026-08-11에 추가한 user-confirmed 구조 근거다.

- User-confirmed (2026-08-11): **하네스 구축과 agent 구조 설계·구현은 병행된 한 작업이다** — 평가 하네스를 만들면서 그 하네스로 검증할 planner-writer 파이프라인 구조 자체를 설계하고, 이해하면서 구현했다. **대표 영역은 writer**다. 원문: "harness를 구축함과 동시에 실제 agent 구조를 설계하고 이해하면서 구현하는 작업도 하는거지, 그게 대표적으로 writer 영역이고".
- 표현 허용: "agent 구조(planner-writer 파이프라인) 설계·구현" — 종전 "운영·확인" 수준에서 상향. 분기 판정 재배치 사례(writer 18건 미발동 → planner 이동)는 이 설계 과정의 실측 학습으로 서술한다.

## Conversational Editorial Agent Prototype

2026-08-26~27에 `workspace:thready-lab`의 독립 `prototype/thready_ai`에서 진행한 대화형 Threads 편집 에이전트 근거다. 아래 범위는 prototype으로 검증됐으며, 운영 Thready surface에 연결된 기능이나 production agent로 확대하지 않는다.

### Architecture And Execution Boundary

- Code-backed: 현재 구조는 multi-agent가 아니라 하나의 `ThreadyConversationAgent`가 요청을 분류하고 capability를 선택해 실행하는 **single-agent planner-executor**다.
- Code-backed: planner는 typed plan만 만들고 실행 권한을 갖지 않는다. `ToolCapability` registry가 action 등록 여부와 일치를 확인한 뒤 domain tool을 dispatch한다.
- Code-backed: 편집 action은 `find_materials`, `develop_ideas`, `plan_post`, `write_post`, `review_post`, `revise_post`, `threads_coach` 7개다. 글 생성·수정은 별도 Writer를 새로 만들지 않고 기존 `SimpleThreadsWriter` 품질 경계를 재사용한다.
- Code-backed: 명확한 읽기 요청·typed command·좁은 social turn은 deterministic fast lane에서 처리하고, 쓰기 action이 확정된 뒤에만 writing insight를 지연 로드한다. 모호한 mutation 요청은 planner fallback으로 실행하지 않는다.

### Conversation, Context, And Artifact State

- Code-backed: conversation, message, turn, tool result, versioned artifact를 분리한 SQLite 원장을 구성했다. 방당 active turn은 하나이며, 실행 중 들어온 발화는 queue에 남겨 앞 turn 종료 뒤 다음 turn으로 승격한다.
- Code-backed: 글 생성과 수정은 parent chain을 가진 artifact version으로 남고, 브라우저 새로고침 뒤에도 message·turn·최신 artifact가 복원된다.
- Code-backed: turn 실행 관측은 message와 분리된 append-only activity event로 기록한다. API는 `after_seq` 이후 event만 증분 반환하고 prompt·tool argument·provider response·내부 오류는 public projection에서 제거한다.
- Code-backed: 최근 message 개수 절단 대신 token-aware context selection과 append-only compaction snapshot을 도입했다. 완료 action·선택 소재·artifact reference·미해결 요청은 typed memory로 보존하고 원문 message와 artifact는 source of truth로 유지한다.

### Product Operation Safety Boundary

- Code-backed: 계정·글 조회, 임시저장, 예약·발행·삭제, 성과 조회는 `ThreadyOperationsGateway` 뒤에 두었다. 현재 기본 구현은 외부 side effect가 없는 Mock adapter다.
- Code-backed: 예약·발행·삭제 같은 mutation은 첫 turn에 `confirmation_required`를 만들고, 다음 turn의 typed confirmation이 profile·conversation·confirmation ID를 통과할 때만 Mock 상태를 전이한다. receipt 기반 idempotency로 같은 confirmation 재실행을 막는다.
- Code-backed: profile ownership, 대화에서 제안된 material ID allowlist, source post 사용 권한을 실행 전에 함께 검증한다.
- Scope boundary: 실제 Threads adapter, 운영용 durable worker, process restart recovery, fresh web material capability의 완료는 아직 공개 claim 범위가 아니다. fresh material task는 2026-08-27 현재 `in_progress`다.

### Verification

- Tool-backed: 초기 대화·queue·artifact 계약 12개 target test, 편집 action 확장 16개 test, activity 29개 test, insight/capability 39개 test, Mock operation 88개 test가 각 task 종료 시점에 통과했다.
- Tool-backed: intent fast lane 종료 시 전체 prototype test `679 passed`, targeted Ruff `All checks passed`로 기록됐다.
- Browser/Network/DB-backed: POST turn `202`, incremental activity polling, queue 승격, compaction 복원, typed operation, confirmation 전 무변경·확인 뒤 Mock mutation, 새로고침 뒤 activity·artifact 복원을 각각 확인했다.
- Known debt: 운영 승격 전에는 process-local `BackgroundTasks`를 lease·heartbeat·retry·crash recovery가 있는 durable execution으로 바꿔야 한다. tool message→artifact→turn 완료 전체도 아직 하나의 transaction이 아니다.

### Public Wording

- 공개 가능: `대화형 AI 편집 prototype`, `single-agent planner-executor`, `typed capability registry`, `대화·turn·tool result·versioned artifact 원장`, `append-only activity`, `token-aware compaction`, `typed confirmation·idempotency가 있는 Mock operation gate`.
- 공개 금지: `production agent`, `운영 Thready에 배포`, `multi-agent orchestration`, `실제 Threads 예약·발행·삭제`, `durable worker`, `재시작 복구 완료`, 진행 중인 fresh material capability의 완료 표현.
- 강도: prototype architecture·ledger·activity·context·Mock operation gate의 설계·구현·검증은 `owned`. 운영 제품 승격과 실제 side effect는 미구현 범위다.
