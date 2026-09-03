---
type: design
title: Application Copy Harness v1 — 설계
description: 회사 지원 패키지 문안을 매번 같은 품질로 끝내기 위한 운영 하네스. 2026-09-03 실제 작업 루프를 6계층에 대응시켜 부족한 층만 보강한다.
timestamp: 2026-09-03
tags: [harness, agent-workflow, application-copy, design]
---

# Application Copy Harness v1 — 설계

## 0. 한 줄

이 repo는 이미 **knowledge harness**(profile → evidence → claim → products)다. 부족한 것은 지식이 아니라 **문안 작업을 끝내는 운영 루프**다. 오늘(2026-09-03) 손으로 돌린 세 루프를 규격·센서·기록으로 굳혀, 다음 회사부터는 "결정 목록 + verify PASS"만으로 승인 가능한 상태를 만든다.

범위는 **문안 작업**(JD → 문안 → 검토 → 수정 → 검증 → 체크포인트)이다. OMO 같은 범용 orchestration 설치, 무인 장시간 실행은 범위 밖이고 §6에 도입 조건만 둔다.

## 1. 오늘 손으로 돌린 루프 (실측)

하네스는 상상이 아니라 방금 한 일에서 뽑는다. 세 루프와 그 안에서 **사람이 판단한 것 / agent가 증거로 닫은 것**을 나눈다.

### 1-1. 결정 전파 루프 (3회: QA 팀원 서포트, Centurion 내부화, 약 94%)

```text
사용자 결정 한 문장
  → evidence 줄 추가 (User-confirmed, 날짜)
  → claim statement · allowed_copy · forbidden_copy 수정
  → 규칙 문서(§1-6 · public-safety) 갱신
  → 표면 전파: resumes/{co}.ts · documents/{co}.ts · portfolios/{co}.ts · documents/common.ts · lib/cases.ts · app/resume/resume-view.tsx
  → validate_workspace.py · tsc
  → 화면 확인 (route 200 · 스크린샷)
  → 보고: 바뀐 곳 목록 + 남은 결정
```

- 사람: 결정 자체 (내부 제품명인가, 감소율로 쓸 것인가, 서포트를 어떻게 표기할 것인가).
- agent: SoT 순서, 표면 전수, 검증, 보고.
- **실패**: 공통 문서(`common.ts`, `resume-view.tsx`)가 v2 전파에서 빠져 있었다 → "표면 인벤토리"가 문서가 아니라 사람 기억에 있었기 때문.

### 1-2. 전수 검토 루프 (1회, 6개 파일 + 공통 3개)

```text
기계적 sweep (grep: 코드네임 · 모델명 · 금지 표현 · 프레임워크명 · 축 단어)
  → 문서 세트별 정독 (fork 2개 병렬, 12개 lens)
  → 목록: 반드시 수정 / 검토 권장 / 결정 필요
  → 사용자 결정 2건
  → 수정 (파일 분할 fork 3개 병렬, 같은 파일은 한 agent만)
  → 재검증 (validator · tsc · grep 전수 · route 200)
```

- 사람: "결정 필요" 2건 (Centurion, 공통 동기화 여부), 검토 권장 항목의 채택.
- agent: sweep, lens 정독, 수정, 재검증.
- **실패 3건**: (a) 역할 표기 통일이 게이트 1(헤더 = 공고 직무명)을 깨뜨림 — 게이트가 사람 눈에만 있었음. (b) JYP 포폴 소개가 3문장이 됨 — hero 2문장 규칙이 센서에 없음. (c) 규칙 문서 자체가 오늘 결정과 모순(§1-4 "STG 수치 쓴다", "결제하는까지", 게이트 6 "도구명 명시") — 규칙 갱신이 결정과 같은 작업에서 안 됨.

### 1-3. 래칫 (4회)

| 실패·피드백 | 승격된 통제 |
| --- | --- |
| 기술 어필 축이 문장에 안 보임 | §1-5 여섯 축 + 게이트 11 (아직 사람 검사) |
| 공통 문서에 BAY·SAY·NEXUS, "돈을 내는" 잔존 | public-safety 내부 제품명 표 + 게이트 12 (validator 자동) |
| 제출·탈락 패키지가 소급 수정될 위험 | registry `frozen` + §1-6 "스냅샷" 행 (validator는 아직 파일 불변을 검사하지 않음) |
| 사진·헤더가 회사별로 달라짐 | uiRevision 분기 삭제 + §1-6 헤더 단일 행 (센서 없음) |

래칫이 절반만 됐다: 규칙(guide)은 올라갔지만 센서가 없는 항목이 셋이다.

## 2. 6계층 대응과 갭

| 계층 | 지금 있는 것 | 갭 | v1 보강 |
| --- | --- | --- | --- |
| **Guides** | AGENTS.md, application-copy-standard §1~§4(게이트 12개), public-safety, tailor-resume skill | 검토 lens 12개와 전파 절차가 이 대화에만 있음. 표면 인벤토리 없음 | skill 2개(`review-application-copy`, `propagate-copy-decision`), `copy-surfaces.yaml`, AGENTS.md 래칫 절 |
| **Sensors** | validate_workspace.py(claims·registry·projection·게이트 12), tsc, visual_check | 게이트 1·11·헤더·2문장·frozen 불변이 사람 검사. 실행이 분산(validator / tsc / curl / 스크린샷 따로) | `tools/verify.py` 단일 진입 + 게이트 11·13·14·15·16 자동화 |
| **Agentic loop** | 사실상 이 대화의 관행 | 재시도 상한·병렬 규칙·완료 정의가 문서에 없음 | §4-3 "문안 변경 루프" 규격 |
| **Memory** | wiki SoT, registry, todo, `/_map`, §1-6 결정표 | 결정 → 규칙 갱신이 같은 작업에서 보장되지 않음 | 결정표를 래칫 로그로 명시, propagate skill에 규칙 갱신 단계 고정 |
| **Permissions** | 커밋은 요청 시, public-safety, frozen 규칙, 비밀 미사용 | frozen이 규칙일 뿐 강제가 아님 | 게이트 13(frozen 파일 불변)으로 런타임 강제 |
| **Observability** | validator 한 줄 PASS/FAIL, 보고 관행 | 무엇이 몇 번 걸렸는지 누적 기록 없음 | `output/harness/runs/*.json` + 반복 FAIL tripwire |

## 3. 구성요소

### 3-1. 표면 인벤토리 `wiki/products/site/copy-surfaces.yaml` (Guides · Memory)

공개 문안이 사는 파일을 기계가 읽게 한다. skill과 verify가 같은 파일을 읽는다.

```yaml
surfaces:
  - id: resume.tailored      # /resume/{co}
    path: app/fe/content/resumes/{company}.ts
    per_company: true
    sync_group: resume
  - id: career.tailored      # /career/{co}
    path: app/fe/content/documents/{company}.ts
    per_company: true
  - id: portfolio.tailored   # /portfolio/{co}
    path: app/fe/content/portfolios/{company}.ts
    per_company: true
  - id: career.common        # /career/common · /cv/common
    path: app/fe/content/documents/common.ts
  - id: resume.common        # /resume (JSX, KO+EN)
    path: app/fe/app/resume/resume-view.tsx
  - id: cases                # /portfolio/{case} 대표 사례
    path: app/fe/lib/cases.ts
rules:
  - "회사별 문안 규칙이 바뀌면 common·cases 표면도 같은 작업에서 맞춘다 (§1-6)"
  - "registry status가 pre-apply·in-progress·approved 이고 frozen이 아닌 회사만 active"
```

### 3-2. 단일 검증 진입 `tools/verify.py` (Sensors · Observability)

**전제: 기준은 바뀐다.** 오늘 하루에 규칙 문서를 세 번, 게이트 12 목록을 두 번 고쳤다. 그래서 verify는 정답을 박는 곳이 아니라 **바뀌는 기준을 싸게 바꾸게 하는 얇은 실행기**다.

- 게이트는 코드가 아니라 데이터다 — 금지어·표면 인벤토리·공유 사실·축 단어는 YAML에 두고, 코드는 "YAML을 읽어 검사한다"까지만 한다.
- 게이트 하나 = §1-6 규칙 행 하나. 근거 행이 지워지면 게이트도 지운다. 규칙 행만 있고 게이트가 없는 것은 허용한다(사람 검사).
- 오늘 실제로 걸린 것만 게이트로 만든다. 예상해서 만들지 않는다.
- verify 자체는 scope에 따른 실행 순서와 기록만 책임진다. 검사 항목이 바뀌어도 verify는 안 바뀐다.

```bash
uv run --project tools python tools/verify.py            # scope 자동 (git diff 기준)
uv run --project tools python tools/verify.py --scope all
uv run --project tools python tools/verify.py --scope copy --render
```

| scope | 실행 |
| --- | --- |
| wiki | validate_workspace.py |
| copy | validate_workspace.py + tsc + 게이트 11·13·14·15·16 + active route 200 |
| render | + 스크린샷(데스크톱 1180px) → `output/harness/shots/` |
| all | 전부 |

결과는 한 줄 요약과 `output/harness/runs/{ts}.json`(scope, 변경 파일 수, 게이트별 PASS/FAIL·건수, 소요). raw 대화·비밀·토큰 수는 기록하지 않는다.

**새 게이트** (validate_workspace.py 확장, 모두 active 표면만 검사):

| # | 게이트 | 검사 | 오늘의 근거 |
| --- | --- | --- | --- |
| 11 | 여섯 축 단어 | 이력서 `outcomes[].title` 4개에서 성능·보장·신뢰·멱등·정합·설계 ≥ 4개 | §1-5, 아직 사람 검사 |
| 13 | frozen 불변 | registry `artifact_state: frozen` 회사의 표면 파일이 HEAD 대비 변경되면 FAIL (`--allow-frozen` 로 명시 해제) | 왓섭·탈락 7곳 스냅샷 |
| 14 | 헤더 직함 | registry attempt에 `header_role`(공고 직무명의 헤더용 값)을 두고, 이력서 `header.role`이 그 문자열로 시작하는지 검사. registry가 헤더 직함의 owner | 게이트 1을 오늘 깨뜨림 |
| 15 | 공유 사실 문자열 | `shared-facts.yaml`의 문자열(예: 재오픈 `37% → 11%`, `약 94% 감소`)이 active 표면에서 같은 형태 | "3분의 1" 잔존 |
| 16 | hero 2문장 | 포폴 `introduction`·이력서 `summary[0]` 문장 수 ≤ 2 | JYP 소개 3문장 |

### 3-3. Skill `review-application-copy` (Guides)

입력: 회사 slug 목록(기본: registry active). 출력: 심각도별 목록 + 결정 필요 항목. **파일을 고치지 않는다.**

1. `verify.py --scope copy` 먼저 (기계 sweep은 사람이 읽기 전에 끝낸다).
2. lens 12개로 정독. lens는 §1-6 표와 게이트 표를 그대로 쓴다 — skill 안에 복제하지 않고 링크한다.
3. 회사 세트별로 agent를 나눈다(같은 파일은 한 agent). 공통 표면은 별도 agent.
4. 보고 형식 고정: `file:line — 인용 — 문제 — 제안` / 반드시 수정 · 검토 권장 · 결정 필요 · 통과 항목.

### 3-4. Skill `propagate-copy-decision` (Guides · Memory)

입력: 결정 한 문장 (예: "Centurion은 내부 제품명"). 순서 고정:

1. evidence에 `User-confirmed (날짜)` 줄
2. claim `statement · allowed_copy · forbidden_copy`
3. 규칙 문서 — §1-6에 행 추가(고친 예 포함), 모순되는 기존 행 수정
4. 가능하면 게이트 — 문자열로 잡히면 게이트 12 목록, 구조면 새 게이트 제안
5. `copy-surfaces.yaml`의 active 표면 전파 (파일 분할 병렬 허용)
6. `verify.py --scope copy`
7. 보고: 바뀐 곳, 규칙·게이트 변경, 남은 결정

3·4가 빠지면 완료가 아니다. 이것이 래칫 계약이다.

### 3-5. 문안 변경 루프 규격 (Agentic loop)

- **완료 정의**: verify PASS + active route 200 + 보고(바뀐 곳·검증·남은 결정) 세 가지가 다 있어야 끝.
- **병렬 규칙**: 파일 단위로 분할한다. 같은 파일을 두 agent가 만지지 않는다. 공통 표면·wiki는 조율 agent가 맡는다.
- **재시도 상한**: 같은 게이트 FAIL 수정 시도 2회. 넘으면 "결정 필요"로 사용자에게 올린다 — 규칙이 모호하거나 사실이 부족하다는 신호다.
- **에스컬레이션 형식**: 결정 필요 항목은 "무엇을 / 선택지 / 권장" 세 줄.
- **금지**: 문안을 고치면서 사실을 새로 만들지 않는다(allowed_copy 밖 수치 → 삭제가 기본). 규칙 갱신 없이 문안만 고치지 않는다.

### 3-6. 권한 (Permissions)

| 행위 | 정책 | 강제 주체 |
| --- | --- | --- |
| 커밋·push | 사용자 요청 시만 | 관행 → AGENTS.md 명시 |
| frozen 패키지 파일 | 읽기 전용 | 게이트 13 |
| `visibility` 변경 | 사용자 결정 | 규칙 §1-6 |
| PDF 재생성 | 요청 시 | 관행 |
| 회사 코드·비밀 | repo에 넣지 않음, 채팅의 비밀번호는 사용하지 않음 | AGENTS.md |
| 예전 wiki archive | active source 아님 | retrieval 경계 (Codex 메모, P1) |

### 3-7. 관측과 tripwire (Observability)

- 실행 기록: `output/harness/runs/{ts}.json`. 필드: `scope, changed_files, gates:{id:{status,count}}, routes:{path:code}, duration_s`.
- tripwire: 같은 게이트가 최근 3회 연속 FAIL이면 verify가 `wiki/context/todo.md`에 "래칫 후보" 줄을 제안 출력한다(자동 쓰기는 하지 않는다).
- 보고 형식은 §3-5 완료 정의와 같다. 토큰·시간은 기록하지 않는다 — 진단은 "어느 게이트에서 어떻게"다.

## 4. 단계

| 단계 | 내용 | 크기 |
| --- | --- | --- |
| **P0** | `copy-surfaces.yaml`, `verify.py`(scope wiki·copy), 게이트 11·13·14·16, skill 2개, AGENTS.md 래칫 절, §1-6 링크 | 반나절 |
| **P1** | 게이트 15 + `shared-facts.yaml`, render scope(스크린샷), run log + tripwire, archive retrieval 경계 | 반나절 |
| **P2** | 새 JD 1건을 이 하네스로 처음부터 끝까지 돌려 보고 tailor-resume skill의 6~9단계를 verify·skill 호출로 교체 | 실전 1회 |

## 5. 성공 기준

- 다음 회사 패키지가 "결정 목록 + verify PASS" 보고만으로 승인된다.
- 전수 검토가 skill 호출 1회로 끝나고, 오늘 잡힌 유형(코드네임·금지 표현·헤더·2문장·frozen)은 사람이 읽기 전에 센서에서 걸린다.
- 결정이 있을 때마다 §1-6에 행이 늘고, 그 행의 절반 이상이 게이트를 갖는다.

## 6. OMO·Workflow 도입 조건

지금은 붙이지 않는다. 다음 중 둘 이상이 실제로 생기면 재검토한다: (a) 한 번에 5개 이상 회사 패키지를 병렬로 만든다, (b) 사람이 없는 시간에 실행해야 한다, (c) 세션 복구가 반복 문제가 된다. 그 전까지는 이 repo의 skill + verify + registry가 하네스다. Codex 진단(2026-09-03)과 같은 결론이다.

## 7. 결정 (2026-09-03 확정)

1. `make verify` 채택 (Makefile → `uv run --project tools python tools/verify.py`).
2. 게이트 13(frozen 불변)은 FAIL.
3. 게이트 14는 registry `header_role` 방식.
4. P0 착수 — 같은 날 구현.

### 원래 질문

1. verify 진입을 `uv run --project tools python tools/verify.py`로 둘지, Makefile `make verify`를 얹을지.
2. 게이트 13(frozen 불변)을 FAIL로 둘지 WARN으로 둘지 — FAIL 권장.
3. 게이트 14(헤더 직함)를 registry `role`에 묶을지 — 묶으면 registry가 헤더의 owner가 된다.
4. P0 착수 여부.

## 연결

- [backlog 항목](README.md) · [Application Copy Standard](../../rules/application-copy-standard.md) · [Public Safety](../../rules/public-safety.md)
- [Workspace validator](../../../tools/validate_workspace.py) · [tailor-resume skill](../../../skills/tailor-resume/SKILL.md)
- 외부 참고: Harness Engineering 6계층(AX LABS 리뷰, OpenAI·Martin Fowler 실무 글) — Codex 대화 2026-09-03. "구글 논문"이 아니라 독립 기술 노트다.
