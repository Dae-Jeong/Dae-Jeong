---
type: decision-log
title: Portfolio Decisions
description: Portfolio case library, tailored assembly, and delivery decisions.
timestamp: 2026-07-11
tags: [portfolio, decisions, pipeline]
---

# Portfolio Decisions

## Product Boundary

- 정적 case library로 시작하며 profile application을 먼저 만들지 않는다.
- case 구조는 `문제 -> 접근 -> 구현 -> 운영/결과 -> Stack`으로 고정한다.
- resume에 선택된 case만 같은 순서로 조립한다.
- 동일 claim을 resume와 portfolio에서 서로 다른 강도로 표현하지 않는다.
- 새 case가 필요하면 회사별 페이지에서 즉석 작성하지 않고 [case library](cases/README.md)에 먼저 추가한다.

## Tailored Package

JD 하나에서 `resume.html`, `resume.pdf`, `portfolio.html`을 함께 생성한다. resume는 case anchor로 연결하고 PDF 헤더에는 portfolio URL을 둔다.

## Delivery

- 회사별 page는 정적 단일 HTML과 `noindex`를 기본으로 한다.
- 공개 경로에 회사명을 넣지 않고 opaque identifier를 사용한다.
- 도메인, 배포 계정, 회사-경로 mapping은 local deployment concern이며 이 repo의 profile SoT에 넣지 않는다.

Historical rationale은 [archived pipeline design](../../archive/resume-research/15-portfolio-pipeline-design.md)에 보존한다.
