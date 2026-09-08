/* 다섯 가지 설계 도식. 사실은 wiki/evidence/projects/*.md의 검증 범위만 사용한다.
   ① Outbox durable delivery (thready.md)  ② BAY 알림 worker (centurion.md)
   ③ Template transaction·session (be-template.md)  ④ Multi-tenant 접근 경계 (nexus.md)  ⑤ Azure 운영 topology (infrastructure.md) */
import { Boundary, Compare, DesignFooter, DesignFrame, Link, Res, Sequence, StateMachine, StateTable } from "./design-grammar";
import {
  MedinessWorkDivisionDiagram,
  SayOverlapSessionDiagram,
  ThreadyAgentDiagram,
  ThreadyAxPipelineDiagram,
  ThreadyAxRolesDiagram,
} from "./design-diagrams-ax";
import {
  IdempotentImporterDiagram,
  QualityLayersDiagram,
  SequenceFenceDiagram,
  SplitMigrationDiagram,
} from "./design-diagrams-patterns";
import {
  AgentPrototypeDiagram,
  BayWorkerFlowDiagram,
  OutboxSwimlaneDiagram,
  RebuildDecisionDiagram,
  SplitMigrationFlowDiagram,
  StripePrepaymentDiagram,
  ThreadyAgentFlowDiagram,
} from "./design-diagrams-flow";

export {
  AgentPrototypeDiagram,
  BayWorkerFlowDiagram,
  OutboxSwimlaneDiagram,
  RebuildDecisionDiagram,
  SplitMigrationFlowDiagram,
  StripePrepaymentDiagram,
  ThreadyAgentFlowDiagram,
  IdempotentImporterDiagram,
  QualityLayersDiagram,
  SequenceFenceDiagram,
  SplitMigrationDiagram,
  MedinessWorkDivisionDiagram,
  SayOverlapSessionDiagram,
  ThreadyAgentDiagram,
  ThreadyAxPipelineDiagram,
  ThreadyAxRolesDiagram,
};

export type DesignDiagramKey =
  | "outbox-delivery"
  | "bay-worker"
  | "transaction-template"
  | "tenant-boundary"
  | "azure-topology"
  | "thready-ax-pipeline"
  | "thready-ax-roles"
  | "mediness-work-division"
  | "thready-agent"
  | "say-overlap-sessions"
  | "sequence-fence"
  | "split-migration"
  | "idempotent-importer"
  | "quality-layers"
  | "rebuild-decision"
  | "rebuild-contract"
  | "stripe-prepayment"
  | "agent-prototype";

export function OutboxDeliveryDiagram() {
  return (
    <DesignFrame
      eyebrow="시퀀스 · 실패 분기"
      title="Outbox durable delivery — 원장 변경이 다른 서비스의 replica에 도달하는 순서와 실패 경계"
      caption="정상 경로는 파란 실선, 실패 분기는 회색 점선이다. 짙은 박스는 사람이 확인하는 지점이다."
    >
      <Sequence
        lanes={[
          { id: "be", label: "원장 서비스", sub: "원장 owner · RDB" },
          { id: "relay", label: "전달자", sub: "relay · lease" },
          { id: "ai", label: "소비 서비스", sub: "replica · 멱등 consumer" },
        ]}
        rows={[
          { kind: "step", lane: "be", no: "01", label: "원장 변경 + outbox row", sub: "같은 transaction에서 commit · version v7 · attempt 0", tone: "decision" },
          { kind: "step", lane: "relay", no: "02", label: "lease claim", sub: "짧은 lease · attempt token = 1" },
          { kind: "arrow", from: "relay", to: "ai", label: "PUT v7", sub: "delivery_version · attempt_count" },
          { kind: "step", lane: "ai", no: "03", label: "fence 검사 → upsert", sub: "v7 > 현재 v6 → 반영 · stable id·natural key 충돌은 최신 row 하나로 수렴", tone: "decision" },
          { kind: "divider", label: "실패 분기" },
          { kind: "step", lane: "relay", label: "전달 실패 · worker 중단", sub: "lease 만료 → 다른 worker가 재점유 · attempt 2", tone: "fail" },
          { kind: "arrow", from: "relay", to: "ai", label: "재시도", sub: "attempt < max", tone: "fail" },
          { kind: "step", lane: "relay", label: "attempt = max", sub: "terminal FAILED로 보존", tone: "fail" },
          { kind: "step", lane: "be", label: "운영자 확인", sub: "실패 상태를 원장 쪽에서 조회", tone: "human" },
          { kind: "step", lane: "ai", label: "역순 도착 v6", sub: "fence: v6 ≤ 현재 v7 → no-op · 최신 상태를 덮지 않음", tone: "fail" },
        ]}
      />
      <div className="mt-6 border-t border-border pt-4">
        <StateTable
          label="outbox row 상태별 처리"
          rows={[
            {
              state: "대기",
              sub: "재시도 가능",
              enter: "원장 mutation과 같은 transaction에서 insert. 또는 attempt < max인 실패 뒤 lease 만료",
              work: "아무것도 하지 않는다. relay가 claim할 때까지 row가 보존된다",
              ok: "relay claim → 점유",
              fail: "없음",
              observe: "대기 row 수·가장 오래된 row age",
            },
            {
              state: "점유",
              sub: "lease 보유",
              tone: "decision",
              enter: "relay가 짧은 lease로 row를 claim하고 attempt_count를 올린다",
              work: "delivery_version·attempt_count를 fencing token으로 붙여 replica에 PUT/DELETE",
              ok: "consumer가 fence 통과 후 반영 또는 no-op → 전달 완료",
              fail: "응답 실패·worker 중단 → lease 만료. attempt < max면 대기로 복귀, = max면 terminal FAILED",
              observe: "lease 만료 뒤 다른 worker의 재점유 횟수",
            },
            {
              state: "전달 완료",
              enter: "consumer 응답 성공",
              work: "종료. 같은 version이 다시 와도 consumer가 no-op으로 끝낸다",
              ok: "없음 (terminal)",
              fail: "없음",
              observe: "version별 전달 지연",
            },
            {
              state: "terminal FAILED",
              tone: "fail",
              enter: "최대 시도 소진. 또는 중단된 마지막 claim의 lease 만료",
              work: "version·attempt·원인을 보존하고 자동 재시도를 멈춘다",
              ok: "없음. 운영자 판단",
              fail: "없음",
              observe: "운영자가 원장 쪽에서 실패 row 조회",
            },
          ]}
        />
      </div>
      <div className="mt-6 border-t border-border pt-4">
        <StateTable
          label="replica consumer의 fence 판정 (도착 version v vs 현재 c)"
          rows={[
            {
              state: "v > c",
              tone: "decision",
              enter: "처음 보는 더 높은 version",
              work: "stable id·natural key 충돌을 최신 row 하나로 수렴시키는 멱등 upsert 또는 delete",
              ok: "현재 c = v",
              fail: "DB 오류 → 응답 실패 → relay가 재시도",
              observe: "적용된 version",
            },
            {
              state: "v ≤ c",
              tone: "fail",
              enter: "재전송·역순 도착·중복 전달",
              work: "아무것도 바꾸지 않는다. 최신 상태를 덮지 않는다",
              ok: "no-op 성공 응답 → relay 쪽 전달 완료",
              fail: "없음",
              observe: "no-op 비율",
            },
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

export function BayWorkerDiagram() {
  return (
    <DesignFrame
      eyebrow="시퀀스 · 상태 머신"
      title="주문·알림 worker — API 응답과 알림 완료를 분리하고 실패를 주문 상태로 승격"
      caption="알림 job은 고정 간격으로 상한 횟수까지 재시도한다. 공급사 알림이 모두 성공해야 주문이 PENDING으로, 하나라도 최종 실패면 FAILED로 바뀐다. 큐·채널 제품명과 횟수는 적지 않는다."
    >
      <Sequence
        lanes={[
          { id: "api", label: "주문 API", sub: "transaction 경계" },
          { id: "worker", label: "알림 worker", sub: "queue · worker" },
          { id: "ext", label: "외부 채널", sub: "메시지 발송 API" },
        ]}
        rows={[
          { kind: "step", lane: "api", no: "01", label: "자동 발주 → 주문 생성", sub: "transaction commit · 주문 CREATED", tone: "decision" },
          { kind: "step", lane: "api", no: "02", label: "알림 policy 호출", sub: "병원: 주문 묶음 알림 1건 · 공급사: 주문별 알림 N건" },
          { kind: "arrow", from: "api", to: "worker", label: "job enqueue", sub: "API는 여기서 응답" },
          { kind: "step", lane: "worker", no: "03", label: "알림 job PENDING → SENDING", sub: "재고 worker도 같은 경계" },
          { kind: "arrow", from: "worker", to: "ext", label: "발송" },
          { kind: "step", lane: "ext", label: "성공 → SUCCESS", tone: "decision" },
          { kind: "divider", label: "실패 분기" },
          { kind: "step", lane: "ext", label: "실패", sub: "고정 간격 재시도 · 상한 N회", tone: "fail" },
          { kind: "step", lane: "worker", label: "재시도 소진 → FAILED", sub: "최종 실패 이력 기록", tone: "fail" },
          { kind: "step", lane: "api", label: "수동 재발송 API", sub: "조건 검증 뒤 운영자가 재처리", tone: "human" },
        ]}
      />
      <div className="mt-6 border-t border-border pt-4">
        <span className="mb-3 block font-mono text-[10.5px] tracking-[0.06em] text-muted">주문 상태 승격</span>
        <StateMachine
          chains={[
            { label: "정상", items: [
              { kind: "state", label: "CREATED", sub: "주문 commit" },
              { kind: "edge", label: "공급사 알림 모두 SUCCESS" },
              { kind: "state", label: "PENDING", sub: "후속 처리 진행", tone: "decision" },
            ] },
            { label: "실패", items: [
              { kind: "state", label: "CREATED", sub: "주문 commit" },
              { kind: "edge", label: "하나라도 최종 FAILED", tone: "fail" },
              { kind: "state", label: "FAILED", sub: "원인·상태 보존", tone: "fail" },
              { kind: "edge", label: "수동 재발송", sub: "전용 API" },
              { kind: "state", label: "PENDING", tone: "decision" },
            ] },
          ]}
        />
      </div>
      <div className="mt-6 border-t border-border pt-4">
        <StateTable
          label="알림 job 상태별 처리"
          rows={[
            {
              state: "PENDING",
              enter: "주문 transaction commit 뒤 알림 policy가 job을 enqueue",
              work: "queue에서 대기. API는 이미 응답을 돌려준 상태",
              ok: "worker 수신 → SENDING",
              fail: "없음",
              observe: "큐 적체",
            },
            {
              state: "SENDING",
              tone: "decision",
              enter: "worker가 job을 집는다",
              work: "외부 발송 API 호출",
              ok: "발송 응답 성공 → SUCCESS",
              fail: "오류 → 고정 간격 재시도. 상한 소진 → FAILED",
              observe: "시도 횟수·마지막 오류",
            },
            {
              state: "SUCCESS",
              enter: "발송 성공",
              work: "종료. 주문 승격 판단의 입력이 된다",
              ok: "없음 (terminal)",
              fail: "없음",
              observe: "공급사별 완료 시각",
            },
            {
              state: "FAILED",
              tone: "fail",
              enter: "재시도 상한 소진",
              work: "최종 실패 이력 기록. 자동 재시도 없음",
              ok: "수동 재발송 API → 새 job PENDING",
              fail: "없음",
              observe: "운영자가 실패 이력과 재발송 조건 확인",
            },
          ]}
        />
      </div>
      <div className="mt-6 border-t border-border pt-4">
        <StateTable
          label="주문 상태별 처리 (공급사 알림 결과를 주문에 승격)"
          rows={[
            {
              state: "CREATED",
              enter: "자동 발주 engine이 주문 transaction을 commit",
              work: "알림 policy 호출. 병원 묶음 알림 1건·공급사 주문별 알림 N건 enqueue",
              ok: "공급사 알림 모두 SUCCESS → PENDING",
              fail: "하나라도 최종 FAILED → FAILED",
              observe: "CREATED에 머무는 주문 수",
            },
            {
              state: "PENDING",
              tone: "decision",
              enter: "공급사 알림 모두 성공",
              work: "후속 처리 진행",
              ok: "다음 업무 상태",
              fail: "업무 규칙에 따름",
              observe: "—",
            },
            {
              state: "FAILED",
              tone: "fail",
              enter: "공급사 알림 중 최종 실패 존재",
              work: "원인·상태 보존. 주문을 숨기지 않는다",
              ok: "전용 API에서 조건 검증 뒤 수동 재발송",
              fail: "없음",
              observe: "운영자 화면에서 실패 주문 조회",
            },
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

export function TransactionTemplateDiagram() {
  return (
    <DesignFrame
      eyebrow="판단 비교 · AS-IS / TO-BE"
      title="transaction·session 경계 — session 인자 전달을 없애고 Service가 정책을 선언"
      caption="왼쪽은 인계받은 코드에서 반복되던 구조, 오른쪽은 조직 template의 기본값이다."
    >
      <Compare
        before={{
          eyebrow: "AS-IS",
          title: "session plumbing",
          tone: "before",
          nodes: [
            { label: "Router", sub: "Depends(get_session)" },
            { label: "Service(session)", sub: "업무와 무관한 인자가 signature를 통과" },
            { label: "Validator(session)" },
            { label: "Repository(session)", sub: "transaction을 끊거나 중첩할 위치가 호출부마다 흩어짐" },
          ],
          notes: [{ label: "STG에서 반복된 failure mode", items: ["session 반납 누락 → connection pool 고갈 → 반복 500", "local에서는 드러나지 않고 QA ticket 원인 분석에서 확인"] }],
        }}
        after={{
          eyebrow: "TO-BE",
          title: "정책 선언 + 현재 session resolve",
          tone: "after",
          nodes: [
            { label: "Router", sub: "session 인자 없음" },
            { label: "Service @transactional", sub: "REQUIRED 참여 · REQUIRES_NEW 새 connection·session · NESTED 같은 connection의 SAVEPOINT", tone: "decision" },
            { label: "ContextVar", sub: "현재 AsyncSession · TxState bind" },
            { label: "Repository ← SessionProxy", sub: "SQL·flush만 담당. commit·rollback·cleanup은 Service가 소유" },
            { label: "owner-task guard", sub: "하나의 transaction = 하나의 asyncio task. child task의 상속 session 접근은 fail-fast", tone: "human" },
          ],
          notes: [{ label: "typed 경계", items: ["ORM entity와 raw query 결과를 typed DTO로 분리", "병렬 DB 작업은 task별 transaction·가시성·복구·pool 비용을 먼저 결정 (ADR)"] }],
        }}
      />
      <DesignFooter
        invariant="commit·rollback·cleanup은 Service의 decorator와 session layer만 소유한다."
        rejected="Depends(get_session) 자체를 부정하는 것이 아니다. 모든 계층에 session을 흘려보내는 방식을 버렸다."
        evidence="propagation · isolation · read-only · CancelledError rollback · connection cleanup integration test"
        observed="full template으로 시작한 신규 사내 프로그램의 STG QA에서 session 미반납·pool 고갈 재관측 없음"
      />
    </DesignFrame>
  );
}

export function TenantBoundaryDiagram() {
  return (
    <DesignFrame
      eyebrow="판단 비교 · AS-IS / TO-BE"
      title="multi-tenant 접근 경계 — 지점 데이터 범위를 client 입력이 아니라 server 상태가 결정"
      caption="변경 범위를 Admin API로 한정하고 shared auth middleware와 Homepage API의 기존 header 계약은 유지했다."
    >
      <Compare
        before={{
          eyebrow: "AS-IS",
          title: "client가 범위를 결정",
          tone: "before",
          nodes: [
            { label: "Client", sub: "지점 id를 헤더로 보낸다" },
            { label: "Admin API", sub: "header 값을 그대로 신뢰" },
            { label: "지점 7 데이터" },
          ],
          notes: [{ label: "failure mode", items: ["header만 바꾸면 다른 지점 데이터에 접근", "tenant 격리가 client 입력에 의존"] }],
        }}
        after={{
          eyebrow: "TO-BE",
          title: "server auth state가 범위를 결정",
          tone: "after",
          nodes: [
            { label: "login", sub: "서버가 저장한 auth 상태에서 작업 지점 읽기" },
            { label: "JWT · server auth state", sub: "branch를 서버가 보유", tone: "decision" },
            { label: "Admin API", sub: "state의 지점으로 필터 · 모델 공통 필터 · soft delete 자동 필터" },
            { label: "지점 전환 전용 API", sub: "권한 검증 뒤에만 전환 · 본사 미선택 409 · 권한 밖 403", tone: "human" },
          ],
          notes: [{ label: "유지한 계약", items: ["shared auth middleware 변경 없음", "Homepage API는 기존 header 기반 지점 식별 유지 (변경 범위를 Admin API로 한정)"] }],
        }}
      />
      <DesignFooter
        invariant="데이터 접근 범위는 client 입력이 아니라 서버가 소유한 상태에서 나온다."
        rejected="Homepage API까지 한 번에 전환(범위 확대) · header 검증 강화만으로 대응"
        evidence="Admin API 접근 경계 변경 commit · 일부 test의 skip·xfail이 남아 전체 회귀 완료는 주장하지 않음"
      />
    </DesignFrame>
  );
}

export function AzureTopologyDiagram() {
  const env = [
    { label: "app runtime", sub: "managed app service · VM", tone: "decision" as const },
    { label: "managed DB" },
    { label: "storage" },
    { label: "네트워크 · 접근 경계", sub: "환경 안에서 구성", tone: "muted" as const },
  ];
  const Env = ({ label }: { label: string }) => (
    <Boundary label={label} sub="VNet · state 분리" tone="normal">
      <div className="grid gap-1.5">
        {env.map((it) => (
          <Res key={it.label} label={it.label} sub={it.sub} tone={it.tone} />
        ))}
      </div>
    </Boundary>
  );
  return (
    <DesignFrame
      eyebrow="topology · 경계 상자"
      title="클라우드 운영 topology — 공통 산출물과 제품 runtime을 root·환경 경계로 분리"
      caption="리소스 이름·수·네트워크 설정값·제품군 구성은 적지 않는다. 기존 resource를 하나의 IaC monorepo와 root별 remote state로 통합하고 운영한 범위이며, topology 전체를 처음부터 설계한 것은 아니다."
    >
      <Boundary label="Subscription" sub="IaC monorepo · root별 remote state" tone="platform">
        <div className="grid grid-cols-[minmax(0,0.9fr)_minmax(0,2.1fr)] gap-3 max-md:grid-cols-1">
          <Boundary label="공통 root" sub="공통 산출물" tone="decision">
            <div className="grid gap-1.5">
              <Res label="IaC state storage" tone="decision" />
              <Res label="Container Registry" sub="admin credential 비활성화" tone="decision" />
            </div>
            <p className="m-0 mt-3 text-[11px] leading-[1.5] text-fg-2">제품 root는 remote state output으로 이 registry만 참조한다. 서로의 state를 읽거나 바꾸지 않는다.</p>
          </Boundary>
          <Boundary label="제품군 root × N" sub="제품군마다 root 하나 · 환경마다 state 하나">
            <div className="grid grid-cols-2 gap-2 max-sm:grid-cols-1">
              <Env label="STG" />
              <Env label="Prod" />
            </div>
          </Boundary>
        </div>
        <div className="mt-3 grid gap-1.5">
          <Link from="공통 registry" to="제품 runtime" label="image pull" />
          <Link from="runtime" to="log workspace" label="diagnostics · container log" tone="muted" />
        </div>
        <div className="mt-3">
          <Boundary label="Monitor · log workspace" sub="제품군·환경별" tone="muted">
            <div className="grid grid-cols-3 gap-2 max-sm:grid-cols-1">
              <Res label="app diagnostics" tone="muted" />
              <Res label="VM container log" sub="agent · collection rule" tone="muted" />
              <Res label="Production metric alert → 담당자" sub="CPU·memory·disk · API health·5xx · DB availability" tone="human" />
            </div>
          </Boundary>
        </div>
      </Boundary>
      <div className="mt-4 grid gap-3">
        <Boundary label="CI" sub="build → registry" tone="muted">
          <Link from="build" to="공통 registry" label="image push" />
        </Boundary>
        <Boundary label="변경 gate" sub="모든 IaC 변경이 통과" tone="platform">
          <StateMachine
            chains={[
              {
                label: "검증",
                items: [
                  { kind: "state", label: "state snapshot", sub: "대상 root 식별" },
                  { kind: "edge", label: "fmt · validate" },
                  { kind: "state", label: "plan" },
                  { kind: "edge", label: "live inventory 대조" },
                  { kind: "state", label: "destroy/replace 판정", sub: "있으면 apply 중단", tone: "human" },
                ],
              },
              {
                label: "없을 때만",
                items: [
                  { kind: "state", label: "apply", tone: "decision" },
                  { kind: "edge", label: "직후" },
                  { kind: "state", label: "health · log · alert 확인" },
                ],
              },
            ]}
          />
        </Boundary>
      </div>
      <DesignFooter
        invariant="제품 root는 공통 registry를 remote state output으로만 참조한다. 의도하지 않은 destroy/replace가 plan에 있으면 apply하지 않는다."
        rejected="단일 root·단일 state(blast radius가 회사 전체) · 현재 workload보다 앞서 hub-spoke·container platform·VM-zero를 먼저 도입하는 것 (검토 중인 target으로 남김)"
        evidence="read-only state list와 live inventory 대조 · DB replacement가 포함된 plan 미적용 · 기존 resource를 import·change만으로 편입"
      />
    </DesignFrame>
  );
}

export function DesignDiagram({ id }: { id: DesignDiagramKey }) {
  switch (id) {
    case "azure-topology": return <AzureTopologyDiagram />;
    case "thready-ax-pipeline": return <ThreadyAxPipelineDiagram />;
    case "thready-ax-roles": return <ThreadyAxRolesDiagram />;
    case "mediness-work-division": return <MedinessWorkDivisionDiagram />;
    case "thready-agent": return <ThreadyAgentFlowDiagram />;
    case "say-overlap-sessions": return <SayOverlapSessionDiagram />;
    case "sequence-fence": return <SequenceFenceDiagram />;
    case "split-migration": return <SplitMigrationFlowDiagram />;
    case "idempotent-importer": return <IdempotentImporterDiagram />;
    case "quality-layers": return <QualityLayersDiagram />;
    case "rebuild-decision": return <RebuildDecisionDiagram />;
    case "rebuild-contract": return <RebuildDecisionDiagram currentCopy />;
    case "stripe-prepayment": return <StripePrepaymentDiagram />;
    case "agent-prototype": return <AgentPrototypeDiagram />;
    case "outbox-delivery": return <OutboxSwimlaneDiagram />;
    case "bay-worker": return <BayWorkerFlowDiagram />;
    case "transaction-template": return <TransactionTemplateDiagram />;
    case "tenant-boundary": return <TenantBoundaryDiagram />;
  }
}
