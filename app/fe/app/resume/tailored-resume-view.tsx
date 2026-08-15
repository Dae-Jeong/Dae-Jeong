import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Chip } from "@/components/ui/chip";
import { KeyValueRows } from "@/components/ui/key-value-list";
import { NumberedList, NumberedRow } from "@/components/ui/numbered-row";
import { SectionHead } from "@/components/ui/section-head";
import type { ResumeText, TailoredResume } from "@/content/resumes/types";

const SECTIONS = [
  { id: "s1", label: "요약" },
  { id: "s2", label: "경력" },
  { id: "s3", label: "핵심 성과" },
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
          className="font-semibold tabular-nums text-success"
        >
          {segment.text}
        </span>
      );
    }
    if (segment.tone === "strong") {
      return (
        <strong key={`${segment.text}-${index}`} className="font-semibold text-fg">
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
          className="relative pl-4 text-fg-2 before:absolute before:left-0 before:font-mono before:text-muted before:content-['—'] [&_strong]:font-semibold [&_strong]:text-fg"
        >
          <RichText value={item} />
        </li>
      ))}
    </ul>
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
    <section id={id} className="pt-9">
      <SectionHead no={no} title={title} meta={meta} size="doc" />
      {children}
    </section>
  );
}

function ResumeDocument({ resume }: { resume: TailoredResume }) {
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
      <header className="border-b-2 border-fg pb-7">
        <h1 className="m-0 font-mono text-3xl font-semibold tracking-[-0.02em]">
          {resume.header.name}
        </h1>
        <p className="mt-2.5 font-mono text-sm uppercase tracking-[0.06em] text-fg-2">
          {resume.header.role}
        </p>
        <p className="mt-1.5 font-mono text-sm text-fg-2">
          <RichText value={resume.header.careerLine} />
        </p>
        <p className="mt-4 text-lg font-medium">
          <RichText value={resume.header.tagline} />
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
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
      </header>

      <Section id="s1" no="01" title="요약" meta="Summary">
        <div className="grid gap-3.5 text-fg-2">
          {resume.summary.map((paragraph, index) => (
            <p key={index} className="m-0" data-claim={claim(paragraph.claimIds)}>
              <RichText value={paragraph.text} />
            </p>
          ))}
        </div>
      </Section>

      <Section id="s2" no="02" title="경력" meta="Career">
        <NumberedList className="border-t border-border-soft">
          {resume.careers.map((career) => (
            <NumberedRow
              key={`${career.org}-${career.period}`}
              label={
                <>
                  {career.org}
                  {career.now && <Badge>NOW</Badge>}
                </>
              }
              labelWidth="lg"
              labelClassName="font-semibold text-fg"
              trailing={career.period}
              data-claim={claim(career.claimIds)}
              className="border-border-soft py-3"
            >
              <span className="text-sm text-fg-2">
                <span className="mb-1.5 block font-medium text-fg">
                  <RichText value={career.role} />
                </span>
                <PlainList items={career.details} />
              </span>
            </NumberedRow>
          ))}
        </NumberedList>
      </Section>

      <Section id="s3" no="03" title="핵심 성과" meta="Outcomes">
        <NumberedList>
          {resume.capabilities.map((capability, index) => (
            <NumberedRow
              key={capability.no}
              label={capability.no}
              labelWidth="sm"
              labelClassName="font-mono text-xs text-muted"
              data-claim={claim(capability.claimIds)}
              className={index === 0 ? "border-t-0 py-4" : "py-4"}
            >
              <div className="max-w-[70ch] text-base font-normal [&_[data-metric]]:font-medium">
                <h3 className="m-0 mb-2 text-balance font-mono text-xl font-semibold leading-snug">
                  {capability.title}
                </h3>
                <p className="m-0 mb-3.5 text-pretty text-lg font-medium leading-normal text-fg">
                  <RichText value={capability.claim} />
                </p>
                <ul className="m-0 grid list-none gap-2 p-0">
                  {capability.details.map((detail, detailIndex) => (
                    <li
                      key={detailIndex}
                      className="relative pl-4 text-fg-2 before:absolute before:left-0 before:font-mono before:text-muted before:content-['—'] [&_strong]:font-medium [&_strong]:text-fg"
                    >
                      <RichText value={detail.text} />
                      {detail.source && (
                        <span className="ml-1.5 whitespace-nowrap font-mono text-xs text-muted">
                          [{detail.source}]
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </NumberedRow>
          ))}
        </NumberedList>
      </Section>

      <Section id="s4" no="04" title="일하는 방식" meta="How I Work">
        <NumberedList>
          {resume.workStyles.map((workStyle, index) => (
            <NumberedRow
              key={workStyle.no}
              label={workStyle.no}
              labelWidth="sm"
              labelClassName="font-mono text-xs text-muted"
              className={index === 0 ? "border-t-0 py-3" : "py-3"}
              data-claim={claim(workStyle.claimIds)}
            >
              <div>
                <p className="m-0 mb-1 font-semibold text-fg">{workStyle.title}</p>
                <p className="m-0 text-sm text-fg-2">
                  <RichText value={workStyle.body} />
                </p>
              </div>
            </NumberedRow>
          ))}
        </NumberedList>
      </Section>

      <Section id="s5" no="05" title="기술" meta="Skills">
        <KeyValueRows items={skillRows} />
      </Section>

      <Section
        id="s6"
        no="06"
        title="학력·교육 / 수상·특허·자격"
        meta="Credentials"
      >
        <NumberedList>
          {resume.credentials.map((credential, index) => (
            <NumberedRow
              key={`${credential.period}-${credential.text}`}
              label={credential.period}
              labelWidth="md"
              labelClassName="text-xs"
              className={index === 0 ? "border-t-0 py-1" : "py-1"}
              data-claim={claim(credential.claimIds)}
            >
              <span className="text-sm text-fg-2">{credential.text}</span>
            </NumberedRow>
          ))}
        </NumberedList>
      </Section>
    </div>
  );
}

export function TailoredResumeView({ resume }: { resume: TailoredResume }) {
  return (
    <div className="grid grid-cols-[minmax(0,1fr)_240px] gap-12 max-lg:grid-cols-1">
      <main className="max-w-[800px] pb-24 pt-12 max-lg:order-2 max-lg:pt-6">
        <ResumeDocument resume={resume} />
      </main>
      <aside className="sticky top-0 grid content-start gap-5 self-start py-12 max-lg:static max-lg:order-1 max-lg:grid-cols-[1fr_auto] max-lg:items-center max-lg:gap-3 max-lg:py-5">
        <Button
          href={resume.pdfHref}
          disabled={!resume.pdfHref}
          title={resume.pdfHref ? "A4 PDF 다운로드" : "PDF 준비 중"}
          className="justify-center"
        >
          ↓ PDF 다운로드 (A4)
        </Button>
        <div className="flex border border-border" role="group" aria-label="언어">
          <button
            type="button"
            className="focus-ring flex-1 whitespace-nowrap bg-fg px-3 py-2 font-mono text-xs text-accent-on"
          >
            KO
          </button>
          <button
            type="button"
            disabled
            className="flex-1 cursor-not-allowed whitespace-nowrap bg-bg px-3 py-2 font-mono text-xs text-muted opacity-60"
          >
            EN · 준비 중
          </button>
        </div>
        <nav aria-label="목차" className="max-lg:hidden">
          <h2 className="m-0 mb-2.5 font-mono text-xs uppercase tracking-[0.1em] text-muted">
            Contents
          </h2>
          <ol className="m-0 grid list-none gap-[7px] p-0">
            {SECTIONS.map((section, index) => (
              <li key={section.id}>
                <a
                  href={`#${section.id}`}
                  className="focus-ring font-mono text-xs text-fg-2 hover:text-fg"
                >
                  <span className="mr-2 text-muted">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  {section.label}
                </a>
              </li>
            ))}
          </ol>
        </nav>
        <p className="m-0 border-t border-border-soft pt-3 font-mono text-xs leading-relaxed text-muted max-lg:hidden">
          {resume.companyName} 지원용 맞춤 이력서 · {resume.status.toUpperCase()} · {resume.updatedAt}
          {resume.status === "draft" && (
            <>
              <br />
              DRAFT 표시는 지원 전 문안을 계속 다듬고 있다는 뜻입니다.
            </>
          )}
        </p>
      </aside>
    </div>
  );
}
