import Link from "next/link";
import Nav from "@/components/nav";
import Footer from "@/components/footer";
import FinalCTA from "@/components/final-cta";
import SamAvatar from "@/components/sam-avatar";

const rules = [
  ["01", "Fixed price, firm scope", "Quotes are firm. If scope changes, I'll say so before I bill, not after."],
  ["02", "One AU business day replies", "Non-negotiable. If I'm on leave, you'll know before you book."],
  ["03", "You own everything", "Code, hosting, ad accounts, analytics—yours from day one."],
  ["04", "Weekly ship rhythm", "One priority a week. Loom + numbers, no status-report theatre."],
  ["05", "Outcome over optics", "If it's not changing a number that matters, I won't build it."],
  ["06", "Fire me if I'm not working", "Month-to-month where it applies. 30 days' notice. No guilt, no lock-in."],
];

const goodFit = [
  "Melbourne SMBs and trades that want a site that books work",
  "Founders with a new service and a realistic 2-month window",
  "Ops teams tired of copying data between five tools",
  "Legal, health, trades, real estate, hospitality, B2B services",
  "Clients who've used an agency before and want a different shape",
];

const notFit = [
  "Crypto, gambling, dropshipping, MLMs — I'll refer you, politely",
  "Enterprise RFPs with six-month procurement cycles",
  "WordPress rebuilds that insist on staying on WordPress",
  "'Agency of record' relationships — I'm the work, not the brand",
  "Anything requiring 24/7 on-call. I sleep.",
];

const elsewhere = [
  ["Portfolio", "samridhlimbu.com", "My personal site — code, experiments, credentialing"],
  ["Writing", "/writing", "Essays and working notes from the studio"],
  ["Email", "hello@clupai.com", "Replies within 1 AU business day"],
  ["Call", "cal.com/clupai", "20-minute scope call — no slideshow"],
];

export default function AboutPage() {
  return (
    <>
      <Nav page="about" />

      {/* Hero */}
      <div
        style={{
          padding: "64px 48px 80px",
          borderBottom: "1px solid var(--border)",
          display: "grid",
          gridTemplateColumns: "420px 1fr",
          gap: 56,
        }}
      >
        <div>
          <SamAvatar size={380} />
        </div>
        <div>
          <div className="cp-eyebrow" style={{ marginBottom: 12 }}>
            About · Clupai is me
          </div>
          <h1
            className="cp-display"
            style={{
              fontSize: "clamp(3rem, 5.4vw, 5rem)",
              margin: 0,
              lineHeight: 1.02,
            }}
          >
            Hi, I&apos;m Sam.
            <br />I build websites and
            <br />
            the things that{" "}
            <span style={{ color: "var(--accent)" }}>feed them.</span>
          </h1>
          <p
            style={{
              marginTop: 32,
              fontSize: 20,
              color: "var(--text-muted)",
              maxWidth: 640,
              lineHeight: 1.5,
            }}
          >
            Full-stack developer and founder, based in Brunswick, Melbourne.
            Running under my own ABN since 2024 while completing a BCS (IoT) at
            Deakin—graduating mid-2027.
          </p>
          <div
            style={{
              marginTop: 32,
              display: "flex",
              gap: 10,
              flexWrap: "wrap",
            }}
          >
            <span className="cp-chip">
              <span className="dot" />
              Accepting July 2026
            </span>
            <span className="cp-chip">ABN registered · Melbourne</span>
            <span className="cp-chip">Brunswick · VIC · AEST</span>
            <span className="cp-chip">Deakin BCS · Jun 2027</span>
          </div>
        </div>
      </div>

      {/* Manifesto */}
      <div
        style={{
          padding: "96px 48px",
          maxWidth: 1100,
          margin: "0 auto",
        }}
      >
        <p
          className="cp-display"
          style={{
            fontSize: "clamp(2rem, 3.6vw, 3.25rem)",
            margin: 0,
            fontWeight: 400,
            lineHeight: 1.25,
            letterSpacing: "-0.02em",
          }}
        >
          <span style={{ color: "var(--text-muted)" }}>
            Clupai is me—Sam.
          </span>{" "}
          I don&apos;t hand you off to account managers. I don&apos;t have a
          delivery team.{" "}
          <span style={{ color: "var(--accent)" }}>
            You get my hands on your build, every day it&apos;s in progress.
          </span>
        </p>
      </div>

      {/* Two columns */}
      <div
        style={{
          padding: "0 48px 80px",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 48,
          borderBottom: "1px solid var(--border)",
        }}
      >
        <div>
          <div className="cp-mono" style={{ marginBottom: 14 }}>
            Background
          </div>
          <p
            style={{
              fontSize: 17,
              color: "var(--text-muted)",
              lineHeight: 1.7,
              margin: 0,
            }}
          >
            Started freelancing in 2024 while studying BCS (IoT) at Deakin—
            graduating mid-2027. Turns out shipping real things for real clients
            teaches more than any lecture. Launched Clupai as a formal solo
            studio under my ABN the same year.
          </p>
          <p
            style={{
              fontSize: 17,
              color: "var(--text-muted)",
              lineHeight: 1.7,
              marginTop: 14,
            }}
          >
            I&apos;m also CTO at Hoddle Melbourne, co-founder at TapCraft
            Studio, and building Kairos—a scheduling API—as a solo product.
            Stack: Next.js 15, TypeScript, Tailwind v4, FastAPI, Postgres, n8n.
            No WordPress. Ever.
          </p>
        </div>
        <div>
          <div className="cp-mono" style={{ marginBottom: 14 }}>
            What I believe about this work
          </div>
          <p
            style={{
              fontSize: 17,
              color: "var(--text-muted)",
              lineHeight: 1.7,
              margin: 0,
            }}
          >
            Most marketing sites are brochures that forgot to ask for the sale.
            Most agencies sell process when they should be selling outcomes. Most
            retainers fund someone else&apos;s overhead, not your growth.
          </p>
          <p
            style={{
              fontSize: 17,
              color: "var(--text-muted)",
              lineHeight: 1.7,
              marginTop: 14,
            }}
          >
            I think a one-person studio can do better on the projects that
            actually suit it—$3.9k to $40k, operators in Melbourne, work that
            fits in a small number of sprints. Past that, I&apos;ll refer you.
          </p>
        </div>
      </div>

      {/* How I work */}
      <div
        style={{
          padding: "80px 48px",
          background: "var(--surface)",
          borderBottom: "1px solid var(--border)",
        }}
      >
        <div className="cp-mono" style={{ marginBottom: 12 }}>
          § How I work
        </div>
        <h2
          className="cp-display"
          style={{
            fontSize: "var(--fs-h2)",
            margin: "0 0 48px",
            maxWidth: 860,
          }}
        >
          Six rules. They&apos;re on every contract.
          <br />
          <span style={{ color: "var(--text-muted)" }}>
            Not because they&apos;re clever. Because they work.
          </span>
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 24,
          }}
        >
          {rules.map(([n, h, b]) => (
            <div key={n} className="cp-card" style={{ padding: "28px 28px 24px" }}>
              <div
                className="cp-num"
                style={{
                  fontSize: 36,
                  color: "var(--accent)",
                  letterSpacing: "-0.04em",
                  lineHeight: 1,
                }}
              >
                {n}
              </div>
              <div
                style={{
                  fontFamily:
                    "var(--font-display), Manrope, ui-sans-serif, system-ui, sans-serif",
                  fontWeight: 700,
                  fontSize: 20,
                  letterSpacing: "-0.02em",
                  marginTop: 16,
                }}
              >
                {h}
              </div>
              <p
                style={{
                  marginTop: 10,
                  color: "var(--text-muted)",
                  fontSize: 14,
                  lineHeight: 1.6,
                }}
              >
                {b}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Fit */}
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
          }}
        >
          <div>
            <div
              className="cp-mono"
              style={{ marginBottom: 12, color: "var(--accent)" }}
            >
              I&apos;m a good fit for
            </div>
            <ul
              style={{
                listStyle: "none",
                padding: 0,
                margin: 0,
                display: "flex",
                flexDirection: "column",
                gap: 14,
              }}
            >
              {goodFit.map((t) => (
                <li
                  key={t}
                  style={{
                    display: "flex",
                    gap: 14,
                    paddingBottom: 14,
                    borderBottom: "1px solid var(--border)",
                  }}
                >
                  <span style={{ color: "var(--accent)" }}>✓</span>
                  <span style={{ fontSize: 15, lineHeight: 1.5 }}>{t}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div
              className="cp-mono"
              style={{ marginBottom: 12, color: "var(--text-muted)" }}
            >
              I&apos;m not a fit for
            </div>
            <ul
              style={{
                listStyle: "none",
                padding: 0,
                margin: 0,
                display: "flex",
                flexDirection: "column",
                gap: 14,
              }}
            >
              {notFit.map((t) => (
                <li
                  key={t}
                  style={{
                    display: "flex",
                    gap: 14,
                    paddingBottom: 14,
                    borderBottom: "1px solid var(--border)",
                  }}
                >
                  <span style={{ color: "var(--text-dim)" }}>—</span>
                  <span
                    style={{
                      fontSize: 15,
                      lineHeight: 1.5,
                      color: "var(--text-muted)",
                    }}
                  >
                    {t}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Elsewhere */}
      <div
        style={{
          padding: "56px 48px",
          borderBottom: "1px solid var(--border)",
        }}
      >
        <div className="cp-mono" style={{ marginBottom: 20 }}>
          Elsewhere
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 24,
          }}
        >
          {elsewhere.map(([h, v, d]) => (
            <div key={h}>
              <div className="cp-mono" style={{ marginBottom: 8 }}>
                {h}
              </div>
              <div
                style={{
                  fontFamily:
                    "var(--font-display), Manrope, ui-sans-serif, system-ui, sans-serif",
                  fontWeight: 600,
                  fontSize: 18,
                  color: "var(--accent)",
                  letterSpacing: "-0.01em",
                }}
              >
                {v}
              </div>
              <div
                style={{
                  color: "var(--text-muted)",
                  fontSize: 13,
                  marginTop: 4,
                }}
              >
                {d}
              </div>
            </div>
          ))}
        </div>
      </div>

      <FinalCTA />
      <Footer />
    </>
  );
}
