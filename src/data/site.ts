// Personal facts drawn from Justin Neal's résumé and project record.
// Edit contact links here. `verified: false` = please confirm before publishing.

// The nonprofit organization behind the work.
export const org = {
  name: "Nous Innovation Labs",
  url: "https://nous-innovation-labs.vercel.app/",
  tagline: "Human-Centered Learning for the Intelligence Age",
  description:
    "A nonprofit educational innovation organization focused on AI literacy, reflective learning, and human-centered technology that strengthens communities.",
};

export const site = {
  name: "NIL",
  fullName: "Just Neal",
  wordmark: "NIL",
  title: "Creative Director · Builder · Storyteller",
  location: "Mesa, Arizona",
  tagline: "I build systems, brands, and experiences that help people build themselves.",
  positioning:
    "NIL is the house under which fashion, AI, publishing, education, film, technology, and storytelling coexist. Name. Image. Likeness. — a body of work by Just Neal that begins from nothing and builds something worth keeping.",
  // Contact — CONFIRM these before publishing.
  contact: {
    email: "Neal.Justin@icloud.com",
    linkedin: "https://www.linkedin.com/in/justin-neal-5427973b/",
    phone: "", // present on résumé; left out of the public site by default
    github: "", // add if you want repos linked
  },
};

// The NIL idea — surfaced subtly across the house, never as a slogan.
export const nil = {
  meaning: [
    { term: "Name · Image · Likeness", body: "The self, made ownable — what you carry, and what you're free to build with." },
    { term: "Nil", body: "To begin with nothing." },
    { term: "Kneel", body: "Humility — the posture before the work." },
    { term: "Neal", body: "The cloud. The name, and the figure." },
  ],
  scriptures: [
    { ref: "Luke 22:41", note: "He knelt down and prayed." },
    { ref: "Philippians 2:10", note: "Every knee shall bow." },
  ],
  statement: "Nothing into something. Name. Image. Likeness.",
};

export interface ExperienceItem {
  role: string;
  org: string;
  period: string;
  location?: string;
  points: string[];
}

export const experience: ExperienceItem[] = [
  {
    role: "Assistant Director of Finance / Finance Manager",
    org: "Arizona PBS (Arizona State University)",
    period: "2019 – 2023",
    location: "Remote",
    points: [
      "Directed FP&A for $20MM across 6+ revenue streams and a 70k+ membership base.",
      "Led the 3-year business-department strategy, KPIs, and mission and vision as part of the organization's plan for operational excellence.",
      "Led two external US GAAP audits to secure federal/grant funding — increasing efficiency 118% and cutting costs 73%.",
      "Managed $1.9MM in federal grants and built an FP&A toolbox that automated month-end close and forecasting.",
      "Applied Lean/Kanban to process and internal controls for $100k+ in annual savings.",
    ],
  },
  {
    role: "Staff Accountant",
    org: "3CDC",
    period: "2016 – 2018",
    location: "Cincinnati, OH",
    points: [
      "Ran month-end close for a $20MM portfolio — 300+ reconciliations, journal entries, and variance analysis monthly.",
      "Prepared annual and midterm audit materials and standardized reporting.",
      "Built automated expense/revenue and BlackLine processes, increasing efficiency 88%, and served as system administrator.",
    ],
  },
  {
    role: "English Teacher",
    org: "Neungin Middle School & Moonkang English Academy",
    period: "2013 – 2015 & 2018 – 2019",
    location: "South Korea",
    points: [
      "Supported the development of 1,500+ students through assessment, planning, and adaptive lessons.",
      "Designed dynamic lessons that raised comprehension and engagement — the seed of an education-first product instinct.",
    ],
  },
  {
    role: "Graduate Assistant, Financial Accounting",
    org: "Miami University",
    period: "2015 – 2016",
    location: "Oxford, OH",
    points: [
      "Taught 150+ students basic financial accounting to the highest grade distribution in three years (90% pass rate).",
    ],
  },
];

export const education = [
  { degree: "Master of Accountancy", org: "Miami University", year: "2016" },
  { degree: "Bachelor of Accountancy", org: "Miami University", year: "2012" },
];

export const certifications = [
  "Certified Kaizen Facilitator (CKF) — Lean Concepts, Management & Strategy Institute",
  "Scrum: The Basics",
  "Generative AI for Digital Marketers",
  "Creating a Culture of Continuous Improvement",
  "Learning & Development (multiple LinkedIn Learning tracks)",
];

// Capabilities — the multidisciplinary range, grounded in real work.
export interface Capability {
  title: string;
  body: string;
}

export const capabilities: Capability[] = [
  {
    title: "Product Ideation",
    body: "Originating concepts and defining what a product should be — the problem, the audience, and the shape of the solution.",
  },
  {
    title: "AI-Assisted Development",
    body: "Turning ideas into working prototypes through prompt architecture, feature definition, iteration, and testing — directing the build end to end.",
  },
  {
    title: "Creative Direction",
    body: "Setting the visual language, tone, and story so a product feels intentional — from an editorial festival site to a private journaling app.",
  },
  {
    title: "UX & Information Architecture",
    body: "Structuring flows, navigation, and content so complex ideas stay usable and mobile-first.",
  },
  {
    title: "Financial & Operational Analysis",
    body: "A Master of Accountancy and years running FP&A for $20MM — budgets, audits, controls, and Lean process improvement.",
  },
  {
    title: "Research & Writing",
    body: "Long-form essays, product specs, and a disciplined, documented symbolic archive with a verbatim-only rule.",
  },
  {
    title: "Nonprofit Strategy",
    body: "Founding a journaling nonprofit and advising on grant reporting, fundraising, and community programs.",
  },
  {
    title: "Education & Curriculum",
    body: "Teaching across the U.S. and South Korea, and designing education-first, non-shaming curricula for life skills.",
  },
  {
    title: "Rapid Prototyping",
    body: "Shipping functional prototypes fast — a dozen distinct products across web, mobile, and PWA.",
  },
  {
    title: "Brand & Storytelling",
    body: "Building a coherent symbolic and visual identity that ties disparate projects into one point of view.",
  },
];

// The connecting philosophy — shown on the About and Vision sections.
export const philosophy = {
  heading: "One house, many rooms",
  body: "Fashion, AI, publishing, education, film, technology, and storytelling look like separate disciplines. Under NIL they're one practice: taking a name, an image, a likeness — and building something from nothing. I originate the concepts, direct the creative vision, and make the work, so that each artifact helps someone build themselves.",
};
