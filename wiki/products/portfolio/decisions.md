---
type: decision-log
title: Portfolio Decisions
description: Portfolio case library, tailored assembly, and delivery decisions.
timestamp: 2026-08-21
tags: [portfolio, decisions, pipeline]
---

# Portfolio Decisions

## Product Boundary

- 공통 hero는 Maker 브랜드 문장을 사용하고, eyeline의 `Tech Lead · Backend Engineer`와 case proof를 채용 역할·기술 근거로 분리한다.
- 정적 case library로 시작하며 profile application을 먼저 만들지 않는다.
- 대표 case는 공통 opener에서 역할·문제·결과를 먼저 제시하되, 본문은 각 사례의 판단 근거에 맞게 차등 구성한다. Thready는 제품화·재구축·data/AI boundary, Centurion은 contribution map·workload별 failure boundary, Infrastructure는 topology·change gate, Backend Template은 반복되는 backend 판단과 agent-readable execution을 중심으로 설명한다. 검증 상한은 내부 원장에만 둔다.
- 단일 문서는 성과 문구의 반복보다 `제품 0→1 / MSA failure boundary / infrastructure operation / engineering system` 네 대표 case를 먼저 보여준다.
- Memento Payment와 Product Operations는 이전 경력의 결제 상태 전이와 현재의 Decision→release 운영을 보완하는 supporting case다. 외부 UX 활동은 common resume에서만 독립 노출하고 public portfolio의 supporting case와 섞지 않는다.
- 공개 portfolio는 `/portfolio` 한 페이지에 네 대표 dossier와 두 supporting case를 모두 펼친다. 개별 route는 직접 링크 호환용으로 유지하지만, 기본 읽기·인쇄·PDF 변환은 단일 페이지를 기준으로 한다.
- claim 상한과 forbidden copy는 내부 case library에 보존하고, 공개 화면에는 `Limits`, `claim`, `Archived`, `준비 중` 같은 검증·제작 상태 문구를 노출하지 않는다.
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
