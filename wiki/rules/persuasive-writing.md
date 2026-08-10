---
type: policy
title: Persuasive Writing Policy
description: 프로필·이력서·경력기술서 문장을 설득력 있게 쓰는 규칙. 외부 사례 리서치(2026-08-10)로 검증한 기준.
timestamp: 2026-08-10
tags: [policy, resume, profile, writing]
---

# Persuasive Writing Policy

**"내가 무엇을 했다"는 누구나 쓴다. 설득은 그 문장이 검증 가능할 때 생긴다.**

이 문서는 [dual-track-copy](../backlog/platform-profile-consolidation/dual-track-copy-draft.md)의
서술 구조 규칙을 외부 사례로 검증하고 보완한 결과다.

---

## 1. 첫 문장은 광고 카피다 — 검색 미리보기로 쓰인다

**실측 (2026-08-10, 링크드인 `backend engineer` 검색 1페이지 10명):**

- **9명의 헤드라인이 `Backend Engineer` 단독이었다.** 회사명이 붙는 정도가 전부다.
- 검색 결과 카드에 **소개(About) 첫 문장이 미리보기로 노출되는 사람은 1명뿐**이었다.
  그 문장은 `Backend engineer with production experience designing and operating high-scale distributed systems…`
- 헤드라인에 검증 가능한 사실을 넣은 사람도 1명 — `OpenSource contributor on spring-framework and spring-security and Disruptor`

**함의 2가지**

1. **헤드라인 차별화는 사실상 비어 있는 공간이다.** 직함만 쓰는 게 기본값이라 조금만 달라도 눈에 띈다.
2. **소개 첫 문장은 본문이 아니라 미리보기다.** 목록에서 이 문장만 보고 클릭 여부가 갈린다.
   → 첫 문장에 **직무·도메인·무엇을 다루는지**가 없으면 신호가 전달되지 않는다.

⚠️ **경로 서사(origin story)를 첫 문장에 두지 않는다.** "어디서 시작해 어디를 거쳐 왔다"는
읽는 사람에게 아직 아무 자격도 알려주지 않은 상태에서 지면을 쓴다.
궤적은 강력한 재료지만 **자격 신호 다음**이다.

---

## 2. 클리셰는 증거로 치환한다

`The Tech Resume Inside Out`(Gergely Orosz)의 common-mistakes가 드는 예:

| 클리셰 | 증거 |
| --- | --- |
| `I am a team player and a fast learner who can hit the ground running.` | `I organized two team offsites and onboarded three new starters.` |

> 클리셰에는 *facts, examples or specifics*가 없고, 증거 기반 문장은 행동으로 특성을 보여준다.

같은 원리로 **"문제 정의부터 봅니다", "성장에 열정이 있습니다", "빠르게 학습합니다"는
그 자체로는 아무것도 주장하지 못한다.** 그렇게 한 사례를 대신 쓴다.

---

## 3. `했다`에서 멈추지 않는다 — 그래서 무엇이 일어났는가

Julia Evans, *Get your work recognized: write a brag document*:

> It's easy to accidentally write "I shipped $feature" and miss the follow up ("… which caused $thing to happen").

**측정값이 없는 일에도 효과는 있다.** 같은 글이 제시하는 3단계:

```
① 왜 그 일이 중요한지 목표를 밝힌다
② 그 목표를 향해 한 일을 적는다
③ 관찰된 효과를 적는다 — 간접적이어도 된다
```

우리 [서술 구조](../backlog/platform-profile-consolidation/dual-track-copy-draft.md)
(`예상한 문제 → 판단 근거 → 결정 → 결과`)와 같은 뼈대이며, **③이 우리 쪽에서 약했다.**
수치가 없으면 결과를 통째로 생략해 왔는데, *"신규 제품이 같은 구조에서 출발한다"*처럼
간접 효과라도 쓰는 편이 낫다.

---

## 4. 과장도 축소도 하지 않는다

> you don't have to try to make your work sound better than it is. Just make it sound **exactly as good as it is**!

이 규칙이 [evidence-policy](evidence-policy.md)의 claim 강도(`owned`/`led`/`co-led`/`contributed`)와
직접 연결된다. **강도를 낮춰 쓰는 것도 부정확이다.** `contributed`인 일을 `led`로 쓰면 안 되듯,
`owned`인 일을 "참여했습니다"로 쓰는 것도 사실과 다르다.

---

## 5. 가장 강한 재료는 검증 가능한 외부 사실

링크드인 실측에서 유일하게 차별화된 헤드라인이 **오픈소스 기여처**였다.
제3자가 확인할 수 있는 사실은 자기 서술보다 항상 강하다.

우리가 보유한 이 유형:

- CES 2024 AI 부문 Best of Innovation (제품 수상)
- 특허 등록 10-2898273
- 외부 기관 AI 정확도 인증 통과 (KCL — 인증서 실물 확인 대기)
- 공개된 제품·서비스 URL

⚠️ 단, [public-safety](public-safety.md)와 [recency-weighting](recency-weighting.md)이 우선한다.
오래된 정량과 고객사 실명은 이 규칙으로 해금되지 않는다.

---

## 6. 자가 점검 체크리스트

문안을 쓴 뒤 아래를 통과시킨다.

- [ ] **첫 문장만 읽었을 때** 무슨 일을 하는 사람인지 전달되는가 (경로 서사가 아니라)
- [ ] 클리셰 문장이 있는가 → 그것을 증명하는 사례로 바꿨는가
- [ ] `~했습니다`로 끝난 문장 뒤에 **그래서 무엇이 달라졌는지**가 있는가
- [ ] 결정을 서술한 문장에 **무엇을 우려했는지**가 붙어 있는가
- [ ] claim 강도와 문장의 강도가 일치하는가 (과장도 축소도 아님)
- [ ] 검증 가능한 외부 사실을 쓸 수 있는 자리에 자기 서술을 쓰고 있지 않은가
- [ ] 판단 서술을 **모든 항목에 기계적으로 반복**하고 있지 않은가 — 비자명한 결정에만 쓴다

마지막 항목은 [Codex 교차 리뷰(2026-08-10)](../context/todo.md#e-1-문안-v5-전파-2026-08-10-야간-신설)에서 나온 것이다.
구조를 규칙으로 만들면 그 구조 자체가 기계적으로 반복돼 다시 AI 문체가 된다.

---

## Sources

- [The Tech Resume Inside Out — common mistakes](https://thetechresume.com/samples/common-mistakes) (Gergely Orosz)
- [Get your work recognized: write a brag document](https://jvns.ca/blog/brag-documents/) (Julia Evans)
- [The Pragmatic Engineer's Resume Template](https://blog.pragmaticengineer.com/the-pragmatic-engineers-resume-template/)
- LinkedIn `backend engineer` 검색 1페이지 실측 (2026-08-10)
