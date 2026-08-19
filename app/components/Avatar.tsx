"use client";

import { useState } from "react";
import Image from "next/image";

type AvatarProps = {
  /** Intrinsic pixel size handed to next/image for srcset generation. */
  size: number;
  /** Sizing/typography classes — applied to both the image and the fallback. */
  className?: string;
  /** Empty string marks the avatar decorative (e.g. beside a wordmark). */
  alt?: string;
};

/**
 * Circular avatar backed by /avatar.jpg, falling back to initials if the file
 * is missing or fails to load. Keeps the section rendering correctly before the
 * image exists, and degrades gracefully if it ever disappears.
 */
export default function Avatar({
  size,
  className = "",
  alt = "Okpoudhu Destiny Oghenekeno",
}: AvatarProps) {
  const [failed, setFailed] = useState(false);
  const decorative = alt === "";

  if (failed) {
    return (
      <div
        aria-hidden={decorative ? true : undefined}
        role={decorative ? undefined : "img"}
        aria-label={decorative ? undefined : alt}
        className={`grid shrink-0 place-items-center rounded-full border border-border bg-surface font-mono text-muted ${className}`}
      >
        OD
      </div>
    );
  }

  return (
    <Image
      src="/avatar.jpg"
      alt={alt}
      width={size}
      height={size}
      onError={() => setFailed(true)}
      className={`shrink-0 rounded-full border border-border object-cover ${className}`}
    />
  );
}
