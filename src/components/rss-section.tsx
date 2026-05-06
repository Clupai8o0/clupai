"use client";

import { useState } from "react";

export default function RssSection() {
  const [copied, setCopied] = useState(false);

  function handleCopy() {
    navigator.clipboard.writeText("https://clupai.com/writing.xml").then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  return (
    <div
      className="px-6 md:px-12 py-12 flex flex-col md:flex-row md:justify-between md:items-center gap-6"
      style={{ borderTop: "1px solid var(--border)" }}
    >
      <div>
        <div className="cp-mono mb-1">Subscribe · no newsletter theatre</div>
        <div
          style={{
            fontFamily: "var(--font-display), Manrope, ui-sans-serif, system-ui, sans-serif",
            fontSize: "clamp(16px, 2vw, 20px)",
            fontWeight: 500,
            letterSpacing: "-0.01em",
          }}
        >
          RSS ·{" "}
          <span style={{ color: "var(--text-muted)" }}>clupai.com/writing.xml</span>
        </div>
      </div>
      <div className="flex gap-3 flex-wrap">
        <button
          className="cp-btn cp-btn-ghost"
          onClick={handleCopy}
          style={{
            transform: copied ? "scale(0.97)" : "scale(1)",
            transition: "transform 0.12s ease, border-color 0.18s ease",
            borderColor: copied ? "var(--accent)" : undefined,
            color: copied ? "var(--accent)" : undefined,
          }}
        >
          {copied ? "Copied!" : "Copy RSS URL"}
        </button>
        <a
          href="mailto:hello@clupai.com?subject=Notify%20me%20when%20you%20post"
          className="cp-btn cp-btn-ghost"
        >
          Email when we post
        </a>
      </div>
    </div>
  );
}
