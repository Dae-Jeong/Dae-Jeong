# AGENTS

이 repo는 김대정의 profile, evidence, resume, portfolio, homepage, agent workflow, writing, JD 분석을 위한 portable source-of-truth workspace다.

## 시작할 때 읽는 문서

1. [context/manifest.yaml](context/manifest.yaml) - layer ownership과 작업별 read/write flow
2. [context/index.md](context/index.md) - 최소 context router
3. [context/current-state.md](context/current-state.md) - 현재 진행 상태
4. 작업 대상 hub의 `README.md`

이력서 작업은 [products/resume/README.md](products/resume/README.md), claim 검증은 [evidence/README.md](evidence/README.md)를 추가로 읽는다.

새 문서를 만들거나 역할을 바꾸기 전에는 [rules/document-routing.md](rules/document-routing.md)를 읽는다.

## Layer Ownership

| Layer | Owns | Does not own |
| --- | --- | --- |
| `context/` | routing, current snapshot | canonical profile facts |
| `profile/` | stable personal source of truth | raw Git evidence, output layout |
| `evidence/` | verified facts, claim strength, public scope | resume prose hierarchy |
| `products/` | output contracts and artifacts | raw evidence |
| `rules/` | cross-product policy | task-specific progress |
| `skills/` | executable workflows and adapters | duplicated canonical policy |
| `archive/` | superseded history | active dependencies |

## 작성 원칙

- 한 사실에는 한 canonical owner만 둔다.
- 대화에서 새 기획·아이디어가 나오면 [backlog/](backlog/README.md)에 아이디어당 폴더로 등록한다 ([_template.md](backlog/_template.md) 준수). 착수 확정 시 spec/task로 승격한다.
- public claim은 evidence record와 stable claim ID를 먼저 만든다.
- `profile/`은 짧고 안정적으로 유지하고 긴 근거는 `evidence/`에 둔다.
- resume, portfolio, homepage는 서로를 source로 사용하지 않고 `profile/`과 `evidence/`를 소비한다.
- `Unknown`, `Unverified`, `Inference`, `Assumption`을 구분한다.
- 고객사/브랜드명, provider 실명, 팀원 실명, private path, credential, raw private conversation을 public output에 기록하지 않는다.
- 활성 문서에는 PC별 절대경로를 기록하지 않는다. 외부 source는 logical alias로 기록한다.
- archive 문서를 active source로 참조하지 않는다.

## Skills

tool-agnostic skill의 canonical 위치는 `skills/`다. tool-specific 폴더는 adapter만 둔다.

| Skill | 위치 | 용도 |
| --- | --- | --- |
| tailor-resume | [skills/tailor-resume/SKILL.md](skills/tailor-resume/SKILL.md) | 검증된 claim 기반 회사/JD 맞춤 이력서 생성 |

## 검증

```bash
uv run python scripts/validate_workspace.py
```

PDF나 HTML을 변경하면 renderer와 시각 검증까지 수행한다.

## Project Tooling

- Python runtime과 dependency는 `uv`가 관리한다.
- `pyproject.toml`, `.python-version`, `uv.lock`의 dependency/runtime 항목을 직접 편집하지 않는다.
- 초기화는 `uv init`, Python pin은 `uv python pin`, dependency 변경은 `uv add`/`uv remove`, 동기화는 `uv sync`를 사용한다.
