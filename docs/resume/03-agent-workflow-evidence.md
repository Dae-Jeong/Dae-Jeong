---
type: evidence-note
title: Agent Workflow Evidence
description: Evidence for personal and company agent workflow, OpenDesign harness, MCP, and writing system.
timestamp: 2026-07-02
tags: [agent-workflow, opendesign, mcp, codex, resume]
---

# Agent Workflow Evidence

## Scope

이 문서는 새 이력서 홈페이지의 `Agent` 섹션에 들어갈 재료를 정리한다. 핵심은 "AI agent를 쓴다"가 아니라, 업무를 agent가 읽고 실행할 수 있는 구조로 바꾸는 방식이다.

Checked local sources:

- `/Users/marin/agentspace`
- `/Users/marin/agentspace/mediness-nexus`
- `/Users/marin/agentspace/codex_pr`
- `/Users/marin/workspace/CENTURION_DAY/AGENTS.md`
- `/Users/marin/workspace/CENTURION_DAY/README.md`
- `/Users/marin/personal-workspace/opensource-researcher/open-design/README.md`
- `/Users/marin/Desktop/wiki/agents`

## Agent Operating Model

### Personal Global Agent Rules

Evidence:

- `/Users/marin/Desktop/wiki/agents/README.md` defines the global agent wiki as source of truth for cross-project AI-agent behavior.
- `/Users/marin/Desktop/wiki/agents/_map.md` routes agents through minimal useful context.
- `/Users/marin/Desktop/wiki/agents/project-routing.md` separates global behavior, project `AGENTS.md`, project docs/wiki, task docs, and reference wiki.
- `/Users/marin/Desktop/wiki/agents/hallucination-control.md` defines evidence labels: `Source-backed`, `Code-backed`, `Tool-backed`, `Inference`, `Unknown`.

Resume meaning:

- Agent work is treated as an engineering system with routing, evidence discipline, context budgeting, and uncertainty control.
- This supports a public claim like: "I operate AI agents through explicit source-of-truth maps, project-local rules, and evidence gates."

### Company/Product Source Of Truth In `agentspace`

Evidence:

- `/Users/marin/agentspace/mediness-nexus/README.md:1` through `:5` describes the repo as the source of truth for MediSolve product work, managing product docs, role rules, and agent adapters.
- `/Users/marin/agentspace/mediness-nexus/README.md:27` through `:39` describes the flow: executive/PO baseline artifact -> decisions -> feature/UX/policy contracts -> work package/QA -> product PR evidence.
- `/Users/marin/agentspace/mediness-nexus/README.md:41` through `:60` describes directories for product source of truth, context, design, rules, agent skills, Claude adapters, templates, and archive.
- `/Users/marin/agentspace/mediness-nexus/AGENTS.md:29` through `:45` maps Codex, Claude Code, and future agents to the same source-of-truth flow, with `.agents/skills` as source and `.claude/skills` as adapter.
- `/Users/marin/agentspace/mediness-nexus/AGENTS.md:47` through `:70` documents directory roles and when agents should enter each one.
- `/Users/marin/agentspace/mediness-nexus/AGENTS.md:71` through `:85` lists available local skills: briefing, docs-migrate, dry-run, pm-dashboard-publish, product-cut, review-wp, scaffold-product, spec-to-html.
- `/Users/marin/agentspace/mediness-nexus/AGENTS.md:107` through `:167` defines routing rules for work docs, spec docs, decision docs, logs, archive cuts, and baseline artifacts.

Resume meaning:

- This is a real operational harness for turning product decisions into spec/work/QA/PR artifacts.
- It positions the user as someone who designs the "agent-readable organization layer", not just prompt-by-prompt automation.

Resume-ready bullets:

- Built and maintained a product documentation source-of-truth where Codex/Claude agents share the same context, role routing, skill source, and adapter structure.
- Structured product work into Baseline -> Decision -> Spec -> Work Package -> QA/PR evidence so agents can reason over product state without relying on chat memory.
- Defined document routing rules that separate user-facing contracts, implementation/QA status, decision logs, and archived cuts.

## Multi-Agent Orchestration

Evidence:

- `/Users/marin/agentspace/codex_pr/README.md:1` through `:13` describes a Codex multi-agent orchestration hub that ports a `claude_pr` structure to Codex.
- `/Users/marin/agentspace/codex_pr/README.md:14` through `:54` documents the structure: orchestrator web/source, SDK runner, scripts, project-specific agents/plans/tasks/reports.
- `/Users/marin/agentspace/codex_pr/README.md:56` through `:70` describes requirements and cmux/browser dashboard operation.
- `/Users/marin/agentspace/codex_pr/README.md:72` through `:112` documents SDK commands for health check, watcher, dashboard, and direct task execution.
- `/Users/marin/agentspace/codex_pr/README.md:177` through `:184` records operating notes: SDK path, `codex exec`, auth refresh risk, failed task markers, dashboard MVP capabilities.

Resume meaning:

- This is a concrete local orchestration experiment around task queues, worker prompts, reports, health checks, and dashboards.
- Good public phrasing: "I prototype local multi-agent orchestration around Codex SDK, task files, worker reports, and dashboards."

Risk:

- Do not present this as production-grade unless it is deployed and used by others.
- Public site should call it "local operating harness" or "experimental orchestration workspace" unless stronger evidence is added.

## Project-Level Agent Teams

Evidence:

- `/Users/marin/workspace/CENTURION_DAY/AGENTS.md:42` through `:58` defines backend and frontend agent teams with clear paths.
- `/Users/marin/workspace/CENTURION_DAY/AGENTS.md:60` through `:78` defines design team philosophy and workflow: policy -> UX spec -> Pencil wireframe -> FE implementation.
- `/Users/marin/workspace/CENTURION_DAY/AGENTS.md:80` through `:91` defines planning agents: medical CRM, FHIR data, medical law.
- `/Users/marin/workspace/CENTURION_DAY/AGENTS.md:136` through `:149` repeats design agent call guide and workflow.
- `/Users/marin/workspace/CENTURION_DAY/README.md:22` through `:35` documents project shared MCP servers: Playwright for browser automation/E2E/UI debugging and Docker for container state/log/restart.

Resume meaning:

- Agent operation is embedded into a real product repo, with role-specific paths and deliverables.
- The design workflow is directly relevant to the user's OpenDesign plan.

Resume-ready bullets:

- Defined project-level agent teams for backend, frontend, design, and planning, each with explicit source-code/document ownership.
- Connected UX planning, Pencil wireframes, and frontend implementation through a documented agent handoff.
- Used MCP configuration to make browser automation and Docker operations available to project agents.

## OpenDesign Harness

Evidence:

- `/Users/marin/personal-workspace/opensource-researcher/open-design/README.md:1` through `:8` identifies Open Design as an open-source Claude Design alternative and an agentic design workspace.
- `/Users/marin/personal-workspace/opensource-researcher/open-design/README.md:32` through `:39` describes it as local-first, open-source, design-system/plugin/skill based, producing web/desktop/mobile prototypes, dashboards, artifacts, decks, images, video, HTML/PDF/PPTX/MP4 export.
- `/Users/marin/personal-workspace/opensource-researcher/open-design/README.md:44` through `:107` describes core pages: Home, Automation, Design System, Plugin, Integrations, Studio artifact types.
- `/Users/marin/personal-workspace/opensource-researcher/open-design/README.md:111` through `:141` documents platform compatibility, including Codex CLI MCP install support.
- `/Users/marin/personal-workspace/opensource-researcher/open-design/README.md:149` through `:218` describes prototype/live dashboard/deck artifacts and handoff to Cursor/Codex/Claude Code.

Resume meaning:

- OpenDesign can be positioned as the "design artifact layer" in the personal homepage and future working system.
- It connects the user's backend/agent workflow to frontend/design proof, which is important because the user is backend-strong and expanding into frontend.

Potential homepage section:

- `Open Design Lab`: how product specs become UI prototypes, dashboards, and handoff artifacts.
- `Agent OS`: how AGENTS/docs/skills/MCP/OpenDesign make a repeatable workflow.

Risk:

- Current evidence confirms the OpenDesign repo was pulled and analyzed, not that the user's custom design harness has already been built.
- Public copy should say "I am building/adapting an OpenDesign-based harness" unless implementation exists in this repo later.

## Writing System

Evidence:

- `agentspace/mediness-nexus` contains `briefings/`, `inbox/`, `rules/`, `templates/`, and product docs.
- `/Users/marin/agentspace/mediness-nexus/README.md:62` through `:72` defines PR linkage to baseline/spec/work/QA evidence.
- `/Users/marin/agentspace/mediness-nexus/context/index.md:26` through `:43` defines source-of-truth and volatile information rules.
- `/Users/marin/agentspace/mediness-nexus/context/index.md:45` through `:79` defines when to create context docs and how to route product-specific knowledge.

Resume meaning:

- Writing is not only blog writing. It is operating writing: specs, decisions, work packages, logs, briefings, templates, and postmortem-style evidence.
- This can become the `Writing` section: public posts can be polished versions of internal patterns.

Writing candidates:

- Why `AGENTS.md` is not a prompt file but a project operating contract.
- How to keep AI-agent context small with source-of-truth routing.
- Redis/JTI session guards for multi-service SSO.
- SSE in FastAPI: simple EventManager first, Redis Pub/Sub when scale demands it.
- TaskIQ/RabbitMQ split for API/worker boundaries.
- OpenDesign as a bridge between specs and implementation.

## Public Positioning For Agent Section

Short version:

> I use agents as an engineering operating layer: project rules, source-of-truth docs, task files, MCP tools, design handoff, and verification gates.

Korean version:

> 저는 AI agent를 단순 코딩 보조가 아니라, 제품 문서와 코드베이스를 읽고 실행하는 운영 계층으로 다룹니다. `AGENTS.md`, source-of-truth 문서, task/report 구조, MCP, OpenDesign 기반 design handoff를 통해 요구사항에서 구현과 검증까지 이어지는 흐름을 만듭니다.

## Agent Claims By Confidence

### High Confidence

- Maintains a global/project-local agent instruction system.
- Uses source-of-truth routing and evidence labels to reduce unsupported claims.
- Has company/product documentation harness around baseline, decision, spec, work, QA, and PR evidence.
- Uses project-level `AGENTS.md` to route agents by role and ownership.
- Has local Codex multi-agent orchestration workspace.
- Has OpenDesign repo pulled and identified as the design harness candidate.

### Medium Confidence

- OpenDesign-based custom design harness is planned, not yet implemented in this repo.
- Multi-agent orchestration usage depth should be supported by task/report examples before making strong public claims.

### Unknown

- Which agent workflows are safe to reveal publicly from company context.
- Which screenshots/demos can be shown without exposing internal product or client information.

