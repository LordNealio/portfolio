// ─────────────────────────────────────────────────────────────────────────────
// "Bring me the problem" — the Work With Me / consulting page (verbatim copy).
// Distinct from Connect (partnerships, research, media, academic inquiries).
// Booking CTAs use `bookingUrl` if set, else fall back to an email with a subject.
// ─────────────────────────────────────────────────────────────────────────────
export const WORK_WITH_ME = {
  eyebrow: "Strategy · Systems · Research · AI · Creative Direction",
  title: "Bring me the problem.",
  intro: "I work best when the problem isn't completely defined yet.",
  problems: [
    "A business that works—but shouldn't be this difficult to run.",
    "An idea you know has potential—but can't quite structure.",
    "A process with too many steps.",
    "Information that doesn't seem to fit together.",
    "Something you want to build—but don't know what it should become.",
    "Or a question nobody seems to be asking correctly.",
  ],
  bringThat: "Bring me that.",

  dontHire: {
    title: "You probably don't need to hire me.",
    body: [
      "If you need general information, use ChatGPT.",
      "If you want ideas, frameworks, examples, or inspiration, explore my Archive. I've already made a lot of my thinking available.",
      "Don't pay me to tell you something you can find yourself.",
      "Hire me when you want my attention applied specifically to your problem.",
      "That's different.",
    ],
  },

  howIThink: {
    title: "How I think.",
    body: [
      "My foundation is in accounting.",
      "I earned bachelor's and master's degrees in the field, which trained me to follow evidence, reconcile inconsistencies, understand complex systems, and make thousands of individual pieces resolve into a coherent whole.",
      "I'm Kaizen-certified, with formal training in continuous improvement and process optimization.",
      "I've taught, worked across complex organizations, studied internationally, lived abroad, and spent years building across disciplines.",
      "Today my work spans software, AI, research, finance, education, books, music, film, brands, nonprofit initiatives, and experimental systems.",
      "Different problems require different tools.",
      "I don't sell one tool. I help determine which tool the problem actually needs.",
    ],
  },

  process: {
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

  // Set a real booking link (Calendly, Stripe, etc.). Empty → email fallback.
  bookingUrl: "",
};
