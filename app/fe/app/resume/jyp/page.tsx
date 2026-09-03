import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { JYP_RESUME } from "@/content/resumes/jyp";
import { canViewTailoredResume } from "@/content/resumes";
import { ResumePageShell } from "../resume-page-shell";
import { TailoredResumeView } from "../tailored-resume-view";
import styles from "./jyp-resume.module.css";

export const metadata: Metadata = {
  title: "JYP ENTERTAINMENT Software Engineer / AI Resume — 김대정",
  description: "JYP ENTERTAINMENT Software Engineer / AI 지원용 맞춤 이력서",
  robots: {
    index: false,
    follow: false,
    noarchive: true,
    nosnippet: true,
  },
};

export default function JypResumePage() {
  if (!canViewTailoredResume(JYP_RESUME)) notFound();

  return (
    <ResumePageShell crumb={<>Resume / JYP ENTERTAINMENT</>} tag="DRAFT">
      <div className={styles.jypResume}>
        <TailoredResumeView resume={JYP_RESUME} />
      </div>
    </ResumePageShell>
  );
}
