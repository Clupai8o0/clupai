export type Kit = {
  slug: string;
  n: string;
  name: string;
  tag: string;
  price: string;
  mrr: string;
  mrrLabel: string;
  desc: string;
  tech: string;
  status: "Live" | "Beta" | "Free";
};

export const kits: Kit[] = [
  {
    slug: "scopekit",
    n: "01",
    name: "ScopeKit",
    tag: "v2.1",
    price: "$149",
    mrr: "$840/mo",
    mrrLabel: "$840/mo MRR",
    desc: "Notion + Airtable system for scoping fixed-price web projects. The exact one we use on every build.",
    tech: "Notion · Airtable",
    status: "Live",
  },
  {
    slug: "leadform",
    n: "02",
    name: "LeadForm AU",
    tag: "v1.4",
    price: "$49",
    mrr: "$312/mo",
    mrrLabel: "$312/mo MRR",
    desc: "Drop-in Next.js lead form. Budget qualifier, honeypot, Resend email, GA4 events. Wire it up in 20 minutes.",
    tech: "Next.js · Resend",
    status: "Live",
  },
  {
    slug: "cwv-audit",
    n: "03",
    name: "CWV Audit Kit",
    tag: "v1.0",
    price: "$99",
    mrr: "$198/mo",
    mrrLabel: "$198/mo MRR",
    desc: "Playwright + Lighthouse recipe that audits 20 URLs nightly and ships the report to Slack. Set, forget.",
    tech: "Playwright · CI",
    status: "Live",
  },
  {
    slug: "ads-autopilot",
    n: "04",
    name: "Ads Autopilot",
    tag: "v0.9",
    price: "$399",
    mrr: "—",
    mrrLabel: "—",
    desc: "n8n workflow that sweeps Google Ads search terms weekly, adds negatives, and reports in Slack.",
    tech: "n8n · Google Ads",
    status: "Beta",
  },
  {
    slug: "brief-to-quote",
    n: "05",
    name: "Brief-to-Quote",
    tag: "v1.2",
    price: "$29",
    mrr: "$87/mo",
    mrrLabel: "$87/mo MRR",
    desc: "A single Notion page that turns a discovery-call transcript into a fixed-price quote in under 20 minutes.",
    tech: "Notion",
    status: "Live",
  },
  {
    slug: "local-schema",
    n: "06",
    name: "Local Schema Generator",
    tag: "v1.1",
    price: "Free",
    mrr: "—",
    mrrLabel: "—",
    desc: "Paste your GBP details, get LocalBusiness + Service schema JSON-LD. No sign-up. No email capture.",
    tech: "Web app",
    status: "Free",
  },
];

export const featuredKits = kits.slice(0, 3);
