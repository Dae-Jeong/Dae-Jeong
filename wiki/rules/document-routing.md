---
type: routing
title: Document Routing Rules
description: Profile, evidence, product, rule, skill, archive 문서의 canonical 위치를 결정한다.
timestamp: 2026-07-11
tags: [rules, routing, source-of-truth]
---

# Document Routing Rules

## Routing Test

새 내용을 기록하기 전에 순서대로 판정한다.

1. 안정적인 개인 사실·정체성인가? `profile/`
2. 사실의 검증 근거·표현 강도·공개 범위인가? `evidence/`
3. 이력서·포트폴리오·홈페이지·JD 목적에 특화된 계약/산출물인가? `products/`
4. 여러 product에 적용되는 정책인가? `rules/`
5. 반복 실행 workflow인가? `skills/`
6. 현재 상태·작업 라우팅인가? `context/`
7. 역할이 끝난 과거 기록인가? `archive/`

## Canonical Ownership

| Content | Owner |
| --- | --- |
| headline, bio, career timeline, capabilities | `profile/` |
| Git/user/external verification, claim strength | `evidence/` |
| resume frame·selection contract·claim mapping | `products/resume/` |
| deployed resume expression | `app/fe/app/resume/resume-view.tsx` |
| portfolio cases | `products/portfolio/` |
| homepage contract·selection policy | `products/homepage/` |
| deployed homepage expression | `app/fe/app/page.tsx` |
| market corpus contract and derived reports | `products/jd/` |
| evidence labels and public restrictions | `rules/` |
| current task snapshot | `context/current-state.md` |
| idea backlog와 기획 상태 | `backlog/` (아이디어당 폴더 + `_template.md` 기반 README) |

## Duplication Rule

- canonical 문장은 한 파일만 소유한다.
- consumer는 문장을 복제하지 않고 stable claim ID나 repo-relative link를 사용한다.
- skill은 product contract를 복사하지 않고 참조한다.
- archive는 historical reference일 뿐 active source가 아니다.

## Portability Rule

- 활성 문서에는 PC별 절대경로를 넣지 않는다.
- 외부 source는 `workspace:<repo>`, `agentspace:<repo>`, `wiki:<document>` logical alias로 기록한다.
- 실제 경로는 ignored `.local/source-roots.yaml`에서만 설정한다.
- raw corpus, browser logs, render scratch, local plugin install은 Git에 넣지 않는다.
