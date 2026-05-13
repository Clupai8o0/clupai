"use client";

import Link from "next/link";
import Image from "next/image";
import Nav from "@/components/nav";
import Footer from "@/components/footer";
import FinalCTA from "@/components/final-cta";
import Marquee from "@/components/marquee";
import RotatingText from "@/components/rotating-text";
import { motion } from "motion/react";
import Placeholder from "@/components/placeholder";
import SocialLinks from "@/components/social-links";
import { SERVICE_PRICES, PRICING_STRIP } from "@/data/pricing";
import { featuredKits } from "@/lib/kits";

const HERO_WORDS = ["customers", "bookings", "revenue", "pipeline", "leads"];

function HeroA() {
  return (
    <div
      className="cp-hero"
      style={{
        background: "var(--bg)",
        color: "var(--text)",
        position: "relative",
        height: "calc(100dvh - 65px)",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        className="cp-hero-inner"
        style={{
          padding: "0 48px 0",
          display: "grid",
          gridTemplateColumns: "96px 1fr",
          gap: 40,
          flex: 1,
          minHeight: 0,
          alignContent: "start",
        }}
      >
        {/* left rail */}
        <div
          className="cp-hero-rail"
          style={{
            borderRight: "1px solid var(--border)",
            paddingRight: 24,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            paddingTop: 56,
            paddingBottom: 40,
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
              A Melbourne studio · est. 2024
            </div>
          </div>

          {/* social icons */}
          <SocialLinks gap={18} direction="column" />

          {/* project count */}
          <div>
            <div
              className="cp-num"
              style={{ fontSize: 40, color: "var(--accent)", lineHeight: 0.9 }}
            >
              24
            </div>
            <div className="cp-mono" style={{ fontSize: 10, marginTop: 8 }}>
              projects
              <br />
              shipped
            </div>
          </div>
        </div>

        {/* hero copy */}
        <div style={{ position: "relative", paddingBottom: 32, paddingTop: 56 }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: 36,
            }}
          >
            <span className="cp-eyebrow">Web · SEO · Automation</span>
            <span className="cp-mono">CLUPAI.COM</span>
          </div>
          <h1
            className="cp-display"
            style={{ fontSize: "var(--fs-hero)", margin: 0, color: "var(--text)" }}
          >
            Websites, SEO,
            <br />
            and automation
            <br />
            that ship more
            <br />
            <RotatingText
              texts={HERO_WORDS}
              mainClassName="inline-flex overflow-hidden"
              splitLevelClassName="overflow-hidden pb-[0.2em]"
              staggerFrom="last"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "-120%" }}
              staggerDuration={0.025}
              transition={{ type: "spring", damping: 30, stiffness: 400 }}
              rotationInterval={2000}
              style={{ color: "var(--accent)" }}
            />
            <span style={{ color: "var(--accent)" }}>.</span>
          </h1>
          <div
            className="cp-hero-cta"
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
              We design, build, and grow digital products for Melbourne
              businesses—end‑to‑end, without the bloat.
            </p>
            <div className="cp-hero-buttons" style={{ display: "flex", gap: 12, flexShrink: 0 }}>
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
            className="cp-hero-ticker"
            style={{
              marginTop: 24,
              paddingTop: 20,
              display: "flex",
              flexDirection: "column",
              gap: 12,
              alignItems: "center",
            }}
          >
            <span className="cp-mono">Avg. reply · under 1 AU business day</span>
            <motion.span
              className="cp-mono"
              whileHover={{ scale: 1.04 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              style={{ alignSelf: "center", border: "1px solid var(--border)", borderRadius: 999, padding: "10px 24px", display: "inline-flex", alignItems: "center", gap: 8, cursor: "default" }}
            >
              Scroll
              <motion.span
                animate={{ y: [0, 4, 0] }}
                transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
                style={{ display: "inline-block", lineHeight: 1 }}
              >
                ↓
              </motion.span>
            </motion.span>
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
    tag: SERVICE_PRICES.web.display,
    href: "/services/web",
  },
  {
    n: "02",
    h: "SEO",
    k: [
      "Technical + local",
      "GBP, schema, Core Web Vitals",
      "Content that earns links",
    ],
    tag: SERVICE_PRICES.seo.display,
    href: "/services/seo",
  },
  {
    n: "03",
    h: "Automation",
    k: [
      "Zapier · n8n · Make",
      "Internal tools, dashboards",
      "Integrations that hold",
    ],
    tag: SERVICE_PRICES.automation.display,
    href: "/services/automation",
  },
];

function ServicesSection() {
  return (
    <div style={{ background: "var(--bg)", padding: "64px 48px 80px" }}>
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
            03 services · one operator · end‑to‑end
          </div>
          <h2
            className="cp-display"
            style={{ fontSize: "var(--fs-h2)", margin: 0 }}
          >
            Three things. Done properly.
            <br />
            <span style={{ color: "var(--text-muted)" }}>
              Web, SEO, automation.
            </span>
          </h2>
        </div>
      </div>
      <div
        className="cp-services-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
        }}
      >
        {services.map((s) => (
          <Link
            key={s.n}
            href={s.href}
            className="cp-service-card"
            style={{
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
                className="cp-service-arrow"
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
    kind: "Retrofit glazing · Melbourne",
    stat: "75→99",
    sstat: "Performance · desktop · Lighthouse",
    desc: "Rebrand and full rebuild from The Glass Discounters (57 mobile, 13.1s LCP). Next.js 16, TinaCMS, Neon, Drizzle, Resend. Instant Estimate Tool that surfaces price before lead capture. Desktop 99 · SEO 100.",
    href: "/work/king-double-glazing",
    large: true,
  },
  {
    n: "02",
    client: "Hoddle Melbourne",
    kind: "Mentorship platform · Carlton",
    stat: "0→live",
    sstat: "full platform · 6 weeks",
    desc: "CTO and sole developer. Next.js + Supabase platform for mentor-student matching. Auth, booking flow, and a mentor marketplace—shipped from scratch.",
    href: "/work/hoddle-melbourne",
    large: false,
  },
  {
    n: "03",
    client: "Kairos",
    kind: "AI scheduling app · solo-built",
    stat: "1–3 s",
    sstat: "task-to-calendar · schedule-on-write",
    desc: "Paste unstructured notes. Kairos extracts tasks via LLM and places them into Google Calendar automatically — deadlines, dependencies, and working hours respected. No drag and drop. No manual time-blocking.",
    href: "/work/kairos",
    large: false,
  },
  {
    n: "04",
    client: "Krishnaveni School",
    kind: "Private school · Melbourne",
    stat: "0→enrol",
    sstat: "digital enrolment · 8 weeks",
    desc: "Website redesign and end-to-end digital enrolment system for a growing Melbourne private school. Parents submit applications, upload documents, and track intake status online—cutting admin overhead and centralising the entire pipeline.",
    href: "/work/krishnaveni-school",
    large: true,
  },
];

const DISPLAY_FONT = "var(--font-display), Manrope, ui-sans-serif, system-ui, sans-serif";


function WorkSection() {
  return (
    <div style={{ background: "var(--surface)", padding: "80px 48px" }}>
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
          <h2 className="cp-display" style={{ fontSize: "var(--fs-h2)", margin: 0 }}>
            Four builds.
            <br />
            <span style={{ color: "var(--text-muted)" }}>
              What changed in the first quarter.
            </span>
          </h2>
        </div>
        <Link
          href="/work"
          className="cp-all-cases-link"
          style={{ display: "flex", alignItems: "center", gap: 8, color: "var(--accent)", fontFamily: DISPLAY_FONT, fontWeight: 500 }}
        >
          All case studies <span className="cp-link-arrow">→</span>
        </Link>
      </div>

      <div className="cp-work-bento">
        {cases.map((c) => (
          <Link
            key={c.n}
            href={c.href}
            className={`cp-card ${c.large ? "cp-bento-large" : "cp-bento-small"}`}
            style={{ padding: 28, display: "flex", flexDirection: "column", position: "relative", overflow: "hidden" }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: c.large ? 28 : 0 }}>
              <span className="cp-mono">case {c.n}</span>
              <span className="cp-mono">2025–26</span>
            </div>

            {c.large ? (
              <>
                {'cover' in c && c.cover && (
                  <img
                    src={c.cover as string}
                    alt={c.client}
                    style={{ display: "block", width: "calc(100% + 56px)", marginLeft: -28, marginTop: -28, height: 180, objectFit: "cover", marginBottom: 28 }}
                  />
                )}
              <div className="cp-bento-inner">
                <div className="cp-bento-stat-col">
                  <div className="cp-num" style={{ fontSize: 64, color: "var(--accent)", lineHeight: 0.9, letterSpacing: "-0.05em" }}>
                    {c.stat}
                  </div>
                  <div className="cp-mono" style={{ color: "var(--text-muted)", marginTop: 14 }}>
                    {c.sstat}
                  </div>
                </div>
                <div className="cp-bento-info-col">
                  <div style={{ fontFamily: DISPLAY_FONT, fontWeight: 700, fontSize: 22, letterSpacing: "-0.02em" }}>
                    {c.client}
                  </div>
                  <div className="cp-mono" style={{ color: "var(--text-muted)", marginTop: 4 }}>
                    {c.kind}
                  </div>
                  <p style={{ margin: "16px 0 0", color: "var(--text-muted)", fontSize: 14, lineHeight: 1.55, flex: 1 }}>
                    {c.desc}
                  </p>
                  <div style={{ paddingTop: 20, marginTop: "auto", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ color: "var(--accent)", fontFamily: DISPLAY_FONT, fontWeight: 500, fontSize: 14, display: "inline-flex", alignItems: "center", gap: 4 }}>
                      Read the full story <span className="cp-card-arrow">→</span>
                    </span>
                    <span className="cp-mono" style={{ color: "var(--text-dim)" }}>4 min</span>
                  </div>
                </div>
              </div>
              </>
            ) : (
              <>
                {'heroPlaceholder' in c && c.heroPlaceholder && (
                  <Placeholder
                    label={c.heroPlaceholder as string}
                    h={160}
                    style={{ width: "calc(100% + 56px)", marginLeft: -28, marginTop: -28, marginBottom: 0 }}
                  />
                )}
                <div className="cp-num" style={{ fontSize: 96, color: "var(--accent)", lineHeight: 0.9, margin: "36px 0 8px", letterSpacing: "-0.05em" }}>
                  {c.stat}
                </div>
                <div className="cp-mono" style={{ color: "var(--text-muted)" }}>{c.sstat}</div>
                <div style={{ marginTop: 28, paddingTop: 20, borderTop: "1px solid var(--border)" }}>
                  <div style={{ fontFamily: DISPLAY_FONT, fontWeight: 700, fontSize: 22, letterSpacing: "-0.02em" }}>
                    {c.client}
                  </div>
                  <div className="cp-mono" style={{ color: "var(--text-muted)", marginTop: 4 }}>{c.kind}</div>
                </div>
                <p style={{ marginTop: 16, color: "var(--text-muted)", fontSize: 14, lineHeight: 1.55 }}>{c.desc}</p>
                <div style={{ marginTop: "auto", paddingTop: 20, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ color: "var(--accent)", fontFamily: DISPLAY_FONT, fontWeight: 500, fontSize: 14, display: "inline-flex", alignItems: "center", gap: 4 }}>
                    Read the full story <span className="cp-card-arrow">→</span>
                  </span>
                  <span className="cp-mono" style={{ color: "var(--text-dim)" }}>4 min</span>
                </div>
              </>
            )}
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
          Most agency sites bury the price. We don&apos;t—you shouldn&apos;t
          have to book a call to find out whether we&apos;re in the same
          ballpark.
        </p>
      </div>
      <div
        className="cp-pricing-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
        }}
      >
        {PRICING_STRIP.map(([h, p, s, d]) => (
          <div
            key={h}
            className="cp-pricing-card"
            style={{ padding: "40px 32px" }}
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
        <Image
          src="/sam.jpeg"
          alt="Sam Limbu"
          width={320}
          height={320}
          style={{ borderRadius: 4, objectFit: "cover", display: "block" }}
        />
        <div
          style={{
            marginTop: 24,
            display: "flex",
            flexDirection: "column",
            gap: 8,
          }}
        >
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
            I don&apos;t hand you off to account managers.
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

function KitsSection() {
  return (
    <div
      style={{
        background: "var(--bg)",
        borderTop: "1px solid var(--border)",
      }}
    >
      {/* Header */}
      <div
        className="cp-kits-header"
        style={{
          padding: "56px 48px 48px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          gap: 32,
        }}
      >
        <div>
          <div className="cp-eyebrow" style={{ marginBottom: 16 }}>
            Kits · Productised · Self-serve
          </div>
          <h2
            className="cp-display"
            style={{ fontSize: "var(--fs-h2)", margin: 0 }}
          >
            Small tools.
            <br />
            <span style={{ color: "var(--accent)" }}>
              Buy once, ship today.
            </span>
          </h2>
        </div>
        <div className="cp-kits-mrr" style={{ textAlign: "right", flexShrink: 0 }}>
          <div className="cp-mono" style={{ marginBottom: 6 }}>
            Status
          </div>
          <div
            className="cp-num"
            style={{
              fontSize: 48,
              color: "var(--accent)",
              letterSpacing: "-0.04em",
              lineHeight: 1,
            }}
          >
            Live
          </div>
          <div className="cp-mono" style={{ marginTop: 6 }}>
            1 kit shipped · more in progress
          </div>
        </div>
      </div>

      {/* Cards */}
      <div
        className="cp-kits-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          borderTop: "1px solid var(--border)",
          borderBottom: "1px solid var(--border)",
        }}
      >
        {featuredKits.map((kit) => (
          <div
            key={kit.n}
            className="cp-kit-card"
            style={{
              padding: "32px 28px",
              borderRight: "1px solid var(--border)",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 24,
              }}
            >
              <span className="cp-mono" style={{ color: "var(--accent)" }}>
                {kit.n}
              </span>
              <span
                className="cp-chip"
                style={{
                  color: "var(--accent)",
                  borderColor: "var(--accent)",
                  background: "rgba(77,163,255,0.08)",
                }}
              >
                <span className="dot" />
                Live
              </span>
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "baseline",
                gap: 8,
                marginBottom: 8,
              }}
            >
              <span
                style={{
                  fontFamily: DISPLAY_FONT,
                  fontWeight: 700,
                  fontSize: 22,
                  letterSpacing: "-0.025em",
                }}
              >
                {kit.name}
              </span>
              <span className="cp-mono">{kit.tag}</span>
            </div>

            <div className="cp-mono" style={{ marginBottom: 16 }}>
              {kit.tech}
            </div>

            <p
              style={{
                margin: 0,
                color: "var(--text-muted)",
                fontSize: 14,
                lineHeight: 1.6,
                flex: 1,
              }}
            >
              {kit.desc}
            </p>

            <div
              style={{
                marginTop: 28,
                paddingTop: 20,
                borderTop: "1px dashed var(--border-2)",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-end",
              }}
            >
              <div>
                <div
                  className="cp-num"
                  style={{
                    fontSize: 28,
                    color: "var(--accent)",
                    letterSpacing: "-0.03em",
                  }}
                >
                  {kit.price}
                </div>
                <div
                  className="cp-mono"
                  style={{ color: "var(--text-dim)", marginTop: 4 }}
                >
                  {kit.mrrLabel}
                </div>
              </div>
              <Link
                href={`/apps#${kit.slug}`}
                className="cp-btn cp-btn-ghost cp-kit-buy"
                style={{ padding: "8px 14px", fontSize: 13, minHeight: 0 }}
              >
                Buy →
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Footer strip */}
      <div
        className="cp-kits-bottom"
        style={{
          padding: "28px 48px",
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          gap: 24,
          borderTop: "1px solid var(--border)",
        }}
      >
        <span className="cp-mono" style={{ color: "var(--text-dim)" }}>
          Free local-schema tool · No signup
        </span>
        <Link href="/apps" className="cp-btn cp-btn-primary cp-kits-cta">
          See all kits →
        </Link>
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
      {/* <TrustSection /> */}
      <AboutTeaser />
      <KitsSection />
      <FinalCTA />
      <Footer />
    </>
  );
}
