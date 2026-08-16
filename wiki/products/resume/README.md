---
type: index
title: Resume Product
description: Active web resume expression, evidence mapping, and JD-tailored resume contract.
timestamp: 2026-08-13
tags: [resume, product, master]
---

# Resume Product

이 디렉터리는 이력서의 제품 계약·claim 연결·파생 산출물 경계를 소유한다. 현재 웹 이력서의 문장·순서·강조는 `app/fe/app/resume/resume-view.tsx`가 표현 SoT로 소유한다.

## Product Contract

- 목적: 15초 안에 `Backend Engineer`와 `AI Product Systems` 적합성을 판단하게 한다.
- 차별점: `Agent-readable Engineering Workflow`는 backend 실행 방식의 근거로 제시한다.
- 입력: [profile](../../profile/README.md), [claim registry](../../evidence/claims/README.md)
- 상세 설명: [portfolio](../portfolio/README.md)
- 섹션·문체·분량: [content-contract.md](content-contract.md)
- 표현 SoT 소유권: [content-sot.md](../site/content-sot.md)
- 이력서 지면 역할: [surface-roles.md](../site/surface-roles.md)
- 표현 선택 기록: [decisions.md](decisions.md)
- artifact와 근거 연결: [claim-map.yaml](claim-map.yaml)

## Artifacts

| Path | Status | Role |
| --- | --- | --- |
| `app/fe/app/resume/resume-view.tsx` | active | KO 웹 이력서의 표현 SoT. EN은 같은 파일의 draft 파생본 |
| [master/v0/](master/v0/) | baseline | 기존 초안을 보존한 구조·시각 inventory. public-ready 아님 |
| [master/v1/](master/v1/) | superseded | 최초 evidence-linked A4 HTML baseline. 현재 source로 사용하지 않음 |
| `master/v2/`–`master/v4/` | superseded drafts | 현재 표현으로 이동하는 과정의 검토 기록 |
| `tailored/` | generated/local | 특정 JD에 맞춰 active contract·claim에서 선별한 지원 산출물 |

active artifact의 public claim은 claim registry에서 선택하고 [claim-map.yaml](claim-map.yaml)과 JSX `data-claim`으로 연결한다. `master/` 하위 버전은 새 산출물의 content source로 사용하지 않는다.

Execution record: [Resume Master v1 plan](../../docs/superpowers/plans/2026-07-11-resume-master-v1.md)
