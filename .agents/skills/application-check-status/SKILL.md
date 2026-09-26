---
name: application-check-status
description: Report Kim Daejeong's registered job application history and current progress, highlighting pre-apply postings within three calendar days of their deadline. Use for "지원 현황 알려줘", "지금까지 어디 지원했지?", "마감 임박인 곳 있어?", or "현황 알려줘" in a job-application context.
---

# Application Check Status

지원 현황은 [application-registry.yaml](../../../wiki/products/resume/application-registry.yaml),
상태와 마감 판정은 [Application Lifecycle](../../../wiki/products/resume/application-lifecycle.md#deadline-and-status-report)가 소유한다.
canonical 원장에서 읽으며 현재 대화·과거 보고서·PDF 존재만으로 제출 상태를 추정하지 않는다.

## 조회

1. lifecycle의 `Compact Status`와 `Deadline And Status Report`를 읽고 repo root에서 실행한다.

   ```bash
   uv run --project tools python .agents/skills/application-check-status/scripts/report_status.py
   ```

2. 지원 전 공고의 `deadline.source_url`을 읽기 전용 web/browser로 확인한다. 이미 같은 날 확인한 출처는 재사용할 수 있다. URL이 없으면 `source_path`가 가리키는 local README·인접 `jd.md`에서 찾는다. local 파일이 없는 portable checkout에서도 registry만으로 현황을 보고한다.
3. 새 마감 정보를 읽었으면 script의 `--deadline-overrides`에 `{attempt_id: deadline_object}` JSON을 전달해 다시 계산한다. 이 옵션은 이번 응답에만 적용되며 파일을 쓰지 않는다. 접근 실패 시 기존 값과 그 확인일로 계산하고, 답변에 `기록 기준 · 최신 확인 불가`를 짧게 붙인다. 오류/로그인 화면을 공고 종료로 판단하지 않는다.
4. 계산 결과를 한국어로 보고한다. `work_session.complete`나 `artifact_state.approved`는 문서 준비 상태이며 지원 완료가 아니다.

## 응답

- 기준 날짜(한국 시간)와 상태별 건수를 먼저 쓴다. 전체는 `등록 N건`으로 표현하고 지원 전 항목을 제출 건수에 넣지 않는다.
- `imminent: true`인 항목을 맨 위에 `마감 임박 · D-3/D-2/D-1/D-day`로 강조하고 마감일·공고 링크를 붙인다. 없으면 `확인된 마감 임박 공고 없음`이라고 한다.
- 기본 표는 `회사·직무 | 지원 상태 | 진행 내용 | 마감`으로 짧게 구성한다. 지원 전·진행중을 먼저, 종료 결과는 회사명과 상태로 압축한다. 같은 회사의 다른 attempt는 직무·지원 경로로 구분한다.
- 마감이 지난 지원 전 공고는 `마감 지남`, 상시채용은 `상시채용`, 날짜를 명시하지 않은 공고는 `마감일 미표시`, 확인할 자료가 없으면 `마감일 미확인`으로 표시한다. 날짜만 아는 당일 공고는 마감 시각을 만들어 붙이지 않는다.
- 지원 현황 원장 링크와 공고 확인일을 제공한다. 사용자가 임박 항목만 요청하면 그 범위로 줄인다.

조회 요청은 보고로 끝낸다. 원장 갱신·지원서 제출·이메일 전송·예약 알림은 별도 요청이 있을 때 수행한다.
