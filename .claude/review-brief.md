Review a change to the clupai marketing site. Findings only.

Stack: Next.js 16.2 App Router, React 19.2, Tailwind v4, mostly inline styles plus classes in src/app/globals.css. The repo is the working directory; read any file you need. This Next.js has breaking changes (docs in node_modules/next/dist/docs/); next/image uses `preload`, not `priority`. The root layout sets `title.template` to "%s · clupai".

Below are (1) a git diff of edited files and (2) the full content of rewritten and new files. Other uncommitted changes in the tree (src/app/api/*, sms, privacy/terms pages, footer.tsx, layout.tsx, sitemap.ts, start/funnel.tsx, cal-booking.tsx, contact-form.tsx, AGENTS.md, the "Legal pages" CSS block) belong to another session. Do not review them.

What changed:
- Case study page template (/work/[slug]) and gallery lightbox; /work index rebuilt as image-led tiles (filters removed on purpose: only 7 cases, two filters were empty).
- Home page rewritten as a server component, with the hero and its funnel modal as a client island (HomeHero) and a shared WorkTile.
- SceneBand illustration on 8 landing pages. By default it "bridges": its lower part sits on a surface-toned pseudo-element so it leads into the next section; the suburb page opts out.
- Divider lines removed on the touched pages (owner rule: no separator rules or hairlines; separate by space and tone). Card outlines on .cp-card and button outlines are allowed.
- Page titles fixed so the template does not double " · clupai".
- Facts corrected. King Double Glazing, true numbers: desktop Lighthouse 75 to 99, mobile 57 to 85, mobile LCP 13.1s to 4.4s, desktop LCP 1.0s, TBT 370ms to 20ms, 5 weeks, old site WordPress. Krishnaveni School, true facts: a K-12 school in India, a Next.js 15 + Sanity v5 marketing site with 13 section types, content baked in at build (no runtime CMS calls), SEO 92, Best Practices 100, delivered May 2026. It is NOT an enrolment system and NOT in Melbourne.
- Copy moved to studio voice: the studio is always "we". A founder bio on /about may stay first person; customer questions in FAQs ("Do I own...") are fine.

Report only real problems: bugs, regressions, accessibility failures, broken responsive layouts (breakpoints 1024, 900, 768), wrong or inconsistent facts anywhere in the diff, studio copy still in solo voice, or new divider lines. For each give severity (high/med/low), file:line, what breaks and for whom, and the fix. Skip style preferences and files outside this change. If nothing is wrong, say so in one line.

