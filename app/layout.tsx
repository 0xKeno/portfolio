import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import CommandPalette from "@/app/components/CommandPalette";
import Nav from "@/app/components/Nav";
import ScrollProgress from "@/app/components/ScrollProgress";
import Spotlight from "@/app/components/Spotlight";
import { profile } from "@/app/lib/content";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const title = `${profile.name} — Computer Science graduand, Benin City`;
const description =
  "Computer Science graduand in Benin City, Nigeria. Six months of enterprise IT operations at NNPC E&P, AI data verification, and analytics-led production work.";

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
    "graduate programme",
    "IT support",
    "data annotation",
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
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="relative flex min-h-full flex-col">
        {/* Ambient layers. Fixed rather than absolute so they behave as light
            in the room instead of scrolling away as objects on the page. */}
        <div
          aria-hidden="true"
          data-print="hide"
          className="aurora pointer-events-none fixed inset-0 -z-20"
        />
        <div
          aria-hidden="true"
          data-print="hide"
          className="dot-grid pointer-events-none absolute inset-0 -z-10"
        />
        <Spotlight />
        <ScrollProgress />

        {/* First stop in the tab order: a way past the navigation. Visible only
            when focused. */}
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[80] focus:rounded-lg focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-background"
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
          className="border-t border-border px-6 py-10 sm:px-10"
        >
          <div className="mx-auto flex w-full max-w-5xl flex-col gap-3 font-mono text-xs text-faint sm:flex-row sm:items-center sm:justify-between">
            <p>
              &copy; {new Date().getFullYear()} {profile.name}
            </p>
            <p>
              Built with Next.js and Tailwind CSS. Press{" "}
              <kbd className="rounded border border-border bg-surface px-1.5 py-0.5 text-[10px] text-muted">
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
