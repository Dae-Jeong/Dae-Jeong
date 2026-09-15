import emphasis from "./emphasis.json";
import type { ResumePresentation } from "../documents/companies/presentation";

/** Common root presentation. Independent of frozen company submissions. */
export const commonResumePresentation: ResumePresentation = {
  template: "editorial",
  emphasis: emphasis.phrases,
  photo: { src: "/profile/daejeong-profile-v2.png", alt: "김대정", width: 1122, height: 1402 },
};
