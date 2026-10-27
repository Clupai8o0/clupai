// Cron target: sends opener SMS that were queued during quiet hours (outside
// 9am-8pm Melbourne). Vercel calls this on a schedule (see vercel.json) and, when
// CRON_SECRET is set, attaches `Authorization: Bearer <CRON_SECRET>` which we
// verify. The flush itself no-ops outside business hours, so the schedule can be
// coarse and still behave.

import { type NextRequest, NextResponse } from "next/server";
import { flushPendingOpeners } from "@/lib/sms-conversation";

export const runtime = "nodejs";

export async function GET(request: NextRequest) {
  const secret = process.env.CRON_SECRET;
  if (secret && request.headers.get("authorization") !== `Bearer ${secret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const sent = await flushPendingOpeners();
    return NextResponse.json({ ok: true, sent });
  } catch (err) {
    console.error("[sms/flush-openers] error:", err);
    return NextResponse.json({ error: "flush failed" }, { status: 500 });
  }
}
