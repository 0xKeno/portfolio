"use client";

import { useReducedMotion, type Variants } from "framer-motion";

/** Decelerating curve — elements arrive rather than drift. */
const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

type StaggerOptions = {
  /** Seconds between each child. */
  stagger?: number;
  /** Seconds to wait before the first child. */
  delay?: number;
  /** Pixels of upward travel. */
  travel?: number;
  /** Seconds each child takes. */
  duration?: number;
};

/**
 * Shared fade-up stagger. Pair `container` with `initial="hidden"` and either
 * `animate="visible"` (above the fold) or `whileInView="visible"` (below it),
 * then give each direct child `variants={item}`.
 *
 * When the OS requests reduced motion, travel and duration collapse to zero so
 * content appears immediately instead of moving.
 */
export function useStagger({
  stagger = 0.08,
  delay = 0.15,
  travel = 14,
  duration = 0.5,
}: StaggerOptions = {}) {
  const prefersReducedMotion = useReducedMotion() ?? false;

  const container: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : stagger,
        delayChildren: prefersReducedMotion ? 0 : delay,
      },
    },
  };

  const item: Variants = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : travel },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: prefersReducedMotion ? 0 : duration,
        ease: EASE,
      },
    },
  };

  return { container, item, prefersReducedMotion };
}
