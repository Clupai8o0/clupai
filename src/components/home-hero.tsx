"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import RotatingText from "@/components/rotating-text";
import SocialLinks from "@/components/social-links";
import FunnelModal from "@/components/funnel-modal";

const HERO_WORDS = ["customers", "bookings", "revenue", "pipeline", "leads"];

// The home page hero. It is the only client part of the home page: the
// rotating word, the scroll cue and the "Find your fit" funnel modal.
export default function HomeHero() {
  const [funnelOpen, setFunnelOpen] = useState(false);

  return (
    <>
      <div
        className="cp-hero"
        style={{
          background: "var(--bg)",
          color: "var(--text)",
          position: "relative",
          minHeight: "calc(100dvh - 65px)",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          className="cp-hero-inner"
          style={{
            padding: "0 48px 0",
            display: "grid",
            gridTemplateColumns: "96px 1fr",
            gap: 40,
            flex: 1,
            minHeight: 0,
            alignContent: "start",
          }}
        >
          {/* left rail */}
          <div
            className="cp-hero-rail"
            style={{
              paddingRight: 24,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              paddingTop: 56,
              paddingBottom: 40,
            }}
          >
            <div>
              <div
                className="cp-mono"
                style={{
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  color: "var(--text-muted)",
                }}
              >
                A Melbourne studio · est. 2024
              </div>
            </div>

            {/* social icons */}
            <SocialLinks gap={18} direction="column" />

            {/* project count */}
            <div>
              <div
                className="cp-num"
                style={{ fontSize: 40, color: "var(--accent)", lineHeight: 0.9 }}
              >
                24
              </div>
              <div className="cp-mono" style={{ fontSize: 10, marginTop: 8 }}>
                projects
                <br />
                shipped
              </div>
            </div>
          </div>

          {/* hero copy */}
          <div style={{ position: "relative", paddingBottom: 32, paddingTop: 88 }}>
            <h1
              className="cp-display"
              style={{ fontSize: "var(--fs-hero)", margin: 0, color: "var(--text)" }}
            >
              Websites, SEO,
              <br />
              and automation
              <br />
              that ship more
              <br />
              <RotatingText
                texts={HERO_WORDS}
                mainClassName="inline-flex overflow-hidden"
                splitLevelClassName="overflow-hidden pb-[0.2em]"
                staggerFrom="last"
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "-120%" }}
                staggerDuration={0.025}
                transition={{ type: "spring", damping: 30, stiffness: 400 }}
                rotationInterval={2000}
                style={{ color: "var(--accent)" }}
              />
              <span style={{ color: "var(--accent)" }}>.</span>
            </h1>
            <div
              className="cp-hero-cta"
              style={{
                display: "flex",
                justifyContent: "flex-end",
                marginTop: 56,
              }}
            >
              <div className="cp-hero-buttons" style={{ display: "flex", gap: 12, flexShrink: 0, flexWrap: "wrap" }}>
                <button
                  type="button"
                  onClick={() => setFunnelOpen(true)}
                  className="cp-btn cp-btn-primary cp-btn-lg"
                >
                  Find your fit
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M2 8h12M9 3l5 5-5 5" />
                  </svg>
                </button>
                <Link href="/work" className="cp-btn cp-btn-ghost cp-btn-lg">
                  See recent work
                </Link>
              </div>
            </div>
            {/* footer ticker */}
            <div
              className="cp-hero-ticker"
              style={{
                marginTop: 24,
                paddingTop: 20,
                display: "flex",
                flexDirection: "column",
                gap: 12,
                alignItems: "center",
              }}
            >
              <span className="cp-mono">Avg. reply · under 1 AU business day</span>
              <motion.span
                className="cp-mono"
                whileHover={{ scale: 1.04 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                style={{ alignSelf: "center", border: "1px solid var(--border)", borderRadius: 999, padding: "10px 24px", display: "inline-flex", alignItems: "center", gap: 8, cursor: "default" }}
              >
                Scroll
                <motion.span
                  animate={{ y: [0, 4, 0] }}
                  transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
                  style={{ display: "inline-block", lineHeight: 1 }}
                >
                  ↓
                </motion.span>
              </motion.span>
            </div>
          </div>
        </div>
      </div>
      {funnelOpen && <FunnelModal onClose={() => setFunnelOpen(false)} />}
    </>
  );
}
