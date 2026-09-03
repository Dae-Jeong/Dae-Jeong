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
| tailor-resume | [skills/tailor-resume/SKILL.md](skills/tailor-resume/SKILL.md) | 검증된 claim 기반 회사/JD 맞춤 이력서 생성 |

## 검증

```bash
uv run --project tools python tools/validate_workspace.py
```

PDF나 HTML을 변경하면 renderer와 시각 검증까지 수행한다.

## Project Tooling

- Python runtime과 dependency는 `uv`가 관리한다.
- `pyproject.toml`, `.python-version`, `uv.lock`의 dependency/runtime 항목을 직접 편집하지 않는다.
- 초기화는 `uv init`, Python pin은 `uv python pin`, dependency 변경은 `uv add`/`uv remove`, 동기화는 `uv sync`를 사용한다.
