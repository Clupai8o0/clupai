import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "clupai — Melbourne web, SEO & automation studio";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
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
          <div style={{ display: "flex", alignItems: "baseline" }}>
            <span
              style={{
                color: "#ffffff",
                fontSize: 34,
                fontWeight: 800,
                letterSpacing: "-0.03em",
              }}
            >
              clup
            </span>
            <span style={{ color: "#4DA3FF", fontSize: 34, fontWeight: 800 }}>ai</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div
              style={{
                color: "#ffffff",
                fontSize: 64,
                fontWeight: 700,
                letterSpacing: "-0.03em",
                lineHeight: 1.05,
              }}
            >
              Websites, SEO, and automation that ship more customers.
            </div>
            <div
              style={{
                color: "rgba(255,255,255,0.6)",
                fontSize: 24,
                lineHeight: 1.4,
              }}
            >
              A Melbourne studio. End-to-end, without the bloat.
            </div>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
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
    { width: 1200, height: 630 }
  );
}
