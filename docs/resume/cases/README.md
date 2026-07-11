---
type: index
title: Case Library
description: 포트폴리오 케이스 스터디 마스터 라이브러리 — 회사별 페이지는 여기서 선별·조립만 한다.
timestamp: 2026-07-06
tags: [portfolio, cases, library]
---

# Case Library

설계: [../15-portfolio-pipeline-design.md](../15-portfolio-pipeline-design.md). 회사별 포트폴리오는 이 라이브러리에서 **선별·조립만** 한다 — 회사별로 케이스를 새로 쓰지 않는다.

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
- frontmatter의 `claim_strength`는 09 draft의 claim strength 표를 따른다 — 케이스 본문이 이 상한을 넘지 못한다.
- 공개 가드레일 상속: provider 실명 X, 고객사/브랜드명 X, 팀원 실명 X, 커밋 수 X, 미검증 수치 X.
- **전임자/기존 코드 폄하 금지** — "빠른 검증에 맞춘 초기 구조" 같은 중립 서술.
- **결과 주장은 확인된 사실만** — 적용/효과를 확인 안 했으면 "~하도록 설계"까지만.
- `diagram:` 라인 컨벤션 — `->`로 노드 구분, `[soft]` 접두는 보조 노드. 조립 시 CSS 다이어그램으로 변환.
- stack 항목도 검증 대상 (repo 의존성/설정으로 확인).

## 갱신 규칙

새 케이스 재료가 생기면: 09 claim strength 표 등재 -> 여기 케이스 작성 -> 이력서/포트폴리오에서 사용. 순서 역행 금지.
