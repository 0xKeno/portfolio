"use client";

import { motion } from "framer-motion";

import Logo from "@/app/components/Logo";
import SectionHeader from "@/app/components/SectionHeader";
import { now, profile } from "@/app/lib/content";
import { useStagger, viewportOnce } from "@/app/lib/motion";

export default function About() {
  const { container, item } = useStagger({ stagger: 0.08 });

  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="px-6 py-24 sm:px-10 sm:py-36"
    >
      <div className="mx-auto w-full max-w-4xl space-y-14 sm:space-y-16">
        <SectionHeader
          index="05"
          kicker="About"
          title="How I got here."
          id="about-heading"
        />

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          <motion.div variants={item} className="flex items-center gap-4">
            <Logo size={56} title="" />
            <div>
              <p className="text-sm font-medium text-foreground">
                {profile.name}
              </p>
              <p className="text-xs text-faint">
                {profile.location} · {profile.timezone}
              </p>
            </div>
          </motion.div>

          <div className="mt-8 max-w-xl space-y-5">
            <motion.p
              variants={item}
              className="text-pretty text-base leading-relaxed text-foreground"
            >
              Most of what I know how to do well, I learned by doing it
              repeatedly and paying attention.
            </motion.p>

            <motion.p
              variants={item}
              className="text-pretty text-base leading-relaxed text-muted"
            >
              Six months on an enterprise IT help desk taught me to work inside
              someone else&apos;s procedures rather than around them. Building a
              site for another person taught me that the work is not about what
              I would have preferred to make. Running a channel taught me to let
              the numbers decide what comes next, even when I would rather they
              said something else.
            </motion.p>

            <motion.p
              variants={item}
              className="text-pretty text-base leading-relaxed text-muted"
            >
              I am early in software development and I would rather say that
              plainly than overstate it. Everything on this site is something I
              did, and I can walk you through any of it.
            </motion.p>
          </div>

          <motion.div variants={item} className="mt-10">
            <h3 className="text-sm text-data">Right now</h3>
            <ul role="list" className="mt-3 max-w-xl space-y-2">
              {now.map((entry) => (
                <li
                  key={entry}
                  className="flex gap-3 text-pretty text-sm leading-relaxed text-muted"
                >
                  <span
                    aria-hidden="true"
                    className="mt-[0.55em] h-1 w-1 shrink-0 rounded-full bg-data/60"
                  />
                  {entry}
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
