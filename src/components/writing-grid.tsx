"use client";

import { useState } from "react";
import Link from "next/link";
import type { PostMeta } from "@/data/writing";

const TAGS = ["All", "Business", "Engineering", "SEO", "Ads", "Automation", "Design", "Process"];

function PostCard({ p, index }: { p: PostMeta; index: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <Link
      href={`/writing/${p.slug}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="writing-card"
      style={{
        padding: "32px 24px",
        borderBottom: "1px solid var(--border)",
        display: "flex",
        flexDirection: "column",
        minHeight: 300,
        background: hovered ? "var(--surface)" : "transparent",
        transform: hovered ? "translateY(-2px)" : "translateY(0)",
        transition: "background 0.2s ease, transform 0.2s ease",
        position: "relative",
        overflow: "hidden",
      }}
      data-index={index}
    >
      {/* Accent left bar on hover */}
      <span
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          bottom: 0,
          width: 2,
          background: "var(--accent)",
          opacity: hovered ? 1 : 0,
          transition: "opacity 0.2s ease",
        }}
      />
      <div className="flex justify-between items-start">
        <span
          className="cp-num"
          style={{
            fontSize: 22,
            color: hovered ? "var(--text-muted)" : "var(--accent)",
            letterSpacing: "-0.03em",
            transition: "color 0.2s ease",
          }}
        >
          {p.n}
        </span>
        <span
          className="cp-chip"
          style={{
            background: "transparent",
            color: hovered ? "var(--accent)" : "var(--text-muted)",
            borderColor: hovered ? "var(--accent)" : "var(--border-2)",
            transition: "color 0.2s ease, border-color 0.2s ease",
          }}
        >
          {p.tag}
        </span>
      </div>
      <h3
        className="cp-display"
        style={{
          fontSize: "clamp(20px, 2vw, 26px)",
          margin: "16px 0 0",
          fontWeight: 700,
          letterSpacing: "-0.02em",
          lineHeight: 1.15,
          color: hovered ? "var(--text)" : "var(--text)",
        }}
      >
        {p.title}
      </h3>
      <p
        style={{
          marginTop: 10,
          color: "var(--text-muted)",
          fontSize: 14,
          lineHeight: 1.55,
        }}
      >
        {p.dek}
      </p>
      <div
        style={{
          marginTop: "auto",
          paddingTop: 16,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <span className="cp-mono" style={{ color: "var(--text-dim)" }}>
          {p.date}
        </span>
        <span
          className="cp-mono"
          style={{
            color: hovered ? "var(--accent)" : "var(--text-dim)",
            transition: "color 0.2s ease",
            display: "flex",
            alignItems: "center",
            gap: 4,
          }}
        >
          {p.read}
          <span
            style={{
              display: "inline-block",
              transform: hovered ? "translateX(3px)" : "translateX(0)",
              transition: "transform 0.2s ease",
            }}
          >
            →
          </span>
        </span>
      </div>
    </Link>
  );
}

export default function WritingGrid({ posts }: { posts: PostMeta[] }) {
  const [activeTag, setActiveTag] = useState("All");

  const featured = posts[0];
  const rest = posts.slice(1);

  const filteredRest =
    activeTag === "All" ? rest : rest.filter((p) => p.tag === activeTag);

  const showFeatured = activeTag === "All" || featured.tag === activeTag;

  return (
    <>
      {/* Tag filters */}
      <div
        className="px-6 md:px-12 pt-8 pb-0"
        style={{ borderBottom: "1px solid var(--border)" }}
      >
        <div className="flex gap-2 flex-wrap pb-8">
          {TAGS.map((t) => (
            <button
              key={t}
              onClick={() => setActiveTag(t)}
              className="cp-chip"
              style={{
                background: t === activeTag ? "var(--accent)" : "transparent",
                color: t === activeTag ? "var(--accent-ink)" : "var(--text-muted)",
                borderColor: t === activeTag ? "var(--accent)" : "var(--border-2)",
                cursor: "pointer",
                transform: "scale(1)",
                transition: "background 0.18s ease, color 0.18s ease, border-color 0.18s ease, transform 0.12s ease",
              }}
              onMouseEnter={(e) => {
                if (t !== activeTag) {
                  (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--text-muted)";
                }
              }}
              onMouseLeave={(e) => {
                if (t !== activeTag) {
                  (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--border-2)";
                }
              }}
              onMouseDown={(e) => {
                (e.currentTarget as HTMLButtonElement).style.transform = "scale(0.95)";
              }}
              onMouseUp={(e) => {
                (e.currentTarget as HTMLButtonElement).style.transform = "scale(1)";
              }}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Featured */}
      {showFeatured && (
        <FeaturedCard post={featured} />
      )}

      {/* Grid */}
      {filteredRest.length > 0 && (
        <div className="px-6 md:px-12">
          <div className="writing-posts-grid">
            {filteredRest.map((p, i) => (
              <PostCard key={p.n} p={p} index={i} />
            ))}
          </div>
        </div>
      )}

      {filteredRest.length === 0 && !showFeatured && (
        <div
          className="px-6 md:px-12 py-24 text-center"
          style={{ color: "var(--text-dim)" }}
        >
          <span className="cp-mono">No essays in this category yet</span>
        </div>
      )}
    </>
  );
}

function FeaturedCard({ post }: { post: PostMeta }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="px-6 md:px-12 py-10 md:py-12"
      style={{ borderBottom: "1px solid var(--border)" }}
    >
      <Link
        href={`/writing/${post.slug}`}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="grid grid-cols-1 md:grid-cols-[1fr_400px] lg:grid-cols-[1fr_480px] gap-8 md:gap-14 items-center"
        style={{ display: "grid" }}
      >
        <div>
          <div className="cp-mono mb-3" style={{ color: "var(--accent)" }}>
            FEATURED · {post.tag}
          </div>
          <h2
            className="cp-display"
            style={{
              fontSize: "clamp(2rem, 4vw, 3.5rem)",
              margin: 0,
              letterSpacing: "-0.035em",
              transition: "color 0.2s ease",
            }}
          >
            {post.title}
          </h2>
          <p
            style={{
              marginTop: 16,
              fontSize: "clamp(15px, 2vw, 19px)",
              color: "var(--text-muted)",
              maxWidth: 580,
              lineHeight: 1.55,
            }}
          >
            {post.dek}
          </p>
          <div
            style={{
              marginTop: 20,
              display: "flex",
              gap: 20,
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            <span className="cp-mono" style={{ color: "var(--text-muted)" }}>
              {post.date} · {post.read}
            </span>
            <span
              style={{
                color: "var(--accent)",
                fontFamily: "var(--font-display), Manrope, ui-sans-serif, system-ui, sans-serif",
                fontWeight: 500,
                display: "inline-flex",
                alignItems: "center",
                gap: 4,
              }}
            >
              Read
              <span
                style={{
                  display: "inline-block",
                  transform: hovered ? "translateX(5px)" : "translateX(0)",
                  transition: "transform 0.22s ease",
                }}
              >
                →
              </span>
            </span>
          </div>
        </div>
        {/* Thumbnail */}
        <div
          className="hidden md:flex items-center justify-center rounded"
          style={{
            height: 300,
            background: hovered ? "var(--surface-2)" : "var(--surface)",
            border: "1px solid var(--border)",
            color: "var(--text-dim)",
            fontSize: 11,
            fontFamily: "var(--font-mono), monospace",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            transition: "background 0.22s ease, border-color 0.22s ease",
            borderColor: hovered ? "var(--border-2)" : "var(--border)",
          }}
        >
          Essay Thumbnail
        </div>
      </Link>
    </div>
  );
}
