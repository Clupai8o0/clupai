"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView, animate } from "motion/react";
import Link from "next/link";
import Placeholder from "@/components/placeholder";

const DISPLAY_FONT =
  "var(--font-display), Manrope, ui-sans-serif, system-ui, sans-serif";

interface Props {
  eyebrow: string;
  stat: string;
  sstat: string;
  title: string;
  body: string;
  caseHref: string;
  cover?: string;
  coverAlt?: string;
}

function AnimatedStat({ value }: { value: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [displayed, setDisplayed] = useState("0");

  useEffect(() => {
    if (!inView) return;
    const numeric = value.replace(/[^\d→]/g, "");
    const parts = value.split("→");
    if (parts.length === 2) {
      const from = parseInt(parts[0]) || 0;
      const to = parseInt(parts[1]) || 0;
      const controls = animate(from, to, {
        duration: 1.2,
        ease: [0.16, 1, 0.3, 1],
        onUpdate: (v) => setDisplayed(`${Math.round(from + (v - from))}→${to}`),
      });
      return () => controls.stop();
    }
    setDisplayed(value);
  }, [inView, value]);

  return (
    <div
      ref={ref}
      className="cp-num cp-svc-stat"
      style={{
        fontSize: 120,
        color: "var(--accent)",
        letterSpacing: "-0.05em",
        lineHeight: 0.9,
      }}
    >
      {inView && displayed !== "0" ? displayed : value}
    </div>
  );
}

export default function CaseStudySection({
  eyebrow,
  stat,
  sstat,
  title,
  body,
  caseHref,
  cover,
  coverAlt,
}: Props) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-60px" });
  const [arrowHover, setArrowHover] = useState(false);
  const [imageHover, setImageHover] = useState(false);

  return (
    <div
      style={{ padding: "80px 48px", borderBottom: "1px solid var(--border)" }}
    >
      <div
        ref={sectionRef}
        className="cp-svc-cs-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 56,
          alignItems: "center",
        }}
      >
        {/* Left: text */}
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="cp-mono" style={{ marginBottom: 12 }}>
            {eyebrow}
          </div>

          <AnimatedStat value={stat} />

          <div
            className="cp-mono"
            style={{ color: "var(--text-muted)", marginTop: 4 }}
          >
            {sstat}
          </div>
          <div
            style={{
              fontFamily: DISPLAY_FONT,
              fontWeight: 700,
              fontSize: 28,
              letterSpacing: "-0.02em",
              marginTop: 32,
            }}
          >
            {title}
          </div>
          <p
            style={{
              marginTop: 12,
              color: "var(--text-muted)",
              fontSize: 16,
              lineHeight: 1.6,
              maxWidth: 520,
            }}
          >
            {body}
          </p>
          <Link
            href={caseHref}
            onMouseEnter={() => setArrowHover(true)}
            onMouseLeave={() => setArrowHover(false)}
            style={{
              marginTop: 20,
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              color: "var(--accent)",
              fontFamily: DISPLAY_FONT,
              fontWeight: 500,
              textDecoration: "none",
            }}
          >
            Read the full case study
            <motion.span
              animate={{ x: arrowHover ? 4 : 0 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
              style={{ display: "inline-block" }}
            >
              →
            </motion.span>
          </Link>
        </motion.div>

        {/* Right: image / placeholder */}
        <motion.div
          initial={{ opacity: 0, x: 24 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          onMouseEnter={() => setImageHover(true)}
          onMouseLeave={() => setImageHover(false)}
          style={{ overflow: "hidden" }}
        >
          {cover ? (
            <motion.img
              src={cover}
              alt={coverAlt ?? title}
              animate={{ scale: imageHover ? 1.03 : 1 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              style={{
                width: "100%",
                height: 420,
                objectFit: "cover",
                display: "block",
              }}
            />
          ) : (
            <motion.div
              animate={{ scale: imageHover ? 1.03 : 1 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <Placeholder label="case study screenshot" h={420} />
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
