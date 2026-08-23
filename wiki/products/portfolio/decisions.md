---
type: decision-log
title: Portfolio Decisions
description: Portfolio case library, tailored assembly, and delivery decisions.
timestamp: 2026-08-23
tags: [portfolio, decisions, pipeline]
---

# Portfolio Decisions

## Product Boundary

- 공통 hero는 Maker 브랜드 문장을 사용하고, eyeline의 `Tech Lead · Backend Engineer`와 case proof를 채용 역할·기술 근거로 분리한다.
- 정적 case library로 시작하며 profile application을 먼저 만들지 않는다.
- 대표 case는 공통 opener에서 역할·문제·결과를 먼저 제시하되, 본문은 각 사례의 판단 근거에 맞게 차등 구성한다. Thready는 팀의 유료 제품 운영·공개 콘텐츠 기반 판단·backend 재구축·data/AI boundary 순으로, Company AX는 제품 운영·회사 업무 확장 설계·Backend Template의 책임 경계, Centurion은 contribution map·workload별 failure boundary를 중심으로 설명한다. 검증 상한은 내부 원장에만 둔다.
- Backend 전문성은 stack 목록이 아니라 사례마다 가장 강한 `깨지면 안 되는 상태 · transaction/failure boundary · 복구 방식 · 검증 근거` 중 하나를 전면에 둔다. 기술 용어는 실제 구현 근거가 있을 때만 사용하고, 한 사례에 모든 개념을 나열하지 않는다. Centurion BAY는 요청 처리와 외부 연동의 실패 경계, 명시적 작업 상태와 retry·terminal failure·수동 재처리를 대표 proof로 사용하며 idempotency·exactly-once·DB와 broker의 원자적 transaction은 별도 근거 없이 주장하지 않는다.
- 단일 문서는 성과 문구의 반복보다 `제품 0→1 / 회사 AX 전환 설계 / MSA failure boundary` 세 대표 case를 먼저 보여준다. Infrastructure dossier는 근거 기록으로 보존하되 public master에서 선택하지 않는다.
- Thready의 generic 6-step process는 product/engineering 2-lane 도식으로 대체한다. 공개 콘텐츠는 `최근 1년 내 게시물 중심`으로만 표현하고, 정확 건수는 evidence에 남긴다. 운영 feedback은 자동 학습이 아니라 human-reviewed next decision으로, 매출은 기술 node와 직접 연결하지 않은 제품·팀 outcome으로 표시한다.
- Thready의 초기 backend는 기존 구현 방식이나 작성자를 평가하지 않고 `빠른 기능 검증 중심의 초기 backend를 인계받았다`고 쓴다. AI는 코드 분석·반복 구현에 활용한 수단이며 아키텍처·검증 기준·cutover 판단은 직접 책임진 범위로 분리한다.
- Product Operations는 Company AX primary case의 현재 운영 근거로 합친다. MEDINESS 플랫폼 구현은 담당 개발팀, 요구·운영 구조와 회사 AX 설계는 `contributed`, 제품별 적용·운영은 `led`, Backend Template·agent context는 `owned`로 분리한다. daily briefing 직접 구축은 사용하지 않는다.
- Company AX 첫 시각화는 현재 제품 workflow와 확장 설계를 나란히 나열하지 않는다. 제품 운영에서 축적되는 결정·담당·QA·버전 기록을 공유 실행 맥락으로 두고, 회사 업무 확장에서는 `회의·요청 → agent 준비 → human authority → 배정·후속 작업`의 승인 경계를 보여준다. 실선은 현재 운영, 점선은 확장 설계라는 상태 구분을 유지한다.
- Memento Payment는 이전 경력의 결제 상태 전이를 보완하는 supporting case다. 외부 UX 활동은 common resume에서만 독립 노출하고 public portfolio의 supporting case와 섞지 않는다.
- 공개 portfolio는 `/portfolio` 한 페이지에 세 대표 case의 `결과·핵심 판단·담당 범위`와 대표 시각화 한 개, Memento Payment supporting case를 펼친다. 60초 채용 검토는 공통 page가, 20분 기술 검증은 연결된 상세 route와 직군별 full dossier가 담당한다. 기본 인쇄·PDF 변환은 공통 단일 페이지를 기준으로 하며, Infrastructure route는 공개하지 않는다.
- 모바일과 공통 A4 PDF에서는 desktop용 architecture figure를 그대로 축소하지 않고 5개 안팎의 핵심 node synopsis로 바꾼다. 상세 도식과 작은 system label은 상세 route 또는 tablet 이상에서 제공한다.
- 공통 hero는 Maker 문장을 두 줄 composition으로 유지하고, 바로 아래에 Thready의 유료 운영 결과와 직접 개발 범위를 평문으로 제시한다. 페이지 마지막은 맡고 싶은 문제와 resume·contact CTA로 닫는다.
- claim 상한과 forbidden copy는 내부 case library에 보존하고, 공개 화면에는 `Limits`, `claim`, `Archived`, `준비 중` 같은 검증·제작 상태 문구를 노출하지 않는다.
- resume에 선택된 case만 같은 순서로 조립한다.
- 동일 claim을 resume와 portfolio에서 서로 다른 강도로 표현하지 않는다.
- 새 case가 필요하면 회사별 페이지에서 즉석 작성하지 않고 [case library](cases/README.md)에 먼저 추가한다.

## Tailored Package

JD 하나에서 `resume.html`, `resume.pdf`, `portfolio.html`을 함께 생성한다. resume는 case anchor로 연결하고 PDF 헤더에는 portfolio URL을 둔다.

## Delivery

- 회사별 page는 정적 단일 HTML과 `noindex`를 기본으로 한다.
- 공개 경로에 회사명을 넣지 않고 opaque identifier를 사용한다.
- 도메인, 배포 계정, 회사-경로 mapping은 local deployment concern이며 이 repo의 profile SoT에 넣지 않는다.

Historical rationale은 [archived pipeline design](../../archive/resume-research/15-portfolio-pipeline-design.md)에 보존한다.
