import { Chip } from "@/components/ui/chip";
import { resumeType } from "../resume/resume-typography";
import type { CopyBlock, ResumeCopy } from "@/content/documents/resume-copy";
import styles from "./classic-resume.module.css";
import { Inline } from "../common/inline";

function Blocks({ blocks }: { blocks: CopyBlock[] }) {
  return blocks.map((block, index) => {
    const shared = { "data-copy": "", "data-claim": block.claims.join(" ") };
    if (block.presentation === "heading") {
      return <h4 key={index} className={styles.careerHeading} {...shared}>{block.text}</h4>;
    }
    if (block.presentation === "subheading") {
      return <h5 key={index} className={styles.careerSubheading} {...shared}>{block.text}</h5>;
    }
    if (block.kind === "skill") {
      return <div key={index} className={styles.skill} {...shared}>
        <span className={styles.skillLabel}>{block.label}</span>{" "}
        <span>{block.text}</span>
      </div>;
    }
    return <p key={index} className={block.kind === "bullet" ? styles.bullet : styles.paragraph} {...shared}><Inline text={block.text} /></p>;
  });
}

/** One semantic document for both templates. Only scoped CSS changes. */
export function ComparisonDocument({ copy, prefix }: { copy: ResumeCopy; prefix: string }) {
  const profile = copy.sections[0];
  return (
    <article className={styles.document} aria-label="김대정 이력서" data-resume-copy>
      <header className={`${resumeType.commonDocumentHeader} ${styles.documentHeader}`} data-section="0" id={`${prefix}-section-0`}>
        <div className={`${resumeType.commonIdentityBlock} ${styles.identity}`}>
          <h1 className={resumeType.commonIdentity} data-copy>{copy.name}</h1>
          <p className={resumeType.commonRoleMeta} data-copy>{copy.role}</p>
        </div>
        <div className={`${resumeType.commonMetaBlock} ${styles.meta}`}>
          <p className={resumeType.careerMeta} data-copy>{copy.careerLine}</p>
          {copy.specialtyLine && <p className={resumeType.careerMeta} data-copy>{copy.specialtyLine}</p>}
          <div className={`${resumeType.commonContactRow} ${styles.contacts}`}>
            {copy.contacts.map((contact) => <Chip key={contact.href} variant="contact" href={contact.href} external={contact.href.startsWith("https:")}><span data-copy>{contact.label}</span></Chip>)}
          </div>
        </div>
        <div className={`${resumeType.summaryStack} ${styles.summary}`}>
          <h2 className="sr-only">{profile.title}</h2>
          {profile.entries[0].blocks.map((block, index) => <p key={index} data-copy data-claim={block.claims.join(" ")} className={index === 0 ? resumeType.profileTitle : resumeType.profileDescription}>{block.text}</p>)}
        </div>
      </header>
      {copy.sections.slice(1).map((section, index) => (
        <section key={section.title} className={styles.section} data-section={index + 1} id={`${prefix}-section-${index + 1}`} data-kind={index === 0 ? "outcomes" : index === 1 ? "career" : "other"}>
          <h2 className={styles.sectionTitle} data-copy>{section.title}</h2>
          {section.entries.map((entry, entryIndex) => <div key={entryIndex} className={styles.entry}>
            {entry.title && <h3 className={styles.entryTitle}>
              {index === 0 && <span className={styles.entryNumber} aria-hidden="true">{String(entryIndex + 1).padStart(2, "0")}</span>}
              <span data-copy>{entry.title}</span>
            </h3>}
            <div className={styles.blocks}><Blocks blocks={entry.blocks} /></div>
          </div>)}
        </section>
      ))}
    </article>
  );
}
