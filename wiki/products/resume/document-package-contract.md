---
type: contract
title: Resume Document Package Contract
description: 기본 문서 세트와 회사별 맞춤 지원본의 artifact 선택·파생 규칙.
status: active
timestamp: 2026-09-01
canonical: true
tags: [resume, career-description, portfolio, cv, tailored, package]
---

# Resume Document Package Contract

지원 문서는 사실을 각각 다시 쓰는 네 개의 원본이 아니다. `profile/`과 `evidence/`의
같은 경력을 목적에 맞게 다른 깊이와 순서로 보여주는 파생 산출물이다.

## 패키지 구성

| 구분 | 이력서 | 경력기술서 | 포트폴리오 | CV |
| --- | --- | --- | --- | --- |
| **기본(Common)** | 필수 | 필수 | 필수 | 필수 |
| **회사별(Tailored)** | 기본 포함 | 기본 포함 | 기본 포함 | 선택 |

- Common은 지원 여부와 무관하게 네 문서를 모두 최신 상태로 관리하는 기준 패키지다.
- 회사별 패키지는 Common과 검증된 claim에서 JD에 필요한 경험을 골라 순서·깊이·연결
  문장만 조정한다.
- 회사별 CV는 기본 제출물이 아니다. JD·지원 채널·회사 요구에 필요할 때만 별도
  맞춤본을 만든다.
- 회사 국적은 CV 작성 여부를 결정하는 단독 조건이 아니다. 비한국 회사라도 요구하지
  않으면 Common CV를 그대로 쓰거나 제출하지 않을 수 있고, 한국 회사라도 명시적으로
  요청하면 회사별 CV를 만든다.
- 문서 언어는 artifact 종류와 별도 축이다. `영문 이력서`와 `CV`를 같은 문서로
  취급하지 않는다.

## 문서별 역할

| 문서 | 가장 먼저 답할 질문 | 기본 깊이 |
| --- | --- | --- |
| 이력서 | 이 후보자를 인터뷰할 이유가 있는가? | 경력·핵심 성과·대표 기술 판단을 빠르게 스캔 |
| 경력기술서 | 실제로 어떤 문제를 맡아 어떻게 풀었는가? | 프로젝트별 문제·역할·선택·구현·검증·결과 |
| 포트폴리오 | 그 판단과 구현을 무엇으로 검증할 수 있는가? | 선별한 사례의 구조·흐름·시각 자료·한계 |
| CV | 전체 경력과 자격을 누락 없이 확인할 수 있는가? | 경력·학력·수상·자격·특허·공개 활동의 포괄 기록 |

경력기술서는 포트폴리오를 글로 다시 쓰지 않는다. 포트폴리오는 시각적 검증 가치가 큰
사례만 고르고, 경력기술서는 프로젝트별 수행과 판단을 더 넓게 기록한다. CV는 설득 문서
보다 전체 이력 확인 문서에 가깝게 유지한다.

## 현재 Common 상태

| Artifact | 현재 owner 또는 기준 | 상태 |
| --- | --- | --- |
| 이력서 | `app/fe/app/resume/resume-view.tsx` | active |
| 경력기술서 | `app/fe/content/documents/common.ts` | review-ready · local/noindex |
| 포트폴리오 | `app/fe`의 기본 `/portfolio` 표현 | active |
| CV | `app/fe/content/documents/common.ts` | review-ready · local/noindex |

Common 경력기술서와 CV의 현재 문안 owner는 typed content다. 둘 다 화면 검토가 가능한
`review-ready` 상태이며 renderer·PDF 검증과 사용자 승인을 통과한 뒤 `active`로 바꾼다.

## 파생과 소유권

1. 경력 사실과 기간은 `profile/`, claim 강도·공개 범위는 `evidence/`가 소유한다.
2. Common 문서는 사실을 새로 소유하지 않고 검증된 내용을 문서 역할에 맞게 조립한다.
3. 회사별 문서는 Common을 사실의 원본으로 삼지 않는다. 같은 `profile/`·`evidence/`를
   읽고 Common의 검증된 block과 표현을 재사용한다.
4. 회사별 `content-draft.md`는 해당 지원본의 문안 owner이고, typed content·local route·
   PDF는 동기화 대상이다.
5. 제출본은 [Tailored Application Lifecycle](application-lifecycle.md)의 Snapshot 규칙으로
   동결한다.

## 회사별 조립 순서

`JD 분석 → 필요한 artifact 선택 → claim/block 선택 → 순서와 JD 연결 문장 조정 → 문안
검토 → 화면·PDF 검증 → 제출 Snapshot`

CV가 선택되지 않아도 누락이 아니다. 회사별 package manifest에 `cv: omitted`와 선택하지
않은 이유를 남기면 된다. CV가 필요하면 Common CV에서 지원처와 무관한 전체 경력은
보존하고, 요약·순서·언어만 지원 맥락에 맞춘다.
