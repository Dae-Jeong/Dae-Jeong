/* 흐름형(swimlane) 도식 (2026-09-03). 백엔드 사례는 lane×time 시퀀스보다 node→edge 흐름이 관례에 가깝다.
   열 = 서비스 경계, 실선 = 정상, 점선 = 실패, 마름모 = 판단, 짙은 박스 = 사람 개입, 원통 = 저장소.
   공개 수준: 패턴 (rules/application-copy-standard §2-1). 사실 범위: 각 claim의 allowed_copy. */
import { Compare, DesignFooter, DesignFrame, StateMachine, StateTable } from "./design-grammar";
import { Flow } from "./flow";

/* ---------- Outbox ---------- */
export function OutboxSwimlaneDiagram() {
  return (
    <DesignFrame
      eyebrow="흐름 · 실패 분기"
      title="Outbox durable delivery — 원장 변경이 다른 서비스의 replica에 도달하는 흐름과 실패 경계"
      caption="열은 서비스 경계다. 실선은 정상, 점선은 실패 경로, 마름모는 판단, 짙은 박스는 사람 개입, 원통은 저장소."
    >
      <Flow
        lanes={[
          { id: "owner", label: "원장 서비스", sub: "원장 owner · RDB" },
          { id: "relay", label: "전달자", sub: "relay · lease" },
          { id: "consumer", label: "소비 서비스", sub: "replica · 멱등 consumer" },
        ]}
        nodes={[
          { id: "mut", lane: "owner", row: 0, no: "01", label: "원장 변경 + outbox row", sub: "같은 transaction에서 commit", tone: "decision" },
          { id: "row", lane: "owner", row: 1, kind: "store", label: "outbox row · 대기", sub: "version · attempt" },
          { id: "claim", lane: "relay", row: 1, no: "02", label: "lease claim", sub: "짧은 lease · attempt +1 = fencing token" },
          { id: "put", lane: "relay", row: 2, label: "PUT", sub: "version · attempt를 함께 보낸다" },
          { id: "fence", lane: "consumer", row: 2, kind: "decision", label: "version > 현재?" },
          { id: "upsert", lane: "consumer", row: 3, no: "03", label: "멱등 upsert / delete", sub: "stable id·natural key 충돌은 최신 row 하나로", tone: "decision" },
          { id: "noop", lane: "consumer", row: 4, label: "no-op", sub: "역순·중복 도착. 최신 상태를 덮지 않음", tone: "fail" },
          { id: "ok", lane: "relay", row: 4, kind: "decision", label: "응답 성공?" },
          { id: "done", lane: "relay", row: 5, kind: "end", label: "전달 완료", tone: "decision" },
          { id: "retry", lane: "relay", row: 6, kind: "decision", label: "attempt < max?", sub: "lease 만료 뒤" },
          { id: "failed", lane: "relay", row: 7, label: "terminal FAILED", sub: "version · attempt · 원인 보존", tone: "fail" },
          { id: "ops", lane: "owner", row: 7, kind: "human", label: "운영자 확인", sub: "실패 row를 원장 쪽에서 조회" },
        ]}
        edges={[
          { from: "mut", to: "row" },
          { from: "row", to: "claim" },
          { from: "claim", to: "put" },
          { from: "put", to: "fence" },
          { from: "fence", to: "upsert", label: "예" },
          { from: "fence", to: "noop", label: "아니오", tone: "fail" },
          { from: "upsert", to: "ok", label: "2xx" },
          { from: "noop", to: "ok", label: "2xx (no-op)", tone: "fail" },
          { from: "ok", to: "done", label: "성공" },
          { from: "ok", to: "retry", label: "실패 · worker 중단", tone: "fail" },
          { from: "retry", to: "row", label: "예 · 다른 worker가 재점유", tone: "fail" },
          { from: "retry", to: "failed", label: "아니오", tone: "fail" },
          { from: "failed", to: "ops", tone: "fail" },
        ]}
      />
      <div className="mt-6 border-t border-border pt-4">
        <StateTable
          label="outbox row 상태별 처리"
          rows={[
            { state: "대기", sub: "재시도 가능", enter: "원장 mutation과 같은 transaction에서 insert. 또는 attempt < max인 실패 뒤 lease 만료", work: "아무것도 하지 않는다. relay가 claim할 때까지 row가 보존된다", ok: "relay claim → 점유", fail: "없음", observe: "대기 row 수 · 가장 오래된 row age" },
            { state: "점유", sub: "lease 보유", tone: "decision", enter: "relay가 짧은 lease로 row를 claim하고 attempt를 올린다", work: "version·attempt를 fencing token으로 붙여 replica에 PUT/DELETE", ok: "consumer가 fence 통과 후 반영 또는 no-op → 전달 완료", fail: "응답 실패·worker 중단 → lease 만료. attempt < max면 대기로 복귀, = max면 terminal FAILED", observe: "lease 만료 뒤 다른 worker의 재점유 횟수" },
            { state: "전달 완료", enter: "consumer 응답 성공", work: "종료. 같은 version이 다시 와도 consumer가 no-op으로 끝낸다", ok: "없음 (terminal)", fail: "없음", observe: "version별 전달 지연" },
            { state: "terminal FAILED", tone: "fail", enter: "최대 시도 소진. 또는 중단된 마지막 claim의 lease 만료", work: "version·attempt·원인을 보존하고 자동 재시도를 멈춘다", ok: "없음. 운영자 판단", fail: "없음", observe: "운영자가 원장 쪽에서 실패 row 조회" },
          ]}
        />
      </div>
      <DesignFooter
        invariant="원장과 outbox row는 함께 commit되거나 함께 실패한다. replica는 더 높은 version만 받아들인다."
        rejected="DB 공유(서비스 경계 붕괴) · dual-write(원장만 성공하고 전달 유실)"
        evidence="양쪽 서비스 전체 회귀, migration 왕복, stale PUT/DELETE fence test"
      />
    </DesignFrame>
  );
}

/* ---------- 주문·알림 worker ---------- */
export function BayWorkerFlowDiagram() {
  return (
    <DesignFrame
      eyebrow="흐름 · 상태 승격"
      title="주문·알림 worker — API 응답과 알림 완료를 분리하고 실패를 주문 상태로 승격"
      caption="알림 job은 고정 간격으로 상한 횟수까지 재시도한다. 공급사 알림이 모두 성공해야 주문이 다음 상태로, 하나라도 최종 실패면 실패 상태로 바뀐다. 큐·채널 제품명과 횟수는 적지 않는다."
    >
      <Flow
        lanes={[
          { id: "api", label: "주문 API", sub: "transaction 경계" },
          { id: "worker", label: "알림 worker", sub: "queue · worker" },
          { id: "ext", label: "외부 채널", sub: "메시지 발송 API" },
        ]}
        nodes={[
          { id: "order", lane: "api", row: 0, no: "01", label: "자동 발주 → 주문 생성", sub: "transaction commit · 주문 CREATED", tone: "decision" },
          { id: "policy", lane: "api", row: 1, no: "02", label: "알림 policy", sub: "병원: 묶음 1건 · 공급사: 주문별 N건" },
          { id: "queue", lane: "worker", row: 1, kind: "store", label: "job · PENDING", sub: "API는 여기서 응답" },
          { id: "send", lane: "worker", row: 2, no: "03", label: "SENDING", sub: "worker가 job을 집는다" },
          { id: "sent", lane: "ext", row: 2, kind: "decision", label: "발송 성공?" },
          { id: "success", lane: "worker", row: 3, kind: "end", label: "SUCCESS", tone: "decision" },
          { id: "again", lane: "worker", row: 4, kind: "decision", label: "재시도 남음?", sub: "고정 간격" },
          { id: "jfail", lane: "worker", row: 5, label: "FAILED", sub: "최종 실패 이력 기록", tone: "fail" },
          { id: "agg", lane: "api", row: 4, kind: "decision", label: "공급사 알림 모두 SUCCESS?" },
          { id: "pending", lane: "api", row: 5, kind: "end", label: "주문 PENDING", tone: "decision" },
          { id: "ofail", lane: "api", row: 6, label: "주문 FAILED", sub: "원인·상태 보존. 숨기지 않는다", tone: "fail" },
          { id: "resend", lane: "api", row: 7, kind: "human", label: "수동 재발송 API", sub: "조건 검증 뒤 운영자가 재처리" },
        ]}
        edges={[
          { from: "order", to: "policy" },
          { from: "policy", to: "queue", label: "enqueue" },
          { from: "queue", to: "send" },
          { from: "send", to: "sent", label: "발송" },
          { from: "sent", to: "success", label: "성공" },
          { from: "sent", to: "again", label: "실패", tone: "fail" },
          { from: "again", to: "send", label: "예 · 간격 뒤", tone: "fail" },
          { from: "again", to: "jfail", label: "아니오", tone: "fail" },
          { from: "success", to: "agg", label: "집계" },
          { from: "jfail", to: "agg", label: "최종 실패", tone: "fail" },
          { from: "agg", to: "pending", label: "예" },
          { from: "agg", to: "ofail", label: "아니오", tone: "fail" },
          { from: "ofail", to: "resend", tone: "fail" },
          { from: "resend", to: "queue", label: "새 job", tone: "fail" },
        ]}
      />
      <div className="mt-6 border-t border-border pt-4">
        <StateTable
          label="알림 job · 주문 상태별 처리"
          rows={[
            { state: "PENDING", sub: "job", enter: "주문 transaction commit 뒤 알림 policy가 enqueue", work: "queue에서 대기. API는 이미 응답을 돌려준 상태", ok: "worker 수신 → SENDING", fail: "없음", observe: "큐 적체" },
            { state: "SENDING", sub: "job", tone: "decision", enter: "worker가 job을 집는다", work: "외부 발송 API 호출", ok: "응답 성공 → SUCCESS", fail: "오류 → 고정 간격 재시도. 상한 소진 → FAILED", observe: "시도 횟수 · 마지막 오류" },
            { state: "FAILED", sub: "job", tone: "fail", enter: "재시도 상한 소진", work: "최종 실패 이력 기록. 자동 재시도 없음", ok: "수동 재발송 → 새 job PENDING", fail: "없음", observe: "운영자가 실패 이력·재발송 조건 확인" },
            { state: "CREATED", sub: "주문", enter: "자동 발주 engine이 주문 commit", work: "알림 policy 호출", ok: "공급사 알림 모두 SUCCESS → PENDING", fail: "하나라도 최종 FAILED → FAILED", observe: "CREATED에 머무는 주문 수" },
            { state: "FAILED", sub: "주문", tone: "fail", enter: "공급사 알림 중 최종 실패 존재", work: "원인·상태 보존", ok: "전용 API에서 조건 검증 뒤 수동 재발송", fail: "없음", observe: "운영자 화면에서 실패 주문 조회" },
          ]}
        />
      </div>
      <DesignFooter
        invariant="API 응답은 알림 완료를 뜻하지 않는다. 실패는 숨기지 않고 주문 상태와 이력에 남긴다."
        rejected="기존 task queue 유지(asyncio 실행 모델과 맞지 않음) · API 안에서 알림 완료를 기다리는 동기 처리"
        evidence="API test infrastructure · Docker CI · 재고 worker의 동일 retry 경계"
      />
    </DesignFrame>
  );
}

/* ---------- Thready AI application ---------- */
export function ThreadyAgentFlowDiagram() {
  return (
    <DesignFrame
      eyebrow="흐름 · 역할 객체 · 재시도"
      title="AI 생성 파이프라인 — 생성 1건이 graph·역할 객체·harness를 지나 terminal 상태에 닿는 흐름"
      caption="역할은 LLM 지능만 소유하고 DB·transaction은 service가 소유한다. 재시도 여부는 AI 계층이 아니라 실행 계층이 정한다. provider 실명은 적지 않는다."
    >
      <Flow
        lanes={[
          { id: "be", label: "제품 backend", sub: "원장 · authenticated client" },
          { id: "exec", label: "실행 계층", sub: "attempt loop · 실패 번역" },
          { id: "graph", label: "generation graph", sub: "scout 노드 · writer 노드" },
          { id: "harness", label: "harness · tools", sub: "provider별 구현 · 같은 protocol" },
        ]}
        nodes={[
          { id: "req", lane: "be", row: 0, no: "01", label: "생성 요청", sub: "소재 · 옵션 · 모델 선택", tone: "decision" },
          { id: "run", lane: "exec", row: 0, no: "02", label: "PENDING → RUNNING", sub: "quota reservation · admission gate" },
          { id: "attempt", lane: "exec", row: 1, label: "attempt n", sub: "상한 있음" },
          { id: "g1", lane: "graph", row: 1, kind: "decision", label: "쓸 소재가 있나?", sub: "scout" },
          { id: "g2", lane: "graph", row: 2, kind: "decision", label: "요청이 적대적인가?", sub: "writer · 소형 모델" },
          { id: "g3", lane: "graph", row: 3, label: "소스 정규화", sub: "URL·자막·PDF 원문을 통째로. LLM 판정 없음" },
          { id: "g4", lane: "graph", row: 4, no: "03", label: "생성 위임 (writer)", sub: "prompt 조립 → 실행 → 출구 검증 → judge", tone: "decision" },
          { id: "h1", lane: "harness", row: 4, label: "실행 1턴 · 보정 턴", sub: "tool = 소재 선별 (훑기 → 읽기)" },
          { id: "judge", lane: "graph", row: 5, kind: "decision", label: "출구 검증·judge 통과?" },
          { id: "result", lane: "graph", row: 6, kind: "end", label: "결과 · trace", tone: "decision" },
          { id: "stop", lane: "graph", row: 7, label: "종료 · 사유 기록", sub: "guard 실패는 재시도 대상 아님", tone: "fail" },
          { id: "pf", lane: "harness", row: 6, label: "provider failure 값 객체", sub: "무엇이 실패했나만 보고", tone: "fail" },
          { id: "retry", lane: "exec", row: 6, kind: "decision", label: "재시도 가능?", sub: "일시 장애·원인 불명만" },
          { id: "failed", lane: "exec", row: 7, label: "FAILED", sub: "정규화된 사유 · trace 병합 · quota release", tone: "fail" },
          { id: "apply", lane: "be", row: 6, kind: "end", label: "결과 반영 · quota consumed", tone: "decision" },
          { id: "manual", lane: "be", row: 7, kind: "human", label: "사용자 수동 재시도", sub: "실패 generation의 옵션으로 새 generation" },
        ]}
        edges={[
          { from: "req", to: "run", label: "HTTP" },
          { from: "run", to: "attempt" },
          { from: "attempt", to: "g1" },
          { from: "g1", to: "g2", label: "예" },
          { from: "g2", to: "g3", label: "아니오" },
          { from: "g3", to: "g4" },
          { from: "g4", to: "h1", label: "run" },
          { from: "h1", to: "judge", label: "구조화 출력" },
          { from: "judge", to: "result", label: "통과" },
          { from: "judge", to: "h1", label: "보정 턴 (상한)", tone: "fail" },
          { from: "g1", to: "stop", label: "아니오", tone: "fail", side: "left" },
          { from: "g2", to: "stop", label: "예", tone: "fail", side: "left" },
          { from: "result", to: "apply" },
          { from: "h1", to: "pf", label: "SDK 예외", tone: "fail" },
          { from: "pf", to: "retry", tone: "fail" },
          { from: "retry", to: "attempt", label: "예 · backoff", tone: "fail" },
          { from: "retry", to: "failed", label: "아니오 · 상한", tone: "fail" },
          { from: "failed", to: "manual", tone: "fail" },
        ]}
      />
      <div className="mt-6 border-t border-border pt-4">
        <StateTable
          label="generation 상태별 처리"
          rows={[
            { state: "PENDING", enter: "backend 요청 수락. quota reserved", work: "worker 실행 대기. admission gate 계산에 포함", ok: "worker 시작 → RUNNING", fail: "취소 → CANCELLED", observe: "대기 수 · 복구 surface" },
            { state: "RUNNING", tone: "decision", enter: "worker 시작", work: "attempt loop. graph 4노드 · 보정 루프 · trace 기록", ok: "반환 가능한 결과 ≥ 1 → SUCCESS (quota consumed)", fail: "재시도 소진·비재시도 → FAILED / 사용자 취소 → CANCELLED", observe: "attempt · 노드별 trace" },
            { state: "SUCCESS", enter: "결과 생성", work: "종료. 결과·citation·trace 보존", ok: "없음 (terminal)", fail: "없음", observe: "quota charge 대상" },
            { state: "FAILED", tone: "fail", enter: "결과 0개", work: "정규화된 failure reason (source · provider · guard · output). quota release", ok: "사용자 수동 재시도 (새 generation)", fail: "없음", observe: "reason별 집계 · 오류 추적" },
          ]}
        />
      </div>
      <DesignFooter
        invariant="역할은 LLM 지능만 소유한다. 판정은 그 입력을 아는 역할 안에 둔다 (소재 유무 = scout, 요청 적대성 = writer). 재시도 정책은 실행 계층이 소유한다."
        rejected="plan → generate → fact guard 3노드 + repair loop의 구 graph 엔진 (agent 엔진이 전 환경 게이트를 통과한 뒤 폐기) · 소스 map/reduce 압축과 LLM 유용성 분석 · 자동 circuit breaker·failover (당시 규모에서 운영 이점이 작다고 판단)"
        evidence="backend·AI application 전체 회귀 · 보정/judge 루프의 발행 계약 검증 · 5xx 분류·재시도·terminal failure 검증. friend·referee·scheduler 역할 객체도 같은 규칙으로 구현"
      />
    </DesignFrame>
  );
}

/* ---------- 운영 DB 분리 이관 ---------- */
export function SplitMigrationFlowDiagram() {
  return (
    <DesignFrame
      eyebrow="흐름 · 검증 gate"
      title="운영 DB 분리 이관 — 리허설 → FK 순서 copy → 지문 대조 → cutover → 기능 E2E gate"
      caption="한 DB에 있던 두 서비스의 데이터를 서비스별 DB로 나눌 때의 절차다. 건수는 적지 않는다. 배포 성공과 기능 정상 동작을 분리해 본 것이 핵심이다."
    >
      <Flow
        lanes={[
          { id: "src", label: "원본 DB", sub: "제품 backend 소유" },
          { id: "proc", label: "이관 절차", sub: "gate마다 멈출 수 있다" },
          { id: "dst", label: "독립 DB", sub: "AI application 소유" },
        ]}
        nodes={[
          { id: "dump", lane: "src", row: 0, kind: "store", label: "STG dump" },
          { id: "reh", lane: "proc", row: 0, no: "01", label: "local 복원 리허설", sub: "schema · history migration 먼저" },
          { id: "g1", lane: "proc", row: 1, kind: "decision", label: "migration 왕복 성공?" },
          { id: "stop1", lane: "src", row: 1, label: "중단", sub: "운영에 손대기 전", tone: "fail" },
          { id: "copy", lane: "proc", row: 2, no: "02", label: "FK 순서 streaming copy", sub: "parent → child. 영구 cross-DB link 없음", tone: "decision" },
          { id: "tables", lane: "src", row: 2, kind: "store", label: "원본 table" },
          { id: "replica", lane: "dst", row: 2, kind: "store", label: "replica table" },
          { id: "g2", lane: "proc", row: 3, kind: "decision", label: "지문 일치 · orphan 0?", sub: "count + 상태·사유 결합 hash" },
          { id: "stop2", lane: "src", row: 3, label: "cutover 안 함", sub: "해당 table 재복사", tone: "fail" },
          { id: "cut", lane: "proc", row: 4, kind: "human", label: "cutover", sub: "backend 설정만 전환. 데이터는 손대지 않음" },
          { id: "svc", lane: "dst", row: 4, label: "독립 서비스 · DB", sub: "health · 인증 ping 2xx" },
          { id: "g3", lane: "proc", row: 5, kind: "decision", label: "기능 E2E 통과?", sub: "대표 생성 경로 호출" },
          { id: "ok", lane: "proc", row: 6, kind: "end", label: "배포 성공", tone: "decision" },
          { id: "stop3", lane: "src", row: 5, label: "설정 되돌림", sub: "health 2xx는 기능 증명이 아니다", tone: "fail" },
        ]}
        edges={[
          { from: "dump", to: "reh" },
          { from: "reh", to: "g1" },
          { from: "g1", to: "copy", label: "예" },
          { from: "g1", to: "stop1", label: "아니오", tone: "fail" },
          { from: "tables", to: "copy", label: "읽기" },
          { from: "copy", to: "replica", label: "쓰기" },
          { from: "copy", to: "g2" },
          { from: "g2", to: "cut", label: "예" },
          { from: "g2", to: "stop2", label: "아니오", tone: "fail" },
          { from: "cut", to: "svc" },
          { from: "cut", to: "g3" },
          { from: "g3", to: "ok", label: "예" },
          { from: "g3", to: "stop3", label: "아니오", tone: "fail" },
        ]}
      />
      <DesignFooter
        invariant="검증되지 않은 replica로 cutover하지 않는다. health가 2xx여도 기능 E2E를 통과하기 전에는 배포 성공이 아니다."
        rejected="영구 cross-DB link(운영 DB에 흔적) · count만으로 일치 판정 · 무중단 전환 주장"
        evidence="STG 실데이터 이관 기록 · 세 table hash 일치 · FK orphan 0건 · post-deploy gate 명시. Prod 이관 수치와 무중단은 주장하지 않는다"
      />
    </DesignFrame>
  );
}

/* ---------- 재구축 판단 ---------- */
export function RebuildDecisionDiagram({ currentCopy = false }: { currentCopy?: boolean }) {
  // Default preserves the submitted Hypernova diagram. Mutable copies use rebuild-contract.
  return (
    <DesignFrame
      eyebrow="판단 비교 · 실행 순서"
      title={currentCopy ? "API 계약을 유지한 백엔드 재설계·전환" : "prototype backend 재구축 — 돌아가는 기능을 왜 다시 만드는가에 대한 판단과 실행 순서"}
      caption={currentCopy ? "기존 화면의 API 계약은 유지하고 도메인·저장소·트랜잭션 책임을 분리했다. 대안 비교부터 응답 검증·전환까지의 판단을 보여준다." : "속도 우선으로 빠르게 검증된 초기 제품을 운영 단계로 전환한 판단이다. 전임 작업의 폄하가 아니라 시점과 비용의 비교다."}
    >
      <Compare
        before={{
          eyebrow: "대안 A",
          title: "부분 수정 유지",
          tone: "before",
          nodes: [
            { label: "기능은 돌아간다", sub: "새로 만드는 비용 0" },
            { label: "도메인 간 의존성 얽힘", sub: "회원 로직 수정이 AI 생성 중단으로 이어진 실사례" },
            currentCopy ? { label: "변경 영향 범위를 분리해야 함", sub: "도메인·저장소·트랜잭션 책임" } : { label: "QA 티켓이 닫힌 뒤 같은 영역에서 다른 형태로 재발", sub: "수정할수록 누적" },
            { label: "AI 모듈 확장이 막힌다", sub: "확장 지점이 없음" },
          ],
          notes: [{ label: "이 대안이 맞는 조건", items: ["서비스가 이미 크고 이관 비용이 재발 비용보다 클 때", "확장 계획이 없을 때"] }],
        }}
        after={{
          eyebrow: "채택",
          title: "병렬 재구축 · frontend 유지",
          tone: "after",
          nodes: [
            { label: "지금이 가장 싼 시점", sub: "서비스 규모가 작고 사용자 운영 전", tone: "decision" },
            { label: "backend만 FastAPI로 분리", sub: "Next.js frontend는 유지. 화면 회귀 없음" },
            { label: "규칙을 먼저 세팅", sub: "디자인 패턴 · 컴포넌트 설계 · 하네스 → 그 위에서 AI와 협업", tone: "decision" },
            { label: "파악 → 기능 정의 → 재구축 → FE 호출 전환", sub: "기존 서비스는 그동안 그대로 운영" },
            { label: currentCopy ? "전환 이후 개발·운영" : "cutover 뒤 관측", sub: currentCopy ? "실사용 backend 기능 개발·배포·운영 전담" : "QA reopen을 같은 정의로 계속 측정", tone: "human" },
          ],
          notes: [{ label: "설득한 근거", items: ["문제 누적 속도", "AI 확장성", "하네스 기반 이관 속도 (작업 시간 기준)"] }],
        }}
      />
      <div className="mt-6 border-t border-border pt-4">
        <StateMachine
          chains={[
            {
              label: "규칙 먼저",
              items: [
                { kind: "state", label: "monorepo 분리", sub: "backend 자리 확보" },
                { kind: "edge", label: "같은 날" },
                { kind: "state", label: "스캐폴딩 · 계층 · 예외 · 로깅 · core", tone: "decision" },
              ],
            },
            {
              label: "그 위에서",
              items: [
                { kind: "state", label: "Sprint 0-1", sub: "auth · accounts" },
                { kind: "edge", label: "" },
                { kind: "state", label: "FE → BE 호출 전환", sub: "cutover" },
                { kind: "edge", label: "이후" },
                { kind: "state", label: currentCopy ? "개발·운영" : "reopen 관측", sub: currentCopy ? "실사용 backend 후속 개발" : "월별 resolved 대비 reopened", tone: "human" },
              ],
            },
          ]}
        />
      </div>
      <DesignFooter
        invariant="돌아가는 서비스를 멈추지 않는다. 재구축은 규칙(패턴·계층·하네스)을 먼저 세우고 그 위에서 한다."
        rejected="부분 수정 유지 (재발 누적) · frontend까지 동시 교체 (회귀 범위 확대) · 규칙 없이 AI로 바로 생성"
        evidence={currentCopy ? "API·기능 inventory · 동일 기능 응답 비교 · QA acceptance" : "commit 실측 순서 · backend commit 대다수 본인 author · Jira 전이 전수 분석"}
        observed={currentCopy ? "기존 화면의 API 계약을 유지하며 FastAPI backend로 전환하고, 분리한 도메인·트랜잭션 경계에서 기능 개발·운영을 이어감" : "QA 버그 재발률(해결 대비 reopen) 37% → 11%, 재발 발생 일평균 약 94% 감소. BE/FE 라벨이 없어 제품 전체 품질 지표로 서술"}
      />
    </DesignFrame>
  );
}

/* ---------- Stripe 선결제 · 보상 처리 ---------- */
export function StripePrepaymentDiagram() {
  return (
    <DesignFrame
      eyebrow="흐름 · 보상 처리"
      title="선결제 예약 — local 확정 뒤 provider capture, 실패하면 provider 쪽을 되돌린다"
      caption="예약·결제 backend의 선결제 slice다. local 원장이 먼저 확정되고 provider capture가 뒤따르므로 완전한 rollback이 아니라 cancel/refund 보상 처리다. webhook 중복 제거와 DB·provider atomic transaction은 검증 범위 밖이다."
    >
      <Flow
        lanes={[
          { id: "api", label: "예약 API", sub: "예약 · 결제 orchestration" },
          { id: "ledger", label: "local 결제 원장", sub: "PaymentHistory · PaymentMethod" },
          { id: "prov", label: "결제 provider", sub: "Checkout · manual capture" },
        ]}
        nodes={[
          { id: "start", lane: "api", row: 0, no: "01", label: "Checkout 생성", sub: "manual capture. 결제는 잡아두고 확정은 나중에", tone: "decision" },
          { id: "hist", lane: "ledger", row: 0, kind: "store", label: "PaymentHistory", sub: "local transaction id · payment type" },
          { id: "intent", lane: "prov", row: 0, label: "PaymentIntent", sub: "metadata에 local id를 실어 event와 이력을 연결" },
          { id: "verify", lane: "api", row: 1, kind: "decision", label: "결제 상태 검증 통과?", sub: "예약 처리 전" },
          { id: "reserve", lane: "api", row: 2, no: "02", label: "예약 처리", sub: "local 원장 확정", tone: "decision" },
          { id: "okq", lane: "api", row: 3, kind: "decision", label: "예약 성공?" },
          { id: "capture", lane: "prov", row: 3, kind: "end", label: "capture", tone: "decision" },
          { id: "state", lane: "prov", row: 4, kind: "decision", label: "provider 상태?", sub: "보상 처리" },
          { id: "cancel", lane: "prov", row: 5, label: "requires_capture → cancel", tone: "fail" },
          { id: "refund", lane: "prov", row: 6, label: "succeeded → refund", tone: "fail" },
          { id: "zero", lane: "api", row: 5, label: "0원 · 전액 마일리지", sub: "provider 조회를 거치지 않는 분기", tone: "muted" },
          { id: "reject", lane: "api", row: 6, label: "예약 실패 응답", sub: "provider 상태를 되돌린 뒤", tone: "fail" },
        ]}
        edges={[
          { from: "start", to: "hist" },
          { from: "hist", to: "intent" },
          { from: "start", to: "verify" },
          { from: "verify", to: "reserve", label: "예" },
          { from: "reserve", to: "okq" },
          { from: "okq", to: "capture", label: "예" },
          { from: "okq", to: "state", label: "아니오", tone: "fail" },
          { from: "state", to: "cancel", label: "requires_capture", tone: "fail" },
          { from: "state", to: "refund", label: "succeeded", tone: "fail" },
          { from: "refund", to: "reject", tone: "fail" },
          { from: "verify", to: "zero", label: "결제 없음", tone: "fail" },
        ]}
      />
      <div className="mt-6 border-t border-border pt-4">
        <StateMachine
          chains={[
            {
              label: "환불 완료 시",
              items: [
                { kind: "state", label: "결제 수단 확인", sub: "경로별 분기" },
                { kind: "edge", label: "" },
                { kind: "state", label: "PaymentHistory 환불", tone: "decision" },
                { kind: "edge", label: "" },
                { kind: "state", label: "사용 mileage 복원" },
                { kind: "edge", label: "마지막에" },
                { kind: "state", label: "ticket 삭제", sub: "환불 완료 시점에만", tone: "human" },
              ],
            },
          ]}
        />
      </div>
      <DesignFooter
        invariant="local 원장이 먼저 확정된다. provider는 그 결과를 따라가고, 어긋나면 provider 쪽을 되돌린다. 티켓은 환불이 완료된 뒤에만 사라진다."
        rejected="예약 확정 전 즉시 capture (실패 시 환불이 기본 경로가 됨) · 환불 요청 시점에 티켓 삭제 (환불 실패 시 정합성 깨짐)"
        evidence="Stripe integration slice 코드 전량 본인 작성. live-call test는 skip 상태라 webhook dedup·reconciliation은 검증 범위 밖. 이 경험이 이후 주문·알림 worker 분리 설계의 배경"
      />
    </DesignFrame>
  );
}

/* ---------- 대화형 agent prototype ---------- */
export function AgentPrototypeDiagram() {
  return (
    <DesignFrame
      eyebrow="흐름 · 실행 권한 분리"
      title="대화형 제품 제어 agent — planner는 계획만, 실행은 등록된 capability만, 상태 변경은 확인 뒤에만"
      caption="독립 prototype이다. 편집 기능은 기존 writer를 재사용했고, 계정·게시물 운영 action은 Mock gateway에서 실행 흐름과 안전 경계만 검증했다. 실제 예약·발행·삭제는 수행하지 않았다."
    >
      <Flow
        lanes={[
          { id: "user", label: "사용자", sub: "대화 인터페이스" },
          { id: "agent", label: "agent", sub: "single-agent planner-executor" },
          { id: "cap", label: "capability registry · tool", sub: "등록된 기능만" },
          { id: "ledger", label: "원장", sub: "conversation · turn · artifact" },
        ]}
        nodes={[
          { id: "say", lane: "user", row: 0, no: "01", label: "발화", sub: "원하는 작업을 말한다", tone: "decision" },
          { id: "turn", lane: "ledger", row: 0, kind: "store", label: "active turn 하나", sub: "실행 중 발화는 queue → 다음 turn" },
          { id: "cls", lane: "agent", row: 1, kind: "decision", label: "명확한 읽기 · typed command?" },
          { id: "fast", lane: "agent", row: 2, label: "fast lane", sub: "deterministic. LLM 없이", tone: "muted" },
          { id: "plan", lane: "agent", row: 3, no: "02", label: "planner → typed plan", sub: "실행 권한 없음", tone: "decision" },
          { id: "amb", lane: "agent", row: 4, label: "모호한 mutation", sub: "planner fallback으로 실행하지 않는다", tone: "fail" },
          { id: "reg", lane: "cap", row: 3, kind: "decision", label: "등록 · 일치?", sub: "action 이름 · 인자" },
          { id: "dispatch", lane: "cap", row: 4, no: "03", label: "domain tool dispatch", sub: "편집 7 · 운영 13 action", tone: "decision" },
          { id: "mut", lane: "cap", row: 5, kind: "decision", label: "외부 상태 변경?" },
          { id: "confirm", lane: "user", row: 5, kind: "human", label: "confirmation_required", sub: "다음 turn의 typed confirmation만 통과" },
          { id: "receipt", lane: "cap", row: 6, label: "receipt idempotency → 상태 전이", sub: "같은 confirmation 재실행 차단. Mock gateway", tone: "muted", mark: "design" },
          { id: "art", lane: "ledger", row: 4, kind: "store", label: "tool result · artifact version", sub: "parent chain. 새로고침 뒤 복원" },
          { id: "reply", lane: "user", row: 7, kind: "end", label: "결과를 대화로", tone: "decision" },
        ]}
        edges={[
          { from: "say", to: "turn", label: "turn 생성" },
          { from: "say", to: "cls" },
          { from: "cls", to: "fast", label: "예" },
          { from: "cls", to: "plan", label: "아니오" },
          { from: "plan", to: "reg", label: "plan" },
          { from: "plan", to: "amb", label: "모호", tone: "fail" },
          { from: "reg", to: "dispatch", label: "예" },
          { from: "dispatch", to: "art", label: "기록" },
          { from: "dispatch", to: "mut" },
          { from: "mut", to: "confirm", label: "예", tone: "fail" },
          { from: "confirm", to: "receipt", label: "typed confirmation", tone: "fail" },
          { from: "mut", to: "reply", label: "아니오 · 읽기·초안" },
          { from: "fast", to: "reply" },
        ]}
      />
      <DesignFooter
        invariant="planner는 실행 권한을 갖지 않는다. 등록되지 않은 action은 실행되지 않는다. 외부 상태 변경은 typed confirmation과 receipt를 통과할 때만 일어난다."
        rejected="multi-agent orchestration (범위 대비 복잡) · 최근 message 개수 절단 (token-aware context selection + append-only compaction snapshot으로 대체)"
        evidence="대화·queue·artifact · 편집 action · activity · capability · Mock operation 각 test 통과. 운영용 durable worker와 process restart recovery는 미구현 범위"
      />
    </DesignFrame>
  );
}
