---
type: project-evidence
title: Mediness Product Operations And Company AX Evidence
description: Product operations, company-work AX design, and role boundary evidence.
timestamp: 2026-08-26
source_roots: [agentspace]
tags: [mediness, agent-workflow, product-operations, company-ax, evidence]
---

# Mediness Product Operations And Company AX Evidence

Source locator: `agentspace:mediness`

## Product Design Participation

- User-confirmed (2026-08-17): MEDINESS 서비스의 코드 구현은 담당 개발자들이 맡았고, 김대정은 제품 요구와 운영 흐름을 구체화하는 설계에 참여했다.
- Source-backed: MEDINESS 원장에는 backend·frontend·agent 경계와 회의·의사결정·실행·release 흐름을 연결하는 planning·decision·SPEC·Work Package가 존재한다. 이 문서들은 설계 대상의 범위를 보여주며, 김대정의 단독 저작이나 구현 ownership을 증명하는 근거로 사용하지 않는다.
- Git-backed boundary (2026-08-17): 로컬 Git author 기록에서 김대정의 MEDINESS app 구현은 문서 asset 전달 수정의 제한된 범위만 확인된다. 따라서 서비스 전체 구현이나 공통 architecture 설계 주도 claim으로 확장하지 않는다.
- Contribution boundary: 제품 요구·운영 흐름 설계 참여는 `contributed`다. 서비스 직접 구현, architecture·시스템 구조 설계 주도·전담, 제품 기획 전담으로 표현하지 않는다.
- Verification gap: GitHub CLI 인증 만료로 PR review·comment에 남은 설계 토론 참여 기록은 이번 검토에서 확인하지 못했다. 이 claim은 사용자 확정값을 owner로 두며, review evidence를 확보하면 confidence를 재평가한다.

## Product Operations

- Source-backed: product pipeline registry, decision log, SPEC, Work Package, release gate, version cut structure가 확인됐다.
- Source-backed: Work Package status board의 Backend/Frontend/QA/Ops owner lane 구분과, QA 체크·approval을 release 조건으로 두는 release gate 연결 구조가 확인됐다 (2026-07-14).
- Tool-backed: 일정, blocker, release 상태를 반복적으로 갱신한 운영 기록이 확인됐다.
- Contribution boundary: 제품팀 일정·이슈·릴리스 운영 리드와 기획 결정 참여. 제품 기획 전담은 아니다.
- Contribution boundary: 전사 문서 pipeline 규칙 정의는 다른 저자가 주도했고, 김대정은 제품 단위 SPEC·Work Package·Decision·release gate 적용·운영을 리드했다 (git 저자 기록 확인, 2026-07-14).
- User-confirmed (2026-07-19 인터뷰): release gate의 실효과 — 매 릴리스 버전의 릴리스 노트 작성을 자동화해 버전 관리를 용이하게 함. 표현 가드레일: "gate가 사고를 막았다"류 과장 금지 — 실효과(릴리스 노트 자동화·버전 관리·추적)대로만 서술.

## Product Development Coordination Leverage

- User-confirmed (2026-08-26): 기획·디자인·개발·QA·릴리즈에서 나온 결정과 진행 상태를 Decision·SPEC·Work Package·ADR·release evidence·agent context로 계속 축적해, 사람과 agent가 같은 제품·architecture 맥락을 읽고 작업하는 제품 개발 체계를 운영했다.
- User-confirmed outcome (2026-08-26): 현재 요구·진행 상태·과거 판단을 다시 설명하고 확인하는 반복 커뮤니케이션을 줄였고, 유사 기능과 후속 변경에서 기존 판단·구현 기준을 재사용해 초기 설계와 맥락 복원에 드는 비용을 낮추고 개발 lead time 단축에 기여했다.
- User-confirmed handoff outcome (2026-08-26): 담당자가 바뀌어도 구두 인수인계만으로 제품 맥락을 다시 구성하지 않고, 누적된 Decision·SPEC·ADR·runbook·agent context에서 업무를 이어갈 수 있어 인수인계와 후속 관리에 드는 리소스를 낮췄다.
- Source-backed mechanism: product pipeline registry, Decision·SPEC·Work Package, Backend/Frontend/QA/Ops owner lane, release gate·version cut·release note trace가 위 결과를 만드는 실행 구조로 확인된다. Backend Template의 architecture·agent context 직접 구축은 별도 claim이 소유한다.
- Measurement boundary: feature lead time·커뮤니케이션 시간·인수인계 기간의 before/after 수치는 아직 없다. `단축에 기여`와 `비용을 낮춤`의 정성 표현까지만 사용한다.
- Causality boundary: QA 총건수 감소와 매출 개선을 이 체계의 단독 효과로 귀속하지 않는다. Thready의 QA reopen 관측과 구독료 매출은 각각 별도 claim이 소유하며, 이 체계가 해당 제품의 개발·검증·릴리즈·운영에 적용됐다는 연결만 허용한다.
- Language boundary: `인원을 대체`하거나 `인력을 감축`한 것으로 표현하지 않는다. 공개 문안은 `담당자가 바뀌어도 이어지는 개발 체계`, `인수인계·맥락 복원 비용 감소`를 사용한다.

## Company Work AX Design

- User-confirmed (2026-08-21): 제품 개발 흐름뿐 아니라 의사결정·회의·업무 배정·승인·후속 작업을 agent가 읽을 수 있는 맥락과 도구, 사람의 승인 경계로 연결하는 회사 AX 전환 업무 구조 설계에 참여했다.
- Source-backed scope: MEDINESS의 활성 문서·명세에는 제품·버전·담당·배포 상태, 회의 기록, 의사결정 요청·실행 요청·공유, 담당자 해소, 승인 gate, 후속 실행을 서로 연결하는 계약이 존재한다. `agentspace:mediness/products/mediness/20-spec/`, `agentspace:mediness/context/decision-process.md`, `agentspace:mediness/templates/30-work.md`에서 그 설계 surface를 확인했다.
- Source-backed human boundary: AI는 필요한 맥락을 찾아 요청·회의 내용을 실행안으로 정리하고 담당·수신자를 추천하지만, 제품 우선순위·의사결정·업무 배정·승인·release처럼 판단이 필요한 단계는 사람이 확정하도록 설계돼 있다.
- Current-state boundary: 제품의 Decision → SPEC → Work Package → QA → release 흐름은 제품별 적용·운영 근거가 있다. 반면 회의·의사결정·업무 배정·승인·후속 작업을 하나의 feedback loop로 닫는 회사 업무 AX는 draft 또는 단계적 적용 영역을 포함하므로 `전환 완료`, `전사 업무 통합`, `완전 자동화`로 표현하지 않는다.
- Contribution boundary: 김대정의 상한은 회사 AX 업무 구조 **설계 참여(`contributed`)**다. MEDINESS app·DB·runtime 구현은 담당 개발팀의 범위이며, 제품별 실행 원장 적용·운영은 별도 `led` claim, Backend Template·agent context 직접 구축은 별도 `owned` claim이 소유한다.
- Outcome boundary: 업무 생산성, 회의 시간, 승인 속도, release lead time 개선 수치는 아직 검증되지 않았다.

## Daily Briefing Ownership Reverification

- Tool-backed: collaboration tool activity를 집계해 제품 상태와 blocker를 요약하는 daily briefing workflow가 확인됐다.
- Git-backed verification gap (2026-08-18): briefing automation의 최초 구현과 pipeline·DB 재설계 commit은 다른 author이며, 김대정 author의 구현 변경은 확인되지 않았다. non-code 운영 ownership 가능성까지 부정하는 근거는 아니지만, 별도 운영 기록을 확인하기 전에는 기본 이력서에서 `구축` claim을 사용하지 않는다.
- Registry action (2026-08-21): 기존 `owned/high/public:true` 등록은 Git author 근거와 충돌하므로 `public:false`로 내렸다. non-code 운영 ownership 또는 직접 구현 근거를 확인하기 전에는 어떤 공개 산출물에서도 소비하지 않는다.

## Role Boundary

- User-confirmed: Backend Engineer로 합류한 뒤 Tech Lead, PO, AI agent 관련 역할을 병행했다.
- Public wording: 공식 직함 나열보다 `Backend Engineer · Tech Lead·PO 역할 병행`으로 쓴다. AI agent 역할은 직함처럼 나열하지 않고 성과 서술(일하는 방식·bullet)로 표현한다 (2026-07-16 persona review 반영 — "AI agent 역할"이 오독을 유발).
- Guardrail: 기획 전담자와 경영진이 별도로 존재하므로 `제품 기획 주도`를 사용하지 않는다.

## Public Disclosure

- pipeline registry와 decision/spec/work/release gate의 일반 구조는 공개 가능하다.
- 서비스 구현 담당자와 제품 요구·운영 흐름을 구체화하는 설계에 참여했다는 contribution boundary는 공개 가능하다.
- 제품 개발과 회사 업무를 agent-readable context·tool·human gate로 연결하는 AX 구조의 설계 참여는 공개 가능하다. 현재 운영 중인 제품 pipeline과 확장 설계인 회사 업무 AX는 구분한다.
- 제품 수, 담당자, 날짜, blocker, private collaboration content는 공개하지 않는다.
- daily briefing의 존재 자체는 내부 evidence로 남기되 김대정의 직접 구축·운영 claim으로 공개하지 않는다.

## Rejected Or Unverified Claims

- 조직 전체 운영 총괄
- 제품 기획 전담
- MEDINESS 서비스 직접 구현 또는 architecture·시스템 구조 설계 주도·전담
- MEDINESS app·DB·runtime 직접 구현
- 사람의 운영 업무 완전 자동화
- 회사 AX 전환 완료 또는 전사 업무 완전 통합
- AI의 자율 의사결정·업무 배정·승인·release
- company-work AX 도입에 따른 생산성·속도 개선 수치
- 정확한 feature lead time·커뮤니케이션 시간·인수인계 기간 감소 수치
- AI 또는 AX를 통한 인원 대체·인력 감축
- 제품 개발 체계가 QA 총건수 감소나 매출을 직접 만들었다는 단독 인과
- internal product count와 운영 metric
