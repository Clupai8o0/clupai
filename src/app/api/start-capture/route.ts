import { Resend } from "resend";
import { type NextRequest, NextResponse } from "next/server";
import { notifyTelegram, tgEsc } from "@/lib/notify";
import { bookingUrl } from "@/lib/booking-link";

const resend = new Resend(process.env.RESEND_API_KEY);

const TO = "hello@clupai.com";
const FROM = "clupai <hello@clupai.com>";

const GOAL: Record<string, string> = {
  web: "More customers from their website",
  seo: "Rank higher on Google",
  automation: "Automate manual work",
  operator: "Ongoing partner across everything",
  custom: "Something custom",
};
const SITUATION: Record<string, string> = {
  scratch: "Starting from scratch",
  underperforming: "Has something — it underperforms",
  grow: "Solid base, wants to grow",
};
const TIMELINE: Record<string, string> = {
  asap: "ASAP — urgent",
  soon: "Next 1–3 months",
  exploring: "Just exploring",
};
const BUDGET: Record<string, string> = {
  u3: "Under $3k",
  "3-8": "$3k – $8k",
  "8-20": "$8k – $20k",
  "20+": "$20k+",
  unsure: "Not sure yet",
};

const label = (map: Record<string, string>, v?: string) =>
  v ? map[v] ?? v : "—";

// Map quiz answers onto CalBooking's exact option strings for booking prefill.
function leadProjectType(goal?: string, situation?: string): string {
  switch (goal) {
    case "web":
      return situation === "scratch" ? "New website" : "Website rebuild";
    case "seo":
      return "SEO";
    case "automation":
      return "Automation";
    default:
      return "Not sure";
  }
}

function row(k: string, v: string) {
  return `<tr>
    <td style="padding:8px 0;border-bottom:1px solid #eee;font-size:12px;color:#888;width:140px;">${k}</td>
    <td style="padding:8px 0;border-bottom:1px solid #eee;font-size:15px;">${v}</td>
  </tr>`;
}

// Row for the dark, branded confirmation email sent to the lead.
function recapRow(k: string, v: string) {
  return `<tr>
    <td style="padding:11px 0;border-bottom:1px solid #1f1f1f;font-family:'SFMono-Regular',Menlo,Consolas,monospace;font-size:11px;letter-spacing:0.06em;text-transform:uppercase;color:#6b6b6b;width:120px;vertical-align:top;">${k}</td>
    <td style="padding:11px 0;border-bottom:1px solid #1f1f1f;font-size:14px;color:#e5e5e5;">${v}</td>
  </tr>`;
}

export async function POST(request: NextRequest) {
  if (!process.env.RESEND_API_KEY) {
    return NextResponse.json({ error: "RESEND_API_KEY is not set" }, { status: 500 });
  }

  let body: Record<string, string>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const email = body.email?.trim();
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "A valid email is required" }, { status: 400 });
  }

  // A funnel lead carries quiz answers + contact details; the audit form sends email only.
  const isLead = Boolean(body.goal || body.name);

  if (isLead) {
    const name = body.name?.trim() || "(no name)";
    const business = body.business?.trim();
    const phone = body.phone?.trim();
    const message = body.message?.trim();

    const subject = business ? `New lead · ${name} · ${business}` : `New lead · ${name}`;

    const html = `
<div style="font-family: system-ui, sans-serif; max-width: 600px; color: #111;">
  <p style="margin:0 0 24px; font-size:13px; color:#666; text-transform:uppercase; letter-spacing:0.08em;">
    New lead · clupai.com/start funnel
  </p>
  <table style="width:100%; border-collapse:collapse; margin-bottom:24px;">
    ${row("Name", `<strong>${escHtml(name)}</strong>`)}
    ${business ? row("Business", escHtml(business)) : ""}
    ${row("Email", `<a href="mailto:${escHtml(email)}" style="color:#4da3ff;">${escHtml(email)}</a>`)}
    ${phone ? row("Phone", `<a href="tel:${escHtml(phone)}" style="color:#4da3ff;">${escHtml(phone)}</a>`) : ""}
  </table>
  <p style="margin:0 0 8px; font-size:11px; color:#999; text-transform:uppercase; letter-spacing:0.08em;">
    What they told us
  </p>
  <table style="width:100%; border-collapse:collapse; margin-bottom:24px;">
    ${row("Goal", escHtml(label(GOAL, body.goal)))}
    ${row("Situation", escHtml(label(SITUATION, body.situation)))}
    ${row("Timeline", escHtml(label(TIMELINE, body.timeline)))}
    ${row("Budget", escHtml(label(BUDGET, body.budget)))}
  </table>
  ${message ? `<div style="background:#f9f9f9; border-left:3px solid #4da3ff; padding:16px 20px; border-radius:2px;">
    <p style="margin:0; font-size:15px; line-height:1.6; white-space:pre-wrap;">${escHtml(message)}</p>
  </div>` : ""}
  <p style="margin:24px 0 0; font-size:12px; color:#aaa;">
    Sent from clupai.com/start
  </p>
</div>`;

    const first = escHtml(name.split(" ")[0]);
    const firstRaw = name.split(" ")[0];
    // Carry their details into the booking form so they don't re-type a thing.
    const bookUrl = bookingUrl({
      name,
      email,
      projectType: leadProjectType(body.goal, body.situation),
      budget: label(BUDGET, body.budget),
      timeline: label(TIMELINE, body.timeline),
    });
    const recapVal = (m: Record<string, string>, v?: string) => {
      const l = label(m, v);
      return escHtml(l === "—" ? "Not provided" : l);
    };
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
          <p style="margin:0;font-family:'SFMono-Regular',Menlo,Consolas,monospace;font-size:11px;letter-spacing:0.14em;text-transform:uppercase;color:#4da3ff;">You're in · now the real part</p>
        </td></tr>

        <tr><td style="padding:12px 36px 0;">
          <h1 style="margin:0;font-size:27px;line-height:1.22;letter-spacing:-0.02em;color:#ffffff;font-weight:700;">Thanks, ${first}. Let's get the full picture.</h1>
        </td></tr>

        <tr><td style="padding:18px 36px 0;">
          <p style="margin:0 0 16px;font-size:15px;line-height:1.72;color:#c9c9c9;">
            We've got your details and the pricing you saw on screen. Those numbers are a real starting point, but they're a range, not a final figure. Here's the honest version: we can't hand you a true quote off a four-question form. What it actually costs depends on what you're selling, who's buying, and where things are getting stuck right now.
          </p>
          <p style="margin:0 0 22px;font-size:15px;line-height:1.72;color:#c9c9c9;">
            So the next step is a quick call. Twenty minutes, no slideshow, no pressure. We'll ask what you do, look at what you've already got, and give you the realistic shape and cost of fixing it. If we're not the right fit, we'll tell you straight and point you somewhere better.
          </p>
        </td></tr>

        <tr><td style="padding:0 36px;">
          <table role="presentation" cellpadding="0" cellspacing="0"><tr><td style="background:#4da3ff;border-radius:2px;">
            <a href="${bookUrl}" style="display:inline-block;padding:15px 28px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;font-size:15px;font-weight:600;color:#050505;text-decoration:none;">Book your 20 minute call &rarr;</a>
          </td></tr></table>
        </td></tr>

        <tr><td style="padding:30px 36px 0;">
          <p style="margin:0 0 6px;font-family:'SFMono-Regular',Menlo,Consolas,monospace;font-size:11px;letter-spacing:0.12em;text-transform:uppercase;color:#6b6b6b;">What you told us</p>
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-top:1px solid #1f1f1f;">
            ${recapRow("Goal", recapVal(GOAL, body.goal))}
            ${recapRow("Situation", recapVal(SITUATION, body.situation))}
            ${recapRow("Timeline", recapVal(TIMELINE, body.timeline))}
            ${recapRow("Budget", recapVal(BUDGET, body.budget))}
          </table>
        </td></tr>

        <tr><td style="padding:26px 36px 0;">
          <p style="margin:0;font-size:14px;line-height:1.7;color:#9a9a9a;">
            Prefer to write first? Just reply to this email, it lands straight with us. Or reach us any time at <a href="mailto:hello@clupai.com" style="color:#4da3ff;text-decoration:none;">hello@clupai.com</a>.
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
      "🔔 <b>New lead</b> · clupai.com/start",
      "",
      `👤 ${tgEsc(name)}`,
      business ? `🏢 ${tgEsc(business)}` : null,
      `✉️ ${tgEsc(email)}`,
      phone ? `📞 ${tgEsc(phone)}` : null,
      "",
      `🎯 ${tgEsc(label(GOAL, body.goal))}`,
      `📍 ${tgEsc(label(SITUATION, body.situation))}`,
      `⏱️ ${tgEsc(label(TIMELINE, body.timeline))}`,
      `💰 ${tgEsc(label(BUDGET, body.budget))}`,
      message ? `\n💬 ${tgEsc(message)}` : null,
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
      console.error("Resend error (lead):", error);
      return NextResponse.json(
        { error: (error as { message?: string }).message ?? "Email failed" },
        { status: 502 }
      );
    }

    // Confirmation to lead — best-effort; fails silently when FROM is unverified
    resend.emails
      .send({
        from: FROM,
        to: email,
        replyTo: TO,
        subject: `Thanks ${firstRaw} · let's book a quick call`,
        html: confirmHtml,
      })
      .catch((err) => console.warn("Lead confirmation email skipped:", err));

    return NextResponse.json({ ok: true });
  }

  // Audit request — email only
  const website = body.website?.trim();
  const websiteHref = website
    ? website.startsWith("http")
      ? website
      : `https://${website}`
    : "";
  // Prefill a follow-up booking with what we know (email + the site to audit).
  const auditBookUrl = bookingUrl({ email, currentSite: website });
  const auditHtml = `
<div style="font-family: system-ui, sans-serif; max-width: 600px; color: #111;">
  <p style="margin:0 0 24px; font-size:13px; color:#666; text-transform:uppercase; letter-spacing:0.08em;">
    Free audit request · clupai.com
  </p>
  <table style="width:100%; border-collapse:collapse; margin-bottom:24px;">
    ${row("Email", `<a href="mailto:${escHtml(email)}" style="color:#4da3ff;">${escHtml(email)}</a>`)}
    ${website ? row("Website", `<a href="${escHtml(websiteHref)}" style="color:#4da3ff;">${escHtml(website)}</a>`) : ""}
  </table>
  <p style="margin:0; font-size:14px; color:#444; line-height:1.6;">
    Record a Loom walking through ${website ? `${escHtml(website)}'s` : "their"} biggest conversion and speed issues, then send it over.
  </p>
</div>`;

  const auditConfirmHtml = `
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
          <p style="margin:0;font-family:'SFMono-Regular',Menlo,Consolas,monospace;font-size:11px;letter-spacing:0.14em;text-transform:uppercase;color:#4da3ff;">Free site audit · on the way</p>
        </td></tr>

        <tr><td style="padding:12px 36px 0;">
          <h1 style="margin:0;font-size:27px;line-height:1.22;letter-spacing:-0.02em;color:#ffffff;font-weight:700;">On it. Your audit is being recorded.</h1>
        </td></tr>

        <tr><td style="padding:18px 36px 0;">
          <p style="margin:0 0 16px;font-size:15px;line-height:1.72;color:#c9c9c9;">
            Within one Australian business day you'll get a short Loom &mdash; us walking through ${website ? `<span style="color:#e5e5e5;">${escHtml(website)}</span>` : "your site"} and pointing at the biggest things costing you conversions and speed. No pitch, no slideshow. Just the findings, in plain English.
          </p>
          <p style="margin:0 0 22px;font-size:15px;line-height:1.72;color:#c9c9c9;">
            Want to talk it through instead of waiting? Grab a time below &mdash; it's twenty minutes and your details are already filled in.
          </p>
        </td></tr>

        <tr><td style="padding:0 36px;">
          <table role="presentation" cellpadding="0" cellspacing="0"><tr><td style="background:#4da3ff;border-radius:2px;">
            <a href="${auditBookUrl}" style="display:inline-block;padding:15px 28px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;font-size:15px;font-weight:600;color:#050505;text-decoration:none;">Book a 20 minute call &rarr;</a>
          </td></tr></table>
        </td></tr>
${website ? `
        <tr><td style="padding:30px 36px 0;">
          <p style="margin:0 0 6px;font-family:'SFMono-Regular',Menlo,Consolas,monospace;font-size:11px;letter-spacing:0.12em;text-transform:uppercase;color:#6b6b6b;">Auditing</p>
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-top:1px solid #1f1f1f;">
            <tr><td style="padding:14px 0;font-size:14px;color:#e5e5e5;"><a href="${escHtml(websiteHref)}" style="color:#4da3ff;text-decoration:none;">${escHtml(website)}</a></td></tr>
          </table>
        </td></tr>` : ""}

        <tr><td style="padding:22px 36px 0;">
          <p style="margin:0;font-size:14px;line-height:1.7;color:#9a9a9a;">
            Prefer to write first? Just reply to this email, it lands straight with us. Or reach us any time at <a href="mailto:hello@clupai.com" style="color:#4da3ff;text-decoration:none;">hello@clupai.com</a>.
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
  const auditNotify = notifyTelegram(
    [
      "🔔 <b>Free audit request</b> · clupai.com",
      "",
      `✉️ ${tgEsc(email)}`,
      website ? `🌐 ${tgEsc(website)}` : null,
    ]
      .filter(Boolean)
      .join("\n")
  );

  const { error } = await resend.emails.send({
    from: FROM,
    to: TO,
    replyTo: email,
    subject: website
      ? `Free audit request · ${website}`
      : `Free audit request · ${email}`,
    html: auditHtml,
  });

  await auditNotify;

  if (error) {
    console.error("Resend error (audit):", error);
    return NextResponse.json(
      { error: (error as { message?: string }).message ?? "Email failed" },
      { status: 502 }
    );
  }

  resend.emails
    .send({
      from: FROM,
      to: email,
      replyTo: TO,
      subject: "Your free site audit is on the way · clupai",
      html: auditConfirmHtml,
    })
    .catch((err) => console.warn("Audit confirmation email skipped:", err));

  return NextResponse.json({ ok: true });
}

function escHtml(str: string) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
