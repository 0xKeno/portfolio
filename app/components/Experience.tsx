"use client";

import { motion } from "framer-motion";

import SectionHeader from "@/app/components/SectionHeader";
import { education, roles } from "@/app/lib/content";
import { useStagger, viewportOnce } from "@/app/lib/motion";

/**
 * One role, given the space it deserves rather than padded out with company
 * logos and a list of adjacent things. Six months inside a national oil and
 * gas company is the most relevant thing on this site for the roles it is
 * aimed at, so it gets its own section rather than a slot in a timeline.
 */
export default function Experience() {
  const { container, item } = useStagger({ stagger: 0.09 });

  return (
    <section
      id="experience"
      aria-labelledby="experience-heading"
      className="px-6 py-24 sm:px-10 sm:py-36"
    >
      <div className="mx-auto w-full max-w-4xl space-y-14 sm:space-y-16">
        <SectionHeader
          index="01"
          kicker="Experience"
          title="Building now. Grounded in enterprise IT."
          id="experience-heading"
          lede="Freelance web and app work today, on top of six months inside Nigeria's national oil and gas exploration company."
        />

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="space-y-4"
        >
          {roles.map((role) => (
            <motion.article
              key={role.title}
              variants={item}
              className="card rounded-3xl border border-border p-5 transition-colors duration-200 hover:border-border-strong sm:p-6"
            >
              <p className="text-xs text-faint">
                <time dateTime={role.start.iso}>{role.start.label}</time>
                {" — "}
                {role.end ? (
                  <time dateTime={role.end.iso}>{role.end.label}</time>
                ) : (
                  <span className="text-data">Present</span>
                )}
              </p>

              <h3 className="mt-3 text-balance headline text-xl font-semibold text-foreground sm:text-2xl">
                {role.title}
              </h3>

              <p className="mt-1.5 text-sm text-muted">
                <span className="text-foreground">{role.company}</span>
                {" · "}
                {role.context}
              </p>

              <p className="mt-4 max-w-2xl text-pretty text-sm leading-relaxed text-muted">
                {role.summary}
              </p>

              <ul role="list" className="mt-4 space-y-2.5">
                {role.points.map((point) => (
                  <li
                    key={point}
                    className="flex max-w-2xl gap-3 text-pretty text-sm leading-relaxed text-muted"
                  >
                    <span
                      aria-hidden="true"
                      className="mt-[0.55em] h-1 w-1 shrink-0 rounded-full bg-border-strong"
                    />
                    {point}
                  </li>
                ))}
              </ul>
            </motion.article>
          ))}

          {/* Education sits with experience rather than off on its own: for a
              graduate the two are read together, and NYSC status is the first
              thing a Nigerian recruiter looks for. */}
          <motion.article
            variants={item}
            className="card rounded-3xl border border-border p-6 sm:p-8"
          >
            <p className="text-xs text-faint">{education.period}</p>
            <h3 className="mt-3 headline text-xl font-semibold text-foreground sm:text-2xl">
              {education.degree}
            </h3>
            <p className="mt-1.5 text-sm text-muted">{education.institution}</p>

            <ul role="list" className="mt-4 space-y-2.5">
              {education.notes.map((note) => (
                <li
                  key={note}
                  className="flex max-w-2xl gap-3 text-pretty text-sm leading-relaxed text-muted"
                >
                  <span
                    aria-hidden="true"
                    className="mt-[0.55em] h-1 w-1 shrink-0 rounded-full bg-border-strong"
                  />
                  {note}
                </li>
              ))}
              <li className="flex max-w-2xl gap-3 text-pretty text-sm leading-relaxed text-muted">
                <span
                  aria-hidden="true"
                  className="mt-[0.55em] h-1 w-1 shrink-0 rounded-full bg-data/60"
                />
                <span>
                  <span className="text-foreground">NYSC:</span> {education.nysc}
                </span>
              </li>
            </ul>
          </motion.article>
        </motion.div>
      </div>
    </section>
  );
}
