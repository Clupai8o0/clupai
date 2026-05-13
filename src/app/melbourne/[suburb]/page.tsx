import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/nav";
import Footer from "@/components/footer";
import FinalCTA from "@/components/final-cta";
import { SUBURB_SLUGS, getSuburb } from "@/data/suburbs";

export function generateStaticParams() {
  return SUBURB_SLUGS.map((slug) => ({ suburb: slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ suburb: string }>;
}): Promise<Metadata> {
  const { suburb } = await params;
  const data = getSuburb(suburb);
  if (!data) return {};
  return {
    title: `Web Designer ${data.name} · clupai Melbourne`,
    description: data.description,
  };
}

const services = [
  {
    n: "01",
    label: "Websites",
    href: "/services/web",
    desc: "Fast, conversion-focused Next.js sites. Fixed scope, fixed price, you own everything from day one.",
  },
  {
    n: "02",
    label: "SEO",
    href: "/services/seo",
    desc: "Technical and local SEO for Melbourne businesses. Fewer, better pages — not 40-suburb doorway content.",
  },
  {
    n: "03",
    label: "Automation",
    href: "/services/automation",
    desc: "Wire up the tools you already own. Zapier, Make, n8n, and custom internal tools that remove the drudgery.",
  },
];

export default async function SuburbPage({
  params,
}: {
  params: Promise<{ suburb: string }>;
}) {
  const { suburb } = await params;
  const data = getSuburb(suburb);
  if (!data) notFound();

  return (
    <>
      <Nav page="services" />

      {/* Breadcrumb */}
      <div style={{ padding: "24px 48px 0" }}>
        <div className="cp-mono" style={{ color: "var(--text-muted)", fontSize: 11 }}>
          <Link href="/" className="cp-breadcrumb-link">Home</Link>
          <span style={{ color: "var(--text-dim)", margin: "0 8px" }}>/</span>
          <span style={{ color: "var(--text-dim)" }}>Melbourne</span>
          <span style={{ color: "var(--text-dim)", margin: "0 8px" }}>/</span>
          <span style={{ color: "var(--text)" }}>{data.name}</span>
        </div>
      </div>

      {/* Hero */}
      <div
        style={{
          padding: "40px 48px 72px",
          borderBottom: "1px solid var(--border)",
        }}
      >
        <div
          className="cp-suburb-hero"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 340px",
            gap: 56,
            alignItems: "end",
          }}
        >
          <div>
            <div className="cp-eyebrow" style={{ marginBottom: 14 }}>
              Web designer · {data.name} · Melbourne
            </div>
            <h1
              className="cp-display"
              style={{
                fontSize: "clamp(2.6rem, 5.8vw, 5.2rem)",
                margin: 0,
                lineHeight: 1.0,
              }}
            >
              {data.hero}
            </h1>
            <p
              style={{
                marginTop: 28,
                fontSize: 19,
                color: "var(--text-muted)",
                maxWidth: 620,
                lineHeight: 1.55,
              }}
            >
              {data.lede.split(". ").slice(0, 2).join(". ") + "."}
            </p>
            <div style={{ marginTop: 32, display: "flex", gap: 12, flexWrap: "wrap" }}>
              <Link href="/contact" className="cp-btn cp-btn-primary cp-btn-lg">
                Book a 20‑minute scope call
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M2 8h12M9 3l5 5-5 5" />
                </svg>
              </Link>
              <Link href="/work" className="cp-btn cp-btn-ghost cp-btn-lg">
                See recent builds
              </Link>
            </div>
          </div>

          {/* Price signal card */}
          <div className="cp-card" style={{ padding: 28 }}>
            <div className="cp-mono" style={{ marginBottom: 14 }}>
              Websites from
            </div>
            <div
              className="cp-num"
              style={{
                fontSize: 56,
                color: "var(--accent)",
                letterSpacing: "-0.04em",
                lineHeight: 1,
              }}
            >
              $3,500
            </div>
            <div className="cp-mono" style={{ marginTop: 6, color: "var(--text-muted)" }}>
              fixed · GST exclusive
            </div>
            <div
              style={{
                marginTop: 20,
                paddingTop: 18,
                borderTop: "1px solid var(--border)",
                display: "flex",
                flexDirection: "column",
                gap: 10,
              }}
            >
              {[
                ["Location", `${data.name}, Melbourne`],
                ["Timeline", "3–5 weeks"],
                ["You own", "Repo, domain, hosting"],
              ].map(([k, v]) => (
                <div
                  key={k}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "baseline",
                    gap: 12,
                  }}
                >
                  <span className="cp-mono" style={{ fontSize: 10, color: "var(--text-dim)" }}>
                    {k}
                  </span>
                  <span style={{ fontSize: 13, color: "var(--text-muted)", textAlign: "right" }}>
                    {v}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Lede — full opening copy */}
      <div
        style={{
          padding: "72px 48px",
          borderBottom: "1px solid var(--border)",
          display: "grid",
          gridTemplateColumns: "320px 1fr",
          gap: 64,
        }}
      >
        <div>
          <div className="cp-mono" style={{ marginBottom: 12 }}>
            § 01 · The situation
          </div>
          <h2
            className="cp-display"
            style={{ fontSize: "var(--fs-h2)", margin: 0, lineHeight: 1.05 }}
          >
            What we see in{" "}
            <span style={{ color: "var(--accent)" }}>{data.name}.</span>
          </h2>
        </div>
        <div>
          <p
            style={{
              fontSize: 18,
              lineHeight: 1.7,
              color: "var(--text-muted)",
              margin: "0 0 24px",
              maxWidth: 680,
            }}
          >
            {data.lede}
          </p>
          <p
            style={{
              fontSize: 15,
              lineHeight: 1.65,
              color: "var(--text-dim)",
              margin: 0,
              maxWidth: 680,
            }}
          >
            {data.why}
          </p>
        </div>
      </div>

      {/* Services */}
      <div
        style={{
          padding: "72px 48px",
          borderBottom: "1px solid var(--border)",
          background: "var(--surface)",
        }}
      >
        <div className="cp-mono" style={{ marginBottom: 12 }}>
          § 02 · What we offer {data.name} businesses
        </div>
        <h2
          className="cp-display"
          style={{ fontSize: "var(--fs-h2)", margin: "0 0 48px", lineHeight: 1.05 }}
        >
          Three services.{" "}
          <span style={{ color: "var(--text-muted)" }}>All fixed price.</span>
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            borderTop: "1px solid var(--border)",
          }}
        >
          {services.map((svc, i) => (
            <Link
              key={svc.label}
              href={svc.href}
              className="cp-service-card"
              style={{
                display: "block",
                padding: "28px 28px 32px",
                borderLeft: i === 0 ? "none" : "1px solid var(--border)",
                textDecoration: "none",
              }}
            >
              <div
                className="cp-mono cp-service-num"
                style={{ color: "var(--text-dim)", marginBottom: 16 }}
              >
                ({svc.n})
              </div>
              <div
                style={{
                  fontFamily:
                    "var(--font-display), Manrope, ui-sans-serif, system-ui, sans-serif",
                  fontWeight: 700,
                  fontSize: 22,
                  letterSpacing: "-0.02em",
                  marginBottom: 12,
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                }}
              >
                {svc.label}
                <span
                  className="cp-service-arrow"
                  style={{ color: "var(--accent)", fontSize: 18 }}
                >
                  →
                </span>
              </div>
              <p
                style={{
                  fontSize: 14,
                  color: "var(--text-muted)",
                  lineHeight: 1.6,
                  margin: 0,
                }}
              >
                {svc.desc}
              </p>
            </Link>
          ))}
        </div>
      </div>

      {/* Local context */}
      <div
        style={{
          padding: "72px 48px",
          borderBottom: "1px solid var(--border)",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "320px 1fr",
            gap: 64,
          }}
        >
          <div>
            <div className="cp-mono" style={{ marginBottom: 12 }}>
              § 03 · Local context
            </div>
            <h2
              className="cp-display"
              style={{ fontSize: "var(--fs-h2)", margin: 0, lineHeight: 1.05 }}
            >
              We know{" "}
              <span style={{ color: "var(--accent)" }}>{data.name}.</span>
            </h2>
          </div>
          <div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 24,
                marginBottom: 32,
              }}
            >
              <div
                className="cp-card"
                style={{ padding: 24 }}
              >
                <div className="cp-mono" style={{ marginBottom: 8 }}>
                  Typical clients
                </div>
                <p
                  style={{
                    fontSize: 14,
                    color: "var(--text-muted)",
                    lineHeight: 1.6,
                    margin: 0,
                  }}
                >
                  {data.businesses}
                </p>
              </div>
              <div
                className="cp-card"
                style={{ padding: 24 }}
              >
                <div className="cp-mono" style={{ marginBottom: 8 }}>
                  Local signal
                </div>
                <p
                  style={{
                    fontSize: 14,
                    color: "var(--text-muted)",
                    lineHeight: 1.6,
                    margin: 0,
                  }}
                >
                  {data.localSignal}
                </p>
              </div>
            </div>
            <div
              style={{
                padding: "20px 24px",
                borderLeft: "2px solid var(--accent)",
                background: "var(--surface)",
              }}
            >
              <div className="cp-mono" style={{ marginBottom: 8, color: "var(--text-dim)" }}>
                Our approach for {data.name}
              </div>
              <p
                style={{
                  fontSize: 15,
                  color: "var(--text-muted)",
                  lineHeight: 1.65,
                  margin: 0,
                }}
              >
                Every suburb has different search patterns, different customer expectations, and
                different competitive dynamics. We don&apos;t apply a suburb template — we start
                with what actually works for{" "}
                <strong style={{ color: "var(--text)" }}>{data.name}</strong> businesses,
                given how local customers search and what they expect to see when they arrive.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div
        style={{
          padding: "72px 48px",
          borderBottom: "1px solid var(--border)",
          background: "var(--surface)",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "320px 1fr",
            gap: 64,
          }}
        >
          <div>
            <div className="cp-mono" style={{ marginBottom: 12 }}>
              § 04 · Questions
            </div>
            <h2
              className="cp-display"
              style={{ fontSize: "var(--fs-h2)", margin: 0, lineHeight: 1.05 }}
            >
              What {data.name}{" "}
              <span style={{ color: "var(--text-muted)" }}>
                businesses ask us.
              </span>
            </h2>
          </div>
          <div>
            {data.faq.map((item, i) => (
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
                  <span>{item.q}</span>
                  <span style={{ color: "var(--accent)", marginLeft: 16, flexShrink: 0 }}>
                    ＋
                  </span>
                </summary>
                <p
                  style={{
                    marginTop: 14,
                    color: "var(--text-muted)",
                    fontSize: 15,
                    lineHeight: 1.65,
                    maxWidth: 680,
                  }}
                >
                  {item.a}
                </p>
              </details>
            ))}
            <div style={{ borderTop: "1px solid var(--border)", paddingTop: 20 }} />
          </div>
        </div>
      </div>

      {/* CTA strip */}
      <div
        style={{
          padding: "72px 48px",
          borderBottom: "1px solid var(--border)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 40,
          flexWrap: "wrap",
        }}
      >
        <div>
          <div className="cp-mono" style={{ marginBottom: 10 }}>
            Working in {data.name}? Let&apos;s talk.
          </div>
          <h2
            className="cp-display"
            style={{ fontSize: "clamp(2rem, 4vw, 3.6rem)", margin: 0, lineHeight: 1.05 }}
          >
            Twenty minutes.{" "}
            <span style={{ color: "var(--accent)" }}>No slideshow.</span>
          </h2>
          <p
            style={{
              marginTop: 16,
              color: "var(--text-muted)",
              fontSize: 16,
              lineHeight: 1.55,
              maxWidth: 560,
            }}
          >
            We&apos;ll ask what you sell, who your customers are, and where your
            current site is letting you down. You&apos;ll leave with a realistic
            quote — or a clear reason we&apos;re not the right fit.
          </p>
        </div>
        <div style={{ display: "flex", gap: 12, flexShrink: 0, flexWrap: "wrap" }}>
          <Link href="/contact" className="cp-btn cp-btn-primary cp-btn-lg">
            Book a scope call
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M2 8h12M9 3l5 5-5 5" />
            </svg>
          </Link>
          <a
            href="mailto:hello@clupai.com"
            className="cp-btn cp-btn-ghost cp-btn-lg"
          >
            hello@clupai.com
          </a>
        </div>
      </div>

      <FinalCTA />
      <Footer />
    </>
  );
}
