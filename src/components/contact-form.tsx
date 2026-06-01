"use client";

import { useEffect, useRef, useState } from "react";
import { Turnstile, type TurnstileInstance } from "@marsidev/react-turnstile";

const SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? "";

const DISPLAY = "var(--font-display), Manrope, ui-sans-serif, system-ui, sans-serif";
const BODY = "var(--font-body), Inter, ui-sans-serif, system-ui, sans-serif";
const MONO = 'var(--font-mono), "JetBrains Mono", ui-monospace, monospace';

const labelStyle: React.CSSProperties = {
  fontFamily: MONO,
  fontSize: 10,
  letterSpacing: "0.08em",
  textTransform: "uppercase",
  color: "var(--text-muted)",
  display: "block",
  marginBottom: 6,
};

function fieldStyle(focused: boolean): React.CSSProperties {
  return {
    display: "block",
    width: "100%",
    background: "var(--bg)",
    border: `1px solid ${focused ? "var(--accent)" : "var(--border-2)"}`,
    padding: "12px 14px",
    color: "var(--text)",
    fontFamily: BODY,
    fontSize: 15,
    borderRadius: "var(--radius)",
    outline: "none",
    transition: "border-color 0.15s",
    resize: "vertical" as const,
  };
}

type State = "idle" | "sending" | "sent" | "error";

export default function ContactForm() {
  const formLoadedAt = useRef(Date.now());
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [website, setWebsite] = useState("");
  const [turnstileToken, setTurnstileToken] = useState("");
  const turnstileRef = useRef<TurnstileInstance>(null);
  const [focused, setFocused] = useState<string | null>(null);
  const [state, setState] = useState<State>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    formLoadedAt.current = Date.now();
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setState("sending");
    setErrorMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          company,
          email,
          message,
          website,
          formLoadedAt: formLoadedAt.current,
          ...(SITE_KEY ? { turnstileToken } : {}),
        }),
      });
      const data = await res.json();

      if (res.ok) {
        setState("sent");
      } else {
        setErrorMsg(data.error ?? "Something went wrong — please email hello@clupai.com");
        setState("error");
        turnstileRef.current?.reset();
        setTurnstileToken("");
      }
    } catch {
      setErrorMsg("Network error — please try again or email hello@clupai.com");
      setState("error");
      turnstileRef.current?.reset();
      setTurnstileToken("");
    }
  }

  if (state === "sent") {
    return (
      <div
        style={{
          padding: "32px 24px",
          border: "1px solid var(--border)",
          borderRadius: "var(--radius-lg)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            marginBottom: 12,
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
          <div
            style={{
              fontFamily: DISPLAY,
              fontWeight: 700,
              fontSize: 18,
              letterSpacing: "-0.02em",
            }}
          >
            Sent. I&apos;ll reply within one AU business day.
          </div>
        </div>
        <div style={{ color: "var(--text-muted)", fontSize: 14, lineHeight: 1.5, paddingLeft: 48 }}>
          Check your inbox — a copy has been sent to {email}.
        </div>
      </div>
    );
  }

  const sending = state === "sending";

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      {/* Honeypot — leave empty */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          left: "-9999px",
          width: 1,
          height: 1,
          overflow: "hidden",
        }}
      >
        <label htmlFor="cf-website">Website</label>
        <input
          id="cf-website"
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
        />
      </div>

      <div>
        <label style={labelStyle} htmlFor="cf-name">
          Your name<span style={{ color: "var(--accent)", marginLeft: 3 }}>*</span>
        </label>
        <input
          id="cf-name"
          type="text"
          required
          disabled={sending}
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Alex Chen"
          onFocus={() => setFocused("name")}
          onBlur={() => setFocused(null)}
          style={fieldStyle(focused === "name")}
        />
      </div>

      <div>
        <label style={labelStyle} htmlFor="cf-company">
          Company
        </label>
        <input
          id="cf-company"
          type="text"
          disabled={sending}
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          placeholder="optional"
          onFocus={() => setFocused("company")}
          onBlur={() => setFocused(null)}
          style={fieldStyle(focused === "company")}
        />
      </div>

      <div>
        <label style={labelStyle} htmlFor="cf-email">
          Email<span style={{ color: "var(--accent)", marginLeft: 3 }}>*</span>
        </label>
        <input
          id="cf-email"
          type="email"
          required
          disabled={sending}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@domain.com"
          onFocus={() => setFocused("email")}
          onBlur={() => setFocused(null)}
          style={fieldStyle(focused === "email")}
        />
      </div>

      <div>
        <label style={labelStyle} htmlFor="cf-message">
          What are you trying to sell?<span style={{ color: "var(--accent)", marginLeft: 3 }}>*</span>
        </label>
        <textarea
          id="cf-message"
          required
          rows={5}
          disabled={sending}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Tell us what you're working on and what you need."
          onFocus={() => setFocused("message")}
          onBlur={() => setFocused(null)}
          style={fieldStyle(focused === "message")}
        />
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

      {SITE_KEY && (
        <Turnstile
          ref={turnstileRef}
          siteKey={SITE_KEY}
          onSuccess={setTurnstileToken}
          onExpire={() => setTurnstileToken("")}
          options={{ theme: "dark" }}
        />
      )}

      <button
        type="submit"
        disabled={sending || (!!SITE_KEY && !turnstileToken)}
        className="cp-btn cp-btn-primary cp-btn-lg"
        style={{
          justifyContent: "center",
          opacity: sending || (!!SITE_KEY && !turnstileToken) ? 0.6 : 1,
          cursor: sending || (!!SITE_KEY && !turnstileToken) ? "not-allowed" : "pointer",
        }}
      >
        {sending ? "Sending..." : "Send →"}
      </button>

      <div className="cp-mono" style={{ color: "var(--text-muted)" }}>
        Or just:{" "}
        <a href="mailto:hello@clupai.com" style={{ color: "var(--accent)" }}>
          hello@clupai.com
        </a>
      </div>
    </form>
  );
}
