/** Narrow, lossless reader for this review's Markdown subset; not a CMS parser. */
export type CopyBlock = {
  kind: "paragraph" | "bullet" | "skill" | "row";
  text: string;
  label?: string;
  /** "row" only (구분 | 내용 | 시기 credential table): the right-aligned period column. */
  meta?: string;
  claims: string[];
  /** "project-meta": grey one-line stack summary directly under a project heading (R3 adapter). */
  /** "service-heading": sub-heading one level under a project heading, grouping the bullets of one service (R3 adapter). */
  presentation?: "role" | "metadata" | "heading" | "subheading" | "project-meta" | "service-heading";
};
export type CopyEntry = { title?: string; blocks: CopyBlock[] };
export type CopySection = { title: string; entries: CopyEntry[] };
export type ResumeCopy = {
  name: string;
  role: string;
  careerLine: string;
  specialtyLine?: string;
  contacts: { label: string; href: string }[];
  sections: CopySection[];
};

export function parseResumeCopy(markdown: string): ResumeCopy {
  const body = markdown.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n/, "").trim();
  const [header, ...parts] = body.split(/^## /m);
  const headerLines = header.split("\n").map((line) => line.trim()).filter(Boolean);
  if (headerLines.length !== 4 || headerLines[0] !== "# 이력서") {
    throw new Error("Resume preview: unsupported header; update reader before rendering.");
  }
  const [name, ...role] = headerLines[1].split(" · ");
  const contacts = [...headerLines[3].matchAll(/\[([^\]]+)\]\(([^)]+)\)/g)].map(
    ([, label, href]) => {
      if (!/^(https:\/\/|mailto:)/.test(href)) throw new Error("Unsafe contact URL");
      return { label, href };
    },
  );
  if (contacts.length !== 3) throw new Error("Resume preview: expected three contacts.");

  const sections = parts.map((part): CopySection => {
    const [title, ...lines] = part.trim().split("\n");
    const entries: CopyEntry[] = [{ blocks: [] }];
    let entry = entries[0];
    let claims: string[] = [];
    for (const raw of lines) {
      const line = raw.trim();
      if (!line) continue;
      const match = line.match(/^<!-- claims: (.*?) -->$/);
      if (match) {
        claims = match[1].split(/\s+/);
      } else if (line.startsWith("### ")) {
        entry = { title: line.slice(4), blocks: [] };
        entries.push(entry);
        claims = [];
      } else if (line.startsWith("|")) {
        const cells = line.split("|").slice(1, -1).map((cell) => cell.trim());
        if (cells.length !== 2) throw new Error("Resume preview: expected two skill columns.");
        if (cells[0] === "분야" || cells.every((cell) => /^-+$/.test(cell))) continue;
        entry.blocks.push({ kind: "skill", label: cells[0], text: cells[1], claims });
      } else {
        // Never leak frontmatter/comments or silently reinterpret new Markdown syntax.
        if (/^(?:#|<|>|```|\d+\.)/.test(line) || /\*\*|\]\(/.test(line)) {
          throw new Error("Resume preview: unsupported copy syntax.");
        }
        const bullet = line.startsWith("- ");
        entry.blocks.push({ kind: bullet ? "bullet" : "paragraph", text: bullet ? line.slice(2) : line, claims });
      }
    }
    return { title, entries: entries.filter((item) => item.title || item.blocks.length) };
  });
  const expected = ["소개", "대표 성과", "경력", "기술", "외부 활동", "수상·특허·자격·학력"];
  if (sections.map((section) => section.title).join("|") !== expected.join("|")) {
    throw new Error("Resume preview: section contract changed; review the layout mapping.");
  }
  return { name, role: role.join(" · "), careerLine: headerLines[2], contacts, sections };
}
