---
type: career-evidence
title: Previous Career And Credentials Evidence
description: Prior roles, product/UX activities, personal project, education, awards, patent, and certification evidence.
timestamp: 2026-08-18
source_roots: [workspace]
tags: [career, credentials, product, ux, tellingme, evidence]
---

# Previous Career And Credentials Evidence

## Role Continuity

- User-confirmed/source-backed timeline: Vision AI Engineer -> PM -> Backend Engineer.
- Public narrative: AI와 PM 경험은 우회 경력이 아니라 AI product를 product/system 관점으로 보는 배경이다.
- User-confirmed (2026-07-19 인터뷰): 궤적을 관통하는 축은 **"제품을 만드는 것"** — 역할이 바뀐 게 아니라 제품을 만들기 위한 위치가 이동했다. AI 엔지니어(만드는 기술) → 제품에 뒷받침 영역이 많음을 깨닫고 기획·UX 설계(PM) → 제품을 A to Z로 만들기 위해 백엔드 선택. 백엔드 선택 근거: **당시에도 FE는 AI가 대체할 것으로 판단, 보안·안정성처럼 사람이 끝까지 책임질 층을 택했다** — 이 판단이 현재 적중. PM 이해도는 Thready 재구축 파악·기능 정의 속도의 실증된 무기 (thready.md#rebuild-context-and-decision).
- Guardrail: 이전 역할을 현재 primary category보다 앞세우지 않는다.

## Izsol (아이즈솔) — 2020.08~2021.06, 인턴

경력의 출발점이며, 이전에는 `profile/career.md` 표의 한 줄("Vision AI Engineer / Kidsly")과 Role Continuity 언급만 있었다. 아래는 플랫폼 프로필 실측으로 확보한 서술이다.

- Self-reported (리멤버·그룹바이·oopy): **Kidsly** — 유아 안면 인식 기반 비접촉 자동 출결 시스템. 안면 인식 로직 개발, 학습용 데이터 수집·관리, 인식 모델 개발 담당.
- Self-reported 정량 (**공개 미사용 확정, 2026-08-08**): Yolo v5 실시간 안면인식, 초당 30장 이상 처리, 인식 정확도 약 99.8% 이상. → 내부 기록으로만 보존한다. 초기 경력의 정량은 현재를 설명하지 못하고 최신 실적과 같은 지면에 놓이면 오히려 비중을 흐린다 ([recency weighting](../../rules/recency-weighting.md)). **공개 표현은 "안면 인식 기반 자동 출결 시스템 개발"까지.**
- Self-reported (리멤버): 역할 범위가 wiki 표기("Vision AI Engineer")보다 넓다 —
  - Python·딥러닝/머신러닝 기반 영상처리 모델 개발 및 성능 개선
  - SQL 데이터 분석으로 서비스 개선 인사이트 도출
  - 서비스 기획 단계에서 UX 사용자 흐름 설계, 기능 요구사항 정의
  - **프로젝트 매니저로서 일정·태스크 관리, 팀 내 커뮤니케이션 조율**
  - ~~**C# 백엔드 개발**~~ — **2026-08-12 user-refuted**: 아이즈솔에서 C#은 하지 않았다. 백엔드는 Python(FastAPI). 이 자기 보고 항목은 공개 사용 금지.
  - 데이터 파이프라인 구축 및 영상 데이터 전처리 프로세스 정립
- Self-reported (리멤버·로켓펀치): **EatUp** — 음식 사진 인식으로 영양 정보 제공. 데이터 수집·관리, Detection 모델 개발. PM 역할.
- Self-reported (로켓펀치): 졸업작품 — 안면인식 자동 출결, **KNN 알고리즘 + face-recognition 패키지**. AI 모델 활용·서버 구축·DB 제작. Kidsly의 Yolo v5 계열과 다른 산출물이다.
- **서사 함의**: 이 시기에 이미 AI 모델 개발과 PM 역할을 병행했다. "AI 엔지니어로 시작해 PM을 거쳐 백엔드로" 궤적이 STUDIO LAB에서 시작된 게 아니라 **첫 직장부터 형성돼 있었다**는 근거다. 다만 인턴 시기이므로 강도를 과장하지 않는다.
- Contribution boundary: 인턴 신분의 기여다. `led`·`owned`로 표현하지 않는다. PM 역할은 "프로젝트 관리 경험"까지만.
- ⚠️ 검증 대기: 정확도·처리량 수치는 자기 보고이며 원본 대조를 하지 않았다. 공개 사용 전 근거 확보 필요.

## Studio Lab And SellerCanvas

- Source-backed (공개 보도, 2026-07-17 확인): SellerCanvas는 상품 이미지를 Vision AI로 분석해 상세페이지(디자인·카피·레이아웃·SEO)를 30초 안에 자동 생성하는 생성형 AI 커머스 콘텐츠 제품이다. CES 2024 AI 부문 Best of Innovation 수상. STUDIO LAB은 삼성전자 C랩 스핀오프.
  - https://www.aitimes.com/news/articleView.html?idxno=155218
  - https://www.asiaa.co.kr/news/articleView.html?idxno=162600
  - https://sellercanvas.com/
- User-confirmed (2026-07-17): 역할 진행은 AI Engineer → PM → Backend이지만 **PM이 메인 롤**이었다. 이 시기의 시스템 구축은 개발 시스템이 아니라 **"제품이 원활하게 돌아가는 시스템"을 기획·구축**하는 일이었다.
- Narrative: LLM 붐 이전(2021–22)부터 Vision AI 기반 생성 제품의 제품 시스템을 기획·구축했다 — 현재의 제품 운영 시스템(decision·spec·release gate) 리드와 같은 근육의 이전 형태다.
- **User-confirmed (2026-08-12)**: 특허 「페이지 출력 방법」은 SellerCanvas 상세페이지 작업에서 나온 것 — 연결 확정, 표현 해금. Deep Scan은 **둘 다** — AI 엔지니어 시기에 시작된 서비스이고, 2023.05~06(PM 재직 중)에 의류 색상 분류 모델 작업을 추가로 수행했다. PM 재직 중 직접 모델 개발의 실증. 단독 발명 표현 금지는 유지.
- **User-confirmed (2026-08-12)**: "셀러캔버스라는 시스템을 내가 처음부터 기획을 했었고 관련해서 **zero to one을 경험하는 과정**을 거쳤어."
  → AI Engineer로 합류한 2021.12 시점의 SellerCanvas는 프로토타입 단계였고, PM으로서 v1.0 제품으로 세우는 0→1 구간을 통과했다.
  기존 서술("프로토타입의 사용 데이터를 분석해 무엇을 남기고 무엇을 바꿀지 정하는 것에서 시작")과 정합한다.
  ⚠️ **Contribution boundary는 유지된다** — "0→1 구간을 PM으로 통과"까지 쓰고, "혼자 다 기획", "제품 총괄"로는 쓰지 않는다.
- **User-confirmed (2026-08-12) — 서사 순서**: "그 과정속에서 PoC도 패션쪽 기업과 함께 진행하게 되었고, 이걸 하면서 특허도 만들게 되었지."
  → **0→1 구간 → 패션 대기업 브랜드 POC → 상세페이지 제작 Flow 재설계 → 「페이지 출력 방법」 특허**가 하나의 흐름이다.
  지금까지 세 사실이 각각 별개 bullet로 나열돼 있었으나, 실제로는 인과가 이어진 한 서사다.
  표현은 "그 과정에서"로 잇는다 — 특허가 POC 산출물이라고 단정하지 않고 사용자가 말한 시간 순서를 그대로 유지한다.
  "운이 좋게도" 같은 겸양은 공개 문안에 쓰지 않는다 (성과를 스스로 깎는다).
- Contribution boundary: PM 메인 시기를 backend 깊이로 포장하지 않는다. 제품 전체 단독 기획·총괄로 표현하지 않는다.

### 재직 기간 확정 (2026-08-13 user-confirmed)

> user: "날짜는 06, 24.01, 24.10 으로 해줘" (플랫폼 간 불일치 3건에 대한 확정)

| 항목 | 확정값 | 비고 |
| --- | --- | --- |
| 아이즈솔 종료 | **2021.06** | canonical·원티드와 일치. 링크드인의 `2021.08`은 오기 → 정정 대상 |
| 스튜디오랩 종료 | **2024.01** | 원티드 인증 경력(2021.12~2024.01)과 일치. **기존 canonical `2023.12`를 2024.01로 정정** |
| 메멘토 시작 | **2024.10** | canonical과 일치. 링크드인 정규직 `2024.11`은 인턴(10~11)/정규 분리 표기라 정합 |

스튜디오랩 정정에 따라 Backend Engineer 구간 종료도 2024.01로 조정한다
(아래 oopy 표의 `2023.12.31`은 실측 당시 기록으로 보존 — 재직 종료 확정값이 우선한다).

### 직무별 기간 (2026-08-08, oopy 포트폴리오 실측)

| 직무 | 서비스 | 기간 |
| --- | --- | --- |
| AI Engineer (Vision) | 셀러캔버스 / 딥스캔 | 2021.12.01 ~ 2022.09.30 |
| PM (프로젝트 매니저) | 셀러캔버스 | 2022.10.01 ~ 2023.09.30 |
| Backend Engineer | 셀러캔버스 | 2023.10.01 ~ 2023.12.31 |

`AI Engineer → PM → Backend Engineer` 궤적의 전환 시점이다. 이전에는 "2021.12–2024.01" 한 덩어리로만 기록돼 있었다. **딥스캔(Deep Scan)은 별도 프로젝트가 아니라 AI 엔지니어 시기의 서비스**다.

### 정량 성과 (Self-reported — **공개 미사용 확정, 2026-08-08**)

아래는 본인이 작성한 플랫폼 프로필(그룹바이·리멤버·oopy)에 기재된 수치다. 자기 보고이며 사내 지표·인증서 원본 대조를 하지 않았다.

**공개 산출물에 수치를 쓰지 않는다.** 검증 가능 여부와 별개로, 3년 전 프로젝트의 모델 정확도·처리 시간은 현재 포지셔닝(백엔드·AI 제품 시스템)을 설명하지 못한다. 최신 실적과 같은 지면에서 경쟁하면 오히려 무게중심을 흐린다 ([recency weighting](../../rules/recency-weighting.md)).

**공개 표현은 서술까지만** — "Vision AI 기반 의류 이미지 분석 모델 개발", "상세페이지 자동 생성 파이프라인 구축" 수준. 아래 표는 내부 기록·면접 답변용으로만 보존한다.

| 항목 | 값 | 출처 |
| --- | --- | --- |
| 상세페이지 제작 시간 단축 | 약 95% 이상 (2~3시간 → 최대 1분, 완성본 1장 기준) | 리멤버 |
| 입력 이미지 상한 개선 | 최대 15장 → 무제한 (안정성 위해 40장 제한) | 리멤버·그룹바이·oopy |
| Yolo v8 의류 이미지 분석 정확도 | 평균 99% 이상 | 그룹바이·oopy |
| **한국건설생활환경시험연구원(KCL) AI 정확도 부문 인증 통과** | 평균 99% 이상 | 그룹바이·oopy |
| VGG Network 분류 정확도 (프로토타입 시기) | 평균 85%+ (종류 5종 90%+, 세부 특징 80%+) | 리멤버 |
| FastAPI 도입으로 개발 기간 단축 | 30% 이상 (12일 → 7일) | 리멤버 |

- **한국건설생활환경시험연구원(KCL) 인증은 제한된 확정 상태다.** 정확도 수치(99%)는 쓰지 않되, **"외부 기관 AI 정확도 인증 통과"라는 사실 자체**는 제3자 검증이라 시점 무관 자산에 해당한다 ([recency weighting](../../rules/recency-weighting.md) 예외 1). 현재 공개 범위는 인증 통과 사실까지이며 `credentials.ai-accuracy-certification`은 인증서 실물 미확인으로 confidence medium을 유지한다.
- VGG(프로토타입, 85%+)와 Yolo v8(99%+)은 시기가 다른 별개 모델로 보인다. 어차피 수치를 공개하지 않으므로 산출물에서는 구분이 불필요하나, 면접 답변 시 혼용하지 않는다.

### 그 밖 (Self-reported)

- **패션 대기업 브랜드 POC 담당** — 기획·일정 관리·기술 검증, 비즈니스 요구사항을 기술 스펙으로 변환. 확정 대상은 **이랜드 SPAO** (user-confirmed 2026-08-09). 플랫폼 기재는 "2개 브랜드"이고, 두 번째는 2026-08-13 사용자 기억상 이름이 S로 시작하지만 실명은 미확정이다. **산출물에서는 개수를 못박지 않고 SPAO 건만 근거로 쓴다** ([clients.md](../clients.md)). 공개 시 마스킹 코드 사용.
- **Node.js 레거시 → NestJS 마이그레이션** — PM 경험으로 레거시 문제점 파악 및 개선 방향 설계, NestMiddleware·ExceptionFilter 기반 예외 처리 구축.
- **Nest.js 도입 개발 템플릿 제작 (2023.08~12)** — JWT 인증/인가, ExceptionFilter 기반 ExceptionHandler, NestMiddleware Logger, MVC 기반 Controller→Service→DAO 흐름. **현재 [be-template](be-template.md) 작업의 원류로 보인다** — 조직 표준 템플릿 설계라는 같은 패턴의 첫 사례다.
- SellerCanvas는 **현재 Gency로 리브랜딩**됐다 (oopy·그룹바이 기재).

## Product And UX Practice

- Source-/tool-backed (공개 Oopy, 2026-08-18 확인): [UX 심리학 파헤치기](https://daejeongkim.oopy.io/10e1a342-7113-8195-8d7d-f5a0e0dbf2f6)에서 UX 심리 원리를 학습하고 YouTube Music 적용 사례를 발표했으며, 운영 중인 서비스의 사용자 흐름을 분석하는 UX 컨설팅을 수행했다.
- Artifact-backed: 공개 Figma의 `머니워크 컨설팅 - SM1 (대정)` 보드는 사용자 pain point를 `Solution → Expected Result → Laws of UX`로 구조화하고, 포인트 인지와 재방문을 위한 badge·push 개선안을 화면 예시와 함께 제시한다.
- Source-/tool-backed: [IPS](https://daejeongkim.oopy.io/10e1a342-7113-819d-bcd5-c45d72ebe6ae)에서는 Speak 학습 완료 화면의 다음 콘텐츠 추천이 단조롭고 현재 학습과 연결되지 않는 문제를 정의하고, 추천 흐름 개선 요구사항을 설계·발표했다. 해당 발표로 IPS 12기 MVP를 수상했다는 자기 기록이 있다.
- Source-/tool-backed: [PSE](https://daejeongkim.oopy.io/10e1a342-7113-81e2-a253-cfbbfd861110)에서는 Delivery Hero APAC 시장과 플랫폼·솔루션 business model을 분석·발표했다. 이 활동은 UX 설계 자체보다 제품·시장 맥락을 읽는 보조 근거로만 사용한다.
- Code-/source boundary: TellingMe에서는 backend 구현과 함께 신규 기능 기획을 보조했지만, 제품 의사결정 ownership은 현재 Git만으로 분리되지 않는다. 공개 UX claim의 직접 근거로 확대하지 않는다.
- User-confirmed outcome (2026-08-18): UX 개선안이 다른 제품 업데이트와 함께 반영된 뒤, 3개월 이내 App Store 순위가 9위에서 5위로 상승하고 DAU가 기존 대비 200% 수준이 됐다는 사후 결과를 공유받았다.
- Measurement boundary: 위 수치는 공유받은 제품 지표이며 raw dashboard로 독립 검증하지 못했다. App Store 순위의 category·region, DAU의 절대 기준값·집계 정의는 확인되지 않았다. 사용자는 여러 개선의 공동 결과에 기여한 것으로만 귀속하며, 개인 UX 제안의 단독·직접 인과나 `DAU 200% 증가`로 확대하지 않는다.
- Contribution boundary: 공개 상한은 `사용자 흐름의 문제를 분석하고 개선 가설·요구사항·prototype artifact로 구체화한 경험`이다. `UX Designer`, 전문 사용자 리서치 전담, 실제 구현 전담, 전환율·리텐션 직접 개선으로 확대하지 않는다.

## Memento Payment

- Git identity (2026-08-18 재확인): `workspace:feynman_api`의 `main == origin/main`이며 `marin@mement.ai` 명의(`MementoAI-Daejeong`, `김대정`) non-merge commit은 **28건**(2024-11-13~2025-01-07)이다. 전체 ref의 48개 object 중 20개는 branch-only·PR/cherry-pick 계열이므로 shipped 근거에서 제외한다.
- Code-backed: `fedfdd6a`에서 Stripe Checkout·Webhook과 독립 `PaymentHistory`·`PaymentMethod`를 도입했고, local transaction UUID와 payment type을 provider metadata에 실어 결제 이력과 event를 연결했다. 현재 `main`의 Stripe package 6개 파일 594/594 lines가 김대정 작성으로 확인된다.
- Code-backed: `f26b4782`에서 manual capture와 예약 전 PaymentIntent 상태 검증을 적용하고, 예약 처리 실패 시 provider 상태가 `requires_capture`이면 cancel, `succeeded`이면 refund하는 **provider-side 보상 처리**를 추가했다. `558e80b5`에서는 0원·전액 마일리지 경로가 불필요한 provider 조회를 거치지 않도록 분기했다.
- Code-backed: `df3405d1`에서 티켓 삭제를 환불 요청 시점이 아니라 환불 완료 transition으로 이동했다. 현금·Stripe·0원·전액 마일리지 경로를 나누고, 완료 시 PaymentMethod 확인 → PaymentHistory 환불 → 사용 mileage 복원 → package ticket 삭제 순서로 상태 변경을 정리했다.
- Verification boundary: Stripe live-call test는 현재 `main`에서 skip 상태다. webhook event dedup·reconciliation과 DB/provider 간 atomic transaction은 확인되지 않았다. local DB 확정 뒤 provider capture가 수행되므로 공개 문구는 `완전한 rollback`이 아니라 `cancel/refund 보상 처리`로 제한한다.
- Contribution boundary: Stripe 선결제 integration slice는 `led`, 공유 payment domain의 환불·마일리지·티켓 정합성 보완은 `contributed`다. 회사 결제 시스템 전체 ownership이나 production 운영 전담으로 확대하지 않는다.
- User-confirmed (2026-07-16): 재직 종료 사유는 회사 폐업 — 이력서에 사유 표기 가능.
- User-confirmed (2026-07-19): **학습 전이** — Memento에서 결제 실패의 실사례(롤백·환불 순서·티켓 정합성)를 직접 수습한 경험이, Centurion에서 실패 가능한 작업(주문·결제)을 처음부터 worker로 분리하는 예방 설계 판단의 배경이 됐다.

## Memento Happy Call And Survey

- Code-backed: 인턴 구간과 겹치는 `main` commit에서 기존 Happy Call 흐름을 고객 언어별 template 선택, 알림톡·이메일 즉시/예약 발송, Celery ETA task 식별자·취소·재등록, 발송 이력 조회로 확장했다 (`d5b9441c`~`b34751d2`).
- Code-backed: 설문 영역에서는 당첨 결과 조회·요약과 기간·검색 filter를 구현했다. 설문 응답 validation은 다른 작성자 영역이므로 김대정 구현으로 주장하지 않는다.
- Test-backed: ETA 예약, revoke/reschedule, 이력 조회와 email/update case의 non-skipped mocked unit test가 존재한다. provider 통합 E2E나 production delivery 결과를 증명하지는 않는다.
- Contribution boundary: 위 bounded slice는 `led`. 다국어 messaging·survey system 전체 단독 구축, 3회 retry, delivery 보장·멱등성, 운영 효과 수치는 금지한다.

## Memento To MediSolve Early-Member Path

- User-confirmed (2026-08-18): Memento AI에서의 개발 성과를 당시 대표에게 인정받아, 새로 설립할 MediSolve AI의 초기 멤버로 영입됐다.
- User-confirmed (2026-08-18): MediSolve AI 법인 설립 전에는 향후 MediSolve AI 공동대표가 된 더데이랩스 대표가 먼저 개발할 수 있는 환경을 마련했고, 2025.02~04 더데이랩스 프리랜서 형태로 Centurion 선행 개발을 시작했다.
- User-confirmed (2026-08-18): 2025.04 MediSolve AI 설립과 함께 정규직으로 합류해 Tech Lead 역할을 맡았다. Tech Lead는 역할이며 등재 직함으로 단정하지 않는다.
- Legal boundary: Memento AI, 더데이랩스 프리랜서 계약, MediSolve AI 정규직은 서로 다른 법적 관계다. `법인 전환`, `승진`, `고용 연속`, `사업 승계`, `공동창업자`, `같은 회사로 이직`으로 표현하지 않는다.
- Public wording: `Memento AI에서의 개발 성과를 인정받아 MediSolve AI 초기 멤버로 영입 → 더데이랩스 프리랜서로 법인 설립 전 개발 선행 → MediSolve AI 설립과 함께 정규 합류·Tech Lead 역할`까지 허용한다.

### 세부 (Self-reported — 플랫폼 기재)

- **Feynman** (2024.11.21~2025.01.10, 정규직) — 피부과 통합 관리 시스템. 대상 고객사는 **뮤즈클리닉**(강남) — 공개 산출물에서는 `M 피부과` 마스킹 코드를 쓰거나 고객사를 생략한다 ([clients.md](../clients.md)). oopy·그룹바이의 "강남 피부과 운영" 표현이 이것이다. Python 3.10, FastAPI, SQLAlchemy, MySQL, AWS. 외부 연동 Stripe·Notifly.
  - 플랫폼의 `Stripe Hongkong API·다국가·구독` 표기는 현재 `main`의 검증 범위를 넘으므로 active public claim에서 제외한다.
  - 플랫폼의 `Notifly 발송 실패 3회 자동 재시도` 표기는 현재 `main`에서 확인되지 않아 active public claim에서 제외한다.
- **Check** (2024.10.20~2024.11.20, 인턴) — 병원 내부 직원 일정 관리 어드민. Python 3.11, FastAPI, SQLAlchemy, MySQL, AWS.
  - **0→1 구축** — 서비스 기획부터 API 설계, DB 스키마 설계, 구현까지 전 과정
  - 회원 도메인 설계 (이메일/비밀번호 인증, JWT 세션 관리)
  - 직무가 "백엔드 엔지니어 & PM"으로 기재돼 있다 (oopy) — 인턴 시기에도 기획을 겸했다
- 인턴 1개월 → 정규직 전환 구조가 oopy·링크드인에 날짜 단위로 기재돼 있다. 다른 플랫폼은 "2024.10~2025.01 4개월"로 합쳐 표기한다. **전환 사실이 드러나는 편이 유리하므로 분리 표기를 기본으로 한다.**

## TellingMe

- Code-backed/user-confirmed: Spring Boot/JPA backend, OAuth2/JWT, gamification domain, AWS deploy/monitoring 범위와 backend lead/infra 역할이 확인됐다.
- Code-backed (2026-08-18): `workspace:tellingme-server`의 김대정 authored commit `68f9b07`은 Main 화면 BFF API, `c38d963`은 신규 기능 Dummy API, `84fd363`은 v2 신규 기능 domain·Mock API 반영을 구현했다. 제품 요구를 mobile/backend 사이의 domain·API contract로 구체화한 흔적이다.
- Contribution boundary: 위 commit은 contract 구현 사실을 확인하지만, 어떤 제품 요구를 직접 결정했고 무엇을 전달받아 구현했는지까지는 분리하지 못한다. 제품 기획 ownership이나 cross-functional lead로 공개하려면 협업 artifact와 별도 stable claim이 필요하다.
- Public-safe summary: 개인 프로젝트의 Spring Boot backend와 AWS 배포·모니터링 리드.
- User-confirmed (2026-07-16): Memento 재직(2024.10–2025.01)과 병행한 사이드 프로젝트다. 이력서에서는 경력란이 아니라 개인 프로젝트로 구분 표기한다 (persona review 4인 합의 반영).
- Unverified: package와 endpoint 개수는 repo 재대조 전 사용하지 않는다.

### 정합성 충돌 (2026-08-08 발견)

위 Unverified 방침과 달리, **그룹바이 프로필에는 이미 상세 수치가 공개돼 있다.**

| 항목 | 그룹바이 기재값 |
| --- | --- |
| 도메인 패키지 | 38개 |
| 도메인 엔티티 | 42개 |
| 컨트롤러 | 22개 |
| RESTful 엔드포인트 | 89개 |

→ **해소 방향 확정 (2026-08-08): 그룹바이에서 수치를 내린다.** repo 재대조로 검증하는 경로는 택하지 않는다 — 개인 프로젝트의 패키지·엔드포인트 개수는 검증되더라도 현재 포지셔닝을 설명하지 못한다 ([recency weighting](../../rules/recency-weighting.md)). 규모를 말해야 한다면 **"10명 팀의 백엔드 2명 중 주도"**가 더 유효한 지표다.

### 그 밖 (Self-reported — 플랫폼 기재)

- 팀 구성 **10명** (PO 1, 기획 1, 디자인 2, iOS 2, AOS 2, BE 2) 중 **백엔드 개발 주도 및 인프라 관리** 담당
- **iOS 앱 정식 출시 완료** — 애플 앱스토어 정책 준수(회원 탈퇴 시 authorizationCode 기반 토큰 만료 처리)
- OAuth2 소셜 로그인(카카오·애플) + JWT Access/Refresh, Stateless 인증
- 게임화 시스템 — 레벨·배지·미션·재화 등 10개 이상 도메인, 연속 답변 Streak 추적, Inventory 패턴
- **Java–Python 마이크로서비스 아키텍처** — Python 마이크로서비스와 HTTP 통신으로 미션·결제 처리 자동화
- GitHub Actions + AWS CodeDeploy CI/CD, 환경별 독립 AWS 리소스 분리(S3·CodeDeploy·EC2)
- Firebase FCM 푸시, **Spring Actuator + Prometheus 메트릭**, **Logback Slack Appender 실시간 에러 전송**
- 스택 상세: Java 11, Spring Boot 2.7.7, Spring Security, Spring Data JPA, MySQL 8.0.33
- **함의**: 개인 프로젝트로 표기하되 **10명 팀에서 BE 2명 중 주도**였다는 점은 협업 규모를 보여준다. "혼자 만든 사이드 프로젝트"로 읽히지 않게 팀 규모를 병기할 가치가 있다.

## Career Gaps And Freelance

> **Superseded 판정 (2026-08-13):** 이 섹션의 2026-08-08 STUDIO LAB 종료일 `2023.12.31` 판정은 폐기됐다. 최신 사용자 확정값은 **2024.01**이며 active owner는 [profile/career.md](../../profile/career.md)다. 아래 구판 문장은 변경 이력일 뿐 사실 판정이나 공개 문안의 근거로 사용하지 않는다. 최신값 기준 STUDIO LAB 이후 Memento 시작 전 구간은 2024.02–2024.09다.

- User-confirmed (2026-07-16): 2021.06–2021.12 공백은 AI 엔지니어로 서울 취업을 준비한 기간이다. 이력서에는 표기하지 않고 면접 답변으로 사용한다.
- Superseded record (2026-08-08): 당시 STUDIO LAB 종료일을 `2023.12.31`로 판정했으나, 2026-08-13 사용자 확정값 **2024.01**로 대체됐다.
- 최신값 기준 STUDIO LAB 종료 후 Memento 시작 전 구간은 **2024.02–2024.09**다. TellingMe 개인 프로젝트(2024.01–2024.12, Spring Boot backend·AWS 인프라 리드)와 OZ 코딩스쿨 백엔드 웹개발 초격차 캠프(2024.06.20–2024.10.20)가 이 기간에 포함된다.
- [persona review](../audits/2026-07-16-persona-resume-review.md)가 지적한 "공백 2구간"은 이 정정으로 3구간이 되지만, 2024 구간은 근거가 있어 오히려 방어가 쉬워진다. AI 엔지니어·PM에서 backend로 직무를 전환한 서사의 실증 구간이다.
- User-confirmed (2026-07-16): Memento 폐업 후 MediSolve 합류 전인 2025.02–2025.04에 더데이랩스에서 프리랜서로 근무했다.
- Code-backed (별도 시점): `workspace:thedaylabs-infra`에 KimMarin 단독 저자 커밋(Azure VM·Blob·docker-compose 배포)이 확인되나 커밋 시점이 2025-10이라 프리랜서 기간(02–04)의 업무 근거로 사용하지 않는다.
- Superseded wording (2026-08-18): 과거의 `더데이랩스와 MediSolve AI는 대표가 같다`는 요약은 공동대표 관계와 법인 설립 전 선행 개발 맥락을 과도하게 단순화하므로 사용하지 않는다. 정확한 합류 경로는 [Memento To MediSolve Early-Member Path](#memento-to-medisolve-early-member-path)가 소유한다.
- User-confirmed (2026-07-17, 2026-08-18 정밀화): 더데이랩스 환경에서 시작한 Centurion 선행 개발은 MediSolve AI 설립 후에도 이어졌다. 새로 꾸려지는 개발팀의 system과 backend 기준 수립에 주력했다.
- Code-backed (2026-07-17): `workspace:BAY-BE-API`를 2025-03-18 "first initialize"로 직접 생성 — 초기 커밋이 프로젝트 기본 구조, Config 설계, SSH 터널링 lifecycle, README 환경·실행 문서, ISSUE/PR Template 등 팀 시스템·기준 수립 성격이며, 프리랜서 기간(2025.02–05) 내 커밋 132건.
- Public wording: `MediSolve AI 법인 설립 전 더데이랩스 프리랜서로 Centurion 초기 backend와 개발팀 system·backend 기준을 선행 구축하고, 법인 설립과 함께 정규 합류`까지 허용한다. 성과 수치는 여전히 금지한다.

## Education

- User-confirmed/source-backed: 우송대학교 게임멀티미디어 전공, 2016.03-2021.08.
- Source-backed: OZ backend, SOCAR AI, Bit Computer 교육 이력.

## Awards And Patent

- Source-backed: SellerCanvas가 CES 2024 Best of Innovation AI 부문에 공식 등재됐다.
- Source-backed/user-confirmed (2026-08-18): 특허 상세는 다음과 같다.
  - 발명의 명칭: `페이지 출력 방법`
  - 영문명: `METHOD FOR DISPLAYING PAGE`
  - 출원인: 주식회사 스튜디오랩
  - 출원번호: `10-2022-0130234`
  - 공개번호: `KR20240050627A`
  - 등록번호: `10-2898273`
  - 출원일: 2022-10-13
  - 등록 시점: 2025-12경 — 정확한 등록일은 현재 미확인
- Self-reported (그룹바이·oopy 기재): SellerCanvas 의류 이미지 분석 모델이 **한국건설생활환경시험연구원(KCL) AI 정확도 부문 인증**을 통과했다.
  - User-confirmed (2026-08-18): 인증 시점은 **2022-11경**이다. 정확한 일자는 인증서·시험성적서 대조 전까지 확정하지 않는다.
  - User-confirmed (2026-08-08) 표기 방침: **"인증 통과" 사실만 쓰고 정확도 수치와 사용 모델(Yolo 등)은 쓰지 않는다.** 과거 정량 미사용 원칙([recency weighting](../../rules/recency-weighting.md))의 예외로, 제3자 검증이라는 성격 때문에 사실만 남긴다.
  - ⚠️ confidence medium — 인증서 실물 대조 전이다. 확인 시 `credentials.ai-accuracy-certification`의 confidence를 high로 올리고 `verified_at`을 기입한다.
- Contribution boundary: 회사/팀 수상이며 개인 단독 수상으로 쓰지 않는다. 특허 발명자 범위는 별도 확인 없이 단독 표현을 쓰지 않는다. 인증도 제품 단위 인증이며 개인 단독으로 표현하지 않는다.

## Certification

- User-confirmed/source-backed: ADsP, 2021.09.

## Rejected Or Unverified Claims

- TellingMe package/endpoint 수치
- CES 개인 단독 수상
- 특허 단독 발명
- payment 장애 완전 해결

### 구버전 원티드 이력서 실측 (2026-08-12, 사용자 제공 스크린샷)

Self-reported (과거 자기 기록) — 현행 evidence와 대조한 발견 3건:

1. **특허가 [PM] 성과로 분류돼 있다** — "[PM] 상세페이지 제작 관련 특허 출원 (특허명: 페이지 출력 방법)".
   본인의 동시대 기록과 2026-08-12 사용자 확인이 일치해 SellerCanvas와 특허의 연결은 해금됐다.
   단독 발명 표현은 계속 금지한다.
2. **Deep Scan이 별도 프로젝트로 2023.05~2023.06에 기록** — 의류 색상·종류 분류 모델,
   "의류 색상 도출 알고리즘 개발을 통한 모델 정확도 보정", KCL AI 정확도 인증 통과가 이 프로젝트 성과로 귀속.
   ⚠️ **시기 충돌**: oopy 실측 표는 딥스캔을 AI 엔지니어 시기(2021.12~2022.09) 서비스로 기록.
   2023.05~06이 맞다면 **PM 재직 중 직접 모델 개발**한 사례가 된다 (dual track 실증).
3. PM 업무 요약: "서비스 및 기능 기획, 프로젝트 일정 관리" — 현행 서술과 정합.

구버전 정량(Yolo v8 99%·v5 99.8%·초당 30건 등)은 recency weighting 원칙대로 계속 공개 미사용.
- **User-confirmed (2026-08-12)**: 아이즈솔 백엔드 스택은 **Python**이다 — "아이즈솔 c#안했어 python이 맞아".
  canonical 경력 설명에 있던 "C# 기반 백엔드"는 오류이며 정정한다. 구버전 원티드 이력서의
  "FastAPI를 활용한 유치원 및 어린이집 비대면 출결 서비스 서버 개발" 자기 기록과 정합.
