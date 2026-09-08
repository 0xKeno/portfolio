"use client";

import { motion } from "framer-motion";

import { useStagger, viewportOnce } from "@/app/lib/motion";

type SectionHeaderProps = {
  /** Two-digit index, e.g. "02". Decorative. */
  index: string;
  /** Short eyebrow above the heading. Decorative. */
  kicker: string;
  title: string;
  /** Wired to the section's aria-labelledby. */
  id: string;
  lede?: string;
};

/**
 * The left column of every section on desktop; stacks above the content on
 * mobile. Sticky on wide screens so the section title stays with the content
 * while it scrolls.
 *
 * The "01 / EVIDENCE" eyebrow is aria-hidden and kept OUTSIDE the <h2>: it
 * duplicates the heading that follows, so announcing it would read the section
 * name twice, and nesting it would fold "zero one slash evidence" into the
 * heading's accessible name and into screen-reader heading menus. The ordering
 * it conveys is already carried by document order.
 */
export default function SectionHeader({
  index,
  kicker,
  title,
  id,
  lede,
}: SectionHeaderProps) {
  const { container, item } = useStagger({ stagger: 0.06, delay: 0 });

  return (
    <motion.div
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      className="lg:sticky lg:top-24 lg:self-start"
    >
      <motion.p
        variants={item}
        aria-hidden="true"
        className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-faint"
      >
        <span className="text-accent">{index}</span>
        <span className="h-px w-6 bg-border-strong" />
        {kicker}
      </motion.p>

      <motion.h2
        variants={item}
        id={id}
        className="display mt-4 text-3xl font-semibold tracking-tight sm:text-4xl"
      >
        {title}
      </motion.h2>

      {lede ? (
        <motion.p
          variants={item}
          className="mt-4 max-w-xs text-pretty text-sm leading-relaxed text-muted"
        >
          {lede}
        </motion.p>
      ) : null}
    </motion.div>
  );
}
