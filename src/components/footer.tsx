import Link from "next/link";
import Logomark from "./logomark";

const columns = [
  {
    h: "Services",
    items: [
      { label: "Websites", href: "/services/web" },
      { label: "Google Ads", href: "/services/ads" },
      { label: "SEO", href: "/services/seo" },
      { label: "Automation", href: "/services/automation" },
    ],
  },
  {
    h: "Studio",
    items: [
      { label: "Work", href: "/work" },
      { label: "Pricing", href: "/pricing" },
      { label: "Writing", href: "/writing" },
      { label: "About", href: "/about" },
    ],
  },
  {
    h: "Contact",
    items: [
      { label: "hello@clupai.com", href: "mailto:hello@clupai.com" },
      { label: "Book a call", href: "/contact" },
      { label: "Melbourne, VIC", href: "#" },
      { label: "Replies within 1 AU business day", href: "#" },
    ],
  },
];

export default function Footer() {
  return (
    <footer
      style={{
        borderTop: "1px solid var(--border)",
        padding: "56px 48px 32px",
        background: "var(--bg)",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "2fr 1fr 1fr 1fr",
          gap: 48,
          marginBottom: 48,
        }}
      >
        <div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              marginBottom: 16,
            }}
          >
            <Logomark size={28} />
            <span
              style={{
                fontFamily:
                  "var(--font-display), Manrope, ui-sans-serif, system-ui, sans-serif",
                fontWeight: 700,
                fontSize: 22,
                letterSpacing: "-0.02em",
              }}
            >
              clupai
            </span>
          </div>
          <p
            style={{
              color: "var(--text-muted)",
              maxWidth: 360,
              fontSize: 15,
              lineHeight: 1.55,
              margin: 0,
            }}
          >
            A one-person studio in Melbourne. Websites, ads, SEO and automation
            for operators who want more customers—not more account managers.
          </p>
          <div
            style={{
              marginTop: 20,
              display: "flex",
              gap: 12,
              flexWrap: "wrap",
            }}
          >
            <span className="cp-chip">
              <span className="dot" />
              Accepting July 2026
            </span>
            <span className="cp-chip">ABN 12 345 678 901</span>
          </div>
        </div>

        {columns.map((c) => (
          <div key={c.h}>
            <div className="cp-mono" style={{ marginBottom: 16 }}>
              {c.h}
            </div>
            <ul
              style={{
                listStyle: "none",
                padding: 0,
                margin: 0,
                display: "flex",
                flexDirection: "column",
                gap: 10,
              }}
            >
              {c.items.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    style={{ color: "var(--text-muted)", fontSize: 14 }}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="cp-hair" />
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          paddingTop: 24,
        }}
      >
        <div className="cp-mono" style={{ fontSize: 10 }}>
          © 2026 Samridh Limbu · trading as Clupai
        </div>
        <div className="cp-mono" style={{ fontSize: 10 }}>
          v2.0 — Digital Obsidian · Assertive
        </div>
      </div>
    </footer>
  );
}
