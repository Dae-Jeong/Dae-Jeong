import { listRoleResumes } from "@/content/resumes";
import { AskLauncher } from "./ask-launcher";
import {
  LocalReviewLauncher,
  type ReviewGroup,
} from "./local-review-launcher";

const REVIEW_GROUPS: readonly ReviewGroup[] = [
  {
    label: "CAREER",
    destinations: [{ href: "/career", label: "경력기술서", match: "exact" }],
  },
  {
    label: "RESUME",
    destinations: [
      { href: "/resume", label: "기본 이력서", match: "exact" },
      ...listRoleResumes().map((resume) => ({
        href: `/resume/${resume.slug}`,
        label: resume.shortLabel,
        match: "exact" as const,
      })),
    ],
  },
];

export function ReviewLauncher({ className = "" }: { className?: string }) {
  if (process.env.NODE_ENV !== "development") {
    return <AskLauncher className={className} />;
  }

  return (
    <LocalReviewLauncher
      groups={REVIEW_GROUPS}
      className={className}
    />
  );
}
