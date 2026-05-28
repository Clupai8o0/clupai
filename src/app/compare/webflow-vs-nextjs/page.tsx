import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/nav";
import Footer from "@/components/footer";
import FinalCTA from "@/components/final-cta";

export const metadata: Metadata = {
  title: "Webflow vs Next.js 2026 · clupai",
  description:
    "When Webflow is the right call, and when custom Next.js development outperforms it. An honest comparison from a studio that uses Next.js for every client build.",
  alternates: { canonical: "/compare/webflow-vs-nextjs" },
};

const webflowWins = [
  "Visual editing for content teams: if your marketing team needs to rearrange page sections, update copy, and publish without touching a developer, Webflow's visual editor is genuinely good.",
  "Faster MVP for marketing sites: a Webflow site can be live in days. For a landing page or simple marketing site with a quick deadline, this matters.",
  "Hosting simplicity: Webflow hosts your site for you. No deployment pipeline to configure, no server to manage.",
  "Built-in CMS for blogs: Webflow's CMS handles standard blog and collection patterns well. If you need a blog and nothing more complex, it covers it.",
  "Design-developer handoff: for design teams working in Figma, Webflow is a natural export target.",
  "No-code integrations: Zapier and native integrations cover a lot of common use cases without custom code.",
];

const nextjsWins = [
  "Performance ceiling: Webflow can score well on Lighthouse, but you're working within the constraints of their generated output. Next.js gives you full control over what ships to the browser.",
  "Custom logic: anything that requires server-side processing, real-time data, complex authentication, or custom business logic belongs in code, not a no-code tool.",
  "API integrations: connecting to custom APIs, internal systems, or anything beyond Webflow's native integrations requires workarounds or third-party services.",
  "No vendor lock-in: your Webflow site lives on Webflow's infrastructure. If they raise prices, change terms, or discontinue a feature, your options are limited. Next.js code is yours.",
  "Scale: for high-traffic sites or sites with complex content models, Next.js gives you caching, edge deployment, and infrastructure control that Webflow doesn't.",
  "Custom data models: Webflow's CMS is good for standard patterns. Once your content model gets complex — nested relationships, dynamic filtering, user-generated content — you need code.",
];

const faqs = [
  {
    q: "Can Webflow match Next.js on performance?",
    a: "On a simple marketing site, Webflow can score well on Core Web Vitals. The ceiling is lower — you're constrained by what Webflow outputs — but for a site without complex interactions, the gap may not matter in practice. For sites where LCP is a competitive SEO factor, or where you need a sub-1-second load time, Next.js gives you more control.",
  },
  {
    q: "What's the actual pricing difference?",
    a: "Webflow charges per site on an ongoing basis — a recurring monthly platform fee, plus agency or freelancer time to build it. A Next.js site has a higher one-time build cost but near-zero ongoing platform fees (Vercel's free tier covers most small business sites). Over three years, the total cost is often similar or lower for custom. Book a call and we'll put a real number on your specific build.",
  },
  {
    q: "What about Webflow's editor for content teams?",
    a: "Webflow's editor is genuinely good for non-technical users. If your content team needs daily publishing autonomy, it's a real advantage. Our Next.js builds use headless CMS options (TinaCMS, Sanity) that give editors a clean interface — it's not quite as drag-and-drop as Webflow, but it's designed around what your editors actually need to change.",
  },
  {
    q: "We're a design agency — do you build on Webflow?",
    a: "We don't. If you're a design agency that prefers Webflow as your delivery tool, that's fine for your clients — but it's not how we work. Our builds are in Next.js with TypeScript. If you need a development partner who works in Next.js for design handoffs, we can discuss how that looks.",
  },
];

const decisionTree = [
  {
    condition: "Marketing site, content team needs visual editing control.",
    verdict: "Webflow",
    note: "Webflow's visual editor is its main advantage. If this is the priority, use it.",
  },
  {
    condition: "Fast MVP, small budget, deadline in 2 weeks.",
    verdict: "Webflow",
    note: "Webflow ships faster for standard marketing sites.",
  },
  {
    condition: "Custom logic, complex integrations, or user authentication.",
    verdict: "Next.js",
    note: "These requirements need code. No-code tools create fragile workarounds.",
  },
  {
    condition: "Maximum performance, sub-second LCP, SEO is a priority.",
    verdict: "Next.js",
    note: "You need control over the output. Webflow's ceiling is lower.",
  },
  {
    condition: "You want to own your code and not depend on a platform.",
    verdict: "Next.js",
    note: "Webflow is a platform dependency. Next.js is code you control.",
  },
];

export default function WebflowVsNextjsPage() {
  return (
    <>
      <Nav />

      {/* Breadcrumb */}
      <div style={{ padding: "48px 48px 0" }}>
        <div className="cp-mono" style={{ color: "var(--text-muted)" }}>
          Compare{" "}
          <span style={{ color: "var(--text-dim)" }}>/</span>{" "}
          <span style={{ color: "var(--text)" }}>Webflow vs Next.js</span>
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
          Comparison · Webflow vs Next.js · 2026
        </div>
        <h1
          className="cp-display"
          style={{
            fontSize: "clamp(3rem, 6vw, 5.5rem)",
            margin: 0,
            maxWidth: 1100,
          }}
        >
          Webflow vs Next.js 2026.
          <br />
          <span style={{ color: "var(--accent)" }}>
            When to use which.
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
          We build everything in Next.js — but Webflow genuinely wins for some
          use cases. Here&apos;s the honest breakdown.
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
              Use Webflow if
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
              You need a marketing site with a content team that needs visual
              control, a fast MVP timeline, and no complex custom logic.
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
              You have complex logic, custom integrations, performance
              requirements, or you don&apos;t want to be on a platform
              you can&apos;t exit cleanly.
            </p>
          </div>
        </div>
      </div>

      {/* Where Webflow wins */}
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
              § 02 · Where Webflow wins
            </div>
            <h2
              className="cp-display"
              style={{ fontSize: "var(--fs-h2)", margin: 0 }}
            >
              Real advantages.
              <br />
              <span style={{ color: "var(--text-muted)" }}>
                Not dismissing them.
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
            }}
          >
            {webflowWins.map((item, i) => (
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

      {/* Performance */}
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
            gridTemplateColumns: "1fr 1fr",
            gap: 24,
          }}
        >
          <div className="cp-card" style={{ padding: 28 }}>
            <div
              className="cp-mono"
              style={{ marginBottom: 12, color: "var(--text-muted)" }}
            >
              Webflow
            </div>
            <p style={{ color: "var(--text-muted)", fontSize: 15, lineHeight: 1.6, margin: 0 }}>
              Webflow sites can score well on Lighthouse for simple pages. The
              editor adds some JavaScript overhead, and complex animations or
              CMS-heavy pages can lower scores. You&apos;re constrained by what
              Webflow outputs — there&apos;s a ceiling you can&apos;t break through
              without leaving the platform.
            </p>
          </div>
          <div
            className="cp-card"
            style={{ padding: 28, borderColor: "var(--accent)" }}
          >
            <div
              className="cp-mono"
              style={{ marginBottom: 12, color: "var(--accent)" }}
            >
              Next.js
            </div>
            <p style={{ color: "var(--text-muted)", fontSize: 15, lineHeight: 1.6, margin: 0 }}>
              Next.js gives you full control over what ships to the browser.
              Server-side rendering, static generation, image optimisation, and
              edge caching are all configurable. Our target LCP is under 1.2
              seconds. King Double Glazing went from 13.1s to 1.2s after
              rebuilding on Next.js.
            </p>
          </div>
        </div>
      </div>

      {/* Lock-in */}
      <div
        style={{
          padding: "72px 48px",
          borderBottom: "1px solid var(--border)",
        }}
      >
        <div className="cp-mono" style={{ marginBottom: 20 }}>
          § 05 · The lock-in question
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 32,
          }}
        >
          <div>
            <p style={{ fontSize: 17, color: "var(--text-muted)", lineHeight: 1.7, margin: 0 }}>
              Webflow hosts your site. Your content lives in their CMS. Your
              design is in their visual editor. If Webflow raises prices,
              changes their terms, or discontinues a feature, your options are:
              pay up, or rebuild from scratch.
            </p>
            <p style={{ fontSize: 17, color: "var(--text-muted)", lineHeight: 1.7, marginTop: 16 }}>
              This isn&apos;t a hypothetical — Webflow has raised prices and
              changed tier features before. It&apos;s the normal trajectory for
              a VC-backed SaaS platform.
            </p>
          </div>
          <div>
            <p style={{ fontSize: 17, color: "var(--text-muted)", lineHeight: 1.7, margin: 0 }}>
              A Next.js site is code. It lives in a Git repository you own. It
              can be hosted anywhere — Vercel, AWS, Cloudflare, your own
              server. If you want to change hosting providers, you can. If you
              want to hand the codebase to a different developer, you can.
            </p>
            <p style={{ fontSize: 17, color: "var(--text-muted)", lineHeight: 1.7, marginTop: 16 }}>
              We hand over the full repository at the end of every project. The
              work is yours.
            </p>
          </div>
        </div>
      </div>

      {/* Decision tree */}
      <div
        style={{
          padding: "80px 48px",
          background: "var(--surface)",
          borderBottom: "1px solid var(--border)",
        }}
      >
        <div className="cp-mono" style={{ marginBottom: 20 }}>
          § 06 · Decision guide
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
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
              § 07 · FAQ
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
