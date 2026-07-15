---
type: backlog
title: Idea Backlog
description: 떠오른 기획·아이디어를 등록하고 상태를 추적하는 단일 inbox. 착수 확정 시 spec/task로 승격한다.
timestamp: 2026-07-15
tags: [backlog, ideas, planning]
---

# Idea Backlog

아이디어의 단일 등록 공간. 운영 규칙:

1. 아이디어가 나오면 표에 한 줄 추가한다 (등록일 필수).
2. 착수가 확정되면 spec/task 문서로 승격하고 여기에는 링크와 상태만 남긴다.
3. 상세 섹션은 내용이 생긴 아이디어에만 추가한다 — 미리 만들지 않는다.

Status: `idea`(등록) → `spec`(설계 확정) → `wip`(착수) → `done` · `hold` · `drop`

## Ideas

| Id | 한 줄 | Status | 등록 | 링크 |
| --- | --- | --- | --- | --- |
| blog-setup | site scaffold + `/blog` + `/write-post` skill — OSS 베이스 선택 대기 | spec | 2026-07-15 | [site 설계](../docs/superpowers/specs/2026-07-15-personal-site-architecture-design.md), `wiki:nextjs-blog-starters` |
| jarvis | wiki 연결 뷰 + 근거 chat + double-clap wake·STT 음성 — labs 서비스·k8s 1호 후보 | idea | 2026-07-15 | 아래 상세 |

## blog-setup

- 범위: `site/` scaffold + `/blog` + `/write-post` skill. 베이스는 사용자 선택 대기 — 후보 비교는 `wiki:nextjs-blog-starters` (2026-07-15 조사, Fumadocs 1순위 추천).
- AI 글쓰기 흐름: 주제 지시 → agent가 초안 MDX 생성(frontmatter + `status: draft`) → public-safety·claim 상한 체크 → git diff 검수 → `status: published` 커밋 = 발행. 업로드 UI 없음.

## jarvis

- 개념: 개인 wiki 지식을 Obsidian처럼 연결해 보여주는 페이지(graph/backlink 뷰) + 그 내용을 근거로 대화하는 LLM chat.
- Jarvis mode: 아이언맨 방식 wake — 손뼉 두 번(double clap) 감지로 assistant 기상 → STT 음성 대화. clap detection·wake word·STT 오픈소스 조사는 착수 시.
- Evidence 연결: realtime STT/LLM 경험(SAY claim)의 개인 production case가 되고, k8s 1호 워크로드 후보.
- Open questions (착수 시 결정):
  - wiki 공개 범위 — public-safe 큐레이션 subset vs auth 걸린 개인용 (후자면 site non-goal인 auth 해제 필요, Supabase auth 후보).
  - 대화·임베딩 저장 위치 (Supabase schema `jarvis`).
  - wake 감지의 브라우저 상시 마이크 권한 UX.
