---
type: policy
title: Persuasive Writing Policy
description: 프로필·이력서·경력기술서 문장을 설득력 있게 쓰는 규칙. 외부 사례 리서치(2026-08-10)로 검증한 기준.
timestamp: 2026-08-10
tags: [policy, resume, profile, writing]
---

# Persuasive Writing Policy

**"내가 무엇을 했다"는 누구나 쓴다. 설득은 그 문장이 검증 가능할 때 생긴다.**

**최상위 프레임 (2026-08-12 user-confirmed): 이력서는 "돈 주면 이런 걸 해줄 수 있다"를 파는 문서다.**
성과는 과거의 증거, **판단 서사는 재현 가능성** — 결과는 전 회사에 두고 오지만 판단력은 이식된다.
포맷(bullet·문단)은 그걸 10초 안에 스캔되게 하는 포장일 뿐이다. 포장을 위해 판단을 버리지 않는다.

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

## 6. 대안을 검토했다는 사실이 결정보다 중요하다 — 국내 기준

**국내 자료가 영어권과 갈리는 지점이 여기다.** 영어권 자료는 *impact*(결과)를 반복해 강조하는데,
국내 채용 자료는 **대안 검토**를 별도 축으로 세운다.

국내에서 통용되는 **PAAR** 구조:

| | 요소 | 질문 |
| --- | --- | --- |
| **P** | Problem | 왜 이 문제가 중요했는가 |
| **A** | **Analyze** | **어떤 선택지를 검토했고 왜 그것을 골랐는가** |
| **A** | Action | 실제로 무엇을 실행했는가 |
| **R** | Result | 결과가 어떻게 달라졌는가 |

> 면접관은 Action보다 **Analyze(대안 검토)**를 중요하게 평가합니다.
> — [searchright](https://blog.searchright.net/developer-career-description-examples/)

실물 예시가 보여주는 A의 밀도:

> Before — `주문 API 응답 속도 개선을 위한 Redis 캐시 적용, MySQL 쿼리 최적화 및 인덱스 추가`
>
> After — P: 피크 타임 주문 요청 증가로 API 응답 지연 발생 /
> **A: "Memcached 대비 데이터 구조 유연성 고려해 Redis 선택"** /
> A: 주문 조회 로직 분리, Redis 캐시 적용, 인덱스 재설계 /
> R: 응답 속도 1.8초 → 420ms, 장애 재발 0건

**우리 구조에 A가 없었다.** `예상한 문제 → 판단 근거 → 결정 → 결과`의 "판단 근거"는
*왜 이게 문제인가*를 말하지 *왜 다른 선택지가 아닌가*를 말하지 않는다.
[Codex 교차 리뷰](../context/todo.md)도 같은 것을 지적했다 —
*"서비스 규모·전환 비용·기존 코드 활용 가능성·점진적 migration 대안이 빠져 있습니다."*

**개정된 서술 구조:**

```
① 문제      무엇이 문제였고 왜 중요했는가
② 대안      어떤 선택지가 있었고 왜 그것을 배제했는가   ← 새로 추가
③ 결정      그래서 무엇을 했는가
④ 결과      무엇이 달라졌는가 (간접 효과라도)
```

⚠️ **대안을 지어내지 않는다.** evidence에 실제 검토 기록이 없으면 ②를 비워 둔다.
없는 대안을 쓰는 건 [evidence-policy](evidence-policy.md) 위반이고, 면접에서 바로 무너진다.

### 국내 자료가 공통으로 꼽는 탈락 패턴

- 기술 스택 나열만 — `Java, Kotlin, Spring Boot, JPA, MySQL, MongoDB, Redis, Kafka…`
- 수행 업무만 기술 — `관리자 페이지 구축, 결제 모듈 개발`
- **실제로 쓰지 않은 기술 기재** — 깊이 있게 답할 수 있는 것만 남긴다
- 프로젝트 나열 과다 — 5년차 이상은 5개 안팎으로 추리고 대신 각각을 깊게

> 첫인상부터 10년은 넘었을 것 같은 옛날 이력서의 모양새, 성의 없어 보이는 경력소개 (…)
> 내 이력서는 10초도 안 되어 지나가버렸을지도
> — [우아한형제들 기술블로그](https://techblog.woowahan.com/2531/)

---

## 7. 자가 점검 체크리스트

문안을 쓴 뒤 아래를 통과시킨다.

- [ ] **첫 문장만 읽었을 때** 무슨 일을 하는 사람인지 전달되는가 (경로 서사가 아니라)
- [ ] 클리셰 문장이 있는가 → 그것을 증명하는 사례로 바꿨는가
- [ ] `~했습니다`로 끝난 문장 뒤에 **그래서 무엇이 달라졌는지**가 있는가
- [ ] 결정을 서술한 문장에 **무엇을 우려했는지**가 붙어 있는가
- [ ] **다른 선택지를 왜 배제했는지**가 있는가 — 근거가 있는 경우에 한해
- [ ] 기재한 기술을 면접에서 깊게 답할 수 있는가
- [ ] claim 강도와 문장의 강도가 일치하는가 (과장도 축소도 아님)
- [ ] 검증 가능한 외부 사실을 쓸 수 있는 자리에 자기 서술을 쓰고 있지 않은가
- [ ] 판단 서술을 **모든 항목에 기계적으로 반복**하고 있지 않은가 — 비자명한 결정에만 쓴다
- [ ] 다른 직군·타인의 일을 깎는 문장이 없는가 (§8 — "대체된다" 류 금지)

마지막 항목은 [Codex 교차 리뷰(2026-08-10)](../context/todo.md#e-1-문안-v5-전파-2026-08-10-야간-신설)에서 나온 것이다.
구조를 규칙으로 만들면 그 구조 자체가 기계적으로 반복돼 다시 AI 문체가 된다.

---

## 8. 적대적 프레임을 쓰지 않는다 (2026-08-10 user-confirmed)

**특정 직군·타인의 일이 "대체된다", "사라진다"는 서술을 공개 문안에 쓰지 않는다.**
user 원칙: "나는 모두를 존중해".

후킹이 세다는 이유로 다른 사람의 자리를 깎는 문장은 쓰지 않는다.
같은 판단은 **비교 없이 내가 선 자리의 이유**로 표현해도 전달된다:

> ❌ 프론트엔드가 먼저 AI로 대체될 거라 보고 백엔드를 택했습니다.
>
> ✅ AI가 구현을 점점 더 많이 맡게 될수록, 보안과 안정성처럼 사람이 끝까지
> 책임지는 층의 무게가 커진다고 봤습니다.

읽는 사람 관점에서도 이게 안전하다 — 채용 담당자나 면접관이 FE 엔지니어일 수 있고,
협업할 동료를 깎는 인상은 dual track(함께 정하고 만드는 사람) 포지셔닝과 정면 충돌한다.
evidence 내부 기록에는 원문 판단을 보존하되, 공개 표현만 이 규칙을 따른다.

---

## 9. 번역투를 쓰지 않는다 (2026-08-11 user-confirmed)

**한국어 문안이 "영어를 번역한 느낌"이면 실패다.** 실측된 패턴 4가지:

| 패턴 | 번역투 | 자연스러운 한국어 |
| --- | --- | --- |
| 평행 명사화 | `만드는 일과 정하는 일을 함께 맡습니다` | `만들면서 ~하는 역할도 같이 맡고 있습니다` |
| 의문사 스태킹 | `무엇을 왜 만들지` | `뭘 만들지` (이유는 문장을 나눠서) |
| 시간 부사 후치 | `~하는 일만 4년째 하고 있습니다` | `4년째 ~하고 있습니다` / `~만 4년째` |
| 영어 수사 직역 | `이유는 분명합니다` (The reason is clear) | `~한 데는 이유가 있습니다` 또는 그냥 이유를 말한다 |

영어 대구(parallelism)는 힘이 있지만 한국어로 직역하면 명사화가 겹쳐 어색해진다.
**소리 내어 읽었을 때 동료에게 말하듯 들리는가**가 판정 기준이다.

---

## 10. 경력 설명은 개조식으로 쓴다 (2026-08-12 user-confirmed)

> "bullet 이런걸 좀 적극 활용해야 … 인사쪽 사람들이 보고 이해하기 좋을것 같아"
> "외국애들껄 한국어로 그대로 차용하기보다는 **한국 레퍼런스를 찾아서** 해보는것도 좋은 방법"

밀집 문단은 읽히기 전에 무시된다(아이트래킹에서 fixation 미발생). 국내 인사담당자 증언도 같다 —
"작문하듯이 줄글로 쓰지 말고, **꼭지를 달아서 간결하게** 써라", "이력서가 세 장을 넘으면 보고 싶지 않다".

### 포맷 — 개조식 + 명사형 종결

```
[프로젝트·구간 꼭지]
- 주제어·수치를 앞에, 결과명사로 종결 (근거·측정 정의는 괄호)
```

```
QA 티켓 reopen 비율 37% → 11% 개선 (해결 대비 reopen, cutover 전후 Jira 집계)
상세페이지 제작 Flow 재설계, 「페이지 출력 방법」 특허 출원·등록으로 연결
```

**한국어는 서술어가 문장 끝에 온다.** 영어권 처방인 "동사 먼저(front-loading)"를 그대로
옮기면 번역투가 된다(§9). 국내 표준은 명사형 종결이다 — `~개선` `~단축` `~구축` `~결정` `~전환`.
수치·주제어가 앞, 결과명사가 끝에 오면 좌측 스캔 가치와 한국어 어순이 동시에 만족된다.

### 금지

- **bullet에 `~했습니다` 금지.** 서술형 존댓말은 소개(L1)와 마무리 한 줄에만 쓴다.
- **공정 라벨 접두 금지** — `문제:` `판단:` `실행:` `성과:`. 국내 관행의 `[꼭지]`는 줄마다 다른
  *내용어*이지 매 줄 반복되는 *공정 라벨*이 아니다. 라벨을 반복하면 경력 5건 기준 동일 단어
  20~30개가 좌측 열을 점거해, 6초 스캔에서 얻는 정보가 0이 된다.
- **판단 삭제 금지.** 국내 개발자 채용 가이드는 문제·역할·해결 방식·결과 4요소를 요구하고,
  시니어일수록 "왜 그 기술을 선택했고 어떤 대안을 왜 배제했는지"를 명시하라고 한다(§6).
  명사형으로 압축하되 없애지 않는다 — 이력서가 파는 것은 성과가 아니라 재현 가능성이다.
- **없는 수치 창작 금지.** 수치가 없으면 업무 범위·처리량·협업 규모로 대체한다.

### 분량

- 블록당 **3~5줄**, 줄당 1~2행. 국내·해외 가이드가 같은 수치를 준다.
- **성과는 핵심 결과만 1줄.** 근거·측정 정의는 괄호로 붙인다.
- **hot zone** — 상단 1/3이 1차 스캔 주목의 80%. 최신 경력 첫 블록의 첫 줄에 최강 수치를 놓는다.
- 전체 분량: 이력서 2장, 경력기술서 포함 4장. **3장을 넘기지 않는다.**
- **소개(L1)는 문단형 유지.** 관점 선언은 서사가 필요하고, 개조식으로 쪼개면 논지가 사라진다.

근거: [bullet impact 분석](../products/resume/research/2026-08-12-bullet-impact.md) (해외 실증 + 부록 A~E 한국 레퍼런스).
canonical: [dual-track-copy-draft](../backlog/platform-profile-consolidation/dual-track-copy-draft.md) 「경력 설명 — canonical v3」.

## 영어권 vs 국내 — 강조점이 다르다

| | 영어권 자료 | 국내 자료 |
| --- | --- | --- |
| 최상위 강조 | **impact / 수치화된 결과** | **대안 검토(Analyze)** |
| 클리셰 배제 | 동일하게 강조 | 동일하게 강조 |
| 기술 나열 | 언급 적음 | **탈락 사유 1순위로 명시** |
| 서술 구조 | 목표 → 한 일 → 효과 | P → **A** → A → R |

**둘 다 만족시켜야 한다.** 국내 채용에 지원하므로 대안 검토를 넣되,
결과(간접 효과 포함)를 생략하지 않는다.

---

## Sources

**영어권**

- [The Tech Resume Inside Out — common mistakes](https://thetechresume.com/samples/common-mistakes) (Gergely Orosz)
- [Get your work recognized: write a brag document](https://jvns.ca/blog/brag-documents/) (Julia Evans)
- [The Pragmatic Engineer's Resume Template](https://blog.pragmaticengineer.com/the-pragmatic-engineers-resume-template/)
- LinkedIn `backend engineer` 검색 1페이지 실측 (2026-08-10)

**국내**

- [개발자 경력기술서 예시 — PAAR 구조](https://blog.searchright.net/developer-career-description-examples/) (searchright)
- [이직초보 어느 개발자의 이력서 만들기](https://techblog.woowahan.com/2531/) (우아한형제들 기술블로그)
- [채용 담당자를 사로잡는 경력직 이력서 쓰는 법](https://www.wanted.co.kr/events/article_23_01_09) (원티드)
- [면접관이 꽂히는 경력직 개발자 이력서의 비밀](https://www.jobkorea.co.kr/recruit/careers/articles/developer-resume-guide) (잡코리아)
