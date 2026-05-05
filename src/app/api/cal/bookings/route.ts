import { type NextRequest, NextResponse } from "next/server";
import { resolveEventTypeId } from "../_resolve";

export async function POST(request: NextRequest) {
  const apiKey = process.env.CAL_API_KEY;

  if (!apiKey) {
    return NextResponse.json({ error: "CAL_API_KEY must be set in .env.local" }, { status: 500 });
  }

  let body: Record<string, string>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const { start, name, email, projectType, budget, timeline, currentSite } = body;

  if (!start || !name || !email) {
    return NextResponse.json({ error: "start, name, and email are required" }, { status: 400 });
  }

  let eventTypeId: number;
  try {
    eventTypeId = await resolveEventTypeId();
  } catch (err) {
    console.error("Event type resolution error:", err);
    return NextResponse.json({ error: String(err) }, { status: 502 });
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
        metadata: {
          projectType: projectType ?? "",
          budget: budget ?? "",
          timeline: timeline ?? "",
          currentSite: currentSite ?? "",
        },
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      const msg = data?.error?.message ?? data?.message ?? "Booking failed";
      return NextResponse.json({ error: msg }, { status: res.status });
    }

    return NextResponse.json(data);
  } catch (err) {
    console.error("Cal.com booking error:", err);
    return NextResponse.json({ error: "Network error" }, { status: 502 });
  }
}
