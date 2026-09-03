/* 패턴 도식 (2026-09-03). 회사 내부 구조가 아니라 "반복되는 설계 습관"을 보여준다.
   ⑪ 늦게 도착한 보정이 다른 turn을 덮지 않는 sequence fence (centurion.md SAY)
   ⑫ 운영 DB 분리 이관 — rehearsal → FK 순서 copy → fingerprint 대조 → cutover gate (thready.md)
   ⑬ 재적재 가능한 importer — 멱등 upsert · replace · batch rollback (thready.md labeling)
   ⑭ 품질 판정 3층 — 바닥은 자동, 천장은 사람 (thready-quality-lab.md)
   공개 수준: 패턴. 내부 식별자·수치·제3자 정보는 적지 않는다 (rules/application-copy-standard §2-1). */
import { Boundary, Compare, DesignFooter, DesignFrame, Res, Sequence, StateMachine, StateTable } from "./design-grammar";

/* ---------- ⑪ sequence fence ---------- */
export function SequenceFenceDiagram() {
  return (
    <DesignFrame
      eyebrow="시퀀스 · 실패 분기"
      title="실시간 전사 보정 — 늦게 도착한 보정이 다른 turn을 덮지 않게 sequence로 묶는다"
      caption="Outbox의 version fence와 같은 습관이다. 도착 순서가 아니라 식별자가 무엇을 바꿀 수 있는지 정한다."
    >
      <Sequence
        lanes={[
          { id: "stt", label: "전사 스트림", sub: "외부 모델 · 비동기" },
          { id: "be", label: "backend 버퍼", sub: "sequence 소유" },
          { id: "ui", label: "화면 · 저장", sub: "sequence Map" },
        ]}
        rows={[
          { kind: "step", lane: "stt", no: "01", label: "DELTA (발화 중)", sub: "부분 문장이 계속 바뀐다" },
          { kind: "step", lane: "be", no: "02", label: "교체형 buffer + 조기 판단", sub: "domain keyword가 보이면 조언 판단을 발화 중에 먼저 시작", tone: "decision" },
          { kind: "step", lane: "stt", no: "03", label: "COMPLETE", sub: "문장 확정" },
          { kind: "step", lane: "be", no: "04", label: "sequence n 부여 → 승격", sub: "context · LLM 판단 · 저장의 입력", tone: "decision" },
          { kind: "arrow", from: "be", to: "ui", label: "seq n 문장" },
          { kind: "step", lane: "ui", label: "Map[n] = 문장", sub: "화면 표시 · 저장 metadata에 n 기록" },
          { kind: "divider", label: "보정이 늦게 도착하는 경우" },
          { kind: "step", lane: "stt", label: "CORRECTED (seq n)", sub: "COMPLETE 뒤 비동기로, 이미 n+2까지 진행된 뒤에 도착", tone: "fail" },
          { kind: "arrow", from: "be", to: "ui", label: "seq n 교체", tone: "fail" },
          { kind: "step", lane: "ui", label: "Map[n]만 교체", sub: "n+1, n+2는 그대로. 같은 문장이 반복돼도 n이 다르면 다른 turn", tone: "fail" },
          { kind: "step", lane: "ui", label: "보정 없는 turn", sub: "COMPLETE가 최종. 기다리지 않는다", tone: "muted" },
        ]}
      />
      <DesignFooter
        invariant="보정은 자기 sequence만 바꾼다. 도착 순서로 무엇을 덮을지 정하지 않는다."
        rejected="도착 순서대로 마지막 것을 최신으로 취급 · COMPLETE를 보정이 올 때까지 보류 (실시간성 손실)"
        evidence="상담 길이 E2E에서 sequence 누락·중복 없음 확인. 전사 정확도 개선 수치는 아니다"
      />
    </DesignFrame>
  );
}

/* ---------- ⑫ 운영 DB 분리 이관 ---------- */
export function SplitMigrationDiagram() {
  return (
    <DesignFrame
      eyebrow="절차 · 검증 gate"
      title="운영 DB 분리 이관 — 리허설 → FK 순서 copy → 지문 대조 → 기능 E2E gate"
      caption="한 DB에 있던 두 서비스의 데이터를 서비스별 DB로 나눌 때의 절차다. 건수는 적지 않는다. 배포 성공과 기능 정상 동작을 분리해 본 것이 이 절차의 핵심이다."
    >
      <StateMachine
        chains={[
          {
            label: "이관",
            items: [
              { kind: "state", label: "dump 복원 리허설", sub: "local에서 schema·history migration 먼저" },
              { kind: "edge", label: "통과 시" },
              { kind: "state", label: "FK 순서 streaming copy", sub: "parent → child. 영구 link 객체를 운영 DB에 남기지 않음", tone: "decision" },
              { kind: "edge", label: "" },
              { kind: "state", label: "지문 대조", sub: "count + id·status·domain·reason 결합 hash를 양쪽에서", tone: "decision" },
              { kind: "edge", label: "일치 · orphan 0" },
              { kind: "state", label: "cutover", sub: "backend가 보는 base URL·DB endpoint 전환", tone: "human" },
            ],
          },
          {
            label: "배포 뒤",
            items: [
              { kind: "state", label: "health · 인증 ping 2xx", sub: "그런데 실제 생성은 실패한 사례", tone: "fail" },
              { kind: "edge", label: "그래서" },
              { kind: "state", label: "기능 E2E gate", sub: "URL 없음 · 외부 소재 URL · 개인 분야 생성 API를 post-deploy 조건으로", tone: "decision" },
            ],
          },
        ]}
      />
      <div className="mt-6 border-t border-border pt-4">
        <StateTable
          label="단계별 통과 조건"
          head={["단계", "입력", "하는 일", "통과 조건", "실패하면", "남기는 것"]}
          rows={[
            { state: "리허설", enter: "STG dump", work: "local DB에 복원해 schema·history migration을 먼저 돌린다", ok: "migration 왕복 성공", fail: "운영에 손대기 전에 멈춘다", observe: "migration 순서" },
            { state: "copy", tone: "decision", enter: "원본 table", work: "FK 순서대로 streaming copy. 영구 cross-DB link는 쓰지 않는다", ok: "child가 parent보다 먼저 없다", fail: "해당 table만 재복사", observe: "copy 순서 · 시간" },
            { state: "지문 대조", tone: "decision", enter: "양쪽 DB", work: "count만이 아니라 상태·사유를 결합한 hash를 비교. FK orphan 검사", ok: "hash 일치 · orphan 0", fail: "cutover 하지 않는다", observe: "대조 결과" },
            { state: "cutover", tone: "human", enter: "검증된 replica", work: "backend 설정만 바꾼다. 데이터는 손대지 않는다", ok: "health · 인증 ping", fail: "설정 되돌림", observe: "endpoint" },
            { state: "E2E gate", enter: "배포된 서비스", work: "실제 생성 경로를 호출한다. health는 기능을 증명하지 않는다", ok: "대표 생성 3경로 성공", fail: "배포 성공으로 보지 않는다", observe: "gate 결과" },
          ]}
        />
      </div>
      <DesignFooter
        invariant="검증되지 않은 replica로 cutover하지 않는다. health가 2xx여도 기능 E2E를 통과하기 전에는 배포 성공이 아니다."
        rejected="영구 cross-DB link(운영 DB에 흔적) · count만으로 일치 판정 · 무중단 전환 주장"
        evidence="STG 실데이터 이관 기록 · 세 table hash 일치 · FK orphan 0건 · post-deploy gate 명시. Prod 이관 수치와 무중단은 주장하지 않는다"
      />
    </DesignFrame>
  );
}

/* ---------- ⑬ 재적재 가능한 importer ---------- */
export function IdempotentImporterDiagram() {
  return (
    <DesignFrame
      eyebrow="판단 비교 · 멱등"
      title="재적재 가능한 importer — 같은 파일을 두 번 넣어도 결과가 같다"
      caption="대량 corpus를 사람 평가 workflow에 넣는 importer다. 건수는 적지 않는다. 왼쪽은 흔한 구현, 오른쪽이 채택한 계약이다."
    >
      <Compare
        before={{
          eyebrow: "AS-IS",
          title: "append importer",
          tone: "before",
          nodes: [
            { label: "파일 읽기 → row insert" },
            { label: "재실행 = 중복 row" },
            { label: "형식 오류 row는 건너뜀", sub: "어디까지 들어갔는지 모른다" },
            { label: "기존 사람 라벨과의 관계 없음", sub: "재적재하면 평가가 끊긴다" },
          ],
          notes: [{ label: "failure mode", items: ["증분 병합 때마다 count가 달라진다", "평가 진행률을 신뢰할 수 없다"] }],
        }}
        after={{
          eyebrow: "TO-BE",
          title: "typed batch · 멱등 계약",
          tone: "after",
          nodes: [
            { label: "JSONL → typed batch 검증", sub: "malformed line이 있으면 batch 전체 rollback", tone: "decision" },
            { label: "post: (source, source_key) upsert", sub: "재적재해도 row 수 불변", tone: "decision" },
            { label: "continuation: source post 단위 replace", sub: "이어쓰기 chain이 바뀌면 통째로 교체" },
            { label: "사람 라벨 보존", sub: "(source_post, labeler) unique · 최신 평가만 upsert", tone: "human" },
          ],
          notes: [{ label: "검증", items: ["같은 corpus 두 번 적재 → count 불변", "증분 병합 → 기존 라벨 보존 + 신규분만 반영", "API · UI · DB 교차 대조"] }],
        }}
      />
      <DesignFooter
        invariant="적재는 몇 번을 돌려도 같은 상태로 수렴한다. 사람이 남긴 평가는 재적재가 지우지 않는다."
        rejected="append 후 중복 제거 job · 실패 row 건너뛰기 (부분 적재 상태를 만든다)"
        evidence="local 격리 DB에서 전체 corpus 2회 적재 count 불변 · 증분 병합 검증 · malformed·rollback·label 보존·chain replace test. 전체 corpus의 STG·Prod 적재 완료는 주장하지 않는다"
      />
    </DesignFrame>
  );
}

/* ---------- ⑭ 품질 판정 3층 ---------- */
export function QualityLayersDiagram() {
  const layers: { label: string; q: string; who: string; tone: "human" | "normal" | "decision"; auto: string }[] = [
    { label: "3층 · 천장", q: "이 글이 통하는가", who: "사람 (합의 채점)", tone: "human", auto: "자동화하지 않는다. 판정 질문만 고정" },
    { label: "2층 · 분포", q: "플랫폼다운가", who: "코드 (실측 분포 대조)", tone: "normal", auto: "직접 수집한 corpus의 분포 스냅샷과 비교" },
    { label: "1층 · 바닥", q: "틀리지 않았는가", who: "코드 (결정적 게이트)", tone: "decision", auto: "하나라도 걸리면 재생성. 수치 날조·어체·접힘 등" },
  ];
  return (
    <DesignFrame
      eyebrow="구조 · 판정 층"
      title="AI 글 품질 판정 3층 — 프롬프트와 게이트는 바닥만 높인다. 천장은 체크리스트가 못 만든다"
      caption="아래층을 통과하지 못하면 위층을 묻지 않는다. 자동화가 닿는 층과 닿지 않는 층을 처음부터 갈라 설계했다."
    >
      <div className="grid gap-2">
        {layers.map((l) => (
          <Boundary key={l.label} label={l.label} sub={l.q} tone={l.tone === "human" ? "platform" : l.tone === "decision" ? "decision" : "normal"}>
            <div className="grid grid-cols-[minmax(0,1fr)_minmax(0,2fr)] gap-2 max-sm:grid-cols-1">
              <Res label={l.who} tone={l.tone} />
              <Res label={l.auto} tone="muted" />
            </div>
          </Boundary>
        ))}
      </div>
      <div className="mt-6 border-t border-border pt-4">
        <StateTable
          label="측정 규율 — 점수는 도달점이 아니라 현 기준의 스냅샷"
          head={["규율", "언제", "하는 일", "통과", "어기면", "기록"]}
          rows={[
            { state: "축 먼저", enter: "실험 시작 전", work: "어느 축을 올리려는 실험인지 먼저 말한다", ok: "축이 있는 실험", fail: "실험하지 않는다", observe: "축별 점수 이력" },
            { state: "근거 붙이기", tone: "decision", enter: "채점할 때", work: "축마다 왜 이 점수인지, 뭘 고치면 오르는지, 그 근거", ok: "게이트 수치·원문 사례·실측 대조가 붙은 점수", fail: "점수만 있는 채점 무효", observe: "자가 채점 / 합의 채점 구분" },
            { state: "기준 재실측", enter: "기준값을 쓸 때", work: "기준이 실측인지 자사 출력의 되먹임인지 확인", ok: "실측 corpus 기준", fail: "자기 과교정을 목표로 삼는 순환", observe: "기준 변경 시 이전 점수와 직접 비교 금지" },
            { state: "반증 로그", tone: "fail", enter: "접근이 실패했을 때", work: "지우지 않고 「다시 시도하지 말 것」에 남긴다", ok: "실험 범위가 좁아진다", fail: "같은 실패 반복", observe: "반증된 규칙은 자기 규칙이라도 제거" },
          ]}
        />
      </div>
      <DesignFooter
        invariant="아래층을 못 넘으면 위층을 묻지 않는다. 자동화는 바닥에만 둔다."
        rejected="글자 수 상한 지시 (형태를 바꿔도 과교정을 유발 → 분포·총량 비례로 전환) · 자사 출력 값을 기준으로 삼는 것 (재실측으로 발견해 교정)"
        evidence="6축 점수 이력 · 소표본에서 대량 corpus로 측정 확대하며 유지·기각 결론 구분 · 판정 책임을 writer에서 planner로 옮긴 실측 (정보를 가진 자리로 책임 이동)"
      />
    </DesignFrame>
  );
}
