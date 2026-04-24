"use client";

import Link from "next/link";
import Nav from "@/components/nav";
import Footer from "@/components/footer";
import FinalCTA from "@/components/final-cta";
import Marquee from "@/components/marquee";
import WordSwap from "@/components/word-swap";
import Placeholder from "@/components/placeholder";
import SamAvatar from "@/components/sam-avatar";

const HERO_WORDS = ["customers", "bookings", "revenue", "pipeline", "leads"];

function HeroA() {
  return (
    <div
      style={{
        background: "var(--bg)",
        color: "var(--text)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          padding: "56px 48px 0",
          display: "grid",
          gridTemplateColumns: "96px 1fr",
          gap: 40,
        }}
      >
        {/* left rail */}
        <div
          style={{
            borderRight: "1px solid var(--border)",
            paddingRight: 24,
            minHeight: 700,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <div>
            <div
              className="cp-mono"
              style={{
                writingMode: "vertical-rl",
                transform: "rotate(180deg)",
                color: "var(--text-muted)",
              }}
            >
              A one-person studio · est. 2024
            </div>
          </div>
          <div
            className="cp-num"
            style={{ fontSize: 72, color: "var(--accent)", lineHeight: 0.9 }}
          >
            10
          </div>
          <div className="cp-mono" style={{ fontSize: 10 }}>
            projects
            <br />
            shipped
          </div>
        </div>

        {/* hero copy */}
        <div style={{ position: "relative", paddingBottom: 80 }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: 36,
            }}
          >
            <span className="cp-eyebrow">Melbourne · VIC · AU</span>
            <span className="cp-mono">CLUPAI.COM</span>
          </div>
          <h1
            className="cp-display"
            style={{ fontSize: "var(--fs-hero)", margin: 0, color: "var(--text)" }}
          >
            Websites, ads,
            <br />
            and automation
            <br />
            that ship more{" "}
            <WordSwap words={HERO_WORDS} style={{ color: "var(--accent)" }} />
            <span style={{ color: "var(--accent)" }}>.</span>
          </h1>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr auto",
              alignItems: "end",
              gap: 48,
              marginTop: 56,
            }}
          >
            <p
              style={{
                fontSize: 20,
                color: "var(--text-muted)",
                maxWidth: 560,
                margin: 0,
                lineHeight: 1.5,
              }}
            >
              I&apos;m Sam—I build, rank, and scale sites for Melbourne
              operators, end‑to‑end, without the agency overhead.
            </p>
            <div style={{ display: "flex", gap: 12, flexShrink: 0 }}>
              <Link
                href="/contact"
                className="cp-btn cp-btn-primary cp-btn-lg"
              >
                Book a 20‑minute scope call
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M2 8h12M9 3l5 5-5 5" />
                </svg>
              </Link>
              <Link href="/work" className="cp-btn cp-btn-ghost cp-btn-lg">
                See recent work
              </Link>
            </div>
          </div>
          {/* footer ticker */}
          <div
            style={{
              marginTop: 40,
              display: "flex",
              justifyContent: "space-between",
              paddingTop: 24,
              borderTop: "1px solid var(--border)",
            }}
          >
            <span className="cp-chip">
              <span className="dot" />
              Two slots left · Q3
            </span>
            <span className="cp-mono">Scroll ↓</span>
            <span className="cp-mono">Avg. reply · under 1 AU business day</span>
          </div>
        </div>
      </div>
    </div>
  );
}

const services = [
  {
    n: "01",
    h: "Websites",
    k: ["Next.js · Tailwind", "Copy, design, build", "Launch in 3–5 weeks"],
    tag: "from $3,950",
    href: "/services/web",
  },
  {
    n: "02",
    h: "Google Ads",
    k: [
      "Search + Performance Max",
      "Landing pages that convert",
      "Weekly tuning",
    ],
    tag: "from $1,500/mo",
    href: "/services/ads",
  },
  {
    n: "03",
    h: "SEO",
    k: [
      "Technical + local",
      "GBP, schema, Core Web Vitals",
      "Content that ranks",
    ],
    tag: "from $1,200/mo",
    href: "/services/seo",
  },
  {
    n: "04",
    h: "Automation",
    k: [
      "Zapier · n8n · Make",
      "Internal tools, dashboards",
      "Integrations that hold",
    ],
    tag: "from $5,000",
    href: "/services/automation",
  },
];

function ServicesSection() {
  return (
    <div style={{ background: "var(--bg)", padding: "80px 48px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "end",
          marginBottom: 48,
        }}
      >
        <div>
          <div className="cp-eyebrow" style={{ marginBottom: 12 }}>
            04 services · one operator · end‑to‑end
          </div>
          <h2
            className="cp-display"
            style={{ fontSize: "var(--fs-h2)", margin: 0 }}
          >
            Four things. Done properly.
            <br />
            <span style={{ color: "var(--text-muted)" }}>
              Not forty, done once.
            </span>
          </h2>
        </div>
        <div className="cp-mono" style={{ color: "var(--text-muted)" }}>
          § 01 / 07
        </div>
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          borderTop: "1px solid var(--border)",
        }}
      >
        {services.map((s, i) => (
          <Link
            key={s.n}
            href={s.href}
            style={{
              borderRight:
                i === services.length - 1 ? "none" : "1px solid var(--border)",
              borderBottom: "1px solid var(--border)",
              padding: "32px 28px",
              minHeight: 340,
              display: "flex",
              flexDirection: "column",
              position: "relative",
            }}
          >
            <div className="cp-mono" style={{ marginBottom: 28 }}>
              ({s.n})
            </div>
            <h3
              className="cp-display"
              style={{
                fontSize: 40,
                fontWeight: 700,
                margin: 0,
                letterSpacing: "-0.03em",
              }}
            >
              {s.h}
            </h3>
            <ul
              style={{
                listStyle: "none",
                padding: 0,
                margin: "20px 0 0",
                display: "flex",
                flexDirection: "column",
                gap: 10,
              }}
            >
              {s.k.map((k) => (
                <li
                  key={k}
                  style={{
                    fontSize: 14,
                    color: "var(--text-muted)",
                    display: "flex",
                    gap: 10,
                  }}
                >
                  <span style={{ color: "var(--accent)" }}>→</span>
                  {k}
                </li>
              ))}
            </ul>
            <div
              style={{
                marginTop: "auto",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                paddingTop: 20,
              }}
            >
              <div
                className="cp-num"
                style={{ fontSize: 16, color: "var(--accent)" }}
              >
                {s.tag}
              </div>
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                stroke="var(--text)"
                strokeWidth="1.6"
              >
                <path d="M4 10h12M10 4l6 6-6 6" />
              </svg>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

const cases = [
  {
    n: "01",
    client: "King Double Glazing",
    kind: "Window glazing · Melbourne",
    stat: "4.9s→0.8s",
    sstat: "LCP · Core Web Vitals",
    desc: "Full Next.js 15 rebuild from an ageing site. Neon Postgres, Drizzle ORM, Tailwind v4, Vercel. Local schema, SEO strategy, Core Web Vitals green—delivered on scope.",
    href: "/work/king-double-glazing",
  },
  {
    n: "02",
    client: "Hoddle Melbourne",
    kind: "Mentorship platform · Carlton",
    stat: "0→live",
    sstat: "full platform · 6 weeks",
    desc: "CTO and sole developer. Next.js + Supabase platform for mentor-student matching. Auth, booking flow, and a mentor marketplace—shipped from scratch.",
    href: "/work/hoddle-melbourne",
  },
  {
    n: "03",
    client: "TapCraft Studio",
    kind: "NFC products · Melbourne",
    stat: "3D+shop",
    sstat: "headless Shopify · React Three Fiber",
    desc: "Co-founder and developer. Headless Shopify storefront with a React Three Fiber 3D product viewer. 3D-printed NFC keychains—spin the model, then checkout.",
    href: "/work/tapcraft",
  },
];

function WorkSection() {
  return (
    <div
      style={{
        background: "var(--surface)",
        padding: "80px 48px",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "end",
          marginBottom: 48,
        }}
      >
        <div>
          <div className="cp-eyebrow" style={{ marginBottom: 12 }}>
            Recent work · real numbers
          </div>
          <h2
            className="cp-display"
            style={{ fontSize: "var(--fs-h2)", margin: 0 }}
          >
            Three builds.
            <br />
            <span style={{ color: "var(--text-muted)" }}>
              What changed in the first quarter.
            </span>
          </h2>
        </div>
        <Link
          href="/work"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            color: "var(--accent)",
            fontFamily:
              "var(--font-display), Manrope, ui-sans-serif, system-ui, sans-serif",
            fontWeight: 500,
          }}
        >
          All case studies →
        </Link>
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 24,
        }}
      >
        {cases.map((c) => (
          <Link
            key={c.n}
            href={c.href}
            className="cp-card"
            style={{
              padding: 28,
              display: "flex",
              flexDirection: "column",
              minHeight: 440,
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span className="cp-mono">case {c.n}</span>
              <span className="cp-mono">2025–26</span>
            </div>
            <div
              className="cp-num"
              style={{
                fontSize: 96,
                color: "var(--accent)",
                lineHeight: 0.9,
                margin: "36px 0 8px",
                letterSpacing: "-0.05em",
              }}
            >
              {c.stat}
            </div>
            <div className="cp-mono" style={{ color: "var(--text-muted)" }}>
              {c.sstat}
            </div>
            <div
              style={{
                marginTop: 28,
                paddingTop: 20,
                borderTop: "1px solid var(--border)",
              }}
            >
              <div
                style={{
                  fontFamily:
                    "var(--font-display), Manrope, ui-sans-serif, system-ui, sans-serif",
                  fontWeight: 700,
                  fontSize: 22,
                  letterSpacing: "-0.02em",
                }}
              >
                {c.client}
              </div>
              <div
                className="cp-mono"
                style={{ color: "var(--text-muted)", marginTop: 4 }}
              >
                {c.kind}
              </div>
            </div>
            <p
              style={{
                marginTop: 16,
                color: "var(--text-muted)",
                fontSize: 14,
                lineHeight: 1.55,
              }}
            >
              {c.desc}
            </p>
            <div
              style={{
                marginTop: "auto",
                paddingTop: 20,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span
                style={{
                  color: "var(--accent)",
                  fontFamily:
                    "var(--font-display), Manrope, ui-sans-serif, system-ui, sans-serif",
                  fontWeight: 500,
                  fontSize: 14,
                }}
              >
                Read the full story →
              </span>
              <span className="cp-mono" style={{ color: "var(--text-dim)" }}>
                4 min
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

function PricingStripSection() {
  return (
    <div style={{ background: "var(--bg)", padding: "72px 48px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "end",
          marginBottom: 48,
        }}
      >
        <div>
          <div className="cp-eyebrow" style={{ marginBottom: 12 }}>
            Pricing · no discovery-call gatekeeping
          </div>
          <h2
            className="cp-display"
            style={{ fontSize: "var(--fs-h2)", margin: 0 }}
          >
            Real numbers.
            <br />
            <span style={{ color: "var(--accent)" }}>
              Published, not pitched.
            </span>
          </h2>
        </div>
        <p
          style={{
            color: "var(--text-muted)",
            maxWidth: 360,
            fontSize: 14,
            margin: 0,
          }}
        >
          Most agency sites bury the price. I don&apos;t—you shouldn&apos;t
          have to book a call to find out whether we&apos;re in the same
          ballpark.
        </p>
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          borderTop: "1px solid var(--border)",
          borderBottom: "1px solid var(--border)",
        }}
      >
        {(
          [
            ["Launch", "$3,950", "one‑off", "Single-site build. 3–5 weeks. You own everything."],
            ["Growth", "$8,950", "one‑off", "Site + launch campaign + 90 days of SEO."],
            ["Operator", "$2,500", "per month", "Retained partner. Ads, SEO, automation, ship list."],
          ] as const
        ).map(([h, p, s, d], i) => (
          <div
            key={h}
            style={{
              padding: "40px 32px",
              borderLeft: i === 0 ? "none" : "1px solid var(--border)",
            }}
          >
            <div className="cp-mono" style={{ marginBottom: 16 }}>
              {h.toUpperCase()}
            </div>
            <div
              style={{ display: "flex", alignItems: "baseline", gap: 10 }}
            >
              <div
                className="cp-num"
                style={{
                  fontSize: 72,
                  color: "var(--text)",
                  letterSpacing: "-0.04em",
                  lineHeight: 1,
                }}
              >
                {p}
              </div>
              <div className="cp-mono">{s}</div>
            </div>
            <p
              style={{
                marginTop: 20,
                color: "var(--text-muted)",
                fontSize: 14,
                lineHeight: 1.55,
              }}
            >
              {d}
            </p>
          </div>
        ))}
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: 24,
        }}
      >
        <div className="cp-mono" style={{ color: "var(--text-muted)" }}>
          All pricing in AUD · GST exclusive · no hidden retainers
        </div>
        <Link href="/pricing" className="cp-btn cp-btn-ghost">
          See the full breakdown →
        </Link>
      </div>
    </div>
  );
}

const logos = [
  "King Double Glazing",
  "Hoddle Melbourne",
  "TapCraft Studio",
  "Kairos",
  "DSEC",
  "Deakin University",
  "Hack48",
  "GovChat",
];

function TrustSection() {
  return (
    <div
      style={{
        background: "var(--bg)",
        padding: "56px 0",
        borderTop: "1px solid var(--border)",
        borderBottom: "1px solid var(--border)",
      }}
    >
      <div
        style={{
          padding: "0 48px",
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 36,
        }}
      >
        <div className="cp-eyebrow">People and projects I&apos;ve shipped</div>
        <div className="cp-mono" style={{ color: "var(--text-muted)" }}>
          Clients, products, clubs, and hackathons.
        </div>
      </div>
      <Marquee speed={50}>
        {logos.map((l, i) => (
          <div
            key={i}
            style={{ display: "flex", alignItems: "center", gap: 48 }}
          >
            <Placeholder label={l} w={200} h={72} />
            <span style={{ color: "var(--accent)", fontSize: 24 }}>◆</span>
          </div>
        ))}
      </Marquee>
    </div>
  );
}

function AboutTeaser() {
  return (
    <div
      style={{
        background: "var(--surface)",
        padding: "80px 48px",
        display: "grid",
        gridTemplateColumns: "380px 1fr",
        gap: 56,
      }}
    >
      <div>
        <SamAvatar size={320} />
        <div
          style={{
            marginTop: 24,
            display: "flex",
            flexDirection: "column",
            gap: 8,
          }}
        >
          <span className="cp-chip">
            <span className="dot" />
            Accepting July 2026
          </span>
          <span className="cp-chip">ABN registered · Melbourne</span>
          <span className="cp-chip">Brunswick · Melbourne VIC</span>
        </div>
      </div>
      <div>
        <div className="cp-eyebrow" style={{ marginBottom: 16 }}>
          About · Clupai is me
        </div>
        <h2
          className="cp-display"
          style={{
            fontSize: "clamp(2.5rem, 4.6vw, 4.25rem)",
            margin: 0,
          }}
        >
          Clupai is me—Sam.
          <br />
          <span style={{ color: "var(--accent)" }}>
            I don&apos;t hand you off to
            <br />
            account managers.
          </span>
        </h2>
        <div
          style={{
            marginTop: 36,
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 32,
          }}
        >
          <p
            style={{
              margin: 0,
              color: "var(--text-muted)",
              fontSize: 16,
              lineHeight: 1.6,
            }}
          >
            Started Clupai in 2024 under my ABN while studying CS at Deakin.
            I&apos;ve since shipped platforms for startups, rebuilt a trades
            business online, co-founded a product company, and built my own
            scheduling API. I do the work—no handoffs, no account layer.
          </p>
          <p
            style={{
              margin: 0,
              color: "var(--text-muted)",
              fontSize: 16,
              lineHeight: 1.6,
            }}
          >
            I take on a small number of projects so each gets properly
            shipped. Replies within one Australian business day—non-negotiable.
            Full portfolio and credentials at{" "}
            <span style={{ color: "var(--accent)" }}>samridhlimbu.com</span>.
          </p>
        </div>
        <div
          style={{ marginTop: 40, display: "flex", gap: 12 }}
        >
          <Link href="/about" className="cp-btn cp-btn-primary">
            How I work →
          </Link>
          <Link href="/about" className="cp-btn cp-btn-ghost">
            Read the long version
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <>
      <Nav page="home" />
      <HeroA />
      <ServicesSection />
      <WorkSection />
      <PricingStripSection />
      <TrustSection />
      <AboutTeaser />
      <FinalCTA />
      <Footer />
    </>
  );
}
