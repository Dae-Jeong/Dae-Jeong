---
type: project-evidence
title: NEXUS Evidence
description: External hospital product backend monorepo and Terraform evidence. 어드민 시스템 evidence를 흡수했다.
timestamp: 2026-08-20
source_roots: [workspace, agentspace]
tags: [nexus, backend, terraform, admin, evidence]
---

# NEXUS Evidence

Source locators: `workspace:NEXUS`, `workspace:NEXUS-infra`, `agentspace:mediness-nexus`

⚠️ **2026-08-10 통합**: 별도 문서였던 `medisolve-admin.md`를 이 문서로 흡수했다.
Git 대조 결과 **동일 저장소**다 — `packages/admin-api`·`packages/homepage-api`·`api-gateway` 구조가
어드민 evidence 서술과 일치하고, `migration-daybeau.local.md`와 데이뷰 예약 데이터가 함께 있다.
Repository에서 직접 확인되는 어드민·예약 데이터는 데이뷰·세라미크 범위이고, 사용자 확인상 NEXUS의
제품 대상은 데이뷰·세라미크·벨리셀을 포함한다. 공개 산출물에서는 고객사명을 쓰지 않는다
([clients.md](../clients.md)).

⚠️ 플랫폼 프로필(그룹바이·oopy)에 `A 피부과`로 기재돼 있으나 **A로 시작하는 고객사는 존재하지 않는다.** 교체 대상이다.

## Git Ownership

실측 (2026-08-10, `workspace:NEXUS`):

| 항목 | 값 |
| --- | --- |
| 전체 커밋 | 881 |
| KimMarin 커밋 | **734 (83%)** |
| 기간 | 2025-11-28 — 2026-07-20 |
| admin-api 서비스 파일 | 44 |
| homepage-api 서비스 파일 | 9 |

**이 실측이 `medisolve-admin.*` 3건의 강등을 해소했다.** self-reported 뿐이라 `low`/`public: false`로 내렸던 사유가 소멸했다.

다만 **`owned`가 아니라 `led`다** — 자기 기재는 "백엔드 단독 구축"이었으나 커밋의 17%가 타인이다.

## Backend Architecture

- Code-backed: multi-brand backend monorepo의 service boundary, migration/domain audit, documentation governance가 확인됐다.
- Contribution boundary: backend architecture와 migration flow 주도. 고객 제품 전체 단독 구축은 아니다.
- 분리 기록 (2026-08-09): domain audit 과 documentation governance 를 `nexus.domain-audit-governance` 로 분리했다. **strength 는 `contributed`** — 위 contribution boundary 가 architecture 와 migration flow 만 '주도'로 명시하므로 audit·governance 를 `led` 로 표현할 근거가 없다. Git history 로 주도권이 확인되면 상향한다.

## Product Scope And Business Outcome

- User-confirmed (2026-08-20): NEXUS는 외부 피부과 여러 곳의 홈페이지·관리·예약 운영을 지원하는 시스템이다.
- User-confirmed (2026-08-20): 제품 적용 뒤 예약률이 개선됐고, 그 결과 고객사의 매출 성과에 기여했다.
- Contribution boundary: 김대정의 직접 기여는 NEXUS backend architecture·Admin/Homepage API·권한·데이터 경계의 설계·구축 주도다. 예약률과 매출은 여러 기능과 운영 변화가 함께 만든 제품·팀·고객사 outcome이므로 개인 단독 인과로 표현하지 않는다.
- Measurement boundary: 예약률의 기준 기간·분모·전후 수치와 매출 증분은 아직 확인되지 않았다. 공개 문구는 `예약률 개선과 고객사 매출 성과에 기여`까지만 허용하며, 정확한 증가율·매출액·직접 귀속은 사용하지 않는다.
- Delivery boundary: 현재 repository의 재구축·접근 경계 작업은 진행 중이다. 기존 운영 제품의 outcome을 현재 branch의 production 배포 완료나 안정화 효과로 소급하지 않는다.

## Terraform Infra

- Code-backed: NEXUS Terraform repository의 구축 범위가 확인됐다.
- Contribution boundary: 해당 IaC repository 구축 전담. 고객 resource detail은 공개하지 않는다.

## Admin Backend

`medisolve-admin.md`에서 이관 (2026-08-10, 2026-08-18 source 정정). 기간 2025.10~ 진행 중, 스택 Python 3.13 · FastAPI · Tortoise ORM · MySQL · Docker · Azure.

- Code-backed: **Homepage/Admin API 독립 모듈** — `packages/admin-api`, `packages/homepage-api`를 `api-gateway`로 단일 엔드포인트 제공
- Code-backed: **Router–Service–Repository–Model 계층 분리**, DI Container 기반 의존성 주입
- Code-backed: **Generic BaseRepository** — Tortoise ORM model generic으로 공통 CRUD 표준화
- Code-backed: **Multi-tenancy(`BranchMixin`)**, Soft Delete 자동 필터링으로 데이터 격리

**자기보고 정정 2건** (2026-08-10 Git 대조):

| 자기 기재 | 실측 | 처리 |
| --- | --- | --- |
| 30개 도메인 | admin-api 44 + homepage-api 9 서비스 파일 | **수치 자체를 뺐다** — 파일 수는 도메인 수가 아니다 |
| Closure Table 패턴으로 Category/Procedure 계층 관리 | **repo 전수 검색에서 미발견** | `allowed_copy`에서 **제거** |

Closure Table은 `grep`이 base64 문자열에 우연 일치했을 뿐 실제 구현이 없다. 자기보고 오류다.

## Working Branch Access Boundary

Code-backed (2026-08-17, `workspace:NEXUS`):

- Admin API의 working branch는 클라이언트 `X-Branch-Id`로 바꾸지 못하고, 로그인 시 `AccessToken` DB에서 읽은 값을 JWT·server auth state로 전달해 결정한다.
- working branch 전환은 권한을 검증하는 `PATCH /branches/select/{branch_id}`로만 수행하고, 본사 사용자의 지점 미선택은 `409`, 권한 밖 지점 접근은 `403`으로 구분해 차단한다.
- 변경 범위를 Admin API에 한정해 shared auth middleware와 Homepage API의 기존 header 기반 지점 식별 계약은 유지했다.
- 연관 commit: `fd8e1173`, `fade5bb9`, `1766c1ea`.

**검증·기여 경계**:

- NEXUS는 2026-08 기준 구축 진행 중이다.
- 연관 test 중 `skip`·`xfail`과 과거 header 기반 test description이 남아 있어 **전체 branch 접근 회귀 시나리오 검증 완료**는 claim하지 않는다.
- 기여 상한은 Admin API의 server-owned working branch·권한 검증 전환 경계 설계·구현 주도다. 제품 전체 접근 제어 체계나 보안 문제를 단독으로 해결했다고 표현하지 않는다.

## Connection Pool

- Code-backed: `feat(P2-11): Connection Pool 설정 환경변수화` 커밋으로 **작업 사실** 확인
- ⚠️ **결과는 미확인** — "미들웨어 실행 순서 개선으로 500 에러 완전 해결"은 전후 모니터링 지표가 없다. 작업까지만 claim하고 효과는 쓰지 않는다. 그래서 이 claim만 `confidence: medium`이다.

## Code Quality

- Code-backed: `.pre-commit-config.yaml`, `pyproject.toml`의 `ruff`·`pyright` 의존성 확인
- 코드 컨벤션 정립 후 전체 코드베이스 리팩토링, Swagger·API·DB 설계 가이드 문서화
- Managed Identity 인증과 롤링 배포 파이프라인
- **be-template(조직 표준)과 범위가 다르다** — 이것은 단일 제품 내 품질 체계다

## Project Boundary With DAY And Centurion

- User-confirmed correction (2026-08-20): **NEXUS와 DAY는 서로 다른 프로젝트다.**
- NEXUS는 특정 외부 피부과들의 홈페이지·관리·예약 운영을 지원하는 multi-brand system이다.
- DAY는 특정 고객사 전용 운영 시스템이 아니라 범용 피부과 CRM을 목표로 한 Centurion project다.
- 두 프로젝트는 같은 회사의 의료 제품·infra context를 공유할 수 있지만, 제품 범위·고객·repository·성과를 서로의 근거로 합치지 않는다.
- 2026-08-12의 `NEXUS는 Centurion 제품군의 repository label` 판정은 이번 사용자 정정으로 superseded다. NEXUS를 DAY의 이전 버전·기반 시스템 또는 Centurion의 기능명으로 설명하지 않는다.

## Public Disclosure

- active public resume에서는 고객사·코드명을 빼고 `여러 피부과의 운영·예약 시스템`으로 설명한다. claim namespace `nexus.*`는 repository trace를 위해 유지한다.
- 고객사와 브랜드명은 공개하지 않는다. 고객사 식별이 필요하지 않은 문장에서는 마스킹 코드도 생략한다.

## Rejected Or Unverified Claims

- 고객사명과 브랜드명 (`A 피부과`는 존재하지 않는 임의 코드다)
- 병원 SaaS 전체 단독 구축
- **backend 단독 구축** — Git 기준 83%이며 100%가 아니다
- 구체 resource, cost, security configuration
- **Closure Table 패턴** — repo에 없다
- **도메인 개수 단정** — 파일 수를 도메인 수로 환산할 근거가 없다
- **500 에러 완전 해결·응답 시간 개선** — 모니터링 지표 없음
- **MAU·긴급 이슈 발생률·서버 비용 절감률** — evidence 어디에도 없다 (그룹바이 기재분, 2026-08-10 확인)
- 예약률 개선의 정확한 수치·매출 증분·개인 단독 인과
- NEXUS와 DAY를 같은 제품·repository·성과로 합치는 표현

## 관련

- [centurion.md](centurion.md) — 같은 시기 병행 제품
- [infrastructure.md](infrastructure.md) — Azure 인프라 소유 범위
- [be-template.md](be-template.md) — 조직 표준 template와 구분할 것
