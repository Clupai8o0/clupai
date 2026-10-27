# Handoff: clupai site level-up (session clupai-monorepo-1e, 27 Oct 2026)

All the code work is finished and checked. What's left: two extra review passes, then the owner reviews and commits.
Branch is `main`, nothing is committed (the owner hasn't asked for a commit). The tree also holds another session's uncommitted work, so commit only the files listed below.

## Done

- Case study page `/work/[slug]` and gallery lightbox rebuilt: real screenshots, a phone frame, and art in the brief section.
- `/work` rebuilt as image-led tiles (`WorkTile`). The filters are gone: there are only 7 cases, and two filters showed nothing.
- Home page rewritten as a server component:
  - the hero is a small client part (`HomeHero`)
  - services cards use illustrations; work tiles use real screenshots
  - pricing and kits sit on plain cards with no rules
  - the studio section is in "we" voice and replaces Sam's photo
- 24 Gemini illustrations in `public/illustrations/`. `SceneBand` shows one on 8 landing pages and runs into the next section.
- Divider lines removed from every page I touched, plus their CSS (owner rule).
- Facts fixed:
  - King Double Glazing numbers on the tradies page and 3 compare pages
  - Krishnaveni School had been described as a Melbourne enrolment system; it now matches the real case (a school in India, Sanity marketing site)
- Studio voice ("we") in services.ts, pricing.ts, about, contact and the services FAQ. The founder bio on /about stays first person, which AGENTS.md allows.
- Page titles no longer end in " · clupai" twice.
- `docs/illustrations.md` and `scripts/illustrations/` (gen.py, process.py, jobs.json) to regenerate the art.
- Checks:
  - type-check, lint (on my files) and `npm run build` all pass
  - no sideways scrolling at 1440px and 390px on 19 pages
  - no console errors
- Review status:
  - **Codex (high effort):** reviewed the diff and found 3 issues, all fixed: "WordPress-adjacent" wording, Tab can no longer leave the lightbox, process.py now reports skipped renders.
  - **Muse:** out of quota, dropped.
  - **DeepSeek Flash and Grok 4.7:** extra passes, stopped unfinished for this handover.

## The dsh and grok sessions

`clupai-dsa5` (DeepSeek Flash) and `clupai-gk15` (Grok 4.7) were my own extra review passes, started through `second_opinion.py`. They only read the diff and made no edits. I stopped both before they reported back.

## My files (commit only these)

- **Modified:**
  - `src/app/page.tsx`
  - `src/app/globals.css`, except the "Legal pages" block at the end, which is another session's
  - `src/app/{about,contact,work,work/[slug],industries/*,services/[slug],services/*/melbourne,melbourne/[suburb],compare/*,free-tools/*,writing/[slug]}`
  - `src/components/{case-gallery,case-study-section,final-cta}.tsx`
  - `src/data/{cases,pricing,services}.ts`
- **New:**
  - `src/components/{home-hero,scene-band,work-tile}.tsx`
  - `public/illustrations/`
  - `docs/illustrations.md`
  - `scripts/illustrations/`
  - `.claude/review-brief.md`

## Left, in order

1. Re-run the two extra review passes on the vivobook, if the owner wants them:
   - The brief is `.claude/review-brief.md`.
   - Build the prompt: the brief, then `git diff` of the modified files above (minus the Legal pages hunk), then the new files.
   - Run `second_opinion.py <prompt> --cwd clupai --ladder dsh:deepseek-flash`, and the same with `--ladder grok:grok-4.7 --timeout 3000`.
   - Fix anything they confirm.
2. The owner reviews the site (`npm run dev`), then commits the files above. Do not use `git add -A`.
3. The `/services` index still has ruled rows and 01/02/03 numbers.
4. The nav still has "(01)" numbers and a hairline under it. The footer has a hairline too, but `footer.tsx` belongs to another session.
5. Dead CSS to delete: `cp-pricing-*`, `cp-kit-*`, `cp-bento-*`, `cp-work-bento`, and the `writing-posts-grid` borders.
6. Suburb pages show the same intro twice (in the hero and under "What we see").
7. About 80 em dashes are left in `cases.ts`, plus some in `services.ts` and the kits data.

## Decisions for the owner

- Should "24 projects shipped" (hero rail) stay? Nobody has checked the number.
- The schools page sells enrolment systems, but no case study backs that up. Keep the offer or drop it?
- The Brunswick FAQ makes claims nobody has checked ("we've worked with cafes, studios...").
- Remove the nav numbers and hairline across the whole site?

## Notes

- Guardrails:
  - never `git stash` (g82)
  - never `pkill` or `killall` by name (g85)
  - never a bare `ls` (g67)
- The dev server on port 3107 is stopped. Nothing of mine is still running.
- The screenshot helper is outside the repo, on the Mac only: `../.art/shot.py /path --w 1440`. `/contact` never reaches network idle (the Cal embed), so Playwright times out there.
