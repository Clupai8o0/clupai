import Link from "next/link";

export default function FinalCTA() {
  return (
    <div
      style={{
        background: "var(--accent)",
        color: "var(--accent-ink)",
        padding: "80px 48px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 48,
        }}
      >
        <span
          className="cp-mono"
          style={{ color: "rgba(5,5,5,0.7)" }}
        >
          § 07 · Final
        </span>
        <span
          className="cp-mono"
          style={{ color: "rgba(5,5,5,0.7)" }}
        >
          clupai.com/contact
        </span>
      </div>

      <h2
        className="cp-display"
        style={{
          fontSize: "clamp(3rem, 7vw, 7rem)",
          margin: 0,
          color: "var(--accent-ink)",
        }}
      >
        Right. Shall
        <br />
        we scope it?
      </h2>

      <div
        style={{
          marginTop: 56,
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 48,
          alignItems: "end",
        }}
      >
        <p
          style={{
            fontSize: 22,
            color: "rgba(5,5,5,0.82)",
            maxWidth: 560,
            lineHeight: 1.5,
            margin: 0,
          }}
        >
          Twenty minutes. No slideshow. I&apos;ll ask what you sell, who&apos;s
          buying, and where the site is getting in the way. You&apos;ll leave
          with a realistic estimate—or a reason I&apos;m not the right fit.
        </p>
        <div
          style={{
            display: "flex",
            gap: 12,
            justifyContent: "flex-end",
            flexWrap: "wrap",
          }}
        >
          <Link
            href="/contact"
            className="cp-btn cp-btn-lg"
            style={{ background: "var(--bg)", color: "var(--accent)" }}
          >
            Book a 20‑minute scope call →
          </Link>
          <a
            href="mailto:hello@clupai.com"
            className="cp-btn cp-btn-lg"
            style={{
              background: "transparent",
              color: "var(--accent-ink)",
              border: "1.5px solid var(--accent-ink)",
            }}
          >
            Email hello@clupai.com
          </a>
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          bottom: 32,
          left: 48,
          right: 48,
          display: "flex",
          justifyContent: "space-between",
          fontFamily:
            'var(--font-mono), "JetBrains Mono", ui-monospace, monospace',
          fontSize: 10,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          color: "rgba(5,5,5,0.6)",
        }}
      >
        <span>Replies within one AU business day</span>
        <span>No waitlist · two slots open</span>
        <span>ABN · Melbourne · VIC</span>
      </div>
    </div>
  );
}
