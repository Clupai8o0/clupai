"use client";

import { useState } from "react";
import Link from "next/link";
import Nav from "@/components/nav";
import Footer from "@/components/footer";
import FinalCTA from "@/components/final-cta";
import Placeholder from "@/components/placeholder";
import { visibleCases as cases } from "@/data/cases";

const filters = ["All", "Websites", "Apps", "SEO", "Automation"];

export default function WorkPage() {
  const [active, setActive] = useState("All");

  const visible =
    active === "All" ? cases : cases.filter((c) => c.tag === active);

  return (
    <>
      <Nav page="work" />

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
              Work · real projects · real numbers
            </div>
            <h1
              className="cp-display"
              style={{ fontSize: "clamp(3rem, 6vw, 5.5rem)", margin: 0 }}
            >
              Ten builds.
              <br />
              <span style={{ color: "var(--accent)" }}>
                Seven worth showing.
              </span>
            </h1>
          </div>
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setActive(f)}
                className="cp-filter-btn"
                style={{
                  background:
                    active === f ? "var(--accent)" : "transparent",
                  color:
                    active === f ? "var(--accent-ink)" : undefined,
                  borderColor:
                    active === f ? "var(--accent)" : undefined,
                }}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="cp-work-grid">
        {visible.map((c, i) => (
          <Link
            key={`${c.slug}-${active}`}
            href={`/work/${c.slug}`}
            className="cp-work-card cp-work-card-in"
            style={{ animationDelay: `${i * 0.06}s` }}
          >
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span className="cp-mono">{c.tag}</span>
              <span className="cp-mono">{c.year}</span>
            </div>
            {(() => {
              const src = c.thumbnail ?? c.media?.find(m => m.type === "image")?.src;
              return src ? (
                <img
                  src={src}
                  alt={c.client}
                  style={{ width: "100%", height: 160, objectFit: "cover", display: "block", marginTop: 20 }}
                />
              ) : (
                <Placeholder label={`${c.client} hero`} h={160} style={{ marginTop: 20 }} />
              );
            })()}
            <div
              className="cp-num cp-work-stat"
              style={{
                fontSize: 72,
                color: "var(--accent)",
                letterSpacing: "-0.05em",
                marginTop: 28,
                lineHeight: 0.9,
              }}
            >
              {c.stat}
            </div>
            <div
              className="cp-mono"
              style={{ color: "var(--text-muted)", marginTop: 4 }}
            >
              {c.sstat}
            </div>
            <div
              style={{
                fontFamily:
                  "var(--font-display), Manrope, ui-sans-serif, system-ui, sans-serif",
                fontWeight: 700,
                fontSize: 22,
                letterSpacing: "-0.02em",
                marginTop: 24,
              }}
            >
              {c.client}
            </div>
            <div
              className="cp-mono"
              style={{ color: "var(--text-muted)", marginTop: 4 }}
            >
              {c.kind}
            </div>
            <div
              style={{
                marginTop: "auto",
                paddingTop: 20,
                color: "var(--accent)",
                fontFamily:
                  "var(--font-display), Manrope, ui-sans-serif, system-ui, sans-serif",
                fontWeight: 500,
                fontSize: 14,
                display: "flex",
                alignItems: "center",
                gap: 6,
              }}
            >
              Read case study{" "}
              <span className="cp-work-arrow">→</span>
            </div>
          </Link>
        ))}
      </div>

      <FinalCTA />
      <Footer />
    </>
  );
}
