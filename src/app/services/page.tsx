import Link from "next/link";
import Nav from "@/components/nav";
import Footer from "@/components/footer";
import FinalCTA from "@/components/final-cta";
import { PACKAGES } from "@/data/pricing";

const DISPLAY =
  "var(--font-display), Manrope, ui-sans-serif, system-ui, sans-serif";

const services = [
  {
    slug: "web",
    h: "Websites",
    price: "Custom quote",
    desc: "Next.js marketing sites that ask for the sale. 3–5 weeks, fixed price, you own the repo.",
    items: ["Copy + design + build", "Schema, analytics, CWV", "Cal.com / Calendly wired in"],
  },
  {
    slug: "seo",
    h: "SEO",
    price: "Custom quote",
    desc: "Technical + local + a handful of posts worth reading. No doorway pages.",
    items: ["Core Web Vitals", "Google Business Profile", "2–4 posts/month"],
  },
  {
    slug: "automation",
    h: "Automation",
    price: "Custom quote",
    desc: "Zapier, Make, n8n, internal tools. The plumbing nobody wants to do.",
    items: ["Process mapping", "Workflow build", "Internal dashboards"],
  },
];

export default function ServicesPage() {
  return (
    <>
      <Nav page="services" />

      <div
        style={{
          padding: "80px 48px 56px",
        }}
      >
        <div className="cp-eyebrow" style={{ marginBottom: 12 }}>
          Services · three things, done end‑to‑end
        </div>
        <h1
          className="cp-display"
          style={{
            fontSize: "clamp(3rem, 6vw, 5.5rem)",
            margin: 0,
            maxWidth: 1200,
          }}
        >
          Websites, SEO, automation.
          <br />
          <span style={{ color: "var(--accent)" }}>
            All in. All fixed price.
          </span>
        </h1>
        <p
          style={{
            marginTop: 28,
            fontSize: 20,
            color: "var(--text-muted)",
            maxWidth: 720,
            lineHeight: 1.5,
          }}
        >
          Pick one. Pick all three. Same process either way — one Slack
          channel, one invoice.
        </p>
      </div>

      <div
        className="cp-service-list"
        style={{
          padding: "0 48px 48px",
          display: "flex",
          flexDirection: "column",
          gap: 16,
        }}
      >
        {services.map((s) => (
          <Link
            key={s.slug}
            href={`/services/${s.slug}`}
            className="cp-card cp-service-card"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 280px",
              gap: 32,
              padding: "36px 36px",
              alignItems: "start",
              textDecoration: "none",
            }}
          >
            <div>
              <h2
                className="cp-display"
                style={{ fontSize: 48, margin: 0, letterSpacing: "-0.03em" }}
              >
                {s.h}
              </h2>
              <div
                className="cp-mono"
                style={{ marginTop: 10, color: "var(--accent)" }}
              >
                {s.price}
              </div>
            </div>
            <p
              style={{
                margin: 0,
                color: "var(--text-muted)",
                fontSize: 16,
                lineHeight: 1.6,
              }}
            >
              {s.desc}
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {s.items.map((it) => (
                <div
                  key={it}
                  style={{
                    fontSize: 13,
                    color: "var(--text-muted)",
                    display: "flex",
                    gap: 8,
                  }}
                >
                  <span style={{ color: "var(--accent)" }}>→</span>
                  {it}
                </div>
              ))}
              <div
                style={{
                  marginTop: 14,
                  color: "var(--accent)",
                  fontFamily:
                    "var(--font-display), Manrope, ui-sans-serif, system-ui, sans-serif",
                  fontWeight: 500,
                  fontSize: 14,
                }}
              >
                Open /services/{s.slug}{" "}
                <span className="cp-service-arrow">→</span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div
        style={{
          padding: "72px 48px",
          background: "var(--surface)",
        }}
      >
        <div className="cp-mono" style={{ marginBottom: 20 }}>
          Good / better / best — bundles
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 24,
          }}
        >
          {PACKAGES.map(([h, , d]) => (
            <Link
              key={h}
              href="/pricing"
              className="cp-tone-card"
              style={{ padding: 28, display: "block", textDecoration: "none" }}
            >
              <div className="cp-mono" style={{ marginBottom: 12 }}>
                {h.toUpperCase()}
              </div>
              <div
                style={{
                  fontFamily: DISPLAY,
                  fontWeight: 700,
                  fontSize: 30,
                  letterSpacing: "-0.02em",
                  color: "var(--text)",
                }}
              >
                Custom quote
              </div>
              <p
                style={{
                  marginTop: 14,
                  color: "var(--text-muted)",
                  fontSize: 15,
                }}
              >
                {d}
              </p>
              <span
                style={{
                  marginTop: 20,
                  display: "inline-block",
                  color: "var(--accent)",
                  fontFamily: DISPLAY,
                  fontWeight: 500,
                }}
              >
                See the tiers →
              </span>
            </Link>
          ))}
        </div>
      </div>

      <FinalCTA />
      <Footer />
    </>
  );
}
