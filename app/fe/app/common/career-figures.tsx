import type { ReactNode } from "react";
import type { FigureBlock } from "@/content/documents/parse-markdown";
import styles from "./common.module.css";

/* Two small static SVG figures for the miridih R3 career draft (2026-09-13). Fixed coordinates so the picture is
   identical on PC and in print; labels are the draft's own words (pattern level, no identifiers or counts). */

const INK = "#1f2a36", BLUE = "#2854d7", BLUE_SOFT = "#edf3ff", GREY = "#9aa3b2", GREY_SOFT = "#f7f8fa", OBS = "#7a8794", DEPLOY = "#1f8a70";

function Lines({ x, y, lines, size = 11.5, weight = 600, fill = INK, anchor = "middle" }: { x: number; y: number; lines: string[]; size?: number; weight?: number; fill?: string; anchor?: "middle" | "start" }) {
  const lh = size + 3.5;
  const top = y - ((lines.length - 1) * lh) / 2;
  return <text x={x} y={top} fontSize={size} fontWeight={weight} fill={fill} textAnchor={anchor} dominantBaseline="central" data-copy>
    {lines.map((line, i) => <tspan key={i} x={x} dy={i === 0 ? 0 : lh}>{line}</tspan>)}
  </text>;
}

type Tone = "normal" | "decision" | "human" | "fail" | "end";
function Box({ cx, cy, w = 150, title, sub = [], tone = "normal", store = false }: { cx: number; cy: number; w?: number; title: string; sub?: string[]; tone?: Tone; store?: boolean }) {
  const lines = 1 + sub.length; const h = 18 + lines * 15;
  const x = cx - w / 2, y = cy - h / 2;
  const fill = tone === "decision" || tone === "end" ? BLUE_SOFT : tone === "human" ? INK : tone === "fail" ? GREY_SOFT : "#fff";
  const stroke = tone === "decision" || tone === "end" ? BLUE : tone === "human" ? INK : GREY;
  const text = tone === "human" ? "#fff" : INK; const subText = tone === "human" ? "#dce4f4" : "#4d5a67";
  return <g>
    <rect x={x} y={y} width={w} height={h} rx={tone === "end" ? h / 2 : store ? 12 : 5} fill={fill} stroke={stroke} strokeWidth="1.2" strokeDasharray={tone === "fail" ? "4 3" : undefined} />
    {store && <path d={`M${x + 1},${y + 8} Q${cx},${y + 16} ${x + w - 1},${y + 8}`} fill="none" stroke={GREY} strokeWidth="1" />}
    <text x={cx} y={y + 9 + 7.5} fontSize="11.5" fontWeight="700" fill={text} textAnchor="middle" dominantBaseline="central" data-copy>{title}</text>
    {sub.map((s, i) => <text key={i} x={cx} y={y + 9 + 7.5 + 15 * (i + 1)} fontSize="10.5" fill={subText} textAnchor="middle" dominantBaseline="central" data-copy>{s}</text>)}
  </g>;
}
function Diamond({ cx, cy, title, sub }: { cx: number; cy: number; title: string; sub?: string }) {
  const rx = 78, ry = 30;
  return <g>
    <path d={`M${cx - rx},${cy} L${cx},${cy - ry} L${cx + rx},${cy} L${cx},${cy + ry} Z`} fill={BLUE_SOFT} stroke={BLUE} strokeWidth="1.2" />
    <Lines x={cx} y={sub ? cy - 6 : cy} lines={[title]} size={11.5} weight={700} />
    {sub && <text x={cx} y={cy + 9} fontSize="9.5" fill="#4d5a67" textAnchor="middle" dominantBaseline="central" data-copy>{sub}</text>}
  </g>;
}
function Edge({ d, fail = false, color, marker }: { d: string; fail?: boolean; color?: string; marker: string }) {
  return <path d={d} fill="none" stroke={color ?? (fail ? GREY : BLUE)} strokeWidth="1.4" strokeDasharray={fail ? "4 3" : undefined} markerEnd={`url(#${marker})`} />;
}
function EdgeLabel({ x, y, text, fail = false, color }: { x: number; y: number; text: string; fail?: boolean; color?: string }) {
  const w = text.length * 6.6 + 8;
  return <g>
    <rect x={x - w / 2} y={y - 7} width={w} height={14} fill="#f6f8fa" />
    <text x={x} y={y} fontSize="10" fill={color ?? (fail ? "#6b7683" : BLUE)} textAnchor="middle" dominantBaseline="central" data-copy>{text}</text>
  </g>;
}
function Markers({ prefix }: { prefix: string }) {
  const m = (id: string, fill: string) => <marker key={id} id={`${prefix}-${id}`} viewBox="0 0 8 8" refX="7" refY="4" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill={fill} /></marker>;
  return <defs>{[m("blue", BLUE), m("grey", GREY), m("obs", OBS), m("deploy", DEPLOY)]}</defs>;
}

/* ---------- 1. Thready 승인 · 발행: 책임 주체와 트랜잭션·실패 분기 ---------- */
function ApprovalPublishFigure() {
  const lane = (i: number) => 90 + i * 180; // lane centres for 4 lanes of 180px
  const L = ["사용자", "제품 API · DB", "발행 worker", "외부 SNS API"];
  const m = "career-pub";
  return <svg viewBox="0 0 720 600" width={720} role="img" aria-label="사용자 승인부터 외부 발행까지 책임 주체별 처리와 실패 분기">
    <Markers prefix={m} />
    {L.map((label, i) => <g key={label}>
      <text x={lane(i)} y={16} fontSize="12" fontWeight="700" fill={INK} textAnchor="middle" dominantBaseline="central" data-copy>{label}</text>
      {i > 0 && <line x1={i * 180} y1={30} x2={i * 180} y2={590} stroke="#dfe4ea" strokeDasharray="3 4" />}
    </g>)}
    <line x1={0} y1={30} x2={720} y2={30} stroke={INK} strokeWidth="1" />
    {/* edges (behind boxes) */}
    <Edge marker={`${m}-blue`} d={`M${lane(0) + 75},60 L${lane(1)},60 L${lane(1)},104`} />
    <Edge marker={`${m}-grey`} fail d={`M${lane(1) - 75},122 L${lane(0) + 75},122`} />
    <Edge marker={`${m}-grey`} fail d={`M${lane(1) - 75},140 L${lane(0) + 88},140 L${lane(0) + 88},205 L${lane(0) + 75},205`} />
    <Edge marker={`${m}-blue`} d={`M${lane(1)},156 L${lane(1)},177`} />
    <Edge marker={`${m}-blue`} d={`M${lane(1)},233 L${lane(1)},253`} />
    <Edge marker={`${m}-blue`} d={`M${lane(1) + 75},280 L${lane(2) - 75},280`} />
    <Edge marker={`${m}-blue`} d={`M${lane(2)},307 L${lane(2)},325`} />
    <Edge marker={`${m}-grey`} fail d={`M${lane(2) - 78},355 L${lane(1) + 75},355`} />
    <Edge marker={`${m}-blue`} d={`M${lane(2) + 78},355 L${lane(3) - 75},355`} />
    <Edge marker={`${m}-blue`} d={`M${lane(3)},382 L${lane(3)},400`} />
    <Edge marker={`${m}-blue`} d={`M${lane(3) - 78},430 L${lane(2) + 75},430`} />
    <Edge marker={`${m}-grey`} fail d={`M${lane(3)},460 L${lane(3)},478`} />
    <Edge marker={`${m}-grey`} fail d={`M${lane(3) + 75},505 L713,505 L713,355 L${lane(3) + 75},355`} />
    {/* nodes */}
    <Box cx={lane(0)} cy={60} tone="human" title="① 수정본 확인" sub={["승인 · 예약 결정"]} />
    <Box cx={lane(0)} cy={130} tone="fail" title="기존 결과 반환" sub={["같은 명령의 재전송"]} />
    <Box cx={lane(0)} cy={205} tone="fail" title="충돌 거부" sub={["같은 명령 ID · 다른 payload"]} />
    <Box cx={lane(1)} cy={130} tone="decision" title="② 명령 검증" sub={["명령 ID · payload fingerprint"]} />
    <Box cx={lane(1)} cy={205} tone="decision" title="③ 한 트랜잭션으로 확정" sub={["수정 revision · 승인 결정 · 발행 job", "commit 뒤 worker로 전달"]} />
    <Box cx={lane(1)} cy={280} store title="발행 job 저장" sub={["attempt token · lease"]} />
    <Box cx={lane(2)} cy={280} title="④ lease로 점유" sub={["attempt token 불일치면", "오래된 worker의 종결 차단"]} />
    <Diamond cx={lane(2)} cy={355} title="호출 전 확정 실패?" />
    <Box cx={lane(1)} cy={355} tone="fail" title="실패 기록 · 실패 알림" sub={["같은 트랜잭션으로 종결"]} />
    <Box cx={lane(3)} cy={355} title="⑤ 외부 발행 호출" sub={["container 생성 → 게시"]} />
    <Diamond cx={lane(3)} cy={430} title="발행 성공 확인?" sub="외부 응답으로 확인" />
    <Box cx={lane(2)} cy={430} tone="end" title="발행 완료" sub={["job · 콘텐츠 · 알림 종결"]} />
    <Box cx={lane(3)} cy={505} tone="fail" title="결과 불명 · lease 만료 후 재점유" sub={["저장된 container로 media ID 회수", "발행된 이어쓰기는 건너뜀"]} />
    {/* edge labels */}
    <EdgeLabel x={lane(1) + 32} y={82} text="승인 명령" />
    <EdgeLabel x={(lane(0) + lane(1)) / 2 + 4} y={110} text="동일 재전송" fail />
    <EdgeLabel x={lane(0) + 130} y={172} text="충돌" fail />
    <EdgeLabel x={lane(1) + 30} y={167} text="신규 명령" />
    <EdgeLabel x={(lane(1) + lane(2)) / 2} y={268} text="dispatch" />
    <EdgeLabel x={(lane(1) + lane(2)) / 2 - 2} y={343} text="예 · 종결" fail />
    <EdgeLabel x={(lane(2) + lane(3)) / 2} y={343} text="아니오" />
    <EdgeLabel x={(lane(2) + lane(3)) / 2} y={418} text="성공 확인 · 종결" />
    <EdgeLabel x={lane(3) + 44} y={469} text="응답 유실 · 결과 불명" fail />
    <EdgeLabel x={713} y={430} text="재개" fail />
    <text x={8} y={585} fontSize="10" fill="#6b7683" data-copy>실선 정상 경로 · 점선 실패 분기 · 마름모 판단 · 짙은 상자 사람 · 둥근 상자 저장</text>
  </svg>;
}

/* ---------- 2. 사내 인프라: 관리 접근 경로와 IaC 변경 경계 (최소 구성) ---------- */
function Icon({ name, x, y, size = 26 }: { name: string; x: number; y: number; size?: number }) {
  return <image href={`/azure/${name}.svg`} x={x} y={y} width={size} height={size} />;
}
function Group({ x, y, w, h, label, dashed = false, tone = "normal", labelAt = "top" }: { x: number; y: number; w: number; h: number; label: string; dashed?: boolean; tone?: "normal" | "env" | "iac"; labelAt?: "top" | "bottom" }) {
  const stroke = tone === "env" ? "#5b9bd5" : tone === "iac" ? DEPLOY : "#b9c6d2";
  return <g>
    <rect x={x} y={y} width={w} height={h} rx="8" fill={tone === "env" ? "#f7fbff" : tone === "iac" ? "#f3faf7" : "none"} stroke={stroke} strokeWidth="1.1" strokeDasharray={dashed ? "5 4" : undefined} />
    <text x={x + 10} y={labelAt === "top" ? y + 13 : y + h - 11} fontSize="10.5" fontWeight="700" fill={tone === "env" ? "#0067b8" : tone === "iac" ? DEPLOY : "#4d5a67"} dominantBaseline="central" data-copy>{label}</text>
  </g>;
}
function Service({ icon, x, y, title, sub }: { icon: string; x: number; y: number; title: string; sub?: string }) {
  return <g>
    <Icon name={icon} x={x} y={y} />
    <text x={x + 32} y={y + 9} fontSize="11" fontWeight="700" fill={INK} dominantBaseline="central" data-copy>{title}</text>
    {sub && <text x={x + 32} y={y + 22} fontSize="9.5" fill="#4d5a67" dominantBaseline="central" data-copy>{sub}</text>}
  </g>;
}
function InfraDeploymentFigure() {
  const m = "career-infra";
  const gate = ["state snapshot", "plan", "live inventory 대조", "destroy · replace 판정", "apply"];
  return <svg viewBox="0 0 720 300" width={720} role="img" aria-label="운영자가 Bastion VM을 거쳐 Private 서버에 접근하는 관리 경로, 사용자 트래픽이 App Service를 거쳐 서버에 닿는 서비스 경로, 그리고 Terraform root와 state로 나뉜 변경 관리 구역이 plan과 실제 자원 대조를 거쳐 apply하는 관계">
    <Markers prefix={m} />
    {/* actors */}
    <Icon name="browser" x={34} y={44} size={26} />
    <text x={47} y={84} fontSize="11" fontWeight="700" fill={INK} textAnchor="middle" dominantBaseline="central" data-copy>운영자</text>
    <Icon name="browser" x={286} y={6} size={26} />
    <text x={320} y={19} fontSize="11" fontWeight="700" fill={INK} dominantBaseline="central" data-copy>사용자 트래픽</text>
    {/* service entry */}
    <Service icon="app-service" x={286} y={58} title="App Service" sub="managed gateway" />
    {/* bastion */}
    <Icon name="virtual-machine" x={150} y={150} />
    <text x={163} y={190} fontSize="11" fontWeight="700" fill={INK} textAnchor="middle" dominantBaseline="central" data-copy>Bastion VM</text>
    <text x={163} y={203} fontSize="9.5" fill="#4d5a67" textAnchor="middle" dominantBaseline="central" data-copy>자체 구성</text>
    {/* private boundary */}
    <Group x={250} y={106} w={210} h={110} label="Private 네트워크 · 관리 대상 서버" tone="env" labelAt="bottom" />
    <Service icon="virtual-machine" x={286} y={150} title="Private 서버" sub="Docker services" />
    {/* IaC change zone */}
    <Group x={548} y={40} w={164} h={210} label="변경 관리 구역 · Terraform IaC" tone="iac" />
    <rect x={558} y={62} width={144} height={30} rx="5" fill="#fff" stroke={DEPLOY} strokeWidth="1.1" />
    <text x={630} y={71} fontSize="10.5" fontWeight="700" fill={INK} textAnchor="middle" dominantBaseline="central" data-copy>제품군 · 환경별 root</text>
    <text x={630} y={84} fontSize="9.5" fill="#4d5a67" textAnchor="middle" dominantBaseline="central" data-copy>remote state 분리</text>
    {gate.map((g, i) => { const y = 104 + i * 28; const human = i === 3; return <g key={g}>
      <rect x={558} y={y} width={144} height={20} rx="4" fill={human ? INK : "#fff"} stroke={human ? INK : "#b9c6d2"} strokeWidth="1" />
      <text x={630} y={y + 10} fontSize="9.5" fontWeight="600" fill={human ? "#fff" : INK} textAnchor="middle" dominantBaseline="central" data-copy>{g}</text>
      {i < gate.length - 1 && <path d={`M630,${y + 20} L630,${y + 28}`} stroke="#4d5a67" strokeWidth="1.1" markerEnd={`url(#${m}-grey)`} />}
    </g>; })}
    {/* relations */}
    <Edge marker={`${m}-blue`} d="M299,34 L299,56" />
    <Edge marker={`${m}-blue`} d="M299,86 L299,148" />
    <EdgeLabel x={368} y={128} text="VNet integration" />
    <Edge marker={`${m}-grey`} fail d="M47,92 L47,163 L148,163" />
    <EdgeLabel x={104} y={151} text="관리 접근 · 인증된 관리자" fail />
    <Edge marker={`${m}-grey`} fail d="M178,163 L284,163" />
    <EdgeLabel x={231} y={151} text="관리 접속" fail />
    <Edge marker={`${m}-deploy`} color={DEPLOY} d="M558,230 L504,230 L504,196 L462,196" />
    <EdgeLabel x={504} y={246} text="apply · 자원 변경" color={DEPLOY} />
    <Edge marker={`${m}-obs`} color={OBS} fail d="M462,150 L546,150" />
    <EdgeLabel x={504} y={138} text="실제 자원 대조" color={OBS} />
    {/* legend */}
    <g fontSize="10" fill="#4d5a67">
      <line x1={22} y1={280} x2={50} y2={280} stroke={BLUE} strokeWidth="1.4" /><text x={56} y={280} dominantBaseline="central" data-copy>서비스 경로</text>
      <line x1={140} y1={280} x2={168} y2={280} stroke={GREY} strokeWidth="1.4" strokeDasharray="4 3" /><text x={174} y={280} dominantBaseline="central" data-copy>관리 접근</text>
      <line x1={250} y1={280} x2={278} y2={280} stroke={DEPLOY} strokeWidth="1.4" /><text x={284} y={280} dominantBaseline="central" data-copy>IaC 변경(apply)</text>
      <line x1={380} y1={280} x2={408} y2={280} stroke={OBS} strokeWidth="1.4" strokeDasharray="4 3" /><text x={414} y={280} dominantBaseline="central" data-copy>plan ↔ 실제 자원 대조</text>
    </g>
  </svg>;
}

/* ---------- 3. Sagak resume: approval commit and ambiguous publish recovery ---------- */
function SagakApprovalRecoveryFigure() {
  const m = "sagak-approval";
  return <svg viewBox="0 0 720 590" width={720} role="img" aria-label="승인 명령 검증, 트랜잭션 확정, 외부 발행과 응답 유실 복구 경계">
    <Markers prefix={m} />
    <text x="360" y="18" fontSize="12" fontWeight="700" fill={INK} textAnchor="middle" dominantBaseline="central" data-copy>승인 결정과 외부 발행을 한 번의 성공으로 취급하지 않는 처리 경계</text>

    <Edge marker={`${m}-blue`} d="M360,74 L360,98" />
    <Edge marker={`${m}-grey`} fail d="M282,126 L205,126" />
    <Edge marker={`${m}-grey`} fail d="M438,126 L515,126" />
    <Edge marker={`${m}-blue`} d="M360,156 L360,184" />
    <Edge marker={`${m}-blue`} d="M360,244 L360,270" />
    <Edge marker={`${m}-blue`} d="M360,326 L360,350" />
    <Edge marker={`${m}-blue`} d="M360,406 L360,424" />
    <Edge marker={`${m}-blue`} d="M282,454 L215,454 L215,492" />
    <Edge marker={`${m}-grey`} fail d="M438,454 L505,454 L505,492" />

    <Box cx={360} cy={52} w={250} tone="human" title="승인 명령 수신" sub={["명령 ID · payload fingerprint · 수정 revision"]} />
    <Diamond cx={360} cy={126} title="명령 검증" />
    <Box cx={125} cy={126} w={160} tone="fail" title="기존 결과 반환" sub={["동일 ID · 동일 payload"]} />
    <Box cx={595} cy={126} w={160} tone="fail" title="충돌 거부" sub={["동일 ID · 다른 payload"]} />
    <Box cx={360} cy={214} w={330} tone="decision" title="한 트랜잭션으로 확정" sub={["수정본 · 승인 결정 · 발행 job", "commit 전에는 worker에 전달하지 않음"]} />
    <Box cx={360} cy={298} w={260} title="commit 뒤 worker 전달" sub={["lease · attempt token으로 점유"]} />
    <Box cx={360} cy={378} w={260} title="외부 발행 호출" sub={["호출 전 실패와 호출 뒤 결과 불명을 구분"]} />
    <Diamond cx={360} cy={454} title="발행 결과 확인?" />
    <Box cx={215} cy={518} w={230} tone="end" title="발행 완료 기록" sub={["확인된 외부 결과 반영"]} />
    <Box cx={505} cy={518} w={260} tone="fail" title="기존 시도 조회 뒤 선택적 재개" sub={["발행 완료 건은 건너뜀", "미발행 건만 lease 만료 뒤 재개"]} />

    <EdgeLabel x={244} y={112} text="동일 재전송" fail />
    <EdgeLabel x={476} y={112} text="payload 충돌" fail />
    <EdgeLabel x={392} y={171} text="신규 명령" />
    <EdgeLabel x={250} y={440} text="확인" />
    <EdgeLabel x={470} y={440} text="응답 유실 · 결과 불명" fail />
    <text x="12" y="580" fontSize="10" fill="#6b7683" data-copy>실선 확정 경로 · 점선 재전송/충돌/결과 불명 경계 · 실제 외부 호출 결과를 추정해 새 발행으로 덮어쓰지 않음</text>
  </svg>;
}

/* ---------- 4. Sagak resume: current medical consultation use vs work-in-progress knowledge platform ---------- */
function SagakMedicalKnowledgeBoundaryFigure() {
  const m = "sagak-medical";
  return <svg viewBox="0 0 720 470" width={720} role="img" aria-label="현재 운영 확인된 의료 용어 활용과 구현 및 검증 중인 지식 관리 경계의 분리">
    <Markers prefix={m} />

    <rect x="12" y="20" width="696" height="142" rx="8" fill="#f4f8ff" stroke="#7f9fc0" strokeWidth="1.2" />
    <text x="28" y="42" fontSize="12" fontWeight="700" fill="#294f70" dominantBaseline="central" data-copy>상담 서비스 운영</text>
    <text x="126" y="42" fontSize="10.5" fill="#52708c" dominantBaseline="central" data-copy>등록 용어와 의사 검증 설명자료를 사내 상담 흐름에 활용</text>
    <Edge marker={`${m}-blue`} d="M228,103 L284,103" />
    <Edge marker={`${m}-blue`} d="M438,103 L492,103" />
    <Box cx={145} cy={103} w={166} title="등록 용어 · 설명자료" sub={["의사 검증 자료 포함"]} />
    <Box cx={360} cy={103} w={154} tone="decision" title="용어 데이터 반영" sub={["상담 문맥 보정"]} />
    <Box cx={575} cy={103} w={166} tone="end" title="사내 상담 서비스 활용" sub={["현재 확인된 운영 연결"]} />

    <rect x="12" y="182" width="696" height="272" rx="8" fill="#fafafa" stroke="#9aa3b2" strokeWidth="1.2" strokeDasharray="5 4" />
    <text x="28" y="204" fontSize="12" fontWeight="700" fill="#4d5a67" dominantBaseline="central" data-copy>지식 관리 · 검색 고도화</text>
    <text x="176" y="204" fontSize="10.5" fill="#6b7683" dominantBaseline="central" data-copy>개발 · 검증 중</text>

    <text x="28" y="238" fontSize="10.5" fontWeight="700" fill="#4d5a67" dominantBaseline="central" data-copy>검수 · 발행 후보</text>
    <Edge marker={`${m}-grey`} color={OBS} d="M160,280 L200,280" />
    <Edge marker={`${m}-grey`} color={OBS} d="M340,280 L380,280" />
    <Edge marker={`${m}-grey`} color={OBS} d="M520,280 L560,280" />
    <Box cx={90} cy={280} w={140} title="전문팀 등록" sub={["근거 · 설명자료"]} />
    <Box cx={270} cy={280} w={140} title="근거 · 검수 상태 확인" sub={["승인 이력 기록"]} />
    <Box cx={450} cy={280} w={140} tone="decision" title="공개 차단 규칙" sub={["미검수 변경 제외"]} />
    <Box cx={630} cy={280} w={140} tone="fail" title="검증용 버전" sub={["발행 후보"]} />

    <text x="28" y="344" fontSize="10.5" fontWeight="700" fill="#4d5a67" dominantBaseline="central" data-copy>검색 · 평가 경로</text>
    <Edge marker={`${m}-grey`} color={OBS} d="M160,388 L200,388" />
    <Edge marker={`${m}-grey`} color={OBS} d="M340,388 L380,388" />
    <Edge marker={`${m}-grey`} color={OBS} d="M520,388 L560,388" />
    <Box cx={90} cy={388} w={140} title="시술명 · 별칭 확정" sub={["코드 매핑"]} />
    <Box cx={270} cy={388} w={140} title="구조화 규칙 조회" sub={["관계형 데이터 우선"]} />
    <Box cx={450} cy={388} w={140} title="문헌 근거 보강" sub={["출처 포함 결과 구성"]} />
    <Box cx={630} cy={388} w={140} tone="fail" title="검색 평가 기능" sub={["승인된 평가 데이터 사용"]} />

    <text x="18" y="444" fontSize="10" fill="#6b7683" data-copy>운영 중인 상담 연계와 개발·검증 중인 지식 관리·검색 고도화의 상태를 나눠 표시했습니다.</text>
  </svg>;
}

/* ---------- 5. Ajung Networks: two independent product-learning paths from observed use ---------- */
function AjungProductLearningPathsFigure() {
  const m = "ajung-learning";
  const LearningBox = ({ cx, cy, title, sub, result = false }: { cx: number; cy: number; title: string[]; sub: string[]; result?: boolean }) => {
    const lines = [...title, ...sub];
    const h = 28 + lines.length * 18;
    const y = cy - h / 2;
    return <g>
      <rect x={cx - 150} y={y} width="300" height={h} rx={result ? h / 2 : 6} fill={result ? BLUE_SOFT : title[0].includes("가설") || title[0].includes("불편") ? BLUE_SOFT : "#fff"} stroke={result || title[0].includes("가설") || title[0].includes("불편") ? BLUE : GREY} strokeWidth="1.3" />
      {lines.map((line, index) => <text key={line} x={cx} y={y + 18 + index * 18} fontSize={index < title.length ? 15 : 13} fontWeight={index < title.length ? 700 : 400} fill={index < title.length ? INK : "#4d5a67"} textAnchor="middle" dominantBaseline="central" data-copy>{line}</text>)}
    </g>;
  };
  const lane = ({ x, title, subtitle, steps, result }: { x: number; title: string; subtitle: string[]; steps: { title: string[]; sub: string[] }[]; result: { title: string[]; sub: string[] } }) => <g>
    <rect x={x} y="46" width="336" height="454" rx="8" fill="#fff" stroke="#c8d0da" strokeWidth="1.2" />
    <text x={x + 18} y="74" fontSize="16" fontWeight="700" fill={INK} dominantBaseline="central" data-copy>{title}</text>
    <Lines x={x + 18} y={104} lines={subtitle} size={13} weight={400} fill="#5c6878" anchor="start" />
    {steps.map((step, index) => {
      const cy = 160 + index * 92;
      return <g key={step.title.join("|")}>
        {index > 0 && <Edge marker={`${m}-blue`} d={`M${x + 168},${cy - 60} L${x + 168},${cy - 36}`} />}
        <LearningBox cx={x + 168} cy={cy} title={step.title} sub={step.sub} />
      </g>;
    })}
    <Edge marker={`${m}-blue`} d={`M${x + 168},376 L${x + 168},398`} />
    <LearningBox cx={x + 168} cy={452} title={result.title} sub={result.sub} result />
  </g>;
  return <svg viewBox="0 0 720 530" width={720} role="img" aria-label="사용 행동 관찰에서 대화형 인터페이스 실험과 기존 생성 흐름 개선으로 이어진 두 개의 독립 경로">
    <Markers prefix={m} />
    <text x="360" y="20" fontSize="15" fontWeight="700" fill={INK} textAnchor="middle" dominantBaseline="central" data-copy>사용 행동에서 출발한 두 개의 제품 학습 경로</text>
    {lane({
      x: 12,
      title: "대화형 인터페이스 실험",
      subtitle: ["소재 입력 방식에서", "새 인터페이스 수요를 발견"],
      steps: [
        { title: ["지시형 요청 행동 관찰"], sub: ["소재 입력란에 ‘~해줘’ 요청"] },
        { title: ["대화형 수요 가설"], sub: ["기존 API를 MCP Agent로 연결"] },
        { title: ["실제 고객 A/B 테스트"], sub: ["SNS를 활발히 쓰는 고객 대상"] },
      ],
      result: { title: ["약 2주 테스트"], sub: ["기존 이용 기준 대비 방문 횟수 3.6배 관측", "구독 유지 · 상위 요금제 결제 사례"] },
    })}
    {lane({
      x: 372,
      title: "기존 생성 흐름 개선",
      subtitle: ["여러 글을 미리 만드는", "사용 방식에 맞춰 흐름을 변경"],
      steps: [
        { title: ["여러 글 사전 생성 행동 관찰"], sub: ["임시저장할 글을 여러 개 생성"] },
        { title: ["동기 흐름의 불편 판단"], sub: ["한 건씩 완료를 기다려야 함"] },
        { title: ["백그라운드 생성으로 전환"], sub: ["생성 작업을 뒤에서 이어서 처리"] },
      ],
      result: { title: ["다른 작업을 이어갈 수 있는", "생성 흐름"], sub: ["결과는 이후 확인"] },
    })}
  </svg>;
}

function SagakApprovalRecoveryMobileFigure() {
  return <div className={styles.mobileDiagram} role="img" aria-label="승인 명령 검증부터 외부 발행 결과 확인과 선택적 재개까지의 처리 경계">
    <strong className={styles.mobileDiagramTitle}>승인과 외부 발행의 처리 경계</strong>
    <ol className={styles.mobileSteps}>
      <li><strong>승인 명령 수신</strong><span>명령 ID · 내용 식별값 · 수정본</span></li>
      <li><strong>명령 검증</strong><span>동일 재전송은 기존 결과 · 내용 충돌은 거부</span></li>
      <li><strong>한 트랜잭션으로 확정</strong><span>수정본 · 승인 결정 · 발행 작업</span></li>
      <li><strong>확정 뒤 외부 발행</strong><span>작업 점유 후 호출 · 호출 전 실패와 결과 불명 구분</span></li>
    </ol>
    <div className={styles.mobileBranches}>
      <div><b>결과 확인</b><span>발행 완료 기록</span></div>
      <div><b>응답 유실</b><span>기존 시도 조회 뒤 미발행 건만 재개</span></div>
    </div>
  </div>;
}

function SagakMedicalKnowledgeMobileFigure() {
  return <div className={styles.mobileDiagram} role="img" aria-label="운영 중인 상담 서비스와 개발 및 검증 중인 의료 지식 관리 검색 경계">
    <section className={styles.mobileLane}>
      <strong>상담 서비스 운영</strong>
      <p>등록 용어·설명자료 → 용어 데이터 반영 → 사내 상담 서비스 활용</p>
    </section>
    <section className={`${styles.mobileLane} ${styles.mobileLanePending}`}>
      <strong>지식 관리·검색 고도화 <small>개발·검증 중</small></strong>
      <p><b>검수·발행</b> 전문팀 등록 → 근거·검수 상태 확인 → 미검수 공개 차단 → 검증용 버전</p>
      <p><b>검색·평가</b> 시술명·별칭 확정 → 구조화 규칙 조회 → 문헌 근거 보강 → 승인 데이터로 평가</p>
    </section>
  </div>;
}

function AjungProductLearningPathsMobileFigure() {
  return <div className={styles.mobileDiagram} role="img" aria-label="사용 행동에서 출발한 대화형 인터페이스 실험과 기존 생성 흐름 개선">
    <section className={styles.mobileLane}>
      <strong>대화형 인터페이스 실험</strong>
      <p>지시형 요청 관찰 → 대화형 수요 가설 → MCP Agent 고객 A/B 테스트</p>
      <p><b>약 2주 테스트</b> 기존 이용 기준 대비 방문 횟수 3.6배 관측 · 구독 유지 · 상위 요금제 결제 사례</p>
    </section>
    <section className={styles.mobileLane}>
      <strong>기존 생성 흐름 개선</strong>
      <p>임시저장할 글을 여러 개 생성 → 동기 흐름의 불편 판단 → 백그라운드 생성으로 전환</p>
      <p><b>결과</b> 다른 작업을 이어갈 수 있는 생성 흐름</p>
    </section>
  </div>;
}

/* ---------- 6. Socar: shared development roles (relationships, not a sequence) ---------- */
type SocarRoleBoxProps = {
  x: number; y: number; w: number; h: number; eyebrow: string; title: string;
  lines: string[]; tone?: "normal" | "template" | "owner";
};

function SocarRoleBox({ x, y, w, h, eyebrow, title, lines, tone = "normal" }: SocarRoleBoxProps) {
  const fill = tone === "template" ? BLUE_SOFT : tone === "owner" ? "#f3faf7" : "#fff";
  const stroke = tone === "template" ? BLUE : tone === "owner" ? DEPLOY : GREY;
  return <g>
    <rect x={x} y={y} width={w} height={h} rx="9" fill={fill} stroke={stroke} strokeWidth="1.4" />
    <text x={x + 18} y={y + 24} fontSize="13" fontWeight="700" fill={tone === "template" ? BLUE : tone === "owner" ? DEPLOY : OBS} dominantBaseline="central" data-copy>{eyebrow}</text>
    <text x={x + 18} y={y + 52} fontSize="17" fontWeight="700" fill={INK} dominantBaseline="central" data-copy>{title}</text>
    {lines.map((line, index) => <text key={line} x={x + 18} y={y + 82 + index * 22} fontSize="14.5" fill="#4d5a67" dominantBaseline="central" data-copy>{line}</text>)}
  </g>;
}

function SocarSharedDevelopmentRolesFigure() {
  const m = "socar-roles";
  return <svg viewBox="0 0 720 440" width={720} role="img" aria-label="기능 담당자와 coding agent, 공통 FastAPI 템플릿, 김대정의 설계와 지원 역할 관계">
    <Markers prefix={m} />
    <text x="360" y="22" fontSize="17" fontWeight="700" fill={INK} textAnchor="middle" dominantBaseline="central" data-copy>동료의 기능 구현을 지원하는 공통 개발 기반</text>

    <Edge marker={`${m}-blue`} d="M384,154 C430,154 446,154 486,154" />
    <Edge marker={`${m}-deploy`} color={DEPLOY} d="M314,270 C314,242 314,226 314,206" />
    <Edge marker={`${m}-deploy`} color={DEPLOY} d="M416,304 C474,300 518,272 550,224" />

    <SocarRoleBox x={18} y={80} w={296} h={126} eyebrow="공통 기본값" title="공통 FastAPI 템플릿" lines={["계층 · API 계약", "트랜잭션 · 세션 · 검증 규칙"]} tone="template" />
    <SocarRoleBox x={486} y={80} w={216} h={144} eyebrow="기능 구현" title="기능 담당자 +" lines={["coding agent", "제품 기능 구현"]} />
    <SocarRoleBox x={210} y={270} w={276} h={126} eyebrow="설계 · 지원" title="김대정" lines={["템플릿 설계·구축", "구현 결과 피드백·배포 지원"]} tone="owner" />

    <EdgeLabel x={414} y={140} text="공통 기본값 제공" />
    <EdgeLabel x={314} y={239} text="설계·구축" color={DEPLOY} />
    <EdgeLabel x={514} y={272} text="피드백·배포 지원" color={DEPLOY} />
    <text x="18" y="428" fontSize="11.5" fill="#6b7683" data-copy>기능 구현 책임과 공통 기반의 설계·지원 역할을 나눠 표시했습니다.</text>
  </svg>;
}

type SocarLargeBoxProps = {
  cx: number; cy: number; w: number; title: string; sub: string[];
  tone?: "normal" | "decision" | "result" | "fail";
};

function SocarLargeBox({ cx, cy, w, title, sub, tone = "normal" }: SocarLargeBoxProps) {
  const h = 44 + sub.length * 20;
  const x = cx - w / 2, y = cy - h / 2;
  const fill = tone === "decision" || tone === "result" ? BLUE_SOFT : tone === "fail" ? GREY_SOFT : "#fff";
  const stroke = tone === "decision" || tone === "result" ? BLUE : GREY;
  return <g>
    <rect x={x} y={y} width={w} height={h} rx={tone === "result" ? h / 2 : 7} fill={fill} stroke={stroke} strokeWidth="1.4" strokeDasharray={tone === "fail" ? "5 4" : undefined} />
    <text x={cx} y={y + 21} fontSize="16" fontWeight="700" fill={INK} textAnchor="middle" dominantBaseline="central" data-copy>{title}</text>
    {sub.map((line, index) => <text key={line} x={cx} y={y + 45 + index * 20} fontSize="14.5" fill="#4d5a67" textAnchor="middle" dominantBaseline="central" data-copy>{line}</text>)}
  </g>;
}

function SocarApprovalRecoveryFigure() {
  const m = "socar-approval";
  return <svg viewBox="0 0 720 520" width={720} role="img" aria-label="승인 명령을 검증하고 트랜잭션 확정 뒤 외부 발행 결과 확인 또는 기존 시도 복구로 나누는 처리 경계">
    <Markers prefix={m} />
    <text x="360" y="22" fontSize="17" fontWeight="700" fill={INK} textAnchor="middle" dominantBaseline="central" data-copy>승인 상태와 외부 발행 실패를 분리해 처리</text>
    <Edge marker={`${m}-blue`} d="M360,92 L360,114" />
    <Edge marker={`${m}-blue`} d="M360,184 L360,208" />
    <Edge marker={`${m}-blue`} d="M360,298 L360,320" />
    <Edge marker={`${m}-blue`} d="M324,390 C278,414 230,424 185,438" />
    <Edge marker={`${m}-grey`} fail d="M396,390 C438,414 472,424 505,438" />

    <SocarLargeBox cx={360} cy={70} w={430} title="승인 명령 검증" sub={["동일 명령 재전송은 기존 결과 · 내용 충돌은 거부"]} tone="decision" />
    <SocarLargeBox cx={360} cy={150} w={500} title="수정본·승인 결정·발행 작업을 한 트랜잭션으로 확정" sub={["확정 전에는 외부 발행 worker로 전달하지 않음"]} tone="decision" />
    <SocarLargeBox cx={360} cy={253} w={430} title="확정 뒤 외부 발행" sub={["lease·attempt token으로 작업 점유", "호출 전 실패와 호출 뒤 결과 불명을 구분"]} />
    <path d="M282,355 L360,320 L438,355 L360,390 Z" fill={BLUE_SOFT} stroke={BLUE} strokeWidth="1.4" />
    <text x="360" y="355" fontSize="16" fontWeight="700" fill={INK} textAnchor="middle" dominantBaseline="central" data-copy>발행 결과 확인?</text>
    <SocarLargeBox cx={185} cy={462} w={270} title="발행 완료 기록" sub={["확인된 외부 결과 반영"]} tone="result" />
    <SocarLargeBox cx={505} cy={462} w={360} title="기존 시도 조회 뒤 선택적 재개" sub={["완료 건은 건너뛰고 미발행 건만 재개"]} tone="fail" />
    <EdgeLabel x={242} y={409} text="결과 확인" />
    <EdgeLabel x={466} y={409} text="응답 유실 · 결과 불명" fail />
    <text x="14" y="512" fontSize="11.5" fill="#6b7683" data-copy>승인 결정의 확정과 외부 발행 결과의 확인·복구를 서로 다른 경계로 관리합니다.</text>
  </svg>;
}

function SocarSharedDevelopmentRolesMobileFigure() {
  return <div className={styles.mobileDiagram} role="img" aria-label="기능 구현과 공통 개발 기반의 역할 관계">
    <strong className={styles.mobileDiagramTitle}>동료의 기능 구현을 지원하는 공통 개발 기반</strong>
    <section className={styles.mobileLane}>
      <strong>공통 FastAPI 템플릿</strong>
      <p>계층·API 계약 · 트랜잭션·세션 · 검증 규칙</p>
    </section>
    <section className={styles.mobileLane}>
      <strong>기능 담당자 + coding agent</strong>
      <p><b>공통 기본값을 받아</b> 제품 기능 구현</p>
    </section>
    <section className={styles.mobileLane}>
      <strong>김대정</strong>
      <p>템플릿 설계·구축 · 구현 결과 피드백·배포 지원</p>
    </section>
  </div>;
}

/* ---------- 7. Featuring: separate collection/reporting and evaluation-data loading ---------- */
function FeaturingDataWorkflowsFigure() {
  const m = "featuring-data";
  const stages = [
    {
      x: 18,
      tone: BLUE,
      fill: BLUE_SOFT,
      eyebrow: "Node.js · 수집·보고",
      title: "Threads 게시물·성과 시계열",
      steps: [
        ["수집·정제", "DB 동기화"],
        ["SQL 비교 보고", "전일·작성자별"],
      ],
    },
    {
      x: 372,
      tone: DEPLOY,
      fill: "#f3faf7",
      eyebrow: "Python · 평가 데이터 적재",
      title: "한국어 본문·이어쓰기",
      steps: [
        ["입력 검증", "source key upsert"],
        ["이어쓰기 교체", "독립 평가 데이터"],
        ["로컬 재적재 검증", "기존 평가 보존 확인"],
      ],
    },
  ];
  return <svg viewBox="0 0 720 372" width={720} role="img" aria-label="Node.js 수집과 비교 보고, Python 평가 데이터 적재를 서로 다른 구현 영역으로 구분한 도식">
    <Markers prefix={m} />
    <text x="360" y="23" fontSize="17" fontWeight="700" fill={INK} textAnchor="middle" dominantBaseline="central" data-copy>SNS 수집·보고와 Python 평가 데이터 적재</text>
    {stages.map((stage) => <g key={stage.eyebrow}>
      <rect x={stage.x} y="52" width="330" height="286" rx="12" fill={stage.fill} stroke={stage.tone} strokeWidth="1.5" />
      <text x={stage.x + 18} y="78" fontSize="15" fontWeight="700" fill={stage.tone} dominantBaseline="central" data-copy>{stage.eyebrow}</text>
      <text x={stage.x + 18} y="108" fontSize="17" fontWeight="700" fill={INK} dominantBaseline="central" data-copy>{stage.title}</text>
      {stage.steps.map(([title, detail], index) => {
        const y = 132 + index * 65;
        return <g key={title}>
          {index > 0 && <path d={`M${stage.x + 165},${y - 14} L${stage.x + 165},${y - 4}`} fill="none" stroke={stage.tone} strokeWidth="1.5" markerEnd={`url(#${m}-${stage.tone === BLUE ? "blue" : "deploy"})`} />}
          <rect x={stage.x + 18} y={y} width="294" height="50" rx="7" fill="#fff" stroke={stage.tone} strokeWidth="1.2" />
          <text x={stage.x + 34} y={y + 16} fontSize="15" fontWeight="700" fill={INK} dominantBaseline="central" data-copy>{title}</text>
          <text x={stage.x + 34} y={y + 36} fontSize="15" fill="#4d5a67" dominantBaseline="central" data-copy>{detail}</text>
        </g>;
      })}
    </g>)}
    <line x1="360" y1="62" x2="360" y2="328" stroke="#c8ced7" strokeWidth="1.2" strokeDasharray="5 5" />
    <rect x="281" y="344" width="158" height="22" rx="11" fill="#fff" stroke={GREY} />
    <text x="360" y="355" fontSize="15" fontWeight="700" fill="#5d6875" textAnchor="middle" dominantBaseline="central" data-copy>서로 다른 구현 범위</text>
  </svg>;
}

/* ---------- 8. Featuring: external wait outside a short database transaction ---------- */
type FeaturingBoundaryStageProps = {
  x: number; w: number; title: string; lines: string[]; tone: "external" | "db";
};

function FeaturingBoundaryStage({ x, w, title, lines, tone }: FeaturingBoundaryStageProps) {
  const color = tone === "external" ? BLUE : DEPLOY;
  return <g>
    <rect x={x} y="110" width={w} height="122" rx="9" fill="#fff" stroke={color} strokeWidth="1.4" />
    <text x={x + w / 2} y="145" fontSize="16" fontWeight="700" fill={INK} textAnchor="middle" dominantBaseline="central" data-copy>{title}</text>
    {lines.map((line, index) => <text key={line} x={x + w / 2} y={174 + index * 21} fontSize="15" fill="#4d5a67" textAnchor="middle" dominantBaseline="central" data-copy>{line}</text>)}
  </g>;
}

function FeaturingExternalIoDbBoundaryFigure() {
  const m = "featuring-io-db";
  return <svg viewBox="0 0 720 330" width={720} role="img" aria-label="외부 콘텐츠 응답 대기와 짧은 데이터베이스 저장 트랜잭션을 분리한 처리 경계">
    <Markers prefix={m} />
    <text x="360" y="23" fontSize="17" fontWeight="700" fill={INK} textAnchor="middle" dominantBaseline="central" data-copy>외부 응답 대기와 DB 저장의 경계</text>

    <rect x="18" y="54" width="332" height="238" rx="12" fill={BLUE_SOFT} stroke={BLUE} strokeWidth="1.5" />
    <text x="36" y="80" fontSize="16" fontWeight="700" fill={BLUE} dominantBaseline="central" data-copy>외부 I/O 구간 · 트랜잭션 밖</text>
    <FeaturingBoundaryStage x={36} w={138} title="콘텐츠 조회" lines={["응답 대기", "DB 연결 미점유", "대기 중 취소·오류"]} tone="external" />
    <FeaturingBoundaryStage x={194} w={138} title="저장 데이터 준비" lines={["응답 뒤 검증", "저장 입력 구성"]} tone="external" />
    <Edge marker={`${m}-blue`} d="M174,166 L192,166" />

    <rect x="390" y="54" width="312" height="238" rx="12" fill="#f3faf7" stroke={DEPLOY} strokeWidth="1.5" />
    <text x="408" y="80" fontSize="16" fontWeight="700" fill={DEPLOY} dominantBaseline="central" data-copy>DB 저장 구간 · 짧은 트랜잭션</text>
    <FeaturingBoundaryStage x={408} w={158} title="콘텐츠 원장 upsert" lines={["기존 비활성 상태 보존", "콘텐츠 정보 갱신"]} tone="db" />
    <FeaturingBoundaryStage x={586} w={98} title="commit" lines={["원장 상태", "저장 완료"]} tone="db" />
    <Edge marker={`${m}-deploy`} color={DEPLOY} d="M566,166 L584,166" />
    <Edge marker={`${m}-deploy`} color={DEPLOY} d="M332,166 C354,166 368,166 406,166" />
    <EdgeLabel x={370} y={150} text="응답·검증 뒤" color={DEPLOY} />

    <text x="36" y="254" fontSize="15" fill="#4d5a67" dominantBaseline="central" data-copy>대기 중 독립 DB 조회 진행</text>
    <text x="36" y="276" fontSize="15" fill="#4d5a67" dominantBaseline="central" data-copy>대기 중 취소·오류 시 원장 미변경</text>
    <text x="408" y="258" fontSize="15" fill="#4d5a67" dominantBaseline="central" data-copy>저장에 필요한 구간에서만 transaction 사용</text>
    <text x="360" y="316" fontSize="15" fill="#5d6875" textAnchor="middle" dominantBaseline="central" data-copy>service · repository · ORM · transaction 구현과 로컬 격리 DB로 경계를 검증</text>
  </svg>;
}

function FeaturingDataWorkflowsMobileFigure() {
  return <div className={styles.mobileDiagram} role="img" aria-label="서로 다른 SNS 데이터 구현 영역">
    <strong className={styles.mobileDiagramTitle}>SNS 수집·보고와 Python 평가 데이터 적재</strong>
    <section className={styles.mobileLane}>
      <strong>Node.js · 수집·보고</strong>
      <p>게시물·성과 시계열 → 수집·정제·DB 동기화 → 전일·작성자별 비교와 조회 증가 상위 보고</p>
    </section>
    <section className={styles.mobileLane}>
      <strong>Python · 평가 데이터 적재</strong>
      <p>입력 검증 → source key upsert·이어쓰기 교체 → 로컬 재적재에서 기존 평가 보존·건수 정합성 확인</p>
    </section>
  </div>;
}

function FeaturingExternalIoDbBoundaryMobileFigure() {
  return <div className={styles.mobileDiagram} role="img" aria-label="외부 응답 대기와 짧은 데이터베이스 저장 트랜잭션 분리">
    <strong className={styles.mobileDiagramTitle}>외부 응답 대기와 DB 저장의 경계</strong>
    <section className={styles.mobileLane}>
      <strong>외부 I/O · 트랜잭션 밖</strong>
      <p>콘텐츠 조회·응답 대기 → 저장 데이터 준비</p>
      <p><b>경계</b> DB 연결 미점유 · 대기 중 취소·오류 시 원장 미변경</p>
    </section>
    <section className={styles.mobileLane}>
      <strong>DB 저장 · 짧은 트랜잭션</strong>
      <p>응답·검증 뒤 콘텐츠 원장 upsert · 기존 비활성 상태 보존 · 콘텐츠 정보 갱신 → commit</p>
    </section>
  </div>;
}

const captions: Record<FigureBlock["id"], string> = {
  "thready-approval-publish": "책임 주체별 처리와 실패 분기 — 승인은 한 트랜잭션으로 확정, 발행은 호출 전 실패와 결과 불명을 구분해 복구",
  "infra-deployment-boundaries": "Private 서버 관리 접근과 환경별 IaC 변경 경계 (공개 패턴 수준)",
  "sagak-approval-recovery": "승인 결정은 트랜잭션으로 확정하고, 외부 발행의 응답 유실은 기존 시도를 확인한 뒤 미발행 건만 재개",
  "sagak-medical-knowledge-boundary": "현재 상담 서비스의 용어 데이터 활용과 구현·검증 중인 지식 관리·검색 경계를 분리",
  "ajung-product-learning-paths": "사용 행동에 따라 대화형 인터페이스와 기존 생성 흐름을 각각 개선",
  "socar-approval-recovery": "승인 결정은 트랜잭션으로 확정하고, 외부 발행의 응답 유실은 기존 시도를 확인한 뒤 미발행 건만 재개",
  "socar-shared-development-roles": "기능 담당자의 제품 구현과 공통 템플릿의 기본값, 김대정의 설계·피드백·배포 지원 관계",
  "featuring-data-workflows": "수집·비교 보고와 평가 데이터의 반복 적재를 각각 구현했습니다.",
  "featuring-external-io-db-boundary": "외부 응답 대기 중 독립 조회 진행과 취소·오류 시 원장 미변경을 확인했습니다.",
};
const figures: Record<FigureBlock["id"], () => ReactNode> = {
  "thready-approval-publish": ApprovalPublishFigure,
  "infra-deployment-boundaries": InfraDeploymentFigure,
  "sagak-approval-recovery": SagakApprovalRecoveryFigure,
  "sagak-medical-knowledge-boundary": SagakMedicalKnowledgeBoundaryFigure,
  "ajung-product-learning-paths": AjungProductLearningPathsFigure,
  "socar-approval-recovery": SocarApprovalRecoveryFigure,
  "socar-shared-development-roles": SocarSharedDevelopmentRolesFigure,
  "featuring-data-workflows": FeaturingDataWorkflowsFigure,
  "featuring-external-io-db-boundary": FeaturingExternalIoDbBoundaryFigure,
};
const mobileFigures: Partial<Record<FigureBlock["id"], () => ReactNode>> = {
  "sagak-approval-recovery": SagakApprovalRecoveryMobileFigure,
  "sagak-medical-knowledge-boundary": SagakMedicalKnowledgeMobileFigure,
  "ajung-product-learning-paths": AjungProductLearningPathsMobileFigure,
  "socar-approval-recovery": SagakApprovalRecoveryMobileFigure,
  "socar-shared-development-roles": SocarSharedDevelopmentRolesMobileFigure,
  "featuring-data-workflows": FeaturingDataWorkflowsMobileFigure,
  "featuring-external-io-db-boundary": FeaturingExternalIoDbBoundaryMobileFigure,
};

export function CareerFigure({ id, claims }: { id: FigureBlock["id"]; claims: string[] }) {
  const Figure = figures[id];
  const MobileFigure = mobileFigures[id];
  if (!MobileFigure) return <figure className={styles.figure} data-figure={id} data-claim={claims.join(" ")}>
    <Figure />
    <figcaption data-copy>{captions[id]}</figcaption>
  </figure>;
  return <figure className={styles.figure} data-figure={id} data-mobile-figure="" data-claim={claims.join(" ")}>
    <div className={styles.figureDesktop}><Figure /></div>
    <div className={styles.figureMobile}><MobileFigure /></div>
    <figcaption data-copy>{captions[id]}</figcaption>
  </figure>;
}
