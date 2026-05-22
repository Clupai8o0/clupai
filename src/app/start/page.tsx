import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/nav";
import Footer from "@/components/footer";
import CalBooking from "@/components/cal-booking";
import AuditForm from "./audit-form";

const DISPLAY =
  "var(--font-display), Manrope, ui-sans-serif, system-ui, sans-serif";

export const metadata: Metadata = {
  title: { absolute: "Start — Clupai Melbourne Web Studio" },
  description:
    "Book a free scope call with the studio behind Clupai. Melbourne websites, SEO and automation — transparent pricing, no account managers.",
  robots: { index: false, follow: false },
};

const arrow = (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M2 7h10M8 3l4 4-4 4" />
  </svg>
);

const proof = [
  "Melbourne-based",
  "ABN registered",
  "Transparent pricing",
  "Replies within 1 business day",
];

const services = [
  {
    label: "Websites",
    line: "Custom Next.js builds, WordPress rebuilds, Core Web Vitals.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="16" rx="2" />
        <path d="M3 9h18M7 6.5h.01M10 6.5h.01" />
      </svg>
    ),
  },
  {
    label: "SEO",
    line: "Local Melbourne SEO, GBP setup, on-page + technical.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="7" />
        <path d="M16 16l5 5" />
      </svg>
    ),
  },
  {
    label: "Automation",
    line: "n8n, internal tools, booking flows, client portals.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M13 2L4 14h7l-1 8 9-12h-7l1-8z" />
      </svg>
    ),
  },
];

function fadeUp(delay: number): React.CSSProperties {
  return {
    animation: "cp-fade-up 0.55s cubic-bezier(0.16, 1, 0.3, 1) both",
    animationDelay: `${delay}s`,
  };
}

export default function StartPage() {
  return (
    <>
      <Nav />

      {/* Hero */}
      <section style={{ padding: "64px 48px 48px" }}>
        <div style={{ maxWidth: 760 }}>
          <span className="cp-chip" style={fadeUp(0)}>
            <span className="dot" />
            Melbourne · web studio
          </span>

          <h1
            className="cp-display"
            style={{ fontSize: "var(--fs-hero)", margin: "22px 0 0", ...fadeUp(0.06) }}
          >
            Melbourne websites,
            <br />
            <span style={{ color: "var(--accent)" }}>SEO + automation.</span>
          </h1>

          <p
            style={{
              color: "var(--text-muted)",
              fontSize: 18,
              lineHeight: 1.5,
              margin: "20px 0 0",
              maxWidth: 520,
              ...fadeUp(0.12),
            }}
          >
            I&apos;m Sam — transparent pricing, no account managers.
          </p>

          <div
            className="cp-cta-buttons"
            style={{ display: "flex", gap: 12, marginTop: 32, flexWrap: "wrap", ...fadeUp(0.18) }}
          >
            <a href="#book" className="cp-btn cp-btn-primary cp-btn-lg">
              Book a call
              {arrow}
            </a>
            <Link href="/work" className="cp-btn cp-btn-ghost cp-btn-lg">
              See case studies
            </Link>
            <a href="#audit" className="cp-btn cp-btn-ghost cp-btn-lg">
              Get the free site audit
            </a>
          </div>
        </div>
      </section>

      {/* Proof bar */}
      <section
        style={{
          padding: "20px 48px",
          borderTop: "1px solid var(--border)",
          borderBottom: "1px solid var(--border)",
          background: "var(--surface)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
          {proof.map((p) => (
            <span key={p} className="cp-mono" style={{ color: "var(--text-muted)" }}>
              {p}
            </span>
          ))}
          {[0, 1].map((i) => (
            <span
              key={i}
              className="cp-mono"
              style={{
                display: "inline-flex",
                alignItems: "center",
                padding: "6px 14px",
                border: "1px dashed var(--border-2)",
                borderRadius: "var(--radius)",
                color: "var(--text-dim)",
              }}
            >
              [Client logo]
            </span>
          ))}
        </div>
      </section>

      {/* What I do */}
      <section style={{ padding: "72px 48px" }}>
        <div className="cp-eyebrow" style={{ marginBottom: 24 }}>
          What I do
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
          {services.map((s) => (
            <div
              key={s.label}
              className="cp-card"
              style={{ padding: "28px 24px", display: "flex", flexDirection: "column", gap: 14 }}
            >
              <span style={{ color: "var(--accent)" }}>{s.icon}</span>
              <div
                style={{
                  fontFamily: DISPLAY,
                  fontWeight: 700,
                  fontSize: 20,
                  letterSpacing: "-0.02em",
                }}
              >
                {s.label}
              </div>
              <p style={{ color: "var(--text-muted)", fontSize: 15, lineHeight: 1.55, margin: 0 }}>
                {s.line}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Book — live Cal.com */}
      <section
        id="book"
        style={{
          padding: "72px 48px",
          borderTop: "1px solid var(--border)",
          background: "var(--surface)",
          scrollMarginTop: 80,
        }}
      >
        <div className="cp-eyebrow" style={{ marginBottom: 12 }}>
          Book a scope call
        </div>
        <h2
          className="cp-display"
          style={{ fontSize: "var(--fs-h2)", margin: "0 0 28px", maxWidth: 620 }}
        >
          Pick a time. I&apos;ll tell you if I can help.
        </h2>
        <CalBooking />
        <div className="cp-mono" style={{ marginTop: 20, color: "var(--text-muted)" }}>
          Cal.com (open-source) · no CRM spam · one calendar invite and nothing else.
        </div>
      </section>

      {/* Free site audit — email capture */}
      <section
        id="audit"
        style={{
          padding: "72px 48px",
          borderTop: "1px solid var(--border)",
          scrollMarginTop: 80,
        }}
      >
        <div style={{ maxWidth: 560 }}>
          <div className="cp-eyebrow" style={{ marginBottom: 12 }}>
            Free site audit
          </div>
          <h2 className="cp-display" style={{ fontSize: "var(--fs-h2)", margin: "0 0 14px" }}>
            Get a free 10-minute site audit.
          </h2>
          <p style={{ color: "var(--text-muted)", fontSize: 16, lineHeight: 1.55, margin: "0 0 28px" }}>
            I&apos;ll record a Loom walking through your biggest conversion and
            speed issues. No pitch — just the findings.
          </p>
          <AuditForm />
        </div>
      </section>

      <Footer />
    </>
  );
}
