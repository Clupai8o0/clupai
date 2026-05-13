import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/nav";
import Footer from "@/components/footer";
import FinalCTA from "@/components/final-cta";

export const metadata: Metadata = {
  title: "Professional Services Websites Melbourne · clupai",
  description:
    "Credibility-first website design for Melbourne law firms, accountants, consultants, and professional services. We build sites that establish trust before the first meeting — and rank for local search.",
  alternates: { canonical: "/industries/professional-services" },
};

const problems = [
  [
    "Generic templates that look like every other firm",
    "When every law firm in Melbourne has the same $49/month Squarespace template, the one that looks different wins the meeting. Generic design signals generic work.",
  ],
  [
    "No clear service pages",
    "Prospects arrive and can't tell which practice areas you cover, which types of clients you take, or whether you're the right fit. Vague copy loses qualified leads before they enquire.",
  ],
  [
    "No call-booking integration",
    "Your website should do the appointment-scheduling that a receptionist used to do. If a prospect has to call to book a consultation, half of them won't bother.",
  ],
  [
    "Outdated design that undermines credibility",
    "In professional services, the site is often the first impression. An outdated, slow, or broken website signals that the firm isn't paying attention. It's costing you clients before you've spoken.",
  ],
  [
    "Not showing up for local searches",
    "'Melbourne commercial lawyer', 'Carlton accountant', 'Brunswick financial advisor' — if you're not ranking for these terms, someone else is taking that work.",
  ],
];

const included = [
  "Design that signals credibility and practice quality",
  "Service pages optimised for local search",
  "Cal.com or Calendly booking integration",
  "Attorney, accountant, or consultant bio pages",
  "Testimonials and case matter sections",
  "LocalBusiness + ProfessionalService schema",
  "HTTPS, performance, and accessibility",
  "Google Business Profile setup",
  "Staff-editable CMS for news and updates",
  "Analytics and conversion tracking",
];

const faqs = [
  {
    q: "We have a strict brand — can you work within it?",
    a: "Yes. If you have existing brand guidelines — colour, typography, logo usage rules — we work inside them. We're not redesigning your identity; we're building a site that reflects it properly. If your brand guidelines are loose or dated, we can tighten them up as part of the engagement.",
  },
  {
    q: "Do you understand professional services compliance?",
    a: "We understand the common constraints: no guarantees of outcomes in marketing copy, restrictions on testimonials in some jurisdictions, disclosure requirements. We flag these when we see them and write copy accordingly. We're not your compliance officer, but we're not going to hand you something that creates a problem.",
  },
  {
    q: "Can we add attorney or consultant bios ourselves?",
    a: "Yes. Bio pages are part of the CMS — your staff can add, update, or remove profiles without touching code. We set up the structure and you manage the content. Same goes for news updates and any regularly changing content.",
  },
  {
    q: "What about privacy and client confidentiality on the site?",
    a: "Nothing on the site requires you to publish client information. Case studies and testimonials can be fully anonymised — 'a Melbourne-based financial services firm' rather than a named client. We never push you to publish anything that creates a confidentiality risk.",
  },
  {
    q: "How do you handle testimonials if we can't share client names?",
    a: "Anonymised testimonials are standard in professional services. 'A Melbourne family law client' is still credible — it's the sentiment that matters, not the name. We can also structure social proof around outcomes, process, and practice reputation rather than individual client statements.",
  },
];

export default function ProfessionalServicesPage() {
  return (
    <>
      <Nav />

      {/* Breadcrumb */}
      <div style={{ padding: "48px 48px 0" }}>
        <div className="cp-mono" style={{ color: "var(--text-muted)" }}>
          <Link href="/services">Services</Link>{" "}
          <span style={{ color: "var(--text-dim)" }}>/</span>{" "}
          <span style={{ color: "var(--text)" }}>Professional Services</span>
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
              Industries · Professional Services · Melbourne
            </div>
            <h1
              className="cp-display"
              style={{ fontSize: "clamp(3rem, 6vw, 5.5rem)", margin: 0 }}
            >
              Professional services websites Melbourne.
              <br />
              <span style={{ color: "var(--accent)" }}>
                Credibility first.
              </span>
            </h1>
            <p
              style={{
                marginTop: 28,
                fontSize: 20,
                color: "var(--text-muted)",
                maxWidth: 680,
                lineHeight: 1.5,
              }}
            >
              Law firms, accountants, consultants, and financial advisers in
              Melbourne need a website that establishes trust before the first
              meeting. We build credibility-first sites that rank locally and
              book consultations on autopilot.
            </p>
            <div style={{ marginTop: 32, display: "flex", gap: 12 }}>
              <Link href="/contact" className="cp-btn cp-btn-primary cp-btn-lg">
                Book a 20‑minute scope call →
              </Link>
              <Link href="/work" className="cp-btn cp-btn-ghost cp-btn-lg">
                See our work
              </Link>
            </div>
          </div>
          <div className="cp-card" style={{ padding: 28 }}>
            <div className="cp-mono" style={{ marginBottom: 16 }}>
              What we focus on
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {[
                ["Design", "Credibility-first — no stock handshake photos"],
                ["SEO", "Local search for '[city] + [profession]'"],
                ["Booking", "Cal.com or Calendly, wired in"],
                ["Schema", "LocalBusiness + ProfessionalService"],
                ["Timeline", "4–6 weeks"],
              ].map(([k, v]) => (
                <div
                  key={k}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: 13,
                    color: "var(--text-muted)",
                    paddingBottom: 14,
                    borderBottom: "1px solid var(--border)",
                  }}
                >
                  <span className="cp-mono">{k}</span>
                  <span style={{ textAlign: "right", maxWidth: 200 }}>{v}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Who this is for */}
      <div
        style={{
          padding: "72px 48px",
          borderBottom: "1px solid var(--border)",
          background: "var(--surface)",
        }}
      >
        <div className="cp-mono" style={{ marginBottom: 20 }}>
          § 01 · Who this is for
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 20,
          }}
        >
          {[
            {
              label: "Law firms",
              d: "Family, commercial, employment, property — Melbourne practices that need to rank and convert.",
            },
            {
              label: "Accountants",
              d: "SMB accounting, tax advisory, and financial planning firms that rely on local referral and search.",
            },
            {
              label: "Consultants",
              d: "Management, strategy, HR, and specialist consultants who need a site that backs up their pitch.",
            },
            {
              label: "Financial advisers",
              d: "Planning and wealth management practices where trust signals are the entire sale.",
            },
          ].map((s) => (
            <div key={s.label} className="cp-card" style={{ padding: 24 }}>
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
                {s.label}
              </div>
              <p
                style={{
                  color: "var(--text-muted)",
                  fontSize: 14,
                  lineHeight: 1.6,
                  margin: 0,
                }}
              >
                {s.d}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Problems we solve */}
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
              § 02 · Problems we solve
            </div>
            <h2
              className="cp-display"
              style={{ fontSize: "var(--fs-h2)", margin: 0 }}
            >
              Five things your site is getting wrong.
            </h2>
          </div>
          <ul
            style={{
              margin: 0,
              padding: 0,
              listStyle: "none",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {problems.map(([h, b], i) => (
              <li
                key={i}
                style={{
                  display: "grid",
                  gridTemplateColumns: "32px 1fr",
                  gap: 24,
                  paddingTop: 24,
                  paddingBottom: 24,
                  borderTop: "1px solid var(--border)",
                  alignItems: "start",
                }}
              >
                <span
                  className="cp-num"
                  style={{
                    fontSize: 20,
                    color: "var(--accent)",
                    letterSpacing: "-0.03em",
                  }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <div
                    style={{
                      fontFamily:
                        "var(--font-display), Manrope, ui-sans-serif, system-ui, sans-serif",
                      fontWeight: 600,
                      fontSize: 18,
                      letterSpacing: "-0.01em",
                      marginBottom: 8,
                    }}
                  >
                    {h}
                  </div>
                  <div
                    style={{
                      color: "var(--text-muted)",
                      fontSize: 15,
                      lineHeight: 1.6,
                    }}
                  >
                    {b}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* What's included */}
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
            gridTemplateColumns: "320px 1fr",
            gap: 56,
          }}
        >
          <div>
            <div className="cp-mono" style={{ marginBottom: 12 }}>
              § 03 · What&apos;s included
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
                  style={{ color: "var(--text-dim)", minWidth: 26, flexShrink: 0 }}
                >
                  ({String(i + 1).padStart(2, "0")})
                </span>
                <span
                  style={{
                    color: "var(--text)",
                    fontSize: 15,
                    lineHeight: 1.55,
                  }}
                >
                  {it}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Services links */}
      <div
        style={{
          padding: "72px 48px",
          borderBottom: "1px solid var(--border)",
        }}
      >
        <div className="cp-mono" style={{ marginBottom: 20 }}>
          § 04 · How we deliver it
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 24,
          }}
        >
          {[
            {
              href: "/services/web",
              n: "01",
              h: "Website",
              d:
                "Next.js build with credibility-first design, service pages, and booking integration. You own the repo.",
            },
            {
              href: "/services/seo",
              n: "02",
              h: "Local SEO",
              d:
                "Practice area pages optimised for Melbourne local search. Google Business Profile and professional schema.",
            },
            {
              href: "/services/automation",
              n: "03",
              h: "Booking automation",
              d:
                "Cal.com or Calendly wired in. Consultation requests routed automatically. No receptionist required.",
            },
          ].map((s) => (
            <Link
              key={s.n}
              href={s.href}
              className="cp-card"
              style={{
                padding: 28,
                display: "block",
                textDecoration: "none",
              }}
            >
              <div
                className="cp-num"
                style={{
                  fontSize: 36,
                  color: "var(--accent)",
                  letterSpacing: "-0.04em",
                  lineHeight: 1,
                }}
              >
                {s.n}
              </div>
              <div
                style={{
                  fontFamily:
                    "var(--font-display), Manrope, ui-sans-serif, system-ui, sans-serif",
                  fontWeight: 700,
                  fontSize: 22,
                  letterSpacing: "-0.02em",
                  marginTop: 16,
                }}
              >
                {s.h}
              </div>
              <p
                style={{
                  color: "var(--text-muted)",
                  fontSize: 14,
                  lineHeight: 1.6,
                  margin: "10px 0 20px",
                }}
              >
                {s.d}
              </p>
              <span
                style={{
                  color: "var(--accent)",
                  fontFamily:
                    "var(--font-display), Manrope, ui-sans-serif, system-ui, sans-serif",
                  fontWeight: 500,
                  fontSize: 14,
                }}
              >
                Learn more →
              </span>
            </Link>
          ))}
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
              § 05 · FAQ
            </div>
            <h2
              className="cp-display"
              style={{ fontSize: "var(--fs-h2)", margin: 0 }}
            >
              Things professionals ask us.
              <br />
              <span style={{ color: "var(--text-muted)" }}>
                Answered plainly.
              </span>
            </h2>
          </div>
          <div>
            {faqs.map((faq, i) => (
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
                  <span>{faq.q}</span>
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
                  {faq.a}
                </p>
              </details>
            ))}
            <div style={{ borderTop: "1px solid var(--border)" }} />
          </div>
        </div>
      </div>

      <FinalCTA />
      <Footer />
    </>
  );
}
