"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, ChevronDown } from "lucide-react";

import { GitHubIcon } from "@/app/components/BrandIcons";
import SectionHeader from "@/app/components/SectionHeader";
import { projects } from "@/app/lib/content";
import { EASE, useStagger, viewportOnce } from "@/app/lib/motion";

/**
 * Projects as short case studies rather than as a card grid.
 *
 * Two audiences read this section and they want different depths of the same
 * story, so the summary and the outcome are always visible — that is what a
 * recruiter needs — and the brief, the decisions and the stack sit behind a
 * disclosure for anyone who wants to know whether the decisions were reasoned.
 *
 * The disclosure is a real <button> and the panel is unmounted when closed, so
 * its links leave the tab order with it.
 */
export default function Projects() {
  const [open, setOpen] = useState<string | null>(projects[0]?.id ?? null);
  const { container, item } = useStagger({ stagger: 0.09 });

  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className="px-6 py-24 sm:px-10 sm:py-32"
    >
      <div className="mx-auto grid w-full max-w-5xl gap-12 lg:grid-cols-[16rem_1fr] lg:gap-16">
        <SectionHeader
          index="03"
          kicker="Projects"
          title="Things I've built"
          id="projects-heading"
          lede="Three, all still running. Open one to see what was asked for, what I decided, and why."
        />

        <motion.ul
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          role="list"
          className="space-y-4"
        >
          {projects.map((project) => {
            const isOpen = open === project.id;
            const panelId = `project-panel-${project.id}`;
            const buttonId = `project-button-${project.id}`;

            return (
              <motion.li
                key={project.id}
                variants={item}
                className={`card rounded-xl border transition-colors duration-200 ${
                  isOpen ? "border-accent/40" : "border-border hover:border-border-strong"
                }`}
              >
                <div className="p-5 sm:p-6">
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                    <span className="rounded-md border border-border bg-elevated px-2 py-0.5 font-mono text-[11px] uppercase tracking-wider text-accent">
                      {project.role}
                    </span>
                    <span className="font-mono text-xs text-faint">
                      {project.year}
                    </span>
                  </div>

                  <h3 className="mt-3 text-balance text-lg font-medium tracking-tight text-foreground sm:text-xl">
                    {project.name}
                  </h3>
                  <p className="mt-1 text-sm text-muted">{project.tagline}</p>

                  <p className="mt-4 max-w-2xl text-pretty text-sm leading-relaxed text-muted">
                    {project.summary}
                  </p>

                  <p className="mt-4 max-w-2xl text-pretty text-sm leading-relaxed text-foreground">
                    <span className="font-mono text-xs uppercase tracking-wider text-data">
                      Outcome{" "}
                    </span>
                    {project.outcome}
                  </p>

                  {project.href || project.repo ? (
                    <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2">
                      {project.href ? (
                        <a
                          href={project.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group inline-flex items-center gap-1.5 font-mono text-xs text-foreground transition-colors hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
                        >
                          {project.href.replace("https://", "")}
                          <ArrowUpRight
                            aria-hidden="true"
                            className="h-3.5 w-3.5 transition-transform motion-safe:group-hover:-translate-y-px motion-safe:group-hover:translate-x-px"
                          />
                          <span className="sr-only">(opens in a new tab)</span>
                        </a>
                      ) : null}

                      {project.repo ? (
                        <a
                          href={project.repo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 font-mono text-xs text-muted transition-colors hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
                        >
                          <GitHubIcon aria-hidden="true" className="h-3.5 w-3.5" />
                          Source
                          <span className="sr-only">(opens in a new tab)</span>
                        </a>
                      ) : null}
                    </div>
                  ) : null}
                </div>

                <h4>
                  <button
                    type="button"
                    id={buttonId}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpen(isOpen ? null : project.id)}
                    className="flex w-full items-center justify-between gap-4 border-t border-border px-5 py-3.5 text-left font-mono text-xs text-muted transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-accent sm:px-6"
                  >
                    {isOpen ? "Hide the detail" : "How it was built"}
                    <motion.span
                      aria-hidden="true"
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.25, ease: EASE }}
                      className="inline-flex"
                    >
                      <ChevronDown className="h-4 w-4" />
                    </motion.span>
                  </button>
                </h4>

                <AnimatePresence initial={false}>
                  {isOpen ? (
                    <motion.div
                      key="panel"
                      id={panelId}
                      role="region"
                      aria-labelledby={buttonId}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.32, ease: EASE }}
                      className="overflow-hidden"
                    >
                      <div className="space-y-6 border-t border-border px-5 py-5 sm:px-6">
                        <div>
                          <h5 className="font-mono text-xs uppercase tracking-wider text-faint">
                            The brief
                          </h5>
                          <p className="mt-2 max-w-2xl text-pretty text-sm leading-relaxed text-muted">
                            {project.brief}
                          </p>
                        </div>

                        <div>
                          <h5 className="font-mono text-xs uppercase tracking-wider text-faint">
                            Decisions
                          </h5>
                          <ul role="list" className="mt-2 space-y-2.5">
                            {project.decisions.map((decision) => (
                              <li
                                key={decision}
                                className="flex max-w-2xl gap-3 text-pretty text-sm leading-relaxed text-muted"
                              >
                                <span
                                  aria-hidden="true"
                                  className="mt-[0.55em] h-1 w-1 shrink-0 rounded-full bg-accent/70"
                                />
                                {decision}
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          <h5 className="font-mono text-xs uppercase tracking-wider text-faint">
                            Built with
                          </h5>
                          <ul role="list" className="mt-2 flex flex-wrap gap-2">
                            {project.stack.map((tool) => (
                              <li
                                key={tool}
                                className="rounded-md border border-border bg-elevated px-2.5 py-1 font-mono text-[11px] text-muted"
                              >
                                {tool}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </motion.li>
            );
          })}
        </motion.ul>
      </div>
    </section>
  );
}
