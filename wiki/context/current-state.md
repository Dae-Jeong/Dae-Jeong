---
type: current-state
title: Current State
description: Current source-of-truth routing and deployed site state; this file is a derived snapshot.
timestamp: 2026-09-08
canonical: false
derived_from: [profile/, evidence/claims/, products/, products/resume/application-registry.yaml, products/resume/application-lifecycle.md, app/fe/, backlog/platform-profile-consolidation/2026-08-22-live-verification.md]
tags: [current-state, migration, resume]
---

# Current State

## Current Baseline

- **STUDIO LAB PM 문안 보강** (2026-09-08): 공용 이력서·영문 CV에서 PM의 제품화 판단, 기업 요구의 기술 스펙화·PoC 조율, 제작 흐름 재설계·특허 기여를 구분해 반영했다. 현재 이력서 양식 비교에도 같은 문안이 연결된다. 경력기술서의 기존 PM 서술과 회사별 제출본·플랫폼은 유지하며 선별·검증은 [Application Copy Standard](../rules/application-copy-standard.md) 게이트 23이 소유한다.
- **병역 이력 추가·보강** (2026-09-08): 사용자 확인 병역과 무선통신병 업무를 [경력 원장](../profile/career.md#military-service)과 `career.military-service` claim에 적재하고 공용 영문 CV의 `Education` 바로 앞 `Military Service`에 반영했다. 전시 부여 임무는 실제 전쟁 참가와 구분한다. 직장 경력·실무 연차와 분리하며 기존 제출본은 유지한다. 선별 규칙·검증은 [Application Copy Standard](../rules/application-copy-standard.md) 게이트 35가 소유한다.
- **공용 CV 영문·Jake 양식 적용** (2026-09-08): 사용자 선택에 따라 `/cv`를 영문·경력 우선의 Jake 양식으로 구성했다. 동일한 app 문안에서 LaTeX A4 2쪽 PDF를 생성하고 PC·모바일 렌더, 문안·claim 유지, PDF 전 페이지와 연락처 링크를 검증했다. 공용 이력서·경력기술서·포트폴리오의 문안과 기존 제출본은 유지하며 배포·플랫폼 동기화는 하지 않았다. 양식 결정·생성 경로는 [지원 문서 패키지 기준](../products/resume/document-package-contract.md#공용-cv의-영문템플릿-결정-2026-09-08)이 소유한다.
- **Thready 시작 서사·QA 성과 선택 수정** (2026-09-08): 공용 4종과 JYP·피처링·미리디 mutable 문안에서 인계·prototype 이후 합류 도입부와 QA 재오픈·재발 감소 성과를 제외했다. 아이디어 제안·제품화·개발·출시·운영을 중심으로 쓰고 재구축은 API 계약 보존·경계 설계·검증·전환으로 설명한다. 최초 prototype 작성 이력과 QA 측정, frozen 제출본은 유지했다. UI 비교도 현재 app JSON을 소비한다. 이전 날짜의 인계·QA 감소 성과 선정 기록은 현행 선택에 재사용하지 않는다. 규칙·게이트 32·33은 [Application Copy Standard](../rules/application-copy-standard.md)가 소유하며 플랫폼 동기화·배포·PDF는 하지 않았다.
- **공용 4종 웹 반영** (2026-09-08): 사용자가 수용한 [새 문안](../products/resume/revisions/2026-09-08-achievement-refresh/README.md)을 `app/fe/content/common/*.json`으로 승격하고 `/resume`·`/career`·`/portfolio`·`/cv`에 연결했다. `/common`은 로컬 검토 허브다. 고객의 Threads 진입 장벽·제품·AI 구현을 앞세우고 고객 한 사례의 성장·시점이 있는 팀 매출을 보조로 배치한다. 회사별 shared content와 제출본은 보존했으며 배포·플랫폼 동기화·PDF 생성은 하지 않았다. 문안별 현재 route·state는 [common-package.yaml](../products/resume/common-package.yaml), 범위·검증은 [승격 기록](../products/resume/revisions/2026-09-08-achievement-refresh/README.md#공용-웹-4종-반영)이 소유한다. 아래 날짜별 기록의 과거 매출 우선·사례 수 고정은 현재 문안의 기준으로 재사용하지 않는다.
- **공용 이력서 UI 비교 유지** (2026-09-08): `/resume/compare`에 동일 원문의 기존안·고전 템플릿을 유지했다. 현재 공용 이력서는 고전안을 우선 적용했으며 최종 양식 선택은 아직 별도다. [UI 비교 기록](../products/resume/revisions/2026-09-08-achievement-refresh/README.md#이력서-ui-비교)을 참조한다.
- **개인 OSS 외부 partnership 수락** (2026-09-05): 공개 GitHub 프로젝트를 보고 OrcaRouter가 먼저 제안한 OSS Developer Partner Program을 2026.09 수락했다. 현재 개인 성과의 범위는 `외부 제안·수락`이며, provider 연동·directory 등재·referral 수익은 후속 근거 전까지 완료 성과로 사용하지 않는다. owner는 [partnership evidence](../evidence/projects/orcarouter-oss-partnership.md)와 `career.orcarouter-oss-developer-partnership` claim이다.
- **지원본 작성 기준·블록 SoT 신설** (2026-09-02): 정체성·15초 문장·대표 성과 풀 6개·수치 정책을 고정 층으로 두고, 포장 허용 범위와 제출 전 게이트 10개를 [Application Copy Standard](../rules/application-copy-standard.md)가 소유한다. 블록별 문안 원형(문제·판단·구현 경계·결과)·강도·preset 순서는 [Resume Block Library](../products/resume/resume-block-library.md)가 소유하며, 회사별 `content-draft.md`는 여기서 시작한다. 회사별 헤더는 공고 직무명을 앞에 둔다. Codex 세션 304개 검토 결과 포지셔닝이 두 달간 다섯 번 바뀌고 같은 지적이 반복된 것이 배경이다.
- **지원 문서 패키지 기준 확정** (2026-09-01): Common은 이력서·경력기술서·포트폴리오·CV 네 문서를 모두 상시 관리한다. 회사별 지원본은 이력서·경력기술서·포트폴리오를 기본으로 조립하고 CV만 JD·지원 채널 요구에 따라 선택한다. 회사 국적은 CV 생성의 단독 조건으로 쓰지 않으며, 영문 이력서와 CV도 별개 artifact로 관리한다. Common 이력서·포트폴리오는 active이고 경력기술서·CV는 typed content owner와 local/noindex route를 구성해 review-ready 상태다. JYP·피처링은 Resume·Career Description·Portfolio 3종을 tailored로, CV는 omitted로 기록했다. 상세 owner는 [Resume Document Package Contract](../products/resume/document-package-contract.md)다.
- `Profile -> Evidence -> Products` knowledge harness migration 완료.
- `master/v0`–`master/v1`은 구조 baseline으로 유지하고, superseded 문안 v2–v4는 `archive/resume-master/`로 이동했다. 현재 KO 웹 이력서의 문안 SoT는 `app/fe/content/common/resume.json`이며 이전 `resume-view.tsx`는 현재 공용 경로에서 사용하지 않는다.
- **회사별 지원 status registry 승격** (2026-09-01): [Application Registry](../products/resume/application-registry.yaml)가 application status와 artifact metadata를 소유하고 [Tailored Application Lifecycle](../products/resume/application-lifecycle.md)은 상태·revision·Snapshot 규칙을 소유한다. 상태는 `지원 전(pre-apply)·진행중(in-progress)·합격(accepted)·거절(declined)·탈락(rejected)` 다섯 개로 제한하고, 기업 검토·면접·처우 협상은 tracking 문구로 관리한다. 왓섭은 `in-progress / 기업 검토 중 / frozen`이며 현재 direct-link·noindex 이력서·포트폴리오 제출 표면은 변경하지 않는다. JYP와 피처링은 `pre-apply / 문안·local route 검토 중 / mutable`이며 두 지원본의 portable `work_session`은 `waiting-review`로 관리한다. MGRV는 `rejected / frozen`, GNA COMPANY는 사용자 확인을 반영한 `rejected / 결과 확인 필요 / artifact unknown`이다. 그 밖의 tailored 폴더는 상태를 추정하지 않고 `[확인 필요]`로 둔다.
- 2026-08-18부터 resume의 고정 2-page cap·요약/case 개수·경력 상세 bullet 금지와 `resume는 hooking, portfolio는 depth` 기준을 폐기했다. 첫 장 scanability를 유지하되 전체 resume는 self-contained technical proof를 제공하며, backend case 선택 기준은 [Backend Case Achievement Inventory](../products/resume/backend-case-achievements.md)가 소유한다. 2026-08-26부터 공통·직군별 resume는 `소개 → 핵심 성과 → 경력 → 기술` 순서로 결과를 먼저 판정하고 경력과 mechanism으로 검증한다.
- 과거 회사의 기획 경험은 [Product Decision Achievement Inventory](../products/resume/product-decision-achievements.md)에서 `제품 판단`, `제품 요구의 backend 번역`, `기술 실행 체계`로 분리하며, stable public claim과 승격 대기 후보를 함께 관리한다.
- 이력서의 역할 PR 기준은 [Resume Role Positioning Standard](../products/resume/role-positioning-standard.md)가 소유한다. `Tech Lead`를 primary, `Backend Engineer`를 supporting role로 두고 제품 판단을 backend contract와 production 운영으로 닫는 반복된 사례로 Product Owner 성격을 증명한다. active frame은 `소개 → 핵심 성과 → 경력 → 기술 → 외부 활동 → Credentials`이며 대표 성과는 Thready 유료 제품 운영, FastAPI 병렬 재구축·QA reopen, Centurion 주문·재고 비동기 복구, Thready AI/DB migration·Outbox, Backend Template·agent 기준의 다섯 사례다.
- **AX 사례 분리** (2026-08-18): 기존 한 사례에 섞여 있던 DAY·Mediness·BE Template·SellerCanvas를 해체했다. MEDINESS는 `요구·운영 흐름 설계 참여(contributed)`와 `제품별 decision→release 적용·운영 리드(led)`로, BE Template은 직접 구축한 engineering system으로 분리했다. daily briefing 직접 구축 claim은 Git author 불일치 재검증 전 active resume에서 제외한다.
- **회사 AX 전환 설계로 확장** (2026-08-21): 제품 기획·개발·QA·릴리스뿐 아니라 의사결정·회의·업무 배정·승인·후속 작업을 agent-readable context·tool·human gate로 연결하는 회사 업무 AX 구조 설계 참여를 별도 claim으로 적재했다. 공통 이력서에서는 MEDINESS의 `설계 참여·제품 적용 운영 리드`를 Career와 Skills에 유지하고, 직군별 AX/FDE 지원본에서 비중을 높인다. Tech Lead 책임은 Backend 지원본의 기술 범위·검증·전환 판단으로 보여준다. 공통 Selected Impact는 반복된 backend 전문성을 더 선명하게 보여주기 위해 03을 Centurion 비동기 복구 사례로 교체했다. 포트폴리오는 Company AX를 독립 primary case로 유지하되 current product operation과 확장 설계 중인 company-work lane을 구분한다.
- **Thready 제품·수익화 framing 갱신** (2026-08-24): 고객이 돈을 내는 이유를 찾고 제품 판단→구현→출시·운영을 연결한 Maker 경험을 공통 서사의 시작으로 둔다. 공개 표현은 팀과 함께 `실제 고객이 결제하는 유료 제품`으로 만든 경험을 전면에 두고, 정확한 매출 band는 confidential internal evidence로만 보존한다. backend·AI·핵심 frontend는 제품을 완성한 직접 구현 범위로 분리한다. 광고 적용은 시작 단계라 portfolio의 `NEXT · 운영 데이터 수집 중`에서만 표현하고 이력서·채용 플랫폼에는 넣지 않는다. 별도 PC snapshot의 URL 기준 최신 상태 131,736행·시계열 관측 3,188,563행과 labeling/rubric 근거는 evidence와 상세 case에 보존하며, common resume에서는 정확 corpus 수치·자동 학습·바이럴·매출 직접 인과와 `MRR` 표현을 사용하지 않는다.
- **경력 합류 경로 정밀화** (2026-08-18): Memento AI 성과 인정 후 MediSolve AI 초기 멤버 영입, 더데이랩스 프리랜서 형태의 법인 설립 전 선행 개발, 2025.04 정규 합류·Tech Lead 역할을 별도 claim으로 기록했다. active resume는 더데이랩스를 MediSolve AI CareerRow 안의 stage로 그룹화하지만 canonical 법적 timeline·tenure는 분리한다.
- **Infrastructure positioning correction** (2026-08-23): 회사 topology·6개 state·400+ object·10대 VM log·8개 alert 근거는 내부 evidence로 보존하지만, 사용자는 infrastructure architecture를 깊이 이해해 처음부터 설계한 전문 영역으로 포지셔닝하지 않는다. 공통 resume의 Azure 대표 성과와 public portfolio Infrastructure dossier를 제거하고, 여러 사내 서비스의 Azure·Vercel 배포 환경 구성·기본 운영 경험만 Career·Skills의 supporting signal로 남겼다. 별도 Platform 지원본도 활성 목록에서 제외했다.
- **공통 대표 성과 1차 확정** (2026-08-23): general resume의 `대표 성과`를 `Thready 유료 제품 운영·직접 구현`, `인계받은 backend의 FastAPI 병렬 재구축·validation harness·QA reopen 26%p 관측`, `Centurion 주문·재고 비동기 복구·test/CI 기반`, `Thready 제품 원장/AI 실행 분리·STG migration·Outbox`, `조직 표준 Backend Template·agent context` 순으로 고정했다. 회사 AX는 Career·Skills·role variant와 portfolio primary case에 유지한다. HTTP 5xx·36시간·정확한 Threads corpus 수치는 common headline에서 제외한다.
- **Thready 안정성 지표 선별** (2026-08-19): 2026-06~07의 `HTTP 5xx 0.3%`는 baseline·SLO·user-impact incident 구분이 없는 historical snapshot이라 active resume에서 제외했다. QA는 총건수 감소가 아니라 해결된 issue의 반복 결함 signal(reopen 비율 26%p 감소)로 정의하고, validation harness 선행·backend cutover와 시간 순서만 연결한다. 최신 30/90일 운영 지표와 Jira 동일 정의 재측정 전까지 단독 인과·현재 성과로 확대하지 않는다.
- **Product·UX 보조 역량 반영** (2026-08-18): 공개 Oopy·Figma에서 운영 서비스 UX 컨설팅, Speak 추천 흐름 분석, YouTube Music UX 원리 발표를 확인하고 `career.product-ux-practice`로 승격했다. resume는 이를 primary role이 아니라 제품 요구를 backend contract로 번역하는 배경과 독립 `외부 활동` 섹션의 `UX 컨설팅`·`UX 스터디` 두 행으로 사용하며, 기술 index와 Credentials에서는 분리한다. 개선안과 다른 제품 업데이트가 함께 반영된 뒤 공유받은 3개월 내 App Store 순위 9위→5위·DAU 기존 대비 200% 수준은 `career.ux-consulting-product-outcome`으로 분리하고, 복수 개선의 공동 결과에 대한 기여로만 공개한다.
- 사실·경력은 `profile/`, 공개 claim·강도는 `evidence/claims/`, 제품 계약·mapping은 `products/`, 현재 공개 표현은 `app/fe`가 소유한다.
- 브랜드 정체성은 [profile identity](../profile/identity.md)의 `Maker`가 소유한다. 채용 역할과 기술 근거는 `Tech Lead` / `Backend Engineer` / `AI Product Systems` / `Agent-readable Engineering Workflow` 순서로 분리한다.
- Daejeong Design은 별도 repo에서 도구 개발을 진행하며 이 repo는 profile/evidence/resume content source를 소유한다.
- repo는 완전한 프로젝트 monorepo다 (2026-07-18, spec 8차 개정): `wiki/`(지식) · `app/`(fe→Vercel·be→Render·design 승격 스냅샷) · `labs/`(k8s 서비스) · `infra/` · `tools/`(자체 env) — [설계 spec](../docs/superpowers/specs/2026-07-15-personal-site-architecture-design.md).
- **Phase 1 착수됨** (2026-07-18): `app/fe` scaffold 완료 — Next 16.2.10 + Tailwind v4 + Mono 토큰 + 폰트, hello world 빌드·렌더 검증 완료.
- **디자인 시스템 구현됨** (2026-07-18): 토큰 계약 전체를 `globals.css` @theme으로 이식(type scale 11~56px 포함), `components/site·ui` 11개 컴포넌트 + `cn()` 병합 계약(tailwind-merge), `/design` living specimen 라우트 — 빌드·렌더·computed style 검증 완료. Storybook 패키지는 도입하지 않음(라우트가 겸함 — 업계 레퍼런스 조사로 검증, 로컬 위키 design-systems 항목).
- **공개 배포 완료** (2026-08-08): **marinkim.xyz 라이브**. Vercel(개인 계정 `marinbackend-1819`, Root Directory `app/fe`) + 가비아 DNS + Let's Encrypt(apex·www). 전 라우트 200, `git push origin main` -> 자동 배포. repo 는 **PRIVATE 전환**(evidence·연락처 보호), 사이트만 공개. 비용 최적화로 `commandForIgnoringBuildStep` 설정 — wiki 만 바뀐 커밋은 빌드 스킵.
- **플랫폼 프로필 Maker v2 동기화 완료** (2026-08-24): 홈페이지·공통 resume에서 파생한 [붙여넣기 패키지](../backlog/platform-profile-consolidation/2026-08-22-platform-paste-package.md)를 Wanted·LinkedIn·Remember·Groupby·RocketPunch에 반영하고 저장 후 reload 검증을 마쳤다. 다섯 플랫폼 모두 `아이디어를 고객이 돈을 내는 제품으로 만드는 메이커`와 실제 고객이 결제하는 유료 제품 운영·직접 구현 범위를 사용하며, 정확한 매출 band와 광고 실험은 공개하지 않는다. RocketPunch 자동 AI 커리어 요약도 새 경력을 바탕으로 재생성됐다. LinkedIn Featured는 도메인 링크 검증 실패로 상단 웹사이트 버튼이 역할을 대신하고, Saramin은 사용하지 않기로 확정해 대상에서 제외했다. Oopy 정리와 Wanted·LinkedIn의 UI 잔여값은 남아 있다. 현재 플랫폼별 상태는 [Live 적용 검증](../backlog/platform-profile-consolidation/2026-08-22-live-verification.md)이 소유한다.
- **Maker 브랜드 기준문장 갱신** (2026-09-01): 공통 소개는 `가능성을 기회로 바꾸고, 제품으로 가치를 전하는 메이커 김대정입니다.`로 확정했다. `Maker`는 브랜드 정체성이고 채용 역할 표기는 `Tech Lead · Backend Engineer`를 유지한다. 홈 hero와 공통 resume·portfolio·직군별·회사별 mutable 초안은 같은 문장을 쓰며, 실제 고객이 결제하는 제품을 만든 근거는 소개 문장에 넣지 않고 바로 아래 Thready 경력과 사례가 증명한다. 채용 플랫폼은 마지막 적용값을 보존하며 다음 명시적 동기화 때 새 문장으로 맞춘다.
- **포트폴리오 V3 단일 문서 반영** (2026-08-23): `/portfolio`는 세 primary case를 `Thready 유료 제품 운영·직접 구현` → `Company AX 전환 설계` → `Centurion service별 failure boundary` 순으로 보여준다. Company AX 사례는 MEDINESS의 제품·회사 업무 control plane과 직접 구축한 Backend Template·agent context를 contribution strength별로 분리한다. Infrastructure dossier는 archive evidence로 이동했고, Memento payment는 supporting case로 유지한다.
- **직군별 이력서·포트폴리오 초안 확장** (2026-08-26): local-only route에서 Product Ownership·Backend·AI Backend·AX/FDE 네 관점으로 같은 claim과 case library의 순서·기술 깊이·focus를 바꿔 읽을 수 있게 했다. Tech Lead는 별도 지원본으로 나누지 않고 Backend 관점 안에서 기술 범위·검증 기준·전환을 정한 책임으로 증명한다. Product Ownership은 공식 직함이 아닌 지원 관점으로 둔다. AX/FDE는 Thready 유료 제품 운영 → NEXUS 외부 운영·예약 backend → SellerCanvas 기업 PoC로 field delivery를 먼저 증명하고, Company AX·Backend Template은 반복 가능한 실행 방식으로 확장한 후속 근거로 배치한다. 프로젝트 사실·수치·ownership은 복제하지 않고 기본 public surface는 유지한다.
- **피노키오랩 맞춤 지원본 1차 확정** (2026-08-28): `/resume/pinokiolab`, `/portfolio/pinokiolab`를 승인된 public direct-link·noindex 지원본으로 전환했다. `고객이 사용하는 AI 제품을 만들고 운영한 Product Engineer`를 먼저 보여주고, AI 콘텐츠·실시간 상담/주문·재고·병원 운영/예약·예약/결제 사례 뒤에 FastAPI·SQLAlchemy transaction/session 기준을 기술 증거로 배치했다. BAY·SAY 실제 코드로 자동 발주 알림과 sequence 기반 STT 보정 경계를 재검증하고, 기획·QA·디자인 직군의 FastAPI template 적용과 Thready의 자동 검수·사람 라벨링 역할 분리를 반영했다. 웹·모바일·A4를 검수했으며 이력서 3쪽·포트폴리오 19쪽 PDF를 `output/pdf/pinokiolab/`에 생성한다.
- **Portfolio semantic visual system local preview** (2026-08-27): 공통·직군별·회사 맞춤 portfolio에 navy·white·gray 기반과 단일 blue accent를 적용했다. green·amber는 verified outcome·risk 같은 작은 판정 지점에만 제한한다. 동일한 회색 panel 반복은 `문제·대처·결과·system view·기술 판단·담당 범위`의 서로 다른 시각 위계로 교체하고, `compact-flow`는 mobile·A4에서 안정적으로 읽히는 code-native diagram으로 전환했다. 현재 local 검증 상태이며 공개 배포는 아직 하지 않았다.
- **회사 Azure topology 시각화 기록** (2026-08-20, 2026-08-23 archive): Microsoft 공식 Azure icon 기반 current topology는 기술 audit·내부 evidence로 보존한다. 사용자의 전문성 positioning correction에 따라 public portfolio와 role variant에서는 선택하지 않는다.
- **NEXUS·DAY 제품 경계 정정** (2026-08-20): 기존 `NEXUS ≡ Centurion` 판정을 supersede했다. DAY는 Centurion을 구성하는 범용 피부과 CRM 영역이고, NEXUS는 Centurion과 별개의 외부 피부과 홈페이지·관리·예약 운영 시스템이다. NEXUS backend 구축과 server-owned 지점 권한은 별도 사례로 분리했으며, 예약률 개선을 통한 고객사 매출 기여는 제품·팀 outcome의 `contributed/medium`으로만 공개한다. 정확한 예약률·매출 증분·개인 단독 인과는 금지한다.
- **Thready PO 제품 운영 범위 확정** (2026-08-20): PO 역할로 기획·QA·마케팅 담당자와 함께 제품 운영·관리를 리드하고, 고객 문제 정의·기능 및 실험 우선순위·생성 품질 기준·QA·release·production operation을 하나의 실행 흐름으로 조율했다. PO 공식 등재 직함·제품 전체 단독 ownership은 주장하지 않으며, 직접 구현한 backend·data·AI system과 cross-functional 협업 범위를 분리한다. 월 구독료 매출은 제품·팀 outcome이다.
- **Thready·SAY code-native reference architecture** (2026-08-22, 2026-08-23 runtime 정정): bitmap asset 대신 Azure topology와 같은 HTML/CSS component로 전환했다. Thready는 Browser·Vercel·FastAPI product API·제품 원장/파일 저장·외부 콘텐츠 API와 GitHub Actions·Azure 배포를 한 구조도로 연결한다. 별도 AI application·DB는 product backend와 함께 STG·Prod current runtime으로 표시하고, 하단 migration rehearsal만 STG 검증 범위로 분리한다. SAY는 Express Gateway·NestJS SSO·WebSocket session orchestrator·STT/event/판단 pipeline과 provider benchmark·E2E replay·regression test를 한 component에 배치하며, DELTA·COMPLETE·optional CORRECTED와 stop guard를 확대 영역으로 표현한다. 자동 학습·무중단·무유실·전체 system 단독 구축은 주장하지 않는다.
- **Thready frontend 직접 기여 검증** (2026-08-20): 현재 release branch의 author history·copy/rename 추적 blame·대표 feature commit을 교차 확인해, 콘텐츠 생성·가져오기·예약·발행·dashboard·account/settings·super-admin·labeling workbench의 Next.js 사용자·관리 workflow를 직접 구현·운영한 범위를 `led/high` claim으로 승격했다. 초기 prototype frontend의 최초 개발, frontend 전체 단독 구축, design 전담은 주장하지 않는다. active resume와 portfolio는 frontend를 협업 전용 역할에서 직접 구현 범위로 이동한다.
- **교차 workspace 후보 운영 경계** (2026-08-20): Procedure Hub는 개발 중이며 미사용이라 장애·QA·사용자 outcome이 없다. SSO Admin control plane은 Prod 사용 예정이나 현재 dev·stg 근거만 있어 pre-production supporting evidence로 유지한다.
- **공개·시점 규칙**: [client masking](../rules/public-safety.md)은 내부 실명/공개 마스킹을 분리한다. [recency weighting](../rules/recency-weighting.md)은 recency를 기본 정렬 신호로만 쓰며 고정 비율·quota를 두지 않고, 과거 정량도 evidence·measurement context·JD relevance로 판정한다 (2026-08-18 개정).
- **연차 기준 확정** (2026-08-13 재산정): 인턴 제외 실무 48개월 = **4년차**. 이전에는 "6년째"·"5년차"·"BE 5년차"가 혼재했다. 산정 표 owner는 [career.md#tenure](../profile/career.md#tenure), claim은 `career.tenure`.
- claim registry는 active public expression의 수치·역할 강도를 소유하고, resume claim map과 validator가 사용 여부를 대조한다.
- **[canonical-baseline](../profile/canonical-baseline.md) 신설** (2026-08-09): 확정값 통합 인덱스. canonical 은 각 owner 문서가 갖고 이 문서는 derived view 다.
- **오버레이 5종 완료** (2026-07-18): D2 협업 2차 시트 확정(디자이너 결정 3건이 Carbon·Primer·GOV.UK 패턴과 교차 일치) → React 구현(시각부/행동부 분리, focus·dismiss 계약) → `/design`에 00 Tokens(runtime 실값)·오버레이 specimen 10~14 → `tools/visual_check.py` 시각 회귀(baseline diff, 음성 대조 검증) 까지 완료. 모바일 nav 구멍(≤720px) 해소됨.

## Migration Status

| Layer | Status |
| --- | --- |
| portable runtime | complete |
| root routing hubs | complete |
| evidence/claim registry | complete |
| profile normalization | complete |
| resume/portfolio/homepage/JD products | active; 회사별 지원 status는 tailored registry가 소유하며 `pre-apply`·`in-progress`만 현재 진행 대상으로 분류 |
| tailored applications | active registry; 왓섭 in-progress, JYP·피처링 pre-apply·work session review 대기, MGRV·GNA COMPANY rejected, 나머지 상태 미확인 (2026-09-01) |
| skill adapters | complete |
| temporary clean-clone verification | complete (2026-07-11) |

## Verification Baseline

- `uv sync --locked`: pass
- workspace metadata/link/path/claim validation: pass
- tracked symlink and local-only path check: pass
- active KO PDF: A4, 5 pages. 첫 장 scanability·페이지별 technical signal·100% scale 잘림/겹침·클릭 가능한 contact/Thready case 링크 검증 완료 (2026-08-24)
- `git clone --no-local` temporary clone verifier: pass

## Next

**작업 목록은 [todo.md](todo.md)가 소유한다.** 6개 문서에 흩어져 있던 것을 통합했다.

현재 우선순위:

1. **플랫폼 프로필 sync 마무리** — Oopy 링크 정리·공개 종료 판단과 플랫폼 UI 잔여값 확인. LinkedIn EN secondary는 영문 claim 검수 후 선택 적용
2. **근거 확보로 claim 상향** — KCL 인증서, NEXUS pool 안정화 지표
3. **active 이력서 파생 산출물 정리** — sitemap 갱신

세부 작업과 판단 대기는 [todo.md](todo.md)만 갱신한다.
