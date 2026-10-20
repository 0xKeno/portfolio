"use client";

import type { ComponentType } from "react";
import { motion } from "framer-motion";
import { Mail } from "lucide-react";

import { GitHubIcon, LinkedInIcon, type IconProps } from "@/app/components/BrandIcons";
import CopyEmail from "@/app/components/CopyEmail";
import SectionHeader from "@/app/components/SectionHeader";
import { profile } from "@/app/lib/content";
import { useStagger, viewportOnce } from "@/app/lib/motion";

type ContactLink = {
  label: string;
  value: string;
  href: string;
  Icon: ComponentType<IconProps>;
  external?: boolean;
  /** Takes the whole row — the address is too long to share one. */
  wide?: boolean;
};

const links: ContactLink[] = [
  {
    label: "Email",
    value: profile.email,
    href: `mailto:${profile.email}`,
    Icon: Mail,
    wide: true,
  },
  {
    label: "GitHub",
    value: "github.com/0xKeno",
    href: profile.github,
    Icon: GitHubIcon,
    external: true,
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/0xkeno",
    href: profile.linkedin,
    Icon: LinkedInIcon,
    external: true,
  },
];

export default function Contact() {
  const { container, item } = useStagger({ stagger: 0.08 });

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="bg-surface px-6 py-24 sm:px-10 sm:py-36"
    >
      <div className="mx-auto w-full max-w-4xl space-y-14 sm:space-y-16">
        <SectionHeader
          index="06"
          kicker="Contact"
          title="Let’s talk."
          id="contact-heading"
        />

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          <motion.p
            variants={item}
            className="max-w-lg text-pretty text-base leading-relaxed text-muted"
          >
            {profile.availability}. Based in {profile.location} (
            {profile.timezone}). The fastest way to reach me is email — I read
            everything and reply to anything specific.
          </motion.p>

          <motion.ul
            variants={item}
            role="list"
            className="mt-10 grid gap-3 sm:grid-cols-2"
          >
            {links.map(({ label, value, href, Icon, external, wide }) => (
              <li key={label} className={wide ? "sm:col-span-2" : undefined}>
                <a
                  href={href}
                  {...(external
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                  className="card group flex items-center gap-3 rounded-3xl border border-border p-4 transition-[transform,border-color] duration-200 hover:border-accent/50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent motion-safe:hover:-translate-y-0.5"
                >
                  <Icon
                    aria-hidden="true"
                    className="h-4 w-4 shrink-0 text-muted transition-colors group-hover:text-accent"
                  />
                  <span className="min-w-0">
                    <span className="block text-xs text-faint">
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

          <motion.div variants={item} className="mt-6">
            <CopyEmail />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
