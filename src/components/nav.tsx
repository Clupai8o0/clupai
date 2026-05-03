"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Logomark from "./logomark";

const links = [
  { n: "04", label: "Services", href: "/services" },
  { n: "02", label: "Work", href: "/work" },
  { n: "03", label: "Pricing", href: "/pricing" },
  { n: "11", label: "Writing", href: "/writing" },
  { n: "01", label: "About", href: "/about" },
];

export default function Nav({ page }: { page?: string }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <nav
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "22px 48px",
          borderBottom: "1px solid var(--border)",
          position: "sticky",
          top: 0,
          background: "rgba(5,5,5,0.85)",
          backdropFilter: "blur(14px)",
          zIndex: 50,
          gap: 16,
        }}
      >
        <Link
          href="/"
          onClick={() => setOpen(false)}
          style={{ display: "flex", alignItems: "center", gap: 10, minWidth: 0 }}
        >
          <Logomark />
          <span
            style={{
              fontFamily:
                "var(--font-display), Manrope, ui-sans-serif, system-ui, sans-serif",
              fontWeight: 700,
              fontSize: 18,
              letterSpacing: "-0.02em",
            }}
          >
            clupai
          </span>
          <span className="cp-mono" style={{ marginLeft: 10, opacity: 0.7 }}>
            MEL · AU
          </span>
        </Link>

        <ul
          className="cp-nav-links"
          style={{
            display: "flex",
            gap: 28,
            listStyle: "none",
            padding: 0,
            margin: 0,
          }}
        >
          {links.map((l) => (
            <li
              key={l.label}
              style={{ display: "flex", alignItems: "baseline", gap: 6 }}
            >
              <span
                className="cp-mono"
                style={{ color: "var(--text-dim)", fontSize: 10 }}
              >
                ({l.n})
              </span>
              <Link
                href={l.href}
                style={{
                  fontFamily:
                    "var(--font-display), Manrope, ui-sans-serif, system-ui, sans-serif",
                  fontWeight: 500,
                  fontSize: 15,
                  letterSpacing: "-0.01em",
                  color:
                    page === l.label.toLowerCase()
                      ? "var(--accent)"
                      : "var(--text)",
                }}
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <Link
          href="/contact"
          className="cp-btn cp-btn-primary cp-nav-cta"
        >
          Book a call
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
        </Link>

        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          className="cp-nav-toggle"
          onClick={() => setOpen((v) => !v)}
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
          >
            {open ? (
              <path d="M3 3l12 12M15 3L3 15" />
            ) : (
              <path d="M2 5h14M2 9h14M2 13h14" />
            )}
          </svg>
        </button>
      </nav>

      <div className={`cp-mobile-menu${open ? " open" : ""}`}>
        {links.map((l) => (
          <Link
            key={l.label}
            href={l.href}
            onClick={() => setOpen(false)}
            style={{
              color:
                page === l.label.toLowerCase() ? "var(--accent)" : "var(--text)",
            }}
          >
            <span className="num">({l.n})</span>
            {l.label}
          </Link>
        ))}
        <Link href="/contact" onClick={() => setOpen(false)} className="cta">
          Book a call →
        </Link>
      </div>
    </>
  );
}
