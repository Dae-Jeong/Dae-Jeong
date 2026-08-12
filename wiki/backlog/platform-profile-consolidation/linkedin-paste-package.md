---
type: handoff
title: 링크드인 붙여넣기 패키지 — 줄바꿈 포맷 적용
description: 링크드인은 자동화로 줄바꿈 있는 한글을 넣을 수 없다. 아래를 순서대로 복사→붙여넣기한다.
timestamp: 2026-08-11
status: done
tags: [linkedin, paste, formatting]
---

# 링크드인 붙여넣기 패키지

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

## 2. 경력 설명 6건 — bullet 하이브리드 v2 (2026-08-12, 라벨 접두 제거)

경력 → 각 항목 연필 → 설명 필드 Cmd+A → 붙여넣기. **직함·기간·회사명은 건드리지 않는다.**

### 2-1. MediSolve AI

```
[Thready — AI 콘텐츠 생성 제품 backend 전면 재구축]
- QA 티켓 reopen 37% → 11% — 해결 대비 reopen 기준, cutover 전후 Jira 집계. 현재 월 수만 건 규모에서 HTTP 5xx 0.3% 수준으로 운영하고 있습니다 (30일 기준)
- 회원 로직 수정이 AI 생성 중단으로 전파 — 인계 시점의 문제는 도메인 간 의존성이었습니다. QA 티켓을 닫아도 같은 영역에서 다른 형태로 재발했습니다
- 전면 재구축을 결정하고 반대를 설득 — 부분 수정으로는 의존성 구조가 남아 문제가 계속 누적된다고 봤습니다. "돌아가는 기능을 왜 다시 만드나"라는 반대는 문제 누적, AI 모듈 확장 계획, 하네스를 먼저 세우면 이관이 오히려 빠르다는 점으로 설득했습니다
- 작업 시간 36시간에 이관 완료 — 디자인 패턴과 인프라 하네스를 먼저 세운 뒤, 그 규칙 위에서 AI 코딩 에이전트와 협업했습니다

[LLM Evaluation — 생성 품질을 판정 가능한 대상으로]
- 자동 게이트 12종 — 틀린 출력은 사람에게 오기 전에 코드가 먼저 거릅니다
- 실측 코퍼스 n=19 → 4,039 — 직접 수집해 분포를 대조합니다. "플랫폼다운 글"인지를 감이 아니라 데이터로 판정하기 위해서입니다
- 품질을 세 층으로 분리 — "품질이 나쁘다"는 말로는 무엇을 고칠지 정할 수 없었습니다. 코드가 거를 수 있는 층과 사람만 판단할 수 있는 층을 나눠, 자동화가 닿지 않는 층만 사람이 봅니다
- 반증 로그 운영 — 반증된 프롬프트 규칙을 기록으로 남겨 같은 시도의 반복을 차단했습니다

[Agent Workflow — planner·writer 파이프라인 설계·구현]
- 유형 분기 판정 18건 전부 미발동 — writer에 판정을 뒀을 때 한 건도 걸리지 않았습니다
- 판정 위치를 planner로 재배치해 해결 — writer는 원본이 어떤 유형인지 알 수 없는 자리였습니다. 판정의 실패가 아니라 판정 위치의 문제로 봤고, 옮기자 유형별로 정확히 갈렸습니다
- agent 구조 자체를 설계·구현 — 평가 하네스만 만든 것이 아니라, 하네스로 검증할 구조를 함께 설계했습니다 (대표 영역: writer). 판단을 어느 역할에 둘 것인가가 agent 설계의 핵심이라는 것을 실측으로 확인했습니다

[Centurion — 피부과 운영 CRM backend]
- order·product·inventory API와 비동기 worker 구축 — 메시지 계층을 Celery에서 TaskIQ로 전환하며 알림 도메인을 분리했습니다
- 실패 가능한 작업을 제품 시작 시점부터 worker로 분리 — 직전 회사에서 결제 실패가 남기는 불일치를 직접 수습한 경험을 바탕으로, 장애를 겪고 대응한 것이 아니라 예방으로 설계했습니다. 재고 차감에는 retry를 붙였습니다
- 실시간 상담 AI 에이전트 공동 주 기여 — WebSocket 기반 STT·LLM 파이프라인으로 상담 현장을 실시간으로 돕는 구조를 구축 중입니다

[조직 표준·AX — 사람과 에이전트가 같은 규칙 위에서]
- 조직 표준 FastAPI 템플릿 설계·구축 — layered architecture, 의존성 주입, 응답·예외 규약, ADR·runbook을 담았습니다
- 계층형 agent context 내장 — 도메인·셋업 자동화 스킬을 함께 넣어, AI 코딩 에이전트 협업 워크플로우를 팀에 도입했습니다
- 제품 간 이동 비용을 구조로 해소 — 백엔드 인원 대비 담당 제품이 많은 구조에서는 이동 비용이 병목이 됩니다. 신규 backend가 같은 구조에서 출발하므로 제품 정책만 파악하면 누구든 대응할 수 있습니다

Backend Engineer로 위 시스템을 담당하면서 기업부설연구소장과 Tech Lead, PO를 병행하고 있습니다.
```

### 2-2. 더데이랩스 (데이뷰네트웍스 항목)

```
[Centurion backend 저장소 착수 — 현 MediSolve AI 대표와 프리랜서 협업]
- 저장소 생성 시점에 기준부터 넣음 — 처음 꾸려지는 개발팀이라 코드보다 기준이 먼저 필요하다고 봤습니다
- 프로젝트 기본 구조·Config 설계·SSH 터널링 lifecycle — 환경·실행 문서와 ISSUE/PR 템플릿을 함께 넣었습니다
- 창업 시점에 합류해 같은 제품을 이어 맡음
```

### 2-3. Memento AI (정규직)

```
[예약·결제 backend — 피부과 통합 관리 시스템]
- 결제 중간 실패가 상태를 어긋난 채 남김 — 개별 버그가 아니라 실패 지점마다 정의가 빠진 상태 전이 문제로 봤습니다
- Stripe 선결제·다국가 결제 트랜잭션 처리 — Hongkong API로 구독·환불의 상태 전이를 다뤘습니다
- 실패 지점 4종의 불일치를 정의 — 선결제 예약 실패 시 롤백, 환불 처리 순서, 환불 시 티켓 제거 시점, 전액 마일리지 결제 건의 환불을 하나씩 잡았습니다
- 알림톡 발송 실패 시 3회 자동 재시도

회사 폐업으로 재직이 종료됐습니다.
```

### 2-4. Memento AI (인턴)

```
[Check — 병원 내부 직원 일정 관리 어드민]
- 기획부터 API·DB 설계, 구현까지 0에서 구축
- 회원 도메인 설계 — 이메일/비밀번호 인증과 JWT 세션 관리를 다뤘습니다
- 1개월 후 정규직 전환
```

### 2-5. STUDIO LAB

```
상품 이미지를 Vision AI로 분석해 상세페이지를 자동 생성하는 SellerCanvas에서 일했습니다.
AI Engineer(2021.12~2022.09) → PM(2022.10~2023.09) → Backend Engineer(2023.10~2023.12) 순으로 역할이 바뀌었습니다.

[PM — 제품 전반 1년]
- 특허 「페이지 출력 방법」 출원·등록 (10-2898273) — 상세페이지가 만들어지는 제작 Flow 자체를 다시 설계했고, 그 제작 방식이 특허로 이어졌습니다
- SellerCanvas v1.0 전반 서비스 기획 — 프로토타입의 사용 데이터를 분석해 무엇을 남기고 무엇을 바꿀지 정하는 것에서 출발했습니다
- 외주 개발사 일정·산출물 관리 — 개발이 외주로 진행되던 시기라 산출물의 기준을 잡는 일이 함께 필요했습니다
- 패션 대기업 브랜드 POC 담당 — 비즈니스 요구사항을 기술 스펙으로 변환하며 기획·일정·기술 검증을 맡았습니다

[PM으로 있으면서도 직접 만든 것]
- 의류 색상 분류 모델 개발 — 분석 정확도 보정에 활용했습니다
- KCL AI 정확도 인증 통과 — 의류 분석 모델이 한국건설생활환경시험연구원 인증을 받았습니다

[Backend — 레거시 이관]
- Node.js 레거시를 NestJS로 이관 — 예외 처리 구조를 함께 세웠습니다
- 팀 개발 템플릿 제작 — JWT 인증과 Controller→Service→DAO 흐름을 담았습니다. 지금 조직 표준 템플릿을 설계하는 일의 첫 형태였습니다

[수상] SellerCanvas는 CES 2024 AI 부문 Best of Innovation을 수상했습니다.
```

### 2-6. 아이즈솔

⚠️ **정정 포함**: 기존 게시본의 "C# 기반 백엔드"는 사실과 다르다 (2026-08-12 user-refuted).
Python·FastAPI로 교체한다.

```
[Kidsly — 유아 안면 인식 기반 비접촉 자동 출결 시스템]
- 인식 모델 개발·학습 데이터 수집·관리 — 영상 데이터 전처리 파이프라인을 함께 담당했습니다
- Python·FastAPI 기반 백엔드
- 기능 요구사항 정의와 일정·태스크 관리 — 인턴이었지만 이 시기에 이미 만드는 일과 정하는 일을 병행했습니다
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
