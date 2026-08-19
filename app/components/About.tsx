"use client";

import { motion } from "framer-motion";

import Avatar from "@/app/components/Avatar";
import SectionLabel from "@/app/components/SectionLabel";
import { useStagger } from "@/app/lib/motion";

export default function About() {
  const { container, item } = useStagger();

  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="scroll-mt-20 px-6 py-24 sm:px-10 sm:py-32"
    >
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="mx-auto w-full max-w-3xl lg:grid lg:grid-cols-[12rem_1fr] lg:gap-12"
      >
        <motion.div variants={item}>
          <Avatar size={96} className="h-24 w-24 text-sm" />

          <div className="mt-6">
            <SectionLabel number="01" label="About" />
          </div>

          <h2
            id="about-heading"
            className="mt-3 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl"
          >
            About
          </h2>
        </motion.div>

        <div className="mt-10 max-w-lg space-y-5 lg:mt-0">
          <motion.p
            variants={item}
            className="text-pretty text-base leading-relaxed text-foreground"
          >
            I&apos;m a Computer Scientist currently in Benin
            City, Nigeria.
          </motion.p>

          <motion.p
            variants={item}
            className="text-pretty text-base leading-relaxed text-muted"
          >
            Most of what I know how to do well, I learned by doing it repeatedly
            and paying attention. Six months on an enterprise IT help desk at
            NNPC E&amp;P Limited taught me how to work inside someone else&apos;s
            procedures. Annotation work taught me to follow a rule set precisely
            and check my own output before submitting it. Running a YouTube
            channel taught me that shipping something imperfect beats planning
            something perfect.
          </motion.p>

          <motion.p
            variants={item}
            className="text-pretty text-base leading-relaxed text-muted"
          >
            I&apos;m early in software development and I&apos;d rather say that
            plainly than overstate it. This site is me learning in public &mdash;
            built from scratch, and I can explain every decision in it.
          </motion.p>

          <motion.p
            variants={item}
            className="text-pretty text-base leading-relaxed text-muted"
          >
            Open to remote work in AI training, data annotation, technical
            writing and IT support.
          </motion.p>
        </div>
      </motion.div>
    </section>
  );
}
