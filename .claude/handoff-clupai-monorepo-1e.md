# Handoff: clupai site level-up

Started on the Mac (session clupai-monorepo-1e, 27 Oct 2026), continued on the vivobook
overnight 28 Oct. Items 1 and 3-7 are done. Item 2 (you review the site, then merge) is yours.

**Branch: `clupai-cleanup-20261028`**, pushed to GitHub. Four commits on top of `1d3ad0a`.
`main` was not touched and not pushed.

```bash
cd ~/Documents/projects/clupai-monorepo/clupai
git checkout clupai-cleanup-20261028
npm install          # node_modules is not in the repo copy
npm run dev
```

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

1. **Review the site and merge the branch.** This is item 2 and it is the only thing blocking.
2. **Run the Grok pass**, if you still want a third opinion. Either `grok login --device-code`
   on the vivobook, or top up OpenRouter and re-run; the prompt is saved and the command is in
   "Commands" below. Codex and DeepSeek have both been through it, so this is optional.
3. **Decide on the remaining em dashes** (first decision below).
4. **Optional, cosmetic:** the SceneBand sits 4px past the viewport at 768 and 390px on the three
   `/services/*` pages, and an svg on /apps does the same by 10px at 900px. Both are invisible,
   clipped by `overflow-x: hidden`. I left them rather than chase a 4px artifact at 6am.

## Decisions for you

Recommended option first.

1. **The ~335 em dashes still in the site.** Item 7 said "about 80 in cases.ts"; the real number
   across everything is larger. Where they are: ~235 in page and component JSX (worst:
   the three `/services/*/melbourne` pages, 67 between them), 68 in `suburbs.ts`, 33 in
   `writing.ts`, 14 in client quotes in `cases.ts`.
   - **Recommended: do the page JSX, leave `writing.ts` and the client quotes.** Marketing page
     copy is ours and should follow the rule. The essays in `writing.ts` are your narrative voice
     and read fine with dashes, and rewriting a client's quoted words misrepresents them.
   - Or: do all of it except the quotes.
   - Or: leave it; the rule in AGENTS.md is written for emails, not pages.
2. **`--text-dim` is now `#7a7a7a` instead of `#6b6b6b`.** That was a genuine WCAG AA failure in
   97 places, so I changed it, but it does lift the dimmest tone across the whole site. Keep it,
   or tune the exact grey to taste - anything lighter than `#7a7a7a` passes.
3. **"24 projects shipped"** (hero rail). Still nobody has checked the number.
4. **The schools page sells enrolment systems**, but no case study backs it up. Keep the offer or
   drop it?
5. **The Brunswick FAQ** makes claims nobody has checked ("we've worked with cafes, studios...").
6. **The nav "(01)" numbers.** Left alone on purpose this time, as this was already your open
   decision. The hairline under the nav is gone. Remove the numbers too, or keep them?

## Commands

```bash
# the Grok pass, if you want it
grok login --device-code          # then re-run the review

# the Codex review, which is required before calling a change done
python3 ~/Documents/Obsidian/brain/skills/_core/token-economy/scripts/second_opinion.py \
  - --cwd . --review --base 1d3ad0a --ladder codex
```

## Notes for whoever picks this up

- `second_opinion.py` **does not work on the Linux machines** for the `dsh`, `grok`, `kimi`,
  `agy` and `opencode` routes: it wraps them in macOS `sandbox-exec`, which does not exist here.
  It fails with `[Errno 2] No such file or directory: 'sandbox-exec'`. The `codex` route is fine,
  since Codex brings its own sandbox. For DeepSeek I called `dsh --profile headless` directly,
  which is allowed on a personal folder. Worth fixing in the script.
- A 225KB prompt is too long for `dsh` as an argv string ("argument list too long"). Write it to
  a file in the repo and tell the model to read that file.
- `node_modules` is not in the repo copy on this machine; `npm install` first or nothing builds.
- No dev server or background job of mine is still running. Nothing of mine is uncommitted.

Safe to close, handover ready: `.claude/handoff-clupai-monorepo-1e.md`
