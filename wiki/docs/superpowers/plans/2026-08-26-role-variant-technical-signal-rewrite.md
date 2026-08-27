# 직군별 이력서·포트폴리오 기술 신호 강화 계획

> 상태: 구현 중 · Task 1~2 local draft 반영

## 목표

같은 경력과 검증된 claim을 유지하면서, 지원 직군마다 채용사가 돈을 주고 맡길 수 있는 범위가 15초 안에 보이도록 이력서와 포트폴리오를 다시 편집한다. Backend Engineer 지원본을 기술 서술의 기준본으로 먼저 완성하고, 승인된 서술 구조를 AI Product Backend·Product Ownership·Forward Deployed Engineer 지원본에 맞게 선택적으로 적용한다.

## 진단

현재 자료만으로 서류 탈락 원인을 특정할 수는 없다. 채용사 피드백이 없는 탈락 사유는 `Unknown`으로 둔다. 다만 현재 문서에는 다음과 같은 판정 위험이 있다.

1. `Maker`, Tech Lead, 제품 운영, AX, AI가 첫 화면에서 동시에 경쟁해 Backend Engineer라는 기본 직군이 늦게 보인다.
2. 강한 기술 근거인 병렬 재구축, transaction Outbox, lease, attempt/version fence, terminal failure, 수동 재처리가 사례 제목 아래의 짧은 stack·영문 명사열로 압축돼 있다.
3. 일부 제목은 시스템의 구성만 설명하고, 어떤 failure mode를 어떤 판단으로 닫았는지는 보여주지 않는다.
4. 회사 코드가 비공개라 public code 대신 이력서와 포트폴리오가 기술 판단을 자립적으로 증명해야 하지만, 현재 포트폴리오도 동일한 요약을 반복하는 구간이 있다.
5. `상담은 끊김 없이`, STG migration의 운영 완료 오독, QA 지표의 단독 인과처럼 기술 신뢰도를 오히려 깎을 수 있는 표현이 남아 있다.
6. 특정 공고의 5년 이상 연차, 요구 stack, 도메인 경험처럼 문서 수정으로 해결되지 않는 eligibility risk도 있다. 표현 개선과 자격 요건 미충족을 같은 원인으로 해석하지 않는다.

따라서 이번 수정은 “백엔드 경험이 없어서 떨어진다”는 가정을 전제로 하지 않는다. 검증된 경험은 충분하지만 **전문성을 판정하는 순서와 깊이가 약하다**는 가설을 먼저 교정하고, 이후 지원 결과로 방향성을 확인한다.

## 편집 설계

### Backend Engineer 기준 문장

> 운영 중인 Python/FastAPI 서비스를 안전하게 바꾸고, 하나의 DB transaction 밖에서 어긋날 수 있는 상태를 복구 가능하게 설계하는 Backend Engineer

이 문장은 공개 소개 문구를 바로 교체하기 위한 확정안이 아니라, Backend 지원본의 사례 선택과 기술 깊이를 판단하는 내부 편집 기준이다. `Tech Lead`는 별도 지원본이나 추상적 리더십 설명으로 두지 않고 변화 범위·검증 기준·전환 시점을 정한 책임으로 Backend 사례 안에서 증명한다.

### 사례의 공통 서술 순서

각 primary case는 아래 순서 중 최소 다섯 항목을 검증 가능한 사실로 채운다.

1. **상황** — 사용자·사업·운영에서 무엇이 막혔는가.
2. **실패 조건** — 중복·지연·역순 전달, 부분 실패, terminal failure, 권한 오염처럼 정상 경로 밖에서 무엇이 깨질 수 있었는가.
3. **판단** — 전체 재작성 여부, service/data ownership, transaction 경계, retry 상한, 수동 복구 조건 중 무엇을 직접 정했는가.
4. **구현** — API·DB·Outbox·worker·lease·fence·session·compensation을 어떤 경계로 구현했는가.
5. **검증** — validation harness, migration rehearsal, MD5·FK·API E2E, replay·regression, 운영 기록 중 무엇으로 확인했는가.
6. **결과와 한계** — production/STG/in-progress 범위, 팀 outcome과 개인 기여, 측정되지 않은 영역을 분리한다.

이력서는 사례마다 `상황·판단·핵심 mechanism·검증`이 자립하도록 쓰고, 포트폴리오는 상태 전이·failure matrix·sequence·검증 artifact를 시각화해 깊이를 확장한다.

### 직군별 첫 판정

| 지원 관점 | 첫 화면에서 내려야 할 결론 | Primary proof order | Supporting proof |
| --- | --- | --- | --- |
| Backend Engineer | 운영 중인 FastAPI 전환과 service 밖 상태의 정합성·복구를 맡길 수 있다 | Thready backend 재구축 → 제품 원장–AI 실행 전달 → Centurion worker → Memento 결제 | Backend Template, NEXUS 진행 중 범위 |
| AI Product Backend | AI 생성을 prompt 호출이 아닌 stateful runtime·quality system으로 운영한다 | Thready generation runtime → Quality Lab → 실시간 상담 protocol | backend 재구축 |
| Product Ownership | 고객 문제를 제품 기준과 직접 구현으로 바꾸고 유료 운영까지 이끈다 | Thready → SellerCanvas → DAY | Company AX |
| Forward Deployed Engineer | 모호한 현장 요구를 제품 범위와 backend contract로 바꾸고 적용·운영한다 | Thready → NEXUS → SellerCanvas | Company AX, Backend Template |

`AX / Forward Deployed Engineer` label은 `Forward Deployed Engineer`로 단순화하고 AX는 supporting case로 둔다. Product Ownership은 공식 직함이 아니라 지원 관점임을 유지한다.

## Backend primary case 설계

### 1. 운영 중인 backend를 기능 흐름을 유지한 채 교체

- 상황: 빠른 기능 검증 중심으로 만들어진 초기 backend를 인계받음.
- 판단: frontend와 release 흐름은 유지하고 backend만 병렬 재구축·cutover.
- 구현 신호: FastAPI contract, validation harness, compatibility boundary, 전환 순서.
- 검증: 전환 전후 동일한 기준의 QA 관측은 backend 단독 인과가 아닌 후속 signal로 분리.
- 금지: 바이브 코딩을 본인의 방식처럼 표현, `36시간`, 최신 안정성 지표처럼 보이는 `5xx 0.3%`.

### 2. 제품 원장의 변경을 AI 실행부까지 안전하게 전달

- 상황: 제품 원장과 AI 실행 상태를 독립 application·DB로 분리.
- 실패 조건: DB commit 뒤 event 유실, retry 중복, 지연·역순 delivery, stale worker 완료.
- 판단과 구현: owner mutation과 Outbox를 같은 transaction에 기록하고, relay retry·lease row claim/reclaim·attempt token·delivery version fence·idempotent consumer·terminal failure 보존으로 수렴 경계 구성.
- 검증: STG migration rehearsal, row count·MD5·FK·API E2E. 정확한 건수는 상세 evidence에서만 사용하고 production migration으로 확대하지 않음.

### 3. 재시도 후에도 운영자가 복구할 수 있는 비동기 작업

- 상황: 주문·재고 연동 작업이 API request와 외부 처리 사이에서 실패할 수 있음.
- 판단과 구현: API와 worker 분리, 명시적 상태 전이, retry 상한, terminal failure record, 실패 건만 수동 재처리.
- 검증: worker 배포 단위와 test/CI, 실패 상태가 사라지지 않고 운영자에게 남는 흐름.
- 결과 표현: MSA 경험 자체보다 분산된 업무의 ownership·복구 경계를 보여줌.

### 4. 외부 결제 상태와 로컬 주문 상태를 보상 가능한 흐름으로 관리

- 직접 수행: Stripe 선결제부터 Webhook·취소·환불까지 결제 상태 흐름 구축.
- 기여 경계: 공유 payment system은 팀원이 구현할 수 있도록 설계한 범위와 직접 구현한 범위를 분리.
- 포트폴리오 확장: 현재 구현 사실과 이후 개선안은 별도 박스로 나누고, 제안 구조를 과거에 이미 운영한 것처럼 쓰지 않음.

### Supporting. 팀이 반복 사용할 backend 기반

- `Router-Service-Repository`와 stack 나열만으로 끝내지 않는다.
- cross-cutting concern, convention, ADR, runbook, agent context가 여러 제품·개발자에게 어떤 반복 비용을 줄였는지 보여준다.
- Company AX와 Backend Template의 contribution verb를 각각 `설계 참여`와 `직접 구축`으로 분리한다.

## 공통 사실 안전 수정

- `상담은 끊김 없이 이어지게 했습니다`를 reconnect race·GC·stop guard 등 실제로 검증한 범위로 낮춘다.
- STG migration은 제목·본문·diagram에서 모두 `STG 검증`임을 유지한다.
- QA reopen 변화는 전체 제품 개발 흐름의 관측값으로 두고 backend 재구축의 단독 효과로 서술하지 않는다.
- `월 수만 건`, `5xx 0.3%`는 최신 측정·SLO 정의 전까지 제거한다.
- NEXUS backend는 개발 중 범위와 기존 제품 outcome을 인과로 연결하지 않는다.
- Memento 결제는 선결제 흐름 직접 구축과 공유 payment system 설계 기여를 분리한다.
- infrastructure는 배포·기본 운영의 supporting signal만 유지하고 architecture 전문성으로 전면 배치하지 않는다.
- `실무 4년차`는 전체 제품 실무 경력이며 Backend 단일 직군 연차로 오독되지 않게 맥락을 붙인다.

## 작업 계획

### Task 1. Claim 안전성과 현재 문안 기준선 확정

목표:
활성 role variant와 공통 dossier에서 과장·범위 오독·중복을 먼저 제거하고, 각 문장을 stable claim과 contribution strength에 다시 연결한다.

예상 결과:
- STG·production·in-progress 상태가 모든 제목·본문·diagram에서 일치함
- QA·매출·예약률 같은 팀 outcome과 개인의 직접 구현 범위가 분리됨
- `5xx 0.3%`, 무중단·무유실로 읽히는 표현, 과도한 infra framing이 active draft에 없음
- role별 primary case에 사용할 claim map이 확정됨

### Task 2. Backend 이력서 기준본 재작성

목표:
Backend 지원본의 소개·경력·대표 사례·기술 index를 재구성해 안전한 전환, durable delivery, 비동기 복구, 외부 결제 상태라는 네 가지 기술 신호를 먼저 보이게 한다.

예상 결과:
- 15초 안에 `FastAPI 전환`, `Outbox 기반 상태 전달`, `worker 복구 경계`를 찾을 수 있음
- 각 primary case가 공통 6문답 중 최소 다섯 항목을 충족함
- Tech Lead 역할이 추상적인 리더십 문장이 아니라 범위·검증·cutover 판단으로 드러남
- stack만 나열하는 제목과 영문 명사열이 제거됨

### Task 3. Backend 포트폴리오를 failure-driven proof로 확장

목표:
이력서의 네 가지 기술 신호를 포트폴리오에서 상태 전이와 실패 시나리오 중심으로 증명한다.

예상 결과:
- 재구축 case에 compatibility·validation·cutover 흐름이 있음
- durable delivery case에 commit–relay–claim–execute–ack 경계와 중복·역순·stale completion 처리 방식이 있음
- worker case에 상태 전이·retry exhaustion·manual replay가 있음
- 결제 case에서 실제 구현과 개선 제안이 시각적으로 구분됨
- 상세 diagram이 A4 100% scale에서 읽히고 잘림·겹침이 없음

### Task 4. AI Product Backend 지원본 재조립

목표:
AI 제품 경험을 모델·prompt 사용이 아니라 generation state, quality evaluation, realtime session lifecycle을 운영한 backend 경험으로 보여준다.

예상 결과:
- 사례 순서가 `generation runtime → Quality Lab → realtime protocol`로 정리됨
- DELTA·COMPLETE·CORRECTED, sequence, reconnect·GC·stop guard의 검증 범위가 구체적으로 보임
- 평가 기준 재정의와 error 발견 방식이 prompt tuning과 구분됨
- 측정되지 않은 latency·SLO·자동 학습·품질 개선 인과를 주장하지 않음

### Task 5. Product Ownership·FDE 지원본 역할 분리

목표:
Backend 기준본을 그대로 복사하지 않고, Product는 고객 문제와 결정 loop를, FDE는 현장 요구와 technical scoping·적용을 먼저 증명하도록 사례를 재배열한다.

예상 결과:
- Product에 Thready·SellerCanvas·DAY의 `문제 → 선택 → 출시 → 학습` 흐름이 있음
- FDE label에서 AX가 제거되고 Thready·NEXUS·SellerCanvas가 Company AX보다 먼저 배치됨
- NEXUS 진행 중 backend와 기존 제품 outcome이 분리됨
- Company AX와 Backend Template이 supporting proof로 내려감

### Task 6. 공통 renderer의 역할별 proof projection 정리

목표:
같은 case fact를 복제하지 않으면서 role별로 제목·focus·case order·상세 section 우선순위를 다르게 읽게 한다.

예상 결과:
- resume와 portfolio가 같은 role slug와 case order를 사용함
- role variant가 단순 형용사 교체가 아니라 서로 다른 proof hierarchy를 가짐
- 공통 case library의 사실·수치·claim ID가 한 곳에서 유지됨
- local-only·draft·noindex 계약이 유지됨

### Task 7. 문안·A4·채용 신호 검증

목표:
수정본이 기술적으로 방어 가능하고 읽는 시간별 역할 판정과 출력 안전성을 충족하는지 확인한다.

예상 결과:
- workspace validator·typecheck·lint·build가 통과함
- 모든 role route에서 15초·60초 acceptance가 기록됨
- A4 100% scale에서 글자 잘림·diagram 겹침·고아 제목이 없음
- 면접에서 근거를 설명할 수 없는 문장이 없음
- 사용자 승인 전 public route·PDF·platform profile에는 반영되지 않음

### Task 8. 서류 결과로 가설 검증

목표:
문서 개선과 실제 서류 통과 여부를 혼동하지 않도록, 동일 직군군 지원에서 제출본·JD eligibility·결과·피드백을 함께 기록한다.

예상 결과:
- 지원별 JD, 사용한 role variant/PDF, 필수 요건 gap, 결과가 application archive에 남음
- 연차·필수 stack 미충족과 표현 문제를 분리해 회고할 수 있음
- 여러 지원 결과가 쌓이기 전 작은 표본을 원인으로 단정하지 않음

## 구현 순서와 승인 gate

```text
Task 1 사실 안전
  ↓
Task 2 Backend resume
  ↓ 사용자 문안 검토
Task 3 Backend portfolio
  ↓ Backend 기준본 승인
Task 4 AI Backend ─┐
Task 5 Product/FDE ├─ role projection
Task 6 renderer ───┘
  ↓
Task 7 검증
  ↓
Task 8 지원 결과 관측
```

첫 구현은 Task 1~2까지만 진행하고 사용자 검토에서 멈춘다. Backend 기준본의 제목과 사례 깊이가 승인되기 전에 다른 직군과 public surface로 확장하지 않는다.

## 변경 대상

- `app/fe/content/resumes/role-variants.ts`
- `app/fe/content/portfolios/role-variants.ts`
- `app/fe/content/role-catalog.ts`
- `app/fe/app/portfolio/case-dossier.tsx`
- `app/fe/app/portfolio/[case]/case-details.tsx`
- `app/fe/lib/cases.ts`
- `wiki/products/resume/role-positioning-standard.md`
- `wiki/products/resume/role-variants.md`
- `wiki/products/portfolio/role-variants.md`
- claim boundary가 실제로 바뀌는 경우에만 `wiki/evidence/claims/*.yaml`

## 비범위

- 새로운 수치·SLO·트래픽 규모·성능 개선률 만들기
- Kubernetes·cloud architecture·대규모 트래픽 전문성 추가
- 회사 자산인 private source code 공개
- 현재 구현하지 않은 결제 개선안을 과거 성과로 변경
- Backend 기준본 승인 전 기본 `/resume`, `/portfolio`, PDF, 채용 플랫폼 문안 변경
- 현재 dirty worktree의 관련 없는 변경 정리·되돌리기

## 검증 명령

```bash
uv run --project tools python tools/validate_workspace.py
pnpm --dir app/fe typecheck
pnpm --dir app/fe lint
pnpm --dir app/fe build
git diff --check
```

브라우저에서는 `/resume/backend`, `/portfolio/role/backend`를 먼저 검토하고, 승인 후 나머지 local role route와 print preview를 확인한다.
