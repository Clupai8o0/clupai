import { notFound } from "next/navigation";
import Link from "next/link";
import Nav from "@/components/nav";
import Footer from "@/components/footer";
import FinalCTA from "@/components/final-cta";
import Row from "@/components/row";
import { CaseGallery } from "@/components/case-gallery";
import { visibleCases as cases, getCaseBySlug } from "@/data/cases";

export function generateStaticParams() {
  return cases.map((c) => ({ slug: c.slug }));
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const c = getCaseBySlug(slug);
  if (!c) notFound();

  return (
    <>
      <Nav page="work" />

      {/* Breadcrumb */}
      <div style={{ padding: "48px 48px 0" }}>
        <div className="cp-mono" style={{ color: "var(--text-muted)" }}>
          <Link href="/work">Work</Link>{" "}
          <span style={{ color: "var(--text-dim)" }}>/</span>{" "}
          <span style={{ color: "var(--text)" }}>{c.slug}</span>
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
              {c.eyebrow}
            </div>
            <h1
              className="cp-display"
              style={{
                fontSize: "clamp(2.75rem, 5.4vw, 5rem)",
                margin: 0,
                whiteSpace: "pre-line",
              }}
            >
              {c.headline}{" "}
              <span style={{ color: "var(--accent)" }}>{c.headlineAccent}</span>
            </h1>
            <p
              style={{
                marginTop: 28,
                fontSize: 20,
                color: "var(--text-muted)",
                maxWidth: 700,
                lineHeight: 1.5,
              }}
            >
              {c.description}
            </p>
          </div>
          <div className="cp-card" style={{ padding: 24 }}>
            {c.meta.map((m, i) => (
              <div key={m.k}>
                {i > 0 && <div style={{ height: 1, background: "var(--border)", margin: "14px 0" }} />}
                <Row k={m.k} v={m.v} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Result band */}
      <div className="result-band">
        {c.results.map(([label, stat, sub]) => (
          <div key={label} className="result-cell">
            <div
              className="cp-mono"
              style={{ color: "rgba(5,5,5,0.65)", marginBottom: 10 }}
            >
              {label}
            </div>
            <div className="cp-num result-stat">{stat}</div>
            <div style={{ marginTop: 6, color: "rgba(5,5,5,0.7)" }}>{sub}</div>
          </div>
        ))}
      </div>

      {/* The brief */}
      <div
        style={{
          padding: "80px 48px",
          borderBottom: "1px solid var(--border)",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "280px 1fr",
            gap: 56,
          }}
        >
          <div className="cp-mono">§ 01 · The brief</div>
          <div style={{ maxWidth: 760 }}>
            <p
              style={{
                fontSize: 22,
                fontFamily:
                  "var(--font-display), Manrope, ui-sans-serif, system-ui, sans-serif",
                fontWeight: 400,
                lineHeight: 1.5,
                margin: 0,
                letterSpacing: "-0.01em",
              }}
            >
              {c.brief.quote}
            </p>
            <p style={{ marginTop: 16, color: "var(--text-muted)" }}>
              — {c.brief.attribution}
            </p>
          </div>
        </div>
      </div>

      {/* The problem */}
      <div
        style={{
          padding: "80px 48px",
          borderBottom: "1px solid var(--border)",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "280px 1fr",
            gap: 56,
          }}
        >
          <div className="cp-mono">§ 02 · The problem</div>
          <ul
            style={{
              margin: 0,
              padding: 0,
              listStyle: "none",
              display: "flex",
              flexDirection: "column",
              gap: 16,
              maxWidth: 860,
            }}
          >
            {c.problems.map((p, i) => (
              <li
                key={i}
                style={{
                  display: "flex",
                  gap: 20,
                  paddingTop: 16,
                  borderTop: "1px solid var(--border)",
                }}
              >
                <span
                  className="cp-num"
                  style={{
                    fontSize: 24,
                    color: "var(--accent)",
                    letterSpacing: "-0.03em",
                    minWidth: 44,
                  }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span
                  style={{ fontSize: 18, lineHeight: 1.55, color: "var(--text)" }}
                >
                  {p}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* The decisions */}
      <div className="decisions-section">
        <div className="decisions-layout">
          <div>
            <div className="cp-mono" style={{ marginBottom: 12 }}>
              § 03 · The decisions
            </div>
            <p
              style={{
                color: "var(--text-muted)",
                fontSize: 14,
                lineHeight: 1.55,
              }}
            >
              The calls that meaningfully moved the outcome. Not the cosmetic
              stuff.
            </p>
          </div>
          <div className="decisions-grid">
            {c.decisions.map(([h, b]) => (
              <div key={h} className="cp-card" style={{ padding: 24 }}>
                <div
                  style={{
                    fontFamily:
                      "var(--font-display), Manrope, ui-sans-serif, system-ui, sans-serif",
                    fontWeight: 700,
                    fontSize: 20,
                    letterSpacing: "-0.02em",
                  }}
                >
                  {h}
                </div>
                <p
                  style={{
                    marginTop: 10,
                    color: "var(--text-muted)",
                    fontSize: 14,
                    lineHeight: 1.55,
                    margin: "10px 0 0",
                  }}
                >
                  {b}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Gallery */}
      <div
        style={{
          padding: "96px 48px 80px",
          borderBottom: "1px solid var(--border)",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "280px 1fr",
            gap: 56,
            marginBottom: 56,
          }}
        >
          <div className="cp-mono">§ 04 · The work</div>
          <h2
            className="cp-display"
            style={{
              fontSize: "clamp(2rem, 3.4vw, 3rem)",
              margin: 0,
              letterSpacing: "-0.025em",
            }}
          >
            Screens, not mockups.
            <span style={{ color: "var(--text-muted)" }}>
              {" "}
              The actual product—
            </span>
            <span style={{ color: "var(--accent)" }}>annotated</span>.
          </h2>
        </div>

        <CaseGallery media={c.media} results={c.results} client={c.client} />
      </div>

      {/* Testimonial */}
      {c.testimonial && (
        <div
          style={{
            padding: "80px 48px",
            borderBottom: "1px solid var(--border)",
          }}
        >
          <div style={{ maxWidth: 960 }}>
            <div className="cp-mono" style={{ marginBottom: 24 }}>
              § 05 · In their words
            </div>
            <p
              className="cp-display"
              style={{
                fontSize: "clamp(1.75rem, 3vw, 2.5rem)",
                margin: 0,
                lineHeight: 1.2,
                fontWeight: 500,
                letterSpacing: "-0.02em",
              }}
            >
              {c.testimonial.quote}
            </p>
            <div
              style={{
                marginTop: 24,
                display: "flex",
                alignItems: "center",
                gap: 12,
              }}
            >
              <div>
                <div
                  style={{
                    fontFamily:
                      "var(--font-display), Manrope, ui-sans-serif, system-ui, sans-serif",
                    fontWeight: 600,
                  }}
                >
                  {c.testimonial.name}
                </div>
                <div className="cp-mono" style={{ color: "var(--text-muted)" }}>
                  {c.testimonial.role}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Stack strip */}
      <div
        style={{
          padding: "40px 48px",
          borderBottom: "1px solid var(--border)",
        }}
      >
        <div className="cp-mono" style={{ color: "var(--text-muted)" }}>
          Stack:{" "}
          {c.meta
            .find((m) => m.k === "Stack")
            ?.v ?? ""}
        </div>
      </div>

      <FinalCTA />
      <Footer />
    </>
  );
}
