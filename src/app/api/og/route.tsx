import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const title =
    searchParams.get("title") ?? "clupai — Melbourne web, SEO & automation";
  const description = searchParams.get("description") ?? "";

  return new ImageResponse(
    (
      <div
        style={{
          background: "#050505",
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          fontFamily: "system-ui, -apple-system, sans-serif",
        }}
      >
        {/* accent bar */}
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            bottom: 0,
            width: 4,
            background: "#4DA3FF",
            display: "flex",
          }}
        />

        <div
          style={{
            padding: "64px 72px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            flex: 1,
          }}
        >
          {/* top */}
          <div style={{ display: "flex", alignItems: "center" }}>
            <span
              style={{
                color: "#4DA3FF",
                fontSize: 22,
                fontWeight: 700,
                letterSpacing: "-0.02em",
              }}
            >
              clupai
            </span>
          </div>

          {/* middle */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div
              style={{
                color: "#ffffff",
                fontSize: title.length > 50 ? 52 : 64,
                fontWeight: 700,
                letterSpacing: "-0.03em",
                lineHeight: 1.05,
                maxWidth: 900,
              }}
            >
              {title}
            </div>
            {description && (
              <div
                style={{
                  color: "rgba(255,255,255,0.6)",
                  fontSize: 24,
                  lineHeight: 1.4,
                  maxWidth: 800,
                }}
              >
                {description}
              </div>
            )}
          </div>

          {/* bottom */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span
              style={{
                color: "rgba(255,255,255,0.4)",
                fontSize: 16,
                fontFamily: "monospace",
              }}
            >
              clupai.com
            </span>
            <span style={{ color: "rgba(255,255,255,0.4)", fontSize: 16 }}>
              Melbourne web · SEO · automation
            </span>
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
