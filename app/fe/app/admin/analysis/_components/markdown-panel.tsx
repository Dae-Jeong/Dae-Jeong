import type { ReactNode } from "react";

function parseInline(text: string): ReactNode[] {
  // Regex matches: [link](url), **bold**, `code`
  const regex = /(\[([^\]]+)\]\(([^)]+)\)|\*\*([^*]+)\*\*|`([^`]+)`)/g;
  const nodes: ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      nodes.push(text.slice(lastIndex, match.index));
    }
    if (match[2] && match[3]) {
      // Link [text](url)
      const href = match[3];
      const isExternal = href.startsWith("http://") || href.startsWith("https://");
      nodes.push(
        <a
          key={match.index}
          href={href}
          target={isExternal ? "_blank" : undefined}
          rel={isExternal ? "noopener noreferrer" : undefined}
          className="text-fg underline decoration-border-soft underline-offset-4 hover:decoration-fg"
        >
          {match[2]}
        </a>
      );
    } else if (match[4]) {
      // Bold **text**
      nodes.push(
        <strong key={match.index} className="font-semibold text-fg">
          {match[4]}
        </strong>
      );
    } else if (match[5]) {
      // Code `text`
      nodes.push(
        <code
          key={match.index}
          className="rounded bg-fg/5 px-1.5 py-0.5 font-mono text-[12px] text-fg"
        >
          {match[5]}
        </code>
      );
    }
    lastIndex = regex.lastIndex;
  }

  if (lastIndex < text.length) {
    nodes.push(text.slice(lastIndex));
  }

  return nodes.length > 0 ? nodes : [text];
}

const ORDERED_ITEM = /^\d+\.\s+/;
// "## 1. 회사가 진짜 찾는 사람" 같은 번호 섹션은 실전 4단 카드로 묶는다.
const NUMBERED_SECTION = /^##\s+(\d+)\.\s+(.+)$/;
// "## 부록 …" 이후 전부는 claim 근거 원장이므로 기본 접힘으로 보여준다.
const APPENDIX_SECTION = /^##\s+부록/;

function renderBlocks(lines: string[], keyPrefix: string): ReactNode[] {
  const elements: ReactNode[] = [];

  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    const trimmed = line.trim();
    const key = `${keyPrefix}-${i}`;

    if (!trimmed) {
      i++;
      continue;
    }

    // Heading 1
    if (trimmed.startsWith("# ")) {
      elements.push(
        <h1 key={key} className="mt-6 mb-3 text-[20px] font-bold leading-tight text-fg first:mt-0">
          {parseInline(trimmed.slice(2))}
        </h1>
      );
      i++;
      continue;
    }

    // Heading 2
    if (trimmed.startsWith("## ")) {
      elements.push(
        <h2 key={key} className="mt-5 mb-2.5 border-b border-border pb-1.5 text-[16px] font-semibold leading-snug text-fg">
          {parseInline(trimmed.slice(3))}
        </h2>
      );
      i++;
      continue;
    }

    // Heading 3
    if (trimmed.startsWith("### ")) {
      elements.push(
        <h3 key={key} className="mt-4 mb-2 text-[14px] font-semibold leading-normal text-fg">
          {parseInline(trimmed.slice(4))}
        </h3>
      );
      i++;
      continue;
    }

    // Heading 4
    if (trimmed.startsWith("#### ")) {
      elements.push(
        <h4 key={key} className="mt-3 mb-1.5 text-[13px] font-medium leading-normal text-fg">
          {parseInline(trimmed.slice(5))}
        </h4>
      );
      i++;
      continue;
    }

    // Blockquote
    if (trimmed.startsWith("> ")) {
      elements.push(
        <blockquote key={key} className="my-2 border-l-2 border-border pl-3 text-[13px] italic text-muted">
          {parseInline(trimmed.slice(2))}
        </blockquote>
      );
      i++;
      continue;
    }

    // Table: starts with |
    if (trimmed.startsWith("|") && trimmed.endsWith("|")) {
      const tableLines: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith("|") && lines[i].trim().endsWith("|")) {
        tableLines.push(lines[i].trim());
        i++;
      }

      if (tableLines.length >= 2) {
        const headerRow = tableLines[0]
          .slice(1, -1)
          .split("|")
          .map((c) => c.trim());
        const bodyRows = tableLines.slice(2).map((row) =>
          row
            .slice(1, -1)
            .split("|")
            .map((c) => c.trim())
        );

        elements.push(
          <div key={`${key}-table`} className="my-3 overflow-x-auto rounded border border-border">
            <table className="w-full border-collapse text-left text-[12px] leading-relaxed">
              <thead className="border-b border-border bg-fg/5 text-fg">
                <tr>
                  {headerRow.map((col, idx) => (
                    <th key={idx} className="p-2 font-medium">
                      {parseInline(col)}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60">
                {bodyRows.map((row, rIdx) => (
                  <tr key={rIdx} className="hover:bg-fg/[0.02]">
                    {row.map((cell, cIdx) => (
                      <td key={cIdx} className="p-2 align-top text-fg-2">
                        {parseInline(cell)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
        continue;
      }
    }

    // Unordered List: - or *
    if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
      const listItems: string[] = [];
      while (i < lines.length && (lines[i].trim().startsWith("- ") || lines[i].trim().startsWith("* "))) {
        listItems.push(lines[i].trim().slice(2));
        i++;
      }
      elements.push(
        <ul key={`${key}-ul`} className="my-2.5 ml-4 list-disc space-y-1 text-[13px] leading-relaxed text-fg-2">
          {listItems.map((item, idx) => (
            <li key={idx}>{parseInline(item)}</li>
          ))}
        </ul>
      );
      continue;
    }

    // Ordered List: 1. 2. 3.
    if (ORDERED_ITEM.test(trimmed)) {
      const listItems: string[] = [];
      while (i < lines.length && ORDERED_ITEM.test(lines[i].trim())) {
        listItems.push(lines[i].trim().replace(ORDERED_ITEM, ""));
        i++;
      }
      elements.push(
        <ol key={`${key}-ol`} className="my-2.5 ml-5 list-decimal space-y-1.5 text-[13px] leading-relaxed text-fg-2 marker:font-semibold marker:text-muted">
          {listItems.map((item, idx) => (
            <li key={idx} className="pl-1">{parseInline(item)}</li>
          ))}
        </ol>
      );
      continue;
    }

    // Regular paragraph
    elements.push(
      <p key={key} className="my-2 text-[13px] leading-relaxed text-fg-2 [overflow-wrap:anywhere]">
        {parseInline(trimmed)}
      </p>
    );
    i++;
  }

  return elements;
}

type Section =
  | { kind: "plain"; lines: string[] }
  | { kind: "numbered"; number: string; title: string; lines: string[] }
  | { kind: "appendix"; title: string; lines: string[] };

function splitSections(lines: string[]): Section[] {
  const sections: Section[] = [];
  let current: Section = { kind: "plain", lines: [] };

  for (const line of lines) {
    const trimmed = line.trim();
    // 부록 이후는 하위 ## 제목까지 모두 한 접힘 영역에 둔다.
    if (current.kind === "appendix") {
      current.lines.push(line);
      continue;
    }
    if (APPENDIX_SECTION.test(trimmed)) {
      sections.push(current);
      current = { kind: "appendix", title: trimmed.replace(/^##\s+/, ""), lines: [] };
      continue;
    }
    const numbered = trimmed.match(NUMBERED_SECTION);
    if (numbered) {
      sections.push(current);
      current = { kind: "numbered", number: numbered[1], title: numbered[2], lines: [] };
      continue;
    }
    if (trimmed.startsWith("## ") && current.kind === "numbered") {
      sections.push(current);
      current = { kind: "plain", lines: [line] };
      continue;
    }
    current.lines.push(line);
  }
  sections.push(current);

  return sections.filter((section) => section.kind !== "plain" || section.lines.some((l) => l.trim()));
}

export function MarkdownPanel({ markdown }: { markdown: string }) {
  const sections = splitSections(markdown.split(/\r?\n/));

  return (
    <div className="markdown-content">
      {sections.map((section, sIdx) => {
        const keyPrefix = `s${sIdx}`;
        if (section.kind === "numbered") {
          return (
            <section
              key={keyPrefix}
              data-report-section={section.number}
              className="my-4 rounded-lg border border-border bg-surface p-4 [&_strong]:rounded-sm [&_strong]:bg-accent/10 [&_strong]:px-0.5"
            >
              <h2 className="mb-2 flex items-center gap-2.5 text-[15px] font-semibold leading-snug text-fg">
                <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent text-[12px] font-bold text-accent-on">
                  {section.number}
                </span>
                {parseInline(section.title)}
              </h2>
              {renderBlocks(section.lines, keyPrefix)}
            </section>
          );
        }
        if (section.kind === "appendix") {
          return (
            <details
              key={keyPrefix}
              data-report-appendix
              className="group my-5 rounded-lg border border-dashed border-border px-4 py-3"
            >
              <summary className="cursor-pointer select-none text-[14px] font-semibold text-muted hover:text-fg">
                {parseInline(section.title)}
                <span className="ml-2 text-[12px] font-normal">(claim 근거·검증 기록, 펼쳐 보기)</span>
              </summary>
              <div className="mt-3">{renderBlocks(section.lines, keyPrefix)}</div>
            </details>
          );
        }
        return <div key={keyPrefix}>{renderBlocks(section.lines, keyPrefix)}</div>;
      })}
    </div>
  );
}
