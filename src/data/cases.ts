export type CaseMeta = { k: string; v: string };
export type ResultCell = [label: string, stat: string, sub: string];
export type Decision = [heading: string, body: string];
export type Problem = string;
export type MediaItem = { src: string; type: "image" | "video"; label: string };

export type CaseStudy = {
  slug: string;
  stat: string;
  sstat: string;
  tag: string;
  client: string;
  kind: string;
  year: string;
  eyebrow: string;
  headline: string;
  headlineAccent: string;
  description: string;
  meta: CaseMeta[];
  results: ResultCell[];
  brief: { quote: string; attribution: string };
  problems: Problem[];
  decisions: Decision[];
  testimonial?: { quote: string; name: string; role: string };
  thumbnail?: string;
  media?: MediaItem[];
};

export const cases: CaseStudy[] = [
  {
    slug: "king-double-glazing",
    thumbnail: "/work/kdg/homepage.webp",
    stat: "75→99",
    sstat: "Performance · desktop · Lighthouse",
    tag: "Websites",
    client: "King Double Glazing",
    kind: "Retrofit glazing · Melbourne",
    year: "2026",
    eyebrow: "Retrofit glazing · Melbourne · 2026",
    headline: "King Double Glazing—\nrebrand, rebuild,",
    headlineAccent: "conversion funnel.",
    description:
      "Melbourne retrofit double glazing business. Previous brand (The Glass Discounters) had a 57 Lighthouse score and 13.1s mobile LCP. Rebuilt from scratch under a new brand — conversion-first architecture, self-serve Instant Estimate Tool, and a perfect 100 SEO score out of the gate.",
    meta: [
      { k: "Industry", v: "Retrofit double glazing · trades" },
      { k: "Location", v: "Melbourne, VIC" },
      { k: "Scope", v: "Rebrand · website · conversion funnel" },
      { k: "Stack", v: "Next.js 16 · TinaCMS · Neon · Drizzle · Resend · Tailwind v4" },
      { k: "Timeline", v: "5 weeks" },
      { k: "Live", v: "kingdoubleglazing.com.au" },
    ],
    results: [
      ["Desktop performance", "99", "from 75 on the old Glass Discounters site"],
      ["Mobile performance", "85", "from 57 · LCP 4.4s · TBT 20ms · CLS 0"],
      ["SEO score", "100", "Lighthouse · Best Practices 100 · schema complete"],
    ],
    brief: {
      quote:
        "\"The old site was slow, the brand felt dated, and we had no way to give customers a price before they called. We needed a full restart — new name, new site, something that filters serious buyers before they ring my phone.\"",
      attribution: "Client, King Double Glazing",
    },
    problems: [
      "The Glass Discounters (prior brand) had a Lighthouse Performance score of 57 on mobile — 13.1s LCP and 370ms total blocking time. Customers bounced before the page loaded.",
      "No way for customers to self-serve a price estimate. Every enquiry went straight to the phone — including price-shoppers and tyre-kickers with no intent to buy.",
      "A full rebrand to King Double Glazing needed a clean break: new positioning, new brand voice, and a site built from scratch rather than patching the old WordPress stack.",
    ],
    decisions: [
      [
        "Next.js 16 + Vercel",
        "Rebuilt from scratch on Next.js 16 App Router. No plugin bloat, no page builder. Desktop LCP 1.0s, mobile LCP 4.4s. TBT 20ms across both — down from 370ms on the old site.",
      ],
      [
        "Instant Estimate Tool",
        "Multi-step calculator that produces a price range before asking for contact details. Reverses the standard trades lead-gen pattern — qualify first, capture second. Reduces junk enquiries before they reach the phone.",
      ],
      [
        "5-page conversion funnel",
        "Original plan was a 27-route SEO content cluster. Mid-project pivot to a tight 5-page funnel pointing every visitor to one action: the estimate tool. SEO infrastructure (schema, sitemap, suburb page template) is in place for future expansion without a rebuild.",
      ],
      [
        "TinaCMS (git-based)",
        "Content stored as JSON in the repo — no external CMS database. Visual editor via Tina Cloud. Client can edit pages without touching code or needing a developer.",
      ],
      [
        "Neon + Drizzle",
        "Postgres on Neon with Drizzle ORM. All quote and lead submissions stored here. Token-based email confirmation flow — only confirmed quote requests get flagged as hot leads.",
      ],
      [
        "Resend + React Email",
        "Transactional email pipeline with DKIM/SPF/DMARC configured. Two-step quote confirmation: customer clicks a token link before KDG receives the lead notification. Filters junk at the email layer.",
      ],
    ],
    testimonial: {
      quote:
        "\"The calculator came out exactly how I had it in my head. Sam showed me every update as he built it — I could see the changes straight away and tell him what I wanted. I felt in control the whole way through.\"",
      name: "Tas",
      role: "King Double Glazing · Melbourne",
    },
    media: [
      { src: "/work/kdg/homepage.mp4", type: "video", label: "Home · 1440px" },
      { src: "/work/kdg/mobile.webp", type: "image", label: "Mobile · 375px" },
      { src: "/work/kdg/quote.mp4", type: "video", label: "Instant Estimate Tool" },
      { src: "/work/kdg/services.mp4", type: "video", label: "Services · full scroll" },
      { src: "/work/kdg/gallery.webp", type: "image", label: "Gallery" },
      { src: "/work/kdg/about.webp", type: "image", label: "About" },
    ],
  },
  {
    slug: "hoddle-melbourne",
    stat: "0→live",
    sstat: "full platform · 6 weeks",
    tag: "Websites",
    client: "Hoddle Melbourne",
    kind: "Mentorship platform · Carlton",
    year: "2026",
    eyebrow: "Mentorship platform · Carlton · 2026",
    headline: "Hoddle Melbourne—\nzero to a live",
    headlineAccent: "mentorship platform in six weeks.",
    description:
      "A Melbourne mentorship startup needed a full product—booking flows, mentor profiles, availability logic, and a payment layer—built and shipped in six weeks. We took it from a Figma file to a live platform.",
    meta: [
      { k: "Industry", v: "Education · mentorship" },
      { k: "Location", v: "Carlton, VIC" },
      { k: "Scope", v: "Full-stack platform · booking · payments" },
      { k: "Stack", v: "Next.js 16 · Supabase · Stripe · Tailwind v4" },
      { k: "Timeline", v: "6 weeks" },
      { k: "Live", v: "hoddlemelbourne.com" },
    ],
    results: [
      ["Time to launch", "6 wks", "Figma handoff to production deploy"],
      ["Booking flow", "3 steps", "down from a 9-field intake form"],
      ["Stack", "Next.js 16", "Supabase · Stripe · Tailwind v4 · Vercel"],
    ],
    brief: {
      quote:
        "\"We had a concept and a deadline. We needed someone who could take the design and build the actual product—auth, bookings, payments, the lot—without hand-holding.\"",
      attribution: "Founder, Hoddle Melbourne",
    },
    problems: [
      "No product existed—only a Figma file and a six-week runway before the first cohort intake.",
      "Mentor availability was complex: time zones, buffer rules, and recurring blocks that had to sync with Google Calendar.",
      "Payments needed to handle upfront booking fees, refund windows, and mentor payout splits without custom billing infrastructure.",
    ],
    decisions: [
      [
        "Next.js 16 + Supabase",
        "App Router for the full stack. Supabase for auth, real-time availability, and row-level security. No custom backend to maintain.",
      ],
      [
        "Stripe Connect",
        "Stripe Connect for split payments. Mentors onboard once, bookings settle automatically. Refund logic built into the booking state machine.",
      ],
      [
        "Availability engine",
        "Mentor availability stored as weekly recurring blocks with exception overrides. Client-side calendar renders from a single API call.",
      ],
      [
        "3-step booking",
        "Select mentor → pick slot → pay. No account required to book. Email confirmation + calendar invite fired on Stripe webhook.",
      ],
      [
        "RLS from day one",
        "Every Supabase table locked with row-level security. Mentors only see their own bookings. No admin exposure by default.",
      ],
      [
        "Vercel + preview deploys",
        "Every PR gets a preview URL. Founder reviewed each feature in context before merge. No surprises on launch day.",
      ],
    ],
  },
  {
    slug: "tapcraft",
    stat: "3D+shop",
    sstat: "headless Shopify",
    tag: "Websites",
    client: "TapCraft Studio",
    kind: "NFC products · Melbourne",
    year: "2026",
    eyebrow: "NFC products · Melbourne · 2026",
    headline: "TapCraft—\n3D product configurator meets",
    headlineAccent: "headless Shopify.",
    description:
      "TapCraft sells custom NFC-embedded products. They needed a site that felt as premium as the hardware—interactive 3D previews, a live configurator, and a headless Shopify checkout. We built it.",
    meta: [
      { k: "Industry", v: "Consumer hardware · NFC" },
      { k: "Location", v: "Melbourne, VIC" },
      { k: "Scope", v: "Website · 3D configurator · Shopify headless" },
      {
        k: "Stack",
        v: "Next.js 16 · Three.js · Shopify Storefront API · Tailwind v4",
      },
      { k: "Timeline", v: "7 weeks" },
      { k: "Live", v: "tapcraftstudio.com" },
    ],
    results: [
      ["3D renderer", "60fps", "on mid-range mobile, no quality compromise"],
      ["Checkout", "headless", "Shopify cart + payment, custom UI throughout"],
      ["Stack", "Three.js", "Next.js 16 · Shopify API · Tailwind v4"],
    ],
    brief: {
      quote:
        "\"Every other NFC product site looks like a Shopify template. We make hardware that people show off—the site needed to match that energy.\"",
      attribution: "Founder, TapCraft Studio",
    },
    problems: [
      "Off-the-shelf Shopify themes couldn't support a live 3D preview—customers couldn't see their NFC card design before buying.",
      "Product variants (material, finish, embedded data) drove a combinatorial explosion that standard product pages couldn't handle cleanly.",
      "The checkout UX needed to stay branded end-to-end, not drop into Shopify's hosted checkout mid-flow.",
    ],
    decisions: [
      [
        "Three.js configurator",
        "Custom Three.js scene with GLTF models for each product. Finish and material swaps happen in real-time via texture replacement. 60fps on mid-range mobile.",
      ],
      [
        "Shopify Storefront API",
        "Headless checkout via Storefront API. Cart lives in React context, Shopify handles fulfilment. Brand stays consistent until payment.",
      ],
      [
        "Variant state machine",
        "Configuration state modelled as a flat object—material, finish, embedded URL. Maps directly to a Shopify variant SKU. No nested selects.",
      ],
      [
        "Next.js Image",
        "Product photography served via next/image with AVIF. Fallback for the 3D canvas when WebGL is unavailable.",
      ],
      [
        "Static PDP shell",
        "Product detail page pre-rendered at build time with ISR. The configurator hydrates client-side. Fast first paint, no SSR 3D flicker.",
      ],
      [
        "Analytics events",
        "Custom events fire on configurator interactions and add-to-cart. Gives the founder real data on which finishes convert vs. which ones browsers browse.",
      ],
    ],
  },
  {
    slug: "kairos",
    stat: "v2",
    sstat: "scheduling API · plugin system",
    tag: "Apps",
    client: "Kairos",
    kind: "Scheduling product · solo-founded",
    year: "2025",
    eyebrow: "Scheduling SaaS · solo-founded · 2025",
    headline: "Kairos v2—\na scheduling API with",
    headlineAccent: "a real plugin system.",
    description:
      "Kairos is a scheduling product built by a solo founder. v1 was a working MVP. v2 needed a public API, a plugin architecture for third-party integrations, and a dashboard that didn't feel like a Shadcn starter.",
    meta: [
      { k: "Industry", v: "Productivity · scheduling SaaS" },
      { k: "Founded", v: "Solo-founded" },
      { k: "Scope", v: "API v2 · plugin system · dashboard redesign" },
      { k: "Stack", v: "Next.js 16 · tRPC · Postgres · Tailwind v4" },
      { k: "Timeline", v: "8 weeks" },
      { k: "Status", v: "Beta · invite-only" },
    ],
    results: [
      ["API surface", "v2", "typed, versioned, documented from day one"],
      ["Plugin system", "live", "third-party hooks via signed webhooks"],
      ["Stack", "tRPC", "Next.js 16 · Postgres · Tailwind v4"],
    ],
    brief: {
      quote:
        "\"v1 worked but it was a mess internally. I needed a proper API so integrations could be built on top, and a dashboard that I wasn't embarrassed to show people.\"",
      attribution: "Founder, Kairos",
    },
    problems: [
      "v1 had no public API—every integration was a one-off webhook hack bolted onto the backend with no versioning or auth.",
      "The plugin system needed to be extensible without giving third-party code execution inside the app's runtime.",
      "The dashboard was a Shadcn starter with minimal customisation. It worked but it didn't feel like a product.",
    ],
    decisions: [
      [
        "tRPC + versioned REST",
        "Internal calls via tRPC for type safety. Public-facing API versioned REST with OpenAPI spec generated from Zod schemas. Breaking changes are explicit.",
      ],
      [
        "Signed webhook plugins",
        "Plugins receive signed webhook events—no SDK required. Third parties verify the signature, react to events, and POST back actions. No code in our runtime.",
      ],
      [
        "Plugin registry",
        "Simple YAML manifest per plugin. Describes events it subscribes to, the callback URL, and required scopes. Reviewed before activation.",
      ],
      [
        "Dashboard redesign",
        "Custom design system built on Tailwind v4 tokens. Component primitives only—no component library. Looks like a product, not a template.",
      ],
      [
        "Postgres + advisory locks",
        "Scheduling logic uses Postgres advisory locks for slot reservation. No Redis, no queue. Works correctly under concurrent booking pressure.",
      ],
      [
        "Audit log",
        "Every API write appended to an immutable audit log table. Founder can trace any change back to the request that caused it.",
      ],
    ],
  },
  {
    slug: "dsec",
    stat: "190+",
    sstat: "club members",
    tag: "Websites",
    client: "DSEC",
    kind: "Software engineering club · Deakin",
    year: "2025",
    eyebrow: "Student tech club · Deakin University · 2025",
    headline: "DSEC—\na club site that actually",
    headlineAccent: "gets students to show up.",
    description:
      "Deakin's software engineering club needed a site that communicated events, showcased projects, and recruited members. Not a Wix template—something that looked like it was built by people who know what they're doing.",
    meta: [
      { k: "Industry", v: "Education · student tech club" },
      { k: "Location", v: "Burwood, VIC · Deakin University" },
      { k: "Scope", v: "Website · events · member recruitment" },
      { k: "Stack", v: "Next.js 15 · Tailwind v4 · Notion API · Vercel" },
      { k: "Timeline", v: "3 weeks" },
      { k: "Live", v: "dsec.dev" },
    ],
    results: [
      ["Members", "190+", "from 60 before the new site launched"],
      ["Event signups", "3×", "compared to the previous semester"],
      ["Stack", "Next.js 15", "Notion API · Tailwind v4 · Vercel"],
    ],
    brief: {
      quote:
        "\"The old site was embarrassing. We're a software engineering club—our website shouldn't look like it was made in 2009. We wanted something that made new students actually want to join.\"",
      attribution: "President, DSEC",
    },
    problems: [
      "The previous site was a static HTML page with no way to update events without editing raw HTML—execs were skipping it entirely.",
      "Member count stagnated. New students visiting the site had no reason to sign up—no visible community, no clear value prop.",
      "Events had no recurring home. Announcements were scattered across Discord and Instagram with no canonical source.",
    ],
    decisions: [
      [
        "Notion as CMS",
        "Events and project showcases managed in Notion. Execs update a database, site rebuilds automatically via ISR. No one touches the code to post an event.",
      ],
      [
        "Social proof up front",
        "Member count, project gallery, and alumni outcomes above the fold. Answers the question 'why join?' before the visitor scrolls.",
      ],
      [
        "One-click membership",
        "Membership form reduced to email + cohort year. Syncs to a Notion database. No friction, no password, no waiting for an admin to approve.",
      ],
      [
        "Events feed",
        "Upcoming and past events pulled from Notion in real time. Each event gets its own page with RSVP link, location, and speaker bio.",
      ],
      [
        "Vercel + ISR",
        "Pages revalidate every 60 seconds. Execs see live changes without a deploy. Site stays fast—no API calls on the critical path.",
      ],
      [
        "Dark mode default",
        "Design system built dark-first. Looks native to the tools students already use—VS Code, GitHub, Discord. Not a corporate site.",
      ],
    ],
  },
  {
    slug: "krishnaveni-school",
    stat: "0 calls",
    sstat: "runtime CMS calls · content baked at build",
    tag: "Websites",
    client: "Krishnaveni School",
    kind: "School marketing website · India",
    year: "2026",
    eyebrow: "School website · India · 2026",
    headline: "Krishnaveni—\na school site with a CMS",
    headlineAccent: "staff can actually use.",
    description:
      "Indian school stuck on a static HTML site — any content change meant emailing a developer. Delivered a full Next.js 15 marketing website with 13 section types, a Sanity v5 CMS, and a custom content pipeline. Staff now manage all pages, posts, and facilities independently.",
    meta: [
      { k: "Industry", v: "Education · K-12 school" },
      { k: "Location", v: "India" },
      { k: "Scope", v: "Marketing website · headless CMS · handover" },
      { k: "Stack", v: "Next.js 15 · Sanity v5 · Tailwind v4 · GSAP · Radix UI · Vercel" },
      { k: "Delivered", v: "May 2026" },
      { k: "Live", v: "krishnavenischool.co.in" },
    ],
    results: [
      ["SEO score", "92", "Lighthouse · sitemap, robots, per-page metadata, semantic HTML"],
      ["Best Practices", "100", "Lighthouse · desktop and mobile · HTTPS, no console errors"],
      ["Dev touch post-handover", "0", "staff manage all content through Sanity Studio independently"],
    ],
    brief: {
      quote:
        "\"Any time we needed to update a page or post an announcement, we had to email a developer and wait. We needed to be able to do it ourselves.\"",
      attribution: "Client, Krishnaveni School",
    },
    problems: [
      "The school was running on a static HTML site. Every content change — a new gallery post, updated facilities list, announcement — required a developer. Staff had no autonomy.",
      "A standard CMS would still break if staff accidentally edited the wrong field or reordered sections. The system needed to be opinionated enough to protect the layout.",
      "Handover was a hard requirement. The school couldn't rely on ongoing developer availability — staff had to be self-sufficient from day one.",
    ],
    decisions: [
      [
        "Sanity v5",
        "Schema-first CMS with typed GROQ queries. Studio is clean and opinionated — staff adopted it without training docs. Validates all content before it reaches the frontend. Custom document types for posts, facilities, and page sections.",
      ],
      [
        "Polymorphic section architecture",
        "Page body is an array of typed section objects. SectionRenderer maps each _type to its React component. Any page layout can be assembled in Studio by reordering or adding sections — no code change, no redeploy. 13 section types at handover.",
      ],
      [
        "Static data pipeline",
        "fetch-sanity.mjs pulls a CMS snapshot → generate-data.mjs converts it into a typed TypeScript file baked into the bundle. Site runs with zero runtime CMS dependency. Trade-off: requires a script re-run and redeploy to pick up content changes, but keeps the production site fast and independent.",
      ],
      [
        "GSAP + Radix UI",
        "GSAP for scroll-driven animations. Radix UI Dialog for the video testimonial lightbox and post media gallery with keyboard navigation (Escape, arrow keys). Radix Accordion for FAQ sections. Scoped JS — no heavy framework overhead on pages that don't need interactivity.",
      ],
    ],
    testimonial: {
      quote:
        "\"We're not a technical team — we gave Samridh the brief and he handled everything else. What we asked for, he delivered. Then he delivered more.\"",
      name: "Krishnaveni School",
      role: "India",
    },
    thumbnail: "/work/krishnaveni/homepage.webp",
    media: [
      { src: "/work/krishnaveni/homepage.mp4", type: "video", label: "Home · desktop · 1440px" },
      { src: "/work/krishnaveni/mobile.webp", type: "image", label: "Mobile · 375px" },
      { src: "/work/krishnaveni/achievements_updates_via_sanity.mp4", type: "video", label: "Achievements · live Sanity update" },
      { src: "/work/krishnaveni/facilities.mp4", type: "video", label: "Facilities · full scroll" },
      { src: "/work/krishnaveni/about.mp4", type: "video", label: "About · full scroll" },
      { src: "/work/krishnaveni/contact.webp", type: "image", label: "Contact page" },
    ],
  },
  {
    slug: "farmers-intuition",
    stat: "24hr",
    sstat: "Hack48 · Mar 2026",
    tag: "Apps",
    client: "Farmers Intuition",
    kind: "Hackathon · FastAPI + Gemini",
    year: "2026",
    eyebrow: "Hackathon · Hack48 · March 2026",
    headline: "Farmers Intuition—\nbuilt and shipped in",
    headlineAccent: "under 24 hours.",
    description:
      "An AI-powered farm advisory tool built at Hack48 in March 2026. Farmers describe their conditions in plain language; Gemini returns actionable advice calibrated to soil type, season, and location. FastAPI backend, Next.js front end, deployed to Vercel before the judging window closed.",
    meta: [
      { k: "Event", v: "Hack48 · March 2026" },
      { k: "Category", v: "AgTech · AI tools" },
      { k: "Scope", v: "Full-stack prototype · AI integration" },
      { k: "Stack", v: "Next.js 16 · FastAPI · Gemini 2.0 · Vercel" },
      { k: "Timeline", v: "24 hours" },
      { k: "Result", v: "Finalist · Best AI Use" },
    ],
    results: [
      ["Build time", "24hr", "concept to deployed product"],
      ["AI model", "Gemini 2.0", "structured outputs · tool use"],
      ["Stack", "FastAPI", "Next.js 16 · Gemini · Vercel"],
    ],
    brief: {
      quote:
        "\"Most farm advice tools are either too generic or require a PhD to operate. We wanted something a farmer could use on their phone between paddocks—describe the problem, get a real answer.\"",
      attribution: "Team, Farmers Intuition",
    },
    problems: [
      "Existing AgTech tools assumed desktop use and structured data inputs—bad fit for a farmer with muddy hands and a 4G connection.",
      "Agricultural advice is highly contextual: the right answer depends on soil, season, crop stage, and location. Generic LLM output wasn't good enough.",
      "24 hours to build, test, and deploy. Every architectural decision had to be cheap to implement and easy to debug under pressure.",
    ],
    decisions: [
      [
        "Gemini 2.0 structured outputs",
        "Gemini returns typed JSON—advice category, confidence, recommended actions, caveats. No parsing hacks. The front end renders directly from the schema.",
      ],
      [
        "FastAPI backend",
        "Thin Python backend handles the Gemini call, injects soil and weather context via tool use, and returns structured advice. Deployed as a Vercel serverless function.",
      ],
      [
        "Plain-language input",
        "No forms—farmers describe the problem in one text field. System prompt injects location, season, and crop context from a minimal onboarding step.",
      ],
      [
        "Context injection via tools",
        "Gemini tool use fetches real-time weather and soil data for the farm's GPS coordinates. Advice is grounded in actual conditions, not generic assumptions.",
      ],
      [
        "Mobile-first UI",
        "Single-column layout, large tap targets, offline-tolerant. Designed for a phone screen in sunlight, not a 1440p monitor in an office.",
      ],
      [
        "Vercel + instant deploy",
        "Next.js front end and FastAPI functions both on Vercel. One repo, one deploy command, live URL for judges before the presentation slot.",
      ],
    ],
  },
];

export function getCaseBySlug(slug: string): CaseStudy | undefined {
  return cases.find((c) => c.slug === slug);
}
