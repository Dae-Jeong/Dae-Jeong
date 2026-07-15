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
- 스택: Vercel AI SDK + assistant-ui. runtime은 serverless 또는 k8s 1호 워크로드로 착수 시 결정.
- curated Q&A fallback 포함, public-safe claim만 답변 근거로 사용.

## 연결

- [Profile RAG Chat Design (2026-07-02)](../../docs/superpowers/specs/2026-07-02-profile-rag-chat-design.md)
- [Visitor Profile Chat Prototype Design (2026-07-04)](../../docs/superpowers/specs/2026-07-04-visitor-profile-chat-homepage-prototype-design.md)
- [Personal Site Architecture Design](../../docs/superpowers/specs/2026-07-15-personal-site-architecture-design.md) — Phase 2

## 승격

site Phase 1 완료 후 착수 (`wip`) 예정.
