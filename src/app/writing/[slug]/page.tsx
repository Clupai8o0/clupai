import Link from "next/link";
import Nav from "@/components/nav";
import Footer from "@/components/footer";
import FinalCTA from "@/components/final-cta";
import SamAvatar from "@/components/sam-avatar";

export function generateStaticParams() {
  return [
    { slug: "agency-light-playbook" },
    { slug: "why-i-stopped-wordpress" },
    { slug: "published-pricing" },
    { slug: "melbourne-local-seo-2026" },
    { slug: "n8n-vs-zapier-vs-make" },
    { slug: "one-cta-per-page" },
    { slug: "scope-four-week-website" },
    { slug: "google-ads-leaky-bucket" },
    { slug: "core-web-vitals" },
  ];
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  void slug;

  return (
    <>
      <Nav page="writing" />

      <div style={{ padding: "48px 48px 0" }}>
        <div className="cp-mono" style={{ color: "var(--text-muted)" }}>
          <Link href="/writing">Writing</Link>{" "}
          <span style={{ color: "var(--text-dim)" }}>/</span>{" "}
          <span style={{ color: "var(--text)" }}>Business · 11</span>
        </div>
      </div>

      <div
        style={{
          padding: "32px 48px 64px",
          maxWidth: 900,
          margin: "0 auto",
        }}
      >
        <div className="cp-eyebrow" style={{ marginBottom: 12 }}>
          Essay · 12 min read · April 2026
        </div>
        <h1
          className="cp-display"
          style={{
            fontSize: "clamp(2.75rem, 5.2vw, 4.75rem)",
            margin: 0,
            maxWidth: 900,
            lineHeight: 1.02,
          }}
        >
          The agency-light playbook
        </h1>
        <p
          style={{
            marginTop: 24,
            fontSize: 22,
            color: "var(--text-muted)",
            lineHeight: 1.5,
            maxWidth: 780,
            fontFamily:
              "var(--font-display), Manrope, ui-sans-serif, system-ui, sans-serif",
            fontWeight: 400,
            letterSpacing: "-0.01em",
          }}
        >
          What I learned running a one-person studio for eighteen months—and why
          it beats scaling a team, at least for the next three or four years of
          work like mine.
        </p>
        <div
          style={{
            marginTop: 32,
            display: "flex",
            alignItems: "center",
            gap: 14,
            paddingBottom: 28,
            borderBottom: "1px solid var(--border)",
          }}
        >
          <SamAvatar size={48} />
          <div>
            <div
              style={{
                fontFamily:
                  "var(--font-display), Manrope, ui-sans-serif, system-ui, sans-serif",
                fontWeight: 600,
              }}
            >
              Sam Limbu
            </div>
            <div className="cp-mono" style={{ color: "var(--text-muted)" }}>
              Founder, clupai · Melbourne
            </div>
          </div>
          <div style={{ flex: 1 }} />
          <div style={{ display: "flex", gap: 8 }}>
            <span className="cp-chip">Business</span>
            <span className="cp-chip">Solo</span>
          </div>
        </div>
      </div>

      {/* Body */}
      <div
        style={{
          maxWidth: 760,
          margin: "0 auto",
          padding: "0 48px 80px",
          fontSize: 18,
          lineHeight: 1.7,
          color: "var(--text)",
        }}
      >
        <p style={{ margin: 0 }}>
          Here&apos;s the contrarian take: the agency model, as most of us
          experience it in 2026, is a tax. A founder pays the tax to buy back
          time. Most of the time, they&apos;re buying someone else&apos;s
          overhead.
        </p>
        <p>
          I&apos;ve been running Clupai solo for eighteen months. Four services,
          no employees, no contractors most weeks, an ABN and a Melbourne
          address. I&apos;ve shipped twenty-four projects. I turn down more work
          than I take. The margin is obscene—not because I&apos;m expensive, but
          because there&apos;s nobody else in the room.
        </p>

        <h2
          className="cp-display"
          style={{
            fontSize: 36,
            marginTop: 56,
            marginBottom: 16,
            letterSpacing: "-0.025em",
          }}
        >
          What &quot;agency-light&quot; actually means
        </h2>
        <p style={{ marginTop: 0 }}>
          It&apos;s a set of constraints, not a brand. Three of them:
        </p>
        <ol style={{ paddingLeft: 20 }}>
          <li style={{ marginBottom: 12 }}>
            <strong style={{ color: "var(--accent)" }}>
              First person everywhere.
            </strong>{" "}
            The site says &quot;I&quot;, not &quot;we&quot;. Every email is from
            me. Every call is with me. No account manager. No project manager.
            No handover to a delivery team.
          </li>
          <li style={{ marginBottom: 12 }}>
            <strong style={{ color: "var(--accent)" }}>
              Packaged services.
            </strong>{" "}
            Three tiers. Published prices. If you don&apos;t fit them, we have a
            different conversation—but the default path doesn&apos;t need a
            proposal.
          </li>
          <li style={{ marginBottom: 12 }}>
            <strong style={{ color: "var(--accent)" }}>
              Outcome-framed copy.
            </strong>{" "}
            Every page answers: what does the customer get, and what will it
            cost. That&apos;s it. Agencies bury this under
            &quot;process&quot;, &quot;philosophy&quot; and a bento grid of
            tooling logos.
          </li>
        </ol>

        <h2
          className="cp-display"
          style={{
            fontSize: 36,
            marginTop: 56,
            marginBottom: 16,
            letterSpacing: "-0.025em",
          }}
        >
          Why not scale?
        </h2>
        <p>
          The standard advice is: once you&apos;re at capacity, hire. I&apos;ve
          watched three friends do it. All three regret the first hire—not the
          work, the shape of the work. You go from doing the craft to managing
          the people doing the craft. That&apos;s a different job. Some people
          love it. I don&apos;t.
        </p>
        <p>
          There&apos;s also the math. A second pair of hands adds less than a
          second pair of hands&apos; worth of output. Coordination tax is real.
          By the time you&apos;re at four people, you&apos;ve added two roles
          that exist solely to keep the other two productive.
        </p>
        <blockquote
          style={{
            margin: "40px 0",
            padding: "24px 32px",
            borderLeft: "3px solid var(--accent)",
            background: "var(--surface)",
            fontSize: 22,
            fontFamily:
              "var(--font-display), Manrope, ui-sans-serif, system-ui, sans-serif",
            fontWeight: 500,
            letterSpacing: "-0.01em",
            lineHeight: 1.4,
          }}
        >
          &quot;The question isn&apos;t whether you can run an agency. It&apos;s
          whether the work you want to do survives the structure you&apos;re
          building to deliver it.&quot;
        </blockquote>

        <h2
          className="cp-display"
          style={{
            fontSize: 36,
            marginTop: 56,
            marginBottom: 16,
            letterSpacing: "-0.025em",
          }}
        >
          The trade-offs I made on purpose
        </h2>
        <p>Solo isn&apos;t free. I gave up:</p>
        <ul style={{ paddingLeft: 20 }}>
          <li style={{ marginBottom: 10 }}>
            Bigger contracts. Enterprise work usually wants a company, not a
            person.
          </li>
          <li style={{ marginBottom: 10 }}>
            Specialisation. I&apos;m a generalist. A three-person agency can
            afford a dedicated ads person who&apos;s sharper than me on ads.
          </li>
          <li style={{ marginBottom: 10 }}>
            Holidays without prep. If I&apos;m offline, nothing ships. I plan
            around it.
          </li>
        </ul>
        <p>I kept:</p>
        <ul style={{ paddingLeft: 20 }}>
          <li style={{ marginBottom: 10 }}>Every dollar of margin.</li>
          <li style={{ marginBottom: 10 }}>
            The ability to fire a client without a HR conversation.
          </li>
          <li style={{ marginBottom: 10 }}>The craft.</li>
        </ul>

        <p
          style={{
            marginTop: 48,
            fontStyle: "italic",
            color: "var(--text-muted)",
          }}
        >
          If you&apos;re thinking about going the same way, I&apos;m happy to
          talk for twenty minutes. No pitch. Just the conversation I wish
          I&apos;d had in 2024.
        </p>
      </div>

      {/* Next posts */}
      <div style={{ borderTop: "1px solid var(--border)", padding: "56px 48px" }}>
        <div className="cp-mono" style={{ marginBottom: 24 }}>
          Keep reading
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 24,
          }}
        >
          {[
            ["10", "Why I stopped taking WordPress work", "8 min", "why-i-stopped-wordpress"],
            ["09", "Published pricing: the best lead qualifier", "6 min", "published-pricing"],
            ["05", "How I scope a four-week website", "11 min", "scope-four-week-website"],
          ].map(([n, t, r, s]) => (
            <Link
              key={n}
              href={`/writing/${s}`}
              className="cp-card"
              style={{ padding: 24 }}
            >
              <div
                className="cp-num"
                style={{
                  color: "var(--accent)",
                  fontSize: 20,
                  letterSpacing: "-0.03em",
                }}
              >
                {n}
              </div>
              <div
                style={{
                  fontFamily:
                    "var(--font-display), Manrope, ui-sans-serif, system-ui, sans-serif",
                  fontSize: 20,
                  fontWeight: 700,
                  marginTop: 12,
                  letterSpacing: "-0.02em",
                }}
              >
                {t}
              </div>
              <div
                className="cp-mono"
                style={{ marginTop: 10, color: "var(--text-muted)" }}
              >
                {r}
              </div>
            </Link>
          ))}
        </div>
      </div>

      <FinalCTA />
      <Footer />
    </>
  );
}
