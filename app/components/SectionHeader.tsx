"use client";

import { motion } from "framer-motion";

import { useStagger, viewportOnce } from "@/app/lib/motion";

type SectionHeaderProps = {
  /** Two-digit index, e.g. "02". Kept for ordering; not rendered. */
  index: string;
  /** Short eyebrow above the heading, in the accent colour. */
  kicker: string;
  title: string;
  /** Wired to the section's aria-labelledby. */
  id: string;
  lede?: string;
};

/**
 * The opening of every section, in the manner of an Apple product page: a
 * small accent eyebrow, one large headline, and a single sentence under it,
 * all centred above the content.
 *
 * The eyebrow is aria-hidden and kept OUTSIDE the <h2>: it repeats the
 * section's name, so announcing it would read that name twice and fold it
 * into the heading's accessible name.
 */
export default function SectionHeader({
  kicker,
  title,
  id,
  lede,
}: SectionHeaderProps) {
  const { container, item } = useStagger({ stagger: 0.07, delay: 0, travel: 20 });

  return (
    <motion.div
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      className="mx-auto max-w-3xl text-center"
    >
      <motion.p
        variants={item}
        aria-hidden="true"
        className="eyebrow text-base sm:text-lg"
      >
        {kicker}
      </motion.p>

      <motion.h2
        variants={item}
        id={id}
        className="display mt-2 text-balance text-[clamp(2.25rem,5.5vw,3.75rem)] font-semibold"
      >
        {title}
      </motion.h2>

      {lede ? (
        <motion.p
          variants={item}
          className="mx-auto mt-5 max-w-2xl text-pretty text-lg leading-relaxed text-muted sm:text-xl"
        >
          {lede}
        </motion.p>
      ) : null}
    </motion.div>
  );
}
