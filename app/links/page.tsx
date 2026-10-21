import type { ComponentType } from "react";
import type { Metadata } from "next";
import { ChevronRight, Globe, Mail, MessageCircle, PlayCircle } from "lucide-react";

import { GitHubIcon, LinkedInIcon, type IconProps } from "@/app/components/BrandIcons";
import Logo from "@/app/components/Logo";
import { profile } from "@/app/lib/content";

export const metadata: Metadata = {
  title: "Links",
  description: `Every place to find ${profile.name} (${profile.handle}): portfolio, GitHub, LinkedIn, email, WhatsApp and YouTube.`,
  alternates: { canonical: "/links" },
};

type LinkItem = {
  label: string;
  detail: string;
  href: string;
  Icon: ComponentType<IconProps>;
  /** Opens in a new tab. Off for the portfolio, which is this same site. */
  external?: boolean;
};

const links: LinkItem[] = [
  {
    label: "Portfolio",
    detail: "My work, experience and CV",
    href: "/",
    Icon: Globe,
  },
  {
    label: "GitHub",
    detail: "github.com/0xKeno",
    href: profile.github,
    Icon: GitHubIcon,
    external: true,
  },
  {
    label: "LinkedIn",
    detail: "linkedin.com/in/0xkeno",
    href: profile.linkedin,
    Icon: LinkedInIcon,
    external: true,
  },
  {
    label: "Email",
    detail: profile.email,
    href: `mailto:${profile.email}`,
    Icon: Mail,
  },
  {
    label: "WhatsApp",
    detail: "Message me directly",
    href: profile.whatsapp,
    Icon: MessageCircle,
    external: true,
  },
  {
    label: "Stickk on YouTube",
    detail: "Stick-figure stories about ancient humans",
    href: profile.youtube,
    Icon: PlayCircle,
    external: true,
  },
];

/**
 * A link-in-bio page, for social profiles that allow one link: the logo, a
 * one-line introduction, and one large pill per destination. Server-rendered
 * with no animation, so it is instant on a slow mobile connection — which is
 * where almost everyone opening it will be.
 */
export default function LinksPage() {
  return (
    <div className="flex min-h-[100svh] justify-center px-5 py-16 sm:py-24">
      <div className="w-full max-w-md">
        <div className="text-center">
          <Logo size={80} className="mx-auto drop-shadow-lg" />
          <h1 className="display mt-6 text-3xl font-semibold">{profile.handle}</h1>
          <p className="mt-2 text-base text-foreground">{profile.name}</p>
          <p className="mx-auto mt-3 max-w-sm text-pretty text-[15px] leading-relaxed text-muted">
            Web and app developer · Computer Science graduate · {profile.location}
          </p>
        </div>

        <ul role="list" className="mt-10 space-y-3">
          {links.map(({ label, detail, href, Icon, external }) => (
            <li key={label}>
              <a
                href={href}
                {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="card group flex items-center gap-4 rounded-2xl border border-border px-5 py-4 transition-[transform,border-color] duration-200 hover:border-accent/50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent motion-safe:hover:-translate-y-0.5 motion-safe:active:scale-[0.98]"
              >
                <Icon aria-hidden="true" className="h-5 w-5 shrink-0 text-accent" />
                <span className="min-w-0 flex-1">
                  <span className="block text-[17px] font-semibold text-foreground">
                    {label}
                  </span>
                  <span className="block truncate text-sm text-muted">{detail}</span>
                </span>
                <ChevronRight
                  aria-hidden="true"
                  className="h-4 w-4 shrink-0 text-faint transition-transform motion-safe:group-hover:translate-x-0.5"
                />
                {external ? <span className="sr-only"> (opens in a new tab)</span> : null}
              </a>
            </li>
          ))}
        </ul>

        <p className="mt-10 text-center text-sm text-faint">
          {profile.availability}
        </p>
      </div>
    </div>
  );
}
