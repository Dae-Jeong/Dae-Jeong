---
type: design-spec
title: Personal Site Architecture Design
description: Resume, portfolio, and blog/feature-hub site on Next.js/Vercel, hosted in-repo as a consumer of the knowledge harness.
timestamp: 2026-07-15
tags: [site, homepage, resume, portfolio, blog, architecture]
---

# Personal Site Architecture Design

## Status

- 2026-07-15 설계 확정. 구현 착수는 보류 — Phase 1 시작 시 Tier 2 상세(패키지 매니저, Vercel 설정, export 스크립트 사양)는 task 문서로 분리한다.
- 2026-07-15 당일 개정: 도메인 `marinkim.xyz` 확정, 기능 runtime을 k8s로 확장(클러스터 위치 미정), Supabase 역할을 기능 데이터 층으로 한정, 핵심 경로 불변 조건 추가.
- [Visitor Profile Chat 설계 (2026-07-04)](2026-07-04-visitor-profile-chat-homepage-prototype-design.md)의 스택 결정을 승계하고, repo 배치·정보 구조·확장 계약을 확정한다.

## Decisions

| Decision | Rationale |
| --- | --- |
| 사이트 코드는 이 repo `site/`에 둔다 | 콘텐츠와 사이트가 함께 진화하고 별도 repo sync 단계가 사라진다. 외부 repo에서 만든 기능은 blog 기능 폴더로 이식한다. 분리가 필요해지면 폴더 추출 비용이 낮다. |
| 스택: Next.js + Fumadocs + assistant-ui + Vercel AI SDK | 2026-07-04 설계 승계. |
| 핵심 사이트 배포: Vercel (Root Directory=`site`) + `marinkim.xyz` | 채용 담당자가 보는 경로는 zero-ops로 항상 살아 있게 한다. |
| 기능 runtime은 k8s — 클러스터 위치는 착수 시 결정 | ops 기록 자체가 산출물이다. gap-map 1위 공백(Kubernetes)을 메우는 production case가 되고, 운영 증거가 쌓이면 claim registry로 승격한다. |
| 핵심 경로 불변 조건 | `/`·`/resume`·`/portfolio`·blog 글은 Vercel에 남는다. k8s 장애 시 기능 카드만 "점검 중"으로 강등되고 이력서·포폴은 영향받지 않는다. |
| Supabase는 기능 데이터 층만 (Phase 2 도입) | chat 기록·방문 로그 등 기능 데이터의 공용 Postgres/auth/storage. profile 콘텐츠는 git 파생 정적을 유지한다 — 이중 소스 금지. |
| 정보 구조: `/`, `/resume`, `/portfolio`, `/blog` | 이력서·포트폴리오·블로그 3용도. 랜딩은 마케팅 페이지가 아니라 프로필 요약 + 진입. |
| blog는 글+기능 통합 hub | MDX 글과 기능 카드를 한 목록에. "하나의 route에 넣고 싶은 기능을 쌓는" 확장 공간. |
| 사이트는 knowledge harness의 consumer | 이력서·포폴 콘텐츠는 파생 전용이며 사이트에서 직접 수정하지 않는다. blog만 사이트 네이티브. |

## Content And Safety Boundary

```text
profile/ evidence/ products/  (private evidence 포함)
        │
        └─ export 스크립트: public: true claim·public-safe 산출물만 필터
                ↓ (수동 실행, release 시)
site/content/{resume,portfolio} + site/public/resume.pdf
site/content/blog  ← 네이티브 작성 (public-safety 체크리스트 적용)
```

- site 코드는 `site/` 밖의 repo 경로를 import·read하지 않는다. 콘텐츠 유입 경로는 export 스크립트 하나다.
- blog 글이 회사 사실을 다루면 [public-safety](../../../rules/public-safety.md)와 claim 상한을 그대로 적용한다. 체크리스트를 export pack에 포함한다.
- ⚠️ Vercel은 private repo 전체에 접근한다. 번들에는 site가 참조한 것만 포함되지만, 경계 규칙 위반이 곧 유출이므로 위 규칙을 리뷰 대상으로 삼는다.

## Deployment Composition

```text
marinkim.xyz          → Vercel (Next.js core) — 핵심 경로, 항상 가용
*.lab.marinkim.xyz    → k8s ingress — 기능 서비스 (subdomain 체계는 예시, 착수 시 확정)
Supabase              → 기능 공용 데이터 층 (Phase 2)
```

## Route Structure

```text
site/
├── app/
│   ├── page.tsx                # / — 프로필 요약 + resume·portfolio·blog 진입
│   ├── resume/                 # 기존 responsive resume.html 재사용 + PDF 다운로드
│   ├── portfolio/
│   │   ├── page.tsx            # case 목록
│   │   └── [case]/             # 파생 MDX case 상세
│   ├── blog/
│   │   ├── page.tsx            # hub — 글·기능 카드 통합 목록
│   │   ├── (posts)/[slug]/     # MDX 글
│   │   └── {feature}/          # 기능별 자립 폴더
│   └── api/                    # Phase 2 chat 등 발생 시
├── content/                    # resume/portfolio는 파생 전용, blog는 네이티브
├── public/resume.pdf           # 파생 artifact
└── lib/                        # 두 번째 사용처가 생긴 것만 승격
```

## Blog Feature Contract

- 기능 하나 = `site/app/blog/{feature}/` 자립 폴더. route·UI·server 코드를 동봉하고 다른 기능을 import하지 않는다.
- hub 목록은 entry metadata(title, kind: post|feature, date)만 읽는다.
- 외부 repo에서 개발한 기능을 가져올 때도 같은 계약을 따른다 (자립 폴더로 이식).
- 공용화는 두 번째 사용처가 생길 때만 `site/lib/`로 승격한다.

## Phases

| Phase | Scope | Exit condition |
| --- | --- | --- |
| 1 | scaffold, `/`, `/resume`(+PDF), `/portfolio` 5 case, `/blog` 빈 hub, Vercel·도메인 연결 | 공개 URL 확정 — 이력서 기틀의 마지막 블로커 해소 |
| 2 | visitor profile chat을 blog 기능 1호로 (AI SDK; runtime은 serverless 또는 k8s 1호 워크로드로 착수 시 결정, 데이터 필요 시 Supabase 도입) | 2026-07-02/04 chat 설계 실행 |
| 3 | 발생 시: 기능 추가(k8s), Supabase 확장, 검색 고도화 | 해당 필요가 실제로 발생 |

## Non-Goals

핵심 사이트의 DB·auth, 댓글, 커스텀 analytics, i18n, monorepo 도구, CMS, 자동 sync. 전부 발생 시 추가한다. 기능 데이터는 core가 아니라 Supabase(Phase 2) 범위로 분리한다.
