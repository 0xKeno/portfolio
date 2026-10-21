"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  Check,
  Copy,
  FileText,
  Mail,
  Search,
} from "lucide-react";

import { GitHubIcon, LinkedInIcon } from "@/app/components/BrandIcons";
import { profile } from "@/app/lib/content";
import { EASE } from "@/app/lib/motion";

type Command = {
  id: string;
  label: string;
  hint: string;
  group: "Go to" | "Open" | "Actions";
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  run: () => void;
};

/**
 * Ctrl/Cmd+K command palette.
 *
 * Every command here has an ordinary link or button somewhere on the page —
 * this is a shortcut for people who like shortcuts, never the only route to
 * anything. Keyboard handling is explicit rather than delegated to a library:
 * ArrowUp/Down move the highlight, Enter runs it, Escape closes and returns
 * focus to wherever it came from.
 */
export default function CommandPalette() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [index, setIndex] = useState(0);
  const [copied, setCopied] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  /* Whatever had focus before the palette opened, so Escape can hand it back. */
  const restoreTo = useRef<HTMLElement | null>(null);

  const openPalette = useCallback(() => {
    restoreTo.current = document.activeElement as HTMLElement;
    setQuery("");
    setIndex(0);
    setCopied(false);
    setOpen(true);
  }, []);

  const closePalette = useCallback(() => setOpen(false), []);

  const go = useCallback(
    (hash: string) => {
      closePalette();
      /* Push the hash rather than assigning location, so the App Router keeps
         its client-side history rather than doing a full document load. */
      router.push(`/${hash}`);
    },
    [router, closePalette],
  );

  const commands = useMemo<Command[]>(() => {
    const sections: Array<[string, string]> = [
      ["evidence", "Four claims, with the proof behind each"],
      ["experience", "Six months at NNPC E&P, and my degree"],
      ["projects", "A client build, this site, Trading Desks and Stickk"],
      ["skills", "Grouped by how well I know them"],
      ["about", "How I got here, and what I'm doing now"],
      ["contact", "Email, GitHub, LinkedIn"],
    ];

    return [
      ...sections.map(([id, hint]): Command => ({
        id: `go-${id}`,
        label: id.charAt(0).toUpperCase() + id.slice(1),
        hint,
        group: "Go to",
        icon: ArrowRight,
        run: () => go(`#${id}`),
      })),
      {
        id: "open-cv",
        label: "CV",
        hint: "Full CV, printable, with downloads",
        group: "Open",
        icon: FileText,
        run: () => {
          closePalette();
          router.push("/cv");
        },
      },
      {
        id: "open-github",
        label: "GitHub",
        hint: "github.com/0xKeno",
        group: "Open",
        icon: GitHubIcon,
        run: () => {
          closePalette();
          window.open(profile.github, "_blank", "noopener,noreferrer");
        },
      },
      {
        id: "open-linkedin",
        label: "LinkedIn",
        hint: "linkedin.com/in/0xkeno",
        group: "Open",
        icon: LinkedInIcon,
        run: () => {
          closePalette();
          window.open(profile.linkedin, "_blank", "noopener,noreferrer");
        },
      },
      {
        id: "action-email",
        label: "Send an email",
        hint: profile.email,
        group: "Actions",
        icon: Mail,
        run: () => {
          closePalette();
          window.location.href = `mailto:${profile.email}`;
        },
      },
      {
        id: "action-copy",
        label: "Copy email address",
        hint: profile.email,
        group: "Actions",
        icon: copied ? Check : Copy,
        run: () => {
          navigator.clipboard
            .writeText(profile.email)
            .then(() => setCopied(true))
            .catch(() => {
              /* Clipboard unavailable; the address is shown in the hint. */
            });
        },
      },
    ];
  }, [go, router, copied, closePalette]);

  const results = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) return commands;
    return commands.filter(
      (command) =>
        command.label.toLowerCase().includes(needle) ||
        command.hint.toLowerCase().includes(needle) ||
        command.group.toLowerCase().includes(needle),
    );
  }, [commands, query]);

  /* Global shortcut. Ignored while the user is typing somewhere else, so it
     never steals a keystroke from a real input. */
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      const typing =
        target instanceof HTMLInputElement ||
        target instanceof HTMLTextAreaElement ||
        target?.isContentEditable;

      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        if (open) closePalette();
        else openPalette();
        return;
      }

      if (event.key === "/" && !open && !typing) {
        event.preventDefault();
        openPalette();
      }
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, openPalette, closePalette]);

  /* Focus only. The search field and the copy confirmation are reset in
     openPalette, not here — resetting state inside an effect would cost an
     extra render pass every time the palette opens. */
  useEffect(() => {
    if (open) {
      /* One frame, so the input exists before we reach for it. */
      const id = requestAnimationFrame(() => inputRef.current?.focus());
      return () => cancelAnimationFrame(id);
    }

    restoreTo.current?.focus();
  }, [open]);

  /* The page behind a modal should not scroll. */
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  /* Keep the highlighted row inside a scrolled list. */
  useEffect(() => {
    const option = listRef.current?.querySelector<HTMLElement>(
      `[data-index="${index}"]`,
    );
    option?.scrollIntoView({ block: "nearest" });
  }, [index]);

  const onFieldKey = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Escape") {
      event.preventDefault();
      closePalette();
      return;
    }
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setIndex((value) => (results.length ? (value + 1) % results.length : 0));
      return;
    }
    if (event.key === "ArrowUp") {
      event.preventDefault();
      setIndex((value) =>
        results.length ? (value - 1 + results.length) % results.length : 0,
      );
      return;
    }
    if (event.key === "Enter") {
      event.preventDefault();
      results[index]?.run();
    }
  };

  let lastGroup = "";

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          key="palette"
          data-print="hide"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="fixed inset-0 z-[70] flex items-start justify-center px-4 pt-[12svh]"
        >
          {/* Backdrop. A button rather than a bare div so a pointer user and a
              keyboard user both have a way to dismiss it. */}
          <button
            type="button"
            aria-label="Close command palette"
            onClick={closePalette}
            className="absolute inset-0 cursor-default bg-background/80 backdrop-blur-sm"
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Command palette"
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.22, ease: EASE }}
            className="card relative w-full max-w-lg overflow-hidden rounded-xl border border-border-strong shadow-2xl"
          >
            <div className="flex items-center gap-3 border-b border-border px-4">
              <Search aria-hidden="true" className="h-4 w-4 shrink-0 text-faint" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(event) => {
                  setQuery(event.target.value);
                  setIndex(0);
                }}
                onKeyDown={onFieldKey}
                placeholder="Jump to a section, or copy my email…"
                aria-label="Search commands"
                aria-controls="palette-list"
                aria-activedescendant={
                  results[index] ? `palette-option-${results[index].id}` : undefined
                }
                autoComplete="off"
                className="w-full bg-transparent py-4 text-sm text-foreground outline-none placeholder:text-faint"
              />
              <kbd className="hidden shrink-0 rounded border border-border bg-elevated px-1.5 py-0.5 font-mono text-[10px] text-faint sm:block">
                Esc
              </kbd>
            </div>

            <ul
              ref={listRef}
              id="palette-list"
              role="listbox"
              aria-label="Commands"
              className="max-h-[50svh] overflow-y-auto p-2"
            >
              {results.length === 0 ? (
                <li className="px-3 py-6 text-center text-sm text-faint">
                  Nothing matches that.
                </li>
              ) : (
                results.map((command, position) => {
                  const newGroup = command.group !== lastGroup;
                  lastGroup = command.group;
                  const Icon = command.icon;
                  const selected = position === index;

                  return (
                    <li key={command.id}>
                      {newGroup ? (
                        <p
                          aria-hidden="true"
                          className="px-3 pb-1 pt-3 font-mono text-[10px] uppercase tracking-[0.18em] text-faint"
                        >
                          {command.group}
                        </p>
                      ) : null}

                      <div
                        id={`palette-option-${command.id}`}
                        role="option"
                        aria-selected={selected}
                        data-index={position}
                        onMouseEnter={() => setIndex(position)}
                        onClick={() => command.run()}
                        className={`flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 ${
                          selected ? "bg-elevated" : ""
                        }`}
                      >
                        <Icon
                          aria-hidden="true"
                          className={`h-4 w-4 shrink-0 ${
                            selected ? "text-accent" : "text-faint"
                          }`}
                        />
                        <span className="min-w-0 flex-1">
                          <span className="block truncate text-sm text-foreground">
                            {command.label}
                          </span>
                          <span className="block truncate text-xs text-faint">
                            {command.id === "action-copy" && copied
                              ? "Copied to clipboard"
                              : command.hint}
                          </span>
                        </span>
                      </div>
                    </li>
                  );
                })
              )}
            </ul>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
