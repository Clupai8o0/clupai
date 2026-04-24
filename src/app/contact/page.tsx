import Nav from "@/components/nav";
import Footer from "@/components/footer";
import SamAvatar from "@/components/sam-avatar";

function Field({
  label,
  value,
  accent,
}: {
  label: string;
  value: string;
  accent?: boolean;
}) {
  return (
    <div>
      <div className="cp-mono" style={{ marginBottom: 6 }}>
        {label}
      </div>
      <div
        style={{
          background: "var(--bg)",
          border: "1px solid " + (accent ? "var(--accent)" : "var(--border-2)"),
          padding: "10px 12px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          color: accent ? "var(--accent)" : "var(--text)",
          fontFamily:
            "var(--font-display), Manrope, ui-sans-serif, system-ui, sans-serif",
          fontWeight: 500,
          fontSize: 14,
        }}
      >
        <span>{value}</span>
        <svg
          width="10"
          height="10"
          viewBox="0 0 10 10"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
        >
          <path d="M2 4l3 3 3-3" />
        </svg>
      </div>
    </div>
  );
}

function Fact2({ k, v }: { k: string; v: string }) {
  return (
    <div>
      <div className="cp-mono" style={{ marginBottom: 4 }}>
        {k}
      </div>
      <div
        style={{
          fontFamily:
            "var(--font-display), Manrope, ui-sans-serif, system-ui, sans-serif",
          fontWeight: 500,
          fontSize: 16,
          letterSpacing: "-0.01em",
        }}
      >
        {v}
      </div>
    </div>
  );
}

const calDays = Array.from({ length: 31 }, (_, i) => i + 1);
const activeCalDays = [6, 7, 8, 13, 14, 15, 20, 21, 22];
const timeSlots = ["09:00", "09:30", "10:00", "11:00", "14:00", "15:30"];

export default function ContactPage() {
  return (
    <>
      <Nav page="contact" />

      <div
        style={{
          padding: "64px 48px",
          borderBottom: "1px solid var(--border)",
        }}
      >
        <div className="cp-eyebrow" style={{ marginBottom: 12 }}>
          Contact · book or write
        </div>
        <h1
          className="cp-display"
          style={{ fontSize: "clamp(3rem, 5.6vw, 5rem)", margin: 0 }}
        >
          Tell me what you&apos;re trying to sell.
          <br />
          <span style={{ color: "var(--accent)" }}>
            I&apos;ll tell you if I can help.
          </span>
        </h1>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1.3fr 1fr",
          borderBottom: "1px solid var(--border)",
        }}
      >
        {/* Cal.com mock */}
        <div
          style={{
            padding: "48px 48px",
            borderRight: "1px solid var(--border)",
          }}
        >
          <div className="cp-mono" style={{ marginBottom: 20 }}>
            § 01 · Book a 20‑minute scope call
          </div>
          <div className="cp-card" style={{ padding: 0, overflow: "hidden" }}>
            <div
              style={{
                padding: "20px 24px",
                borderBottom: "1px solid var(--border)",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div
                style={{ display: "flex", alignItems: "center", gap: 12 }}
              >
                <SamAvatar size={40} />
                <div>
                  <div
                    style={{
                      fontFamily:
                        "var(--font-display), Manrope, ui-sans-serif, system-ui, sans-serif",
                      fontWeight: 600,
                    }}
                  >
                    Sam Limbu · clupai
                  </div>
                  <div
                    className="cp-mono"
                    style={{ color: "var(--text-muted)" }}
                  >
                    20 min · Google Meet · AEST
                  </div>
                </div>
              </div>
              <div className="cp-mono" style={{ color: "var(--accent)" }}>
                cal.com/clupai/scope
              </div>
            </div>
            <div style={{ padding: "28px 24px" }}>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 24,
                }}
              >
                <div>
                  <div className="cp-mono" style={{ marginBottom: 14 }}>
                    May 2026
                  </div>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(7, 1fr)",
                      gap: 4,
                    }}
                  >
                    {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => (
                      <div
                        key={i}
                        className="cp-mono"
                        style={{
                          textAlign: "center",
                          color: "var(--text-dim)",
                          fontSize: 10,
                          padding: "4px 0",
                        }}
                      >
                        {d}
                      </div>
                    ))}
                    {calDays.map((n) => {
                      const active = activeCalDays.includes(n);
                      const selected = n === 14;
                      return (
                        <div
                          key={n}
                          style={{
                            padding: "10px 0",
                            textAlign: "center",
                            fontFamily:
                              "var(--font-display), Manrope, ui-sans-serif, system-ui, sans-serif",
                            fontWeight: 500,
                            fontSize: 13,
                            borderRadius: 4,
                            background: selected
                              ? "var(--accent)"
                              : "transparent",
                            color: selected
                              ? "var(--accent-ink)"
                              : active
                                ? "var(--text)"
                                : "var(--text-dim)",
                            cursor: active ? "pointer" : "default",
                          }}
                        >
                          {n}
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div>
                  <div className="cp-mono" style={{ marginBottom: 14 }}>
                    Thu · 14 May · AEST
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 6,
                    }}
                  >
                    {timeSlots.map((t, i) => (
                      <div
                        key={t}
                        style={{
                          padding: "10px 14px",
                          border:
                            "1px solid " +
                            (i === 2 ? "var(--accent)" : "var(--border)"),
                          background:
                            i === 2 ? "rgba(77,163,255,0.08)" : "transparent",
                          borderRadius: 4,
                          color: i === 2 ? "var(--accent)" : "var(--text)",
                          fontFamily:
                            "var(--font-display), Manrope, ui-sans-serif, system-ui, sans-serif",
                          fontWeight: 500,
                          fontSize: 14,
                          cursor: "pointer",
                        }}
                      >
                        {t}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div
                style={{
                  marginTop: 32,
                  paddingTop: 24,
                  borderTop: "1px solid var(--border)",
                }}
              >
                <div className="cp-mono" style={{ marginBottom: 14 }}>
                  A few quick things
                </div>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: 14,
                  }}
                >
                  <Field label="Project type" value="Website rebuild" />
                  <Field label="Budget range" value="$10k – $25k" accent />
                  <Field label="Timeline" value="Next 2 months" />
                  <Field
                    label="Current site URL"
                    value="kingdoubleglazing.com.au"
                  />
                </div>
                <button
                  className="cp-btn cp-btn-primary cp-btn-lg"
                  style={{
                    marginTop: 20,
                    width: "100%",
                    justifyContent: "center",
                  }}
                >
                  Confirm Thu 14 May · 10:00 AEST →
                </button>
              </div>
            </div>
          </div>
          <div
            className="cp-mono"
            style={{ marginTop: 20, color: "var(--text-muted)" }}
          >
            Cal.com (open‑source) · no CRM spam · you&apos;ll get one calendar
            invite and nothing else.
          </div>
        </div>

        {/* Short form */}
        <div
          style={{
            padding: "48px 48px",
            background: "var(--surface)",
          }}
        >
          <div className="cp-mono" style={{ marginBottom: 20 }}>
            § 02 · Or write, if you prefer
          </div>
          <div
            style={{ display: "flex", flexDirection: "column", gap: 16 }}
          >
            {[
              ["Your name", "Jane Smith"],
              ["Company", "King Double Glazing"],
              ["Email", "hello@kingdoubleglazing.com.au"],
              [
                "What are you trying to sell?",
                "Window glazing in Melbourne. Old site is slow and nobody calls. Need a new one.",
              ],
            ].map(([l, placeholder], i) => (
              <div key={l}>
                <div className="cp-mono" style={{ marginBottom: 6 }}>
                  {l}
                </div>
                <div
                  style={{
                    background: "var(--bg)",
                    border: "1px solid var(--border-2)",
                    padding:
                      i === 3 ? "14px 16px 48px" : "12px 14px",
                    color: "var(--text-dim)",
                    fontFamily: "var(--font-body), Inter, ui-sans-serif, system-ui, sans-serif",
                    fontSize: 15,
                  }}
                >
                  {placeholder}
                </div>
              </div>
            ))}
            <button
              className="cp-btn cp-btn-primary cp-btn-lg"
              style={{ justifyContent: "center" }}
            >
              Send →
            </button>
            <div className="cp-mono" style={{ color: "var(--text-muted)" }}>
              Or just:{" "}
              <a href="mailto:hello@clupai.com">hello@clupai.com</a>
            </div>
          </div>

          <div
            style={{
              marginTop: 48,
              paddingTop: 28,
              borderTop: "1px solid var(--border)",
              display: "flex",
              flexDirection: "column",
              gap: 18,
            }}
          >
            <Fact2 k="Reply time" v="Under 1 AU business day — every time." />
            <Fact2 k="Current availability" v="Two slots open · accepting July 2026." />
            <Fact2
              k="Not a fit for"
              v="Crypto, gambling, dropshipping, MLMs."
            />
            <Fact2 k="Office" v="Brunswick · Melbourne VIC · AEST" />
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
