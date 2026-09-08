/** Import-time adapter for reviewed copy. Public routes consume app-owned JSON, never wiki files. */
export type TextBlock = { kind: "paragraph" | "bullet"; text: string; claims: string[] };
export type TableBlock = { kind: "table"; columns: string[]; rows: string[][]; claims: string[] };
export type ContentBlock = TextBlock | TableBlock;
export type ContentSection = { title: string; period?: string; level: number; blocks: ContentBlock[]; children: ContentSection[] };
export type ContentDocument = { title: string; header: ContentBlock[]; sections: ContentSection[] };

export function parseReview(markdown: string): ContentDocument {
  const lines = markdown.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n/, "").split(/\r?\n/);
  const document: ContentDocument = { title: "", header: [], sections: [] };
  const stack: ContentSection[] = [];
  let claims: string[] = [];
  const blocks = () => stack.at(-1)?.blocks ?? document.header;
  for (let index = 0; index < lines.length; index++) {
    const line = lines[index].trim();
    if (!line) continue;
    const claim = line.match(/^<!-- claims: (.+) -->$/);
    if (claim) { claims = claim[1].split(/\s+/); continue; }
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
    blocks().push({ kind: line.startsWith("- ") ? "bullet" : "paragraph", text: line.replace(/^- /, ""), claims: [...claims] });
  }
  if (!document.title || !document.sections.length) throw new Error("Document needs a title and sections");
  return document;
}
