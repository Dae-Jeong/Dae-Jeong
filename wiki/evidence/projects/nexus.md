---
type: project-evidence
title: NEXUS Evidence
description: External hospital product backend monorepo and Terraform evidence. 어드민 시스템 evidence를 흡수했다.
timestamp: 2026-08-10
source_roots: [workspace, agentspace]
tags: [nexus, backend, terraform, admin, evidence]
---

# NEXUS Evidence

Source locators: `workspace:NEXUS`, `workspace:NEXUS-infra`, `agentspace:mediness-nexus`

⚠️ **2026-08-10 통합**: 별도 문서였던 `medisolve-admin.md`를 이 문서로 흡수했다.
Git 대조 결과 **동일 저장소**다 — `packages/admin-api`·`packages/homepage-api`·`api-gateway` 구조가
어드민 evidence 서술과 일치하고, `migration-daybeau.local.md`와 데이뷰 예약 데이터가 함께 있다.
어드민 대상 고객사는 **데이뷰 + 세라미크**이며 공개 시 **`D·C 피부과`** 마스킹 코드를 쓴다 ([clients.md](../clients.md)).

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

## Terraform Infra

- Code-backed: NEXUS Terraform repository의 구축 범위가 확인됐다.
- Contribution boundary: 해당 IaC repository 구축 전담. 고객 resource detail은 공개하지 않는다.

## Admin Backend

`medisolve-admin.md`에서 이관 (2026-08-10). 기간 2025.10~ 진행 중, 스택 Python 3.13 · FastAPI · SQLAlchemy 2.0 · MySQL · Docker · Azure.

- Code-backed: **Homepage/Admin API 독립 모듈** — `packages/admin-api`, `packages/homepage-api`를 `api-gateway`로 단일 엔드포인트 제공
- Code-backed: **Router–Service–Repository–Model 계층 분리**, DI Container 기반 의존성 주입
- Code-backed: **Generic BaseRepository** — SQLAlchemy 2.0 Generic 타입으로 공통 CRUD 표준화
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

## Relation To Centurion (2026-08-12 user-confirmed)

> user: "centurion & nexus 사실 거의 동일하거든"

**NEXUS는 별도 제품이 아니라 Centurion 제품군의 저장소 라벨이다.**
`clients.md`도 어드민 시스템을 "**Centurion** 데이뷰 & 세라미크 어드민 시스템"으로 기록한다.

→ **공개 문안에서 NEXUS를 Centurion과 나란히 놓지 않는다.** 저장소 라벨을 제품으로 병기하면
담당 제품이 하나 더 있는 것처럼 읽혀 범위가 부풀려진다 (claim 강도 부풀리기와 같은 문제).

→ 공개 표기는 **어드민/통합 관리 시스템**이라는 기능 명칭으로 푼다
(2026-08-12 user 제안: "그런 어드민 시스템 구축 및 운용 이런식으로 풀어도 되지않을까?").
역량 축 제목에 제품·저장소 코드명을 쓰지 않는 v4.1 규칙과도 정합한다.

→ evidence 문서와 claim namespace(`nexus.*`)는 저장소 단위 추적을 위해 그대로 둔다.
바뀌는 것은 **공개 문안의 표기**뿐이다.

## Public Disclosure

- `NEXUS`는 외부 병원 product backend를 가리키는 public label로 사용한다.
- 고객사와 브랜드명은 공개하지 않는다. 어드민 고객사는 **`D·C 피부과`** 마스킹 코드로만 쓴다.

## Rejected Or Unverified Claims

- 고객사명과 브랜드명 (`A 피부과`는 존재하지 않는 임의 코드다)
- 병원 SaaS 전체 단독 구축
- **backend 단독 구축** — Git 기준 83%이며 100%가 아니다
- 구체 resource, cost, security configuration
- **Closure Table 패턴** — repo에 없다
- **도메인 개수 단정** — 파일 수를 도메인 수로 환산할 근거가 없다
- **500 에러 완전 해결·응답 시간 개선** — 모니터링 지표 없음
- **MAU·긴급 이슈 발생률·서버 비용 절감률** — evidence 어디에도 없다 (그룹바이 기재분, 2026-08-10 확인)

## 관련

- [centurion.md](centurion.md) — 같은 시기 병행 제품
- [infrastructure.md](infrastructure.md) — Azure 인프라 소유 범위
- [be-template.md](be-template.md) — 조직 표준 template와 구분할 것
