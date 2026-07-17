---
type: index
title: Dae-Jeong Profile Knowledge Harness
description: Portable source-of-truth workspace for profile, evidence, resume, portfolio, homepage, and JD analysis.
timestamp: 2026-07-11
tags: [profile, evidence, resume, portfolio, knowledge-harness]
---

# Dae-Jeong Profile Knowledge Harness

김대정의 검증된 경력·역량과 이를 사용하는 이력서, 포트폴리오, 홈페이지, JD 분석을 관리하는 개인 source-of-truth workspace다.

## 작업 의도별 진입점

| 작업 의도 | 먼저 읽기 |
| --- | --- |
| 현재 상태와 다음 작업 | [wiki/context/current-state.md](wiki/context/current-state.md) |
| 개인 원장 | [wiki/profile/README.md](wiki/profile/README.md) |
| claim과 검증 근거 | [wiki/evidence/README.md](wiki/evidence/README.md) |
| 이력서 | [wiki/products/resume/README.md](wiki/products/resume/README.md) |
| 포트폴리오 | [wiki/products/portfolio/README.md](wiki/products/portfolio/README.md) |
| 홈페이지 | [wiki/products/homepage/README.md](wiki/products/homepage/README.md) |
| JD 분석 | [wiki/products/jd/README.md](wiki/products/jd/README.md) |
| agent 작업 규칙 | [AGENTS.md](AGENTS.md) |
| 문서 위치 결정 | [wiki/rules/document-routing.md](wiki/rules/document-routing.md) |

## 지식 흐름

```text
external sources / Git / user confirmation
                    ↓
             wiki/evidence/
                    ↓
              wiki/profile/
                    ↓
             wiki/products/  ──export──▶  app/fe (site)
```

지식 층 (`wiki/`):

- `wiki/context/`: 최소 라우팅과 휘발성 current-state
- `wiki/profile/`: 안정적인 개인 원장
- `wiki/evidence/`: 검증 사실, claim strength, public disclosure
- `wiki/products/`: resume, portfolio, homepage, JD 계약과 산출물
- `wiki/backlog/`: 아이디어 보드 · `wiki/rules/`: 교차 정책 · `wiki/docs/`: 설계 이력 · `wiki/archive/`: 과거 기록

앱 층 (프로젝트 monorepo — 착수 시 생성):

- `app/fe` → Vercel (marinkim.xyz) · `app/be` → Render (jarvis backend)
- `labs/{svc}` → k8s (실험 서비스) · `infra/` → 배포 관제

도구: `skills/` (실행 adapter) · `scripts/` (validator·export·JD 도구)

## Portable 사용

```bash
uv sync
uv run playwright install chromium
uv run python scripts/validate_workspace.py
uv run python scripts/verify_portable_clone.py
```

외부 source repo를 다시 검증해야 할 때만 [config/source-roots.example.yaml](config/source-roots.example.yaml)을 `.local/source-roots.yaml`로 복사하고 현재 PC의 경로를 설정한다.
