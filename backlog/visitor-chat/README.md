---
type: idea
title: Visitor Profile Chat
description: 방문자(채용 담당자 등)가 김대정에 대해 질문하면 public-safe profile pack을 근거로 답하는 chat.
status: spec
registered: 2026-07-15
tags: [backlog, chat, site, labs]
---

# Visitor Profile Chat

## 한 줄

정적 이력서를 읽는 대신, 방문자가 "김대정은 어떤 엔지니어인가요?"를 직접 물어볼 수 있는 근거 기반 chat.

## 메모

- 설계는 이미 확정 상태 — RAG chat 설계(2026-07-02)와 prototype 설계(2026-07-04)가 존재하고, site spec Phase 2의 labs 기능 1호로 지정됨.
- 스택: Vercel AI SDK + assistant-ui. runtime 확정 (2026-07-17): **site 내장 — Vercel serverless API route** (k8s는 외부 labs 서비스 전용).
- curated Q&A fallback 포함, public-safe claim만 답변 근거로 사용.
- UX 패턴 확정 (2026-07-16): **전 페이지 우하단 런처(채널톡 패턴) + `/chat` 풀 대화 화면(GPT형, 근거 rail 포함)**. root hero는 meta 표를 유지하고 chat을 고정 배치하지 않는다. 프로토타입은 D2 Profile 프로젝트의 `root-phase2-prototype.html`(런처 포함)과 `chat-page-prototype.html`.
- 답변 구조 3층 (2026-07-16): ① 답변 텍스트(claim 표현만, 프로젝트 언급은 inline link) ② evidence chip(claim ID — 출처 증명) ③ related link(언급된 프로젝트의 case/route로 가는 탐색 동선). chat이 사이트 전체의 관문 역할을 하도록 답변마다 다음 행동을 제공한다.

## 연결

- [Profile RAG Chat Design (2026-07-02)](../../docs/superpowers/specs/2026-07-02-profile-rag-chat-design.md)
- [Visitor Profile Chat Prototype Design (2026-07-04)](../../docs/superpowers/specs/2026-07-04-visitor-profile-chat-homepage-prototype-design.md)
- [Personal Site Architecture Design](../../docs/superpowers/specs/2026-07-15-personal-site-architecture-design.md) — Phase 2

## 승격

site Phase 1 완료 후 착수 (`wip`) 예정.
