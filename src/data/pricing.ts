// Single source of truth for all pricing. Change a number here — it propagates everywhere.

// ─── Per-service prices ────────────────────────────────────────────────────────

export const SERVICE_PRICES = {
  web:        { amount: "$3,950",  display: "from $3,950",    sub: "from · fixed · GST exclusive" },
  seo:        { amount: "$1,500",  display: "from $1,500/mo", sub: "per month · 3-month minimum" },
  automation: { amount: "$5,000",  display: "from $5,000",    sub: "from · scoped per project" },
} as const;

// ─── Tiered packages (canonical) ─────────────────────────────────────────────

export interface Tier {
  name: string;
  price: string;
  sub: string;
  pitch: string;
  who: string;
  accent: boolean;
  bullets: string[];
  out: string;
}

export const TIERS: Tier[] = [
  {
    name: "Launch",
    price: "$3,950",
    sub: "one‑off · 3–5 weeks",
    pitch: "The single-site build. Marketing site, copy, design, ship.",
    who: "Operators with a site that looks okay and sells badly.",
    accent: false,
    bullets: [
      "Up to 8 pages — home, services, about, contact, 3 content pages",
      "Copy draft on the first call. You edit; I refine.",
      "Next.js · Tailwind · MDX. You own the repo.",
      "Schema, sitemap, analytics, OG images, favicon pack",
      "2 rounds of revisions. Hand-off walkthrough.",
      "One month of post-launch tweaks included.",
    ],
    out: "Ads, SEO, or ongoing work. Those are their own tiers.",
  },
  {
    name: "Growth",
    price: "$8,950",
    sub: "one‑off · 6–8 weeks",
    pitch: "Site + advanced feature + 90 days of SEO. The full zero-to-revenue.",
    who: "A new service, new brand, or a business serious about the next 12 months.",
    accent: true,
    bullets: [
      "Everything in Launch",
      "Advanced feature module — booking system, customer portal, quote calculator, or chatbot CMS (scoped in sprint 0)",
      "90 days of SEO — technical, local, content (4 posts)",
      "Cal.com booking flow with budget-range qualification",
      "CRM wire-up — HubSpot, Attio, Airtable, or your sheet",
      "Weekly 20-minute check-ins for the first 90 days.",
    ],
    out: "Native mobile apps, ongoing ads management, complex integrations.",
  },
  {
    name: "Operator",
    price: "$3,500",
    sub: "per month · rolling",
    pitch: "I'm your product and engineering hire, for less than the equivalent salary.",
    who: "Businesses past product-market-fit, compounding reach month over month.",
    accent: false,
    bullets: [
      "Sites, SEO, automation — whatever moves the number",
      "One priority per week. Shipped, not queued.",
      "Monthly loom with the real numbers, no fluff deck",
      "Shared Linear — you see the roadmap I'm working from",
      "Direct line — Slack Connect or email, 1 AU biz day reply",
      "Month-to-month. No 12-month lock. No setup fee.",
    ],
    out: "Anything outside marketing + ops. Book a call.",
  },
];

// ─── Homepage pricing strip ────────────────────────────────────────────────────
// [name, price, cadence-label, short description]

export const PRICING_STRIP = [
  [TIERS[0].name, TIERS[0].price, "one‑off",   "Single-site build. 3–5 weeks. You own everything."],
  [TIERS[1].name, TIERS[1].price, "one‑off",   "Site + advanced feature + 90 days of SEO."],
  [TIERS[2].name, TIERS[2].price, "per month", "Retained partner. Sites, SEO, automation, ship list."],
] as const;

// ─── Services page Good / Better / Best strip ─────────────────────────────────
// [label, price-display, short description]

export const PACKAGES = [
  ["Good",   TIERS[0].price,          "Launch site. One job, done well."],
  ["Better", TIERS[1].price,          "Site + 90 days ads + SEO. Zero to revenue."],
  ["Best",   TIERS[2].price + "/mo",  "Operator retainer. Compound over 12 months."],
] as const;
