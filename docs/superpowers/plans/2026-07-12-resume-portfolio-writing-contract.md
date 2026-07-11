# Resume And Portfolio Writing Contract Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Separate recruiter-first resume writing from technical-reviewer-first portfolio writing while keeping both artifacts synchronized through stable claim IDs.

**Architecture:** Keep `profile -> evidence -> claim registry` as the factual source. The resume selects compact hiring signals; portfolio cases expand the same claims into scope, constraints, decisions, trade-offs, implementation, failure handling, results, and limits. Company-specific outputs continue to select and order canonical claims and cases without rewriting them.

**Tech Stack:** Markdown content contracts, YAML claim registry, existing workspace validator, Git.

## Global Constraints

- Resume primary reader: recruiter; secondary reader: engineering manager.
- Portfolio primary reader: engineering manager or senior engineer; secondary reader: recruiter.
- Use the approved `Linked Proof Ladder` in [the design spec](../specs/2026-07-12-resume-portfolio-writing-contract-design.md).
- Do not change claim strength, invent metrics, expose provider/customer/team details, or add private source paths.
- Preserve existing frontmatter, `claim_ids`, `claim_strength`, `resume_tag`, and public labels.
- Do not add test code for document content. Verify with `scripts/validate_workspace.py`, heading/claim searches, link checks, and `git diff --check`.
- Do not redesign portfolio UI, change resume layout, or modify `pyproject.toml`.
- Commit only the files named in each task; unrelated dirty worktree changes remain untouched.

---

### Task 1: Align Resume And Portfolio Contracts

**Files:**
- Modify: `products/resume/content-contract.md`
- Modify: `products/portfolio/README.md`
- Modify: `products/portfolio/cases/README.md`

**Interfaces:**
- Consumes: `docs/superpowers/specs/2026-07-12-resume-portfolio-writing-contract-design.md`
- Produces: canonical audience, handoff, case section, and coverage rules used by all later tasks.

- [ ] **Step 1: Add audience and handoff rules to the resume contract**

Add an `Audience And Handoff` section after `Outcome` with these rules:

```markdown
## Audience And Handoff

- Primary reader: recruiter. Secondary reader: engineering manager.
- Resume는 인터뷰 여부를 판단할 수 있는 category, specialty, ownership, selected proof만 전달한다.
- 문제 배경, 제약, 대안, trade-off, failure mode는 portfolio case로 보낸다.
- flagship claim은 동일 claim ID를 사용하는 portfolio case 또는 명시된 backlog와 연결한다.
```

Extend the portfolio split acceptance gate so it requires scope/decision/failure/limits to remain in the portfolio instead of the resume.

- [ ] **Step 2: Replace the portfolio contract with the approved reader flow**

Add these explicit rules to `products/portfolio/README.md`:

```markdown
- Primary reader: engineering manager / senior engineer. Secondary reader: recruiter.
- Resume claim을 반복하지 않고 `Executive Summary -> My Scope -> Problem And Constraints -> Decision And Alternatives -> System Design And Implementation -> Failure Modes And Operation -> Evidence, Result, And Limits -> Stack`으로 확장한다.
- Portfolio는 resume보다 자세할 수 있지만 더 강한 ownership을 주장할 수 없다.
```

- [ ] **Step 3: Update the case library writing and coverage rules**

Replace the old five-section case structure with the exact eight-section structure above. Add a `Resume Coverage` table mapping:

| Resume selected proof | Portfolio case | Claim coverage |
| --- | --- | --- |
| Thready | `thready-rebuild.md` | backend rebuild, quality system, release operation |
| Centurion | `bay-async.md`, `say-realtime.md` | async backend, realtime AI |
| BE Template | `be-template.md` | backend standard, agent context |

Keep `mediness-ops.md` as differentiator coverage rather than a selected-project claim.

- [ ] **Step 4: Verify contract consistency**

Run:

```bash
uv run python scripts/validate_workspace.py
rg -n 'Primary reader|Executive Summary|My Scope|Resume Coverage' products/resume/content-contract.md products/portfolio/README.md products/portfolio/cases/README.md
git diff --check -- products/resume/content-contract.md products/portfolio/README.md products/portfolio/cases/README.md
```

Expected: validator prints `workspace validation: PASS`; every search term is present; diff check has no output.

- [ ] **Step 5: Commit the contract change**

```bash
git add products/resume/content-contract.md products/portfolio/README.md products/portfolio/cases/README.md
git commit -m "docs: align resume and portfolio writing contracts"
```

### Task 2: Rewrite The Thready Case As The Reference Case

**Files:**
- Modify: `products/portfolio/cases/thready-rebuild.md`

**Interfaces:**
- Consumes: Task 1 case structure and claims `thready.backend-rebuild`, `thready.generation-quality-system`, `thready.release-operation`.
- Produces: reference implementation for the other four case rewrites.

- [ ] **Step 1: Preserve the frontmatter and replace the body headings**

Use these exact headings in order:

```markdown
## Executive Summary
## My Scope
## Problem And Constraints
## Decision And Alternatives
## System Design And Implementation
## Failure Modes And Operation
## Evidence, Result, And Limits
## Stack
```

- [ ] **Step 2: Write the scope, constraints, and decision narrative**

The body must state:

- Initial `v1.0.0` was not Kim Daejeong's responsibility.
- New FastAPI backend rebuild, cutover, later version operation, and generation quality system were owned.
- Existing releases had to continue while the new backend was built.
- Parallel rebuild was selected over incremental modification to isolate migration risk, accepting temporary dual-operation cost.
- Typed prompt input and an LLM judge moved quality checks from intuition to an executable contract; the judge is a quality signal, not absolute truth.

- [ ] **Step 3: Retain verified implementation and operating evidence**

Keep the existing diagram and verified elements: DDD layered backend, typed prompt builder, critique/revise pipeline, LLM judge, persisted quality data, local evaluation sweep, cutover, v1.2-v1.5 release/QA operation. Add a limits paragraph stating that public traffic, latency, cost, and before/after quality metrics are not yet available.

- [ ] **Step 4: Verify the reference case**

```bash
uv run python scripts/validate_workspace.py
rg -n '^## (Executive Summary|My Scope|Problem And Constraints|Decision And Alternatives|System Design And Implementation|Failure Modes And Operation|Evidence, Result, And Limits|Stack)$' products/portfolio/cases/thready-rebuild.md
rg -n 'v1\.0\.0|전담|parallel|trade-off|한계|traffic|latency|cost' products/portfolio/cases/thready-rebuild.md
git diff --check -- products/portfolio/cases/thready-rebuild.md
```

Expected: eight headings, explicit initial-version boundary, trade-off, and limits are present; validator passes.

- [ ] **Step 5: Commit the reference case**

```bash
git add products/portfolio/cases/thready-rebuild.md
git commit -m "docs: deepen Thready portfolio case"
```

### Task 3: Rewrite The Backend And Realtime Cases

**Files:**
- Modify: `products/portfolio/cases/bay-async.md`
- Modify: `products/portfolio/cases/say-realtime.md`

**Interfaces:**
- Consumes: Task 1 case structure, Task 2 writing pattern, claims `centurion.bay-async-backend` and `centurion.say-realtime-ai`.
- Produces: technical proof for the two Centurion resume bullets.

- [ ] **Step 1: Rewrite BAY with an explicit ownership boundary**

State that Kim Daejeong led order/product/inventory backend, async worker, retry, test/CI, and onboarding scope, but did not own the whole Centurion backend. Explain the synchronous failure coupling, the API/worker boundary, delayed completion trade-off, and the absence of verified latency or exactly-once metrics. Preserve TaskIQ, RabbitMQ, retry, Object Mother tests, Docker CI, pagination, and onboarding evidence.

- [ ] **Step 2: Rewrite SAY with an explicit co-led boundary**

State that the realtime session/provider/translation-audio cluster was co-led, not solely owned. Explain zombie session cost, reconnect race, provider differences, explicit lifecycle/GC TTL, provider abstraction, and abstraction/staggered-pipeline complexity. Preserve sequence matching, structured-output fallback, dev/prod separation, migration documentation, and boundary tests. State that public realtime traffic, latency, and availability metrics are unavailable and that HTTP telemetry does not represent full WebSocket coverage.

- [ ] **Step 3: Verify both cases**

```bash
for f in products/portfolio/cases/bay-async.md products/portfolio/cases/say-realtime.md; do
  test "$(rg -c '^## ' "$f")" -eq 8
done
rg -n 'Centurion 전체|공동|trade-off|한계|exactly-once|WebSocket' products/portfolio/cases/bay-async.md products/portfolio/cases/say-realtime.md
uv run python scripts/validate_workspace.py
git diff --check -- products/portfolio/cases/bay-async.md products/portfolio/cases/say-realtime.md
```

Expected: each case has eight headings; ownership and measurement limits are explicit; validator passes.

- [ ] **Step 4: Commit the Centurion cases**

```bash
git add products/portfolio/cases/bay-async.md products/portfolio/cases/say-realtime.md
git commit -m "docs: deepen Centurion portfolio cases"
```

### Task 4: Rewrite The Engineering Standard Case

**Files:**
- Modify: `products/portfolio/cases/be-template.md`

**Interfaces:**
- Consumes: claims `be-template.backend-standard` and `be-template.agent-context`.
- Produces: technical proof for the BE Template selected project.

- [ ] **Step 1: Apply the eight-section case structure**

State that the template and agent context system were designed and built as owned scope. Explain the repeated setup/context cost and the constraint that tenancy, ID, auth, and storage choices vary by project.

- [ ] **Step 2: Add the decision and trade-off narrative**

Describe the decision to keep a stable layered core while exposing variable choices as explicit options. Contrast this with project-by-project copying, which is initially faster but drifts, and an overly generic framework, which raises adoption cost. Preserve DI, transaction boundary, Pyright, ADR, conventions, runbook, contract tests, Hub-and-Spoke routing, and automation skills. State that adoption count and saved setup hours are not yet measured.

- [ ] **Step 3: Verify and commit**

```bash
test "$(rg -c '^## ' products/portfolio/cases/be-template.md)" -eq 8
rg -n 'My Scope|stable|option|drift|adoption|측정' products/portfolio/cases/be-template.md
uv run python scripts/validate_workspace.py
git diff --check -- products/portfolio/cases/be-template.md
git add products/portfolio/cases/be-template.md
git commit -m "docs: deepen BE Template portfolio case"
```

Expected: eight headings, owned scope, option trade-off, and measurement limit are present; validator passes before commit.

### Task 5: Rewrite The Agent Operations Case

**Files:**
- Modify: `products/portfolio/cases/mediness-ops.md`

**Interfaces:**
- Consumes: claims `mediness.product-operations` and `mediness.daily-briefing`.
- Produces: technical and operating proof for the resume differentiator.

- [ ] **Step 1: Apply the eight-section case structure**

State that product schedule/issue/release operation was led and the workflow/daily briefing system was built and operated. Explain the prior dependence on meetings and personal memory, distributed collaboration sources, and the need to keep human product decisions separate from agent aggregation.

- [ ] **Step 2: Add alternatives, failure modes, and limits**

Explain why another manually maintained status document would preserve the same synchronization cost. Describe the selected decision/SPEC/WP/release pipeline, daily activity aggregation, stale/conflicting source risk, blocker triage, human decision boundary, and version snapshot. Preserve the verified same-day generation-quality blocker response. State that time saved and adoption rate are not measured.

- [ ] **Step 3: Verify and commit**

```bash
test "$(rg -c '^## ' products/portfolio/cases/mediness-ops.md)" -eq 8
rg -n 'My Scope|human|stale|conflict|same-day|측정' products/portfolio/cases/mediness-ops.md
uv run python scripts/validate_workspace.py
git diff --check -- products/portfolio/cases/mediness-ops.md
git add products/portfolio/cases/mediness-ops.md
git commit -m "docs: deepen agent operations portfolio case"
```

Expected: eight headings, human/agent boundary, stale-data failure mode, verified operating example, and metric limits are present.

### Task 6: Audit Resume-To-Portfolio Coverage

**Files:**
- Modify only if an inconsistency is found: `products/portfolio/cases/README.md`
- Inspect: `products/resume/master/v1/content.md`
- Inspect: `products/resume/claim-map.yaml`
- Inspect: `products/portfolio/cases/*.md`

**Interfaces:**
- Consumes: all previous task outputs.
- Produces: verified coverage between resume selected proof and canonical portfolio cases.

- [ ] **Step 1: Verify selected-project claim coverage**

Run:

```bash
rg -n '^### (Thready|Centurion|BE Template)' products/resume/master/v1/content.md
rg -n '^claim_ids:' products/portfolio/cases/*.md
rg -n 'thready\.|centurion\.(bay|say)|be-template\.' products/resume/claim-map.yaml products/portfolio/cases/*.md
```

Expected: all Thready, Centurion BAY/SAY, and BE Template selected-project claims appear in a case frontmatter `claim_ids` list.

- [ ] **Step 2: Run the final editorial and workspace gates**

```bash
for f in products/portfolio/cases/{thready-rebuild,bay-async,say-realtime,be-template,mediness-ops}.md; do
  test "$(rg -c '^## ' "$f")" -eq 8
done
rg -n '고객사명|provider 실명|팀원 실명|TBD|TODO|FIXME' products/portfolio/cases products/resume/content-contract.md products/portfolio/README.md
uv run python scripts/validate_workspace.py
git diff --check
```

Expected: each case has eight sections; forbidden/placeholder scan returns no matches except policy descriptions; validator passes; diff check has no output.

- [ ] **Step 3: Review the final diff against the design spec**

Confirm all of the following manually:

- Resume contract remains compact and recruiter-first.
- Portfolio cases expose scope, constraints, decisions, alternatives, failure modes, evidence, and limits.
- No case claims stronger ownership than its frontmatter.
- No unverified business outcome or metric was introduced.
- Existing unrelated worktree changes are not staged.

- [ ] **Step 4: Commit a coverage correction only if Task 6 changed a file**

```bash
git add products/portfolio/cases/README.md
git diff --cached --quiet || git commit -m "docs: close resume portfolio claim coverage"
```

If no file changed, do not create an empty commit.
