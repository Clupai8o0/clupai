import { type NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
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

  // TODO: wire Resend (audit request + confirmation). Logging for now.
  console.log("[start-capture] audit request:", email);

  return NextResponse.json({ ok: true });
}
