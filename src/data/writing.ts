export type ContentBlock =
  | { type: "p"; html: string }
  | { type: "lead"; html: string }
  | { type: "h2"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] }
  | { type: "blockquote"; text: string };

export interface PostMeta {
  n: string;
  slug: string;
  title: string;
  dek: string;
  read: string;
  date: string;
  tag: string;
  tags: string[];
}

export interface Post extends PostMeta {
  content: ContentBlock[];
  related: string[];
}

export const posts: Post[] = [
  {
    n: "11",
    slug: "agency-light-playbook",
    title: "The agency-light playbook",
    dek: "What we learned running a small studio for eighteen months—and why it beats scaling a team.",
    read: "12 min",
    date: "Apr 2026",
    tag: "Business",
    tags: ["Business", "Process"],
    related: ["published-pricing", "scope-four-week-website", "why-i-stopped-wordpress"],
    content: [
      {
        type: "lead",
        html: "Here's the contrarian take: the agency model, as most people experience it in 2026, is a tax. A founder pays the tax to buy back time. Most of the time, they're buying someone else's overhead.",
      },
      {
        type: "p",
        html: "We've been running clupai as a lean studio for eighteen months. Four services, no large headcount, an ABN and a Melbourne address. We've shipped twenty-four projects. We turn down more work than we take. The margin is strong—not because we're expensive, but because the structure is tight.",
      },
      {
        type: "h2",
        text: 'What "agency-light" actually means',
      },
      {
        type: "p",
        html: "It's a set of constraints, not a brand. Three of them:",
      },
      {
        type: "ol",
        items: [
          "<strong>Direct delivery.</strong> Every email comes from us. Every call is with us. No account manager. No project manager. No handover to a delivery team.",
          "<strong>Packaged services.</strong> Three tiers. Published prices. If you don't fit them, we have a different conversation—but the default path doesn't need a proposal.",
          "<strong>Outcome-framed copy.</strong> Every page answers: what does the client get, and what will it cost. Agencies bury this under 'process', 'philosophy', and a bento grid of tooling logos.",
        ],
      },
      {
        type: "h2",
        text: "Why not scale?",
      },
      {
        type: "p",
        html: "The standard advice is: once you're at capacity, hire. We've watched plenty of studios do it. The pattern is consistent—the first hire reshapes the work before it adds capacity. You go from doing the craft to managing the people doing the craft. That's a different job. Some people love it. We don't.",
      },
      {
        type: "p",
        html: "There's also the math. A second pair of hands adds less than a second pair of hands' worth of output. Coordination tax is real. By the time you're at four people, you've added two roles that exist solely to keep the other two productive.",
      },
      {
        type: "blockquote",
        text: "The question isn't whether you can run an agency. It's whether the work you want to do survives the structure you're building to deliver it.",
      },
      {
        type: "h2",
        text: "The trade-offs we made on purpose",
      },
      {
        type: "p",
        html: "Staying lean isn't free. We gave up bigger contracts (enterprise work usually wants a company, not a studio), some degree of specialisation, and the ability to be offline without preparation.",
      },
      {
        type: "p",
        html: "We kept: every dollar of margin, the ability to end a client relationship cleanly, and the craft. That trade sits fine with us.",
      },
      {
        type: "p",
        html: "If you're thinking about a similar structure, the scoping call is a good place to start. No pitch—just the conversation.",
      },
    ],
  },
  {
    n: "10",
    slug: "why-i-stopped-wordpress",
    title: "Why I stopped taking WordPress work",
    dek: "Not because it's bad. Because the alternatives got better faster than I could keep up with them.",
    read: "8 min",
    date: "Mar 2026",
    tag: "Engineering",
    tags: ["Engineering", "Process"],
    related: ["core-web-vitals", "scope-four-week-website", "agency-light-playbook"],
    content: [
      {
        type: "lead",
        html: "I want to be clear upfront: WordPress is not bad software. It runs 43% of the web for a reason. This is about fit, not quality.",
      },
      {
        type: "p",
        html: "We took our last WordPress project in Q3 2025. The client was a Melbourne-based law firm—good brief, reasonable budget, clear scope. We delivered it. It performed fine. Then the maintenance requests started.",
      },
      {
        type: "h2",
        text: "The maintenance problem",
      },
      {
        type: "p",
        html: "WordPress sites don't sit still. Plugins update. Themes conflict. WooCommerce has its own release cadence. On a well-maintained site, this is manageable. On a site that hasn't been touched in four months—which is most client sites—it's a quarterly emergency.",
      },
      {
        type: "p",
        html: "The real cost isn't the time to update. It's the time to diagnose what the update broke. We were billing two to three hours a month per WordPress site on average. The clients didn't love paying for it. We didn't love doing it.",
      },
      {
        type: "h2",
        text: "What changed on the other side",
      },
      {
        type: "p",
        html: "Next.js with a headless CMS (Sanity or Contentful, depending on the client) now delivers a better content editing experience than the WordPress block editor—and the output is faster by a wide margin. A site built on this stack can hit 95+ Lighthouse scores without heroics.",
      },
      {
        type: "p",
        html: "The deploy pipeline is the other part. Vercel or Netlify means: push to git, site updates. No FTP, no cPanel, no PHP version mismatch. A non-technical client can trigger a deployment by merging a pull request.",
      },
      {
        type: "blockquote",
        text: "Page builders are technical debt with a good demo. They look great in a sales call and cost double to fix eighteen months later.",
      },
      {
        type: "h2",
        text: "When WordPress still makes sense",
      },
      {
        type: "p",
        html: "Large content teams who already live in the WP admin. Sites with 10,000+ posts where migration cost is prohibitive. Clients with existing WordPress developers on retainer. These are real scenarios. We refer them to good WordPress agencies.",
      },
      {
        type: "p",
        html: "For everyone else building a new site in 2026: the modern stack is faster to build, faster to load, and cheaper to maintain. The learning curve for clients is roughly equivalent.",
      },
    ],
  },
  {
    n: "09",
    slug: "published-pricing",
    title: "Published pricing: the best lead qualifier I've ever used",
    dek: "Traffic dropped 12%. Booked calls went up 180%. Here is the math.",
    read: "6 min",
    date: "Feb 2026",
    tag: "Business",
    tags: ["Business"],
    related: ["agency-light-playbook", "scope-four-week-website", "one-cta-per-page"],
    content: [
      {
        type: "lead",
        html: "Every freelancer and small studio gets the same advice: don't publish your prices, because prospects will self-select out before they understand the value. We ignored that advice. Here's what happened.",
      },
      {
        type: "p",
        html: "We added a published pricing page to clupai.com in October 2025. Three tiers, specific numbers, what's included, what's not. No 'contact us for a quote.'",
      },
      {
        type: "h2",
        text: "The numbers",
      },
      {
        type: "p",
        html: "Over the following 90 days: organic traffic dropped roughly 12% (the pricing page ranked for some informational terms we lost). Booked discovery calls went up 178%. Conversion from call to paid project went from 31% to 67%.",
      },
      {
        type: "p",
        html: "The explanation is straightforward. People who book a call now know the price range. They've already decided it's acceptable. The call is about fit, not sticker shock.",
      },
      {
        type: "blockquote",
        text: "Publishing prices doesn't lose you the serious leads. It loses you the tyre-kickers—which is the goal.",
      },
      {
        type: "h2",
        text: "What to actually publish",
      },
      {
        type: "ul",
        items: [
          "<strong>Starting from</strong> prices are worse than nothing. They attract the bottom end and create anchoring problems.",
          "<strong>Range pricing</strong> works for project scopes with genuine variance. '$8,000–$14,000 depending on page count' is honest.",
          "<strong>Fixed-tier pricing</strong> works when your service is genuinely productised. It signals confidence in your process.",
          "Publish what's <strong>not included</strong> as clearly as what is. Nothing breaks trust faster than a surprise add-on.",
        ],
      },
      {
        type: "h2",
        text: "The objection",
      },
      {
        type: "p",
        html: "The pushback we hear: 'But competitors will undercut you.' They already know the market rate. If your competitors can undercut a published price and still deliver quality, you have a cost structure problem, not a pricing page problem.",
      },
      {
        type: "p",
        html: "Published pricing is also a positioning signal. It says: we know what our work is worth, and we don't negotiate before we've even met.",
      },
    ],
  },
  {
    n: "08",
    slug: "melbourne-local-seo-2026",
    title: "Melbourne local SEO in 2026",
    dek: "GBP, suburb pages, schema—what still works, what Google quietly killed.",
    read: "14 min",
    date: "Feb 2026",
    tag: "SEO",
    tags: ["SEO"],
    related: ["google-ads-leaky-bucket", "core-web-vitals", "published-pricing"],
    content: [
      {
        type: "lead",
        html: "Local SEO has two layers. There's the map pack—what shows in the three-business block at the top of results—and there's organic. Most businesses need both. They require different tactics.",
      },
      {
        type: "h2",
        text: "Google Business Profile is still the highest-leverage action",
      },
      {
        type: "p",
        html: "In 2026, an optimised GBP beats a mediocre GBP in the map pack almost regardless of the website quality beneath it. That's changing as Google uses more page-level signals, but for now: if you're a Melbourne local service and your GBP isn't complete, that's the first fix.",
      },
      {
        type: "p",
        html: "What 'complete' actually means: primary and secondary categories accurate, business description using natural language (not keyword-stuffed), all services listed with descriptions, 20+ photos updated in the last 90 days, and review responses within 48 hours.",
      },
      {
        type: "h2",
        text: "Suburb pages that work",
      },
      {
        type: "p",
        html: "The mistake: creating a suburb page that's a copy of the homepage with the suburb name swapped in. Google sees this immediately and treats it as thin content.",
      },
      {
        type: "p",
        html: "Suburb pages earn rankings when they contain location-specific content: local landmarks used as distance references, real project examples from that area (even anonymised), the specific postcode range covered, and natural mentions of local context (a Richmond café fit-out reads differently from a Doncaster office).",
      },
      {
        type: "blockquote",
        text: "Five well-written suburb pages beat fifty templated ones. Every time. We've run this test on four client sites in the last year.",
      },
      {
        type: "h2",
        text: "Schema markup for local",
      },
      {
        type: "p",
        html: "LocalBusiness schema with accurate <strong>name, address, phone, and areaServed</strong> is still worth implementing. ServiceArea schema helps Google understand multi-suburb coverage. Review schema pulls from your GBP automatically if structured correctly.",
      },
      {
        type: "h2",
        text: "What Google quietly killed",
      },
      {
        type: "ul",
        items: [
          "<strong>Citation building</strong> — submitting to 50 directories was a 2019 tactic. Google's link graph for local is sophisticated enough that low-quality directories are neutral at best.",
          "<strong>Exact match domains</strong> — 'melbourneplumber.com.au' no longer provides ranking lift. Domain brand signals matter more.",
          "<strong>Keyword-stuffed title tags</strong> — Google rewrites titles it doesn't like. Write for humans.",
          "<strong>Review gating</strong> — asking satisfied customers first, unhappy ones second. Google's guidelines are clear; the risk isn't worth the lift.",
        ],
      },
      {
        type: "h2",
        text: "What still compounds",
      },
      {
        type: "p",
        html: "Genuine review velocity. A plumber with 14 new reviews this month outranks one with 200 reviews last updated in 2023. Recency matters in local.",
      },
      {
        type: "p",
        html: "Core Web Vitals. Local service sites are often the slowest category of site. Page experience signals are a real tie-breaker at the margin.",
      },
    ],
  },
  {
    n: "07",
    slug: "n8n-vs-zapier-vs-make",
    title: "n8n vs Zapier vs Make: the honest comparison",
    dek: "I have shipped real workflows on all three. Here is what I actually pick, and when.",
    read: "9 min",
    date: "Jan 2026",
    tag: "Automation",
    tags: ["Automation", "Engineering"],
    related: ["scope-four-week-website", "agency-light-playbook", "why-i-stopped-wordpress"],
    content: [
      {
        type: "lead",
        html: "We've shipped automations on all three platforms over the last two years. Not tutorials—production workflows for clients. This isn't a feature matrix. It's how we actually decide.",
      },
      {
        type: "h2",
        text: "Zapier",
      },
      {
        type: "p",
        html: "Zapier wins on breadth of integrations and speed to build. If a tool has a Zapier integration, it works. The interface is the most approachable for non-technical users.",
      },
      {
        type: "p",
        html: "The problems: pricing scales aggressively with task volume, and the logic layer is limited. Multi-step conditional workflows get ugly fast. The 'Paths' feature helps but isn't designed for complex branching.",
      },
      {
        type: "p",
        html: "<strong>Pick Zapier when:</strong> the client will maintain it themselves, the workflow is simple (trigger → 2–3 actions), and volume is low enough that per-task pricing is acceptable.",
      },
      {
        type: "h2",
        text: "Make (formerly Integromat)",
      },
      {
        type: "p",
        html: "Make's visual canvas is genuinely good. Complex workflows are easier to reason about than a linear Zapier chain. The data manipulation is more powerful—array functions, iterators, aggregators.",
      },
      {
        type: "p",
        html: "The learning curve is real. Make uses concepts (scenarios, bundles, modules) that aren't intuitive. Debugging a failed scenario requires understanding its internal data model.",
      },
      {
        type: "p",
        html: "<strong>Pick Make when:</strong> the workflow involves transforming or aggregating data, the client has some technical literacy, and you need visual documentation of the logic.",
      },
      {
        type: "h2",
        text: "n8n",
      },
      {
        type: "p",
        html: "n8n is self-hostable, open source, and has a code node that accepts JavaScript. For technically complex workflows, nothing touches it.",
      },
      {
        type: "p",
        html: "The downside: you own the infrastructure. A self-hosted n8n instance needs monitoring, updates, and backup. The cloud version exists but partially defeats the cost argument.",
      },
      {
        type: "p",
        html: "<strong>Pick n8n when:</strong> data sovereignty matters (GDPR, legal, healthcare), the workflow is complex enough to warrant code, or you're building something you'll maintain yourself.",
      },
      {
        type: "blockquote",
        text: "The right tool is the one you'll still understand when you open it at 11pm because something broke.",
      },
      {
        type: "h2",
        text: "The actual decision matrix",
      },
      {
        type: "ul",
        items: [
          "Client maintains it + simple logic = <strong>Zapier</strong>",
          "Client maintains it + complex data = <strong>Make</strong>",
          "We maintain it + sensitive data = <strong>n8n self-hosted</strong>",
          "We maintain it + standard use case = <strong>n8n cloud or Make</strong>",
        ],
      },
    ],
  },
  {
    n: "06",
    slug: "one-cta-per-page",
    title: "One CTA per page",
    dek: "The most effective design change we've made this year. Not a single client has regretted it.",
    read: "5 min",
    date: "Jan 2026",
    tag: "Design",
    tags: ["Design", "Business"],
    related: ["published-pricing", "agency-light-playbook", "scope-four-week-website"],
    content: [
      {
        type: "lead",
        html: "The pattern on most service business websites: a 'Book a call' button in the header, a 'Get a quote' section in the hero, a 'Learn more' in services, and a 'Contact us' in the footer. Four actions. Zero priority.",
      },
      {
        type: "p",
        html: "We removed three of them. Then we tested it against two client sites. Both sites saw conversion improvements within thirty days.",
      },
      {
        type: "h2",
        text: "The psychology",
      },
      {
        type: "p",
        html: "Hick's Law: decision time increases logarithmically with the number of choices. Four equally-weighted CTAs force visitors to decide which action to take before they've decided to act at all.",
      },
      {
        type: "p",
        html: "One CTA removes that micro-decision. The visitor's entire cognitive load goes into 'do I want to do this thing' rather than 'which thing should I do.'",
      },
      {
        type: "h2",
        text: "How to pick the one",
      },
      {
        type: "p",
        html: "Ask: what is the one action that, if taken, indicates real buying intent? For a service business it's almost always booking a scoping call. Not downloading a PDF, not subscribing to a newsletter—booking time.",
      },
      {
        type: "p",
        html: "Secondary actions (email, social links, 'read more') can still exist in context—in the footer, in a blog post CTA. They just don't compete with the primary on key conversion pages.",
      },
      {
        type: "blockquote",
        text: "A page with one CTA tells visitors what to do. A page with four tells them nothing.",
      },
      {
        type: "h2",
        text: "The exceptions",
      },
      {
        type: "ul",
        items: [
          "<strong>Long-form content</strong> — a 14-minute essay can have an in-body CTA and a footer CTA without confusion.",
          "<strong>Pricing pages</strong> — tier-based pages naturally have multiple buttons, but each maps to a distinct tier.",
          "<strong>E-commerce</strong> — 'Add to cart' and 'Add to wishlist' are fine because both advance the relationship.",
        ],
      },
      {
        type: "p",
        html: "For everything else: pick one, make it obvious, and stop helping users get confused.",
      },
    ],
  },
  {
    n: "05",
    slug: "scope-four-week-website",
    title: "How I scope a four-week website",
    dek: "The exact 90-minute call, the brief I leave with, and the estimate I send the next morning.",
    read: "11 min",
    date: "Dec 2025",
    tag: "Process",
    tags: ["Process", "Business"],
    related: ["published-pricing", "agency-light-playbook", "one-cta-per-page"],
    content: [
      {
        type: "lead",
        html: "The four-week website is our core product. A fixed timeline, fixed price, and a clear brief are what make it work. Here's the exact process.",
      },
      {
        type: "h2",
        text: "The 90-minute scoping call",
      },
      {
        type: "p",
        html: "The call has four sections. We don't use a slide deck. We use a shared doc that becomes the brief.",
      },
      {
        type: "ol",
        items: [
          "<strong>Business context (20 min).</strong> What do they actually sell? Who buys it? What's the current site missing? We're listening for the gap between how they describe the business and how a customer would.",
          "<strong>Goals (15 min).</strong> What does success look like in six months? Specific numbers when possible. 'More enquiries' is not a goal; '40% more contact form completions' is.",
          "<strong>Technical scope (25 min).</strong> Page list, CMS requirements, integrations (CRM, booking tools, forms), existing brand assets, hosting situation.",
          "<strong>Timeline and sign-off (30 min).</strong> When do they need it live? Who has final approval? What could delay sign-off? We surface the slow points before they happen.",
        ],
      },
      {
        type: "h2",
        text: "The brief",
      },
      {
        type: "p",
        html: "We send the brief the same evening. It's a shared Notion doc: one paragraph on the business, one on goals, a page list with complexity notes (simple / standard / complex), integrations, timeline milestones, and what's out of scope.",
      },
      {
        type: "p",
        html: "Out-of-scope is the most important section. It prevents scope creep before the contract. 'Custom illustration, product photography, third-party API development' being explicitly excluded means there's no ambiguity later.",
      },
      {
        type: "h2",
        text: "The estimate",
      },
      {
        type: "p",
        html: "We send the estimate the next morning, never same day. Overnight gives us time to review the brief without the energy of the call in the room.",
      },
      {
        type: "p",
        html: "The format: a fixed price with the page list attached. No hourly rates. No itemised breakdown by task—clients fixate on line items and start trading. The number is the number.",
      },
      {
        type: "blockquote",
        text: "The estimate is a test of how much you understood the brief. If the number surprises the client, the brief wasn't clear enough.",
      },
      {
        type: "h2",
        text: "What the four weeks contain",
      },
      {
        type: "ul",
        items: [
          "Week 1: Design direction, homepage concept, brand token decisions.",
          "Week 2: Inner pages, CMS structure, content templates.",
          "Week 3: Build, integrations, first review round.",
          "Week 4: Revisions (one round), QA, deploy prep, handover.",
        ],
      },
      {
        type: "p",
        html: "The constraint is intentional. Four weeks is short enough that everyone stays focused. Long enough to do the work properly.",
      },
    ],
  },
  {
    n: "04",
    slug: "google-ads-leaky-bucket",
    title: "Google Ads for local services — the leaky-bucket audit",
    dek: "Nine out of ten accounts we open are haemorrhaging budget in the same five places.",
    read: "10 min",
    date: "Nov 2025",
    tag: "Ads",
    tags: ["Ads"],
    related: ["melbourne-local-seo-2026", "published-pricing", "core-web-vitals"],
    content: [
      {
        type: "lead",
        html: "Before we touch bids, keywords, or copy, we run a fifteen-minute audit of every new Google Ads account. The same problems appear constantly. Here they are, in order of budget impact.",
      },
      {
        type: "h2",
        text: "1. Broad match without a negative keyword list",
      },
      {
        type: "p",
        html: "Google's broad match in 2026 is aggressive. A campaign targeting 'emergency plumber Melbourne' will show for 'plumbing apprenticeship Melbourne', 'plumber salary', and occasionally something stranger. Without a negative keyword list built from Search Terms data, you're funding Google's education.",
      },
      {
        type: "p",
        html: "Fix: pull 90 days of Search Terms data, add any non-converting intent as negatives, and check weekly for the first month.",
      },
      {
        type: "h2",
        text: "2. Search Partners enabled",
      },
      {
        type: "p",
        html: "Search Partners includes Google-owned properties and third-party search sites. For most local service accounts, Search Partners converts at a fraction of the rate of Google Search, at the same CPC. The toggle to disable it is in campaign settings.",
      },
      {
        type: "h2",
        text: "3. Display Network expansion",
      },
      {
        type: "p",
        html: "'Search with Display Select' is on by default in some campaign types. Display traffic looks like search traffic in the summary but has almost no purchase intent. It's cheap per click because it's cheap for a reason.",
      },
      {
        type: "h2",
        text: "4. Conversion tracking not configured",
      },
      {
        type: "p",
        html: "We've opened accounts spending $4,000/month with zero conversion tracking. Smart Bidding—which Google pushes heavily—is useless without conversion data. It will optimise for the proxy signal it has (clicks, impressions) which is not what you want to optimise for.",
      },
      {
        type: "blockquote",
        text: "You cannot optimise what you don't measure. That's not a quote, it's just true.",
      },
      {
        type: "h2",
        text: "5. Geographic targeting too wide",
      },
      {
        type: "p",
        html: "A Melbourne tradie targeting 'Victoria' instead of 'Melbourne metro' is paying Melbourne CPCs for Ballarat enquiries they won't convert. Tighten to the actual service radius. Then check the Location Report to confirm impressions are coming from where you think.",
      },
      {
        type: "h2",
        text: "The fix order",
      },
      {
        type: "p",
        html: "Stop the bleeding before optimising for growth. In order: fix conversion tracking → disable Search Partners → check Display Network → tighten geo → build negative keyword list. Only then look at bids and creative.",
      },
    ],
  },
  {
    n: "03",
    slug: "core-web-vitals",
    title: "Core Web Vitals stopped being optional a while ago",
    dek: "INP is the new LCP. If you are not looking at it monthly, you are guessing.",
    read: "7 min",
    date: "Oct 2025",
    tag: "Engineering",
    tags: ["Engineering", "SEO"],
    related: ["why-i-stopped-wordpress", "melbourne-local-seo-2026", "google-ads-leaky-bucket"],
    content: [
      {
        type: "lead",
        html: "Google replaced FID with INP in March 2024. Most sites that passed Core Web Vitals before that change need to be re-assessed. FID measured the delay before an event handler ran. INP measures the full interaction duration—much harder to pass.",
      },
      {
        type: "h2",
        text: "What INP actually measures",
      },
      {
        type: "p",
        html: "Interaction to Next Paint is the time from user input (click, keypress, tap) to the browser rendering the next frame. The threshold: under 200ms is Good, 200–500ms is Needs Improvement, over 500ms is Poor.",
      },
      {
        type: "p",
        html: "The reason most sites fail: JavaScript on the main thread. A 300ms event handler that updates the DOM will fail INP even if LCP is excellent. The culprit is usually a third-party script (analytics, chat widget, tag manager) that wasn't there when the site was last tested.",
      },
      {
        type: "h2",
        text: "LCP: still the most important metric for rankings",
      },
      {
        type: "p",
        html: "Largest Contentful Paint is the time to render the largest visible element (usually a hero image or heading). Good is under 2.5s. The quickest wins: properly sized images with explicit width/height, preloading hero images with <code>&lt;link rel='preload'&gt;</code>, and serving images in WebP/AVIF.",
      },
      {
        type: "h2",
        text: "CLS: the silent revenue killer",
      },
      {
        type: "p",
        html: "Cumulative Layout Shift measures unexpected visual movement. A CLS score above 0.1 means elements are jumping around as the page loads. The business impact: users click the wrong element. They click 'close ad' when they meant to click 'add to cart'.",
      },
      {
        type: "p",
        html: "The fix is almost always the same: add explicit dimensions to images and embeds, reserve space for late-loading ads, and set <code>font-display: optional</code> or <code>swap</code> on custom fonts.",
      },
      {
        type: "blockquote",
        text: "Every millisecond of LCP above 2.5 seconds costs conversion rate. The correlation is consistent enough that Google publishes it.",
      },
      {
        type: "h2",
        text: "What to use for monitoring",
      },
      {
        type: "ul",
        items: [
          "<strong>PageSpeed Insights</strong> — field data from Chrome UX Report, not just lab. Use this.",
          "<strong>Search Console Core Web Vitals report</strong> — shows which URLs are failing across your site, not just the homepage.",
          "<strong>Vercel Speed Insights</strong> — real-user data if you're on Vercel, updated continuously.",
          "<strong>Web Vitals Chrome extension</strong> — for diagnosing a specific page while logged in (bypasses cached states).",
        ],
      },
      {
        type: "p",
        html: "Check monthly. Set a calendar reminder. The third-party script that broke your INP in November wasn't there in June.",
      },
    ],
  },
];

export const postMetas: PostMeta[] = posts.map(
  ({ content: _content, related: _related, ...meta }) => meta
);

export function getPostBySlug(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug);
}
