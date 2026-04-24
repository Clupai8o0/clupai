import type { CSSProperties } from "react";

interface PlaceholderProps {
  label?: string;
  w?: string | number;
  h?: number;
  style?: CSSProperties;
}

export default function Placeholder({
  label = "placeholder",
  w = "100%",
  h = 80,
  style = {},
}: PlaceholderProps) {
  return (
    <div
      style={{
        width: w,
        height: h,
        background:
          "repeating-linear-gradient(135deg, #0f0f0f 0 8px, #141414 8px 16px)",
        border: "1px solid var(--border)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "var(--text-dim)",
        fontFamily:
          'var(--font-mono), "JetBrains Mono", ui-monospace, monospace',
        fontSize: 10,
        letterSpacing: "0.1em",
        textTransform: "uppercase",
        ...style,
      }}
    >
      {label}
    </div>
  );
}
