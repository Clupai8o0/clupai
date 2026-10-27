import type { ReactNode } from "react";
import Nav from "@/components/nav";
import Footer from "@/components/footer";

export type LegalSection = {
  id: string;
  heading: string;
  body: ReactNode;
};

export default function LegalPage({
  eyebrow,
  title,
  updated,
  intro,
  sections,
}: {
  eyebrow: string;
  title: string;
  updated: string;
  intro: ReactNode;
  sections: LegalSection[];
}) {
  return (
    <>
      <Nav />

      {/* Hero */}
      <header
        style={{
          padding: "64px 48px 56px",
          borderBottom: "1px solid var(--border)",
        }}
      >
        <div style={{ maxWidth: 820, margin: "0 auto" }}>
          <div className="cp-eyebrow" style={{ marginBottom: 14 }}>
            {eyebrow}
          </div>
          <h1
            className="cp-display"
            style={{
              fontSize: "clamp(2.25rem, 4.4vw, 3.75rem)",
              margin: 0,
              lineHeight: 1.04,
              letterSpacing: "-0.02em",
            }}
          >
            {title}
          </h1>
          <div
            className="cp-mono"
            style={{ marginTop: 22, color: "var(--text-dim)" }}
          >
            Last updated · {updated}
          </div>
          <p
            style={{
              marginTop: 24,
              fontSize: "clamp(16px, 2vw, 19px)",
              color: "var(--text-muted)",
              lineHeight: 1.6,
              maxWidth: 720,
              margin: "24px 0 0",
            }}
          >
            {intro}
          </p>
        </div>
      </header>

      {/* Body */}
      <main style={{ padding: "56px 48px 96px" }}>
        <div style={{ maxWidth: 820, margin: "0 auto" }}>
          <nav
            aria-label="On this page"
            style={{
              marginBottom: 56,
              paddingBottom: 36,
              borderBottom: "1px solid var(--border)",
            }}
          >
            <div className="cp-mono" style={{ marginBottom: 18 }}>
              On this page
            </div>
            <ol className="cp-legal-toc">
              {sections.map((s, i) => (
                <li key={s.id}>
                  <span className="cp-mono cp-legal-toc-n">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <a href={`#${s.id}`} className="cp-footer-link">
                    {s.heading}
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          {sections.map((s, i) => (
            <section
              key={s.id}
              id={s.id}
              style={{ marginBottom: 48, scrollMarginTop: 88 }}
            >
              <div
                className="cp-mono"
                style={{ marginBottom: 12, color: "var(--accent)" }}
              >
                {String(i + 1).padStart(2, "0")}
              </div>
              <h2
                className="cp-display"
                style={{
                  fontSize: "clamp(20px, 2.6vw, 28px)",
                  margin: "0 0 16px",
                  letterSpacing: "-0.02em",
                  lineHeight: 1.18,
                }}
              >
                {s.heading}
              </h2>
              <div className="cp-legal">{s.body}</div>
            </section>
          ))}
        </div>
      </main>

      <Footer />
    </>
  );
}
