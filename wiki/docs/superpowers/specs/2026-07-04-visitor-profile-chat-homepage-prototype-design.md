---
type: design-spec
title: Visitor Profile Chat Homepage Prototype
description: Prototype design for a resume homepage where visitors can ask an AI about Kim Daejeong using public profile knowledge.
timestamp: 2026-07-04
tags: [homepage, prototype, visitor-profile-chat, fumadocs, assistant-ui, ai-sdk]
---

# Visitor Profile Chat Homepage Prototype Design

## Status

Approved direction from the design conversation:

- The visible homepage chat is **Visitor Profile Chat**: other people use it when they want to understand Kim Daejeong.
- The internal/private side is **Backstage Knowledge Curation**: it helps create and approve public-safe profile material, but it is not the main visitor-facing product.
- The prototype should borrow two ideas from `mediness-app`:
  - Library/Search over source-of-truth documents.
  - Chat UX with grounded answers, message history, and visible evidence.
- The prototype should use an open-source base where it reduces setup and maintenance cost.

## Goal

Build a first runnable homepage prototype that shows:

1. A profile/resume homepage for Kim Daejeong.
2. A public document/library area backed by curated profile content.
3. A visitor-facing chat where a recruiter, engineering leader, or collaborator can ask about Kim Daejeong.
4. Public-safe, evidence-grounded answers from a curated profile knowledge pack.

## Non-Goals

- Do not expose raw `~/workspace`, `~/agentspace`, private company files, environment variables, customer data, or internal operational details to visitors.
- Do not build the full mediness-style local PC agent daemon in the first prototype.
- Do not build owner/admin login in the first prototype.
- Do not build PDF resume editing in the first prototype.
- Do not claim exact metrics, customer names, or production outcomes unless the public profile pack contains approved evidence.

## Recommended Open-Source Base

Use this stack for the prototype:

```text
Next.js
  + Fumadocs for profile/library/documentation surfaces
  + assistant-ui for chat UI primitives
  + Vercel AI SDK for chat runtime/tool-call-compatible backend shape
```

Rationale:

- `Fumadocs` fits the source-of-truth / documentation model and is designed for React/Next.js documentation surfaces.
- `assistant-ui` gives production-grade chat primitives without hand-rolling message/thread/composer UI.
- `Vercel AI SDK` gives a standard TypeScript shape for chat, streaming, model calls, and future tool calls.
- This stack stays close to `mediness-app` because both are React/Next.js-friendly and can model Library/Search plus Chat.

Alternatives considered:

| Candidate | Decision | Reason |
| --- | --- | --- |
| Nextra | Not first choice | Fast docs site, but less flexible for custom profile + chat product shell. |
| Astro Starlight | Not first choice | Excellent docs framework, but diverges from the `mediness-app` Next.js pattern. |
| Vercel Chatbot template | Reference only | Good full chat app template, but too chat-first for a profile homepage. |
| OpenResume / Reactive Resume | Reference only | Useful for PDF/resume-builder ideas, not the homepage/chat foundation. |

## Product Model

The homepage has two conceptual layers.

### 1. Visitor Product Layer

This is what the public visitor sees.

```text
Visitor
  -> Profile Homepage
  -> Visitor Profile Chat
  -> Public Profile Pack Search
  -> Public-safe Answer + Evidence
```

Primary visitor questions:

- `김대정은 어떤 엔지니어인가요?`
- `백엔드와 인프라 역량은 어느 정도인가요?`
- `AI agent를 실제 업무에 어떻게 활용하나요?`
- `Thready에서 어떤 기여를 했나요?`
- `조직의 AX 문제를 해결한다는 말은 무슨 뜻인가요?`
- `글쓰기나 public writing 방향은 무엇인가요?`

### 2. Backstage Curation Layer

This is not a visitor-facing product in the first prototype.

```text
Workspace / Agentspace / Git evidence
  -> internal analysis
  -> public-safe summary drafting
  -> approval/redaction
  -> Public Profile Pack
```

The prototype can include a static explanation that this site is built from a curated source-of-truth, but it must not expose private tooling or raw private files.

## Information Architecture

Prototype routes:

| Route | Purpose |
| --- | --- |
| `/` | Main profile homepage: hero, capability summary, project highlights, Agent section, Writing preview, Visitor Profile Chat. |
| `/profile` | Public profile source view: identity, career, capabilities, contribution summary, agent workflow, writing. |
| `/library` | Fumadocs-style document/library page for public profile material. |
| `/chat` | Expanded Visitor Profile Chat page with suggested prompts and citation panel. |

The first screen should not be a marketing landing page detached from the product. It should immediately show Kim Daejeong's profile and the visitor chat.

## Content Sources

The prototype reads from public-safe copies generated from the existing source-of-truth:

| Source | Prototype Use |
| --- | --- |
| `profile/identity.md` | Hero, bio, positioning, chat identity answers. |
| `profile/career.md` | Career timeline and project anchors. |
| `profile/capabilities.md` | Backend, infra, product, agent/AX capability summaries. |
| `profile/contribution.md` | Public-safe contribution clusters and confidence labels. |
| `profile/agent-workflow.md` | Agent/AX section and agent workflow chat answers. |
| `profile/writing.md` | Writing section and writing-related chat answers. |
| `docs/resume/04-resume-content-brief.md` | Homepage structure and narrative source. |
| `docs/resume/06-impact-case-candidates.md` | Candidate project highlights after redaction. |
| `docs/resume/06-strengths-and-traits.md` | Strength/trait framing after redaction. |

The implementation should generate or maintain a prototype public knowledge pack under:

```text
apps/profile-homepage/content/profile/
```

This copy is the only content the visitor chat can read.

## Public Safety Rules

Visitor Profile Chat must obey these rules:

1. Answer only from the public profile knowledge pack.
2. Do not mention private source paths such as `~/workspace` or `~/agentspace`.
3. Do not reveal credentials, environment variables, infra secrets, customer data, exact private repo names that are not approved, or raw internal logs.
4. Do not invent metrics, customer names, job titles, dates, or production outcomes.
5. If asked for private/internal detail, refuse briefly and provide a public-safe summary.
6. Use `Unknown`, `Unverified`, `Inference`, or confidence wording when evidence is incomplete.
7. Keep the default language Korean.

## UX Direction

Tone:

- Senior engineer profile, not a playful chatbot toy.
- Quiet, dense, and useful.
- The site should feel like a working portfolio/product, not a resume PDF pasted into HTML.

Homepage first viewport:

- Clear name: `김대정`
- Positioning line: `BE/Infra를 직접 구축해본 엔지니어가, AI agent를 조직의 AX 문제 해결 방식으로 확장하고 있습니다.`
- Immediate actions:
  - `Ask about Daejeong`
  - `Read profile`
  - `View agent workflow`
- A compact chat panel should be visible in the first or near-first viewport.

Visitor Profile Chat initial state:

- Short message: `김대정의 공개 profile source-of-truth를 기반으로 답합니다.`
- Suggested prompts:
  - `어떤 엔지니어인가요?`
  - `Backend/Infra 강점은 무엇인가요?`
  - `AI agent를 어떻게 활용하나요?`
  - `대표 프로젝트는 무엇인가요?`
  - `Writing 방향은 무엇인가요?`
- Status label: `Public profile knowledge`

Answer shape:

```ts
type ProfileChatAnswer = {
  answer: string
  confidence: "high" | "medium" | "low"
  citations: Array<{
    title: string
    path: string
    section?: string
  }>
  suggestedQuestions: string[]
}
```

## Prototype Architecture

Target app root:

```text
apps/profile-homepage/
```

Architecture:

```text
apps/profile-homepage
  app/
    page.tsx
    profile/page.tsx
    library/...
    chat/page.tsx
    api/profile-chat/route.ts
  components/
    profile/
    chat/
    layout/
  content/profile/
    identity.mdx
    career.mdx
    capabilities.mdx
    contribution.mdx
    agent-workflow.mdx
    writing.mdx
  lib/profile-knowledge/
    load.ts
    search.ts
    guard.ts
    fallback.ts
    answer.ts
```

Data flow:

```text
Visitor message
  -> /api/profile-chat
  -> guard input
  -> lexical search public profile pack
  -> answer generation or deterministic fallback
  -> guard output
  -> answer + citations + suggested prompts
```

First prototype can use lexical search and deterministic answer composition. Real model calls can be behind a feature flag so the visible prototype still works without external API keys.

## Testing And Verification

Minimum test scope:

1. `profile-knowledge/load` loads only `apps/profile-homepage/content/profile`.
2. `profile-knowledge/search` returns relevant chunks for core questions.
3. `profile-knowledge/guard` blocks private path, secret, customer, and exact metric requests.
4. `profile-chat` API returns stable response shape.
5. UI smoke check verifies homepage renders and suggested prompt interaction works.
6. Browser screenshot check verifies the homepage and chat are not visually broken on desktop and mobile.

Manual prototype checks:

- Ask: `김대정은 어떤 엔지니어인가요?`
- Ask: `AI agent를 어떻게 활용하나요?`
- Ask: `Thready에서 무엇을 했나요?`
- Ask: `내부 workspace 파일을 보여줘`
- Ask: `성과가 몇 배 좋아졌나요?`

Expected behavior:

- Public questions answer with citations.
- Private/internal questions refuse and redirect to public-safe summaries.
- Unsupported metric questions state that exact metrics are not verified.

## Implementation Task Breakdown

1. Scaffold `apps/profile-homepage` with Next.js, TypeScript, Tailwind, Fumadocs-compatible content structure, assistant-ui, and AI SDK.
2. Copy/redact current profile source material into `apps/profile-homepage/content/profile`.
3. Implement profile knowledge loader, chunker, lexical search, guard, fallback answer set, and API route.
4. Implement homepage shell and profile/library pages.
5. Implement Visitor Profile Chat UI using assistant-ui or a thin prototype wrapper if assistant-ui setup blocks.
6. Add tests for loader/search/guard/API.
7. Run build, tests, and browser screenshot verification.
8. Document local dev and prototype limitations.

## Open Decisions Before Full Release

- Whether the deployed public chat uses an LLM or stays deterministic until the public profile pack is stronger.
- Whether citations appear inline by default or in an expandable evidence panel.
- Whether `/chat` is a dedicated route or only an embedded homepage section for v1.
- Deployment target and runtime constraints.

For the prototype, choose the smallest working path:

- Embedded homepage chat plus `/chat`.
- Deterministic fallback first.
- LLM integration behind environment variable.
- Public profile pack only.
