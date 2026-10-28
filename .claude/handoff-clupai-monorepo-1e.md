# Handoff: clupai site

Latest work: **Twilio and the whole SMS feature removed**, 28 Oct 2026 (vivobook).
Before that: the site level-up (dividers, em dashes, responsive and a11y), merged and deployed
the same evening.

## Live

- **URL: https://www.clupai.com** (clupai.com 308-redirects to www)
- **SMS removal: `d3c3af5`** · **contact-form fix: `1578d6c`, hardened in `99a59e7`** · site
  level-up merge: `8455c9a`
- Deployed by Vercel's GitHub integration on push. The CLI here is NOT logged in, so a manual
  deploy would need `vercel login` first.

Verified on production after the deploy:

| Check | Result |
|---|---|
| `/api/sms/inbound`, `/api/sms/flush-openers` (GET and POST) | 404 |
| `/api/contact`, `/api/start-capture`, `/api/cal/bookings` on a bad payload | 400, correct error, nothing sent |
| /contact, /start, /privacy, /terms | no SMS or STOP copy, no consent checkbox, phone field still there |

No test lead was sent. Only invalid payloads were used, which the routes reject before any email.

## You must do this in Vercel

I cannot change env vars (CLI not logged in). **Delete these from the clupai project**, all
environments. Nothing in the code reads them any more:

```
TWILIO_ACCOUNT_SID
TWILIO_AUTH_TOKEN
TWILIO_FROM_NUMBER
SMS_WEBHOOK_URL
SMS_MODEL              (if set)
SMS_MAX_TURNS          (if set)
SMS_DAILY_LLM_CAP      (if set)
CRON_SECRET            (only the SMS scheduler used it)
ANTHROPIC_API_KEY      (only the SMS assistant used it)
```

**Keep** everything else, especially `UPSTASH_REDIS_REST_URL` / `UPSTASH_REDIS_REST_TOKEN`: the
contact form's rate limiter still uses them. I removed the same nine from `.env.local` here.

Also worth doing outside Vercel: close the Twilio number and the Fly.io app for the scheduler
(`clupai-sms-scheduler`), or they keep billing.

## Read this one: the contact form was down

While verifying, I found **`POST /api/contact` returning 500 with an empty body on production
for every payload**, including malformed JSON. The form was not reaching the handler at all.

- **Not caused by the SMS removal.** The rate limiter landed in `c9e59eb`, five commits before
  any SMS work, and `/api/start-capture` and `/api/cal/bookings` (same edits, no limiter) were
  both answering 400 correctly throughout.
- **Cause:** the Upstash rate limiter. `Redis.fromEnv()` ran at module scope, so a bad
  `UPSTASH_REDIS_REST_URL` throws on import and kills every request before the handler runs,
  which matches an empty-body 500 exactly.
- **Fixed in `1578d6c`**, then hardened in `99a59e7`. Production went 500 to 400 on deploy, and a
  burst of requests now returns 429, so throttling is active again.

### The security review on my own fix

A background review flagged `1578d6c` as **fail-open rate limiting**, which was fair. Catching
the error kept the form up, but it left the site with no throttling at all whenever Upstash was
down, and silently. `99a59e7` adds a fallback: when Upstash is missing or failing, requests go
through a per-instance in-memory sliding window on the same budget, 5 per IP per hour, with the
key map bounded at 5000.

Codex found two real holes in my first attempt at that, both fixed before it shipped:

- **On timeout the Upstash SDK resolves `{ success: true, reason: "timeout" }` instead of
  throwing** (see `applyTimeout` in `@upstash/ratelimit`). A hanging Upstash is the most likely
  failure mode, and it would have waved every request straight through without ever reaching the
  fallback. A `"timeout"` verdict is now treated as a limiter failure.
- A flooding IP kept appending timestamps to its own array even once throttled, making every
  later check more expensive. It stops recording at the limit.

**Know the limit of this.** The fallback is per serverless instance with no shared state, so on
Vercel it is genuinely weaker than Upstash: requests spread across instances each get their own
counter. It is a floor, not a replacement. Turnstile, the honeypot, the minimum-time-on-form
check and gibberish detection all still run regardless, so the form is not unprotected.

**Still on you:** none of this repairs Upstash. Check the database and the
`UPSTASH_REDIS_REST_URL` / `_TOKEN` values in Vercel, or the site keeps running on the weaker
per-instance limit.

## What the SMS removal took out

**Deleted:** `src/lib/sms.ts`, `sms-conversation.ts`, `sms-copy.ts`, `src/app/api/sms/` (inbound
and flush-openers), and the `sms-scheduler/` FastAPI service.

**Edited:** the contact, cal/bookings and start-capture routes lose `triggerOpener`, the
`smsConsent` flag and the "SMS opt-in" marker in the internal email and Telegram alerts. The
consent checkbox and wording come off the contact form, the booking form and the funnel. The
"SMS rules" section is gone from AGENTS.md.

**Kept working:** the phone field on every form, still reaching the internal email and the
Telegram alert. Email confirmations untouched.

**Legal copy was rewritten, not just cut**, so the pages stay coherent: the terms clause is now
"Communications" and covers email and phone; the privacy page's SMS section is now "Marketing
messages". Twilio and Anthropic are off the third-party list. Upstash stays, redescribed as rate
limiting, since the consent records it held are gone.

**No dependency was removed.** Twilio and Anthropic were called over `fetch`, never as SDKs, so
there was nothing in `package.json` to drop. `@upstash/redis` and `@upstash/ratelimit` stay
because the contact route uses them.

## Decisions I took

- **Left `docs/seo-content-strategy-2026.md` alone.** It has four rows mentioning SMS, but they
  are planned blog topics about review-request automation you might build *for clients* with n8n,
  not the Twilio lead assistant. Deleting your content roadmap is not what "remove the SMS
  feature" meant. One row does say "Your SMS workflow", which is no longer true, so you may want
  to reword it. Your call.
- **Left the two files in `.claude/`.** `review-brief.md` and this handoff mention SMS as a record
  of what happened. They are history, not live config.
- `skills-lock.json` and `package-lock.json` match "sms"/"twilio" only on unrelated skill names
  and base64 hashes.

So `grep -ri "twilio\|sms"` is clean apart from those: no source, route, component, config or
env entry remains.

## Checks

- `npm run build` passes.
- `npx eslint src` reports 3 errors and 1 warning, all in `cal-booking.tsx` and `contact-form.tsx`
  (`Date.now()` during render, `setState` in an effect). **Pre-existing**: identical on the
  commit before this work, verified in a scratch worktree. Not introduced here, not fixed here.
- Codex reviewed all three diffs. The SMS removal: no defects. The contact fix: it caught the
  module-scope initialisation hole. The fallback limiter: it caught the Upstash timeout
  semantics and the unbounded per-IP array. Everything it confirmed was fixed, and the final
  re-review came back clean.

## Still open for you

Unchanged content calls from before:

1. **"24 projects shipped"** (hero rail). Nobody has checked the number.
2. **The schools page sells enrolment systems**, but no case study backs it up. Keep or drop?
3. **The Brunswick FAQ** claims nobody has checked ("we've worked with cafes, studios...").
4. **The nav "(01)" numbers.** Always your call; the hairline under the nav is gone.
5. **Em dashes**: page copy was converted. `suburbs.ts`, `writing.ts` (your essays) and the client
   quotes in `cases.ts` were deliberately left.

## Notes for whoever picks this up

- `second_opinion.py` **works for the `codex` route on Linux**; it fails for `dsh`, `grok`,
  `kimi`, `agy` and `opencode`, which it wraps in macOS `sandbox-exec`. For DeepSeek call
  `dsh --profile headless` directly.
- `codex exec` with a diff in a file returned a bare verdict with no detail. Inlining the diff
  via `second_opinion.py --review` gave the real findings. Prefer that.
- **Grok cannot run here**: its CLI needs a device-code login and there is no `XAI_API_KEY`.
  OpenRouter is configured but out of credits.
- This shell **cannot resolve `upstash.io`**, so Upstash failures reproduce locally for the wrong
  reason. Test the routes with the Upstash vars unset to reach their real validation path.
- `node_modules` is not in the repo copy here; `npm install` first.
- No dev server or background job of mine is running. Nothing of mine is uncommitted.

Safe to close: `main` is pushed, the deploy is live and verified, and the two follow-ups for you
are the Vercel env vars and the Upstash database.
