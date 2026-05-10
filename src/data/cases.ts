export type CaseMeta = { k: string; v: string };
export type ResultCell = [label: string, stat: string, sub: string];
export type Decision = [heading: string, body: string];
export type Problem = string;
export type MediaItem = { src: string; type: "image" | "video"; label: string };

export type CaseStudy = {
  slug: string;
  hidden?: boolean;
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
    thumbnail: "/work/hoddle/mentor-rec.webp",
    stat: "2nd",
    sstat: "Study Melbourne Leadership 4Impact",
    tag: "Apps",
    client: "Hoddle Melbourne",
    kind: "International student mentorship · Melbourne",
    year: "2026",
    eyebrow: "EdTech startup · Study Melbourne 4Impact · 2026",
    headline: "Hoddle Melbourne—\nfull mentorship platform,",
    headlineAccent: "built in six weeks.",
    description:
      "First-year international students arrive in Melbourne without the informal networks domestic students rely on. We built the platform that fills that gap — weighted mentor matching, a content library, community forums, live Q&A sessions, and a self-sustaining cycle where students graduate into mentors themselves. Placed 2nd at Study Melbourne's 4Impact Program.",
    meta: [
      { k: "Industry", v: "EdTech · international student mentorship" },
      { k: "Location", v: "Carlton, VIC" },
      { k: "Scope", v: "Full-stack platform · matching · community" },
      { k: "Stack", v: "Next.js 16 · Supabase · Tiptap · Tailwind v4" },
      { k: "Timeline", v: "6 weeks (Mar–Apr 2026)" },
      { k: "Live", v: "hoddle.org" },
    ],
    results: [
      ["Study Melbourne 4Impact", "2nd", "final pitch day — ranked 2nd of all competing teams"],
      ["LinkedIn impressions", "14,040", "before public launch · organic early-access traction"],
      ["Codebase", "26K+ lines", "51 routes · 23 tables · 17 migrations · 3 cron jobs"],
    ],
    brief: {
      quote:
        "\"International students land in Melbourne without the networks domestic students grow up with. We needed a platform that could match them with verified seniors, let mentors share knowledge at scale, and build a community worth coming back to. Six weeks, one developer.\"",
      attribution: "Hoddle Melbourne · Study Melbourne Leadership 4Impact 2026",
    },
    problems: [
      "First-year international students arrive in Melbourne without the informal knowledge networks domestic students lean on — academic conventions, career pathways, housing, visa admin. No platform gave them access to verified peers who'd already navigated the same journey.",
      "One-to-many was the only model that worked at scale. 1:1 tutoring creates scheduling bottlenecks. Mentors needed to publish articles, host live Q&As, and engage forums — reaching many students from a single piece of effort, without calendar overhead.",
      "Six weeks from Figma concept to production. The team was competing in the Study Melbourne Leadership 4Impact Program with a hard public deadline. Every architectural decision had to be defensible, deployable, and maintainable by the founding team post-launch.",
    ],
    decisions: [
      [
        "RLS as the authorisation layer",
        "Row Level Security enforces data access at the database layer — not the application layer. Every table has explicit RLS policies from day one. A bug in middleware can expose data; a bug in application code cannot bypass RLS. The admin client is the only surface that bypasses RLS — used only for system operations.",
      ],
      [
        "Weighted matching algorithm",
        "scoreMentor() is a pure function — zero database calls. country_of_origin match +30 (shared migration context is the strongest signal), field overlap +15 each, challenges and goals overlap +10 each. Scores pre-computed nightly via Vercel cron; recomputed immediately on profile update. Students see a 'why this mentor' reasoning line on their dashboard.",
      ],
      [
        "Token-gated mentor invites",
        "Admin sends an invite → row written to mentor_invites with a hashed token, 14-day expiry, and full audit columns. Owning the invite row means owning the full lifecycle: custom expiry, re-invite without blocking, revocation, and reuse prevention. No dependency on third-party link delivery.",
      ],
      [
        "One-to-many content model",
        "Mentors author articles with a Tiptap rich-text editor, embed YouTube/Vimeo via URL, and attach downloadable resources with signed storage URLs. Community forums have two-level nested replies, 4 reaction types, and anonymous posting for sensitive questions. Live Q&A sessions with capacity limits and post-session recording storage.",
      ],
      [
        "Supabase Realtime notifications",
        "In-app notification bell subscribes to the notifications table via Supabase Realtime — unread count stays live without polling. Single notify() helper writes to the table and conditionally dispatches email based on per-type, per-channel preference toggles. 6 notification types across 3 delivery channels.",
      ],
      [
        "Vercel + preview deploys",
        "Every PR gets a preview URL. Co-founders reviewed each feature in context before merge. No surprises on pitch day. Three Vercel cron jobs handle the full session lifecycle and nightly recommendation recompute.",
      ],
    ],
    testimonial: {
      quote:
        "\"We had the idea, we had people who were interested — but the solution that Sam put together really brought the product to life. Usually the website is the cherry on top, but for us, Hoddle became the cake.\"",
      name: "Chirag P Agarwal",
      role: "Co-founder · Hoddle Melbourne",
    },
    media: [
      { src: "/work/hoddle/demo.mp4", type: "video", label: "Platform walkthrough" },
      { src: "/work/hoddle/mobile.webp", type: "image", label: "Mobile · 390px" },
      { src: "/work/hoddle/mentor-rec.webp", type: "image", label: "Matching recommendations" },
      { src: "/work/hoddle/forum.mp4", type: "video", label: "Community forums" },
      { src: "/work/hoddle/mentors.mp4", type: "video", label: "Mentor profiles" },
      { src: "/work/hoddle/dashboard.mp4", type: "video", label: "Student dashboard · mentor matches" },
    ],
  },
  {
    slug: "tapcraft",
    hidden: true,
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
    stat: "1–3 s",
    sstat: "task-to-calendar latency · schedule-on-write",
    tag: "Apps",
    client: "Kairos",
    kind: "AI scheduling app · solo-built",
    year: "2025",
    eyebrow: "Scheduling SaaS · solo-built · 2025–2026",
    headline: "Kairos—\npaste your notes,",
    headlineAccent: "own your week.",
    description:
      "Most people don't need another task list. They need something that turns the tasks they already have into a plan they'll actually follow. Kairos takes unstructured notes, extracts tasks using an LLM, and places them into Google Calendar automatically — respecting deadlines, dependencies, and your working hours. No drag and drop. No manual time-blocking.",
    meta: [
      { k: "Type", v: "Solo product · Clupai" },
      { k: "Stack", v: "Next.js 15 · Drizzle · Neon · Vercel AI SDK · Better Auth · Google Calendar API" },
      { k: "Timeline", v: "2025–2026 · 5 phases" },
      { k: "Status", v: "Live beta · v1.0.0 pending" },
      { k: "Self-host", v: "MIT · Docker Compose · one-click Vercel deploy" },
      { k: "Live", v: "kairos.clupai.com" },
    ],
    results: [
      ["Schedule latency", "1–3 s", "task created → placed on Google Calendar · schedule-on-write"],
      ["Plugins at launch", "10", "text, Instagram, Twitter, Readwise, voice, GitHub, Notion, Linear, email, Slack"],
      ["Phases shipped", "5", "scheduling → recurrence → plugin host → marketplaces → collections"],
    ],
    brief: {
      quote:
        "\"Every scheduling app I tried had the same problem: it stored my tasks but it didn't do anything with them. I wanted something that would look at everything I had on, figure out when I could actually do it, and put it on my calendar — without me touching a single slot.\"",
      attribution: "Sam Limbu · Founder, Kairos",
    },
    problems: [
      "Task managers are good at storage. They're bad at time. Nothing connected 'things I need to do' with 'when I can actually do them' without hours of manual scheduling.",
      "Adding a new input source — say, pulling tasks from GitHub Issues or a Slack message — shouldn't require touching the core app. Every integration being a one-off made the codebase fragile and the system hard to extend.",
      "The theme system needed to be community-extensible without any risk of a bad theme breaking the layout. Hand-rolled design tokens with no enforcement meant this was impossible to delegate.",
    ],
    decisions: [
      [
        "Schedule-on-write",
        "Creating or updating a task automatically enqueues a placement job via the Postgres jobs table. Scheduling completes in 1–3 s within the same Vercel function call — no separate trigger, no user action required. Idempotency keys prevent duplicates under concurrent saves.",
      ],
      [
        "Plugin host with PluginContext",
        "Every scratchpad plugin gets a PluginContext — complete/completeStructured for LLM access, config, memory, logging — without core importing any provider SDK. Adding a new input source (Readwise, GitHub, Linear) is a PR to the public registry. 10 plugins shipped at launch without a single core change.",
      ],
      [
        "HTTP plugin runtime",
        "Plugin authors deploy their own serverless function exposing GET /manifest and POST /parse. Kairos calls via lib/plugins/http-adapter.ts — HMAC-signed requests, 5 s timeout, circuit breaker (3 failures / 1 min → 5 min open). Supports version rollback. No third-party code runs inside the Kairos runtime.",
      ],
      [
        "Semantic token enforcement in CI",
        "A custom ESLint rule (no-raw-colors) bans hex literals and raw Tailwind colour utilities in component files. Components reference semantic tokens only. Theme marketplace themes compile to CSS at install time. Safe to accept community submissions without manual design review.",
      ],
      [
        "LLM provider abstraction",
        "lib/llm/ is the only place provider SDKs are allowed. All other code goes through PluginContext.complete() or Vercel AI SDK streamText. Switching OpenAI → Anthropic → Ollama is one env var. Self-hosters bring their own keys.",
      ],
      [
        "Collections as coordination, not taxonomy",
        "Tags handle taxonomy. Google Calendar handles time. Collections handle coordination — grouping tasks into ordered phases (Planning → Build → Review) with progress tracking and bulk-schedule. No collectionId on the tasks table; many-to-many keeps tasks portable across collections.",
      ],
    ],
    thumbnail: "/work/kairos/tasks.webp",
    media: [
      { src: "/work/kairos/kairos-demo.mp4", type: "video", label: "Core flow · scratchpad → tasks → calendar" },
      { src: "/work/kairos/mobile.webp", type: "image", label: "Mobile · 375px" },
      { src: "/work/kairos/schedule.mp4", type: "video", label: "Schedule view · tasks placed on timeline" },
      { src: "/work/kairos/collections.mp4", type: "video", label: "Collections · phases · Phase 5d" },
      { src: "/work/kairos/tasks.webp", type: "image", label: "Task list · obsidian-linear theme" },
      { src: "/work/kairos/scratchpad.mp4", type: "video", label: "Scratchpad · text → extracted candidates" },
    ],
  },
  {
    slug: "dsec",
    hidden: true,
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
    hidden: true,
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

export const visibleCases = cases.filter((c) => !c.hidden);

export function getCaseBySlug(slug: string): CaseStudy | undefined {
  return visibleCases.find((c) => c.slug === slug);
}
