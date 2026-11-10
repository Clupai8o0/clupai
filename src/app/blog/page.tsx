import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import CloseBand from "@/components/close-band";
import { caseBySlug } from "@/data/cases";
import { readingMinutes, sortedPosts } from "@/data/posts";
import "../inner.css";
import "./blog.css";

const BLOG_DESC =
  "Short write-ups from real projects: what we built, what went wrong, and what we’d tell a founder before they start.";

export const metadata: Metadata = {
  title: "Blog",
  description: BLOG_DESC,
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "Blog",
    description: BLOG_DESC,
  },
};

function formatPostDate(iso: string): string
{
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function postMetaLine(p: (typeof sortedPosts)[number]): string
{
  const parts = [`${formatPostDate(p.date)}`, `${readingMinutes(p)} min read`];
  if (p.caseSlug) {
    const c = caseBySlug(p.caseSlug);
    if (c) {
      parts.push(c.name);
    }
  }
  return parts.join(" · ");
}

export default function BlogPage()
{
  return (
    <div className="pg tone-ink blog">
      <header className="blog-head">
        <h1 className="g-huge" data-squash>
          What we learn building.
        </h1>
        <p className="g-state">
          Short write-ups from real projects: what we built, what went wrong, and what we’d tell a founder before
          they start.
        </p>
      </header>

      <section className="blog-list" aria-label="Blog posts">
        {sortedPosts.map((p, i) => (
          <article key={p.slug} className={`post-card post-card-${i % 5} ${p.tone}`}>
            {p.cover ? (
              <div className="post-card-pic" aria-hidden="true">
                <Image
                  src={p.cover.src}
                  alt=""
                  fill
                  sizes="(max-width: 899px) 100vw, 58vw"
                  loading={i === 0 ? "eager" : "lazy"}
                />
              </div>
            ) : null}
            <div className="post-card-copy">
              <p className="chap-meta">{postMetaLine(p)}</p>
              <h2 className="post-card-title">
                <Link href={`/blog/${p.slug}`}>{p.title}</Link>
              </h2>
              <p className="g-lead">{p.line}</p>
            </div>
          </article>
        ))}
      </section>

      <CloseBand title="What could sink your build?" tone="tone-blue" />
    </div>
  );
}
