// ─────────────────────────────────────────────────────────────────────────────
// THE TITHING EXPERIMENT — all content, config-driven.
//
// A thought experiment and interactive simulation — NOT a factual claim, legal
// demand, or real transfer of wealth. Nobody named here has agreed to, endorsed,
// or participated in anything. Net-worth figures are editable ESTIMATES.
//
// The eight below feed <SpendDatShit/>: each person's spendable budget is 90% of
// their (editable) net worth — the fictional "remaining after a 10% tithe".
// ─────────────────────────────────────────────────────────────────────────────

import { PATRON_LINKS } from "./patron";

export const TITHING_META = {
  tithePct: 0.1, // 10%
  siteUrl: "https://portfolio-nine-zeta-0rmcnv0m3r.vercel.app/tithing",
};

export const HERO = {
  eyebrow: "A thought experiment",
  title: "The Tithing Experiment",
  subtitle: "What if the world's wealthiest people tithed?",
  body: [
    "Throughout history, many faith traditions have encouraged people to give a portion of what they have for purposes beyond themselves.",
    "This project explores a simple hypothetical question: what would happen if eight of the world's wealthiest individuals each chose to give away 10% of their wealth?",
    "It's an interactive thought experiment designed to spark conversation about wealth, generosity, creativity, patronage, and what extraordinary resources could make possible.",
  ],
};

// ── The Eight ────────────────────────────────────────────────────────────────
export interface TithePerson {
  id: string;
  name: string;
  shortName: string;
  initials: string;
  netWorth: number; // editable ESTIMATE
  accent: string;
  image?: string; // optional portrait in /public; monogram shown if absent
  status: string;
  dateContacted?: string;
  response?: string;
  notes?: string;
}

export const THE_EIGHT_INTRO = {
  eyebrow: "The Eight",
  title: "Eight fortunes. One hypothetical.",
  note: "Net-worth figures are editable estimates, not cash balances. Status is an open, honest record — nobody here has agreed to participate.",
};

// Estimates are illustrative and meant to be edited over time.
export const THE_EIGHT: TithePerson[] = [
  { id: "musk", name: "Elon Musk", shortName: "Elon", initials: "EM", netWorth: 244_000_000_000, accent: "#b8ff39", status: "Invitation Pending" },
  { id: "bezos", name: "Jeff Bezos", shortName: "Bezos", initials: "JB", netWorth: 197_000_000_000, accent: "#ff7a00", status: "Invitation Pending" },
  { id: "gates", name: "Bill Gates", shortName: "Bill", initials: "BG", netWorth: 162_000_000_000, accent: "#7ec8ff", status: "Invitation Pending" },
  { id: "dalio", name: "Ray Dalio", shortName: "Ray", initials: "RD", netWorth: 15_400_000_000, accent: "#9ad0c2", status: "Invitation Pending" },
  { id: "zuckerberg", name: "Mark Zuckerberg", shortName: "Mark", initials: "MZ", netWorth: 177_000_000_000, accent: "#8ab4ff", status: "Invitation Pending" },
  { id: "page", name: "Larry Page", shortName: "Larry P.", initials: "LP", netWorth: 148_000_000_000, accent: "#ffd53d", status: "Invitation Pending" },
  { id: "ellison", name: "Larry Ellison", shortName: "Larry E.", initials: "LE", netWorth: 192_000_000_000, accent: "#ff9dcc", status: "Invitation Pending" },
  { id: "huang", name: "Jensen Huang", shortName: "Jensen", initials: "JH", netWorth: 90_000_000_000, accent: "#c59cff", status: "Invitation Pending" },
];

// ── The question (vote) ──────────────────────────────────────────────────────
export const QUESTION = {
  eyebrow: "The question",
  headline: "Should they tithe?",
  body:
    "After exploring the work on this site, do you think these individuals should voluntarily choose to give 10% of their wealth to support this body of work?",
  options: [
    { id: "yes", label: "Yes" },
    { id: "unsure", label: "I'm unsure" },
    { id: "no", label: "No" },
  ],
  thanks: "Recorded. This is a conversation starter — there are no right answers.",
};

// ── Support the idea (post-vote) ─────────────────────────────────────────────
export const POST_VOTE = {
  eyebrow: "Support the idea",
  headline: "Want to see where 90% could go?",
  body: [
    "In this fictional simulation, imagine that 10% has already been voluntarily set aside.",
    "Now explore what it might look like to spend the remaining 90%.",
  ],
  cta: "Enter Spend Dat Shit",
  pickPrompt: "Pick a fortune to spend",
};

// ── Transition into the simulation ───────────────────────────────────────────
export const TRANSITION = {
  lines: [
    "In this fictional simulation, 10% has already been voluntarily allocated.",
    "You now have the remaining 90% to spend.",
  ],
  titheLabel: "Hypothetical 10% Allocation",
  budgetLabel: "Remaining Spending Budget",
  begin: "Begin the simulation →",
  banner: "Fictional simulation — 10% has already been voluntarily allocated. You're spending the remaining 90%.",
};

// ── After the simulation ─────────────────────────────────────────────────────
export const SUMMARY = {
  spentLabel: "You spent",
  tenPctHeadline: "The 10% question",
  tenPctBody: "Would you support the real experiment?",
  buttons: {
    learnMore: { label: "Learn more", href: "/ineed" },
    support: { label: "Support the work", href: "#real-support" },
    share: { label: "Share", href: "" },
    home: { label: "Return home", href: "/" },
  },
};

// ── Social sharing ───────────────────────────────────────────────────────────
export const SHARE = {
  title: "Share your result",
  // {amount}, {person} filled at runtime
  templates: [
    "I just spent {amount} in Spend Dat Shit.",
    "I spent {person}'s remaining fortune after the 10% tithing thought experiment.",
  ],
  url: TITHING_META.siteUrl,
  hashtags: "TithingExperiment,SpendDatShit",
};

// ── Real support (clearly separate from the fictional simulation) ────────────
export interface SupportCard {
  title: string;
  desc: string;
  cta: { label: string; href: string };
}
export const REAL_SUPPORT = {
  eyebrow: "Real support",
  title: "If you'd like to support the real work",
  note: "Everything above is a fictional thought experiment. These are the real, optional ways to support the work on this site.",
  cards: [
    { title: "Amazon Wishlist", desc: "Books, equipment, and creative tools that directly support the work.", cta: { label: "View wishlist", href: PATRON_LINKS.wishlist } },
    { title: "Venmo", desc: "A simple, direct way to help.", cta: { label: "@justin-neal-5", href: "https://venmo.com/u/justin-neal-5" } },
    { title: "Cash App", desc: "Another direct option.", cta: { label: "$JustinNeal36", href: "https://cash.app/$JustinNeal36" } },
    { title: "Fund a Project", desc: "Direct your support to a specific project.", cta: { label: "Explore projects", href: "/ineed#direct-support" } },
    { title: "Garage Goals", desc: "From a reliable family car to milestone dreams.", cta: { label: "See the garage", href: "/ineed" } },
    { title: "Monthly Support", desc: "Consistent patronage creates uninterrupted time to build.", cta: { label: "Become a patron", href: "/ineed#direct-support" } },
    { title: "Independent Creator Fund", desc: "The long-horizon fund for lasting stability.", cta: { label: "Support the fund", href: "/ineed#direct-support" } },
  ] as SupportCard[],
};

export const DISCLAIMER =
  "The Tithing Experiment is an interactive thought experiment and simulation. Net-worth figures are illustrative estimates, not cash balances. No billionaire named here has agreed to participate, endorsed this project, or transferred any funds. The simulation inside Spend Dat Shit is fictional; no purchase occurs. Support options are personal gifts of support and patronage — not tax-deductible charitable donations.";
