import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/nav";
import Footer from "@/components/footer";
import FinalCTA from "@/components/final-cta";

export const metadata: Metadata = {
  title: "Tradie Websites Melbourne · clupai",
  description:
    "Fast, quote-generating websites for Melbourne trades businesses. We build tradie websites that rank on Google, load in under a second, and turn visits into enquiries — not just traffic.",
  alternates: { canonical: "/industries/tradies-trades" },
};

const problems = [
  [
    "Site loads in 8 seconds",
    "Every second past 2 costs you leads. Mobile visitors bounce before they see your phone number.",
  ],
  [
    "No way to get a quote without calling",
    "Most tradies' clients want a ballpark before they pick up the phone. If you can't give them one online, they call someone who can.",
  ],
  [
    "Photos are bad — or nonexistent",
    "A before/after gallery is your most convincing sales tool. Stock photos of strangers in hard hats aren't.",
  ],
  [
    "Doesn't work on mobile",
    "Your clients search on phones. If your site requires zooming in to find your number, it's losing you jobs.",
  ],
  [
    "Paying for Google Ads with no landing page",
    "Sending ad traffic to a slow homepage is burning money. You need a page built to convert that click.",
  ],
];

const included = [
  "Speed-first build (LCP < 1.2s target)",
  "Instant quote or estimate tool",
  "Service area pages for local SEO",
  "Before/after photo gallery",
  "Click-to-call + WhatsApp tap target",
  "Google Business Profile setup and schema",
  "Mobile-first design throughout",
  "Review schema markup",
  "LocalBusiness structured data",
  "Analytics wired in from day one",
];

const faqs = [
  {
    q: "Do I need to provide photos?",
    a: "Yes — and it's worth it. Before/after photos of your actual work convert far better than anything we could source. If you can send us a folder of job photos from your phone, we'll handle cropping, optimisation, and layout. If you genuinely have nothing, we'll discuss options in scope.",
  },
  {
    q: "Can it handle quote requests automatically?",
    a: "Yes. We build quote tools that surface a ballpark figure — based on job type, size, or suburb — before the form. Leads arrive with a number already in their head, which means shorter sales calls and faster decisions. The enquiry data can feed into your CRM or email.",
  },
  {
    q: "What about Google Ads?",
    a: "We don't run ads, but we build landing pages that make ads worth running. If you're already spending on Google Ads and sending traffic to your homepage, a dedicated landing page will drop your cost-per-lead significantly. We can also brief you on what to tell your ads person.",
  },
  {
    q: "I'm already on tradie directories. Does that help?",
    a: "Directories (hipages, Houzz, ServiceSeeking) generate shared leads — meaning five tradies receive the same enquiry. Your own site generates exclusive leads. We don't tell you to quit directories; we give you a site that earns leads that nobody else is competing for.",
  },
  {
    q: "How long does a tradie site take?",
    a: "Three to five weeks from signed scope to live. Week one: discovery and wireframe. Weeks two and three: design and build. Week four: content, photos, review. Week five: launch and handover. We don't drag it out.",
  },
];

export default function TradiesPage() {
  return (
    <>
      <Nav />

      {/* Breadcrumb */}
      <div style={{ padding: "48px 48px 0" }}>
        <div className="cp-mono" style={{ color: "var(--text-muted)" }}>
          <Link href="/services">Services</Link>{" "}
          <span style={{ color: "var(--text-dim)" }}>/</span>{" "}
          <span style={{ color: "var(--text)" }}>Tradies &amp; Trades</span>
        </div>
      </div>

      {/* Hero */}
      <div
        style={{
          padding: "32px 48px 80px",
          borderBottom: "1px solid var(--border)",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 360px",
            gap: 56,
            alignItems: "end",
          }}
        >
          <div>
            <div className="cp-eyebrow" style={{ marginBottom: 12 }}>
              Industries · Trades &amp; Tradies · Melbourne
            </div>
            <h1
              className="cp-display"
              style={{ fontSize: "clamp(3rem, 6vw, 5.5rem)", margin: 0 }}
            >
              Tradie websites Melbourne.
              <br />
              <span style={{ color: "var(--accent)" }}>
                Built to book jobs.
              </span>
            </h1>
            <p
              style={{
                marginTop: 28,
                fontSize: 20,
                color: "var(--text-muted)",
                maxWidth: 680,
                lineHeight: 1.5,
              }}
            >
              We build fast, quote-generating websites for Melbourne trades
              businesses. Your site should rank on Google, load in under a
              second, and turn visitors into enquiries — not just impressions.
            </p>
            <div style={{ marginTop: 32, display: "flex", gap: 12 }}>
              <Link href="/contact" className="cp-btn cp-btn-primary cp-btn-lg">
                Book a 20‑minute scope call →
              </Link>
              <Link
                href="/work/king-double-glazing"
                className="cp-btn cp-btn-ghost cp-btn-lg"
              >
                See a trades build
              </Link>
            </div>
          </div>
          <div className="cp-card" style={{ padding: 28 }}>
            <div className="cp-mono" style={{ marginBottom: 16 }}>
              What we target
            </div>
            <div
              className="cp-num"
              style={{
                fontSize: 72,
                color: "var(--accent)",
                letterSpacing: "-0.05em",
                lineHeight: 0.9,
              }}
            >
              99
            </div>
            <div
              className="cp-mono"
              style={{ marginTop: 6, color: "var(--text-muted)" }}
            >
              Lighthouse score (King Double Glazing)
            </div>
            <div
              style={{
                marginTop: 20,
                paddingTop: 16,
                borderTop: "1px solid var(--border)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontSize: 13,
                  color: "var(--text-muted)",
                  marginBottom: 10,
                }}
              >
                <span className="cp-mono">Before</span>
                <span className="cp-mono">13.1s LCP</span>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontSize: 13,
                  color: "var(--text-muted)",
                  marginBottom: 10,
                }}
              >
                <span className="cp-mono">After</span>
                <span className="cp-mono" style={{ color: "var(--accent)" }}>
                  1.2s LCP
                </span>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontSize: 13,
                  color: "var(--text-muted)",
                }}
              >
                <span className="cp-mono">Timeline</span>
                <span className="cp-mono">3–5 weeks</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Case study */}
      <div
        style={{
          padding: "80px 48px",
          borderBottom: "1px solid var(--border)",
          background: "var(--surface)",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 56,
            alignItems: "start",
          }}
        >
          <div>
            <div className="cp-mono" style={{ marginBottom: 12 }}>
              § 01 · Case study · King Double Glazing
            </div>
            <h2
              className="cp-display"
              style={{
                fontSize: "clamp(2rem, 3.6vw, 3.25rem)",
                margin: 0,
                lineHeight: 1.1,
              }}
            >
              13.1 seconds to 1.2.
              <br />
              <span style={{ color: "var(--accent)" }}>
                A glazing business rebuilt.
              </span>
            </h2>
            <p
              style={{
                marginTop: 24,
                fontSize: 17,
                color: "var(--text-muted)",
                lineHeight: 1.7,
              }}
            >
              We rebuilt King Double Glazing from a bloated site with a 13.1-second
              LCP to a Lighthouse score of 99. The Instant Estimate Tool now
              surfaces a ballpark price before the form — leads arrive with a
              number and close faster.
            </p>
            <p
              style={{
                marginTop: 14,
                fontSize: 17,
                color: "var(--text-muted)",
                lineHeight: 1.7,
              }}
            >
              Stack: Next.js + TinaCMS + Neon. The client can update service
              pages and photos without touching a developer.
            </p>
            <Link
              href="/work/king-double-glazing"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                marginTop: 24,
                color: "var(--accent)",
                fontFamily:
                  "var(--font-display), Manrope, ui-sans-serif, system-ui, sans-serif",
                fontWeight: 500,
                fontSize: 15,
              }}
            >
              Read the full case study →
            </Link>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 16,
            }}
          >
            {[
              ["13.1s", "LCP before"],
              ["1.2s", "LCP after"],
              ["75", "Lighthouse before"],
              ["99", "Lighthouse after"],
            ].map(([stat, label]) => (
              <div key={label} className="cp-card" style={{ padding: 24 }}>
                <div
                  className="cp-num"
                  style={{
                    fontSize: 48,
                    color: "var(--accent)",
                    letterSpacing: "-0.04em",
                    lineHeight: 1,
                  }}
                >
                  {stat}
                </div>
                <div
                  className="cp-mono"
                  style={{ marginTop: 8, color: "var(--text-muted)" }}
                >
                  {label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Problems we solve */}
      <div
        style={{
          padding: "80px 48px",
          borderBottom: "1px solid var(--border)",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "320px 1fr",
            gap: 56,
          }}
        >
          <div>
            <div className="cp-mono" style={{ marginBottom: 12 }}>
              § 02 · Problems we solve
            </div>
            <h2
              className="cp-display"
              style={{ fontSize: "var(--fs-h2)", margin: 0 }}
            >
              The five things costing you jobs.
            </h2>
          </div>
          <ul
            style={{
              margin: 0,
              padding: 0,
              listStyle: "none",
              display: "flex",
              flexDirection: "column",
              gap: 0,
            }}
          >
            {problems.map(([h, b], i) => (
              <li
                key={i}
                style={{
                  display: "grid",
                  gridTemplateColumns: "32px 1fr",
                  gap: 24,
                  paddingTop: 24,
                  paddingBottom: 24,
                  borderTop: "1px solid var(--border)",
                  alignItems: "start",
                }}
              >
                <span
                  className="cp-num"
                  style={{
                    fontSize: 20,
                    color: "var(--accent)",
                    letterSpacing: "-0.03em",
                  }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <div
                    style={{
                      fontFamily:
                        "var(--font-display), Manrope, ui-sans-serif, system-ui, sans-serif",
                      fontWeight: 600,
                      fontSize: 18,
                      letterSpacing: "-0.01em",
                      marginBottom: 8,
                    }}
                  >
                    {h}
                  </div>
                  <div
                    style={{
                      color: "var(--text-muted)",
                      fontSize: 15,
                      lineHeight: 1.6,
                    }}
                  >
                    {b}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* What's included */}
      <div
        style={{
          padding: "80px 48px",
          background: "var(--surface)",
          borderBottom: "1px solid var(--border)",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "320px 1fr",
            gap: 56,
          }}
        >
          <div>
            <div className="cp-mono" style={{ marginBottom: 12 }}>
              § 03 · What&apos;s included
            </div>
            <h2
              className="cp-display"
              style={{ fontSize: "var(--fs-h2)", margin: 0 }}
            >
              Everything on this list.
              <br />
              <span style={{ color: "var(--text-muted)" }}>
                Nothing on the upsell.
              </span>
            </h2>
          </div>
          <ul
            style={{
              listStyle: "none",
              padding: 0,
              margin: 0,
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "14px 40px",
            }}
          >
            {included.map((it, i) => (
              <li
                key={i}
                style={{
                  display: "flex",
                  gap: 14,
                  paddingTop: 14,
                  borderTop: "1px solid var(--border)",
                }}
              >
                <span
                  className="cp-mono"
                  style={{ color: "var(--text-dim)", minWidth: 26, flexShrink: 0 }}
                >
                  ({String(i + 1).padStart(2, "0")})
                </span>
                <span
                  style={{
                    color: "var(--text)",
                    fontSize: 15,
                    lineHeight: 1.55,
                  }}
                >
                  {it}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Services links */}
      <div
        style={{
          padding: "72px 48px",
          borderBottom: "1px solid var(--border)",
        }}
      >
        <div className="cp-mono" style={{ marginBottom: 20 }}>
          § 04 · How we deliver it
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 24,
          }}
        >
          {[
            {
              href: "/services/web",
              n: "01",
              h: "Website",
              d:
                "Next.js build that owns Core Web Vitals. You get the repo, the hosting, and the score.",
            },
            {
              href: "/services/seo",
              n: "02",
              h: "Local SEO",
              d:
                "Service area pages, Google Business Profile, and review schema so you rank for '[suburb] + [trade]'.",
            },
            {
              href: "/services/automation",
              n: "03",
              h: "Quoting automation",
              d:
                "Instant estimate tools, lead routing, and CRM sync so enquiries arrive pre-qualified.",
            },
          ].map((s) => (
            <Link
              key={s.n}
              href={s.href}
              className="cp-card"
              style={{
                padding: 28,
                display: "block",
                textDecoration: "none",
              }}
            >
              <div
                className="cp-num"
                style={{
                  fontSize: 36,
                  color: "var(--accent)",
                  letterSpacing: "-0.04em",
                  lineHeight: 1,
                }}
              >
                {s.n}
              </div>
              <div
                style={{
                  fontFamily:
                    "var(--font-display), Manrope, ui-sans-serif, system-ui, sans-serif",
                  fontWeight: 700,
                  fontSize: 22,
                  letterSpacing: "-0.02em",
                  marginTop: 16,
                }}
              >
                {s.h}
              </div>
              <p
                style={{
                  marginTop: 10,
                  color: "var(--text-muted)",
                  fontSize: 14,
                  lineHeight: 1.6,
                  margin: "10px 0 20px",
                }}
              >
                {s.d}
              </p>
              <span
                style={{
                  color: "var(--accent)",
                  fontFamily:
                    "var(--font-display), Manrope, ui-sans-serif, system-ui, sans-serif",
                  fontWeight: 500,
                  fontSize: 14,
                }}
              >
                Learn more →
              </span>
            </Link>
          ))}
        </div>
      </div>

      {/* FAQ */}
      <div
        style={{
          padding: "80px 48px",
          borderBottom: "1px solid var(--border)",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "320px 1fr",
            gap: 56,
          }}
        >
          <div>
            <div className="cp-mono" style={{ marginBottom: 12 }}>
              § 05 · FAQ
            </div>
            <h2
              className="cp-display"
              style={{ fontSize: "var(--fs-h2)", margin: 0 }}
            >
              Things tradies ask us.
              <br />
              <span style={{ color: "var(--text-muted)" }}>
                Answered plainly.
              </span>
            </h2>
          </div>
          <div>
            {faqs.map((faq, i) => (
              <details
                key={i}
                style={{
                  borderTop: "1px solid var(--border)",
                  padding: "20px 0",
                }}
                open={i === 0}
              >
                <summary
                  style={{
                    listStyle: "none",
                    display: "flex",
                    justifyContent: "space-between",
                    cursor: "pointer",
                    fontFamily:
                      "var(--font-display), Manrope, ui-sans-serif, system-ui, sans-serif",
                    fontWeight: 600,
                    fontSize: 18,
                    letterSpacing: "-0.01em",
                  }}
                >
                  <span>{faq.q}</span>
                  <span style={{ color: "var(--accent)", marginLeft: 16 }}>
                    ＋
                  </span>
                </summary>
                <p
                  style={{
                    marginTop: 12,
                    color: "var(--text-muted)",
                    fontSize: 15,
                    lineHeight: 1.6,
                    maxWidth: 720,
                  }}
                >
                  {faq.a}
                </p>
              </details>
            ))}
            <div style={{ borderTop: "1px solid var(--border)" }} />
          </div>
        </div>
      </div>

      <FinalCTA />
      <Footer />
    </>
  );
}
