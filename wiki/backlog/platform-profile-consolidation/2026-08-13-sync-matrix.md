---
type: audit
title: 플랫폼 게시본 ↔ canonical 동기화 매트릭스
description: 2026-08-13 브라우저 실측. 각 플랫폼에 실제로 게시된 내용과 canonical v4.5의 차이를 항목 단위로 판정한다.
timestamp: 2026-08-13
derived_from: [backlog/platform-profile-consolidation/dual-track-copy-draft.md, products/resume/career-axes.md]
tags: [platform, sync, audit]
---

# 플랫폼 동기화 매트릭스 (2026-08-13 실측)

user: "지금까지 적었던 내용과 우리 플랫폼에 작성된 내용들을 한번 sync하는거야"

**기록을 믿지 않고 브라우저로 직접 읽었다.** 실제로 기록과 어긋난 항목이 여러 건 나왔다.

## 0. 한 줄 요약

| 플랫폼 | 소개(L1) | 경력(L2) | 치명 이슈 |
| --- | --- | --- | --- |
| **원티드** | ✅ v6 | ⚠️ 4건 채워짐 · 전부 구버전 문단형 | **직책 `Tech Lead`** = claim 계약 위반 |
| **로켓펀치** | ✅ v6 | ❌ 전부 구버전 | **C# 오기 게시 중** |
| **링크드인** | ✅ v6 | ❌ v1 문단형 | **직함 `Tech lead`** = claim 계약 위반 |
| 리멤버 | 미확인 | 미확인 | — |
| 그룹바이 | 미확인 | 미확인 | — |
| 사람인 | 미확인 (로그인 필요) | 미확인 | — |

## 1. 원티드 — 채워져 있으나 전부 구버전

URL: `https://www.wanted.co.kr/cv/fF1dU0gKAAsDCw4BRE4=` · 로그인 상태 ✅

> ⚠️ **초기 판정 정정 (2026-08-13)**: 처음에 "전부 빈 값"으로 기록했으나 **오판이었다.**
> 원티드 편집 화면의 값은 `textarea`/`input` 안에 있어 `document.body.innerText`로는 잡히지 않는다.
> [platform-automation-limits](../../../rules/) 에 이미 기록된 특성인데 적용하지 않았다.
> → **폼 화면 실측은 `innerText`가 아니라 필드 `value`를 읽는다.**

| 항목 | 게시본 | 판정 |
| --- | --- | --- |
| 간단 소개 | v6 (415자) | ✅ 일치 |
| 직무 | `백엔드 개발자` | ✅ |
| **직책** | **`Tech Lead`** | 🔴 등재 직함은 **기업부설연구소장**. `career.yaml` forbidden 위반 → 정정 |
| 메디솔브 설명 | 1,700자 · `[Thready] [LLM Evaluation] [Agent Workflow] [Centurion] [조직 표준·AX]` **문단형 v2** | ⚠️ v4.5 역량 6축 미반영 (어드민·인프라 축 없음) |
| 메멘토 설명 | 335자 문단형 | ⚠️ 구버전 |
| 스튜디오랩 설명 | 466자 · PM POC 한 줄만 | ⚠️ **특허 인과·색상 모델·KCL·0→1 전부 없음** |
| 아이즈솔 설명 | 157자 · **FastAPI 기반** | ✅ C# 아님 |
| 주요 성과 제목 4건 | 전부 입력됨 | ✅ |
| **AI 활용 경험** | **1개만** (`LLM 생성 품질 평가 하네스 설계…`) | ⚠️ 나머지 3항목 미입력 |
| 더데이랩스 | 항목 없음 | ⚠️ 추가 여부 판단 필요 |
| 스튜디오랩 기간 | `2021.12 - 2024.01` | ⚠️ canonical `2023.12` |
| 스킬 | 25개 · `C#` `Java` `Spring Boot` `React` `Node.js` 포함 | 🔴 `C#`은 사실 오류. `Java`·`Spring Boot`는 **AI 포지션 매칭을 자바로 오염**시킨다 ([2차 리뷰 판정](dual-track-copy-draft.md)) |

## 2. 로켓펀치 — 소개만 최신

URL: `https://www.rocketpunch.com/@marinkim` (비로그인 조회로 확인)

| 항목 | 게시본 | 판정 |
| --- | --- | --- |
| 소개 | v6 300자 축약본 | ✅ 일치 |
| 메디솔브 | `[Thready] [LLM Evaluation] [Agent Workflow] [Centurion] [조직 표준·AX]` **문단형 v2** | ❌ 역량 6축 미반영 |
| 더데이랩스 | 문단형 | ❌ |
| 메멘토 | 문단형 | ❌ |
| 스튜디오랩 | **구버전** — "PM으로 옮겨 제품이 운영되는 시스템을 기획·구축", POC 한 줄만 | ❌ 특허 인과·색상 모델·KCL·0→1 전부 없음 |
| 아이즈솔 | **"C# 기반 백엔드도 함께 다뤘습니다"** | 🔴 **사실 오류 게시 중** (2026-08-12 user-refuted) |
| 특허 | `페이지 출력 방법 (등록 10-2898273, 출원 10-2022-0130234)` | ✅ |
| 수상 | CES 2024 · PM 메인 역할 | ✅ |

## 3. 링크드인 — About만 최신, 나머지 전부 구버전

URL: **`https://www.linkedin.com/in/marinkim-dev`** (기록의 `대정-김-057b2a227`에서 변경됨 — platforms/linkedin.md 갱신 필요)

| 항목 | 게시본 | 판정 |
| --- | --- | --- |
| About | v6 완전판 (▪ 3층 + 관통 질문 + 포트폴리오 링크) | ✅ **기록이 틀렸다** — handoff에 v5.2로 적혀 있었으나 실제 v6 |
| 헤드라인 | `Backend Engineer · PO \| 제품을 만들고, 무엇을 만들지도 함께 정합니다 CES 2024 Best of Innovation 수상 제품 PM` | ❌ `\|` 누락 + **AI·Agent·LLM·Evaluation 키워드 0** |
| **메디솔브 직함** | **`Tech lead`** | 🔴 `career.yaml` forbidden — "공식 직함이 모두 Tech Lead / PO라고 단정". 등재 직함은 **기업부설연구소장**, Tech Lead는 역할이다 → `Backend Engineer`로 정정 |
| 메디솔브 설명 | `[Thready] [Centurion] [조직 표준]` **v1 문단형** | ❌ LLM Evaluation·Agent Workflow 단락 **아예 없음** |
| 더데이랩스 | 회사명 **`데이뷰네트웍스`** | ❌ 더데이랩스로 변경 |
| 메멘토 정규직 | `2024년 11월 - 2025년 1월` | ⚠️ canonical `2024.10~2025.01` (인턴 분리 표기라 정합 가능) |
| 스튜디오랩 | 구버전 문단형 | ❌ 특허·0→1·KCL 없음 |
| 아이즈솔 스택 | `Fastapi 기반` | ✅ C# 아님 — 여기만 이미 정확 |
| 아이즈솔 기간 | `2020년 8월 - 2021년 8월` | ⚠️ canonical `2021.06` — **2개월 차이, 확인 필요** |
| 아이즈솔 문구 | "인턴이었지만 **열정과 책임감을 인정받아**" | ❌ §7 정성 표현 금지 위반 |
| 대표 보유기술 | 파이썬·인공지능·기획·프로젝트 관리·Azure | ⚠️ LLM·Agent·Evaluation 없음 |

## 4. 미확인 — 확인 필요

| 플랫폼 | URL | 상태 |
| --- | --- | --- |
| 리멤버 | `https://profile.rememberapp.co.kr/` | 패키지 7까지 반영 기록 있음, 실측 미완 |
| 그룹바이 | `https://groupby.kr/scouts/my-profile` | 〃 · `A 피부과` 오기 교체 대상 |
| 사람인 | `https://www.saramin.co.kr/zf_user/resume/resume-manage` | 로그인 1회 필요 |
| oopy | `https://daejeongkim.oopy.io/` | 실명 노출 중(세라미크·데이뷰) — 마스킹 대상 |

## 5. 우선순위 — 사실 오류 → 계약 위반 → 빈 값 → 버전 갱신

### P0. 사실 오류·계약 위반 (내용이 틀렸거나 금지 표현)

1. **로켓펀치 아이즈솔 `C#` → `Python·FastAPI`** — 사실과 다르다
2. **링크드인 직함 `Tech lead` → `Backend Engineer`** — 등재 직함이 아니다
3. **링크드인 아이즈솔 "열정과 책임감을 인정받아"** 제거 — 정성 표현
4. **그룹바이·oopy `A 피부과` → `D·C 피부과`** — 실체 없는 코드
5. **oopy 고객사 실명 노출** → 마스킹
6. **원티드 스킬란 `C#` 제거** — 2026-08-12 user-refuted된 항목이 스킬로 걸려 있다
7. **원티드·링크드인 직책 `Tech Lead` → 정정** — 두 플랫폼 공통 계약 위반

### P1. 누락

6. **원티드 직책 `Tech Lead` → `기업부설연구소장`** (P0 성격이나 원티드 항목으로 묶어 처리)
7. 원티드 AI 활용 경험 — 4항목 중 **1개만 입력됨**, 나머지 3개 추가
8. 원티드 더데이랩스 항목 추가 여부 판단

### P2. 버전 갱신 (내용은 맞지만 구버전)

8. 로켓펀치 경력 5건 → canonical v4.5
9. 링크드인 경력 6건 → canonical v4.5 (메디솔브는 LLM Evaluation·Agent Workflow 단락이 아예 없어 격차가 가장 크다)
10. 링크드인 회사명 `데이뷰네트웍스` → `더데이랩스`
11. 링크드인 헤드라인 개정 (`|` 복구 + AI 키워드)

### P3. 확인 필요 (사실 확정 전 손대지 않음)

12. 아이즈솔 종료일 — 링크드인 `2021.08` vs canonical `2021.06` vs 원티드 `2021.06`
13. 스튜디오랩 종료일 — 원티드 `2024.01` vs canonical `2023.12`
14. 원티드 스킬 25개 정리 범위

## 6. 기록 정정

`handoff-browser-apply.md`가 실제와 어긋난 항목:

- 링크드인 About을 "v5.2, 교체 대기"로 기록 → **실제로는 v6이 반영돼 있다**
- 링크드인 URL이 `marinkim-dev`로 변경됨 (`platforms/linkedin.md` 갱신 필요)
- **원티드를 "빈 값"으로 최초 판정한 것은 오판** — 폼 값을 `innerText`로 읽었다.
  원티드 소개·경력 4건은 모두 채워져 있다

### 실측 규칙 (2026-08-13 확정)

1. **폼 편집 화면은 `innerText`가 아니라 필드 `value`를 읽는다**
   (`textarea.value`, `input.value`, `[contenteditable].innerText`).
2. 링크드인은 CSP로 `browser_evaluate`가 차단되므로 `browser_snapshot`을 쓴다.
3. 반영 이력만 믿고 다음 작업을 설계하지 않는다.

→ **반영 이력만 믿고 다음 작업을 설계하면 안 된다.** 착수 전 실측이 규칙이 되어야 한다.
