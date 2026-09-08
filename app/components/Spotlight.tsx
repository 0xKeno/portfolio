"use client";

import { useEffect, useState } from "react";

/**
 * A soft glow that follows the cursor.
 *
 * Mounted only when the device has a fine pointer AND the user has not asked
 * for reduced motion — on touch there is no cursor to follow, and a light that
 * chases the pointer is exactly the kind of ambient movement the reduced-motion
 * setting exists to switch off.
 *
 * Position is written to a CSS custom property rather than to React state, so
 * pointer movement never triggers a re-render. requestAnimationFrame coalesces
 * the writes to one per frame.
 */
export default function Spotlight() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)");
    const still = window.matchMedia("(prefers-reduced-motion: reduce)");

    const evaluate = () => setEnabled(fine.matches && !still.matches);
    evaluate();

    fine.addEventListener("change", evaluate);
    still.addEventListener("change", evaluate);
    return () => {
      fine.removeEventListener("change", evaluate);
      still.removeEventListener("change", evaluate);
    };
  }, []);

  useEffect(() => {
    if (!enabled) return;

    let frame = 0;
    let x = 0;
    let y = 0;

    const write = () => {
      frame = 0;
      document.documentElement.style.setProperty("--pointer-x", `${x}px`);
      document.documentElement.style.setProperty("--pointer-y", `${y}px`);
    };

    const onMove = (event: PointerEvent) => {
      x = event.clientX;
      y = event.clientY;
      if (!frame) frame = requestAnimationFrame(write);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div
      aria-hidden="true"
      className="spotlight pointer-events-none fixed inset-0 -z-10"
    />
  );
}
