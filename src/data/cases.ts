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
    slug: "nmmun",
    stat: "500+",
    sstat: "delegates served · live MUN conference",
    tag: "Websites",
    client: "NMMUN",
    kind: "Model UN conference · NMS Dwarka",
    year: "2023",
    eyebrow: "School MUN conference · New Delhi · 2023",
    headline: "NMMUN—\na conference site",
    headlineAccent: "shipped at fifteen.",
    description:
      "A full conference website for the New Millennium Model United Nations — councils, schedules, registration funnel, team profiles, gallery. Originally built at fifteen as Head of IT for the 2023 batch, then forked by the 2024-25 batch on the same codebase. 500+ delegates used it across two consecutive conferences.",
    meta: [
      { k: "Event", v: "New Millennium Model UN · NMS Dwarka" },
      { k: "Role", v: "Head of IT · 2023 · solo build" },
      { k: "Scope", v: "Conference website · councils · registration · gallery" },
      { k: "Stack", v: "Next.js 14 · Tailwind · shadcn/ui · Framer Motion · Embla" },
      { k: "Reuse", v: "Forked for NMMUN 2024-25 by the next batch" },
      { k: "Repo", v: "github.com/Clupai8o0/nmmun" },
    ],
    results: [
      ["Delegates served", "500+", "across two consecutive conference years"],
      ["Codebase reuse", "2 yrs", "forked by the 2024-25 batch on the same architecture"],
      ["Pages shipped", "8", "home, councils, council/[id], info, register, team, gallery, contact"],
    ],
    brief: {
      quote:
        "\"We needed a conference site that could carry the prestige of an international MUN — councils, chairs, schedules, registration — and still be maintainable by next year's IT lead. No CMS budget, no dev team, just one student.\"",
      attribution: "NMMUN'23 · New Millennium School Dwarka",
    },
    problems: [
      "Most school MUN sites are static HTML or a one-page Wix build. NMMUN'23 needed councils with per-committee detail pages, chair profiles, schedules, dress code, rules of procedure, and a registration funnel — all polished enough to represent the school internationally.",
      "Built solo as a Year 10 student before any commercial experience. Every architectural choice had to be defensible for the next batch's IT lead to inherit, not just functional for one event weekend.",
      "Content had to be event-aware. The hero, countdown, and CTAs needed to behave differently before, during, and after the conference without a manual swap on event day.",
    ],
    decisions: [
      [
        "Data-driven content layer",
        "All councils, teams, table-of-content blocks, and navigation pulled from lib/links.ts; hero copy, event timing, itineraries, and dress code from lib/config.ts. Next year's IT lead edits two files to roll the site forward — no hunting through JSX.",
      ],
      [
        "Event-aware UI via useTime",
        "Hero countdown, CTA states, and banners derive from eventDate/eventEndDate through a single useTime hook. Pre-event, day-of, and post-event states render automatically — no scheduled deploys on conference morning.",
      ],
      [
        "Per-council dynamic routes",
        "/council/[id] renders a detail page per committee — topic, background guide, chair bios — from the same data source as the council listing. Adding a new committee is one entry in the array; route, listing, and detail page all update together.",
      ],
      [
        "shadcn/ui + Framer Motion",
        "Radix primitives via shadcn/ui for accessible accordions, dialogs, and sidebars. Framer Motion for page transitions and entrance animations. Embla carousel for the hero. Production-grade UI without rolling components from scratch.",
      ],
      [
        "Centralised SEO metadata",
        "lib/metadata.ts generates Open Graph and Twitter tags per route. Councils, registration, gallery — each gets its own preview card when shared across Instagram, WhatsApp, and email, which is where 90% of delegate traffic actually came from.",
      ],
      [
        "Designed for handover from day one",
        "TODO.md, stable naming conventions, and a clear separation between content (lib/) and components carried the codebase from the 2023 batch to the 2024-25 batch without a rewrite. Still on the same architecture two years later.",
      ],
    ],
    thumbnail: "/work/nmmun/homepage.webp",
    media: [
      { src: "/work/nmmun/home.mp4", type: "video", label: "Home · hero carousel · countdown" },
      { src: "/work/nmmun/mobile.webp", type: "image", label: "Mobile · 375px" },
      { src: "/work/nmmun/councils.mp4", type: "video", label: "Councils · per-committee detail" },
      { src: "/work/nmmun/information.mp4", type: "video", label: "Info · itinerary + dress code" },
      { src: "/work/nmmun/gallery.mp4", type: "video", label: "Gallery" },
      { src: "/work/nmmun/team.mp4", type: "video", label: "Team page" },
    ],
  },
  {
    slug: "cuts-and-shavez",
    stat: "0 deps",
    sstat: "hand-coded HTML/CSS/JS · designed solo at fifteen",
    tag: "Websites",
    client: "Cuts & Shavez Salon",
    kind: "Barbershop · Manama, Bahrain",
    year: "2023",
    eyebrow: "Self-initiated design + build · Bahrain · 2023",
    headline: "Cuts & Shavez—\na Bahrain barbershop,",
    headlineAccent: "designed and shipped solo.",
    description:
      "A self-initiated design-and-build for Cuts & Shavez Salon, a real barbershop in Manama, Bahrain. Designed end-to-end in Figma at fifteen, then hand-coded in raw HTML, CSS, and vanilla JavaScript — no framework, no CMS, no build step. Not a paid engagement — a real shop, a real address, real services and pricing used as design constraints. Still hosted on Vercel three years later, unchanged.",
    meta: [
      { k: "Industry", v: "Hair salon · barbershop" },
      { k: "Location", v: "Manama, Bahrain" },
      { k: "Scope", v: "Brand · UI design · static website" },
      { k: "Stack", v: "Figma · HTML · CSS · vanilla JS · Vercel" },
      { k: "Timeline", v: "2023 · solo at fifteen" },
      { k: "Live", v: "barbershop-design.vercel.app" },
    ],
    results: [
      ["Designed and shipped at", "15", "first full marketing site we ever shipped end-to-end"],
      ["Dependencies", "0", "hand-coded HTML, CSS, vanilla JS · no framework, no build step"],
      ["Still live", "3 yrs", "running unchanged on Vercel since 2023"],
    ],
    brief: {
      quote:
        "\"Most barbershop sites look like Wix templates — stock photos, beige palette, generic copy. I wanted to design something that looked like a real boutique business, using a real shop in Bahrain as the brief.\"",
      attribution: "Self-initiated · age 15 · 2023",
    },
    problems: [
      "Most barbershop sites in the region looked like directory listings — stock imagery, default templates, no point of view. The brief we set ourselves was the opposite: make it look like a boutique business worth visiting, not a listing entry.",
      "No framework experience yet. Every interaction — the nav, the gallery, the scroll behaviour — had to be hand-rolled in vanilla JavaScript. No React, no Next.js, no component library to lean on.",
      "Designing end-to-end for the first time. Hero, services, gallery, reviews, contact — each section had its own visual conventions to learn before we could put a personal stamp on them.",
    ],
    decisions: [
      [
        "Figma-first design system",
        "Built the entire visual system in Figma before writing a line of code. Components for buttons, cards, section headers, pricing rows. Forced the design to think about reuse before commit, not after — a habit that still runs the studio today.",
      ],
      [
        "Real shop as design brief",
        "Picked a real barbershop in Manama with a real address, real services, real BD pricing. Designing against actual constraints — three services, a tight price list, an exact location — produces a different result to lorem ipsum and stock prices.",
      ],
      [
        "Raw HTML, CSS, vanilla JS",
        "No framework, no build step, no dependencies. Three years before adopting Next.js. Every animation, every interaction, every layout shift hand-rolled in plain HTML/CSS/JS. Forced a deep understanding of the platform before reaching for abstractions.",
      ],
      [
        "Tailwind for utility-first layout",
        "First project using Tailwind. Skipped the BEM-vs-OOCSS debate entirely and learned the utility-first model from scratch — a pattern that's stayed in every project since.",
      ],
      [
        "Vercel from day one",
        "Static deploy on Vercel — same platform the studio still uses in 2026. The original 2023 build is still live at barbershop-design.vercel.app, untouched, as a fixed point against the rest of the portfolio.",
      ],
    ],
    thumbnail: "/work/cuts-and-shavez/hero.webp",
    media: [
      { src: "/work/cuts-and-shavez/home.mp4", type: "video", label: "Full site scroll · desktop" },
      { src: "/work/cuts-and-shavez/mobile.webp", type: "image", label: "Mobile · 375px" },
      { src: "/work/cuts-and-shavez/hero.webp", type: "image", label: "Home · desktop · 1440px" },
      { src: "/work/cuts-and-shavez/best.webp", type: "image", label: "Best in Bahrain · feature section" },
      { src: "/work/cuts-and-shavez/gallery.webp", type: "image", label: "Gallery" },
      { src: "/work/cuts-and-shavez/contact.webp", type: "image", label: "Contact" },
    ],
  },
  {
    slug: "thurman",
    stat: "5 pages",
    sstat: "events marketing site · solo build · 2023",
    tag: "Websites",
    client: "Thurman Events Management",
    kind: "Events management · marketing site",
    year: "2023",
    eyebrow: "Events startup · marketing site · 2023",
    headline: "Thurman Events—\na startup marketing site",
    headlineAccent: "shipped at fifteen.",
    description:
      "A five-page marketing site for Thurman Events Management — home, services, team, gallery, contact. Built solo in 2023 on Next.js 13 with Tailwind, Framer Motion page transitions, and a Nodemailer-backed contact pipeline that drops leads straight into the team's inbox. No CMS, no third-party form provider, no monthly bill.",
    meta: [
      { k: "Industry", v: "Events management · startup" },
      { k: "Scope", v: "Marketing website · gallery · contact funnel" },
      { k: "Stack", v: "Next.js 13 · React 18 · Tailwind · Framer Motion · Nodemailer" },
      { k: "Timeline", v: "2023 · solo build at fifteen" },
      { k: "Live", v: "thurman.vercel.app" },
      { k: "Repo", v: "github.com/Clupai8o0/thurman" },
    ],
    results: [
      ["Pages shipped", "5", "home, services, team, gallery, contact"],
      ["Contact funnel", "Nodemailer", "API route → Gmail transport → direct-to-inbox leads"],
      ["Still live", "3 yrs", "deployed on Vercel since 2023, archived but online"],
    ],
    brief: {
      quote:
        "\"We needed a site that could carry an events brand — services, team, gallery, a contact form that actually worked — without the cost of a full agency engagement.\"",
      attribution: "Thurman Events Management · 2023",
    },
    problems: [
      "Most events-management sites split into two camps: bloated agency builds or template Wix pages with no point of view. Thurman needed something in between — premium feel, real content, but cheap enough for a launching startup to actually ship.",
      "The contact form had to work end-to-end on day one. No external CRM, no Calendly redirect — every enquiry had to land directly in the team's inbox the moment a visitor hit send.",
      "Events photography arrives in mixed aspect ratios and irregular volume. A rigid CSS grid would crop awkwardly and look amateur — the gallery needed to scale gracefully as more shoots came in.",
    ],
    decisions: [
      [
        "Next.js 13 pages router",
        "File-based routes per section, wrapped in a shared Layout with nav, footer, and a page-transition overlay. Copy and section data live in /config — pages stay thin and content is editable without touching JSX.",
      ],
      [
        "Nodemailer + Gmail transport",
        "/api/send-email is a Next.js API route that sends through a Gmail app password. Submissions trigger react-toastify feedback on the client and arrive directly in the team's inbox. No third-party form provider, no monthly fee, no data sitting in someone else's database.",
      ],
      [
        "Responsive masonry galleries",
        "react-responsive-masonry handles the events gallery — drops mixed-aspect images into a balanced multi-column layout that reflows at every breakpoint. CTA links out to the full Google Drive album for visitors who want more.",
      ],
      [
        "Framer Motion page transitions",
        "Each route mount runs a custom transition overlay. nextjs-toploader handles the top progress bar between pages. Small motion polish that lifts the site above the template tier without dragging in a heavy animation framework.",
      ],
      [
        "next-sitemap in postbuild",
        "Sitemap and robots.txt regenerate automatically on every build via the postbuild script. SEO basics handled at deploy time, no manual maintenance, no forgotten updates after a content change.",
      ],
      [
        "Built for handover",
        "Most content lives in /config and reusable /components — route files stay thin. Whoever picked the codebase up next could update copy, swap imagery, or add a section without learning the framework. Same handover pattern still used today.",
      ],
    ],
    thumbnail: "/work/thurman/hero.webp",
    media: [
      { src: "/work/thurman/home.mp4", type: "video", label: "Home · full scroll" },
      { src: "/work/thurman/mobile.webp", type: "image", label: "Mobile · 375px" },
      { src: "/work/thurman/services.mp4", type: "video", label: "Services · full scroll" },
      { src: "/work/thurman/gallery.mp4", type: "video", label: "Gallery · masonry reflow" },
      { src: "/work/thurman/team.webp", type: "image", label: "Team" },
      { src: "/work/thurman/contact.webp", type: "image", label: "Contact · Nodemailer form" },
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
