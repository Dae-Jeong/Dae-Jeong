---
type: index
title: TODO — 통합 작업 목록
description: 여러 문서에 흩어진 남은 작업의 단일 진입점. 상세는 각 owner 문서가 소유한다.
timestamp: 2026-09-02
canonical: false
derived_from: [context/current-state.md, products/site/content-sot.md, products/resume/content-contract.md, backlog/platform-profile-consolidation/2026-08-22-live-verification.md, backlog/platform-profile-consolidation/2026-08-22-platform-paste-package.md, backlog/README.md]
tags: [context, todo, routing]
---

# TODO — 통합 작업 목록

이 문서는 **현재 남은 작업과 판단 대기만** 모은다. 완료 이력과 상세 근거는 각 owner 문서와 Git history가 소유한다.

상태 표기: `[ ]` 미착수 · `[~]` 진행 중

---

## A. 지금 할 것

### A0. 직군별 이력서·포트폴리오 기술 신호 강화

owner: [수정 계획](../docs/superpowers/plans/2026-08-26-role-variant-technical-signal-rewrite.md)

- [~] **사실 안전 정리** — Backend local draft와 Centurion dossier의 과장 표현을 먼저 정리함. 나머지 role variant 검수 대기
- [~] **Backend 기준본** — 안전한 FastAPI 전환·durable delivery·비동기 복구·외부 결제 상태를 local 이력서에 반영. 사용자 문안 검토 대기
- [ ] **직군별 확장** — Backend 문안 승인 뒤 AI Product Backend·Product Ownership·FDE의 서로 다른 proof hierarchy로 확장
- [ ] **검증** — validator·typecheck·lint·build·browser A4와 15초·60초 역할 판정 확인

### A0-0. 지원본 게이트 적용 (2026-09-02 신설)

**1차 마무리 체크포인트 (2026-09-03)** — 피처링·JYP 지원본: 이력서 v2(판단·결과) · 경력기술서 v2(기전·검증) 정본화, 코드명·Next.js·팀 서술 정리, 여섯 축 키워드(게이트 11), Product Engineer 소개, 도식 17장 + 흐름형 문법, 공개 수준 규칙, k8s lab(M0~M5)과 claim. PDF는 `output/pdf/{featuring,jyp}/` 최신. 남은 것은 아래 미완료 항목.

owner: [Application Copy Standard](../rules/application-copy-standard.md) · 블록: [Resume Block Library](../products/resume/resume-block-library.md)

- [x] **피처링** — 개정 완료 (2026-09-02): 성과 01~04(H·B·C+E·D), reopen 복원, 15초 소개, 헤더 `Backend Engineer · Tech Lead 역할 병행`·`실무 4년차`, NEXUS는 경력·경력기술서만. 블라인드 리뷰 반영. 3종 화면 동기화. 승인·PDF 완료
- [x] **JYP** — 개정 완료 (2026-09-02): 성과 E→A→J→I, 15초 소개(기획자 출신·세 도메인·조직 표준), 더데이랩스 그룹화, 폐업 사유, 측정 문장 제거, 도구명, Slack 제안. 3종 화면 동기화. 포폴 case 순서를 이력서와 일치시킨 뒤 승인·PDF 완료
- [x] **UI v3 적용** — JYP·피처링 이력서·포트폴리오를 A안(사진·섹션 번호 없음, 소개→성과→경력, light hero)으로 통일. registry artifact_revisions 3 (2026-09-02)
- [x] **포트폴리오 도식 추가** — 설계 도식 문법(Sequence·StateMachine·Compare·StateTable·Topology, `app/fe/app/portfolio/diagrams/`) + 9장: Outbox·BAY worker·transaction template·multi-tenant·Azure topology·Thready AX 앞단/뒷단·Mediness 업무 분장·Thready agent 구현. 회사별 `designs` 배열 순서 = 우선순위 — JYP는 AX 먼저(Case 01: 업무 분장→template, Case 02: AX 2장→agent→Outbox), 피처링은 Outbox→agent→AX. 인쇄는 행·표·footer 단위 break. 검토 라우트 `/portfolio/design-lab`(local). PDF 재생성 완료 (2026-09-02)
- [x] **도식 SoT·공개 수준** (2026-09-03): [Design Diagram Library](../products/portfolio/design-diagram-library.md) 신설 — 14장 × (포트폴리오/경력기술서/이력서) 3층 문안 + 숨긴 것. 규칙 §2-1 도식 공개 수준(패턴 수준·내부 식별자/수치/topology 제외·변형 금지). 9장 추상화 + 신규 4장(sequence-fence·split-migration·idempotent-importer·quality-layers) + SAY 세션 풀(Timeline 문법)
- [x] **흐름형 문법** (2026-09-03): `flow.tsx` swimlane(열=서비스 경계·격자 고정·SVG 직각 화살표·행 공유 grid). Outbox·worker·agent·이관 4장 흐름형 전환 + 신규 3장(rebuild-decision·stripe-prepayment·agent-prototype). mermaid는 GitHub용으로만
- [x] **도식 시각 점검** (2026-09-03): 라벨 배치 자동 점검(노드·라벨 겹침 0건), 체인 줄바꿈 분할, 인쇄 break 규칙. 대상 매체는 데스크톱+A4로 고정, 모바일 제외(user-confirmed)
- [x] **이력서·경력기술서 v2 정본화** (2026-09-03, user-confirmed): 이력서=판단·결과(성과당 문제·판단·결과 3문장), 경력기술서=기전·검증. 코드명 제거, 화면은 coding agent, 팀 서술은 '모두가 메이커', Next.js는 stack 줄만. v1 삭제. registry resume/career-description revision 4
- [x] **도식 배치 완성본** (2026-09-03, 사용자 위임): 피처링 01 importer·품질 3층 / 02 재구축→Outbox→agent→AX 역할 / 03 worker→세션 풀 / 04 template. JYP 01 업무 분장→template / 02 AX 2장→재구축→agent / 03 agent prototype(손그림 대체). hero 목차가 첫 페이지 요약을 대신한다
- [ ] **도식 잔여** — lab에만 남은 5장(tenant·Azure·sequence-fence·이관·선결제)은 직군 맞을 때. DAY 예약 정책 연결 도식은 코드 확인 뒤. GitHub `design-cases` repo는 시각화 완료 뒤 착수
- [x] **PDF** — 피처링·JYP 승인 후 `output/pdf/{featuring,jyp}/` 3종씩 생성 (2026-09-02, `skills/tailor-resume/scripts/route_to_pdf.py`)
- [ ] **공통 이력서** — 기술 섹션 내부 용어 교체, Template 성과 05에 효과 3줄, 아이즈솔·STUDIO LAB 행 문안 교체, MEDINESS bullet을 인수인계 효과로
- [x] **claim 적재** — reopen 일평균 절대값·FK orphan 0건·prototype test 679를 allowed_copy에 반영, 인증·세션/NestJS template/Deep Scan 모델은 `public: false` claim으로 등록 (2026-09-02)
- [ ] **승격 검증** — `centurion.sso-auth-foundation`: `workspace:SSO-BE-API` Git author 대조 후 `centurion.sso-session` 강도 상향 (2026-09-02 범위 SSO로 확정). NestJS template은 코드 미보존으로 승격 불가, Deep Scan은 AI Engineer 기간으로 확정·public 등록 완료

### A0-1. Common 지원 문서 4종 구성

owner: [Resume Document Package Contract](../products/resume/document-package-contract.md) · 실행 계획: [Common 4-Document Package](../docs/superpowers/plans/2026-09-01-common-document-package-implementation.md) · 조립 설계: [Resume Assembly Kit](../backlog/resume-assembly-kit/README.md)

- [ ] **Common 경력기술서** — 프로젝트별 문제·역할·선택·구현·검증·결과를 담는 문안 owner 구성
- [ ] **Common CV** — 전체 경력·학력·수상·자격·특허·공개 활동을 누락 없이 정리하고 언어 정책 확정
- [ ] **조립 규칙** — 회사별 이력서·경력기술서·포트폴리오 기본 조립과 optional CV 선택을 package metadata로 표현
- [ ] **검증** — 네 Common artifact의 화면·A4 PDF와 claim/public-safety 일치 확인

### A0-2. Common 문서 화면·A4 개편

owner: [Common Document Visual Refresh](../docs/superpowers/plans/2026-09-02-common-document-visual-refresh.md)

- [x] **공통 계약** — 코드 경계·기존 output audit와 1440·1920 desktop·390 mobile·A4 baseline capture 완료
- [x] **Resume** — 첫 화면 scanability, bullet·기간·section 정렬과 KO 인쇄 경계 검토 완료
- [x] **Career Description** — 프로젝트별 문제·역할·선택·구현·검증·결과 탐색 구조와 project 단위 인쇄 경계 검토 완료
- [x] **CV** — chronology·credential 중심의 조밀한 기록 화면과 A4 검토 완료
- [x] **Portfolio** — light hero, case 경계, compact case header, diagram·A4 visual 검토 완료
- [x] **회귀 검증** — Orca desktop·mobile screenshot, A4 PDF, lint·build·TypeScript·validator·scoped diff check 통과
- [ ] **사용자 승인** — local review 후 공개 범위·commit·배포 여부 결정

### A0-3. 면접 준비·표기 결정

- [ ] **게이트 10 대비** — async 이벤트 루프·TaskIQ 선택 근거·Outbox fence를 30초로 설명하는 연습. 학습 워크트리(python-async·k8s·대용량) 진도를 지원 시점에 맞춘다
- [x] **더데이랩스 행** — 기본값 MediSolve 행 그룹화로 확정 (2026-09-02). 경력증명 대조가 명시된 공고만 분리

### A1. 플랫폼 프로필 sync

owner: [Live 적용 검증](../backlog/platform-profile-consolidation/2026-08-22-live-verification.md) · 목표 문안: [Platform Paste Package](../backlog/platform-profile-consolidation/2026-08-22-platform-paste-package.md)

- [ ] **LinkedIn EN secondary** — 영문 resume의 `allowed_copy_en` 검수가 끝난 뒤에만 선택적으로 입력
- [ ] **Oopy** — 다른 플랫폼 링크를 marinkim.xyz로 교체하고 공개 종료 여부 판단
- [ ] **플랫폼 UI 잔여값** — Wanted의 더데이랩스 row·credentials와 LinkedIn Featured URL 검증의 안전한 수정 경로 확인

### A2. claim 근거 보강

- [ ] Thready production 안정성 최신화 — 최근 30/90일 request·5xx를 endpoint와 user-impact incident 단위로 재집계하고, 동일 Jira 정의로 resolve 대비 reopen 비율을 2026-08-19 현재까지 갱신. 재측정 전에는 `HTTP 5xx 0.3%`를 active resume 성과로 사용하지 않음
- [ ] `nexus.pool-stabilization`을 공개 성과로 쓸 필요가 생기면 전후 모니터링 지표를 먼저 확보. NEXUS 예약률 전후 수치는 없음(2026-09-02) — `기여` 상한 고정
- [ ] `mediness.daily-briefing`의 non-code 운영 ownership과 직접 구축 범위를 PR review·운영 기록으로 재검증 — 확인 전 active resume에서 제외
- [x] **도식에 쓴 사실 evidence 등록** (2026-09-02): 직책은 공식 명칭 `Tech Lead`로 통일(스쿼드 리더 표기 사용 안 함, user-confirmed) · Friend·Referee·Scheduler 역할 객체 구현과 `ai/src` 저자 비율을 thready.md Generation Quality System에 등록
- [ ] 특허 등록일 KIPRIS 확인 → `2025.12경`의 `경` 제거. KCL 인증서 실물은 없음(2026-09-02 user-confirmed) — confidence medium·통과 사실만 유지

---

## B. 이후

### B1. 산출물 파이프라인

- [ ] sitemap 갱신

### B2. 콘텐츠

- [ ] `/blog`·`/labs` COMING SOON 해소, blog MDX 파이프라인 — [blog setup](../backlog/blog-setup/README.md)

### B3. 이력서 후속

- [ ] resume 섹션 순서 불일치 정리 — `products/site/content-sot.md`(소개→경력→대표 성과)와 `context/current-state.md`·`content-contract.md`(소개→핵심 성과→경력) 중 하나로 통일

- [ ] Career bullet의 3축 정렬 여부 판단 — 현행 유지가 기본값
- [ ] `nexus.pool-stabilization`을 역량 축 2에 넣을지 근거 강도 확인 후 판단

---

## 갱신 규칙

- 완료 항목은 이 문서에서 제거하고 owner 문서에 결과를 반영한다.
- 새 작업은 owner 문서에 먼저 등록하고 여기에 링크만 둔다.
- [current-state.md](current-state.md)는 현재 상태를, 이 문서는 남은 작업만 담당한다.

## 2026-09-03 문안 전수 검토 후

- [x] 회사별(피처링·JYP)·공통(`/resume`·`/career/common`·`/cv/common`·cases) 문안을 1-6 표현 규칙으로 정리. Centurion 내부화, 구독 표현, 도구명 스택 줄 한정, 약 94%, 공통 v2 동기화, 헤더 단일화(`/resume/jyp` 전용 페이지 삭제), `/_map` 로컬 지도 추가
- [x] **탈락 패키지 처리 (2026-09-03 결정)**: 왓섭=in-progress(frozen), JYP·피처링=pre-apply, 나머지 7곳=rejected + `artifact_state: frozen`(legacy-import snapshot). 탈락 패키지는 스냅샷처럼 그대로 둔다 — 문안·visibility 모두 소급 수정하지 않음. 게이트 12는 frozen·rejected를 건너뜀
- [ ] JYP PDF 재생성 — 헤더 단일화로 쪽수가 바뀔 수 있음 (인쇄는 후순위)

## 2026-09-03 Application Copy Harness P0

- [x] `wiki/products/site/copy-surfaces.yaml`(표면 인벤토리), `wiki/rules/copy-gates.yaml`(게이트 데이터), validator 게이트 11(축 단어)·12(금지어, YAML 구동)·13(frozen 불변)·14(헤더 직함 = registry `header_role`)·16(hero 2문장)
- [x] `make verify` / `tools/verify.py` — scope 자동, tsc, active route 200, `output/harness/runs/*.json`(gitignore)
- [x] skill `review-application-copy`, `propagate-copy-decision`; AGENTS.md 래칫 절; registry jyp·featuring `header_role`
- [ ] P1: 게이트 15 `shared-facts.yaml`, `--render` 스크린샷, 3회 연속 FAIL tripwire, archive retrieval 경계
- [ ] P2: 새 JD 1건을 이 하네스로 처음부터 돌려 tailor-resume 6~9단계를 verify·skill 호출로 교체

## 2026-09-03 미리디 Product Engineer (Harness P2 첫 실전)

- [x] 지원 패키지 초안 → 12개월 계약 수용 결정 → 문안 승인 → typed content(`/resume/miridih`, `/career/miridih`, `/portfolio/miridih`) → `make verify` PASS
- [x] RAG 근거 SoT 반영: evidence `procedure-hub.md`, claim `procedure-hub.*` 3개, public-safety 제품명 표, §1-6 RAG 행, 게이트 12 금지어, skills 분류
- [x] generic dossier에도 `designs` 도식이 붙도록 role-portfolio-view 수정 (새 회사 슬러그 대응)
- [ ] 시술 지식 hybrid retrieval 전용 case slug(`lib/cases.ts`) + design-lab 도식 `hybrid-retrieval`(질의 → 엔티티 확정 → SQL 판정 → 문헌 보강 → Context Pack) — 포폴 case 4로 승격
- [ ] 미리디 PDF (요청 시) · 제출 후 snapshot 동결
- [ ] P1 후보: 초안 md 단계에서도 게이트 12 sweep 자동화 (typed content 전)

## 2026-09-03 플랫폼 프로필 → 하네스 표면

- [x] `wiki/products/platform-profiles/` 신설: README(절차·자동화 제약), `platform-registry.yaml`(플랫폼·필드·글자 수·live 상태), canonical 문안 5개(Product Engineer v3). copy-surfaces `kind: platform`, 게이트 17(글자 수), skill `sync-platform-profile`
- [ ] **v3 live 적용**: 리멤버·그룹바이·로켓펀치는 자동 가능, 원티드·링크드인(장문)은 사람이 붙여넣기. 적용 후 registry `live_version: product-engineer-v3`, `drift: false`. 현재 live(Maker v2)에는 `돈을 내는`·`결제하는`·내부 제품명 잔존
- [ ] Oopy 링크 정리·공개 종료 판단 (registry `pending`)
- [ ] `/_map`에 플랫폼 행(URL·live 상태) 추가 후보

## 2026-09-03 플랫폼 v3 적용 (Orca)

- [x] 로켓펀치·리멤버·링크드인: 소개·MediSolve·더데이랩스 v3 적용, 새로고침 확인, 금지어 0
- [x] 원티드: 기본 이력서 MediSolve 본문 적용 / 그룹바이: 자기소개(+수상·특허·자격) 적용
- [x] 사람이 붙여넣기 완료(2026-09-03): 원티드 이력서 간단 소개·MediSolve 성과 제목, 그룹바이 MediSolve·더데이랩스 본문. 새로고침 확인, 5곳 모두 drift: false
- [ ] 미적용 필드(각 플랫폼 Memento·STUDIO LAB·아이즈솔 본문, skill 목록, 링크드인 Featured)는 금지어가 없어 보류. 원하면 같은 절차로
- [ ] 로켓펀치 자동 AI 커리어 요약 재생성 확인

