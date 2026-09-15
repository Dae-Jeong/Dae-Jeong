import type { ReactNode } from "react";

/** Restricted inline formatting shared by document layouts. */
export function Inline({ text }: { text: string }) {
  // "\n" inside copy is a hard line break at a meaning boundary (parse-markdown joins a trailing "\" line).
  const parts = text.split(/(\*\*[^*]+\*\*|\[[^\]]+\]\((?:https:\/\/|mailto:)[^)]+\)|\n)/g);
  return parts.map((part, index): ReactNode => {
    if (part === "\n") return <br key={index} />;
    if (part.startsWith("**") && part.endsWith("**")) return <strong key={index}>{part.slice(2, -2)}</strong>;
    const link = part.match(/^\[([^\]]+)\]\((https:\/\/[^)]+|mailto:[^)]+)\)$/);
    return link ? <a key={index} href={link[2]}>{link[1]}</a> : part;
  });
}
