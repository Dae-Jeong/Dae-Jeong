---
type: draft
title: v4 3축 근거 보강 초안
description: 관통선 설득력을 높이기 위한 claim 분리·복원 후보와 정합성 충돌 1건.
timestamp: 2026-08-09
status: draft
tags: [resume, v4, claim, evidence, draft]
---

# v4 3축 근거 보강 초안

목적은 **균형 맞추기가 아니다.** Thready가 메인 프로젝트이므로 근거가 두꺼운 것은 정상이다.

보강 목적은 **"다른 프로젝트에서도 같은 방식으로 일했다"는 증거 확보** — 관통선이 한 프로젝트의 특수 사례가 아니라 일하는 방식임을 보이기 위해서다.

**축 2(측정과 게이트로 판정 가능하게 만든다)는 현재 2개 프로젝트만 교차한다** — thready·mediness. 관통선 요건(3개 이상)에 미달하므로 이 보강은 **선택이 아니라 v4의 전제 조건**이다.

초안 1차는 3개 교차라고 적었으나, 억지 배치 2건(`centurion.say-realtime-ai` — 안정화 작업, `thready.qa-reopen-reduction` — 결과)을 걷어내면서 2개로 떨어졌다.

---

## A. 분리 후보 1 — Centurion test·CI infrastructure

### 문제

현재 `centurion.bay-async-backend` 한 claim에 **성격이 다른 두 가지가 묶여 있다**:

> BAY 주문·재고 backend와 RabbitMQ·TaskIQ worker flow, retry, **test·CI·onboarding** 구축 주도

- 앞부분(주문·재고 backend, worker 분리) = **축 1** (구조 재정의)
- 뒷부분(test·CI·onboarding) = **축 2** (검증 가능한 상태)

한 claim이 두 축에 걸쳐 있어 산출물에서 한쪽으로만 쓰게 된다. 지금은 축 1에 배치돼 있고 **검증 근거가 묻혀 있다.**

### 근거 (기존, 추가 조사 불필요)

`evidence/projects/centurion.md#bay-async-backend`:

> **Code-backed**: order, product, inventory API와 TaskIQ/RabbitMQ worker, inventory retry, **API test infrastructure, Docker CI, onboarding documents**가 확인됐다.

Code-backed로 이미 확인된 사실이다. 새 조사 없이 분리만 하면 된다.

Git history 실측(2026-08-09)에서도 뒷받침된다 — `workspace:BAY-BE-API`:

- `2026-01-11 test: API 테스트 커버리지 대폭 확대 및 역기획 문서화`
- `2026-01-12 refactor: HQ(본사) 개념 제거 및 테스트 인프라 구축 (#315)`
- `2026-03-30 docs: FE 온보딩 가이드 및 Docker Compose 원클릭 셋업 (#321)`

### 신규 claim 초안

```yaml
  - id: centurion.test-ci-foundation
    statement: BAY backend의 API test infrastructure, Docker CI 구축과 onboarding 문서 정비
    strength: led
    confidence: high
    public: true
    evidence: [evidence/projects/centurion.md#bay-async-backend]
    allowed_copy:
      - API test infrastructure와 Docker CI 구축 주도
      - 로컬 실행·온보딩 문서를 함께 정비해 재현 가능한 개발 환경 구성
    forbidden_copy:
      - 테스트 커버리지 수치 (측정값 없음)
      - CI 도입으로 인한 결함 감소율 (미검증)
      - 조직 전체 CI 표준 수립 (BAY 범위다)
      - "검증 기반을 기능보다 먼저 만들었다" 류의 시간 순서·의도 주장 (근거에 없다)
    verified_at: 2026-07-11
```

### 기존 claim 조정

`centurion.bay-async-backend`의 statement에서 `test·CI·onboarding`을 빼고 구조 재정의에 집중시킨다. allowed_copy도 함께 정리한다.

---

## B. 분리 후보 2 — NEXUS domain audit / docs governance

### 문제

`nexus.backend-architecture`에 세 가지가 묶여 있다:

> 외부 병원 product backend monorepo의 **service boundary**, **migration·domain audit**, **docs governance** 주도

- service boundary = **축 1** (구조 재정의)
- domain audit, docs governance = **축 2·3** (검증·팀)

audit은 명백히 검증 활동인데 아키텍처 claim에 묻혀 있다.

### 근거 (기존)

`evidence/projects/nexus.md#backend-architecture`:

> **Code-backed**: multi-brand backend monorepo의 service boundary, **migration/domain audit, documentation governance**가 확인됐다.

### 신규 claim 초안

⚠️ **강도 주의**: `nexus.md`의 contribution boundary는 **"backend architecture와 migration flow 주도"**만 명시한다. domain audit·docs governance는 그 '주도' 범위에 포함돼 있지 않으므로 **`contributed`가 맞다.** Git history로 주도권이 확인되면 그때 `led`로 올린다.

```yaml
  - id: nexus.domain-audit-governance
    statement: multi-brand backend monorepo의 domain audit과 documentation governance 수행
    strength: contributed
    confidence: high
    public: true
    evidence: [evidence/projects/nexus.md#backend-architecture]
    allowed_copy:
      - domain audit과 문서 governance 수행
    forbidden_copy:
      - audit 적발 건수·개선율 (측정값 없음)
      - 고객 제품 전체 품질 책임 (backend 범위다)
      - 경계 위반 관리·문서 부채 해소 등 효과 서술 (evidence 범위를 넘는다)
      - led/owned 강도 (contribution boundary가 architecture와 migration만 '주도'로 명시)
    verified_at: 2026-07-11
```

---

## C. 복원 후보 — medisolve-admin.pool-stabilization

현재 `strength: contributed` · `confidence: low` · `public: false`로 강등돼 있다. 근거가 self-reported(플랫폼 기재)뿐이기 때문이다.

**복원 조건**: Git history·배포 설정·모니터링 지표 대조로 아래를 확인한다.

| 확인 대상 | 방법 |
| --- | --- |
| 커넥션 풀 설정 변경 | 해당 repo의 `pool_size`/`max_overflow`/`pool_pre_ping` 커밋 |
| 미들웨어 실행 순서 개선 | 미들웨어 등록 순서 변경 커밋 |
| 5xx 해소 | 모니터링 대시보드 전후 비교 (있다면) |

확인되면 `confidence: high` · `public: true`로 올리고 **축 2에 배치**한다. "원인을 짚어 해결"은 2축 서사에 정확히 맞는 사례다.

⚠️ 모니터링 지표가 없으면 **"5xx 해소"는 계속 쓰지 않는다.** 설정 변경 사실까지만 claim한다.

---

## D. ⚠️ 정합성 충돌 발견 — Celery → TaskIQ

**TellingMe 수치와 같은 패턴이다.**

`evidence/projects/centurion.md#bay-async-backend`:

> **Unverified**: 기존 이력서의 `Celery -> TaskIQ migration` 서사는 **Git history 추가 검증 전 사용하지 않는다.**

그런데 **그룹바이·oopy에는 이미 공개돼 있다**:

> 2. **비동기 작업 시스템 아키텍처 개선 (Celery → TaskIQ 마이그레이션)**
>    - 기존 Celery 기반 시스템을 TaskIQ + RabbitMQ로 전환하여 시스템 복잡도 감소
>    - 비동기 알림톡 발송 시스템을 독립 도메인으로 분리, 결합도 제거

wiki 정책은 "사용 금지"인데 플랫폼에는 상세히 적혀 있다.

### 처리 방향 (택1)

1. **Git history 검증 후 claim 승격** — 마이그레이션 커밋이 확인되면 `centurion.async-migration` 신설. **축 1(구조 재정의) 근거로 강력하다** — 기존 시스템을 갈아끼운 판단이기 때문이다
2. **플랫폼에서 내린다** — TellingMe 수치와 같은 처리

**1번으로 확정 — 검증 완료 (2026-08-09).**

`workspace:BAY-BE-API` Git history 실측:

| 날짜 | 커밋 |
| --- | --- |
| 2025-09-08~09 | `feat: TaskIQ 1차/2차/3차 구성 마무리` |
| 2025-09-09 | `fix: 승인 관련 로직 celery 로직 사용하는 영역 제거` · `fix: TaskIQ context 주입 오류 해결` |
| **2025-09-14** | **`feat: 대규모 시스템 리팩토링 — Notification/Celery 제거 및 Alimtalk/TaskIQ 마이그레이션`** |
| 2025-09-15 | `Remove/notification celery (#304)` |
| 2025-10-01 | `fix: taskIQ 재고 차감 처리 오류 시, retry 로직 추가` |

전부 `KimMarin` 명의이며, 플랫폼 기재 문구("기존 Celery 기반 시스템을 TaskIQ + RabbitMQ로 전환, 알림톡 발송을 독립 도메인으로 분리")와 커밋 내용이 일치한다.

→ `centurion.md`의 Unverified 항목을 해제하고 **Code-backed로 승격 가능**하다.

```yaml
  - id: centurion.async-migration
    statement: BAY backend의 비동기 처리를 Celery에서 TaskIQ + RabbitMQ로 전환하고 알림 발송을 독립 도메인으로 분리
    strength: led
    confidence: high
    public: true
    evidence: [evidence/projects/centurion.md#bay-async-backend]
    allowed_copy:
      - 비동기 작업 시스템을 Celery에서 TaskIQ + RabbitMQ로 전환
      - 알림 발송을 독립 도메인으로 분리해 결합도 제거
      - 워커 이미지를 분리해 배포 단위를 나눔
    forbidden_copy:
      - 전환으로 인한 성능·지연 개선 수치 (측정값 없음)
      - "시스템 복잡도 감소" 정량 표현 (측정값 없음)
    verified_at: 2026-08-09
```

⚠️ 플랫폼 기재의 **"시스템 복잡도 감소"**는 측정값이 없으므로 forbidden_copy로 막았다. 전환 사실까지만 claim한다.

⚠️ 함께 처리: `centurion.md`의 `Unverified: 기존 이력서의 Celery -> TaskIQ migration 서사는 Git history 추가 검증 전 사용하지 않는다` 항목을 **Code-backed 기록으로 교체**해야 한다.

---

## 보강 후 예상 분포

| 축 | 현재 | 보강 후 |
| --- | --- | --- |
| 1. 문제의 경계를 다시 잡는다 | 6건 / **4개 프로젝트** ✅ | +`centurion.async-migration` (검증 완료) |
| 2. 측정과 게이트로 판정 가능하게 만든다 | 6건 / **2개 프로젝트** ⚠️ | +`centurion.test-ci-foundation` +`nexus.domain-audit-governance` → **4개 프로젝트** ✅ |
| 3. 해결을 표준과 자동화로 확장한다 | 6건 / **4개 프로젝트** ✅ | 유지 |

**축 2만 미달이고, A·B 승격으로 해소된다.** Thready 비중은 그대로 두고 다른 프로젝트 근거만 더하는 방식이다.

`medisolve-admin.pool-stabilization`은 복원되면 축 2에 추가되나, Git history 대조가 선행돼야 하므로 위 표에서는 제외했다.

## 실행 순서

1. **A·B 분리** — 기존 Code-backed 근거만 쓰므로 즉시 가능
2. **D 검증** — `workspace:CENTURION-BE-API` 등에서 Celery→TaskIQ 커밋 확인 (낮은 비용)
3. **C 검증** — 어드민 repo Git history 대조

## 선행 확인

- A·B 분리 시 **기존 claim의 statement·allowed_copy 축소**가 함께 필요하다. 같은 사실이 두 claim에 중복되면 registry 원칙 위반이다.
- 분리된 claim이 `resume v4`·플랫폼 문안에 실제로 쓰일 자리가 있는지 확인 후 승격한다. 쓰이지 않을 claim을 늘리는 것은 registry 부채다.
