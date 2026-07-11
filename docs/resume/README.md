---
type: index
title: Resume Documentation Workspace
description: Personal resume, agent workflow, and writing-site source documents for Kim Daejeong.
timestamp: 2026-07-02
tags: [resume, portfolio, agent-workflow, writing]
---

# Resume Documentation Workspace

이 폴더는 이력서 홈페이지를 만들기 위한 내부 문서 작업공간이다. 현재 우선순위는 `Resume > Agent > Writing`이다.

상위 원장은 [../../profile/README.md](../../profile/README.md)이다. `profile/`은 안정적인 김대정 profile source of truth이고, 이 폴더는 이력서/홈페이지/JD 분석을 위한 근거, 초안, 작업 산출물을 담는다.

## 문서 순서

| 문서 | 역할 |
| --- | --- |
| [01-oopy-resume-source-analysis.md](01-oopy-resume-source-analysis.md) | 기존 Notion/Oopy 이력서의 콘텐츠 인벤토리와 재사용 가능한 주장 정리 |
| [02-company-work-evidence.md](02-company-work-evidence.md) | 회사 업무 프로젝트를 로컬 repo 근거 중심으로 정리 |
| [03-agent-workflow-evidence.md](03-agent-workflow-evidence.md) | `~/agentspace`, project `AGENTS.md`, OpenDesign 기반 agent 운영 방식 정리 |
| [04-resume-content-brief.md](04-resume-content-brief.md) | 새 이력서 홈페이지에 넣을 종합 포지셔닝, 섹션, case-study 초안 |
| [05-contribution-ax-positioning-draft.md](05-contribution-ax-positioning-draft.md) | BE/Infra 구축 경험과 AX 관심사를 연결하는 1차 기여도/포지셔닝 초벌 |
| [06-workspace-project-audit.md](06-workspace-project-audit.md) | `~/workspace` 프로젝트 inventory와 기여 evidence 1차 audit |
| [06-project-work-log.md](06-project-work-log.md) | 프로젝트별 작업 내역 원장. contribution bullet로 압축하기 전의 재료 |
| [06-impact-case-candidates.md](06-impact-case-candidates.md) | 작업 원장에서 homepage/resume에 쓸 만한 임팩트 사례 후보를 사실 기반으로 선별 |
| [06-strengths-and-traits.md](06-strengths-and-traits.md) | 프로젝트 evidence와 대화 패턴을 바탕으로 강점, 특징, public positioning guardrail 정리 |
| [09-profile-homepage-public-content-draft.md](09-profile-homepage-public-content-draft.md) | profile homepage와 Visitor Profile Chat에 옮기기 전 public-facing 이력/강점/프로젝트/agent 콘텐츠 초안. Git 검증 기반 claim strength 표 포함 |
| [10-resume-narrative-flow.md](10-resume-narrative-flow.md) | 검증된 claim으로 이력서 전체 서사와 섹션 흐름, 경력 bullet 초안 확정 |
| [11-jd-analysis-flow.md](11-jd-analysis-flow.md) | 채용 플랫폼 JD 특징 추출 -> gap map flow 설계 + 파이프라인 구현 (`scripts/jd/`) |
| [12-jd-feature-map.md](12-jd-feature-map.md) | 직군별 JD 요구 특징 집계 (자동 생성) |
| [13-jd-gap-map.md](13-jd-gap-map.md) | JD 수요 대비 스킬 gap 리포트 (자동 생성) |
| [14-resume-draft-v1.html](14-resume-draft-v1.html) | 이력서 1차 초안 전체판 (HTML+PDF, A4) — 10번 흐름 기반, 맞춤 이력서의 콘텐츠 소스. 빈 템플릿은 `skills/tailor-resume/assets/resume-template.html` |
| [15-portfolio-pipeline-design.md](15-portfolio-pipeline-design.md) | 회사별 지원 패키지(이력서+sync 포트폴리오) 파이프라인 설계 |
| [cases/](cases/README.md) | 포트폴리오 케이스 스터디 라이브러리 (5건) — 회사별 페이지는 여기서 조립만 |
| `tailored/` | 회사별 맞춤 이력서 출력 폴더 — `/tailor-resume` 스킬(`skills/tailor-resume/`, tool-agnostic)이 생성 |

## 원칙

- 기존 이력서의 문장보다 근거가 우선이다.
- 회사 업무 claim은 로컬 repo 문서, 코드, 운영 문서에서 확인된 내용만 쓴다.
- 확인되지 않은 성과, 수치, 외부 지표는 `Unknown` 또는 `Unverified`로 둔다.
- agent 활용은 단순히 "AI를 쓴다"가 아니라, 업무 산출물과 개발 흐름을 구조화하는 운영 체계로 설명한다.
- 홈페이지 콘텐츠는 채용 담당자, CTO/엔지니어링 리더, 협업자가 빠르게 판단할 수 있게 `무엇을 만들었는가`, `어떤 구조로 해결했는가`, `어떤 방식으로 일하는가` 순서로 구성한다.
- profile에 반영할 만큼 안정적인 내용은 `profile/`로 요약 승격하고, 긴 evidence는 이 폴더에 둔다.

## 현재 결론

기존 Oopy 이력서는 "비즈니스 가치를 코드로 실현하는 백엔드 엔지니어"라는 전통적인 이력서로는 충분히 쓸 수 있다. `~/workspace` audit 이후에는 thready, BAY, NEXUS, SAY cluster, infra repos를 핵심 evidence cluster로 두고, 홈페이지의 차별점은 `AI product와 product backend의 운영 문제를 backend/infra system과 agent-readable workflow로 풀어내는 backend/AI systems engineer`로 재정의한다.
