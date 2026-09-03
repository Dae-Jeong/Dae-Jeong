---
type: platform-copy
title: RocketPunch 프로필 문안
description: 로켓펀치 프로필의 canonical 문안 (Maker v4). 300자 소개.
platform: rocketpunch
url: https://www.rocketpunch.com/@marinkim
version: maker-v4
timestamp: 2026-09-03
tags: [platform, profile, canonical, product-engineer]
---

# RocketPunch 프로필 문안

이 파일이 **RocketPunch 프로필 문안의 canonical 문안**이다. 사실·강도는 `evidence/claims/`, 표현 규칙은 [copy-standard §1-6](../../rules/application-copy-standard.md), 적용 절차와 자동화 제약은 [README](README.md)와 skill `sync-platform-profile`이 소유한다. live 적용 상태는 [platform-registry.yaml](platform-registry.yaml)이 기록한다.

필드 제목의 `· N자`는 플랫폼 글자 수 상한이고 validator(게이트 17)가 아래 코드 블록 길이를 검사한다. `제한 없음`은 검사하지 않는다.

## 고정 필드

| 필드 | 값 |
| --- | --- |
| 경력 직무 필드 | `Backend Engineer` |
| 포트폴리오 링크 | `https://marinkim.xyz` |
| 실무 프로젝트 순서(추가 가능할 때) | `유료 AI 콘텐츠 제품` → `데이터 검수·지식 검색` → `FastAPI 개발 기준` |

## 문안

### 소개 · 300자

```text
가능성을 기회로 바꾸고, 제품으로 가치를 전하는 메이커 김대정입니다. 기획자로 시작해 백엔드로 왔고, FastAPI 백엔드·AI 생성/평가 시스템을 직접 만들고 핵심 화면은 coding agent로 완성했으며, 대규모 콘텐츠 데이터를 검수 가능한 구조와 평가 워크벤치로 바꿨습니다. https://marinkim.xyz
```

### MediSolve AI 경력 · 제한 없음

```text
- 아이디어를 제안한 AI 콘텐츠 제품을 기획·QA·마케팅과 운영 리드해 고객이 구독하는 제품으로 출시. FastAPI 백엔드·AI 생성/평가 직접 구현, 핵심 화면은 coding agent로 완성
- 초기 백엔드를 FastAPI로 병렬 재구축·전환. 같은 기준의 Jira 집계에서 QA 이슈 재오픈 비율 37% → 11%, 재발 일평균 약 94% 감소
- 데이터 검수 워크벤치·시술 지식 hybrid retrieval API, 주문·재고 worker와 피부과 운영·예약 backend, 조직 표준 FastAPI template 구축
```

### 더데이랩스 경력 · 제한 없음

```text
Memento AI에서의 개발 성과를 인정받아 MediSolve AI 초기 멤버로 영입됐습니다. 법인 설립 전 더데이랩스 프리랜서로 제품 개발을 선행했고, 피부과 운영 제품군 backend 저장소의 기본 구조·Config·개발 환경·실행 문서·ISSUE/PR 템플릿을 구성했습니다. 2025.04 MediSolve AI 설립과 함께 Backend Engineer로 정규 합류해 Tech Lead 역할을 맡았습니다.
```

### Memento AI 경력 · 제한 없음

```text
- Stripe Checkout의 manual capture 기반 선결제를 구축하고 내부 결제 ID로 결제 이력과 Checkout·Webhook 이벤트를 연결
- 예약 처리 실패 시 PaymentIntent 상태에 따라 취소·환불하고, 환불 완료 뒤 마일리지와 이용권 상태를 변경하도록 결제 상태 흐름 정리
- 다국어 Happy Call을 알림톡·이메일 즉시/예약 발송으로 확장하고 Celery ETA 작업의 취소·재등록·발송 이력 구현
```

### STUDIO LAB 경력 · 제한 없음

```text
- 생성형 AI 커머스 콘텐츠 제품의 prototype부터 v1.0까지 제품 흐름·기능 범위·출시 우선순위를 정하는 PM으로 0→1 구간 리드, 외부 패션 브랜드 PoC 진행
- 상세 페이지 제작 방식이 특허 「페이지 출력 방법」 등록으로 이어졌고, 제품은 CES 2024 Best of Innovation 수상
- Vision AI 모델 개발에서 시작해 PM과 Backend Engineer로 역할을 확장하며 제품 요구를 기술 실행으로 연결
```

### 아이즈솔 경력 · 제한 없음

```text
Vision AI Engineer 인턴으로 인식 모델과 학습 데이터·전처리 pipeline을 제품 기능에 연결하는 개발·검증에 참여했습니다.
```

## 적용 메모

- `insertText`로 저장까지 된다. 클릭이 안 먹는 컴포넌트는 React props의 onClick 직접 호출로 우회한 전례가 있다.
- 저장 뒤 자동 생성 커리어 요약이 새 문안 기준으로 재생성됐는지 확인한다. 구직 상태는 보존.
