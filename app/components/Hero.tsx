"use client";

import { motion } from "framer-motion";

import { useStagger } from "@/app/lib/motion";

export default function Hero() {
  const { container, item, prefersReducedMotion } = useStagger();

  return (
    <section
      id="hero"
      className="relative flex min-h-svh scroll-mt-20 items-center overflow-hidden px-6 py-24 sm:px-10"
    >
      <div
        aria-hidden="true"
        className="hero-glow pointer-events-none absolute left-1/2 top-1/2 h-[36rem] w-[52rem] -translate-x-1/2 -translate-y-1/2"
      />

      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
        className="relative mx-auto w-full max-w-3xl"
      >
        <motion.div
          variants={item}
          className="flex flex-wrap items-center gap-x-4 gap-y-3"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1.5 font-mono text-xs text-foreground">
            <motion.span
              aria-hidden="true"
              className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
              animate={
                prefersReducedMotion ? undefined : { opacity: [1, 0.3, 1] }
              }
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
            Open to remote work
          </span>
          <span className="font-mono text-xs text-muted">
            Benin City, Nigeria
          </span>
        </motion.div>

        <motion.h1
          variants={item}
          className="mt-8 text-balance text-4xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-6xl"
        >
          Okpoudhu Destiny Oghenekeno
        </motion.h1>

        <motion.p
          variants={item}
          className="mt-5 max-w-xl text-balance text-lg leading-relaxed text-foreground sm:text-xl"
        >
          Final-year Computer Science student learning web development, data
          analysis and Python &mdash; in public.
        </motion.p>

        <motion.p
          variants={item}
          className="mt-6 max-w-[33rem] text-pretty text-base leading-relaxed text-muted"
        >
          I work in AI data annotation, spent six months on an enterprise IT help
          desk, and I&apos;m building my way into software development one honest
          project at a time. This site is the first of them.
        </motion.p>

        <motion.div
          variants={item}
          className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center"
        >
          <a
            href="#experience"
            className="inline-flex w-full items-center justify-center rounded-lg bg-accent px-5 py-3 text-sm font-medium text-background transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent sm:w-auto"
          >
            See my experience
          </a>
          <a
            href="mailto:kennyokpoudhu@gmail.com"
            className="inline-flex w-full items-center justify-center rounded-lg border border-border px-5 py-3 text-sm font-medium text-foreground transition-colors hover:bg-surface focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent sm:w-auto"
          >
            Get in touch
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
