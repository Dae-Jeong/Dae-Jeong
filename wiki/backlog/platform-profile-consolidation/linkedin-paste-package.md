---
type: handoff
title: 링크드인 붙여넣기 패키지 — 줄바꿈 포맷 적용
description: 링크드인은 자동화로 줄바꿈 있는 한글을 넣을 수 없다. 아래를 순서대로 복사→붙여넣기한다.
timestamp: 2026-08-11
status: ready
tags: [linkedin, paste, formatting]
---

# 링크드인 붙여넣기 패키지

**왜 수동인가**: fill=줄바꿈 스트립 · type=한글 불가 · evaluate=CSP 차단 · Cmd+V 합성 이벤트=클립보드 미접근.
4경로 전부 실측 실패 → 줄바꿈 포맷은 사람 손으로만 가능하다.

**포맷 원칙** ([persuasive-writing](../../rules/persuasive-writing.md) + 리서치):
접힘 전 첫 2줄이 후크 · 2~3문장 마이크로 문단 · 문단 사이 빈 줄 · 기호 3종 이하 · 끝에 CTA.

---

## 1. 소개 (About) — ⚡ 지금 클립보드에 실려 있음

편집 모달이 열려 있다. **필드 클릭 → Cmd+A → Cmd+V → 저장**이면 끝.
(닫았다면: 프로필 → 소개 연필 → 아래 복사)

```
AI 제품만 4년째 만들고 있습니다.
백엔드를 만들면서, 뭘 만들지 정하는 역할도 같이 맡고 있습니다.

모델을 만들다 기획을 거쳐 백엔드로 왔습니다.

백엔드를 택한 데는 이유가 있습니다.
AI가 구현을 점점 더 많이 맡을수록,
보안과 안정성처럼 사람이 끝까지 책임져야 하는 층이 더 무거워진다고 봤습니다.
매일 AI와 같이 제품을 만드는 지금, 그 판단이 틀리지 않았다고 느낍니다.

"품질이 나쁘다"는 말로는 뭘 고쳐야 할지 알 수 없습니다.
그래서 AI가 만든 결과물의 품질을 판정할 수 있게 만들었습니다.

▪ 자동 게이트 — 틀린 출력은 코드가 먼저 걸러냅니다
▪ 실측 분포 대조 — 플랫폼다운 글인지 데이터로 판정합니다
▪ 사람 판정 — 자동화가 닿지 않는 층만 사람이 봅니다

포트폴리오 → marinkim.xyz
```

**v5.2 (2026-08-11)** — user feedback "영어 쓰는 애들 말투를 번역한 느낌" 반영.
번역투 3패턴 제거: ① 평행 명사화(`~하는 일과 ~하는 일을`) ② 의문사 스태킹(`무엇을 왜`)
③ 시간 부사 후치. `이유는 분명합니다`("The reason is clear") 직역 수사도 제거.
bullet 종결도 본문과 같은 합니다체로 통일.

## 2. 경력 설명 6건 — 내용은 맞고 줄바꿈만 죽어 있다

경력 → 각 항목 연필 → 설명 필드 Cmd+A → 붙여넣기. **직함·기간·회사명은 건드리지 않는다.**

### 2-1. MediSolve AI

```
[Thready] 속도를 우선해 빠르게 검증된 초기 제품의 backend를 인계받아 FastAPI로 재구축했습니다.

인계 시점의 문제는 도메인 간 의존성이었습니다.
회원 로직을 수정하면 AI 생성이 중단되는 식으로 변경이 전파됐고,
QA 티켓을 닫아도 같은 영역에서 다른 형태로 재발하는 패턴이 반복됐습니다.

"돌아가는 기능을 왜 다시 만드나"라는 반대가 있었습니다.
부분 수정으로는 의존성 구조가 남아 문제가 계속 누적된다는 점,
AI 모듈 확장이 예정돼 있다는 점, 하네스를 먼저 세우면 이관이 오히려 빠르다는 점으로 설득했습니다.
FE(Next.js)는 유지하고 backend만 분리 교체하는 범위로 정했습니다.

실행은 디자인 패턴과 인프라 하네스를 먼저 세운 뒤 그 규칙 위에서 AI와 협업하는 순서로 했고,
파악부터 재구축까지 작업 시간 기준 36시간이 걸렸습니다.
cutover 전후 Jira 집계에서 QA 티켓의 resolve 대비 reopen 비율은 37%에서 11%로 감소했고,
현재 30일 기준 월 수만 건 규모에서 HTTP 5xx 0.3% 수준으로 운영하고 있습니다.

[Centurion] 피부과 운영 CRM에서 order·product·inventory API와 비동기 worker 흐름을 구축했습니다.
장애를 겪고 대응한 것이 아니라 제품 시작 시점의 예방책이었습니다.
직전 회사에서 결제 실패를 수습하며 중간 단계 실패가 남기는 불일치를 직접 처리한 경험이 있었고,
실패 가능한 작업은 처음부터 API 경계 밖 worker로 두고 재고 차감에는 retry를 붙였습니다.
이후 Celery에서 TaskIQ로 메시지 계층을 전환하며 알림 도메인을 정리했습니다.

[조직 표준] 조직 표준 FastAPI 템플릿을 설계·구축했습니다.
layered architecture, 의존성 주입, 응답·예외 규약, ADR·runbook을 담고
계층형 agent context와 도메인·셋업 자동화 스킬을 내장했습니다.
신규 backend가 같은 구조에서 출발하므로 제품 정책만 파악하면 대응할 수 있습니다.

Backend Engineer로 위 시스템을 담당하면서 기업부설연구소장·Tech Lead·PO를 병행하고 있습니다.
```

### 2-2. 더데이랩스 (데이뷰네트웍스 항목)

```
현 MediSolve AI 대표와 프리랜서로 협업을 시작했습니다.

Centurion의 backend 저장소를 처음 만들면서 프로젝트 기본 구조와 Config 설계,
SSH 터널링 lifecycle, 환경·실행 문서, ISSUE/PR 템플릿을 함께 넣었습니다.
처음 꾸려지는 개발팀이라 코드보다 기준이 먼저 필요하다고 보았습니다.

이후 창업 시점에 합류해 같은 제품을 이어 맡았습니다.
```

### 2-3. Memento AI (정규직)

```
피부과 통합 관리 시스템의 예약·결제 backend를 담당했습니다.
Stripe 선결제를 도입했고 Hongkong API로 다국가 결제와 구독·환불의 트랜잭션 상태를 처리했습니다.

결제는 중간 단계에서 실패할 때 상태가 어긋난 채 남는 것이 문제였습니다.
선결제 예약 실패 시의 롤백, 환불 처리 순서, 환불 시 티켓 제거 시점,
전액 마일리지 결제 건의 환불처럼 실패 지점마다 남는 불일치를 하나씩 잡았습니다.
알림톡은 발송 실패 시 3회까지 자동 재시도하도록 했습니다.

회사 폐업으로 재직이 종료됐습니다.
```

### 2-4. Memento AI (인턴)

```
병원 내부 직원 일정 관리 어드민 Check를 기획부터 API·DB 설계, 구현까지 0에서 구축했습니다.
회원 도메인(이메일/비밀번호 인증, JWT 세션 관리)을 설계했고, 1개월 후 정규직으로 전환했습니다.
```

### 2-5. STUDIO LAB

```
상품 이미지를 Vision AI로 분석해 상세페이지를 자동 생성하는 SellerCanvas에서 일했습니다.

AI Engineer로 합류해 의류 이미지 분석 모델을 개발했고(2021.12~2022.09),
PM으로 옮겨 제품이 운영되는 시스템을 기획·구축했으며(2022.10~2023.09),
마지막 구간은 Backend Engineer였습니다(2023.10~2023.12).

PM 시기에는 패션 대기업 브랜드 POC를 맡아 비즈니스 요구사항을 기술 스펙으로 변환했습니다.
Backend 구간에는 Node.js 레거시를 NestJS로 옮기며 예외 처리 구조를 세웠고,
JWT 인증과 Controller→Service→DAO 흐름을 담은 팀 개발 템플릿을 만들었습니다.
지금 조직 표준 템플릿을 설계하는 일의 첫 형태였습니다.

SellerCanvas는 CES 2024 AI 부문 Best of Innovation을 수상했습니다.
```

### 2-6. 아이즈솔

```
유아 안면 인식 기반 비접촉 자동 출결 시스템 Kidsly를 개발했습니다.

인식 모델 개발과 학습 데이터 수집·관리, 영상 데이터 전처리 파이프라인을 담당했고
C# 기반 백엔드도 함께 다뤘습니다.
인턴이었지만 기능 요구사항 정의와 일정·태스크 관리까지 맡았습니다.
```

⚠️ 아이즈솔 편집 김에 **종료일 확인**: 현재 2021년 8월로 표시 — canonical은 **2021년 6월**.

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
