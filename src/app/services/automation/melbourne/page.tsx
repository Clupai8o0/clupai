import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/nav";
import Footer from "@/components/footer";
import FinalCTA from "@/components/final-cta";
import Row from "@/components/row";

export const metadata: Metadata = {
  title: "Automation Consultant Melbourne · clupai — web, SEO & automation studio",
  description:
    "Zapier, n8n and Make consultants in Melbourne. We wire up the tools you already own and build the internal tools that remove manual drudgery. From $5,000, fixed scope.",
  alternates: {
    canonical: "https://clupai.com/services/automation/melbourne",
  },
  openGraph: {
    title: "Automation Consultant Melbourne · clupai",
    description:
      "Zapier, n8n & Make for Melbourne SMBs. Fixed scope, honest docs, and no silent failures. From $5,000.",
    url: "https://clupai.com/services/automation/melbourne",
  },
};

const included = [
  "Process audit — map what you actually do, not the org chart",
  "Zapier, Make, or n8n — whichever fits the budget and ops team",
  "Internal dashboards — Retool, Appsmith, or custom Next.js",
  "Integrations — HubSpot, Airtable, Notion, Stripe, Xero, Attio",
  "Webhook glue — the bit consultants skip",
  "Error handling + alerting — because silent failures are worse",
  "Handover docs — a Loom per workflow, in plain English",
  "30 days of fixes post-launch",
];

const differentiators = [
  {
    label: "Fixed scope, not hourly",
    body: "Automation projects have a habit of creeping into a permanent hourly engagement. We scope it, price it, build it, and hand it over. You know the number before we start.",
  },
  {
    label: "Tools we actually use",
    body: "Zapier, n8n, Make — not because they're trending, but because they're what we use in production. We'll tell you which one suits your team's technical confidence and budget, not which one has the better affiliate program.",
  },
  {
    label: "We document everything",
    body: "Every workflow gets a Loom walk-through, a written diagram, and an error-handling plan. When something breaks six months from now (it will), you're not starting from scratch.",
  },
  {
    label: "No silent failures",
    body: "Most automation builds ignore alerting. We wire error notifications into every workflow from the start — Slack, email, or PagerDuty — so you know when something stops before your customers do.",
  },
];

const faqs = [
  {
    q: "Zapier vs n8n for a Melbourne SMB — which should I use?",
    a: "Zapier if you want something your team can maintain without a developer. It's the most intuitive, the most expensive at scale, and the most likely to have the native integration you need. n8n if you're comfortable with a bit of complexity or want self-hosted — the unit economics are much better for high-volume workflows. Make (formerly Integromat) sits in between: more visual and powerful than Zapier, cheaper per operation, slightly steeper learning curve. We'll recommend based on your team and your workflow volume, not on principle.",
  },
  {
    q: "Can you connect Xero?",
    a: "Yes. Xero is one of the most common integration requests from Australian businesses — we connect it to CRMs (HubSpot, Attio), project management tools (Notion, Airtable), and custom internal dashboards. We work within Xero's API limits and document every endpoint we touch.",
  },
  {
    q: "What about HubSpot integrations?",
    a: "Yes — HubSpot is in almost every quote we do. Common setups: lead forms routing to HubSpot and triggering Slack notifications, deal stage changes updating Airtable dashboards, Xero invoice creation on deal close, and onboarding sequences triggered by contact property changes. If you're on HubSpot Free, we'll tell you when a paid feature is the only clean path.",
  },
  {
    q: "Do you do ongoing retainers for automation?",
    a: "Yes — the Operator retainer covers ongoing automation work alongside site and SEO. If you just want automation maintenance, we offer a lighter monthly arrangement for monitoring, tweaks, and new workflows. Book a call and we'll scope what makes sense.",
  },
  {
    q: "How much does automation actually save?",
    a: "That depends entirely on what you're automating. A quoting workflow that takes 45 minutes per job and runs 30 times a week is worth more to fix than a monthly report that takes an hour. We'll map the time cost in the process audit and prioritise accordingly. If the automation can't pay for itself in under six months of time saved, we'll tell you that too.",
  },
  {
    q: "Can you build internal tools — not just connect existing ones?",
    a: "Yes. When the off-the-shelf option genuinely doesn't exist, we build lightweight internal tools in Next.js, Retool, or Appsmith. King Double Glazing's Instant Estimate calculator is an example — a multi-step quoting tool that generates a ballpark price inline before asking for contact details. It's not a Zapier workflow; it's a purpose-built tool that removed the manual quoting step for standard jobs.",
  },
];

export default function AutomationMelbournePage() {
  return (
    <>
      <Nav page="services" />

      {/* Breadcrumb */}
      <div style={{ padding: "48px 48px 0" }}>
        <div className="cp-mono" style={{ color: "var(--text-muted)" }}>
          <Link href="/services">Services</Link>{" "}
          <span style={{ color: "var(--text-dim)" }}>/</span>{" "}
          <Link href="/services/automation">Automation</Link>{" "}
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
              Automation consultant Melbourne · Zapier consultant Melbourne · n8n developer Melbourne
            </div>
            <h1
              className="cp-display"
              style={{ fontSize: "clamp(3rem, 6vw, 5.5rem)", margin: 0 }}
            >
              Your tools are talking.
              <br />
              <span style={{ color: "var(--accent)" }}>
                Just not to each other.
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
              Melbourne&apos;s SMBs are paying for five SaaS tools and
              manually copying data between all of them. We wire up what you
              already own — Zapier, n8n, Make — and build the small internal
              tools that remove the worst of the drudgery. Fixed scope, honest
              docs, and nothing that breaks silently.
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
              Starts at
            </div>
            <div
              className="cp-num"
              style={{
                fontSize: 60,
                color: "var(--accent)",
                letterSpacing: "-0.04em",
                lineHeight: 1,
              }}
            >
              $5,000
            </div>
            <div
              className="cp-mono"
              style={{ marginTop: 6, color: "var(--text-muted)" }}
            >
              from · scoped per project
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
              <Row k="Timeline" v="2–6 weeks" />
              <Row k="Deliverable" v="Running workflows + docs" />
              <Row k="Post-launch" v="30 days of fixes" />
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
          § 01 · Why clupai vs Melbourne automation consultants
        </div>
        <h2
          className="cp-display"
          style={{
            fontSize: "var(--fs-h2)",
            margin: "0 0 48px",
            maxWidth: 760,
          }}
        >
          Most consultants build it and leave.{" "}
          <span style={{ color: "var(--accent)" }}>We build it and document it.</span>
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
              Scope is fixed at the start. No time-and-materials surprises.{" "}
              <Link
                href="/services/automation"
                style={{ color: "var(--accent)", textDecoration: "underline" }}
              >
                See the full automation service spec →
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
              Built for Melbourne&apos;s{" "}
              <span style={{ color: "var(--accent)" }}>
                operator economy.
              </span>
            </h2>
            <p
              style={{
                color: "var(--text-muted)",
                fontSize: 16,
                lineHeight: 1.65,
                marginBottom: 24,
              }}
            >
              Melbourne has a dense layer of owner-operated businesses —
              trades, professional services, healthcare, food — that are
              running on Xero, HubSpot, and a spreadsheet named
              something_FINAL_v3. The tools are good. The connections aren&apos;t.
            </p>
            <p
              style={{
                color: "var(--text-muted)",
                fontSize: 16,
                lineHeight: 1.65,
                marginBottom: 24,
              }}
            >
              We built King Double Glazing&apos;s Instant Estimate calculator as
              part of their site rebuild — a multi-step quoting tool that shows
              a ballpark price before the contact form. Leads arrive with a
              budget number, spend less time on the phone qualifying, and close
              faster. That&apos;s not a Zapier workflow; it&apos;s a purpose-built
              tool that removed manual quoting from the sales process entirely.
            </p>
            <p
              style={{
                color: "var(--text-muted)",
                fontSize: 16,
                lineHeight: 1.65,
              }}
            >
              Common Melbourne automation requests: Xero → HubSpot deal
              sync, job-booking confirmation flows, review request sequences,
              estimate calculators, lead-routing by suburb or service type,
              and Slack alerts when something goes wrong in production.
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
                Recent Melbourne automation build
              </div>
              <div
                className="cp-num"
                style={{
                  fontSize: 72,
                  color: "var(--accent)",
                  letterSpacing: "-0.05em",
                  lineHeight: 0.9,
                }}
              >
                &lt; 2min
              </div>
              <div
                className="cp-mono"
                style={{ color: "var(--text-muted)", marginTop: -8 }}
              >
                from inputs to ballpark price · no sales call
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
                King Double Glazing — Instant Estimate calculator
              </div>
              <p
                style={{
                  color: "var(--text-muted)",
                  fontSize: 14,
                  lineHeight: 1.6,
                  margin: 0,
                }}
              >
                Visitors landed, saw no price, and left. We built a multi-step
                calculator — window type, number of panes, rough size — that
                generates a ballpark estimate inline before asking for contact
                details. Leads arrive with a number, have fewer objections,
                and close faster. No manual quoting for standard jobs.
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
              Melbourne automation
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
                  href="/services/automation"
                  style={{
                    color: "var(--accent)",
                    textDecoration: "underline",
                  }}
                >
                  See the full automation service FAQ
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
