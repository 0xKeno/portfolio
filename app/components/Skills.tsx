"use client";

import { motion } from "framer-motion";

import SectionHeader from "@/app/components/SectionHeader";
import { skillGroups } from "@/app/lib/content";
import { useStagger, viewportOnce } from "@/app/lib/motion";

export default function Skills() {
  const { container, item } = useStagger({ stagger: 0.08 });

  return (
    <section
      id="skills"
      aria-labelledby="skills-heading"
      className="px-6 py-24 sm:px-10 sm:py-32"
    >
      <div className="mx-auto grid w-full max-w-5xl gap-12 lg:grid-cols-[16rem_1fr] lg:gap-16">
        <SectionHeader
          index="04"
          kicker="Skills"
          title="What I actually know"
          id="skills-heading"
          lede="Grouped by how well I know them, not by what looks best on a list."
        />

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="space-y-10"
        >
          {skillGroups.map((group) => (
            <motion.div key={group.label} variants={item}>
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <h3
                  className={`font-mono text-sm ${
                    group.current ? "text-data" : "text-foreground"
                  }`}
                >
                  {group.label}
                </h3>
                <p className="text-xs text-faint">{group.note}</p>
              </div>

              <ul role="list" className="mt-4 flex flex-wrap gap-2">
                {group.items.map((skill) => (
                  <li
                    key={skill}
                    className="rounded-md border border-border bg-surface px-2.5 py-1.5 font-mono text-xs text-foreground transition-colors hover:border-border-strong"
                  >
                    {skill}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
