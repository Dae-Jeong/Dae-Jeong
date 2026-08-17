import { Chip } from "@/components/ui/chip";
import { KeyValueRows } from "@/components/ui/key-value-list";
import { NumberedList, NumberedRow } from "@/components/ui/numbered-row";
import { SectionHead } from "@/components/ui/section-head";
import type {
  ResumeOutcomeDescriptionItem,
  ResumeOutcomeEvidence,
  ResumeText,
  TailoredResume,
} from "@/content/resumes/types";
import { cn } from "@/lib/cn";
import { ResumeLayout } from "./resume-layout";
import { ResumePeriod } from "./resume-period";
import { resumeType } from "./resume-typography";

const SECTIONS = [
  { id: "s1", label: "소개" },
  { id: "s2", label: "핵심 성과" },
  { id: "s3", label: "경력" },
  { id: "s4", label: "일하는 방식" },
  { id: "s5", label: "기술" },
  { id: "s6", label: "학력·수상·자격" },
] as const;

function claim(ids?: readonly string[]) {
  return ids?.join(" ");
}

function RichText({ value }: { value: ResumeText }) {
  if (typeof value === "string") return value;

  return value.map((segment, index) => {
    if (segment.tone === "metric") {
      return (
        <span
          key={`${segment.text}-${index}`}
          data-metric
          className={resumeType.metric}
        >
          {segment.text}
        </span>
      );
    }
    if (segment.tone === "strong") {
      return (
        <strong key={`${segment.text}-${index}`} className={resumeType.inlineStrong}>
          {segment.text}
        </strong>
      );
    }
    return <span key={`${segment.text}-${index}`}>{segment.text}</span>;
  });
}

function PlainList({ items }: { items: readonly ResumeText[] }) {
  return (
    <ul className="m-0 grid list-none gap-2 p-0">
      {items.map((item, index) => (
        <li
          key={index}
          className="relative pl-4 text-fg-2 before:absolute before:left-0 before:font-mono before:text-muted before:content-['—'] [&_strong]:font-medium [&_strong]:text-fg"
        >
          <RichText value={item} />
        </li>
      ))}
    </ul>
  );
}

function isOutcomeEvidence(
  item: ResumeOutcomeDescriptionItem,
): item is ResumeOutcomeEvidence {
  return typeof item === "object" && !Array.isArray(item) && "text" in item;
}

function OutcomeDescription({
  items,
}: {
  items: readonly ResumeOutcomeDescriptionItem[];
}) {
  const groups: Array<
    | { kind: "paragraph"; content: ResumeText }
    | { kind: "evidence"; items: ResumeOutcomeEvidence[] }
  > = [];

  items.forEach((item) => {
    if (!isOutcomeEvidence(item)) {
      groups.push({ kind: "paragraph", content: item });
      return;
    }

    const last = groups.at(-1);
    if (last?.kind === "evidence") {
      last.items.push(item);
      return;
    }

    groups.push({ kind: "evidence", items: [item] });
  });

  return (
    <div className={resumeType.achievementDescription}>
      {groups.map((group, groupIndex) => {
        if (group.kind === "paragraph") {
          return (
            <p key={groupIndex} className={resumeType.achievementParagraph}>
              <RichText value={group.content} />
            </p>
          );
        }

        return (
          <ul key={groupIndex} className={resumeType.achievementEvidenceList}>
            {group.items.map((item, itemIndex) => (
              <li
                key={`${groupIndex}-${itemIndex}`}
                className={resumeType.achievementEvidenceItem}
              >
                <RichText value={item.text} />
                {item.source && (
                  <span className="ml-1.5 whitespace-nowrap font-mono text-xs text-muted">
                    [{item.source}]
                  </span>
                )}
              </li>
            ))}
          </ul>
        );
      })}
    </div>
  );
}

function Section({
  id,
  no,
  title,
  meta,
  children,
}: {
  id: string;
  no: string;
  title: string;
  meta: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className={cn(resumeType.documentSection, "scroll-mt-6")}>
      <SectionHead no={no} title={title} meta={meta} size="doc" />
      {children}
    </section>
  );
}

function ResumeDocument({ resume }: { resume: TailoredResume }) {
  const hasWorkStyles = resume.workStyles.length > 0;
  const skillsNo = hasWorkStyles ? "05" : "04";
  const credentialsNo = hasWorkStyles ? "06" : "05";
  const skillRows = resume.skills.map((skill) => ({
    k: skill.label,
    "data-claim": claim(skill.claimIds),
    v: (
      <>
        {skill.stack}
        <span className="mt-0.5 block font-mono text-xs text-muted">{skill.via}</span>
      </>
    ),
  }));

  return (
    <div>
      <header className={resumeType.documentHeader}>
        <div className={resumeType.identityBlock}>
          <h1 className={resumeType.identity}>{resume.header.name}</h1>
          <p className={resumeType.roleMeta}>{resume.header.role}</p>
        </div>
        <div className={resumeType.metaBlock}>
          <p className={resumeType.careerMeta}>
            <RichText value={resume.header.careerLine} />
          </p>
          <div className={resumeType.contactRow}>
            {resume.header.contacts.map((contact) => (
              <Chip
                key={contact.label}
                variant="contact"
                href={contact.href}
                external={contact.external}
              >
                {contact.label}
              </Chip>
            ))}
          </div>
        </div>
      </header>

      <div className="resume-print-page-one">
        <Section id="s1" no="01" title="소개" meta="Profile">
          <div className={resumeType.summaryStack}>
            {resume.summary.map((paragraph, index) => (
              <p key={index} className="m-0" data-claim={claim(paragraph.claimIds)}>
                <RichText value={paragraph.text} />
              </p>
            ))}
          </div>
        </Section>

        <Section id="s2" no="02" title="핵심 성과" meta="Outcomes">
          <NumberedList>
            {resume.outcomes.map((outcome, index) => (
              <NumberedRow
                key={outcome.no}
                label={outcome.no}
                labelWidth="sm"
                labelClassName="font-mono text-xs text-muted"
                data-claim={claim(outcome.claimIds)}
                className={cn(resumeType.achievementRow, index === 0 && "border-t-0")}
              >
                <div className="text-base font-normal [&_[data-metric]]:font-medium">
                  <h3 className={resumeType.achievementTitle}>
                    {outcome.title}
                  </h3>
                  <OutcomeDescription items={outcome.description} />
                </div>
              </NumberedRow>
            ))}
          </NumberedList>
        </Section>
      </div>

      <div className="resume-print-page-two">
        <Section id="s3" no="03" title="경력" meta="Career">
        <NumberedList className="border-t border-border-soft">
          {resume.careers.map((career) => (
            <NumberedRow
              key={`${career.org}-${career.period}`}
              label={
                <span className="grid gap-1">
                  <span>{career.org}</span>
                  <ResumePeriod
                    value={career.period}
                    currentLabel={career.now ? "재직중" : undefined}
                  />
                </span>
              }
              labelWidth="lg"
              labelClassName="font-semibold text-fg"
              data-claim={claim(career.claimIds)}
              className={resumeType.careerRow}
            >
              <span className="text-sm text-fg-2">
                <span className="mb-1.5 block text-base font-medium text-fg">
                  <RichText value={career.role} />
                </span>
                <PlainList items={career.details} />
              </span>
            </NumberedRow>
          ))}
        </NumberedList>
        </Section>

        <div className="resume-print-support">

          {hasWorkStyles && (
            <Section id="s4" no="04" title="일하는 방식" meta="How I Work">
          <NumberedList>
            {resume.workStyles.map((workStyle, index) => (
              <NumberedRow
                key={workStyle.no}
                label={workStyle.no}
                labelWidth="sm"
                labelClassName="font-mono text-xs text-muted"
                className={cn(resumeType.workStyleRow, index === 0 && "border-t-0")}
                data-claim={claim(workStyle.claimIds)}
              >
                <div>
                  <p className={resumeType.itemTitle}>{workStyle.title}</p>
                  <p className="m-0 text-sm text-fg-2">
                    <RichText value={workStyle.body} />
                  </p>
                </div>
              </NumberedRow>
            ))}
          </NumberedList>
            </Section>
          )}

          <Section id="s5" no={skillsNo} title="기술" meta="Skills">
            <KeyValueRows items={skillRows} />
          </Section>

          <Section
            id="s6"
            no={credentialsNo}
            title="학력·교육 / 수상·특허·자격"
            meta="Credentials"
          >
        <NumberedList>
          {resume.credentials.map((credential, index) => (
            <NumberedRow
              key={`${credential.period}-${credential.text}`}
              label={credential.period}
              labelWidth="lg"
              labelClassName="whitespace-pre-line text-xs"
              className={cn(resumeType.credentialRow, index === 0 && "border-t-0")}
              data-claim={claim(credential.claimIds)}
            >
              <span className="text-sm text-fg-2">{credential.text}</span>
            </NumberedRow>
          ))}
        </NumberedList>
          </Section>
        </div>
      </div>
    </div>
  );
}

export function TailoredResumeView({ resume }: { resume: TailoredResume }) {
  const sections = SECTIONS.filter(
    (section) => section.id !== "s4" || resume.workStyles.length > 0,
  );

  return (
    <ResumeLayout sections={sections} pdfHref={resume.pdfHref}>
      <ResumeDocument resume={resume} />
    </ResumeLayout>
  );
}
