---
type: report
title: PO & AI 에이전트 개발자 — JD 시장 인사이트
description: 목표 방향(PO & AI Agent Developer)에 대한 시장 직함 매핑, 요구사항 대조, 진입 전략.
timestamp: 2026-08-11
derived_from: [profile/identity.md, evidence/projects/thready-quality-lab.md, evidence/projects/be-template.md]
tags: [jd, market, ai-agent, po, strategy]
---

# PO & AI 에이전트 개발자 — 시장 인사이트 (2026-08-11)

user-confirmed 목표: **"나는 PO & AI 에이전트 개발자를 하고싶어"**

## 1. 시장은 이 조합을 뭐라고 부르나

"PO & AI 에이전트 개발자"라는 단일 직함은 시장에 없다. 실존하는 인접 직함:

| 직함 | 시장 | 비고 |
| --- | --- | --- |
| **AI Engineer (LLM·Agent)** | KR 실재 (예: 원티드랩 wd/351520) | "LLM·Agent 기능의 서비스 통합 + 백엔드 아키텍처 설계·최적화" — **현 프로필과 1:1** |
| **AI Product Manager / AI PO** | KR 실재 (LINE 등) | LLM·Agentic AI 이해 요구. 단 시니어는 PO 경력 5~7년 요구 |
| Agent Engineer / Forward Deployed Engineer | 글로벌 | 신생 직함군, KR 확산 중 |

## 2. 최대 발견 — 이미 하고 있는데 시장 언어로 부르지 않는 것

> "2026년 주니어와 시니어 AI 엔지니어의 최대 격차는 **배포 전에 evals를 본능적으로 쓰는가**다."

시장이 1순위로 스크리닝하는 **eval design**이, 우리 프로필에서는 "3층 판정 체계(자동 게이트 12종·실측 분포 대조·사람 판정)"로만 불린다. **같은 것이다.** 실측 코퍼스 n=4,039, 반증 로그 운영까지 — 대부분의 지원자가 못 내미는 수준의 eval 실무 증거를 이미 보유. → **"LLM evals"라는 시장 키워드로 병기**해야 검색과 스크리닝에 걸린다.

같은 유형의 재명명 후보:
- agent context·Hub-and-Spoke 문서 라우팅 → "agent-readable engineering workflow", "context engineering"
- production 운영 지표(월 수만 건·5xx 0.3%) → "lab-only가 아닌 production LLM 운영" (JD 스크린 항목 그 자체)

## 3. 요구사항 대조

**AI Agent Engineer 축** (충족 ✅ / 갭 ⚠️):
- ✅ LLM 기능의 서비스 통합 + backend 아키텍처 (Thready·Centurion)
- ✅ eval 설계 (3층 판정 — §2)
- ✅ production 운영·비용 감각, async 파이프라인 (TaskIQ·RabbitMQ)
- ✅ 5년 경력 요구 대비 4년차 — 근접 (원티드랩 JD 기준)
- ⚠️ **멀티에이전트 오케스트레이션 프레임워크** 명시 근거 (LangGraph·CrewAI, supervisor-worker 패턴)
- ✅ **실시간·스트리밍 LLM 운영** (2026-08-13 추가) — WebSocket 기반 STT·LLM 파이프라인,
  provider lifecycle, zombie session·reconnect race 처리. `centurion.say-realtime`(co-led).
  "lab-only가 아닌 production LLM 운영"의 직접 근거인데 **현재 산출물에서 과소 노출**돼 있다
  ([case-narratives](../../site/case-narratives.md) 경험 범위형)
- ⚠️ RAG·vector DB·프롬프트 인젝션 방어·트레이싱 명시 근거

**AI PO 축**:
- ✅ 사용자 중심 문제 정의(핵심 서사), 판정 가능화=지표 개선, PM 12개월 + PO 병행, 만드는 사람의 LLM 이해
- ⚠️ **연차 벽** — 시니어 PO JD는 PO 경력 5~7년 요구. 순수 PO 트랙 정면 지원은 불리

## 4. 진입 전략

**AI Engineer(LLM·Agent) 직함으로 들어가서 PO 병행을 차별화로 판다.**
역방향(PO로 지원)은 연차 벽이 크고, 순방향은 요구사항 대부분을 이미 충족하며 PO 경험이 가점이 된다. 이건 identity.md의 dual track(BE primary + PO 병기)과 정확히 같은 구조다 — **시장이 우리 포지셔닝을 검증해줬다.**

## 5. 액션

1. **키워드 병기** — 프로필·이력서에 `LLM evals`·`AI Agent` 시장 용어 추가 (내용 변경 없이 명명만). 링크드인 헤드라인에서 AI가 빠진 상태 — Agent 방향이면 오히려 `AI Agent`를 넣는 게 검색 유리
2. **오케스트레이션 갭 = 콘텐츠 기회** — 멀티에이전트 위임·핸드오프·검증 프로토콜을 이미 실무로 쓰고 있다(agent 워크플로우). 이걸 blog/labs 글로 공개하면 프레임워크 갭을 실전 증거로 덮는다 (todo B2와 연결)
3. **tailor-resume 1건** — 원티드랩 AI 엔지니어(wd/351520)를 첫 대상으로 맞춤 패키지 (todo B2 "실제 JD 1건" 그 자체)

## Sources

- [원티드랩 AI 엔지니어 JD](https://www.wanted.co.kr/wd/351520)
- [AI Developer Hiring 2026: Skills That Actually Matter](https://www.digitalapplied.com/blog/ai-developer-hiring-skills-that-matter-2026)
- [15 AI Engineer Skills Every Hire Should Have in 2026](https://www.ayautomate.com/blog/ai-engineer-skills-2026)
- [LINE AI Service Product Manager](https://careers.linecorp.com/ko/jobs/2596/)

---

## 6. 경쟁 프로필 실물 수집 (2026-08-11, 링크드인 20+명 · 상세 4명)

### 헤드라인 공식 (현직자들이 실제로 쓰는 구조)

```
[직무] | [핵심 기술 3~4개] | [도메인·신뢰성·제품 맥락]
```

예: `AI Engineer | RAG Architecture · Agent Systems · LLM Evaluation | Building Safe & Reliable AI for Regulated Industries`

### 키워드 빈도 (수집 표본 기준)

RAG(거의 전원) > AI Agent · LLM > Multi-Agent · Evaluation > MCP · PromptOps · Workflow Automation

### 결정적 발견 — "AI Product Engineer"

수집 표본에서 **4명이 "AI Product Engineer" 계열 직함**을 쓴다
(`AI Product Engineer`, `AI-native Product Engineer building Multi-Agent Systems`,
`AI Product Engineer | LLM Systems · Agents · Evaluation | AI Product Builder`, `AI Agent & Product Engineer`).
**"PO & AI 에이전트 개발자"의 시장 이름이 이것이다** — JD 검색에서는 안 보였지만 사람들이 이미 쓰고 있다.

### 차별화 3축과 우리 위치

현직자들은 ①도메인(의료·금융·법률) ②시스템 계층(학습·추론·관측성) ③제품화·운영 중 하나로 차별화한다.
**우리는 셋 중 두 개 반을 이미 갖고 있다**:
- ① 의료 도메인 — AI 메디컬 플랫폼(센츄리온)·피부과 운영. 의료 도메인 차별화를 쓰는 M.L.과 같은 축
- ③ 제품화·운영 — production 지표 + PO 병행 (표본에서 PO 겸직은 없음 — 희소)
- ② Evaluation — 3층 판정·n=4,039 (J.J.가 "LLM Evaluation·LLM-as-Judge"로 이미 이 축을 차림 — 선점 경쟁 존재)

### 우리 프로필의 최대 문제 — 검색 가시성 0

현 링크드인 헤드라인: `Backend Engineer · PO | 제품을 만들고, 무엇을 만들지도 함께 정합니다 | CES…`
**AI·Agent·LLM·Evaluation 키워드가 하나도 없다.** AI Agent 인재 검색에서 이 프로필은 잡히지 않는다.
내용은 경쟁자급인데 색인이 안 되는 상태.

### 갭 (표본 대비)

- **RAG** — 표본 거의 전원이 보유 표기. 우리는 근거 없음 (만들거나, 다른 축으로 승부)
- **MCP·오케스트레이션 프레임워크** — 일상 워크플로우로 실사용 중이나 공개 증거 없음 → blog/labs로 전환 가능

### 헤드라인 개정 제안 (사용자 결정 대기)

시장 공식 + 고유 자산(의료·평가·PO)을 결합한 안:

```
AI Product Engineer · PO | LLM 백엔드 · Agent Workflow · LLM Evaluation | 의료 AI 플랫폼을 만들고, 무엇을 만들지도 함께 정합니다
```

주의: 직함 표기(`AI Product Engineer`)는 identity.md primary(Backend Engineer)와의 관계 정리 필요 —
채용 검색 필드 vs 브랜드 정체성의 층 분리로 볼지 사용자 판단.
