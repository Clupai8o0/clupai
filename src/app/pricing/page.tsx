import Link from "next/link";
import Nav from "@/components/nav";
import Footer from "@/components/footer";

const tiers = [
  {
    name: "Launch",
    price: "$3,950",
    sub: "one‑off · 3–5 weeks",
    pitch: "The single-site build. Marketing site, copy, design, ship.",
    who: "Operators with a site that looks okay and sells badly.",
    accent: false,
    bullets: [
      "Up to 8 pages — home, services, about, contact, 3 content pages",
      "Copy draft on the first call. You edit; I refine.",
      "Next.js · Tailwind · MDX. You own the repo.",
      "Schema, sitemap, analytics, OG images, favicon pack",
      "2 rounds of revisions. Hand-off walkthrough.",
      "One month of post-launch tweaks included.",
    ],
    out: "Ads, SEO, or ongoing work. Those are their own tiers.",
  },
  {
    name: "Growth",
    price: "$8,950",
    sub: "one‑off · 6–8 weeks",
    pitch: "Site + launch campaign + 90 days of SEO. The full zero-to-revenue.",
    who: "A new service, new brand, or a business serious about the next 12 months.",
    accent: true,
    bullets: [
      "Everything in Launch",
      "Google Ads build — search + PMax, up to 3 campaigns",
      "90 days of SEO — technical, local, content (4 posts)",
      "Cal.com booking flow with budget-range qualification",
      "CRM wire-up — HubSpot, Attio, Airtable, or your sheet",
      "Weekly 20-minute check-ins for the first 90 days.",
    ],
    out: "Custom software, internal tools, complex integrations.",
  },
  {
    name: "Operator",
    price: "$2,500",
    sub: "per month · rolling",
    pitch: "I'm your marketing and engineering hire, for less than the equivalent salary.",
    who: "Businesses past product-market-fit, compounding reach month over month.",
    accent: false,
    bullets: [
      "Ads, SEO, automation — whatever moves the number",
      "One priority per week. Shipped, not queued.",
      "Monthly loom with the real numbers, no fluff deck",
      "Shared Linear — you see the roadmap I'm working from",
      "Direct line — Slack Connect or email, 1 AU biz day reply",
      "Month-to-month. No 12-month lock. No setup fee.",
    ],
    out: "Anything outside marketing + ops. Book a call.",
  },
];

const smallPrint = [
  [
    "No retainers in disguise",
    "Launch is one-off. Operator is month-to-month with 30 days' notice. No 12-month lock.",
  ],
  [
    "You own everything",
    "Code, hosting, ad accounts, analytics. Day one—not at the end of a contract.",
  ],
  [
    "Real reply times",
    "Under one Australian business day, every time. If I'm offline for leave, you'll know before you book.",
  ],
  [
    "Fixed, not time-and-materials",
    "Quotes are firm. If the scope changes, I'll say so before I bill—not after.",
  ],
];

export default function PricingPage() {
  return (
    <>
      <Nav page="pricing" />

      {/* Header */}
      <div
        style={{
          padding: "80px 48px 56px",
          borderBottom: "1px solid var(--border)",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: 28,
          }}
        >
          <span className="cp-eyebrow">Pricing · transparent by default</span>
          <span className="cp-mono">clupai.com/pricing</span>
        </div>
        <h1
          className="cp-display"
          style={{ fontSize: "clamp(3rem, 6vw, 5.5rem)", margin: 0, maxWidth: 1100 }}
        >
          Three tiers. Real prices.
          <br />
          <span style={{ color: "var(--accent)" }}>
            Everything outside them—book a call.
          </span>
        </h1>
        <p
          style={{
            marginTop: 32,
            fontSize: 20,
            color: "var(--text-muted)",
            maxWidth: 720,
            lineHeight: 1.5,
          }}
        >
          Most agency sites bury the price. I don&apos;t. Here&apos;s what each
          tier costs, what&apos;s in it, and—honestly—who it isn&apos;t for.
        </p>
      </div>

      {/* Tier grid */}
      <div style={{ padding: "0 48px 48px" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 24,
            marginTop: 40,
          }}
        >
          {tiers.map((t) => (
            <div
              key={t.name}
              style={{
                background: t.accent ? "var(--accent)" : "var(--surface)",
                color: t.accent ? "var(--accent-ink)" : "var(--text)",
                border:
                  "1px solid " + (t.accent ? "var(--accent)" : "var(--border)"),
                borderRadius: 6,
                padding: "36px 32px 32px",
                position: "relative",
                display: "flex",
                flexDirection: "column",
                minHeight: 720,
              }}
            >
              {t.accent && (
                <div
                  style={{
                    position: "absolute",
                    top: -12,
                    right: 24,
                    background: "var(--bg)",
                    color: "var(--accent)",
                    padding: "4px 10px",
                    fontFamily:
                      'var(--font-mono), "JetBrains Mono", ui-monospace, monospace',
                    fontSize: 10,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                  }}
                >
                  Most chosen
                </div>
              )}
              <div
                className="cp-mono"
                style={{
                  color: t.accent ? "rgba(5,5,5,0.6)" : "var(--text-muted)",
                  marginBottom: 12,
                }}
              >
                {t.name.toUpperCase()}
              </div>
              <div className="cp-num" style={{ fontSize: 72, letterSpacing: "-0.04em", lineHeight: 1 }}>
                {t.price}
              </div>
              <div
                className="cp-mono"
                style={{
                  color: t.accent ? "rgba(5,5,5,0.65)" : "var(--text-muted)",
                  marginTop: 8,
                }}
              >
                {t.sub}
              </div>
              <p
                style={{
                  marginTop: 20,
                  fontSize: 17,
                  lineHeight: 1.4,
                  fontFamily:
                    "var(--font-display), Manrope, ui-sans-serif, system-ui, sans-serif",
                  fontWeight: 500,
                  letterSpacing: "-0.01em",
                }}
              >
                {t.pitch}
              </p>
              <div
                style={{
                  marginTop: 16,
                  padding: "12px 14px",
                  background: t.accent
                    ? "rgba(5,5,5,0.08)"
                    : "var(--surface-2)",
                  borderLeft:
                    "2px solid " +
                    (t.accent ? "var(--accent-ink)" : "var(--accent)"),
                }}
              >
                <div
                  className="cp-mono"
                  style={{
                    color: t.accent ? "rgba(5,5,5,0.6)" : "var(--text-muted)",
                    marginBottom: 4,
                  }}
                >
                  Best for
                </div>
                <div style={{ fontSize: 14, lineHeight: 1.5 }}>{t.who}</div>
              </div>
              <ul
                style={{
                  listStyle: "none",
                  padding: 0,
                  margin: "24px 0 0",
                  display: "flex",
                  flexDirection: "column",
                  gap: 10,
                }}
              >
                {t.bullets.map((b) => (
                  <li
                    key={b}
                    style={{
                      fontSize: 14,
                      lineHeight: 1.5,
                      display: "flex",
                      gap: 10,
                    }}
                  >
                    <span
                      style={{
                        color: t.accent ? "var(--accent-ink)" : "var(--accent)",
                        flexShrink: 0,
                      }}
                    >
                      ✓
                    </span>
                    {b}
                  </li>
                ))}
              </ul>
              <div
                style={{
                  marginTop: 20,
                  fontSize: 12,
                  color: t.accent ? "rgba(5,5,5,0.6)" : "var(--text-dim)",
                  fontStyle: "italic",
                }}
              >
                Not for: {t.out}
              </div>
              <Link
                href="/contact"
                className="cp-btn cp-btn-lg"
                style={{
                  marginTop: "auto",
                  background: t.accent ? "var(--bg)" : "var(--accent)",
                  color: t.accent ? "var(--accent)" : "var(--accent-ink)",
                  justifyContent: "center",
                  marginLeft: 0,
                }}
              >
                Book a 20‑minute scope call →
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Outside the tiers */}
      <div style={{ padding: "0 48px 64px" }}>
        <div
          style={{
            background: "var(--surface)",
            border: "1px solid var(--border)",
            borderRadius: 6,
            padding: "40px 40px",
            display: "grid",
            gridTemplateColumns: "1fr auto",
            gap: 32,
            alignItems: "center",
          }}
        >
          <div>
            <div className="cp-mono" style={{ marginBottom: 12 }}>
              Outside the tiers
            </div>
            <h3
              className="cp-display"
              style={{ fontSize: 32, margin: 0, letterSpacing: "-0.02em" }}
            >
              Custom software, internal tools, weird integrations.
            </h3>
            <p
              style={{
                marginTop: 12,
                color: "var(--text-muted)",
                maxWidth: 720,
                margin: "12px 0 0",
              }}
            >
              I do a lot of these. They&apos;re quoted per project because they
              should be. Typical range: $8k–$40k, two to eight weeks. If
              that&apos;s you, skip the tier grid and book a call.
            </p>
          </div>
          <Link href="/contact" className="cp-btn cp-btn-ghost cp-btn-lg">
            Book a custom scope →
          </Link>
        </div>
      </div>

      {/* Small print */}
      <div
        style={{
          padding: "64px 48px",
          borderTop: "1px solid var(--border)",
        }}
      >
        <div className="cp-eyebrow" style={{ marginBottom: 24 }}>
          The honest small print
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 32,
          }}
        >
          {smallPrint.map(([h, d]) => (
            <div key={h}>
              <div
                style={{
                  fontFamily:
                    "var(--font-display), Manrope, ui-sans-serif, system-ui, sans-serif",
                  fontWeight: 700,
                  fontSize: 18,
                  letterSpacing: "-0.01em",
                  marginBottom: 10,
                }}
              >
                {h}
              </div>
              <div
                style={{
                  color: "var(--text-muted)",
                  fontSize: 14,
                  lineHeight: 1.55,
                }}
              >
                {d}
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </>
  );
}
