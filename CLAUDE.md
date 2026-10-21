# Portfolio — Okpoudhu Destiny Oghenekeno

## About the owner
- Computer Science graduate, Wellspring University, Benin City, Nigeria.
  Second Class Honours (Upper Division), CGPA 4.11/5.00, October 2026.
- Handle: 0xKeno. Email: kennyokpoudhu@gmail.com
- Current role: freelance web and app developer (Aug 2026 – present). Building
  Trading Desks, an app for new traders with an assistant bot — keep public
  detail to that one line until he says otherwise.
- Core experience: the 6-month IT Admin/Help Desk SIWES placement at
  NNPC E&P Limited (Jun–Nov 2025).
- Built two production sites: a career portfolio for Alex Okpoudhu, an
  upstream oil and gas production operations lead (client work), and this
  site. Runs Stickk (youtube.com/@stickk-b1f), a stick-figure ancient-humans
  explainer channel. No photo of him on the site: the 0xKeno logo
  (app/components/Logo.tsx, app/icon.svg) stands in for it.
- Skills are honestly early-career/foundational. NEVER imply senior experience
  or invent projects. No fabricated clients, metrics, or testimonials.

## Who this site is now for
Graduate-scheme recruiters first, developers second. It has to answer
"can this person analyse a problem, learn from feedback, work with people,
and deliver a result?" — with specific evidence, not adjectives.

## Stack
Next.js 16 (App Router) · TypeScript · Tailwind CSS v4 · Framer Motion ·
Lucide React. Deployed on Vercel, auto-deploying from `main`.

## Design direction (Apple-style redesign, Oct 2026)
- Light AND dark, following the visitor's system setting
  (`prefers-color-scheme`). No toggle. Tokens are raw CSS variables on :root,
  swapped in the dark media query, and mapped to Tailwind in `@theme inline`,
  so components never need `dark:` variants.
- System font stack (San Francisco / Segoe UI / Roboto). No web fonts.
- Apple product-page layout: centred section openings (accent eyebrow, one
  large headline, one sentence), one wide column of rounded tiles, white and
  grey bands alternating, frosted translucent nav (`.material`).
- Large type gets negative tracking and tight leading (`.display`,
  `.headline`); body copy stays near zero.
- TWO accent colours with a strict division of labour:
  - `accent` (Apple blue) — identity. Links, focus, CTAs, eyebrows.
  - `data` (green) — NUMBERS ONLY. Metrics, figures, measured results, and the
    live/"now" indicators. Never decorative.
- Honour prefers-reduced-motion, prefers-reduced-transparency and
  prefers-contrast. Must look excellent on mobile.
- Design guidance: the `apple-design` skill (gethamster/skills).

## Structure
```
app/
  layout.tsx          Nav, ScrollProgress, CommandPalette, footer
  page.tsx            Hero · Metrics · Experience · Projects · Evidence ·
                      Skills · About · Contact
  cv/page.tsx         Full CV, print-optimised, with .docx/.pdf downloads
  lib/content.ts      SINGLE SOURCE OF TRUTH for every fact on the site
  lib/motion.ts       Shared motion vocabulary, all reduced-motion aware
  components/         One component per section, plus the shared pieces
public/cv/            Okpoudhu-Destiny-CV.docx and .pdf
```

## HOW TO WORK WITH ME — IMPORTANT
- I am learning. Explain every significant decision in plain language BEFORE
  writing the code: what the file does, why this approach, what each new
  concept means.
- Use plan mode for anything structural.
- Don't dump 300 lines at once. Build one section at a time.
- When you introduce something new (a hook, a Tailwind pattern, a Framer
  Motion prop), explain it in one or two sentences.
- After each section, ask me to explain back what it does, and correct me
  if I get it wrong.

## Framework rules
Next.js generates its own agent instructions; this pulls them in.

@AGENTS.md

## Project rules
- **All content changes go in `app/lib/content.ts`**, never in a component.
  The homepage and the CV page both read from it, so editing a component
  directly silently desynchronises the two.
- Nothing goes in `content.ts` that did not actually happen. Every number must
  have a source I can point at.
- Results are out: describe me as a "Computer Science graduate" with Second
  Class Honours (Upper Division).
- VeriChain is not to appear anywhere on this site, in any form — he had
  significant help building it and will not present it as his own work.
- Atlas Capture is not to appear anywhere either. Removed at his request.
- Always write `border border-border`, never bare `border`. Tailwind v4's
  default border colour is currentColor, so bare `border` inherits text
  colour. Same trap applies to `divide-*` and `ring-*`.
- Lucide has NO brand icons — importing `Github` or `Linkedin` from
  `lucide-react` is a build error. Use `app/components/BrandIcons.tsx`.
- The React Compiler lint rules ban `setState` inside an effect body. Put the
  state change in the event handler that caused it, or derive the value.
- Every animation must collapse under `prefers-reduced-motion`. `useStagger`
  and `useWordReveal` already do; anything hand-rolled must too.
