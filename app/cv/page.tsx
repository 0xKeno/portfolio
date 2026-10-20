import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Download, FileText } from "lucide-react";

import PrintButton from "@/app/components/PrintButton";
import {
  education,
  evidence,
  profile,
  projects,
  roles,
  skillGroups,
  summary,
} from "@/app/lib/content";

export const metadata: Metadata = {
  title: "CV",
  description: `Curriculum vitae for ${profile.name} — Computer Science graduate, web and app developer, IT support.`,
  alternates: { canonical: "/cv" },
};

/* Section shell. The rule under each heading is decorative on screen and is
   the only structure left in print once colour is gone. */
function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-10 first:mt-0">
      <h2 className="border-b border-border pb-2 text-xs font-semibold text-accent">
        {title}
      </h2>
      <div className="mt-5">{children}</div>
    </section>
  );
}

function Bullets({ items }: { items: readonly string[] }) {
  return (
    <ul role="list" className="mt-3 space-y-2">
      {items.map((item) => (
        <li
          key={item}
          className="flex gap-3 text-pretty text-sm leading-relaxed text-muted"
        >
          <span
            aria-hidden="true"
            className="mt-[0.55em] h-1 w-1 shrink-0 rounded-full bg-border-strong"
          />
          {item}
        </li>
      ))}
    </ul>
  );
}

export default function CvPage() {
  return (
    <div className="px-6 py-16 sm:px-10 sm:py-20">
      <div className="mx-auto w-full max-w-3xl">
        <Link
          href="/"
          data-print="hide"
          className="inline-flex items-center gap-2 text-xs text-faint transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
        >
          <ArrowLeft aria-hidden="true" className="h-3.5 w-3.5" />
          Back to the site
        </Link>

        {/* ---- header ---- */}
        <header className="mt-8 border-b border-border pb-8">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            {profile.name}
          </h1>
          <p className="mt-2 text-base text-muted">
            {profile.title} — {profile.strapline}
          </p>

          <ul
            role="list"
            className="mt-5 flex flex-wrap gap-x-5 gap-y-1.5 text-xs text-muted"
          >
            <li>{profile.location}</li>
            <li>{profile.phone}</li>
            <li>
              <a href={`mailto:${profile.email}`} className="text-accent hover:underline">
                {profile.email}
              </a>
            </li>
            <li>
              <a href={profile.site} className="text-accent hover:underline">
                0xkeno.vercel.app
              </a>
            </li>
            <li>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:underline"
              >
                linkedin.com/in/0xkeno
              </a>
            </li>
            <li>
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:underline"
              >
                github.com/0xKeno
              </a>
            </li>
          </ul>

          {/* Downloads. Word first — most application portals parse .docx at
              least as reliably as PDF, and Shell's runs on Workday. */}
          <div data-print="hide" className="mt-7 flex flex-wrap gap-3">
            <a
              href="/cv/Okpoudhu-Destiny-CV.docx"
              download
              className="inline-flex items-center gap-2 rounded-lg bg-accent px-4 py-2.5 text-sm font-medium text-background transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              <Download aria-hidden="true" className="h-4 w-4" />
              Word (.docx)
            </a>
            <a
              href="/cv/Okpoudhu-Destiny-CV.pdf"
              download
              className="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2.5 text-sm text-muted transition-colors hover:border-border-strong hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              <FileText aria-hidden="true" className="h-4 w-4" />
              PDF
            </a>
            <PrintButton />
          </div>

          <p className="mt-4 max-w-lg text-xs leading-relaxed text-faint">
            The downloads are the one-page version, written for an applicant
            tracking system. This page is the same CV with the case studies
            left in.
          </p>
        </header>

        {/* ---- body ---- */}
        <div className="mt-10">
          <Section title="Personal profile">
            <p className="text-pretty text-sm leading-relaxed text-muted">
              {summary} Seeking a graduate programme in IT, digital or data
              operations within the energy sector.
            </p>
          </Section>

          <Section title="Education">
            <h3 className="text-base font-medium text-foreground">
              {education.degree}
            </h3>
            <p className="mt-1 text-xs text-faint">
              {education.institution} · {education.period}
            </p>
            <Bullets items={education.notes} />
            <p className="mt-4 text-sm text-muted">
              <span className="text-foreground">NYSC status:</span>{" "}
              {education.nysc}
            </p>
          </Section>

          <Section title="Work experience">
            <ol className="space-y-8">
              {roles.map((role) => (
                <li key={role.title}>
                  <h3 className="text-base font-medium text-foreground">
                    {role.title}
                  </h3>
                  <p className="mt-1 text-xs text-faint">
                    {role.company} · {role.context} ·{" "}
                    <time dateTime={role.start.iso}>{role.start.label}</time>
                    {" – "}
                    {role.end ? (
                      <time dateTime={role.end.iso}>{role.end.label}</time>
                    ) : (
                      "Present"
                    )}
                  </p>
                  <p className="mt-3 text-pretty text-sm leading-relaxed text-muted">
                    {role.summary}
                  </p>
                  <Bullets items={role.points} />
                </li>
              ))}
            </ol>
          </Section>

          <Section title="Projects">
            <ul role="list" className="space-y-8">
              {projects.map((project) => (
                <li key={project.id}>
                  <h3 className="text-base font-medium text-foreground">
                    {project.name}
                    <span className="ml-2 text-xs font-normal text-faint">
                      {project.role} · {project.year}
                    </span>
                  </h3>
                  <p className="mt-1 text-sm text-accent">{project.tagline}</p>
                  <p className="mt-3 text-pretty text-sm leading-relaxed text-muted">
                    {project.summary}
                  </p>

                  <p className="mt-3 text-pretty text-sm leading-relaxed text-muted">
                    <span className="text-foreground">The brief.</span>{" "}
                    {project.brief}
                  </p>

                  <Bullets items={project.decisions} />

                  <p className="mt-3 text-pretty text-sm leading-relaxed text-muted">
                    <span className="text-foreground">Outcome.</span>{" "}
                    {project.outcome}
                  </p>

                  <p className="mt-3 text-xs text-faint">
                    {project.stack.join(" · ")}
                    {project.href
                      ? ` · ${project.href.replace("https://", "")}`
                      : ""}
                  </p>
                </li>
              ))}
            </ul>
          </Section>

          <Section title="Skills">
            <dl className="space-y-4">
              {skillGroups.map((group) => (
                <div
                  key={group.label}
                  className="sm:grid sm:grid-cols-[9rem_1fr] sm:gap-4"
                >
                  <dt className="text-xs font-semibold text-faint">
                    {group.label}
                  </dt>
                  <dd className="mt-1 text-sm leading-relaxed text-muted sm:mt-0">
                    {group.items.join(" · ")}
                  </dd>
                </div>
              ))}
            </dl>
          </Section>

          <Section title="Key competencies">
            <dl className="space-y-4">
              {evidence.map((entry) => (
                <div key={entry.id}>
                  <dt className="text-sm font-medium text-foreground">
                    {entry.trait}
                  </dt>
                  <dd className="mt-1 text-pretty text-sm leading-relaxed text-muted">
                    {entry.cvLine}
                  </dd>
                </div>
              ))}
            </dl>
          </Section>

          <Section title="Additional information">
            <dl className="space-y-3 text-sm">
              <div className="sm:grid sm:grid-cols-[9rem_1fr] sm:gap-4">
                <dt className="text-xs font-semibold text-faint">
                  Languages
                </dt>
                <dd className="mt-1 text-muted sm:mt-0">English (fluent)</dd>
              </div>
              <div className="sm:grid sm:grid-cols-[9rem_1fr] sm:gap-4">
                <dt className="text-xs font-semibold text-faint">
                  Availability
                </dt>
                <dd className="mt-1 text-muted sm:mt-0">
                  Open to Nigeria-based, hybrid and remote roles; open to
                  relocation.
                </dd>
              </div>
              <div className="sm:grid sm:grid-cols-[9rem_1fr] sm:gap-4">
                <dt className="text-xs font-semibold text-faint">
                  Interests
                </dt>
                <dd className="mt-1 text-muted sm:mt-0">
                  Football, played regularly. Long-form science and behavioural
                  psychology.
                </dd>
              </div>
            </dl>
          </Section>
        </div>
      </div>
    </div>
  );
}
