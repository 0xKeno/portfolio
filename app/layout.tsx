import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import Nav from "@/app/components/Nav";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const title =
  "Okpoudhu Destiny Oghenekeno — Final-year CS student, Benin City";
const description =
  "Final-year Computer Science student in Benin City, Nigeria. AI data annotation, IT support, and learning software development in public.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    type: "website",
    locale: "en_NG",
    siteName: "Okpoudhu Destiny Oghenekeno",
  },
  twitter: {
    card: "summary",
    title,
    description,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="relative min-h-full flex flex-col">
        <div
          aria-hidden="true"
          className="dot-grid pointer-events-none absolute inset-0 -z-10"
        />
        <Nav />
        {children}

        <footer className="border-t border-border px-6 py-10 sm:px-10">
          <div className="mx-auto flex w-full max-w-3xl flex-col gap-2 font-mono text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
            <p>
              &copy; {new Date().getFullYear()} Okpoudhu Destiny Oghenekeno
            </p>
            <p>Built with Next.js and Tailwind CSS.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
