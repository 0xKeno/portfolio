"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronRight, FileText } from "lucide-react";

import Logo from "@/app/components/Logo";
import CopyEmail from "@/app/components/CopyEmail";
import { heroLine, profile } from "@/app/lib/content";
import { useStagger, useWordReveal } from "@/app/lib/motion";

/**
 * The opening, laid out like an Apple product launch: everything centred,
 * one very large line, one statement in the accent gradient, a short
 * paragraph, and two calls to action — a filled pill and a text link with a
 * chevron.
 */
export default function Hero() {
  const { container, item, reduced } = useStagger({ delay: 0.35, travel: 18 });
  const { container: words, word } = useWordReveal(0.15);

  const nameWords = profile.name.split(" ");

  return (
    <section
      id="hero"
      className="relative flex min-h-[88svh] items-center px-6 pb-24 pt-20 sm:px-10"
    >
      <div className="mx-auto w-full max-w-5xl text-center">
        <motion.div
          initial={{ opacity: 0, scale: reduced ? 1 : 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 30 }}
          className="mx-auto mb-8 w-fit"
        >
          <Logo size={88} className="drop-shadow-lg" />
        </motion.div>

        {/* The visible name is split into animated word spans, so the whole
            string is given to assistive tech once on the wrapper and the spans
            themselves are hidden from it. */}
        <motion.h1
          variants={words}
          initial="hidden"
          animate="visible"
          aria-label={profile.name}
          className="display text-balance text-[clamp(2.25rem,5.5vw,4.25rem)] font-semibold"
        >
          {nameWords.map((text, index) => (
            <span key={text} className="inline-block overflow-hidden pb-[0.08em]">
              <motion.span variants={word} aria-hidden="true" className="inline-block">
                {text}
                {index < nameWords.length - 1 ? " " : null}
              </motion.span>
            </span>
          ))}
        </motion.h1>

        <motion.div variants={container} initial="hidden" animate="visible">
          <motion.p
            variants={item}
            className="headline gradient-text mx-auto mt-5 max-w-3xl text-balance text-[clamp(1.6rem,3.6vw,2.6rem)] font-semibold"
          >
            I build websites and apps.
          </motion.p>

          <motion.p
            variants={item}
            className="mx-auto mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-muted sm:text-xl"
          >
            {heroLine}
          </motion.p>

          <motion.div
            variants={item}
            className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-4"
          >
            <Link
              href="/cv"
              className="btn-primary inline-flex items-center gap-2 rounded-full px-6 py-3 text-[17px] font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              <FileText aria-hidden="true" className="h-4 w-4" />
              Read my CV
            </Link>

            <a
              href="#projects"
              className="group inline-flex items-center gap-0.5 text-[17px] text-accent hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
            >
              See my work
              <ChevronRight
                aria-hidden="true"
                className="h-4 w-4 transition-transform motion-safe:group-hover:translate-x-0.5"
              />
            </a>
          </motion.div>

          <motion.div
            variants={item}
            className="mt-10 flex flex-wrap items-center justify-center gap-3"
          >
            <span className="inline-flex items-center gap-2 rounded-full bg-surface px-3.5 py-1.5 text-sm text-foreground">
              <motion.span
                aria-hidden="true"
                className="h-1.5 w-1.5 shrink-0 rounded-full bg-data"
                animate={reduced ? undefined : { opacity: [1, 0.3, 1] }}
                transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
              />
              {profile.availability}
            </span>
            <CopyEmail />
          </motion.div>

          <motion.p variants={item} className="mt-6 text-sm text-faint">
            {profile.location} · {profile.timezone}
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
