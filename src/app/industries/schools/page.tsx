import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/nav";
import Footer from "@/components/footer";
import FinalCTA from "@/components/final-cta";

export const metadata: Metadata = {
  title: "School Website Design Melbourne · clupai",
  description:
    "Enrolment-focused website design for Melbourne private and independent schools. We build digital enrolment systems, events CMS, and accessible websites that drive applications — not just showcase events.",
  alternates: { canonical: "/industries/schools" },
};

const problems = [
  [
    "Ageing site built on a generic CMS",
    "WordPress or a school-specific platform that nobody on staff knows how to update. Pages go stale. Typos persist. Events never get removed after they've passed.",
  ],
  [
    "Enrolment form buried or broken",
    "Parents can't find the application process. When they do, it's a PDF they have to email. Every friction point in the enrolment flow costs you an application.",
  ],
  [
    "No way for parents to track applications",
    "Once a form is submitted, it disappears into an inbox. Parents follow up by phone. Admin spends hours fielding status calls instead of processing applications.",
  ],
  [
    "Events not properly promoted",
    "Open days, orientation events, and scholarship deadlines are the school's best conversion tools — and they're buried in a news section nobody reads.",
  ],
  [
    "Site doesn't reflect the school's culture",
    "Generic design and stock photography signal generic education. Families choosing a private school are making an identity decision. The site should feel like you.",
  ],
];

const included = [
  "Website design and build on Next.js",
  "Digital enrolment flow (application → document upload → status tracking)",
  "Events and news CMS (staff update without a developer)",
  "Parent communication integrations",
  "WCAG 2.2 AA accessibility compliance",
  "Mobile-optimised design throughout",
  "Educational institution schema markup",
  "Open day and event landing pages",
  "Staff and faculty directory",
  "Analytics and enquiry tracking",
];

const faqs = [
  {
    q: "Can parents track their application online?",
    a: "Yes. The enrolment system we built for Krishnaveni School lets parents submit applications, upload supporting documents, and check their intake status without calling the office. Admin staff get a dashboard view of all applications, not an inbox. If you need something similar, we scope it in the initial call.",
  },
  {
    q: "Can our staff update the site without a developer?",
    a: "Yes. We use a headless CMS (typically TinaCMS or Sanity) with a clean editing interface scoped to what your staff actually need to change — news, events, staff profiles, and key dates. They don't need to see or touch code.",
  },
  {
    q: "What about DECD or government compliance requirements?",
    a: "We build to WCAG 2.2 AA as standard, which satisfies most accessibility obligations for Victorian and South Australian independent schools. We're not education law specialists, but we'll flag anything in your requirements that looks like it needs a compliance review and work with your team accordingly.",
  },
  {
    q: "Do you integrate with TASS or Synergetic?",
    a: "We can integrate with school management systems that expose an API or allow data exports. TASS and Synergetic both have varying levels of API access depending on your licence tier. We scope the integration specifically — it's not a blanket yes or no, it depends on your setup.",
  },
  {
    q: "What's the timeline for a school site?",
    a: "The Krishnaveni School enrolment system took eight weeks end-to-end. A full school website rebuild without a custom application flow typically runs five to seven weeks. We'll give you a firm timeline in the scope before you sign anything.",
  },
];

export default function SchoolsPage() {
  return (
    <>
      <Nav />

      {/* Breadcrumb */}
      <div style={{ padding: "48px 48px 0" }}>
        <div className="cp-mono" style={{ color: "var(--text-muted)" }}>
          <Link href="/services">Services</Link>{" "}
          <span style={{ color: "var(--text-dim)" }}>/</span>{" "}
          <span style={{ color: "var(--text)" }}>Schools</span>
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
              Industries · Schools · Melbourne
            </div>
            <h1
              className="cp-display"
              style={{ fontSize: "clamp(3rem, 6vw, 5.5rem)", margin: 0 }}
            >
              Private school website design Melbourne.
              <br />
              <span style={{ color: "var(--accent)" }}>
                Built to drive enrolments.
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
              Melbourne independent and private schools need a website that
              drives enrolment applications — not just one that lists term dates
              and looks fine on a desktop. We design and build the full digital
              enrolment experience.
            </p>
            <div style={{ marginTop: 32, display: "flex", gap: 12 }}>
              <Link href="/contact" className="cp-btn cp-btn-primary cp-btn-lg">
                Book a 20‑minute scope call →
              </Link>
              <Link
                href="/work/krishnaveni-school"
                className="cp-btn cp-btn-ghost cp-btn-lg"
              >
                See a school build
              </Link>
            </div>
          </div>
          <div className="cp-card" style={{ padding: 28 }}>
            <div className="cp-mono" style={{ marginBottom: 16 }}>
              Krishnaveni School
            </div>
            <div
              className="cp-num"
              style={{
                fontSize: 64,
                color: "var(--accent)",
                letterSpacing: "-0.05em",
                lineHeight: 0.9,
              }}
            >
              8 wks
            </div>
            <div
              className="cp-mono"
              style={{ marginTop: 6, color: "var(--text-muted)" }}
            >
              End-to-end enrolment system, delivered
            </div>
            <div
              style={{
                marginTop: 20,
                paddingTop: 16,
                borderTop: "1px solid var(--border)",
                display: "flex",
                flexDirection: "column",
                gap: 10,
              }}
            >
              {[
                ["System", "Application + doc upload + status"],
                ["CMS", "Staff-editable, no developer needed"],
                ["Access", "WCAG 2.2 AA"],
              ].map(([k, v]) => (
                <div
                  key={k}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: 13,
                    color: "var(--text-muted)",
                  }}
                >
                  <span className="cp-mono">{k}</span>
                  <span style={{ textAlign: "right", maxWidth: 180 }}>{v}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Case study */}
      <div
        style={{
          padding: "80px 48px",
          borderBottom: "1px solid var(--border)",
          background: "var(--surface)",
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
              § 01 · Case study · Krishnaveni School
            </div>
            <h2
              className="cp-display"
              style={{
                fontSize: "clamp(2rem, 3.6vw, 3.25rem)",
                margin: 0,
                lineHeight: 1.1,
              }}
            >
              An enrolment system that works.
              <br />
              <span style={{ color: "var(--accent)" }}>
                Not just a form.
              </span>
            </h2>
            <p
              style={{
                marginTop: 24,
                fontSize: 17,
                color: "var(--text-muted)",
                lineHeight: 1.7,
              }}
            >
              We designed and built an end-to-end digital enrolment system for
              Krishnaveni School, a private school in Melbourne. Parents submit
              applications, upload documents, and track their intake status
              online — cutting admin overhead and centralising the entire
              enrolment pipeline.
            </p>
            <p
              style={{
                marginTop: 14,
                fontSize: 17,
                color: "var(--text-muted)",
                lineHeight: 1.7,
              }}
            >
              Delivered in eight weeks. Staff manage news, events, and term
              dates through a clean CMS with no code required.
            </p>
            <Link
              href="/work/krishnaveni-school"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                marginTop: 24,
                color: "var(--accent)",
                fontFamily:
                  "var(--font-display), Manrope, ui-sans-serif, system-ui, sans-serif",
                fontWeight: 500,
                fontSize: 15,
              }}
            >
              Read the full case study →
            </Link>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {[
              [
                "Application pipeline",
                "Online form, document upload, status tracking — all in one system.",
              ],
              [
                "Zero admin calls",
                "Parents check status online. Staff aren't answering the same question repeatedly.",
              ],
              [
                "Staff-editable CMS",
                "News, events, and key dates are managed by the school team, not a developer.",
              ],
            ].map(([h, b]) => (
              <div key={h} className="cp-card" style={{ padding: 24 }}>
                <div
                  style={{
                    fontFamily:
                      "var(--font-display), Manrope, ui-sans-serif, system-ui, sans-serif",
                    fontWeight: 700,
                    fontSize: 18,
                    letterSpacing: "-0.01em",
                  }}
                >
                  {h}
                </div>
                <p
                  style={{
                    marginTop: 8,
                    color: "var(--text-muted)",
                    fontSize: 14,
                    lineHeight: 1.6,
                    margin: "8px 0 0",
                  }}
                >
                  {b}
                </p>
              </div>
            ))}
          </div>
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
              Five things losing you enrolments.
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
              Things schools ask us.
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
