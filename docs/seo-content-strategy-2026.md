# clupai Content & SEO Strategy — 2026

> Operationalises the in-depth 2026 SEO research report against the **actual** clupai
> site. Read the report for the *why*; this doc is the *what, in what order, on which page*.
> Last reviewed: May 2026.

---

## 0. The one-page verdict

1. **Do not point the n8n + LLM pipeline at the site to mass-generate posts.** That is the
   single fastest way to earn a Scaled Content Abuse manual action and lose Google *and*
   ChatGPT/Perplexity visibility in the same week. Use AI as a co-pilot inside a human
   workflow (§2).
2. **You are already on the safe cadence — keep it.** Real pace is ~2 posts/month (9 posts
   Oct 2025 → Apr 2026), not the "2–3/week" the report assumed. The lever is **clusters +
   depth + originality**, never volume (§3).
3. **Local SEO is the highest-ROI surface for a Melbourne studio — and it is mostly
   off-site work the website only supports.** GBP, review velocity, and AU citations beat
   any amount of blogging for lead flow (§6). This is also the most defensible thing you can
   *productise* for clients.
4. **Your information architecture is already cluster-shaped.** The job is to (a) name the
   pillars, (b) wire internal links pillar↔cluster, (c) fill specific gaps from the backlog
   (§4–5), (d) close three schema gaps (§7).
5. **AEO/GEO is a by-product, not a separate project.** Good SEO + named authorship +
   schema + brand mentions = AI-engine citations for free (§8).

---

## 1. Where the site is today (baseline)

| Asset | State | Implication |
|---|---|---|
| Blog (`/writing`) | 9 named-author posts, TS content blocks, Article schema, RSS | Strong foundation; already E-E-A-T-shaped |
| Service pages | web / seo / automation (+ hidden ads, apps), each with FAQ + Melbourne variant | Commercial pillars — under-linked from blog |
| Comparison pages | wordpress / webflow / squarespace vs Next.js / custom | High-intent head terms; expand the cluster |
| Industry hubs | tradies-trades, schools, professional-services | Commercial pillars; only 3 of ~7 viable verticals |
| Suburb pages | Brunswick, Carlton, Richmond, Fitzroy, Collingwood, Northcote, Coburg (7) | Local support — thin until backed by real local work |
| Free tools | core-web-vitals-audit, local-schema-generator | Link magnets + AEO assets; under-leveraged |
| Schema | ProfessionalService, Article, Service ✅ | Missing BreadcrumbList, FAQPage, LocalBusiness, Review |
| Author | Sam Limbu, photo, bio, external URL ✅ | `/about` says "solo operator" → **violates the "we" rule** |
| Perf | Next.js, next/image, next/font swap, Vercel Speed Insights | Structural CWV advantage — verify, don't assume |

**The 9 existing posts already map onto clusters** (see §4) — you've been doing pillar-cluster
content intuitively. We're formalising it.

---

## 2. The AI-content decision (settle this first)

The report's verdict is conclusive and not worth re-litigating: **AI assistance is fine, AI
mass-production loses.** Top-ranking pages use AI as a co-pilot; sites that publish unedited
bulk AI get deindexed on the next core/spam update ("Mt. AI" pattern). For a service business
selling *craft*, an AI-spam blog also actively contradicts the product.

**Rewire the n8n pipeline — keep the parts, change the output.**

| AI is allowed to do | A human must do |
|---|---|
| Research synthesis, source gathering | Write the final prose, in clupai's voice |
| Outline / structure scaffolding | Inject the first-hand experience (real client work) |
| Internal-link + related-post suggestions | Produce the original asset (screenshot, n8n flow, GSC graph) |
| Draft meta titles/descriptions | Approve/edit every meta line |
| Schema JSON-LD generation | Verify schema validates + matches page |
| Grammar/clarity passes | Final fact-check and publish decision |

**Budget ~2–3 hours of human work per post on top of AI assistance.** If a post takes 15
minutes, it's the vulnerability — improve, consolidate, or `410` it. The honest test for every
post: *would this exist if AI didn't, and does it contain something a Melbourne SMB can't find
in three competitor blogs?* If no → it's a liability, not an asset.

---

## 3. Cadence & production standard

**Target: 4–6 cluster-anchored posts per month, sustained. Hard ceiling: do not scale toward
mass.** Your ~2/month is already safe; lifting to ~1/week is fine *only* if each post holds the
production standard below. Slipping the standard to hit a count is the failure mode.

**Every post must carry these E-E-A-T markers** (this is the moat AI content can't copy):

- [ ] Named author byline (Sam) + publish **and** updated date
- [ ] First-person, specific observation ("when we built X for a Melbourne glazier…")
- [ ] **One original asset**: screenshot of real client work (with permission), a real n8n
      flow, a GSC before/after, a custom diagram — not a stock image
- [ ] At least one named external source cited
- [ ] Internal links: → its pillar, → 2–3 sibling cluster posts, → the relevant service page
- [ ] Article + BreadcrumbList schema; FAQPage only where a genuine Q&A section exists
- [ ] Front-loaded answer (BLUF) in the first 100 words — this is what AI engines extract
- [ ] **Voice:** essays may use first-person "I" for narrative, but identity statements stay
      collective ("a studio in Melbourne", "we build"). Never "one-person studio."
- [ ] **No em dashes** in titles or body (house rule) — use a full stop, comma, or colon.
      (Current offender: "Google Ads for local services — the leaky-bucket audit".)

---

## 4. Pillar–cluster architecture

Four commercial pillars + one brand/thought-leadership cluster. Each pillar is a service or
industry hub page; clusters are blog posts and comparison pages that link **up** to the pillar
and **across** to siblings. Cap every page at ≤3 clicks from the homepage.

### Pillar A — Websites (Next.js for Melbourne SMBs)
**Pillar page:** `/services/web/melbourne` (elevate to a true hub)
Existing cluster members: `why-i-stopped-wordpress` · `one-cta-per-page` · `scope-four-week-website` ·
`core-web-vitals` · compare/{wordpress,webflow,squarespace} · free-tools/core-web-vitals-audit

### Pillar B — Local SEO (Melbourne)  ← highest ROI
**Pillar page:** elevate `melbourne-local-seo-2026` into the canonical pillar (or a new
`/services/seo/melbourne` hub that links to it)
Existing cluster members: `melbourne-local-seo-2026` · the 7 suburb pages · free-tools/local-schema-generator ·
cross-link `core-web-vitals`

### Pillar C — Business automation (n8n)
**Pillar page:** `/services/automation/melbourne`
Existing cluster members: `n8n-vs-zapier-vs-make`

### Pillar D — Industry hubs (commercial intent)
**Pillar pages:** `/industries/{tradies-trades, schools, professional-services}` + new verticals
Each hub links down to vertical-specific web/SEO/automation posts and up to the relevant service.

### Cluster E — Operator / brand (E-E-A-T + AI-citation fuel, not commercial)
Existing: `agency-light-playbook` · `published-pricing` · `google-ads-leaky-bucket`
These build personal brand + brand mentions — the exact signals AI engines weight. Keep them
but don't expect them to rank for buyer queries; they earn citations and trust.

**Internal-linking rule:** when you publish, add the new post to its pillar page's body links,
and back-link from 2–3 siblings. LLM crawlers use link topology as a topical-authority signal,
so the graph matters as much as the prose.

---

## 5. Topic backlog (prioritised)

Ordered by ROI. Each row notes the **original asset** that makes it un-copyable (the E-E-A-T
moat) and the cluster it joins. ✅ = exists, build internal links; ⬜ = to write.

### P1 — Local SEO (do these first; highest lead-flow leverage)
| Status | Working title | Original asset / angle |
|---|---|---|
| ✅ | Melbourne local SEO in 2026 | Promote to pillar; refresh with 2026 data |
| ⬜ | The Australian directory list that actually moves local rankings | Your curated 20–30 AU citation list (True Local, Yellow Pages AU, Hotfrog, StartLocal, Hipages…) — highly citable in AI answers |
| ⬜ | Setting up a Google Business Profile for a Melbourne service business | Screenshots of a real client GBP build |
| ⬜ | Choosing the right GBP primary category (the #1 local lever) | Whitespark weighting + real examples of right/wrong category |
| ⬜ | The review-velocity playbook: a Google review the day the job ends | Your SMS workflow + a real client's review-count graph |
| ⬜ | Will AI Overviews kill local clicks? What we see in Melbourne SERPs | Original AIO screenshots for AU local queries |

### P2 — Websites (commercial intent, strong existing base)
| Status | Working title | Original asset / angle |
|---|---|---|
| ✅ | Why I stopped taking WordPress work | Cross-link to compare pages + migration post |
| ✅ | Squarespace/Webflow/WordPress vs Next.js (3 compare pages) | Add real Lighthouse/CWV deltas from client migrations |
| ⬜ | What a small-business website actually costs in Melbourne (2026) | Anonymised real quote ranges (see §9 pricing note) |
| ⬜ | Migrating off WordPress without losing Google rankings | Real redirect map + GSC before/after from a client move |
| ⬜ | The redesign checklist we run before writing a line of code | The actual checklist as a downloadable asset |
| ✅ | Core Web Vitals stopped being optional | Tie to the free CWV audit tool; add real INP fixes |

### P3 — Automation (bridges to Local SEO — high internal-link value)
| Status | Working title | Original asset / angle |
|---|---|---|
| ✅ | n8n vs Zapier vs Make: the honest comparison | Pillar-anchor it |
| ⬜ | 10 automations every Melbourne service business should have | Screenshots of 10 real (anonymised) n8n flows |
| ⬜ | Review-request automation: finished jobs → Google reviews, hands-free | **Bridges C↔B clusters** — a real n8n flow that fires the review SMS |
| ⬜ | Lead-to-CRM automation with n8n | Real client workflow screenshot |

### P4 — Vertical hubs (expand from 3 → ~7; each = a commercial pillar)
| Status | Working title | Original asset / angle |
|---|---|---|
| ✅ | Tradies / Schools / Professional services hubs | Add anonymised local examples + the niche AU directory list per vertical |
| ⬜ | Web + local SEO for Melbourne real estate agents | Vertical directory angle + a real example |
| ⬜ | Web + local SEO for dental / medical clinics | HealthEngine / HotDoc citation angle |
| ⬜ | Web + local SEO for law firms | Lawyers.com.au / FindLaw AU angle |
| ⬜ | Web + local SEO for cafés / hospitality | Broadsheet / Zomato angle |

### P5 — Operator / brand (publish opportunistically; AI-citation fuel)
| Status | Working title | Original asset / angle |
|---|---|---|
| ✅ | The agency-light playbook · Published pricing | Keep; these earn LLM citations + trust |
| ⬜ | What we learned shipping 24 sites in two years | Proprietary data — exactly what AI engines cite |

**Do NOT programmatically generate the vertical × suburb matrix** (50 cloned location pages).
Google reads that as doorway abuse. Write a suburb or vertical page only where you have **real
work** to show.

---

## 6. Local SEO — the off-site engine (most of the ROI lives here)

Per the 2026 Whitespark weighting: GBP ~32% · reviews ~20% · on-page ~19% · links ~15% ·
behavioural ~8% · citations ~7%. This is operational, not content — but it's where a Melbourne
studio wins, so it leads the strategy.

**For clupai itself (and the template you sell to clients):**
- **GBP:** narrowest-accurate primary category; full description; service areas as named
  Melbourne suburbs (not one broad polygon); 100+ photos over time; **weekly Posts**.
- **Reviews:** velocity beats count — SMS the Google review link the day a job completes;
  respond within 24h; target 4.5★+. Aim 1–2 new reviews/week per business.
- **Citations (AU core, NAP-consistent):** GBP, True Local, Yellow Pages AU, Hotfrog,
  StartLocal, White Pages, Yelp AU, LinkedIn, Facebook — plus the **vertical** directory per
  client niche (Hipages/Oneflare for trades; HealthEngine/HotDoc for clinics; etc.).
  20–30 high-authority citations beat hundreds of low-quality ones.
- **Local backlinks:** Melbourne chambers of commerce, business associations, suppliers,
  sponsored charities, local press digital PR.

**Website's job in local SEO:** LocalBusiness + areaServed schema (see §7), embedded GBP map on
suburb pages, named-author bios, genuinely local content (real examples, not cloned pages).

**Don't waste time on:** GBP business-name keyword stuffing (suspension risk), bought reviews,
geotag manipulation, cloud stacking, CTR bots. Detection is up in 2026.

---

## 7. Technical / schema gaps to close (cheap, supports everything above)

| Gap | Action | Where |
|---|---|---|
| BreadcrumbList JSON-LD | Add to post + service + suburb templates (UI breadcrumbs already exist) | `writing/[slug]`, `services/[slug]`, `melbourne/[suburb]` |
| FAQPage JSON-LD | Add **only** where a real Q&A section exists (service pages, some posts) — ~3× more likely to be cited in AI Overviews | `services/[slug]`, industry hubs |
| LocalBusiness JSON-LD | Add on suburb pages + root with `areaServed` per suburb | `melbourne/[suburb]`, `layout` |
| Review / AggregateRating | Wire once real testimonials exist (don't fake) | service + suburb pages |
| Real GBP phone | Replace `+61000000000` placeholder in root schema | `layout.tsx` |
| RSS route | Confirm `/writing.xml` actually resolves (UI links to it) | `app/writing.xml` |
| `/about` voice fix | "solo operator since 2024" → collective framing per AGENTS.md | `app/about/page.tsx` |

**Skip:** HowTo schema (deprecated desktop 2023) and chasing FAQ *rich results* (deprecated
May 7 2026) — FAQPage stays valuable for AI parsing, not SERP visuals. No `llms.txt`, no special
"AI markup", no content "chunking" — Google says none of it is needed.

**CWV:** verify in Search Console that every template sits inside LCP <2.5s / INP <200ms /
CLS <0.1. Next.js makes this easy; confirm, don't assume. In 2026 these are a filter, not a
tiebreaker.

---

## 8. AEO / GEO — the by-product layer

Don't build a separate "AI content" track. The same fundamentals earn citations:
- **Front-load extractable answers** (BLUF) — already in the production standard (§3).
- **Named authorship + schema + brand mentions** — already covered.
- **Get cited on third-party AU sites** (guest posts, podcasts, LinkedIn long-form with real
  client data) — builds both backlinks Google rewards *and* the brand-mention signal AI weights.
- **YouTube layer (optional, high-leverage):** one short walkthrough/month on the same topic as
  a post, embedded on that post. YouTube is the #1 cited domain in AI Overviews.

**Track monthly:** run ~20 target queries (e.g. "web designer Brunswick", "local SEO Melbourne
tradies", "n8n vs Zapier") through ChatGPT, Perplexity, Gemini, and AI Mode. Log who's cited —
that's your competitive map; out-specify them with deeper, more local content.

---

## 9. Open strategic decision: public vs gated pricing

There's a live contradiction to resolve, because it changes every CTA and the funnel:
- The site currently shows **public pricing** (`/pricing`, per-service prices) and your own post
  `published-pricing` argues it's "the best lead qualifier I've ever used."
- The project memory says pricing is moving to **gated** behind a lead-capture funnel
  (`/start`, `start-capture`).

These can't both be the public story. The report sides with **public pricing** for a service
business (it pre-qualifies and is itself a citable/AEO asset). Pick one and make CTAs,
the pricing post, and the funnel consistent. **Recommendation: keep pricing public, use the
funnel for scoping/qualification rather than to hide price.** Flagging — not deciding for you.

---

## 10. 90-day rollout

**Weeks 1–4 (foundations, ~10h)**
1. Close the schema gaps (§7): BreadcrumbList everywhere, FAQPage where real, LocalBusiness on
   suburb pages, real GBP phone, confirm RSS route. Fix the `/about` voice line + the em-dash title.
2. Lock clupai's own GBP (category, suburbs, photos, description) + the AU citation core (§6).
3. Verify CWV in Search Console on every template.
4. Audit the 9 existing posts against the §3 standard — improve, consolidate, or `410` any that
   fail the "would this exist without AI" test.

**Weeks 4–12 (cluster build, ~3–5h/week)**
5. Rewire the n8n pipeline to the §2 split (assist, never auto-publish).
6. Ship the P1 Local cluster (6 posts) + wire internal links to the Local pillar.
7. Stand up clupai's review engine (SMS-on-completion) and the productised version for clients.

**Months 3–6 (authority + AI engines)**
8. Ship P2/P3 clusters; expand verticals (P4) only where real work exists.
9. Start third-party citations (guest posts, podcasts, LinkedIn) + optional monthly YouTube.
10. Begin monthly AI-citation tracking (§8).

---

## 11. Productise this for clients (the real offer)

Everything above IS a defensible 2026 service — far more so than "we'll mass-AI-write your blog":
**GBP optimisation sprint · AU citation building · review-engine setup · Next.js performance
build · monthly local content (2 human-edited, AI-assisted posts) · monthly reporting.** Sell the
discipline, not the volume.

---

## 12. Thresholds that should change this plan

- Google publicly clarifies fully-AI content is fine **and** stops manual actions for 12+ months
  → revisit volume cautiously. Not before.
- AI-engine referrals exceed **20%** of tracked client traffic → invest dedicated GEO time/tooling
  (Profound, Goose, Peec AI).
- CWV stops being measurable in Search Console → re-prioritise, but the UX wins persist.

---

### Caveats carried from the research
Directional findings (winners/losers, themes) are solid; single percentages are approximate and
mostly read the same SISTRIX data. AU search lags US by ~3–6 months, so AI-Overview prevalence in
Melbourne SMB queries is lower than US figures today — same trajectory. This plan is written for a
**service business**; a publisher/affiliate would weight velocity differently.
