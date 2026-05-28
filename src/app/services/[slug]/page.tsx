import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import Nav from "@/components/nav";
import Footer from "@/components/footer";
import FinalCTA from "@/components/final-cta";
import Placeholder from "@/components/placeholder";
import Row from "@/components/row";
import CaseStudySection from "@/components/case-study-section";
import { SERVICE_DATA, SERVICE_SLUGS, HIDDEN_SERVICE_SLUGS } from "@/data/services";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const data = SERVICE_DATA[slug];
  if (!data) return {};

  const titles: Record<string, string> = {
    web: "Web Design Melbourne — Next.js Websites · clupai",
    seo: "SEO Melbourne — Technical & Local SEO · clupai",
    automation: "Business Automation Melbourne — Zapier, n8n, Make · clupai",
    ads: "Google Ads Melbourne · clupai",
    apps: "App Development Melbourne · clupai",
  };

  const descriptions: Record<string, string> = {
    web: "Melbourne web design studio. We build fast, conversion-focused Next.js websites for Australian businesses. Owned by you, built to last.",
    seo: "SEO consultant Melbourne. Technical + local SEO for Melbourne service businesses. Google Business Profile, schema, Core Web Vitals, and content that earns links.",
    automation: "Business automation Melbourne. Zapier, n8n, and Make integrations for Melbourne SMBs. Stop copying data between tools.",
    ads: "Google Ads management Melbourne. Search and Performance Max campaigns for Melbourne service businesses. No lock-in.",
    apps: "App development Melbourne. React Native and Next.js applications for startups and growing businesses.",
  };

  return {
    title: titles[slug] ?? `${data.crumb} · clupai`,
    description: descriptions[slug] ?? data.problem,
    alternates: {
      canonical: `/services/${slug}`,
    },
    openGraph: {
      title: titles[slug] ?? data.crumb,
      description: descriptions[slug] ?? data.problem,
    },
  };
}

export function generateStaticParams() {
  return SERVICE_SLUGS.map((slug) => ({ slug }));
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (HIDDEN_SERVICE_SLUGS.includes(slug)) notFound();
  const data = SERVICE_DATA[slug];
  if (!data) notFound();

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": data.crumb,
    "description": data.problem,
    "provider": {
      "@type": "ProfessionalService",
      "name": "clupai",
      "url": "https://clupai.com",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Brunswick",
        "addressRegion": "VIC",
        "addressCountry": "AU",
      },
    },
    "areaServed": {
      "@type": "City",
      "name": "Melbourne",
    },
    "url": `https://clupai.com/services/${slug}`,
  };

  return (
    <>
      <Nav page="services" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />

      <div style={{ padding: "48px 48px 0" }}>
        <div className="cp-mono" style={{ color: "var(--text-muted)" }}>
          <Link href="/services">Services</Link>{" "}
          <span style={{ color: "var(--text-dim)" }}>/</span>{" "}
          <span style={{ color: "var(--text)" }}>{data.crumb}</span>
        </div>
      </div>

      {/* Hero */}
      <div
        style={{
          padding: "32px 48px 72px",
          borderBottom: "1px solid var(--border)",
        }}
      >
        <div
          className="cp-svc-hero-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 360px",
            gap: 56,
            alignItems: "end",
          }}
        >
          <div>
            <div className="cp-eyebrow" style={{ marginBottom: 12 }}>
              {data.eyebrow}
            </div>
            <h1
              className="cp-display"
              style={{ fontSize: "clamp(3rem, 6vw, 5.5rem)", margin: 0 }}
            >
              {data.headline[0]}
              <br />
              <span style={{ color: "var(--accent)" }}>{data.headline[1]}</span>
            </h1>
            <p
              style={{
                marginTop: 28,
                fontSize: 20,
                color: "var(--text-muted)",
                maxWidth: 640,
                lineHeight: 1.5,
              }}
            >
              {data.problem}
            </p>
            <div style={{ marginTop: 32, display: "flex", gap: 12 }}>
              <Link href="/contact" className="cp-btn cp-btn-primary cp-btn-lg">
                Book a 20‑minute scope call →
              </Link>
              <Link href="/work" className="cp-btn cp-btn-ghost cp-btn-lg">
                See a recent build
              </Link>
            </div>
          </div>
          <div className="cp-card" style={{ padding: 24 }}>
            <div className="cp-mono" style={{ marginBottom: 16 }}>
              Pricing
            </div>
            <div
              style={{
                fontFamily:
                  "var(--font-display), Manrope, ui-sans-serif, system-ui, sans-serif",
                fontWeight: 700,
                fontSize: 36,
                color: "var(--accent)",
                letterSpacing: "-0.02em",
                lineHeight: 1,
              }}
            >
              Custom quote
            </div>
            <div
              className="cp-mono"
              style={{ marginTop: 8, color: "var(--text-muted)" }}
            >
              Fixed · scoped to your brief
            </div>
            <div
              style={{
                marginTop: 20,
                paddingTop: 16,
                borderTop: "1px solid var(--border)",
                display: "flex",
                flexDirection: "column",
                gap: 8,
              }}
            >
              <Row k="Timeline" v={data.timeline} />
              <Row k="Deliverable" v={data.deliverable} />
              <Row k="Revisions" v={data.revisions} />
            </div>
          </div>
        </div>
      </div>

      {/* Melbourne local strip */}
      {(slug === "web" || slug === "seo" || slug === "automation") && (
        <div
          style={{
            padding: "20px 48px",
            background: "var(--surface)",
            borderBottom: "1px solid var(--border)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div className="cp-mono" style={{ color: "var(--text-muted)" }}>
            Based in Melbourne · serving Brunswick, Carlton, Richmond, Fitzroy, and beyond
          </div>
          <Link
            href={`/services/${slug}/melbourne`}
            className="cp-btn cp-btn-ghost"
            style={{ padding: "8px 16px", fontSize: 13, minHeight: 0 }}
          >
            Melbourne-specific page →
          </Link>
        </div>
      )}

      {/* Included */}
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
              § 01 · What&apos;s included
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
            className="cp-svc-items-grid"
            style={{
              listStyle: "none",
              padding: 0,
              margin: 0,
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "14px 40px",
            }}
          >
            {data.included.map((it, i) => (
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
                    flex: 1,
                    minWidth: 0,
                  }}
                >
                  {it}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Process */}
      <div
        style={{
          padding: "80px 48px",
          background: "var(--surface)",
          borderBottom: "1px solid var(--border)",
        }}
      >
        <div className="cp-mono" style={{ marginBottom: 12 }}>
          § 02 · How it actually runs
        </div>
        <h2
          className="cp-display"
          style={{
            fontSize: "var(--fs-h2)",
            margin: "0 0 40px",
            maxWidth: 900,
          }}
        >
          Five steps. Boring.{" "}
          <span style={{ color: "var(--accent)" }}>On purpose.</span>
        </h2>
        <div
          className="cp-svc-process-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(5, 1fr)",
            borderTop: "1px solid var(--border-2)",
          }}
        >
          {data.process.map((p, i) => (
            <div
              key={i}
              className="cp-svc-step"
              style={{
                padding: "24px 24px 28px",
                borderLeft:
                  i === 0 ? "none" : "1px solid var(--border-2)",
                display: "flex",
                flexDirection: "column",
                minHeight: 260,
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
                {String(i + 1).padStart(2, "0")}
              </div>
              <div
                style={{
                  fontFamily:
                    "var(--font-display), Manrope, ui-sans-serif, system-ui, sans-serif",
                  fontWeight: 700,
                  fontSize: 20,
                  letterSpacing: "-0.02em",
                  marginTop: 12,
                }}
              >
                {p.h}
              </div>
              <div
                className="cp-mono"
                style={{ marginTop: 6, color: "var(--text-muted)" }}
              >
                {p.d}
              </div>
              <div
                style={{
                  marginTop: "auto",
                  color: "var(--text-muted)",
                  fontSize: 14,
                  lineHeight: 1.55,
                }}
              >
                {p.body}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Case study */}
      <CaseStudySection
        eyebrow={`§ 03 · Recent ${data.crumb.toLowerCase()} build`}
        stat={data.cs.stat}
        sstat={data.cs.sstat}
        title={data.cs.title}
        body={data.cs.body}
        caseHref={data.cs.href ?? "/work/king-double-glazing"}
        cover={data.cs.cover}
        coverAlt={data.cs.title}
      />

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
              § 04 · FAQ
            </div>
            <h2
              className="cp-display"
              style={{ fontSize: "var(--fs-h2)", margin: 0 }}
            >
              Things I get asked.
              <br />
              <span style={{ color: "var(--text-muted)" }}>
                Answered plainly.
              </span>
            </h2>
            <p
              style={{
                marginTop: 16,
                color: "var(--text-dim)",
                fontSize: 13,
              }}
            >
              No FAQPage schema. On purpose. Google&apos;s been penalising it
              since 2023.
            </p>
          </div>
          <div>
            {data.faq.map((q, i) => (
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
                  <span>{q.q}</span>
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
                  {q.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </div>

      <FinalCTA />
      <Footer />
    </>
  );
}
