export const isObject = (value: unknown): value is Record<string, unknown> =>
  Boolean(value) && typeof value === "object" && !Array.isArray(value);
export const optionalString = (value: unknown) =>
  value === undefined || typeof value === "string";
export const optionalNullableString = (value: unknown) =>
  value === undefined || value === null || typeof value === "string";
export const stringArray = (value: unknown): value is string[] =>
  Array.isArray(value) && value.every((item) => typeof item === "string");
export const nonemptyString = (value: unknown) =>
  typeof value === "string" && value.trim() ? value.trim() : undefined;
