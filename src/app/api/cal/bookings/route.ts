import { type NextRequest, NextResponse } from "next/server";
import { resolveEventTypeId } from "../_resolve";
import { notifyTelegram, tgEsc } from "@/lib/notify";
import { clientIp, hourlyLimiter } from "@/lib/rate-limit";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const isRateLimited = hourlyLimiter("cal-bookings:", 5);

function text(value: unknown, max: number): string
{
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

export async function POST(request: NextRequest) {
  const apiKey = process.env.CAL_API_KEY;

  if (!apiKey) {
    console.error("CAL_API_KEY is not set");
    return NextResponse.json({ error: "Booking isn’t available right now" }, { status: 500 });
  }

  // Each booking sends an invite to whatever address it's given, so a stranger mustn't be able to repeat it.
  if (await isRateLimited(clientIp(request) ?? "unknown")) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const start = text(body.start, 40);
  const name = text(body.name, 120);
  const email = text(body.email, 254);
  const phone = text(body.phone, 40);
  const projectType = text(body.projectType, 120);
  const budget = text(body.budget, 120);
  const timeline = text(body.timeline, 120);
  const currentSite = text(body.currentSite, 200);
  const startMs = Date.parse(start);

  if (!name || !EMAIL_RE.test(email) || !Number.isFinite(startMs) || startMs < Date.now()) {
    return NextResponse.json({ error: "A future time, a name and a valid email are required" }, { status: 400 });
  }

  let eventTypeId: number;
  try {
    eventTypeId = await resolveEventTypeId();
  } catch (err) {
    console.error("Event type resolution error:", err);
    return NextResponse.json({ error: "Booking isn’t available right now" }, { status: 502 });
  }

  try {
    const res = await fetch("https://api.cal.com/v2/bookings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
        "cal-api-version": "2024-08-13",
      },
      body: JSON.stringify({
        start,
        eventTypeId,
        attendee: {
          name,
          email,
          timeZone: "Australia/Melbourne",
          language: "en",
        },
        metadata: { projectType, budget, timeline, currentSite },
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      console.error(`Cal.com booking ${res.status}:`, data?.error?.message ?? data?.message);
      return NextResponse.json({ error: "Booking failed" }, { status: res.status });
    }

    // Instant phone ping — a booked call is the highest-value event.
    let startFmt = start;
    try {
      startFmt = new Intl.DateTimeFormat("en-AU", {
        dateStyle: "full",
        timeStyle: "short",
        timeZone: "Australia/Melbourne",
      }).format(new Date(start));
    } catch {
      /* fall back to the raw ISO string */
    }
    await notifyTelegram(
      [
        "📅 <b>New call booked</b>",
        "",
        `👤 ${tgEsc(name)}`,
        `✉️ ${tgEsc(email)}`,
        phone ? `📞 ${tgEsc(phone)}` : null,
        `🗓️ ${tgEsc(startFmt)} · Melbourne`,
        projectType ? `🔧 ${tgEsc(projectType)}` : null,
        budget ? `💰 ${tgEsc(budget)}` : null,
        timeline ? `⏱️ ${tgEsc(timeline)}` : null,
        currentSite ? `🌐 ${tgEsc(currentSite)}` : null,
      ]
        .filter(Boolean)
        .join("\n")
    );

    return NextResponse.json(data);
  } catch (err) {
    console.error("Cal.com booking error:", err);
    return NextResponse.json({ error: "Network error" }, { status: 502 });
  }
}
