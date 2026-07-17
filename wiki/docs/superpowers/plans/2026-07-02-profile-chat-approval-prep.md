# Profile Chat Approval Prep Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make the profile/resume source documents and Profile RAG Chat spec consistent enough to approve implementation safely.

**Architecture:** This is a documentation/source-of-truth preparation plan, not the chat implementation itself. First commit the profile/resume evidence source set that the chat spec depends on, then refine the chat spec so it uses a public knowledge pack, three-stage safety, and public-safe citation labels.

**Tech Stack:** Markdown source-of-truth docs, Git, local grep/verification commands.

## Global Constraints

- Respond and write public-facing notes in Korean by default, while keeping file names, commands, and technical terms in their original language.
- Do not expose customer names, credentials, raw private conversations, exact infrastructure values, or internal operational secrets.
- Keep `profile/` as stable canonical source of truth and `docs/resume/` as the long evidence/workspace area.
- Do not revert unrelated dirty worktree changes.
- Use separate commits for source document stabilization and chat spec refinement.

---

## Why This Task Order

1. Source documents must be tracked before the chat spec can depend on them.
   - Current risk: `docs/resume/06-*` files are untracked, but the Profile RAG Chat spec references them as source documents.
   - If implementation starts now, another worker can check out the repo and fail to find part of the retrieval source set.
   - Task 1 fixes this by committing the evidence/source-of-truth documents first.

2. Raw evidence should not become runtime RAG input by accident.
   - Current risk: `06-project-work-log.md` is a raw work-stream ledger, not polished public copy.
   - It is useful for building summaries, but unsafe as direct visitor-facing retrieval context.
   - Task 2 fixes this by introducing a derived public knowledge pack and making the raw work log build-time evidence only.

3. Safety must happen before and after generation.
   - Current risk: a late-only output filter lets the answer generator see raw or low-confidence chunks.
   - Public portfolio chat needs stricter boundaries because it can be asked about clients, infrastructure, metrics, or private company context.
   - Task 2 changes safety into `ingest sanitizer -> retrieval filter -> output guard`.

4. Citation labels should be public-safe.
   - Current risk: returning raw internal paths as citations can expose repository structure and make the UI feel internal-tool-like.
   - Task 2 separates public citation labels from internal source paths.

5. The approval gate should happen before the implementation plan.
   - Current risk: writing the implementation plan now would bake in unresolved source and safety decisions.
   - Task 3 verifies commit order, tracked sources, and spec safety rules before any chat code is planned.

## File Structure

| Path | Responsibility |
| --- | --- |
| `docs/resume/06-workspace-project-audit.md` | Tracked workspace project evidence source for profile/chat retrieval planning |
| `docs/resume/06-project-work-log.md` | Tracked raw work-stream source; not direct public RAG source after spec refinement |
| `docs/resume/06-impact-case-candidates.md` | Tracked public-safe impact case shortlist |
| `docs/resume/06-strengths-and-traits.md` | Tracked strengths/traits and positioning guardrails |
| `profile/*.md` | Stable profile source summaries already updated from workspace analysis |
| `context/*.md` and `context/manifest.yaml` | Current-state and routing summaries already updated from workspace analysis |
| `docs/resume/02-*.md`, `04-*.md`, `05-*.md`, `README.md` | Resume evidence and public-copy drafts already updated from workspace analysis |
| `rules/document-routing.md` | Routing rules already updated to include workspace audit/JD numbering |
| `docs/superpowers/specs/2026-07-02-profile-rag-chat-design.md` | Chat design spec to refine before implementation approval |

## Task 1: Stabilize Profile/Resume Evidence Source Commit

**Files:**
- Stage/commit: `AGENTS.md`
- Stage/commit: `README.MD`
- Stage/commit: `context/current-state.md`
- Stage/commit: `context/index.md`
- Stage/commit: `context/manifest.yaml`
- Stage/commit: `context/profile.md`
- Stage/commit: `docs/resume/02-company-work-evidence.md`
- Stage/commit: `docs/resume/04-resume-content-brief.md`
- Stage/commit: `docs/resume/05-contribution-ax-positioning-draft.md`
- Stage/commit: `docs/resume/README.md`
- Stage/commit: `docs/resume/06-workspace-project-audit.md`
- Stage/commit: `docs/resume/06-project-work-log.md`
- Stage/commit: `docs/resume/06-impact-case-candidates.md`
- Stage/commit: `docs/resume/06-strengths-and-traits.md`
- Stage/commit: `profile/README.md`
- Stage/commit: `profile/capabilities.md`
- Stage/commit: `profile/career.md`
- Stage/commit: `profile/contribution.md`
- Stage/commit: `profile/identity.md`
- Stage/commit: `profile/writing.md`
- Stage/commit: `rules/document-routing.md`

**Interfaces:**
- Consumes: current uncommitted workspace analysis and profile updates.
- Produces: a tracked source set that the chat design can safely reference by path.

- [ ] **Step 1: Inspect current source document status**

Run:

```bash
git status --short
```

Expected: the files listed above are modified or untracked, and `docs/superpowers/specs/2026-07-02-profile-rag-chat-design.md` is already committed in `bcb115d`.

- [ ] **Step 2: Verify no markdown whitespace errors**

Run:

```bash
git diff --check
```

Expected: no output and exit code `0`.

- [ ] **Step 3: Verify the new `06-*` docs are tracked candidates**

Run:

```bash
git status --short docs/resume/06-workspace-project-audit.md docs/resume/06-project-work-log.md docs/resume/06-impact-case-candidates.md docs/resume/06-strengths-and-traits.md
```

Expected:

```text
?? docs/resume/06-impact-case-candidates.md
?? docs/resume/06-project-work-log.md
?? docs/resume/06-strengths-and-traits.md
?? docs/resume/06-workspace-project-audit.md
```

- [ ] **Step 4: Run a secret-oriented text scan over the source set**

Run:

```bash
rg -n -i "password|secret|credential|database_url|api[_ -]?key|connection string|day_password|openai-api-key|keyvault|실제값" profile context docs/resume AGENTS.md README.MD rules -S
```

Expected: only guardrail/policy references are returned. If any concrete credential, token, URL credential, password value, or private key material appears, remove or redact it before staging.

- [ ] **Step 5: Stage the source-of-truth update only**

Run:

```bash
git add AGENTS.md README.MD context/current-state.md context/index.md context/manifest.yaml context/profile.md docs/resume/02-company-work-evidence.md docs/resume/04-resume-content-brief.md docs/resume/05-contribution-ax-positioning-draft.md docs/resume/README.md docs/resume/06-workspace-project-audit.md docs/resume/06-project-work-log.md docs/resume/06-impact-case-candidates.md docs/resume/06-strengths-and-traits.md profile/README.md profile/capabilities.md profile/career.md profile/contribution.md profile/identity.md profile/writing.md rules/document-routing.md
```

Expected: no terminal output.

- [ ] **Step 6: Review staged file list before committing**

Run:

```bash
git diff --cached --name-only
```

Expected: exactly the staged source-of-truth files from this task, and no `docs/superpowers/specs/2026-07-02-profile-rag-chat-design.md`.

- [ ] **Step 7: Commit the source-of-truth update**

Run:

```bash
git commit -m "docs: add workspace resume evidence"
```

Expected: one new commit that tracks the `06-*` docs and the profile/resume routing updates.

- [ ] **Step 8: Verify the commit scope**

Run:

```bash
git show --stat --oneline --name-only HEAD
```

Expected: the commit contains only the source-of-truth and resume/profile evidence files from this task.

## Task 2: Refine Profile RAG Chat Spec For Public-Safe Approval

**Files:**
- Modify: `docs/superpowers/specs/2026-07-02-profile-rag-chat-design.md`

**Interfaces:**
- Consumes: tracked profile/resume evidence source set from Task 1.
- Produces: approved-ready chat design spec that can be used by the later implementation plan.

- [ ] **Step 1: Update source policy from raw docs to public knowledge pack**

Modify `docs/superpowers/specs/2026-07-02-profile-rag-chat-design.md` so the source section distinguishes:

```markdown
## Source Documents

The first release builds a public knowledge pack from the evidence-docs-included scope. The runtime chat does not read every raw evidence document directly.
```

Add a source table with these roles:

```markdown
| Source | Runtime Use |
| --- | --- |
| `profile/*.md` | Direct public knowledge source |
| `context/profile.md` | Direct compact profile source |
| `docs/resume/04-resume-content-brief.md` | Curated source for homepage/resume framing |
| `docs/resume/05-contribution-ax-positioning-draft.md` | Curated source for BE/Infra/AX framing |
| `docs/resume/06-workspace-project-audit.md` | Evidence source; only summarized chunks enter runtime pack |
| `docs/resume/06-impact-case-candidates.md` | Evidence source; only public-safe case summaries enter runtime pack |
| `docs/resume/06-strengths-and-traits.md` | Evidence source; only positioning and guardrails enter runtime pack |
| `docs/resume/06-project-work-log.md` | Build-time evidence only; not a direct runtime RAG source |
```

- [ ] **Step 2: Add explicit public knowledge pack artifact**

Add a section after `Source Documents`:

```markdown
## Public Knowledge Pack

The implementation creates a derived public knowledge pack before retrieval. The pack is the only runtime retrieval input.

Initial artifact path:

- `data/profile-chat/knowledge-pack.json`

Each entry must include:

```ts
type PublicKnowledgeEntry = {
  id: string
  publicTitle: string
  publicLabel: string
  internalSourcePath: string
  headingPath: string[]
  content: string
  visibility: "public" | "public-summary"
  confidence: "High" | "Medium"
}
```
```

- [ ] **Step 3: Replace late-only safety with three-stage safety**

Replace the architecture flow with:

```text
Approved markdown sources
  -> ingest sanitizer
  -> public knowledge pack
  -> /api/profile-chat
    -> input classifier
    -> retrieval filter
    -> answer generator
    -> output guard
    -> response with public citations
       or curated fallback answer
```

Add component rows:

```markdown
| `ingest sanitizer` | removes or blocks raw internal details before runtime indexing |
| `retrieval filter` | excludes internal-note/low-confidence chunks from model context |
| `output guard` | refuses or rewrites unsafe generated answers before returning them |
```

- [ ] **Step 4: Split public citation label from internal source path**

Change the response type to:

```ts
type ProfileChatCitation = {
  label: string
  title: string
  heading?: string
  internalSourcePath?: string
}

type ProfileChatResponse = {
  answer: string
  mode: "rag" | "fallback" | "refusal"
  confidence: "high" | "medium" | "low"
  citations: ProfileChatCitation[]
  suggestedQuestions: string[]
}
```

Add this rule:

```markdown
Public UI shows `label`, `title`, and optional `heading`. `internalSourcePath` is for development/admin diagnostics and must not be rendered in public visitor UI.
```

- [ ] **Step 5: Resolve the frontend stack open decision for phase 1**

In `Open Decisions`, move frontend stack from unresolved to resolved:

```markdown
- Phase 1 assumes a Next.js App Router homepage with a server route at `/api/profile-chat`. If the homepage later becomes static-only, the same API contract moves to a serverless function without changing the UI contract.
```

Keep these as still open:

```markdown
- Whether the first RAG is lexical-only or uses embeddings.
- Which LLM provider and deployment target to use.
- Whether citations should be visible by default or expandable.
```

- [ ] **Step 6: Add tests for public knowledge pack safety**

In `Testing`, add:

```markdown
7. Unit test that `06-project-work-log.md` is allowed for build-time extraction but excluded from runtime retrieval input.
8. Unit test that public citations render labels and titles without exposing internal source paths.
9. Unit test that low-confidence or internal-note entries cannot be sent to the answer generator.
```

- [ ] **Step 7: Verify the spec has no placeholders and no markdown whitespace errors**

Run:

```bash
rg -n "T[B]D|TO[D]O|PLACE[H]OLDER|\\?\\?\\?|FIX[M]E" docs/superpowers/specs/2026-07-02-profile-rag-chat-design.md
git diff --check -- docs/superpowers/specs/2026-07-02-profile-rag-chat-design.md
```

Expected:

- `rg` exits `1` with no matches.
- `git diff --check` exits `0` with no output.

- [ ] **Step 8: Commit the refined spec**

Run:

```bash
git add docs/superpowers/specs/2026-07-02-profile-rag-chat-design.md
git commit -m "docs: refine profile rag chat safety design"
```

Expected: one new commit with only the chat design spec modified.

## Task 3: Approval Gate Review

**Files:**
- Read: `docs/superpowers/specs/2026-07-02-profile-rag-chat-design.md`
- Read: latest `git log --oneline -3`

**Interfaces:**
- Consumes: Task 1 and Task 2 commits.
- Produces: a go/no-go checkpoint for writing the actual implementation plan.

- [ ] **Step 1: Confirm commit sequence**

Run:

```bash
git log --oneline -4
```

Expected top commits include:

```text
<new> docs: refine profile rag chat safety design
<new> docs: add workspace resume evidence
bcb115d docs: design profile rag chat
c88a6ce docs: initialize profile workspace
```

- [ ] **Step 2: Confirm there are no untracked source docs required by the spec**

Run:

```bash
git status --short docs/resume docs/superpowers/specs/2026-07-02-profile-rag-chat-design.md
```

Expected: no untracked `docs/resume/06-*` docs.

- [ ] **Step 3: Run final design approval checks**

Run:

```bash
rg -n "docs/resume/06-project-work-log.md.*Direct|runtime RAG source|internalSourcePath.*public visitor" docs/superpowers/specs/2026-07-02-profile-rag-chat-design.md
git diff --check
```

Expected:

- The spec states `06-project-work-log.md` is build-time evidence only, not direct runtime retrieval input.
- The spec states `internalSourcePath` must not render in public visitor UI.
- `git diff --check` exits `0`.

- [ ] **Step 4: Decide next action**

If all checks pass, proceed to write the actual implementation plan for the chat feature in a new plan file:

```text
docs/superpowers/plans/YYYY-MM-DD-profile-rag-chat-implementation.md
```

If any check fails, fix Task 1 or Task 2 before writing the implementation plan.
