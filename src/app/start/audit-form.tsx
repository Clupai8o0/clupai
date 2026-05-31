"use client";

import { useState } from "react";

const DISPLAY = "var(--font-display), Manrope, ui-sans-serif, system-ui, sans-serif";
const BODY = "var(--font-body), Inter, ui-sans-serif, system-ui, sans-serif";
const MONO = 'var(--font-mono), "JetBrains Mono", ui-monospace, monospace';

type State = "idle" | "sending" | "sent" | "error";

export default function AuditForm() {
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");
  const [focused, setFocused] = useState(false);
  const [webFocused, setWebFocused] = useState(false);
  const [state, setState] = useState<State>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setState("sending");
    setErrorMsg("");

    try {
      const res = await fetch("/api/start-capture", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, website }),
      });
      const data = await res.json();

      if (res.ok) {
        setState("sent");
      } else {
        setErrorMsg(data.error ?? "Something went wrong — please email hello@clupai.com");
        setState("error");
      }
    } catch {
      setErrorMsg("Network error — please try again or email hello@clupai.com");
      setState("error");
    }
  }

  if (state === "sent") {
    return (
      <div
        style={{
          padding: "28px 24px",
          border: "1px solid var(--border)",
          borderRadius: "var(--radius-lg)",
          display: "flex",
          alignItems: "center",
          gap: 14,
        }}
      >
        <div
          style={{
            width: 36,
            height: 36,
            borderRadius: "50%",
            background: "rgba(77,163,255,0.08)",
            border: "1px solid var(--accent)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "var(--accent)",
            flexShrink: 0,
          }}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M2 7l4 4 6-7" />
          </svg>
        </div>
        <div style={{ fontFamily: DISPLAY, fontWeight: 700, fontSize: 18, letterSpacing: "-0.02em" }}>
          On it. Your audit lands within one AU business day.
        </div>
      </div>
    );
  }

  const sending = state === "sending";

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <input
        type="text"
        inputMode="url"
        disabled={sending}
        value={website}
        onChange={(e) => setWebsite(e.target.value)}
        placeholder="yourwebsite.com.au — the site you want audited"
        aria-label="Your website"
        onFocus={() => setWebFocused(true)}
        onBlur={() => setWebFocused(false)}
        style={{
          width: "100%",
          background: "var(--bg)",
          border: `1px solid ${webFocused ? "var(--accent)" : "var(--border-2)"}`,
          padding: "14px 16px",
          color: "var(--text)",
          fontFamily: BODY,
          fontSize: 15,
          borderRadius: "var(--radius)",
          outline: "none",
          transition: "border-color 0.15s",
        }}
      />
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
        <input
          type="email"
          required
          disabled={sending}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@domain.com"
          aria-label="Your email"
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={{
            flex: "1 1 240px",
            minWidth: 0,
            background: "var(--bg)",
            border: `1px solid ${focused ? "var(--accent)" : "var(--border-2)"}`,
            padding: "14px 16px",
            color: "var(--text)",
            fontFamily: BODY,
            fontSize: 15,
            borderRadius: "var(--radius)",
            outline: "none",
            transition: "border-color 0.15s",
          }}
        />
        <button
          type="submit"
          disabled={sending}
          className="cp-btn cp-btn-primary cp-btn-lg"
          style={{
            justifyContent: "center",
            opacity: sending ? 0.6 : 1,
            cursor: sending ? "not-allowed" : "pointer",
          }}
        >
          {sending ? "Sending..." : "Send me the audit"}
          {!sending && (
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M2 7h10M8 3l4 4-4 4" />
            </svg>
          )}
        </button>
      </div>

      {state === "error" && (
        <div
          style={{
            fontFamily: MONO,
            fontSize: 10,
            letterSpacing: "0.06em",
            color: "#ff6b6b",
            padding: "8px 10px",
            background: "rgba(255,107,107,0.06)",
            borderLeft: "2px solid #ff6b6b",
          }}
        >
          {errorMsg}
        </div>
      )}

      <div style={{ fontFamily: MONO, fontSize: 10, letterSpacing: "0.08em", color: "var(--text-dim)" }}>
        No spam. Unsubscribe any time.
      </div>
    </form>
  );
}
