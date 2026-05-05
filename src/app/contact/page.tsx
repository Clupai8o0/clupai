import Nav from "@/components/nav";
import Footer from "@/components/footer";
import CalBooking from "@/components/cal-booking";
import ContactForm from "@/components/contact-form";

function Fact({ k, v }: { k: string; v: string }) {
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
        className="cp-contact-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "1.3fr 1fr",
          borderBottom: "1px solid var(--border)",
        }}
      >
        {/* Cal.com live booking */}
        <div
          className="cp-contact-col-left"
          style={{
            padding: "48px 48px",
            borderRight: "1px solid var(--border)",
          }}
        >
          <div className="cp-mono" style={{ marginBottom: 20 }}>
            § 01 · Book a 20‑minute scope call
          </div>
          <CalBooking />
          <div
            className="cp-mono"
            style={{ marginTop: 20, color: "var(--text-muted)" }}
          >
            Cal.com (open‑source) · no CRM spam · you&apos;ll get one calendar
            invite and nothing else.
          </div>
        </div>

        {/* Contact form */}
        <div
          style={{
            padding: "48px 48px",
            background: "var(--surface)",
          }}
        >
          <div className="cp-mono" style={{ marginBottom: 20 }}>
            § 02 · Or write, if you prefer
          </div>
          <ContactForm />

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
            <Fact k="Reply time" v="Under 1 AU business day — every time." />
            <Fact k="Office" v="Melbourne VIC" />
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
