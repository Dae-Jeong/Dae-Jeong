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

export function MarkdownPanel({ markdown }: { markdown: string }) {
  const lines = markdown.split(/\r?\n/);
  const elements: ReactNode[] = [];

  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    const trimmed = line.trim();

    if (!trimmed) {
      i++;
      continue;
    }

    // Heading 1
    if (trimmed.startsWith("# ")) {
      elements.push(
        <h1 key={i} className="mt-6 mb-3 text-[20px] font-bold leading-tight text-fg first:mt-0">
          {parseInline(trimmed.slice(2))}
        </h1>
      );
      i++;
      continue;
    }

    // Heading 2
    if (trimmed.startsWith("## ")) {
      elements.push(
        <h2 key={i} className="mt-5 mb-2.5 border-b border-border pb-1.5 text-[16px] font-semibold leading-snug text-fg">
          {parseInline(trimmed.slice(3))}
        </h2>
      );
      i++;
      continue;
    }

    // Heading 3
    if (trimmed.startsWith("### ")) {
      elements.push(
        <h3 key={i} className="mt-4 mb-2 text-[14px] font-semibold leading-normal text-fg">
          {parseInline(trimmed.slice(4))}
        </h3>
      );
      i++;
      continue;
    }

    // Heading 4
    if (trimmed.startsWith("#### ")) {
      elements.push(
        <h4 key={i} className="mt-3 mb-1.5 text-[13px] font-medium leading-normal text-fg">
          {parseInline(trimmed.slice(5))}
        </h4>
      );
      i++;
      continue;
    }

    // Blockquote
    if (trimmed.startsWith("> ")) {
      elements.push(
        <blockquote key={i} className="my-2 border-l-2 border-border pl-3 text-[13px] italic text-muted">
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
          <div key={`table-${i}`} className="my-3 overflow-x-auto rounded border border-border">
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
        <ul key={`ul-${i}`} className="my-2.5 ml-4 list-disc space-y-1 text-[13px] leading-relaxed text-fg-2">
          {listItems.map((item, idx) => (
            <li key={idx}>{parseInline(item)}</li>
          ))}
        </ul>
      );
      continue;
    }

    // Regular paragraph
    elements.push(
      <p key={i} className="my-2 text-[13px] leading-relaxed text-fg-2 [overflow-wrap:anywhere]">
        {parseInline(trimmed)}
      </p>
    );
    i++;
  }

  return <div className="markdown-content">{elements}</div>;
}
