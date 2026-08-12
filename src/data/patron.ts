// ─────────────────────────────────────────────────────────────────────────────
// THE PATRON EXPERIMENT — all content for the page lives here.
//
// Everything on the page is driven by this file. To change copy, goals, people,
// vehicles, payment handles, links, or imagery, edit the objects below — you
// should never need to touch a React component.
//
// HONESTY DEFAULTS
//  • `raised` values start at 0. Update them by hand as real support arrives.
//  • The Eight are real people shown as an open invitation. Leave `response`
//    empty unless a real reply exists — do not invent responses.
//  • Payment handles are PLACEHOLDERS. Replace them with your real handles
//    before sharing the page. Empty links render as inactive buttons.
//
// IMPORTANT (legal framing): contributions here are personal SUPPORT / PATRONAGE
// / GIFTS — not tax-deductible charitable donations. Keep the language accurate
// unless this is later routed through a qualified nonprofit structure.
// ─────────────────────────────────────────────────────────────────────────────

export interface Cta {
  label: string;
  href: string; // "/route" internal · "#anchor" in-page · "https://…" external · "" = inactive
}

export interface Money {
  amount: number;
  currency?: string; // default "$"
  unit?: string; // e.g. "/mo"
}

// ── Central links (reused across CTAs) ───────────────────────────────────────
export const PATRON_LINKS = {
  support: "#direct-support", // scrolls to the payment section
  collaborate: "/connect",
  contact: "/connect",
  wishlist: "", // ← paste your Amazon wishlist URL
};

// ── Hero ─────────────────────────────────────────────────────────────────────
export const HERO = {
  eyebrow: "The Patron Experiment",
  title: "The Patron Experiment",
  subtitle: "Modern Patronage for Independent Ideas",
  body: [
    "Throughout history, artists, inventors, scientists, educators, and writers often reached their full potential because someone believed in them before the rest of the world did.",
    "This page is my modern version of that tradition.",
    "If something on this site has challenged your thinking, taught you something, inspired you, or made you curious — this page exists for anyone who wants to help the work continue.",
  ],
};

// ── Why this exists ──────────────────────────────────────────────────────────
export const WHY_EXISTS = {
  eyebrow: "Why this exists",
  title: "A model for sustaining work that is shared freely.",
  body: [
    "For years I've spent my free time creating research, applications, educational resources, writing, and experiments that I believe can genuinely help people.",
    "Most of that work has been shared freely.",
    "Rather than placing everything behind a paywall, I want to build a model where people who believe in the work can help sustain it.",
    "Support is never expected. But it is deeply appreciated.",
  ],
};

// ── The Eight ────────────────────────────────────────────────────────────────
export interface Patron {
  name: string;
  image?: string; // optional portrait path in /public; monogram shown if absent
  status: string;
  dateContacted?: string;
  response?: string;
  notes?: string;
}

export const THE_EIGHT_INTRO = {
  eyebrow: "The Eight",
  title: "A public thought experiment.",
  body: [
    "What would happen if eight of the world's most successful people decided to materially invest in one independent creator?",
    "I only need one yes.",
    "Every invitation, every response, and every lesson is recorded here in the open.",
  ],
};

export const THE_EIGHT: Patron[] = [
  { name: "Elon Musk", status: "Invitation Pending" },
  { name: "Jeff Bezos", status: "Invitation Pending" },
  { name: "Bill Gates", status: "Invitation Pending" },
  { name: "Ray Dalio", status: "Invitation Pending" },
  { name: "Mark Zuckerberg", status: "Invitation Pending" },
  { name: "Larry Page", status: "Invitation Pending" },
  { name: "Larry Ellison", status: "Invitation Pending" },
  { name: "Jensen Huang", status: "Invitation Pending" },
];

// ── What would change everything (funds) ─────────────────────────────────────
export interface Fund {
  id: string;
  eyebrow?: string;
  title: string;
  subtitle?: string;
  goal: Money;
  raised: Money;
  description: string;
  cta: Cta;
}

export const FUNDS_INTRO = {
  eyebrow: "What would change everything?",
  title: "Different kinds of support solve different problems.",
  body: [
    "Some remove immediate obstacles.",
    "Others create the freedom to build for years instead of months.",
  ],
};

export const FUNDS: Fund[] = [
  {
    id: "creator-fund",
    eyebrow: "The long horizon",
    title: "Independent Creator Fund",
    goal: { amount: 8_000_000 },
    raised: { amount: 0 },
    description:
      "An $8 million fund would provide long-term financial stability, remove constant financial pressure, and allow me to dedicate more time to research and creation — expanding educational projects, investing in future ideas, hiring collaborators when appropriate, and building resources intended to benefit others.",
    cta: { label: "Support this fund", href: "#direct-support" },
  },
  {
    id: "monthly-patronage",
    eyebrow: "Uninterrupted time",
    title: "Monthly Patronage",
    subtitle: "$15,000 per month",
    goal: { amount: 15_000, unit: "/mo" },
    raised: { amount: 0, unit: "/mo" },
    description:
      "Consistent monthly support creates something more valuable than one-time funding. It creates uninterrupted time to think, write, research, design, build software, meet collaborators, and publish meaningful work.",
    cta: { label: "Become a patron", href: "#direct-support" },
  },
];

// ── Garage goals ─────────────────────────────────────────────────────────────
export interface VehicleSpec {
  label: string;
  value: string;
}
export interface Vehicle {
  id: string;
  badge: "NEED" | "DREAM";
  name: string;
  model?: string;
  year?: string;
  color?: string;
  image?: string;
  goal: Money;
  raised: Money;
  description: string;
  specs?: VehicleSpec[];
  details?: string[]; // expandable
  cta: Cta;
}

export const GARAGE_INTRO = {
  eyebrow: "Garage goals",
  title: "Freedom, milestones, and history.",
  body: [
    "Reliable transportation creates freedom.",
    "Dream vehicles represent milestones.",
    "Collections preserve history.",
  ],
};

export const GARAGE: Vehicle[] = [
  {
    id: "explorer",
    badge: "NEED",
    name: "2027 Ford Explorer",
    model: "Fully Loaded",
    year: "2027",
    goal: { amount: 62_000 },
    raised: { amount: 0 },
    description:
      "Reliable transportation would immediately improve my family's mobility while allowing me to attend meetings, conduct research, travel, collaborate, and continue building the projects featured throughout this website.",
    specs: [
      { label: "Type", value: "Family SUV" },
      { label: "Trim", value: "Fully loaded" },
      { label: "Priority", value: "Immediate" },
    ],
    details: [
      "The most practical goal on this page — a dependable vehicle for a family and a working creator.",
      "Every other project moves faster when the basics are handled.",
    ],
    cta: { label: "Help fund this", href: "#direct-support" },
  },
  {
    id: "lamborghini",
    badge: "DREAM",
    name: "Lamborghini",
    model: "Model TBD",
    year: "TBD",
    color: "TBD",
    goal: { amount: 250_000 },
    raised: { amount: 0 },
    description:
      "This isn't simply about owning an exotic car. It represents the possibility of turning long-term creative ambitions into tangible milestones.",
    specs: [
      { label: "Model", value: "TBD" },
      { label: "Year", value: "TBD" },
      { label: "Color", value: "TBD" },
    ],
    cta: { label: "Back this milestone", href: "#direct-support" },
  },
  {
    id: "jaguar-fpace",
    badge: "DREAM",
    name: "Jaguar F-PACE",
    model: "Trim TBD",
    year: "TBD",
    color: "TBD",
    goal: { amount: 85_000 },
    raised: { amount: 0 },
    description:
      "A vehicle I've admired for combining elegance, performance, and practicality.",
    specs: [
      { label: "Trim", value: "TBD" },
      { label: "Year", value: "TBD" },
      { label: "Color", value: "TBD" },
    ],
    cta: { label: "Back this milestone", href: "#direct-support" },
  },
];

// ── Classic car collection ───────────────────────────────────────────────────
export interface CollectionCar {
  name?: string;
  story?: string;
  price?: string;
  status: "Wishlist" | "Searching" | "Acquired";
  image?: string;
}
export const COLLECTION = {
  eyebrow: "The collection",
  title: "$100,000 Classic Car Collection",
  description:
    "A curated collection celebrating automotive history. This is a long-term passion project rather than an immediate need.",
  goal: { amount: 100_000 } as Money,
  raised: { amount: 0 } as Money,
  cta: { label: "Support the collection", href: "#direct-support" } as Cta,
  cars: [
    { status: "Wishlist" },
    { status: "Wishlist" },
    { status: "Wishlist" },
    { status: "Wishlist" },
  ] as CollectionCar[],
};

// ── Amazon wishlist ──────────────────────────────────────────────────────────
export const WISHLIST = {
  eyebrow: "Amazon wishlist",
  title: "Sometimes the most meaningful support isn't financial.",
  body: [
    "Books. Equipment. Software. Technology. Research materials. Creative tools.",
    "Every item on my wishlist directly supports the work you see throughout this portfolio.",
  ],
  cta: { label: "View wishlist", href: PATRON_LINKS.wishlist } as Cta,
};

// ── Direct support (payment methods) ─────────────────────────────────────────
export interface PayMethod {
  name: string;
  handle: string; // PLACEHOLDER — replace with your real handle
  qr?: string; // optional QR image path in /public
  href?: string; // optional deep link
  note?: string;
}
export const DIRECT_SUPPORT = {
  eyebrow: "Direct support",
  title: "A simple, direct way to help.",
  methods: [
    { name: "Venmo", handle: "@justin-neal-5", href: "https://venmo.com/u/justin-neal-5" },
    { name: "Cash App", handle: "$JustinNeal36", href: "https://cash.app/$JustinNeal36" },
  ] as PayMethod[],
  disclaimer:
    "Contributions are personal gifts of support and patronage — not tax-deductible charitable donations.",
};

// ── Fund a specific project ──────────────────────────────────────────────────
export interface ProjectFund {
  name: string;
  description: string;
  image?: string;
  goal: Money;
  raised: Money;
  cta: Cta;
}
export const PROJECT_FUNDS_INTRO = {
  eyebrow: "Fund a specific project",
  title: "Direct your support to the work that moved you.",
};
export const PROJECT_FUNDS: ProjectFund[] = [
  {
    name: "MindWrite",
    description: "The published 90-day meditation journal and the nonprofit initiative that started it all.",
    goal: { amount: 25_000 },
    raised: { amount: 0 },
    cta: { label: "Support MindWrite", href: "#direct-support" },
  },
  {
    name: "LegacyBridge",
    description: "AI-guided family legacy and oral-history preservation — keeping stories before they're lost.",
    goal: { amount: 40_000 },
    raised: { amount: 0 },
    cta: { label: "Support LegacyBridge", href: "#direct-support" },
  },
  {
    name: "BirthWrite",
    description: "Reflective writing for one of life's most transformative passages.",
    goal: { amount: 20_000 },
    raised: { amount: 0 },
    cta: { label: "Support BirthWrite", href: "#direct-support" },
  },
  {
    name: "Research",
    description: "Original studies on language, identity, perception, and repair — documented in the open.",
    goal: { amount: 30_000 },
    raised: { amount: 0 },
    cta: { label: "Fund research", href: "#direct-support" },
  },
  {
    name: "Educational Content",
    description: "Carousels, modules, and public media that make complex questions approachable.",
    goal: { amount: 18_000 },
    raised: { amount: 0 },
    cta: { label: "Fund education", href: "#direct-support" },
  },
  {
    name: "AI Applications",
    description: "Local-first, human-centered tools for reflection, learning, and creation.",
    goal: { amount: 50_000 },
    raised: { amount: 0 },
    cta: { label: "Fund the apps", href: "#direct-support" },
  },
  {
    name: "Website Development",
    description: "The infrastructure that hosts and connects the entire body of work.",
    goal: { amount: 15_000 },
    raised: { amount: 0 },
    cta: { label: "Support the platform", href: "#direct-support" },
  },
  {
    name: "Future Books",
    description: "The next volumes — writing that deserves the time to be done well.",
    goal: { amount: 22_000 },
    raised: { amount: 0 },
    cta: { label: "Back the books", href: "#direct-support" },
  },
  {
    name: "Documentaries",
    description: "Turning testimony, research, and story into film.",
    goal: { amount: 75_000 },
    raised: { amount: 0 },
    cta: { label: "Support the films", href: "#direct-support" },
  },
];

// ── Support comes in many forms (non-financial) ──────────────────────────────
export interface SupportForm {
  label: string;
  desc?: string;
  cta: Cta;
}
export const NON_FINANCIAL_INTRO = {
  eyebrow: "Support comes in many forms",
  title: "Financial support is only one way to contribute.",
};
export const NON_FINANCIAL: SupportForm[] = [
  { label: "Introduce me to someone", cta: { label: "Make an intro", href: "/connect" } },
  { label: "Collaborate", cta: { label: "Propose it", href: "/connect" } },
  { label: "Offer expertise", cta: { label: "Offer expertise", href: "/connect" } },
  { label: "Provide equipment", cta: { label: "Get in touch", href: "/connect" } },
  { label: "Provide office space", cta: { label: "Get in touch", href: "/connect" } },
  { label: "Provide studio space", cta: { label: "Get in touch", href: "/connect" } },
  { label: "Media opportunities", cta: { label: "Reach out", href: "/connect" } },
  { label: "Speaking invitations", cta: { label: "Invite me", href: "/connect" } },
  { label: "Partnerships", cta: { label: "Partner up", href: "/connect" } },
  { label: "Mentorship", cta: { label: "Connect", href: "/connect" } },
  { label: "Professional advice", cta: { label: "Advise", href: "/connect" } },
];

// ── The big wishes ───────────────────────────────────────────────────────────
export interface Wish {
  label: string;
  desc?: string;
}
export const BIG_WISHES_INTRO = {
  eyebrow: "The big wishes",
  title: "Where I hope this journey eventually leads.",
  body: ["Some goals solve today's problems.", "Others represent where I hope this journey eventually leads."],
};
export const BIG_WISHES: Wish[] = [
  { label: "Research Funding" },
  { label: "Creative Studio" },
  { label: "Podcast Studio" },
  { label: "Film Production" },
  { label: "Book Publishing" },
  { label: "Speaking Tour" },
  { label: "Creative Residency" },
  { label: "Travel" },
  { label: "Long-Term Patronage" },
  { label: "Future Team" },
];

// ── How support is used ──────────────────────────────────────────────────────
export interface UsedCategory {
  label: string;
  icon: string; // emoji glyph (kept simple + dependency-free)
}
export const HOW_USED_INTRO = {
  eyebrow: "How support is used",
  title: "Transparency, in plain terms.",
  note: "A simple picture of where support goes — this is transparency, not a legally restricted use of funds.",
};
export const HOW_USED: UsedCategory[] = [
  { label: "Research", icon: "🔬" },
  { label: "Books", icon: "📚" },
  { label: "Equipment", icon: "🎛️" },
  { label: "Technology", icon: "💻" },
  { label: "Travel", icon: "✈️" },
  { label: "Publishing", icon: "🖋️" },
  { label: "Education", icon: "🎓" },
  { label: "Creative Production", icon: "🎬" },
  { label: "Hosting", icon: "☁️" },
  { label: "Software", icon: "⌘" },
  { label: "Family Stability", icon: "🏠" },
  { label: "New Projects", icon: "✦" },
];

// ── Why I'm asking ───────────────────────────────────────────────────────────
export const WHY_ASKING = {
  eyebrow: "Why I'm asking",
  title: "Built on transparency, not entitlement.",
  body: [
    "I believe many meaningful ideas never reach their full potential because their creators spend too much of their time surviving instead of creating.",
    "This page isn't built on entitlement. It's built on transparency.",
    "Rather than pretending I have everything figured out, I'm simply sharing what would genuinely accelerate the work — and inviting others to participate if they choose.",
  ],
};

// ── Final CTA ────────────────────────────────────────────────────────────────
export const FINAL_CTA = {
  headline: "You don't have to be one of the Eight.",
  body: [
    "Whether you're a student, an entrepreneur, an engineer, an artist, a philanthropist, a business owner — or simply someone who believes in the work —",
    "there is a place for you here.",
  ],
  buttons: [
    { label: "Support", href: "#direct-support" },
    { label: "Wishlist", href: PATRON_LINKS.wishlist },
    { label: "Collaborate", href: "/connect" },
    { label: "Contact", href: "/connect" },
  ] as Cta[],
};
