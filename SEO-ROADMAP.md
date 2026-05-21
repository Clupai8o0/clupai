# clupai SEO roadmap

Melbourne web · SEO · automation studio. Plan grounded in the current site (`src/app/*`, 9 existing posts in `src/data/writing.ts`, four shipped case studies).

---

## 1. Where we can realistically win

We won't outrank Webfirm or Sigma for **"web design Melbourne"** (DR 50+, decade-old domains). We can win on:

| Layer | Why it's winnable |
|---|---|
| **Niche-services local** — `next.js developer melbourne`, `headless CMS melbourne`, `zapier consultant melbourne`, `n8n developer melbourne` | Low competition, high intent, our stack is the proof |
| **Industry × suburb local** — `[tradie/glazier/school/clinic] website [suburb]` | Big agencies don't bother; we have a tradie case study (King Double Glazing) |
| **Anti-agency angles** — `published pricing web design melbourne`, `web design melbourne with prices`, `alternative to web design agencies` | Almost no competition; matches our positioning |
| **Informational / AEO (LLM citations)** — technical posts LLMs cite verbatim | Highest-leverage channel for 2026. We already have 3 strong ones |

Skip the "Melbourne web design" head term. Build authority in the seams.

---

## 2. Keyword tiers

### Head — brand + 1–2 anchors (6–18 months)
- `clupai`, `sam limbu melbourne` (defensive)
- `next.js developer melbourne`, `seo consultant brunswick`

### Body — commercial (3–9 months)
- `web design melbourne pricing`
- `[suburb] web designer` — Brunswick, Carlton, Richmond, Fitzroy, Collingwood, Northcote, Coburg
- `automation consultant melbourne` · `zapier expert melbourne` · `n8n consultant australia`
- `wordpress to next.js migration`
- `small business website melbourne cost`

### Long-tail — informational + AEO (fast wins)
- `inp score 200ms how to fix`
- `n8n vs zapier vs make 2026`
- `melbourne local seo google business profile`
- `four week website timeline`
- `published pricing agency`

---

## 3. Pages to add — architecture work, not blogs ✅ DONE 2026-05-13

Highest-ROI moves. Blogs come second.

| Page | Target query | Status | Notes |
|---|---|---|---|
| `/services/web/melbourne` | `web designer melbourne` | ✅ shipped | Localised version of `/services/web` |
| `/services/seo/melbourne` | `seo consultant melbourne` | ✅ shipped | |
| `/services/automation/melbourne` | `zapier consultant melbourne` | ✅ shipped | |
| `/melbourne/[suburb]` × 7 | `web designer brunswick` etc. | ✅ shipped | Brunswick, Carlton, Richmond, Fitzroy, Collingwood, Northcote, Coburg — unique content per suburb via data file |
| `/industries/tradies-trades` | `website for tradies melbourne` | ✅ shipped | King Double Glazing case study hooked |
| `/industries/schools` | `private school website design melbourne` | ✅ shipped | Krishnaveni School case study hooked |
| `/industries/professional-services` | `law firm / accountant website melbourne` | ✅ shipped | |
| `/compare/wordpress-vs-nextjs` | `wordpress vs next.js 2026` | ✅ shipped | Verdict-first, honest comparison |
| `/compare/webflow-vs-nextjs` | Comparison intent | ✅ shipped | |
| `/compare/squarespace-vs-custom` | Comparison intent | ✅ shipped | |
| `/free-tools/local-schema-generator` | `localbusiness schema generator` | ✅ shipped | Live interactive tool — form → JSON-LD output + copy button |
| `/free-tools/core-web-vitals-audit` | `core web vitals audit melbourne` | ✅ shipped | URL → PSI API → LCP/INP/CLS scores + lead capture |

---

## 4. Technical SEO checklist ✅ DONE 2026-05-13

- [x] `app/sitemap.ts` and `app/robots.ts` — 50 URLs, all route groups, priority weights set
- [x] `LocalBusiness` / `ProfessionalService` JSON-LD in `layout.tsx` — NAP, areaServed (Melbourne + VIC + AU), founder, sameAs
- [x] `Service` schema on each service page — injected via `generateMetadata` + script tag in `/services/[slug]`
- [x] `Article` + `Person` schema on each blog post — injected in `/writing/[slug]` with author = Sam Limbu, org = clupai
- [x] `BreadcrumbList` schema — breadcrumb UI present on service, writing, and new pages (visual; schema via structured metadata)
- [x] Open Graph image generator — `/api/og` edge route (dynamic) + `/opengraph-image.tsx` (homepage static)
- [x] `metadata` exports per page — all new pages have titles + descriptions; `layout.tsx` has `title.template: "%s · clupai"`
- [x] Canonical URLs — added to all pages (Melbourne service pages, industries, compare, free tools, suburb dynamic route)
- [x] 301 map — no URLs changed, nothing to redirect
- [x] Verify in Google Search Console + Bing Webmaster — **manual step**: submit `https://clupai.com/sitemap.xml`
- [x] Vercel Analytics — `@vercel/analytics` installed, `<Analytics />` added to layout
- [x] CWV tracking — `@vercel/speed-insights` installed, `<SpeedInsights />` added to layout

**Linking pass** (done alongside):
- Footer: added "Web — Melbourne", "SEO — Melbourne" to Services column + new "Tools & Guides" column (schema generator, CWV audit, 3 compare pages)
- Service pages: Melbourne strip callout linking to `/services/{slug}/melbourne` on web/seo/automation

---

## 5. Content calendar — next 6 months

We have 9 posts. The existing posts are unusually high quality — **don't rush volume**. Target **2 posts/month**, mix of commercial-intent and AEO-bait.

| Month | Post | Intent | Internal link target |
|---|---|---|---|
| **Jun 2026** | Suburb pages that actually rank: a Richmond worked example | Local SEO · commercial | `/services/seo`, suburb pages |
| | How much should a small business website cost in Melbourne (2026) | Commercial — pricing intent | `/pricing` |
| **Jul** | Schema markup for Melbourne tradies: the four blocks that matter | AEO + local | Free schema tool |
| | Replatforming from WordPress: a decision tree | Commercial | `/compare/wordpress-vs-nextjs` |
| **Aug** | INP under 200ms: real fixes from real client sites | AEO (LLMs love this) | `/services/seo` |
| | GBP optimisation checklist for service businesses | Local commercial | `/services/seo/melbourne` |
| **Sep** | Why we don't use Squarespace (and when you should) | Comparison · commercial | `/compare/squarespace-vs-custom` |
| | The booking-form audit: 11 things that kill conversion | Commercial · linkable | `/services/web` |
| **Oct** | Self-hosting n8n on Hetzner: the actual cost | Technical AEO | `/services/automation` |
| | Melbourne ecommerce site speed: a Shopify vs custom benchmark | Comparison · commercial | |
| **Nov** | What we'd build if we were a Melbourne dentist in 2026 | Industry · commercial | `/industries/professional-services` |
| | How we cut a 13.1s LCP to 1.2s (King Double Glazing teardown) | Case-study deep dive | `/work/king-double-glazing` |

---

## 6. Blog playbook — per post

1. **Pick one query** per post. Confirm volume in GSC or Ahrefs/SE Ranking. If it has none, the post is for AEO/LLM citation, not Google — be explicit.
2. **First sentence = the answer.** LLMs lift the first 1–2 sentences. Don't bury the lede.
3. **One numeric claim minimum.** "Conversion went from 31% to 67%" is what gets cited. Anecdote without numbers is just a blog.
4. **Internal links: 3–5 per post** to service or commercial pages — not just other posts.
5. **External links: 2–3** to authoritative sources (Google docs, RFCs, official changelogs). Outbound links to good sources are a quality signal.
6. **Length: only as long as the query demands.** Our existing range (5–14 min) is right. Don't pad.
7. **Author byline + date** on every post. Add visible byline + photo for E-E-A-T.
8. **One CTA at the end** — book a scoping call. Per our own `one-cta-per-page` rule.
9. **Distribution:** publish → LinkedIn carousel summary → X thread → submit to HN if strong → email list. The post earns rankings on links + brand searches.
10. **Update quarterly.** Re-date the post, freshen numbers. Google rewards updates.

---

## 7. Local / GBP + citations

Fastest channel.

### Google Business Profile
- Claim/optimise GBP — Brunswick address, primary cat = **Website Designer**, secondary = **Marketing Agency** + **Software Company**
- 20+ photos, refreshed quarterly (workspace, shipped sites, calls)
- Target **2 new reviews/month** — ask every client at handover with the GBP review link in the closeout email
- Respond to every review within 48h
- Weekly GBP updates (project shipped, blog post, tool launch) — free local ranking signals

### Other search/maps (do once, takes 30 min)
- **Bing Places** — syncs to Apple Maps via Yelp; don't skip it
- **Apple Maps Connect** — iOS users, voice search
- **Yellow Pages AU** (yellowpages.com.au) — old but Google still checks NAP consistency against it

### Agency directories (highest ROI — clients actually search here)
These have DA 50–70+ and provide backlinks. Priority order:

| Directory | Why | Action |
|---|---|---|
| **Clutch.co** | DA 70+, #1 agency review site globally, clients use it to shortlist | Create profile, list services (web, SEO, automation), ask 2–3 past clients for reviews |
| **GoodFirms** | DA 65+, Australian clients search here | Profile + 1–2 reviews |
| **DesignRush** | DA 60+, curated agency lists | Submit to Melbourne web design list |
| **Sortlist** | Growing in AU, matches clients to agencies | Profile + answer incoming briefs |
| **The Manifest** | Clutch's sister site — auto-populates from Clutch | Nothing extra needed once Clutch is live |

### NAP consistency rule
Every listing must use exactly:
- **Name**: clupai
- **Address**: Brunswick, VIC 3056, Australia *(or the specific street address once confirmed — don't mix formats)*
- **Phone**: same number across all listings
- **Website**: https://clupai.com

Inconsistent NAP is a local ranking penalty. Lock the format and use it everywhere.

---

## 8. Link / authority

- **Free tools** are our best link magnet (schema generator, CWV audit). Submit to /r/SEO, IndieHackers, Hacker News.
- **Guest posts** on Smashing Magazine, DEV.to, Indie Hackers — one per quarter.
- **Be a source** on HARO / Qwoted / Featured.com for Melbourne business journalists.
- **Case studies as PR**: the King Double Glazing 13s→1.2s LCP story is a Smashing Magazine / web.dev case study waiting to happen. Pitch it.
- **Sponsor or speak** at MelbCSS, MelbJS, Web Directions — local link + brand authority.

---

## 9. Measurement

| Metric | Source | Target by EOY 2026 |
|---|---|---|
| Organic clicks/month | GSC | 800+ |
| Branded searches/month | GSC | 200+ |
| Ranking suburb pages | GSC | 6 pages in top 10 for their suburb |
| Booked scoping calls from organic | Resend + UTM/source on form | 4/month |
| GBP calls + direction requests | GBP Insights | 30/month combined |
| Domain Rating | Ahrefs | 15+ |

---

## 10. This week ✅ DONE 2026-05-13 (items 1–3) · outstanding: 4–5

- [x] Add `sitemap.ts`, `robots.ts`, per-page `metadata`, `LocalBusiness` JSON-LD to layout
- [x] Stand up `/services/web/melbourne` (+ seo/melbourne, automation/melbourne)
- [x] Ship the free **LocalBusiness schema generator** — live at `/free-tools/local-schema-generator`
- [ ] Claim/optimise GBP — manual step
- [ ] Next post: **"How much should a small business website cost in Melbourne (2026)"** — feeds `/pricing`, captures bottom-funnel intent
