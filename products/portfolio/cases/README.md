---
type: index
title: Case Library
description: 포트폴리오 케이스 스터디 마스터 라이브러리 — 회사별 페이지는 여기서 선별·조립만 한다.
timestamp: 2026-07-06
tags: [portfolio, cases, library]
---

# Case Library

제품 계약: [../decisions.md](../decisions.md). 회사별 포트폴리오는 이 라이브러리에서 **선별·조립만** 한다. 회사별로 케이스를 새로 쓰지 않는다.

## 케이스 목록

| 파일 | resume_tag | 유형 | claim strength |
| --- | --- | --- | --- |
| [thready-rebuild.md](thready-rebuild.md) | THREADY | AI product + 재구축 | 재구축·운영 전담 |
| [be-template.md](be-template.md) | BE TEMPLATE | 엔지니어링 표준 | 전담 설계·구축 |
| [mediness-ops.md](mediness-ops.md) | MEDINESS | agent 운영 시스템 | 구축·운영 |
| [bay-async.md](bay-async.md) | BAY | backend 비동기 아키텍처 | 구축·설계 주도 |
| [say-realtime.md](say-realtime.md) | SAY | realtime AI backend | cluster 단위 주도 |

## 작성 규칙

- 구조 고정: `문제 -> 접근 -> 구현 -> 운영/결과 -> Stack`. 각 소섹션은 2~4줄/bullet.
- frontmatter의 `claim_ids`가 [claim registry](../../../evidence/claims/README.md)를 직접 가리킨다. 케이스 본문은 해당 claim의 strength와 allowed copy 상한을 넘지 못한다.
- 공개 가드레일 상속: provider 실명 X, 고객사/브랜드명 X, 팀원 실명 X, 커밋 수 X, 미검증 수치 X.
- **전임자/기존 코드 폄하 금지** — "빠른 검증에 맞춘 초기 구조" 같은 중립 서술.
- **결과 주장은 확인된 사실만** — 적용/효과를 확인 안 했으면 "~하도록 설계"까지만.
- `diagram:` 라인 컨벤션 — `->`로 노드 구분, `[soft]` 접두는 보조 노드. 조립 시 CSS 다이어그램으로 변환.
- stack 항목도 검증 대상 (repo 의존성/설정으로 확인).

## 갱신 규칙

새 케이스 재료가 생기면: evidence record -> claim registry -> 여기 case -> resume/portfolio 선별 순서로 갱신한다. 순서 역행 금지.
