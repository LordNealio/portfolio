// ─────────────────────────────────────────────────────────────────────────────
// RECONVENING THE 34 — data model
//
// Two sets of 34, kept in separate typed objects so no card markup is repeated:
//   • ORIGINAL_34 — the numbered series published in the proceedings of the
//     National Convention of Colored Freemen (Cleveland, September 6–8, 1848).
//   • PROPOSED_34 — a 2026 starting framework, offered for review. NOT adopted,
//     NOT official, NOT representative of every Black American, NOT final.
//
// Four kinds of text are deliberately held in SEPARATE fields and never merged:
//   source  — faithful normalized presentation of the 1848 substance
//   plain   — contemporary plain-language explanation (editorial)
//   why     — why it mattered in 1848 (editorial)
//   note    — archival / status nuance, shown only where the record requires it
//
// Every submitted response carries the version ids below, so later edits to
// wording cannot corrupt earlier votes.
// ─────────────────────────────────────────────────────────────────────────────

export const RECONVENE_VERSIONS = {
  original: "original-1848-v1",
  proposed: "proposed-2026-v1",
} as const;

/** Where completed reviews and contributions are emailed while online
 *  submission is closed. Deliberately separate from the site's general contact
 *  address so this project's mail can be filtered or moved on its own. */
export const RECONVENE_INBOX = "YoungBlesser88@gmail.com";

export const RECONVENE = {
  name: "Reconvening the 34",
  progression: "The Original 34 → The Proposed New 34 → The People’s 34",
  invitation: "Study the old. Review the new. Help shape what goes forward.",
  governing: "Clarity → Capability → Documentation → Ownership → Inheritance → Institution",
  purposes: [
    "Teach the history and context of the 1848 Colored National Convention in Ohio.",
    "Preserve and organize its published 34 numbered resolutions without pretending every item was an identical type of policy proposal.",
    "Present the Proposed New 34 as a starting framework and collect structured feedback that can shape a later People’s 34.",
  ],
  // Shown wherever results or the ballot appear.
  standing:
    "This is community feedback, not an official election. The Proposed New 34 have not been adopted, are not official, do not represent every Black American, and are not final.",
  safety:
    "This project provides education and planning prompts. It does not provide individualized legal, medical, financial, or mental-health advice.",
  relatedLegend:
    "“Related” means the two entries touch a shared theme. It does not mean they are equivalent, and it does not mean the newer item descends from the older one.",
  beginThree:
    "The New 34 are not 34 simultaneous assignments. A participant may begin with three: one for Now, one to Build, and one to Inherit.",
} as const;

export const SOURCES = {
  proceedings: "https://omeka.coloredconventions.org/items/show/280",
  proceedingsLabel: "Proceedings — Colored Conventions Project",
  overview: "https://case.edu/ech/articles/n/national-convention-black-freemen",
  overviewLabel: "Encyclopedia of Cleveland History — National Convention of Black Freemen",
} as const;

// ── Historical context ───────────────────────────────────────────────────────
export interface ContextBlock {
  h: string;
  body: string[];
  kind: "record" | "interpretation" | "open-question";
}

export const CONTEXT: ContextBlock[] = [
  {
    h: "Ohio, September 6–8, 1848",
    kind: "record",
    body: [
      "The National Convention of Colored Freemen met in Cleveland, Ohio, on September 6, 7 and 8, 1848.",
      "Frederick Douglass was elected president and presided. Other important participants included Henry Bibb, Martin R. Delany, William Howard Day, John Jones, Charles H. Langston, and John Mercer Langston, among others.",
      "The gathering drew Black leaders from the Old Northwest, New York, Canada and elsewhere. It was a national convention held in Ohio — not simply an Ohio meeting.",
    ],
  },
  {
    h: "What the proceedings contain",
    kind: "record",
    body: [
      "The published proceedings contain a numbered series of 34 resolutions covering equality, education, skilled work, wealth, political action, escape from slavery, statistical research, temperance, public accountability, self-defense, the Black press, opposition to discriminatory laws, women’s participation, and other matters.",
      "The 34 were not 34 identical policy planks. Some entries were procedural. Resolution 6 was referred to a future convention. Resolution 17 contains disputed and rejected Free Soil language. Resolution 19 was substantially a land-settlement report. Resolution 23 combines thanks for the use of the courthouse with support for the North Star. These differences are preserved here rather than flattened.",
    ],
  },
  {
    h: "The meeting that has no record",
    kind: "record",
    body: [
      "Resolution 28 proposed that the next national convention meet in Detroit or Pittsburgh sometime in 1850. It named no definite city and no definite date.",
      "No surviving record currently confirms that the planned meeting took place.",
      "The next documented National Colored Convention met in Rochester, New York, on July 6–8, 1853.",
    ],
  },
  {
    h: "Why the gap is not attributed to one cause",
    kind: "interpretation",
    body: [
      "This project does not claim a single proven reason for the delay.",
      "The Fugitive Slave Act of 1850, kidnapping danger, resistance work, migration to Canada, state-level organizing, travel and funding limitations, and strategic divisions among delegates all plausibly shaped the period. The weight of each remains a question for the record, not a settled finding.",
    ],
  },
  {
    h: "Rights, not removal",
    kind: "record",
    body: [
      "Resolution 29 condemned the American Colonization Society as an oppressive, deceptive and hypocritical scheme.",
      "The delegates sought rights and advancement inside the United States rather than removal from it under the guise of philanthropy.",
    ],
  },
  {
    h: "The date that opened the research",
    kind: "open-question",
    body: [
      "Kendrick Lamar’s track title “untitled 08 | 09.06.2014.” carries the same month and day as the convention’s opening date, 166 years later. The song’s themes include money, banks, “blue faces,” and shortcuts to success.",
      "This is presented only as the doorway that led to the research, and as an open interpretive question. There is no claim that Kendrick Lamar intentionally referenced the convention, and none should be inferred.",
    ],
  },
];

// ── The Original 34 ──────────────────────────────────────────────────────────
export type OriginalCategory =
  | "Equality & Rights"
  | "Education"
  | "Economy & Work"
  | "Politics & Law"
  | "Slavery & Freedom"
  | "Press & Information"
  | "Community & Accountability"
  | "Safety & Readiness"
  | "Land & Settlement"
  | "Procedural";

export interface OriginalResolution {
  n: number;
  title: string;
  /** Faithful normalized presentation of the published 1848 substance. */
  source: string;
  /** Contemporary plain-language explanation. Editorial. */
  plain: string;
  /** Why it mattered in 1848. Editorial. */
  why: string;
  /** Archival or status nuance, shown only where the record requires it. */
  note?: string;
  categories: OriginalCategory[];
}

export const ORIGINAL_34: OriginalResolution[] = [
  {
    n: 1,
    title: "Universal human equality",
    source:
      "Forever oppose every civil, political, social, or religious action that is derogatory to the universal equality of humanity.",
    plain:
      "Oppose anything in law, politics, social life or religion that treats human beings as unequal.",
    why: "Equality had to be treated as a governing principle across every institution, not merely as an antislavery slogan.",
    categories: ["Equality & Rights"],
  },
  {
    n: 2,
    title: "Equal means of advancement",
    source:
      "Whatever is necessary for the elevation of one class is necessary for another — including skilled industry, agriculture, commerce, professional work, wealth, and education.",
    plain:
      "The same things that lift any other group — trades, land, business, professions, capital and schooling — are what Black Americans need too.",
    why: "Black advancement required access to the same pathways that produced status and security for white Americans.",
    categories: ["Economy & Work", "Education"],
  },
  {
    n: 3,
    title: "Skilled work, professions, and wealth",
    source:
      "Encourage Black people to gain mechanical trades, farming knowledge, mercantile experience, professional education, and accumulated wealth.",
    plain: "Build skills, land knowledge, business experience, professional training and savings.",
    why: "Capability and ownership could challenge enforced economic dependency and stereotypes of limited ability.",
    categories: ["Economy & Work"],
  },
  {
    n: 4,
    title: "Move beyond racially confined service work",
    source:
      "Discourage confinement to domestic and servant occupations, except when necessity requires them for livelihood.",
    plain:
      "Do not accept service work as the ceiling of Black employment, while recognizing that people must still make a living.",
    why: "The delegates objected to a racial labor system that treated service work as the presumed limit of Black capacity — not to the dignity of necessary labor itself.",
    categories: ["Economy & Work"],
  },
  {
    n: 5,
    title: "Business education for children",
    source:
      "Because education is necessary in every department, give children practical and business education wherever possible.",
    plain: "Teach children practical and commercial skills, not general knowledge alone.",
    why: "Education needed to prepare young people for economic agency as well as general knowledge.",
    categories: ["Education", "Economy & Work"],
  },
  {
    n: 6,
    title: "Form a unifying association",
    source: "Propose an association to unite and concentrate collective efforts.",
    plain: "Create a standing organization to hold the work together between conventions.",
    why: "Temporary conventions needed durable infrastructure capable of coordinating work between meetings.",
    note: "The proposal was referred to a committee and ultimately to the next convention. It was not enacted at this one.",
    categories: ["Community & Accountability"],
  },
  {
    n: 7,
    title: "Join moral and political action",
    source:
      "While keeping efforts moral in tendency, examine political action and recommend the course most likely to advance liberty and humanity.",
    plain: "Keep the moral case, and also work out which political strategy actually advances freedom.",
    why: "Moral persuasion alone could not substitute for organized engagement with law and political power.",
    categories: ["Politics & Law"],
  },
  {
    n: 8,
    title: "Withhold support from anti-equality candidates and parties",
    source:
      "Support no person or party — regardless of name or promises — that does not seek equal rights and privileges without distinctions of color, climate, or condition.",
    plain: "Give no political support to any candidate or party that will not commit to equal rights.",
    why: "Political loyalty should be conditional upon concrete commitment to equal rights.",
    categories: ["Politics & Law"],
  },
  {
    n: 9,
    title: "Defend rights against infringement",
    source:
      "Holding liberty above earthly considerations, pledge to resist properly every attempt to infringe upon Black rights.",
    plain: "Treat liberty as the highest priority and answer every attempt to take rights away.",
    why: "Rights survive only when communities are prepared to recognize and oppose violations.",
    categories: ["Equality & Rights", "Safety & Readiness"],
  },
  {
    n: 10,
    title: "Overthrow slavery",
    source:
      "Condemn slavery as a profound curse and pledge to use all justifiable means for its speedy and immediate overthrow.",
    plain: "Work by every justifiable means for the immediate end of slavery — not its gradual reform.",
    why: "The convention rejected delay and treated abolition as an urgent collective obligation.",
    categories: ["Slavery & Freedom"],
  },
  {
    n: 11,
    title: "Collect accurate community statistics",
    source:
      "Ask ministers and others to collect accurate local data on Black population, moral and social conditions, occupations, professionals, newspaper readership, and improvement societies, then report a synopsis to the next national convention.",
    plain:
      "Gather real local data about Black life — population, work, professions, readership, societies — and report it back nationally.",
    why: "Strategy required self-produced evidence rather than hostile assumptions or anecdotes about Black life.",
    categories: ["Community & Accountability"],
  },
  {
    n: 12,
    title: "Promote temperance",
    source:
      "Treat temperance as a lever for elevation and recommend societies organized to promote it.",
    plain: "Organize societies encouraging sobriety as part of collective advancement.",
    why: "The delegates connected personal discipline and mutual organization with community stability, though modern readers should evaluate the limits and moral assumptions of nineteenth-century temperance politics.",
    categories: ["Community & Accountability"],
  },
  {
    n: 13,
    title: "Retain an abolitionist standard in Free Soil politics",
    source:
      "While recommending the Free Soil movement and the Buffalo Convention, maintain the higher and more liberal standard associated with abolitionism.",
    plain:
      "Work with the Free Soil coalition, but hold to the fuller abolitionist demand rather than its narrower platform.",
    why: "Electoral coalition should not dilute the larger demand for human freedom.",
    categories: ["Politics & Law"],
  },
  {
    n: 14,
    title: "Encourage escape from bondage",
    source:
      "Because liberty is inherent and its denial is an outrage, encourage enslaved people to use every favorable opportunity to escape.",
    plain: "Treat escape from slavery as a rightful act and encourage it wherever the chance appears.",
    why: "The resolution recognized self-emancipation as a legitimate exercise of an inherent right.",
    categories: ["Slavery & Freedom"],
  },
  {
    n: 15,
    title: "Aid people escaping slavery",
    source:
      "Pledge individually to use all justifiable means to assist enslaved people escaping the Southern prison house of bondage.",
    plain: "Personally commit to helping people who are escaping slavery.",
    why: "Opposition to slavery required direct solidarity and practical assistance, not sympathy alone.",
    categories: ["Slavery & Freedom"],
  },
  {
    n: 16,
    title: "Secure access to common schools",
    source:
      "Use every just effort to place Black children in schools in common with other children in their communities.",
    plain: "Get Black children into the same schools as everyone else in their town.",
    why: "Equal education required challenging exclusion and segregation rather than accepting inferior access.",
    categories: ["Education", "Equality & Rights"],
  },
  {
    n: 17,
    title: "Political action through the Free Soil movement",
    source:
      "The proceedings discuss supporting a political movement organized around “Free Soil, Free Speech, Free Labor and Free Men” and using electoral power against slavery.",
    plain:
      "Consider throwing Black political weight behind the new Free Soil coalition to fight slavery at the ballot box.",
    why: "Delegates were debating whether a new electoral coalition could advance abolition without compromising Black political principles.",
    note: "The minutes record substantial debate and rejected resolution language, while retaining related material with Resolution 13. This entry is contested in the record and is shown as contested.",
    categories: ["Politics & Law"],
  },
  {
    n: 18,
    title: "Love and fidelity",
    source:
      "Adopt “Love to God and man, and Fidelity to ourselves” as a motto to urge upon the people.",
    plain: "Take up a shared motto: love toward God and humanity, and loyalty to one another.",
    why: "Collective advancement was framed as both moral responsibility toward humanity and loyalty to Black well-being.",
    categories: ["Community & Accountability"],
  },
  {
    n: 19,
    title: "Explore land and home settlement in Michigan",
    source:
      "Receive Jefferson Fitzgerald’s report describing affordable land and economic possibilities in Oceana and Mason Counties, Michigan, for a proposed home-emigration or settlement project.",
    plain:
      "Consider a settlement project on affordable land in two Michigan counties as a route to security and independence.",
    why: "Land offered a possible foundation for safety, agriculture, town-building, and greater economic independence inside the United States.",
    note: "This numbered entry is substantially a report rather than a short policy resolution.",
    categories: ["Land & Settlement", "Economy & Work"],
  },
  {
    n: 20,
    title: "Thank the presiding president",
    source: "Thank the convention president for presiding ably and impartially.",
    plain: "Formally thank the chair for running the meeting fairly.",
    why: "The procedural resolution recognized fair leadership as necessary to hold together a body containing real disagreement.",
    note: "Procedural.",
    categories: ["Procedural"],
  },
  {
    n: 21,
    title: "Formally adjourn",
    source: "Adjourn the convention sine die on Friday, September 8, at 6:00 p.m.",
    plain: "Close the convention with no date set to resume that same session.",
    why: "This procedural act formally closed the gathering without fixing another session of the same meeting.",
    note: "Procedural.",
    categories: ["Procedural"],
  },
  {
    n: 22,
    title: "Military knowledge and vigilance committees",
    source:
      "Encourage Black freemen to learn military science so they could defend themselves against external assailants and internal invaders, and appoint state vigilance committees where practicable.",
    plain:
      "Learn organized self-defense and set up state vigilance committees where it can be done.",
    why: "In an era of mob violence, kidnapping, and slavery, the delegates regarded organized lawful readiness as part of collective survival.",
    categories: ["Safety & Readiness"],
  },
  {
    n: 23,
    title: "Courthouse support and an effective national Black press",
    source:
      "Thank Judge Andrews and the Cleveland bar for making the courthouse available; also recognize a well-conducted newspaper as a powerful instrument of elevation and recommend support for the North Star, edited by Frederick Douglass and Martin R. Delany.",
    plain:
      "Thank those who provided the meeting hall, and back the North Star as the movement’s newspaper.",
    why: "The movement needed both physical places to assemble and independent media capable of coordinating people across distance.",
    note: "This entry combines a procedural vote of thanks with a substantive endorsement of the Black press. Common summaries merge them; both parts are shown here.",
    categories: ["Press & Information", "Procedural"],
  },
  {
    n: 24,
    title: "Hold annual state conventions and petition against Black Laws",
    source:
      "Recommend annual mass state conventions in the free states and petitions demanding repeal of Black Laws and other laws harmful to Black people.",
    plain: "Meet every year at the state level and petition to repeal the Black Laws.",
    why: "Regular state-level organization could sustain pressure between irregular national meetings.",
    categories: ["Politics & Law"],
  },
  {
    n: 25,
    title: "Link taxation with representation",
    source:
      "Question the propriety of paying representation-based taxes while being denied representation.",
    plain: "Ask why Black Americans should be taxed for a representation they are denied.",
    why: "The delegates applied a foundational American political principle to Black disenfranchisement.",
    categories: ["Politics & Law", "Equality & Rights"],
  },
  {
    n: 26,
    title: "Condemn proslavery Christian churches",
    source:
      "Declare that American churches supporting, defending, or participating in slavery and racial proscription had forfeited Black confidence and deserved severe condemnation.",
    plain: "Churches that upheld slavery or racial exclusion had forfeited any claim on Black trust.",
    why: "Religious claims were judged by institutional conduct rather than profession alone.",
    categories: ["Community & Accountability"],
  },
  {
    n: 27,
    title: "Continue conventions",
    source:
      "Affirm that similar conventions could advance suffering humanity and Black interests, and recommend such assemblies to the people.",
    plain: "Keep holding conventions; recommend them to communities everywhere.",
    why: "Deliberation and organized assembly were themselves treated as essential civic infrastructure.",
    categories: ["Community & Accountability"],
  },
  {
    n: 28,
    title: "Plan the next national convention",
    source:
      "Propose that the next National Convention of Colored Freemen meet in Detroit or Pittsburgh sometime in 1850.",
    plain: "Set the next national meeting for 1850, in either Detroit or Pittsburgh.",
    why: "The delegates understood that their program needed continued national review, although the resolution lacked a final city and date.",
    note: "No definite city or date was fixed, and no surviving record currently confirms the planned 1850 meeting occurred. The next documented national convention met at Rochester, New York, July 6–8, 1853.",
    categories: ["Procedural", "Community & Accountability"],
  },
  {
    n: 29,
    title: "Reject the American Colonization Society",
    source:
      "Classify the American Colonization Society among oppressive schemes against Black people and condemn it as profoundly deceptive and hypocritical.",
    plain:
      "Reject the colonization movement outright as a scheme to remove Black people rather than grant them rights.",
    why: "The delegates opposed using supposed philanthropy to remove Black people rather than recognize their rights and stake in the United States.",
    categories: ["Politics & Law", "Equality & Rights"],
  },
  {
    n: 30,
    title: "Thank Cleveland residents",
    source: "Thank Cleveland citizens for publicly approving the convention’s work.",
    plain: "Thank the city’s residents for their public support.",
    why: "Local hospitality and public legitimacy helped a national Black gathering operate in a hostile political environment.",
    note: "Procedural.",
    categories: ["Procedural"],
  },
  {
    n: 31,
    title: "Condemn color prejudice",
    source:
      "Declare prejudice based on color vulgar, unnatural, wicked in the sight of God, and connected to societies shaped by slavery.",
    plain: "Name color prejudice as a made thing, produced by slave societies — not a natural instinct.",
    why: "The resolution treated racial prejudice as a constructed system tied to slavery, not a natural human condition.",
    categories: ["Equality & Rights"],
  },
  {
    n: 32,
    title: "Require financial accountability from public agents",
    source:
      "Assert the right to demand explanations from public lecturers and agents concerning funds collected for public purposes.",
    plain: "Anyone raising money in the community’s name can be made to account for it.",
    why: "Movements require transparent stewardship if public trust and pooled resources are to survive.",
    categories: ["Community & Accountability"],
  },
  {
    n: 33,
    title: "Invite women to participate",
    source:
      "Affirm equality of the sexes and invite women to take part in future deliberations.",
    plain: "Declare the sexes equal and invite women into the convention’s deliberations.",
    why: "The convention moved toward recognizing that a movement for equality could not legitimately exclude women’s voices.",
    categories: ["Equality & Rights"],
  },
  {
    n: 34,
    title: "End discrimination by Black barbers",
    source:
      "Condemn Black barbers who refused to serve Black men equally with white customers and demand an immediate change in practice.",
    plain:
      "Black barbers turning away Black customers while serving white ones must stop, immediately.",
    why: "The delegates recognized that racial hierarchy could be reproduced within Black-owned businesses and demanded internal accountability as well as external justice.",
    categories: ["Community & Accountability", "Equality & Rights"],
  },
];

// ── The Proposed New 34: 2026–2076 ───────────────────────────────────────────
export interface ProposedSection {
  id: string;
  numeral: string;
  title: string;
  range: [number, number];
}

export const PROPOSED_SECTIONS: ProposedSection[] = [
  { id: "sovereignty", numeral: "I", title: "Human Sovereignty and Future Learning", range: [1, 6] },
  { id: "work", numeral: "II", title: "Work, Automation, and the Next Economy", range: [7, 12] },
  { id: "capital", numeral: "III", title: "Capital, Repair, Land, and Infrastructure", range: [13, 18] },
  { id: "resilience", numeral: "IV", title: "Resilience, Data, Health, and Inheritance", range: [19, 26] },
  { id: "governance", numeral: "V", title: "Governance, Culture, and Institutions That Outlive Us", range: [27, 34] },
];

export interface ProposedResolution {
  n: number;
  sectionId: string;
  title: string;
  /** "What it means" — preserved wording. */
  means: string;
  /** Brief reasoning. */
  why: string;
  /** Original 34 numbers touching a shared theme. Related ≠ equivalent. */
  related: number[];
}

export const PROPOSED_34: ProposedResolution[] = [
  // I. Human Sovereignty and Future Learning
  {
    n: 1,
    sectionId: "sovereignty",
    title: "Define Ourselves and Preserve the Right to Evolve",
    means:
      "Study, name, and describe ourselves with evidence while retaining the freedom to revise our understanding.",
    why: "Self-definition should be evidence-based without turning identity into a frozen script that later discoveries cannot correct.",
    related: [1, 31],
  },
  {
    n: 2,
    sectionId: "sovereignty",
    title: "Practice Futures Literacy",
    means:
      "Learn to examine several plausible futures instead of treating fear, hope, or prediction as certainty.",
    why: "Communities make stronger decisions when they prepare for multiple futures and identify useful actions before a crisis arrives.",
    related: [11, 27],
  },
  {
    n: 3,
    sectionId: "sovereignty",
    title: "Protect Attention, Imagination, and Mental Sovereignty",
    means:
      "Treat attention as a finite resource and protect the ability to think, rest, imagine, and choose deliberately.",
    why: "People cannot govern their lives or create new possibilities when platforms, exhaustion, fear, or compulsions continuously govern their attention.",
    related: [12, 18],
  },
  {
    n: 4,
    sectionId: "sovereignty",
    title: "Build Lifelong, Adaptive Learning Systems",
    means:
      "Make learning a continuous practice shaped around real goals, changing needs, and different ways of learning.",
    why: "Rapid economic and technological change makes one-time schooling insufficient; learning must produce demonstrable, transferable capability throughout life.",
    related: [5, 16],
  },
  {
    n: 5,
    sectionId: "sovereignty",
    title: "Make AI Literacy as Fundamental as Reading",
    means:
      "Learn to understand, evaluate, use, adapt, create, and govern AI without surrendering human judgment.",
    why: "AI increasingly mediates knowledge and opportunity, so communities must be capable users, critics, builders, and governors rather than passive consumers.",
    related: [5, 2],
  },
  {
    n: 6,
    sectionId: "sovereignty",
    title: "Own a Share of the Intelligence Infrastructure",
    means:
      "Move from permanent dependence on outside platforms toward community-controlled knowledge, data, tools, and computing capacity.",
    why: "Literacy without ownership leaves essential knowledge and infrastructure vulnerable to corporate withdrawal, extraction, censorship, or price changes.",
    related: [23, 3],
  },

  // II. Work, Automation, and the Next Economy
  {
    n: 7,
    sectionId: "work",
    title: "Document Capability Before Crisis",
    means:
      "Continuously record what you know, contribute, improve, and complete before conflict, layoff, or memory loss.",
    why: "Evidence of performance and transferable knowledge protects workers and makes hidden contributions visible before access or relationships disappear.",
    related: [11, 32],
  },
  {
    n: 8,
    sectionId: "work",
    title: "Build Portable Identity, Skills, and Benefits",
    means:
      "Reduce dependence on one employer by maintaining portable records, skills, relationships, savings, and benefits knowledge.",
    why: "A job transition should not erase a person’s proof of capability, professional network, health protection, or ability to navigate the next step.",
    related: [2, 3],
  },
  {
    n: 9,
    sectionId: "work",
    title: "Master Workplace Maneuverability, Leave, and Protection",
    means:
      "Know how to enter, navigate, document, and leave workplaces while protecting health, records, rights, and future options.",
    why: "Workers need practical knowledge of performance documentation, discrimination and harassment records, accommodations, FMLA, disability insurance, workers’ compensation, unemployment, retaliation risks, deadlines, and benefit continuation before a workplace crisis.",
    related: [4, 9],
  },
  {
    n: 10,
    sectionId: "work",
    title: "Prepare for Automation Before Displacement",
    means:
      "Audit tasks and build complementary capabilities before technology or reorganization removes current work.",
    why: "Preparation is more effective while a person still has income, access, relationships, and time to learn than after displacement occurs.",
    related: [3, 2],
  },
  {
    n: 11,
    sectionId: "work",
    title: "Enter the Industries That Will Build the Future",
    means:
      "Ensure our presence across the full value chains shaping the future, from research and skilled operations to ownership and governance.",
    why: "Representation only at the consumer or entry-work level cannot shape how future industries distribute risk, authority, and wealth.",
    related: [3, 2],
  },
  {
    n: 12,
    sectionId: "work",
    title: "Convert Creativity and Knowledge Into Owned Assets",
    means:
      "Protect and structure creative, cultural, and intellectual work so it produces attribution, control, and inheritable value.",
    why: "Culture creates lasting value, but creators and families often lose control when ownership, licensing, source files, contracts, and succession are neglected.",
    related: [23, 3],
  },

  // III. Capital, Repair, Land, and Infrastructure
  {
    n: 13,
    sectionId: "capital",
    title: "Build a Financial Command Center in Every Household",
    means:
      "Create a clear, regularly updated system for cash flow, debt, protection, goals, taxes, and family decisions.",
    why: "Organized financial information reduces avoidable losses, improves decisions, and allows households to respond faster when conditions change.",
    related: [32, 3],
  },
  {
    n: 14,
    sectionId: "capital",
    title: "Create Patient Community Capital",
    means:
      "Pool and govern money for long-term community ownership rather than only emergency response or short-term consumption.",
    why: "Durable ownership requires transparent capital that can wait, learn, acquire assets, withstand setbacks, and remain accountable to ordinary members.",
    related: [6, 32],
  },
  {
    n: 15,
    sectionId: "capital",
    title: "Become Ready to Receive and Govern Repair",
    means:
      "Prepare records, institutions, and public-finance competence so reparative resources can be identified, protected, and used across generations.",
    why: "Reparations require more than winning a claim; beneficiary records, delivery systems, appeals, safeguards, investment rules, and long-term stewardship must exist before resources arrive.",
    related: [25, 11],
  },
  {
    n: 16,
    sectionId: "capital",
    title: "Preserve Land, Housing, and Place Across Generations",
    means:
      "Protect homes, land, titles, and community place from preventable loss and fragmented succession.",
    why: "Property cannot create intergenerational security when unclear title, heirs’ property, taxes, deferred maintenance, insurance gaps, or absent succession plans cause it to leave the family.",
    related: [19, 3],
  },
  {
    n: 17,
    sectionId: "capital",
    title: "Build Resilient Community Infrastructure",
    means:
      "Increase local capacity in energy, water, food, broadband, transportation, repair, storage, and emergency communication.",
    why: "Communities need practical redundancy and partial ownership of the systems that keep people alive and connected during disruption.",
    related: [24, 22],
  },
  {
    n: 18,
    sectionId: "capital",
    title: "Practice Love as an Ethic",
    means:
      "Following bell hooks, treat love as a disciplined practice of care, honesty, respect, responsibility, trust, commitment, and repair — not merely a feeling.",
    why: "Families and institutions cannot become liberating while domination, silence, fear, neglect, and avoidance are mistaken for love.",
    related: [18, 33],
  },

  // IV. Resilience, Data, Health, and Inheritance
  {
    n: 19,
    sectionId: "resilience",
    title: "Plan for Climate, Insurance, and Migration",
    means:
      "Prepare households and institutions for heat, storms, smoke, water stress, insurance changes, and possible relocation.",
    why: "Climate risk already affects health, property values, premiums, infrastructure, and migration, so preparation must begin before insurance or mobility options disappear.",
    related: [19, 14],
  },
  {
    n: 20,
    sectionId: "resilience",
    title: "Control Digital Identity and Practice Cybersecurity",
    means: "Protect accounts, devices, reputation, identity, and access to essential digital systems.",
    why: "Financial life, work, health, communication, and public identity increasingly depend on systems that can be stolen, manipulated, locked, or impersonated.",
    related: [9, 22],
  },
  {
    n: 21,
    sectionId: "resilience",
    title: "Build a Truth and Provenance Infrastructure",
    means:
      "Preserve sources, context, dates, versions, and distinctions between fact, interpretation, hypothesis, symbolism, and unresolved questions.",
    why: "Trust collapses when evidence and interpretation are blended; a durable knowledge system must show how a conclusion was reached and how it can be corrected.",
    related: [11, 23],
  },
  {
    n: 22,
    sectionId: "resilience",
    title: "Create a 100-Year Family and Community Memory",
    means:
      "Preserve stories, records, photographs, property history, creative work, and instructions in forms likely to survive technology and leadership changes.",
    why: "Each generation loses knowledge and repeats work when memory depends on one elder, one phone, one platform, or one founder.",
    related: [11, 27],
  },
  {
    n: 23,
    sectionId: "resilience",
    title: "Protect Genomic, Biometric, and Health Data",
    means:
      "Understand the enduring personal and family consequences of sharing biological and health information.",
    why: "Biological data cannot truly be replaced after exposure and may reveal information about relatives who never consented to its collection.",
    related: [9, 11],
  },
  {
    n: 24,
    sectionId: "resilience",
    title: "Move From Crisis Care to Lifelong Health Capacity",
    means:
      "Build daily health knowledge and routines so care includes prevention, nutrition, movement, sleep, mental health, and early response.",
    why: "Health improves when people can recognize problems early and sustain nutrition, sleep, movement, preventive care, and mental-health support — not only react to emergencies.",
    related: [12, 2],
  },
  {
    n: 25,
    sectionId: "resilience",
    title: "Design Families and Care Networks for the Future",
    means:
      "Plan for children, elders, disability, caregiving, guardianship, fertility, adoption, and periods when primary caregivers are unavailable.",
    why: "Care becomes fragile when it depends on one exhausted person and no one knows the legal, financial, medical, or practical continuity plan.",
    related: [33, 18],
  },
  {
    n: 26,
    sectionId: "resilience",
    title: "Build Lawful Community Readiness",
    means:
      "Develop disciplined physical, emergency, technical, and legal readiness that protects life without encouraging recklessness.",
    why: "Martial arts, de-escalation, first aid, emergency preparation, situational awareness, digital safety, and knowledge of the law can increase protection when taught with discipline and accountability.",
    related: [22, 9],
  },

  // V. Governance, Culture, and Institutions That Outlive Us
  {
    n: 27,
    sectionId: "governance",
    title: "Prepare for the Rights Questions That Are Coming",
    means:
      "Anticipate how automated decisions, surveillance, genetic information, neurotechnology, digital identity, and autonomous systems will affect rights.",
    why: "Waiting until new technologies are fully embedded allows private systems and courts to define rights without meaningful community participation.",
    related: [7, 8],
  },
  {
    n: 28,
    sectionId: "governance",
    title: "Own the Means of Cultural Transmission",
    means:
      "Control more of how stories, music, language, images, curricula, games, and archives reach audiences and produce value.",
    why: "Cultural creation without distribution, archives, licensing, and audience relationships leaves meaning and revenue controlled by intermediaries.",
    related: [23, 27],
  },
  {
    n: 29,
    sectionId: "governance",
    title: "Connect Globally Without Erasing Our Specificity",
    means:
      "Build international relationships while retaining accurate Black American history, interests, and self-definition.",
    why: "Global solidarity becomes stronger when connection does not require collapsing distinct histories, claims, experiences, or responsibilities into one identity.",
    related: [29, 24],
  },
  {
    n: 30,
    sectionId: "governance",
    title: "Convene an Annual September 6 Foresight Assembly",
    means:
      "Use September 6 for collective study, accounting, correction, future planning, and selection of a few bounded priorities.",
    why: "A recurring digital assembly can supply the continuity, review, and coordination that temporary conventions struggled to maintain.",
    related: [27, 28],
  },
  {
    n: 31,
    sectionId: "governance",
    title: "Turn Research Into Prototypes and Institutions",
    means:
      "Move from questions and interpretation into tested tools, curricula, programs, businesses, policies, archives, and institutions.",
    why: "Research creates public value when its strongest ideas are tested, corrected, made usable, and given a structure capable of continuing the work.",
    related: [6, 19],
  },
  {
    n: 32,
    sectionId: "governance",
    title: "Govern Without Personality Cults",
    means:
      "Design organizations that can survive founders, charisma, disagreement, transition, and removal of leaders.",
    why: "A movement becomes vulnerable when identity, authority, records, money, and decision-making depend on one person.",
    related: [20, 32],
  },
  {
    n: 33,
    sectionId: "governance",
    title: "Measure What Reaches the Next Generation",
    means:
      "Judge success by capabilities, health, assets, memory, infrastructure, and institutions transferred — not only attention or activity.",
    why: "Visibility and participation are incomplete measures if descendants inherit no stronger capacity, knowledge, ownership, or institutions.",
    related: [11, 5],
  },
  {
    n: 34,
    sectionId: "governance",
    title: "Build What Lasts",
    means:
      "Evaluate every major initiative by immediate need, capability, ownership, transfer, governance, and long-term durability.",
    why: "The final test is whether useful work can be maintained, governed, repaired, taught, and transferred after its original creators are gone.",
    related: [6, 27],
  },
];

// ── Review options ───────────────────────────────────────────────────────────
export interface ReviewOption {
  value: string;
  label: string;
}

export const ORIGINAL_OPTIONS: ReviewOption[] = [
  { value: "carry_forward", label: "Carry forward" },
  { value: "modernize", label: "Modernize" },
  { value: "merge", label: "Merge" },
  { value: "achieved", label: "Recognize as achieved" },
  { value: "retire", label: "Retire or replace" },
  { value: "unsure", label: "Unsure — teach me more" },
];

export const PROPOSED_OPTIONS: ReviewOption[] = [
  { value: "support", label: "Support as written" },
  { value: "support_revised", label: "Support with revisions" },
  { value: "combine", label: "Combine with another proposal" },
  { value: "exclude", label: "Do not include" },
  { value: "more_info", label: "Need more information" },
  { value: "alternative", label: "Submit alternative wording" },
];

export const MISSING_PROMPT =
  "What issue affecting Black people, Black men, families, or communities is missing from both sets of resolutions?";

export const CONTACT_METHODS = ["Email", "Phone", "Either", "No follow-up"];

export const INTEREST_AREAS = [
  "History & archives",
  "Law & policy",
  "Education & curriculum",
  "Finance & capital",
  "Land & housing",
  "Health & care",
  "Technology & AI",
  "Media & culture",
  "Organizing & governance",
  "Climate & infrastructure",
];

export const TOTAL_ITEMS = ORIGINAL_34.length + PROPOSED_34.length; // 68

export const ORIGINAL_CATEGORIES: OriginalCategory[] = Array.from(
  new Set(ORIGINAL_34.flatMap((r) => r.categories))
).sort() as OriginalCategory[];

export const sectionOf = (n: number) =>
  PROPOSED_SECTIONS.find((s) => n >= s.range[0] && n <= s.range[1]);
