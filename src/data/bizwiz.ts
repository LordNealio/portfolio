// ─────────────────────────────────────────────────────────────────────────────
// BIZWIZ — a guided business diagnostic. Front-end only (localStorage); no
// backend. Questions are data, so steps/tools can be added later without
// touching the wizard engine.
//
// PRINCIPLE: BizWiz helps you understand the problem before solving it. It is
// NOT a lead form. The user gets value (their own Business Map) before any money
// changes hands. Automated notes are labelled "possible questions", never
// presented as a definitive diagnosis.
// ─────────────────────────────────────────────────────────────────────────────

export type BizField =
  | { kind: "choice"; id: string; label?: string; options: string[] }
  | { kind: "multiselect"; id: string; label?: string; options: string[] }
  | { kind: "select"; id: string; label?: string; fromMultiselect?: string; options?: string[] }
  | { kind: "text"; id: string; label?: string; placeholder?: string; multiline?: boolean };

export interface BizStep {
  id: string;
  n: string; // "01"
  phase: "intake" | "reverse";
  interstitial?: boolean; // a transition screen (no inputs)
  title: string;
  prompt?: string;
  note?: string;
  optional?: boolean; // step can be continued without answering
  fields?: BizField[];
}

export const BIZWIZ = {
  eyebrow: "BizWiz · a guided business diagnostic",
  title: "Your business has a story.\nLet's map it.",
  intro:
    "BizWiz walks you through the same questions I'd want answered before working with you — so you leave with a clear map of the problem, whether or not we ever talk.",
  freeNote: "Free to use. No consultation required. Your answers stay on your device.",
  reverseIntro: {
    title: "Now let's turn the map around.",
    prompt:
      "Sometimes the way into a problem is to look at the system from another direction. A few sharper questions — answer only the ones that spark something.",
  },
};

export const STEPS: BizStep[] = [
  {
    id: "subject",
    n: "01",
    phase: "intake",
    title: "What are we looking at?",
    prompt: "Choose one.",
    fields: [{ kind: "choice", id: "subject", options: ["Business", "Organization", "Project", "Idea", "Personal Brand", "Something Else"] }],
  },
  {
    id: "what",
    n: "02",
    phase: "intake",
    title: "What does it do?",
    prompt: "Explain it like you're talking to a potential customer.",
    fields: [{ kind: "text", id: "what", multiline: true, placeholder: "In a sentence or two…" }],
  },
  {
    id: "now",
    n: "03",
    phase: "intake",
    title: "Where are you now?",
    prompt: "Share what's useful. Every field but the first is optional.",
    fields: [
      { kind: "choice", id: "stage", label: "Stage", options: ["Idea", "Pre-launch", "Operating", "Growing", "Established"] },
      { kind: "text", id: "revenue", label: "Approximate revenue range (optional)", placeholder: "e.g. $0 · <$100k · $100k–1M · $1M+" },
      { kind: "text", id: "customers", label: "Customers / users (optional)", placeholder: "roughly how many, and who" },
      { kind: "text", id: "team", label: "Team size (optional)", placeholder: "just me · 2–5 · 6–20 · 20+" },
      { kind: "text", id: "systems", label: "Existing systems / tools (optional)", placeholder: "what you run it on" },
      { kind: "text", id: "website", label: "Website (optional)", placeholder: "yoursite.com" },
    ],
  },
  {
    id: "goal",
    n: "04",
    phase: "intake",
    title: "Where are you trying to go?",
    prompt: "What would need to be different 90 days from now for you to consider this meaningful progress?",
    fields: [{ kind: "text", id: "goal", multiline: true, placeholder: "In 90 days, success looks like…" }],
  },
  {
    id: "friction",
    n: "05",
    phase: "intake",
    title: "Where is the friction?",
    prompt: "Select all that apply, then mark the one that feels most important right now.",
    fields: [
      { kind: "multiselect", id: "friction", options: ["People", "Process", "Money", "Technology", "Marketing", "Information", "Time", "Strategy", "Sales", "Operations", "Don't Know", "Other"] },
      { kind: "select", id: "frictionTop", label: "Most important right now", fromMultiselect: "friction" },
    ],
  },
  {
    id: "tried",
    n: "06",
    phase: "intake",
    title: "What have you tried?",
    fields: [
      { kind: "text", id: "tried", label: "What have you already done about this?", multiline: true },
      { kind: "text", id: "triedResult", label: "What happened?", multiline: true },
    ],
  },
  {
    id: "belief",
    n: "07",
    phase: "intake",
    title: "What do you think the problem is?",
    prompt: "What you believe the problem is — we'll treat this as a hypothesis to test, not a settled diagnosis.",
    fields: [{ kind: "text", id: "belief", multiline: true }],
  },
  {
    id: "unsure",
    n: "08",
    phase: "intake",
    title: "What are you not sure about?",
    prompt: "Where are the biggest unknowns?",
    fields: [{ kind: "text", id: "unsure", multiline: true }],
  },

  // ── Turn the map around ──────────────────────────────────────────────────
  { id: "reverse-intro", n: "→", phase: "reverse", interstitial: true, title: BIZWIZ.reverseIntro.title, prompt: BIZWIZ.reverseIntro.prompt },
  {
    id: "r-assumption",
    n: "09",
    phase: "reverse",
    optional: true,
    title: "What would have to be true for your current assumption to be wrong?",
    fields: [{ kind: "text", id: "rAssumption", multiline: true, placeholder: "Optional" }],
  },
  {
    id: "r-dependency",
    n: "10",
    phase: "reverse",
    optional: true,
    title: "What part of this depends too heavily on you?",
    fields: [{ kind: "text", id: "rDependency", multiline: true, placeholder: "Optional" }],
  },
  {
    id: "r-repeat",
    n: "11",
    phase: "reverse",
    optional: true,
    title: "What are you doing repeatedly that probably shouldn't require a human?",
    fields: [{ kind: "text", id: "rRepeat", multiline: true, placeholder: "Optional" }],
  },
  {
    id: "r-loss",
    n: "12",
    phase: "reverse",
    optional: true,
    title: "Where are you losing the most time — and the most money?",
    fields: [
      { kind: "text", id: "rTime", label: "Most time", placeholder: "Optional" },
      { kind: "text", id: "rMoney", label: "Most money", placeholder: "Optional" },
    ],
  },
  {
    id: "r-onething",
    n: "13",
    phase: "reverse",
    optional: true,
    title: "If you could fix only ONE thing in the next 30 days, what would create the largest downstream effect?",
    fields: [{ kind: "text", id: "rOneThing", multiline: true, placeholder: "Optional" }],
  },
];
