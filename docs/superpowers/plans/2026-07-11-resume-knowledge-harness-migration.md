# Resume Knowledge Harness Migration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 현재 이력서 workspace를 다른 PC에서 clone해도 profile, evidence, resume, portfolio, JD workflow를 이어갈 수 있는 portable knowledge harness로 이관한다.

**Architecture:** 안정적인 개인 원장은 `profile/`, 검증 근거와 public claim은 `evidence/`, 목적별 계약과 산출물은 `products/`가 소유한다. 활성 문서는 repo-relative link와 logical source alias만 사용하고, 실제 외부 경로는 ignored `.local/source-roots.yaml`에서만 연결한다.

**Tech Stack:** Markdown + OKF-style YAML frontmatter, YAML claim registry, Python 3.12, PyYAML 6.0.3, Playwright 1.61.0, uv, HTML/CSS/PDF

## Global Constraints

- 실제 이관 전에 현재 dirty worktree를 explicit checkpoint commit으로 보존한다.
- 사용자가 만든 기존 변경을 되돌리거나 덮어쓰지 않는다.
- 구조 이동 commit과 콘텐츠 rewrite commit을 분리한다.
- 활성 문서에는 `/Users/marin`, `~/workspace`, `~/agentspace`, `Desktop/Wiki`를 기록하지 않는다.
- archive는 historical record이며 어떤 active document도 archive를 canonical source로 참조하지 않는다.
- `profile/`은 짧고 안정적인 원장으로 유지한다.
- public claim은 `high` 또는 신중한 `medium`만 허용한다.
- provider 실명, 고객사/브랜드명, 팀원 실명, 커밋 수치는 public output에 넣지 않는다.
- JD raw corpus, browser logs, temp render, local source roots, third-party installed skills는 Git에 넣지 않는다.
- migration 단계에서는 resume v1 문구를 완성하지 않는다. v0 보존과 v1 입력 계약까지만 만든다.
- 각 task는 검증 후 독립 commit으로 끝낸다.

---

## Target File Map

### Create

```text
README.md
pyproject.toml
.python-version
config/source-roots.example.yaml
evidence/README.md
evidence/claims/README.md
evidence/claims/{career,credentials,thready,centurion,nexus,be-template,mediness}.yaml
evidence/projects/{thready,centurion,nexus,be-template,mediness,previous-career}.md
evidence/audits/{oopy-resume-source,workspace-project-audit,project-work-log,impact-case-candidates}.md
evidence/agent-workflow.md
profile/credentials.md
products/README.md
products/resume/{README,decisions,content-contract}.md
products/resume/claim-map.yaml
products/resume/master/v0/README.md
products/resume/master/v0/{resume.html,resume.pdf}
products/portfolio/{README,decisions}.md
products/portfolio/cases/*.md
products/portfolio/prototypes/v0.1.0/*
products/homepage/{README,public-content}.md
products/jd/README.md
products/jd/profile-skills.json
products/jd/reports/{feature-map,gap-map}.md
rules/{evidence-policy,public-safety}.md
archive/README.md
archive/resume-research/*.md
scripts/validate_workspace.py
scripts/verify_portable_clone.py
tests/test_validate_workspace.py
.claude/skills/tailor-resume/SKILL.md
```

### Modify

```text
AGENTS.md
.gitignore
context/{index,current-state,manifest,profile}.md|yaml
profile/{README,identity,career,capabilities,contribution,agent-workflow,writing}.md
rules/document-routing.md
scripts/jd/{collect_wanted,build_report}.py
skills/tailor-resume/{SKILL.md,references/source-contract.md,scripts/html_to_pdf.py}
skills/tailor-resume/assets/{resume-template,portfolio-template}.html
```

### Remove After Migration

```text
README.MD
docs/resume/
claude-design/
.claude/skills/tailor-resume  # existing symlink only
```

The removed content is moved to active semantic locations or `archive/`; it is not discarded.

---

### Task 1: Protect The Existing Workspace And Exclude Local State

**Files:**
- Modify: `.gitignore`
- Inspect: every currently modified/untracked file from `git status --short`

**Interfaces:**
- Consumes: current dirty worktree
- Produces: one recoverable pre-migration Git checkpoint with local runtime files excluded

- [ ] **Step 1: Record the current state without changing it**

Run:

```bash
git status --short > /tmp/daejeong-pre-migration-status.txt
git diff --stat
git ls-files --others --exclude-standard | sort
```

Expected: modified profile/context/resume files and untracked resume artifacts are visible; `.agents`, `.playwright-mcp`, `tmp`, and `skills-lock.json` are not staged.

- [ ] **Step 2: Expand local-only ignore rules**

Replace `.gitignore` with:

```gitignore
# Local agent/plugin installations
.agents/
skills-lock.json

# Tool runtime and render scratch
.playwright-mcp/
.tmp/
tmp/
.local/
.venv/
__pycache__/
*.py[cod]

# Raw JD corpus is refreshed locally; derived reports are committed.
docs/resume/jd-corpus/
products/jd/corpus/
```

- [ ] **Step 3: Verify local-only files are ignored**

Run:

```bash
for p in .agents .playwright-mcp tmp skills-lock.json docs/resume/jd-corpus; do
  git check-ignore "$p"
done
```

Expected: all five paths are printed.

- [ ] **Step 4: Run a staged secret and path review**

Run:

```bash
rg -n 'BEGIN (RSA|OPENSSH|EC) PRIVATE KEY|api[_-]?key\s*[:=]|secret\s*[:=]|password\s*[:=]' \
  AGENTS.md README.MD context docs profile rules scripts skills claude-design || true
```

Expected: no credentials or private keys. Public contact details already intended for the resume may remain.

- [ ] **Step 5: Stage only intentional workspace content**

Run:

```bash
git add .gitignore AGENTS.md README.MD context docs profile rules scripts skills claude-design
git status --short
git diff --cached --check
```

Expected: local-only paths remain unstaged and `git diff --cached --check` exits 0.

- [ ] **Step 6: Commit the checkpoint**

```bash
git commit -m "docs: checkpoint resume workspace before harness migration"
```

Expected: a commit is created and the only remaining untracked/modified paths are ignored local runtime files or the migration spec/plan already included in the checkpoint.

---

### Task 2: Declare A Portable Runtime

**Files:**
- Create: `.python-version`
- Create: `pyproject.toml`
- Create: `uv.lock`
- Create: `config/source-roots.example.yaml`
- Modify: `skills/tailor-resume/scripts/html_to_pdf.py`

**Interfaces:**
- Consumes: Python scripts and HTML resume sources
- Produces: `uv sync` environment and optional external source alias contract

- [ ] **Step 1: Initialize and manage Python metadata through uv**

Do not edit `pyproject.toml`, `.python-version`, or dependency entries manually. Run:

```bash
uv init --bare --name daejeong-profile-harness --python 3.12 --no-package
uv python pin 3.12
uv add 'playwright==1.61.0' 'PyYAML==6.0.3'
```

Expected: uv creates `pyproject.toml`, `.python-version`, and `uv.lock` and records both dependencies.

- [ ] **Step 2: Generate the lockfile and install Chromium**

Run:

```bash
uv lock
uv sync
uv run playwright install chromium
```

Expected: `uv.lock` is created, dependency resolution succeeds, and Chromium installation exits 0.

- [ ] **Step 3: Define portable external source aliases**

Create `config/source-roots.example.yaml`:

```yaml
schema_version: 1
roots:
  workspace: /replace/with/workspace/root
  agentspace: /replace/with/agentspace/root
  wiki: /replace/with/wiki/root
```

Document that users copy it to `.local/source-roots.yaml`; the actual file remains ignored while the example is tracked.

- [ ] **Step 4: Make PDF rendering tolerant of unavailable web fonts**

Modify `html_to_pdf.py` so navigation completes on DOM load and web-font waiting is bounded:

```python
page.goto(src.as_uri(), wait_until="domcontentloaded")
try:
    page.wait_for_function("document.fonts.status === 'loaded'", timeout=5_000)
except Exception:  # font fallback is allowed by the portability contract
    pass
page.pdf(path=str(out), prefer_css_page_size=True, print_background=True)
```

Do not change the CLI arguments or output path behavior.

- [ ] **Step 5: Verify the renderer in the pinned environment**

Run:

```bash
uv run python skills/tailor-resume/scripts/html_to_pdf.py \
  docs/resume/14-resume-draft-v1.html /tmp/daejeong-resume-portable.pdf
pdfinfo /tmp/daejeong-resume-portable.pdf | rg 'Pages:|Page size:'
```

Expected: PDF generation succeeds, page size is A4, and page count is 1 or 2.

- [ ] **Step 6: Commit**

```bash
git add .python-version pyproject.toml uv.lock config/source-roots.example.yaml \
  skills/tailor-resume/scripts/html_to_pdf.py
git commit -m "build: declare portable resume tooling"
```

---

### Task 3: Establish The Single Entry And Routing Hubs

**Files:**
- Rename: `README.MD` -> `README.md`
- Modify: `AGENTS.md`
- Modify: `context/index.md`
- Modify: `context/current-state.md`
- Modify: `context/manifest.yaml`
- Modify: `context/profile.md`
- Create: `products/README.md`
- Create: `evidence/README.md`
- Create: `archive/README.md`
- Modify: `rules/document-routing.md`

**Interfaces:**
- Consumes: design spec directory responsibilities
- Produces: one root entry and minimal read flow for each task intent

- [ ] **Step 1: Perform a case-safe README rename**

Run on the current case-insensitive filesystem:

```bash
git mv README.MD README.__case_tmp__
git mv README.__case_tmp__ README.md
```

Expected: `git status --short` shows a tracked rename to lowercase `README.md`.

- [ ] **Step 2: Rewrite the root entry as a hub only**

`README.md` must contain this routing table and no duplicated profile narrative:

```markdown
| Intent | First read |
| --- | --- |
| 현재 작업 상태 | `context/current-state.md` |
| 개인 원장 | `profile/README.md` |
| claim 검증 | `evidence/README.md` |
| 이력서 | `products/resume/README.md` |
| 포트폴리오 | `products/portfolio/README.md` |
| 홈페이지 | `products/homepage/README.md` |
| JD 분석 | `products/jd/README.md` |
| 문서 위치 결정 | `rules/document-routing.md` |
```

- [ ] **Step 3: Update agent and context routing**

Apply these exact ownership rules to `AGENTS.md`, `context/index.md`, and `context/manifest.yaml`:

```text
context = routing and volatile snapshot
profile = stable personal source of truth
evidence = verified facts and claim strength
products = output-specific contracts and artifacts
rules = cross-product policy
skills = executable adapters
archive = non-canonical history
```

Remove references that make `docs/resume/` an active owner.

- [ ] **Step 4: Mark context snapshots as derived**

Add to `context/current-state.md` and `context/profile.md` frontmatter:

```yaml
canonical: false
derived_from:
  - profile/
  - evidence/claims/
  - products/
```

Rewrite `current-state.md` to state that the knowledge-harness migration is active and resume master v1 has not yet been produced.

- [ ] **Step 5: Create short hub READMEs**

Each new hub must contain: purpose, canonical ownership, first-read table, write rules, and links to child documents. Do not copy child document content into the hub.

- [ ] **Step 6: Verify default read flow contains no legacy owner**

Run:

```bash
rg -n 'docs/resume' README.md AGENTS.md context rules
```

Expected: references appear only in a migration/history note, not in active read or write routing.

- [ ] **Step 7: Commit**

```bash
git add README.md AGENTS.md context evidence/README.md products/README.md \
  archive/README.md rules/document-routing.md
git commit -m "docs: establish profile evidence product routing"
```

---

### Task 4: Add Claim Registry And Workspace Validation

**Files:**
- Create: `rules/evidence-policy.md`
- Create: `rules/public-safety.md`
- Create: `evidence/claims/README.md`
- Create: `evidence/claims/*.yaml`
- Create: `scripts/validate_workspace.py`
- Create: `tests/test_validate_workspace.py`

**Interfaces:**
- Produces: `validate(root: Path) -> list[str]`
- Produces: project claim YAML schema version 1
- Consumes later: resume claim map and portable clone verifier

- [ ] **Step 1: Write failing validator tests**

Create `tests/test_validate_workspace.py` with temporary-repo tests for:

```python
from pathlib import Path
from tempfile import TemporaryDirectory
import unittest

from scripts.validate_workspace import validate


class ValidateWorkspaceTest(unittest.TestCase):
    def test_rejects_absolute_user_path_in_active_markdown(self):
        with TemporaryDirectory() as tmp:
            root = Path(tmp)
            (root / "profile").mkdir()
            (root / "profile" / "identity.md").write_text(
                "---\ntype: profile\n---\n/Users/marin/workspace/x\n",
                encoding="utf-8",
            )
            self.assertTrue(any("absolute path" in e for e in validate(root)))

    def test_rejects_duplicate_claim_ids(self):
        with TemporaryDirectory() as tmp:
            root = Path(tmp)
            claims = root / "evidence" / "claims"
            claims.mkdir(parents=True)
            body = "schema_version: 1\nproject: x\nclaims:\n  - id: x.same\n    statement: x\n    strength: owned\n    confidence: high\n    public: true\n    evidence: []\n    allowed_copy: [x]\n    forbidden_copy: []\n    verified_at: 2026-07-11\n"
            (claims / "a.yaml").write_text(body, encoding="utf-8")
            (claims / "b.yaml").write_text(body, encoding="utf-8")
            self.assertTrue(any("duplicate claim" in e for e in validate(root)))
```

- [ ] **Step 2: Run tests and confirm failure**

Run:

```bash
uv run python -m unittest tests/test_validate_workspace.py -v
```

Expected: import failure because `scripts.validate_workspace` does not exist.

- [ ] **Step 3: Implement the validator**

`scripts/validate_workspace.py` must:

```python
ACTIVE_DIRS = ("context", "profile", "evidence", "products", "rules", "skills")
FORBIDDEN_PATH_PATTERNS = (
    "/Users/marin",
    "~/workspace",
    "~/agentspace",
    "Desktop/Wiki",
    "Desktop/wiki",
)
REQUIRED_CLAIM_FIELDS = {
    "id", "statement", "strength", "confidence", "public", "evidence",
    "allowed_copy", "forbidden_copy", "verified_at",
}

def validate(root: Path) -> list[str]:
    """Return stable, human-readable validation failures; empty means pass."""
```

Validation order must be deterministic: metadata, forbidden paths, claim schema/uniqueness, evidence anchors, active links, resume claim-map references. `archive/` and ignored local directories are excluded. The `type` metadata rule applies to concept documents under `context/`, `profile/`, `evidence/`, `products/`, and `rules/`; `skills/**/SKILL.md` follows the Agent Skills `name`/`description` contract instead.

- [ ] **Step 4: Add evidence and public-safety policies**

`rules/evidence-policy.md` defines `Source-backed`, `Code-backed`, `Tool-backed`, `Inference`, `Assumption`, `Unverified`, `Unknown`, plus claim strength values `owned`, `led`, `co-led`, `contributed`.

`rules/public-safety.md` defines provider/customer/team/private-path/commit-count restrictions and requires `public: true` for output use.

- [ ] **Step 5: Add project claim files with only already approved claims**

Create the seven YAML files from the verified table in the current `09` document. Do not promote `Celery -> TaskIQ migration`, performance multipliers, customer names, or product-wide solo-build claims.

- [ ] **Step 6: Run tests and active validation**

Run:

```bash
uv run python -m unittest tests/test_validate_workspace.py -v
uv run python scripts/validate_workspace.py
```

Expected: unit tests pass. Workspace validation may report legacy absolute paths until Task 5; record the exact count in the commit message body but do not suppress failures.

- [ ] **Step 7: Commit**

```bash
git add rules/evidence-policy.md rules/public-safety.md evidence/claims \
  scripts/validate_workspace.py tests/test_validate_workspace.py
git commit -m "feat: add evidence claim registry validation"
```

---

### Task 5: Migrate Evidence Without Losing Source History

**Files:**
- Move: `docs/resume/01-oopy-resume-source-analysis.md` -> `evidence/audits/oopy-resume-source.md`
- Move: `docs/resume/06-workspace-project-audit.md` -> `evidence/audits/workspace-project-audit.md`
- Move: `docs/resume/06-project-work-log.md` -> `evidence/audits/project-work-log.md`
- Move: `docs/resume/06-impact-case-candidates.md` -> `evidence/audits/impact-case-candidates.md`
- Create: `evidence/projects/*.md`
- Create: `evidence/agent-workflow.md`
- Move after extraction: `docs/resume/02-*`, `03-*` -> `archive/resume-research/`

**Interfaces:**
- Consumes: current audits, work logs, Git verification summaries
- Produces: repo-contained sanitized evidence summaries referenced by claim YAML

- [ ] **Step 1: Move the four audit documents with `git mv`**

Run:

```bash
mkdir -p evidence/audits evidence/projects archive/resume-research
git mv docs/resume/01-oopy-resume-source-analysis.md evidence/audits/oopy-resume-source.md
git mv docs/resume/06-workspace-project-audit.md evidence/audits/workspace-project-audit.md
git mv docs/resume/06-project-work-log.md evidence/audits/project-work-log.md
git mv docs/resume/06-impact-case-candidates.md evidence/audits/impact-case-candidates.md
```

- [ ] **Step 2: Replace absolute paths in active audits with logical source locators**

Use `workspace:<repo>`, `agentspace:<repo>`, and `wiki:agents/<doc>` notation. Add a frontmatter extension:

```yaml
source_roots:
  - workspace
  - agentspace
  - wiki
```

Do not change historical findings or confidence labels.

- [ ] **Step 3: Create six focused project evidence documents**

Each `evidence/projects/*.md` contains:

```markdown
## Verified Scope
## Contribution Boundary
## Evidence Anchors
## Public Disclosure
## Rejected Or Unverified Claims
```

Split existing evidence as follows:

```text
thready.md         <- Thready rebuild, quality system, operation ownership
centurion.md       <- BAY, SAY, DAY, RAY, SSO, infra contribution boundaries
nexus.md           <- backend monorepo and infra scope
be-template.md     <- template architecture, ADR, agent context system
mediness.md        <- product operation workflow and role guardrail
previous-career.md <- Memento, STUDIO LAB, 아이즈솔, TellingMe
```

- [ ] **Step 4: Create the agent workflow evidence summary**

Extract portable conclusions from `03-agent-workflow-evidence.md`. Use aliases instead of raw paths and keep the Open Design statement at the verified maturity level: building/adapting, not completed.

- [ ] **Step 5: Archive the two superseded broad evidence documents**

Run:

```bash
git mv docs/resume/02-company-work-evidence.md archive/resume-research/
git mv docs/resume/03-agent-workflow-evidence.md archive/resume-research/
```

- [ ] **Step 6: Validate evidence anchors and forbidden paths**

Run:

```bash
uv run python scripts/validate_workspace.py
rg -n '/Users/marin|~/workspace|~/agentspace|Desktop/[Ww]iki' evidence profile context products rules skills || true
```

Expected: no active absolute path references. Claim evidence anchors all resolve.

- [ ] **Step 7: Commit**

```bash
git add evidence archive/resume-research docs/resume
git commit -m "docs: migrate project evidence into portable records"
```

---

### Task 6: Normalize The Canonical Profile

**Files:**
- Modify: `profile/*.md`
- Create: `profile/credentials.md`
- Move: `docs/resume/06-strengths-and-traits.md` -> `archive/resume-research/`
- Move: `docs/resume/04-resume-content-brief.md` -> `archive/resume-research/`
- Move: `docs/resume/05-contribution-ax-positioning-draft.md` -> `archive/resume-research/`

**Interfaces:**
- Consumes: evidence claims and existing profile facts
- Produces: short canonical profile documents with no raw source paths

- [ ] **Step 1: Add credentials as a dedicated owner**

Move education, bootcamp, ADsP, CES award, hackathon awards, and patent facts out of narrative drafts into `profile/credentials.md`. Each item links to a `credentials.*` claim ID.

- [ ] **Step 2: Reduce each profile file to one responsibility**

Apply these boundaries:

```text
identity.md        = category, one-line brand, short bio, guardrails
career.md          = timeline and role evolution only
capabilities.md    = capability groups and confidence only
contribution.md    = project contribution boundaries and claim links only
agent-workflow.md  = stable operating model and maturity guardrail
writing.md         = themes and article backlog only
credentials.md     = education, awards, patents, certifications
```

Remove long evidence paragraphs and replace them with repo-relative links to `evidence/`.

- [ ] **Step 3: Fix the primary brand hierarchy**

Use this approved hierarchy consistently:

```text
Primary category: Backend Engineer
Specialty: AI Product Systems
Differentiator: Agent-readable Engineering Workflow
Supporting narrative: Vision AI -> PM -> Backend -> AI Product/Agent Workflow
```

Do not use `Backend Architect`, `Tech Lead / PO / AI Agent Engineer`, or `AX Engineer` as the sole primary category.

- [ ] **Step 4: Archive the three superseded synthesis drafts**

Run:

```bash
git mv docs/resume/04-resume-content-brief.md archive/resume-research/
git mv docs/resume/05-contribution-ax-positioning-draft.md archive/resume-research/
git mv docs/resume/06-strengths-and-traits.md archive/resume-research/
```

- [ ] **Step 5: Validate profile size and dependencies**

Run:

```bash
wc -l profile/*.md
rg -n '/Users/marin|~/|docs/resume|archive/' profile || true
uv run python scripts/validate_workspace.py
```

Expected: no profile file depends on absolute paths, `docs/resume`, or archive. Each profile file remains focused and links only to active evidence/rules.

- [ ] **Step 6: Commit**

```bash
git add profile archive/resume-research docs/resume
git commit -m "docs: normalize canonical profile records"
```

---

### Task 7: Create Resume And Portfolio Product Boundaries

**Files:**
- Create: `products/resume/{README,decisions,content-contract}.md`
- Create: `products/resume/claim-map.yaml`
- Create: `products/resume/master/v0/README.md`
- Create: `products/portfolio/README.md`
- Create: `products/homepage/{README,public-content}.md`
- Move: `docs/resume/14-resume-draft-v1.html` -> `products/resume/master/v0/resume.html`
- Move: `docs/resume/14-resume-draft-v1.pdf` -> `products/resume/master/v0/resume.pdf`
- Move: `docs/resume/cases/*` -> `products/portfolio/cases/*`
- Move: `claude-design/portfolio_v0.1.0/*` -> `products/portfolio/prototypes/v0.1.0/*`
- Move: `docs/resume/README.md` -> `archive/resume-research/docs-resume-README.md`
- Move after extraction: `docs/resume/09-*`, `10-*`, `15-*` -> `archive/resume-research/`

**Interfaces:**
- Consumes: profile, evidence claims, rules
- Produces: resume content contract, v0 historical baseline, portfolio case library

- [ ] **Step 1: Create resume product contract files**

`products/resume/decisions.md` owns:

```text
Resume = 15-second hooking
Portfolio = depth verification
Korean general master before tailored variants
Primary brand = Backend Engineer for AI Product Systems
```

`products/resume/content-contract.md` receives the A/B frame, section counts, noun-style bullets, claim strength, public safety, A4 target, and 15-second test from the current `content-rules.md` and `10` narrative document.

Create `products/resume/README.md`, `products/portfolio/README.md`, and `products/homepage/README.md` as short hubs. Each hub identifies its canonical contract, artifact locations, upstream profile/evidence dependencies, and current status.

- [ ] **Step 2: Move the current draft as v0 without editing its content**

Run:

```bash
mkdir -p products/resume/master/v0
git mv docs/resume/14-resume-draft-v1.html products/resume/master/v0/resume.html
git mv docs/resume/14-resume-draft-v1.pdf products/resume/master/v0/resume.pdf
```

Add `products/resume/master/v0/README.md` stating that v0 is a structural/content inventory, not a public-ready master.

- [ ] **Step 3: Create the resume claim map contract**

Create `products/resume/claim-map.yaml`:

```yaml
schema_version: 1
artifact: products/resume/master/v1/resume.html
sections:
  summary: []
  capabilities: []
  projects: []
  career: []
  agent_workflow: []
```

The empty v1 map is valid only while `context/current-state.md` says v1 is not created. Validator must require non-empty public claim IDs once v1 exists.

- [ ] **Step 4: Move portfolio cases and prototype**

Run:

```bash
mkdir -p products/portfolio/cases products/portfolio/prototypes/v0.1.0
git mv docs/resume/cases/* products/portfolio/cases/
git mv claude-design/portfolio_v0.1.0/* products/portfolio/prototypes/v0.1.0/
rmdir docs/resume/cases claude-design/portfolio_v0.1.0 claude-design
```

Add `type: portfolio-case` to every case frontmatter and replace `09 표 참조` with exact claim IDs. Add OKF-compatible frontmatter to the relocated prototype README.

Move the legacy resume index after the new product hubs exist:

```bash
git mv docs/resume/README.md archive/resume-research/docs-resume-README.md
```

- [ ] **Step 5: Extract then archive the broad product drafts**

Extract public homepage copy from `09` into `products/homepage/public-content.md`; extract portfolio pipeline decisions from `15` into `products/portfolio/decisions.md`; then move `09`, `10`, and `15` to archive.

- [ ] **Step 6: Update all active links**

Run:

```bash
rg -n 'docs/resume/(09|10|14|15)|docs/resume/cases|claude-design' \
  README.md AGENTS.md context profile evidence products rules skills scripts
```

Expected: zero matches after new paths are wired.

- [ ] **Step 7: Render the relocated v0 and compare semantics**

Run:

```bash
uv run python skills/tailor-resume/scripts/html_to_pdf.py \
  products/resume/master/v0/resume.html /tmp/resume-v0-relocated.pdf
pdfinfo /tmp/resume-v0-relocated.pdf | rg 'Pages:|Page size:'
```

Expected: A4 and the same two-page semantic layout as the pre-migration v0.

- [ ] **Step 8: Commit**

```bash
git add products archive/resume-research docs/resume claude-design
git commit -m "docs: establish resume and portfolio product boundaries"
```

---

### Task 8: Migrate JD Analysis And Tailor-Resume Adapters

**Files:**
- Move: `docs/resume/11-jd-analysis-flow.md` -> `products/jd/README.md`
- Move: `docs/resume/12-jd-feature-map.md` -> `products/jd/reports/feature-map.md`
- Move: `docs/resume/13-jd-gap-map.md` -> `products/jd/reports/gap-map.md`
- Move: `scripts/jd/profile_skills.json` -> `products/jd/profile-skills.json`
- Modify: `scripts/jd/*.py`
- Modify: `skills/tailor-resume/*`
- Replace: `.claude/skills/tailor-resume` symlink with adapter file

**Interfaces:**
- Consumes: profile/evidence/products resume/portfolio paths
- Produces: portable JD report generation and agent-neutral resume skill

- [ ] **Step 1: Move JD documents and profile skill data**

Run:

```bash
mkdir -p products/jd/reports
git mv docs/resume/11-jd-analysis-flow.md products/jd/README.md
git mv docs/resume/12-jd-feature-map.md products/jd/reports/feature-map.md
git mv docs/resume/13-jd-gap-map.md products/jd/reports/gap-map.md
git mv scripts/jd/profile_skills.json products/jd/profile-skills.json
```

- [ ] **Step 2: Update JD scripts to product paths**

Use these constants in `collect_wanted.py` and `build_report.py`:

```python
PRODUCT = ROOT / "products" / "jd"
CORPUS = PRODUCT / "corpus" / "wanted"
PROFILE = json.loads((PRODUCT / "profile-skills.json").read_text(encoding="utf-8"))
FEATURE_MAP = PRODUCT / "reports" / "feature-map.md"
GAP_MAP = PRODUCT / "reports" / "gap-map.md"
```

Update generated document descriptions and regeneration commands to the new paths.

- [ ] **Step 3: Replace the source contract**

`skills/tailor-resume/references/source-contract.md` must read:

```text
Always: products/resume/content-contract.md, profile/*, rules/public-safety.md
Claims: evidence/claims/*.yaml
Cases: products/portfolio/cases/*.md
Market matching: products/jd/profile-skills.json and reports/gap-map.md
Templates: skills/tailor-resume/assets/*.html
Outputs: products/resume/tailored/<company-slug>/
```

Remove `09`, `10`, `14`, and `docs/resume/cases` as canonical sources.

Replace `skills/tailor-resume/references/content-rules.md` with a short compatibility adapter that points to `products/resume/content-contract.md`; do not keep a second copy of the rules.

- [ ] **Step 4: Update templates and skill paths**

Keep the existing HTML slot interface. Change output paths, contract references, footer accuracy statement, and case-library path. Do not rewrite the visual design in this migration.

- [ ] **Step 5: Replace the Claude symlink with a portable adapter**

Remove only the symlink and create `.claude/skills/tailor-resume/SKILL.md`:

```markdown
---
name: tailor-resume
description: Repo-local adapter for the canonical tool-agnostic tailor-resume skill.
---

Read and follow `../../../skills/tailor-resume/SKILL.md` as the canonical skill.
Do not duplicate its workflow or source contract here.
```

- [ ] **Step 6: Test JD report regeneration with a temporary corpus copy**

Because the real corpus is ignored, move the existing local corpus into the new ignored location, then run:

```bash
mkdir -p products/jd/corpus
if [ -d docs/resume/jd-corpus/wanted ]; then
  mv docs/resume/jd-corpus/wanted products/jd/corpus/
  rmdir docs/resume/jd-corpus
fi
uv run python scripts/jd/build_report.py
git diff -- products/jd/reports
```

Expected: reports regenerate at the new paths. Differences are limited to timestamp/path wording unless source data changed.

- [ ] **Step 7: Commit**

```bash
git add products/jd scripts/jd skills/tailor-resume .claude/skills/tailor-resume
git commit -m "refactor: route JD and resume skills through product contracts"
```

---

### Task 9: Remove Legacy Active Paths And Verify A Fresh Clone

**Files:**
- Create: `scripts/verify_portable_clone.py`
- Modify: `archive/README.md`
- Remove after empty: `docs/resume/`

**Interfaces:**
- Consumes: `scripts.validate_workspace.validate`
- Produces: repeatable clone-only verification command

- [ ] **Step 1: Write the portable clone verifier**

`scripts/verify_portable_clone.py` must:

```python
1. assert the current worktree is clean
2. create a TemporaryDirectory
3. run git clone --no-local <repo-root> <tmp>/clone
4. run the clone's scripts/validate_workspace.py with sys.executable
5. assert local-only paths are absent from git ls-files
6. print "portable clone validation: PASS"
```

Use `subprocess.run(..., check=True, text=True, capture_output=True)` and surface stdout/stderr on failure.

- [ ] **Step 2: Ensure every superseded document is indexed in archive**

`archive/README.md` lists original path, archived path, replacement canonical path, and reason. No active document may link back to archive as a source.

- [ ] **Step 3: Remove empty legacy directories**

Run:

```bash
find docs/resume -type f -print
```

Expected: no files. Then run:

```bash
rmdir docs/resume
```

Keep `docs/superpowers/` unchanged.

- [ ] **Step 4: Run the complete active-tree validation**

Run:

```bash
uv run python -m unittest tests/test_validate_workspace.py -v
uv run python scripts/validate_workspace.py
rg -n '/Users/marin|~/workspace|~/agentspace|Desktop/[Ww]iki' \
  README.md AGENTS.md context profile evidence products rules skills scripts || true
git ls-files | rg '^(.agents|.playwright-mcp|tmp/|.local/|skills-lock.json|products/jd/corpus/)' || true
```

Expected: tests pass, workspace validator exits 0, and both `rg` checks print nothing.

- [ ] **Step 5: Commit before clone verification**

```bash
git add -A
git diff --cached --check
git commit -m "chore: remove legacy resume workspace paths"
```

- [ ] **Step 6: Verify from a real temporary clone**

Run:

```bash
uv run python scripts/verify_portable_clone.py
```

Expected:

```text
portable clone validation: PASS
```

- [ ] **Step 7: Render the canonical v0 from the clean clone contract**

Run:

```bash
uv run python skills/tailor-resume/scripts/html_to_pdf.py \
  products/resume/master/v0/resume.html /tmp/resume-final-portability-check.pdf
pdfinfo /tmp/resume-final-portability-check.pdf | rg 'Pages:|Page size:'
```

Expected: A4, 1-2 pages, command exit 0.

- [ ] **Step 8: Commit verifier if it was not included earlier**

```bash
git add scripts/verify_portable_clone.py archive/README.md
git commit -m "test: verify profile harness from a clean clone"
```

Skip this commit only if Step 5 already included the exact final verifier and archive index with no later changes.

---

### Task 10: Review Migration Integrity And Prepare Resume V1 Work

**Files:**
- Modify: `context/current-state.md`
- Modify: `products/resume/README.md`
- Create: `docs/superpowers/plans/2026-07-11-resume-master-v1.md` in the next planning session, not this migration

**Interfaces:**
- Consumes: passing portable harness
- Produces: explicit migration completion state and bounded next project

- [ ] **Step 1: Perform a file ownership review**

For every active file, answer one of: context, profile, evidence, product, rule, skill, script. Move any file whose content does not match its owner before continuing.

- [ ] **Step 2: Perform a duplication review**

Run targeted searches for the primary brand, Thready rebuild claim, claim strength table, and public-safety rules. Confirm each has one canonical owner and other occurrences are consumers or links.

- [ ] **Step 3: Update current state**

Set:

```text
Knowledge harness migration: complete
Portable clone validation: passed with date and command
Resume master v0: preserved
Resume master v1: next active project, not started
```

- [ ] **Step 4: Run final verification**

Run:

```bash
uv run python scripts/validate_workspace.py
uv run python scripts/verify_portable_clone.py
git status --short
```

Expected: both commands pass and Git status is clean.

- [ ] **Step 5: Commit**

```bash
git add context/current-state.md products/resume/README.md
git commit -m "docs: close portable knowledge harness migration"
```

---

## Self-Review

### Spec Coverage

- Portable clone and optional deep verification: Tasks 2, 5, 9
- Single entry and progressive disclosure: Task 3
- Profile/Evidence/Products ownership: Tasks 3, 5, 6, 7
- Claim registry and public safety: Task 4
- Existing file-by-file disposition: Tasks 5-8
- Local-only exclusions: Task 1
- Runtime reproducibility: Task 2
- Archive without canonical dependency: Tasks 5-9
- Fresh-clone verification: Task 9
- Resume v1 separated from migration: Task 10

### Placeholder Scan

The plan contains no placeholder implementation step. Resume v1 is explicitly out of scope and assigned to a separate future plan rather than left as an incomplete migration task.

### Interface Consistency

- `validate(root: Path) -> list[str]` is introduced in Task 4 and consumed in Task 9.
- Claim schema version is `1` in the spec, claim registry, and claim map.
- External source roots use the same `workspace`, `agentspace`, `wiki` aliases throughout.
- Product paths used by JD scripts, source contract, and validation are identical.
