---
type: platform-copy
title: Wanted 프로필 문안
description: 원티드 프로필의 canonical 문안 (Maker v4).
platform: wanted
url: https://social.wanted.co.kr/my/profile
version: maker-v4
timestamp: 2026-09-03
tags: [platform, profile, canonical, product-engineer]
---

# Wanted 프로필 문안

이 파일이 **Wanted 프로필 문안의 canonical 문안**이다. 사실·강도는 `evidence/claims/`, 표현 규칙은 [copy-standard §1-6](../../rules/application-copy-standard.md), 적용 절차와 자동화 제약은 [README](README.md)와 skill `sync-platform-profile`이 소유한다. live 적용 상태는 [platform-registry.yaml](platform-registry.yaml)이 기록한다.

필드 제목의 `· N자`는 플랫폼 글자 수 상한이고 validator(게이트 17)가 아래 코드 블록 길이를 검사한다. `제한 없음`은 검사하지 않는다.

## 고정 필드

| 필드 | 값 |
| --- | --- |
| 직무 | `백엔드 개발자` |
| 직책 | `Tech Lead` |
| 경력 직무 필드 | `Backend Engineer` |
| MediSolve 성과 제목 | `고객이 구독하는 AI 제품 운영과 백엔드·AI 시스템 구축` |
| Memento 성과 제목 | `Stripe 선결제부터 Webhook·취소·환불까지 결제 상태 흐름 구축` |
| STUDIO LAB 성과 제목 | `생성형 AI 커머스 제품 0→1과 출시 우선순위 리드` |
| 링크명 / 링크 | `포트폴리오 · 웹 이력서` / `https://marinkim.xyz` |

## 문안

원티드는 두 표면이다. **프로필**(`social.wanted.co.kr/my/profile`: 소개 150자·스킬·AI 활용 경험)과 **기본 이력서**(`wanted.co.kr/cv/...`: 간단 소개 5줄 권장, 경력별 성과 제목 + 본문 textbox). 경력 본문은 이력서 편집 화면의 `업무 경험` textbox에 들어간다.

### 프로필 소개 · 150자

```text
가능성을 기회로 바꾸고, 제품으로 가치를 전하는 메이커 김대정입니다. 기획자로 시작해 백엔드로 왔고, 아이디어를 제안한 AI 콘텐츠 제품을 월 1천만원 수준의 구독 매출이 발생하는 제품으로 만들어 운영합니다.
```

### 이력서 간단 소개 · 제한 없음

```text
가능성을 기회로 바꾸고, 제품으로 가치를 전하는 메이커 김대정입니다.

기획자로 시작해 백엔드로 왔고, 아이디어를 제안한 AI 콘텐츠 제품의 FastAPI 백엔드와 AI 생성·평가 시스템을 직접 만들고 핵심 화면은 coding agent로 완성해 월 1천만원 수준의 구독 매출이 발생하는 제품으로 운영합니다. 커머스·피부과 운영·SNS 콘텐츠 세 도메인에서 현업의 반복 업무를 실제로 쓰이는 제품으로 만들었고, 백엔드 경험이 적은 팀원도 같은 기준으로 만들 수 있게 FastAPI 조직 표준을 직접 구축했습니다.

대규모 콘텐츠 데이터를 검수 가능한 구조와 사람 평가 워크벤치로 바꿨고, 시술 정보 지식 플랫폼의 hybrid retrieval API와 평가 게이트를 설계·구현하고 있습니다.
```

### AI 활용 경험 1 · 50자

```text
Claude Code·Codex로 분석·기능 목록화·반복 구현·검증, 판단은 직접
```

### AI 활용 경험 2 · 50자

```text
조직 표준 Backend Template에 agent context·자동화 skill 내장
```

### AI 활용 경험 3 · 50자

```text
제품 의사결정·QA·릴리스 기록을 agent가 읽는 실행 맥락으로 구조화
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

### 스킬 (우선순위) · 제한 없음

```text
Python · FastAPI · SQLAlchemy · PostgreSQL · MySQL · Redis · RabbitMQ · TaskIQ · LLM API · WebSocket · TypeScript · Next.js · Docker · GitHub Actions · Azure
```

## 적용 메모

- 텍스트 입력은 자동화가 저장되지 않는다(React state 분리). **사람이 붙여넣는다.** 클릭 기반(직무·스킬 combobox)만 자동화한다.
- 인증 경력(건강보험공단 연동)은 날짜를 수정할 수 없다. 더데이랩스 별도 row와 credentials는 안전한 추가 UI가 없어 미적용 상태를 유지한다.
- 저장 → 새로고침 → 필드 `value` 재확인.
