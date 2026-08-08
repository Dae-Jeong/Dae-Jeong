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

## Client Masking

고객사는 **내부에는 실명, 공개 산출물에는 마스킹**으로 이원화한다 (2026-08-08 결정).

- `evidence/`와 `profile/`에는 실명을 기록한다. 근거 추적과 면접 답변에 실명이 필요하기 때문이다.
- resume, portfolio, homepage, 채용 플랫폼 프로필 등 **외부에 노출되는 모든 산출물에는 마스킹 코드**를 쓴다.
- 마스킹 코드와 실명의 매핑은 [evidence/clients.md](../evidence/clients.md)가 단독 소유한다. 다른 문서는 매핑을 복제하지 않는다.
- 마스킹 코드는 산출물 간에 일관되게 유지한다 — 같은 고객사가 문서마다 다른 코드로 불리면 안 된다.
- 규모·업종 등 식별로 이어지지 않는 속성은 마스킹 코드와 함께 서술해도 된다 (예: `C 피부과 · 강남 소재 3개 지점`).

## Forbidden

- 고객사와 브랜드 실명 (public output 한정 — 위 Client Masking 참조)
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
