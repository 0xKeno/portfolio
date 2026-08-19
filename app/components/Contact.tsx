"use client";

import type { ComponentType, SVGProps } from "react";
import { motion } from "framer-motion";
import { Mail } from "lucide-react";

import SectionLabel from "@/app/components/SectionLabel";
import { useStagger } from "@/app/lib/motion";

type IconProps = SVGProps<SVGSVGElement>;

/**
 * Official brand marks, inlined because Lucide dropped its brand icons.
 * Drawn in a 24x24 box to match Lucide's optical sizing, and filled with
 * currentColor so they inherit the hover accent like any other icon.
 */
function GitHubIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  );
}

function LinkedInIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
    </svg>
  );
}

type ContactLink = {
  label: string;
  value: string;
  href: string;
  Icon: ComponentType<IconProps>;
  /** Opens in a new tab and needs rel hardening. */
  external?: boolean;
};

const links: ContactLink[] = [
  {
    label: "Email",
    value: "kennyokpoudhu@gmail.com",
    href: "mailto:kennyokpoudhu@gmail.com",
    Icon: Mail,
  },
  {
    label: "GitHub",
    value: "github.com/0xKeno",
    href: "https://github.com/0xKeno",
    Icon: GitHubIcon,
    external: true,
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/0xkeno",
    href: "https://linkedin.com/in/0xkeno",
    Icon: LinkedInIcon,
    external: true,
  },
];

export default function Contact() {
  const { container, item } = useStagger();

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="scroll-mt-20 px-6 py-24 sm:px-10 sm:py-32"
    >
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="mx-auto w-full max-w-3xl"
      >
        <motion.div variants={item}>
          <SectionLabel number="04" label="Get in touch" />
          <h2
            id="contact-heading"
            className="mt-3 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl"
          >
            Get in touch
          </h2>
        </motion.div>

        <motion.p
          variants={item}
          className="mt-4 max-w-lg text-pretty text-base leading-relaxed text-muted"
        >
          Open to remote work in AI training, data annotation, technical writing
          and IT support. Based in Benin City, Nigeria (UTC+1).
        </motion.p>

        <motion.ul
          variants={item}
          role="list"
          className="mt-10 grid gap-3 lg:grid-cols-3"
        >
          {links.map(({ label, value, href, Icon, external }) => (
            <li key={label}>
              <a
                href={href}
                {...(external
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
                className="group flex items-center gap-3 rounded-lg border border-border bg-surface p-4 transition-[transform,border-color,color] duration-150 hover:border-accent/60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent motion-safe:hover:-translate-y-px"
              >
                <Icon
                  aria-hidden="true"
                  className="h-4 w-4 shrink-0 text-muted transition-colors group-hover:text-accent"
                />
                <span className="min-w-0">
                  <span className="block font-mono text-xs text-muted">
                    {label}
                  </span>
                  <span className="block truncate text-sm text-foreground">
                    {value}
                  </span>
                  {external ? (
                    <span className="sr-only"> (opens in a new tab)</span>
                  ) : null}
                </span>
              </a>
            </li>
          ))}
        </motion.ul>
      </motion.div>
    </section>
  );
}
