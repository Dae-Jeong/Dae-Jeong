---
type: index
title: Claim Registry
description: Public outputs가 소비하는 stable claim IDs and expression boundaries.
timestamp: 2026-07-11
tags: [claims, evidence, registry]
---

# Claim Registry

프로젝트 또는 동일 evidence boundary별 YAML 파일로 claim을 관리한다.

## Files

| File | Scope |
| --- | --- |
| `career.yaml` | role evolution and prior career |
| `credentials.yaml` | education, awards, patent, certification |
| `thready.yaml` | AI content product backend and quality system |
| `centurion.yaml` | BAY/SAY/DAY/RAY/SSO/infra |
| `nexus.yaml` | external product backend and IaC |
| `be-template.yaml` | organization backend standard |
| `mediness.yaml` | agent-readable product operations |

## Consumer Rule

- Public output은 `public: true` claim만 사용한다.
- `allowed_copy`는 예시이자 의미 상한이며 그대로 복사할 필요는 없다.
- `forbidden_copy`는 consumer가 반복해서 만들기 쉬운 과장 표현이다.
- Resume HTML은 `data-claim`, Markdown output은 claim ID 주석 또는 claim map으로 연결한다.
