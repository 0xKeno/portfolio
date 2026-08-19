"use client";

import { motion } from "framer-motion";

import SectionLabel from "@/app/components/SectionLabel";
import { useStagger } from "@/app/lib/motion";

type Group = {
  label: string;
  /** Marks the group as current — gets the accent label. */
  current?: boolean;
  items: string[];
};

const groups: Group[] = [
  {
    label: "Working with",
    items: [
      "TypeScript",
      "JavaScript",
      "React",
      "Next.js",
      "Node.js",
      "Tailwind CSS",
      "HTML",
      "CSS",
      "Git",
    ],
  },
  {
    label: "Foundational — coursework and study",
    items: [
      "Python",
      "SQL",
      "MongoDB",
      "REST APIs",
      "data structures & algorithms",
    ],
  },
  {
    label: "Learning now",
    current: true,
    items: [
      "Python (CS50P)",
      "open source contribution",
      "accessibility and semantic HTML",
    ],
  },
];

export default function Skills() {
  const { container, item } = useStagger();

  return (
    <section
      id="skills"
      aria-labelledby="skills-heading"
      className="scroll-mt-20 px-6 py-24 sm:px-10 sm:py-32"
    >
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="mx-auto w-full max-w-3xl"
      >
        <motion.div variants={item}>
          <SectionLabel number="02" label="Skills" />
          <h2
            id="skills-heading"
            className="mt-3 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl"
          >
            Skills
          </h2>
        </motion.div>

        <motion.p
          variants={item}
          className="mt-4 max-w-lg text-pretty text-base leading-relaxed text-muted"
        >
          Grouped by how well I actually know them, not by what looks best.
        </motion.p>

        <div className="mt-12 space-y-10">
          {groups.map((group) => (
            <motion.div key={group.label} variants={item}>
              <h3
                className={`font-mono text-sm ${
                  group.current ? "text-accent" : "text-foreground"
                }`}
              >
                {group.label}
              </h3>

              <ul role="list" className="mt-4 flex flex-wrap gap-2">
                {group.items.map((skill) => (
                  <li
                    key={skill}
                    className="rounded-md border border-border bg-surface px-2.5 py-1 font-mono text-xs text-foreground"
                  >
                    {skill}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
