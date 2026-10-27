// Twilio inbound SMS webhook. When a lead replies to our opener, Twilio POSTs
// here (application/x-www-form-urlencoded). We validate Twilio's signature, run
// the deterministic guardrails (dedup, opt-out, rate-limit, caps), then let the
// Claude assistant reply. We send the reply via the REST API and return empty
// TwiML, so Twilio doesn't also send anything.
//
// node runtime: required for node:crypto signature validation (see sms.ts).

import { type NextRequest, NextResponse } from "next/server";
import { normalizePhone, sendSms, validateTwilioSignature } from "@/lib/sms";
import {
  loadConv,
  saveConv,
  markSeen,
  withinRateLimit,
  underDailyLlmCap,
  turnCapReached,
  isOptedOut,
  setOptOut,
  clearOptOut,
  runAssistant,
  SAFE_BOOKING_REPLY,
  MAX_INBOUND_CHARS,
  type ConvState,
} from "@/lib/sms-conversation";
import { notifyTelegram, tgEsc } from "@/lib/notify";

export const runtime = "nodejs";

const STOP_WORDS = new Set(["STOP", "STOPALL", "UNSUBSCRIBE", "CANCEL", "END", "QUIT"]);
const START_WORDS = new Set(["START", "UNSTOP", "YES"]);

const CAP_REPLY =
  "Thanks for all that. Let's pick the rest up on a quick call so we can be useful: https://clupai.com/contact";
const OPT_OUT_REPLY =
  "You're opted out of clupai texts. Reply START to opt back in. You can still reach us at hello@clupai.com.";
const OPT_IN_REPLY = "You're back in. What can we help you with?";
const COLD_REPLY =
  "Thanks for texting clupai. The quickest way to get going is a short call: https://clupai.com/contact. Reply STOP to opt out.";

/** Empty TwiML 200 — tells Twilio "handled, send nothing of your own". */
function twiml() {
  return new NextResponse(
    '<?xml version="1.0" encoding="UTF-8"?><Response></Response>',
    { status: 200, headers: { "Content-Type": "text/xml" } }
  );
}

/** Rebuild the exact public URL Twilio signed. Pinned env is most robust behind
 *  Vercel's proxy; fall back to forwarded headers (always https in production). */
function webhookUrl(request: NextRequest): string {
  const pinned = process.env.SMS_WEBHOOK_URL;
  if (pinned) return pinned;
  const host =
    request.headers.get("x-forwarded-host") ?? request.headers.get("host") ?? "";
  return `https://${host}${request.nextUrl.pathname}`;
}

export async function POST(request: NextRequest) {
  // 1. Read the raw body ONCE and parse it ourselves (signature needs the params).
  const raw = await request.text();
  const search = new URLSearchParams(raw);
  const params: Record<string, string> = {};
  search.forEach((v, k) => {
    params[k] = v;
  });

  // 2. Signature — fail closed. No LLM, no writes, no reply on failure.
  const signature = request.headers.get("x-twilio-signature");
  if (!validateTwilioSignature(webhookUrl(request), params, signature)) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 403 });
  }

  // 3. Extract the bits we need.
  const phone = normalizePhone(params.From);
  const bodyRaw = (params.Body ?? "").trim();
  const messageSid = params.MessageSid ?? params.SmsSid ?? "";
  if (!phone) return twiml();

  // 4. Idempotency — drop Twilio webhook retries before doing any work.
  if (!(await markSeen(messageSid))) return twiml();

  // Everything below is best-effort; once the signature passes we always return
  // 200 so Twilio never retry-storms us, even if an internal step throws.
  try {
    const firstWord = bodyRaw.toUpperCase().split(/\s+/)[0] ?? "";

    // 5. Opt-out / opt-in keywords — handled before the model ever runs.
    if (STOP_WORDS.has(firstWord)) {
      await setOptOut(phone);
      await sendSms(phone, OPT_OUT_REPLY);
      return twiml();
    }
    if (START_WORDS.has(firstWord)) {
      await clearOptOut(phone);
      await sendSms(phone, OPT_IN_REPLY);
      return twiml();
    }

    // 6. Respect a standing opt-out (anything that isn't a START keyword).
    if (await isOptedOut(phone)) return twiml();

    // 7. Per-phone burst limit — silently drop, don't reply (avoids cost loops).
    if (!(await withinRateLimit(phone))) return twiml();

    // 8. Unknown number (no opener was seeded) — one static nudge, no LLM session.
    const conv = await loadConv(phone);
    if (!conv) {
      await sendSms(phone, COLD_REPLY);
      return twiml();
    }

    // 9. Lifetime turn cap — send one closing nudge, then stay quiet.
    if (conv.capped) return twiml();
    if (turnCapReached(conv)) {
      conv.capped = true;
      conv.lastInboundAt = Date.now();
      await saveConv(conv);
      await sendSms(phone, CAP_REPLY);
      return twiml();
    }

    // 10. Global daily LLM ceiling — fall back to a static reply, skip the model.
    if (!(await underDailyLlmCap())) {
      await sendSms(phone, SAFE_BOOKING_REPLY);
      return twiml();
    }

    // 11. Run the assistant (input truncated to bound token cost + injection surface).
    const inbound = bodyRaw.slice(0, MAX_INBOUND_CHARS);
    const reply = await runAssistant(conv, inbound);

    // 12. Persist the exchange.
    conv.messages.push({ role: "user", content: inbound });
    conv.messages.push({ role: "assistant", content: reply });
    conv.turnCount += 1;
    conv.lastInboundAt = Date.now();
    await saveConv(conv);

    // 13. Reply + ping the studio.
    await sendSms(phone, reply);
    await pingStudio(conv, inbound, reply);
  } catch (err) {
    console.error("[sms/inbound] error:", err);
  }

  return twiml();
}

async function pingStudio(conv: ConvState, inbound: string, reply: string) {
  const who = [conv.name, conv.business].filter(Boolean).join(" · ") || conv.phone;
  await notifyTelegram(
    [
      "💬 <b>SMS reply</b> · clupai",
      "",
      `👤 ${tgEsc(who)} (${tgEsc(conv.phone)})`,
      `↩️ ${tgEsc(inbound)}`,
      `🤖 ${tgEsc(reply)}`,
    ].join("\n")
  );
}
