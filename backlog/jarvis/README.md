---
type: idea
title: Jarvis
description: 개인 wiki를 Obsidian처럼 연결해 보여주고 그 내용으로 대화하는 페이지 + double-clap wake·STT 음성 모드.
status: idea
registered: 2026-07-15
tags: [backlog, jarvis, labs]
---

# Jarvis

## 한 줄

개인 wiki 지식을 graph/backlink로 연결해 보여주는 페이지에, 그 내용을 근거로 대화하는 LLM chat을 붙인다.

## 메모

- Jarvis mode: 아이언맨 방식 wake — 손뼉 두 번(double clap) 감지로 assistant 기상 → STT 음성 대화.
- clap detection·wake word·STT 오픈소스 조사는 착수 시 (후보군 多).
- Evidence 연결: realtime STT/LLM 경험(SAY claim)의 개인 단독 production case가 되고, k8s 1호 워크로드 후보.

## 연결

- [Personal Site Architecture Design](../../docs/superpowers/specs/2026-07-15-personal-site-architecture-design.md) — labs 서비스 프레임워크
- Open questions (착수 시 결정):
  - wiki 공개 범위 — public-safe 큐레이션 subset vs auth 걸린 개인용 (후자면 site non-goal인 auth 해제 필요, Supabase auth 후보).
  - 대화·임베딩 저장 위치 (Supabase schema `jarvis`).
  - wake 감지의 브라우저 상시 마이크 권한 UX.

## 승격

미정 — 착수 결정 시 spec으로.
