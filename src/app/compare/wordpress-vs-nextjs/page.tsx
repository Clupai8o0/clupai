import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/nav";
import Footer from "@/components/footer";
import FinalCTA from "@/components/final-cta";

export const metadata: Metadata = {
  title: "WordPress vs Next.js 2026 · clupai",
  description:
    "An honest comparison from a studio that stopped taking WordPress projects in 2023. When WordPress makes sense, when it doesn't, and why we chose Next.js for every client site we build.",
  alternates: { canonical: "/compare/wordpress-vs-nextjs" },
};

const wordpressWins = [
  "Plugin ecosystem is unmatched — if you need a specific integration and you need it this week, there's probably a plugin.",
  "Self-managed content: if your client insists on maintaining their own site without any developer contact, WordPress CMS is genuinely easier for non-technical users than most alternatives.",
  "WooCommerce: for straightforward e-commerce without complex requirements, WooCommerce is mature and cost-effective to set up.",
  "Hosting options: every shared host runs WordPress. It's cheap to host and easy to hand off.",
  "Familiarity: a large portion of web designers and developers know it, so you have more hiring options if you grow a team.",
  "Learning resources: the documentation, tutorials, and community support are enormous.",
];

const nextjsWins = [
  "Performance: a well-built Next.js site will outperform WordPress on Core Web Vitals in virtually every comparison. The gap isn't small.",
  "Security: WordPress's plugin ecosystem is also its attack surface. Plugin vulnerabilities are the most common vector for site compromise. Next.js sites have a dramatically smaller attack surface.",
  "Maintainability: WordPress sites accumulate technical debt — outdated plugins, theme conflicts, PHP version constraints. Next.js sites are code you control.",
  "No plugin hell: WordPress plugins conflict with each other. Updates break things. Plugins get abandoned. This is a maintenance burden that compounds over time.",
  "Performance ceiling: WordPress can be heavily optimised, but the ceiling is lower than a server-rendered React app. For Core Web Vitals, the gap matters for SEO.",
  "Developer experience: modern tooling, TypeScript, component architecture, edge deployment — the experience of building on Next.js is significantly better for anyone building serious software.",
];

const decisionTree = [
  {
    condition: "You need a blog and want to manage it yourself, no developer.",
    verdict: "WordPress",
    note: "WordPress CMS is genuinely better for DIY content management.",
  },
  {
    condition: "You're building a WooCommerce store with standard requirements.",
    verdict: "WordPress",
    note: "WooCommerce is mature and cost-effective for straightforward e-commerce.",
  },
  {
    condition: "You need maximum performance and Core Web Vitals matter.",
    verdict: "Next.js",
    note: "The gap in LCP and CLS is real and measurable.",
  },
  {
    condition: "You've been hacked before or security is a concern.",
    verdict: "Next.js",
    note: "WordPress is the most targeted CMS on the internet. This isn't an opinion.",
  },
  {
    condition: "You want a site that won't degrade over 3 years without maintenance.",
    verdict: "Next.js",
    note: "WordPress sites require active maintenance. Next.js sites are more stable.",
  },
  {
    condition: "You need complex custom logic or integrations.",
    verdict: "Next.js",
    note: "WordPress plugins rarely cover custom requirements cleanly.",
  },
];

const faqs = [
  {
    q: "Why did you stop taking WordPress projects?",
    a: "In 2023 we made a deliberate call: the maintenance burden of WordPress projects was costing our clients more in the long run than the lower upfront cost justified. Plugin conflicts, security patches, PHP updates, theme breakages — we were spending billable hours on problems that wouldn't exist on a modern stack. We'd rather build something that runs clean for five years.",
  },
  {
    q: "Can't you just optimise WordPress with a caching plugin?",
    a: "You can improve WordPress performance significantly with caching, a CDN, and image optimisation. But you're fighting the architecture, not working with it. King Double Glazing was rebuilt from a heavily-cached WordPress-adjacent setup with a 13.1-second LCP. After the rebuild on Next.js, it scored 99 on Lighthouse. Caching helps; it doesn't fix fundamentals.",
  },
  {
    q: "What's the actual cost difference?",
    a: "WordPress is cheaper to start: low monthly hosting, an inexpensive theme, and plugins that vary. But factor in a few hours of maintenance per month (security updates, plugin checks, backups), the occasional emergency (a plugin breaks something after an update), and the cost of a developer when things go wrong — and the 3-year cost is often comparable to a well-built Next.js site. Over 5 years, custom is usually cheaper.",
  },
  {
    q: "Do you ever recommend WordPress?",
    a: "Yes. For a client who needs to manage their own content daily and doesn't want any developer involvement, WordPress CMS is genuinely better for them. For WooCommerce stores with standard product catalogues, it makes sense. We're not ideological about it — we just don't build it anymore because we're better at the alternative.",
  },
  {
    q: "Is Next.js harder to update content in?",
    a: "Not with a headless CMS. We use TinaCMS or Sanity depending on the project. Editors get a clean interface scoped to what they actually need to update. It's not as raw-access as WordPress, which for most clients is a feature, not a bug.",
  },
];

export default function WordPressVsNextjsPage() {
  return (
    <>
      <Nav />

      {/* Breadcrumb */}
      <div style={{ padding: "48px 48px 0" }}>
        <div className="cp-mono" style={{ color: "var(--text-muted)" }}>
          Compare{" "}
          <span style={{ color: "var(--text-dim)" }}>/</span>{" "}
          <span style={{ color: "var(--text)" }}>WordPress vs Next.js</span>
        </div>
      </div>

      {/* Hero + Verdict */}
      <div
        style={{
          padding: "32px 48px 80px",
          borderBottom: "1px solid var(--border)",
        }}
      >
        <div className="cp-eyebrow" style={{ marginBottom: 12 }}>
          Comparison · WordPress vs Next.js · 2026
        </div>
        <h1
          className="cp-display"
          style={{
            fontSize: "clamp(3rem, 6vw, 5.5rem)",
            margin: 0,
            maxWidth: 1100,
          }}
        >
          WordPress vs Next.js 2026.
          <br />
          <span style={{ color: "var(--accent)" }}>
            An honest answer.
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
          We stopped taking WordPress projects in 2023. That makes us biased —
          so let&apos;s be explicit about it and work through where WordPress
          still wins, where it doesn&apos;t, and how to decide.
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
              Use WordPress if
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
              You need a blog or WooCommerce store, you want to manage it
              yourself without any developer contact, and performance isn&apos;t
              a primary concern.
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
              Use Next.js if
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
              You need speed, security, a site that won&apos;t degrade over
              time, custom integrations, or maximum Core Web Vitals scores.
            </p>
          </div>
        </div>
      </div>

      {/* Where WordPress wins */}
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
              § 02 · Where WordPress wins
            </div>
            <h2
              className="cp-display"
              style={{ fontSize: "var(--fs-h2)", margin: 0 }}
            >
              WordPress still has real advantages.
              <br />
              <span style={{ color: "var(--text-muted)" }}>
                We&apos;re not pretending otherwise.
              </span>
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
            {wordpressWins.map((item, i) => (
              <li
                key={i}
                style={{
                  display: "flex",
                  gap: 16,
                  paddingTop: 18,
                  paddingBottom: 18,
                  borderTop: "1px solid var(--border)",
                  fontSize: 16,
                  lineHeight: 1.6,
                  color: "var(--text-muted)",
                  alignItems: "start",
                }}
              >
                <span
                  className="cp-mono"
                  style={{ color: "var(--text-dim)", minWidth: 26, flexShrink: 0 }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Where Next.js wins */}
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
              § 03 · Where Next.js wins
            </div>
            <h2
              className="cp-display"
              style={{ fontSize: "var(--fs-h2)", margin: 0 }}
            >
              The meaningful differences.
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
            {nextjsWins.map((item, i) => (
              <li
                key={i}
                style={{
                  display: "flex",
                  gap: 16,
                  paddingTop: 18,
                  paddingBottom: 18,
                  borderTop: "1px solid var(--border)",
                  fontSize: 16,
                  lineHeight: 1.6,
                  alignItems: "start",
                }}
              >
                <span style={{ color: "var(--accent)", flexShrink: 0, marginTop: 2 }}>
                  →
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Performance comparison */}
      <div
        style={{
          padding: "80px 48px",
          borderBottom: "1px solid var(--border)",
        }}
      >
        <div className="cp-mono" style={{ marginBottom: 20 }}>
          § 04 · Performance comparison
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gap: 24,
          }}
        >
          {[
            {
              label: "WordPress typical LCP",
              stat: "3–8s",
              note: "Without aggressive optimisation. Worse on shared hosting.",
              dim: true,
            },
            {
              label: "Next.js target LCP",
              stat: "< 1.2s",
              note: "What we aim for on every build. King Double Glazing hit 1.2s.",
              dim: false,
            },
            {
              label: "Real-world result",
              stat: "99",
              note: "King Double Glazing: rebuilt from a 13.1s LCP to a Lighthouse score of 99.",
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
        <div
          style={{
            marginTop: 24,
            padding: "20px 24px",
            background: "var(--surface)",
            border: "1px solid var(--border)",
            borderRadius: 6,
          }}
        >
          <p
            style={{
              margin: 0,
              fontSize: 14,
              color: "var(--text-muted)",
              lineHeight: 1.6,
            }}
          >
            <span style={{ color: "var(--text)", fontWeight: 500 }}>
              The King Double Glazing rebuild:
            </span>{" "}
            moved from a WordPress-adjacent setup with a 13.1-second LCP to a
            Next.js site scoring 99 on Lighthouse. The Instant Estimate Tool
            was added at the same time.{" "}
            <Link
              href="/work/king-double-glazing"
              style={{ color: "var(--accent)" }}
            >
              Read the case study →
            </Link>
          </p>
        </div>
      </div>

      {/* Decision tree */}
      <div
        style={{
          padding: "80px 48px",
          borderBottom: "1px solid var(--border)",
        }}
      >
        <div className="cp-mono" style={{ marginBottom: 20 }}>
          § 05 · Who should use which
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 0,
          }}
        >
          {decisionTree.map((item, i) => (
            <div
              key={i}
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 120px 1fr",
                gap: 32,
                padding: "20px 0",
                borderTop: "1px solid var(--border)",
                alignItems: "center",
              }}
            >
              <div style={{ fontSize: 16, lineHeight: 1.5 }}>
                {item.condition}
              </div>
              <div
                style={{
                  textAlign: "center",
                  fontFamily:
                    "var(--font-display), Manrope, ui-sans-serif, system-ui, sans-serif",
                  fontWeight: 700,
                  fontSize: 14,
                  letterSpacing: "0.05em",
                  textTransform: "uppercase",
                  color:
                    item.verdict === "Next.js"
                      ? "var(--accent)"
                      : "var(--text-muted)",
                  background:
                    item.verdict === "Next.js"
                      ? "transparent"
                      : "transparent",
                  padding: "6px 12px",
                  border: `1px solid ${item.verdict === "Next.js" ? "var(--accent)" : "var(--border)"}`,
                  borderRadius: 4,
                }}
              >
                {item.verdict}
              </div>
              <div
                style={{
                  fontSize: 14,
                  color: "var(--text-muted)",
                  lineHeight: 1.5,
                }}
              >
                {item.note}
              </div>
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

      {/* Related comparisons */}
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
          <Link href="/compare/webflow-vs-nextjs" className="cp-btn cp-btn-ghost">
            Webflow vs Next.js →
          </Link>
          <Link href="/compare/squarespace-vs-custom" className="cp-btn cp-btn-ghost">
            Squarespace vs custom →
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
