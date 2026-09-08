"use client";

import { Printer } from "lucide-react";

/**
 * Prints the page. The /cv route carries its own @media print rules, so what
 * comes out is a clean black-on-white document rather than a screenshot of a
 * dark website.
 */
export default function PrintButton() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2.5 text-sm text-muted transition-colors hover:border-border-strong hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
    >
      <Printer aria-hidden="true" className="h-4 w-4" />
      Print
    </button>
  );
}
