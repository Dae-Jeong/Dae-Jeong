---
type: policy
title: Evidence Policy
description: Profile and product claims의 evidence type, confidence, contribution strength 규칙.
timestamp: 2026-07-11
tags: [evidence, claims, confidence]
---

# Evidence Policy

## Evidence Types

| Label | Meaning |
| --- | --- |
| `Source-backed` | 공식 문서, 공개 URL, source-of-truth 문서로 확인 |
| `Code-backed` | local code, Git history, PR, repository document로 확인 |
| `Tool-backed` | command, test, browser, log, database 결과로 확인 |
| `Inference` | 검증 사실에서 도출한 해석이며 inference임을 표시 |
| `Assumption` | 진행을 위한 가정이며 사실로 사용하지 않음 |
| `Unverified` | 가능성은 있으나 확인 전 |
| `Unknown` | 현재 자료로 알 수 없음 |

## Confidence

- `high`: repo, Git, 공식 자료, 운영 문서로 직접 확인
- `medium`: 구조와 참여는 확인했지만 강한 ownership 표현은 제한
- `low`: 과거 이력서나 기억 기반
- `unknown`: 확인되지 않음

Public output은 `high`와 신중한 `medium`만 사용한다.

## Contribution Strength

| Value | Public meaning |
| --- | --- |
| `owned` | 해당 범위 설계·구축·운영 전담 |
| `led` | 해당 범위 주도적 설계·구축 |
| `co-led` | 공동 주 기여 또는 cluster 단위 주도 |
| `contributed` | 담당·참여·주 기여, 전체 구축 표현 금지 |

강도는 claim registry의 상한이다. Consumer는 더 약하게 쓸 수 있지만 더 강하게 쓸 수 없다.

## Claim Lifecycle

```text
source verification
      ↓
evidence summary
      ↓
claim registry approval
      ↓
profile summary
      ↓
resume / portfolio / homepage
```

새 claim은 evidence anchor, confidence, strength, public flag, allowed/forbidden copy를 함께 등록한다.
