---
type: product-reference
title: Past-Company Product Decision Achievement Inventory
description: 과거 회사·프로젝트의 기획적 퍼포먼스를 제품 판단, backend 계약 번역, 기술 실행 체계로 나눠 선별한 이력서용 성과 후보.
timestamp: 2026-08-18
derived_from:
  - evidence/claims/career.yaml
  - evidence/claims/credentials.yaml
  - evidence/projects/previous-career.md
  - products/resume/backend-case-achievements.md
tags: [resume, product-decision, planning, career, evidence]
---

# Past-Company Product Decision Achievement Inventory

이 문서는 새로운 사실을 소유하지 않는다. 사실·기여 강도·공개 범위는
[claim registry](../../evidence/claims/README.md)와
[previous-career evidence](../../evidence/projects/previous-career.md)가 소유한다.
이 문서는 과거 회사·프로젝트의 기획 경험을 backend 채용에서 읽히는 성과로 재선별한다.

## 포지셔닝 원칙

과거 경험을 전부 `제품 기획`으로 묶지 않는다. 실제 기여에 따라 다음 세 층으로 구분한다.

| 층 | 독자가 판정할 역량 | 대표 사례 |
| --- | --- | --- |
| 제품 판단 | 무엇을 만들고 어떤 순서로 제품화할지 결정 | SellerCanvas 0→1·기업 PoC |
| 제품 요구의 backend 번역 | 정책·사용자 흐름을 domain·transaction·API contract로 구체화 | Memento 결제 정합성, TellingMe BFF·Mock API 후보 |
| 기술 실행 체계 | 새 제품과 팀이 같은 기준으로 개발·배포되게 구조화 | 더데이랩스 초기 backend·개발 기준 |

- 별도 `PM 성과` 섹션으로 떼지 않는다. 회사별 경력이나 backend case 안에서 판단과 구현을 연결한다.
- 문장의 중심은 `기획도 했다`가 아니라 `제품 판단을 backend 계약과 실행 결과로 끝냈다`다.
- stable public claim이 있는 항목과 evidence·claim 승격 전 후보를 섞지 않는다.
- 결과는 매출·전환율만 뜻하지 않는다. v1.0 제품화, PoC 연결, 특허, transaction 정합성, 반복 가능한 개발 기준도 검증 가능한 결과다.
- 오래된 경험이라는 이유로 자르지 않는다. 현재 경력에 없는 판단과 failure mode를 증명하면 필요한 깊이로 쓴다.

## 공개 이력서에 바로 쓸 수 있는 성과

| 우선순위 | 회사·프로젝트 | 정확한 성과 분류 | 결과 | Claim·상한 |
| --- | --- | --- | --- | --- |
| A | STUDIO LAB · SellerCanvas | 제품 0→1 판단 | 프로토타입에서 v1.0 제품까지 연결 | `career.sellercanvas-product-system` · `led/high` |
| A | STUDIO LAB · SellerCanvas | 기업 요구의 제품·기술 스펙화 | 프로토타입·v1.0 제품을 기업 PoC로 연결 | `career.sellercanvas-enterprise-poc` · `led/high` |
| A | STUDIO LAB · SellerCanvas | 제작 flow 재설계 | 특허 「페이지 출력 방법」 출원·등록과 연결 | `career.sellercanvas-product-system` · `led/high`, `credentials.page-output-patent` · `contributed/high` |
| B | 외부 Product·UX 활동 | 사용자 흐름 분석과 요구사항 구체화 | 운영 서비스 pain point를 개선 가설·prototype artifact로 전환 | `career.product-ux-practice` · `contributed/medium` |
| B | Memento AI · Feynman | 결제 정책의 transaction 번역 | manual-capture 선결제와 provider 보상 처리, 환불 완료 상태 전이 | `career.memento-stripe-prepayment` · `led/high`, `career.memento-payment` · `contributed/high` |
| B | 더데이랩스 · Centurion | 초기 제품의 기술 실행 체계 | backend와 개발팀 system·기준을 제품 시작 시점부터 수립 | `career.thedaylabs-freelance` · `led/high` |

### 1. 프로토타입을 v1.0 제품으로 전환

Claims: `career.sellercanvas-product-system` (`led/high`)

성과 후보:

- 프로토타입 단계의 생성형 AI 커머스 제품을 v1.0으로 세우는 과정에서 제품 흐름·기능 범위·출시 우선순위를 정한 PM 메인 역할로 0→1 구간을 이끌었다.
- 기능 목록을 관리하는 데 그치지 않고, 무엇을 남기고 바꿀지 판단해 제품이 실제로 운영되는 구조를 기획·구축했다.

Backend 관점의 전문성:

- 요구사항을 개발 가능한 범위와 우선순위로 바꾸는 능력의 직접 근거다.
- 현재 backend 역할에서는 이 경험이 domain boundary, 기능 정의, release scope를 빠르게 정하는 배경으로 이어진다.

표현 경계:

- 합류 당시 prototype이 있었고 PM 전환은 2022.10이다. `창업 시점부터 참여`, `0에서 혼자 구축`, `제품 전체 단독 총괄`은 금지한다.
- 매출·전환율·사용자 수는 검증되지 않았다. 결과는 `v1.0 제품화`까지 쓴다.

### 2. 기업 요구를 기술 스펙으로 바꿔 PoC로 연결

Claim: `career.sellercanvas-enterprise-poc` (`led/high`)

성과 후보:

- 프로토타입·v1.0 제품을 외부 패션 브랜드 PoC로 연결했다.
- PoC 과정에서 비즈니스 요구사항을 기술 스펙으로 변환하고 기획·일정·기술 검증 범위를 조율했다.

Backend 관점의 전문성:

- 고객 언어를 개발팀이 구현·검증할 수 있는 계약으로 번역한 product/backend bridge 사례다.
- 일정 관리 자체보다 요구사항, 기술 제약, 검증 범위를 하나의 delivery plan으로 맞춘 점을 설명한다.

표현 경계:

- 고객사 실명·PoC 건수는 공개하지 않는다.
- `고객 검증 완료`, `상용 계약`, `매출 달성`, `제품·PoC 단독 총괄`로 확대하지 않는다.
- 상세 활동을 공개 문장으로 사용할 때도 claim statement와 evidence의 의미 범위를 넘지 않는다.

### 3. 상세페이지 제작 flow를 재설계하고 특허로 연결

Claims: `career.sellercanvas-product-system` (`led/high`),
`credentials.page-output-patent` (`contributed/high`)

성과 후보:

- SellerCanvas 0→1 과정에서 상세페이지 제작 flow를 재설계했고, 해당 작업은 특허 「페이지 출력 방법」 출원·등록으로 이어졌다.
- 화면 기능 하나가 아니라 입력부터 페이지 출력까지 이어지는 workflow를 제품 시스템으로 구조화한 사례다.

Backend 관점의 전문성:

- 사용자 흐름을 상태·처리 단계·출력 계약으로 분해하는 product-system 설계 경험으로 연결한다.
- 특허는 본인의 단독 성과가 아니라 제품 flow 설계가 외부 검증 가능한 자산으로 남은 보조 근거다.

표현 경계:

- `PoC가 특허를 직접 만들었다`는 인과를 단정하지 않고 `그 과정에서`라고 연결한다.
- 단독 발명, 특허 전담·소유 표현은 금지한다. 특허 claim의 상한은 `contributed`다.

### 4. 사용자 흐름의 문제를 개선 가설과 요구사항으로 구체화

Claim: `career.product-ux-practice` (`contributed/medium`)

성과 후보:

- 운영 중인 서비스의 point 인지·재방문 문제를 pain point, solution, expected result로 구조화하고 badge·push 개선안을 Figma artifact로 구체화했다.
- Speak 학습 완료 화면에서 다음 콘텐츠 추천이 단조롭고 현재 학습과 연결되지 않는 문제를 정의하고 추천 흐름 개선 요구사항을 설계·발표했다.

Backend 관점의 전문성:

- 사용자가 겪는 문제를 화면 의견에서 끝내지 않고 상태·trigger·요구사항으로 분해하는 product/backend bridge의 선행 경험이다.
- 현재에는 PM·UX 분석 경험을 product requirement와 backend contract의 간극을 줄이는 데 활용한다.

표현 경계:

- UX Designer나 전문 사용자 리서치 전담 경력으로 표현하지 않는다.
- Oopy에 기록된 신규 유저 유입 200%는 다른 업데이트와 함께 발생한 결과라 개인 UX 제안의 직접 성과로 쓰지 않는다.
- 개선안 전체 구현, 전환율·리텐션 개선, TellingMe 제품 기획 ownership으로 확대하지 않는다.

### 5. 결제 정책을 provider 보상과 상태 전이로 번역

Claims: `career.memento-stripe-prepayment` (`led/high`),
`career.memento-payment` (`contributed/high`)

성과 후보:

- Stripe Checkout manual-capture 선결제 영역을 구축하고 local transaction ID로 PaymentHistory·PaymentMethod와 Checkout·Webhook event를 연결했다.
- 예약 처리 실패 시 PaymentIntent 상태에 따라 cancel/refund하는 provider-side 보상 처리를 추가하고, 환불 완료 시 mileage 복원·ticket 삭제가 일어나도록 상태 변경 순서를 보완했다.

Backend 관점의 전문성:

- 제품 정책을 API 문구가 아니라 local transaction·외부 provider 상태·완료 transition의 순서로 해석한 기술 기획 사례다.
- 이 경험은 이후 Centurion에서 실패 가능한 작업을 API 요청 밖 worker 경계로 분리한 예방 설계의 배경으로 연결된다.

표현 경계:

- PM이나 제품 기획 ownership으로 포장하지 않는다. `결제 정책을 backend correctness로 구현한 경험`이라고 설명한다.
- DB+provider atomic rollback, webhook idempotency·exactly-once, 전체 결제 시스템 ownership, 장애 완전 해결과 개선 수치는 금지한다.
- Stripe integration slice는 `led`, 공유 payment domain의 상태 전이 보완은 `contributed`로 분리한다.

### 6. 새 제품과 개발팀의 기술 실행 체계를 함께 수립

Claim: `career.thedaylabs-freelance` (`led/high`)

성과 후보:

- 제품과 개발팀이 함께 시작되던 시점에 Centurion 초기 backend를 구축하고 repository 구조, Config·환경·실행 방식, 문서와 ISSUE·PR template 등 개발팀 system·backend 기준을 세웠다.
- 프리랜서 협업에서 시작한 제품과 역할을 창업 이후에도 이어가며 초기 foundation을 장기 backend ownership으로 연결했다.

Backend 관점의 전문성:

- 구현할 기능을 나열한 경험이 아니라, 팀이 이후 기능을 같은 구조와 규약 위에서 만들 수 있도록 delivery system을 먼저 세운 경험이다.
- 초기 스타트업에서는 product code와 engineering operating system을 함께 설계할 수 있다는 근거로 사용한다.

표현 경계:

- 제품 전략·시장 전략을 주도했다고 쓰지 않는다.
- 프리랜서 기간 밖의 활동과 성과를 이 시기 결과로 합치지 않는다.
- 당시 성과 수치와 제품 전체 단독 구축 표현은 사용하지 않는다.

## Claim 승격 전 성과 후보

아래 항목은 기획 역량을 설명할 재료가 있지만 현재 public claim gate를 통과하지 못했다.
resume에 먼저 쓰지 않고 evidence·역할 분담·공개 범위를 보강한다.

| 회사·프로젝트 | 후보 성과 | 현재 근거 | 상한·보강 조건 |
| --- | --- | --- | --- |
| Memento AI · Check | PM 인턴으로 서비스 기획부터 API·DB schema·인증 domain·구현까지 0→1 범위 경험 | 공개 플랫폼 자기 기록 | 인턴 `contributed` 상한. 원 repo·기획서·배포 범위·역할 분담 확인 후 claim 신설 |
| TellingMe | Main 화면 BFF, 신규 기능 Dummy·Mock API, v2 domain contract로 모바일 요구사항을 backend 계약화 | `workspace:tellingme-server` commits `68f9b07`, `c38d963`, `84fd363` | commit 사실은 code-backed. 제품 의사결정 ownership과 협업 artifact를 확인해 별도 claim 신설 |
| 아이즈솔 · Kidsly | UX 사용자 흐름·기능 요구사항 정의, 일정·task·커뮤니케이션 조율 | 여러 플랫폼 자기 기록 | 인턴 `contributed` 상한. 전용 stable claim과 원 source 필요 |
| 아이즈솔 · EatUp | 데이터·Detection 모델 개발과 PM 역할 | 플랫폼 자기 기록 | 제품 범위·역할 분담·결과 확인 후 별도 claim 필요 |
| STUDIO LAB · Deep Scan | PM 재직 중 의류 색상 분류 모델 직접 개발 | user-confirmed evidence | 직접 구현 사실을 소유하는 stable claim 필요 |
| STUDIO LAB · SellerCanvas backend | Node.js legacy→NestJS 개선 방향 설계, exception·logging 구조와 template 구축 | 플랫폼 자기 기록 | Git·repo 근거, migration 범위, contribution boundary 확인 후 backend claim 신설 |
| STUDIO LAB · 외주 협업 | 외주 개발사의 일정·산출물·acceptance 기준 관리 | 파생 copy에만 존재 | user confirmation과 canonical evidence가 먼저 필요 |
| 더데이랩스 · 내부 AI 도구 | AI chat·tool orchestration·citation·SSE·audit log·infra를 잇는 내부 workflow | code signal은 있으나 기간·회사 귀속 불명확 | 실제 사용 결과, 업무 귀속, 공개 범위를 확정한 뒤 claim 신설 |

### TellingMe에서 새로 확인한 code-backed signal

현재 공개 claim `career.tellingme-backend-infra`는 Spring Boot backend와 AWS 배포·모니터링 리드까지만 소유한다.
다만 Git에는 다음과 같은 제품 요구→backend contract 번역 흔적이 있다.

- `68f9b07`: Main 화면에 BFF pattern을 적용한 API 구현.
- `c38d963`: 신규 기능 협업을 위한 Dummy API 구현.
- `84fd363`: v2 신규 기능 요구를 backend domain과 Mock API에 반영.

별도 claim으로 승격하면 다음 문장이 후보가 된다.

> 모바일 신규 기능 요구사항을 BFF·Mock API·domain contract로 구체화해 backend와 client 개발의 접점을 설계했다.

현재는 무엇을 직접 결정했고 무엇을 전달받아 구현했는지 분리되지 않았으므로 public resume에는 쓰지 않는다.

### 아이즈솔에서 보존할 기획 경험

초기 인턴기에도 모델 개발만 한 것은 아니다. 내부 evidence에는 Kidsly의 UX 흐름·기능 요구사항 정의와 일정·task·팀 커뮤니케이션 조율, EatUp의 PM 역할이 남아 있다.
다만 전부 self-reported이고 전용 claim이 없으므로 공개 상한은 현재 다음 궤적 문장이다.

> Vision AI에서 PM을 거쳐 Backend Engineer로 확장한 product-system 경험의 출발점.

구체 문안을 살리려면 인턴 기여를 `contributed`로 한정한 별도 claim을 먼저 만든다.

## 회사 간에 연결되는 반복 패턴

각 회사를 별개의 PM·개발 경력으로 나열하지 않고, 같은 판단이 더 큰 범위에서 반복됐음을 보여준다.

| 과거 경험 | 현재의 반복 증거 | 연결 가능한 주장 |
| --- | --- | --- |
| SellerCanvas 제품 흐름·기능 범위·출시 우선순위 | `centurion.day-product-integration`, `mediness.product-operations` | 제품 정책을 BE·FE·QA·release 실행으로 끝까지 연결 |
| Memento provider 보상·상태 불일치 수습 | `centurion.bay-async-backend` | 실패 수습 경험을 worker·retry·재처리의 예방 설계로 전이 |
| 더데이랩스 초기 개발 기준 수립 | `be-template.backend-standard`, `be-template.team-leverage` | 초기 팀 기준을 조직 표준 template과 재사용 가능한 규약으로 확장 |

이 연결은 새로운 인과를 만들지 않는다. evidence에 명시된 학습 전이와 역할 continuity만 사용한다.

## 이력서 편집 기준

- 일반 Backend JD: Memento의 transaction 판단과 더데이랩스의 delivery system을 경력에 넣고, SellerCanvas는 product/backend bridge를 증명하는 과거 핵심 경력으로 둔다.
- Product Backend·초기 스타트업 JD: SellerCanvas 0→1·PoC를 넓게 쓰고 Memento·더데이랩스를 실행 근거로 연결한다.
- AI Product·PO 병행 JD: SellerCanvas의 `0→1 → PoC → flow 재설계 → 특허`를 하나의 완결된 서사로 쓰고 현재 제품 운영 claim으로 반복 가능성을 증명한다.
- 한 지원본에 같은 내용을 `소개`, `경력`, `대표 기술 사례`에서 반복하지 않는다. 가장 강한 위치 한 곳에서 깊게 쓰고 다른 섹션은 claim만 보강한다.

## 현행 public expression 반영 상태

- SellerCanvas PoC 문장은 `career.sellercanvas-enterprise-poc`에 mapping해 active resume에 반영했다.
- PM 재직 중 색상 분류 모델 직접 개발, 아이즈솔의 구체 기획·일정 관리, SellerCanvas legacy migration은 전용 stable claim이 없어 active resume에서 제외했다.
- TellingMe는 `career.tellingme-backend-infra`가 허용하는 Spring Boot backend와 AWS 배포·monitoring 범위만 남겼다. 팀 규모·앱 출시·신규 기능 contract 설계는 claim 승격 전까지 공개하지 않는다.
