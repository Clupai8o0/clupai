import { type NextRequest, NextResponse } from "next/server";
import { resolveEventTypeId } from "../_resolve";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const month = searchParams.get("month"); // YYYY-MM
  const tz = searchParams.get("tz") ?? "Australia/Melbourne";

  if (!month || !/^\d{4}-\d{2}$/.test(month)) {
    return NextResponse.json({ error: "month required (YYYY-MM)" }, { status: 400 });
  }

  const [year, mon] = month.split("-").map(Number);
  const startTime = `${year}-${String(mon).padStart(2, "0")}-01T00:00:00Z`;
  const lastDay = new Date(year, mon, 0).getDate();
  const endTime = `${year}-${String(mon).padStart(2, "0")}-${String(lastDay).padStart(2, "0")}T23:59:59Z`;

  const apiKey = process.env.CAL_API_KEY;

  let eventTypeId: number;
  try {
    eventTypeId = await resolveEventTypeId();
  } catch (err) {
    console.error("Event type resolution error:", err);
    return NextResponse.json({ error: String(err) }, { status: 502 });
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
      return NextResponse.json({ error: `Cal.com ${res.status}`, detail: err }, { status: 502 });
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (err) {
    console.error("Cal.com slots network error:", err);
    return NextResponse.json({ error: "Network error" }, { status: 502 });
  }
}
