import { type NextRequest, NextResponse } from "next/server";
import { resolveEventTypeId } from "../_resolve";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const month = searchParams.get("month"); // YYYY-MM
  // Every call is shown in Melbourne time, and a fixed zone keeps the 60-second cache below effective.
  const tz = "Australia/Melbourne";

  if (!month || !/^\d{4}-\d{2}$/.test(month)) {
    return NextResponse.json({ error: "month required (YYYY-MM)" }, { status: 400 });
  }

  // Melbourne is ahead of UTC, so a morning on the 1st is still the previous month in UTC. Ask for a
  // day either side, then keep only the dates in this month once Cal.com has grouped them in Melbourne time.
  const [year, mon] = month.split("-").map(Number) as [number, number];
  const startTime = new Date(Date.UTC(year, mon - 1, 0)).toISOString();
  const endTime = new Date(Date.UTC(year, mon, 1, 23, 59, 59)).toISOString();

  const apiKey = process.env.CAL_API_KEY;

  let eventTypeId: number;
  try {
    eventTypeId = await resolveEventTypeId();
  } catch (err) {
    console.error("Event type resolution error:", err);
    return NextResponse.json({ error: "Times aren’t available right now" }, { status: 502 });
  }

  const url = new URL("https://api.cal.com/v2/slots/available");
  url.searchParams.set("eventTypeId", String(eventTypeId));
  url.searchParams.set("startTime", startTime);
  url.searchParams.set("endTime", endTime);
  url.searchParams.set("timeZone", tz);

  const headers: Record<string, string> = {
    "cal-api-version": "2024-08-13",
  };
  if (apiKey) headers["Authorization"] = `Bearer ${apiKey}`;

  try {
    const res = await fetch(url.toString(), { headers, next: { revalidate: 60 } });

    if (!res.ok) {
      const err = await res.text();
      console.error(`Cal.com slots ${res.status}:`, err);
      return NextResponse.json({ error: "Times aren’t available right now" }, { status: 502 });
    }

    const data = (await res.json()) as { data?: { slots?: Record<string, unknown> } };
    const slots = Object.entries(data.data?.slots ?? {}).filter(([date]) => date.startsWith(`${month}-`));
    return NextResponse.json({ data: { slots: Object.fromEntries(slots) } });
  } catch (err) {
    console.error("Cal.com slots network error:", err);
    return NextResponse.json({ error: "Network error" }, { status: 502 });
  }
}
