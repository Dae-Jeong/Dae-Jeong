import applicationData from "./applications.json";

export type ApplicationPriority = "A" | "B" | "C";

export type ApplicationTrack =
  | "Applied AI"
  | "AI Backend"
  | "Product Engineer"
  | "FDE"
  | "AI Platform";

export type ApplicationPosting = {
  id: string;
  company: string;
  role: string;
  priority: ApplicationPriority;
  track: ApplicationTrack;
  source: string;
  url: string;
  location: string;
  experience: string;
  verifiedAt: string;
  verdict: string;
  companyAnalysis: string;
  roleAnalysis: string;
  eligibility: string;
  strengths: string[];
  gaps: string[];
  pitch: string;
  resumeFocus: string[];
  questions: string[];
  evidenceIds: string[];
};

// ponytail: 한 명이 쓰는 로컬 도구라 JSON 하나를 canonical store로 유지한다.
export const APPLICATION_POSTINGS = applicationData.jobs as unknown as ApplicationPosting[];

export const APPLICATION_TRACKS: ApplicationTrack[] = [
  "Applied AI",
  "AI Backend",
  "Product Engineer",
  "FDE",
  "AI Platform",
];
