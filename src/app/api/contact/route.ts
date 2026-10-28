import { Resend } from "resend";
import { type NextRequest, NextResponse } from "next/server";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { notifyTelegram, tgEsc } from "@/lib/notify";
import { bookingUrl } from "@/lib/booking-link";
import { assessContactSpamWithCaptcha } from "@/lib/form-spam";

// Built at module scope, so a malformed UPSTASH_REDIS_REST_URL would throw on
// import and take every request down with it before the handler ever runs.
// Build it defensively and treat a failure as "no rate limiting".
const ratelimiter = (() => {
  if (!process.env.UPSTASH_REDIS_REST_URL || !process.env.UPSTASH_REDIS_REST_TOKEN) {
    return null;
  }
  try {
    return new Ratelimit({
      redis: Redis.fromEnv(),
      limiter: Ratelimit.slidingWindow(5, "1 h"),
      prefix: "contact:",
    });
  } catch (err) {
    console.warn("Rate limiter could not be initialised, continuing without it:", err);
    return null;
  }
})();

// Last-resort throttle for when Upstash is unavailable. Per instance and
// in-memory, so it is not airtight across a horizontally scaled deployment,
// but it blunts a single-IP flood instead of leaving the form wide open.
const FALLBACK_LIMIT = 5;
const FALLBACK_WINDOW_MS = 60 * 60 * 1000;
const FALLBACK_MAX_KEYS = 5000;
const fallbackHits = new Map<string, number[]>();

function fallbackRateLimited(key: string): boolean {
  const now = Date.now();
  const recent = (fallbackHits.get(key) ?? []).filter((t) => now - t < FALLBACK_WINDOW_MS);

  // Stop recording once the key is already over the limit, so a flooding IP
  // cannot grow its own array (and the cost of filtering it) without bound.
  if (recent.length >= FALLBACK_LIMIT) {
    fallbackHits.set(key, recent);
    return true;
  }

  recent.push(now);
  fallbackHits.set(key, recent);

  // Bound the map so a caller rotating IPs cannot grow it without limit.
  if (fallbackHits.size > FALLBACK_MAX_KEYS) {
    for (const [k, times] of fallbackHits) {
      if (times.every((t) => now - t >= FALLBACK_WINDOW_MS)) fallbackHits.delete(k);
      if (fallbackHits.size <= FALLBACK_MAX_KEYS) break;
    }
    if (fallbackHits.size > FALLBACK_MAX_KEYS) {
      fallbackHits.delete(fallbackHits.keys().next().value as string);
    }
  }

  return false;
}

const resend = new Resend(process.env.RESEND_API_KEY);

const TO = "hello@clupai.com";
const FROM = "clupai <hello@clupai.com>";

export async function POST(request: NextRequest) {
  const remoteIp =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    request.headers.get("x-real-ip") ??
    undefined;

  const rateKey = remoteIp ?? "unknown";
  let throttled: boolean;

  if (ratelimiter) {
    try {
      const verdict = await ratelimiter.limit(rateKey);
      // On timeout the SDK resolves { success: true, reason: "timeout" } rather
      // than throwing, so an unreachable Upstash would otherwise wave every
      // request through. Treat that as a limiter failure, not as a pass.
      throttled =
        verdict.reason === "timeout"
          ? fallbackRateLimited(rateKey)
          : !verdict.success;
    } catch (err) {
      // Upstash is down. Do not fail the form outright, that takes the whole
      // lead channel with it, but do not drop throttling entirely either.
      console.warn("Rate limiter unavailable, falling back to in-memory:", err);
      throttled = fallbackRateLimited(rateKey);
    }
  } else {
    throttled = fallbackRateLimited(rateKey);
  }

  if (throttled) {
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      { status: 429 }
    );
  }

  if (!process.env.RESEND_API_KEY) {
    return NextResponse.json(
      { error: "RESEND_API_KEY is not set" },
      { status: 500 }
    );
  }

  let body: Record<string, string>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const name = body.name?.trim() ?? "";
  const company = body.company?.trim() ?? "";
  const email = body.email?.trim() ?? "";
  const message = body.message?.trim() ?? "";
  const phone = body.phone?.trim() ?? "";

  if (!name || !email || !message) {
    return NextResponse.json(
      { error: "name, email, and message are required" },
      { status: 400 }
    );
  }

  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  if (!emailOk) {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }

  const formLoadedAt =
    body.formLoadedAt != null ? Number(body.formLoadedAt) : undefined;

  const spamVerdict = await assessContactSpamWithCaptcha(
    {
      name,
      company,
      email,
      message,
      website: body.website,
      formLoadedAt,
      turnstileToken: body.turnstileToken,
    },
    remoteIp
  );

  if (spamVerdict.spam) {
    console.warn("[contact] blocked spam:", spamVerdict.reason);
    return NextResponse.json({ ok: true });
  }

  const subject = company
    ? `Enquiry from ${name} · ${company}`
    : `Enquiry from ${name}`;

  const html = `
<div style="font-family: system-ui, sans-serif; max-width: 600px; color: #111;">
  <p style="margin:0 0 24px; font-size:13px; color:#666; text-transform:uppercase; letter-spacing:0.08em;">
    New contact · clupai.com
  </p>
  <table style="width:100%; border-collapse:collapse; margin-bottom:24px;">
    <tr>
      <td style="padding:8px 0; border-bottom:1px solid #eee; font-size:12px; color:#888; width:120px;">Name</td>
      <td style="padding:8px 0; border-bottom:1px solid #eee; font-size:15px; font-weight:600;">${escHtml(name)}</td>
    </tr>
    ${company ? `<tr>
      <td style="padding:8px 0; border-bottom:1px solid #eee; font-size:12px; color:#888;">Company</td>
      <td style="padding:8px 0; border-bottom:1px solid #eee; font-size:15px;">${escHtml(company)}</td>
    </tr>` : ""}
    <tr>
      <td style="padding:8px 0; border-bottom:1px solid #eee; font-size:12px; color:#888;">Email</td>
      <td style="padding:8px 0; border-bottom:1px solid #eee; font-size:15px;">
        <a href="mailto:${escHtml(email)}" style="color:#4da3ff;">${escHtml(email)}</a>
      </td>
    </tr>
    ${phone ? `<tr>
      <td style="padding:8px 0; border-bottom:1px solid #eee; font-size:12px; color:#888;">Phone</td>
      <td style="padding:8px 0; border-bottom:1px solid #eee; font-size:15px;">
        <a href="tel:${escHtml(phone)}" style="color:#4da3ff;">${escHtml(phone)}</a>
      </td>
    </tr>` : ""}
  </table>
  <div style="background:#f9f9f9; border-left:3px solid #4da3ff; padding:16px 20px; border-radius:2px;">
    <p style="margin:0; font-size:15px; line-height:1.6; white-space:pre-wrap;">${escHtml(message)}</p>
  </div>
  <p style="margin:24px 0 0; font-size:12px; color:#aaa;">
    Sent from clupai.com/contact
  </p>
</div>`;

  const first = escHtml(name.split(" ")[0]);
  // Prefill the booking form with what we already know, so they don't re-type it.
  const bookUrl = bookingUrl({ name, email });
  const confirmHtml = `
<!DOCTYPE html>
<html lang="en">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#050505;-webkit-text-size-adjust:100%;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#050505;padding:32px 16px;">
    <tr><td align="center">
      <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#0d0d0d;border:1px solid #1f1f1f;border-radius:6px;overflow:hidden;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">

        <tr><td style="padding:30px 36px 0;">
          <span style="font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-weight:700;font-size:21px;letter-spacing:-0.02em;color:#e5e5e5;">clup<span style="color:#4da3ff;">ai</span></span>
        </td></tr>

        <tr><td style="padding:26px 36px 0;">
          <p style="margin:0;font-family:'SFMono-Regular',Menlo,Consolas,monospace;font-size:11px;letter-spacing:0.14em;text-transform:uppercase;color:#4da3ff;">Message received</p>
        </td></tr>

        <tr><td style="padding:12px 36px 0;">
          <h1 style="margin:0;font-size:27px;line-height:1.22;letter-spacing:-0.02em;color:#ffffff;font-weight:700;">Got it, ${first}. We're on it.</h1>
        </td></tr>

        <tr><td style="padding:18px 36px 0;">
          <p style="margin:0 0 16px;font-size:15px;line-height:1.72;color:#c9c9c9;">
            Thanks for reaching out. Your message landed with us, and a real human will reply within one Australian business day. No autoresponder loop, no queue.
          </p>
          <p style="margin:0 0 22px;font-size:15px;line-height:1.72;color:#c9c9c9;">
            If you'd rather just talk it through, grab a time below. It's twenty minutes, with no slideshow and no pressure. We'll hear what you're after and tell you straight whether we're the right fit.
          </p>
        </td></tr>

        <tr><td style="padding:0 36px;">
          <table role="presentation" cellpadding="0" cellspacing="0"><tr><td style="background:#4da3ff;border-radius:2px;">
            <a href="${bookUrl}" style="display:inline-block;padding:15px 28px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;font-size:15px;font-weight:600;color:#050505;text-decoration:none;">Book a 20 minute call &rarr;</a>
          </td></tr></table>
        </td></tr>

        <tr><td style="padding:30px 36px 0;">
          <p style="margin:0 0 6px;font-family:'SFMono-Regular',Menlo,Consolas,monospace;font-size:11px;letter-spacing:0.12em;text-transform:uppercase;color:#6b6b6b;">Your message</p>
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-top:1px solid #1f1f1f;">
            <tr><td style="padding:14px 0;font-size:14px;line-height:1.7;color:#e5e5e5;white-space:pre-wrap;">${escHtml(message)}</td></tr>
          </table>
        </td></tr>

        <tr><td style="padding:22px 36px 0;">
          <p style="margin:0;font-size:14px;line-height:1.7;color:#9a9a9a;">
            Prefer to write more? Just reply to this email, it lands straight with us. Or reach us any time at <a href="mailto:hello@clupai.com" style="color:#4da3ff;text-decoration:none;">hello@clupai.com</a>.
          </p>
        </td></tr>

        <tr><td style="padding:18px 36px 0;">
          <p style="margin:0;font-size:13px;line-height:1.65;color:#6b6b6b;">
            Can't find this in your inbox? Please check your spam or junk folder and mark us as "not spam" so our replies always reach you.
          </p>
        </td></tr>

        <tr><td style="padding:28px 36px 32px;">
          <div style="border-top:1px solid #1f1f1f;padding-top:18px;">
            <p style="margin:0;font-size:13px;color:#e5e5e5;font-weight:600;">clupai</p>
            <p style="margin:5px 0 0;font-size:12px;line-height:1.65;color:#6b6b6b;">Melbourne web studio · websites, SEO, automation.<br>We reply within one Australian business day.</p>
          </div>
        </td></tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;

  // Instant phone ping — fired in parallel so it lands even if email fails.
  const tgText = [
    "🔔 <b>New contact</b> · clupai.com/contact",
    "",
    `👤 ${tgEsc(name)}`,
    company ? `🏢 ${tgEsc(company)}` : null,
    `✉️ ${tgEsc(email)}`,
    phone ? `📞 ${tgEsc(phone)}` : null,
    "",
    `💬 ${tgEsc(message)}`,
  ]
    .filter(Boolean)
    .join("\n");
  const notifyPromise = notifyTelegram(tgText);

  const { error } = await resend.emails.send({
    from: FROM,
    to: TO,
    replyTo: email,
    subject,
    html,
  });

  await notifyPromise;

  if (error) {
    console.error("Resend error:", error);
    return NextResponse.json({ error: (error as { message?: string }).message ?? "Email failed" }, { status: 502 });
  }

  // Confirmation to sender — best-effort; fails silently when FROM is unverified
  resend.emails
    .send({
      from: FROM,
      to: email,
      replyTo: TO,
      subject: `We got your message${company ? ` · ${escHtml(company)}` : ""}`,
      html: confirmHtml,
    })
    .catch((err) => console.warn("Confirmation email skipped:", err));

  return NextResponse.json({ ok: true });
}

function escHtml(str: string) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
