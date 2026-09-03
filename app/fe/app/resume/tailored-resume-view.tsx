import Image from "next/image";
import Link from "next/link";
import { Chip } from "@/components/ui/chip";
import { KeyValueRows } from "@/components/ui/key-value-list";
import { NumberedList, NumberedRow } from "@/components/ui/numbered-row";
import { SectionHead } from "@/components/ui/section-head";
import type {
  ResumeOutcomeDescriptionItem,
  ResumeOutcomeEvidence,
  ResumeSectionKey,
  ResumeText,
  TailoredResume,
} from "@/content/resumes/types";
import { cn } from "@/lib/cn";
import { ResumeLayout } from "./resume-layout";
import { ResumePeriod } from "./resume-period";
import { resumeType } from "./resume-typography";

const DEFAULT_SECTION_ORDER: readonly ResumeSectionKey[] = [
  "profile",
  "outcomes",
  "career",
  "workStyles",
  "skills",
  "credentials",
];

const SECTION_META: Record<
  ResumeSectionKey,
  { id: string; label: string; title: string; meta: string }
> = {
  profile: { id: "s1", label: "소개", title: "소개", meta: "Profile" },
  outcomes: { id: "s2", label: "핵심 성과", title: "핵심 성과", meta: "Outcomes" },
  career: { id: "s3", label: "경력", title: "경력", meta: "Career" },
  workStyles: { id: "s4", label: "일하는 방식", title: "일하는 방식", meta: "How I Work" },
  skills: { id: "s5", label: "기술", title: "기술", meta: "Skills" },
  externalActivities: {
    id: "s6",
    label: "외부 활동",
    title: "외부 활동",
    meta: "External Activities",
  },
  credentials: {
    id: "s6",
    label: "학력·수상·자격",
    title: "학력·교육 / 수상·특허·자격",
    meta: "Credentials",
  },
};

type ResumeSectionSpec = (typeof SECTION_META)[ResumeSectionKey] & {
  key: ResumeSectionKey;
  no: string;
};

function getResumeSections(resume: TailoredResume): readonly ResumeSectionSpec[] {
  const hasExternalActivities = (resume.externalActivities?.length ?? 0) > 0;
  const order = resume.sectionOrder ?? DEFAULT_SECTION_ORDER;

  return order
    .filter((key) => {
      if (key === "workStyles") return resume.workStyles.length > 0;
      if (key === "externalActivities") return hasExternalActivities;
      return true;
    })
    .map((key, index) => ({
      ...SECTION_META[key],
      id: key === "credentials" && hasExternalActivities ? "s7" : SECTION_META[key].id,
      key,
      no: String(index + 1).padStart(2, "0"),
    }));
}

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
                <span className="min-w-0 flex-1 text-pretty">
                  <RichText value={item.text} />
                </span>
                {item.source && (
                  <span className="shrink-0 whitespace-nowrap text-right font-mono text-xs leading-relaxed text-muted max-sm:mt-0.5 max-sm:text-left">
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
  className,
  plain = false,
}: {
  id: string;
  no: string;
  title: string;
  meta: string;
  children: React.ReactNode;
  className?: string;
  /** A안(v3): 번호·대문자 eyebrow 없이 제목 + 작은 meta만 */
  plain?: boolean;
}) {
  return (
    <section
      id={id}
      className={cn(resumeType.documentSection, "scroll-mt-6", className)}
    >
      {plain ? (
        <div className="mb-7 flex flex-wrap items-baseline gap-x-5 gap-y-1 border-b border-fg pb-3">
          <h2 className="m-0 text-xl font-semibold tracking-[-0.02em]">{title}</h2>
          <span className="text-sm text-muted">{meta}</span>
        </div>
      ) : (
        <SectionHead no={no} title={title} meta={meta} size="doc" />
      )}
      {children}
    </section>
  );
}

function ResumeDocument({ resume }: { resume: TailoredResume }) {
  const sections = getResumeSections(resume);
  const skillRows = resume.skills.map((skill) => ({
    k: skill.label,
    "data-claim": claim(skill.claimIds),
    v: (
      <>
        <span className="block text-base font-medium leading-normal text-fg">{skill.stack}</span>
        <span className="mt-1 block text-pretty text-sm leading-relaxed text-fg-2">{skill.via}</span>
      </>
    ),
  }));

  function renderSection(section: ResumeSectionSpec) {
    const sectionProps = {
      id: section.id,
      no: section.no,
      title: section.title,
      meta: section.meta,
    };

    if (section.key === "profile") {
      return (
        <Section key={section.key} {...sectionProps}>
          <div className={resumeType.summaryStack}>
            {resume.summary.map((paragraph, index) => (
              <p
                key={index}
                className={index === 0 ? resumeType.profileTitle : resumeType.profileDescription}
                data-claim={claim(paragraph.claimIds)}
              >
                <RichText value={paragraph.text} />
              </p>
            ))}
          </div>
        </Section>
      );
    }

    if (section.key === "outcomes") {
      return (
        <Section key={section.key} {...sectionProps}>
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
                  <h3 className={resumeType.achievementTitle}>{outcome.title}</h3>
                  <OutcomeDescription items={outcome.description} />
                </div>
              </NumberedRow>
            ))}
          </NumberedList>
        </Section>
      );
    }

    if (section.key === "career") {
      return (
        <Section key={section.key} {...sectionProps}>
          <NumberedList className="border-t border-border-soft">
            {resume.careers.map((career, index) => (
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
                className={cn(
                  resumeType.careerRow,
                  "resume-career-row",
                  index === 0 &&
                    career.details.length <= 3 &&
                    "resume-career-row-keep",
                )}
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
      );
    }

    if (section.key === "workStyles") {
      return (
        <Section key={section.key} {...sectionProps}>
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
      );
    }

    if (section.key === "skills") {
      return (
        <Section key={section.key} {...sectionProps}>
          <KeyValueRows items={skillRows} />
        </Section>
      );
    }

    if (section.key === "externalActivities") {
      return (
        <Section
          key={section.key}
          {...sectionProps}
          className="print:break-before-page print:break-inside-avoid"
        >
          <NumberedList className="border-t border-border-soft">
            {(resume.externalActivities ?? []).map((activity) => (
              <NumberedRow
                key={`${activity.label}-${activity.title}`}
                label={activity.label}
                labelWidth="lg"
                className={resumeType.careerRow}
                data-claim={claim(activity.claimIds)}
              >
                <span className="block text-base font-medium leading-normal text-fg">
                  {activity.title}
                </span>
                <span className="mt-1 block text-pretty text-sm leading-relaxed text-fg-2">
                  {activity.description}
                </span>
                <span className="mt-1.5 block text-pretty text-sm font-medium leading-relaxed text-fg">
                  <span className="text-success">성과</span> · {activity.outcome}
                </span>
              </NumberedRow>
            ))}
          </NumberedList>
        </Section>
      );
    }

    return (
      <Section key={section.key} {...sectionProps}>
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
    );
  }

  return (
    <div data-tailored-resume data-resume-slug={resume.slug}>
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
          {resume.header.submissionMeta && (
            <p className="m-0 mt-3 w-fit border border-border px-2.5 py-1.5 font-mono text-xs font-medium text-fg">
              {resume.header.submissionMeta}
            </p>
          )}
        </div>
        {resume.header.photoSrc && (
          <div className={resumeType.profilePhoto}>
            <Image
              src={resume.header.photoSrc}
              alt=""
              fill
              priority
              sizes="(max-width: 639px) 80px, 112px"
              className="object-contain"
            />
          </div>
        )}
      </header>
      {sections.map(renderSection)}
    </div>
  );
}

export type RoleResumeOption = {
  slug: string;
  label: string;
  shortLabel: string;
  description: string;
  signals: readonly string[];
};

function ResumeVariantNav({
  activeSlug,
  options,
}: {
  activeSlug: string;
  options: readonly RoleResumeOption[];
}) {
  const active = options.find((option) => option.slug === activeSlug);

  return (
    <nav
      aria-label="직군별 이력서 초안"
      className="mb-8 border-y border-border-soft py-4 print:hidden"
    >
      <div className="mb-3 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
        <p className="m-0 font-mono text-xs font-medium tracking-[0.06em] text-fg">
          ROLE DRAFTS
        </p>
        {active && (
          <p className="m-0 text-sm text-fg-2">{active.description}</p>
        )}
      </div>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => {
          const isActive = option.slug === activeSlug;
          return (
            <Link
              key={option.slug}
              href={`/resume/${option.slug}`}
              aria-current={isActive ? "page" : undefined}
              title={option.label}
              className={cn(
                "focus-ring inline-flex min-h-11 items-center border px-3 font-mono text-xs transition-colors duration-100",
                isActive
                  ? "border-fg bg-fg text-accent-on"
                  : "border-border bg-bg text-fg-2 hover:border-fg hover:text-fg",
              )}
            >
              {option.shortLabel}
            </Link>
          );
        })}
      </div>
      {active?.signals.length ? (
        <ul className="m-0 mt-3 flex list-none flex-wrap gap-x-5 gap-y-1 p-0 text-xs text-fg-2">
          {active.signals.map((signal) => (
            <li
              key={signal}
              className="before:mr-2 before:text-accent before:content-['—']"
            >
              {signal}
            </li>
          ))}
        </ul>
      ) : null}
    </nav>
  );
}

export function TailoredResumeView({
  resume,
  roleOptions,
}: {
  resume: TailoredResume;
  roleOptions?: readonly RoleResumeOption[];
}) {
  const sections = getResumeSections(resume).map(({ id, label }) => ({ id, label }));

  return (
    <ResumeLayout sections={sections} pdfHref={resume.pdfHref} printFlow={resume.printFlow}>
      {resume.roleVariant && roleOptions && (
        <ResumeVariantNav activeSlug={resume.slug} options={roleOptions} />
      )}
      <ResumeDocument resume={resume} />
    </ResumeLayout>
  );
}
