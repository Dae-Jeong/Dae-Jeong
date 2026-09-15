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

const captions: Record<FigureBlock["id"], string> = {
  "thready-approval-publish": "책임 주체별 처리와 실패 분기 — 승인은 한 트랜잭션으로 확정, 발행은 호출 전 실패와 결과 불명을 구분해 복구",
  "infra-deployment-boundaries": "Private 서버 관리 접근과 환경별 IaC 변경 경계 (공개 패턴 수준)",
};
const figures: Record<FigureBlock["id"], () => ReactNode> = {
  "thready-approval-publish": ApprovalPublishFigure,
  "infra-deployment-boundaries": InfraDeploymentFigure,
};

export function CareerFigure({ id, claims }: { id: FigureBlock["id"]; claims: string[] }) {
  const Figure = figures[id];
  return <figure className={styles.figure} data-figure={id} data-claim={claims.join(" ")}>
    <Figure />
    <figcaption data-copy>{captions[id]}</figcaption>
  </figure>;
}
