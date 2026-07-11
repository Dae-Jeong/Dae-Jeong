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
| 현재 상태와 다음 작업 | [context/current-state.md](context/current-state.md) |
| 개인 원장 | [profile/README.md](profile/README.md) |
| claim과 검증 근거 | [evidence/README.md](evidence/README.md) |
| 이력서 | [products/resume/README.md](products/resume/README.md) |
| 포트폴리오 | [products/portfolio/README.md](products/portfolio/README.md) |
| 홈페이지 | [products/homepage/README.md](products/homepage/README.md) |
| JD 분석 | [products/jd/README.md](products/jd/README.md) |
| agent 작업 규칙 | [AGENTS.md](AGENTS.md) |
| 문서 위치 결정 | [rules/document-routing.md](rules/document-routing.md) |

## 지식 흐름

```text
external sources / Git / user confirmation
                    ↓
                evidence/
                    ↓
                 profile/
                    ↓
                products/
```

- `context/`: 최소 라우팅과 휘발성 current-state
- `profile/`: 안정적인 개인 원장
- `evidence/`: 검증 사실, claim strength, public disclosure
- `products/`: resume, portfolio, homepage, JD 계약과 산출물
- `rules/`: evidence, public safety, 문서 위치 정책
- `skills/`: canonical 지식을 소비하는 실행 adapter
- `archive/`: 기본 read flow에서 제외된 과거 기록

## Portable 사용

```bash
uv sync
uv run playwright install chromium
uv run python scripts/validate_workspace.py
```

외부 source repo를 다시 검증해야 할 때만 [config/source-roots.example.yaml](config/source-roots.example.yaml)을 `.local/source-roots.yaml`로 복사하고 현재 PC의 경로를 설정한다.
