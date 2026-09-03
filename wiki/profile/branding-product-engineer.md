---
type: profile
title: Product Engineer 관점 브랜딩
description: 회사별 지원본에서 쓰는 자기 정의 "Product Engineer"의 뜻, 근거, 습관, 표면별 적용과 금지 표현.
timestamp: 2026-09-03
tags: [identity, branding, product-engineer]
---

# Product Engineer 관점 브랜딩 (2026-09-03, user-confirmed)

[identity.md](identity.md)의 브랜드 정체성(Maker)은 그대로다. 이 문서는 그 아래 층, 채용 리뷰어에게 "무엇을 하는 사람인가"를 답하는 자기 정의를 소유한다.

## 한 줄

> **가능성을 제품으로 만들고, 끝까지 책임지는 Product Engineer 김대정입니다.**
> 기획자로 시작해 백엔드로 왔고, 지금은 고객이 구독하는 AI 제품을 만들고 운영합니다.

첫 문장은 메이커 문장과 같은 리듬이다(가능성을 ~로 만들고, ~하는 X). 둘째 문장이 15초 문장의 사실 1(기획자 출신)과 사실 2(결제 고객이 있는 제품)를 잇는다. 사실 3(조직 표준)은 그 다음 문단이 맡는다.

## Product Engineer가 뜻하는 세 가지

| | 뜻 | 근거 (claim) |
| --- | --- | --- |
| **정한다** | 무엇을 만들지 정하는 자리에 있다 | 기획자 출신(PM 1년, 제품 시스템 기획·기업 PoC) · Thready 아이디어 제안 · PO 역할 병행 · 제품별 결정·명세·릴리스 운영 리드 |
| **만든다** | 정한 것을 직접 만든다 | FastAPI 백엔드 재구축·운영 전담 · AI 실행부 분리·역할 객체 구현 · 핵심 화면(coding agent로 완성) · 누적 4,000 커밋 이상 |
| **책임진다** | 고객에게 닿은 뒤의 결과까지 본다 | 실제 사용자 운영·QA reopen 37%→11% · provider 장애 격리 운영 · 조직 표준 template로 팀의 실패 예방 · 회사 AX 구조 설계 참여 |

세 칸이 한 사람 안에 있는 것이 희소성이다. 하나만 있으면 기획자·개발자·운영자 중 하나다. "Product Engineer"는 이 셋을 슬래시 없이 한 단어로 묶는다. identity.md의 Dual Track 규칙("만들고, 무엇을 만들지도 함께 정한다")이 이 단어로 압축된다.

## 끝까지 책임진다는 말의 실체 — 반복되는 습관

"끝까지"는 태도가 아니라 설계 습관으로 증명한다. [Design Diagram Library](../products/portfolio/design-diagram-library.md)의 반복 습관 표가 근거다.

| 습관 | 어디서 반복됐나 |
| --- | --- |
| 늦게 도착한 것이 최신을 덮지 않게 한다 | Outbox version fence · 실시간 전사 sequence fence |
| 실패를 숨기지 않고 상태로 승격한다 | 주문·알림 worker · AI 생성 FAILED · 세션 풀 |
| 판정은 그 입력을 아는 자리에 둔다 | scout/writer guard · writer → planner 이동 |
| 자동화는 바닥에만, 판단은 사람에게 | AX 사람 게이트 · 의사결정 추천·확정 분리 · 품질 3층 |
| 검증되지 않은 것으로 전환하지 않는다 | IaC plan gate · 이관 지문 대조 · cutover E2E gate |

같은 습관이 제품·팀·조직·시스템 규모에서 반복된다는 것이 "끝까지"의 증거다. 면접에서 "Product Engineer가 뭐냐"고 물으면 이 표의 한 줄을 사례와 함께 말한다.

## 서사

Vision AI Engineer → PM → Backend Engineer → Product Engineer. 직무를 옮긴 게 아니라, 제품에 더 크게 기여하는 데 필요한 자리로 이동한 것이다. PM을 하면서 "만들 수 없는 기획"의 한계를 봤고, 백엔드로 와서 "무엇을 만들지 모르는 구현"의 한계를 봤다. 둘을 한 사람이 쥐는 자리가 Product Engineer다. 관통 질문("AI가 구현을 점점 더 많이 맡을수록, 사람이 끝까지 책임져야 하는 층을 어떻게 지킬 것인가")은 이 자리에서 나온 질문이다.

## 표면별 적용

| 표면 | 쓰는 것 |
| --- | --- |
| 홈 hero · 공통 이력서 소개 | 메이커 문장 (canonical, 변경 없음) |
| 회사별 포트폴리오 hero **헤드라인(메인, 큰 글씨)** · 이력서 소개 첫 블록 | 한 줄 (+ 이력서는 둘째 문장). 기존 헤드라인(`아이디어를 실제 고객이 결제하는 AI 제품으로…`)은 hero 위 보조 줄 |
| 헤더 | 공고 직무명 (`Backend Engineer · Tech Lead 역할 병행`, `Software Engineer / AI · Backend Engineer`) |
| 소개 마지막 | 관통 질문 |
| 포트폴리오 케이스 | 설계 도식 (습관이 보이는 흐름형) |
| 경력기술서 · 이력서 본문 | 도식 없이 서술 + GitHub 설계 노트 링크 (repo는 시각화 완료 뒤) |
| 면접 | "정한다·만든다·책임진다" 표의 근거 한 줄씩 + 습관 표 사례 |

Product Engineer는 소개에만 쓴다. 헤더·경력 행·역할 label에는 쓰지 않는다. 채용 시스템과 리뷰어는 공고 직무명으로 검색한다.

## 하지 않을 것

- `Backend Engineer / Product Engineer`처럼 슬래시 병기. 두 직군에 걸친 사람으로 읽힌다.
- 백엔드 깊이를 낮추는 표현. Product Engineer는 백엔드 위에 얹는 정의이지 대체가 아니다. 백엔드 공고에서는 헤더가 닻이다.
- 매출·수상을 개인 성과로 귀속. "고객이 구독하는 제품을 만들고 운영한다"까지다. 매출 수치는 claim 정책대로 팀 outcome.
- `돈을 내는`, `결제하는 제품` 같은 날것 표현을 첫 줄에. 결제 사실은 둘째 문장의 `구독하는`으로.
- 형용사 브랜딩(열정적·빠른·주도적). 목록과 도식이 대신한다.
- AI를 앞세운 자기 정의(AI Engineer, AI-native). AI는 습관 표의 "자동화는 바닥에만" 줄에서 드러난다.

## 관련

- [identity.md](identity.md) — 브랜드 정체성·canonical 한 줄·관통 질문·Dual Track
- [Application Copy Standard §1-1](../rules/application-copy-standard.md) — 회사별 소개 첫 줄 규칙
- [Resume Block Library `intro.product-engineer`](../products/resume/resume-block-library.md)
- [Design Diagram Library](../products/portfolio/design-diagram-library.md) — 습관 표의 owner
