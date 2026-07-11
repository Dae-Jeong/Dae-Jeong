---
type: resume-narrative-flow
title: Resume Narrative Flow
description: Git-verified claims 기반의 이력서 전체 서사와 섹션 흐름 확정본.
timestamp: 2026-07-05
tags: [resume, narrative, positioning, structure]
---

# Resume Narrative Flow

## Purpose

이 문서는 검증 완료된 재료([09-profile-homepage-public-content-draft.md](09-profile-homepage-public-content-draft.md)의 claim strength 표 기준)로 이력서의 전체 서사와 섹션 흐름을 고정한다.

홈페이지가 아니라 **이력서(경력기술서) 관점**이 기준이다. 채용 플랫폼에서 recruiter가 15초, 시니어 엔지니어가 3분 안에 판단하는 상황을 가정한다.

## Core Narrative (한 문단)

> AI engineer와 PM을 거쳐 backend engineer로 돌아왔고, MediSolve AI에서 backend engineer로 합류해 Tech Lead / PO & AI agent engineer로 역할을 확장했다. 외주 프로젝트(NEXUS)로 병원 도메인 backend를 검증한 뒤 자사 제품 Centurion(CRM & ERP)과 Thready(AI 콘텐츠 생성)를 구축·재구축했으며, 제품팀의 일정/이슈/릴리스 운영을 agent 기반 시스템(mediness)으로 리드하고 조직 표준 backend 템플릿을 전담 구축했다.

서사의 뼈대 3개:

1. **커리어 원환**: AI engineer -> PM -> backend engineer -> (AI 시대) PO & AI agent engineer. PM 경험이 우회가 아니라 현재 역할로 되돌아오는 구조.
2. **제품 성장 서사**: 외주로 도메인 검증(NEXUS) -> 자사 제품 구축(Centurion) -> 재구축·전담(Thready).
3. **AX 차별화**: 리드 업무(일정/이슈/릴리스)를 agent-readable 시스템으로 수행 — 말이 아니라 mediness/BE Template이라는 실물.

## 이력서 섹션 흐름

> 섹션 프레임의 canonical은 `skills/tailor-resume/references/content-rules.md` (A/B 2구역, 역량 기준 그룹 구조, 2026-07-06 확정)다. 아래 표는 초기 설계 기록 + 콘텐츠 소스 매핑용으로 유지한다.

| 순서 | 섹션 | 내용 | 근거 문서 |
| --- | --- | --- | --- |
| 1 | 헤더 | 이름, 한 줄 포지셔닝, 연락처/링크 | 09 draft Public Positioning |
| 2 | 요약 (3~4줄) | Core Narrative 압축 | 본 문서 |
| 3 | 핵심 역량 (4축) | Backend / AI Backend / Infra / Agent Workflow | 09 draft Strengths (압축) |
| 4 | 경력 | MediSolve AI -> Memento -> STUDIO LAB (최신순) | profile/career.md |
| 5 | 프로젝트 상세 | Thready -> Centurion -> NEXUS -> BE Template -> Infra | 09 draft Project Highlights |
| 6 | Agent/AX 운영 방식 | mediness 제품 운영 시스템 (차별화 섹션) | 09 draft Product Operations Evidence |
| 7 | 기타 | 개인 프로젝트(TellingMe), 학력(우송대 게임멀티미디어 + 부트캠프 3건), 수상/특허(CES 2024 혁신상 등 — 외부 검증 대기) | 01-oopy-resume-source-analysis.md |

## 요약 초안 (섹션 2)

```text
AI 제품과 product backend를 운영 가능한 시스템으로 만드는 백엔드 엔지니어입니다.
MediSolve AI에 backend engineer로 합류해 Tech Lead / PO & AI agent engineer로 역할을 확장했고,
자사 제품 Thready(backend 전면 재구축·전담)와 Centurion(CRM & ERP), 외주 병원 backend(NEXUS)를 담당하며
제품팀의 일정/이슈/릴리스 운영을 agent 기반 시스템으로 리드했습니다.
```

## 경력 bullet 초안 (섹션 4~5, claim strength 준수)

### MediSolve AI (2025.04 ~ 현재) — Backend Engineer -> Tech Lead / PO & AI Agent Engineer

Thready (AI 콘텐츠 생성 제품):

- backend를 FastAPI 기반으로 전면 재구축(v1.1.0 cutover, DDD layered 구조)하고 이후 개발·운영을 전담
- 생성 품질을 typed prompt builder, LLM judge, 평가 루프, observability logging으로 시스템화
- release/QA/task 운영 흐름을 agent-readable하게 구조화

Centurion (자사 CRM & ERP 제품):

- 재고 관리(BAY): order/inventory 도메인, Alimtalk/TaskIQ/RabbitMQ worker 분리, retry 처리, 테스트 인프라/Docker CI/온보딩 문서 구축
- 상담 관리(SAY): STT/LLM provider lifecycle, realtime LLM 세션 안정화(zombie session/reconnect), 번역·오디오 파이프라인, dashboard AI 분석 — cluster 단위 서술, provider 실명 비공개
- CRM(DAY): 예약 정책을 backend 판단, frontend 표시, QA seed/test, release docs로 연결
- 스케줄·공간 관리(RAY): 시설 현황 조회 성능 최적화, 긴급 호출 정렬, BAY 연동 — 한 줄 claim
- platform: SSO session 정책/duplicate login/E2E 담당(공동), API Gateway 통합

NEXUS (외부 피부과 병원 외주 — Centurion보다 먼저 진행):

- multi-brand product backend monorepo의 service boundary, migration/domain audit, IaC pipeline, docs governance 주도

조직 기여:

- 조직 표준 FastAPI backend 템플릿 전담 설계·구축: layered 아키텍처/DI/ADR 27건/컨벤션/runbook + agent context system 내장
- 제품팀 운영 리드: 7~8개 제품 파이프라인 registry, daily briefing agent, decision/spec/work/release gate 체계 구축·운영
- Infra: B2C/NEXUS Terraform 단독 구축, 메인 infra 공동 구축 + runbook/문서화 리드. AWS(STUDIO LAB, AWS -> Azure 전환기)와 Azure 모두 경험 — 특정 클라우드 종속 없는 IaC/컨테이너 중심 역량으로 서술

### Memento AI (2024.10 ~ 2025.01) — Backend Engineer (PM Intern 병행 1개월)

- Stripe/선결제, 환불/마일리지/티켓 rollback, payment-history correctness 등 예약/결제 backend 안정화 (FastAPI/MySQL/AWS 환경)

### STUDIO LAB (2021.12 ~ 2024.01) — AI Engineer -> PM -> Backend Engineer

- SellerCanvas(이커머스 상세페이지 AI 생성): YOLO v8 의류 이미지 분석, 패션 엔터프라이즈 POC 관리, NodeJS -> NestJS migration
- AI/PM/backend를 모두 거치며 product-system 관점 형성
- AWS EC2/RDS(MySQL) 기반 서버 운용 (인턴 시기 — 간단한 구성 수준으로 서술)
- CES 2024 Best of Innovation (AI 부문, 팀/회사 수상 — CES 공식 확인 완료)
- 특허 등록: 페이지 출력 방법 — 이미지 특징 추출 기반 텍스트/페이지 생성 (출원 `10-2022-0130234` -> 등록 `10-2898273`, 2025.12, 권리자 주식회사 스튜디오랩 — KIPRIS 확인 완료)

### 아이즈솔 (2020.08 ~ 2021.06) — Vision AI Engineer

- Kidsly(아기 안면 인식 솔루션) — YOLO 기반 안면 인식 모델 개발 (신입급, 2026-07-06 user 확인)
- 커리어 서사: AI의 시작점이 2020년 — Vision AI(Kidsly/YOLO) -> 스튜디오랩 Vision(SellerCanvas/YOLO v8) -> LLM backend로 이어지는 연속성
- 총 경력: 57개월(4년 9개월) — tagline "5년차" 표기 근거

### 개인 프로젝트 — TellingMe (2024.01 ~ 2024.12, 10인 팀 / Backend Lead & Infra)

- Spring Boot/JPA 기반 backend: OAuth2(Kakao/Apple)/JWT 인증, gamification 도메인, Java-Python microservice 연동
- AWS EC2/S3/CodeDeploy + GitHub Actions CI/CD, Prometheus/Actuator 모니터링, FCM push
- ⚠️ 세부 수치(38 패키지/89 endpoints)는 Oopy 기재 기준 — repo 대조 후 사용

## Per-Project Bullet 규칙

- 구조: `문제 -> 시스템 -> 근거 -> 결과`. "여러 가지 했다" 나열 금지.
- 표현 강도는 09 draft의 claim strength 표를 따른다 (전담/주도/공동/참여 구분).
- 수치는 로그/benchmark 근거가 생기기 전까지 쓰지 않는다. 커밋 수는 이력서에 쓰지 않는다 (내부 검증용).
- 팀원 실명/고객사명/provider 실명(확인 전) 금지.

## 남은 확인 사항

해소됨 (2026-07-05, 01-oopy 분석 기반):

- 학력/자격: 우송대학교 게임멀티미디어(2016.03~2021.08), 부트캠프 3건(OZ 백엔드/쏘카 AI/비트컴퓨터), ADsP(2021.09).
- 수상/특허 목록: CES 2024 AI 최고 혁신상(2023.12), SW 해커톤 우수상(2021.02), SW 창업 경진 2등 x2, 특허 출원 `10-2022-0130234`.
- "피부과"/브랜드명: 기존 Oopy 이력서가 이미 `A 피부과`, `데이뷰 & 세라미크`를 공개 중 — 새 홈페이지도 동일 수준 유지가 기본값.

확정/검증 완료 (2026-07-05):

- CES 2024 Best of Innovation (AI 부문, SellerCanvas / Studio Lab) — CES 공식 honorees 페이지 등재 확인 (`ces.tech/ces-innovation-awards/2024/seller-canvas/`). headline 사용 가능.
- 특허 **등록** 확인 (KIPRIS, 2026-07-05 스크린샷): 페이지 출력 방법, 출원 `10-2022-0130234`(2022.10.12) -> 등록 `10-2898273`(2025.12.05), 법적상태 등록, 권리자 주식회사 스튜디오랩, 피인용 1회. 표기는 "출원"에서 "등록"으로 업그레이드. ⚠️ 발명자 명단은 미확인 — 본인 확인 기반 (KIPRIS 인명정보 탭에서 확인 가능).
- provider 실명 비공개 확정 — 일반화 표현만 사용.
- GitHub 공개 링크: `github.com/Dae-Jeong` (개인 계정). KimMarin은 연결 안 함.
- jd-corpus는 gitignore (로컬 전용).

남은 것:

1. TellingMe 세부 수치 repo 대조 (`~/personal-workspace/tellingme-server` 로컬 존재).

참고: 기존 Oopy 이력서는 곧 내릴 예정 — 새 홈페이지가 유일한 public source가 된다.
