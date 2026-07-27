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
  tagline: "I build systems, brands, and experiences that help people build themselves.",
  positioning:
    "NIL is the house under which fashion, AI, publishing, education, film, technology, and storytelling coexist. Name. Image. Likeness. — a body of work by Just Neal that begins from nothing and builds something worth keeping.",
  // Contact — the email is used only in a mailto link, never shown as text.
  contact: {
    email: "neal.justin@icloud.com",
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

// Capabilities — the multidisciplinary range (no employer details).
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
    body: "A background in finance and operations — budgets, audits, controls, forecasting, and Lean process improvement.",
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
    body: "Years of teaching, and designing education-first, non-shaming curricula for life skills.",
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

// The backstory — three questions, answered plainly, shown on the About page.
export const backstory = [
  {
    q: "How I became who I am",
    a: "Life and death. Both have been my teachers. What I've lost and what I've lived through are the whole reason any of this exists.",
  },
  {
    q: "Why I started",
    a: "I was called to it — at a point when my life felt like it was falling apart, at work and beyond. The struggle wasn't a detour; it was the shaping. Every hard season sharpened the way I see, and that perspective is what I build from.",
  },
  {
    q: "The moment that changed everything",
    a: "Now. Not a date in the past — this one. The moment that changes everything is always the present one.",
  },
];

// The connecting philosophy — shown on the About and Vision sections.
export const philosophy = {
  heading: "One house, many rooms",
  body: "Fashion, AI, publishing, education, film, technology, and storytelling look like separate disciplines. Under NIL they're one practice: taking a name, an image, a likeness — and building something from nothing. I originate the concepts, direct the creative vision, and make the work, so that each artifact helps someone build themselves.",
};
