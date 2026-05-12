import Link from "next/link";
import Nav from "@/components/nav";
import Footer from "@/components/footer";
import FinalCTA from "@/components/final-cta";
import { kits } from "@/lib/kits";
import type { Kit } from "@/lib/kits";

export default function AppsPage() {
  return (
    <>
      <Nav page="kits" />

      <div
        style={{
          padding: "80px 48px 56px",
          borderBottom: "1px solid var(--border)",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "end",
          }}
        >
          <div>
            <div className="cp-eyebrow" style={{ marginBottom: 12 }}>
              Kits · productised · self-serve
            </div>
            <h1
              className="cp-display"
              style={{ fontSize: "clamp(3rem, 6vw, 5.5rem)", margin: 0 }}
            >
              Small tools.
              <br />
              <span style={{ color: "var(--accent)" }}>Scoped to ship.</span>
            </h1>
            <p
              style={{
                marginTop: 24,
                fontSize: 20,
                color: "var(--text-muted)",
                maxWidth: 600,
                lineHeight: 1.5,
              }}
            >
              Bits I use on every project, packaged for anyone. Buy once, use
              forever. No subscriptions unless the thing actually needs one.
            </p>
          </div>
          <div className="cp-card" style={{ padding: "20px 24px", minWidth: 260 }}>
            <div className="cp-mono" style={{ marginBottom: 6 }}>
              Status · free beta
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
            <div
              className="cp-mono"
              style={{ color: "var(--text-muted)", marginTop: 6 }}
            >
              kairos.clupai.com
            </div>
          </div>
        </div>
      </div>

      {/* Product list */}
      <div style={{ padding: "0 48px" }}>
        {kits.map((a) => {
          const Tag = a.href ? "a" : "div";
          const linkProps = a.href
            ? { href: a.href, target: "_blank", rel: "noopener noreferrer" }
            : {};
          return (
          <Tag
            key={a.slug}
            id={a.slug}
            className="cp-apps-row"
            style={{
              display: "grid",
              gridTemplateColumns: "72px 1.1fr 1.4fr 180px 140px 60px",
              gap: 24,
              padding: "28px 0",
              borderBottom: "1px solid var(--border)",
              alignItems: "center",
              cursor: "pointer",
              textDecoration: "none",
              color: "inherit",
            }}
            {...(linkProps as Record<string, string>)}
          >
            <div
              style={{
                width: 72,
                height: 72,
                borderRadius: 12,
                background: `linear-gradient(135deg, var(--accent), rgba(77,163,255,0.3))`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "var(--accent-ink)",
                fontFamily:
                  "var(--font-display), Manrope, ui-sans-serif, system-ui, sans-serif",
                fontWeight: 800,
                fontSize: 28,
                letterSpacing: "-0.03em",
              }}
            >
              {a.name.charAt(0)}
            </div>
            <div>
              <div
                style={{ display: "flex", alignItems: "baseline", gap: 10 }}
              >
                <div
                  style={{
                    fontFamily:
                      "var(--font-display), Manrope, ui-sans-serif, system-ui, sans-serif",
                    fontWeight: 700,
                    fontSize: 24,
                    letterSpacing: "-0.02em",
                  }}
                >
                  {a.name}
                </div>
                <span
                  className="cp-mono"
                  style={{ color: "var(--text-dim)" }}
                >
                  {a.tag}
                </span>
              </div>
              <div
                className="cp-mono"
                style={{ marginTop: 6, color: "var(--text-muted)" }}
              >
                {a.tech}
              </div>
            </div>
            <p
              style={{
                margin: 0,
                color: "var(--text-muted)",
                fontSize: 15,
                lineHeight: 1.55,
              }}
            >
              {a.desc}
            </p>
            <div>
              <div
                className="cp-num"
                style={{
                  fontSize: 26,
                  color: "var(--accent)",
                  letterSpacing: "-0.03em",
                }}
              >
                {a.price}
              </div>
              {a.mrr !== "—" && (
                <div
                  className="cp-mono"
                  style={{ color: "var(--text-muted)", marginTop: 4 }}
                >
                  {a.mrr} MRR
                </div>
              )}

            </div>
            <div>
              <span
                className="cp-chip"
                style={{
                  background:
                    a.status === "Live"
                      ? "transparent"
                      : "rgba(77,163,255,0.1)",
                  color:
                    a.status === "Live" ? "var(--text-muted)" : "var(--accent)",
                  borderColor:
                    a.status === "Live" ? "var(--border-2)" : "var(--accent)",
                }}
              >
                {a.status !== "Live" && <span className="dot" />}
                {a.status}
              </span>
            </div>
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              stroke="var(--accent)"
              strokeWidth="2"
            >
              <path d="M7 5l5 5-5 5" />
            </svg>
          </Tag>
          );
        })}
      </div>

      {/* Why this page */}
      <div
        style={{
          padding: "56px 48px",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 48,
          borderTop: "1px solid var(--border)",
          borderBottom: "1px solid var(--border)",
        }}
      >
        <div>
          <div className="cp-mono" style={{ marginBottom: 12 }}>
            Why this page exists
          </div>
          <h2
            className="cp-display"
            style={{ fontSize: 36, margin: 0, letterSpacing: "-0.025em" }}
          >
            Not a shop. A list of things that survived.
          </h2>
        </div>
        <p
          style={{
            color: "var(--text-muted)",
            fontSize: 16,
            lineHeight: 1.7,
            margin: 0,
          }}
        >
          Each of these started as something I built for one client, then
          realised I&apos;d need again. I package them, charge enough to cover
          the support, and keep them alive. Nothing here is a side hustle I hope
          becomes a SaaS. If MRR drops to zero, the product goes to an archive
          page—not to a bigger pricing plan.
        </p>
      </div>

      <FinalCTA />
      <Footer />
    </>
  );
}
