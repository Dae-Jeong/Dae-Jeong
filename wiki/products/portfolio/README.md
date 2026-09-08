---
type: index
title: Portfolio Product
description: Resume-selected claims의 문제, 접근, 구현, 운영 깊이를 제공한다.
timestamp: 2026-09-01
tags: [portfolio, cases, product]
---

# Portfolio Product

Portfolio는 resume가 선택한 claim의 깊이를 검증하는 제품이다.

## Active Architecture

- [공용 4종 성과 개편](../resume/revisions/2026-09-08-achievement-refresh/README.md) — 2026-09-08 `/portfolio`의 현재 문안은 `app/fe/content/common/portfolio.json`이다. 고객의 Threads 진입 장벽·제품 구현 → 업무 정책의 백엔드 구현 → 조직 표준 템플릿의 세 축으로 구성했다. 긴 본문과 상태표·처리 단계·Outbox 경계 도식을 함께 보여주며 로컬 검토 중이다.
- [Portfolio V3 Content Specification](v3-content-draft.md) — 개편 전 사례 라이브러리의 구성 기준. 회사별·직군별 패키지와 기존 상세 경로는 유지하며, 현재 공용 순서의 owner로 쓰지 않는다.
- [Role Portfolio Variants](role-variants.md) — 같은 case library를 Product Ownership·Backend·AI Backend·AX/FDE 네 관점으로 선택·정렬하고 읽을 초점을 바꾸는 local-only 단일 문서 초안.
- [Common Document Visual Refresh](../../docs/superpowers/plans/2026-09-02-common-document-visual-refresh.md) — Common Resume·Career Description·CV와 함께 `/portfolio`의 화면 위계·case 경계·A4를 개편하는 현재 계획.

## Historical Revision

- [Portfolio V2 Content Specification](../../archive/portfolio/v2-content-draft.md) — 네 대표 사례를 동일한 system dossier 문법으로 구성했던 이전 구조. Active source가 아닌 archive 기록이다.

## Contract

- Primary reader: engineering manager / senior engineer. Secondary reader: recruiter.
- Resume: 무엇을, 어떤 역할로, 어떤 기술로 했는지 한 줄로 제시
- Portfolio: 왜 필요했는지, 무엇을 선택했는지, 어떻게 구현·운영했는지 설명
- Resume claim을 반복하지 않고 `Problem -> Decision -> Design/Visualization -> Operating Result -> Responsibility -> JD fit`으로 확장한다.
- Portfolio는 resume보다 자세할 수 있지만 더 강한 ownership을 주장할 수 없다.
- 기본 artifact는 `/portfolio` 단일 페이지다. 현재 공용은 `Thready → 업무 정책의 백엔드 구현 → 조직 표준 템플릿`을 선택한다. Memento 등 이전 경력의 자세한 내용은 공용 경력기술서·CV에 유지한다. 기존 상세·직군별·회사별 포트폴리오는 변경하지 않으며, 공용 개편의 승격을 이유로 소급하지 않는다.
- 회사 AX는 구조 설계 참여, 제품 운영은 리드, Backend Template은 직접 설계·구축으로 책임 강도를 분리한다. 현재 공용의 세 번째 축은 조직 표준 템플릿이며 회사 AX는 후속 확장 맥락으로 둔다. Azure·Vercel은 기본 배포·운영 경험의 범위를 넘지 않는다.
- Thready는 기존 채널 운영자의 시간·경험 부족 → 새로운 채널 운영을 돕는 제품·AI 구현 → 소재·생성·승인·발행의 실행 경계로 읽힌다. 고객 한 사례의 팔로워 성장과 시점이 명시된 구독 매출은 별도 제품·팀 결과이며 최신 기능의 단독 인과로 연결하지 않는다. 재구축·평가 도구의 추가 설명은 경력기술서에서 다룬다. 공개 화면에는 corpus·observation·experiment 정확 건수나 자동 학습 주장을 추가하지 않는다.
- 공통 headline은 `가능성을 기회로 바꾸고, 제품으로 가치를 전하는 메이커 김대정입니다.`다. `Maker`는 브랜드 정체성이고, `Tech Lead · Backend Engineer` 역할과 제품 판단·직접 구현·운영 책임은 바로 아래 proof와 case가 증명한다.
- 내부 검증용 claim ID·forbidden copy·limits는 evidence와 case library에만 남기고 공개 문서에서는 자연스러운 역할·결과 문장으로 표현한다.
- claim ID·검증용 limits·내부 taxonomy를 사람이 읽는 본문이나 도식 라벨로 노출하지 않는다. 문단별 `data-claim`은 공용 문안 보존 검사를 위한 renderer metadata로만 사용한다.
- 제목·설명·본문에는 `ch`나 임의의 `px` 기반 `max-width`로 줄 길이를 제한하지 않는다. 문서 컨테이너의 가용 폭을 사용하고 화면 폭에 따라 자연스럽게 줄바꿈한다.
- 현재 공용 문장·순서는 `app/fe/content/common/portfolio.json`, 렌더와 강조는 `app/fe/app/common/`이 소유한다. `app/fe/lib/cases.ts`는 기존 상세·직군별·회사별 표현 기반으로 유지하며, 이 wiki library는 케이스 범위·claim 연결·표현 상한을 소유한다.
- Canonical library: [cases/README.md](cases/README.md)
- Product decisions: [decisions.md](decisions.md)
- Historical visual baseline: [prototypes/v0.1.0/README.md](prototypes/v0.1.0/README.md)

## Visual System

- resume의 monochrome·scanability 계약과 portfolio의 기술 설명 화면을 분리한다. portfolio web은 navy 기반 hero와 의미 기반 accent를 사용한다.
- 화면의 대부분은 navy·white·gray로 유지하고 blue 하나만 주 accent로 사용한다. green은 verified outcome·data, amber는 risk·failure·proposal처럼 판정이 필요한 작은 지점에만 제한한다. case마다 다른 대표색을 배정하지 않는다.
- 각 case는 `case header → 상황 → 문제·대처 → 결과 → system view → 기술 판단 → 담당 범위 → JD fit`의 시각 위계를 공유하지만, 모든 영역을 같은 회색 선·동일한 panel로 평탄화하지 않는다.
- `compact-flow`는 runtime Mermaid 의존 없이 React/CSS code-native diagram으로 렌더한다. 화면·모바일·A4에서 같은 구조를 유지하고, 작은 화면에서는 수직 흐름으로 전환한다.
- A4 print에서는 hero와 dark evidence band를 흰 배경으로 바꾸되 semantic accent와 soft diagram background는 유지해 구분 근거가 사라지지 않게 한다.

회사별·직군별 페이지는 canonical case를 새로 쓰지 않고, 같은 JD·직군 분석 결과로 resume와 동일한 case를 선별·조립한다. 표현 강도는 연결된 claim registry를 넘지 않는다.
