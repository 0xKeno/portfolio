"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FileText, Menu, X } from "lucide-react";

import Avatar from "@/app/components/Avatar";
import { profile } from "@/app/lib/content";

const SECTIONS = [
  { id: "evidence", label: "Evidence" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
];

/** Hero is observed too, so nothing is highlighted while it is in view. */
const OBSERVED = ["hero", ...SECTIONS.map((section) => section.id)];

export default function Nav() {
  const pathname = usePathname();
  const onHome = pathname === "/";

  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Reading scrollY does not force layout, unlike getBoundingClientRect, so a
  // passive listener is cheap. React bails out when the value is unchanged.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Active section: a narrow band near the top of the viewport. Whichever
  // observed section crosses it first in document order wins. Only runs on the
  // homepage — the other routes have no sections to observe, and `active` is
  // derived away below rather than cleared through state.
  useEffect(() => {
    if (!onHome) return;

    const visible = new Set<string>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.add(entry.target.id);
          else visible.delete(entry.target.id);
        }
        const first = OBSERVED.find((id) => visible.has(id));
        if (first) setActive(first);
      },
      { rootMargin: "-25% 0px -55% 0px" },
    );

    for (const id of OBSERVED) {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    }
    return () => observer.disconnect();
  }, [onHome]);

  // Highlighting is derived, not stored: off the homepage there is nothing to
  // highlight, so the stale value from the last visit is simply ignored rather
  // than reset in an effect (which would cost an extra render every route
  // change).
  const activeSection = onHome ? active : null;

  // Escape closes the menu AND restores focus to the trigger, so the user does
  // not lose their place in the tab order.
  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const linkClass = useCallback(
    (id: string) =>
      `motion-safe:transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent ${
        active === id ? "text-accent" : "text-muted"
      }`,
    [active],
  );

  // On the homepage these are in-page anchors; anywhere else they have to go
  // home first, or they resolve against the current route and do nothing.
  const href = (id: string) => (onHome ? `#${id}` : `/#${id}`);

  return (
    <header
      data-print="hide"
      className={`sticky top-0 z-50 border-b motion-safe:transition-colors ${
        scrolled
          ? "border-border bg-background/75 backdrop-blur-md"
          : "border-transparent bg-transparent"
      }`}
    >
      <nav
        aria-label="Main"
        className="mx-auto flex h-16 w-full max-w-5xl items-center justify-between gap-4 px-6 sm:px-10"
      >
        <Link
          href="/"
          className="wordmark font-mono text-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
        >
          {profile.handle}
        </Link>

        <ul role="list" className="hidden items-center gap-6 lg:flex">
          {SECTIONS.map((section) => (
            <li key={section.id}>
              <a
                href={href(section.id)}
                aria-current={activeSection === section.id ? "true" : undefined}
                className={`font-mono text-xs ${linkClass(section.id)}`}
              >
                {section.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <Link
            href="/cv"
            aria-current={pathname === "/cv" ? "page" : undefined}
            className={`hidden items-center gap-1.5 rounded-md border px-3 py-1.5 font-mono text-xs transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent sm:inline-flex ${
              pathname === "/cv"
                ? "border-accent/50 text-accent"
                : "border-border text-muted hover:border-border-strong hover:text-foreground"
            }`}
          >
            <FileText aria-hidden="true" className="h-3.5 w-3.5" />
            CV
          </Link>

          <Avatar size={32} className="h-8 w-8 text-[10px]" alt="" />

          <button
            ref={buttonRef}
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="nav-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="grid h-8 w-8 place-items-center rounded-md border border-border text-muted motion-safe:transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent lg:hidden"
          >
            {open ? (
              <X aria-hidden="true" className="h-4 w-4" />
            ) : (
              <Menu aria-hidden="true" className="h-4 w-4" />
            )}
          </button>
        </div>
      </nav>

      {/* Unmounted when closed so its links leave the tab order entirely. */}
      {open ? (
        <div
          id="nav-menu"
          className="border-t border-border bg-surface lg:hidden"
        >
          <ul
            role="list"
            className="mx-auto w-full max-w-5xl space-y-1 px-6 py-3 sm:px-10"
          >
            {SECTIONS.map((section) => (
              <li key={section.id}>
                <a
                  href={href(section.id)}
                  onClick={() => setOpen(false)}
                  aria-current={activeSection === section.id ? "true" : undefined}
                  className={`block rounded-md px-2 py-2 font-mono text-sm ${linkClass(
                    section.id,
                  )}`}
                >
                  {section.label}
                </a>
              </li>
            ))}
            <li>
              <Link
                href="/cv"
                onClick={() => setOpen(false)}
                className="block rounded-md px-2 py-2 font-mono text-sm text-muted motion-safe:transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
              >
                CV
              </Link>
            </li>
          </ul>
        </div>
      ) : null}
    </header>
  );
}
