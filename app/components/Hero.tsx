"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowDown, ArrowUpRight, FileText } from "lucide-react";

import CopyEmail from "@/app/components/CopyEmail";
import { profile, summary } from "@/app/lib/content";
import { useStagger, useWordReveal } from "@/app/lib/motion";

export default function Hero() {
  const { container, item, reduced } = useStagger({ delay: 0.35, travel: 18 });
  const { container: words, word } = useWordReveal(0.1);

  const nameWords = profile.name.split(" ");

  return (
    <section
      id="hero"
      className="relative flex min-h-[92svh] items-center px-6 pb-20 pt-28 sm:px-10"
    >
      <div className="mx-auto w-full max-w-5xl">
        {/* Name. The visible text is split into animated word spans, so the
            whole string is given to assistive tech once on the wrapper and the
            spans themselves are hidden from it. */}
        <motion.h1
          variants={words}
          initial="hidden"
          animate="visible"
          aria-label={profile.name}
          className="display text-[clamp(2.5rem,8vw,5.5rem)] font-semibold leading-[0.95] tracking-tight"
        >
          {nameWords.map((text, index) => (
            <span key={text} className="inline-block overflow-hidden pb-[0.08em]">
              <motion.span
                variants={word}
                aria-hidden="true"
                className="inline-block"
              >
                {text}
                {index < nameWords.length - 1 ? " " : null}
              </motion.span>
            </span>
          ))}
        </motion.h1>

        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          className="mt-8"
        >
          <motion.div
            variants={item}
            className="flex flex-wrap items-center gap-x-4 gap-y-3"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1.5 font-mono text-xs text-foreground">
              <motion.span
                aria-hidden="true"
                className="h-1.5 w-1.5 shrink-0 rounded-full bg-data"
                animate={reduced ? undefined : { opacity: [1, 0.25, 1] }}
                transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
              />
              {profile.availability}
            </span>
            <span className="font-mono text-xs text-faint">
              {profile.location} · {profile.timezone}
            </span>
          </motion.div>

          <motion.p
            variants={item}
            className="mt-7 max-w-2xl text-balance text-xl leading-snug text-foreground sm:text-2xl"
          >
            {profile.title} working in {profile.strapline}.
          </motion.p>

          <motion.p
            variants={item}
            className="mt-5 max-w-xl text-pretty text-base leading-relaxed text-muted"
          >
            {summary}
          </motion.p>

          <motion.div
            variants={item}
            className="mt-10 flex flex-wrap items-center gap-3"
          >
            <Link
              href="/cv"
              className="group inline-flex items-center gap-2 rounded-lg bg-accent px-5 py-3 text-sm font-medium text-background transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              <FileText aria-hidden="true" className="h-4 w-4" />
              Read my CV
            </Link>

            <a
              href="#evidence"
              className="inline-flex items-center gap-2 rounded-lg border border-border px-5 py-3 text-sm font-medium text-foreground transition-colors hover:border-border-strong hover:bg-surface focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              See the evidence
              <ArrowUpRight aria-hidden="true" className="h-4 w-4 text-muted" />
            </a>

            <CopyEmail className="py-3" />
          </motion.div>

          <motion.p
            variants={item}
            aria-hidden="true"
            className="mt-16 flex items-center gap-2 font-mono text-xs text-faint"
          >
            <motion.span
              animate={reduced ? undefined : { y: [0, 4, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="inline-flex"
            >
              <ArrowDown className="h-3.5 w-3.5" />
            </motion.span>
            Scroll, or press
            <kbd className="rounded border border-border bg-surface px-1.5 py-0.5 text-[10px] text-muted">
              Ctrl K
            </kbd>
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
