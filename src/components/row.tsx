export default function Row({ k, v }: { k: string; v: string }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", gap: 24, fontSize: 13 }}>
      <span className="cp-mono" style={{ flexShrink: 0 }}>{k}</span>
      <span
        style={{
          color: "var(--text)",
          fontFamily:
            "var(--font-display), Manrope, ui-sans-serif, system-ui, sans-serif",
          fontWeight: 500,
          textAlign: "right",
        }}
      >
        {v}
      </span>
    </div>
  );
}
