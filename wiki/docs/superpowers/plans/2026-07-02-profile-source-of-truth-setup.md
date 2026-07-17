# Profile Source Of Truth Setup Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a mediness-inspired source-of-truth structure for Kim Daejeong's personal profile, resume homepage, agent workflow, and JD analysis work.

**Architecture:** Keep `context/` as the thin router, `profile/` as the canonical personal source of truth, `docs/resume/` as the working analysis/output area, and `rules/` as the routing policy. Add root `AGENTS.md` so future agent sessions know which documents to read first.

**Tech Stack:** Markdown, YAML frontmatter, local Codex/agent routing conventions.

## Global Constraints

- Respond in Korean by default.
- Keep `docs/resume/` as existing resume/JD/homepage workspace.
- Do not duplicate long evidence across files; summarize and link to source documents.
- Mark unverifiable facts as `Unknown`, `Unverified`, `Inference`, or `Assumption`.
- Do not copy secrets, private raw conversations, or sensitive company data.

---

### Task 1: Add Repository Routing

**Files:**
- Create: `AGENTS.md`
- Create: `context/index.md`
- Create: `context/manifest.yaml`
- Create: `context/current-state.md`
- Create: `context/profile.md`
- Create: `rules/document-routing.md`

**Interfaces:**
- Consumes: `docs/resume/README.md`, `docs/resume/*.md`
- Produces: stable entry points for future agent sessions

- [ ] Add root `AGENTS.md` that routes resume/homepage/JD/AX tasks through `context/manifest.yaml`, `context/index.md`, and `profile/README.md`.
- [ ] Add `context/index.md` with read order, source-of-truth rules, and routing table.
- [ ] Add `context/manifest.yaml` with role/task flows for profile, resume, agent, writing, and JD analysis work.
- [ ] Add `context/current-state.md` with current project state and next steps.
- [ ] Add `context/profile.md` as the short canonical profile snapshot.
- [ ] Add `rules/document-routing.md` to define where new facts and work products belong.

### Task 2: Add Profile Source Files

**Files:**
- Create: `profile/README.md`
- Create: `profile/identity.md`
- Create: `profile/career.md`
- Create: `profile/capabilities.md`
- Create: `profile/contribution.md`
- Create: `profile/agent-workflow.md`
- Create: `profile/writing.md`

**Interfaces:**
- Consumes: `docs/resume/01-oopy-resume-source-analysis.md`, `02-company-work-evidence.md`, `03-agent-workflow-evidence.md`, `04-resume-content-brief.md`, `05-contribution-ax-positioning-draft.md`
- Produces: canonical profile modules that can feed homepage, resume, and writing drafts

- [ ] Add `profile/README.md` as the profile index.
- [ ] Add `identity.md` for headline, bio, positioning, and public summaries.
- [ ] Add `career.md` for career timeline and project anchors.
- [ ] Add `capabilities.md` for backend, infra, product, agent/AX capabilities.
- [ ] Add `contribution.md` for company project contribution framing and confidence levels.
- [ ] Add `agent-workflow.md` for public draft of how the user uses agents.
- [ ] Add `writing.md` for writing themes and article backlog.

### Task 3: Connect Existing Resume Workspace

**Files:**
- Modify: `README.MD`
- Modify: `docs/resume/README.md`

**Interfaces:**
- Consumes: new `context/` and `profile/` files
- Produces: human-readable entry points

- [ ] Replace `README.MD` placeholder with project overview and document map.
- [ ] Update `docs/resume/README.md` to link back to `profile/` and clarify that resume docs are working artifacts.
- [ ] Verify all new files exist and contain parseable frontmatter where appropriate.

