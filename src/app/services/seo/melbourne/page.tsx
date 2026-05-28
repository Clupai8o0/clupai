import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/nav";
import Footer from "@/components/footer";
import FinalCTA from "@/components/final-cta";
import Row from "@/components/row";

export const metadata: Metadata = {
  title: "SEO Consultant Melbourne · clupai — web, SEO & automation studio",
  description:
    "Technical and local SEO for Melbourne service businesses. No doorway pages, no link packages — just fewer, better pages and a technical foundation that holds.",
  alternates: {
    canonical: "https://clupai.com/services/seo/melbourne",
  },
  openGraph: {
    title: "SEO Consultant Melbourne · clupai",
    description:
      "Local SEO and technical SEO for Melbourne businesses. Honest, no-doorway-page approach.",
    url: "https://clupai.com/services/seo/melbourne",
  },
};

const included = [
  "Technical audit — Core Web Vitals, crawl, schema, canonicals",
  "Local setup — Google Business Profile, citations, reviews flow",
  "Keyword map — 10–20 pages, not 200",
  "Content plan — 2 to 4 real posts per month",
  "On-page fixes, monthly — titles, meta, internal links, schema",
  "Backlinks — earned, not bought. No PBNs, no link packages.",
  "Tracker — your rankings, plus the ones we'll admit to missing",
  "Monthly strategy call — 30 minutes, no dashboard cosplay",
];

const differentiators = [
  {
    label: "Suburb-level targeting, not suburb-level spam",
    body: "Melbourne's big agencies sell 40-suburb doorway pages. We build 4–8 excellent local pages that a real person would want to read. One ranks; the doorway farm gets demoted.",
  },
  {
    label: "Technical work we actually do",
    body: "Most local SEO retainers are a monthly report and a content brief. We fix the Core Web Vitals, the crawl issues, the broken schema — before the content goes in.",
  },
  {
    label: "We work in the seams",
    body: "Melbourne has Webfirm, Clearwater, the big national players. They chase the $10k/month accounts. We work with the businesses those agencies price out — and we don't staff the account with a junior after month two.",
  },
  {
    label: "Content that doesn't embarrass you",
    body: "We draft in Australian English, with a subject-matter editor, and we tell you when we're out of our depth on something technical. No pure AI content hitting your site.",
  },
];

const faqs = [
  {
    q: "How is local SEO different for Melbourne businesses?",
    a: "Melbourne's search landscape is dense — service-category searches like 'plumber Carlton' or 'physio Fitzroy' are competitive because everyone's targeting them. What works is suburb-level GBP authority, reviews velocity, and genuinely useful service-area content that a searcher would bookmark. We also watch for Melbourne-specific local pack behaviour — Google's local pack in Melbourne tends to weight proximity more than many other Australian cities.",
  },
  {
    q: "How long until my Google Business Profile ranks?",
    a: "For a new GBP with no reviews: six to twelve weeks for basic local pack visibility, longer for competitive categories. If you already have a GBP with reviews, we can usually move the needle in four to six weeks. We'll tell you what category you're in and what realistic movement looks like on the first call.",
  },
  {
    q: "Do you do suburb pages?",
    a: "Yes — but not 40 of them. We'll build the four or five suburbs that actually generate searches for your service category, write them so they're genuinely useful, and structure them so they reinforce the core service page. We won't publish a page that's just a suburb name swapped into a template. Those get you penalised now.",
  },
  {
    q: "What about Google Ads vs SEO?",
    a: "Different tools for different problems. Ads are immediate and off the moment the budget stops. SEO compounds over time but takes longer to move. For most Melbourne service businesses, we'd run both if the ad budget is there — Ads buys data while SEO builds the asset. If you only have budget for one, talk to us about which fits your timeline.",
  },
  {
    q: "Do you write the content?",
    a: "Yes. Drafts are written by us, reviewed by a subject-matter editor, then sent to you for approval before they go live. If your industry has specific compliance requirements (health, financial services, legal), tell us upfront — we'll adjust the workflow. We never publish without your sign-off.",
  },
  {
    q: "Three-month minimum — why?",
    a: "Technical wins show up in weeks. Content and local authority take three to six months. Signing up for a month and leaving before the compounding starts is a bad deal for both of us. Three months is the minimum that gives us room to actually show you what works.",
  },
];

const caseStudy = {
  stat: "+2,000%",
  sstat: "organic click growth · 6 months",
  title: "nmmun — zero to 19,000 organic clicks",
  body: "New domain, no authority, competitive niche. We mapped real search intent, wrote 10 focused articles, fixed the technical baseline, and built internal links that reinforced the right pages. Six months in: 19k monthly organic clicks and no doorway page exposure to write off.",
};

export default function SEOMelbournePage() {
  return (
    <>
      <Nav page="services" />

      {/* Breadcrumb */}
      <div style={{ padding: "48px 48px 0" }}>
        <div className="cp-mono" style={{ color: "var(--text-muted)" }}>
          <Link href="/services">Services</Link>{" "}
          <span style={{ color: "var(--text-dim)" }}>/</span>{" "}
          <Link href="/services/seo">SEO</Link>{" "}
          <span style={{ color: "var(--text-dim)" }}>/</span>{" "}
          <span style={{ color: "var(--text)" }}>Melbourne</span>
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
              SEO consultant Melbourne · local SEO Melbourne · technical SEO
            </div>
            <h1
              className="cp-display"
              style={{ fontSize: "clamp(3rem, 6vw, 5.5rem)", margin: 0 }}
            >
              Ranking in Melbourne
              <br />
              <span style={{ color: "var(--accent)" }}>
                isn&apos;t a numbers game.
              </span>
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
              Melbourne&apos;s competitive — and most SEO retainers respond by
              producing more content, more suburb pages, more links. We go the
              other way: fewer pages, technically tight, written for an actual
              reader. That&apos;s what&apos;s working in 2026, and it&apos;s
              the only thing we offer.
            </p>
            <div style={{ marginTop: 32, display: "flex", gap: 12 }}>
              <Link href="/contact" className="cp-btn cp-btn-primary cp-btn-lg">
                Book a 20‑minute scope call →
              </Link>
              <Link href="/work" className="cp-btn cp-btn-ghost cp-btn-lg">
                See the nmmun case study
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
              Monthly retainer · 3-month minimum
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
              <Row k="Setup" v="2-week technical audit" />
              <Row k="Deliverable" v="Audit, tracker, monthly report" />
              <Row k="Cadence" v="Monthly call + continuous" />
              <Row k="Location" v="Melbourne, VIC" />
            </div>
          </div>
        </div>
      </div>

      {/* Why us vs Melbourne agencies */}
      <div
        style={{
          padding: "80px 48px",
          background: "var(--surface)",
          borderBottom: "1px solid var(--border)",
        }}
      >
        <div className="cp-mono" style={{ marginBottom: 12 }}>
          § 01 · Why clupai vs Melbourne SEO agencies
        </div>
        <h2
          className="cp-display"
          style={{
            fontSize: "var(--fs-h2)",
            margin: "0 0 48px",
            maxWidth: 760,
          }}
        >
          The big Melbourne agencies sell volume.{" "}
          <span style={{ color: "var(--accent)" }}>We sell precision.</span>
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "1px",
            background: "var(--border)",
          }}
        >
          {differentiators.map((d, i) => (
            <div
              key={i}
              style={{
                background: "var(--surface)",
                padding: "32px 36px",
              }}
            >
              <div
                style={{
                  fontFamily:
                    "var(--font-display), Manrope, ui-sans-serif, system-ui, sans-serif",
                  fontWeight: 700,
                  fontSize: 20,
                  letterSpacing: "-0.02em",
                  marginBottom: 12,
                }}
              >
                {d.label}
              </div>
              <p
                style={{
                  color: "var(--text-muted)",
                  fontSize: 15,
                  lineHeight: 1.6,
                  margin: 0,
                }}
              >
                {d.body}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* What's included */}
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
              § 02 · What&apos;s included
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
            <p
              style={{
                marginTop: 16,
                color: "var(--text-dim)",
                fontSize: 14,
                lineHeight: 1.6,
              }}
            >
              Same deliverables every month — not a different package each
              quarter.{" "}
              <Link
                href="/services/seo"
                style={{ color: "var(--accent)", textDecoration: "underline" }}
              >
                See the full SEO service spec →
              </Link>
            </p>
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
                  style={{
                    color: "var(--text-dim)",
                    minWidth: 26,
                    flexShrink: 0,
                  }}
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

      {/* Melbourne context + case study */}
      <div
        style={{
          padding: "80px 48px",
          borderBottom: "1px solid var(--border)",
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
              § 03 · Melbourne SEO context
            </div>
            <h2
              className="cp-display"
              style={{ fontSize: "var(--fs-h2)", margin: "0 0 24px" }}
            >
              Melbourne&apos;s search landscape{" "}
              <span style={{ color: "var(--accent)" }}>is crowded but beatable.</span>
            </h2>
            <p
              style={{
                color: "var(--text-muted)",
                fontSize: 16,
                lineHeight: 1.65,
                marginBottom: 24,
              }}
            >
              The inner-north corridor — Brunswick, Fitzroy, Collingwood,
              Northcote — has some of the densest local search competition in
              Australia for categories like trades, health, and food. The
              tactics that worked five years ago (bulk suburb pages, cheap link
              packages, exact-match anchor text) are now penalties waiting to
              land.
            </p>
            <p
              style={{
                color: "var(--text-muted)",
                fontSize: 16,
                lineHeight: 1.65,
                marginBottom: 24,
              }}
            >
              What works now: a technically clean site, a Google Business
              Profile with consistent reviews, two or three genuinely useful
              service-area pages, and content that earns a link because it&apos;s
              actually the best thing written about that topic in Melbourne.
              We&apos;ve built that playbook across health, trades, professional
              services, and SaaS.
            </p>
            <p
              style={{
                color: "var(--text-muted)",
                fontSize: 16,
                lineHeight: 1.65,
              }}
            >
              We also integrate technical SEO with site builds — if you&apos;re
              working with us on a website, the SEO foundation is already in the
              stack (schema, Core Web Vitals, sitemap, internal linking
              structure). You&apos;re not paying twice.
            </p>
          </div>

          <div>
            <div
              className="cp-card"
              style={{
                padding: "32px",
                display: "flex",
                flexDirection: "column",
                gap: 20,
              }}
            >
              <div className="cp-mono" style={{ color: "var(--text-muted)" }}>
                Recent SEO result
              </div>
              <div
                className="cp-num"
                style={{
                  fontSize: 80,
                  color: "var(--accent)",
                  letterSpacing: "-0.05em",
                  lineHeight: 0.9,
                }}
              >
                +2,000%
              </div>
              <div
                className="cp-mono"
                style={{ color: "var(--text-muted)", marginTop: -8 }}
              >
                organic click growth · 6 months
              </div>
              <div
                style={{
                  fontFamily:
                    "var(--font-display), Manrope, ui-sans-serif, system-ui, sans-serif",
                  fontWeight: 700,
                  fontSize: 20,
                  letterSpacing: "-0.02em",
                }}
              >
                {caseStudy.title}
              </div>
              <p
                style={{
                  color: "var(--text-muted)",
                  fontSize: 14,
                  lineHeight: 1.6,
                  margin: 0,
                }}
              >
                {caseStudy.body}
              </p>
              <Link
                href="/work"
                style={{
                  color: "var(--accent)",
                  fontFamily:
                    "var(--font-display), Manrope, ui-sans-serif, system-ui, sans-serif",
                  fontWeight: 500,
                  fontSize: 15,
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                }}
              >
                See our work →
              </Link>
            </div>
          </div>
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
              § 04 · FAQ
            </div>
            <h2
              className="cp-display"
              style={{ fontSize: "var(--fs-h2)", margin: 0 }}
            >
              Melbourne SEO
              <br />
              <span style={{ color: "var(--text-muted)" }}>
                questions, plainly.
              </span>
            </h2>
          </div>
          <div>
            {faqs.map((item, i) => (
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
                  {item.a}
                </p>
              </details>
            ))}
            <div
              style={{
                borderTop: "1px solid var(--border)",
                paddingTop: 28,
                marginTop: 4,
              }}
            >
              <p
                style={{
                  color: "var(--text-dim)",
                  fontSize: 13,
                  margin: "0 0 16px",
                }}
              >
                More questions?{" "}
                <Link
                  href="/services/seo"
                  style={{
                    color: "var(--accent)",
                    textDecoration: "underline",
                  }}
                >
                  See the full SEO service FAQ
                </Link>{" "}
                or{" "}
                <Link
                  href="/contact"
                  style={{
                    color: "var(--accent)",
                    textDecoration: "underline",
                  }}
                >
                  book a 20-minute call.
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>

      <FinalCTA />
      <Footer />
    </>
  );
}
