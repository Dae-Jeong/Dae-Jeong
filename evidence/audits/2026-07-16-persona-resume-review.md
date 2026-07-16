---
type: audit
title: Persona Resume Review (4 reviewers)
description: 인사 담당자 페르소나 4종(AI 스타트업 리크루터·CTO 면접관·보수적 대기업·글로벌 EN)의 KO 마스터 v1 + EN 초안 교차 검토 결과와 조치 분류.
timestamp: 2026-07-16
tags: [audit, resume, review, persona]
---

# Persona Resume Review — 2026-07-16

대상: KO master v1 (resume content) + EN draft (backlog/english-resume/draft-content.md). 리뷰어에게는 이력서 본문만 제공 (claim 체계 비노출).

## 판정 요약

| 페르소나 | 판정 |
| --- | --- |
| AI 스타트업 리크루터 (primary target) | **인터뷰 콜** — LLM 품질 시스템 키워드 실무 신호, 단 경력 흐름 확인 전제 |
| CTO 기술면접관 | **면접 진행 권장 (중상, 조건부)** — 강도 구분 표기 신뢰 가점, cutover·runbook 어휘 진정성 |
| 보수적 대기업 (lower-priority fit) | **탈락** — 타임라인 공백·단기 재직·개인 프로젝트 혼입 |
| 글로벌 EN hiring manager | **Hold** — 재료 좋으나 정량화 부족 + EN 품질 이슈, "리라이트하면 interview 각" |

## 교차 합의 발견 (4/4 또는 3/4)

1. **경력 타임라인이 최대 리스크 (4/4)** — Memento 3개월 무설명, TellingMe(개인 프로젝트)가 경력란에 직함 달고 혼입 + Memento와 기간 중복(2024.10–12), 공백 2구간(2021.06–12, 2025.01–04) 무설명. "경력 부풀리기로 읽힘" 표현까지 나옴.
2. **"월 수만 건 + 5xx 1% 미만" 지표 역효과 (4/4)** — 규모가 작음을 광고하고, "1%"는 낮은 기준으로 읽힘(리뷰어들은 1%를 실제 수준으로 해석). 실측은 0.26%이므로 현재 밴딩이 실제보다 나쁘게 보이게 만듦.
3. **개선폭(before/after) 지표 부재 (4/4)** — "구축했다"만 있고 판정 가능한 개선 수치가 없음.
4. **역할 병행 표현 양면성** — CTO는 "전담/주도/공동" 구분을 신뢰 가점으로 읽음(부풀리는 사람의 패턴이 아님). 대기업·글로벌은 "Tech Lead·PO·AI agent 역할 병행"을 타이틀 인플레/의미 불명으로 읽음. 특히 EN "AI-agent roles"는 "본인이 AI 에이전트"로 오독됨.
5. **내부 용어 미번역 (3/4)** — "agent-readable workflow", "pipeline registry·release gate", "daily briefing agent"가 성과 없이 나열되면 buzzword. 결과 지표로 번역하거나 한 섹션에 격리 권고.
6. **긍정 합의** — LLM 품질 시스템 어휘의 진정성(judge·평가 루프·관측 로깅 조합은 실무자 신호), 전면 재구축→cutover→운영 전담의 완결 서사, 개발-인프라 수직 통합.

## EN 초안 지적 (글로벌 리뷰어)

- 3인칭 동사체(Operates/Owns) → implied first person으로
- "builds AI products into operable systems" → "turns AI products into reliable production systems"
- "serving Tech Lead, PO, and AI-agent roles" → "serving **as** Tech Lead and Product Owner" (+agent는 별도)
- "Solely designed" → "as the sole engineer", "Led retry-safe async flows" → "Designed retry-safe async pipelines"
- "Stabilized ... correctness" → "Fixed correctness bugs in ..."
- 아이즈솔 한글 표기(ATS 파싱 불가), 날짜 포맷(Apr 2025 – Present), 학위명(B.S.), ADsP 제거 권고, "Engineering Standards" 복수형
- 구조: Summary/Capabilities/Projects 3중 중복 → Experience 중심 통폐합이 US 관행

## 조치 분류

### A. 사실이라 못 고침 — 표기 전략으로 대응

- 경력 공백·단기 재직·트래픽 규모·백엔드 순수 연차 자체. → 사유 한 줄 명시(사실 확인 필요), 지표 재선정으로 대응.

### B. 정책 안에서 즉시 수정 가능

1. 밴딩 재조정: "5xx 1% 미만" → 실측(0.26%) 기반 "0.3% 수준" 또는 "99.7%+ success" — 범위화 원칙 유지하면서 실제에 근접. claim allowed_copy 수정 필요.
2. TellingMe를 경력란에서 개인 프로젝트 섹션으로 분리.
3. "AI agent 역할 병행" 표현 재작성 (예: 역할은 Tech Lead·PO만, agent 운영은 성과 불릿으로).
4. 내부 용어를 결과 언어로 번역 또는 [일하는 방식] 한 곳에 격리.
5. EN 문법·포맷 수정 전부 (draft-content.md 반영).

### C. 기존 트랙과 연결 (구조적)

- 개선폭 지표 = **outcome claim 2호 후보** — 변경 전후 기간 + commit/PR 연결 검증 필요 (infrastructure.md Measurement Boundary 경로). LLM judge 도입 전후 재생성률 등 후보.
- 대규모 트래픽·K8s = 경험 gap 트랙 (이력서 밖, 기존 분리 유지).

### 사용자 확인 필요 (사실)

1. Memento AI 3개월의 사유 (계약직/조기 종료 등 — 표기 문구 결정)
2. 공백 2구간(2021.06–12, 2025.01–04) 사유
3. TellingMe 기간이 Memento와 겹치는 배경 (병행 여부)
4. (기대기) 아이즈솔 공식 영문 사명, 특허 공식 영문 제목

## 해석 주의

- 대기업 페르소나의 "탈락"은 시장 report상 lower-priority fit 세그먼트의 판정 — primary target(AI product backend 스타트업)은 인터뷰 콜. 모든 지적을 모든 독자용으로 고칠 필요는 없고, tailoring에서 세그먼트별 적용.
