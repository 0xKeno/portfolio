"use client";

import { useReducedMotion, type Transition, type Variants } from "framer-motion";

/** Decelerating curve — elements arrive rather than drift. */
export const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

/** Shorter, firmer curve for interaction feedback rather than entrance. */
export const EASE_OUT: [number, number, number, number] = [0.33, 1, 0.68, 1];

type StaggerOptions = {
  /** Seconds between each child. */
  stagger?: number;
  /** Seconds to wait before the first child. */
  delay?: number;
  /** Pixels of upward travel. */
  travel?: number;
  /** Seconds each child takes. */
  duration?: number;
  /** Optional horizontal travel, for rails and side entrances. */
  travelX?: number;
};

/**
 * Shared fade-up stagger. Pair `container` with `initial="hidden"` and either
 * `animate="visible"` (above the fold) or `whileInView="visible"` (below it),
 * then give each direct child `variants={item}`.
 *
 * Every motion value collapses to zero under prefers-reduced-motion, so
 * content appears in place instead of moving. Opacity is kept — a fade is not
 * what the reduced-motion setting is asking us to remove.
 */
export function useStagger({
  stagger = 0.07,
  delay = 0.1,
  travel = 16,
  travelX = 0,
  duration = 0.55,
}: StaggerOptions = {}) {
  const reduced = useReducedMotion() ?? false;

  const container: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: reduced ? 0 : stagger,
        delayChildren: reduced ? 0 : delay,
      },
    },
  };

  const item: Variants = {
    hidden: {
      opacity: 0,
      y: reduced ? 0 : travel,
      x: reduced ? 0 : travelX,
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      transition: {
        duration: reduced ? 0.01 : duration,
        ease: EASE,
      },
    },
  };

  return { container, item, reduced };
}

/**
 * Word-by-word reveal for a single heading. Returns variants to spread over a
 * wrapper and over each word span.
 *
 * Words, not letters: a letter stagger on a long name reads as a slot machine,
 * and screen readers get the whole string from the wrapper's text content
 * either way.
 */
export function useWordReveal(delay = 0.05) {
  const reduced = useReducedMotion() ?? false;

  const container: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: reduced ? 0 : 0.055,
        delayChildren: reduced ? 0 : delay,
      },
    },
  };

  const word: Variants = {
    hidden: { opacity: 0, y: reduced ? 0 : "0.4em" },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: reduced ? 0.01 : 0.7, ease: EASE },
    },
  };

  return { container, word, reduced };
}

/** Standard viewport trigger — fires once, a fifth of the way in. */
export const viewportOnce = { once: true, amount: 0.2 } as const;

/** Hover/tap feel for cards and buttons. */
export const springy: Transition = {
  type: "spring",
  stiffness: 400,
  damping: 30,
};
