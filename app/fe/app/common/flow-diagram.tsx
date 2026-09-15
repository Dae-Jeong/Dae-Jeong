import type { FlowBlock } from "@/content/documents/parse-markdown";
import styles from "./common.module.css";

/** Lightweight SVG flow diagram for career case visuals (no external library). Nodes are ranked by longest
 *  path from the sources, laid out in columns (LR) or rows (TD); labels are the draft's own words. */
export function FlowDiagram({ block }: { block: FlowBlock }) {
  const ids = block.nodes.map((node) => node.id);
  const rank = new Map<string, number>(ids.map((id) => [id, 0]));
  for (let pass = 0; pass < ids.length; pass++) {
    for (const edge of block.edges) rank.set(edge.to, Math.max(rank.get(edge.to) ?? 0, (rank.get(edge.from) ?? 0) + 1));
  }
  const columns = new Map<number, string[]>();
  for (const id of ids) { const r = rank.get(id) ?? 0; columns.set(r, [...(columns.get(r) ?? []), id]); }
  const depth = Math.max(...columns.keys()) + 1;
  const lanes = Math.max(...[...columns.values()].map((column) => column.length));
  // A label may carry `<br/>` line breaks (mermaid syntax); each line becomes a tspan.
  const lines = new Map(block.nodes.map((node) => [node.id, node.label.split(/<br\s*\/?>/).map((line) => line.trim())]));
  const maxLines = Math.max(...[...lines.values()].map((list) => list.length));
  const boxW = 150, boxH = maxLines > 1 ? 54 : 44, gapX = 40, gapY = 22, pad = 8, lineH = 15;
  const horizontal = block.direction === "LR";
  const position = (id: string) => {
    const r = rank.get(id) ?? 0; const column = columns.get(r) ?? []; const i = column.indexOf(id);
    const offset = ((lanes - column.length) * (boxH + gapY)) / 2;
    return horizontal
      ? { x: pad + r * (boxW + gapX), y: pad + offset + i * (boxH + gapY) }
      : { x: pad + offset * ((boxW + gapX) / (boxH + gapY)) + i * (boxW + gapX), y: pad + r * (boxH + gapY) };
  };
  // An edge that skips a rank (e.g. rank 3 → rank 5) would otherwise pass through the boxes in between; it is routed
  // around the outside (right side for TD, bottom for LR) so the picture does not imply the skipped step.
  const skips = (edge: { from: string; to: string }) => (rank.get(edge.to) ?? 0) - (rank.get(edge.from) ?? 0) > 1;
  const detour = block.edges.some(skips) ? 26 : 0;
  const width = (horizontal ? pad * 2 + depth * boxW + (depth - 1) * gapX : pad * 2 + lanes * boxW + (lanes - 1) * gapX) + (horizontal ? 0 : detour);
  const height = (horizontal ? pad * 2 + lanes * boxH + (lanes - 1) * gapY : pad * 2 + depth * boxH + (depth - 1) * gapY) + (horizontal ? detour : 0);
  const marker = `flow-arrow-${ids.join("-")}`;
  return <figure className={styles.flowFigure} data-flow data-claim={block.claims.join(" ")}>
    <svg viewBox={`0 0 ${width} ${height}`} width={width} role="img" aria-label={block.nodes.map((node) => node.label).join(" → ")}>
      <defs><marker id={marker} viewBox="0 0 8 8" refX="7" refY="4" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L8,4 L0,8 z" fill="#5c6b7a" /></marker></defs>
      {block.edges.map((edge, index) => {
        const a = position(edge.from), b = position(edge.to);
        if (skips(edge)) {
          // Leave from the outer side of the source, run along the outside, and enter the target from that same side.
          const lane = horizontal ? height - pad - detour / 2 : width - pad - detour / 2;
          const d = horizontal
            ? `M${a.x + boxW / 2},${a.y + boxH} L${a.x + boxW / 2},${lane} L${b.x + boxW / 2},${lane} L${b.x + boxW / 2},${b.y + boxH}`
            : `M${a.x + boxW},${a.y + boxH / 2} L${lane},${a.y + boxH / 2} L${lane},${b.y + boxH / 2} L${b.x + boxW},${b.y + boxH / 2}`;
          return <path key={index} d={d} fill="none" stroke="#5c6b7a" strokeWidth="1.4" markerEnd={`url(#${marker})`} />;
        }
        const start = horizontal ? { x: a.x + boxW, y: a.y + boxH / 2 } : { x: a.x + boxW / 2, y: a.y + boxH };
        const end = horizontal ? { x: b.x, y: b.y + boxH / 2 } : { x: b.x + boxW / 2, y: b.y };
        const mid = horizontal ? (start.x + end.x) / 2 : (start.y + end.y) / 2;
        const d = horizontal ? `M${start.x},${start.y} C${mid},${start.y} ${mid},${end.y} ${end.x},${end.y}` : `M${start.x},${start.y} C${start.x},${mid} ${end.x},${mid} ${end.x},${end.y}`;
        return <path key={index} d={d} fill="none" stroke="#5c6b7a" strokeWidth="1.4" markerEnd={`url(#${marker})`} />;
      })}
      {block.nodes.map((node) => { const p = position(node.id); const list = lines.get(node.id) ?? [node.label]; const top = boxH / 2 - ((list.length - 1) * lineH) / 2; return <g key={node.id} transform={`translate(${p.x},${p.y})`}>
        <rect width={boxW} height={boxH} rx="6" fill="#fff" stroke="#b9c6d2" strokeWidth="1.2" />
        <text x={boxW / 2} y={top} dominantBaseline="central" textAnchor="middle" fontSize="12" fontWeight="600" fill="#22313f" data-copy>
          {list.map((line, index) => <tspan key={index} x={boxW / 2} dy={index === 0 ? 0 : lineH}>{line}</tspan>)}
        </text>
      </g>; })}
    </svg>
  </figure>;
}
