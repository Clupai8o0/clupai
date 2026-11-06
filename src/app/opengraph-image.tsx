import { ImageResponse } from "next/og";
import { C, STAR } from "@/components/logo";

export const runtime = "edge";
export const alt = "clupai. Your software live by the date we agree, or you stop paying.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image()
{
  return new ImageResponse(
    (
      <div
        style={{
          background: "#ffe100",
          color: "#070707",
          width: "100%",
          height: "100%",
          padding: "48px 56px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 26 }}>
          <svg width="112" height="112" viewBox="0 0 100 100">
            <rect x="2" y="2" width="96" height="96" rx="22.5" fill="#050505" />
            <path d={C} fill="#f5f5f6" />
            <path d={STAR} fill="#4da3ff" />
          </svg>
          <div style={{ display: "flex", fontSize: 64, fontWeight: 600, letterSpacing: "-0.05em" }}>clupai</div>
        </div>
        <div style={{ display: "flex", fontSize: 96, fontWeight: 600, letterSpacing: "-0.05em", lineHeight: 0.96 }}>
          Your software live by the date we agree, or you stop paying.
        </div>
      </div>
    ),
    { ...size },
  );
}
