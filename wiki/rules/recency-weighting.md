---
type: policy
title: Recency Weighting Policy
description: 경력 시점에 따라 서술 분량과 배치 비중을 차등하는 규칙. resume·portfolio·플랫폼 프로필 공통.
timestamp: 2026-08-18
tags: [policy, resume, portfolio, weighting]
---

# Recency Weighting Policy

**최근 일이 지금의 나를 더 정확히 설명한다.** 오래된 성과가 최신 실적보다 넓은 지면을 차지하면, 독자는 "지금 무엇을 하는 사람인가"를 읽지 못한다.

이 규칙은 resume, portfolio, 채용 플랫폼 프로필에 공통 적용한다.

## 핵심 원칙 — 분량과 검증 자산을 분리한다

시간 가중을 단순 적용하면 문제가 생긴다. STUDIO LAB(2021.12–2024.01)은 오래됐지만 **CES 2024 수상과 특허**를 갖고 있다. 시간 순으로 눌러버리면 가장 강한 제3자 검증이 사라진다.

그래서 두 축을 나눈다.

| 축 | 기준 | 적용 |
| --- | --- | --- |
| **서술 분량** | 최근일수록 넓게 | 경력 bullet 수, portfolio case 깊이 |
| **검증 자산** | 시점 무관 | Credentials 섹션에서 독립 노출 |

CES·특허·외부 인증은 **경력 서술 안에 묻지 않고 Credentials로 올려** 시점과 무관하게 보이게 한다. 경력 섹션에서는 해당 시기를 짧게 유지한다.

## 상대적 강조 기준

Recency는 기본 정렬 신호이지 bullet·page 예산이 아니다. 현재 역할은 지금의 ownership과 운영 범위를 가장 잘 보여주므로 기본적으로 먼저, 넓게 다룬다.
다만 과거 case가 현재 경력에 없는 backend domain·failure mode·설계 판단을 증명하면 완결된 기술 사례로 확장할 수 있다.

| 시기 | 기본 역할 | 확장 조건 |
| --- | --- | --- |
| 현재 (2025.04~) | backend ownership·production 운영의 주 baseline | JD와 가까운 verified technical case는 제약·선택·구현·검증이 완결될 때까지 확장 |
| 최근 (2024.10~2025.04) | 역할 연결과 supporting evidence | 결제 정합성처럼 현재 경력에 없는 domain 판단을 증명할 때 확장 |
| 중기 (2021.12~2024.01) | 제품 시스템·외부 검증과 역할 궤적 | stable backend claim 또는 JD 핵심과 직접 연결될 때 확장 |
| 초기 (2020.08~2021.06) | 경력 궤적의 시작점 | 현재 이력에 없는 검증된 기술 근거가 있을 때 확장 |

원칙:

- 현재 소속의 서술을 가장 넓은 baseline으로 두되 전체 경력의 절반, bullet 수, case 수 같은 고정 비율을 적용하지 않는다.
- 과거 경력도 새로운 technical signal을 제공하면 필요한 깊이를 유지한다.
- 분량을 줄일 때는 오래된 경력보다 중복 설명·약한 claim·stack 나열을 먼저 제거한다.
- page 수보다 첫 장 scanability와 페이지별 검증 가능한 signal을 acceptance 기준으로 쓴다.

## 과거 정량은 evidence·relevance gate로 판단한다 (2026-08-18 개정)

`오래된 수치는 검증 여부와 무관하게 쓰지 않는다`는 2026-08-08 결정을 supersede한다. 시점만으로 금지하지 않고 다음을 모두 확인한다.

1. stable claim과 원 source가 있는가.
2. 측정 대상·기간·baseline·표본·정의가 설명 가능한가.
3. 본인 contribution과 결과 귀속이 분리되는가.
4. 현재 JD가 판단할 고유한 backend 역량을 추가하는가.
5. 현재 수치와 나란히 둘 때 같은 metric처럼 오해되지 않는가.

| 대상 | 현재 처리 | 사용 가능 조건 |
| --- | --- | --- |
| 초기 인턴기 정확도·처리량 | 보류 | stable claim, 측정 정의, contribution boundary가 생기고 JD에 고유한 근거일 때 |
| 과거 AI 모델 성능 | 보류 | 재현 가능한 evaluation context와 결과 귀속이 확인될 때 |
| 과거 제품 개선 수치 | 보류 | before/after baseline과 해당 변경의 인과 범위를 설명할 수 있을 때 |
| 개인 프로젝트 코드 규모 | 미사용 | package·endpoint 수는 성과 proxy로 쓰지 않고 검증된 팀 규모·ownership·운영 결과로 대체 |

원칙은 `과거는 정성, 현재는 정량`이 아니라 `시점과 무관하게 검증 가능하고 JD 판정에 기여하는가`다.
검증된 과거 수치가 고유한 backend 결과를 증명하면 사용할 수 있으나, 현재 운영 지표와 직접 비교하는 표현은 metric 정의와 baseline이 같을 때만 허용한다.

제3자 검증·수상·특허는 시점과 무관하게 Credentials에 배치한다. 인증 수치 자체는 공개 범위와 측정 정의가 확인된 경우에만 쓴다.

## 시점을 넘어 확장할 수 있는 것

1. **고유한 backend domain·failure mode** — 현재 경력에 없는 결제 정합성·rollback·reconciliation 같은 판단 근거.
2. **제3자 검증** — 외부 기관 수상·인증·특허. Credentials에 배치하고 관련 경력에서 연결한다.
3. **궤적 서사의 전환점** — `AI Engineer → PM → Backend Engineer` 전환처럼 현재 포지셔닝을 설명하는 대목.
4. **현재 작업의 원류** — 과거 작업이 현재 것의 명백한 선행 사례일 때 현재 case와 계보를 연결한다.


## 안티패턴

- ❌ 초기 경력의 정량 수치를 최신 실적과 나란히 배치 — 예: 아이즈솔 인턴 시기 모델 정확도를 현재 운영 지표와 같은 줄에 두는 것
- ❌ 오래된 프로젝트를 "가장 자랑스러워서" 상단에 두기 — 자랑스러움과 현재 설명력은 다르다
- ❌ 학부 프로젝트를 실무 프로젝트와 같은 섹션에 나열
- ❌ 시간 가중을 이유로 CES·특허를 경력 서술 안에 묻어 눈에 안 띄게 만들기

## 플랫폼 적용

플랫폼마다 섹션 구조가 달라 분량 통제 수단이 다르다.

| 플랫폼 | 통제 수단 |
| --- | --- |
| 리멤버·그룹바이 | 경력별 상세 서술 길이 |
| 사람인 | 경력기술서 항목 수 |
| 링크드인 | 경력별 description 길이 |
| 원티드 | 경력 설명 유무 |
| 로켓펀치 | 프로젝트 섹션 구성 — **현재 학부 프로젝트 5건만 등록돼 있어 규칙 위반 상태** |

## 재검토 주기

현재 소속 기간이 길어지면 비중이 자연히 커진다. **소속이 바뀌거나 주요 프로젝트가 종료될 때** 이 표를 다시 조정한다. 마지막 조정: 2026-08-08.

## 관련

- [products/resume/content-contract.md](../products/resume/content-contract.md) — Selection Contract가 claim 선택·순서를 다룬다. 이 문서는 그 상위 비중 규칙이다.
- [evidence-policy.md](evidence-policy.md) — 강도 표현 상한
- [public-safety.md](public-safety.md) — 공개 범위
