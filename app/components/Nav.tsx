"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";

import Avatar from "@/app/components/Avatar";

const SECTIONS = [
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "contact", label: "Contact" },
];

/** Hero is observed so that nothing is highlighted while it is in view. */
const OBSERVED = ["hero", ...SECTIONS.map((s) => s.id)];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Reading scrollY does not force layout, unlike getBoundingClientRect, so a
  // passive listener is cheap here. React bails out when the value is unchanged.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Active section: a narrow band near the top of the viewport. Whichever
  // observed section crosses it first in document order wins.
  useEffect(() => {
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
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, []);

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

  return (
    <header
      className={`sticky top-0 z-50 border-b motion-safe:transition-colors ${
        scrolled
          ? "border-border bg-surface/80 backdrop-blur"
          : "border-transparent bg-transparent"
      }`}
    >
      <nav
        aria-label="Main"
        className="mx-auto flex h-16 w-full max-w-3xl items-center justify-between gap-4 px-6 sm:px-10"
      >
        <a
          href="#hero"
          className="wordmark font-mono text-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
        >
          0xKeno
        </a>

        <ul role="list" className="hidden items-center gap-6 md:flex">
          {SECTIONS.map((section) => (
            <li key={section.id}>
              <a
                href={`#${section.id}`}
                aria-current={active === section.id ? "true" : undefined}
                className={`font-mono text-xs ${linkClass(section.id)}`}
              >
                {section.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <Avatar size={32} className="h-8 w-8 text-[10px]" alt="" />

          <button
            ref={buttonRef}
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="nav-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="grid h-8 w-8 place-items-center rounded-md border border-border text-muted motion-safe:transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent md:hidden"
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
          className="border-t border-border bg-surface md:hidden"
        >
          <ul
            role="list"
            className="mx-auto w-full max-w-3xl space-y-1 px-6 py-3 sm:px-10"
          >
            {SECTIONS.map((section) => (
              <li key={section.id}>
                <a
                  href={`#${section.id}`}
                  onClick={() => setOpen(false)}
                  aria-current={active === section.id ? "true" : undefined}
                  className={`block rounded-md px-2 py-2 font-mono text-sm ${linkClass(
                    section.id,
                  )}`}
                >
                  {section.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </header>
  );
}
