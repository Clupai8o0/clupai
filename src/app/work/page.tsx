import Link from "next/link";
import Nav from "@/components/nav";
import Footer from "@/components/footer";
import FinalCTA from "@/components/final-cta";
import Placeholder from "@/components/placeholder";

const cases = [
  {
    slug: "brunswick-legal",
    stat: "+184%",
    sstat: "intake calls",
    tag: "Websites",
    client: "Brunswick Legal Co.",
    kind: "Law firm · Brunswick, VIC",
    year: "2025",
  },
  {
    slug: "kairos-clinic",
    stat: "−62%",
    sstat: "cost per booking",
    tag: "Ads · Websites",
    client: "Kairos Clinic",
    kind: "Allied health · Carlton",
    year: "2025",
  },
  {
    slug: "tapcraft-trade",
    stat: "+3.1x",
    sstat: "jobs booked via site",
    tag: "Automation · SEO",
    client: "TapCraft Trade",
    kind: "Plumbing · inner-north",
    year: "2026",
  },
  {
    slug: "north-dental",
    stat: "+310%",
    sstat: "organic traffic",
    tag: "SEO",
    client: "North Dental",
    kind: "Dental · Coburg",
    year: "2025",
  },
  {
    slug: "loam-loft",
    stat: "+52%",
    sstat: "AOV",
    tag: "Websites",
    client: "Loam & Loft",
    kind: "Interiors retail · Fitzroy",
    year: "2024",
  },
  {
    slug: "roam-realty",
    stat: "4.2s→0.9s",
    sstat: "LCP",
    tag: "Websites",
    client: "Roam Realty",
    kind: "Real estate · Richmond",
    year: "2024",
  },
];

const filters = ["All", "Websites", "Ads", "SEO", "Automation"];

export default function WorkPage() {
  return (
    <>
      <Nav page="work" />

      <div
        style={{
          padding: "80px 48px 40px",
          borderBottom: "1px solid var(--border)",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "end",
          }}
        >
          <div>
            <div className="cp-eyebrow" style={{ marginBottom: 12 }}>
              Work · real projects · real numbers
            </div>
            <h1
              className="cp-display"
              style={{ fontSize: "clamp(3rem, 6vw, 5.5rem)", margin: 0 }}
            >
              Twenty‑four builds.
              <br />
              <span style={{ color: "var(--accent)" }}>
                Six worth showing.
              </span>
            </h1>
          </div>
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            {filters.map((f, i) => (
              <span
                key={f}
                className="cp-chip"
                style={{
                  background: i === 0 ? "var(--accent)" : "transparent",
                  color:
                    i === 0 ? "var(--accent-ink)" : "var(--text-muted)",
                  borderColor:
                    i === 0 ? "var(--accent)" : "var(--border-2)",
                  cursor: "pointer",
                }}
              >
                {f}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div
        style={{
          padding: "0 48px",
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
        }}
      >
        {cases.map((c, i) => (
          <Link
            key={c.slug}
            href={`/work/${c.slug}`}
            style={{
              padding: "40px 32px",
              borderRight:
                i % 3 !== 2 ? "1px solid var(--border)" : "none",
              borderBottom: "1px solid var(--border)",
              display: "flex",
              flexDirection: "column",
              minHeight: 420,
              position: "relative",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span className="cp-mono">{c.tag}</span>
              <span className="cp-mono">{c.year}</span>
            </div>
            <Placeholder
              label={`${c.client} hero`}
              h={160}
              style={{ marginTop: 20 }}
            />
            <div
              className="cp-num"
              style={{
                fontSize: 72,
                color: "var(--accent)",
                letterSpacing: "-0.05em",
                marginTop: 28,
                lineHeight: 0.9,
              }}
            >
              {c.stat}
            </div>
            <div
              className="cp-mono"
              style={{ color: "var(--text-muted)", marginTop: 4 }}
            >
              {c.sstat}
            </div>
            <div
              style={{
                fontFamily:
                  "var(--font-display), Manrope, ui-sans-serif, system-ui, sans-serif",
                fontWeight: 700,
                fontSize: 22,
                letterSpacing: "-0.02em",
                marginTop: 24,
              }}
            >
              {c.client}
            </div>
            <div
              className="cp-mono"
              style={{ color: "var(--text-muted)", marginTop: 4 }}
            >
              {c.kind}
            </div>
            <div
              style={{
                marginTop: "auto",
                paddingTop: 20,
                color: "var(--accent)",
                fontFamily:
                  "var(--font-display), Manrope, ui-sans-serif, system-ui, sans-serif",
                fontWeight: 500,
                fontSize: 14,
              }}
            >
              Read case study →
            </div>
          </Link>
        ))}
      </div>

      <FinalCTA />
      <Footer />
    </>
  );
}
