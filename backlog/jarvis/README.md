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
- Evidence 연결: realtime STT/LLM 경험(SAY claim)의 개인 단독 production case.
- 배치 확정 (2026-07-17, 당일 2차 개정): **UI는 site 내장 + 전용 backend는 `be/`(FastAPI, Render free 배포)**. backend 분리 근거 — wiki 인덱싱 파이프라인·RAG·대화 메모리는 serverless 부적합(장시간 작업·60초 타임아웃), FastAPI backend 자체가 주력 스택 공개 증거. 제약: Render cold start 30~60초(warm ping UX), 상태는 전부 Supabase pgvector(Render Postgres 30일 만료 — 사용 금지, `wiki:pricing/render`). 브라우저 측 구성(react-force-graph·Web Speech·kokoro-js)은 OSS 조사 그대로 유효.

## 연결

- [OSS 후보 조사](oss-research.md)
- [Personal Site Architecture Design](../../docs/superpowers/specs/2026-07-15-personal-site-architecture-design.md) — labs 서비스 프레임워크
- Open questions (착수 시 결정):
  - wiki 공개 범위 — public-safe 큐레이션 subset vs auth 걸린 개인용 (후자면 site non-goal인 auth 해제 필요, Supabase auth 후보).
  - 대화·임베딩 저장 위치 (Supabase schema `jarvis`).
  - wake 감지의 브라우저 상시 마이크 권한 UX.
  - 대화 언어 — 한국어 음성이면 TTS 선택 재검토 필요 (kokoro-js 한국어 ⚠️ 미지원 추정, [OSS 조사](oss-research.md) 참조).

## 승격

미정 — 착수 결정 시 spec으로.
