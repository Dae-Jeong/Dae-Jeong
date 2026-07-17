---
type: implementation-plan
title: Site Phase 1 Stack And Structure
description: marinkim.xyz Phase 1의 publish 기술 스택과 site/ 프로젝트 구성 — Tier 2 구현 사양.
timestamp: 2026-07-17
tags: [site, stack, structure, phase1, plan]
---

# Site Phase 1 Stack And Structure

상위 설계: [Personal Site Architecture Design](../specs/2026-07-15-personal-site-architecture-design.md). 이 문서는 Tier 2 구현 사양만 다룬다.

## Publish 스택 (Phase 1)

| 계층 | 선택 | 상태 |
| --- | --- | --- |
| 프레임워크 | Next.js (App Router) + TypeScript | 확정 (spec 승계) |
| 스타일링 | **Tailwind CSS v4** — `@theme`에 Mono 토큰 계약을 CSS 변수로 정의 | 확정 (2026-07-17) |
| 패키지 매니저 | pnpm | 확정 |
| 콘텐츠 파이프라인 | **미정** — `lib/content.ts` 어댑터로 격리해 결정이 구현을 막지 않게 함. 확정 시 어댑터만 교체 (1순위 후보 Fumadocs, `wiki:nextjs-blog-starters`) | 보류 |
| 폰트 | IBM Plex Mono (Google Fonts) + Pretendard Variable | 확정 (토큰 계약) |
| 이력서 PDF | 기존 Playwright 렌더 artifact를 export로 복사 | 확정 |
| export 스크립트 | Python — public: true claim 필터, `site/content/{resume,portfolio,services}` + `site/public/resume.pdf` 생성 | 확정 |
| 배포 | Vercel (Root Directory=`site`) + marinkim.xyz, git push 자동 | 확정 (spec) |
| 분석 | Vercel 기본만 | 확정 (non-goal) |

버전 고정: Next.js·React·Tailwind는 scaffold 시점 최신 안정판으로 설치하고 lockfile로 재현성을 확보한다 (문서에 버전 숫자를 미리 박지 않는다).

## Phase 2 스택 (착수 시 확정)

- Chat (site 내장, serverless): Vercel AI SDK + assistant-ui (spec 확정) · LLM provider/모델은 착수 시 확정 (Claude 우선 검토)
- Jarvis (6차 개정): UI는 site 내장(react-force-graph·Web Speech API/kokoro-js), **backend는 `be/` FastAPI — Render free 배포** (RAG·wiki 인덱싱·대화 메모리). 벡터·상태는 Supabase pgvector `jarvis` schema (Render Postgres 금지). cold start 30~60초 → 페이지 진입 warm ping 설계.
- 인프라 (외부 labs 서비스 전용): k8s (위치 미정, Oracle free 후보) + ingress·cert-manager, platform repo 생성 — site 내장 기능은 k8s를 쓰지 않는다

## site/ 프로젝트 구성

```text
site/
├── package.json / next.config.ts / tsconfig.json / postcss.config.mjs
├── app/
│   ├── layout.tsx            # 폰트·nav/footer·ASK 런처 슬롯
│   ├── globals.css           # @import "tailwindcss" + @theme (Mono 토큰 계약)
│   ├── page.tsx              # /        ← root-phase2 프로토타입 이식
│   ├── resume/page.tsx       # /resume  ← resume-page 프로토타입 이식 (KO/EN 토글)
│   ├── portfolio/{page.tsx, [case]/page.tsx}
│   ├── blog/page.tsx         # 파이프라인 확정 전 빈 목록으로 오픈
│   ├── labs/{page.tsx, [svc]/page.tsx}
│   └── api/                  # Phase 2
├── components/               # nav·footer·ask-launcher·summary-list·proof-grid·career-timeline
├── lib/content.ts            # ★ content 접근 어댑터 — 유일한 파이프라인 교체 지점
├── content/                  # resume/portfolio/services = 파생 전용 · blog = 네이티브
└── public/{resume.pdf, fonts/}
```

## 프로토타입 → 구현 매핑

| D2 프로토타입 (Profile 프로젝트) | 구현 위치 |
| --- | --- |
| root-phase2-prototype.html | `app/page.tsx` + 섹션 컴포넌트 |
| resume-page-prototype.html | `app/resume/page.tsx` |
| index.html (완결형 v2) | 컴포넌트 소스 풀 (부분 재사용) |
| chat-page-prototype.html | Phase 2 `app/chat/page.tsx` |

## Repo 구성 (2026-07-17, spec 5차 개정)

```text
Dae-Jeong/  ← knowledge harness + 완전한 프로젝트 monorepo (7차 개정)
├── profile/ evidence/ products/ backlog/ rules/ …   # harness (기존)
├── site/    # FE + 가벼운 serverless (Next 앱, visitor chat 프록시 포함) — Phase 1 생성, Vercel 배포
├── be/      # jarvis backend (FastAPI — RAG·wiki 인덱싱·대화 메모리) — jarvis 착수 시 생성, Render 배포
├── labs/    # labs 서비스 앱들 — labs/{svc}/ 자립 폴더 (스택 자유·각자 Dockerfile) — 첫 서비스 착수 시 생성, k8s 배포
└── infra/   # 프로젝트 인프라 — 착수 시 생성
    ├── Phase 1: 도메인·DNS·Vercel 구성 (필요 시 Terraform)
    └── k8s 착수 시: 클러스터·ingress·labs 서비스 manifest (단일 관제)

배포 경계 = CI 경로 필터: Vercel은 site/ 변경 시, Render는 be/, k8s 이미지 빌드는 labs/{svc}/ 변경 시.
```

## 원칙

- 미정 결정(blog 베이스·k8s 위치·LLM)은 전부 격리돼 있어 Phase 1 착수를 막지 않는다.
- site는 `site/` 밖 repo 경로를 직접 읽지 않는다 — 유입은 export 스크립트 하나 (spec 안전 경계).
- infra는 배포 구성만 다룬다 — evidence/profile 등 harness 내부에 접근하지 않는다.
- 폴더는 미리 만들지 않는다 — `site/`는 Phase 1 착수 시, `infra/`는 첫 인프라 실체가 생길 때.
