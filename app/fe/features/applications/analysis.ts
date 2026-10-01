import "server-only";
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { requireAdmin } from "../admin-auth/guard";

export type AnalysisRecord = {
  id: string;
  company: string;
  role: string;
  postingId?: string;
  status: string;
  sourceUrl?: string;
  jdMarkdown: string;
  reportMarkdown: string;
};

function findRepoRoot(): string {
  const current = process.cwd();
  if (existsSync(path.join(current, "wiki"))) return current;
  if (existsSync(path.join(current, "..", "wiki"))) return path.resolve(current, "..");
  if (existsSync(path.join(current, "..", "..", "wiki"))) return path.resolve(current, "..", "..");
  return current;
}

type AttemptRaw = {
  id: string;
  company: string;
  role: string;
  status: string;
  postingId?: string;
  sourcePath?: string;
};

function loadRawAttempts(): AttemptRaw[] {
  const root = findRepoRoot();
  const attemptsFile = path.join(root, "output/application-workspace/application-attempts.json");
  if (!existsSync(attemptsFile)) return [];
  try {
    const content = JSON.parse(readFileSync(attemptsFile, "utf8"));
    return Array.isArray(content.attempts) ? content.attempts : [];
  } catch {
    return [];
  }
}

function extractFrontmatter(content: string): { meta: Record<string, string>; body: string } {
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n/);
  if (!match) return { meta: {}, body: content };
  const meta: Record<string, string> = {};
  for (const line of match[1].split(/\r?\n/)) {
    const colon = line.indexOf(":");
    if (colon > 0) {
      const key = line.slice(0, colon).trim();
      const val = line.slice(colon + 1).trim().replace(/^"|"$/g, "");
      meta[key] = val;
    }
  }
  return { meta, body: content.slice(match[0].length) };
}

/** Lists attempt IDs that have match-report.md and jd.md available. */
export async function listAvailableAnalyses(): Promise<Set<string>> {
  const root = findRepoRoot();
  const attempts = loadRawAttempts();
  const available = new Set<string>();

  for (const attempt of attempts) {
    if (!attempt.sourcePath) continue;
    const folder = path.join(root, path.dirname(attempt.sourcePath));
    const reportPath = path.join(folder, "match-report.md");
    const jdPath = path.join(folder, "jd.md");
    if (existsSync(reportPath) && existsSync(jdPath)) {
      available.add(attempt.id);
    }
  }

  return available;
}

/** Gets complete JD and match-report data for a specific attempt. Requires admin. */
export async function getAnalysisData(id: string): Promise<AnalysisRecord | null> {
  await requireAdmin();
  const root = findRepoRoot();
  const attempts = loadRawAttempts();
  const attempt = attempts.find((item) => item.id === id);
  if (!attempt || !attempt.sourcePath) return null;

  const folder = path.join(root, path.dirname(attempt.sourcePath));
  const reportPath = path.join(folder, "match-report.md");
  const jdPath = path.join(folder, "jd.md");

  if (!existsSync(reportPath) || !existsSync(jdPath)) return null;

  try {
    const jdRaw = readFileSync(jdPath, "utf8");
    const reportRaw = readFileSync(reportPath, "utf8");

    const { meta: jdMeta, body: jdBody } = extractFrontmatter(jdRaw);
    const { body: reportBody } = extractFrontmatter(reportRaw);

    return {
      id: attempt.id,
      company: attempt.company,
      role: attempt.role,
      postingId: attempt.postingId,
      status: attempt.status,
      sourceUrl: jdMeta.url || undefined,
      jdMarkdown: jdBody.trim(),
      reportMarkdown: reportBody.trim(),
    };
  } catch {
    return null;
  }
}
