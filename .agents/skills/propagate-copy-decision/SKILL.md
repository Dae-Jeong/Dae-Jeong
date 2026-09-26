---
name: propagate-copy-decision
description: Apply one user decision about public application copy end to end — evidence, claim, then the rule row and gate when the error repeats, and the surfaces within the approved scope — and verify that scope. Use when the user decides a wording, a disclosure boundary, a metric form, or a collaboration credit. Do not use for review-only requests.
---

# Propagate Copy Decision

입력은 **결정 한 문장**이다. 예: "Centurion은 내부 제품이야", "약 94%가 좋을 것 같아", "QA 팀원 한 분의 서포트를 받았어".

## 먼저 입력을 구분한다

| 입력 | 수행 범위 |
| --- | --- |
| **경험 사실의 추가·교정** | 1·2번(Wiki 단계)을 먼저 끝낸다. 그 사실을 인용한 JD 평가·case·경험 지도까지 영향을 찾아 목록으로 남긴다. 문안 수정은 그 뒤다 |
| **반복 편집 오류** (같은 실수가 여러 문서에서 재발) | 3·4번으로 규칙·게이트를 세워 재발을 막는다 |
| **1회성 표현·구조 편집** | 해당 문안만 고친다. 사실 하나가 바뀔 때마다 새 전역 문체 규칙을 만들지 않는다 |

3·4번은 **반복 오류를 막을 때** 수행한다. 규칙 갱신 없이 문안만 고치면 다음 회사에서 같은 실수가 나는 경우가 그 대상이다 (래칫 계약, [design-v1 §3-4](../../../wiki/backlog/agent-harness-operationalization/design-v1.md)). 반대로 개별 사실 하나를 규칙 행으로 승격하면 규칙이 사례 목록으로 비대해진다.

## 절차

1. **evidence** — 해당 프로젝트 evidence 문서에 `User-confirmed (YYYY-MM-DD): …` 한 줄. 공개 문안에서 쓰지 않을 것(이름·직급·내부 수치)도 같이 적는다.
2. **claim** — `wiki/evidence/claims/*.yaml`의 `statement · allowed_copy · forbidden_copy`. 새 표현은 allowed_copy에, 버린 표현은 forbidden_copy에.
3. **규칙** — [application-copy-standard §1-6](../../../wiki/rules/application-copy-standard.md)에 행 추가(규칙 + 고친 예). 모순되는 기존 행(§1-4 수치 표, §4 게이트 위반 예)을 같이 고친다. 공개 범위 결정이면 [public-safety](../../../wiki/rules/public-safety.md)의 표도.
4. **게이트** — 문자열로 잡히면 [copy-gates.yaml](../../../wiki/rules/copy-gates.yaml) `banned_terms`에 한 줄. 구조(문장 수·헤더·불변)면 validator 함수 하나와 §4 게이트 행 하나를 짝으로 추가한다. 잡을 수 없으면 "사람 검사"로 §4 행만 둔다.
5. **표면 전파** — **범위는 사용자·관리자가 지정한 것을 따른다.** 지정이 없어도 현재 대화나 기존 task로 확정되면 진행하고, 그렇게도 좁혀지지 않을 때만 [copy-surfaces.yaml](../../../wiki/products/site/copy-surfaces.yaml)의 active 회사 파일과 공통 표면을 후보로 제시해 확인을 받는다. 이미 승인된 범위는 다시 묻지 않는다. `wiki만`·`MD만`·특정 회사처럼 범위가 좁혀져 있으면 그 범위에서 끝내고, 남은 파생 수정은 적용하지 말고 목록으로 보고한다. frozen 회사와 보호 대상(career description 등)은 건드리지 않는다. 파일 단위로 나눠도 같은 파일은 한 명만 고친다.
6. **verify** — 이번 변경 범위에 해당하는 검사만 돌린다. wiki·MD만 고쳤으면 app 빌드·route 검사를 완료 조건으로 삼지 않는다. 게이트 FAIL 수정은 2회까지. 넘으면 규칙이 모호하거나 사실이 부족한 것이니 "결정 필요"로 사용자에게 올린다.
7. **보고** — 바뀐 곳(파일·행), 규칙·게이트 변경, 남은 결정. verify 결과 한 줄을 포함한다.

## 금지

- 문안을 고치면서 사실을 새로 만들지 않는다. `allowed_copy` 밖 수치는 삭제가 기본이다.
- frozen 패키지(registry `artifact_state: frozen`)는 문안도 visibility도 소급 수정하지 않는다. 게이트 13이 막는다.
- 커밋·push·PDF 재생성은 사용자가 요청할 때만 한다.

## 자주 놓치는 표면

아래는 **승인된 범위가 그 표면을 포함할 때** 확인할 목록이다. 범위 밖이면 고치지 말고 남은 파생 수정으로 보고한다. 현행 경로와 owner는 [content-contract](../../../wiki/products/resume/content-contract.md)와 [copy-surfaces.yaml](../../../wiki/products/site/copy-surfaces.yaml)이 소유하므로 경로를 여기에 복제하지 않고 그 문서를 읽어 확인한다.

- 공통 표면(`/resume` 등)은 회사별 문안과 owner가 다르다. 한 회사의 결정이 공통 표면 변경을 자동으로 뜻하지 않는다.
- 여러 회사가 함께 링크하는 대표 사례 목록은 한 곳을 고치면 여러 문서에 영향이 간다. 영향 범위를 먼저 확인한다.
- 이력서 헤더 직함은 registry `header_role`이 owner다. 회사 행 직함(`Tech Lead · Backend Engineer`)과 헤더는 다른 규칙을 따른다.
