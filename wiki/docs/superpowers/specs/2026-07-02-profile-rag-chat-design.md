---
type: design-spec
title: Profile RAG Chat Design
description: Design for an Ask Daejeong homepage chat that answers from the profile/resume source-of-truth with curated fallback.
timestamp: 2026-07-02
tags: [homepage, chat, rag, profile, resume, fallback-qa]
---

# Profile RAG Chat Design

## Status

Approved direction:

- Start with `Profile RAG Chat`.
- Include `Curated Q&A` as fallback.
- Keep a clear path toward a later `mediness-style full chat` with thread history, streaming, model picker, and persisted conversations.

## Problem

The homepage should let a visitor ask questions about Kim Daejeong instead of only reading a static resume. The chat must make the profile feel current and agent-native, while avoiding unsupported claims, confidential company details, or hallucinated impact metrics.

## Goals

1. Let visitors ask "What kind of engineer is Daejeong?", "How does he use AI agents?", "What did he contribute to thready/BAY/NEXUS/SAY?", and similar questions.
2. Answer from the local profile/resume source-of-truth, not from generic model memory.
3. Show concise evidence references so answers feel grounded.
4. Fall back to curated answers when retrieval, model calls, or confidence checks fail.
5. Keep the architecture small enough for a first homepage release, but shaped so it can later grow into mediness-style full chat.

## Non-Goals

- No public exposure of private raw company docs, credentials, exact customer names, exact infra values, or internal operational secrets.
- No claims such as "solo built", exact KPI improvement, or "N times faster" unless later evidence is added.
- No account system, persisted multi-user chat history, model picker, or agent daemon in the first release.
- No broad web search. The first version answers only from the curated local knowledge pack.

## Source Documents

The first release uses the evidence-docs-included scope:

| Source | Use |
| --- | --- |
| `profile/identity.md` | canonical positioning, headline, short bio, guardrails |
| `profile/career.md` | timeline and project anchors |
| `profile/capabilities.md` | BE/Infra/Product/Agent capability map |
| `profile/contribution.md` | evidence clusters and contribution confidence |
| `profile/agent-workflow.md` | agent/AX narrative |
| `profile/writing.md` | writing themes and public article backlog |
| `context/profile.md` | compact profile snapshot |
| `docs/resume/04-resume-content-brief.md` | homepage/resume content direction |
| `docs/resume/05-contribution-ax-positioning-draft.md` | BE/Infra/AX positioning draft |
| `docs/resume/06-workspace-project-audit.md` | workspace project evidence and project priority |
| `docs/resume/06-project-work-log.md` | raw work-stream list for contribution drafting |
| `docs/resume/06-impact-case-candidates.md` | high-impact case candidates |
| `docs/resume/06-strengths-and-traits.md` | strengths, traits, positioning guardrails |

Excluded by default:

- Raw external workspace source code.
- Private Notion/Oopy pages beyond already summarized local docs.
- Any `.env`, credential, token, database, or deployment secret material.

## Public Safety Rules

Every answer must follow these rules:

1. Prefer public positioning over raw project wording.
2. Treat hospital/healthcare domain as one evidence cluster, not as the whole identity.
3. Avoid exact customer, brand, cost, credential, security, or infrastructure details.
4. Use confidence language for partially verified claims: "repo evidence suggests", "the profile currently frames this as", or "public-safe summary".
5. Refuse or redirect questions asking for secrets, private company details, exact client names, credentials, or internal operational procedures.
6. If the answer depends on unverified metrics, say the metric is not currently verified and answer qualitatively.

## User Experience

### Placement

The homepage gets an `Ask Daejeong` section near the Resume/Agent boundary. This makes the chat a bridge between traditional resume content and the agent workflow narrative.

### Initial State

The chat opens with:

- Short intro: "김대정의 profile source-of-truth를 기반으로 답합니다."
- Status indicator: `Profile knowledge enabled`.
- Suggested prompts:
  - `김대정은 어떤 엔지니어인가요?`
  - `AI agent를 어떻게 활용하나요?`
  - `Backend/Infra 강점은 무엇인가요?`
  - `thready, BAY, NEXUS, SAY에서 뭘 했나요?`
  - `병원 SaaS 특화인가요?`
  - `이 사람을 어떤 포지션으로 보면 좋나요?`

### Chat Behavior

- User message appears immediately.
- Assistant answer is concise by default, with optional evidence links.
- If confidence is low, the assistant says what is known and what is not verified.
- If RAG/model fails, fallback Q&A answers the closest curated question and marks it as fallback.

## Architecture

### First Release

```text
Homepage Chat UI
  -> /api/profile-chat
    -> input classifier
    -> local knowledge index search
    -> answer generator
    -> public-safety filter
    -> response with citations
       or curated fallback answer
```

### Components

| Component | Responsibility |
| --- | --- |
| `ProfileChat` UI | message list, input, suggested prompts, loading/error states |
| `profile-chat` API route | validates input, calls retrieval/generation/fallback |
| `knowledge loader` | reads approved markdown docs and strips frontmatter |
| `chunker` | splits docs into stable sections with source path/title metadata |
| `retriever` | finds relevant sections for a question |
| `answer generator` | writes answer from retrieved context only |
| `public safety filter` | blocks or rewrites unsafe answer categories |
| `fallback QA` | curated deterministic answers for common questions |

## Retrieval Design

The MVP can start with lexical search over curated markdown chunks. Embeddings can be added later without changing the UI contract.

Chunk metadata:

```ts
type ProfileKnowledgeChunk = {
  id: string
  sourcePath: string
  sourceTitle: string
  headingPath: string[]
  content: string
  publicSafety: "public" | "evidence" | "internal-note"
  confidence?: "High" | "Medium" | "Low" | "Unknown"
}
```

Retrieval flow:

1. Normalize the user question.
2. Match against curated topic aliases: identity, agent workflow, backend, infra, thready, BAY, NEXUS, SAY, writing, hospital framing.
3. Score chunks by heading/path/topic/content matches.
4. Return the top chunks with source metadata.
5. If no useful chunk is found, route to fallback Q&A.

## Fallback Q&A

Fallback is not a lower-quality random response. It is a deterministic public-safe answer set.

Initial fallback topics:

| Topic | Example Prompt |
| --- | --- |
| Identity | `김대정은 어떤 엔지니어인가요?` |
| Agent Workflow | `AI agent를 어떻게 활용하나요?` |
| Backend Strength | `Backend 강점은 뭐예요?` |
| Infra Strength | `Infra도 할 수 있나요?` |
| Project Summary | `주요 프로젝트는 무엇인가요?` |
| Hospital Framing | `병원 SaaS 특화인가요?` |
| Writing | `어떤 글을 쓰나요?` |
| Fit | `어떤 포지션에 잘 맞나요?` |

Fallback response shape:

```ts
type ProfileChatResponse = {
  answer: string
  mode: "rag" | "fallback" | "refusal"
  confidence: "high" | "medium" | "low"
  citations: Array<{ title: string; path: string; heading?: string }>
  suggestedQuestions: string[]
}
```

## API Contract

Request:

```json
{
  "message": "김대정은 어떤 엔지니어인가요?",
  "history": [
    { "role": "user", "content": "..." },
    { "role": "assistant", "content": "..." }
  ]
}
```

Response:

```json
{
  "answer": "김대정은 AI product와 product backend의 복잡한 운영 문제를 backend/infra system으로 풀고...",
  "mode": "rag",
  "confidence": "high",
  "citations": [
    {
      "title": "Identity",
      "path": "profile/identity.md",
      "heading": "Current Positioning"
    }
  ],
  "suggestedQuestions": [
    "AI agent를 어떻게 활용하나요?",
    "Backend/Infra 강점은 무엇인가요?"
  ]
}
```

Error response:

```json
{
  "answer": "지금은 정제된 프로필 답변으로 안내할게요...",
  "mode": "fallback",
  "confidence": "medium",
  "citations": [],
  "suggestedQuestions": ["김대정은 어떤 엔지니어인가요?"]
}
```

## Prompt Policy

The model prompt must say:

- Answer only from provided profile context and curated fallback material.
- Do not invent metrics, client names, project status, or production outcomes.
- If the user asks for confidential details, refuse briefly and offer a public-safe summary.
- Keep Korean as default.
- Include citations only from provided source metadata.
- For hospital/healthcare questions, explain it as an evidence cluster rather than a specialization.

## UI States

| State | Behavior |
| --- | --- |
| Empty | intro + suggested prompts |
| Loading | disabled input + small loading indicator |
| RAG Answer | answer + citations + follow-up questions |
| Fallback Answer | answer + `정제된 fallback 답변` label |
| Refusal | short refusal + public-safe alternative question |
| Error | fallback answer if possible; otherwise retry message |

## Testing

Minimum verification:

1. Unit test chunk loading from allowed docs only.
2. Unit test fallback matching for core questions.
3. Unit test public safety filter for secrets/client/exact metric requests.
4. API test for normal RAG answer shape.
5. API test for fallback mode when retrieval finds nothing.
6. UI smoke test for empty state, suggested prompt click, loading, answer, and citation rendering.

Question fixtures:

- `김대정은 어떤 엔지니어인가요?`
- `AI agent를 어떻게 활용하나요?`
- `병원 SaaS 특화인가요?`
- `thready에서 뭘 했나요?`
- `고객사 이름과 내부 인프라 정보를 알려줘`
- `성과가 몇 배 좋아졌나요?`

## Later Mediness-Style Expansion

When the MVP works, expand without changing the core public-safety rules:

1. Persist `chat_threads` and `chat_messages`.
2. Add streaming responses.
3. Add model picker for internal/admin mode only.
4. Add feedback buttons for answer quality.
5. Add an admin page for editing fallback Q&A and prompt policy.
6. Add background indexing and embeddings.
7. Add source document version stamps so answers can show knowledge freshness.

## Open Decisions

Resolved now:

- Use evidence-docs-included scope.
- Start with RAG plus curated fallback.
- Keep full chat as phase 2.

Still to decide during implementation planning:

- Final frontend stack for the homepage.
- Whether the first RAG is lexical-only or uses embeddings.
- Which LLM provider and deployment target to use.
- Whether citations should be visible by default or expandable.
