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

- 회사 slug 목록. 생략하면 registry의 active 회사(`pre-apply · in-progress · approved`, frozen 아님)를 쓴다.
- 검토 표면은 [copy-surfaces.yaml](../../wiki/products/site/copy-surfaces.yaml)이 정한다. 회사별 파일 + 공통 표면(`documents/common.ts`, `resume-view.tsx`, `lib/cases.ts`).

## 절차

1. **센서 먼저.** `make verify`를 돌린다. 게이트 11·12·13·14·16은 사람이 읽기 전에 기계가 끝낸다. FAIL 항목은 목록의 "반드시 수정"에 그대로 옮긴다.
2. **정독.** §1-6 표의 각 행과 §4 게이트 표를 lens로 삼아 모든 사용자 노출 문자열을 읽는다. 특히 센서가 못 잡는 것: 결과 문장의 지시 대상, 문서 방어 문장, 같은 사실의 다른 표현, 긴 문장(2문장 초과 bullet, 60자 초과 제목), 번역투.
3. **분할.** 회사 세트(이력서·경력기술서·포폴)마다 agent 하나, 공통 표면은 별도 agent. 같은 파일을 두 agent가 읽어도 되지만, 고치는 단계에서는 한 agent만 만진다.
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

- `make verify` 결과가 보고 첫 줄에 있다.
- 결정 필요 항목은 사용자에게 올리고 멈춘다. 결정 없이 propagate로 넘어가지 않는다.
