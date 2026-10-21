import { useId } from "react";

type LogoProps = {
  /** Rendered width and height in pixels. */
  size?: number;
  className?: string;
  /** Empty string marks the mark decorative (e.g. beside the wordmark). */
  title?: string;
};

/**
 * The 0xKeno mark: "0xK" drawn as strokes on a blue-to-green tile.
 *
 * Drawn with paths rather than text so it looks identical everywhere — text
 * inside an SVG renders in whatever font the device has. The gradient id is
 * made unique per instance, because two logos on one page sharing an id would
 * both paint from whichever <defs> the browser found first.
 */
export default function Logo({ size = 32, className = "", title = "0xKeno" }: LogoProps) {
  const gradient = `logo-${useId().replace(/:/g, "")}`;
  const decorative = title === "";

  return (
    <svg
      viewBox="0 0 64 64"
      width={size}
      height={size}
      className={`shrink-0 ${className}`}
      role={decorative ? undefined : "img"}
      aria-hidden={decorative ? true : undefined}
      aria-label={decorative ? undefined : title}
    >
      <defs>
        <linearGradient id={gradient} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#0a84ff" />
          <stop offset="1" stopColor="#0b8a6a" />
        </linearGradient>
      </defs>
      <rect width="64" height="64" rx="15" fill={`url(#${gradient})`} />
      <g
        fill="none"
        stroke="#fff"
        strokeWidth="4.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="9" y="20" width="13" height="24" rx="6.5" />
        <path d="M26.5 30 L34.5 44 M34.5 30 L26.5 44" />
        <path d="M40 18 V46 M55 18 L42.5 32 L55 46" />
      </g>
    </svg>
  );
}
