---
type: platform-snapshot
title: 그룹바이 프로필 스냅샷
description: groupby.kr 프로필 원문 수집 — 6개 플랫폼 중 가장 상세하며 wiki에 없는 실무 기록을 다수 보유.
platform: groupby
url: https://groupby.kr/scouts/my-profile
collected: 2026-08-08
tags: [platform, snapshot, groupby]
---

# 그룹바이 — 2026-08-08 수집

가장 최신이고 가장 상세하다. **wiki가 모르는 실무 기록이 여기에 가장 많다.** 개인 연락처·희망 연봉은 public-safety상 이 문서에 옮기지 않는다.

## 헤더

- 경력 표기: **2년** (실제 6년차 — 오표기)
- 직무: 백엔드
- 스킬: Java, Python, FastAPI, Spring, SpringBoot, Azure-DevOps, Github, Terraform, AWS, SqlAlchemy
- 학력: 우송대학교 학사 게임멀티미디어 2016–2021 **졸업** (표기 정상)
- 스카우트 프로필 점수 44점 / 상위 5% 노출
- 링크: `github.com/Dae-Jeong`, `daejeongkim.oopy.io` (옛 노션 포트폴리오)
- 프로필 공개 ON / "적극 구직 중"은 OFF ("구직은 아직 천천히 고민 중")

## 경력

### MediSolve AI · 테크 리드(백엔드) · **2025.02**–재직중

다른 플랫폼은 2025.04로 적고 있다. 더데이랩스 프리랜서 기간을 포함한 표기로 보인다 — 정합성 확인 필요.

스택: TypeScript, Python, NextJS, FastAPI, MySQL, PostgreSQL, Azure-DevOps, Docker

**주요 업무 및 성과 (원문)**

- [BE] C·V·D 피부과 홈페이지 운영 및 관리 — 운영/예약 관리 시스템 설계·구현, **MAU 1만 서비스 운영 3개월 중 긴급 이슈 발생 비율 0%**, **인프라 개선으로 월간 서버 비용 약 17% 감소**
- [BE] 피부과 재고 관리 백오피스 — **C·D·V 3개 브랜드 총 9개 지점 사용 중**
- [BE] google audio native 기술 도입 피부과 상담 에이전트 — C 피부과 PoC 진행 중

**Centurion 플랫폼 (2025.04~진행중)** — 3개 마이크로서비스(재고 BAY, 시술 RAY, 통합인증 SSO)

- BAY/RAY/SAY: Python 3.13, FastAPI, SQLAlchemy 2.0, MySQL / SSO: TypeScript, NestJS, Prisma, MySQL / 공통: RabbitMQ, Docker, Azure, GitHub Actions
1. 마이크로서비스 아키텍처 설계·구축 — 멀티테넌시 B2B 본사-지점 데이터 동기화·격리, Repository/Service 계층 분리, DI Container
2. **Celery → TaskIQ 마이그레이션** — RabbitMQ 전환으로 복잡도 감소, 알림톡 발송을 독립 도메인으로 분리, Docker 멀티스테이지로 api/taskiq 워커 이미지 분리
3. JWT 기반 멀티 서비스 SSO (NestJS + Prisma) — Access/Refresh, 토큰 버전 관리 무효화, Prisma 멀티 클라이언트 크로스 DB 트랜잭션
4. SSE 기반 시술 현황 실시간 푸시, RabbitMQ(aio-pika)로 RAY-BAY 재고 연동
5. 중앙집중식 Validation 시스템 — 분산 검증 로직을 Validator로 통합
6. 성능·안정성 — **Polars 도입으로 엑셀 파싱 고속화**, N+1 제거·eager loading, 동시성 제어(Race Condition 방지), Retry
7. Azure CI/CD — GitHub Actions + ACR, dev/stg/prod 환경별 자동 배포, Bastion SSH, 3개 서비스 독립 파이프라인

**A 피부과 어드민 시스템 (2025.10~진행중)** — Python 3.13, FastAPI, SQLAlchemy 2.0, MySQL, Docker, Nginx, Azure

1. Multi-Module Clean Architecture **백엔드 단독 구축** — **30개 도메인** API(예약·CMS·상품·고객 등), Homepage/Admin 독립 모듈 + Nginx 리버스 프록시 단일 엔드포인트, Router-Service-Repository-Model 4계층
2. Generic BaseRepository — SQLAlchemy 2.0 Generic 공통 CRUD 표준화, Multi-tenancy(BranchMixin)·Soft Delete 자동 필터링, **Closure Table 패턴**으로 Category/Procedure 계층 관리
3. **Connection Pool 최적화** — 타임아웃 분석 후 pool_size/max_overflow 조정, 미들웨어 실행 순서 개선·세션 생명주기 강화로 **500 에러 완전 해결**, pool_pre_ping
4. Azure CI/CD — Managed Identity 인증, Build cache + Rolling update 무중단 배포
5. 코드 품질 — 컨벤션 정립 후 전체 리팩토링, **Ruff + Pyright + pre-commit**, Swagger·API·DB 설계 가이드 문서화

### MementoAI · 백엔드 개발자 · 2024.10–2025.01

스택: Python, FastAPI, MySQL, AWS, SqlAlchemy

- [BE] Stripe 결제 기능 구현 (홍콩)
- [BE] Notifly 해피콜 서비스 설계·구현
- [BE/기획] Check 서비스 기획 및 회원 도메인 설계·구현

**Feynman (2024.11~2025.01, 정규직)** — 피부과 통합 관리 시스템(강남 피부과 운영)

1. Stripe 기반 국제 결제 — Stripe Hongkong API로 다국가 결제, 구독·환불 통합, 트랜잭션 상태 관리, 실제 운영 적용
2. Notifly 알림톡 자동화 — 트리거 기반 발송, **발송 실패 시 3회 자동 재시도**

**Check (2024.10~2024.11, 인턴)** — 병원 내부 직원 일정 관리 어드민, FastAPI+MySQL **0→1 구축**, 회원 도메인(이메일/비밀번호, JWT)

### 주식회사스튜디오랩 · AI 개발자, PM, 백엔드 개발자 · 2021.12–2024.01

스택: NestJS

- [PM] **CES 2024 AI 부문 최고 혁신상 수상**
- [PM] 특허 출원 — 「페이지 출력 방법」, **출원번호 10-2022-0130234**
- [BE] NestMiddleware·ExceptionFilter 예외 처리 로직 구축
- [AI] **Yolo v8** 의류 이미지 분석 모델 정확도 평균 **99% 이상**

**SellerCanvas (2021.12~2023.12)** — 직책 궤적 `AI 엔지니어 → PM → 백엔드 엔지니어`. **현재 Gency로 리브랜딩됨.**

1. CES 2024 수상 및 특허 출원
2. **패션 대기업 2개 브랜드(E·M) POC 담당** — 기획·일정 관리·기술 검증, 비즈니스 요구사항을 기술 스펙으로 변환, 고객 피드백 기반 개선(최대 이미지 15장 → 무제한)
3. Yolo v8 모델 — **한국건설환경시험연구원 AI 정확도 부문 인증 통과 (평균 99% 이상)**
4. **Node.js 레거시 → NestJS 마이그레이션** — PM 경험으로 문제점 파악·개선 방향 설계, 기술 부채 해소

### 주식회사 아이즈솔 · 개발팀 (인턴) · 2020.08–2021.06

스택: Python, FastAPI, Pytorch, Tensorflow

Kidsly — 유아 안면 인식 자동 출결. **Yolo v5 실시간 처리, 초당 30장 이상(256×256×3), 인식 정확도 약 99.8%**

## 관련 활동

**텔링미 (2024.01–2024.12)** — Java 11, Spring Boot 2.7.7, Spring Security, JPA / MySQL 8 / JWT·OAuth2(카카오·애플) / AWS EC2·S3·CodeDeploy / GitHub Actions, Prometheus, Actuator / Firebase FCM, Python 마이크로서비스

- 팀 10명 (PO 1, 기획 1, 디자인 2, iOS 2, AOS 2, BE 2) 중 **백엔드 개발 주도 및 인프라 관리**
- OAuth2 소셜 로그인 + JWT Access/Refresh, 애플 정책 준수(탈퇴 시 authorizationCode 토큰 만료), **iOS 정식 출시**
- 게임화 시스템 — 레벨·배지·미션·재화 등 10개 이상 도메인, Streak 추적, Inventory 패턴, Python 마이크로서비스 HTTP 연동
- DDD·레이어드 — **38개 도메인 패키지, 42개 엔티티, 22개 컨트롤러, 89개 RESTful 엔드포인트**
- GitHub Actions + CodeDeploy CI/CD, 환경별 AWS 리소스 분리
- FCM 푸시, Prometheus 메트릭, Logback Slack Appender 실시간 에러 전송

## 자기소개 (원문 요지)

"성장과 성공을 갈망하는 백엔드 개발자" / 해시태그 `#열정이_강한 #성장욕구_높은 #끊임없이_배우는`

1. "메이커가 고생해야 사용자가 편하다"는 철학
2. 테크 리드 및 AI 프로젝트 PM 경험으로 문제 해결에 기여
3. 문제 해결에 몰입하며 빠르게 실행 — "새벽이든 주말이든 서비스에 필요한 순간이라면 즉각 대응"

수상 이력 전체가 자기소개 본문에도 중복 나열돼 있다.

## 수상·자격

- **CES 2024 AI 부문 최고 혁신상** (2023.12) — "스튜디오랩 근무 당시 PM & BE 직무를 수행하며 기여한 서비스로 수상"
- 전국 SW 중심대학 공동 해커톤 우수상 (2021.02)
- SW 창업 아이디어 경진대회 개발·구현 부문 (2021.09), 아이디어 부문 2등 (2020.10)
- **학생 창업유망팀 300 모의 크라우드 펀딩 모집액 2.8억 달성 (568% 초과)** (2020.08)
- ADsP 데이터 분석 준전문가 (2021.09)
- 특허 「페이지 출력 방법」 출원 (2022.10)

## 관찰

- **경력을 "2년"으로 표기**한다. 6년차 서사와 정면 충돌하며, 스카우트 필터링에서 직접적 손해를 본다. 최우선 수정 대상.
- MediSolve 시작이 **2025.02**로, 다른 플랫폼(2025.04)과 다르다. 더데이랩스 프리랜서 기간 포함 여부를 정해야 한다.
- 고객사는 이니셜(C·V·D·A 피부과, E·M 브랜드)로 처리돼 있다 — public-safety 의식이 반영된 흔적.
- 특허를 **출원번호(10-2022-0130234)**로 적고 있다. wiki/웹 이력서는 **등록번호(10-2898273)** 기준이다. 등록이 더 강한 사실이므로 이쪽으로 통일해야 한다.
- **wiki에 없는 근거가 다수다**: MAU 1만·긴급 이슈 0%, 서버 비용 17% 감소, 9개 지점 사용, Celery→TaskIQ 마이그레이션, Polars 도입, Connection Pool 최적화로 500 에러 해결, 30개 도메인 단독 구축, 한국건설환경시험연구원 인증, Yolo v8 99%, 크라우드펀딩 568%, 텔링미 정량(38/42/22/89), SellerCanvas의 Gency 리브랜딩.
- 자기소개 3번 "새벽이든 주말이든 즉각 대응"은 헌신 서사다. 최근 채용 시장에서는 번아웃·경계 부재 신호로 읽힐 수 있어 재검토 여지가 있다.
