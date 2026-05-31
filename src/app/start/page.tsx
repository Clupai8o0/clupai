import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/nav";
import Footer from "@/components/footer";
import CalBooking from "@/components/cal-booking";
import AuditForm from "./audit-form";
import Funnel from "./funnel";

export const metadata: Metadata = {
  title: { absolute: "Start — Clupai Melbourne Web Studio" },
  description:
    "Book a free scope call with the studio behind Clupai. Melbourne websites, SEO and automation — fixed-price quotes, no account managers.",
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
  "Fixed-price quotes",
  "Replies within 1 business day",
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

          <div
            className="cp-cta-buttons"
            style={{ display: "flex", gap: 12, marginTop: 32, flexWrap: "wrap", ...fadeUp(0.12) }}
          >
            <a href="#funnel" className="cp-btn cp-btn-primary cp-btn-lg">
              Find your fit
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
        </div>
      </section>

      {/* Funnel — problem → solution → contact → pricing */}
      <section id="funnel" style={{ padding: "72px 48px", scrollMarginTop: 80 }}>
        <div style={{ maxWidth: 820, margin: "0 auto 36px", textAlign: "center" }}>
          <div className="cp-eyebrow" style={{ marginBottom: 12 }}>
            Find your fit
          </div>
          <h2 className="cp-display" style={{ fontSize: "var(--fs-h2)", margin: 0 }}>
            Tell us the problem.
            <br />
            <span style={{ color: "var(--accent)" }}>
              Get your pricing in 30 seconds.
            </span>
          </h2>
        </div>
        <Funnel />
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
