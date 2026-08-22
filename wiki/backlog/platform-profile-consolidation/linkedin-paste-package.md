---
type: handoff
title: 링크드인 붙여넣기 패키지 — 줄바꿈 포맷 적용
description: 링크드인은 자동화로 줄바꿈 있는 한글을 넣을 수 없다. 아래를 순서대로 복사→붙여넣기한다.
timestamp: 2026-08-11
status: superseded
tags: [linkedin, paste, formatting]
---

# 링크드인 붙여넣기 패키지

> **Superseded (2026-08-22)**: `done`은 2026-08-11 당시 반영 이력일 뿐 현재 문안의 정합 완료를 뜻하지 않는다. 다음 반영에는 [Platform Profile Paste Package — Maker v1](2026-08-22-platform-paste-package.md)을 사용한다.

> **✅ 2026-08-11 사용자가 직접 전량 반영 완료** — 소개(줄바꿈판)·헤드라인·경력 6건.
> 사용자 수정: 소개 첫 문장 `사람들에게 필요한 제품을 4년째 만들고 있습니다`,
> 아이즈솔 `Fastapi 기반`(근거 정합), MediSolve 직함 `Tech lead`.
> 잔여: **영어 프로필**(§3) · **아이즈솔 종료일**(2021.08 표시, canonical 2021.06 — 사용자 확인 필요).

**왜 수동인가**: fill=줄바꿈 스트립 · type=한글 불가 · evaluate=CSP 차단 · Cmd+V 합성 이벤트=클립보드 미접근.
4경로 전부 실측 실패 → 줄바꿈 포맷은 사람 손으로만 가능하다.

**포맷 원칙** ([persuasive-writing](../../rules/persuasive-writing.md) + 리서치):
접힘 전 첫 2줄이 후크 · 2~3문장 마이크로 문단 · 문단 사이 빈 줄 · 기호 3종 이하 · 끝에 CTA.

---

## 1. 소개 (About)

**v6로 개정됨 (2026-08-11)** — 현재 링크드인에는 v5.2 줄바꿈판이 들어가 있다.
프로필 → 소개 연필 → 아래 복사 → Cmd+A → 붙여넣기 → 저장.

```
LLM 기능을 제품에 붙이는 일보다, AI의 출력을 판정하고 통제해서
사람이 믿고 쓸 수 있는 제품으로 만드는 일에 관심이 있습니다.

그래서 LLM 백엔드, Agent Workflow, Evaluation을 중심으로
문제 정의부터 설계, 구현, 평가, 운영까지 제품의 전체 과정을 다룹니다.

"품질이 나쁘다"는 말로는 뭘 고쳐야 할지 알 수 없습니다.
AI가 만든 결과물의 품질을 세 층으로 나눠 판정할 수 있게 만들었습니다.

▪ 자동 게이트 — 틀린 출력은 코드가 먼저 걸러냅니다
▪ 실측 분포 대조 — 플랫폼다운 글인지 데이터로 판정합니다
▪ 사람 판정 — 자동화가 닿지 않는 층만 사람이 봅니다

제가 계속 붙들고 있는 질문은 하나입니다.

"AI가 구현을 점점 더 많이 맡을수록,
사람이 끝까지 책임져야 하는 층을 어떻게 지킬 것인가?"

backend는 Python과 FastAPI를 주로 쓰고,
Centurion과 API Gateway는 TypeScript·NestJS로 다룹니다.
Java와 Spring Boot는 개인 프로젝트에서 다뤘습니다.

사람들에게 필요한 AI 제품을 4년째 만들어온 엔지니어로서,
이 질문의 답을 의료 AI 플랫폼에서 제품으로 만들어가고 있습니다.

포트폴리오 → https://www.marinkim.xyz
```

**v5.2 (2026-08-11)** — user feedback "영어 쓰는 애들 말투를 번역한 느낌" 반영.
번역투 3패턴 제거: ① 평행 명사화(`~하는 일과 ~하는 일을`) ② 의문사 스태킹(`무엇을 왜`)
③ 시간 부사 후치. `이유는 분명합니다`("The reason is clear") 직역 수사도 제거.
bullet 종결도 본문과 같은 합니다체로 통일.

## 1.5 헤드라인 — 번역투 정정 (같은 김에)

현재: `Backend Engineer · PO | AI 제품을 만들고, 무엇을 왜 만들지도 정합니다 | 기업부설연구소장 | CES 2024 Best of Innovation 수상 제품 PM`

교체:

```
Backend Engineer · PO | AI 제품을 만들고, 무엇을 만들지도 함께 정합니다 | 기업부설연구소장 | CES 2024 Best of Innovation 수상 제품 PM
```

## 2. 경력 설명 6건 — v4.1 (2026-08-12, 역량 축 + 담당 제품 줄)

경력 → 각 항목 연필 → 설명 필드 Cmd+A → 붙여넣기. **직함·기간·회사명은 건드리지 않는다.**

### 2-1. MediSolve AI

```
담당 제품: Thready(AI 콘텐츠 생성) · Centurion(AI 메디컬 플랫폼 — 피부과 운영 CRM·통합 관리 시스템)

[AI 제품 backend 구축·재구축]
- QA 티켓 reopen 비율 37% → 11% 개선 (해결 대비 reopen, cutover 전후 Jira 집계) · Thready
- 월 수만 건 규모에서 HTTP 5xx 0.3% 수준 운영 (30일 기준) · Thready
- 도메인 간 의존성으로 회원 로직 수정이 AI 생성 중단으로 전파되고 QA 티켓 종료 후에도 동일 영역 재발이 반복, 부분 수정으로는 구조 잔존으로 판단해 전면 재구축 결정 및 사내 반대 설득 (근거: 문제 누적·AI 모듈 확장 계획·하네스 선행 시 이관 속도) · Thready
- 디자인 패턴·인프라 하네스 선행 구축 후 AI 코딩 에이전트와 협업, 파악부터 재구축까지 36시간 (작업 시간 기준) · Thready
- order·product·inventory API와 비동기 worker 구축, 실패 가능 작업을 제품 시작 시점부터 API 경계 밖으로 분리하고 재고 차감에 retry 적용 (직전 회사 결제 실패 수습 경험 기반의 예방 설계) · Centurion

[AI 출력 품질 판정·평가]
- "품질이 나쁘다"로는 재생성 기준 확정 불가, 코드가 거를 수 있는 층과 사람만 판단 가능한 층을 분리해 3층 판정 체계 구축
- 자동 게이트 12종 구축으로 형식 오류를 사람 검토 이전 단계에서 차단
- 실측 코퍼스 n=19 → 4,039 직접 수집, 분포 대조로 플랫폼 적합성 판정
- 실측으로 신뢰하던 품질 기준값이 자사 출력을 되먹이고 있음을 확인, 순환 차단 및 기준 재수립
- 반증된 프롬프트 규칙 기록화로 동일 시도 반복 차단

[어드민 시스템 구축·운영 — 진행 중]
- 통합 관리 시스템 backend를 Clean Architecture 계층 구조로 설계·구축 주도
- Homepage/Admin API를 독립 모듈로 두고 gateway로 단일 엔드포인트 제공
- Generic Repository로 공통 CRUD 표준화, Multi-tenancy와 Soft Delete 자동 필터링으로 데이터 격리
- 병원 product backend monorepo의 service boundary와 migration flow 주도
- 코드 컨벤션 정립과 Ruff·Pyright·pre-commit 기반 품질 자동 검증 체계 구축

[Agent 워크플로우·AX]
- 평가 하네스와 함께 하네스로 검증할 agent 구조 자체를 설계·구현 (대표 영역: writer) · Thready
- 유형 분기 판정을 writer 배치 시 18건 전부 미발동, writer가 원본 유형을 알 수 없는 자리로 판단해 판정 위치를 planner로 재배치 · Thready
- 조직 표준 FastAPI 템플릿 설계·구축 (layered architecture, 의존성 주입, 응답·예외 규약, ADR·runbook)
- 계층형 agent context와 도메인·셋업 자동화 스킬 내장, AI 코딩 에이전트 협업 워크플로우 팀 도입
- 백엔드 인원 대비 담당 제품이 많은 구조에서 제품 간 이동 비용을 표준화로 해소 — 신규 backend가 동일 구조에서 출발

[인프라·플랫폼 운영]
- 회사 Azure/Terraform infra 전반의 설계·구축·운영 담당
- B2B/B2C·제품·환경별 resource boundary와 deploy·runbook 관리
- 외부 product Terraform IaC 구축 전담
- Centurion Azure/Terraform infra 구축·운영과 runbook·문서화 담당

[제품 운영·결정]
- Backend Engineer 합류 후 기업부설연구소장·Tech Lead·PO 역할 병행
- pipeline registry와 release gate 기반 제품팀 일정·이슈·릴리스 운영 리드
- 제품 결정을 BE·FE·QA·release gate 실행으로 연결
- 실시간 상담 AI 에이전트(WebSocket 기반 STT·LLM 파이프라인) 공동 주 기여로 구축 중 · Centurion
```

### 2-2. 더데이랩스 (데이뷰네트웍스 항목)

```
담당 제품: Centurion(피부과 운영 CRM) — backend 저장소 착수 구간

[개발 기준 수립]
- 처음 꾸려지는 개발팀으로 코드보다 기준이 선행되어야 한다고 판단, 저장소 생성 시점에 규약부터 배치 (프로젝트 기본 구조·Config 설계·SSH 터널링 lifecycle, 환경·실행 문서, ISSUE/PR 템플릿)
- 창업 시점에 합류해 동일 제품을 이어 담당
```

### 2-3. Memento AI (정규직)

```
담당 제품: 피부과 통합 관리 시스템의 예약·결제 backend

[결제 트랜잭션 안정화]
- 결제 중간 단계 실패 시 상태 불일치 잔존을 개별 버그가 아닌 상태 전이 정의 누락으로 판단
- 실패 지점 4종의 불일치 정의 (선결제 예약 실패 롤백, 환불 처리 순서, 환불 시 티켓 제거 시점, 전액 마일리지 결제 건 환불)
- Stripe 선결제 도입과 Hongkong API 기반 다국가 결제·구독·환불 트랜잭션 처리, 알림톡 발송 실패 시 3회 자동 재시도

회사 폐업으로 재직이 종료됐습니다.
```

### 2-4. Memento AI (인턴)

```
담당 제품: Check(병원 내부 직원 일정 관리 어드민)

[0에서 구축]
- 기획부터 API·DB 설계, 구현까지 담당하고 회원 도메인 설계 (이메일/비밀번호 인증, JWT 세션 관리)
- 1개월 후 정규직 전환
```

### 2-5. STUDIO LAB

```
담당 제품: SellerCanvas(상품 이미지를 Vision AI로 분석해 상세페이지를 자동 생성하는 생성형 AI 커머스 콘텐츠)

AI Engineer(2021.12~2022.09) → PM(2022.10~2023.09) → Backend Engineer(2023.10~2024.01) 순으로 역할이 바뀌었고, PM이 메인 롤이었습니다.

[제품 시스템 기획·구축 — PM 메인 롤]
- 프로토타입 단계에서 v1.0 제품까지 0→1 구간을 PM으로 통과 — 사용 데이터 분석으로 존치·변경 항목을 정하는 것에서 시작해 v1.0 전반의 서비스 기획 담당
- 그 과정에서 패션 대기업 브랜드 POC를 함께 진행, 비즈니스 요구사항의 기술 스펙 변환과 기획·일정·기술 검증 담당
- 상세페이지 제작 Flow 재설계로 이어져 「페이지 출력 방법」 특허 출원·등록 (등록 10-2898273)
- 제품이 원활하게 돌아가는 시스템을 기획·구축 — 개발 시스템이 아니라 제품이 굴러가는 구조를 설계하는 일이었고, 현재의 제품 운영(decision·spec·release gate) 리드와 같은 근육의 이전 형태
- 외주 개발 체제의 일정·산출물 관리 및 산출물 기준 수립
- LLM 붐 이전(2021~22)부터 Vision AI 기반 생성 제품의 제품 시스템을 기획·구축

[Vision AI 모델 개발]
- 의류 이미지 분석 모델 개발(AI Engineer 구간)과 색상 분류 모델 개발(PM 재직 중), 분석 정확도 보정에 적용
- 의류 분석 모델 한국건설생활환경시험연구원(KCL) AI 정확도 인증 통과

[Backend 표준화]
- PM 경험으로 레거시 문제점을 파악하고 개선 방향을 설계, Node.js 레거시의 NestJS 이관과 예외 처리 구조 수립
- JWT 인증과 Controller→Service→DAO 흐름을 담은 팀 개발 템플릿 제작 — 현재 조직 표준 템플릿 설계의 첫 형태

[수상] SellerCanvas, CES 2024 AI 부문 Best of Innovation
```

### 2-6. 아이즈솔

⚠️ **정정 포함**: 기존 게시본의 "C# 기반 백엔드"는 사실과 다르다 (2026-08-12 user-refuted).
Python·FastAPI로 교체한다.

```
담당 제품: Kidsly(유아 안면 인식 기반 비접촉 자동 출결)

[Vision AI 모델·백엔드 개발]
- 인식 모델 개발과 학습 데이터 수집·관리, 영상 데이터 전처리 파이프라인 구축, Python·FastAPI 기반 백엔드 개발
- 인턴 신분으로 기능 요구사항 정의와 일정·태스크 관리 병행 — 만드는 일과 정하는 일의 병행이 이 시기에 시작
```

## 2.5 대표 보유기술 (2026-08-13 신규)

현재: `파이썬 · 인공지능 · 기획 · 프로젝트 관리 · Microsoft Azure`
→ LLM·Agent·Evaluation 키워드가 없어 검색에 안 걸린다. 아래로 교체:

```
Python
FastAPI
LLM Evaluation
Agent Workflow
Microsoft Azure
```

## 3. 영어 프로필 (같은 김에)

프로필 우측 "프로필 언어" → 언어 추가 → 영어:

- 이름 `Daejeong` / 성 `Kim`
- 헤드라인: `Backend Engineer · PO | Building AI products — and deciding what to build and why | Head of Corporate R&D Center | PM of a CES 2024 Best of Innovation product`
- About은 아래:

```
Four years of building AI products.
I build the backend — and help decide what to build and why.

I started in vision models, moved to product planning, then to backend.

The reason for backend was clear:
as AI takes on more of the implementation,
the layers humans must own to the end — security and stability — only grow heavier.
Building alongside AI every day has made that conviction firmer.

"The quality is bad" doesn't tell you what to fix.
So I made AI generation quality judgeable:

▪ Automated gates — code screens out wrong outputs first
▪ Measured distribution checks — data decides if it reads native to the platform
▪ Human judgement — only where automation can't reach

Portfolio → marinkim.xyz
```
