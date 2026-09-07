---
type: product-contract
title: JD Keyword Analysis
description: 개별 공고 분석에서 누적하는 키워드 관측의 저장·근거·중복·집계 계약.
timestamp: 2026-09-07
tags: [jd, keywords, observations]
---

# JD Keyword Analysis

## 범위와 owner

2026-09-07 사용자 승인으로 공고 분석 시 정규화 키워드 기록과 누적 분석을 기본 실행에 포함한다. 읽기 전용 요청은 우선한다. 원문 전체·자동 크롤링·과거 공고 일괄 적재·지원 registry 변경은 포함하지 않는다.

- `observations/{platform}-{posting-id}.json`: 공고별 최신 관측 owner. 재검토는 같은 파일을 갱신하며 확인되지 않은 이전 키워드를 그대로 합치지 않는다.
- `reports/keyword-observations.md`: 위 관측에서 재생성하는 누적 현황. 기존 feature/gap/market 리포트는 덮어쓰지 않는다.
- 스킬은 본 계약을 참조한다. 개인 역량은 profile/evidence owner를 참조하며 관측 파일에 복제하지 않는다.

## 관측 형식 (schema_version 1)

아래는 형식 예시이며 실제 공고로 적재하지 않는다.

```json
{
  "schema_version": 1,
  "id": "example-123",
  "url": "https://example.com/jobs/123",
  "company": "예시 회사",
  "title": "Backend Engineer",
  "role_category": "backend",
  "seniority": "3-5 years",
  "domain": null,
  "posted_at": null,
  "observed_at": "2026-09-07T21:00:00+09:00",
  "source_kind": "posting-page",
  "selection": "user-selected",
  "duplicate_of": null,
  "keywords": [
    {"term": "Python", "kind": "technology", "section": "required", "evidence": "자격요건 1항: Python으로 서버를 개발한 경험 요구"},
    {"term": "트랜잭션 설계", "kind": "responsibility", "section": "preferred", "evidence": "우대사항 2항: 트랜잭션 경계 설계 경험 우대"}
  ]
}
```

- URL의 추적 파라미터를 제거하되 공고 식별 파라미터는 보존한다. URL 없는 제공 본문은 `url: null`, `source_kind: user-text`와 별도 안정적인 ID를 사용한다. 게시일·연차·도메인 미상은 추정하지 말고 null로 둔다.
- `role_category`: `backend`, `ai-backend`, `product-engineer`, `platform`, `tech-lead`, `other`, `unknown`. 복합 역할은 주요 업무로 분류하고 모호하면 unknown. `selection`은 `user-selected`, `platform-recommended`, `systematic`, `unknown` 중 관측 경로를 기록한다.
- `section`: `required`, `preferred`, `responsibility`, `stack`, `unspecified`. 조건이 불분명하면 unspecified. 회사 소개의 기술 언급을 채용 필수 요건으로 바꾸지 않는다.
- `kind`: `technology` 또는 `responsibility`. 모든 키워드에는 원문 위치와 짧은 근거 요약을 붙인다. 이름만 보고 인접 기술을 추론하지 않는다 (Spring Boot → Java 자동 추가 금지).
- 기존 기록의 동일 의미 표기를 재사용한다 (Postgres → PostgreSQL). Spring과 Spring Boot, Java와 JavaScript, LLM 연동과 모델 학습 등 서로 다른 역량은 합치지 않는다. 표현을 통합할 때 근거의 의미·강도를 보존한다.
- 서로 다른 플랫폼/ID의 재게시가 같은 채용 건임을 확인했을 때만 `duplicate_of`에 대표 ID를 기록한다. 단순히 회사·직무명이 같다는 이유로 합치지 않는다. 판정 불명확한 재게시 가능성은 보고서 한계로 남긴다.
- 원문 핵심 업무·요건을 확인한 관측만 저장한다. 읽지 못한 페이지를 빈 keywords로 분모에 넣지 않는다. 정상적으로 확인했지만 해당 종류의 키워드가 없는 공고는 포함 가능하다.

## 집계와 보고

repo root에서 실행한다. helper는 JSON 결과를 stdout에 출력하며 파일은 수정하지 않는다.

```bash
uv run --project tools python skills/analyze-jd-fit/scripts/summarize_keywords.py wiki/products/jd/observations
uv run --project tools python skills/analyze-jd-fit/scripts/summarize_keywords.py wiki/products/jd/observations --role backend
```

- 공고 단위 집계: 한 키워드가 같은 공고에 반복되어도 총 빈도는 1건. 필수/우대별 건수는 각각 집계하므로 그 합이 총 건수와 같을 필요는 없다.
- 키워드 빈도는 `해당 키워드가 나온 공고 수 / 해당 집계 범위의 전체 공고 수`다. 관련 키워드가 있는 공고만 분모로 삼지 않는다. 표본 0건은 관측 없음으로 표시한다.
- 기본은 직무별 분리 집계이며 전체값을 BE 시장 수치로 표현하지 않는다. 보고서에는 역할·연차 범위·선택 경로·관측 기간·공고 수·중복 제외 수와 공고 링크를 명시한다. 연차별 비교가 필요하면 원문 연차를 확인해 범위를 분리한다.
- 숫자는 helper 출력에서 가져와 파생 보고서를 갱신한다. 이번 공고의 주요 키워드, 반복 요구, 내 claim과 연결되는 시사점을 구분하고 원문 → 관측 → 집계 근거를 추적할 수 있게 한다.
- 기본 명칭은 ‘검토한 관심 공고의 키워드 관측’이다. 추천·선택된 소수 공고로 전체 채용시장을 일반화하지 않는다. 키워드 미언급은 회사에서 미사용한다는 뜻이 아니다.
- 최신 관측만 보존하는 이 단계는 시계열 분석이 아니다. 증가/감소·요즘 대세 같은 주장은 하지 않는다. 기간별 비교 가능한 snapshot 수집은 별도 설계·승인 후 확장한다.

## 검증

관측 JSON 집계가 성공하고 `make verify`가 PASS여야 저장 완료로 보고한다. 집계 실패 시 숫자를 추정하지 말고 오류를 고치거나 미완료를 명시한다. skill helper의 행동 검증은 `uv run --project tools python -m unittest discover -s skills/analyze-jd-fit/scripts -p 'test_*.py'`로 실행한다.
