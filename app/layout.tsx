import type { Metadata } from "next";

import CommandPalette from "@/app/components/CommandPalette";
import Nav from "@/app/components/Nav";
import ScrollProgress from "@/app/components/ScrollProgress";
import { profile } from "@/app/lib/content";
import "./globals.css";

const title = `${profile.name} — Web and app developer, Benin City`;
const description =
  "Computer Science graduate (Second Class Upper) in Benin City, Nigeria. I build websites and apps, with six months of enterprise IT operations at NNPC E&P behind me.";

export const metadata: Metadata = {
  // Resolves every relative metadata URL below into an absolute one. Crawlers
  // fetch from outside the site, so "/" means nothing to them without this.
  metadataBase: new URL(profile.site),
  title: {
    default: title,
    template: `%s — ${profile.name}`,
  },
  description,
  authors: [{ name: profile.name, url: profile.site }],
  creator: profile.name,
  keywords: [
    "Okpoudhu Destiny Oghenekeno",
    "0xKeno",
    "Computer Science",
    "web developer",
    "app developer",
    "Next.js",
    "graduate programme",
    "IT support",
    "Benin City",
    "Nigeria",
  ],
  // Every Vercel deployment also gets its own permanent URL, so without a
  // canonical those can be indexed as duplicates of the production site.
  alternates: { canonical: "/" },
  openGraph: {
    title,
    description,
    url: "/",
    type: "profile",
    locale: "en_NG",
    siteName: profile.name,
  },
  twitter: { card: "summary", title, description },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className="h-full antialiased"
    >
      <body className="relative flex min-h-full flex-col">
        <ScrollProgress />

        {/* First stop in the tab order: a way past the navigation. Visible only
            when focused. */}
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[80] focus:rounded-lg focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-white"
        >
          Skip to content
        </a>

        <Nav />
        <CommandPalette />

        <main id="main" className="flex-1">
          {children}
        </main>

        <footer
          data-print="hide"
          className="border-t border-border bg-surface px-6 py-10 sm:px-10"
        >
          <div className="mx-auto flex w-full max-w-5xl flex-col gap-3 text-xs text-faint sm:flex-row sm:items-center sm:justify-between">
            <p>
              &copy; {new Date().getFullYear()} {profile.name}
            </p>
            <p>
              Built with Next.js and Tailwind CSS. Press{" "}
              <kbd className="rounded border border-border bg-elevated px-1.5 font-mono py-0.5 text-[10px] text-muted">
                Ctrl K
              </kbd>{" "}
              to jump anywhere.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
