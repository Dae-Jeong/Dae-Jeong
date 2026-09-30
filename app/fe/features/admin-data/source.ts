import "server-only";
import { readFile, stat } from "node:fs/promises";
import path from "node:path";
import { get } from "@vercel/blob";
export type AdminData<T> =
  | { kind: "ready"; data: T; source: "blob" | "local" }
  | { kind: "missing" }
  | { kind: "error" };
type Source<T> = {
  source: string;
  blob: string;
  build: (value: unknown, updatedAt?: string) => T;
  valid: (value: unknown) => value is T;
};
const REPO_ROOT = path.join(process.cwd(), "..", "..");
/** Private local originals or minimised private Blob; callers must requireAdmin immediately before reading. */
export async function readPrivateData<T>(
  spec: Source<T>,
): Promise<AdminData<T>> {
  const blob =
    process.env.VERCEL === "1" || process.env.ADMIN_DATA_SOURCE === "blob";
  try {
    let parsed: unknown;
    if (blob) {
      const result = await get(spec.blob, {
        access: "private",
        useCache: false,
      });
      if (!result) return { kind: "missing" };
      if (result.statusCode !== 200 || !result.stream) return { kind: "error" };
      parsed = JSON.parse(await new Response(result.stream).text());
    } else {
      const file = path.join(REPO_ROOT, spec.source);
      const [text, info] = await Promise.all([
        readFile(/*turbopackIgnore: true*/ file, "utf8"),
        stat(/*turbopackIgnore: true*/ file),
      ]);
      parsed = spec.build(JSON.parse(text), info.mtime.toISOString());
    }
    return spec.valid(parsed)
      ? { kind: "ready", data: parsed, source: blob ? "blob" : "local" }
      : { kind: "error" };
  } catch (error) {
    const failure = error as { code?: string; name?: string };
    return failure.code === "ENOENT" || failure.name === "BlobNotFoundError"
      ? { kind: "missing" }
      : { kind: "error" };
  }
}
