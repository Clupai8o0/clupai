<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Voice & copy rules

- The company is always **"we"**. Never describe clupai as a "one-person" anything or use solo framing in user-facing copy (pages, meta, footer, emails, marketing). Say "company", not "studio".
- Samridh Limbu may be named as founder. "I" is fine for Sam's own story (the founder section on /about), but identity statements ("a development agency in Melbourne") stay collective.
- Every claim has to be true and checkable. The guarantee only ever applies as written in a signed agreement. No prices of ours on the site.

# Email design rules

All transactional emails (lead, contact, audit confirmations) share one
"Digital Obsidian" dark theme. New emails MUST match it. Reference implementation:
the Build Risk Check results email in `src/app/api/start-capture/route.ts`.

**Structure (email-client safe):**
- Build with nested `<table role="presentation">`, not flexbox/grid. Inline styles only — no `<style>` blocks or external CSS.
- Full `<!DOCTYPE html>` doc with `<meta viewport>`. Outer table = page background; inner table = the card.
- Card: `max-width:600px`, `border-radius:6px`, horizontal padding `36px`. One concept per `<tr><td>` row.

**Palette:**
- Page bg `#050505` · card bg `#0d0d0d` · borders/dividers `#1f1f1f`
- Accent `#4da3ff`; text on accent (buttons) `#050505`
- Text scale: h1 `#ffffff` · emphasis `#e5e5e5` · body `#c9c9c9` · muted `#9a9a9a` · dim/footer/labels `#6b6b6b`

**Type:**
- Body font stack: `-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif`
- Mono (eyebrows + recap labels): `'SFMono-Regular',Menlo,Consolas,monospace`
- Logo: `clup<span style="color:#4da3ff;">ai</span>`, Helvetica Neue 700, 21px, `letter-spacing:-0.02em`
- Eyebrow: mono, 11px, `letter-spacing:0.14em`, uppercase, accent color
- H1: 27px, `line-height:1.22`, `letter-spacing:-0.02em`, weight 700, white
- Body copy: 15px, `line-height:1.72`, `#c9c9c9`

**Components:**
- Primary CTA = table cell `background:#4da3ff;border-radius:2px` wrapping an `<a>` with `padding:15px 28px`, 15px, weight 600, `color:#050505`, ` &rarr;` suffix.
- Recap rows: mono uppercase label (`#6b6b6b`) over value (`#e5e5e5`), separated by `border-top:1px solid #1f1f1f`.
- Footer: `clupai` (e5e5e5, 600) + dim line "Software built and launched by a fixed date." + "We reply within one Australian business day."

**Rules:**
- Escape ALL dynamic content with `escHtml()`. Never interpolate raw user input.
- **No em dashes (`—` / `&mdash;`).** They read as unprofessional / AI-written. Use a full stop, comma, "and", or a colon instead. En dashes (`–`) in number/price ranges ("$3k – $8k", "1–3 months") are fine and correct.
- Every customer-facing email MUST include a deliverability disclaimer near the footer, e.g. `Can't find this in your inbox? Please check your spam or junk folder and mark us as "not spam" so our replies always reach you.` (mono-muted, `#6b6b6b`, ~13px).
- Any "Book a call" CTA must use `bookingUrl()` from `@/lib/booking-link` so the booking form arrives prefilled.
- Follow the Voice & copy rules above ("we", never solo framing).
- The internal *notification* email (to `hello@clupai.com`) can stay the simple light table. The dark theme is for emails sent to **leads/customers**.

