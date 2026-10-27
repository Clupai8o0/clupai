// Twilio SMS primitives — outbound send, phone normalization, inbound webhook
// signature validation, and the per-source opener templates.
//
// Like notify.ts, sending is best-effort: sendSms never throws and never blocks
// for long, so a slow or failed text can never break a form response. Everything
// here uses raw fetch / node:crypto so we add no SDK dependency, matching how the
// rest of the codebase calls external services (Cal.com, Telegram).

import { createHmac, timingSafeEqual } from "node:crypto";

// Re-exported for server callers; defined in a client-safe module so form
// components can import the same wording without pulling in node:crypto.
export { SMS_CONSENT_WORDING } from "@/lib/sms-copy";

const TIMEOUT_MS = 6000;

/** Where SMS nudges send people to book. Kept bare (no query) to save segments. */
export const SMS_BOOK_URL = "https://clupai.com/contact";

export type SmsSource = "contact" | "funnel" | "booking";

// ─── Phone normalization ─────────────────────────────────────────────────────

/**
 * Normalize a user-entered phone to E.164, defaulting to Australia (+61).
 * Returns null when the input can't be confidently resolved to a valid number,
 * so callers can simply skip SMS rather than text a bad number.
 */
export function normalizePhone(input: string | undefined | null): string | null {
  if (!input) return null;

  // Keep a single leading +, strip everything else that isn't a digit.
  const trimmed = input.trim();
  const hasPlus = trimmed.startsWith("+");
  const digits = trimmed.replace(/\D/g, "");
  if (!digits) return null;

  let e164: string;
  if (hasPlus) {
    e164 = `+${digits}`;
  } else if (digits.startsWith("0")) {
    // AU national format: 0412 345 678 -> +61412345678
    e164 = `+61${digits.slice(1)}`;
  } else if (digits.startsWith("61")) {
    e164 = `+${digits}`;
  } else if (digits.length === 9 && digits.startsWith("4")) {
    // AU mobile without the leading 0: 412345678 -> +61412345678
    e164 = `+61${digits}`;
  } else {
    // Ambiguous (could be any country) — don't guess.
    return null;
  }

  // E.164: + followed by 8–15 digits, first digit non-zero.
  return /^\+[1-9]\d{7,14}$/.test(e164) ? e164 : null;
}

// ─── Outbound send ───────────────────────────────────────────────────────────

/**
 * Send an SMS via Twilio's REST API. Best-effort: resolves to false on any
 * failure (logs a warning) and never throws. No-op when Twilio env is missing.
 */
export async function sendSms(to: string, body: string): Promise<boolean> {
  const sid = process.env.TWILIO_ACCOUNT_SID;
  const token = process.env.TWILIO_AUTH_TOKEN;
  const from = process.env.TWILIO_FROM_NUMBER;
  if (!sid || !token || !from) return false;

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);

  try {
    const res = await fetch(
      `https://api.twilio.com/2010-04-01/Accounts/${sid}/Messages.json`,
      {
        method: "POST",
        headers: {
          Authorization: `Basic ${Buffer.from(`${sid}:${token}`).toString("base64")}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({ To: to, From: from, Body: body }).toString(),
        signal: controller.signal,
      }
    );

    if (!res.ok) {
      const text = await res.text().catch(() => "");
      console.warn("Twilio send failed:", res.status, text.slice(0, 300));
      return false;
    }
    return true;
  } catch (err) {
    console.warn("Twilio send error:", (err as Error).message);
    return false;
  } finally {
    clearTimeout(timer);
  }
}

// ─── Inbound webhook signature validation ────────────────────────────────────

/**
 * Validate Twilio's X-Twilio-Signature for an inbound webhook.
 * Algorithm: HMAC-SHA1 over (url + each POST param as key+value, sorted by key),
 * base64-encoded, compared in constant time to the header.
 *
 * Fails CLOSED — returns false if the auth token is missing, so a misconfigured
 * deploy rejects requests rather than trusting them.
 */
export function validateTwilioSignature(
  url: string,
  params: Record<string, string>,
  signature: string | null
): boolean {
  const token = process.env.TWILIO_AUTH_TOKEN;
  if (!token || !signature) return false;

  let data = url;
  for (const key of Object.keys(params).sort()) {
    data += key + params[key];
  }

  const expected = createHmac("sha1", token)
    .update(Buffer.from(data, "utf-8"))
    .digest("base64");

  const a = Buffer.from(expected);
  const b = Buffer.from(signature);
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

// ─── Opener templates ────────────────────────────────────────────────────────

/**
 * The first SMS we send a consenting lead. Always identifies clupai (Spam Act
 * sender ID) and carries a working opt-out ("Reply STOP"). The booking source is
 * confirmation-flavored because they've already booked a call.
 */
export function opener(source: SmsSource, firstName: string): string {
  const hi = firstName ? `Hi ${firstName}` : "Hi";
  switch (source) {
    case "funnel":
      return `${hi}, it's clupai. Got your details. To tailor things, what's the main thing you want sorted? Or grab a quick call: ${SMS_BOOK_URL}\nReply STOP to opt out.`;
    case "booking":
      return `${hi}, it's clupai. Your call is locked in, looking forward to it. If anything changes or you want to add context beforehand, just reply here.\nReply STOP to opt out.`;
    case "contact":
    default:
      return `${hi}, it's clupai, thanks for reaching out. So we can point you the right way, what are you hoping to get sorted? Or book a quick call: ${SMS_BOOK_URL}\nReply STOP to opt out.`;
  }
}

/** First name from a full name, for friendly SMS copy. */
export function firstNameOf(name: string | undefined | null): string {
  return (name ?? "").trim().split(/\s+/)[0] ?? "";
}
