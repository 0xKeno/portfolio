"use client";

import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";

/**
 * Hairline reading-progress bar pinned under the header.
 *
 * Driven by scaleX rather than width so it animates on the compositor and
 * never triggers layout. Under reduced motion the spring is skipped and the
 * raw scroll value is used — the bar still tracks the page, it just does not
 * overshoot and settle.
 */
export default function ScrollProgress() {
  const reduced = useReducedMotion() ?? false;
  const { scrollYProgress } = useScroll();
  const smoothed = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 24,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden="true"
      data-print="hide"
      style={{ scaleX: reduced ? scrollYProgress : smoothed }}
      className="fixed inset-x-0 top-0 z-[60] h-px origin-left bg-accent"
    />
  );
}
