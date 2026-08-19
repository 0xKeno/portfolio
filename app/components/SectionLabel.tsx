type SectionLabelProps = {
  number: string;
  label: string;
};

/**
 * Decorative section eyebrow, e.g. "01 / ABOUT".
 *
 * Marked aria-hidden and kept OUTSIDE the <h2>: the label duplicates the
 * heading text that follows it, so announcing it would read the section name
 * twice, and nesting it inside the heading would fold "01 slash about" into
 * the heading's accessible name and into screen-reader heading menus.
 * The ordering it conveys is already carried by document order.
 */
export default function SectionLabel({ number, label }: SectionLabelProps) {
  return (
    <p
      aria-hidden="true"
      className="font-mono text-xs uppercase tracking-widest text-muted"
    >
      {number} / {label}
    </p>
  );
}
