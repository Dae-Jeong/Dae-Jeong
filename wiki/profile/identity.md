---
type: profile
title: Identity
description: Canonical personal category, positioning, bio, and branding guardrails.
timestamp: 2026-09-01
tags: [identity, positioning, branding]
---

# Identity

## Brand Hierarchy

| Level | Canonical value |
| --- | --- |
| Brand identity | **Maker** |
| Primary category | Tech Lead |
| Supporting role | Backend Engineer |
| **Dual role** | **Product Owner** (2026-08-10 user-confirmed — 병기하되 primary를 대체하지 않는다) |
| **Self-definition (회사별 소개)** | **Product Engineer** — 2026-09-03 user-confirmed. 브랜드 정체성(Maker)을 대체하지 않고 회사별 소개 첫 줄에서 "무엇을 하는 사람인가"를 답한다 |
| Specialty | AI Product Systems |
| Differentiator | **고객이 돈을 내는 이유를 찾고, 제품 판단부터 구현·운영까지 연결한다** + 제품·회사 업무를 잇는 Agent-readable Workflow |
| Supporting narrative | Vision AI -> PM -> Backend -> AI Product/Agent Workflow |

## Canonical One-Line

> 가능성을 기회로 바꾸고, 제품으로 가치를 전하는 메이커 김대정입니다.

## Brand Line Application

- 위 `Canonical One-Line`을 public brand line으로 사용한다 (2026-09-01 user-confirmed).
- 브랜드 문장의 의미 흐름은 `가능성 발견 → 기회 전환 → 제품을 통한 가치 전달`이다. 구현 수단보다 기회를 포착하고 제품으로 가치를 전달하는 Maker 정체성을 먼저 말한다.
- `Maker`는 브랜드 정체성이며 채용 직함이 아니다. 채용 역할 표기는 `Tech Lead · Backend Engineer`를 유지한다.
- 이 문장은 홈 hero와 이력서·포트폴리오의 소개에 사용하되 경력 행·역할 label을 대체하지 않는다.
- Vision AI Engineer → PM → Backend Engineer 전환을 직무 나열이 아니라, 제품에 더 크게 기여하기 위해 필요한 역할과 역량을 확장해온 서사로 표현한다.
- 공개 이력서에서는 `Tech Lead`를 primary, `Backend Engineer`를 supporting role로 사용한다.

## 확장형 한 문장 (2026-09-03 신설, user-confirmed)

> 가능성을 제품으로 만들고, 끝까지 책임지는 Product Engineer 김대정입니다.

- `Canonical One-Line`은 바꾸지 않는다. 이 문장은 회사별 지원본(포트폴리오 hero·이력서 소개 첫 줄)에서만 쓰는 확장형이다. 홈 hero와 공통 소개는 canonical 그대로다. Product Engineer 관점의 브랜딩 전체는 [branding-product-engineer.md](branding-product-engineer.md)가 소유한다.
- 구조: 메이커 문장의 움직임(가능성 → 제품 → 가치)을 뼈대로, Product Engineer의 닻(결과·책임)을 술어로. "고객이 돈을 내는"은 Differentiator 줄의 표현을 그대로 가져온 사실 후킹이다.
- 버린 표현: `기회를 결제하는 제품으로`(명사 3단 반복·주어 불명확, AI 번역투), `백엔드로 책임지는`(헤더의 공고 직무명이 이미 백엔드를 말하므로 중복), `고객이 돈을 내는 제품으로`(자기소개 첫 줄에서는 날것으로 읽히고 목적어 안에 관형절이 겹침 → 결제 사실은 둘째 문장 `고객이 구독하는 AI 제품`으로).
- 15초 문장의 첫 사실(기획자 출신)은 바로 뒤 문장 `기획자로 시작해 백엔드로 왔고, 지금은 고객이 구독하는 AI 제품을 만들고 운영합니다.`가 잇는다. Product Engineer 뒤에 슬래시로 다른 직함을 붙이지 않는다(Dual Track 규칙과 동일).

## 기술 주장의 축

엔지니어로서 반복해서 지키는 축은 **성능·보장·신뢰·멱등·정합·설계**다. canonical은 [engineering-keywords.md](engineering-keywords.md). "끝까지 책임진다"의 실체가 이 여섯 축이다.

## 관통 질문 (2026-08-11 신설, user-confirmed)

> **"AI가 구현을 점점 더 많이 맡을수록, 사람이 끝까지 책임져야 하는 층을 어떻게 지킬 것인가?"**

소개(L1)의 착지로 쓰는 브랜드 자산. 백엔드 선택 판단(previous-career.md role-continuity,
user-confirmed)에서 도출한 것으로 차용이 아니다. 이 문단이 질문의 canonical이며,
각 공개 surface의 실제 표현은 [site content SoT](../products/site/content-sot.md)를 따른다.
>
> *(v5.2, 2026-08-11 — "무엇을 왜"는 의문사 스태킹 번역투라 제거. [persuasive-writing §9](../rules/persuasive-writing.md))*

## English

> I’m Daejeong Kim, a maker who turns possibilities into opportunities and delivers value through products.

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
- ✅ 이력서 최상단은 **Tech Lead → Backend Engineer** 순서로 고정한다
- ❌ `Backend Engineer / PO`처럼 **슬래시로 나열하지 않는다** — 두 직군에 걸친 사람으로 읽힌다
- ❌ PO를 primary로 올리지 않는다 — 4,000 커밋이 설명되지 않는다

## Short Bio

고객 문제를 실제 매출이 발생하는 제품으로 만들고 운영해 왔다. 제품 판단과 실행을 잇기 위해 backend·AI·핵심 frontend를 직접 구축하며, 최근에는 제품별 Decision→release 운영과 회사 업무의 맥락을 agent와 사람이 함께 읽는 AX 구조 설계에도 참여하고 있다. 그 실행 기반인 Backend Template과 agent context는 직접 구축했다.

## Positioning Logic

1. `Maker`는 고객 문제를 실제 매출이 발생하는 제품으로 만들고 운영하는 사람이라는 브랜드 프레임이다.
2. 채용 시장에서는 Tech Lead의 판단·실행 책임과 Backend Engineer의 기술 기반을 분리해 명확히 표기한다.
3. Backend credibility와 AI product runtime·quality system 경험으로 전문 영역을 증명한다.
4. Agent workflow는 별도 직군이 아니라 제품 개발과 회사 업무의 맥락을 실행·검증·사람의 판단으로 잇는 차별점으로 제시한다.
5. PM/Vision AI 경험은 product-system 관점의 배경으로만 사용한다.
6. 리드 경험은 "고객이 돈을 내는 이유를 찾고, 무엇을 만들지 정한 뒤 제품 판단·구현·출시·운영을 정렬한다"는 작동 방식으로 서술한다. Director 등 직함으로 표현하지 않는다.

## Guardrails

- `Backend Architect`, `AX Engineer`, `AI Agent Engineer`를 sole primary category로 사용하지 않는다.
- `Maker`를 경력 직함·채용 직군·검색 태그로 사용하지 않는다.
- Tech Lead는 primary positioning으로 사용하되 등재 직함이라고 단정하지 않는다. PO·AI agent는 병행 역할로만 설명한다.
- 기업부설연구소장 등재 사실은 evidence에만 보존하고 공개 resume·homepage·portfolio에는 표기하지 않는다.
- 특정 병원/헬스케어 산업에 identity를 제한하지 않는다.
- 공통 소개에서는 `데이터 정합성`, `비동기 복구` 같은 구현 메커니즘을 역할처럼 나열하지 않는다. 해당 기술은 관련 경력·프로젝트 상세에서만 설명한다.
- 회사 AX는 설계 참여 범위로 표현한다. MEDINESS 플랫폼 직접 구현, 전사 업무 통합 완료, agent의 자율 의사결정·배정·승인·release로 확대하지 않는다.
- 근거 없는 `단독`, `완전 해결`, 성능 배수, business outcome을 사용하지 않는다.

Evidence: [career claims](../evidence/claims/career.yaml), [project claims](../evidence/claims/README.md)
