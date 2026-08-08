---
type: audit
title: Platform-only Evidence Gaps
description: 플랫폼 프로필에는 있으나 claim registry에 없는 근거 전량 — evidence 역흡수 후보.
timestamp: 2026-08-08
tags: [backlog, platform, evidence, gap]
---

# Platform-only Evidence Gaps

claim registry 24건 전량과 플랫폼 5곳(그룹바이·리멤버·로켓펀치·링크드인·원티드) 실측을 대조한 결과. **여기 있는 항목은 현재 claim ID가 없어 웹 이력서·포트폴리오에서 사용할 수 없다.**

출처 표기: `G`=그룹바이 `R`=리멤버 `RP`=로켓펀치 `L`=링크드인 `W`=원티드

---

## A. 제3자 검증 — 최우선

| 항목 | 출처 | 비고 |
| --- | --- | --- |
| **한국건설환경시험연구원 AI 정확도 부문 인증 통과** (Yolo v8, 평균 99% 이상) | G | **CES·특허와 같은 급의 외부 검증인데 registry에 없다.** 인증서 실물 확인 필요 |
| 학생 창업유망팀 300 모의 크라우드펀딩 **모집액 2.8억, 568% 초과 달성** (2020.08) | G, R | 정량 + 외부 대회 |
| 전국 SW중심대학 공동 해커톤 **우수상** (2021.02, 프로그램명 "한다") | G, R, RP | |
| SW 창업 아이디어 경진대회 **아이디어 부문 2등** (2020.10) | G, R | |
| SW 창업 아이디어 경진대회 **개발·구현 부문 2등** (2019.11 또는 2021.09 — 출처별 상이) | G, R | 연도 확인 필요 |
| 비트 프로그래밍 고급반 수료 **5등** (2019.08) | R, W | |
| 쏘카 × 멋쟁이사자처럼 AI 엔지니어 육성 부트캠프 (2021.10) | R, W | |
| OZ 코딩스쿨 백엔드 웹 개발 초격차 캠프 (2024.06, 넥스트 러너스) | W | **원티드에만 존재** |

`credentials.yaml`에는 education·ces-2024·page-output-patent·adsp 4건뿐이다.

---

## B. MediSolve AI / Centurion — 운영 실적

| 항목 | 출처 | registry 상태 |
| --- | --- | --- |
| **MAU 1만 서비스 운영 3개월 중 긴급 이슈 발생 비율 0%** | G | 없음 |
| **인프라 개선으로 월간 서버 비용 약 17% 감소** | G | 없음 |
| C·D·V **3개 브랜드 총 9개 지점 사용 중** (재고 관리 백오피스) | G | 없음 — 도입 규모 지표 |
| **Celery → TaskIQ 마이그레이션** (복잡도 감소, 알림톡 독립 도메인 분리) | G | `centurion.bay-async-backend`에 "TaskIQ worker flow"는 있으나 **마이그레이션 서사는 없음** |
| **Polars 도입**으로 엑셀 파싱 고속화 (Pandas 대비) | G | 없음 |
| **N+1 제거·eager loading** 조회 성능 최적화 | G | 없음 |
| 동시성 제어(Race Condition 방지)·Retry 로직 | G | 없음 |
| 중앙집중식 Validation 시스템 (분산 검증 로직 통합) | G | 없음 |
| SSE 기반 시술 현황 실시간 푸시 | G | `centurion.ray-backend`에 일부 포함 가능 — 명시 없음 |
| JWT SSO **토큰 버전 관리 무효화**, Prisma 멀티 클라이언트 크로스 DB 트랜잭션 | G | `centurion.sso-session`에 세부 없음 |
| Docker 멀티스테이지로 api/taskiq 워커 이미지 분리 배포 | G | 없음 |
| google audio native 기반 피부과 상담 에이전트 PoC | G | 없음 — 진행 중 |
| C·V·D 피부과 홈페이지 운영·예약 관리 시스템 설계·구현 | G | 없음 |

## B-2. A 피부과 어드민 — **프로젝트 자체가 registry에 없다**

2025.10~진행 중. `evidence/projects/`에도 대응 문서가 없다.

- **Multi-Module Clean Architecture 백엔드 단독 구축** — 30개 도메인 API(예약·CMS·상품·고객 등)
- Homepage/Admin 독립 모듈 + Nginx 리버스 프록시 단일 엔드포인트
- Router-Service-Repository-Model 4계층, DI Container
- **Generic BaseRepository** (SQLAlchemy 2.0 Generic), Multi-tenancy(BranchMixin)·Soft Delete 자동 필터링
- **Closure Table 패턴**으로 Category/Procedure 계층 관리
- **Connection Pool 최적화로 500 에러 완전 해결** — pool_size/max_overflow 조정, 미들웨어 순서 개선, 세션 생명주기 강화, pool_pre_ping
- Azure Managed Identity 인증, Build cache + Rolling update 무중단 배포
- **Ruff + Pyright + pre-commit** 품질 자동 검증, 코드 컨벤션 정립 후 전체 리팩토링
- 체계적 문서화 (Swagger 가이드, API 개발 가이드, DB 설계 가이드)

---

## C. STUDIO LAB / SellerCanvas — 정량 성과

| 항목 | 출처 | registry 상태 |
| --- | --- | --- |
| **상세페이지 제작 시간 약 95% 이상 단축** (2~3시간 → 최대 1분, 완성본 1장 기준) | R | 없음 — **가장 강한 정량 성과 중 하나** |
| 입력 이미지 **최대 15장 → 무제한** (안정성 위해 40장 제한) | R, G | 없음 |
| **Yolo v8 의류 이미지 분석 정확도 평균 99% 이상** | G | 없음 |
| VGG Network 분류 정확도 평균 85%+ (종류 5종 90%+, 세부 특징 80%+) | R | 없음 — 프로토타입 시기 별개 모델로 추정 |
| **FastAPI 활용으로 예상 개발 기간 30% 이상 감소** (12일 → 7일) | R | 없음 |
| **패션 대기업 2개 브랜드(E·M) POC 담당** — 기획·일정·기술 검증 | G | 없음 |
| **Node.js 레거시 → NestJS 마이그레이션** | G, R | 없음 |
| Nest.js 도입 개발 템플릿 제작 (2023.08~12) — JWT 인증/인가, ExceptionFilter, NestMiddleware Logger, MVC 흐름 | R, G | 없음 — **be-template의 원류일 가능성** |
| 외주 개발사 개발 일정 관리 | R | 없음 |
| SellerCanvas → **Gency로 리브랜딩** | G | 없음 — 현재 제품명 추적 |

`career.sellercanvas-product-system`은 "PM 메인 롤로 제품 시스템 기획·구축" 한 줄뿐이고 위 정량이 전부 빠져 있다.

---

## D. Memento AI

| 항목 | 출처 | registry 상태 |
| --- | --- | --- |
| Stripe **Hongkong API** 연동 다국가 결제, 구독·환불 통합 | G | `career.memento-payment`에 "Stripe 선결제"만 |
| **Notifly 알림톡 자동화 — 발송 실패 시 3회 자동 재시도** | G | 없음 |
| **Check 서비스 0→1 구축** (인턴 기간, 직원 일정 관리 어드민) — 기획·API·스키마·구현 전 과정 | G | 없음 |
| Feynman = 피부과 통합 관리 시스템 (강남 피부과 운영) | G | 프로젝트명 대응 문서 확인 필요 |

---

## E. 아이즈솔 / 학부 프로젝트

| 항목 | 출처 | registry 상태 |
| --- | --- | --- |
| **Yolo v5 실시간 안면인식 — 초당 30장 이상(256×256×3), 정확도 약 99.8%** | R, G | 없음 |
| 아이즈솔에서 **PM 역할** 수행 (일정·태스크 관리, 팀 커뮤니케이션 조율) | R | 없음 — wiki는 "Vision AI Engineer"로만 표기 |
| **C# 백엔드 개발** | R | 없음 |
| 데이터 파이프라인 구축, 영상 데이터 전처리 프로세스 정립 | R | 없음 |
| SQL 데이터 분석으로 서비스 개선 인사이트 도출 | R | 없음 |
| **Deep Scan 프로젝트** — 의류를 자체 하드웨어로 인식해 성분 분석, 서버 관리·데이터 운영 담당 | R | **리멤버에만 존재. 어느 wiki 문서에도 없다** |
| **EatUp** — 음식 인식 AI 영양 정보 제공, 데이터 수집·관리 + Detection 모델 개발, PM 역할 | R, RP | 없음 |
| **Kidsly** — 팀장 역할, 프론트 1명과 협업 | R, RP | `profile/career.md` 표에 제품명만 있고 claim 없음 |
| 졸업작품 — KNN 알고리즘 + face-recognition 패키지, AI 모델 활용·서버 구축·DB 제작 | RP | 없음 |
| Pokemon Go — Auto Encoder 이미지 생성 | RP | 없음 |

---

## F. TellingMe — **정합성 충돌 주의**

`evidence/projects/previous-career.md`에 이렇게 적혀 있다:

> **Unverified**: package와 endpoint 개수는 repo 재대조 전 사용하지 않는다.

그런데 그룹바이에는 이미 공개돼 있다:

| 항목 | 출처 |
| --- | --- |
| **38개 도메인 패키지, 42개 엔티티, 22개 컨트롤러, 89개 RESTful 엔드포인트** | G |
| 팀 10명 구성 (PO 1, 기획 1, 디자인 2, iOS 2, AOS 2, BE 2) 중 백엔드 주도 | G |
| **iOS 앱 정식 출시 완료** | G |
| OAuth2 카카오·애플 소셜 로그인, JWT Access/Refresh | G |
| 애플 정책 준수 — 탈퇴 시 authorizationCode 기반 토큰 만료 | G |
| 게임화 10개 이상 도메인, Streak 추적, Inventory 패턴 | G |
| Python 마이크로서비스 HTTP 연동 (Java-Python MSA) | G |
| Prometheus 메트릭, Logback **Slack Appender** 실시간 에러 전송 | G |
| GitHub Actions + AWS CodeDeploy, 환경별 리소스 분리 | G |

**둘 중 하나를 택해야 한다** — repo 재대조로 수치를 검증해 claim으로 승격하거나, 그룹바이에서 수치를 내리거나.

---

## 정리

- **registry 24건 중 MediSolve 기간 claim이 대부분**이고, 그 이전 4년치(아이즈솔·STUDIO LAB·Memento·TellingMe)는 서술이 한 줄 수준이다.
- 반면 플랫폼에는 그 4년치의 정량 성과가 상세히 남아 있다. **evidence 역흡수의 주 대상은 과거 경력이다.**
- 즉시 승격 후보 3순위:
  1. **한국건설환경시험연구원 AI 정확도 인증** — 제3자 검증, CES·특허 다음 급
  2. **SellerCanvas 제작시간 95% 단축 / 이미지 15장→무제한** — XYZ-lite에 바로 쓸 수 있는 전후 대비
  3. **A 피부과 어드민 30개 도메인 단독 구축** — 현재 진행 중인 최신 실적인데 registry에 없음
- 승격 전 확인 필요: 인증서 실물, SW 창업 경진대회 연도(2019.11 vs 2021.09), VGG↔Yolo v8 모델 시기 구분, TellingMe 수치 repo 재대조, 고객사 이니셜 공개 범위(C·V·D·A 피부과, E·M 브랜드).
