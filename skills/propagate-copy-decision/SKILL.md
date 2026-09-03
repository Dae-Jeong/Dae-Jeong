---
name: propagate-copy-decision
description: Apply one user decision about public application copy end to end — evidence, claim, rule row, gate data, then every active surface — and verify. Use when the user decides a wording, a disclosure boundary, a metric form, or a collaboration credit. Do not use for review-only requests.
---

# Propagate Copy Decision

입력은 **결정 한 문장**이다. 예: "Centurion은 내부 제품이야", "약 94%가 좋을 것 같아", "QA 팀원 한 분의 서포트를 받았어".

순서는 고정이고, **3·4번이 빠지면 완료가 아니다.** 규칙 갱신 없이 문안만 고치면 다음 회사에서 같은 실수가 난다 (래칫 계약, [design-v1 §3-4](../../wiki/backlog/agent-harness-operationalization/design-v1.md)).

## 절차

1. **evidence** — 해당 프로젝트 evidence 문서에 `User-confirmed (YYYY-MM-DD): …` 한 줄. 공개 문안에서 쓰지 않을 것(이름·직급·내부 수치)도 같이 적는다.
2. **claim** — `wiki/evidence/claims/*.yaml`의 `statement · allowed_copy · forbidden_copy`. 새 표현은 allowed_copy에, 버린 표현은 forbidden_copy에.
3. **규칙** — [application-copy-standard §1-6](../../wiki/rules/application-copy-standard.md)에 행 추가(규칙 + 고친 예). 모순되는 기존 행(§1-4 수치 표, §4 게이트 위반 예)을 같이 고친다. 공개 범위 결정이면 [public-safety](../../wiki/rules/public-safety.md)의 표도.
4. **게이트** — 문자열로 잡히면 [copy-gates.yaml](../../wiki/rules/copy-gates.yaml) `banned_terms`에 한 줄. 구조(문장 수·헤더·불변)면 validator 함수 하나와 §4 게이트 행 하나를 짝으로 추가한다. 잡을 수 없으면 "사람 검사"로 §4 행만 둔다.
5. **표면 전파** — [copy-surfaces.yaml](../../wiki/products/site/copy-surfaces.yaml)의 active 회사 파일 + 공통 표면 전부. 파일 단위로 나눠 병렬 agent에 맡겨도 되지만 같은 파일은 한 agent만. frozen 회사는 건드리지 않는다.
6. **verify** — `make verify`. 게이트 FAIL 수정은 2회까지. 넘으면 규칙이 모호하거나 사실이 부족한 것이니 "결정 필요"로 사용자에게 올린다.
7. **보고** — 바뀐 곳(파일·행), 규칙·게이트 변경, 남은 결정. verify 결과 한 줄을 포함한다.

## 금지

- 문안을 고치면서 사실을 새로 만들지 않는다. `allowed_copy` 밖 수치는 삭제가 기본이다.
- frozen 패키지(registry `artifact_state: frozen`)는 문안도 visibility도 소급 수정하지 않는다. 게이트 13이 막는다.
- 커밋·push·PDF 재생성은 사용자가 요청할 때만 한다.

## 자주 놓치는 표면

- `/resume` 공통 이력서는 `app/fe/app/resume/resume-view.tsx`에 한·영 문안이 직접 들어 있다. 두 언어 모두 고친다.
- `lib/cases.ts`의 대표 사례 tag·blurb는 여러 회사 포폴이 링크한다.
- 이력서 헤더 직함은 registry `header_role`이 owner다. 회사 행 직함(`Tech Lead · Backend Engineer`)과 헤더는 다른 규칙을 따른다.
