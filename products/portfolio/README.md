---
type: index
title: Portfolio Product
description: Resume-selected claims의 문제, 접근, 구현, 운영 깊이를 제공한다.
timestamp: 2026-07-11
tags: [portfolio, cases, product]
---

# Portfolio Product

Portfolio는 resume가 선택한 claim의 깊이를 검증하는 제품이다.

## Contract

- Resume: 무엇을, 어떤 역할로, 어떤 기술로 했는지 한 줄로 제시
- Portfolio: 왜 필요했는지, 무엇을 선택했는지, 어떻게 구현·운영했는지 설명
- Canonical library: [cases/README.md](cases/README.md)
- Product decisions: [decisions.md](decisions.md)
- Historical visual baseline: [prototypes/v0.1.0/README.md](prototypes/v0.1.0/README.md)

회사별 페이지는 canonical case를 새로 쓰지 않고, 같은 JD 분석 결과로 resume와 동일한 case를 같은 순서로 선별·조립한다. 표현 강도는 연결된 claim registry를 넘지 않는다.
