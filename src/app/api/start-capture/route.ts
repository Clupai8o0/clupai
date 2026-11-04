import { type NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { bookingUrl } from "@/lib/booking-link";
import { assessContactSpamWithCaptcha } from "@/lib/form-spam";
import { notifyTelegram, tgEsc } from "@/lib/notify";
import { clientIp, hourlyLimiter } from "@/lib/rate-limit";
import { decodeAnswers, type Result, scoreAnswers } from "@/lib/risk-check";

const TO = "hello@clupai.com";
const FROM = "clupai <hello@clupai.com>";
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const DECIDER_ANSWER = 6;

const isRateLimited = hourlyLimiter("start-capture:", 5);

function escHtml(str: string): string
{
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function text(value: unknown, max: number): string
{
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

function internalRow(k: string, v: string): string
{
  return `<tr>
    <td style="padding:8px 0;border-bottom:1px solid #eee;font-size:12px;color:#888;width:180px;vertical-align:top;">${escHtml(k)}</td>
    <td style="padding:8px 0;border-bottom:1px solid #eee;font-size:15px;">${v}</td>
  </tr>`;
}

function internalHtml(lead: { name: string; email: string; phone: string }, result: Result): string
{
  const risks = result.risks.map((r) => `<li style="margin-bottom:6px;">${escHtml(r.title)}</li>`).join("");
  return `
<div style="font-family:system-ui,sans-serif;max-width:600px;color:#111;">
  <p style="margin:0 0 24px;font-size:15px;">
    <strong>${result.qualified ? "QUALIFIED" : "Under A$10k"}</strong>${result.businessTool ? " · business tool" : ""} · ${result.score}/100
  </p>
  <table style="width:100%;border-collapse:collapse;margin-bottom:24px;">
    ${internalRow("Name", `<strong>${escHtml(lead.name)}</strong>`)}
    ${internalRow("Email", `<a href="mailto:${escHtml(lead.email)}">${escHtml(lead.email)}</a>`)}
    ${lead.phone ? internalRow("Mobile", `<a href="tel:${escHtml(lead.phone)}">${escHtml(lead.phone)}</a>`) : ""}
  </table>
  <table style="width:100%;border-collapse:collapse;margin-bottom:24px;">
    ${result.answers.map((a) => internalRow(a.question, escHtml(a.answer))).join("")}
  </table>
  <p style="margin:0 0 8px;font-size:13px;color:#666;">Top three risks shown</p>
  <ul style="margin:0;padding-left:18px;font-size:15px;">${risks}</ul>
</div>`;
}

function resultsHtml(firstName: string, result: Result, link: string): string
{
  const risks = result.risks
    .map(
      (r) => `
        <tr><td style="padding:22px 36px 0;">
          <p style="margin:0 0 6px;font-size:17px;line-height:1.35;font-weight:600;color:#e5e5e5;">${escHtml(r.title)}</p>
          <p style="margin:0 0 8px;font-size:15px;line-height:1.72;color:#c9c9c9;">${escHtml(r.means)}</p>
          <p style="margin:0;font-size:15px;line-height:1.72;color:#e5e5e5;">This week: ${escHtml(r.thisWeek)}</p>
        </td></tr>`,
    )
    .join("");

  const next = result.canBook
    ? `Want to talk it through? Thirty minutes with Samridh, our founder. You tell us where you’re stuck, and you’ll hear straight whether we can build it and what scoping would look like.`
    : `A custom build from us would be a stretch on under A$10k, and we’d rather tell you now. Start with the three things above. A no-code tool or a freelancer can test the idea for less, and the check will still be here when your budget grows.`;

  return `<!DOCTYPE html>
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
          <p style="margin:0;font-family:'SFMono-Regular',Menlo,Consolas,monospace;font-size:11px;letter-spacing:0.14em;text-transform:uppercase;color:#4da3ff;">Your Build Risk Check</p>
        </td></tr>

        <tr><td style="padding:12px 36px 0;">
          <h1 style="margin:0;font-size:27px;line-height:1.22;letter-spacing:-0.02em;color:#ffffff;font-weight:700;">${escHtml(firstName)}, you scored ${result.score} out of 100.</h1>
        </td></tr>

        <tr><td style="padding:18px 36px 0;">
          <p style="margin:0;font-size:15px;line-height:1.72;color:#c9c9c9;">Higher is safer. It’s worked out only from your answers, and we haven’t seen your project yet. Here are your top three risks, with one thing to do about each this week.</p>
        </td></tr>
${risks}
        <tr><td style="padding:28px 36px 22px;">
          <p style="margin:0;font-size:15px;line-height:1.72;color:#c9c9c9;">${escHtml(next)}</p>
        </td></tr>

        <tr><td style="padding:0 36px;">
          <table role="presentation" cellpadding="0" cellspacing="0"><tr><td style="background:#4da3ff;border-radius:2px;">
            <a href="${escHtml(link)}" style="display:inline-block;padding:15px 28px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;font-size:15px;font-weight:600;color:#050505;text-decoration:none;">${result.canBook ? "Book your 30-minute call" : "See your result"} &rarr;</a>
          </td></tr></table>
        </td></tr>

        <tr><td style="padding:26px 36px 0;">
          <p style="margin:0;font-size:14px;line-height:1.7;color:#9a9a9a;">Prefer to write first? Reply to this email and it comes straight to us.</p>
        </td></tr>

        <tr><td style="padding:18px 36px 0;">
          <p style="margin:0;font-size:13px;line-height:1.65;color:#6b6b6b;">Can’t find this in your inbox? Please check your spam or junk folder and mark us as "not spam" so our replies always reach you.</p>
        </td></tr>

        <tr><td style="padding:28px 36px 32px;">
          <div style="border-top:1px solid #1f1f1f;padding-top:18px;">
            <p style="margin:0;font-size:13px;color:#e5e5e5;font-weight:600;">clupai</p>
            <p style="margin:5px 0 0;font-size:12px;line-height:1.65;color:#6b6b6b;">Software built and launched by a fixed date.<br>We reply within one Australian business day.</p>
          </div>
        </td></tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

export async function POST(request: NextRequest)
{
  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const remoteIp = clientIp(request);

  if (await isRateLimited(remoteIp ?? "unknown")) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  const code = text(body.code, 32);
  const indexes = decodeAnswers(code);
  const name = text(body.name, 120);
  const email = text(body.email, 254);
  const phone = text(body.phone, 40);

  if (!indexes) {
    return NextResponse.json({ error: "Those answers aren’t valid" }, { status: 400 });
  }
  if (!name) {
    return NextResponse.json({ error: "A name is required" }, { status: 400 });
  }
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "A valid email is required" }, { status: 400 });
  }

  const verdict = await assessContactSpamWithCaptcha(
    {
      name,
      email,
      message: "Build Risk Check",
      website: text(body.website, 200),
      turnstileToken: text(body.turnstileToken, 4096),
    },
    remoteIp,
  );
  if (verdict.spam) {
    // No email goes out, so the page has to say so. A person wrongly blocked still sees their result.
    console.warn("Blocked Build Risk Check submission:", verdict.reason);
    // Real people can fail the bot check (a blocked widget, Cloudflare down). Nothing goes to the
    // address they typed, but we hear about it so the lead isn't lost.
    if (verdict.reason === "turnstile_failed") {
      await notifyTelegram(
        [
          "⚠️ <b>Build Risk Check</b> · failed the bot check, no email sent",
          `👤 ${tgEsc(name)}`,
          `✉️ ${tgEsc(email)}`,
          phone ? `📞 ${tgEsc(phone)}` : null,
        ]
          .filter((line) => line !== null)
          .join("\n"),
      );
    }
    return NextResponse.json({ ok: true, sent: false });
  }

  // Worked out here from the answers, so a score can’t be forged from the browser.
  const result = scoreAnswers(indexes);
  const firstName = name.split(/\s+/)[0] ?? name;
  const decider = result.answers[DECIDER_ANSWER]?.answer ?? "";

  const ping = notifyTelegram(
    [
      `🔔 <b>Build Risk Check</b> · ${result.qualified ? "QUALIFIED" : "under A$10k"} · ${result.score}/100`,
      result.businessTool ? "🏢 Business tool" : null,
      "",
      `👤 ${tgEsc(name)}`,
      `✉️ ${tgEsc(email)}`,
      phone ? `📞 ${tgEsc(phone)}` : null,
      `🧭 Decides: ${tgEsc(decider)}`,
      "",
      ...result.answers.map((a) => `• ${tgEsc(a.answer)}`),
    ]
      .filter((line) => line !== null)
      .join("\n"),
  );

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn("RESEND_API_KEY is not set, skipping Build Risk Check emails");
    await ping;
    return NextResponse.json({ ok: true, sent: false });
  }

  const resend = new Resend(apiKey);
  const link = result.canBook ? bookingUrl({ code, name, email }) : `https://clupai.com/start/result?r=${code}`;

  // Awaited, because a serverless function can be stopped as soon as it responds.
  const [internal, results] = await Promise.allSettled([
    resend.emails.send({
      from: FROM,
      to: TO,
      replyTo: email,
      subject: `${result.qualified ? "Qualified" : "Under A$10k"} · ${name} · ${result.score}/100`,
      html: internalHtml({ name, email, phone }, result),
    }),
    resend.emails.send({
      from: FROM,
      to: email,
      replyTo: TO,
      subject: `Your Build Risk Check: ${result.score} out of 100`,
      html: resultsHtml(firstName, result, link),
    }),
    ping,
  ]);

  if (internal.status === "rejected" || internal.value.error) {
    console.error("Build Risk Check internal email failed:", internal.status === "rejected" ? internal.reason : internal.value.error);
  }
  const sent = results.status === "fulfilled" && !results.value.error;
  if (!sent) {
    console.error("Build Risk Check results email failed:", results.status === "rejected" ? results.reason : results.value.error);
  }

  return NextResponse.json({ ok: true, sent });
}
