---
name: review-application-copy
description: Review the public application copy (tailored resume, career description, portfolio, and common surfaces) of active companies against the copy standard and report findings by severity without editing files. Use when the user asks to check, audit, or list what needs fixing in application documents. Do not use for writing or propagating changes.
---

# Review Application Copy

전수 검토는 **파일을 고치지 않는다.** 출력은 심각도별 목록과 "결정 필요" 항목이다. 고치는 일은 [propagate-copy-decision](../propagate-copy-decision/SKILL.md)이 한다.

기준은 이 skill 안에 복제하지 않는다. 아래 두 문서가 소유한다.

- [Application Copy Standard](../../wiki/rules/application-copy-standard.md) — §1-6 표현 고정 표, §4 제출 전 게이트
- [Public Safety](../../wiki/rules/public-safety.md) — 내부 제품명·고객사·provider 마스킹

## 입력

- **요청된 범위가 우선이다.** 회사 slug·문서·revision이 지정되면 그 범위만 검토한다. 전체 회사 검토는 사용자가 그렇게 요청했을 때만 수행하며, skill의 기본 동작으로 확대하지 않는다.
- 범위 지정이 없어도 현재 대화나 기존 task로 대상이 확정되면 그대로 진행한다. 그렇게도 좁혀지지 않는 **진짜 모호한 경우에만** registry의 active 회사(`pre-apply · in-progress · approved`, frozen 아님)를 후보로 제시하고 확인을 받는다. 이미 승인된 범위를 재승인 요구로 되묻지 않는다.
- 검토 대상이 Markdown draft만일 수 있다. `MD만` 요청이면 `content-draft.md`·`claim-map.yaml`을 읽고 판정하며, app 표면·렌더·PDF를 검토 대상이나 완료 조건으로 삼지 않는다. **MD는 앱보다 앞선 사용자 검토본이므로 앱과 불일치하는 것이 정상 상태다** ([content-contract](../../wiki/products/resume/content-contract.md): 편집 정본은 content-draft, 앱 JSON은 승인된 범위의 파생본). 불일치를 위반으로 보고하지 않는다.
- app 표면까지 포함할 때의 대상은 [copy-surfaces.yaml](../../wiki/products/site/copy-surfaces.yaml)과 [content-contract](../../wiki/products/resume/content-contract.md)가 정한다. 경로를 이 skill에 복제하지 않는다.

## 네 가지 검수를 분리한다

한 검사가 다른 검사를 대신하지 않는다. 보고에서도 섞지 않는다.

| 검수 | 무엇을 보는가 | 자동화 |
| --- | --- | --- |
| 사실 검수 | claim `allowed_copy`·기여 강도·관측 범위·운영/실험 경계를 문장이 지키는가 | 부분 (claim 존재·형식만) |
| 표현 검수 | 독자가 기여·변화를 이해하는가, 밀도·나열·번역투가 경험을 가리는가 | 불가 (사람 검사) |
| JD 적합성 | 이 문장이 지원 역할에서 맡길 일과 연결되는가 | 불가 |
| 반영 검수 | 합의한 문장이 지정 대상(MD-only면 draft 본문, 앱 동기화 요청이면 화면까지)에 들어갔는가 | 부분 (앱 동기화 범위에서만 빌더 `--check`) |

**자동 검사 PASS는 사실·표현 적합성의 근거가 아니다.** validator·tsc·route 200은 형식과 링크가 깨지지 않았다는 뜻이며, 의미가 맞는지는 판정하지 않는다.

## 절차

1. **센서 먼저.** 이번 범위에 해당하는 검사만 돌린다. MD-only 범위는 claim ID 유효성·문서 링크·읽기본 대조로 닫는다. 빌더 `--check`와 route·빌드 검사는 **앱 동기화를 요청받았을 때만** 돌린다. 자동 검사 항목은 문안 기준 §4의 현재 게이트 표를 따른다. FAIL 항목은 목록의 "반드시 수정"에 그대로 옮기되, PASS를 통과 근거로 쓰지 않는다.
2. **정독.** §1-6 표의 각 행과 §4 게이트 표를 lens로 삼아 모든 사용자 노출 문자열을 읽는다. 특히 센서가 못 잡는 것: 결과 문장의 지시 대상, 문서 방어 문장, 같은 사실의 다른 표현, 긴 문장(2문장 초과 bullet, 60자 초과 제목), 번역투.
3. **분할.** 범위가 여러 회사로 넓고 동시 실행이 가능할 때만 나눈다. 분할 자체가 목적이 아니며, 새 agent·Run을 자동으로 만들지 않는다. 같은 파일을 여럿이 읽어도 되지만 고치는 단계에서는 한 명만 만진다.
4. **일관성.** 같은 사실이 이력서·경력기술서·포폴·공통에서 같은 형태인지 대조한다 (수치 표기, 역할 표기, 하네스 표현, 화면 표현).

## 보고 형식

```text
## 반드시 수정 (규칙 위반)
1. file:line — "인용" — 문제 — → 제안 문장

## 검토 권장 (통일·가독성)
...

## 결정 필요
- 무엇을 / 선택지 / 권장

## 통과
- 확인한 lens 중 위반 0인 것
```

- 항목마다 `file:line`과 인용을 붙인다. 근거 없는 지적은 쓰지 않는다.
- 제안 문장은 claim `allowed_copy` 안에서만 쓴다. 수치가 불확실하면 "삭제"를 제안한다.
- 규칙 문서 자체가 오늘의 결정과 모순되면 그것도 "반드시 수정"에 올린다 (2026-09-03 §1-4 사례).

## 완료 조건

- 이번 범위에서 실제로 돌린 검사와 그 결과가 보고 첫 줄에 있다. 돌리지 않은 검사를 통과로 적지 않는다.
- 사실·표현·JD·반영 네 검수의 판정을 각각 남긴다. 자동 검사 PASS만으로 나머지를 통과 처리하지 않는다.
- 결정 필요 항목은 근거·선택지·권고로 사용자에게 올리고 **그 결정에 의존하는 부분만** 보류한다. 이미 합의된 항목의 검토와 독립적으로 진행 가능한 확인은 계속한다. 결정 없이 해당 문안을 propagate로 넘기지 않는다.
