/* labs entry registry — 확정 spec 계약: 목록은 metadata(title·kind·date·status)만 읽는다.
   live: false 는 데모(진입 불가) — 실제 등록 시 true 로 */

export type LabEntry = {
  id: string;
  title: string;
  kind: "feature" | "service" | "feature+backend";
  status: "building" | "live";
  desc: string;
  /** feature → /labs/{id}, service → https://{svc}.marinkim.xyz */
  dest: string;
  live: boolean;
};

export const ENTRIES: LabEntry[] = [
  {
    id: "jarvis",
    title: "jarvis",
    kind: "feature+backend",
    status: "building",
    desc: "개인 비서 — 사이트에 UI를 내장하고 전용 backend로 동작시킬 예정. 등록되면 /labs/jarvis 상세로 진입합니다.",
    dest: "/labs/jarvis",
    live: false,
  },
];

/** 실제 등록(live) entry 수 — head 의 "N registered" 는 이 값 기준 */
export const REGISTERED = ENTRIES.filter((e) => e.live).length;
