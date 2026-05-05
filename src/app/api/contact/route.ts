import { Resend } from "resend";
import { type NextRequest, NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

const TO = "hello@clupai.com";
const FROM = "clupai contact <onboarding@resend.dev>"; // swap for your verified domain later

export async function POST(request: NextRequest) {
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

  const { name, company, email, message } = body;

  if (!name || !email || !message) {
    return NextResponse.json(
      { error: "name, email, and message are required" },
      { status: 400 }
    );
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
  </table>
  <div style="background:#f9f9f9; border-left:3px solid #4da3ff; padding:16px 20px; border-radius:2px;">
    <p style="margin:0; font-size:15px; line-height:1.6; white-space:pre-wrap;">${escHtml(message)}</p>
  </div>
  <p style="margin:24px 0 0; font-size:12px; color:#aaa;">
    Sent from clupai.com/contact
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
    console.error("Resend error:", error);
    return NextResponse.json({ error: error.message }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}

function escHtml(str: string) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
