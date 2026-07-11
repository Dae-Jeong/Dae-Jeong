---
type: design
title: Resume Knowledge Harness Restructure
description: Dae-Jeong workspace를 portable한 Profile-Evidence-Products 지식 하네스로 개편하는 설계.
timestamp: 2026-07-11
tags: [resume, knowledge-harness, portability, source-of-truth]
---

# Resume Knowledge Harness Restructure

## 1. Goal

이 저장소를 다른 PC에서 clone해도 다음 작업을 이어갈 수 있는 개인 이력서 지식 하네스로 개편한다.

- 검증된 사실과 공개 문구를 분리한다.
- 모든 공개 claim을 근거까지 역추적할 수 있게 한다.
- resume, portfolio, homepage, JD 분석이 동일한 profile/evidence를 소비하게 한다.
- LLM은 작업 의도에 필요한 최소 문서만 읽는다.
- 로컬 workspace, agentspace, Desktop Wiki가 없어도 canonical content와 산출물을 읽고 편집할 수 있다.

## 2. Portability Contract

Portable은 모든 외부 원본 repo를 함께 복제한다는 뜻이 아니다. 두 수준을 분리한다.

### Clone-Only Mode

새 PC에서 이 저장소만 clone한 상태다.

- README와 context router를 통해 모든 활성 문서에 접근할 수 있다.
- profile, approved claims, public-safety policy, resume/portfolio source를 읽고 편집할 수 있다.
- `uv sync`와 `uv run playwright install chromium` 후 HTML에서 PDF를 생성할 수 있다.
- 외부 회사 repo나 개인 wiki 없이도 기존 approved claim을 사용할 수 있다.
- 외부 원본을 재검증하지 못한다는 사실은 명시적으로 표시한다.

### Deep-Verification Mode

외부 source repo까지 존재하는 개발 PC다.

- `.local/source-roots.yaml`에서 alias와 실제 경로를 연결한다.
- claim evidence의 source locator를 실제 Git/doc 경로와 다시 대조할 수 있다.
- `.local/source-roots.yaml`과 원본 repo는 Git에 포함하지 않는다.

### Explicit Non-Guarantee

- OS별 폰트 차이 때문에 PDF의 byte-level 동일성은 보장하지 않는다.
- A4 크기, 페이지 수, 텍스트, 섹션 순서, overflow 없음은 보장한다.
- JD raw corpus는 제3자 데이터이므로 local-only로 유지한다. 집계 report만 commit한다.

## 3. Design Principles

1. **One owner per fact**: 같은 사실을 여러 문서가 canonical로 소유하지 않는다.
2. **Evidence before copy**: public copy보다 evidence와 allowed claim이 먼저다.
3. **Products are derived**: resume, portfolio, homepage는 profile/evidence의 소비자다.
4. **Progressive disclosure**: root entry에서 hub로, hub에서 필요한 문서로 이동한다.
5. **Stable versus volatile**: profile과 policy는 안정적이며 current-state와 work tracking은 휘발성이다.
6. **Portable by default**: 활성 문서는 절대경로에 의존하지 않는다.
7. **Archive is not context**: 과거 초안은 보존하지만 기본 read flow에서 제외한다.

## 4. Target Structure

```text
README.md
AGENTS.md
pyproject.toml
uv.lock
config/
  source-roots.example.yaml

context/
  index.md
  current-state.md
  manifest.yaml
  profile.md

profile/
  README.md
  identity.md
  career.md
  capabilities.md
  credentials.md
  contribution.md
  agent-workflow.md
  writing.md

evidence/
  README.md
  claims/
    README.md
    career.yaml
    credentials.yaml
    thready.yaml
    centurion.yaml
    nexus.yaml
    be-template.yaml
    mediness.yaml
  projects/
    thready.md
    centurion.md
    nexus.md
    be-template.md
    mediness.md
    previous-career.md
  audits/
    oopy-resume-source.md
    workspace-project-audit.md
    project-work-log.md
    impact-case-candidates.md
  agent-workflow.md

products/
  README.md
  resume/
    README.md
    decisions.md
    content-contract.md
    claim-map.yaml
    master/
      v0/README.md
      v0/resume.html
      v0/resume.pdf
      v1/resume.html
      v1/resume.pdf
    tailored/
  portfolio/
    README.md
    decisions.md
    cases/
    prototypes/v0.1.0/
  homepage/
    README.md
    public-content.md
  jd/
    README.md
    profile-skills.json
    reports/feature-map.md
    reports/gap-map.md

rules/
  document-routing.md
  evidence-policy.md
  public-safety.md

scripts/
  validate_workspace.py
  verify_portable_clone.py
  jd/

skills/
  tailor-resume/

archive/
  README.md
  resume-research/
  superseded-designs/

docs/superpowers/
  specs/
  plans/
```

## 5. Layer Responsibilities

### Context

작업 의도별 최소 read path와 현재 상태만 담는다. `context/current-state.md`는 derived snapshot이며 profile fact를 소유하지 않는다.

### Profile

안정적인 개인 원장이다. public copy를 직접 생성하기 위한 요약을 담지만 긴 Git evidence와 작업 로그를 담지 않는다.

### Evidence

검증 사실, source locator, confidence, public disclosure 범위를 소유한다. 외부 source가 없어도 approved claim을 이해할 수 있을 만큼 sanitized evidence summary를 포함한다.

### Products

출력 목적별 계약과 산출물을 소유한다. Resume는 hooking, Portfolio는 depth, Homepage는 brand/navigation, JD는 market matching을 담당한다.

### Rules

파일 위치, evidence label, public safety처럼 제품을 가로지르는 정책을 소유한다.

### Skills

canonical policy를 복제하지 않는다. `products/resume/content-contract.md`, `rules/*`, `evidence/claims/*`를 읽어 실행하는 adapter다.

### Archive

원본 조사와 superseded draft를 보존한다. archive의 링크와 절대경로는 historical record로 허용하지만 활성 문서는 archive를 canonical source로 사용하지 않는다.

## 6. Claim Schema

Claim은 프로젝트 단위 YAML 파일로 나눈다. 한 파일에는 동일 evidence boundary를 공유하는 claim만 둔다.

```yaml
schema_version: 1
project: thready
claims:
  - id: thready.backend-rebuild
    statement: FastAPI 기반 backend 전면 재구축 및 이후 개발·운영 전담
    strength: owned
    confidence: high
    public: true
    evidence:
      - evidence/projects/thready.md#backend-rebuild
    allowed_copy:
      - FastAPI 기반 backend 전면 재구축 및 이후 개발·운영 전담
    forbidden_copy:
      - 제품 전체 단독 구축
    verified_at: 2026-07-05
```

Required fields:

- `id`: repo 전체에서 유일한 stable ID
- `statement`: 사실 중심 canonical claim
- `strength`: `owned`, `led`, `co-led`, `contributed`
- `confidence`: `high`, `medium`, `low`, `unknown`
- `public`: public output 사용 가능 여부
- `evidence`: repo-relative evidence anchor 목록
- `allowed_copy`: 의미를 바꾸지 않는 허용 표현
- `forbidden_copy`: 반복 방지할 과장 표현
- `verified_at`: 마지막 검증일

Resume HTML은 공개 화면에 노출되지 않는 `data-claim="..."` 속성으로 claim ID를 연결한다. `products/resume/claim-map.yaml`은 섹션/bullet과 claim ID의 관계만 소유하며 claim 내용을 복제하지 않는다.

## 7. External Source Locator

활성 문서에는 `/Users/marin/...` 절대경로를 기록하지 않는다.

Evidence는 논리 alias만 기록한다.

```yaml
source:
  root: workspace
  repository: thready
  locator: git
  ref: v1.1.0
```

Deep verification PC는 tracked example을 복사해 ignored 파일을 사용한다.

```yaml
# config/source-roots.example.yaml을 복사한 .local/source-roots.yaml
roots:
  workspace: /actual/path/to/workspace
  agentspace: /actual/path/to/agentspace
  wiki: /actual/path/to/Wiki
```

Clone-only workflow는 이 파일이 없어도 실패하지 않는다. `--deep` 검증만 명확한 missing-source 결과를 반환한다.

## 8. Current File Disposition

| Current | Disposition |
| --- | --- |
| `README.MD` | case-safe `README.md`로 rename, single entry로 재작성 |
| `context/index.md`, `manifest.yaml` | 새 layer와 read flow 반영 |
| `context/current-state.md` | 최신 상태로 재작성, derived 명시 |
| `context/profile.md` | profile에서 생성된 compact snapshot 역할 유지 |
| `profile/*` | canonical 유지, 중복 제거, `credentials.md` 추가 |
| `docs/resume/01-*` | `evidence/audits/oopy-resume-source.md` |
| `docs/resume/02-*` | project evidence로 분해 후 원본 archive |
| `docs/resume/03-*` | `evidence/agent-workflow.md`, 절대경로 alias화 |
| `docs/resume/04-*`, `05-*` | 유효 결론 승격 후 archive |
| `docs/resume/06-workspace-*` | `evidence/audits/workspace-project-audit.md` |
| `docs/resume/06-project-*` | `evidence/audits/project-work-log.md` |
| `docs/resume/06-impact-*` | `evidence/audits/impact-case-candidates.md` |
| `docs/resume/06-strengths-*` | profile/decisions로 승격 후 archive |
| `docs/resume/09-*` | claims, public-safety, homepage content로 분해 후 archive |
| `docs/resume/10-*` | resume decisions와 v1 source로 분해 후 archive |
| `docs/resume/11-*` | `products/jd/README.md`로 승격 |
| `docs/resume/12-*`, `13-*` | `products/jd/reports/` |
| `docs/resume/14-*` | `products/resume/master/v0/`, 실제 v1은 새로 작성 |
| `docs/resume/15-*` | `products/portfolio/decisions.md` |
| `docs/resume/cases/*` | `products/portfolio/cases/*` |
| `claude-design/portfolio_v0.1.0` | `products/portfolio/prototypes/v0.1.0` |
| `scripts/jd/*` | 새 product 경로를 사용하도록 수정 |
| `skills/tailor-resume/*` | source contract를 새 canonical 경로로 변경 |
| `.claude/skills/tailor-resume` | symlink 대신 portable adapter 문서로 교체 |
| `.agents/skills/impeccable` | Daejeong Design 소유 영역으로 보고 이 repo에서 추적하지 않음 |
| `.playwright-mcp`, `tmp`, `skills-lock.json` | local-only ignore |
| `docs/resume/jd-corpus` | local-only 유지, 새 위치 `products/jd/corpus`로 변경 |

## 9. Tooling Contract

- Python `3.12`
- `uv` 기반 environment와 lockfile
- `pyproject.toml`, `.python-version`, `uv.lock`의 runtime/dependency 변경은 `uv init`, `uv python pin`, `uv add`/`uv remove`로만 수행한다.
- `playwright==1.61.0`
- `PyYAML==6.0.3`
- `scripts/validate_workspace.py`가 active docs metadata, links, absolute paths, claim IDs, artifact mappings를 검사한다.
- `scripts/verify_portable_clone.py`가 temporary clone에서 clone-only validation을 실행한다.
- PDF renderer는 외부 font 요청 실패 시에도 system fallback으로 완료되어야 한다.

## 10. Success Criteria

1. Clean clone에서 root README부터 모든 active hub에 접근할 수 있다.
2. active tree에서 `/Users/marin`, `~/workspace`, `~/agentspace`, `Desktop/Wiki` 참조가 0건이다.
3. `context/`, `profile/`, `evidence/`, `products/`, `rules/`의 active Markdown concept document에 parseable frontmatter와 non-empty `type`이 있다. Agent Skills의 `SKILL.md`는 Agent Skills frontmatter 계약을 별도로 따른다.
4. 모든 claim ID가 유일하며 evidence anchor가 존재한다.
5. resume v1의 모든 주장 bullet이 하나 이상의 public claim ID를 가진다.
6. resume/portfolio/skill이 동일한 claim과 content contract를 소비한다.
7. `uv sync` 후 PDF를 생성하고 A4 1-2페이지, overflow 없음, 필수 섹션 존재를 확인한다.
8. local-only 파일이 Git index에 포함되지 않는다.
9. archive 없이도 active workflow가 완결된다.
10. temporary clone에서 `uv run python scripts/validate_workspace.py`가 성공한다.

## 11. Risks And Brakes

- **Large dirty worktree**: 먼저 explicit checkpoint를 만들고 구조 이동과 내용 수정을 분리한다.
- **Broken links during bulk move**: 이동 직후 link validator를 실행하며 내용 rewrite를 같은 commit에 섞지 않는다.
- **Over-fragmentation**: claim은 bullet별 파일이 아니라 project boundary별 YAML로 묶는다.
- **External evidence loss**: sanitized summary를 repo에 보존하고 raw external path는 alias로만 연결한다.
- **Archive becoming canonical**: active docs에서 archive 참조를 validator가 거부한다.
- **PDF differences across OS**: semantic/layout gate를 사용하고 byte comparison은 하지 않는다.
- **Skill policy duplication**: skill은 canonical contract 경로를 읽고 자체 규칙 복제를 최소화한다.

## 12. Non-Goals

- 회사 source repo와 개인 Global Wiki 전체를 이 repo로 복제하지 않는다.
- 모든 evidence를 자동으로 Git에서 재수집하지 않는다.
- resume v1 문구를 migration과 동시에 완성하지 않는다.
- DB나 vector database를 도입하지 않는다.
- Daejeong Design 구현을 이 repo로 다시 가져오지 않는다.
