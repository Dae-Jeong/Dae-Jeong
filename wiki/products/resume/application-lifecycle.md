---
type: contract
title: Tailored Application Lifecycle
description: 회사별 맞춤 지원의 compact status, package checkpoint, 제출 Snapshot 규칙.
status: active
timestamp: 2026-09-01
canonical: true
tags: [resume, tailored, application, lifecycle]
---

# Tailored Application Lifecycle

현재 지원 attempt의 상태·artifact metadata는 tracked
[application-registry.yaml](application-registry.yaml)이 단독으로 소유한다. local-only
`tailored/{company}/{attempt}/README.md`는 공고·문안·제출 표면의 provenance를 제공하는
consumer이며 registry의 상태를 새 canonical 값으로 만들지 않는다.

## Compact Status

| Status | 화면 표시 | 의미 |
| --- | --- | --- |
| `pre-apply` | 지원 전 | 지원하기로 정한 뒤 공고·근거를 검토하고 지원본을 준비한다. |
| `in-progress` | 진행중 | 제출 이후 기업 검토·면접·처우 협상이 진행된다. |
| `accepted` | 합격 | 최종 오퍼를 수락해 지원이 완료됐다. |
| `declined` | 거절 | 오퍼 또는 후속 제안을 사용자가 받지 않기로 했다. |
| `rejected` | 탈락 | 회사 결정이나 채용 종료로 전형이 더 진행되지 않는다. |
| `unknown` | 상태 미확인 | 확인된 상태가 없어 값을 추정하지 않는다. |

`pre-apply`와 `in-progress`만 현재 진행 대상이다. `accepted`, `declined`,
`rejected`는 종료 결과이고 새 지원 문안의 active source로 사용하지 않는다.
`unknown`은 별도 lifecycle 단계가 아니라 확인 전 sentinel이다.

세부 진행 위치는 enum을 늘리지 않고 `tracking` 자유 문구로 기록한다. 예를 들어
`문안 검토 중`, `기업 검토 중`, `1차 면접 예정`, `처우 협상 중`을 쓴다. 확인되지 않은
tracking은 문구로 채우지 않고 `null`로 둔다.

## Artifact Package And Checkpoint

회사별 package는 네 artifact key를 사용한다.

| Key | 문서 | 기본 선택 |
| --- | --- | --- |
| `resume` | 이력서 | 회사별 기본 포함 |
| `career-description` | 경력기술서 | 회사별 기본 포함 |
| `portfolio` | 포트폴리오 | 회사별 기본 포함 |
| `cv` | CV | 선택 |

각 artifact의 `mode`는 `common | tailored | omitted` 중 하나다. `common`은 Common 문서를
그대로 쓰고, `tailored`는 해당 attempt의 문안을 만들며, `omitted`는 의도적으로 제출
package에서 제외한다. `omitted`는 누락이나 오류가 아니며 route를 갖지 않는다. 과거
지원본에서 artifact 존재 여부를 확인하지 못하면 `artifacts` entry 자체를 만들지 않는다.

| Artifact state | 의미 |
| --- | --- |
| `mutable` | 승인 전 문안이며 `content-draft.md`를 수정할 수 있다. |
| `approved` | 제출 전 승인본이다. 변경하면 다시 승인이 필요하다. |
| `frozen` | 제출 당시 파일·URL·revision 조합을 보존하며 덮어쓸 수 없다. |
| `unknown` | 제출·승인 여부를 확인하지 않아 artifact state를 추정하지 않는다. |

- status와 `artifact_state`는 서로 다른 축이다.
- coherent review checkpoint가 되었을 때만 `Package rN`을 발급한다. 문안의 모든 수정이
  revision은 아니다.
- content 변경 없이 특정 문서 UI만 바뀌면 `artifact_revisions.{artifact}`만 올린다.
- legacy attempt의 revision을 `0` 또는 추정값으로 채우지 않는다. `null`로 보존한다.

## Work Session Summary

JYP·피처링처럼 별도 대화나 agent 작업으로 진행되는 지원본은 registry의 optional
`work_session`에 현재 작업 범위만 요약한다. 이는 application status나 실제 실행 중인
process의 생존 여부가 아니라, 다른 세션이 이어받을 수 있는 portable handoff다.

| State | 의미 |
| --- | --- |
| `active` | 현재 범위의 작성·동기화 작업을 진행한다. |
| `waiting-review` | 산출물은 있으나 사용자 또는 상호 검토가 필요하다. |
| `paused` | 다음 행동은 정해졌지만 작업을 잠시 멈췄다. |
| `complete` | 기록한 scope의 완료 조건을 충족했다. application 제출 완료와는 별개다. |
| `unknown` | 기존 작업 세션의 현재 상태를 확인하지 못했다. |

`scope`, `last_synced`, `next_action`만 기록한다. provider 이름, raw session ID, private
conversation은 저장하지 않는다. 세션에서 문안을 수정했다면 `content-draft.md`를 먼저
동기화하고 typed content·local route를 같은 내용으로 맞춘 뒤 `last_synced`를 갱신한다.

## Submission Snapshot

제출하면 local attempt 아래 `submissions/sN/manifest.yaml`에 Snapshot을 만든다.
`Snapshot S{n}`은 당시 `Package rN`, artifact별 UI revision,
실제 제출 artifact reference와 URL의 immutable 조합이다.

1. 제출 직전 registry의 status를 `in-progress`, artifact state를 `frozen`으로 바꾼다.
2. `submissions/sN/manifest.yaml`에 `id`, verification, capture/submission date,
   `artifact_revisions`, `artifact_refs`를 기록한다. 실제 제출하지 않은 문서는 refs에 넣지
   않고 확인되지 않은 값은 `null` 또는 `unknown`으로 둔다.
3. Snapshot과 그 아래 artifact는 수정·덮어쓰기·재생성하지 않는다.
4. 추가 제출은 새 `sN` Snapshot으로 기록한다. 같은 회사의 재지원은 새 날짜 attempt
   폴더와 새 registry record를 만든다.
5. legacy artifact 또는 route가 실제 제출본인지 불확실하면 Snapshot으로 승격하지 않는다.
   `frozen` 보호 상태는 유지하고 artifact reference·revision은 `unknown` 또는 `null`로 둔다.

## Local Attempt Contract

한 local 날짜 폴더는 회사 × 채용공고 × 지원 플랫폼의 한 application attempt다.
`content-draft.md`는 승인 전 문안 owner이며 typed content·local route는 그 문안의
동기화 대상이다. local README의 상태 설명이 registry와 다르면
[application-registry.yaml](application-registry.yaml)을 우선한다.

새 attempt는 [tailored template](tailored/_template/README.md)에서 시작한다. legacy
`package/`, `preview/`, `source/`는 이동·삭제하거나 실제 제출 artifact로 추정하지 않는다.
