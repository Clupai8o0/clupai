import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Clupai. Your software live by the date we agree, or you stop paying.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image()
{
  return new ImageResponse(
    (
      <div
        style={{
          background: "#1f2de6",
          color: "#ffffff",
          width: "100%",
          height: "100%",
          padding: "64px 72px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", fontSize: 40, fontWeight: 700, letterSpacing: "-0.03em" }}>clupai</div>
        <div
          style={{
            display: "flex",
            fontSize: 88,
            fontWeight: 700,
            letterSpacing: "-0.035em",
            lineHeight: 1.04,
          }}
        >
          Your software live by the date we agree, or you stop paying.
        </div>
      </div>
    ),
    { ...size },
  );
}
