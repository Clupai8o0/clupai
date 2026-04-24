import Link from "next/link";
import Nav from "@/components/nav";
import Footer from "@/components/footer";
import FinalCTA from "@/components/final-cta";

const services = [
  {
    n: "01",
    slug: "web",
    h: "Websites",
    price: "from $3,950",
    desc: "Next.js marketing sites that ask for the sale. 3–5 weeks, fixed price, you own the repo.",
    items: ["Copy + design + build", "Schema, analytics, CWV", "Cal.com / Calendly wired in"],
  },
  {
    n: "02",
    slug: "ads",
    h: "Google Ads",
    price: "from $1,500/mo",
    desc: "Search + PMax, built in week one, tuned every week. You keep the account.",
    items: ["Audit + rebuild", "Weekly tuning", "Honest monthly reviews"],
  },
  {
    n: "03",
    slug: "seo",
    h: "SEO",
    price: "from $1,200/mo",
    desc: "Technical + local + a handful of posts worth reading. No doorway pages.",
    items: ["Core Web Vitals", "Google Business Profile", "2–4 posts/month"],
  },
  {
    n: "04",
    slug: "automation",
    h: "Automation",
    price: "from $5,000",
    desc: "Zapier, Make, n8n, internal tools. The plumbing nobody wants to do.",
    items: ["Process mapping", "Workflow build", "Internal dashboards"],
  },
];

const packages = [
  ["Good", "$3,950", "Launch site. One job, done well."],
  ["Better", "$8,950", "Site + 90 days ads + SEO. Zero to revenue."],
  ["Best", "$2,500/mo", "Operator retainer. Compound over 12 months."],
];

export default function ServicesPage() {
  return (
    <>
      <Nav page="services" />

      <div
        style={{
          padding: "80px 48px 56px",
          borderBottom: "1px solid var(--border)",
        }}
      >
        <div className="cp-eyebrow" style={{ marginBottom: 12 }}>
          Services · four things, done end‑to‑end
        </div>
        <h1
          className="cp-display"
          style={{
            fontSize: "clamp(3rem, 6vw, 5.5rem)",
            margin: 0,
            maxWidth: 1200,
          }}
        >
          Websites, ads, SEO, automation.
          <br />
          <span style={{ color: "var(--accent)" }}>
            All me. All fixed price.
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
          Pick one. Pick all four. I run them the same way either way—one
          operator, one Slack channel, one invoice.
        </p>
      </div>

      <div style={{ padding: "0 48px 48px" }}>
        {services.map((s) => (
          <Link
            key={s.n}
            href={`/services/${s.slug}`}
            style={{
              display: "grid",
              gridTemplateColumns: "80px 1fr 1fr 280px",
              gap: 32,
              padding: "40px 0",
              borderBottom: "1px solid var(--border)",
              alignItems: "start",
              cursor: "pointer",
            }}
          >
            <div
              className="cp-num"
              style={{
                fontSize: 48,
                color: "var(--accent)",
                letterSpacing: "-0.04em",
                lineHeight: 0.9,
              }}
            >
              {s.n}
            </div>
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
                Open /services/{s.slug} →
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div
        style={{
          padding: "72px 48px",
          background: "var(--surface)",
          borderTop: "1px solid var(--border)",
          borderBottom: "1px solid var(--border)",
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
          {packages.map(([h, p, d]) => (
            <div key={h} className="cp-card" style={{ padding: 28 }}>
              <div className="cp-mono" style={{ marginBottom: 12 }}>
                {h.toUpperCase()}
              </div>
              <div
                className="cp-num"
                style={{
                  fontSize: 54,
                  letterSpacing: "-0.04em",
                  color: "var(--text)",
                }}
              >
                {p}
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
              <Link
                href="/pricing"
                style={{
                  marginTop: 20,
                  display: "inline-block",
                  color: "var(--accent)",
                  fontFamily:
                    "var(--font-display), Manrope, ui-sans-serif, system-ui, sans-serif",
                  fontWeight: 500,
                }}
              >
                See pricing →
              </Link>
            </div>
          ))}
        </div>
      </div>

      <FinalCTA />
      <Footer />
    </>
  );
}
