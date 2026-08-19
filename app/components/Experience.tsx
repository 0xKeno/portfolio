"use client";

import { motion } from "framer-motion";

import SectionLabel from "@/app/components/SectionLabel";
import { useStagger } from "@/app/lib/motion";

type Role = {
  title: string;
  company: string;
  context: string;
  start: { label: string; iso: string };
  end: { label: string; iso: string } | null;
  description: string;
};

const roles: Role[] = [
  {
    title: "Data Annotation Contributor",
    company: "Atlas Capture",
    context: "Remote",
    start: { label: "Aug 2026", iso: "2026-08" },
    end: null,
    description:
      "Writing atomic action labels for first-person video under a strict schema: imperative voice, named acting hand, controlled verb vocabulary. Correcting AI-generated pre-labels against source footage. Guideline-heavy work where vague labels are automatically rejected.",
  },
  {
    title: "IT Administration / Help Desk Intern (SIWES)",
    company: "NNPC E&P Limited",
    context: "Benin City",
    start: { label: "Jun 2025", iso: "2025-06" },
    end: { label: "Nov 2025", iso: "2025-11" },
    description:
      "Six-month mandatory industrial placement in IT administration. First-line support across hardware, software and connectivity. User account administration and workstation setup. Certificate ref NEPL/HCM/6157.",
  },
  {
    title: "Channel Owner & Producer",
    company: "Sketched Explain",
    context: "YouTube",
    start: { label: "2025", iso: "2025" },
    end: null,
    description:
      "Behavioural-science explainer channel run end to end: editorial direction, production, publishing, analytics. Review every script for factual accuracy and overclaiming before production.",
  },
];

export default function Experience() {
  const { container, item } = useStagger();

  return (
    <section
      id="experience"
      aria-labelledby="experience-heading"
      className="scroll-mt-20 px-6 py-24 sm:px-10 sm:py-32"
    >
      <div className="mx-auto w-full max-w-3xl">
        <motion.div
          variants={item}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <SectionLabel number="03" label="Experience" />
          <h2
            id="experience-heading"
            className="mt-3 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl"
          >
            Experience
          </h2>
        </motion.div>

        <motion.ol
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="mt-10"
        >
          {roles.map((role, index) => (
            <motion.li
              key={role.title}
              variants={item}
              className="relative border-l border-border pb-8 pl-6 last:border-l-transparent last:pb-0 sm:pl-10"
            >
              <span
                aria-hidden="true"
                className={`absolute left-0 top-1.5 h-2.5 w-2.5 -translate-x-1/2 rounded-full ${
                  index === 0 ? "bg-accent" : "bg-border"
                }`}
              />

              <article className="rounded-lg border border-border bg-surface p-5 transition-[border-color] duration-150 hover:border-accent/60 sm:p-6">
                <p className="font-mono text-xs text-muted">
                  <time dateTime={role.start.iso}>{role.start.label}</time>
                  {" – "}
                  {role.end ? (
                    <time dateTime={role.end.iso}>{role.end.label}</time>
                  ) : (
                    "Present"
                  )}
                </p>

                <h3 className="mt-3 text-balance text-lg font-medium tracking-tight text-foreground sm:text-xl">
                  {role.title}
                </h3>

                <p className="mt-1.5 text-sm text-muted">
                  <span className="text-foreground">{role.company}</span>
                  {" · "}
                  {role.context}
                </p>

                <p className="mt-4 max-w-lg text-pretty text-sm leading-relaxed text-muted sm:text-base">
                  {role.description}
                </p>
              </article>
            </motion.li>
          ))}
        </motion.ol>
      </div>
    </section>
  );
}
