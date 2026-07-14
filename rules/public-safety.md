---
type: policy
title: Public Safety Policy
description: Resume, portfolio, homepage에 공개할 수 있는 정보와 금지 범위.
timestamp: 2026-07-11
tags: [public-safety, privacy, resume]
---

# Public Safety Policy

## Allowed

- 회사명 MediSolve AI
- 제품명 Thready, Centurion
- Centurion feature명 DAY, BAY, RAY, SAY와 일반화된 기능 설명
- 공개 GitHub 계정 `github.com/Dae-Jeong`
- 시 단위 거주지
- claim registry에서 `public: true`인 표현
- claim registry로 승격된 범위화(banded) 운영 수치 — 예: `월 수만 건 규모`, `1% 미만`

## Forbidden

- 고객사와 브랜드 실명
- STT/LLM provider 실명
- 팀원 실명
- credential, private URL, source code path, 내부 conversation
- 공개 목적이 없는 commit count와 정확한 내부 운영 수치
- claim registry의 `forbidden_copy`
- `low`, `unknown`, `public: false` claim

## Public Copy Gate

1. stable claim ID가 있는가
2. `public: true`인가
3. allowed copy의 의미 범위 안인가
4. contribution strength를 넘지 않는가
5. 면접에서 evidence summary로 방어 가능한가

하나라도 아니면 public output에 사용하지 않는다.
