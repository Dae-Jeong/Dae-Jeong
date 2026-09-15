/** Import-time adapter for reviewed copy. Public routes consume app-owned JSON, never wiki files. */
/** presentation "label": short bold sub-label inside a career case (문제와 판단 / 구현과 운영 / 결과) — set by the revision exporter, never by hand. */
export type TextBlock = { kind: "paragraph" | "bullet"; text: string; claims: string[]; presentation?: "role" | "metadata" | "label" };
export type TableBlock = { kind: "table"; columns: string[]; rows: string[][]; claims: string[] };
/** Lightweight flow diagram (career draft `mermaid flowchart` converted at export time): nodes + directed edges, laid out by the renderer. */
export type FlowBlock = { kind: "flow"; direction: "LR" | "TD"; nodes: { id: string; label: string }[]; edges: { from: string; to: string }[]; claims: string[] };
/** Career-only static figure drawn by a React component (see app/common/career-figures.tsx); the id is the only content. */
export type FigureBlock = { kind: "figure"; id: "thready-approval-publish" | "infra-deployment-boundaries"; claims: string[] };
/** Career-only rendered diagram image (PNG under /public, 2026-09-14): short heading + full-width image linked to the original + one-line caption. */
export type ImageBlock = { kind: "image"; src: string; alt: string; title: string; caption: string; width: number; height: number; claims: string[] };
export type ContentBlock = TextBlock | TableBlock | FlowBlock | FigureBlock | ImageBlock;
export type CaseVisual = { label: string; steps: { title: string; detail: string; incoming?: string }[]; caption: string; claims: string[] };
export type ContentSection = { emphasis?: "supporting"; visual?: CaseVisual; visuals?: CaseVisual[]; title: string; period?: string; level: number; blocks: ContentBlock[]; children: ContentSection[] };
export type ContentDocument = { title: string; header: ContentBlock[]; sections: ContentSection[] };

export function parseReview(markdown: string): ContentDocument {
  // Markdown hard break: a copy line ending with "\" continues on the next line inside the same paragraph
  // (renderer Inline draws "\n" as <br>), so one result line can break at a meaning boundary (R3, 2026-09-15).
  const lines = markdown.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n/, "").replace(/\\\r?\n(?=\S)/g, "\u0000").split(/\r?\n/).map((line) => line.replace(/\u0000/g, "\n"));
  const document: ContentDocument = { title: "", header: [], sections: [] };
  const stack: ContentSection[] = [];
  let claims: string[] = [];
  let presentation: TextBlock["presentation"];
  const blocks = () => stack.at(-1)?.blocks ?? document.header;
  for (let index = 0; index < lines.length; index++) {
    const line = lines[index].trim();
    if (!line) continue;
    const claim = line.match(/^<!-- claims: (.*?) -->$/);
    if (claim) { claims = claim[1].split(/\s+/).filter(Boolean); continue; }
    const figure = line.match(/^<!-- figure: ([a-z0-9-]+) -->$/);
    if (figure) {
      if (figure[1] !== "thready-approval-publish" && figure[1] !== "infra-deployment-boundaries") throw new Error(`Unknown figure ${figure[1]}`);
      blocks().push({ kind: "figure", id: figure[1], claims: [...claims] });
      continue;
    }
    const image = line.match(/^<!-- image: (.+) -->$/);
    if (image) {
      const spec = JSON.parse(image[1]) as Omit<ImageBlock, "kind" | "claims">;
      if (!/^\/portfolio\/[a-z0-9-]+\.(png|svg)$/.test(spec.src) || !spec.alt || !spec.title || !spec.caption || !(spec.width > 0) || !(spec.height > 0)) throw new Error(`Invalid image block ${image[1]}`);
      blocks().push({ kind: "image", claims: [...claims], ...spec });
      continue;
    }
    const flow = line.match(/^<!-- flow: (.+) -->$/);
    if (flow) { blocks().push({ kind: "flow", claims: [...claims], ...(JSON.parse(flow[1]) as Omit<FlowBlock, "kind" | "claims">) }); continue; }
    const annotation = line.match(/^<!-- (presentation|emphasis|visual|visuals): (.+) -->$/);
    if (annotation) {
      const [, key, value] = annotation;
      if (key === "presentation") {
        if (value !== "role" && value !== "metadata") throw new Error("Invalid presentation");
        presentation = value;
      } else {
        const section = stack.at(-1);
        if (!section) throw new Error("Section annotation outside section");
        if (key === "emphasis") {
          if (value !== "supporting") throw new Error("Invalid emphasis");
          section.emphasis = value;
        } else if (key === "visual") section.visual = JSON.parse(value) as CaseVisual;
        else section.visuals = JSON.parse(value) as CaseVisual[];
      }
      continue;
    }
    const heading = line.match(/^(#{1,4}) (.+)$/);
    if (heading) {
      claims = [];
      const level = heading[1].length;
      if (level === 1) { document.title = heading[2]; continue; }
      while (stack.length && stack.at(-1)!.level >= level) stack.pop();
      const section: ContentSection = { title: heading[2], level, blocks: [], children: [] };
      (stack.at(-1)?.children ?? document.sections).push(section);
      stack.push(section);
      continue;
    }
    if (line.startsWith("|")) {
      const cells = (value: string) => value.trim().slice(1, -1).split("|").map((cell) => cell.trim());
      if (!/^\|[\s:|\-]+\|$/.test(lines[index + 1]?.trim() ?? "")) throw new Error(`Table delimiter missing at ${index + 1}`);
      const table: TableBlock = { kind: "table", columns: cells(line), rows: [], claims: [...claims] };
      index += 2;
      for (; index < lines.length && lines[index].trim().startsWith("|"); index++) {
        const row = cells(lines[index]);
        if (row.length !== table.columns.length) throw new Error(`Invalid table row at ${index + 1}`);
        table.rows.push(row);
      }
      index--;
      blocks().push(table);
      continue;
    }
    if (/^(?:<|#{5}|```|>)/.test(line)) throw new Error(`Unsupported copy syntax: ${line}`);
    blocks().push({ kind: line.startsWith("- ") ? "bullet" : "paragraph", text: line.replace(/^- /, ""), claims: [...claims], ...(presentation ? { presentation } : {}) });
    presentation = undefined;
  }
  if (!document.title || !document.sections.length) throw new Error("Document needs a title and sections");
  return document;
}
