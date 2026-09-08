"use client";

import { useEffect, useRef, useState } from "react";
import { Check, Copy } from "lucide-react";

import { profile } from "@/app/lib/content";

type CopyEmailProps = {
  className?: string;
};

/**
 * Copies the email address to the clipboard and confirms it.
 *
 * The confirmation is announced through a polite live region rather than by
 * swapping the button's label, so a screen-reader user hears that the copy
 * happened without the button renaming itself under their cursor. The timer is
 * cleared on unmount so a state update can never land on a gone component.
 */
export default function CopyEmail({ className = "" }: CopyEmailProps) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), 2000);
    } catch {
      /* Clipboard blocked (insecure context, or permission denied). The
         address is visible next to this button, so there is nothing useful
         to say — fail quietly rather than throwing an error at someone who
         can simply select it. */
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={copy}
        aria-label={`Copy email address, ${profile.email}`}
        className={`inline-flex items-center gap-2 rounded-lg border border-border px-3 py-2 font-mono text-xs text-muted transition-colors hover:border-border-strong hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${className}`}
      >
        {copied ? (
          <Check aria-hidden="true" className="h-3.5 w-3.5 text-data" />
        ) : (
          <Copy aria-hidden="true" className="h-3.5 w-3.5" />
        )}
        {copied ? "Copied" : "Copy email"}
      </button>

      <span role="status" aria-live="polite" className="sr-only">
        {copied ? "Email address copied to clipboard" : ""}
      </span>
    </>
  );
}
