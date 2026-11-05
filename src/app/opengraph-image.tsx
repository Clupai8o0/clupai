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
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div style={{ display: "flex", fontSize: 44, fontWeight: 600, letterSpacing: "-0.05em" }}>clupai</div>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <div
              style={{
                width: 96,
                height: 96,
                borderRadius: 48,
                background: "#070707",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: 12,
              }}
            >
              <div style={{ width: 14, height: 30, background: "#ffe100" }} />
              <div style={{ width: 14, height: 30, background: "#ffe100" }} />
            </div>
            <div style={{ display: "flex", gap: 22 }}>
              <div style={{ width: 6, height: 44, background: "#070707" }} />
              <div style={{ width: 6, height: 44, background: "#070707" }} />
            </div>
          </div>
        </div>
        <div style={{ display: "flex", fontSize: 96, fontWeight: 600, letterSpacing: "-0.05em", lineHeight: 0.96 }}>
          Your software live by the date we agree, or you stop paying.
        </div>
      </div>
    ),
    { ...size },
  );
}
