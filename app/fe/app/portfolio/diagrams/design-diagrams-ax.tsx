/* AX·업무 체계·agent 구현 도식 (2026-09-02).
   ⑥ Thready 개인 계정 AX — 앞단 지식 파이프라인 (mediness THRDY-BL-008 설계안, exploration)
   ⑦ Thready 개인 계정 AX — 뒷단 역할 그래프 (같은 설계안)
   ⑧ Mediness 제품 개발·의사결정 업무 분장 (mediness decision-process · 30-work template)
   ⑨ Thready AI application — 실제 구현된 agent 구조 (workspace:thready/ai/src/agent)
   사실 범위: wiki/evidence/projects/thready.md · mediness.md · thready-quality-lab.md, 그리고 위 source.
   공개 경계: provider 실명·내부 제품명(Thready 외)·사람 이름·내부 spec 번호는 적지 않는다.
   구현/설계 구분: MarkBadge("구현" = 운영 코드에서 확인, "설계" = 설계 문서만). */
import { Boundary, DesignFooter, DesignFrame, Link, Res, Sequence, StateMachine, StateTable, Timeline } from "./design-grammar";

/* ---------- ⑥ AX 앞단 · 지식 파이프라인 ---------- */
export function ThreadyAxPipelineDiagram() {
  return (
    <DesignFrame
      eyebrow="AX 설계 · 지식 파이프라인"
      title="Thready 개인 계정 AX ① — raw 원문은 wiki에 바로 쓰지 않는다"
      caption="「구현」은 운영 Thready 코드에서 확인된 요소, 「설계」는 설계 문서 단계다. 이 설계안은 exploration이며 제품 계약이 아니다. 설계와 콘텐츠 가져오기·생성·검수 workflow 구현은 직접 담당했다."
    >
      <div className="grid grid-cols-[minmax(0,0.9fr)_minmax(0,2.1fr)] gap-3 max-md:grid-cols-1">
        <Boundary label="고객이 제공·동의한 외부 원천" sub="명시 동의 범위만" tone="muted">
          <div className="grid gap-1.5">
            <Res label="Drive 폴더·파일" sub="계정 전체가 아니라 선택한 범위" mark="design" />
            <Res label="YouTube · 블로그 링크" sub="URL preview · 자막·본문" mark="impl" />
            <Res label="파일 · 메모 · 설문" mark="impl" />
            <Res label="본인 Threads 신규 게시물" sub="기존 수집 파이프라인 재사용 · 증분 감지" mark="design" tone="muted" />
          </div>
        </Boundary>
        <Boundary label="Thready runtime · 가공 단계" sub="원문 → 추출 → 제안 → 승인" tone="normal">
          <StateMachine
            chains={[
              {
                items: [
                  { kind: "state", label: "Source Registry", sub: "소유 · 동의 범위", mark: "impl" },
                  { kind: "edge", label: "허용 범위만" },
                  { kind: "state", label: "Raw Store", sub: "원문 · 시점 · 불변", mark: "design" },
                  { kind: "edge", label: "" },
                  { kind: "state", label: "Normalize", sub: "형식 · 중복", mark: "impl" },
                  { kind: "edge", label: "" },
                  { kind: "state", label: "Extract", sub: "사실 후보 · 원문 위치", mark: "impl" },
                ],
              },
              {
                items: [
                  { kind: "state", label: "LLM Curation", sub: "소재 · profile 해석 · 전략 변경 제안. 사실/해석/일회성 신호 구분", mark: "design", tone: "decision" },
                  { kind: "edge", label: "제안만" },
                  { kind: "state", label: "운영자 검토", sub: "승인 · 보류 · 수정 · 폐기", tone: "human", mark: "design" },
                  { kind: "edge", label: "승인된 항목만" },
                  { kind: "state", label: "wiki projection vN", sub: "승인 version만 노출", mark: "design", tone: "decision" },
                ],
              },
            ]}
          />
        </Boundary>
      </div>
      <div className="mt-3">
        <Boundary label="LLM wiki — 승인된 지식 view" sub="역할별 폴더가 아니라 지식의 성격으로 나눈다" tone="decision">
          <div className="grid grid-cols-3 gap-2 max-md:grid-cols-1">
            <Res label="policy" sub="안전 · 법무 · 플랫폼 금지. LLM 자율 변경 불가" tone="human" />
            <Res label="strategy-library" sub="공통 방법론. 공통화 승인 시만 갱신" />
            <div className="grid gap-1.5">
              <Res label="accounts/{account}/identity" sub="사실 · 해석 · 의도를 분리" tone="decision" />
              <Res label="accounts/{account}/evidence" sub="원문 참조 · 소재 후보 · 최신성" tone="decision" />
              <Res label="accounts/{account}/learning · trace" sub="선택·수정·judge·성과 / 생성 근거 이력" tone="decision" />
            </div>
          </div>
        </Boundary>
      </div>
      <div className="mt-6 border-t border-border pt-4">
        <StateTable
          label="지식 항목 상태별 처리"
          head={["상태", "진입 조건", "이 상태에서 하는 일", "다음 전이", "철회·정정 시", "관측·개입"]}
          rows={[
            { state: "raw", enter: "동의된 원천에서 수집", work: "원문·시점·checksum 보관. 원칙적으로 불변", ok: "extract 생성", fail: "권한 철회 → source 비활성. downstream 재검토", observe: "마지막 수집 시점" },
            { state: "extract", enter: "raw 존재", work: "텍스트·사실 후보·원문 위치. 추출기 개선 시 재생성 가능", ok: "LLM curation 입력", fail: "해당 raw 기준으로 다시 생성", observe: "추출물마다 raw 참조" },
            { state: "제안", tone: "decision", enter: "LLM curation", work: "변경 대상·근거·적용 범위 명시", ok: "운영자 승인 → projection", fail: "보류 · 수정 · 폐기", observe: "승인 대기 수" },
            { state: "projection vN", tone: "decision", enter: "승인", work: "역할별 read view. 승인 version만 노출", ok: "agent가 gateway로 읽음", fail: "영향받는 항목만 되돌리거나 폐기", observe: "version별 사용 trace" },
            { state: "trace", enter: "생성 완료", work: "읽은 version·근거·결과·평가. append-only", ok: "learning change request → 검토로 복귀", fail: "원문 철회 시 접근 차단 · 영향 범위 표시", observe: "회고 · 재현" },
          ]}
        />
      </div>
      <DesignFooter
        invariant="raw 원문은 wiki에 바로 쓰지 않는다. wiki에는 승인된 version만 올라간다. policy는 LLM이 바꾸지 않는다."
        rejected="모든 자료를 prompt에 붙이는 방식 · Drive를 유일한 Raw Store로 두고 생성 시마다 외부 원천을 읽는 방식 · 원문·추출·해석을 한 저장소에 섞는 방식"
        evidence="설계안(exploration) + 운영 코드의 콘텐츠 가져오기·URL preview·source ownership 검증. 파일럿 최소 범위는 운영자 등록 → 추출 → 제안 → 승인 → 초안·trace → learning 후보"
      />
    </DesignFrame>
  );
}

/* ---------- ⑦ AX 뒷단 · 역할 그래프 ---------- */
export function ThreadyAxRolesDiagram() {
  return (
    <DesignFrame
      eyebrow="AX 설계 · 역할 그래프"
      title="Thready 개인 계정 AX ② — agent는 gateway를 통해서만 승인된 지식을 읽는다"
      caption="Scout는 설계 단계, Friend(brand wizard)·Creator(writer)·Guard(referee·judge)·발행 시점 제안(scheduler)·사용자 발행 선택은 운영 구현이 확인된 요소다. 사람 게이트는 세 곳: 운영자 승인, Friend 개인화 confirm, 사용자 발행 선택."
    >
      <Sequence
        lanes={[
          { id: "gw", label: "Knowledge Gateway", sub: "계정 범위 · 권한 · 승인 version 필터" },
          { id: "sf", label: "Scout · Friend", sub: "소재(설계) · 정체성(구현)" },
          { id: "cg", label: "Creator · Guard", sub: "생성 · 검수" },
          { id: "user", label: "사용자" },
        ]}
        rows={[
          { kind: "step", lane: "gw", no: "01", label: "context pack 반환", sub: "목적·주제·최신성·권한에 맞춘 작은 pack. 모든 자료를 prompt에 붙이지 않는다", tone: "decision", mark: "design" },
          { kind: "arrow", from: "gw", to: "sf", label: "search_evidence · get_identity · get_learning" },
          { kind: "step", lane: "sf", no: "02", label: "Scout → material pack", sub: "이번 글의 소재 · 근거 citation · 최신성", mark: "design" },
          { kind: "step", lane: "sf", no: "03", label: "Friend → direction pack", sub: "brand wizard: extract → build → judge. 정체성·voice·관점을 제안하고 사람 confirm 뒤 반영", mark: "impl" },
          { kind: "step", lane: "sf", label: "사람 confirm", sub: "개인화 결과 확정", tone: "human", mark: "impl" },
          { kind: "arrow", from: "gw", to: "cg", label: "get_generation_context", sub: "identity · evidence · learning · strategy · policy의 필요한 version" },
          { kind: "step", lane: "cg", no: "04", label: "Creator → draft", sub: "planner/writer 생성 · 사용 citation · context version · generation trace", tone: "decision", mark: "impl" },
          { kind: "step", lane: "cg", no: "05", label: "Guard → 통과 / 수정 요청", sub: "referee prompt check(evaluate → recommend) · writer judge · 검수 이력. 콘텐츠 방향·개인 memory는 바꾸지 않음", mark: "impl" },
          { kind: "arrow", from: "cg", to: "user", label: "초안 + 발행 시점 제안", sub: "scheduler: 계정 성과 feature → candidate plan (LLM은 사유만)" },
          { kind: "step", lane: "user", no: "06", label: "즉시 발행 · 예약 · 안 씀", sub: "사람 확인 없는 자동 발행은 없음", tone: "human", mark: "impl" },
          { kind: "divider", label: "학습 루프" },
          { kind: "step", lane: "user", label: "Threads 발행 → 반응", sub: "선택·수정·반응이 학습 데이터", mark: "design" },
          { kind: "arrow", from: "user", to: "cg", label: "judge · 성과", tone: "fail" },
          { kind: "step", lane: "cg", label: "learning change request", sub: "trace의 평가 결과. wiki를 직접 덮지 않는다", tone: "fail", mark: "design" },
          { kind: "arrow", from: "cg", to: "gw", label: "앞단 운영자 검토로 복귀", tone: "fail" },
          { kind: "step", lane: "gw", label: "승인분만 다음 projection", sub: "장기 memory 자동 승격 없음", tone: "fail", mark: "design" },
        ]}
      />
      <div className="mt-6 border-t border-border pt-4">
        <StateTable
          label="역할별 계약 — 읽는 것 · 만드는 것 · 직접 바꾸지 않는 것"
          head={["역할", "읽는 정보 · tool", "만드는 결과", "다음 역할로", "직접 바꾸지 않는 것", "구현 상태"]}
          rows={[
            { state: "Scout", mark: "design", enter: "search_evidence — 주제·최신성·계정 범위의 승인 evidence", work: "material pack (소재 · citation · 최신성)", ok: "Friend · Creator 입력", fail: "raw·extract 처리, identity·strategy·policy", observe: "자동 소재화 계약만 선언. 트리거·주기·승인 흐름 미확정" },
            { state: "Friend", mark: "impl", tone: "decision", enter: "get_identity · get_learning · search_evidence", work: "direction pack (profile · voice · 관점 · 의도)", ok: "사람 confirm → Creator", fail: "raw 원문, 공통 strategy, 장기 memory 직접 승격", observe: "brand wizard graph(extract → build → judge)로 구현. gateway형 tool 계약은 설계" },
            { state: "Creator", mark: "impl", tone: "decision", enter: "get_generation_context — 필요한 version만 묶은 context pack", work: "draft · 사용 citation · generation trace", ok: "Guard", fail: "wiki 장기 지식, policy, 발행 승인", observe: "writer 역할 객체 + repair/judge 루프로 구현" },
            { state: "Guard", mark: "impl", enter: "draft · 적용 policy · evidence citation", work: "통과 / 수정 요청과 이유", ok: "사용자 선택", fail: "콘텐츠 방향 · 개인 memory", observe: "결정적 출구 검증 + writer judge + referee prompt check(evaluate → recommend → finalize)" },
          ]}
        />
      </div>
      <DesignFooter
        invariant="agent는 gateway가 돌려주는 승인 version만 읽는다. 평가 결과는 wiki를 직접 덮지 않고 앞단 검토로 되돌아간다. 발행 여부는 사용자가 정한다."
        rejected="production Scouter를 먼저 만드는 것 (동의 범위·수집 주기·승인 흐름이 미확정) · 사람 확인 없는 자동 발행 · 장기 memory 자동 승격"
        evidence="설계안의 역할 계약 표 + 운영 코드의 friend(brand wizard) · writer · referee(prompt check) · scheduler(발행 시점) 역할 객체와 예약·발행 화면. Scout의 production 구현은 주장하지 않는다"
      />
    </DesignFrame>
  );
}

/* ---------- ⑧ Mediness 업무 분장 ---------- */
export function MedinessWorkDivisionDiagram() {
  return (
    <DesignFrame
      eyebrow="업무 체계 · 역할 · 게이트"
      title="제품 개발·의사결정 업무 분장 — 판단은 사람이, 맥락 찾기와 추천은 agent가"
      caption="사람 이름·제품 수·담당 배치·전결 매트릭스는 적지 않는다. 짙은 박스가 본인 위치(Tech Lead · 백엔드 챕터 리더)다. 전사 문서 pipeline 규칙 정의는 다른 저자가 주도했고, 본인은 제품 단위 Decision·SPEC·Work Package·release gate 적용·운영을 리드했으며 회사 업무 AX 구조 설계에 참여했다."
    >
      <Boundary label="역할 구조" sub="역할 코드로 전결을 지정. 역할 → 사람 해소는 조직 서비스 조회" tone="platform">
        <div className="grid gap-2">
          <Res label="경영 결정 층" sub="회사 방향 · 계약과 제도 · 기술과 장애 체계 · 판매 방식을 축별로 확정. 축마다 전결권자가 다르다" tone="muted" />
          <Res label="본부장 · PO" sub="제품 방향 · 우선순위 · 일정 · UI/UX·STG 게이트 컨펌 (기획 리더 겸임)" />
          <div className="grid grid-cols-[minmax(0,2fr)_minmax(0,1fr)] gap-2 max-md:grid-cols-1">
            <Boundary label="제품 스쿼드 × N" sub="역할·책임은 같고 사람 배치만 다르다" tone="normal">
              <div className="grid grid-cols-5 gap-1.5 max-md:grid-cols-2">
                <Res label="Tech Lead" sub="구현 · 아키텍처 책임 · WBS · 우선순위 · 피드백 조율" tone="human" />
                <Res label="기획" sub="기능 · 정책 · UX 상세 확정" />
                <Res label="디자인" sub="화면 표현 최종 (전 스쿼드 겸임)" />
                <Res label="개발" sub="자기 태스크 스펙 작성 · 구현 (리더 합의 범위)" />
                <Res label="QA" sub="제품 단위 배치 · 검증 전략 · 판정 · 이슈 등록" />
              </div>
            </Boundary>
            <Boundary label="챕터 · 지원" sub="기준 수립 · 난제 (실행 지원)" tone="muted">
              <div className="grid gap-1.5">
                <Res label="백엔드 챕터 리더" sub="Tech Lead 겸임 · 챕터 기준 수립" tone="human" />
                <Res label="프론트 챕터 리더 · QA 리더" sub="QA 리소스 배분 · 검증 전략 컨펌" tone="muted" />
                <Res label="R&D · 경영지원" sub="기술 문의 상위선 · 외부 창구 · CS·VOC 수신" tone="muted" />
              </div>
            </Boundary>
          </div>
        </div>
      </Boundary>

      <div className="mt-4">
        <Boundary label="제품 실행 흐름 — 문서가 곧 실행 원장" sub="Decision → SPEC → Work Package → QA → release" tone="decision">
          <StateMachine
            chains={[
              {
                label: "제품 단위",
                items: [
                  { kind: "state", label: "Decision", sub: "범위 · 정책 · 벤더 · 비용 · 일정 결정 기록" },
                  { kind: "edge", label: "계약으로" },
                  { kind: "state", label: "SPEC", sub: "resource · status · enum · API 계약만 환류" },
                  { kind: "edge", label: "1 WP = 1 파일" },
                  { kind: "state", label: "Work Package", sub: "Owner lane: Backend · Frontend · QA · Ops", tone: "decision" },
                  { kind: "edge", label: "QA case 실행" },
                  { kind: "state", label: "Release Gate", sub: "Scope · Code · Spec · UX · QA · Approval", tone: "human" },
                  { kind: "edge", label: "version cut" },
                  { kind: "state", label: "release note · trace", sub: "릴리스 노트 자동화 · 버전 추적" },
                ],
              },
            ]}
          />
          <div className="mt-3 grid gap-1.5">
            <Link from="WP status" to="done" label="draft → in_dev → ready_for_qa → qa_blocked → ready_for_release" />
            <Link from="Release approval" to="release" label="Product · QA · Tech Lead · (범위·정책·비용·일정·고객 약속 변경 시) Decision Owner" tone="muted" />
          </div>
        </Boundary>
      </div>

      <div className="mt-6 border-t border-border pt-4">
        <StateTable
          label="의사결정 흐름 3분기 — 등록 안착과 수신자 (AI gate는 추천만, 확정은 사람)"
          head={["흐름", "보고자 → 수신자", "위임전결표에서 뽑는 것", "안착 상태 · 다음 사람 액션", "수신자 실명화 근거", "agent가 하는 일"]}
          rows={[
            { state: "결정 요청", tone: "decision", enter: "요청자 → 결정자", work: "그 사안 부문의 전결권자를 그대로 수신자로", ok: "Registered(결정 대기) → 결정자가 결정 → Decided", fail: "조직 서비스 조회 (역할 코드 → 사람)", observe: "맥락 찾기 · 실행안 정리 · 수신자 추천" },
            { state: "실행 요청", enter: "요청자 → 수행자", work: "전결권자 = 요청 정당성 체크 + 실행 라인 좁히기", ok: "Registered(실행 대기) → 수행자 착수 → Executing (결정 단계 스킵)", fail: "제품별 기획·개발·QA 담당 live read", observe: "동일" },
            { state: "공유", enter: "보고자 → 검토자", work: "전결권자 → 검토자. 「누가 시켰나」가 아니라 「이 사안 부문의 결재선」", ok: "Feedback에 직접 안착 → 결과 확인 → Done / Executing", fail: "조직 서비스 조회 (상급 라인)", observe: "동일. 명시 지목이 있으면 실재·활성만 확인" },
          ]}
        />
      </div>
      <div className="mt-6 border-t border-border pt-4">
        <StateTable
          label="의사결정 원장 상태별 처리 — 발생 → 등록 → 결정 → 실행 → 피드백 → 종료를 하나의 원장으로"
          rows={[
            { state: "Registered", enter: "폼 제출로 등록. 원장·추적 시작점", work: "흐름 유형에 따라 결정 대기 또는 실행 대기로 안착", ok: "Decided / Executing", fail: "Dropped (일반 업무 · 중복 · 기존 연결)", observe: "등록 전 Slack 탐색·추천·승인은 원장 상태가 아님" },
            { state: "Decided", tone: "decision", enter: "결정자 승인", work: "파생 실행 태스크 생성", ok: "Executing", fail: "OnHold (보류 → 재검토 / 종료 대기)", observe: "결정자 · 결정 시각" },
            { state: "Executing", enter: "실행 착수", work: "파생 태스크 진행", ok: "Feedback", fail: "Blocked (블로커로 멈춤) → 해소 시 복귀", observe: "blocker · 일정" },
            { state: "Feedback", enter: "실행 결과 보고 · 공유 흐름은 여기로 직접 안착", work: "결과 확인 루프", ok: "Done → Closed (회고까지)", fail: "Executing (추가 실행)", observe: "수신자 확인" },
            { state: "Closed · Dropped", tone: "fail", enter: "회고까지 마침 / 라이프사이클 없이 종료", work: "append된 event로 이력 보존", ok: "없음 (terminal)", fail: "없음", observe: "모든 전이는 decision_event append" },
          ]}
        />
      </div>
      <DesignFooter
        invariant="판단이 필요한 단계(우선순위 · 결정 · 배정 · 승인 · release)는 사람이 확정한다. 역할 → 사람은 문서가 아니라 조직 서비스가 해소한다."
        rejected="위임전결표 DB화(보류) · 사람 명단을 문서에 이중으로 두는 것 · 단일 장문 문서 (agent read 상한에 뒷부분이 잘려 결정자 칸이 비던 사고 → 8,000자 미만 파일로 분할)"
        evidence="제품 단위 Decision·SPEC·WP·release gate 적용·운영 기록 · release note 자동화 · 담당자가 바뀌어도 이어지는 인수인계 (수치 없음, 정성 표현까지만)"
      />
    </DesignFrame>
  );
}

/* ---------- ⑨ Thready AI application · 구현된 agent 구조 ---------- */
export function ThreadyAgentDiagram() {
  return (
    <DesignFrame
      eyebrow="구현 · 시퀀스 · 상태 머신"
      title="Thready AI application — 생성 1건이 graph·역할 객체·harness를 지나 terminal 상태에 닿는 순서"
      caption="역할은 LLM 지능만 소유하고 DB·transaction은 service가 소유한다. 재시도 여부는 AI 계층이 아니라 정책 계층(executor)이 정한다. provider 실명은 적지 않는다."
    >
      <Sequence
        lanes={[
          { id: "be", label: "제품 backend", sub: "원장 · authenticated HTTP client" },
          { id: "exec", label: "AI app · executor", sub: "attempt loop · 실패 번역" },
          { id: "graph", label: "generation graph", sub: "scout 노드 · writer 노드" },
          { id: "harness", label: "harness · tools", sub: "provider별 3종 · 같은 protocol" },
        ]}
        rows={[
          { kind: "step", lane: "be", no: "01", label: "생성 요청", sub: "소재 · 옵션 · 모델 선택. 원장은 backend가 소유", tone: "decision" },
          { kind: "arrow", from: "be", to: "exec", label: "HTTP" },
          { kind: "step", lane: "exec", no: "02", label: "PENDING → RUNNING", sub: "quota reservation. admission gate = charge + active reservation" },
          { kind: "arrow", from: "exec", to: "graph", label: "attempt n (상한 있음)" },
          { kind: "step", lane: "graph", no: "03", label: "소재 유무 판정 (scout)", sub: "쓸 재료가 없으면 여기서 끝" },
          { kind: "step", lane: "graph", no: "04", label: "요청 적대성 판정 (writer)", sub: "injection · policy bypass. 저비용 소형 모델 → 걸리면 끝" },
          { kind: "step", lane: "graph", no: "05", label: "소스 정규화 (scout)", sub: "URL · 자막 · PDF 원문을 rule-based로 통째 조립. LLM 유용성 판정 없음" },
          { kind: "step", lane: "graph", no: "06", label: "생성 위임 (writer)", sub: "prompt 조립 → 실행 1턴 → 출구 검증 → judge → 보정 턴(상한 있음, 같은 세션) → accept · best quality · salvage", tone: "decision" },
          { kind: "arrow", from: "graph", to: "harness", label: "실행 · 보정 턴" },
          { kind: "step", lane: "harness", no: "07", label: "one-shot 통짜 위임", sub: "tool = 소재 picker (browse → read). 구조화 출력 실패는 예외가 아니라 repair 대상" },
          { kind: "arrow", from: "exec", to: "be", label: "SUCCESS · 결과 · trace" },
          { kind: "step", lane: "be", label: "결과 반영 · quota consumed", sub: "게시글 후보 · 사용 citation" },
          { kind: "divider", label: "실패 분기" },
          { kind: "step", lane: "harness", label: "provider failure 값 객체", sub: "무엇이 실패했나만 보고. retryable 필드 없음", tone: "fail" },
          { kind: "step", lane: "exec", label: "재시도 판정", sub: "일시 장애 · 원인 불명 → 재시도. rate limit · quota · 잘못된 요청 · timeout · 소스·guard 실패 → 비재시도", tone: "fail" },
          { kind: "arrow", from: "exec", to: "graph", label: "지수 backoff + jitter 뒤 재시도", tone: "fail" },
          { kind: "step", lane: "exec", label: "상한 소진 · 비재시도 → FAILED", sub: "정규화된 failure reason · attempt trace 병합 · quota release", tone: "fail" },
          { kind: "step", lane: "be", label: "사용자 수동 재시도", sub: "실패 generation의 옵션으로 새 generation. 자동 provider failover 없음 (규모 판단)", tone: "human" },
        ]}
      />
      <div className="mt-6 border-t border-border pt-4">
        <StateTable
          label="generation 상태별 처리"
          rows={[
            { state: "PENDING", enter: "backend 요청 수락. quota reserved", work: "worker 실행 대기. admission gate 계산에 포함", ok: "worker 시작 → RUNNING", fail: "취소 → CANCELLED", observe: "대기 수 · 복구 surface" },
            { state: "RUNNING", tone: "decision", enter: "worker 시작", work: "attempt loop. graph 4노드 · repair 루프 · trace 기록", ok: "반환 가능한 결과 ≥ 1 → SUCCESS (quota consumed)", fail: "재시도 소진·비재시도 → FAILED / 사용자 취소 → CANCELLED (quota consumed)", observe: "attempt · 노드별 trace · 소재 질의 누적" },
            { state: "SUCCESS", enter: "결과 생성", work: "종료. 결과·citation·trace 보존", ok: "없음 (terminal)", fail: "없음", observe: "quota charge 대상" },
            { state: "FAILED", tone: "fail", enter: "결과 0개", work: "정규화된 failure reason (source · provider · guard · output). quota reservation release", ok: "사용자 수동 재시도 (새 generation)", fail: "없음", observe: "reason별 집계 · Sentry" },
            { state: "CANCELLED", tone: "fail", enter: "실행 시작 후 사용자 취소", work: "종료. 시작 후 취소는 quota consumed", ok: "없음", fail: "없음", observe: "취소 시각" },
          ]}
        />
      </div>
      <div className="mt-6 border-t border-border pt-4">
        <span className="mb-3 block font-mono text-[10.5px] tracking-[0.06em] text-muted">역할 객체 — 각 역할은 자기 graph를 갖고, 조립은 agent 최상위가 한다</span>
        <div className="grid grid-cols-3 gap-2 max-md:grid-cols-1">
          <Res label="Scout" sub="소재 입력 판정 · 정규화 (구현). 자동 소재화 Scouter는 계약만 선언 (설계)" mark="impl" />
          <Res label="Writer" sub="생성 지능 역할 객체. prompt 조립 · harness 실행 · 출구 검증 · judge · repair · salvage" mark="impl" tone="decision" />
          <Res label="Friend" sub="brand 정체성 제안 graph: extract → build → judge" mark="impl" />
          <Res label="Referee" sub="prompt check: evaluate → (score < threshold일 때만) recommend → finalize. 통과 시 LLM 1회" mark="impl" />
          <Res label="Scheduler" sub="분석 feature → LLM이 바꿀 수 없는 발행 시간 candidate plan. LLM은 사유 문장만" mark="impl" />
          <Res label="공용 tool" sub="소재 선별 tool (훑기 → 읽기 2단) · 소스 추출 (URL · 자막 · PDF)" mark="impl" />
        </div>
      </div>
      <DesignFooter
        invariant="역할은 LLM 지능만 소유한다. 판정은 그 입력을 아는 역할 안에 둔다 (소재 유무 = scout, 요청 적대성 = writer). 재시도 정책은 실행 계층이 소유한다."
        rejected="plan → generate → fact guard 3노드 + repair loop의 구 graph 엔진 (agent 엔진이 전 환경 게이트를 통과한 뒤 폐기) · 소스 map/reduce 압축과 LLM 유용성 분석 (긴 컨텍스트에 원본을 통째로) · 자동 circuit breaker·failover (당시 규모에서 운영 이점이 작다고 판단)"
        evidence="backend·AI application 전체 회귀 · repair/judge 루프의 발행 계약 검증 · 5xx 분류·재시도·terminal failure 검증. AI application 코드 변경의 대부분이 본인 author (git 기준)"
      />
    </DesignFrame>
  );
}

/* ---------- ⑩ SAY 실시간 전사 · 겹치는 세션 구조 ---------- */
export function SayOverlapSessionDiagram() {
  return (
    <DesignFrame
      eyebrow="구조 · 시간축 · 실패 흡수"
      title="실시간 전사 — 외부 모델 세션이 발화 중간에 끊겨도 전사가 멈추지 않는 구조"
      caption="외부 실시간 음성 모델의 세션이 통제할 수 없는 시점에 종료되던 문제를, 모델 교체가 오기 전까지 구조로 흡수했다. 빗금은 두 세션이 같은 구간을 듣는 겹침이고, 점선은 끊긴 세션이다. 모델 교체 뒤 이 우회 구조는 걷어냈다."
    >
      <Timeline
        units={12}
        axis={{ start: "발화 시작", end: "시간" }}
        lanes={[
          { label: "오디오 입력", sub: "연속 발화", bars: [{ start: 0, end: 12, label: "끊기지 않는 하나의 흐름", tone: "muted" }] },
          {
            label: "세션 A",
            sub: "자기 window만 듣는다",
            bars: [
              { start: 0, end: 2, label: "window" },
              { start: 2, end: 3, label: "겹침", tone: "overlap" },
              { start: 3, end: 4, label: "세션 종료", sub: "발화 중간 · 통제 불가", tone: "fail" },
              { start: 6, end: 8, label: "새 세션" },
              { start: 8, end: 10, label: "겹침", tone: "overlap" },
            ],
          },
          {
            label: "세션 B",
            sub: "stagger만큼 늦게 시작",
            bars: [
              { start: 2, end: 3, label: "겹침", tone: "overlap" },
              { start: 3, end: 5, label: "A가 놓친 구간을 이미 듣고 있다", tone: "decision" },
              { start: 5, end: 6, label: "겹침", tone: "overlap" },
              { start: 8, end: 10, label: "겹침", tone: "overlap" },
              { start: 10, end: 12, label: "window" },
            ],
          },
          {
            label: "세션 C",
            sub: "풀 크기만큼 순환",
            bars: [
              { start: 5, end: 6, label: "겹침", tone: "overlap" },
              { start: 6, end: 8, label: "window" },
              { start: 8, end: 9, label: "겹침", tone: "overlap" },
            ],
          },
          {
            label: "병합 · 하류",
            sub: "순서는 sequence가 정한다",
            bars: [
              { start: 0, end: 3, label: "A", sub: "COMPLETE", tone: "decision" },
              { start: 3, end: 6, label: "B", sub: "A의 빈 구간을 B가 잇는다", tone: "decision" },
              { start: 6, end: 9, label: "C", sub: "COMPLETE", tone: "decision" },
              { start: 9, end: 12, label: "A · B", sub: "COMPLETE", tone: "decision" },
            ],
          },
        ]}
        markers={[{ at: 3, label: "세션 하나가 죽는 순간, 이웃 세션이 같은 구간을 듣고 있다" }]}
      />
      <div className="mt-6 border-t border-border pt-4">
        <StateTable
          label="구성 요소별 책임 — 각 부품은 자기 실패만 안다"
          head={["구성 요소", "받는 것", "책임", "내보내는 것", "실패했을 때", "모르는 것"]}
          rows={[
            { state: "Slicer", enter: "연속 오디오", work: "window가 stagger보다 길게 잘라, 어느 순간에도 두 세션 이상이 같은 구간을 듣게 한다", ok: "겹치는 window", fail: "없음 (결정적)", observe: "세션 상태" },
            { state: "세션 풀", tone: "decision", enter: "window", work: "동시 N개 세션. 각 세션은 자기 window만 담당하고 끝나면 다음 window로 순환", ok: "세션별 전사 조각", fail: "세션 종료·timeout은 그 window 하나만 잃는다. 풀은 계속 돈다", observe: "다른 세션의 진행" },
            { state: "세션별 버퍼", enter: "전사 조각", work: "세션 안에서 순서를 지키고, 문장 종결 부호에서 COMPLETE로 자른다. 재연결 시 버퍼를 비운다", ok: "COMPLETE + sequence", fail: "부분 문장은 다음 조각과 이어 붙인다", observe: "다른 세션의 버퍼" },
            { state: "병합기", tone: "decision", enter: "여러 세션의 COMPLETE", work: "세션이 아니라 sequence 기준으로 하나의 흐름으로 정렬한다", ok: "순서 있는 전사 스트림", fail: "빠진 sequence는 기다리지 않고 다음으로 넘긴다 (실시간 우선)", observe: "어느 세션이 죽었는지" },
            { state: "하류 트리거", enter: "COMPLETE", work: "advice·추천 판단을 시작한다", ok: "상담 조언", fail: "COMPLETE가 늦으면 늦게 시작할 뿐, 멈추지 않는다", observe: "세션 풀의 존재" },
          ]}
        />
      </div>
      <DesignFooter
        invariant="세션 하나가 죽어도 전사는 멈추지 않는다. 겹침은 window > stagger에서 나오고, 순서는 세션이 아니라 sequence가 정한다."
        rejected="단일 세션 + 재연결 (끊긴 구간이 그대로 유실되고, 재연결 타이머 경합이 약 1분 시점 응답 중단을 만들었다) · 모델 교체를 기다리며 기능을 세워 두는 것"
        evidence="개발 test로 풀 크기와 window·stagger를 정한 뒤 dev/stg에 적용. 동시 세션 수만큼 비용이 늘고 첫 응답이 늦어지는 손실은 문서로 명시. 모델 교체 뒤 레거시 provider와 함께 제거"
      />
    </DesignFrame>
  );
}
