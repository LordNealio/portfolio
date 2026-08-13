// ─────────────────────────────────────────────────────────────────────────────
// SPEND DAT SHIT — data model + helpers.
//
// The marketplace's people, products, categories, and money/hash helpers live
// here so the experience is config-driven. The Tithing Experiment feeds its own
// `people` (the eight billionaires, at 90% of net worth) into <SpendDatShit/>.
//
// Disclaimer: net-worth figures and prices are illustrative estimates. Nothing
// ships and no purchase occurs — it's satire.
// ─────────────────────────────────────────────────────────────────────────────

export type Person = {
  id: string;
  name: string;
  shortName: string;
  initials: string;
  fortune: number;
  accent: string;
  source?: string;
};

export type StoreItem = {
  id: string;
  name: string;
  note: string;
  detail: string;
  category: "Real life" | "Luxury" | "Community" | "Power moves";
  price: number;
  icon: string;
  image?: string;
  featured?: boolean;
};

export type Prophecy = {
  year: number;
  title: string;
  story: string;
  headline: string;
  warning: string;
};

// Default cast for the standalone /work/spend-dat-shit experience.
export const PEOPLE: Person[] = [
  { id: "musk", name: "Elon Musk", shortName: "Elon", initials: "EM", fortune: 826_200_000_000, accent: "#b8ff39", source: "https://www.forbes.com/profile/elon-musk/" },
  { id: "bezos", name: "Jeff Bezos", shortName: "Bezos", initials: "JB", fortune: 278_700_000_000, accent: "#ff7a00", source: "https://www.forbes.com/profile/jeff-bezos/" },
  { id: "oprah", name: "Oprah Winfrey", shortName: "Oprah", initials: "OW", fortune: 3_400_000_000, accent: "#c59cff", source: "https://www.forbes.com/profile/oprah-winfrey/" },
  { id: "swift", name: "Taylor Swift", shortName: "Taylor", initials: "TS", fortune: 2_000_000_000, accent: "#ff9dcc", source: "https://www.forbes.com/profile/taylor-swift/" },
  { id: "perry", name: "Tyler Perry", shortName: "Tyler", initials: "TP", fortune: 1_400_000_000, accent: "#ffd53d", source: "https://www.forbes.com/profile/tyler-perry/" },
];

export const ITEMS: StoreItem[] = [
  { id: "groceries", name: "A year of groceries", note: "A full cart every week", detail: "$300 × 52 weeks for a household", category: "Real life", price: 15_600, icon: "🛒" },
  { id: "rent", name: "One year of rent", note: "A typical two-bedroom", detail: "$2,200 per month, paid in advance", category: "Real life", price: 26_400, icon: "⌂" },
  { id: "childcare", name: "A year of childcare", note: "Full-time care for one child", detail: "Illustrative U.S. family budget", category: "Real life", price: 18_000, icon: "☀" },
  { id: "student-debt", name: "Erase student debt", note: "One borrower gets a clean slate", detail: "A $40,000 balance, wiped out", category: "Real life", price: 40_000, icon: "✓" },
  { id: "family-car", name: "Reliable family car", note: "New, practical, fully paid", detail: "Car, taxes, registration and insurance", category: "Real life", price: 42_000, icon: "◉" },
  { id: "college", name: "Four years of college", note: "A complete undergraduate ride", detail: "Tuition, housing, books and food", category: "Real life", price: 160_000, icon: "◆" },
  { id: "family-home", name: "Debt-free family home", note: "Keys with no mortgage attached", detail: "An illustrative mid-market home", category: "Real life", price: 500_000, icon: "⌂" },

  { id: "gucci", name: "$20K Gucci shopping spree", note: "No checking the price tags", detail: "Bags, shoes, jackets and accessories", category: "Luxury", price: 20_000, icon: "G", image: "/items/gucci-spree.webp", featured: true },
  { id: "courtside", name: "Courtside night out", note: "Four seats, travel and dinner", detail: "One unapologetically expensive game", category: "Luxury", price: 35_000, icon: "●" },
  { id: "watch", name: "Gold skeleton watch", note: "Tiny machine, enormous receipt", detail: "High horology with precious metal", category: "Luxury", price: 125_000, icon: "◷" },
  { id: "lamborghini", name: "Lamborghini Revuelto", note: "A 1,001-hp grocery getter", detail: "Illustrative out-the-door supercar price", category: "Luxury", price: 650_000, icon: "➜", image: "/items/lamborghini.webp", featured: true },
  { id: "chef", name: "Private chef for a year", note: "Your refrigerator gets a publicist", detail: "Salary, ingredients and special events", category: "Luxury", price: 250_000, icon: "✦" },
  { id: "concert", name: "Private superstar concert", note: "Your living room becomes a tour stop", detail: "Artist, production, venue and security", category: "Luxury", price: 3_000_000, icon: "♪" },
  { id: "mansion", name: "Modern mega-mansion", note: "More bathrooms than friendships", detail: "A trophy property plus furnishing budget", category: "Luxury", price: 25_000_000, icon: "▥", image: "/items/mansion.webp", featured: true },
  { id: "island", name: "Private island", note: "No neighbors. Many logistics.", detail: "Island, dock, villa and infrastructure", category: "Luxury", price: 90_000_000, icon: "◒" },
  { id: "jet", name: "Long-range private jet", note: "The group chat gets a runway", detail: "Aircraft only—crew and fuel come later", category: "Luxury", price: 85_000_000, icon: "✈" },
  { id: "yacht", name: "120-meter megayacht", note: "A floating operating expense", detail: "Custom build before annual upkeep", category: "Luxury", price: 600_000_000, icon: "≈" },

  { id: "emergency-grants", name: "100 emergency grants", note: "$10,000 directly to each person", detail: "Rent, repairs, medical bills or breathing room", category: "Community", price: 1_000_000, icon: "+" },
  { id: "scholarships", name: "100 full scholarships", note: "Tuition without lifelong debt", detail: "$160,000 for each student", category: "Community", price: 16_000_000, icon: "◆" },
  { id: "homes", name: "100 debt-free homes", note: "A hundred sets of permanent keys", detail: "$500,000 per home", category: "Community", price: 50_000_000, icon: "▦" },
  { id: "business-grants", name: "1,000 business grants", note: "A thousand founders get a real start", detail: "$50,000 in non-dilutive capital each", category: "Community", price: 50_000_000, icon: "↗" },
  { id: "school-lunch", name: "One million school lunches", note: "A lot of full stomachs", detail: "$8 per fresh meal", category: "Community", price: 8_000_000, icon: "□" },
  { id: "learning-centers", name: "10 learning centers", note: "Libraries, labs and after-school space", detail: "$8 million to build and launch each", category: "Community", price: 80_000_000, icon: "◎" },
  { id: "clinic-network", name: "10 neighborhood clinics", note: "Care close enough to reach", detail: "Build, equip and seed operations", category: "Community", price: 250_000_000, icon: "✚" },

  { id: "studio", name: "Build a film studio", note: "Own the lot and the stories", detail: "A large creative campus with soundstages", category: "Power moves", price: 800_000_000, icon: "▶" },
  { id: "hospital", name: "Build a major hospital", note: "A skyline-sized act of care", detail: "Illustrative construction and equipment budget", category: "Power moves", price: 1_500_000_000, icon: "✚" },
  { id: "newspaper", name: "Buy a major newspaper", note: "Tomorrow's headline is now a meeting", detail: "Illustrative acquisition budget", category: "Power moves", price: 1_000_000_000, icon: "N" },
  { id: "moon", name: "Fund a moon mission", note: "Put the group chat on the lunar surface", detail: "One extremely ambitious mission budget", category: "Power moves", price: 4_000_000_000, icon: "☾" },
  { id: "team", name: "Buy a pro basketball team", note: "Courtside becomes an office chair", detail: "If an owner is actually willing to sell", category: "Power moves", price: 5_000_000_000, icon: "●" },
  { id: "solar-city", name: "Solar-power a small city", note: "Turn sunlight into infrastructure", detail: "Generation, storage and grid upgrades", category: "Power moves", price: 8_000_000_000, icon: "☀" },
];

export const CATEGORIES = ["All", "Real life", "Luxury", "Community", "Power moves"] as const;
export type Category = (typeof CATEGORIES)[number];

export function money(value: number, compact = false) {
  if (compact) {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      notation: "compact",
      maximumFractionDigits: value >= 1_000_000_000 ? 1 : 0,
    }).format(value);
  }
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(value);
}

export function choice<T>(values: T[], seed: number) {
  return values[Math.abs(seed) % values.length];
}

export function hash(value: string) {
  let result = 2166136261;
  for (let index = 0; index < value.length; index += 1) {
    result ^= value.charCodeAt(index);
    result = Math.imul(result, 16777619);
  }
  return result >>> 0;
}

// Static phrase banks for the Future Oracle (interpolated at runtime).
export const ORACLE_ENDINGS = (personShort: string, remainingCompact: string) => [
  `Meanwhile, ${personShort} checks the account, whispers “honestly… not bad,” and asks if you are available to manage Tuesdays.`,
  `The remaining ${remainingCompact} grows lonely, purchases a small moon, and names it after your browser history.`,
  `History remembers you not as rich, but as the first person to make a receipt require its own documentary series.`,
  `A museum displays your final receipt between the Rosetta Stone and a mysteriously unpaid parking ticket.`,
];
export const ORACLE_TITLES = [
  "THE RECEIPT BECOMES A RELIGION",
  "YOU ACCIDENTALLY INVENT TOMORROW",
  "THE MONEY DEVELOPS A PERSONALITY",
  "YOUR CART ESCAPES THE SIMULATION",
];
export const ORACLE_WARNINGS = [
  `Oracle confidence: 42%. Surreal confidence: 100%.`,
  `Side effect: every automatic door now recognizes you as “Your Excellency.”`,
  `Financial advisors describe the plan as “technically a sequence of events.”`,
  `Your tax return is reclassified as speculative fiction.`,
];
