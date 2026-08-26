---
type: index
title: Portfolio Product
description: Resume-selected claims의 문제, 접근, 구현, 운영 깊이를 제공한다.
timestamp: 2026-08-24
tags: [portfolio, cases, product]
---

# Portfolio Product

Portfolio는 resume가 선택한 claim의 깊이를 검증하는 제품이다.

## Active Architecture

- [Portfolio V3 Content Specification](v3-content-draft.md) — `/portfolio`는 60초 안에 `결과·핵심 판단·담당 범위`를 읽을 수 있는 공통 요약본이다. Thready·Company AX·Centurion은 사례별 대표 시각화 한 개와 proof strip만 남기고, 기술 판단·failure handling·검증 근거는 기존 상세 route와 직군별 dossier에서 이어서 읽는다. Memento 결제는 supporting case로 배치한다. Infrastructure dossier는 근거 라이브러리에 보존하되 public master에서 제외한다.
- [Role Portfolio Variants](role-variants.md) — 같은 case library를 5개 직군별로 선택·정렬하고 읽을 초점을 바꾸는 local-only 단일 문서 초안.

## Historical Revision

- [Portfolio V2 Content Specification](v2-content-draft.md) — 네 대표 사례를 동일한 system dossier 문법으로 구성했던 이전 구조.

## Contract

- Primary reader: engineering manager / senior engineer. Secondary reader: recruiter.
- Resume: 무엇을, 어떤 역할로, 어떤 기술로 했는지 한 줄로 제시
- Portfolio: 왜 필요했는지, 무엇을 선택했는지, 어떻게 구현·운영했는지 설명
- Resume claim을 반복하지 않고 `Problem -> Decision -> Design/Visualization -> Operating Result -> Responsibility -> JD fit`으로 확장한다.
- Portfolio는 resume보다 자세할 수 있지만 더 강한 ownership을 주장할 수 없다.
- 기본 공개 artifact는 `/portfolio` 단일 페이지다. `Thready → Company AX → Centurion` 세 대표 case의 결과·핵심 판단·담당 범위와 대표 system visual, `Memento Payment` supporting case를 한 문서에서 읽고 PDF로 변환할 수 있어야 한다. 상세 route는 공통 요약에서 연결된 기술 검증 경로이며, 직군별 포트폴리오는 기존 full dossier를 유지한다.
- Company AX case는 MEDINESS 제품 요구·운영 구조 설계 참여, 제품별 Decision→release 운영 리드, Backend Template·agent context 직접 구축을 하나의 상위 이야기에서 보여주되 책임 강도를 표로 분리한다. Azure·Vercel은 배포 목적지로만 표현하며 infrastructure expertise의 근거로 사용하지 않는다.
- Thready case는 `고객이 돈을 내는 이유 → 팀과 실제 매출이 발생하는 제품 운영 → 제품에 필요한 backend·AI·핵심 frontend 직접 구현 → FastAPI backend 재구축 → BE–AI 경계·STG 검증` 순서로 읽힌다. 매출은 제품·팀 outcome으로, 기술 역할은 제품을 완성하기 위한 직접 구현 범위로 분리한다. 광고 적용은 성과가 아니라 `NEXT · 운영 데이터 수집 중`으로만 표시한다. AI는 코드 분석·반복 구현에 활용했지만 아키텍처·검증 기준·cutover 판단은 사람이 직접 소유한다. 공개 화면에는 corpus·observation·experiment 정확 건수를 쓰지 않고, market evidence·기술 구조·제품 매출 사이의 직접 인과도 만들지 않는다.
- 공통 headline은 `아이디어를 새로운 가치로 실현하는 메이커, 김대정입니다.`다. `Maker`는 브랜드 정체성이고, `Tech Lead · Backend Engineer` 역할과 제품 판단·직접 구현·운영 책임은 바로 아래 proof와 case가 증명한다.
- 내부 검증용 claim ID·forbidden copy·limits는 evidence와 case library에만 남기고 공개 문서에서는 자연스러운 역할·결과 문장으로 표현한다.
- claim ID, 검증용 limits, 내부 taxonomy와 evidence policy는 내부 원장에만 두고 공개 DOM에는 노출하지 않는다.
- 제목·설명·본문에는 `ch`나 임의의 `px` 기반 `max-width`로 줄 길이를 제한하지 않는다. 문서 컨테이너의 가용 폭을 사용하고 화면 폭에 따라 자연스럽게 줄바꿈한다.
- 현재 공개 문장·순서·강조는 `app/fe/app/portfolio/`와 `app/fe/lib/cases.ts`가 표현 SoT로 소유하고, 이 library는 케이스 범위·claim 연결·표현 상한을 소유한다.
- Canonical library: [cases/README.md](cases/README.md)
- Product decisions: [decisions.md](decisions.md)
- Historical visual baseline: [prototypes/v0.1.0/README.md](prototypes/v0.1.0/README.md)

회사별·직군별 페이지는 canonical case를 새로 쓰지 않고, 같은 JD·직군 분석 결과로 resume와 동일한 case를 선별·조립한다. 표현 강도는 연결된 claim registry를 넘지 않는다.
