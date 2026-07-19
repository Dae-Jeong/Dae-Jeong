---
type: project-evidence
title: Thready Evidence
description: AI content product backend rebuild, generation quality, and operation evidence.
timestamp: 2026-07-11
source_roots: [workspace]
tags: [thready, ai-product, backend, evidence]
---

# Thready Evidence

Source locator: `workspace:thready`

## Backend Rebuild

- Code-backed: 합류 첫 변경부터 FastAPI layered backend가 구성됐고 `v1.1.0 - backend-new cutover`에서 초기 backend를 대체했다.
- Code-backed: cutover 이후 version cycle의 backend 개발·운영에서 주 기여가 지속됐다.
- Contribution boundary: backend rebuild와 이후 backend operation은 `owned`; frontend 포함 제품 전체 구축은 아니다.

## Generation Quality System

- Code-backed: typed prompt builder와 `source_context` 계약, generation pipeline, LLM judge, local evaluation sweep, observability logging이 확인됐다.
- Tool-backed/operation-backed: 생성 품질 이슈를 evaluation과 release/QA task로 연결한 운영 기록이 있다.
- Contribution boundary: 품질 system 구축은 말할 수 있으나 business metric이나 품질 배수는 검증되지 않았다.

## Release Operation

- Code-backed: v1.2-v1.5 사이 release/QA/task structure와 backend operation 변경이 확인됐다.
- Public-safe summary: release·QA·task 구조 기반 backend 운영.

## Production Operation Quality

- Tool-backed: Azure App Service platform metric 30일 집계(2026-06-15~2026-07-15)에서 요청 50,650건, HTTP 5xx 133건(0.26%)을 확인했다. 2026-07-11 스냅샷(약 41k, 0.32%)과 일관된다. 정확 수치는 내부 검증용이다.
- Measurement boundary: 현재 운영 상태의 증거다. "개선" claim에는 변경 전후 기간과 commit/PR 연결이 추가로 필요하다.
- Public wording: 범위화 표현(월 수만 건 규모, HTTP 5xx 0.3% 수준 / 성공률 99.7%+)만 공개한다. 기존 "1% 미만" 밴딩은 실측(0.26~0.32%)보다 나쁘게 읽혀 2026-07-16 persona review에서 역효과로 판정 — 실측에 근접한 상한으로 재조정했다.

## Rebuild Context And Decision

- User-confirmed (2026-07-19 인터뷰): 인계 시점 상태 — AI 도구 중심으로 빠르게 구축된 초기 제품. 유사 메서드·컴포넌트 중복과 데드코드 다수(AI 활용 시 불필요한 context 낭비, 온보딩 시 동작/비동작 로직 분리에 시간 소모), 디자인 패턴·폴더 구조 부재, 도메인 간 의존성 얽힘 — 회원 로직 수정이 AI 생성 중단으로 이어진 실사례. QA 티켓이 닫힌 뒤 같은 영역에서 다른 형태로 재발하는 패턴이 반복돼 프로젝트가 이관됐다.
- User-confirmed (2026-07-19): 재구축 판단 — 서비스 규모가 작은 시점 + AI 모듈 확장 필요 → backend를 FastAPI로 분리 도입, FE는 Next.js 유지. "돌아가는 기능을 왜 다시 만드나" 반대를 문제 누적·AI 확장성·하네스 기반 이관 속도로 설득.
- User-confirmed + code-backed (2026-07-19): 실행 — 디자인 패턴·컴포넌트 설계·인프라 하네스를 먼저 세팅하고 그 규칙 위에서 AI와 협업, 파악→기능 정의→재구축을 **총 36시간(작업 시간 기준)**에 완수. commit 실측: 2026-04-14 17:24 monorepo 분리 → 같은 날 23:14까지 스캐폴딩·레이어 구조·예외 계층·로깅·core 완성 → 04-16 Sprint 0-1(auth·accounts) → 04-20 FE→BE 호출 전환. backend 커밋 443/517건 KimMarin. PM 경력의 기획 이해가 파악·기능 정의를 가속.
- 표현 가드레일: 전임 작업 폄하 표현 금지 — "속도 우선으로 빠르게 검증된 초기 제품의 운영 단계 전환" 프레임만 사용. "36시간"은 작업 시간 기준임을 병기(달력 기간 오독 방지).

## QA Reopen Signal

- User-confirmed (2026-07-19): QA 조직은 해결된 이슈가 재발하면 티켓을 Reopened 상태로 전환한다. backend 이관 이후 재발이 대폭 감소했고, 잔여 케이스도 원인 영역이 파악된 상태로 관리된다.
- Tool-backed (2026-07-19 Jira 실측): THRDY 프로젝트 버그 236건, 상태 전이 944건 전수 분석 (분기점 v1.1.0 backend cutover = 2026-06-05, repo 태그 실측).
  - **재발률(월별 Resolved 전이 대비 Reopened 전이)**: 4월 37% → 5월 31% → 6월 20% → **7월(1~19일) 11%** — 단조 감소, 4월 대비 약 70% 하락.
  - **재발 발생 일평균**: 4월(4/20~30) 4.45건/일 → 7월 0.26건/일 = **-94.1%** — 구술 "95% 이상"과 정합. 단 4월은 QA 집중 테스트 초기라 활동량 교란 있음 — 공개 표현의 1축은 활동량 보정된 재발률(37%→11%)을 권장.
  - 한계: 티켓에 BE/FE 라벨이 없어 backend 단독 효과 분리는 불가 — "제품 전체 품질" 지표로 서술.
- Public wording: "QA 버그 재발률(해결 대비 reopen) 37%→11%" 및 "재발 발생 일평균 약 94% 감소(v1.0 QA기 대비)"까지 허용. "95%"는 실측(94.1%)을 넘는 표현이라 금지.

## Judge Rationale

- User-confirmed (2026-07-19): LLM judge 도입 이유 — "좋은 글"의 기준 자체가 부재했다(정성적 감만 존재, 대표의 성공 사례도 본인 계정 n=1이라 일반화 불가). judge를 품질 게이트가 아니라 **기준을 발견하기 위한 판단 데이터 축적 장치**로 설계 — 가설을 정량 판단으로 바꿔 데이터를 쌓고 기준을 증명해가는 루프.

## Public Disclosure

- 제품명 Thready와 AI 콘텐츠 생성 제품 설명은 공개 가능하다.
- provider 실명, private repository path, internal metric은 공개하지 않는다.

## Rejected Or Unverified Claims

- 제품 전체 단독 구축
- frontend 포함 전체 제품 전면 재구축
- 품질 N배 개선 또는 품질 완전 해결
- business outcome 수치
