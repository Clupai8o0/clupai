import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/nav";
import Footer from "@/components/footer";
import FinalCTA from "@/components/final-cta";

export const metadata: Metadata = {
  title: "Squarespace vs Custom Website 2026 · clupai",
  description:
    "When Squarespace is fine, and when it's costing you customers. An honest look at the performance gap, SEO ceiling, and 3-year cost comparison for Australian small businesses.",
  alternates: { canonical: "/compare/squarespace-vs-custom" },
};

const squarespaceGood = [
  [
    "Portfolio or creative showcase",
    "A photographer, illustrator, or designer who needs a clean gallery site and doesn't need to rank for anything. Squarespace's templates are genuinely well-designed for this.",
  ],
  [
    "Simple event or promo sites",
    "A one-off event page, a launch site for a product, or a seasonal campaign. If it's short-lived and low-stakes, Squarespace is fast to spin up.",
  ],
  [
    "Side projects and hobby sites",
    "When the goal is 'have a presence online' and not 'generate revenue', Squarespace does the job without requiring a developer.",
  ],
  [
    "Early-stage, pre-revenue, no budget",
    "If you're validating an idea and need something live this week, Squarespace is a reasonable placeholder. Just don't expect it to do SEO work for you.",
  ],
];

const squarespaceProblems = [
  [
    "Load speed is a SEO liability",
    "Squarespace sites typically score 40–65 on mobile Lighthouse. Google's Core Web Vitals are a ranking factor. If you're competing in local search, a slow site is costing you rankings.",
  ],
  [
    "The SEO ceiling is real",
    "You can add meta titles and alt text. But you can't control what ships in the HTML, can't add custom schema types, can't do server-side rendering, and can't build the technical SEO infrastructure that drives rankings in competitive niches.",
  ],
  [
    "No custom schema markup",
    "LocalBusiness, ProfessionalService, Service, Review schema — the structured data that helps Google understand what you do and who you serve — requires code. Squarespace supports basic schema but you can't customise it.",
  ],
  [
    "Template limitations compound over time",
    "When you want to do something the template wasn't designed for — a custom calculator, a quote tool, a booking flow — you're either hacking around the template or you can't do it at all.",
  ],
  [
    "Mobile Lighthouse scores are bad",
    "The 40–65 mobile Lighthouse range isn't an edge case — it's typical for Squarespace sites. Google measures mobile performance. Your customers search on phones.",
  ],
  [
    "Lock-in with no exit ramp",
    "Your content, design, and site structure all live inside Squarespace. When you outgrow it, you rebuild from zero. There's no migration path that carries your work forward.",
  ],
];

const faqs = [
  {
    q: "Can't I just optimise a Squarespace site for SEO?",
    a: "You can do the basics — meta titles, alt text, clean URLs. But you're hitting a ceiling quickly. You can't add custom LocalBusiness schema, can't do server-side rendering, can't control page weight beyond what Squarespace exposes. For local search in a competitive market, these limitations are real.",
  },
  {
    q: "My Squarespace site looks fine. Why would I rebuild it?",
    a: "If your site generates the enquiries you need and your market isn't competitive on search, don't rebuild it. We're not in the business of selling rebuilds people don't need. The question to ask is: is my site ranking for the searches that matter? If the answer is yes, stay. If no, the platform may be part of the problem.",
  },
  {
    q: "What's the actual cost difference?",
    a: "Squarespace runs $23–$65/month depending on your plan. Over three years, that's $828–$2,340 in platform fees alone — before any designer or developer costs. A custom Next.js build has a higher upfront cost but near-zero ongoing platform fees. By year three or four, the custom build is typically cheaper in total.",
  },
  {
    q: "How bad are the Lighthouse scores really?",
    a: "We've tested a sample of Australian small business Squarespace sites. Mobile Lighthouse scores in the 40–65 range are standard. For comparison, our Next.js builds target 90+, and King Double Glazing scored 99. The gap matters for SEO — Google's Core Web Vitals are a ranking signal, and the mobile score is the one that counts.",
  },
];

export default function SquarespaceVsCustomPage() {
  return (
    <>
      <Nav />

      {/* Breadcrumb */}
      <div style={{ padding: "48px 48px 0" }}>
        <div className="cp-mono" style={{ color: "var(--text-muted)" }}>
          Compare{" "}
          <span style={{ color: "var(--text-dim)" }}>/</span>{" "}
          <span style={{ color: "var(--text)" }}>Squarespace vs Custom</span>
        </div>
      </div>

      {/* Hero */}
      <div
        style={{
          padding: "32px 48px 80px",
          borderBottom: "1px solid var(--border)",
        }}
      >
        <div className="cp-eyebrow" style={{ marginBottom: 12 }}>
          Comparison · Squarespace vs Custom Website · 2026
        </div>
        <h1
          className="cp-display"
          style={{
            fontSize: "clamp(3rem, 6vw, 5.5rem)",
            margin: 0,
            maxWidth: 1100,
          }}
        >
          Squarespace vs custom website 2026.
          <br />
          <span style={{ color: "var(--accent)" }}>
            When it&apos;s fine, and when it isn&apos;t.
          </span>
        </h1>
        <p
          style={{
            marginTop: 28,
            fontSize: 20,
            color: "var(--text-muted)",
            maxWidth: 860,
            lineHeight: 1.5,
          }}
        >
          Squarespace isn&apos;t always the wrong answer. But for any business
          that needs to rank in search, handle custom logic, or look
          meaningfully different from every other Squarespace site — it&apos;s
          costing you customers.
        </p>
      </div>

      {/* Quick verdict */}
      <div
        style={{
          padding: "72px 48px",
          background: "var(--surface)",
          borderBottom: "1px solid var(--border)",
        }}
      >
        <div className="cp-mono" style={{ marginBottom: 20 }}>
          § 01 · The quick verdict
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 32,
          }}
        >
          <div
            className="cp-card"
            style={{
              padding: 32,
              borderLeft: "3px solid var(--border-2)",
            }}
          >
            <div
              className="cp-mono"
              style={{ marginBottom: 12, color: "var(--text-muted)" }}
            >
              Squarespace is fine for
            </div>
            <p
              style={{
                fontSize: 18,
                lineHeight: 1.6,
                margin: 0,
                fontFamily:
                  "var(--font-display), Manrope, ui-sans-serif, system-ui, sans-serif",
                fontWeight: 500,
              }}
            >
              Portfolios, simple event sites, side projects, and early-stage
              validation where you have no budget and just need something
              live.
            </p>
          </div>
          <div
            className="cp-card"
            style={{
              padding: 32,
              borderLeft: "3px solid var(--accent)",
            }}
          >
            <div
              className="cp-mono"
              style={{ marginBottom: 12, color: "var(--accent)" }}
            >
              Squarespace is not fine for
            </div>
            <p
              style={{
                fontSize: 18,
                lineHeight: 1.6,
                margin: 0,
                fontFamily:
                  "var(--font-display), Manrope, ui-sans-serif, system-ui, sans-serif",
                fontWeight: 500,
              }}
            >
              Any business that needs to rank in search, handle custom logic,
              or look different from every other Squarespace site in your
              industry.
            </p>
          </div>
        </div>
      </div>

      {/* When Squarespace is fine */}
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
              § 02 · When Squarespace is genuinely fine
            </div>
            <h2
              className="cp-display"
              style={{ fontSize: "var(--fs-h2)", margin: 0 }}
            >
              There are real use cases.
              <br />
              <span style={{ color: "var(--text-muted)" }}>
                We&apos;re not pretending otherwise.
              </span>
            </h2>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
            {squarespaceGood.map(([h, b], i) => (
              <div
                key={i}
                style={{
                  paddingTop: 24,
                  paddingBottom: 24,
                  borderTop: "1px solid var(--border)",
                }}
              >
                <div
                  style={{
                    fontFamily:
                      "var(--font-display), Manrope, ui-sans-serif, system-ui, sans-serif",
                    fontWeight: 600,
                    fontSize: 18,
                    letterSpacing: "-0.01em",
                    marginBottom: 8,
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                  }}
                >
                  <span style={{ color: "var(--text-muted)", fontSize: 14 }}>✓</span>
                  {h}
                </div>
                <div
                  style={{
                    color: "var(--text-muted)",
                    fontSize: 15,
                    lineHeight: 1.6,
                    paddingLeft: 26,
                  }}
                >
                  {b}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* When it costs you */}
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
              § 03 · When it starts costing you
            </div>
            <h2
              className="cp-display"
              style={{ fontSize: "var(--fs-h2)", margin: 0 }}
            >
              Six ways Squarespace loses you customers.
            </h2>
          </div>
          <ul
            style={{
              margin: 0,
              padding: 0,
              listStyle: "none",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {squarespaceProblems.map(([h, b], i) => (
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

      {/* Cost comparison */}
      <div
        style={{
          padding: "80px 48px",
          borderBottom: "1px solid var(--border)",
        }}
      >
        <div className="cp-mono" style={{ marginBottom: 20 }}>
          § 04 · The real cost comparison (3 years)
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 32,
          }}
        >
          <div className="cp-card" style={{ padding: 28 }}>
            <div
              className="cp-mono"
              style={{ marginBottom: 16, color: "var(--text-muted)" }}
            >
              Squarespace · 3 years
            </div>
            {[
              ["Personal plan", "$23/month"],
              ["Business plan", "$36/month"],
              ["Commerce plan", "$65/month"],
              ["3-year total (business)", "$1,296"],
              ["Designer/template", "$0–$500 one-time"],
              ["Custom domain", "$20–$50/year"],
              ["3-year total estimate", "$1,400–$2,500"],
            ].map(([k, v]) => (
              <div
                key={k}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  paddingTop: 12,
                  paddingBottom: 12,
                  borderTop: "1px solid var(--border)",
                  fontSize: 14,
                  color: "var(--text-muted)",
                }}
              >
                <span className="cp-mono">{k}</span>
                <span>{v}</span>
              </div>
            ))}
          </div>
          <div
            className="cp-card"
            style={{ padding: 28, borderColor: "var(--accent)" }}
          >
            <div
              className="cp-mono"
              style={{ marginBottom: 16, color: "var(--accent)" }}
            >
              Custom Next.js · 3 years
            </div>
            {[
              ["Build (one-time)", "$3,900–10,000"],
              ["Hosting (Vercel)", "$0 for most small sites"],
              ["Domain", "$20–$50/year"],
              ["CMS (TinaCMS)", "$0"],
              ["Ongoing maintenance", "Minimal — code you own"],
              ["3-year total estimate", "$4,000–$10,500"],
            ].map(([k, v]) => (
              <div
                key={k}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  paddingTop: 12,
                  paddingBottom: 12,
                  borderTop: "1px solid var(--border)",
                  fontSize: 14,
                  color: "var(--text-muted)",
                }}
              >
                <span className="cp-mono">{k}</span>
                <span style={{ textAlign: "right", maxWidth: 200 }}>{v}</span>
              </div>
            ))}
          </div>
        </div>
        <p
          style={{
            marginTop: 16,
            fontSize: 13,
            color: "var(--text-dim)",
            lineHeight: 1.5,
          }}
        >
          The upfront gap is real. But over 3–5 years, a custom site is often
          cheaper — and it&apos;s doing SEO work throughout that time that
          Squarespace isn&apos;t capable of.
        </p>
      </div>

      {/* Performance comparison */}
      <div
        style={{
          padding: "80px 48px",
          background: "var(--surface)",
          borderBottom: "1px solid var(--border)",
        }}
      >
        <div className="cp-mono" style={{ marginBottom: 20 }}>
          § 05 · Performance comparison
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
              label: "Squarespace mobile Lighthouse",
              stat: "40–65",
              note: "Typical range for Australian small business Squarespace sites. Not an edge case — this is standard.",
              dim: true,
            },
            {
              label: "Next.js target (our builds)",
              stat: "90+",
              note: "What we target on every build. Core Web Vitals within Google's 'Good' threshold.",
              dim: false,
            },
            {
              label: "Real-world result",
              stat: "99",
              note: "King Double Glazing on Next.js. Rebuilt from a 13.1-second LCP. Mobile and desktop.",
              dim: false,
            },
          ].map((item) => (
            <div key={item.label} className="cp-card" style={{ padding: 28 }}>
              <div
                className="cp-mono"
                style={{ marginBottom: 12, color: "var(--text-muted)" }}
              >
                {item.label}
              </div>
              <div
                className="cp-num"
                style={{
                  fontSize: 56,
                  color: item.dim ? "var(--text-dim)" : "var(--accent)",
                  letterSpacing: "-0.04em",
                  lineHeight: 1,
                }}
              >
                {item.stat}
              </div>
              <p
                style={{
                  marginTop: 12,
                  color: "var(--text-muted)",
                  fontSize: 13,
                  lineHeight: 1.55,
                  margin: "12px 0 0",
                }}
              >
                {item.note}
              </p>
            </div>
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
              § 06 · FAQ
            </div>
            <h2
              className="cp-display"
              style={{ fontSize: "var(--fs-h2)", margin: 0 }}
            >
              Common questions.
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

      {/* Related */}
      <div
        style={{
          padding: "56px 48px",
          borderBottom: "1px solid var(--border)",
        }}
      >
        <div className="cp-mono" style={{ marginBottom: 20 }}>
          Related comparisons
        </div>
        <div style={{ display: "flex", gap: 16 }}>
          <Link href="/compare/wordpress-vs-nextjs" className="cp-btn cp-btn-ghost">
            WordPress vs Next.js →
          </Link>
          <Link href="/compare/webflow-vs-nextjs" className="cp-btn cp-btn-ghost">
            Webflow vs Next.js →
          </Link>
          <Link href="/services/web" className="cp-btn cp-btn-ghost">
            Our web service →
          </Link>
        </div>
      </div>

      <FinalCTA />
      <Footer />
    </>
  );
}
