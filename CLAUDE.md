# Portfolio — Okpoudhu Destiny Oghenekeno

## About the owner
- Final-year Computer Science student, Wellspring University, Benin City, Nigeria.
  Finals written, results pending, graduating October 2026.
- Handle: 0xKeno. Email: kennyokpoudhu@gmail.com
- HEADLINE EXPERIENCE: the 6-month IT Admin/Help Desk SIWES placement at
  NNPC E&P Limited (Jun–Nov 2025). This leads everything.
- Built two production sites: a career portfolio for Alex Okpoudhu, an
  upstream oil and gas production operations lead (client work), and this
  site. Runs The Object Files on YouTube, framed here as analytics work.
- Skills are honestly early-career/foundational. NEVER imply senior experience
  or invent projects. No fabricated clients, metrics, or testimonials.

## Who this site is now for
Graduate-scheme recruiters first, developers second. It has to answer
"can this person analyse a problem, learn from feedback, work with people,
and deliver a result?" — with specific evidence, not adjectives.

## Stack
Next.js 16 (App Router) · TypeScript · Tailwind CSS v4 · Framer Motion ·
Lucide React. Deployed on Vercel, auto-deploying from `main`.

## Design direction
- Dark only. No light mode, no theme toggle.
- Editorial-technical: a sticky section header in a left column, content in a
  wide right column, oversized display type, monospace for labels and metadata.
- TWO accent colours with a strict division of labour:
  - `accent` (#A78BFA violet) — identity. Links, focus, active nav, wordmark.
  - `data` (#5EEAD4 teal) — NUMBERS ONLY. Metrics, figures, measured results,
    and the live/"now" indicators. Never decorative. The moment it decorates,
    it stops meaning "this is a real measurement".
- Generous whitespace. Restraint over decoration.
- Must look excellent on mobile.

## Structure
```
app/
  layout.tsx          Nav, ScrollProgress, Spotlight, CommandPalette, footer
  page.tsx            Hero · Metrics · Evidence · Experience · Projects ·
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
- Never describe me as a "graduate" until results are released. Use
  "final-year Computer Science student" or "graduand".
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
