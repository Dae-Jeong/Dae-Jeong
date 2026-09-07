# AGENTS

이 repo는 김대정의 profile, evidence, resume, portfolio, homepage, agent workflow, writing, JD 분석을 위한 portable source-of-truth workspace다.

이 문서가 agent 규칙의 **단독 소유자**다. 도구별 진입 파일([CLAUDE.md](CLAUDE.md))은 이 문서를 가리키는 포인터일 뿐이며, Codex는 이 파일을 네이티브로 읽는다. 규칙 변경은 여기서만 한다.

## 시작할 때 읽는 문서

1. [wiki/context/manifest.yaml](wiki/context/manifest.yaml) - layer ownership과 작업별 read/write flow
2. [wiki/context/index.md](wiki/context/index.md) - 최소 context router
3. [wiki/context/current-state.md](wiki/context/current-state.md) - 현재 진행 상태
4. 작업 대상 hub의 `README.md`

이력서 작업은 [wiki/products/resume/README.md](wiki/products/resume/README.md), claim 검증은 [wiki/evidence/README.md](wiki/evidence/README.md)를 추가로 읽는다.

새 문서를 만들거나 역할을 바꾸기 전에는 [wiki/rules/document-routing.md](wiki/rules/document-routing.md)를 읽는다.

## Layer Ownership

| Layer | Owns | Does not own |
| --- | --- | --- |
| `wiki/context/` | routing, current snapshot | canonical profile facts |
| `wiki/profile/` | stable personal source of truth | raw Git evidence, output layout |
| `wiki/evidence/` | verified facts, claim strength, public scope | resume prose hierarchy |
| `wiki/products/` | output contracts, selection policy, artifact mapping | raw evidence, deployed expression |
| `wiki/rules/` | cross-product policy | task-specific progress |
| `app/` (fe→Vercel, be→Render) | marinkim.xyz 제품 코드와 현재 공개 표현 | canonical fact·evidence |
| `labs/{svc}/` → k8s | 실험 서비스 (자립 폴더) | 서비스 간 import |
| `infra/` | 배포 구성·manifest | 애플리케이션 코드, wiki 접근 |
| `skills/` | executable workflows and adapters | duplicated canonical policy |
| `archive/` | superseded history | active dependencies |

## 작성 원칙

- 한 사실에는 한 canonical owner만 둔다.
- 대화에서 새 기획·아이디어가 나오면 [wiki/backlog/](wiki/backlog/README.md)에 아이디어당 폴더로 등록한다 ([_template.md](wiki/backlog/_template.md) 준수). 착수 확정 시 spec/task로 승격한다.
- public claim은 evidence record와 stable claim ID를 먼저 만든다.
- `profile/`은 짧고 안정적으로 유지하고 긴 근거는 `evidence/`에 둔다.
- resume, portfolio, homepage의 **사실·claim**은 서로를 source로 사용하지 않고 `profile/`과 `evidence/`를 소비한다.
- 공개 사이트의 현재 문장·순서·강조는 `app/fe`가 표현 SoT로 소유한다. 플랫폼 프로필은 사용자가 동기화를 명시적으로 요청할 때만 현재 표현에서 파생한다.
- `Unknown`, `Unverified`, `Inference`, `Assumption`을 구분한다.
- 고객사/브랜드명, provider 실명, 팀원 실명, private path, credential, raw private conversation을 public output에 기록하지 않는다.
- 활성 문서에는 PC별 절대경로를 기록하지 않는다. 외부 source는 logical alias로 기록한다.
- archive 문서를 active source로 참조하지 않는다.

## Skills

tool-agnostic skill의 canonical 위치는 `skills/`다. tool-specific 폴더는 adapter만 둔다.

| Skill | 위치 | 용도 |
| --- | --- | --- |
| analyze-jd-fit | [skills/analyze-jd-fit/SKILL.md](skills/analyze-jd-fit/SKILL.md) | JD 링크·본문을 검증된 profile/evidence와 대조해 지원 판단·강점·공백 분석 |
| report-application-status | [skills/report-application-status/SKILL.md](skills/report-application-status/SKILL.md) | 지원 현황 조회·지원 전 공고의 마감 임박 표시. `현황 알려줘` 요청 시 사용 |
| run-application-team | [skills/run-application-team/SKILL.md](skills/run-application-team/SKILL.md) | 실무자 방식의 분석·작성·독립 검토 협업. 지원 준비를 팀으로 진행할 때 사용 |
| tailor-resume | [skills/tailor-resume/SKILL.md](skills/tailor-resume/SKILL.md) | 검증된 claim 기반 회사/JD 맞춤 이력서 생성 |
| review-application-copy | [skills/review-application-copy/SKILL.md](skills/review-application-copy/SKILL.md) | active 회사·공통 표면의 공개 문안을 규칙 대비 전수 검토 (파일 수정 없음) |
| sync-platform-profile | [skills/sync-platform-profile/SKILL.md](skills/sync-platform-profile/SKILL.md) | 채용 플랫폼 프로필을 canonical 문안(`wiki/products/platform-profiles`)에 맞춰 파생·검사·적용·reload 검증·registry 기록 |
| propagate-copy-decision | [skills/propagate-copy-decision/SKILL.md](skills/propagate-copy-decision/SKILL.md) | 사용자 결정 한 문장을 evidence → claim → 규칙 → 게이트 → 표면 순으로 전파하고 verify |

## 검증

```bash
make verify          # scope 자동: wiki 변경이면 validator, app/fe 변경이면 validator + tsc + active route 200
make verify-all
```

`tools/verify.py`는 실행 순서와 기록(`output/harness/runs/*.json`)만 맡는다. 검사 항목은 `tools/validate_workspace.py`와 `wiki/rules/copy-gates.yaml`이 소유한다. 문안 작업의 완료 정의는 **verify PASS + active route 200 + 보고(바뀐 곳·검증·남은 결정)** 세 가지다.

PDF나 HTML을 변경하면 renderer와 시각 검증까지 수행한다.

## 래칫

흐름 전체와 owner 표는 [wiki/rules/application-copy-harness.md](wiki/rules/application-copy-harness.md)에 있다.

실패나 사용자 피드백 1건은 개인 학습으로 끝내지 않고 통제로 적립한다. **같은 작업 안에서** 다음을 한다.

1. `wiki/rules/application-copy-standard.md` §1-6에 규칙 행(규칙 + 고친 예)을 추가하거나 모순되는 기존 행을 고친다.
2. 기계로 잡히면 `wiki/rules/copy-gates.yaml`(문자열) 또는 validator 함수 + §4 게이트 행(구조)을 짝으로 추가한다. 잡을 수 없으면 §4에 "사람 검사"로 둔다.
3. 게이트 하나는 규칙 행 하나와 짝이다. 행이 지워지면 게이트도 지운다.

같은 게이트가 수정 2회로 안 닫히면 규칙이 모호하거나 사실이 부족한 것이다. "무엇을 / 선택지 / 권장" 세 줄로 사용자에게 올린다. registry `artifact_state: frozen` 패키지는 어떤 규칙 변경도 소급하지 않는다.

## Project Tooling

- Python runtime과 dependency는 `uv`가 관리한다.
- `pyproject.toml`, `.python-version`, `uv.lock`의 dependency/runtime 항목을 직접 편집하지 않는다.
- 초기화는 `uv init`, Python pin은 `uv python pin`, dependency 변경은 `uv add`/`uv remove`, 동기화는 `uv sync`를 사용한다.
