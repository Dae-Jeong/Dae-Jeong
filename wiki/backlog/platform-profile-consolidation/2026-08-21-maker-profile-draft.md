---
type: draft
title: Maker Profile Platform Draft
description: 홈페이지 Maker identity와 active resume에서 파생한 채용 플랫폼별 게시 문안 초안.
status: superseded
timestamp: 2026-08-21
derived_from:
  - profile/identity.md
  - app/fe/app/page.tsx
  - app/fe/app/resume/resume-view.tsx
  - products/site/content-sot.md
tags: [platform, profile, maker, distribution, draft]
---

# Maker Profile Platform Draft

> **Superseded (2026-08-22)**: 현재 게시 문안은 [Platform Profile Paste Package — Maker v1](2026-08-22-platform-paste-package.md)이 소유한다. 이 문서는 초안 이력으로만 보존한다.

이 문서는 플랫폼에 바로 게시할 canonical이 아니다. 홈페이지와 active resume에서 필요한 내용을
플랫폼 필드에 맞게 덜어낸 **붙여넣기 전 검토본**이다. 사실·수치·역할 강도는 claim registry를
넘지 않으며, 실제 반영 전에는 로그인한 화면에서 필드와 글자 수를 다시 확인한다.

## 1. 공통 기준

| 역할 | 문안 |
| --- | --- |
| 브랜드 소개 | `아이디어를 새로운 가치로 실현하는 메이커, 김대정입니다.` |
| 채용 역할 | `Tech Lead · Backend Engineer` |
| 검색 직군 | Backend Engineer / 백엔드 개발자 |
| 전문 영역 | `AI Product Systems` |
| 허브 | `https://marinkim.xyz` |

`Maker`는 직함이나 직군 태그로 등록하지 않는다. 소개에서만 사용하고, 검색·경력 필드는
`Tech Lead · Backend Engineer`와 검증된 기술 키워드가 맡는다.

공통 소개에서는 맡아온 제품 범위를 평이하게 설명한다. `데이터 정합성`, `비동기 복구`,
`Transactional Outbox` 같은 구현 메커니즘은 직무명이 아니므로 관련 경력·프로젝트 상세에서만 사용한다.

플랫폼이 `공식 직책`과 `headline/역할 설명`을 분리하면 공식 직책 필드는 `Backend Engineer`를
사용하고, headline과 경력 설명에서 `Tech Lead 역할`을 먼저 보여준다. `기업부설연구소장`은
evidence에만 보존하고 공개 profile의 첫 정체성으로 쓰지 않는다.

## 2. 공통 소개 문안

### 기본형 — Wanted · Remember · Groupby

> 아이디어를 새로운 가치로 실현하는 메이커, 김대정입니다.
>
> 기획·QA·마케팅과 Thready 제품 운영을 리드하고, FastAPI 백엔드·AI 생성/평가 시스템·Next.js 핵심 흐름을 직접 구현했습니다. 제품은 2026년 8월 기준 월 약 800만~1,000만원의 구독료 매출이 발생합니다.
>
> 현재 MediSolve AI에서 Tech Lead · Backend Engineer로 여러 제품을 직접 개발하고 운영하고 있습니다.

매출은 제품·팀 outcome이다. `내가 월 매출을 만들었다`, `MRR`, 연환산 수치로 바꾸지 않는다.

### 300자 안쪽 — RocketPunch

> 아이디어를 새로운 가치로 실현하는 메이커, 김대정입니다. 기획·QA·마케팅과 AI 제품 운영을 리드하고, 필요한 백엔드·AI·핵심 화면을 직접 구현합니다. 현재 Tech Lead · Backend Engineer로 여러 제품을 직접 개발하고 운영하고 있습니다. 포트폴리오: https://marinkim.xyz

### LinkedIn headline

> Maker · Tech Lead · Backend Engineer | AI Product Systems | Python · FastAPI

### LinkedIn About — KO

기본형을 사용하고 마지막에 아래 링크만 추가한다.

> Resume & Portfolio → https://marinkim.xyz

### LinkedIn About — EN draft

> I’m Daejeong Kim, a maker who turns ideas into new value.
>
> I lead Thready’s product operations with planning, QA, and marketing, and directly build its FastAPI backend, AI generation and evaluation system, and core Next.js workflows. As of August 2026, the product generates roughly KRW 8–10 million in monthly subscription revenue.
>
> I currently work as a Tech Lead and Backend Engineer at MediSolve AI, directly developing and operating the company’s products.
>
> Resume & Portfolio → https://marinkim.xyz

영문은 publish 전 `allowed_copy_en`과 직함 표현을 다시 검토한다.

## 3. 경력 상세에서 고를 문장

### MediSolve AI — 최신 경력, 가장 넓게

1. **제품 운영·매출** — 기획·QA·마케팅과 Thready 제품 운영을 리드하고 FastAPI 백엔드·AI 생성/평가 시스템·Next.js 핵심 흐름을 직접 구현했습니다. 제품은 2026.08 기준 월 약 800만~1,000만원의 구독료 매출이 발생합니다.
2. **백엔드 재구축** — 기존 frontend와 출시 흐름을 유지한 채 FastAPI backend를 병렬 구축·검증해 전환했습니다. 같은 기준에서 해결된 QA 이슈의 재오픈 비율이 26%p 낮아졌습니다.
3. **AI 서비스 분리와 데이터 전달** — AI application·DB 분리 과정의 STG 이관을 행 수·MD5·참조 무결성·API E2E로 검증하고, Transactional Outbox와 version fence로 지연·중복·역순 전달을 통제했습니다.
4. **의료 제품 backend** — 주문·재고 비동기 backend 구축을 주도하고, 실시간 AI 상담 backend에 공동 주 기여했습니다. 별도의 피부과 운영·예약 시스템에서는 backend architecture와 Admin·Homepage API 구축을 주도했습니다.
5. **회사 인프라·개발 기반** — 회사 Azure를 6개 Terraform state와 400개 이상의 state object로 관리하고 state·plan·live inventory 대조를 apply gate로 운영했습니다. 조직 표준 FastAPI template과 agent context도 구축했습니다.

플랫폼이 짧으면 `1 → 2 → 5`, Backend JD는 `2 → 3 → 5`, Tech Lead JD는
`1 → 4 → 5` 순서로 고른다.

### Memento AI

> Stripe Checkout의 manual capture 기반 선결제를 구축하고 내부 결제 ID로 결제 이력과 Checkout·Webhook을 연결했습니다. 예약 처리 실패 시 provider 상태에 따라 취소·환불하고, 환불 완료 뒤 마일리지와 이용권 상태를 변경하도록 결제 상태 흐름을 정리했습니다.

### STUDIO LAB

> AI 커머스 제품의 prototype부터 v1.0까지 제품 흐름·기능 범위·출시 우선순위를 리드했습니다. 상세 페이지 제작 흐름의 재설계는 특허 「페이지 출력 방법」 등록으로 이어졌고, 제품은 CES 2024 Best of Innovation을 수상했습니다.

### 아이즈솔

> Vision AI 모델과 데이터 pipeline을 제품 기능으로 연결하는 개발·검증에 참여했습니다.

더데이랩스 프리랜서 구간은 법적 경력 필드에는 별도 등록하고, 설명에서는 MediSolve AI 법인
설립 전 제품 개발을 먼저 시작한 stage로 연결한다.

## 4. 플랫폼별 편집안

| 플랫폼 | 넣을 내용 | 이번에 빼는 내용 | 적용 전 확인 |
| --- | --- | --- | --- |
| Wanted | 검색 직군 `백엔드 개발자`, 기본형 소개, MediSolve 1·2·3·5, Memento·STUDIO LAB, 기술·링크 | 5xx 0.3%, 36시간, 37→11, 4,039건, 기업부설연구소장, C# | 텍스트 필드 저장 후 reload하여 실제 `value` 확인 |
| LinkedIn | Maker headline, KO About, Experience, 대표 기술, Resume·Portfolio 링크 | `Backend Engineer · PO` 병렬 headline, 구 회사명·날짜, 정성 문구 | title/company typeahead와 영문 secondary profile 별도 확인 |
| Remember | 소개 두 탭에 기본형 동일 적용, 현재 경력 우선, 15개 skill, 특허·수상·링크 | C#, 구 STUDIO LAB 종료일, 기업부설연구소장 전면 노출 | 커넥트용·채용 서비스용 두 탭 모두 저장 확인 |
| Groupby | 기본형 + 검증 자산 목록, 상세 경력, 전체 skill, 허브 링크 | 구 소개·구 경력, 고객사 실명 | 소개 교체 때 수상·자격·특허 목록이 사라지지 않는지 확인 |
| RocketPunch | 300자형, current project 3건, 현재 경력 3 bullet, 허브 링크 | 학부 프로젝트 우선 노출, C#, 오래된 PM 중심 소개 | 300자 제한과 구직 노출 설정을 별도로 확인 |
| Saramin | Maker 소개, 경력기술서, 스킬, 자격·수상, 포트폴리오 | 빈 자동 요약에 의존, 검증 전 직급·주소 노출 | 로그인 뒤 자기소개 항목·글자 수와 인증 경력 구조 확인 |

### 플랫폼별 대표 프로젝트 선택

- **Thready** — 아이디어·제품 운영·직접 구현·유료 운영 결과
- **Centurion** — 서비스별 backend와 실패·복구 경계
- **Company Infrastructure** — Azure runtime 구조와 Terraform change gate
- **Backend Template** — 적은 인원이 여러 제품을 운영하기 위한 공통 backend·agent 실행 기준

RocketPunch처럼 프로젝트를 따로 받는 플랫폼은 위 네 건 중 앞의 세 건을 먼저 넣는다. 다른
플랫폼은 프로젝트를 중복 등록하지 않고 MediSolve AI 경력 상세의 근거로 사용한다.

## 5. 기술 키워드

우선순위:

1. Python · FastAPI
2. PostgreSQL · MySQL · Redis · RabbitMQ
3. TypeScript · NestJS · Next.js
4. Docker · Azure · Terraform · AWS
5. LLM Evaluation · Product Management · UX

15개 제한 플랫폼의 후보:

`Python, FastAPI, TypeScript, NestJS, PostgreSQL, MySQL, Redis, RabbitMQ, Docker, Azure, Terraform, AWS, LLM Evaluation, Product Management, UX`

`C#`은 사실 오류라 전부 제거한다. Java·Spring Boot는 개인 프로젝트 범위이므로 current role의
대표 skill로 올리지 않는다.

## 6. 적용하지 않을 문구

- `HTTP 5xx 0.3%`
- `36시간 만에 재구축`
- `QA 37% → 11%`
- `Threads 4,039건 분석`을 현재 대표 성과로 사용
- `기업부설연구소장`을 headline·About의 첫 정체성으로 사용
- NEXUS와 DAY/Centurion을 같은 프로젝트로 설명
- Thready 매출을 개인 단독 인과·MRR·ARR로 표현
- Memento를 다국가·구독 결제, exactly-once, 완전한 rollback으로 확대
- 아이즈솔 C# 경험

## 7. 관리 대상과 적용 순서

- 동기화: Wanted · LinkedIn · Remember · RocketPunch · Groupby · Saramin
- 정리: Oopy는 새 문안을 넣지 않고 다른 플랫폼의 링크를 marinkim.xyz로 교체한 뒤 공개 종료 여부를 확인
- 보류: Jumpit은 이력서 미작성 추정 상태이므로 live 확인 전 관리 대상에 추가하지 않음

적용 순서:

1. 플랫폼 live snapshot을 다시 읽는다.
2. 사실 오류(C#·날짜·회사명)부터 고친다.
3. Maker 소개와 최신 경력 상세를 붙여넣는다.
4. skill과 링크를 정리한다.
5. reload 후 field `value`와 공개 profile을 교차 확인한다.
6. 동기화 매트릭스에 반영 시점과 남은 차이를 기록한다.

이 문서의 승인은 **문안 승인**까지만 뜻한다. 실제 플랫폼 저장·공개·구직 상태 변경은 별도
실행 요청이 있을 때 진행한다.
