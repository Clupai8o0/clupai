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
          <div
            style={{
              width: 112,
              height: 112,
              borderRadius: 56,
              background: "#070707",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: 10,
              paddingLeft: 16,
              paddingBottom: 25,
            }}
          >
            <div style={{ width: 10, height: 28, borderRadius: 5, background: "#ffe100", transform: "rotate(11deg)" }} />
            <div style={{ width: 10, height: 28, borderRadius: 5, background: "#ffe100", transform: "rotate(11deg)" }} />
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
