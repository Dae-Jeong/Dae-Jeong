---
type: project-evidence
title: MediSolve 어드민 시스템 Evidence
description: 2025.10~ 진행 중인 통합 관리 시스템 백엔드 단독 구축 — registry에 없던 최신 실적.
timestamp: 2026-08-08
source_roots: [workspace]
tags: [medisolve, admin, backend, evidence]
---

# MediSolve 어드민 시스템 Evidence

Source locator: `workspace` (MediSolve AI 제품)

대상 고객사는 **데이뷰 + 세라미크** (user-confirmed 2026-08-08). 공개 산출물에서는 **`D·C 피부과`** 마스킹 코드를 쓰거나 고객사를 생략하고 "통합 관리 시스템"으로만 서술한다 — [clients.md](../clients.md).

⚠️ 플랫폼 프로필(그룹바이·oopy)에 `A 피부과`로 기재돼 있으나 **A로 시작하는 고객사는 존재하지 않는다.** 마스킹 시 임의로 붙은 글자이며 교체 대상이다.

**registry 공백이었다.** 2025.10부터 진행 중인 현재 실적인데 claim도 evidence 문서도 없었다. 플랫폼 프로필(그룹바이·oopy)에만 상세가 남아 있어 2026-08-08 수집으로 확보했다.

## Overview

- 기간: 2025.10 ~ 진행 중
- 스택: Python 3.13, FastAPI, SQLAlchemy 2.0, MySQL, Docker, Nginx, Azure
- 범위: 통합 관리 시스템 **백엔드 단독 구축**

## Architecture

- Self-reported: **Multi-Module Clean Architecture** 기반 — **30개 도메인** 백엔드 API 설계·구현(예약, CMS, 상품, 고객 관리 등)
- Homepage/Admin API를 독립 모듈로 두고 **Nginx 리버스 프록시로 단일 엔드포인트** 제공
- Router–Service–Repository–Model **4계층 분리**, DI Container 기반 의존성 주입

## Generic Repository

- **Generic BaseRepository** — SQLAlchemy 2.0 Generic 타입으로 공통 CRUD 표준화·재사용
- **Multi-tenancy(BranchMixin)**, **Soft Delete(SoftDeleteMixin)** 자동 필터링으로 데이터 격리 보장
- **Closure Table 패턴**으로 Category/Procedure 계층 구조 관리

## Connection Pool Stabilization

- Self-reported: SQLAlchemy 커넥션 풀 **타임아웃 문제를 분석**하고 `pool_size`/`max_overflow`를 최적화
- **미들웨어 실행 순서 개선 및 세션 생명주기 관리 강화로 500 에러 완전 해결**
- `pool_pre_ping` 활성화로 커넥션 유효성 자동 체크, API 응답 시간 안정화
- **함의**: 증상(500 에러)이 아니라 원인(풀 고갈·세션 수명)을 짚어 해결한 사례다. Thready quality lab의 "근본 원인을 짚는다" 패턴과 같은 계열이며, 포트폴리오 서술 소재로 적합하다.

## CI CD And Code Quality

- GitHub Actions + Docker Multi-stage Build 자동 빌드/배포
- Azure Container Registry + Azure VM 연동, **Managed Identity 인증**으로 보안 강화
- Build cache 활용 및 **Rolling update 무중단 배포**
- **Ruff + Pyright + pre-commit**으로 코드 품질 자동 검증, 타입 안정성 확보
- 코드 컨벤션 규칙 정립 후 **전체 코드베이스 리팩토링**
- 체계적 문서화 — Swagger 가이드, API 개발 가이드, 데이터베이스 설계 가이드

## Contribution Boundary

- **백엔드 단독 구축**이 자기 기재 표현이다. 프런트엔드·기획을 포함한 제품 전체로 확장 표현하지 않는다.
- 진행 중 프로젝트이므로 완료형("구축했다")보다 진행형·범위 한정 표현을 쓴다.

## Public Wording

- 공개 가능: Clean Architecture 4계층, 30개 도메인 규모, Generic Repository·Closure Table 패턴, Connection Pool 최적화로 500 에러 해결, Managed Identity·무중단 배포, Ruff/Pyright 품질 체계.
- **공개 금지**: 고객사 실명(마스킹 코드만), 지점 수·계약 규모, 내부 도메인 명칭 상세.
- ⚠️ 검증 대기: "30개 도메인", "500 에러 완전 해결"은 자기 보고다. repo·모니터링 대조로 근거를 확보하면 강도를 올릴 수 있다.

## Claim Candidates

| 후보 ID | statement 초안 | strength |
| --- | --- | --- |
| `medisolve-admin.backend-ownership` | 통합 관리 시스템 백엔드를 Multi-Module Clean Architecture 4계층으로 단독 설계·구축 (30개 도메인) | owned |
| `medisolve-admin.pool-stabilization` | 커넥션 풀 타임아웃 원인 분석과 세션 생명주기·미들웨어 순서 개선으로 500 에러 해소 | owned |
| `medisolve-admin.quality-automation` | Ruff·Pyright·pre-commit 기반 품질 자동 검증과 컨벤션 정립 후 전체 리팩토링 | owned |

## 관련

- [centurion.md](centurion.md) — 같은 시기 병행 제품
- [infrastructure.md](infrastructure.md) — Azure 인프라 소유 범위
- [be-template.md](be-template.md) — 조직 표준 template와의 관계 확인 필요 (이 프로젝트가 template 적용 사례인지, 별개 구축인지)
