---
type: idea
title: Blog Setup
description: site scaffold + /blog + /write-post skill — AI가 글을 쓰는 git 기반 블로그.
status: spec
registered: 2026-07-15
tags: [backlog, blog, site]
---

# Blog Setup

## 한 줄

marinkim.xyz의 `/blog`를 git 기반 MDX로 세팅하고, AI가 초안을 쓰는 발행 파이프라인을 만든다.

## 메모

- 범위 확정: `site/` scaffold + `/blog` + `/write-post` skill.
- 오픈소스 베이스는 사용자 선택 대기 — 후보 비교는 `wiki:nextjs-blog-starters` (2026-07-15 조사, Fumadocs 1순위 추천).
- AI 글쓰기 흐름: 주제 지시 → agent가 초안 MDX 생성(frontmatter + `status: draft`) → public-safety·claim 상한 체크 → git diff 검수 → `status: published` 커밋 = 발행. 업로드 UI 없음.

## 연결

- [Personal Site Architecture Design](../../docs/superpowers/specs/2026-07-15-personal-site-architecture-design.md)
- `wiki:nextjs-blog-starters`

## 승격

베이스 확정 시 착수 (`wip`) — Phase 1 task 문서로 상세화.
