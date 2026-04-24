export default function Row({ k, v }: { k: string; v: string }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13 }}>
      <span className="cp-mono">{k}</span>
      <span
        style={{
          color: "var(--text)",
          fontFamily:
            "var(--font-display), Manrope, ui-sans-serif, system-ui, sans-serif",
          fontWeight: 500,
        }}
      >
        {v}
      </span>
    </div>
  );
}
