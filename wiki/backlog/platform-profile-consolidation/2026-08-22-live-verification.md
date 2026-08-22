---
type: audit
title: 플랫폼 프로필 Live 적용 검증
description: 2026-08-22~23 로그인 편집 화면에서 채용 플랫폼 5곳에 확정 문안을 반영하고 저장 후 reload로 검증한 결과.
timestamp: 2026-08-23
derived_from:
  - backlog/platform-profile-consolidation/2026-08-22-platform-paste-package.md
  - app/fe/app/resume/resume-view.tsx
supersedes:
  - backlog/platform-profile-consolidation/2026-08-13-sync-matrix.md
tags: [platform, sync, live, verification, audit]
---

# 플랫폼 프로필 Live 적용 검증 — 2026-08-23

이 문서는 이번 브라우저 작업이 끝난 시점의 **실제 적용 상태**를 소유한다. 소개·경력 문안의 원본은
[Platform Profile Paste Package — Maker v1](2026-08-22-platform-paste-package.md), 사실과 표현 강도는
`profile/`과 `evidence/claims/`가 계속 소유한다.

## 0. 실행 범위

- **적용·reload 검증 완료**: Wanted · LinkedIn · Remember · Groupby · RocketPunch
- **대상 제외**: Saramin — 사용하지 않기로 확정해 동기화 대상에서 제외했고 쓰기 0건이다.
- **Pending**: Oopy — 다른 플랫폼의 레거시 링크 교체와 공개 종료 판단이 남아 있다.
- 구직 의향·프로필 공개·희망 조건 같은 설정은 문안 동기화와 분리했으며, 이번 작업에서 임의로 바꾸지 않았다.

## 1. 검증 방법

1. 로그인한 편집 화면에서 기존 값을 읽고 최신 붙여넣기 패키지의 플랫폼별 target과 대조했다.
2. 사실 오류를 먼저 제거한 뒤 소개·경력·skill 등 해당 플랫폼에서 안전하게 편집 가능한 필드만 수정했다.
3. 저장 후 페이지를 reload하고 값이 유지되는지 다시 확인했다.
4. 플랫폼이 자동 생성하는 문장이나 안전한 추가 UI가 없는 항목은 억지로 우회하지 않고 잔여값으로 기록했다.

이 검증은 **로그인 편집 화면의 저장값과 reload 결과**를 기준으로 한다. 별도 비로그인 세션에서의 공개 화면 전수 검증은
이번 실행 범위에 포함하지 않았다.

## 2. 플랫폼 요약

| 플랫폼 | 편집 | reload | 반영 범위 | 보존한 값·설정 | 잔여·결과 |
| --- | --- | --- | --- | --- | --- |
| Wanted | 완료 | 통과 | 소개, 직무·직책, 기존 4개 경력, AX, skill, 학교명, 링크 | 기존 인증 경력 구조 | 더데이랩스 별도 row와 credentials는 안전한 추가 UI가 없어 미적용 |
| Remember | 완료 | 통과 | 소개 2개 탭, 경력 5건, backend 직무, skill 15개 | 공개 설정과 기존 활동 | 적용 완료 |
| Groupby | 완료 | 통과 | 소개, 경력 5건, skill 15개, TellingMe | 프로필 공개, 적극 구직, 희망 조건 | 적용 완료 |
| RocketPunch | 완료 | 통과 | 소개, 경력 5건, STUDIO LAB 종료월, 사실 오류·금지 문구 정리 | 구직 의향과 portfolio 링크 | 자동 생성 AI 커리어 요약·HTML title은 구형 표현 잔존, 수동 UI 없음 |
| LinkedIn | 완료 | 통과 | headline, About, 대표 보유기술, 웹사이트, 경력 6개 entry | 공개 구직 설정 | Featured는 `marinkim.xyz` 링크 검증 실패로 미등록. 상단 웹사이트 버튼은 정상 노출 |
| Saramin | 쓰기 0건 | 해당 없음 | 사용자 결정으로 동기화 대상 제외 | 기존 값 전체 | 추가 작업 없음 |

## 3. 필드별 검증

문안 전문을 여기 복제하지 않고 붙여넣기 패키지의 절 번호를 target으로 사용한다.

### 3.1 Wanted

| Field | Target | Live 결과 | Reload | Note |
| --- | --- | --- | --- | --- |
| 간단 소개 | §1.3 | Maker 문장으로 시작하는 최신 소개 반영 | 통과 |  |
| 현재 직무·직책 | §0, §3.1 | 검색 직무 `백엔드 개발자`·직책 `Tech Lead` 반영 | 통과 | MediSolve 경력 본문에서 Backend Engineer 수행 범위를 함께 설명 |
| MediSolve AI | §2.1 | 최신 전체형 경력 반영 | 통과 |  |
| Memento AI | §2.4 | 결제 상태 흐름·Happy Call 기준 반영 | 통과 | Hongkong·구독·3회 재시도 표현 제거 |
| STUDIO LAB | §2.5 | Product Manager 중심 0→1·특허·CES 문안 반영 | 통과 |  |
| 아이즈솔 | §2.6 | Vision AI 인턴 범위로 정정 | 통과 | C#·FastAPI 단독 구축 표현 없음 |
| AX·skill·학력·링크 | §3.1, §4 | 안전하게 편집 가능한 필드 반영 | 통과 | 학교명 오타와 C# skill 정리 |
| 더데이랩스 | §2.3 | 미적용 | 해당 없음 | 별도 경력 row 추가 UI가 안전하지 않음 |
| credentials | §4 | 미적용 | 해당 없음 | 항목 추가 UI가 안전하지 않음 |

### 3.2 Remember

| Field | Target | Live 결과 | Reload | Note |
| --- | --- | --- | --- | --- |
| 커넥트용 소개 | §1.3.1 | 고객 문제와 직접 구현을 중심으로 한 소개 반영 | 통과 | 218자 |
| 채용 서비스용 소개 | §1.3.2 | 현재 역할과 기술 범위를 중심으로 한 소개 반영 | 통과 | 285자, 두 탭을 각각 저장·확인 |
| 경력 5건 | §2.1–§2.6 | MediSolve AI·더데이랩스·Memento AI·STUDIO LAB·아이즈솔 최신화 | 통과 | C#과 구버전 수치·표현 제거 |
| 희망 직무 | §3.3 | backend 직무만 유지 | 통과 | PM·PO 역량은 소개와 경력에서 보조 신호로 사용 |
| skill | §3.3 | 15개 기준 반영 | 통과 |  |
| 공개·활동 | — | 기존 값 보존 | 확인 | 공개 범위와 기존 외부 활동을 임의 변경하지 않음 |

### 3.3 Groupby

| Field | Target | Live 결과 | Reload | Note |
| --- | --- | --- | --- | --- |
| 자기소개 | §1.3.3, §3.4 | Maker 소개와 검증 자산 묶음 반영 | 통과 |  |
| 경력 5건 | §2.1–§2.6 | 전 경력 최신화 | 통과 | 고객사 실명·검증되지 않은 정량·과장 표현 제거 |
| skill | §3.4 | 15개 기준 반영 | 통과 | Python·FastAPI와 실무 소유 기술 우선 |
| TellingMe | §0.1 | 개인 프로젝트로 축약 정리 | 통과 | 경력으로 확대하지 않음 |
| 공개·구직·희망 조건 | — | 기존 값 보존 | 확인 | profile public·actively seeking·희망 조건을 바꾸지 않음 |

### 3.4 RocketPunch

| Field | Target | Live 결과 | Reload | Note |
| --- | --- | --- | --- | --- |
| 소개 | §1.2 | 300자 제한용 최신 소개 반영 | 통과 |  |
| 경력 5건 | §2.1–§2.6 | 전 경력 최신화 | 통과 |  |
| STUDIO LAB 종료 | §0.1 | `2024.01`로 정정 | 통과 |  |
| 금지·사실 오류 | §7 | 36시간·5xx·4,039건·Hongkong·3회 재시도·C# 제거 | 통과 |  |
| 구직 의향·portfolio | — | 기존 값 보존 | 확인 | 설정 변경 없음 |
| AI 커리어 요약·HTML title | 플랫폼 자동 생성 | 구형 표현 잔존 | 해당 없음 | `기업부설연구소장` 등 수동 수정 UI가 없음. 본문 소개·경력과 구분 |

### 3.5 LinkedIn

| Field | Target | Live 결과 | Reload | Note |
| --- | --- | --- | --- | --- |
| headline | §1.1, §3.2 | `Tech Lead · Backend Engineer` 역할과 Maker 문장을 함께 반영 | 통과 | 공식 경력 title은 `Backend Engineer`로 분리 |
| About | §1.4 | 고객 문제·직접 구현·제품 운영을 중심으로 한 KO 소개 반영 | 통과 | `기업부설연구소장`·36시간·5xx 구문 없음 |
| 대표 보유기술 | §3.2 | FastAPI·backend·architecture·LLM·제품관리 5개로 재구성 | 통과 | Python은 headline에서 유지 |
| 웹사이트 | §4 | `Resume · Portfolio` → `https://marinkim.xyz`로 교체 | 통과 | Oopy 링크 제거 |
| MediSolve AI | §2.1 | title `Backend Engineer`, Tech Lead 역할·제품 운영·대표 기술 성과 반영 | 통과 | 매출은 제품·팀 outcome으로 분리. Azure·Terraform은 제품 실행 기반으로 축약하고 6-state change gate 상세는 resume·portfolio에 유지 |
| 더데이랩스 | §2.3 | 법인명·프리랜서 기간·법인 설립 전 선행 개발 경로 반영 | 통과 | 고용 연속·법인 전환으로 표현하지 않음 |
| Memento AI 정규직·인턴 | §2.4 | Stripe manual capture·Happy Call 범위로 완전 교체 | 통과 | Hongkong·다국가·3회 재시도·구형 인턴 설명 제거 |
| STUDIO LAB·아이즈솔 | §2.5–§2.6 | 종료월·역할·0→1/특허/CES·Vision AI 범위 정정 | 통과 | C# 없음 |
| Featured | §3.2 | 미등록 | 해당 없음 | LinkedIn이 홈·portfolio·case URL을 모두 `올바른 링크`가 아니라고 거부. 상단 웹사이트 링크로 대체 |

### 3.6 Saramin — 대상 제외

사용자가 사용하지 않기로 확정했다. 로그인·편집·쓰기 없이 기존 상태를 그대로 두며 이후 sync 대상에도 포함하지 않는다.

## 4. 보존한 설정

- Remember의 공개 설정과 기존 외부 활동
- Groupby의 profile public·actively seeking·희망 조건
- RocketPunch의 구직 의향과 portfolio 링크
- Saramin의 기존 값
- LinkedIn의 공개 구직 설정

## 5. 남은 차이

1. LinkedIn 영어 secondary profile은 영문 resume의 `allowed_copy_en` 검수가 끝난 뒤에만 선택적으로 반영한다.
2. Oopy 유입 링크를 marinkim.xyz로 교체하고 공개 종료 여부를 결정한다.
3. Wanted의 더데이랩스 row·credentials는 안전한 추가 경로가 확인될 때만 반영한다.
4. RocketPunch 자동 생성 AI 커리어 요약·HTML title은 플랫폼의 재생성 또는 수정 경로가 생길 때 다시 확인한다.
5. LinkedIn Featured는 도메인 링크 검증이 정상화되기 전까지 상단 웹사이트 버튼으로 대체한다.

## 6. 결론

현재 사용하는 5개 채용 플랫폼인 Wanted·LinkedIn·Remember·Groupby·RocketPunch는 최신 문안을 저장하고 reload 검증을 마쳤다.
Saramin은 대상에서 제외했고, Oopy 정리와 플랫폼 UI 잔여값이 남아 있어 `wip` 상태를 유지한다.
