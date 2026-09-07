import { cn } from "@/lib/cn";
import type {
  CareerCompany,
  CareerDescriptionDocument,
  CareerProject,
  CvDocument,
  DocumentContact,
} from "@/content/documents";
import styles from "./professional-document.module.css";

function Contacts({ contacts }: { contacts: readonly DocumentContact[] }) {
  return (
    <ul className="m-0 flex list-none flex-wrap gap-x-5 gap-y-2 p-0 text-sm text-fg-2">
      {contacts.map((contact) => (
        <li key={contact.label}>
          {contact.href ? (
            <a
              href={contact.href}
              target={contact.external ? "_blank" : undefined}
              rel={contact.external ? "noopener" : undefined}
              className="underline decoration-border underline-offset-4 transition-colors hover:text-fg hover:decoration-fg"
            >
              {contact.label}
            </a>
          ) : (
            contact.label
          )}
        </li>
      ))}
    </ul>
  );
}

function DocumentHeader({
  variant,
  title,
  subtitle,
  name,
  role,
  contacts,
  meta,
  updatedAt,
}: {
  variant: "career" | "cv";
  title: string;
  subtitle?: string;
  name: string;
  role: string;
  contacts: readonly DocumentContact[];
  meta: string;
  updatedAt: string;
}) {
  return (
    <header
      className={cn(
        styles.documentHeader,
        variant === "career" ? styles.careerHeader : styles.cvHeader,
      )}
    >
      <div className="flex flex-wrap items-baseline justify-between gap-4 border-b border-border-soft pb-3 font-mono text-xs text-muted">
        <span>{meta}</span>
        <span>Updated · {updatedAt.replaceAll("-", ".")}</span>
      </div>
      <div className="mt-7 grid gap-7 md:grid-cols-[minmax(0,1fr)_220px] md:items-end">
        <div className="min-w-0">
          <h1 className="text-pretty text-[clamp(2rem,4vw,2.65rem)] font-semibold leading-[1.16] tracking-[-0.03em]">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-4 text-pretty text-lg leading-[1.7] text-fg-2">
              {subtitle}
            </p>
          )}
        </div>
        <div className="border-t border-border pt-4 md:border-t-0 md:pl-6 md:pt-0">
          <p className="text-lg font-semibold tracking-[-0.02em]">{name}</p>
          <p className="mt-2 text-sm leading-relaxed text-fg-2">{role}</p>
        </div>
      </div>
      <div className="mt-8 border-t border-border-soft pt-4">
        <Contacts contacts={contacts} />
      </div>
    </header>
  );
}

function SectionTitle({ title, note }: { title: string; note?: string }) {
  return (
    <div className={cn(styles.sectionHeader, "flex flex-wrap items-baseline justify-between gap-3 pb-3")}>
      <h2 className="text-xl font-semibold tracking-[-0.02em]">{title}</h2>
      {note && <span className="text-sm text-muted">{note}</span>}
    </div>
  );
}

function LabeledText({
  label,
  emphasis = false,
  children,
}: {
  label: string;
  emphasis?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "grid gap-2 md:grid-cols-[104px_minmax(0,1fr)] md:gap-6",
        emphasis && "border-t border-border pt-4",
      )}
    >
      <dt className="text-sm font-medium text-muted">{label}</dt>
      <dd className={cn("m-0 text-[15px] leading-[1.72] text-fg-2", emphasis && "text-fg")}>
        {children}
      </dd>
    </div>
  );
}

function CareerProjectBlock({
  project,
  narrative,
}: {
  project: CareerProject;
  narrative: boolean;
}) {
  const ProjectHeading = narrative ? "h3" : "h4";
  const DetailHeading = narrative ? "h4" : "h5";

  return (
    <article
      id={project.id}
      data-claim={project.claimIds.join(" ")}
      className={cn(styles.project, "border-t border-border pt-8 first:border-t-0 first:pt-0")}
    >
      <div className="min-w-0">
        <ProjectHeading className="text-pretty text-[17px] font-semibold leading-snug tracking-[-0.02em]">
          {project.title}
        </ProjectHeading>
        {!("sections" in project) && (
          <p className="mt-2 text-sm leading-relaxed text-muted">{project.context}</p>
        )}
      </div>

      {"sections" in project ? (
        <div className="mt-6 grid gap-7">
          {project.sections.map((section) => (
            <section key={section.title} className="min-w-0">
              <DetailHeading className="text-pretty text-base font-semibold leading-snug tracking-[-0.02em]">
                {section.title}
              </DetailHeading>
              <div className="mt-3 grid gap-3 text-[15px] leading-[1.72] text-fg-2">
                {section.paragraphs?.map((paragraph) => (
                  <p key={paragraph} className="max-w-[72ch] text-pretty">
                    {paragraph}
                  </p>
                ))}
                {section.bullets && section.bullets.length > 0 && (
                  <ul className={styles.detailList}>
                    {section.bullets.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                )}
              </div>
            </section>
          ))}
        </div>
      ) : (
        <dl className={cn(styles.projectDetail, "mt-6 grid gap-4")}>
          <LabeledText label="담당 범위">{project.role}</LabeledText>
          <LabeledText label="문제">{project.problem}</LabeledText>
          <LabeledText label="선택">{project.decision}</LabeledText>
          <LabeledText label="구현">
            <ul className={styles.detailList}>
              {project.implementation.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </LabeledText>
          <LabeledText label="검증">
            <ul className={styles.detailList}>
              {project.verification.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </LabeledText>
          <LabeledText label="결과" emphasis>
            <strong className="font-medium text-fg">{project.result}</strong>
            {project.boundary && <span className="mt-1 block text-sm text-muted">범위 · {project.boundary}</span>}
          </LabeledText>
        </dl>
      )}
    </article>
  );
}

function CareerCompanyBlock({
  company,
  narrative,
}: {
  company: CareerCompany;
  narrative: boolean;
}) {
  const CompanyHeading = narrative ? "h2" : "h3";
  const summary = typeof company.summary === "string" ? [company.summary] : company.summary;

  return (
    <section
      data-claim={company.claimIds.join(" ")}
      className={cn(
        styles.company,
        "border-t border-fg pt-8 first:border-t-0 first:pt-0",
      )}
    >
      <div className={cn(styles.companyHeader, "grid gap-4 md:grid-cols-[200px_minmax(0,1fr)] md:gap-8")}> 
        <div>
          <CompanyHeading className="text-lg font-semibold tracking-[-0.02em]">{company.organization}</CompanyHeading>
          <p className="mt-2 font-mono text-xs leading-relaxed text-muted">{company.period}</p>
        </div>
        <div>
          <p className="font-medium">{company.role}</p>
          {summary.map((paragraph) => (
            <p key={paragraph} className="mt-2 max-w-[72ch] text-[15px] leading-[1.72] text-fg-2">
              {paragraph}
            </p>
          ))}
        </div>
      </div>
      {(!narrative || company.projects.length > 0) && (
        <div className={cn(styles.companyProjects, "mt-8 grid gap-9")}>
          {company.projects.map((project) => (
            <CareerProjectBlock key={project.id} project={project} narrative={narrative} />
          ))}
        </div>
      )}
    </section>
  );
}

export function CareerDescriptionView({ document }: { document: CareerDescriptionDocument }) {
  const narrative = document.presentation === "narrative";
  const meta = document.companyName
    ? `${document.companyName} · ${document.targetRole ?? "Tailored"}`
    : "Common · Career Description";

  return (
    <main data-professional-document="career-description" className={styles.document}>
      <DocumentHeader
        variant="career"
        title={document.title}
        subtitle={document.subtitle}
        name={document.name}
        role={document.role}
        contacts={document.contacts}
        meta={meta}
        updatedAt={document.updatedAt}
      />

      <section className={cn(styles.section, "py-12 md:py-14")}> 
        <SectionTitle title={narrative ? "소개" : "경력 요약"} note={narrative ? undefined : "제품·Backend·AI"} />
        <div className="mt-7 grid gap-3">
          {document.summary.map((paragraph) => (
            <p key={paragraph} className="max-w-[72ch] text-pretty text-base leading-[1.75] text-fg-2">
              {paragraph}
            </p>
          ))}
        </div>
      </section>

      <section className={cn(styles.section, "pb-14")}> 
        {!narrative && <SectionTitle title="프로젝트별 수행" note="문제에서 결과까지" />}
        <div className={cn(!narrative && "mt-9", "grid gap-14")}>
          {document.companies.map((company) => (
            <CareerCompanyBlock key={company.id} company={company} narrative={narrative} />
          ))}
        </div>
      </section>

      {(!narrative || document.skills.length > 0) && (
        <section className={cn(styles.section, "border-t border-fg pt-8")}>
          <div className={styles.compactBlock}>
            <SectionTitle title="기술" />
            <dl className="mt-7 grid divide-y divide-border-soft border-y border-border-soft">
              {document.skills.map((skill) => (
                <div key={skill.label} className="grid gap-2 py-4 md:grid-cols-[180px_1fr] md:gap-6">
                  <dt className="font-medium">{skill.label}</dt>
                  <dd className="m-0 text-sm leading-relaxed text-fg-2">{skill.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>
      )}
    </main>
  );
}

export function CvView({ document }: { document: CvDocument }) {
  return (
    <main data-professional-document="cv" className={styles.document}>
      <DocumentHeader
        variant="cv"
        title={document.title}
        subtitle={document.summary}
        name={document.name}
        role={document.role}
        contacts={document.contacts}
        meta="Common · Complete Career Record"
        updatedAt={document.updatedAt}
      />

      <section className={cn(styles.section, "py-12 md:py-14")}> 
        <SectionTitle title="경력" note="Employment" />
        <div className="mt-7 divide-y divide-border">
          {document.employment.map((item) => (
            <article
              key={`${item.organization}-${item.period}`}
              data-claim={item.claimIds.join(" ")}
              className={cn(styles.cvRow, "grid gap-4 py-6 first:pt-0 md:grid-cols-[190px_minmax(0,1fr)] md:gap-8")}
            >
              <div>
                <h3 className="font-semibold">{item.organization}</h3>
                <p className="mt-1 font-mono text-xs leading-relaxed text-muted">{item.period}</p>
              </div>
              <div>
                <p className="font-medium">{item.role}</p>
                <ul className={cn(styles.detailList, "mt-3 text-sm leading-relaxed text-fg-2")}>
                  {item.highlights.map((highlight) => (
                    <li key={highlight}>{highlight}</li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className={cn(styles.section, "pb-12")}> 
        <SectionTitle title="주요 프로젝트" note="Selected Projects" />
        <div className="mt-7 divide-y divide-border-soft border-y border-border-soft">
          {document.projects.map((project) => (
            <article
              key={project.title}
              data-claim={project.claimIds.join(" ")}
              className={cn(styles.cvRow, "grid gap-2 py-5 md:grid-cols-[180px_1fr] md:gap-6")}
            >
              <h3 className="font-medium">{project.title}</h3>
              <p className="text-sm leading-relaxed text-fg-2">{project.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={cn(styles.section, "grid gap-12 border-t border-fg pt-8 md:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] md:gap-12")}> 
        <div>
          <SectionTitle title="기술" />
          <dl className="mt-6 grid gap-5">
            {document.skills.map((skill) => (
              <div key={skill.label}>
                <dt className="text-sm font-medium">{skill.label}</dt>
                <dd className="m-0 mt-1 text-sm leading-relaxed text-fg-2">{skill.value}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div>
          <SectionTitle title="학력·수상·자격" />
          <div className="mt-6 grid gap-7 text-sm leading-relaxed text-fg-2">
            <div>
              <h3 className="font-medium text-fg">학력</h3>
              <ul className="mt-3 grid list-none gap-3 p-0">
                {document.education.map((item) => (
                  <li key={item} className="border-b border-border-soft pb-3 last:border-0">{item}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-medium text-fg">수상·특허·자격</h3>
              <ul className="mt-3 grid list-none gap-3 p-0">
                {document.credentials.map((item) => (
                  <li key={item} className="border-b border-border-soft pb-3 last:border-0">{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
