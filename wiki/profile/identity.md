---
type: profile
title: Identity
description: Canonical personal category, positioning, bio, and branding guardrails.
timestamp: 2026-07-14
tags: [identity, positioning, branding]
---

# Identity

## Brand Hierarchy

| Level | Canonical value |
| --- | --- |
| Primary category | Backend Engineer |
| **Dual role** | **Product Owner** (2026-08-10 user-confirmed — 병기하되 primary를 대체하지 않는다) |
| Specialty | AI Product Systems |
| Differentiator | **만들면서 무엇을 만들지도 함께 정한다** + Agent-readable Engineering Workflow |
| Supporting narrative | Vision AI -> PM -> Backend -> AI Product/Agent Workflow |

## Canonical One-Line

> AI 제품을 만들고, 무엇을 만들지도 함께 정하는 백엔드 엔지니어.

## 관통 질문 (2026-08-11 신설, user-confirmed)

> **"AI가 구현을 점점 더 많이 맡을수록, 사람이 끝까지 책임져야 하는 층을 어떻게 지킬 것인가?"**

소개(L1)의 착지로 쓰는 브랜드 자산. 백엔드 선택 판단(previous-career.md role-continuity,
user-confirmed)에서 도출한 것으로 차용이 아니다. 문안 canonical은
[dual-track-copy v6](../backlog/platform-profile-consolidation/dual-track-copy-draft.md)가 소유한다.
>
> *(v5.2, 2026-08-11 — "무엇을 왜"는 의문사 스태킹 번역투라 제거. [persuasive-writing §9](../rules/persuasive-writing.md))*

## English

> Backend Engineer who builds AI products and decides what to build.

## Dual Track 근거와 경계

user-confirmed(2026-08-10): "백엔드 엔지니어 / PO 혼용해도 좋을 것 같아".

**왜 병기가 성립하는가** — 두 축 모두 실측 근거가 있다.

| 축 | 실측 근거 |
| --- | --- |
| Backend Engineer | thready 1,180 · BAY-BE-API 856 · NEXUS 755 · SAY/PROTON 848 · CENTURION-BE-API 381 커밋 등 **누적 4,000건 이상** ([audit](../evidence/audits/workspace-project-audit.md)) |
| Product Owner | 기업부설연구소장, 제품팀 운영 리드, 스펙·이슈·릴리스 게이트 설계, 품질 판정 기준 수립 |

**왜 병기가 위험한가** — 채용 시장에서 직함 병기는 초점을 흐린다. "둘 다 합니다"는 "둘 다 어중간합니다"로 읽힐 수 있다.

**그래서 병기 방식을 고정한다.**

- ✅ **한 문장으로 묶는다** — "만들고, 무엇을 만들지도 함께 정한다". 두 축이 **하나의 희소성**으로 읽혀야 한다
- ✅ 검색·직군 매칭이 필요한 필드(플랫폼 직무 태그, 이력서 최상단 카테고리)는 **Backend Engineer 단독**을 유지한다
- ❌ `Backend Engineer / PO`처럼 **슬래시로 나열하지 않는다** — 두 직군에 걸친 사람으로 읽힌다
- ❌ PO를 primary로 올리지 않는다 — 4,000 커밋이 설명되지 않는다

## Short Bio

FastAPI/NestJS 기반 product backend, AI generation quality, async/realtime processing, Azure/Terraform deployment를 다뤄왔다. 최근에는 제품 운영과 engineering standard를 agent-readable workflow로 구조화하고 있다.

## Positioning Logic

1. Backend credibility를 먼저 제시한다.
2. AI product runtime과 quality system 경험으로 전문 영역을 좁힌다.
3. Agent workflow는 별도 직군이 아니라 engineering execution의 차별점으로 제시한다.
4. PM/Vision AI 경험은 product-system 관점의 배경으로만 사용한다.
5. 리드 경험은 "무엇을 왜 만들고 어떤 기준으로 운영할지 결정한 뒤, 사람·agent·시스템의 실행을 정렬한다"는 작동 방식으로 서술한다. Director 등 직함으로 표현하지 않는다.

## Guardrails

- `Backend Architect`, `AX Engineer`, `AI Agent Engineer`를 sole primary category로 사용하지 않는다.
- ~~Tech Lead, PO, AI agent 관련 역할은 공식 직함처럼 나열하지 않고 병행 역할로 설명한다.~~
  → **2026-08-10 개정**: **PO는 dual role로 병기한다** (위 Dual Track 참조). 단 병기 방식은 "한 문장으로 묶기"로 고정하며, 슬래시 나열과 primary 승격은 계속 금지한다. Tech Lead·AI agent 역할은 종전대로 병행 역할로만 설명한다.
- 특정 병원/헬스케어 산업에 identity를 제한하지 않는다.
- 근거 없는 `단독`, `완전 해결`, 성능 배수, business outcome을 사용하지 않는다.

Evidence: [career claims](../evidence/claims/career.yaml), [project claims](../evidence/claims/README.md)
