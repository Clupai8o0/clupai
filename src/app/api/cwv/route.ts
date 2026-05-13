// Route: GET /api/cwv?url=https://example.com&strategy=mobile
// Calls: https://www.googleapis.com/pagespeedonline/v5/runPagespeed

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get("url");
  const strategy = searchParams.get("strategy") ?? "mobile"; // "mobile" | "desktop"

  if (!url) {
    return Response.json({ error: "URL required" }, { status: 400 });
  }

  // Validate URL format
  try {
    new URL(url);
  } catch {
    return Response.json({ error: "Invalid URL" }, { status: 400 });
  }

  const apiKey = process.env.PSI_API_KEY; // optional — works without key but rate-limited
  const psiUrl = new URL(
    "https://www.googleapis.com/pagespeedonline/v5/runPagespeed"
  );
  psiUrl.searchParams.set("url", url);
  psiUrl.searchParams.set("strategy", strategy);
  psiUrl.searchParams.set("category", "performance");
  if (apiKey) psiUrl.searchParams.set("key", apiKey);

  let res: Response;
  try {
    res = await fetch(psiUrl.toString(), { next: { revalidate: 0 } });
  } catch {
    return Response.json(
      { error: "Failed to reach PageSpeed Insights API" },
      { status: 502 }
    );
  }

  if (!res.ok) {
    return Response.json(
      { error: "PageSpeed Insights API error" },
      { status: 502 }
    );
  }

  const data = (await res.json()) as {
    lighthouseResult?: {
      categories?: {
        performance?: { score?: number };
      };
      audits?: Record<
        string,
        { numericValue?: number; displayValue?: string }
      >;
    };
  };

  const lhr = data.lighthouseResult;
  const categories = lhr?.categories;
  const audits = lhr?.audits;

  const score = Math.round((categories?.performance?.score ?? 0) * 100);

  const metrics = {
    score,
    lcp: audits?.["largest-contentful-paint"]?.numericValue ?? null,
    lcpDisplay: audits?.["largest-contentful-paint"]?.displayValue ?? null,
    inp: audits?.["interaction-to-next-paint"]?.numericValue ?? null,
    inpDisplay: audits?.["interaction-to-next-paint"]?.displayValue ?? null,
    cls: audits?.["cumulative-layout-shift"]?.numericValue ?? null,
    clsDisplay: audits?.["cumulative-layout-shift"]?.displayValue ?? null,
    fcp: audits?.["first-contentful-paint"]?.numericValue ?? null,
    fcpDisplay: audits?.["first-contentful-paint"]?.displayValue ?? null,
    tbt: audits?.["total-blocking-time"]?.numericValue ?? null,
    tbtDisplay: audits?.["total-blocking-time"]?.displayValue ?? null,
    strategy,
    url,
  };

  return Response.json(metrics);
}
