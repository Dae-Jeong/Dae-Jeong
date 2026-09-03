---
type: platform-copy
title: Groupby 프로필 문안
description: 그룹바이 프로필의 canonical 문안 (Product Engineer v3). 수상·특허·자격 목록 보존.
platform: groupby
url: https://groupby.kr/scouts/my-profile
version: product-engineer-v3
timestamp: 2026-09-03
tags: [platform, profile, canonical, product-engineer]
---

# Groupby 프로필 문안

이 파일이 **Groupby 프로필 문안의 canonical 문안**이다. 사실·강도는 `evidence/claims/`, 표현 규칙은 [copy-standard §1-6](../../rules/application-copy-standard.md), 적용 절차와 자동화 제약은 [README](README.md)와 skill `sync-platform-profile`이 소유한다. live 적용 상태는 [platform-registry.yaml](platform-registry.yaml)이 기록한다.

필드 제목의 `· N자`는 플랫폼 글자 수 상한이고 validator(게이트 17)가 아래 코드 블록 길이를 검사한다. `제한 없음`은 검사하지 않는다.

## 고정 필드

| 필드 | 값 |
| --- | --- |
| 직무 | 백엔드 |
| 경력 직무 필드 | `Backend Engineer` (표시 직책 `테크 리드(백엔드)` 허용) |
| 포트폴리오 | `https://marinkim.xyz` |
| skill 15 | `Python · FastAPI · SQLAlchemy · PostgreSQL · MySQL · Redis · RabbitMQ · TaskIQ · LLM API · WebSocket · TypeScript · Next.js · Docker · GitHub Actions · Azure` |
| MediSolve 시작월 | `2025.04` (더데이랩스 2025.02–04는 별도 row) |

## 문안

### 소개 · 제한 없음

```text
가능성을 제품으로 만들고, 끝까지 책임지는 Product Engineer 김대정입니다. 기획자로 시작해 백엔드로 왔고, 지금은 고객이 구독하는 AI 제품을 만들고 운영합니다.

아이디어를 제안한 AI 콘텐츠 제품의 FastAPI 백엔드와 AI 생성·평가 시스템을 직접 만들고, 핵심 화면은 coding agent로 완성해 운영합니다. 커머스·피부과 운영·SNS 콘텐츠 세 도메인에서 현업의 반복 업무를 실제로 쓰이는 제품으로 만들었고, 백엔드 경험이 적은 팀원도 같은 기준으로 만들 수 있게 FastAPI 조직 표준을 직접 구축했습니다.

대규모 콘텐츠 데이터를 검수 가능한 구조와 사람 평가 워크벤치로 바꿨고, 시술 정보 지식 플랫폼의 hybrid retrieval API와 평가 게이트를 설계·구현하고 있습니다.
```

### credentials (소개 뒤에 이어 붙임) · 제한 없음

```text
- 특허 「페이지 출력 방법」 · 등록 10-2898273
- CES 2024 Best of Innovation · AI 부문 대상 제품 참여
- 한국건설생활환경시험연구원(KCL) · AI 정확도 부문 인증 통과
- ADsP · 데이터분석 준전문가 (2021.09)
- 우송대학교 게임멀티미디어 전공 · 2016.03–2021.08 · 졸업
```

### MediSolve AI 경력 · 제한 없음

```text
Tech Lead · Backend Engineer — 제품 운영 리드

- [유료 AI 콘텐츠 제품] 아이디어를 제안하고 기획·QA·마케팅과 제품 운영을 리드해 고객이 구독하는 제품으로 출시했습니다. FastAPI 백엔드·AI 생성/평가 시스템을 직접 구현하고 핵심 화면은 coding agent로 완성했습니다.
- [병렬 재구축·검증] 초기 백엔드를 인계받아 기존 프런트엔드와 릴리스 흐름을 유지한 채 FastAPI로 병렬 재구축·전환했습니다. 같은 기준의 Jira 집계에서 해결된 QA 이슈 재오픈 비율 37% → 11%, 재발 발생 일평균 약 94% 감소.
- [데이터 검수·지식 검색] SNS 관측 데이터를 독립 labeling schema·멱등 importer·사람 평가 워크벤치로 바꿨습니다. 시술 정보 지식 플랫폼에서 구조화 조회가 판단하고 문헌 검색이 근거를 보강하는 hybrid retrieval API와 의사 검수 fixture 평가 게이트를 설계·구현했습니다(임상 검수 대기).
- [운영 backend] 주문·재고 API와 RabbitMQ·TaskIQ worker의 상태·재시도·실패 기록·재처리 경계 구축을 주도하고, 여러 피부과 운영·예약 backend 구조와 관리·홈페이지 API 구축을 주도했습니다.
- [조직 표준] 백엔드 경험이 적은 팀원도 coding agent와 같은 기준으로 만들 수 있게 FastAPI·SQLAlchemy의 계층·DI·transaction·session·테스트 기준을 조직 표준 template과 agent 작업 맥락으로 구축했습니다. 여러 사내 서비스의 Azure·Vercel 배포 환경 구성과 기본 운영도 맡았습니다.
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

- 텍스트 자동 입력이 정상 동작한다. 소개 교체 뒤 기존 수상·특허·자격 목록이 사라지지 않았는지 확인한다.
- 프로필 공개·적극 구직·희망 조건은 바꾸지 않는다.
