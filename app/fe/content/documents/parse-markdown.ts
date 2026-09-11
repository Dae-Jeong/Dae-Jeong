/** Import-time adapter for reviewed copy. Public routes consume app-owned JSON, never wiki files. */
export type TextBlock = { kind: "paragraph" | "bullet"; text: string; claims: string[]; presentation?: "role" | "metadata" };
export type TableBlock = { kind: "table"; columns: string[]; rows: string[][]; claims: string[] };
export type ContentBlock = TextBlock | TableBlock;
export type CaseVisual = { label: string; steps: { title: string; detail: string; incoming?: string }[]; caption: string; claims: string[] };
export type ContentSection = { emphasis?: "supporting"; visual?: CaseVisual; visuals?: CaseVisual[]; title: string; period?: string; level: number; blocks: ContentBlock[]; children: ContentSection[] };
export type ContentDocument = { title: string; header: ContentBlock[]; sections: ContentSection[] };

export function parseReview(markdown: string): ContentDocument {
  const lines = markdown.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n/, "").split(/\r?\n/);
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
