import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/nav";
import Footer from "@/components/footer";
import FinalCTA from "@/components/final-cta";
import Row from "@/components/row";

export const metadata: Metadata = {
  title: "Web Designer Melbourne · clupai — web, SEO & automation studio",
  description:
    "Melbourne web design and Next.js development for small businesses and service operators. Fast, conversion-first builds, delivered in 3–5 weeks. No account managers, no lock-in.",
  alternates: {
    canonical: "https://clupai.com/services/web/melbourne",
  },
  openGraph: {
    title: "Web Designer Melbourne · clupai",
    description:
      "Next.js websites for Melbourne businesses. Fast, fixed-price, and you own every line of code.",
    url: "https://clupai.com/services/web/melbourne",
  },
};

const included = [
  "Discovery workshop — one 90-minute call, recorded",
  "Copy draft delivered before design starts",
  "Design in Figma — mobile and desktop, no hand-offs",
  "Next.js 16 build, TypeScript, Tailwind v4, MDX",
  "Deploy to Vercel — your account, you own it",
  "Cloudflare DNS + email routing set up",
  "Schema — LocalBusiness, Organisation, BreadcrumbList",
  "Core Web Vitals green — LCP < 1.2s target",
  "Accessibility — WCAG 2.2 AA, keyboard-first",
  "Analytics — Vercel + PostHog wired in",
  "Cal.com or Calendly embed with qualification",
  "One month of post-launch tweaks included",
];

const differentiators = [
  {
    label: "No account managers",
    body: "You speak directly with the person writing the code and the copy. Nothing gets lost in a brief handed from sales to design to dev.",
  },
  {
    label: "Fixed price, not hourly",
    body: "We quote before we start and we hold the number. Scope changes get a written add-on quote — no surprise invoices at the end.",
  },
  {
    label: "You own everything",
    body: "The repo, the Vercel account, the domain, the analytics. We're a collaborator, not a custodian. Fire us and everything stays put.",
  },
  {
    label: "Copy before pixels",
    body: "Most Melbourne web shops start with a template and bolt words on at the end. We write the copy first — because copy is the product.",
  },
];

const suburbs = [
  "Brunswick",
  "Carlton",
  "Richmond",
  "Fitzroy",
  "Collingwood",
  "Coburg",
  "Northcote",
  "Moonee Ponds",
  "Prahran",
  "Hawthorn",
  "Abbotsford",
  "Thornbury",
];

const faqs = [
  {
    q: "Do you work with businesses outside Melbourne?",
    a: "Yes. A third of our work is interstate or international. Melbourne is where we're based, not a geographic limit. Timezone is AEST; we don't book calls after 6pm.",
  },
  {
    q: "How long is the wait list?",
    a: "Usually two to four weeks from deposit to kick-off. If you're urgent, say so in the scope call — occasionally a slot opens early.",
  },
  {
    q: "What's a realistic budget for a Melbourne small business?",
    a: "The Launch build covers up to eight pages — enough for most service businesses. If you need a booking system, customer portal, or quote calculator, that's the Growth tier. Rather than throw a number at you blind, we scope it on a 20-minute call and come back with a fixed quote — so you only pay for what you actually need.",
  },
  {
    q: "Do you do Shopify for Melbourne ecommerce?",
    a: "Yes, on a case-by-case basis. Shopify is the right call when you need native commerce — inventory, fulfilment, shop pay. If you're selling three products and mostly want to look credible, Next.js with Stripe is cheaper and faster. We'll tell you which applies.",
  },
  {
    q: "What about WordPress?",
    a: "We stopped taking WordPress work in 2023 and we won't be talked back in. If you're on WordPress and want to stay, we'll refer you to someone good in Melbourne who still likes the platform. No hard feelings.",
  },
  {
    q: "Can you redesign an existing Melbourne business site?",
    a: "Yes — it's most of what we do. We'll audit the existing site, extract what's working (copy, structure, SEO signals), and rebuild it on a modern stack. Typically the same price as a new build, sometimes less if the content is already solid.",
  },
];

export default function WebMelbournePage() {
  return (
    <>
      <Nav page="services" />

      {/* Breadcrumb */}
      <div style={{ padding: "48px 48px 0" }}>
        <div className="cp-mono" style={{ color: "var(--text-muted)" }}>
          <Link href="/services">Services</Link>{" "}
          <span style={{ color: "var(--text-dim)" }}>/</span>{" "}
          <Link href="/services/web">Websites</Link>{" "}
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
              Web designer Melbourne · Next.js developer Melbourne
            </div>
            <h1
              className="cp-display"
              style={{ fontSize: "clamp(3rem, 6vw, 5.5rem)", margin: 0 }}
            >
              Melbourne sites that
              <br />
              <span style={{ color: "var(--accent)" }}>
                actually convert.
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
              Most Melbourne businesses have a site that looks fine and does
              nothing. We build conversion-first Next.js sites — copy written
              before a pixel moves, fast enough to score 99 on Lighthouse,
              and priced so a Brunswick café or a Richmond trades business
              can actually afford it.
            </p>
            <div style={{ marginTop: 32, display: "flex", gap: 12 }}>
              <Link href="/contact" className="cp-btn cp-btn-primary cp-btn-lg">
                Book a 20‑minute scope call →
              </Link>
              <Link href="/work" className="cp-btn cp-btn-ghost cp-btn-lg">
                See a recent Melbourne build
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
              <Row k="Timeline" v="3–5 weeks" />
              <Row k="Deliverable" v="Repo + deploy + docs" />
              <Row k="Revisions" v="2 rounds" />
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
          § 01 · Why clupai vs Melbourne agencies
        </div>
        <h2
          className="cp-display"
          style={{
            fontSize: "var(--fs-h2)",
            margin: "0 0 48px",
            maxWidth: 760,
          }}
        >
          Agencies sell process.{" "}
          <span style={{ color: "var(--accent)" }}>We sell the outcome.</span>
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
              Same deliverables whether you&apos;re in Brunswick or Barangaroo.
              No Melbourne surcharge; no regional tier.{" "}
              <Link
                href="/services/web"
                style={{ color: "var(--accent)", textDecoration: "underline" }}
              >
                See the full service spec →
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
              § 03 · Melbourne context
            </div>
            <h2
              className="cp-display"
              style={{ fontSize: "var(--fs-h2)", margin: "0 0 24px" }}
            >
              Built for Melbourne's{" "}
              <span style={{ color: "var(--accent)" }}>inner-suburb economy.</span>
            </h2>
            <p
              style={{
                color: "var(--text-muted)",
                fontSize: 16,
                lineHeight: 1.65,
                marginBottom: 24,
              }}
            >
              We work primarily with Melbourne service businesses — trades,
              professional services, health, hospitality — where a better site
              means more qualified phone calls, not just a prettier brand page.
              We know the local competitive landscape: what ranks in Fitzroy
              differs from what ranks in Moonee Ponds. We account for that in
              every build.
            </p>
            <p
              style={{
                color: "var(--text-muted)",
                fontSize: 16,
                lineHeight: 1.65,
                marginBottom: 32,
              }}
            >
              Recent example: King Double Glazing — a glazing business in the
              King Street corridor. We rebranded them from The Glass Discounters
              (57 mobile Lighthouse, 13.1s load time) to a fully rebuilt Next.js
              site with an Instant Estimate calculator. Desktop Lighthouse 99.
              The leads that come in now have a budget number attached.
            </p>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {suburbs.map((s) => (
                <span key={s} className="cp-chip">
                  {s}
                </span>
              ))}
            </div>
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
                Recent Melbourne build
              </div>
              <div
                className="cp-num"
                style={{
                  fontSize: 96,
                  color: "var(--accent)",
                  letterSpacing: "-0.05em",
                  lineHeight: 0.9,
                }}
              >
                75→99
              </div>
              <div
                className="cp-mono"
                style={{ color: "var(--text-muted)", marginTop: -8 }}
              >
                Performance · desktop · Lighthouse
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
                King Double Glazing — rebrand, rebuild, conversion funnel
              </div>
              <p
                style={{
                  color: "var(--text-muted)",
                  fontSize: 14,
                  lineHeight: 1.6,
                  margin: 0,
                }}
              >
                Full rebrand to Next.js 16, TinaCMS, Neon, and Tailwind v4.
                Multi-step Instant Estimate Tool that shows a ballpark price
                before the contact form. Leads arrive with a number in hand.
              </p>
              <Link
                href="/work/king-double-glazing"
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
                Read the full case study →
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
              Melbourne-specific
              <br />
              <span style={{ color: "var(--text-muted)" }}>
                questions, answered.
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
                  href="/services/web"
                  style={{
                    color: "var(--accent)",
                    textDecoration: "underline",
                  }}
                >
                  See the full web service FAQ
                </Link>{" "}
                or{" "}
                <Link
                  href="/contact"
                  style={{
                    color: "var(--accent)",
                    textDecoration: "underline",
                  }}
                >
                  book a 20-minute scope call.
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
