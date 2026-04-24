export interface ServiceData {
  crumb: string;
  eyebrow: string;
  headline: [string, string];
  problem: string;
  price: string;
  priceSub: string;
  timeline: string;
  deliverable: string;
  revisions: string;
  included: string[];
  process: { h: string; d: string; body: string }[];
  cs: { stat: string; sstat: string; title: string; body: string };
  faq: { q: string; a: string }[];
}

export const SERVICE_DATA: Record<string, ServiceData> = {
  web: {
    crumb: "Websites",
    eyebrow: "Websites · Next.js · conversion-first",
    headline: ["Your site isn't broken.", "It just isn't selling."],
    problem:
      "Most Melbourne business sites are brochures that forgot to ask for the sale. I rebuild them as one-person operators'—fast, honest, and pointed at a single qualified next step.",
    price: "$3,950",
    priceSub: "from · fixed · GST exclusive",
    timeline: "3–5 weeks",
    deliverable: "Repo + deploy + docs",
    revisions: "2 rounds",
    included: [
      "Discovery workshop — one 90-minute call, recorded",
      "Copy draft delivered before design starts",
      "Design in Figma — mobile and desktop, no hand-offs",
      "Next.js 15 build, TypeScript, Tailwind, MDX",
      "Deploy to Vercel — your account, you own it",
      "Cloudflare DNS + email routing set up",
      "Schema — LocalBusiness, Organization, BreadcrumbList",
      "Core Web Vitals green — LCP < 1.2s target",
      "Accessibility — WCAG 2.2 AA, keyboard-first",
      "Analytics — Vercel + PostHog wired in",
      "Cal.com or Calendly embed with qualification",
      "One month of post-launch tweaks included",
    ],
    process: [
      {
        h: "Scope",
        d: "Week 0",
        body: "One 90-minute call. I leave with a brief. You leave with a fixed price.",
      },
      {
        h: "Copy",
        d: "Week 1",
        body: "I write the first draft. You react. We settle the voice before a pixel moves.",
      },
      {
        h: "Design",
        d: "Week 2",
        body: "Mobile and desktop in Figma. One round of revisions built into the timeline.",
      },
      {
        h: "Build",
        d: "Weeks 3–4",
        body: "Next.js on Vercel. I ship to staging daily—you can watch it come together.",
      },
      {
        h: "Launch",
        d: "Week 5",
        body: "DNS, analytics, schema, Lighthouse audit. Walk-through recording for your team.",
      },
    ],
    cs: {
      stat: "+184%",
      sstat: "qualified intake calls · 90 days after launch",
      title: "Brunswick Legal Co. — from brochure to booking engine",
      body: "The old site buried the price and the contact form behind six menu items. I cut it to one CTA, published a fixed-fee schedule, and wired Calendly to their intake form. Organic traffic stayed flat. Bookings didn't.",
    },
    faq: [
      {
        q: "Do I own the site at the end?",
        a: "Yes. The repo, the Vercel project, the domain, the analytics—all in your accounts from day one. I'm listed as a collaborator; you're the owner.",
      },
      {
        q: "What if I already have a designer?",
        a: "Fine—bring them. I'll build to Figma, and the scope drops by about 25%. Tell me upfront so we skip the design phase in the quote.",
      },
      {
        q: "Can you work with WordPress / Shopify / Webflow?",
        a: "Webflow and Shopify, yes. WordPress, no—I stopped taking WP work in 2023 and won't be talked back in. If you're on WP and want to stay, I'll refer you to someone good.",
      },
      {
        q: "What happens if the scope grows?",
        a: "We have a short conversation, I send a firm add-on quote, you say yes or no. No time-and-materials surprises at invoice time.",
      },
      {
        q: "Do you offer payment plans?",
        a: "Fifty percent to start, fifty percent at launch. For Growth and Operator, monthly is fine. No deposits below $1k.",
      },
    ],
  },
  ads: {
    crumb: "Google Ads",
    eyebrow: "Google Ads · search + PMax · Melbourne-first",
    headline: ["Ads that pay for themselves.", "Or they stop running."],
    problem:
      "Most small-business Ads accounts are leaking 30–60% of budget on broad match, auto-applied recommendations, and campaigns no one has touched in a year. I fix that, then I grow what's left.",
    price: "$1,500",
    priceSub: "per month · 2-month minimum",
    timeline: "10-day build",
    deliverable: "Live account + weekly report",
    revisions: "Weekly tuning",
    included: [
      "Account audit — what to kill, what to keep",
      "Keyword + negative keyword build — exact and phrase only",
      "Up to 3 campaigns — Search + one Performance Max asset group",
      "Landing-page review — I'll fix the copy if it's the bottleneck",
      "Conversion tracking — GA4, enhanced conversions, offline upload",
      "Weekly 20-minute Loom with the numbers",
      "Monthly call — strategy, not reporting theatre",
      "You own the account. Always. No agency MCC lock-in.",
    ],
    process: [
      {
        h: "Audit",
        d: "Days 1–3",
        body: "I read your account, not a template. You get a 2-page memo with what I'd kill today.",
      },
      {
        h: "Plan",
        d: "Day 4",
        body: "30-minute call to agree which campaigns stay, which get rebuilt, which get paused.",
      },
      {
        h: "Build",
        d: "Days 5–10",
        body: "Keywords, ads, landing tweaks, tracking. Launched in the second week.",
      },
      {
        h: "Tune",
        d: "Weekly",
        body: "Search terms, negatives, bid caps, creative swaps. Small moves, every week.",
      },
      {
        h: "Review",
        d: "Monthly",
        body: "One honest call. What worked, what didn't, what we're trying next month.",
      },
    ],
    cs: {
      stat: "−62%",
      sstat: "cost per booking · 45 days",
      title: "Kairos Clinic — from 'Ads don't work' to a 3× ROAS",
      body: "Three campaigns quietly burning $40 a day on unqualified searches. Killed two, rebuilt one around high-intent suburb terms, added a pre-qualification dropdown to the landing page. Bookings doubled. Cost halved.",
    },
    faq: [
      {
        q: "Do you need me to sign over the account?",
        a: "No. You stay the owner; I'm a manager-level user. Fire me Friday, you still have the account Monday.",
      },
      {
        q: "What budget should I bring?",
        a: "For a Melbourne service business, $1.5–6k/month in ad spend is where this usually pays off. Below $800/month, Google's algorithms don't get enough data to work.",
      },
      {
        q: "Will you use AI-generated ads?",
        a: "I'll draft with an LLM to save time, then rewrite. Google's auto-apply suggestions stay off. Responsive search ads yes, 'AI Max' no—at least until it stops lighting money on fire.",
      },
      {
        q: "What about Meta / TikTok / LinkedIn?",
        a: "I don't run them. I know people who do, and I'll introduce you if that's where your customers actually are. Pretending to be a generalist helps no one.",
      },
      {
        q: "Two-month minimum—why?",
        a: "Month one is almost always a loss while I clean up. I don't want to charge you for that and walk.",
      },
    ],
  },
  seo: {
    crumb: "SEO",
    eyebrow: "SEO · technical · local · Australian English",
    headline: ["Ranking isn't magic.", "It's fewer, better pages."],
    problem:
      "Most SEO pitches are 40-suburb doorway pages and monthly 'content packages' that no one reads. That's not going to work in 2026. Fewer pages, written for a real reader, technically sharp—that does.",
    price: "$1,200",
    priceSub: "per month · 3-month minimum",
    timeline: "2-week setup",
    deliverable: "Audit, tracker, monthly report",
    revisions: "Continuous",
    included: [
      "Technical audit — Core Web Vitals, crawl, schema, canonicals",
      "Local setup — Google Business Profile, citations, reviews flow",
      "Keyword map — 10–20 pages, not 200",
      "Content plan — 2 to 4 real posts per month",
      "On-page fixes, monthly — titles, meta, internal links, schema",
      "Backlinks — earned, not bought. No PBNs, no link packages.",
      "Tracker — your rankings, plus the ones I'll admit to missing",
      "Monthly strategy call — 30 minutes, no dashboard cosplay",
    ],
    process: [
      {
        h: "Audit",
        d: "Week 1",
        body: "Technical + content + local. You get a prioritised fix list, worst-to-best.",
      },
      {
        h: "Fix",
        d: "Week 2",
        body: "I ship the technical wins first. Redirects, schema, speed, internal links.",
      },
      {
        h: "Write",
        d: "Monthly",
        body: "2–4 posts. I draft, you approve, a subject-matter editor polishes.",
      },
      {
        h: "Earn",
        d: "Ongoing",
        body: "Outreach, partnerships, data stories. Things that deserve a link.",
      },
      {
        h: "Review",
        d: "Monthly",
        body: "One call. What moved, what didn't, what we're betting on next month.",
      },
    ],
    cs: {
      stat: "+310%",
      sstat: "organic traffic · 6 months",
      title: "North Dental — from page 3 to top-3 for 14 suburb terms",
      body: "Cut 60 low-value blog posts. Merged 12 thin service pages into 4 good ones. Rebuilt the GBP with proper services and photos. Wrote 8 real articles over 6 months. The chart goes up and to the right—because the site finally deserved it.",
    },
    faq: [
      {
        q: "How long until I see results?",
        a: "Technical wins show up in 2–6 weeks. Content and local: 3–6 months. If someone quotes you 30 days, walk out.",
      },
      {
        q: "Are you going to make me 40 suburb pages?",
        a: "No. Programmatic doorway pages have never aged well, and they age worse under the 2024+ spam updates. I'll build 4–8 excellent local pages.",
      },
      { q: "Do you guarantee rankings?", a: "No. Anyone who does is either lying or about to be." },
      {
        q: "Can you do the writing too?",
        a: "Yes—drafts in my voice or yours, edited by a subject-matter person. If I'm learning your field, I'll tell you.",
      },
      {
        q: "Do you use AI content?",
        a: "For drafts and research, yes. For publishing, only after a full human rewrite. Pure AI content is not ranking in 2026; I'm not about to gamble your site on it.",
      },
    ],
  },
  automation: {
    crumb: "Automation",
    eyebrow: "Automation · internal tools · integrations",
    headline: ["The software's out there.", "It just isn't talking to itself."],
    problem:
      "Your team is copying things between five tools, and one of them is a spreadsheet named 'FINAL_v7'. I wire up what you already own—and build the small internal tools that remove the worst of the drudgery.",
    price: "$5,000",
    priceSub: "from · scoped per project",
    timeline: "2–6 weeks",
    deliverable: "Running workflows + docs",
    revisions: "Built-in",
    included: [
      "Process audit — map what you actually do, not the org chart",
      "Zapier, Make, or n8n — whichever fits the budget and ops team",
      "Internal dashboards — Retool, Appsmith, or custom Next.js",
      "Integrations — HubSpot, Airtable, Notion, Stripe, Xero, Attio",
      "Webhook glue — the bit consultants skip",
      "Error handling + alerting — because silent failures are worse",
      "Handover docs — a Loom per workflow, in plain English",
      "30 days of fixes post-launch",
    ],
    process: [
      {
        h: "Map",
        d: "Days 1–5",
        body: "One session per team. I come back with a diagram and the top 5 wins.",
      },
      {
        h: "Pick",
        d: "Day 6",
        body: "Agree scope. Quoted fixed. Usually 2–5 workflows in v1.",
      },
      {
        h: "Build",
        d: "Weeks 2–4",
        body: "Ship one workflow a week. Real data, not demo data.",
      },
      {
        h: "Hand over",
        d: "Week 5",
        body: "Docs, Loom walk-throughs, access handed off. You can fire me.",
      },
      {
        h: "Tune",
        d: "30 days",
        body: "Bug fixes and small tweaks included. After that, monthly retainer or pay per tweak.",
      },
    ],
    cs: {
      stat: "14 hrs",
      sstat: "per week saved · first 60 days",
      title: "TapCraft Trade — form-to-schedule, zero double entry",
      body: "Three people were retyping every website enquiry into SimPRO, every day. I wired the forms straight into SimPRO via webhook, pushed the confirmed bookings back to Google Calendar, and sent the owner a daily digest. Nobody copies anything anymore.",
    },
    faq: [
      {
        q: "Zapier vs Make vs n8n—which?",
        a: "Zapier for teams without an ops engineer. Make when the logic gets branchy. n8n if you want self-hosted and have someone to babysit it. I'll recommend, not push.",
      },
      {
        q: "Will this survive when the tools change?",
        a: "Nothing survives forever. I document every workflow, alert on failures, and review what's still useful each month if you're on Operator.",
      },
      {
        q: "Do you replace our SaaS?",
        a: "Rarely. Most teams have the right tools; they're just not connected. I only build custom software when the off-the-shelf option genuinely doesn't exist.",
      },
      {
        q: "Security?",
        a: "Least-privilege creds, secrets in a vault, SSO where your plan supports it. For anything touching PII, I'll scope to your risk tolerance before we start.",
      },
      {
        q: "AI agents?",
        a: "For narrow tasks—classification, extraction, drafting—yes. For 'an AI that runs my ops'—no, and anyone selling that in 2026 is selling you a demo.",
      },
    ],
  },
};

export const SERVICE_SLUGS = Object.keys(SERVICE_DATA);
