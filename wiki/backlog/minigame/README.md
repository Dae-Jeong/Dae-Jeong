---
type: idea
title: Minigame Arcade
description: 미니게임 천국(WarioWare) 스타일 — 앱 하나 안에 여러 미니게임을 담는 아케이드를 labs에 올린다.
status: idea
registered: 2026-07-15
tags: [backlog, game, arcade, labs]
---

# Minigame Arcade

## 한 줄

미니게임 천국 스타일의 아케이드 앱 하나를 labs에 올리고, 그 안에 미니게임을 계속 추가한다.

## 메모

- 구조가 labs 프레임워크의 축소판: 아케이드 = 허브(게임 목록·선택 화면), 게임 하나 = 자립 모듈 하나. 게임 추가가 아케이드 코드 수정 없이 되는 내부 registry 계약이 자연스러움.
- 배치 (2026-07-17, 7차 개정 반영): **monorepo의 `labs/minigame/` 자립 폴더**에서 개발, k8s 배포 (`{svc}.marinkim.xyz` + registry 카드). 데이터(리더보드·점수)가 생기면 Supabase schema 추가.
- 개별 게임 목록·첫 게임 컨셉은 미정 — 잡히면 채운다.

## 연결

- [Personal Site Architecture Design](../../docs/superpowers/specs/2026-07-15-personal-site-architecture-design.md) — Hub/Service contract

## 승격

미정 — 게임 컨셉 확정이 선행.
