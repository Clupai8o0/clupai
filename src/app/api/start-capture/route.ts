import { Resend } from "resend";
import { type NextRequest, NextResponse } from "next/server";

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

function row(k: string, v: string) {
  return `<tr>
    <td style="padding:8px 0;border-bottom:1px solid #eee;font-size:12px;color:#888;width:140px;">${k}</td>
    <td style="padding:8px 0;border-bottom:1px solid #eee;font-size:15px;">${v}</td>
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
    const confirmHtml = `
<div style="font-family: system-ui, sans-serif; max-width: 600px; color: #111;">
  <p style="margin:0 0 24px; font-size:13px; color:#666; text-transform:uppercase; letter-spacing:0.08em;">
    clupai.com
  </p>
  <p style="font-size:16px; font-weight:600; margin:0 0 12px;">
    Thanks, ${first}.
  </p>
  <p style="font-size:15px; color:#444; line-height:1.6; margin:0 0 24px;">
    We&rsquo;ve got your details and the pricing you saw on screen. We&rsquo;ll
    follow up within one Australian business day with a tailored quote and the
    next step. If it&rsquo;s urgent, just reply to this email or reach us at
    <a href="mailto:hello@clupai.com" style="color:#4da3ff;">hello@clupai.com</a>.
  </p>
  <p style="margin:0; font-size:12px; color:#aaa;">
    &mdash; clupai · Melbourne VIC
  </p>
</div>`;

    const { error } = await resend.emails.send({
      from: FROM,
      to: TO,
      replyTo: email,
      subject,
      html,
    });

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
        subject: "Thanks — your pricing & next steps · clupai",
        html: confirmHtml,
      })
      .catch((err) => console.warn("Lead confirmation email skipped:", err));

    return NextResponse.json({ ok: true });
  }

  // Audit request — email only
  const auditHtml = `
<div style="font-family: system-ui, sans-serif; max-width: 600px; color: #111;">
  <p style="margin:0 0 24px; font-size:13px; color:#666; text-transform:uppercase; letter-spacing:0.08em;">
    Free audit request · clupai.com
  </p>
  <table style="width:100%; border-collapse:collapse; margin-bottom:24px;">
    ${row("Email", `<a href="mailto:${escHtml(email)}" style="color:#4da3ff;">${escHtml(email)}</a>`)}
  </table>
  <p style="margin:0; font-size:14px; color:#444; line-height:1.6;">
    Record a Loom walking through their biggest conversion and speed issues, then send it over.
  </p>
</div>`;

  const auditConfirmHtml = `
<div style="font-family: system-ui, sans-serif; max-width: 600px; color: #111;">
  <p style="margin:0 0 24px; font-size:13px; color:#666; text-transform:uppercase; letter-spacing:0.08em;">
    clupai.com
  </p>
  <p style="font-size:16px; font-weight:600; margin:0 0 12px;">
    On it.
  </p>
  <p style="font-size:15px; color:#444; line-height:1.6; margin:0 0 24px;">
    Your free 10-minute site audit lands within one Australian business day &mdash; a
    Loom walking through your biggest conversion and speed issues. No pitch, just the
    findings. Questions? Reply here or email
    <a href="mailto:hello@clupai.com" style="color:#4da3ff;">hello@clupai.com</a>.
  </p>
  <p style="margin:0; font-size:12px; color:#aaa;">
    &mdash; clupai · Melbourne VIC
  </p>
</div>`;

  const { error } = await resend.emails.send({
    from: FROM,
    to: TO,
    replyTo: email,
    subject: `Free audit request · ${email}`,
    html: auditHtml,
  });

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
