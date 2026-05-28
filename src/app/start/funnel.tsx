"use client";

import { useState } from "react";
import Link from "next/link";
import { TIERS, SERVICE_PRICES } from "@/data/pricing";
import { SERVICE_DATA } from "@/data/services";

const DISPLAY =
  "var(--font-display), Manrope, ui-sans-serif, system-ui, sans-serif";
const BODY = "var(--font-body), Inter, ui-sans-serif, system-ui, sans-serif";
const MONO = 'var(--font-mono), "JetBrains Mono", ui-monospace, monospace';

type Answers = {
  goal?: string;
  situation?: string;
  timeline?: string;
  budget?: string;
};

type QuizStep = {
  key: keyof Answers;
  eyebrow: string;
  title: string;
  options: { id: string; label: string; hint?: string }[];
};

const QUIZ: QuizStep[] = [
  {
    key: "goal",
    eyebrow: "01 · What brings you here",
    title: "What do you need most right now?",
    options: [
      { id: "web", label: "More customers from my website", hint: "A new site or a rebuild that actually converts" },
      { id: "seo", label: "Show up higher on Google", hint: "Local + technical SEO, content that ranks" },
      { id: "automation", label: "Automate the manual work", hint: "Connect my tools, kill the copy-paste" },
      { id: "operator", label: "An ongoing partner across all of it", hint: "Web, SEO + automation, month to month" },
      { id: "custom", label: "Something custom", hint: "App, platform, internal tool, integration" },
    ],
  },
  {
    key: "situation",
    eyebrow: "02 · Where you're at",
    title: "What's the situation today?",
    options: [
      { id: "scratch", label: "Starting from scratch", hint: "Nothing live yet" },
      { id: "underperforming", label: "I have something — it underperforms", hint: "Live, but not pulling its weight" },
      { id: "grow", label: "Solid base, want to grow", hint: "Working — I want more out of it" },
    ],
  },
  {
    key: "timeline",
    eyebrow: "03 · Timing",
    title: "When do you want this moving?",
    options: [
      { id: "asap", label: "ASAP — it's urgent", hint: "Ready to start now" },
      { id: "soon", label: "Next 1–3 months", hint: "Planning ahead" },
      { id: "exploring", label: "Just exploring", hint: "Scoping options" },
    ],
  },
  {
    key: "budget",
    eyebrow: "04 · Budget",
    title: "Roughly what budget are you working with?",
    options: [
      { id: "u3", label: "Under $3k" },
      { id: "3-8", label: "$3k – $8k" },
      { id: "8-20", label: "$8k – $20k" },
      { id: "20+", label: "$20k+" },
      { id: "unsure", label: "Not sure yet", hint: "We'll help you figure it out" },
    ],
  },
];

type Reco = {
  service: string;
  approach: string;
  pitch: string;
  included: string[];
  price: string;
  priceSub: string;
  highlight?: string; // tier name to highlight in the comparison
};

const tier = (name: string) => TIERS.find((t) => t.name === name)!;

function recommend(a: Answers): Reco {
  switch (a.goal) {
    case "web": {
      const big = a.budget === "8-20" || a.budget === "20+" || a.situation === "grow";
      const t = big ? tier("Growth") : tier("Launch");
      return {
        service: "Websites",
        approach: `${t.name} build`,
        pitch: t.pitch,
        included: t.bullets.slice(0, 5),
        price: t.price,
        priceSub: t.sub,
        highlight: t.name,
      };
    }
    case "seo": {
      const d = SERVICE_DATA.seo;
      return {
        service: "SEO",
        approach: "Local + technical SEO retainer",
        pitch: d.problem,
        included: d.included.slice(0, 5),
        price: SERVICE_PRICES.seo.display,
        priceSub: SERVICE_PRICES.seo.sub,
      };
    }
    case "automation": {
      const d = SERVICE_DATA.automation;
      return {
        service: "Automation",
        approach: "Fixed-scope automation build",
        pitch: d.problem,
        included: d.included.slice(0, 5),
        price: SERVICE_PRICES.automation.display,
        priceSub: SERVICE_PRICES.automation.sub,
      };
    }
    case "operator": {
      const t = tier("Operator");
      return {
        service: "Operator retainer",
        approach: `${t.name} — your product & engineering hire`,
        pitch: t.pitch,
        included: t.bullets.slice(0, 5),
        price: t.price,
        priceSub: t.sub,
        highlight: t.name,
      };
    }
    default:
      return {
        service: "Custom build",
        approach: "Scoped per project",
        pitch:
          "Custom software, internal tools, platforms, weird integrations. Quoted per project because they should be.",
        included: [
          "Scoped on a 20-minute call",
          "Fixed quote before we start",
          "You own the code and the accounts",
          "Shipped in focused sprints",
        ],
        price: "Custom quote",
        priceSub: "quoted per project · 2–8 weeks",
      };
  }
}

const SOLUTION = QUIZ.length; // 4
const CONTACT = QUIZ.length + 1; // 5
const PRICING = QUIZ.length + 2; // 6

const arrow = (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M2 7h10M8 3l4 4-4 4" />
  </svg>
);

function Input({
  label,
  value,
  onChange,
  type = "text",
  required = false,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  required?: boolean;
  placeholder?: string;
}) {
  const [focused, setFocused] = useState(false);
  return (
    <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <span className="cp-mono" style={{ color: "var(--text-muted)" }}>
        {label}
        {required && <span style={{ color: "var(--accent)" }}> *</span>}
      </span>
      <input
        type={type}
        required={required}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{
          background: "var(--bg)",
          border: `1px solid ${focused ? "var(--accent)" : "var(--border-2)"}`,
          padding: "13px 15px",
          color: "var(--text)",
          fontFamily: BODY,
          fontSize: 15,
          borderRadius: "var(--radius)",
          outline: "none",
          transition: "border-color 0.15s",
          width: "100%",
        }}
      />
    </label>
  );
}

export default function Funnel() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [contact, setContact] = useState({
    name: "",
    email: "",
    business: "",
    phone: "",
    message: "",
  });
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  const reco = recommend(answers);

  function pick(key: keyof Answers, value: string) {
    setAnswers((p) => ({ ...p, [key]: value }));
    setStep((s) => s + 1);
  }

  function back() {
    setStep((s) => Math.max(0, s - 1));
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setSending(true);
    setError("");
    try {
      const res = await fetch("/api/start-capture", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...contact, ...answers }),
      });
      const data = await res.json();
      if (res.ok) {
        setStep(PRICING);
      } else {
        setError(data.error ?? "Something went wrong — email hello@clupai.com");
      }
    } catch {
      setError("Network error — try again or email hello@clupai.com");
    } finally {
      setSending(false);
    }
  }

  const isQuiz = step < SOLUTION;
  const progress = Math.min(step, QUIZ.length) / QUIZ.length;

  return (
    <div
      className="cp-card"
      style={{
        padding: "clamp(28px, 4vw, 48px)",
        maxWidth: 820,
        margin: "0 auto",
        minHeight: 520,
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Progress */}
      {isQuiz && (
        <div style={{ marginBottom: 32 }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: 10,
            }}
          >
            <span className="cp-mono" style={{ color: "var(--text-muted)" }}>
              Step {step + 1} of {QUIZ.length}
            </span>
            <span className="cp-mono" style={{ color: "var(--text-dim)" }}>
              ~30 seconds
            </span>
          </div>
          <div
            style={{
              height: 3,
              background: "var(--border-2)",
              borderRadius: 999,
              overflow: "hidden",
            }}
          >
            <div
              style={{
                height: "100%",
                width: `${progress * 100}%`,
                background: "var(--accent)",
                borderRadius: 999,
                transition: "width 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
              }}
            />
          </div>
        </div>
      )}

      {/* Quiz steps */}
      {isQuiz && (
        <div key={step} style={{ animation: "cp-fade-up 0.4s cubic-bezier(0.16,1,0.3,1) both" }}>
          <div className="cp-eyebrow" style={{ marginBottom: 12 }}>
            {QUIZ[step].eyebrow}
          </div>
          <h2
            className="cp-display"
            style={{ fontSize: "clamp(1.6rem, 3.4vw, 2.4rem)", margin: "0 0 28px", letterSpacing: "-0.02em" }}
          >
            {QUIZ[step].title}
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {QUIZ[step].options.map((o) => {
              const selected = answers[QUIZ[step].key] === o.id;
              return (
                <button
                  key={o.id}
                  type="button"
                  onClick={() => pick(QUIZ[step].key, o.id)}
                  className="cp-funnel-option"
                  style={{
                    textAlign: "left",
                    background: selected ? "rgba(77,163,255,0.08)" : "var(--surface-2)",
                    border: `1px solid ${selected ? "var(--accent)" : "var(--border)"}`,
                    borderRadius: "var(--radius)",
                    padding: "16px 18px",
                    cursor: "pointer",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: 16,
                    transition: "border-color 0.15s, background 0.15s",
                  }}
                >
                  <span style={{ minWidth: 0 }}>
                    <span
                      style={{
                        display: "block",
                        fontFamily: DISPLAY,
                        fontWeight: 600,
                        fontSize: 16,
                        letterSpacing: "-0.01em",
                        color: "var(--text)",
                      }}
                    >
                      {o.label}
                    </span>
                    {o.hint && (
                      <span
                        style={{
                          display: "block",
                          marginTop: 3,
                          fontSize: 13,
                          color: "var(--text-muted)",
                        }}
                      >
                        {o.hint}
                      </span>
                    )}
                  </span>
                  <span style={{ color: "var(--accent)", flexShrink: 0 }}>{arrow}</span>
                </button>
              );
            })}
          </div>
          {step > 0 && (
            <button
              type="button"
              onClick={back}
              className="cp-mono"
              style={{
                marginTop: 24,
                background: "none",
                border: "none",
                color: "var(--text-muted)",
                cursor: "pointer",
                padding: 0,
              }}
            >
              ← Back
            </button>
          )}
        </div>
      )}

      {/* Solution (qualitative — no price yet) */}
      {step === SOLUTION && (
        <div style={{ animation: "cp-fade-up 0.4s cubic-bezier(0.16,1,0.3,1) both" }}>
          <div className="cp-eyebrow" style={{ marginBottom: 12 }}>
            Your recommended path
          </div>
          <h2
            className="cp-display"
            style={{ fontSize: "clamp(1.7rem, 3.6vw, 2.6rem)", margin: "0 0 8px", letterSpacing: "-0.02em" }}
          >
            {reco.approach}.
          </h2>
          <p style={{ color: "var(--text-muted)", fontSize: 16, lineHeight: 1.6, margin: "0 0 24px", maxWidth: 620 }}>
            {reco.pitch}
          </p>
          <div
            style={{
              padding: "20px 22px",
              background: "var(--surface-2)",
              borderLeft: "2px solid var(--accent)",
              borderRadius: "0 var(--radius) var(--radius) 0",
            }}
          >
            <div className="cp-mono" style={{ color: "var(--text-muted)", marginBottom: 12 }}>
              What that includes
            </div>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 10 }}>
              {reco.included.map((b) => (
                <li key={b} style={{ display: "flex", gap: 10, fontSize: 14, lineHeight: 1.5, color: "var(--text)" }}>
                  <span style={{ color: "var(--accent)", flexShrink: 0 }}>✓</span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>
          <div style={{ display: "flex", gap: 12, marginTop: 28, flexWrap: "wrap", alignItems: "center" }}>
            <button
              type="button"
              onClick={() => setStep(CONTACT)}
              className="cp-btn cp-btn-primary cp-btn-lg"
            >
              See my pricing {arrow}
            </button>
            <button
              type="button"
              onClick={back}
              className="cp-mono"
              style={{ background: "none", border: "none", color: "var(--text-muted)", cursor: "pointer" }}
            >
              ← Back
            </button>
          </div>
          <p className="cp-mono" style={{ marginTop: 16, color: "var(--text-dim)" }}>
            Pricing&apos;s on the next screen — we just need a way to send it to you.
          </p>
        </div>
      )}

      {/* Contact capture */}
      {step === CONTACT && (
        <form onSubmit={submit} style={{ animation: "cp-fade-up 0.4s cubic-bezier(0.16,1,0.3,1) both" }}>
          <div className="cp-eyebrow" style={{ marginBottom: 12 }}>
            Almost there
          </div>
          <h2
            className="cp-display"
            style={{ fontSize: "clamp(1.7rem, 3.6vw, 2.6rem)", margin: "0 0 8px", letterSpacing: "-0.02em" }}
          >
            Where should we send your pricing?
          </h2>
          <p style={{ color: "var(--text-muted)", fontSize: 15, lineHeight: 1.55, margin: "0 0 28px", maxWidth: 560 }}>
            You&apos;ll see your numbers on the next screen, and we&apos;ll follow
            up with a tailored quote within one Australian business day.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            <Input label="Name" value={contact.name} onChange={(v) => setContact((c) => ({ ...c, name: v }))} required placeholder="Your name" />
            <Input label="Email" type="email" value={contact.email} onChange={(v) => setContact((c) => ({ ...c, email: v }))} required placeholder="you@domain.com" />
            <Input label="Business" value={contact.business} onChange={(v) => setContact((c) => ({ ...c, business: v }))} placeholder="Business name (optional)" />
            <Input label="Phone" type="tel" value={contact.phone} onChange={(v) => setContact((c) => ({ ...c, phone: v }))} placeholder="Optional" />
          </div>
          <div style={{ marginTop: 16 }}>
            <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <span className="cp-mono" style={{ color: "var(--text-muted)" }}>
                Anything we should know?
              </span>
              <textarea
                value={contact.message}
                onChange={(e) => setContact((c) => ({ ...c, message: e.target.value }))}
                rows={3}
                placeholder="A sentence on the project (optional)"
                style={{
                  background: "var(--bg)",
                  border: "1px solid var(--border-2)",
                  padding: "13px 15px",
                  color: "var(--text)",
                  fontFamily: BODY,
                  fontSize: 15,
                  borderRadius: "var(--radius)",
                  outline: "none",
                  resize: "vertical",
                  width: "100%",
                }}
              />
            </label>
          </div>

          {error && (
            <div
              style={{
                marginTop: 16,
                fontFamily: MONO,
                fontSize: 10,
                letterSpacing: "0.06em",
                color: "#ff6b6b",
                padding: "8px 10px",
                background: "rgba(255,107,107,0.06)",
                borderLeft: "2px solid #ff6b6b",
              }}
            >
              {error}
            </div>
          )}

          <div style={{ display: "flex", gap: 12, marginTop: 24, flexWrap: "wrap", alignItems: "center" }}>
            <button
              type="submit"
              disabled={sending}
              className="cp-btn cp-btn-primary cp-btn-lg"
              style={{ opacity: sending ? 0.6 : 1, cursor: sending ? "not-allowed" : "pointer" }}
            >
              {sending ? "Sending..." : "Show my pricing"}
              {!sending && arrow}
            </button>
            <button
              type="button"
              onClick={back}
              className="cp-mono"
              style={{ background: "none", border: "none", color: "var(--text-muted)", cursor: "pointer" }}
            >
              ← Back
            </button>
          </div>
          <p className="cp-mono" style={{ marginTop: 16, color: "var(--text-dim)" }}>
            No spam. One human reply within 1 AU business day.
          </p>
        </form>
      )}

      {/* Pricing reveal (gated — after capture) */}
      {step === PRICING && (
        <div style={{ animation: "cp-fade-up 0.45s cubic-bezier(0.16,1,0.3,1) both" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              padding: "12px 16px",
              border: "1px solid var(--accent)",
              background: "rgba(77,163,255,0.06)",
              borderRadius: "var(--radius)",
              marginBottom: 32,
            }}
          >
            <span style={{ color: "var(--accent)" }}>
              <svg width="16" height="16" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M2 7l4 4 6-7" />
              </svg>
            </span>
            <span style={{ fontFamily: DISPLAY, fontWeight: 600, fontSize: 15 }}>
              Thanks{contact.name ? `, ${contact.name.split(" ")[0]}` : ""} — your details are in. Here&apos;s where you&apos;d land.
            </span>
          </div>

          {/* Recommended */}
          <div
            style={{
              background: "var(--accent)",
              color: "var(--accent-ink)",
              borderRadius: "var(--radius-lg)",
              padding: "32px 30px",
            }}
          >
            <div className="cp-mono" style={{ color: "rgba(5,5,5,0.6)", marginBottom: 10 }}>
              Recommended · {reco.service}
            </div>
            <div className="cp-num" style={{ fontSize: 64, letterSpacing: "-0.04em", lineHeight: 1 }}>
              {reco.price}
            </div>
            <div className="cp-mono" style={{ color: "rgba(5,5,5,0.65)", marginTop: 8 }}>
              {reco.priceSub}
            </div>
            <p style={{ marginTop: 18, fontSize: 15, lineHeight: 1.5, fontFamily: DISPLAY, fontWeight: 500, maxWidth: 560 }}>
              {reco.pitch}
            </p>
            <Link
              href="#book"
              className="cp-btn cp-btn-lg"
              style={{
                marginTop: 20,
                background: "var(--bg)",
                color: "var(--accent)",
                justifyContent: "center",
                display: "inline-flex",
              }}
            >
              Book a call to lock the scope {arrow}
            </Link>
          </div>

          {/* Full range */}
          <div className="cp-mono" style={{ margin: "32px 0 16px", color: "var(--text-muted)" }}>
            Or compare the full range
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 12 }}>
            {TIERS.map((t) => {
              const hot = reco.highlight === t.name;
              return (
                <div
                  key={t.name}
                  style={{
                    background: "var(--surface-2)",
                    border: `1px solid ${hot ? "var(--accent)" : "var(--border)"}`,
                    borderRadius: "var(--radius)",
                    padding: "20px 18px",
                  }}
                >
                  <div className="cp-mono" style={{ color: "var(--text-muted)", marginBottom: 8 }}>
                    {t.name.toUpperCase()}
                  </div>
                  <div className="cp-num" style={{ fontSize: 34, letterSpacing: "-0.03em", lineHeight: 1 }}>
                    {t.price}
                  </div>
                  <div className="cp-mono" style={{ color: "var(--text-dim)", marginTop: 6 }}>
                    {t.sub}
                  </div>
                </div>
              );
            })}
          </div>
          <p className="cp-mono" style={{ marginTop: 20, color: "var(--text-dim)", lineHeight: 1.6 }}>
            All prices AUD · GST exclusive · fixed quote confirmed before any work starts. Custom builds quoted per project.
          </p>
        </div>
      )}
    </div>
  );
}
