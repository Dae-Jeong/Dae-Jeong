---
type: index
title: Resume Product
description: Active web resume expression, evidence mapping, and JD-tailored resume contract.
timestamp: 2026-09-05
tags: [resume, product, master]
---

# Resume Product

이 디렉터리는 이력서의 제품 계약·claim 연결·파생 산출물 경계를 소유한다. 현재 웹 이력서의 문장·순서·강조는 `app/fe/app/resume/resume-view.tsx`가 표현 SoT로 소유한다.

## Product Contract

- 목적: 첫 장에서 `Tech Lead · Backend Engineer`와 `AI Product Systems` 적합성 판정을 시작하고, 전체 문서만으로 제품 판단·기술 구현·production 운영 역량을 검증하게 한다.
- 차별점: 고객이 돈을 내는 이유를 찾고 팀과 실제 매출이 발생하는 제품으로 만든 경험을 먼저 보여준다. Backend·AI·핵심 frontend는 이 제품을 직접 완성한 실행 범위이며, 인계받은 backend 재구축·비동기 복구·AI 데이터 경계·조직 표준은 같은 역량이 다른 시스템에서도 반복됐음을 증명한다. Cloud/Delivery는 대표 전문성이 아니라 서비스 배포·기본 운영을 해본 보조 경험으로만 둔다.
- 입력: [profile](../../profile/README.md), [claim registry](../../evidence/claims/README.md)
- 상세 설명: [portfolio](../portfolio/README.md)
- 섹션·문체·분량: [content-contract.md](content-contract.md)
- 표현 SoT 소유권: [content-sot.md](../site/content-sot.md)
- 이력서 지면 역할: [surface-roles.md](../site/surface-roles.md)
- 표현 선택 기록: [decisions.md](decisions.md)
- 역할 전달 기준: [role-positioning-standard.md](role-positioning-standard.md)
- 회사별 고정·포장·제출 게이트: [Application Copy Standard](../../rules/application-copy-standard.md)
- 재사용 문안 블록 SoT (문제·판단·구현 경계·결과): [resume-block-library.md](resume-block-library.md)
- 직군별 local draft 계약: [role-variants.md](role-variants.md)
- 기본 이력서·경력기술서·포트폴리오·CV와 회사별 선택 규칙: [Resume Document Package Contract](document-package-contract.md)
- Common 네 문서의 화면·A4 개편 계획: [Common Document Visual Refresh](../../docs/superpowers/plans/2026-09-02-common-document-visual-refresh.md)
- 회사별 지원 status·artifact 상태: [Tailored Application Lifecycle](application-lifecycle.md)
- 지원 현황·마감 임박 조회: [report-application-status](../../../skills/report-application-status/SKILL.md)
- 분석·작성·검토 팀 협업: [run-application-team](../../../skills/run-application-team/SKILL.md)
- artifact와 근거 연결: [claim-map.yaml](claim-map.yaml)
- backend 케이스별 성과 후보: [backend-case-achievements.md](backend-case-achievements.md)
- 과거 회사의 제품 판단·기획 성과 후보: [product-decision-achievements.md](product-decision-achievements.md)
- 국내외 엔지니어 자기 PR benchmark: [research/2026-08-18-engineer-self-positioning.md](research/2026-08-18-engineer-self-positioning.md)
- 첫 페이지 설득 구조에서 수용한 원칙과 기존 contract mapping: [research/2026-09-05-first-page-persuasion-review.md](research/2026-09-05-first-page-persuasion-review.md)

## Artifacts

| Path | Status | Role |
| --- | --- | --- |
| `app/fe/app/resume/resume-view.tsx` | active | KO 웹 이력서의 표현 SoT. EN은 같은 파일의 draft 파생본 |
| [document-package-contract.md](document-package-contract.md) | active/canonical | Common 4종과 회사별 CV 선택 규칙을 소유하는 문서 패키지 계약 |
| [common-package.yaml](common-package.yaml) | active/canonical | Common 4종의 현재 state·route·visibility를 소유하는 tracked manifest |
| [common-content-inventory.yaml](common-content-inventory.yaml) | active/canonical | 검증된 경력·case block을 네 문서 깊이로 배치하는 assembly selection owner |
| [resume-block-library.md](resume-block-library.md) | active/canonical | 블록별 문안 원형(제목 + 문제·판단·구현 경계·결과)·강도·허용 수치·preset 순서의 owner. 회사별 문안은 여기서 시작한다 |
| [role-variants.md](role-variants.md) | draft/local | 공통 틀에서 직군별 성과·근거·기술 순서를 바꾸는 지원본 계약 |
| [master/v0/](master/v0/) | baseline | 기존 초안을 보존한 구조·시각 inventory. public-ready 아님 |
| [master/v1/](master/v1/) | superseded | 최초 evidence-linked A4 HTML baseline. 현재 source로 사용하지 않음 |
| [application-registry.yaml](application-registry.yaml) | active/canonical | 회사별 application status와 artifact metadata의 tracked owner |
| [application-lifecycle.md](application-lifecycle.md) | active/contract | `지원 전·진행중·합격·거절·탈락`과 revision·Snapshot 규칙 |
| `tailored/` | local/ignored | 회사별 공고·문안·제출 artifact 상세. tracked registry가 현재 lifecycle 판정을 소유 |

active artifact의 public claim은 claim registry에서 선택하고 [claim-map.yaml](claim-map.yaml)과 JSX `data-claim`으로 연결한다. `master/` 하위 버전은 새 산출물의 content source로 사용하지 않는다. V2–V4 문안 초안은 [resume master archive](../../archive/resume-master/README.md)에 보존한다.

회사별 지원의 current value owner는 [Application Registry](application-registry.yaml)이고, 상태 전이와 제출본 보호 규칙은 [Tailored Application Lifecycle](application-lifecycle.md)이 소유한다. `pre-apply`와 `in-progress`만 현재 진행 대상으로 보고 `accepted`·`declined`·`rejected`는 종료 결과로 분류한다. 제출 후 당시 파일·URL은 덮어쓰지 않으며 같은 회사 재지원은 새 날짜 폴더를 만든다.

Common은 이력서·경력기술서·포트폴리오·CV 네 문서를 모두 유지한다. 회사별 지원본은
이력서·경력기술서·포트폴리오를 기본으로 조립하고 CV만 선택 artifact로 둔다. 각 문서가
사실을 복제해 소유하지 않도록 세부 파생 규칙은
[Resume Document Package Contract](document-package-contract.md)를 따른다.

Execution record: [Resume Master v1 plan](../../docs/superpowers/plans/2026-07-11-resume-master-v1.md)
