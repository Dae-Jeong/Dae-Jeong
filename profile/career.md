---
type: profile
title: Career
description: Career timeline and project anchors for Kim Daejeong.
timestamp: 2026-07-02
tags: [career, resume, projects]
---

# Career

## Timeline

| Period | Organization | Role | Anchor |
| --- | --- | --- | --- |
| 2025.04.02 ~ 현재 | MediSolve AI | Backend Engineer -> Tech Lead / PO & AI Agent Engineer | thready, BAY, NEXUS, SAY cluster, CENTURION_DAY, SSO, Azure infra |
| 2024.11.21 ~ 2025.01.10 | Memento AI | Backend Engineer | Feynman |
| 2024.10.20 ~ 2024.11.20 | Memento AI | Backend Engineer & PM Intern | Check |
| 2021.12 ~ 2024.01 | STUDIO LAB | AI Engineer -> PM -> Backend Engineer | SellerCanvas/Gency — 종료일은 채용 플랫폼 인증 기록 기준 (2026-07-06 정정, 기존 2023.12) |
| 2020.08 ~ 2021.06 | 아이즈솔 | Vision AI Engineer | Kidsly — YOLO 기반 아기 안면 인식 솔루션 개발 (신입급, user 확인 2026-07-06). 총 경력 산정 포함 — 57개월(4년 9개월, 5년차 표기) |
| 2024.01 ~ 2024.12 | Personal Project | Backend Lead / Infra Owner | TellingMe |

## Current Career Narrative

AI engineer와 PM을 거쳐 backend engineer로 돌아온 흐름이 강점이다. 단순 구현자가 아니라 제품 요구, 사용자 경험, 운영 제약, 기술 구조를 함께 볼 수 있다는 메시지가 된다.

현 회사(MediSolve AI)에서는 backend engineer로 합류한 뒤 AI 발전에 따라 PO & AI agent engineer 역할을 병행하며 제품팀의 일정/이슈/릴리스 운영을 리드하고 제품 기획 결정에 참여하고 있다 (2026-07-04 user 확인). PM 경험이 우회가 아니라 현재 역할로 다시 연결되는 서사로 쓴다. 구체 근거는 `~/agentspace/mediness*`의 파이프라인 registry, daily briefing, decision log, release gate 체계로 확보됨 (2026-07-04).

## Company Project Anchors

| Project | Public Framing | Primary Evidence |
| --- | --- | --- |
| thready | AI content operation product with generation quality, model routing, observability, release QA | `docs/resume/06-workspace-project-audit.md` |
| BAY-BE-API | FastAPI backend ownership across order, inventory, alimtalk, async worker, CI/test/docs | `docs/resume/06-workspace-project-audit.md` |
| NEXUS | 외부 피부과 병원 외주: multi-brand product backend monorepo with migration, infra, and agent-readable project governance | `docs/resume/06-workspace-project-audit.md` |
| SAY-BE-API / PROTON | same SAY project cluster: realtime AI consultation backend, STT/LLM provider lifecycle, WebSocket/RAG flow | `docs/resume/06-workspace-project-audit.md` |
| CENTURION_DAY / PROTON-BACKOFFICE | full-stack product backend and serverless AI analysis backoffice | `docs/resume/06-workspace-project-audit.md` |
| SSO-BE-API | centralized multi-service authentication and session policy | `docs/resume/02-company-work-evidence.md` |
| MEDISOLVEAI-INFRA / B2C-INFRA / NEXUS-infra | Terraform/Azure infra, B2B/B2C separation, App Service/ACR/deployment flow | `docs/resume/06-workspace-project-audit.md` |
| CENTURION-BE-API / API-GATEWAY | legacy platform history, multi-module backend, gateway/auth/CORS/WebSocket proxy | `docs/resume/06-workspace-project-audit.md` |
| feynman_api | Stripe/prepayment, refund, mileage, happy-call migration/query work | `docs/resume/06-workspace-project-audit.md` |

## Verification Needs

- ~~회사 프로젝트별 직접 구현/리드 범위는 Git history/PR로 추가 확인 필요.~~ 완료 (2026-07-04) — 커밋 점유율/영역 확인, `docs/resume/09-profile-homepage-public-content-draft.md`의 claim strength 표 참고.
- 회사명(MediSolve AI)과 제품명(Thready, Centurion과 BAY/RAY/SAY feature 구성)은 공개 확정 (2026-07-04). 고객사/브랜드명 공개 범위는 아직 `Unknown`.
- ~~STUDIO LAB award/patent는 public source로 별도 검증 필요.~~ 완료 (2026-07-05): CES 2024 Best of Innovation(AI, SellerCanvas) 공식 등재 확인, 특허 `10-2022-0130234`은 등록(`10-2898273`, 2025.12) 확인 — `docs/resume/10-resume-narrative-flow.md` 참고.
