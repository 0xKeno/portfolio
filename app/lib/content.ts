/**
 * Single source of truth for everything factual on this site.
 *
 * The homepage sections and the /cv page both read from here, so the two can
 * never drift apart. If a fact changes, it changes in exactly one place.
 *
 * Two rules for this file:
 *   1. Nothing goes in it that did not actually happen.
 *   2. Every number has a source that can be pointed at.
 */

export const profile = {
  name: "Okpoudhu Destiny Oghenekeno",
  handle: "0xKeno",
  /* Never "graduate" until results are released. */
  title: "Computer Science graduand",
  strapline: "IT operations, digital and data",
  location: "Benin City, Edo State, Nigeria",
  timezone: "UTC+1",
  email: "kennyokpoudhu@gmail.com",
  phone: "+234 707 189 0448",
  github: "https://github.com/0xKeno",
  linkedin: "https://linkedin.com/in/0xkeno",
  site: "https://0xkeno.vercel.app",
  availability: "Open to graduate programmes and remote work",
} as const;

export const summary =
  "Six months of enterprise IT operations inside Nigeria's national oil and gas exploration company, and two production websites built and shipped — one of them for a Niger Delta upstream production operations lead. I work inside written procedure rather than around it, and decide from measurement rather than preference.";

/* -------------------------------------------------------------------------
   Metrics
   ---------------------------------------------------------------------- */

export type Metric = {
  value: number;
  suffix?: string;
  prefix?: string;
  /** Decimal places to animate and display. */
  decimals?: number;
  label: string;
  note: string;
};

export const metrics: Metric[] = [
  {
    value: 6,
    label: "months in enterprise IT",
    note: "Full SIWES placement, NNPC E&P Limited",
  },
  {
    value: 2,
    label: "sites live in production",
    note: "One of them built for a client, in oil and gas",
  },
  {
    value: 91,
    label: "referring videos analysed",
    note: "One traffic export, turned into a production decision",
  },
  {
    value: 46.2,
    suffix: "%",
    decimals: 1,
    label: "retention, up from 27.7%",
    note: "Second video, after acting on the first one's curve",
  },
];

/* -------------------------------------------------------------------------
   Evidence — the competencies graduate schemes assess, each with the
   specific thing that demonstrates it.
   ---------------------------------------------------------------------- */

export type Evidence = {
  id: string;
  trait: string;
  claim: string;
  situation: string;
  action: string;
  result: string;
  /** One self-contained sentence for the CV, where there is no room for the
      situation and action around it. */
  cvLine: string;
};

export const evidence: Evidence[] = [
  {
    id: "analysis",
    trait: "Analytical thinking",
    claim: "I separate the signal from the volume before deciding.",
    situation:
      "A video's first day produced 2,884 impressions and 97 referred views spread across 91 different source videos. Eighty-two of those sources sent exactly one view, so at a glance the data looked like noise with no pattern in it.",
    action:
      "Rather than reading the totals, I grouped the referrals by what kind of video they came from and measured watch time per group instead of view count per group.",
    result:
      "The 35% of views arriving from mechanism and how-things-work explainers produced 79% of the total watch time; the 32% arriving from listicle and rage-bait sources produced under 4%. The next production was chosen from that split rather than from preference.",
    cvLine:
      "Turned a raw traffic export of 91 referring videos into a production decision by separating the referrals that produced watch time from the ones that produced bounces.",
  },
  {
    id: "results",
    trait: "Delivering results",
    claim: "I act on the analysis, and the number moves.",
    situation:
      "The first video on the channel held 27.7% average percentage viewed and 2:23 average view duration — respectable for a first upload, and not enough.",
    action:
      "I mapped the absolute retention curve against comparable videos, found where it went negative relative to them, and rebuilt the pacing and structure of the next production around that point.",
    result:
      "Video two came in at 46.2% average percentage viewed and 3:33 average view duration, and the two videos began feeding each other's traffic.",
    cvLine:
      "Raised average percentage viewed from 27.7% to 46.2% and average view duration from 2:23 to 3:33 between two consecutive productions.",
  },
  {
    id: "adaptability",
    trait: "Adaptability",
    claim: "I change the approach when the evidence says the approach is wrong.",
    situation:
      "I started this site in plain HTML and CSS because it was the simplest thing that could work. Partway in, the hand-written state and duplicated markup were costing more than they saved.",
    action:
      "I stopped and moved the build to Next.js and TypeScript rather than finishing something I would have to redo. Later, when the site's audience changed from developers to graduate recruiters, I redesigned it a second time and restructured the content around evidence rather than around a skills list.",
    result:
      "Two deliberate rewrites, each because the goal had moved rather than because the code had broken — and a site whose every decision I can still account for.",
    cvLine:
      "Changed stack mid-build once the simpler route stopped serving the goal, then rebuilt the site again when its audience changed.",
  },
  {
    id: "relationships",
    trait: "Working with people",
    claim: "The work only counts if it serves the person it is for.",
    situation:
      "Six months on an enterprise IT help desk supporting staff who needed their work to keep moving — and then a portfolio site built for someone else, an upstream production operations lead whose career, certifications and photographs were the entire content.",
    action:
      "On the help desk I learned to explain a fix in the language of the person in front of me, and to ask why a control existed before suggesting anything be done differently. On the site I worked from another person's record rather than my own taste, and made design decisions that served how he wanted to be read.",
    result:
      "Fixes that stuck, a placement completed inside a regulated operating environment, and a live site its subject uses. Neither was about what I would have preferred to build.",
    cvLine:
      "Six months supporting non-technical staff inside an established access and change procedure, and a production site delivered to another person's brief.",
  },
];

/* -------------------------------------------------------------------------
   Work
   ---------------------------------------------------------------------- */

export type Role = {
  title: string;
  company: string;
  context: string;
  start: { label: string; iso: string };
  end: { label: string; iso: string } | null;
  summary: string;
  points: string[];
};

export const roles: Role[] = [
  {
    title: "IT Administration / Help Desk Intern (SIWES)",
    company: "NNPC Exploration & Production Limited",
    context: "Benin City",
    start: { label: "Jun 2025", iso: "2025-06" },
    end: { label: "Nov 2025", iso: "2025-11" },
    summary:
      "The full six-month mandatory industrial placement, in the IT administration function of Nigeria's national oil and gas exploration and production company. Certificate ref. NEPL/HCM/6157.",
    points: [
      "Resolved first-line hardware, software, printing and network faults for office staff, escalating where a fix sat outside my remit.",
      "Prepared, configured and deployed staff workstations, and administered user accounts against the company's documented access procedure.",
      "Worked inside an established enterprise change and access procedure in a regulated operating environment, confirming why a control existed before proposing any change to it.",
      "Explained fixes to non-technical colleagues in their own terms — the part of the job that decided whether a fix actually held.",
    ],
  },
];

/* -------------------------------------------------------------------------
   Projects — written as short case studies rather than as cards, because
   the two audiences want different depths of the same story. The summary
   answers "did he deliver something real"; the decisions answer "does he
   know why he did it that way".
   ---------------------------------------------------------------------- */

export type Project = {
  id: string;
  name: string;
  tagline: string;
  /** Short label: who it was for. */
  role: string;
  year: string;
  summary: string;
  brief: string;
  decisions: string[];
  outcome: string;
  stack: string[];
  href?: string;
  repo?: string;
};

export const projects: Project[] = [
  {
    id: "alex",
    name: "Production Operations Portfolio",
    tagline: "A career site for an upstream oil and gas operations lead",
    role: "Built for a client",
    year: "2026",
    summary:
      "A live portfolio site for a Niger Delta production operations team lead whose career runs from 1991 — his career record, his certifications, his field photography. The first thing I have built where none of the content was mine and none of the decisions were about what I would have preferred.",
    brief:
      "Present a thirty-year upstream operations career to the people who hire for those roles: a career timeline, scanned certifications, field photography and contact details. It had to look credible to an industry that does not reward decoration, and it had to keep working without maintenance.",
    decisions: [
      "No framework and no build step. Three files plus images — semantic HTML, CSS custom properties and about fifteen lines of vanilla JavaScript for scroll reveals — so it deploys unchanged in ten years instead of rotting behind a dependency tree.",
      "The palette is taken from the subject rather than from a template: process-vessel teal, safety amber and petroleum navy on warm ivory. A grotesque for headings, a serif for body, a monospace for figures, so the statistics band reads like a control-room panel.",
      "Every colour is painted explicitly rather than inherited, so the page holds its own ground in any embedding context.",
      "Accessibility decided at the start: all text pairs clear WCAG AA and most clear AAA, focus states are visible, prefers-reduced-motion is honoured, every image carries descriptive alt text, and there is no horizontal overflow down to 390px.",
    ],
    outcome:
      "Live on Vercel, static, redeploying on every push. Content and photographs published with his permission.",
    stack: ["Semantic HTML", "CSS custom properties", "Vanilla JS", "Vercel"],
    href: "https://alex-okpoudhu-portfolio.vercel.app",
    repo: "https://github.com/0xKeno/alex-okpoudhu-portfolio",
  },
  {
    id: "portfolio",
    name: "This site",
    tagline: "Built, rebuilt, and rebuilt again in public",
    role: "Personal",
    year: "2026",
    summary:
      "My own portfolio, on its third structure. Each rewrite happened because the goal moved rather than because the code broke, and I can account for every decision still in it.",
    brief:
      "Answer, for a graduate-scheme recruiter and a developer at the same time, whether I can analyse a problem, learn from feedback, work with people and deliver a result — with specific evidence rather than adjectives.",
    decisions: [
      "Started in plain HTML and CSS, then moved to Next.js and TypeScript partway through, when hand-written state and duplicated markup began costing more than they saved. Stopping to change stack was cheaper than finishing something I would have to redo.",
      "Every fact on the site lives in one content module that both the homepage and the CV page read from, so the two can physically never disagree with each other.",
      "Two accent colours with a strict division of labour: violet is identity, teal is numbers only. The moment the number colour decorates anything, it stops meaning “this is a real measurement”.",
      "Every animation collapses under prefers-reduced-motion, the command palette only duplicates routes that already exist as ordinary links, and each disclosure is a real button inside a heading rather than a div with a click handler.",
    ],
    outcome:
      "Deployed on Vercel with automatic deployment from the main branch. Source public.",
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "Vercel"],
    href: "https://0xkeno.vercel.app",
    repo: "https://github.com/0xKeno/portfolio",
  },
  {
    id: "objectfiles",
    name: "The Object Files",
    tagline: "A channel run on its own numbers",
    role: "Independent",
    year: "2025 – present",
    summary:
      "A faceless explainer channel about ordinary objects and the part of them nobody can explain. Everything after the idea is a measurement problem, and that is the part I do: which thumbnail earns the click, where the retention curve breaks, which referring videos produce watch time instead of bounces.",
    brief:
      "Grow a channel from nothing without guessing — decide each production from the last one's data rather than from what I felt like making.",
    decisions: [
      "Read the traffic-source export by watch time per referral group rather than by view count, because 82 of the 91 referring videos sent exactly one view and the totals said nothing.",
      "Mapped absolute retention against comparable videos to find where the curve went negative relative to them, and rebuilt the next production's pacing around that point.",
      "Judged a Studio-flagged retention “spike” against a sample of eighteen measured viewers and treated it as noise rather than acting on it.",
    ],
    outcome:
      "Average percentage viewed rose from 27.7% to 46.2%, and average view duration from 2:23 to 3:33, between two consecutive productions.",
    stack: ["YouTube Analytics", "Retention analysis", "Traffic-source data"],
  },
];

/* -------------------------------------------------------------------------
   Skills
   ---------------------------------------------------------------------- */

export type SkillGroup = {
  label: string;
  note: string;
  current?: boolean;
  items: string[];
};

export const skillGroups: SkillGroup[] = [
  {
    label: "Working with",
    note: "Built and shipped something with these",
    items: [
      "TypeScript",
      "JavaScript",
      "React",
      "Next.js",
      "Node.js",
      "Tailwind CSS",
      "HTML",
      "CSS",
      "Git",
      "Vercel",
    ],
  },
  {
    label: "Accessibility",
    note: "Decided at the start of both builds, not retrofitted",
    items: [
      "WCAG AA/AAA contrast",
      "Semantic HTML",
      "Keyboard navigation",
      "prefers-reduced-motion",
      "Descriptive alt text",
    ],
  },
  {
    label: "IT operations",
    note: "Six months of doing it daily",
    items: [
      "Windows workstation deployment",
      "User account administration",
      "First-line support",
      "Enterprise change procedure",
    ],
  },
  {
    label: "Foundational",
    note: "Coursework and self-study, not yet production",
    items: [
      "Python",
      "SQL",
      "MongoDB",
      "REST APIs",
      "Data structures & algorithms",
    ],
  },
  {
    label: "Learning now",
    note: "Honest about where I am with these",
    current: true,
    items: ["Python (CS50P)", "Data analysis", "Open source contribution"],
  },
];

/* -------------------------------------------------------------------------
   Education and status
   ---------------------------------------------------------------------- */

export const education = {
  degree: "B.Sc. Computer Science",
  institution: "Wellspring University, Benin City",
  period: "Sep 2022 – Oct 2026 (expected)",
  notes: [
    "Final examinations completed; results pending. On track for Second Class Upper (2:1) or above.",
    "Relevant modules: Artificial Intelligence & Machine Learning, Data Structures & Algorithms, Database Systems, Software Engineering, Computer Networks, Statistics.",
  ],
  nysc: "Not yet served. Expected call-up late 2026 / early 2027.",
} as const;

/* What I am actually doing right now — kept short and kept current. */
export const now: string[] = [
  "Producing and publishing on The Object Files, and reading each video's numbers before deciding the next one.",
  "Working through CS50P, moving Python from coursework into something I have built with.",
  "Waiting on final results, and preparing for NYSC.",
];
