---
type: portfolio-pipeline-design
title: Portfolio Pipeline Design
description: JD 입력 시 맞춤 이력서와 sync된 회사별 포트폴리오 페이지를 함께 생성하는 파이프라인 설계.
timestamp: 2026-07-06
tags: [portfolio, pipeline, tailor-resume, application-package]
---

# Portfolio Pipeline Design

## 개념

JD 하나를 입력하면 **회사별 지원 패키지**가 나온다.

```text
JD 입력
  ├→ 맞춤 이력서 (HTML + PDF)        — hooking. 구축 완료 (tailor-resume)
  └→ 맞춤 포트폴리오 페이지 (HTML)    — 깊이. 본 설계 대상
```

역할 분담은 content-rules의 이력서/포트폴리오 분리표를 따른다:

- 이력서: 무엇을 + 역할 강도 + 기술 (한 줄)
- 포트폴리오: 왜/어떻게 — 문제 -> 접근 -> 구현 -> 운영, 아키텍처 결정, 트레이드오프, 다이어그램

## Sync 규칙 (설계의 핵심)

1. **내용 sync** — 포트폴리오에는 이력서(04 대표 프로젝트 + 02 역량 근거)에 등장한 케이스만, 같은 순서로 싣는다. JD와 무관한 케이스는 넣지 않는다.
2. **링크 sync** — 이력서 HTML의 프로젝트명/대표 프로젝트 bullet에서 포트폴리오 해당 케이스 anchor로 딥링크. PDF에는 포트폴리오 URL을 헤더 contact에 표기.
3. **표현 sync** — 같은 소스(source-contract), 같은 claim strength 상한, 같은 공개 가드레일. 포트폴리오라고 표현 강도를 올리지 않는다.
4. **단일 생성** — 이력서와 포트폴리오는 한 번의 tailor 실행에서 같은 JD 분석 결과로 생성한다 (drift 방지).

## 아키텍처

### 1. 케이스 라이브러리 (마스터) — 회사별 작업이 아닌 1회 작성

```text
docs/resume/cases/
  thready-rebuild.md        # backend 전면 재구축 + 생성 품질 시스템
  be-template.md            # 조직 표준 템플릿 + agent context system
  mediness-ops.md           # agent 기반 제품 운영 시스템
  bay-async.md              # 비동기 worker/retry 아키텍처
  say-realtime.md           # realtime LLM 세션 안정화
  (필요 시 추가: sso-auth, nexus-migration, infra-iac, tellingme)
```

케이스 문서 구조 (고정):

```markdown
---
case: <slug>
title: <케이스 제목>
resume_tag: <이력서 04/02에서 쓰는 태그명 — sync 키>
claim_strength: <09 표의 허용 표현>
---
## 문제        (무엇이 왜 문제였나 — 2~4줄)
## 접근        (선택지와 결정, 트레이드오프)
## 구현        (아키텍처/핵심 설계 — 다이어그램 1개 권장, mermaid)
## 운영/결과   (배포·운영에서 확인된 것 — 검증된 사실만)
## Stack
```

- 재료: 06-impact-case-candidates(사실 목록) + 06-project-work-log(세부) + 09(claim strength).
- 공개 가드레일 동일 적용: provider 실명 X, 고객사명 X, 수치는 검증 값만.

### 2. 회사별 포트폴리오 페이지 — 정적 단일 HTML

이력서와 같은 방식: 템플릿 + 슬롯 + 정적 생성. 앱이 아니다 (visitor chat 등은 이후 profile 홈페이지 단계에서 승격).

```text
skills/tailor-resume/assets/portfolio-template.html   # 이력서와 같은 디자인 토큰 (흑백 컴팩트)
docs/resume/tailored/{company-slug}/
  resume.html / resume.pdf                            # 기존 산출물 (위치만 회사 폴더로 통합)
  portfolio.html                                      # 신규
```

페이지 정적 프레임:

| # | 섹션 | 규칙 |
| --- | --- | --- |
| — | 헤더 | 이력서와 동일 아이덴티티 (이름/tagline/연락처) + "이력서 보기" 링크 |
| 1 | 인트로 | JD 대응 요약 2~3줄 (이력서 01과 동일 논지, 확장 금지) |
| 2 | 케이스 스터디 | 이력서 04와 1:1 — 같은 프로젝트, 같은 순서, 케이스당 문제->접근->구현->운영 |
| 3 | 일하는 방식 | 이력서 06의 확장판 — mediness/AGENTS.md/템플릿 실물 구조 설명 |
| 4 | 부록 | 수상·특허(검증 링크 포함 가능), GitHub |

### 3. 전달/호스팅

| 방식 | 용도 | 비고 |
| --- | --- | --- |
| GitHub Pages + **커스텀 도메인** (2026-07-06 확정) | 기본 — 이력서에 URL 표기 | 도메인은 user 구매 예정 (미정). repo 이름 무관 — 아무 repo나 Pages에 도메인 바인딩 |
| HTML 파일 직접 첨부 | 도메인 확정 전 / 플랫폼이 파일만 받을 때 | 단일 파일이므로 그대로 전달 가능 |

URL 구조: `https://{domain}/` = profile 홈, `https://{domain}/p/{hash4}/` = 회사별 포트폴리오.

- 회사별 페이지는 검색 노출 금지 (`<meta name="robots" content="noindex">`) — 지원 사실 자체가 민감 정보.
- **경로에 회사명 금지, 무작위 해시만** — Pages repo는 public이라 파일 목록이 공개되므로, 회사명이 경로에 있으면 지원처 목록이 노출된다. 회사-해시 매핑은 로컬 `tailored/`에만 유지.
- 배포 repo는 Dae-Jeong 계정 소유 (gh CLI는 현재 KimMarin 인증 — 배포 작업 시 Dae-Jeong 인증 추가 필요).

### 4. 파이프라인 통합 — tailor-resume 스킬 확장

별도 스킬을 만들지 않는다. tailor-resume의 Workflow에 6단계 추가:

```text
5. 출력 (이력서)            — 기존
6. 포트폴리오 조립           — 이력서 04 프로젝트 목록 -> cases/에서 해당 케이스 로드
                              -> portfolio-template 슬롯 채움 -> {company}/portfolio.html
                              -> 이력서에 포트폴리오 링크 삽입 -> PDF 재생성
```

케이스가 cases/에 없는 프로젝트가 이력서에 등장하면: 그 자리에서 새로 쓰지 않고 **케이스 라이브러리에 먼저 추가**한 뒤 조립한다 (소스 우선 원칙).

## 실행 단계

1. ~~케이스 라이브러리 작성~~ 완료 (2026-07-06): 5개 — thready-rebuild, be-template, mediness-ops, bay-async, say-realtime (`docs/resume/cases/`). 프로토타입(`claude-design/portfolio_v0.1.0/`) 셀프 리뷰를 거친 콘텐츠.
2. ~~portfolio-template.html 제작~~ 완료: `skills/tailor-resume/assets/portfolio-template.html`.
3. ~~tailor-resume 스킬 확장~~ 완료: Workflow 6단계(포트폴리오 조립) + source-contract에 cases/ 등재. 출력 구조는 `tailored/{회사}/resume.html·pdf·portfolio.html`.
4. **호스팅 세팅**: 커스텀 도메인 + GitHub Pages로 확정 (2026-07-06). 대기 항목 — ⚠️ 도메인 구매(user), Dae-Jeong 계정 gh 인증, 배포 repo 생성 + CNAME. 도메인 확정 전에는 파일 첨부 방식으로 운용.
5. **실전 테스트**: 실제 JD 1건으로 패키지(이력서+포트폴리오) 생성 — 호스팅과 독립적으로 지금 가능.

## 결정 기록

- 포트폴리오는 **앱이 아니라 정적 단일 HTML로 시작** (2026-07-06). visitor profile chat 등 인터랙티브 요소는 이후 profile 홈페이지(mediness-app 방향) 단계에서 승격 — 그때 케이스 라이브러리를 그대로 재사용한다.
- 케이스는 회사별로 쓰지 않는다 — 마스터 라이브러리에서 선별·조립만. 회사별 작업량을 0에 가깝게 유지.
