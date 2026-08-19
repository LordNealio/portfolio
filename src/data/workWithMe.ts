// ─────────────────────────────────────────────────────────────────────────────
// "Bring me the problem" — the Work With Me / consulting page (verbatim copy).
// Distinct from Connect (partnerships, research, media, academic inquiries).
// Booking CTAs use `bookingUrl` if set, else fall back to an email with a subject.
// ─────────────────────────────────────────────────────────────────────────────
export const WORK_WITH_ME = {
  // Consulting contact — deliberately separate from the site's general email.
  contactEmail: "YoungBlesser88@gmail.com",
  contactDomain: "YoungBlesser.com",

  eyebrow: "Strategy · Systems · Research · AI · Creative Direction",
  title: "Bring me the problem.",
  intro: "I work best when the problem isn't completely defined yet.",
  supporting:
    "Some problems arrive clearly defined. Most don't. Before we talk about solutions, let's understand what we're actually looking at.",
  heroCtas: {
    primary: "Start with BizWiz",
    secondary: "Book a working session",
  },
  problems: [
    "A business that works—but shouldn't be this difficult to run.",
    "An idea you know has potential—but can't quite structure.",
    "A process with too many steps.",
    "Information that doesn't seem to fit together.",
    "Something you want to build—but don't know what it should become.",
    "Or a question nobody seems to be asking correctly.",
  ],
  bringThat: "Bring me that.",

  // ── Philosophy — free-first ─────────────────────────────────────────────
  dontHire: {
    eyebrow: "Philosophy",
    title: "You don't have to pay me to learn from me.",
    body: [
      "If you need general information, use ChatGPT.",
      "If you want ideas, frameworks, examples, or inspiration, explore my Archive. I've already made a lot of my thinking available.",
      "If you want to see your own situation more clearly, run BizWiz. It's free, and you keep the map.",
      "Don't pay me to tell you something you can find yourself.",
      "The paid relationship begins only when you want my attention applied specifically to your problem.",
      "That's different.",
    ],
  },

  // ── BizWiz — the free entry point ───────────────────────────────────────
  bizwiz: {
    eyebrow: "Free · No consultation required",
    title: "Start with BizWiz.",
    body: [
      "BizWiz is a guided diagnostic. It walks you through the same questions I'd ask before working with you, then turns the map around and asks a few sharper ones.",
      "You leave with your own Business Map — a clear picture of the problem — whether or not we ever talk.",
      "Map it. See it. Question it. Improve it.",
    ],
    note: "Your answers stay on your device. If you want a second set of eyes afterward, you can send the map along.",
    cta: "Start BizWiz",
  },

  // ── $100 — the minimum paid service ─────────────────────────────────────
  review100: {
    eyebrow: "$100 · Asynchronous review",
    title: "What am I missing?",
    lead: "You've done the thinking. You have the map. Sometimes you just need someone to look at it and tell you what you can't see from the inside.",
    steps: [
      { n: "01", h: "What I see", body: "How your situation reads to an outside systems-oriented mind." },
      { n: "02", h: "What you may be missing", body: "The assumptions, blind spots, and unasked questions worth pressure-testing." },
      { n: "03", h: "What I'd do next", body: "The move I'd make first, and why." },
    ],
    note: "This is the minimum paid service — a focused outside read, not a cheap consultation. Send your BizWiz map to make it sharper.",
    cta: "Send my map for review — $100",
  },

  howIThink: {
    title: "How I think.",
    body: [
      "Different problems require different tools.",
      "I don't sell one tool. I help determine which tool the problem actually needs.",
    ],
    aboutNote: "The full background — accounting, Kaizen, years building across disciplines — is on",
  },

  process: {
    maxim: "Before improving a system, understand the system.",
    title: "The process.",
    steps: [
      { h: "See the system.", body: ["Before fixing the problem, understand what surrounds it.", "People. Process. Money. Technology. Information. Incentives."] },
      { h: "Find the friction.", body: ["What's taking too long?", "What's being repeated?", "What's unclear?", "What's missing?", "What doesn't reconcile?"] },
      { h: "Question the assumptions.", body: ["Sometimes the biggest constraint is something everyone has simply accepted as necessary."] },
      { h: "Connect the dots.", body: ["The answer may already exist somewhere else—in another department, discipline, technology, industry, or way of thinking."] },
      { h: "Build the next move.", body: ["A strategy.", "A system.", "A prototype.", "A research plan.", "A workflow.", "An experiment.", "Or simply a much better question."] },
    ],
  },

  session: {
    minutes: "60 minutes.",
    price: "$350.",
    body: [
      "Bring one problem.",
      "We'll spend an hour pulling it apart, identifying what actually matters, and determining what I would do next.",
      "This isn't a motivational call.",
      "It's a working session.",
    ],
    cta: "Book a session",
  },

  tiers: {
    title: "Need more than an hour?",
    lead: "Some problems need to be built, not discussed.",
    items: [
      { name: "Intensive", body: "A focused half-day working session for problems requiring deeper analysis, mapping, or development.", price: "From $1,500" },
      { name: "Build", body: "Strategy through prototype. For systems, research, digital products, workflows, brands, experiences, and other defined projects.", price: "From $5,000" },
      { name: "Advisory", body: "Ongoing access for organizations or individuals who want another systems-oriented mind consistently involved in what they're building.", price: "From $5,000 / month" },
    ],
    cta: "Discuss a project",
  },

  bring: {
    title: "What can you bring me?",
    items: [
      { h: "Systems", body: "Operations, workflows, inefficiencies, processes, organizational problems." },
      { h: "AI", body: "Where AI actually belongs in your organization—and where it doesn't." },
      { h: "Ideas", body: "Turn something abstract into a structure that can be explained, tested, funded, or built." },
      { h: "Research", body: "Organize complicated information, develop frameworks, identify assumptions, and determine what needs to be investigated next." },
      { h: "Creative Direction", body: "Turn ideas into coherent brands, experiences, stories, products, and media." },
      { h: "Business", body: "Look at the numbers, operations, product, customer, and system together instead of treating them as separate problems." },
    ],
    outro: ["And if your problem doesn't fit neatly into one of those categories—", "even better."],
  },

  before: {
    title: "Before you book.",
    body: [
      "Take a look through the Archive.",
      "There are books, applications, research frameworks, investigations, music, film, designs, systems, and experiments.",
      "It's the best explanation of how I think.",
      "If you look through it and think:",
    ],
    quote: "“I wonder what he'd see in my problem.”",
    then: "Then we should probably talk.",
  },

  close: {
    lead: "Information is abundant.",
    lines: ["The value is knowing", "what to notice,", "what to question,", "and what to do next."],
    big: "Bring me the problem.",
    cta: "Book 60 minutes — $350",
    connectNote: "For partnerships, research, media, academic inquiries, and other collaborations, use Connect instead.",
  },

  // ── The whole ladder, at a glance ───────────────────────────────────────
  ladder: {
    eyebrow: "Ways to work together",
    title: "Start where it makes sense.",
    lead: "No obligation to climb. Most people get what they need in the first two rungs.",
    rungs: [
      { price: "$0", name: "Explore", body: "Read the Archive. Ideas, frameworks, and finished work — free.", to: "/work" },
      { price: "$0", name: "Map", body: "Run BizWiz. Leave with your own Business Map.", to: "/bizwiz" },
      { price: "$100", name: "Perspective", body: "Send the map. Get an outside read on what you're missing.", subject: "What am I missing? — $100 async review" },
      { price: "$350", name: "Attention", body: "60 minutes on one problem. A working session, not a call.", subject: "Book a 60-minute session — $350" },
      { price: "$1,500+", name: "Focus", body: "A half-day intensive for problems that need deeper work.", subject: "Intensive — half-day working session" },
      { price: "$5,000+", name: "Build", body: "Strategy through prototype. Advisory available monthly.", subject: "Discuss a build / advisory engagement" },
    ],
  },

  // ── BizWiz Toolkit — free resources ─────────────────────────────────────
  toolkit: {
    eyebrow: "BizWiz Toolkit · Free tools",
    title: "Use the tools. Even if you never hire me.",
    lead: "Working maps I use to think through a business. Yours to view, save, and print.",
    tools: [
      {
        code: "001",
        name: "The Problem Map",
        status: "live" as const,
        desc: "A single page for mapping a problem from every direction — what it is, what surrounds it, and where the friction really sits.",
        img: "/art/tools/problem-map.jpg",
        alt: "The Problem Map — a printable one-page diagnostic worksheet",
      },
      { code: "002", name: "The Process Map", status: "soon" as const, desc: "Trace a workflow step by step and find where time leaks out." },
      { code: "003", name: "The Money Map", status: "soon" as const, desc: "Follow the money through the system — in, out, and stuck." },
      { code: "004", name: "The AI Map", status: "soon" as const, desc: "Where AI actually belongs in your operation — and where it doesn't." },
      { code: "005", name: "The Priority Map", status: "soon" as const, desc: "Sort everything you could do by leverage, not by noise." },
    ],
  },

  contact: {
    eyebrow: "Contact",
    lines: [
      "The best first step is BizWiz or the Archive — you'll get value before we ever speak.",
      "When you're ready for my attention on your specific problem, reach out directly.",
    ],
    note: "For partnerships, research, media, and academic inquiries, use Connect instead.",
  },

  // Set a real booking link (Calendly, Stripe, etc.). Empty → email fallback.
  bookingUrl: "",
};
