import Link from "next/link";
import Nav from "@/components/nav";
import Footer from "@/components/footer";
import FinalCTA from "@/components/final-cta";
import Placeholder from "@/components/placeholder";
import Row from "@/components/row";
import SamAvatar from "@/components/sam-avatar";

export function generateStaticParams() {
  return [
    { slug: "king-double-glazing" },
    { slug: "hoddle-melbourne" },
    { slug: "tapcraft" },
    { slug: "kairos" },
    { slug: "dsec" },
    { slug: "farmers-intuition" },
  ];
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  void slug; // each slug could load its own data; for now all show king-double-glazing template

  return (
    <>
      <Nav page="work" />

      {/* Breadcrumb + hero */}
      <div style={{ padding: "48px 48px 0" }}>
        <div className="cp-mono" style={{ color: "var(--text-muted)" }}>
          <Link href="/work">Work</Link>{" "}
          <span style={{ color: "var(--text-dim)" }}>/</span>{" "}
          <span style={{ color: "var(--text)" }}>king-double-glazing</span>
        </div>
      </div>
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
              Window glazing · Melbourne · 2026
            </div>
            <h1
              className="cp-display"
              style={{
                fontSize: "clamp(2.75rem, 5.4vw, 5rem)",
                margin: 0,
              }}
            >
              King Double Glazing—
              <br />
              from slow site to{" "}
              <span style={{ color: "var(--accent)" }}>Core Web Vitals green.</span>
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
              A Melbourne trades business with an ageing site, slow load times,
              and no clear quote CTA. Rebuilt it on Next.js 15 with Neon Postgres,
              Drizzle, and Tailwind v4. Core Web Vitals green. SEO strategy in place.
            </p>
          </div>
          <div className="cp-card" style={{ padding: 24 }}>
            <Row k="Industry" v="Window glazing · trades" />
            <div style={{ height: 8 }} />
            <Row k="Location" v="Melbourne, VIC" />
            <div style={{ height: 8 }} />
            <Row k="Scope" v="Website · SEO · schema" />
            <div style={{ height: 8 }} />
            <Row k="Stack" v="Next.js 15 · Neon · Drizzle · Tailwind v4" />
            <div style={{ height: 8 }} />
            <Row k="Timeline" v="5 weeks" />
            <div style={{ height: 8 }} />
            <Row k="Live" v="kingdoubleglazing.com.au" />
          </div>
        </div>
      </div>

      {/* Result band */}
      <div
        style={{
          padding: "72px 48px",
          background: "var(--accent)",
          color: "var(--accent-ink)",
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 32,
        }}
      >
        {[
          ["LCP · mobile", "0.8s", "from 4.9s on the old site"],
          ["Core Web Vitals", "green", "LCP + CLS + INP all pass"],
          ["Stack", "Next.js 15", "Neon · Drizzle · Tailwind v4 · Vercel"],
        ].map(([label, stat, sub]) => (
          <div key={label as string}>
            <div
              className="cp-mono"
              style={{ color: "rgba(5,5,5,0.65)", marginBottom: 10 }}
            >
              {label}
            </div>
            <div
              className="cp-num"
              style={{
                fontSize: 120,
                letterSpacing: "-0.05em",
                lineHeight: 0.9,
              }}
            >
              {stat}
            </div>
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
              &quot;The old site was slow and looked like it was built in 2015.
              We needed something fast, clean, and that actually ranked locally—
              without blowing the budget.&quot;
            </p>
            <p style={{ marginTop: 16, color: "var(--text-muted)" }}>
              — Client, King Double Glazing
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
            {[
              "Mobile LCP was 4.9s. The old site loaded unoptimised images, unused jQuery plugins, and a heavy page builder.",
              "No clear quote CTA. Visitors landed on a generic homepage with no obvious next step—phone number buried in the footer.",
              "Local SEO was absent. No Google Business Profile optimisation, no schema, no suburb-targeting on service pages.",
            ].map((p, i) => (
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
            gridTemplateColumns: "280px 1fr",
            gap: 56,
          }}
        >
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
              Five calls that meaningfully moved the numbers. Not the cosmetic
              stuff.
            </p>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 24,
            }}
          >
            {[
              [
                "Next.js 15",
                "Rebuilt from the ground up on Next.js 15 with Vercel. No page builder, no plugin bloat. LCP dropped from 4.9s to 0.8s.",
              ],
              [
                "Neon + Drizzle",
                "Postgres on Neon with Drizzle ORM. Typed queries, schema migrations, and a dev workflow the client can hand to anyone.",
              ],
              [
                "Tailwind v4",
                "Tailwind v4 for styles. No CSS-in-JS overhead. Clean utility classes, fast HMR, zero runtime cost.",
              ],
              [
                "Quote CTA",
                "One sticky CTA above the fold on every page. Phone number in the nav. Form is three fields—not twelve.",
              ],
              [
                "LocalBusiness schema",
                "Full LocalBusiness + Product schema. GBP linked and optimised. Service pages target suburb + service keywords, not just the brand.",
              ],
              [
                "Core Web Vitals",
                "LCP, CLS, and INP all green on mobile. Images served via next/image. No render-blocking resources.",
              ],
            ].map(([h, b]) => (
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
              The site that&apos;s live at kingdoubleglazing.com.au—
            </span>
            <span style={{ color: "var(--accent)" }}>annotated</span>.
          </h2>
        </div>

        <figure style={{ margin: 0 }}>
          <Placeholder
            label="01 · home hero, desktop — quote CTA above fold + Core Web Vitals green"
            h={760}
          />
          <div
            style={{
              marginTop: 12,
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <span className="cp-mono" style={{ color: "var(--text-muted)" }}>
              01 / 06 · Home · 1440px
            </span>
            <span className="cp-mono" style={{ color: "var(--accent)" }}>
              &quot;Get a free quote&quot; is the only thing above the fold
            </span>
          </div>
        </figure>

        <div
          style={{
            marginTop: 48,
            display: "grid",
            gridTemplateColumns: "360px 1fr",
            gap: 24,
            alignItems: "start",
          }}
        >
          <figure style={{ margin: 0 }}>
            <Placeholder label="02 · mobile home — 375×812 · 0.8s LCP" h={680} />
            <div
              className="cp-mono"
              style={{ marginTop: 12, color: "var(--text-muted)" }}
            >
              02 · Home · mobile · 0.8s LCP
            </div>
          </figure>
          <figure style={{ margin: 0 }}>
            <Placeholder
              label="03 · services page — double glazing + secondary glazing"
              h={680}
            />
            <div
              className="cp-mono"
              style={{ marginTop: 12, color: "var(--text-muted)" }}
            >
              03 · /services · two service lines, clear suburb targeting
            </div>
          </figure>
        </div>

        <div
          style={{
            marginTop: 48,
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 24,
          }}
        >
          {[
            ["04 · /services/double-glazing · suburb targeting", "04 · Service page · suburb keywords + schema"],
            ["05 · Contact form — 3 fields, quote CTA", "05 · Contact · minimal friction, fast submit"],
            ["06 · Vercel analytics + Lighthouse audit", "06 · Perf · CWV green across all pages"],
          ].map(([label, caption]) => (
            <figure key={label} style={{ margin: 0 }}>
              <Placeholder label={label} h={420} />
              <div
                className="cp-mono"
                style={{ marginTop: 12, color: "var(--text-muted)" }}
              >
                {caption}
              </div>
            </figure>
          ))}
        </div>

        <div
          style={{
            marginTop: 72,
            paddingTop: 40,
            borderTop: "1px solid var(--border)",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "baseline",
              marginBottom: 24,
            }}
          >
            <h3
              className="cp-display"
              style={{ fontSize: 28, margin: 0, letterSpacing: "-0.02em" }}
            >
              Behind the build
            </h3>
            <span className="cp-mono" style={{ color: "var(--text-muted)" }}>
              week-by-week · 5 weeks
            </span>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: 16,
            }}
          >
            {[
              ["Wk 1", "Scope call · content audit · page map agreed"],
              ["Wk 2", "Design in Figma · mobile-first · CTA hierarchy locked"],
              ["Wk 3", "Next.js 15 build · Neon + Drizzle wired · staging live"],
              ["Wk 4", "Copy polish · schema added · CWV audit"],
              ["Wk 5", "Launch to Vercel · DNS · Lighthouse green · hand-off Loom"],
            ].map(([w, d]) => (
              <figure key={w} style={{ margin: 0 }}>
                <Placeholder label={`${w} · process shot`} h={240} />
                <div style={{ marginTop: 12 }}>
                  <div
                    className="cp-mono"
                    style={{ color: "var(--accent)", marginBottom: 4 }}
                  >
                    {w}
                  </div>
                  <div
                    style={{
                      fontSize: 13,
                      color: "var(--text-muted)",
                      lineHeight: 1.5,
                    }}
                  >
                    {d}
                  </div>
                </div>
              </figure>
            ))}
          </div>
        </div>
      </div>

      {/* Quote */}
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
            &quot;Sam rebuilt our site from scratch in five weeks. Fast,
            clean, and showed us the staging every week so nothing was a
            surprise. The new site is a completely different level.&quot;
          </p>
          <div
            style={{
              marginTop: 24,
              display: "flex",
              alignItems: "center",
              gap: 12,
            }}
          >
            <Placeholder label="headshot" w={56} h={56} />
            <div>
              <div
                style={{
                  fontFamily:
                    "var(--font-display), Manrope, ui-sans-serif, system-ui, sans-serif",
                  fontWeight: 600,
                }}
              >
                Client
              </div>
              <div className="cp-mono" style={{ color: "var(--text-muted)" }}>
                King Double Glazing · Melbourne
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stack */}
      <div
        style={{
          padding: "40px 48px",
          borderBottom: "1px solid var(--border)",
        }}
      >
        <div className="cp-mono" style={{ color: "var(--text-muted)" }}>
          Stack: Next.js 15 · TypeScript · Tailwind v4 · Neon · Drizzle ORM · Vercel · Cloudflare · Resend
        </div>
      </div>

      <FinalCTA />
      <Footer />
    </>
  );
}
