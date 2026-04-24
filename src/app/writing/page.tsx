import Link from "next/link";
import Nav from "@/components/nav";
import Footer from "@/components/footer";
import Placeholder from "@/components/placeholder";

const posts = [
  {
    n: "11",
    slug: "agency-light-playbook",
    title: "The agency-light playbook",
    dek: "What I learned running a one-person studio for eighteen months—and why it beats scaling a team.",
    read: "12 min",
    date: "Apr 2026",
    tag: "Business",
  },
  {
    n: "10",
    slug: "why-i-stopped-wordpress",
    title: "Why I stopped taking WordPress work",
    dek: "Not because it's bad. Because the alternatives got better faster than I could keep up with them.",
    read: "8 min",
    date: "Mar 2026",
    tag: "Engineering",
  },
  {
    n: "09",
    slug: "published-pricing",
    title: "Published pricing: the best lead qualifier I've ever used",
    dek: "Traffic dropped 12%. Booked calls went up 180%. Here is the math.",
    read: "6 min",
    date: "Feb 2026",
    tag: "Business",
  },
  {
    n: "08",
    slug: "melbourne-local-seo-2026",
    title: "Melbourne local SEO in 2026",
    dek: "GBP, suburb pages, schema—what still works, what Google quietly killed.",
    read: "14 min",
    date: "Feb 2026",
    tag: "SEO",
  },
  {
    n: "07",
    slug: "n8n-vs-zapier-vs-make",
    title: "n8n vs Zapier vs Make: the honest comparison",
    dek: "I have shipped real workflows on all three. Here is what I actually pick, and when.",
    read: "9 min",
    date: "Jan 2026",
    tag: "Automation",
  },
  {
    n: "06",
    slug: "one-cta-per-page",
    title: "One CTA per page",
    dek: "The most effective design change I have made this year. Not a single client has regretted it.",
    read: "5 min",
    date: "Jan 2026",
    tag: "Design",
  },
  {
    n: "05",
    slug: "scope-four-week-website",
    title: "How I scope a four-week website",
    dek: "The exact 90-minute call, the brief I leave with, and the estimate I send the next morning.",
    read: "11 min",
    date: "Dec 2025",
    tag: "Process",
  },
  {
    n: "04",
    slug: "google-ads-leaky-bucket",
    title: "Google Ads for local services — the leaky-bucket audit",
    dek: "Nine out of ten accounts I open are haemorrhaging budget in the same five places.",
    read: "10 min",
    date: "Nov 2025",
    tag: "Ads",
  },
  {
    n: "03",
    slug: "core-web-vitals",
    title: "Core Web Vitals stopped being optional a while ago",
    dek: "INP is the new LCP. If you are not looking at it monthly, you are guessing.",
    read: "7 min",
    date: "Oct 2025",
    tag: "Engineering",
  },
];

const tags = [
  "All",
  "Business",
  "Engineering",
  "SEO",
  "Ads",
  "Automation",
  "Design",
  "Process",
];

export default function WritingPage() {
  const featured = posts[0];
  const rest = posts.slice(1);

  return (
    <>
      <Nav page="writing" />

      <div
        style={{
          padding: "80px 48px 40px",
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
              Writing · essays · working notes
            </div>
            <h1
              className="cp-display"
              style={{ fontSize: "clamp(3rem, 6vw, 5.5rem)", margin: 0 }}
            >
              Things I&apos;ve figured out.
              <br />
              <span style={{ color: "var(--accent)" }}>
                Mostly the hard way.
              </span>
            </h1>
          </div>
          <div style={{ textAlign: "right" }}>
            <div
              className="cp-mono"
              style={{ color: "var(--text-muted)", marginBottom: 6 }}
            >
              11 essays · RSS available
            </div>
            <div className="cp-mono" style={{ color: "var(--text-dim)" }}>
              One post every 3–4 weeks. No newsletter guilt.
            </div>
          </div>
        </div>
        <div
          style={{
            marginTop: 32,
            display: "flex",
            gap: 8,
            flexWrap: "wrap",
          }}
        >
          {tags.map((t, i) => (
            <span
              key={t}
              className="cp-chip"
              style={{
                background: i === 0 ? "var(--accent)" : "transparent",
                color: i === 0 ? "var(--accent-ink)" : "var(--text-muted)",
                borderColor: i === 0 ? "var(--accent)" : "var(--border-2)",
                cursor: "pointer",
              }}
            >
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* Featured */}
      <div
        style={{
          padding: "48px 48px 32px",
          borderBottom: "1px solid var(--border)",
        }}
      >
        <Link
          href={`/writing/${featured.slug}`}
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 560px",
            gap: 56,
            alignItems: "center",
          }}
        >
          <div>
            <div
              className="cp-mono"
              style={{ color: "var(--accent)", marginBottom: 12 }}
            >
              FEATURED · {featured.tag}
            </div>
            <h2
              className="cp-display"
              style={{
                fontSize: "clamp(2.25rem, 4vw, 3.75rem)",
                margin: 0,
                letterSpacing: "-0.035em",
              }}
            >
              {featured.title}
            </h2>
            <p
              style={{
                marginTop: 20,
                fontSize: 20,
                color: "var(--text-muted)",
                maxWidth: 600,
                lineHeight: 1.5,
              }}
            >
              {featured.dek}
            </p>
            <div
              style={{
                marginTop: 24,
                display: "flex",
                gap: 24,
                alignItems: "center",
              }}
            >
              <span className="cp-mono" style={{ color: "var(--text-muted)" }}>
                {featured.date} · {featured.read}
              </span>
              <span
                style={{
                  color: "var(--accent)",
                  fontFamily:
                    "var(--font-display), Manrope, ui-sans-serif, system-ui, sans-serif",
                  fontWeight: 500,
                }}
              >
                Read →
              </span>
            </div>
          </div>
          <Placeholder label="essay thumbnail" h={380} />
        </Link>
      </div>

      {/* Grid */}
      <div style={{ padding: "0 48px" }}>
        <div
          style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)" }}
        >
          {rest.map((p, i) => (
            <Link
              key={p.n}
              href={`/writing/${p.slug}`}
              style={{
                padding: "40px 32px",
                borderBottom: "1px solid var(--border)",
                borderRight:
                  i % 3 !== 2 ? "1px solid var(--border)" : "none",
                display: "flex",
                flexDirection: "column",
                minHeight: 340,
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <span
                  className="cp-num"
                  style={{
                    fontSize: 24,
                    color: "var(--accent)",
                    letterSpacing: "-0.03em",
                  }}
                >
                  {p.n}
                </span>
                <span className="cp-mono" style={{ color: "var(--text-muted)" }}>
                  {p.tag}
                </span>
              </div>
              <h3
                className="cp-display"
                style={{
                  fontSize: 26,
                  margin: "20px 0 0",
                  fontWeight: 700,
                  letterSpacing: "-0.02em",
                  lineHeight: 1.15,
                }}
              >
                {p.title}
              </h3>
              <p
                style={{
                  marginTop: 12,
                  color: "var(--text-muted)",
                  fontSize: 14,
                  lineHeight: 1.55,
                }}
              >
                {p.dek}
              </p>
              <div
                style={{
                  marginTop: "auto",
                  paddingTop: 20,
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <span className="cp-mono" style={{ color: "var(--text-dim)" }}>
                  {p.date}
                </span>
                <span className="cp-mono" style={{ color: "var(--text-dim)" }}>
                  {p.read}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* RSS */}
      <div
        style={{
          padding: "56px 48px",
          borderTop: "1px solid var(--border)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div>
          <div className="cp-mono" style={{ marginBottom: 6 }}>
            Subscribe · no newsletter theatre
          </div>
          <div
            style={{
              fontFamily:
                "var(--font-display), Manrope, ui-sans-serif, system-ui, sans-serif",
              fontSize: 20,
              fontWeight: 500,
              letterSpacing: "-0.01em",
            }}
          >
            RSS ·{" "}
            <span style={{ color: "var(--text-muted)" }}>
              clupai.com/writing.xml
            </span>
          </div>
        </div>
        <div style={{ display: "flex", gap: 12 }}>
          <button className="cp-btn cp-btn-ghost">Copy RSS URL</button>
          <button className="cp-btn cp-btn-ghost">Email when I post</button>
        </div>
      </div>

      <Footer />
    </>
  );
}
