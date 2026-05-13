"use client";

import { useState, useCallback } from "react";
import Nav from "@/components/nav";
import Footer from "@/components/footer";
import FinalCTA from "@/components/final-cta";

interface CWVResult {
  score: number;
  lcp: number | null;
  lcpDisplay: string | null;
  inp: number | null;
  inpDisplay: string | null;
  cls: number | null;
  clsDisplay: string | null;
  fcp: number | null;
  fcpDisplay: string | null;
  tbt: number | null;
  tbtDisplay: string | null;
  strategy: string;
  url: string;
}

type Rating = "good" | "needs-work" | "poor";

function scoreRating(score: number): Rating {
  if (score >= 90) return "good";
  if (score >= 50) return "needs-work";
  return "poor";
}

function lcpRating(ms: number | null): Rating {
  if (ms === null) return "needs-work";
  if (ms < 2500) return "good";
  if (ms < 4000) return "needs-work";
  return "poor";
}

function inpRating(ms: number | null): Rating {
  if (ms === null) return "needs-work";
  if (ms < 200) return "good";
  if (ms < 500) return "needs-work";
  return "poor";
}

function clsRating(val: number | null): Rating {
  if (val === null) return "needs-work";
  if (val < 0.1) return "good";
  if (val < 0.25) return "needs-work";
  return "poor";
}

function ratingLabel(r: Rating) {
  if (r === "good") return "Good";
  if (r === "needs-work") return "Needs work";
  return "Poor";
}

function ratingColour(r: Rating): string {
  if (r === "good") return "#22c55e";
  if (r === "needs-work") return "#f59e0b";
  return "#ef4444";
}

function scoreColour(score: number): string {
  if (score >= 90) return "#22c55e";
  if (score >= 50) return "#f59e0b";
  return "#ef4444";
}

function contextCopy(score: number, url: string, strategy: string): string {
  const device = strategy === "mobile" ? "mobile" : "desktop";
  const domain = (() => {
    try {
      return new URL(url).hostname.replace("www.", "");
    } catch {
      return url;
    }
  })();

  if (score >= 90) {
    return `${domain} scored ${score} on ${device} — that&apos;s in the top tier. Fast load times reduce bounce rates and send positive signals to Google, reinforcing your search rankings. Keep it maintained as you add content.`;
  }
  if (score >= 70) {
    return `${domain} scored ${score} on ${device} — decent, but there&apos;s real room for improvement. Google uses page experience as a ranking input, and in competitive local markets, every point counts. We can usually get sites into the 90+ range.`;
  }
  if (score >= 50) {
    return `${domain} scored ${score} on ${device} — this is below what Google expects for a good page experience. Slow sites lose visitors before the page even loads. Fixing this is likely the highest-ROI technical change you can make right now.`;
  }
  return `${domain} scored ${score} on ${device} — that&apos;s a significant performance problem. Visitors on ${device} are almost certainly bouncing before your content appears, and Google is likely deprioritising the site as a result. This needs urgent attention.`;
}

const inputStyle: React.CSSProperties = {
  border: "1px solid var(--border)",
  background: "var(--surface)",
  color: "var(--text)",
  padding: "12px 16px",
  borderRadius: "var(--radius)",
  fontSize: 15,
  fontFamily: "inherit",
  width: "100%",
  outline: "none",
  transition: "border-color 0.15s",
};

function MetricCard({
  label,
  value,
  rating,
  description,
}: {
  label: string;
  value: string | null;
  rating: Rating;
  description: string;
}) {
  const colour = ratingColour(rating);
  return (
    <div
      className="cp-card"
      style={{
        padding: "24px 20px",
        display: "flex",
        flexDirection: "column",
        gap: 10,
      }}
    >
      <div
        style={{
          fontFamily: "var(--font-mono), monospace",
          fontSize: 11,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          color: "var(--text-dim)",
        }}
      >
        {label}
      </div>
      <div
        className="cp-num"
        style={{
          fontSize: 28,
          fontWeight: 700,
          color: colour,
          lineHeight: 1,
        }}
      >
        {value ?? "—"}
      </div>
      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 6,
          padding: "3px 8px",
          borderRadius: 999,
          background: `${colour}18`,
          border: `1px solid ${colour}40`,
          width: "fit-content",
        }}
      >
        <div
          style={{
            width: 6,
            height: 6,
            borderRadius: "50%",
            background: colour,
            flexShrink: 0,
          }}
        />
        <span
          style={{
            fontFamily: "var(--font-mono), monospace",
            fontSize: 10,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: colour,
          }}
        >
          {ratingLabel(rating)}
        </span>
      </div>
      <p style={{ margin: 0, fontSize: 12, color: "var(--text-dim)", lineHeight: 1.5 }}>
        {description}
      </p>
    </div>
  );
}

function ScoreRing({ score }: { score: number }) {
  const colour = scoreColour(score);
  const r = 54;
  const circ = 2 * Math.PI * r;
  const progress = (score / 100) * circ;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 8,
      }}
    >
      <svg width="140" height="140" viewBox="0 0 140 140">
        <circle
          cx="70"
          cy="70"
          r={r}
          fill="none"
          stroke="var(--border)"
          strokeWidth="10"
        />
        <circle
          cx="70"
          cy="70"
          r={r}
          fill="none"
          stroke={colour}
          strokeWidth="10"
          strokeDasharray={`${progress} ${circ - progress}`}
          strokeDashoffset={circ / 4}
          strokeLinecap="round"
        />
        <text
          x="70"
          y="70"
          dominantBaseline="middle"
          textAnchor="middle"
          fill={colour}
          fontSize="30"
          fontWeight="700"
          fontFamily="var(--font-display), Manrope, sans-serif"
        >
          {score}
        </text>
        <text
          x="70"
          y="90"
          dominantBaseline="middle"
          textAnchor="middle"
          fill="var(--text-dim)"
          fontSize="10"
          fontFamily="var(--font-mono), monospace"
          letterSpacing="0.06em"
        >
          /100
        </text>
      </svg>
      <div
        style={{
          fontFamily: "var(--font-mono), monospace",
          fontSize: 10,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          color: "var(--text-muted)",
        }}
      >
        Performance
      </div>
    </div>
  );
}

export default function CWVAudit() {
  const [url, setUrl] = useState("");
  const [strategy, setStrategy] = useState<"mobile" | "desktop">("mobile");
  const [status, setStatus] = useState<
    "idle" | "loading" | "results" | "error"
  >("idle");
  const [result, setResult] = useState<CWVResult | null>(null);
  const [errorMsg, setErrorMsg] = useState("");

  const runAudit = useCallback(async () => {
    if (!url.trim()) return;

    let normalisedUrl = url.trim();
    if (!/^https?:\/\//i.test(normalisedUrl)) {
      normalisedUrl = `https://${normalisedUrl}`;
    }

    setStatus("loading");
    setResult(null);
    setErrorMsg("");

    try {
      const res = await fetch(
        `/api/cwv?url=${encodeURIComponent(normalisedUrl)}&strategy=${strategy}`
      );
      const data = (await res.json()) as CWVResult & { error?: string };

      if (!res.ok || data.error) {
        setErrorMsg(
          data.error ?? "Something went wrong. Please try again."
        );
        setStatus("error");
        return;
      }

      setResult(data);
      setStatus("results");
    } catch {
      setErrorMsg(
        "Could not connect to the audit service. Please check your internet connection and try again."
      );
      setStatus("error");
    }
  }, [url, strategy]);

  const mailtoUrl = result
    ? `mailto:hello@clupai.com?subject=CWV+Audit+Request&body=Please+review+my+Core+Web+Vitals.%0A%0AURL%3A+${encodeURIComponent(result.url)}%0AStrategy%3A+${result.strategy}%0AScore%3A+${result.score}%2F100`
    : "mailto:hello@clupai.com?subject=CWV+Audit+Request";

  return (
    <>
      <Nav />

      {/* Header */}
      <div
        style={{
          padding: "56px 48px 48px",
          borderBottom: "1px solid var(--border)",
        }}
      >
        <div className="cp-eyebrow" style={{ marginBottom: 12 }}>
          Free tool · Powered by Google PageSpeed Insights
        </div>
        <h1
          className="cp-display"
          style={{
            fontSize: "clamp(2rem, 4vw, 3.5rem)",
            margin: "0 0 16px",
          }}
        >
          Core Web Vitals Audit
        </h1>
        <p
          style={{
            color: "var(--text-muted)",
            fontSize: 17,
            lineHeight: 1.6,
            maxWidth: 600,
            margin: 0,
          }}
        >
          Check your site&apos;s LCP, INP, and CLS scores — the three metrics Google
          uses to assess page experience. No account needed.
        </p>
      </div>

      {/* Tool area */}
      <div style={{ padding: "56px 48px" }}>
        {/* Input form */}
        <div
          style={{
            maxWidth: 680,
            margin: "0 auto",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div>
              <label
                style={{
                  display: "block",
                  fontFamily: "var(--font-mono), monospace",
                  fontSize: 11,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: "var(--text-muted)",
                  marginBottom: 8,
                }}
              >
                Your website URL
              </label>
              <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && runAudit()}
                placeholder="https://yoursite.com.au"
                style={{ ...inputStyle, fontSize: 16 }}
                disabled={status === "loading"}
              />
            </div>

            <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
              <span
                style={{
                  fontFamily: "var(--font-mono), monospace",
                  fontSize: 11,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: "var(--text-muted)",
                  marginRight: 4,
                }}
              >
                Device:
              </span>
              {(["mobile", "desktop"] as const).map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setStrategy(s)}
                  style={{
                    fontFamily: "var(--font-mono), monospace",
                    fontSize: 11,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    padding: "6px 14px",
                    border: `1px solid ${strategy === s ? "var(--accent)" : "var(--border-2)"}`,
                    borderRadius: "var(--radius)",
                    background:
                      strategy === s ? "var(--accent)" : "transparent",
                    color:
                      strategy === s ? "var(--accent-ink)" : "var(--text-muted)",
                    cursor: "pointer",
                    transition: "all 0.15s",
                  }}
                >
                  {s}
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={runAudit}
              disabled={status === "loading" || !url.trim()}
              className="cp-btn cp-btn-primary"
              style={{
                alignSelf: "flex-start",
                opacity: !url.trim() ? 0.5 : 1,
                cursor: !url.trim() ? "not-allowed" : "pointer",
              }}
            >
              {status === "loading" ? (
                <>
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    style={{
                      animation: "spin 0.8s linear infinite",
                    }}
                  >
                    <path d="M7 1v2M7 11v2M1 7h2M11 7h2M2.9 2.9l1.4 1.4M9.7 9.7l1.4 1.4M2.9 11.1l1.4-1.4M9.7 4.3l1.4-1.4" />
                  </svg>
                  Analysing...
                </>
              ) : (
                <>
                  Run audit
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M2 7h10M8 3l4 4-4 4" />
                  </svg>
                </>
              )}
            </button>
          </div>

          {/* Loading state */}
          {status === "loading" && (
            <div
              style={{
                marginTop: 48,
                padding: "40px 32px",
                border: "1px solid var(--border)",
                borderRadius: "var(--radius-lg)",
                background: "var(--surface)",
                textAlign: "center",
              }}
            >
              <div
                style={{
                  width: 40,
                  height: 40,
                  border: "3px solid var(--border)",
                  borderTop: "3px solid var(--accent)",
                  borderRadius: "50%",
                  animation: "spin 0.8s linear infinite",
                  margin: "0 auto 16px",
                }}
              />
              <p
                style={{
                  fontFamily: "var(--font-mono), monospace",
                  fontSize: 12,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: "var(--text-muted)",
                  margin: 0,
                }}
              >
                Running PageSpeed Insights analysis...
              </p>
              <p
                style={{
                  color: "var(--text-dim)",
                  fontSize: 13,
                  marginTop: 8,
                  marginBottom: 0,
                }}
              >
                This usually takes 20–40 seconds.
              </p>
            </div>
          )}

          {/* Error state */}
          {status === "error" && (
            <div
              style={{
                marginTop: 40,
                padding: "24px 28px",
                border: "1px solid #ef444440",
                borderRadius: "var(--radius-lg)",
                background: "#ef444408",
              }}
            >
              <p
                style={{
                  color: "#ef4444",
                  fontFamily: "var(--font-mono), monospace",
                  fontSize: 11,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  margin: "0 0 8px",
                }}
              >
                Audit failed
              </p>
              <p style={{ color: "var(--text-muted)", fontSize: 15, margin: "0 0 16px" }}>
                {errorMsg}
              </p>
              <button
                type="button"
                onClick={() => setStatus("idle")}
                className="cp-btn cp-btn-ghost"
                style={{ fontSize: 13, padding: "8px 16px", minHeight: "unset" }}
              >
                Try again
              </button>
            </div>
          )}

          {/* Results state */}
          {status === "results" && result && (
            <div style={{ marginTop: 56 }}>
              {/* Strategy badge + URL */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  marginBottom: 32,
                  flexWrap: "wrap",
                }}
              >
                <span className="cp-chip">
                  <span className="dot" />
                  {result.strategy}
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-mono), monospace",
                    fontSize: 11,
                    letterSpacing: "0.04em",
                    color: "var(--text-dim)",
                    wordBreak: "break-all",
                  }}
                >
                  {result.url}
                </span>
              </div>

              {/* Score ring + context */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "auto 1fr",
                  gap: 40,
                  alignItems: "center",
                  marginBottom: 40,
                  padding: "32px 36px",
                  border: "1px solid var(--border)",
                  borderRadius: "var(--radius-lg)",
                  background: "var(--surface)",
                }}
              >
                <ScoreRing score={result.score} />
                <div>
                  <div
                    className="cp-eyebrow"
                    style={{ marginBottom: 10, color: "var(--text-dim)" }}
                  >
                    Performance score · {result.strategy}
                  </div>
                  <p
                    style={{
                      color: "var(--text-muted)",
                      fontSize: 15,
                      lineHeight: 1.65,
                      margin: 0,
                    }}
                    dangerouslySetInnerHTML={{
                      __html: contextCopy(result.score, result.url, result.strategy),
                    }}
                  />
                </div>
              </div>

              {/* Metric cards */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(3, 1fr)",
                  gap: 16,
                  marginBottom: 40,
                }}
              >
                <MetricCard
                  label="LCP"
                  value={result.lcpDisplay}
                  rating={lcpRating(result.lcp)}
                  description="Largest Contentful Paint — how fast your main content loads."
                />
                <MetricCard
                  label="INP"
                  value={result.inpDisplay}
                  rating={inpRating(result.inp)}
                  description="Interaction to Next Paint — how quickly your page responds to input."
                />
                <MetricCard
                  label="CLS"
                  value={result.clsDisplay}
                  rating={clsRating(result.cls)}
                  description="Cumulative Layout Shift — how much your content jumps around while loading."
                />
              </div>

              {/* Secondary metrics */}
              {(result.fcpDisplay || result.tbtDisplay) && (
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: 16,
                    marginBottom: 40,
                  }}
                >
                  {result.fcpDisplay && (
                    <div
                      style={{
                        padding: "16px 20px",
                        border: "1px solid var(--border)",
                        borderRadius: "var(--radius)",
                        display: "flex",
                        alignItems: "baseline",
                        gap: 12,
                      }}
                    >
                      <span
                        style={{
                          fontFamily: "var(--font-mono), monospace",
                          fontSize: 10,
                          letterSpacing: "0.1em",
                          textTransform: "uppercase",
                          color: "var(--text-dim)",
                          flexShrink: 0,
                        }}
                      >
                        FCP
                      </span>
                      <span
                        className="cp-num"
                        style={{ fontSize: 18, color: "var(--text)" }}
                      >
                        {result.fcpDisplay}
                      </span>
                      <span
                        style={{ fontSize: 12, color: "var(--text-dim)" }}
                      >
                        First Contentful Paint
                      </span>
                    </div>
                  )}
                  {result.tbtDisplay && (
                    <div
                      style={{
                        padding: "16px 20px",
                        border: "1px solid var(--border)",
                        borderRadius: "var(--radius)",
                        display: "flex",
                        alignItems: "baseline",
                        gap: 12,
                      }}
                    >
                      <span
                        style={{
                          fontFamily: "var(--font-mono), monospace",
                          fontSize: 10,
                          letterSpacing: "0.1em",
                          textTransform: "uppercase",
                          color: "var(--text-dim)",
                          flexShrink: 0,
                        }}
                      >
                        TBT
                      </span>
                      <span
                        className="cp-num"
                        style={{ fontSize: 18, color: "var(--text)" }}
                      >
                        {result.tbtDisplay}
                      </span>
                      <span
                        style={{ fontSize: 12, color: "var(--text-dim)" }}
                      >
                        Total Blocking Time
                      </span>
                    </div>
                  )}
                </div>
              )}

              {/* Lead capture card */}
              <div
                style={{
                  padding: "36px 40px",
                  border: "1px solid var(--border-2)",
                  borderRadius: "var(--radius-lg)",
                  background: "var(--surface)",
                  marginBottom: 32,
                }}
              >
                <div className="cp-eyebrow" style={{ marginBottom: 10 }}>
                  Want the full picture?
                </div>
                <h3
                  className="cp-display"
                  style={{ fontSize: "1.4rem", margin: "0 0 12px" }}
                >
                  What&apos;s slow, what to fix, and in what order
                </h3>
                <p
                  style={{
                    color: "var(--text-muted)",
                    fontSize: 15,
                    lineHeight: 1.6,
                    margin: "0 0 24px",
                    maxWidth: 520,
                  }}
                >
                  We&apos;ll analyse your Core Web Vitals in detail — waterfall
                  charts, render-blocking resources, image optimisation, server
                  response time — and send you a prioritised fix list.
                </p>
                <div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center" }}>
                  <a
                    href={mailtoUrl}
                    className="cp-btn cp-btn-primary"
                  >
                    Send me the audit report
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 14 14"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M2 7h10M8 3l4 4-4 4" />
                    </svg>
                  </a>
                  <span
                    style={{
                      fontFamily: "var(--font-mono), monospace",
                      fontSize: 11,
                      color: "var(--text-dim)",
                      letterSpacing: "0.04em",
                    }}
                  >
                    Reply within one AU business day
                  </span>
                </div>
              </div>

              {/* Re-run button */}
              <div>
                <button
                  type="button"
                  onClick={() => {
                    setStatus("idle");
                    setResult(null);
                    setUrl("");
                  }}
                  className="cp-btn cp-btn-ghost"
                  style={{ fontSize: 13 }}
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                  >
                    <path d="M1 7a6 6 0 106-6 6 6 0 00-4.8 2.4L1 2" />
                    <path d="M1 2v2.4H3.4" />
                  </svg>
                  Audit another URL
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* What are Core Web Vitals — explainer */}
      <div
        style={{
          borderTop: "1px solid var(--border)",
          padding: "72px 48px",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 64,
          alignItems: "start",
        }}
      >
        <div>
          <h2
            className="cp-display"
            style={{
              fontSize: "clamp(1.5rem, 2.8vw, 2.25rem)",
              margin: "0 0 20px",
            }}
          >
            What are Core Web Vitals?
          </h2>
          <div
            style={{
              color: "var(--text-muted)",
              fontSize: 16,
              lineHeight: 1.7,
              display: "flex",
              flexDirection: "column",
              gap: 14,
            }}
          >
            <p style={{ margin: 0 }}>
              Core Web Vitals are a set of real-world metrics Google uses to
              measure user experience on the web. They directly factor into
              Google&apos;s page experience ranking signal, meaning a slow site can
              cost you search rankings — even if everything else is in order.
            </p>
            <p style={{ margin: 0 }}>
              The three key metrics are LCP (how fast your main content appears),
              INP (how responsive the page is to clicks and taps), and CLS (how
              much the layout shifts as things load). Each has clear thresholds:
              good, needs improvement, and poor.
            </p>
            <p style={{ margin: 0 }}>
              For local Melbourne businesses, mobile performance is especially
              critical — most searches happen on phones, often on 4G connections.
              If your site scores below 70 on mobile, you&apos;re likely losing
              visitors before they ever read your offer.
            </p>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {[
            {
              metric: "LCP",
              full: "Largest Contentful Paint",
              good: "< 2.5 s",
              poor: "> 4 s",
              what: "Time until the largest visible element (hero image, headline) fully loads. Directly affects perceived speed.",
            },
            {
              metric: "INP",
              full: "Interaction to Next Paint",
              good: "< 200 ms",
              poor: "> 500 ms",
              what: "Time from a user action (click, tap, keypress) to the next visual update. High INP makes pages feel sluggish.",
            },
            {
              metric: "CLS",
              full: "Cumulative Layout Shift",
              good: "< 0.1",
              poor: "> 0.25",
              what: "Measures visual instability — buttons jumping, text reflowing. Causes accidental clicks and frustration.",
            },
          ].map((m) => (
            <div
              key={m.metric}
              style={{
                padding: "20px 24px",
                border: "1px solid var(--border)",
                borderRadius: "var(--radius-lg)",
                background: "var(--surface)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "baseline",
                  gap: 10,
                  marginBottom: 6,
                }}
              >
                <span
                  className="cp-num"
                  style={{
                    fontSize: 16,
                    fontWeight: 700,
                    color: "var(--accent)",
                  }}
                >
                  {m.metric}
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-mono), monospace",
                    fontSize: 10,
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                    color: "var(--text-dim)",
                  }}
                >
                  {m.full}
                </span>
              </div>
              <p
                style={{
                  margin: "0 0 10px",
                  fontSize: 14,
                  color: "var(--text-muted)",
                  lineHeight: 1.55,
                }}
              >
                {m.what}
              </p>
              <div style={{ display: "flex", gap: 10 }}>
                <span
                  style={{
                    fontFamily: "var(--font-mono), monospace",
                    fontSize: 10,
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                    padding: "2px 8px",
                    borderRadius: 999,
                    background: "#22c55e18",
                    color: "#22c55e",
                    border: "1px solid #22c55e40",
                  }}
                >
                  Good {m.good}
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-mono), monospace",
                    fontSize: 10,
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                    padding: "2px 8px",
                    borderRadius: 999,
                    background: "#ef444418",
                    color: "#ef4444",
                    border: "1px solid #ef444440",
                  }}
                >
                  Poor {m.poor}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>

      <FinalCTA />
      <Footer />
    </>
  );
}
