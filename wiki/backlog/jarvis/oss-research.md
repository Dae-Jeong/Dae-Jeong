---
type: reference
title: Jarvis OSS Research
description: Jarvis 서비스 구성요소별 오픈소스 후보 조사 (graph 뷰·RAG chat·wake·STT·TTS·voice assistant).
timestamp: 2026-07-15
tags: [backlog, jarvis, oss, research]
---

# Jarvis OSS 후보 조사

조사 시점 **2026-07-15** (WebSearch 기반). star 수는 근사 표기, 확인 못 한 값은 ⚠️.
판단 축: **브라우저에서 동작 vs 서버 필요** — Jarvis는 Next.js subdomain + k8s 배포 예정이라 브라우저 단독 동작 여부가 Phase 결정에 직결.

## 1. Wiki graph 시각화/발행

| 후보 | 설명 | 라이선스 | 활성도 (2026-07) | Jarvis fit |
|---|---|---|---|---|
| [Quartz](https://github.com/jackyzha0/quartz) | Obsidian vault → 정적 사이트 (graph view·backlink·wikilink 내장), ~12.6k ★ | MIT | 활발 — v5 (YAML config·plugin 생태계) 개발 진행 중 | 통째 도입 후보 — 단 정적 발행이라 Next.js chat과는 별도 빌드/서빙 필요 (서버리스 정적) |
| [react-force-graph](https://github.com/vasturiano/react-force-graph) | 2D/3D force-directed graph React 컴포넌트 (canvas/WebGL), ⚠️ ~2.5k ★ (근사, 미확인) | MIT | 활발 — v1.29.1 2026-02 릴리스 | **브라우저** 렌더링 라이브러리 — Next.js에 직접 embed, Obsidian graph 감성에 가장 근접 |
| [Cytoscape.js](https://github.com/cytoscape/cytoscape.js) | graph theory 모델 + 렌더러, 분석 기능 풍부, ~11k ★ | MIT | 매우 활발 — v3.34.0 2026-06, 월간 릴리스 | **브라우저** — 분석(중심성 등)까지 필요하면 선택, 단순 시각화엔 과함 |

판단: 발행 파이프라인을 Quartz에 통째로 맡기면 chat UI와 이원화된다. Next.js 안에서 markdown 파싱(backlink 추출) + react-force-graph 렌더가 단일 스택 유지에 유리. Quartz는 graph view 구현(D3 기반)·backlink 인덱싱 **구조 참고**용으로 격하 가능.

## 2. 노트 기반 RAG chat

승인된 스택: Vercel AI SDK + assistant-ui. 따라서 "통째"보다 "구조 참고" 우선.

| 후보 | 설명 | 라이선스 | 활성도 (2026-07) | Jarvis fit |
|---|---|---|---|---|
| [Vercel AI SDK RAG template](https://ai-sdk.dev/cookbook/guides/rag-chatbot) | Next.js + AI SDK + Drizzle + Postgres(pgvector) RAG 챗봇 공식 가이드/템플릿 | 공식 예제 (Apache-2.0 계열 ⚠️ 미확인) | Vercel 공식 유지 | **구조 참고 1순위** — 승인 스택과 동일, chunking→embedding→tool-call retrieval 패턴 그대로 이식 |
| [Khoj](https://github.com/khoj-ai/khoj) | self-hostable "AI second brain" — markdown/org 노트 인덱싱 + chat, ~34k ★ | AGPL-3.0 | 유지 중 — v1.42.x | 통째 도입 시 **서버** 전체가 Khoj로 대체됨 + AGPL 전파 부담. markdown 인덱싱·증분 임베딩 **구조 참고** |
| [AnythingLLM](https://github.com/Mintplex-Labs/anything-llm) | all-in-one 문서 RAG 워크스페이스, ~62.6k ★ | MIT | 매우 활발 — 2026 릴리스 다수 | 통째 쓰면 별도 앱이 하나 더 생기는 셈 — 문서 chunking/워크스페이스 격리 **구조 참고** |
| [Open WebUI](https://github.com/open-webui/open-webui) | LLM chat UI + 문서 RAG | Open WebUI License (BSD 기반, 브랜딩 제한, 非 OSI) ⚠️ 2026 BSD-3 복귀 논의 있음 — 재확인 필요 | 매우 활발 | 라이선스 유동적 + UI 스택 충돌(assistant-ui와 중복) — 참고만 |

판단: 통째 도입 후보 없음. Vercel 공식 RAG 패턴 + pgvector(Supabase `jarvis` schema와 합치)로 직접 구현이 최소 경로.

## 3. Wake 감지

### 3a. Double clap detection (브라우저)

성숙한 전용 브라우저 라이브러리는 **없음** — 소규모 구현체/예제뿐. Web Audio API `AnalyserNode` 에너지 피크 + 피크 간 간격(300–800ms) 검사로 직접 구현이 현실적 (수십 줄 규모).

| 후보 | 설명 | 라이선스 | 활성도 | Jarvis fit |
|---|---|---|---|---|
| [Mozilla Hacks clap-sensing 예제](https://hacks.mozilla.org/2018/02/making-a-clap-sensing-web-thing/) | Web Audio API 기반 clap 감지 튜토리얼 (브라우저) | 예제 코드 | 오래됨 (2018) — API 자체는 유효 | **브라우저** — 직접 구현 시 알고리즘 참고 |
| [clap-detector](https://github.com/tom-s/clap-detector) | Node.js clap/연속 clap 감지 모듈 (sox 의존) | MIT ⚠️ 미확인 | 저활성 | **서버(Node)** 용 — 브라우저 불가, 간격 검사 로직만 참고 |
| [clapDetection (TzurSoffer)](https://github.com/TzurSoffer/clapDetection) | single/double/triple clap 패턴 감지 (Python) | ⚠️ 미확인 | 소규모 | **서버(Python)** — 패턴 파라미터 참고 |

### 3b. Wake word (대안)

| 후보 | 설명 | 라이선스 | 활성도 (2026-07) | Jarvis fit |
|---|---|---|---|---|
| [openWakeWord](https://github.com/dscripka/openWakeWord) | 오픈소스 wake word 프레임워크 (ONNX) | 코드 Apache-2.0 / **사전학습 모델 CC BY-NC-SA 4.0** (비상업) | 유지 중 (2026-01 활동 확인) | **브라우저 미지원 공식 입장** — 브라우저 오디오를 websocket으로 Python 서버에 스트리밍하는 예제 제공. 서버 필요 |
| [Picovoice Porcupine](https://github.com/picovoice/porcupine) | 상용 wake word 엔진 — WASM으로 **브라우저 내 온디바이스** 동작 | SDK Apache-2.0 / 엔진 proprietary, 무료 티어 AccessKey 필요 | 활발 (상용 유지) | 브라우저에서 "Jarvis" 커스텀 wake word 가능하나 OSS 아님 + 키 종속 |

판단: double clap은 wake word보다 구현이 단순하고(ML 불필요) 완전 브라우저-로컬 — Jarvis 컨셉(아이언맨)에도 부합. **직접 구현이 1순위**, wake word는 확장 옵션.

## 4. 실시간 STT

| 후보 | 설명 | 라이선스 | 활성도 (2026-07) | 브라우저/서버 | Jarvis fit |
|---|---|---|---|---|---|
| [Web Speech API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API) | 브라우저 내장 SpeechRecognition (OSS 아님) | 브라우저 내장 | 표준 — Chrome/Edge/Safari 지원, **Firefox 기본 비활성** | **브라우저** (단 Chrome은 오디오를 Google 서버로 전송) | 구현 비용 0 — Phase 1 최속 경로. 브라우저 편차·프라이버시가 약점 |
| [transformers.js + Whisper](https://github.com/xenova/whisper-web) (whisper-web) | Whisper ONNX를 브라우저에서 WASM/WebGPU 실행 — whisper-tiny/base 실시간 가능 | 라이브러리 Apache-2.0, 데모 MIT ⚠️ 미확인 / Whisper 모델 MIT | 활발 — transformers.js v4, WebGPU로 5–8x 실시간 | **브라우저** (모델 40–240MB 다운로드) | 완전 로컬 STT — 브라우저 전용 구성의 정공법. 초기 로드 비용 존재 |
| [whisper.cpp](https://github.com/ggml-org/whisper.cpp) | Whisper C/C++ 포트, ~51.2k ★ — stream.wasm 실시간 예제 포함 | MIT | 매우 활발 | 양쪽 (WASM 예제는 브라우저, 본체는 서버) | 서버 STT 후보 — k8s에 CPU로 띄우기 가장 가벼움 |
| [faster-whisper](https://github.com/SYSTRAN/faster-whisper) | CTranslate2 기반 Whisper 재구현 (4x 빠름), ~24k ★ | MIT | 유지 중 — v1.2.1 (2025-10) | **서버** | 서버 STT 정확도/속도 균형 최상 — GPU 있으면 1순위 |
| [RealtimeSTT](https://github.com/KoljaB/RealtimeSTT) | VAD + wake word + 실시간 전사 통합 라이브러리, ~10k ★ | MIT (엔진별 상위 라이선스 별도) | 유지 중 | **서버** (websocket 서버 예제 포함) | wake word→VAD→STT 파이프라인을 한 번에 — 확장 Phase 서버 구성의 골격 참고 |

## 5. TTS (응답 음성)

| 후보 | 설명 | 라이선스 | 활성도 (2026-07) | 브라우저/서버 | Jarvis fit |
|---|---|---|---|---|---|
| [kokoro-js](https://www.npmjs.com/package/kokoro-js) ([모델](https://huggingface.co/onnx-community/Kokoro-82M-v1.0-ONNX)) | Kokoro 82M TTS를 transformers.js/WASM으로 **브라우저에서** 실행 | Apache-2.0 (모델 가중치 포함) | 활발 — v1.2.x, 2026 업데이트 | **브라우저** | 브라우저 전용 구성의 1순위 — 품질 대비 82M 초경량, 단 영어 중심 (한국어 ⚠️ 미지원 추정) |
| [kokoro-onnx](https://github.com/thewh1teagle/kokoro-onnx) | Kokoro ONNX 서버/로컬 실행 (Python) | MIT ⚠️ 미확인 | 유지 중 | **서버** | 같은 모델을 서버에서 — 브라우저 로드 비용 회피 시 |
| [Piper](https://github.com/OHF-Voice/piper1-gpl) | 경량 로컬 신경망 TTS (VITS/ONNX, espeak-ng 내장) | **GPL-3.0** (구 rhasspy/piper MIT는 2025-10 아카이브) | 활발 — v1.4.2 2026-04 | **서버** | CPU에서 실시간, k8s 적합 — GPL이지만 별도 서비스로 격리 호출하면 전파 부담 낮음 |
| [Web Speech API speechSynthesis](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API) | 브라우저 내장 TTS (OSS 아님) | 브라우저 내장 | 표준 | **브라우저** | 구현 비용 0 — 품질은 OS 음성 의존, Jarvis 감성에는 부족 |

## 6. 풀스택 voice assistant 참고 (아키텍처 관점)

| 후보 | 설명 | 라이선스 | 활성도 (2026-07) | 참고 포인트 |
|---|---|---|---|---|
| [pipecat](https://github.com/pipecat-ai/pipecat) | 실시간 voice/multimodal 에이전트 Python 프레임워크, ~12.5k ★ | BSD-2-Clause | 매우 활발 (Daily 주도, NVIDIA 채택) | 프레임 기반 파이프라인(STT→LLM→TTS) 조립 패턴, JS/React 클라이언트 SDK — **서버 파이프라인 설계 참고 1순위** |
| [LiveKit Agents](https://github.com/livekit/agents) | WebRTC 기반 실시간 voice AI 에이전트 프레임워크, ~11k ★ | Apache-2.0 (turn-detection 모델은 별도 라이선스) | 매우 활발 — v1.6.5 2026-07 | WebRTC 전송 + turn detection + interruption 처리 — 저지연이 절실해지면 도입 후보 (LiveKit 서버 운영 필요) |
| [Leon](https://github.com/leon-ai/leon) | 오픈소스 개인 비서 (skill 구조), ~17.3k ★ | MIT ⚠️ 미확인 | 2.0 Developer Preview 진행 중 — 과도기 | "개인 비서" 제품 구조(스킬·메모리) 참고 — 코드 재사용성은 낮음 |
| [OpenVoiceOS](https://github.com/OpenVoiceOS) | Mycroft 계승 커뮤니티 voice assistant 플랫폼 | Apache-2.0 계열 (repo별 상이 ⚠️) | 활발 (2026-07 커밋 확인) | wake word→STT→intent→TTS 메시지 버스 아키텍처 참고 — 임베디드 지향이라 웹과는 거리 |

## 추천 조합

### Phase 1 — 최소 구성 (브라우저 위주, 서버 추가 없음)

| 구성요소 | 선택 | 근거 |
|---|---|---|
| Graph 뷰 | **react-force-graph** (MIT) | Next.js 직접 embed, Quartz 구조만 참고 |
| RAG chat | **Vercel AI SDK RAG 패턴 + pgvector** (Supabase `jarvis` schema) | 승인 스택 그대로, 통째 도입 불필요 |
| Wake (double clap) | **Web Audio API 직접 구현** | 전용 라이브러리 부재, 수십 줄 규모, 완전 로컬 |
| STT | **Web Speech API** (fallback: transformers.js Whisper) | 구현 비용 0으로 시작, Firefox/프라이버시 이슈 확인 후 교체 판단 |
| TTS | **kokoro-js** (Apache-2.0) 또는 speechSynthesis | 브라우저 로컬, Jarvis 음색 |

서버는 기존 Next.js API route(LLM proxy + retrieval)만 — k8s 신규 워크로드 0개.

### Phase 2 — 확장 구성 (서버 포함, k8s 1호 워크로드)

| 구성요소 | 선택 | 근거 |
|---|---|---|
| STT | **faster-whisper** (GPU) 또는 **whisper.cpp** (CPU) websocket 서비스 | 브라우저 편차 제거 + 정확도 향상. RealtimeSTT 파이프라인 골격 참고 |
| TTS | **Piper** (GPL-3.0, 별도 서비스 격리) 또는 kokoro-onnx | CPU 실시간, k8s 적합 |
| Wake word | openWakeWord (서버 스트리밍) — 단 모델 CC BY-NC-SA 주의 | double clap 만족스러우면 생략 |
| 파이프라인 | **pipecat** 아키텍처 참고 (통째 도입은 저지연 요구 확정 후) | STT→LLM→TTS 프레임 파이프라인 검증된 패턴 |

핵심 판단: Phase 1은 오픈소스 "통째 도입" 없이 라이브러리 2개(react-force-graph, kokoro-js)와 브라우저 API로 성립한다. 서버형 STT/TTS는 브라우저 구성의 실측 한계 확인 후 추가.

## Sources

- Quartz — https://github.com/jackyzha0/quartz
- react-force-graph — https://github.com/vasturiano/react-force-graph
- Cytoscape.js — https://github.com/cytoscape/cytoscape.js
- Khoj — https://github.com/khoj-ai/khoj
- AnythingLLM — https://github.com/Mintplex-Labs/anything-llm
- Open WebUI license — https://docs.openwebui.com/license/ / https://github.com/open-webui/open-webui/discussions/8467
- Vercel AI SDK RAG guide — https://ai-sdk.dev/cookbook/guides/rag-chatbot
- openWakeWord — https://github.com/dscripka/openWakeWord
- Porcupine — https://github.com/picovoice/porcupine / https://picovoice.ai/docs/quick-start/porcupine-web/
- Mozilla clap-sensing — https://hacks.mozilla.org/2018/02/making-a-clap-sensing-web-thing/
- clap-detector — https://github.com/tom-s/clap-detector
- whisper.cpp — https://github.com/ggml-org/whisper.cpp / https://ggml.ai/whisper.cpp/stream.wasm/
- faster-whisper — https://github.com/SYSTRAN/faster-whisper
- RealtimeSTT — https://github.com/KoljaB/RealtimeSTT
- whisper-web / transformers.js — https://github.com/xenova/whisper-web / https://huggingface.co/blog/transformersjs-v3
- Web Speech API — https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API / https://caniuse.com/speech-recognition
- Piper — https://github.com/OHF-Voice/piper1-gpl / https://github.com/rhasspy/piper
- Kokoro — https://huggingface.co/onnx-community/Kokoro-82M-v1.0-ONNX / https://www.npmjs.com/package/kokoro-js
- kokoro-onnx — https://github.com/thewh1teagle/kokoro-onnx
- pipecat — https://github.com/pipecat-ai/pipecat
- LiveKit Agents — https://github.com/livekit/agents
- Leon — https://github.com/leon-ai/leon
- OpenVoiceOS — https://github.com/OpenVoiceOS
