import Link from "next/link";
import Nav from "@/components/nav";
import Footer from "@/components/footer";
import FinalCTA from "@/components/final-cta";
import Placeholder from "@/components/placeholder";
import Row from "@/components/row";
import SamAvatar from "@/components/sam-avatar";

export function generateStaticParams() {
  return [
    { slug: "brunswick-legal" },
    { slug: "kairos-clinic" },
    { slug: "tapcraft-trade" },
    { slug: "north-dental" },
    { slug: "loam-loft" },
    { slug: "roam-realty" },
  ];
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  void slug; // each slug could load its own data; for now all show brunswick-legal template

  return (
    <>
      <Nav page="work" />

      {/* Breadcrumb + hero */}
      <div style={{ padding: "48px 48px 0" }}>
        <div className="cp-mono" style={{ color: "var(--text-muted)" }}>
          <Link href="/work">Work</Link>{" "}
          <span style={{ color: "var(--text-dim)" }}>/</span>{" "}
          <span style={{ color: "var(--text)" }}>brunswick-legal</span>
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
              Law firm · Brunswick, Melbourne · 2025
            </div>
            <h1
              className="cp-display"
              style={{
                fontSize: "clamp(2.75rem, 5.4vw, 5rem)",
                margin: 0,
              }}
            >
              Brunswick Legal—
              <br />
              from brochure to{" "}
              <span style={{ color: "var(--accent)" }}>booking engine.</span>
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
              A mid‑size suburban law firm with a site that read like an annual
              report. Traffic was fine. Calls weren&apos;t. We cut the scope,
              published the prices, and pointed every page at the same next step.
            </p>
          </div>
          <div className="cp-card" style={{ padding: 24 }}>
            <Row k="Industry" v="Legal services" />
            <div style={{ height: 8 }} />
            <Row k="Location" v="Brunswick, VIC" />
            <div style={{ height: 8 }} />
            <Row k="Scope" v="Website · copy · Calendly" />
            <div style={{ height: 8 }} />
            <Row k="Stack" v="Next.js · Tailwind · MDX" />
            <div style={{ height: 8 }} />
            <Row k="Timeline" v="4 weeks · $6,200" />
            <div style={{ height: 8 }} />
            <Row k="Shipped" v="March 2025" />
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
          ["Qualified intake calls", "+184%", "90 days after launch"],
          ["LCP · mobile", "0.9s", "from 4.2s — same CMS, same host"],
          ["Pages", "34→9", "cut, merged, redirected"],
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
              &quot;We&apos;re ranking fine, we&apos;re getting traffic,
              nobody&apos;s calling. And everyone I ask wants a six‑figure
              rebuild.&quot;
            </p>
            <p style={{ marginTop: 16, color: "var(--text-muted)" }}>
              — Principal, Brunswick Legal
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
              "Primary CTA was the size of a footnote. The six practice-area pages each shipped visitors to a different form.",
              "Pricing was hidden. Every enquiry went through a 20‑minute discovery call—even for work with a published Victorian fee scale.",
              "Mobile LCP was 4.2s on 4G because the homepage loaded four autoplay videos and a 2 MB hero image.",
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
                "One CTA",
                "Every page—home, services, about—points at the same Calendly link. No secondary form, no 'enquire here'. Decision-debt reduced for the visitor.",
              ],
              [
                "Published fees",
                "The VIC-regulated work got a public price. The custom work got a clear price range. Traffic didn't drop. Qualified calls doubled.",
              ],
              [
                "Cut 25 pages",
                "Six practice-area pages merged into three service pages. 19 blog posts older than 2021 redirected to the most relevant live page.",
              ],
              [
                "Next.js + MDX",
                "Migrated off a WordPress theme with 14 plugins. Same CMS-lite authoring experience via MDX, without the performance tax.",
              ],
              [
                "Pre-qualification",
                "Calendly asks project type, budget range, and suburb. The principal's calendar got 40% fewer bookings—and 3× the ones that closed.",
              ],
              [
                "LocalBusiness schema",
                "Proper schema + consolidated NAP across 14 citation sites. Map‑pack impressions up 71% in 60 days.",
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
              The site that&apos;s live at brunswicklegal.com.au—
            </span>
            <span style={{ color: "var(--accent)" }}>annotated</span>.
          </h2>
        </div>

        <figure style={{ margin: 0 }}>
          <Placeholder
            label="01 · home hero, desktop — single primary CTA above fold"
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
              &quot;Book a consult&quot; is the only thing you can click above
              the fold
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
            <Placeholder label="02 · mobile home — 375×812" h={680} />
            <div
              className="cp-mono"
              style={{ marginTop: 12, color: "var(--text-muted)" }}
            >
              02 · Home · mobile · 0.9s LCP
            </div>
          </figure>
          <figure style={{ margin: 0 }}>
            <Placeholder
              label="03 · services overview — price bands visible"
              h={680}
            />
            <div
              className="cp-mono"
              style={{ marginTop: 12, color: "var(--text-muted)" }}
            >
              03 · /services · three cards, each with a published fee
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
            ["04 · /services/wills-and-estates", "04 · Service page · one CTA, one price"],
            ["05 · Calendly embed w/ pre-qualification", "05 · Booking · budget + matter type fields"],
            ["06 · Plausible — 90-day comparison", "06 · Analytics · before / after launch"],
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
              week-by-week · 4 weeks
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
              ["Wk 1", "Information architecture · content audit · 34 → 9 pages"],
              ["Wk 2", "Design in the browser · Figma skipped · MDX-first drafts"],
              ["Wk 3", "Copy rewrites with the principal · fee schedule published"],
              ["Wk 4", "Launch · redirects · Plausible + Calendly wired"],
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
            &quot;Sam rewrote the site in a month, showed us the staging every
            week, and published fees we&apos;d been arguing about internally for
            two years. The phone started ringing before we&apos;d finished the
            launch email.&quot;
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
                A. Papadopoulos
              </div>
              <div className="cp-mono" style={{ color: "var(--text-muted)" }}>
                Principal · Brunswick Legal Co.
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
          Stack: Next.js 15 · TypeScript · Tailwind · MDX · Vercel · Cloudflare
          · Calendly · Plausible · Resend
        </div>
      </div>

      <FinalCTA />
      <Footer />
    </>
  );
}
