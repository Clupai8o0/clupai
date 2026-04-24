import type { CSSProperties, ReactNode } from "react";

interface MarqueeProps {
  children: ReactNode;
  speed?: number;
  reverse?: boolean;
  style?: CSSProperties;
}

export default function Marquee({
  children,
  speed = 60,
  reverse = false,
  style,
}: MarqueeProps) {
  return (
    <div
      style={{
        overflow: "hidden",
        whiteSpace: "nowrap",
        display: "flex",
        ...style,
      }}
    >
      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 48,
          paddingRight: 48,
          animation: `cp-marquee ${speed}s linear infinite${reverse ? " reverse" : ""}`,
        }}
      >
        {children}
        {children}
      </div>
    </div>
  );
}
