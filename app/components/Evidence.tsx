"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";

import SectionHeader from "@/app/components/SectionHeader";
import { evidence } from "@/app/lib/content";
import { EASE, useStagger, viewportOnce } from "@/app/lib/motion";

/**
 * The claim-and-proof section.
 *
 * Graduate assessors ask for competencies with evidence behind them, so each
 * card states the claim in the open and holds the situation, action and result
 * behind a disclosure. The heading is a real <button> inside an <h3> — a
 * div with a click handler would be invisible to keyboards and to the
 * screen-reader heading list.
 *
 * The panel is only unmounted when closed, never merely hidden, so its content
 * leaves the tab order with it. AnimatePresence keeps the collapse from
 * snapping shut.
 */
export default function Evidence() {
  const [open, setOpen] = useState<string | null>(evidence[0]?.id ?? null);
  const { container, item } = useStagger({ stagger: 0.08 });

  return (
    <section
      id="evidence"
      aria-labelledby="evidence-heading"
      className="px-6 py-24 sm:px-10 sm:py-32"
    >
      <div className="mx-auto grid w-full max-w-5xl gap-12 lg:grid-cols-[16rem_1fr] lg:gap-16">
        <SectionHeader
          index="01"
          kicker="Evidence"
          title="What I can show you"
          id="evidence-heading"
          lede="Four claims, each with the specific thing that backs it. Open one to see the situation, what I did, and what changed."
        />

        <motion.ul
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          role="list"
          className="space-y-3"
        >
          {evidence.map((entry) => {
            const isOpen = open === entry.id;
            const panelId = `evidence-panel-${entry.id}`;
            const buttonId = `evidence-button-${entry.id}`;

            return (
              <motion.li
                key={entry.id}
                variants={item}
                className={`card overflow-hidden rounded-xl border transition-colors duration-200 ${
                  isOpen
                    ? "border-accent/40"
                    : "border-border hover:border-border-strong"
                }`}
              >
                <h3>
                  <button
                    type="button"
                    id={buttonId}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpen(isOpen ? null : entry.id)}
                    className="flex w-full items-start gap-4 px-5 py-5 text-left focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-accent sm:px-6"
                  >
                    <span className="min-w-0 flex-1">
                      <span className="block font-mono text-xs uppercase tracking-[0.18em] text-accent">
                        {entry.trait}
                      </span>
                      <span className="mt-2 block text-pretty text-base font-medium text-foreground sm:text-lg">
                        {entry.claim}
                      </span>
                    </span>

                    <motion.span
                      aria-hidden="true"
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      transition={{ duration: 0.25, ease: EASE }}
                      className="mt-1 grid h-7 w-7 shrink-0 place-items-center rounded-md border border-border text-muted"
                    >
                      <Plus className="h-3.5 w-3.5" />
                    </motion.span>
                  </button>
                </h3>

                <AnimatePresence initial={false}>
                  {isOpen ? (
                    <motion.div
                      key="panel"
                      id={panelId}
                      role="region"
                      aria-labelledby={buttonId}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.32, ease: EASE }}
                      className="overflow-hidden"
                    >
                      <dl className="space-y-4 border-t border-border px-5 py-5 sm:px-6">
                        {(
                          [
                            ["Situation", entry.situation],
                            ["What I did", entry.action],
                            ["Result", entry.result],
                          ] as const
                        ).map(([label, text]) => (
                          <div key={label} className="sm:grid sm:grid-cols-[7rem_1fr] sm:gap-4">
                            <dt className="font-mono text-xs uppercase tracking-wider text-faint">
                              {label}
                            </dt>
                            <dd className="mt-1 text-pretty text-sm leading-relaxed text-muted sm:mt-0">
                              {text}
                            </dd>
                          </div>
                        ))}
                      </dl>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </motion.li>
            );
          })}
        </motion.ul>
      </div>
    </section>
  );
}
