---
type: handoff
title: Platform Profile Paste Package — Maker v1
description: 홈페이지와 공통 이력서 1차 확정본에서 파생한 채용 플랫폼별 붙여넣기 문안과 적용 체크리스트.
status: ready
timestamp: 2026-08-22
derived_from:
  - profile/identity.md
  - app/fe/app/page.tsx
  - app/fe/app/resume/resume-view.tsx
  - products/site/content-sot.md
  - products/resume/claim-map.yaml
supersedes:
  - backlog/platform-profile-consolidation/2026-08-21-maker-profile-draft.md
  - backlog/platform-profile-consolidation/wanted-paste-package.md
  - backlog/platform-profile-consolidation/linkedin-paste-package.md
tags: [platform, profile, maker, distribution, paste, ready]
---

# Platform Profile Paste Package — Maker v1

이 문서는 Wanted·LinkedIn·Remember·Groupby·RocketPunch·Saramin에 넣을 **현재 문안의 단일 패키지**다.
새 사실을 만드는 문서가 아니라 홈페이지와 공통 이력서를 플랫폼 제약에 맞춰 줄인 파생본이다.

문안 승인과 실제 게시 승인은 분리한다. 이 문서는 붙여넣기 준비까지만 완료했으며, 플랫폼 저장·공개·구직 상태 변경은 별도 실행 요청 뒤 진행한다.
2026-08-22 실행 결과는 [Live 적용 검증](2026-08-22-live-verification.md)과 §9에 기록한다.

## 0. 공통 기준

| 항목 | 기준값 |
| --- | --- |
| 브랜드 문장 | `아이디어를 새로운 가치로 실현하는 메이커, 김대정입니다.` |
| 채용 역할 | `Tech Lead · Backend Engineer` |
| 공식 경력 직무 필드 | `Backend Engineer` |
| 검색 직군 | `Backend Engineer` / `백엔드 개발자` |
| 전문 영역 | `AI Product Systems` |
| 포트폴리오 | `https://marinkim.xyz` |
| Resume | `https://marinkim.xyz/resume` |
| Portfolio | `https://marinkim.xyz/portfolio` |

- `Maker`는 브랜드 정체성이다. 직무 태그나 공식 직책으로 등록하지 않는다.
- `Tech Lead`는 primary positioning이자 실제 수행 역할이지만 법적 고용 직함이라고 단정하지 않는다. canonical 경력 직무는 `Backend Engineer`로 보존하고, 플랫폼의 표시 직책은 UI 용도에 따라 `Tech Lead`를 사용할 수 있다.
- `기업부설연구소장`은 evidence에만 보존하고 공개 headline·About·소개에는 넣지 않는다.
- 제품 매출은 개인 단독 성과가 아니라 제품·팀 outcome으로 표현한다.

### 0.1 경력 메타데이터

| 조직 | 기간 | 직무·형태 |
| --- | --- | --- |
| MediSolve AI | 2025.04–현재 | Backend Engineer · 정규직, Tech Lead 역할·제품 운영 리드 |
| 더데이랩스 | 2025.02–2025.04 | Backend Engineer · 프리랜서, MediSolve AI 법인 설립 전 선행 개발 |
| Memento AI | 2024.10–2025.01 | Backend Engineer · 인턴 합류 후 정규직 전환 |
| STUDIO LAB | 2021.12–2024.01 | AI Engineer → Product Manager(주 역할) → Backend Engineer · 정규직 |
| 아이즈솔 | 2020.08–2021.06 | Vision AI Engineer · 인턴 |

- 공개 연차는 인턴을 제외한 직군 통합 기준 `실무 4년차`다. `백엔드 4년차`로 바꾸지 않는다.
- TellingMe는 개인 프로젝트다. 경력 필드에 넣지 않는다.
- 더데이랩스와 MediSolve AI는 법적 경력 필드에서는 분리하되 설명에서는 법인 설립 전후의 같은 제품 개발 stage로 연결한다.

## 1. 재사용 문안

### 1.1 브랜드 한 문장

```text
아이디어를 새로운 가치로 실현하는 메이커, 김대정입니다.
```

### 1.2 짧은 소개 — 300자 제한 플랫폼

```text
아이디어를 새로운 가치로 실현하는 메이커, 김대정입니다. 현재 MediSolve AI에서 Tech Lead 역할을 맡아 사내 제품을 직접 개발·운영하고 있습니다. 기획·QA·마케팅과 제품의 우선순위를 정하고, Backend Engineer로 백엔드·AI·핵심 화면을 구현합니다. 포트폴리오: https://marinkim.xyz
```

### 1.3 Wanted — 기본 소개

```text
아이디어를 새로운 가치로 실현하는 메이커, 김대정입니다.

고객이 어디서 막히는지 찾고, 기획·QA·마케팅과 다음에 만들 기능과 실험을 정합니다. 필요한 FastAPI 백엔드와 AI 생성·평가 시스템, Next.js 화면은 직접 만들고 실제 사용자가 쓰는 서비스가 될 때까지 운영합니다.

현재 MediSolve AI에서 제품팀의 일정·이슈·릴리스 운영을 리드하고, 맡은 제품의 백엔드·AI·핵심 화면을 직접 개발·운영합니다.
```

### 1.3.1 Remember — 커넥트용 소개

```text
아이디어를 새로운 가치로 실현하는 메이커, 김대정입니다.

고객이 어디서 막히는지 찾고, 기획·QA·마케팅과 무엇을 먼저 만들지 정합니다. 필요한 백엔드·AI·핵심 화면을 직접 만들고, 실제 사용자가 쓰는 서비스가 될 때까지 운영합니다.

현재 MediSolve AI에서 Tech Lead 역할을 맡고 있으며, Backend Engineer로 여러 사내 제품을 직접 개발·운영하고 있습니다.
```

### 1.3.2 Remember — 채용 서비스용 소개

```text
아이디어를 새로운 가치로 실현하는 메이커, 김대정입니다.

MediSolve AI에서 Tech Lead 역할을 맡고, Backend Engineer로 여러 사내 제품을 직접 개발·운영합니다. Thready에서는 기획·QA·마케팅과 제품 운영을 리드하며 FastAPI 백엔드·AI 생성/평가 시스템·Next.js 핵심 흐름을 직접 구현했습니다.

Python·FastAPI를 중심으로 운영 백엔드 재구축, 주문·재고 비동기 처리, AI 실행부·데이터 분리, Azure·Terraform 변경 체계를 다뤄왔습니다.
```

### 1.3.3 Groupby — 소개

```text
아이디어를 새로운 가치로 실현하는 메이커, 김대정입니다.

고객이 어디서 막히는지 찾고, 기획·QA·마케팅과 다음에 만들 기능과 실험을 정합니다. 필요한 FastAPI 백엔드와 AI 생성·평가 시스템, Next.js 핵심 화면은 직접 만들고 실제 사용자가 쓰는 서비스가 될 때까지 운영합니다.

현재 MediSolve AI에서 제품팀의 일정·이슈·릴리스 운영을 리드하고, Backend Engineer로 맡은 제품을 직접 개발·운영하고 있습니다.
```

### 1.4 LinkedIn About — KO

```text
아이디어를 새로운 가치로 실현하는 메이커, 김대정입니다.

고객이 어디서 막히는지 찾고, 기획·QA·마케팅과 무엇을 먼저 만들지 정한 뒤 필요한 백엔드·AI·핵심 화면을 직접 만듭니다. Thready에서는 이 방식으로 제품 운영을 리드해 실제 사용자와 구독료 매출이 발생하는 유료 제품을 팀과 함께 운영하고 있습니다.

출시 뒤 운영도 직접 맡습니다. 다른 구성원이 빠른 검증을 위해 만든 초기 백엔드를 인계받았을 때는 운영 가능한 FastAPI 구조로 다시 만들고, 검증 하네스와 병렬 전환으로 안정성을 확인했습니다. 의료 플랫폼의 주문·재고 worker와 실시간 AI 상담, 회사 Azure·Terraform까지 운영에 필요한 시스템을 다뤄 왔습니다.

현재 MediSolve AI에서 Backend Engineer로 일하며 Tech Lead 역할과 제품 운영을 맡고 있습니다.

Resume · Portfolio → https://marinkim.xyz
```

### 1.5 LinkedIn About — EN draft

```text
I’m Daejeong Kim, a maker who turns ideas into new value.

I turn customer pain into product decisions, align priorities with product, QA, and marketing, and directly build the backend, AI systems, and core workflows needed to ship. At Thready, I lead product operations and helped take the product to paid operation with real users and subscription revenue.

I also rebuild systems for continued operation. I inherited an early backend and rebuilt it into an operable FastAPI system using validation harnesses and a parallel cutover. My work also spans asynchronous order and inventory workers, realtime AI consultation, and Azure/Terraform operations.

I currently work at MediSolve AI as a Backend Engineer, serving in a Tech Lead role and leading product operations.

Resume · Portfolio → https://marinkim.xyz
```

영문은 secondary profile 게시 전에 `allowed_copy_en`과 원어민 문체를 별도로 검수한다.

## 2. 경력 문안 원본

플랫폼 분량에 따라 문장을 고르되 문장 자체의 claim 강도는 바꾸지 않는다.

### 2.1 MediSolve AI — 전체형

**직무 필드**: `Backend Engineer`

**역할 설명 첫 줄**: `Tech Lead · Backend Engineer — 제품 운영 리드`

```text
Tech Lead 역할 · Backend Engineer — 제품 운영 리드

- [제품 운영·직접 구현] 기획·QA·마케팅과 Thready 제품 운영을 리드하고 FastAPI 백엔드·AI 생성/평가 시스템·Next.js 핵심 흐름을 직접 개발·운영했습니다. 제품은 2026.08 기준 월 약 800만~1,000만원의 구독료 매출이 발생합니다.
- [병렬 재구축·검증] 다른 구성원이 빠른 기능 검증을 위해 만든 초기 백엔드를 인계받아 기존 프런트엔드와 출시 흐름을 유지한 채 FastAPI로 병렬 재구축·전환했습니다. 같은 기준의 Jira 집계에서 해결된 QA 이슈의 재오픈 비율이 전환 전보다 26%p 낮게 관측됐습니다.
- [주문·재고 비동기 처리] Centurion BAY의 주문·재고 API와 TaskIQ·RabbitMQ worker 구축을 주도하고, 작업 상태·retry·terminal failure·수동 재처리 경계를 설계했습니다.
- [AI 실행부·데이터 경계] 제품 정책·원장은 product backend가, 생성 lifecycle·실행 상태는 독립 FastAPI application·DB가 소유하도록 분리했습니다. STG 이관을 행 수·MD5·FK·API E2E로 검증하고 Outbox·delivery version fence로 지연·중복·역순 전달이 최신 상태를 덮지 않도록 했습니다.
- [조직 표준·변경 안전성] 조직 표준 FastAPI template과 agent context를 직접 구축했습니다. 회사 Azure 인프라 운영을 담당하며 Shared·B2B·B2C Terraform을 6개 독립 root/state로 관리하고, state snapshot·plan·live inventory 대조로 의도하지 않은 destroy·replace를 apply 전에 차단했습니다.
```

### 2.2 MediSolve AI — 3문장 축약형

```text
- 기획·QA·마케팅과 Thready 제품 운영을 리드하고 백엔드·AI·핵심 프런트엔드를 직접 개발·운영. 제품은 2026.08 기준 월 약 800만~1,000만원의 구독료 매출 발생
- 다른 구성원이 빠른 기능 검증을 위해 만든 초기 백엔드를 인계받아 FastAPI로 병렬 재구축·전환하고 검증 하네스를 선행 구축. 같은 기준의 Jira 집계에서 해결 이슈 재오픈 비율이 26%p 낮게 관측
- 주문·재고 비동기 worker, 제품 원장–AI 실행 분리, 조직 표준 FastAPI template, Azure·Terraform 변경 gate 구축·운영
```

### 2.3 더데이랩스 — 법인 설립 전 stage

```text
Memento AI에서의 개발 성과를 인정받아 MediSolve AI 초기 멤버로 영입됐습니다. 법인 설립 전 더데이랩스 프리랜서로 제품 개발을 선행했고, Centurion backend 저장소의 기본 구조·Config·개발 환경·실행 문서·ISSUE/PR 템플릿을 구성했습니다. 2025.04 MediSolve AI 설립과 함께 Backend Engineer로 정규 합류해 Tech Lead 역할을 맡았습니다.
```

### 2.4 Memento AI

**성과 제목**: `Stripe 선결제부터 Webhook·취소·환불까지 결제 상태 흐름 구축`

```text
- Stripe Checkout의 manual capture 기반 선결제를 구축하고 내부 결제 ID로 결제 이력과 Checkout·Webhook 이벤트를 연결
- 예약 처리 실패 시 PaymentIntent 상태에 따라 취소·환불하고, 환불 완료 뒤 마일리지와 이용권 상태를 변경하도록 결제 상태 흐름 정리
- 다국어 Happy Call을 알림톡·이메일 즉시/예약 발송으로 확장하고 Celery ETA 작업의 취소·재등록·발송 이력 구현
```

### 2.5 STUDIO LAB

**역할**: `Product Manager — AI Engineer → PM(주 역할) → Backend Engineer`

```text
- 커머스 AI 제품의 prototype부터 v1.0까지 제품 흐름·기능 범위·출시 우선순위를 정하는 PM으로 0→1 구간 리드
- 상세 페이지 제작 방식이 특허 「페이지 출력 방법」 등록으로 이어졌고, 제품은 CES 2024 Best of Innovation 수상
- Vision AI 모델 개발에서 시작해 PM과 Backend Engineer로 역할을 확장하며 제품 요구를 기술 실행으로 연결
```

### 2.6 아이즈솔

```text
Vision AI Engineer 인턴으로 인식 모델과 학습 데이터·전처리 pipeline을 제품 기능에 연결하는 개발·검증에 참여했습니다.
```

`C#`, FastAPI backend 단독 구축, 수치 없는 정확도 개선은 넣지 않는다.

## 3. 플랫폼별 붙여넣기

### 3.1 Wanted

| 필드 | 값 |
| --- | --- |
| 직무 | `백엔드 개발자` |
| 직책 | `Tech Lead` |
| 간단 소개 | §1.3 기본 소개 |
| MediSolve 성과 제목 | `유료 AI 제품 운영과 백엔드·인프라 구축` |
| MediSolve 설명 | §2.1 전체형 |
| Memento 성과 제목 | `Stripe 선결제부터 Webhook·취소·환불까지 결제 상태 흐름 구축` |
| STUDIO LAB 성과 제목 | `AI 커머스 제품 0→1과 출시 우선순위 리드` |
| 링크명 | `포트폴리오 · 웹 이력서` |
| 링크 | `https://marinkim.xyz` |

**AI 활용 경험 — 50자 필드**

```text
AI로 분석·구현을 가속하고 테스트·평가 하네스로 결과를 검증
```

추가 필드가 열릴 때만 아래를 순서대로 넣는다.

```text
조직 표준 Backend Template에 agent context·자동화 skill 내장
```

```text
제품 의사결정·QA·릴리스 기록을 agent가 읽는 실행 맥락으로 구조화
```

**스킬 우선순위**

`Python, FastAPI, TypeScript, Next.js, NestJS, PostgreSQL, MySQL, Redis, RabbitMQ, Docker, Azure, Terraform, LLM, 제품 기획, UX`

적용 시 `C#`은 제거한다. Java·Spring Boot는 개인 프로젝트 범위라 current role의 상위 skill로 올리지 않는다.

### 3.2 LinkedIn

**Headline**

```text
Tech Lead · Backend Engineer | AI Product Systems · Python · FastAPI | 아이디어를 새로운 가치로 실현하는 메이커
```

**About**: §1.4 사용

**MediSolve Experience title**: `Backend Engineer`

**MediSolve description**: §2.1 전체형

**이전 경력**: §2.3–§2.6 사용

**대표 보유기술 5개**

1. Python
2. FastAPI
3. Back-End Web Development
4. Software Architecture
5. Large Language Models (LLM)

실제 LinkedIn skill taxonomy에 없는 항목은 PostgreSQL → RabbitMQ → Terraform → Microsoft Azure → Product Management 순으로 대체한다.

**Featured**

- `Thready — 고객 문제에서 유료 제품 운영까지` → `https://marinkim.xyz/portfolio/thready`
- `Portfolio` → `https://marinkim.xyz/portfolio`
- `Resume` → `https://marinkim.xyz/resume`

**English secondary profile**

- Headline: `Tech Lead · Backend Engineer | AI Product Systems · Python · FastAPI | Maker turning ideas into new value`
- About: §1.5
- Experience는 한국어 게시본을 먼저 확정한 뒤 같은 claim 강도로 별도 번역한다.

### 3.3 Remember

- 커넥트용에는 §1.3.1, 채용 서비스용에는 §1.3.2를 넣는다.
- 경력 직무는 `Backend Engineer`, 첫 줄은 `Tech Lead 역할 · 제품 운영 리드`로 구분한다.
- MediSolve는 §2.1, 이전 경력은 §2.3–§2.6을 사용한다.
- 웹사이트·블로그에는 `https://marinkim.xyz`를 넣는다.

**15개 skill**

`Python, FastAPI, TypeScript, Next.js, NestJS, PostgreSQL, MySQL, Redis, RabbitMQ, Docker, Azure, Terraform, LLM, 제품 기획, UX`

플랫폼 사전에 없는 항목은 custom skill 등록 여부를 확인하고, 등록할 수 없으면 `LLM → 머신러닝`, `Next.js → JavaScript` 순으로 대체한다.

### 3.4 Groupby

소개 필드에는 §1.3.3 뒤에 아래 검증 자산만 이어 붙인다.

```text
[수상·특허·자격]
- CES 2024 Best of Innovation · AI 부문 대상 제품 참여
- 특허 「페이지 출력 방법」 등록 10-2898273
- 한국건설생활환경시험연구원(KCL) AI 정확도 부문 인증 통과
- ADsP · 데이터분석 준전문가
```

- MediSolve는 §2.1 전체형, 이전 경력은 §2.3–§2.6을 사용한다.
- live skill은 `TypeScript, Python, NextJS, FastAPI, NestJS, RabbitMQ, MySQL, PostgreSQL, Redis, Azure-DevOps, Docker, Github-Action, Terraform, Pytest, Vercel` 15개다.
- 자기소개 교체 시 기존 수상·특허·자격 목록이 사라지지 않았는지 확인한다.

### 3.5 RocketPunch

**소개**: §1.2 사용

**후속 실무 프로젝트 3건 — 이번 1차 적용에서는 미반영**

1. `Thready — 고객 문제에서 유료 운영까지`
   - 기획·QA·마케팅과 제품 운영 리드, 백엔드·AI·핵심 프런트엔드 직접 구현
   - 2026.08 기준 월 약 800만~1,000만원의 구독료 매출이 발생하는 제품·팀 성과
   - 인계받은 초기 백엔드를 FastAPI로 재구축하고 제품 원장과 AI 실행 경계 분리
2. `Centurion — 의료 제품군의 주문·재고와 실시간 상담 backend`
   - 주문·재고 API·TaskIQ·RabbitMQ worker 구축 주도
   - 실시간 AI 상담의 DELTA·COMPLETE 전사 흐름과 session lifecycle 공동 개발
3. `Company Engineering System — 여러 제품을 운영하는 공통 실행 기준`
   - 조직 표준 FastAPI template과 agent context 직접 구축
   - 제품 요구·QA·릴리스 기록을 agent-readable context로 연결하는 회사 AX 구조 설계 참여
   - Azure·Terraform 변경을 state·plan·live inventory 대조 뒤 적용하는 운영 gate 구축

기존 학부 프로젝트는 삭제하지 않더라도 실무 프로젝트 아래로 내린다. `구직 의향` 공개 범위는 콘텐츠와 별도로 사용자 확인 뒤 변경한다.

### 3.6 Saramin

**이력서 제목**

```text
Tech Lead · Backend Engineer | AI 제품 개발·운영
```

**자기소개 첫 항목**: §1.3 사용

**경력기술서**: §2.1 전체형 → §2.4 Memento → §2.5 STUDIO LAB 순서

**희망 직무**: `백엔드/서버개발`

**포트폴리오**: `https://marinkim.xyz`

로그인 뒤 자기소개 항목 수·글자 수, 경력기술서 형식, 인증 경력 재불러오기 결과를 확인하기 전에는 저장하지 않는다. 건강보험공단 인증 경력 총계와 공개 `4년차` 산정 기준은 다를 수 있으므로 플랫폼 자동 총계를 임의로 고치지 않는다.

## 4. Credentials 공통 값

| 분류 | 게시 문안 |
| --- | --- |
| 특허 | `특허 「페이지 출력 방법」 · 등록 10-2898273` |
| 수상 | `CES 2024 Best of Innovation · AI 부문 대상 제품 참여` |
| 자격 | `ADsP · 데이터분석 준전문가 (2021.09)` |
| 인증 | `한국건설생활환경시험연구원(KCL) · AI 정확도 부문 인증 통과` |
| 학력 | `우송대학교 게임멀티미디어 전공 · 2016.03–2021.08 · 졸업` |

인증에는 정확도 수치와 모델명을 쓰지 않는다. CES는 개인 수상이 아니라 대상 제품 참여로 표현한다.

## 5. 관리 범위

| 분류 | 플랫폼 | 처리 |
| --- | --- | --- |
| 동기화 | Wanted, LinkedIn, Remember, Groupby, RocketPunch, Saramin | 이 패키지 기준으로 갱신 |
| 정리 | Oopy | 새 문안을 넣지 않고 다른 플랫폼 링크를 marinkim.xyz로 교체한 뒤 공개 종료 여부 확인 |
| 보류 | Jumpit | 현재 관리 대상이 아님. live 이력서 존재 여부 확인 뒤 신규 생성 여부 결정 |

## 6. Live 적용 체크리스트

2026-08-08~14 snapshot은 현재값이 아니다. 아래 `현재값`은 로그인한 편집 화면에서 다시 읽어 채운다.

| 플랫폼 | 먼저 읽을 현재값 | 목표값 확인 | 저장 검증 |
| --- | --- | --- | --- |
| Wanted | 소개, 직책, 회사별 설명, AX, skill, 학교명, 링크 | 소개가 Maker 문장으로 시작, 검색 직무 `백엔드 개발자`, 직책 `Tech Lead`, C# 없음 | blur → 작성 완료 → reload → field `value` 재확인 |
| LinkedIn | headline, About, Experience title·회사명·기간, Featured | headline·About 교체, MediSolve title `Backend Engineer`, 더데이랩스·종료일 정정 | 저장 → 프로필 재진입 → 비로그인 공개 화면 확인 |
| Remember | 소개 두 탭, MediSolve·STUDIO LAB·아이즈솔 설명, skill, 링크 | 두 소개 탭을 용도별 문안으로 분리, C# 없음, STUDIO LAB `2024.01`, 15 skill | 각 탭 저장 → reload → field value 재확인 |
| Groupby | 소개와 credentials 목록, 경력 종료일, skill, 링크 | Maker 소개 + credentials 유지, STUDIO LAB `2024.01`, marinkim.xyz | 저장 → reload → 목록 누락과 링크 확인 |
| RocketPunch | 300자 소개, 경력, 프로젝트 순서, C#, 링크, 구직 상태 | 1차는 §1.2와 경력 5건 최신화·C# 제거, 실무 프로젝트 3건은 후속 | 저장 → reload → field value 재확인; 구직 상태는 보존 |
| Saramin | 인증 경력 총계, 자기소개·경력기술서 구조, skill, 문서·링크 | 필드 제한 확인 뒤 §1.3·§2 반영, credentials·portfolio 등록 | reload → 이력서 미리보기·공개 범위 확인 |

## 7. 사용 금지 문구

- `HTTP 5xx 0.3%`
- `36시간 만에 재구축`
- `QA 37% → 11%`
- `QA 건수 감소` 또는 backend가 단독으로 QA 개선을 만들었다는 표현
- `Threads 4,039건 분석`을 현재 대표 성과로 사용
- `최근 1년치 Threads 전수 분석`
- 초기 prototype을 김대정이 직접 또는 바이브 코딩으로 만들었다는 표현
- `기업부설연구소장`을 headline·About·소개에 사용
- Tech Lead·PO가 등재 직함이라고 단정
- Thready 매출을 개인 단독 인과·MRR·ARR로 표현
- Thready Prod DB migration 완료·무중단·유실 0
- Centurion exactly-once·장애율·성능 개선 수치
- Memento 다국가·구독 결제, exactly-once webhook, 완전한 rollback
- NEXUS와 DAY를 같은 프로젝트로 설명
- 아이즈솔 C# 경험
- 고객사·provider·팀원 실명

## 8. 적용 순서와 완료 조건

1. 로그인한 편집 화면에서 실제 필드·글자 수·공개 범위를 다시 읽는다.
2. 날짜·회사명·C#·Oopy 링크 같은 사실 오류를 먼저 수정한다.
3. 소개 → 최신 경력 → skill → credentials → 링크 순으로 반영한다.
4. 저장 뒤 새로고침하고 화면 텍스트가 아니라 실제 field `value`를 확인한다.
5. 비로그인 공개 화면에 접근할 수 있으면 문구·링크·노출 범위를 별도로 확인한다.
6. [Live 적용 검증](2026-08-22-live-verification.md)에 반영 일시·저장값·남은 차이·수동 확인 항목을 기록한다.

이번 1차 적용의 완료 기준은 `붙여넣었다`가 아니라 **저장 뒤 reload한 field value와 SoT 문안이 일치하는 상태**다. 비로그인 공개값은 별도 세션에서 검증했을 때 완료로 기록한다.

## 9. Live 적용 결과 — 2026-08-23

- Wanted·LinkedIn·Remember·Groupby·RocketPunch: 저장 후 reload 검증 완료
- LinkedIn Featured: `marinkim.xyz` URL 검증 실패로 미등록, 상단 웹사이트 버튼으로 대체
- Saramin: 사용하지 않기로 확정해 동기화 대상에서 제외, 쓰기 0건
- Oopy: 레거시 링크 교체와 공개 종료 판단 pending
- Wanted의 더데이랩스 row·credentials, RocketPunch의 자동 생성 요약·HTML title은 플랫폼 UI 제약에 따른 잔여값으로 보존

필드별 결과와 보존한 설정은 [2026-08-22 Live 적용 검증](2026-08-22-live-verification.md)이 소유한다.
