---
type: index
title: Portfolio Product
description: Resume-selected claims의 문제, 접근, 구현, 운영 깊이를 제공한다.
timestamp: 2026-08-14
tags: [portfolio, cases, product]
---

# Portfolio Product

Portfolio는 resume가 선택한 claim의 깊이를 검증하는 제품이다.

## Contract

- Primary reader: engineering manager / senior engineer. Secondary reader: recruiter.
- Resume: 무엇을, 어떤 역할로, 어떤 기술로 했는지 한 줄로 제시
- Portfolio: 왜 필요했는지, 무엇을 선택했는지, 어떻게 구현·운영했는지 설명
- Resume claim을 반복하지 않고 `Problem -> Decision -> Design/Visualization -> Operating Result -> Responsibility -> JD fit`으로 확장한다.
- Portfolio는 resume보다 자세할 수 있지만 더 강한 ownership을 주장할 수 없다.
- claim ID, 검증용 limits, 내부 taxonomy와 evidence policy는 내부 원장에만 두고 공개 DOM에는 노출하지 않는다.
- 제목·설명·본문에는 `ch`나 임의의 `px` 기반 `max-width`로 줄 길이를 제한하지 않는다. 문서 컨테이너의 가용 폭을 사용하고 화면 폭에 따라 자연스럽게 줄바꿈한다.
- 현재 공개 문장·순서·강조는 `app/fe/app/portfolio/`와 `app/fe/lib/cases.ts`가 표현 SoT로 소유하고, 이 library는 케이스 범위·claim 연결·표현 상한을 소유한다.
- Canonical library: [cases/README.md](cases/README.md)
- Product decisions: [decisions.md](decisions.md)
- Historical visual baseline: [prototypes/v0.1.0/README.md](prototypes/v0.1.0/README.md)

회사별 페이지는 canonical case를 새로 쓰지 않고, 같은 JD 분석 결과로 resume와 동일한 case를 같은 순서로 선별·조립한다. 표현 강도는 연결된 claim registry를 넘지 않는다.
