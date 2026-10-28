# Handoff: clupai site level-up

Started on the Mac (session clupai-monorepo-1e, 27 Oct 2026), continued on the vivobook
overnight 28 Oct, **merged into `main` and deployed on the evening of 28 Oct**.

## Live

- **URL: https://www.clupai.com** (clupai.com 308-redirects to www)
- **Merge commit: `8455c9a`** - "Merge clupai-cleanup-20261028: dividers, em dashes, responsive
  and a11y fixes"
- Deployed by Vercel's GitHub integration, which fired on the push to `main`. Nothing had to be
  triggered by hand. The CLI on this machine is NOT logged in, so a manual deploy from here
  would need `vercel login` first.
- Verified live, not just assumed: `--text-dim:#7a7a7a` in the served CSS, `cp-hair`,
  `cp-pricing-*` and `cp-bento-*` all absent, `cp-suburb-hero` present, zero divider rules, and
  zero em dashes on /, /services, /apps, /pricing, /compare/wordpress-vs-nextjs and /contact.
  The 20 on /melbourne/brunswick are `suburbs.ts`, left on purpose (see below).

The merge was clean, no conflicts, so there was no conflict resolution to review.

## What the overnight session changed

| Commit | What |
|---|---|
| `74c22e6` | Every divider line removed, site-wide |
| `6567ebf` | Em dashes out of studio copy |
| `587badd` | Responsive and contrast faults DeepSeek found |
| `28a9a39` | Two bugs Codex found, plus solo voice on /apps |

**Dividers (items 3, 4, 5).** 69 inline border declarations across 15 files, plus the divider
rules in globals.css. That is everywhere, not just the pages the Mac session touched: nav,
footer, /services, /apps, /start, /pricing, /writing, the three compare pages, the free tools,
cal-booking and legal-page. Lists that used row rules to separate items got real gaps instead.
The nav's blurred dark bar now does its own separating; the footer sits on a surface tone.
/services rows became cards in a gapped stack with the 01/02/03 numbers gone. Dead CSS deleted:
`cp-pricing-*`, `cp-kit-*`, `cp-bento-*`, `cp-work-bento`, `cp-hair`, and the
`writing-posts-grid` column rules.

**Suburb intro (item 6).** The hero showed the first two sentences of the lede and the "What we
see" section repeated the whole thing. The section now picks up from where the hero stopped.
Checked against all seven suburbs.

**Em dashes (item 7).** 123 lines in `cases.ts`, `services.ts`, `pricing.ts` and `lib/kits.ts`.
Each dash became what the sentence wanted: a colon before a list, a comma before a contrast, a
full stop between two clauses. **Client quotes were left exactly as spoken** - the 14 em dashes
still in `cases.ts` are all inside `brief.quote` and `testimonial.quote`, which are a real
person's words. See the first decision below.

**Bugs found and fixed along the way.** Detail in the commit messages; the short version:

- Suburb pages had no breakpoints at all. Six grids, including a hero pinned at `1fr 340px`. On
  a 390px phone the pricing card was cut off on all seven pages.
- The collapse layer in globals.css set a bare `1fr`, whose automatic minimum is `min-content`,
  so long text could push a collapsed column wider than its container: 376px inside 350px on the
  three `/services/*/melbourne` pages. Now `minmax(0, 1fr)`.
- The /services breakpoints I added at first had no `!important`, so the inline grid beat them.
- `--text-dim` was `#6b6b6b`: 3.65:1 on card backgrounds, under WCAG AA's 4.5:1, in 97 places.
  Now `#7a7a7a` (4.53:1), still clearly dimmer than `--text-muted`.
- Home kit cards hardcoded a "Live" badge, so Kairos read "Free beta" and "Live" at once.
- `kits.ts` used `"—"` as a sentinel for "no revenue". My own em-dash sweep broke it and /apps
  started rendering ": MRR". Absence is `null` now and the type says so.
- /apps copy and the contact form were still in solo voice ("Bits I use", "I'll reply").

**Worth knowing:** `body` has `overflow-x: hidden`, so none of the layout breakage above ever
showed as sideways scrolling. It was silently clipped. That is why the Mac session's
scroll-based check came back clean. I measured element geometry in Chrome instead, at 1440,
1024, 900, 768 and 390px across 29 pages. Everything above is verified fixed.

## Checks

- `npm run build` passes.
- No element overflows the viewport at any of the five widths, across 29 pages, bar a 4px
  artifact on the SceneBand noted below.
- Screenshots of /services, the suburb page, compare, home, /apps and /writing at 1440 and 390px
  all read correctly with no dividers.

## Reviews

- **Codex (required):** reviewed my diff, found 2 real bugs, both fixed (`28a9a39`).
- **DeepSeek Flash:** 3 findings, all confirmed and fixed (`587badd`).
- **Grok 4.7: could not run here.** Its CLI needs a device-code login only you can complete, and
  there is no xAI key on this machine. I tried OpenRouter as the substitute; the account's
  credits ran out mid-pass. This is the one piece of item 1 still open.

## Left, in order

1. **Check the live site** at https://www.clupai.com. That is the only thing outstanding.
2. **Optional:** the Grok pass was skipped, as you asked. Codex and DeepSeek both reviewed, and
   Codex reviewed tonight's em-dash commit separately and found no defects.
3. **Optional, cosmetic:** the SceneBand sits 4px past the viewport at 768 and 390px on the three
   `/services/*` pages, and an svg on /apps does the same by 10px at 900px. Both invisible,
   clipped by `overflow-x: hidden`.

## Decisions taken for you

You said to take the recommended option on both open decisions. For the record:

1. **Em dashes: page copy converted, essays and quotes left alone.** All marketing page and
   component copy now uses real punctuation. Deliberately NOT touched:
   - `src/data/writing.ts` (your long-form essays, your narrative voice)
   - `src/data/suburbs.ts` (the same long-form register; this is the 20 on the Brunswick page)
   - the client quotes in `src/data/cases.ts`, which are a real person's words
   - `{value ?? "—"}` in the CWV tool and the character class in `work/[slug]` `summarise()`:
     both are code, not prose
   Brand titles and nav labels took the site's house separator "·", not a colon.
2. **`--text-dim` stays `#7a7a7a`.** It fixed a real WCAG AA failure (3.65:1, under 4.5:1) in 97
   places. Still open to taste: anything lighter than `#7a7a7a` passes.

A blind find-and-replace made a mess of the em dashes and each of these was caught and fixed by
hand before the merge. Worth knowing if anyone repeats the exercise:
- A **paired** dash (an aside wrapped in two) breaks if only the opening one is converted. Nine
  such lines, plus three where the pair spanned two lines and both ends became colons.
- `\s*` in the pattern **matches newlines**, so two lines ending in a dash were silently joined
  with the line below.
- Two `"—"` values were **sentinels, not prose**. One had already caused the `/apps` ": MRR" bug
  last night; the same sweep nearly broke a second one in `notify.ts`.
- One dash sat directly before a quote mark and vanished entirely, leaving `anonymised'a
  Melbourne-based...'`.

## Still open for you

These were on the list before and are unchanged. They are content calls, not code.

1. **"24 projects shipped"** (hero rail). Nobody has checked the number.
2. **The schools page sells enrolment systems**, but no case study backs it up. Keep or drop?
3. **The Brunswick FAQ** makes claims nobody has checked ("we've worked with cafes, studios...").
4. **The nav "(01)" numbers.** Left alone, as this was always your call. The hairline under the
   nav is gone. Remove the numbers too, or keep them?

## Commands

```bash
# deploy from this machine would need a login first; the git push already deploys
vercel login && vercel --prod

# the Codex review, required before calling a change done
python3 ~/Documents/Obsidian/brain/skills/_core/token-economy/scripts/second_opinion.py \
  - --cwd . --review --base <commit> --ladder codex
```

## Notes for whoever picks this up

- `second_opinion.py` **works for the `codex` route on Linux** (Codex brings its own sandbox),
  but **fails for `dsh`, `grok`, `kimi`, `agy` and `opencode`**: it wraps those in macOS
  `sandbox-exec`, which does not exist here (`[Errno 2] No such file or directory`). For
  DeepSeek, call `dsh --profile headless` directly, which is allowed on a personal folder.
- **Grok cannot run on this machine**: its CLI needs a device-code login and there is no
  `XAI_API_KEY` in `~/.secrets.env`. The OpenRouter fallback exists but the account's credits
  are exhausted.
- A 225KB prompt is too long for `dsh` as an argv string ("argument list too long"). Write it to
  a file in the repo and tell the model to read that file.
- `node_modules` is not in the repo copy on this machine; `npm install` first or nothing builds.
- **The push to `main` also published the Mac's commit `1d3ad0a`** (the SMS/Twilio work, privacy
  and terms pages), which had never reached GitHub. It was scanned before pushing: no client
  names, no key material, every secret read through `process.env`, and `.env.local` is gitignored
  and untracked.
- No dev server or background job of mine is still running. Nothing of mine is uncommitted.

Safe to close: the branch is merged, `main` is pushed, and the deploy is live and verified.
