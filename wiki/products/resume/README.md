---
type: index
title: Resume Product
description: Active web resume expression, evidence mapping, and JD-tailored resume contract.
timestamp: 2026-08-18
tags: [resume, product, master]
---

# Resume Product

이 디렉터리는 이력서의 제품 계약·claim 연결·파생 산출물 경계를 소유한다. 현재 웹 이력서의 문장·순서·강조는 `app/fe/app/resume/resume-view.tsx`가 표현 SoT로 소유한다.

## Product Contract

- 목적: 첫 장에서 `Backend Engineer`와 `AI Product Systems` 적합성 판정을 시작하고, 전체 문서만으로 기술적 판단·구현·운영 역량을 검증하게 한다.
- 차별점: `Agent-readable Engineering Workflow`는 backend 실행 방식의 근거로 제시한다.
- 입력: [profile](../../profile/README.md), [claim registry](../../evidence/claims/README.md)
- 상세 설명: [portfolio](../portfolio/README.md)
- 섹션·문체·분량: [content-contract.md](content-contract.md)
- 표현 SoT 소유권: [content-sot.md](../site/content-sot.md)
- 이력서 지면 역할: [surface-roles.md](../site/surface-roles.md)
- 표현 선택 기록: [decisions.md](decisions.md)
- 역할 전달 기준: [role-positioning-standard.md](role-positioning-standard.md)
- 직군별 local draft 계약: [role-variants.md](role-variants.md)
- artifact와 근거 연결: [claim-map.yaml](claim-map.yaml)
- backend 케이스별 성과 후보: [backend-case-achievements.md](backend-case-achievements.md)
- 과거 회사의 제품 판단·기획 성과 후보: [product-decision-achievements.md](product-decision-achievements.md)
- 국내외 엔지니어 자기 PR benchmark: [research/2026-08-18-engineer-self-positioning.md](research/2026-08-18-engineer-self-positioning.md)

## Artifacts

| Path | Status | Role |
| --- | --- | --- |
| `app/fe/app/resume/resume-view.tsx` | active | KO 웹 이력서의 표현 SoT. EN은 같은 파일의 draft 파생본 |
| [role-variants.md](role-variants.md) | draft/local | 공통 틀에서 직군별 성과·근거·기술 순서를 바꾸는 지원본 계약 |
| [master/v0/](master/v0/) | baseline | 기존 초안을 보존한 구조·시각 inventory. public-ready 아님 |
| [master/v1/](master/v1/) | superseded | 최초 evidence-linked A4 HTML baseline. 현재 source로 사용하지 않음 |
| `master/v2/`–`master/v4/` | superseded drafts | 현재 표현으로 이동하는 과정의 검토 기록 |
| `tailored/` | generated/local | 특정 JD에 맞춰 active contract·claim에서 선별한 지원 산출물 |

active artifact의 public claim은 claim registry에서 선택하고 [claim-map.yaml](claim-map.yaml)과 JSX `data-claim`으로 연결한다. `master/` 하위 버전은 새 산출물의 content source로 사용하지 않는다.

Execution record: [Resume Master v1 plan](../../docs/superpowers/plans/2026-07-11-resume-master-v1.md)
