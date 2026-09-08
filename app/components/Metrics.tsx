"use client";

import { useEffect, useRef, useState } from "react";
import {
  animate,
  motion,
  useInView,
  useReducedMotion,
} from "framer-motion";

import { metrics, type Metric } from "@/app/lib/content";
import { EASE, useStagger, viewportOnce } from "@/app/lib/motion";

/**
 * Counts from zero to the metric's value once the strip scrolls into view.
 *
 * The final value is rendered into the DOM as text and the animated digits are
 * marked aria-hidden, so assistive tech reads "46.2%" once rather than
 * narrating every intermediate frame. Under reduced motion nothing counts —
 * the number is simply there.
 */
function Counter({ metric }: { metric: Metric }) {
  const reduced = useReducedMotion() ?? false;
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const [display, setDisplay] = useState(() =>
    reduced ? metric.value : 0,
  );

  const decimals = metric.decimals ?? 0;

  useEffect(() => {
    if (!inView || reduced) return;

    const controls = animate(0, metric.value, {
      duration: 1.4,
      ease: EASE,
      onUpdate: (latest) => setDisplay(latest),
    });

    return () => controls.stop();
  }, [inView, reduced, metric.value]);

  const formatted =
    (metric.prefix ?? "") +
    display.toFixed(decimals) +
    (metric.suffix ?? "");

  const final =
    (metric.prefix ?? "") +
    metric.value.toFixed(decimals) +
    (metric.suffix ?? "");

  return (
    <span ref={ref} className="tnum block text-4xl font-semibold text-data sm:text-5xl">
      <span aria-hidden="true">{formatted}</span>
      <span className="sr-only">{final}</span>
    </span>
  );
}

export default function Metrics() {
  const { container, item } = useStagger({ stagger: 0.09 });

  return (
    <section
      aria-labelledby="metrics-heading"
      className="border-y border-border px-6 py-16 sm:px-10"
    >
      <h2 id="metrics-heading" className="sr-only">
        Selected figures
      </h2>

      <motion.ul
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        role="list"
        className="mx-auto grid w-full max-w-5xl gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4"
      >
        {metrics.map((metric) => (
          <motion.li key={metric.label} variants={item}>
            <Counter metric={metric} />
            <p className="mt-3 text-sm font-medium text-foreground">
              {metric.label}
            </p>
            <p className="mt-1 text-pretty text-xs leading-relaxed text-faint">
              {metric.note}
            </p>
          </motion.li>
        ))}
      </motion.ul>
    </section>
  );
}
