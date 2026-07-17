---
type: index
title: Resume Product
description: General A4 master, evidence mapping, and JD-tailored resume contract.
timestamp: 2026-07-11
tags: [resume, product, master]
---

# Resume Product

이 디렉터리는 일반 이력서 master와 JD 맞춤 산출물의 제품 경계를 소유한다.

## Product Contract

- 목적: 15초 안에 `Backend Engineer`와 `AI Product Systems` 적합성을 판단하게 한다.
- 차별점: `Agent-readable Engineering Workflow`는 backend 실행 방식의 근거로 제시한다.
- 입력: [profile](../../profile/README.md), [claim registry](../../evidence/claims/README.md)
- 상세 설명: [portfolio](../portfolio/README.md)
- 섹션·문체·분량: [content-contract.md](content-contract.md)
- 표현 선택 기록: [decisions.md](decisions.md)
- artifact와 근거 연결: [claim-map.yaml](claim-map.yaml)

## Artifacts

| Path | Status | Role |
| --- | --- | --- |
| [master/v0/](master/v0/) | baseline | 기존 초안을 보존한 구조·시각 inventory. public-ready 아님 |
| [master/v1/](master/v1/) | active | evidence-linked Korean A4 general master |
| `tailored/` | generated/local | 특정 JD에 맞춰 v1에서 선별한 지원 산출물 |

v1의 모든 public bullet은 claim registry에서 선택하고 `claim-map.yaml`과 HTML `data-claim`으로 연결한다. v0 문구는 새 산출물의 content source로 사용하지 않는다.

Execution record: [Resume Master v1 plan](../../docs/superpowers/plans/2026-07-11-resume-master-v1.md)
