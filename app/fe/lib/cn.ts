import { twMerge } from "tailwind-merge";

/* 클래스 병합의 명시 계약 — 충돌하는 utility 는 나중 인자가 이긴다 */
export function cn(...inputs: (string | false | undefined)[]) {
  return twMerge(inputs.filter(Boolean).join(" "));
}
