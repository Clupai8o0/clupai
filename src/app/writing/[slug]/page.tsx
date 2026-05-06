import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import Nav from "@/components/nav";
import Footer from "@/components/footer";
import FinalCTA from "@/components/final-cta";
import { getPostBySlug, posts, type ContentBlock } from "@/data/writing";

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

function renderBlock(block: ContentBlock, i: number) {
  switch (block.type) {
    case "lead":
      return (
        <p
          key={i}
          style={{
            margin: "0 0 28px",
            fontSize: "clamp(17px, 2vw, 21px)",
            lineHeight: 1.6,
            color: "var(--text)",
            fontFamily: "var(--font-display), Manrope, ui-sans-serif, system-ui, sans-serif",
            fontWeight: 400,
            letterSpacing: "-0.01em",
          }}
          dangerouslySetInnerHTML={{ __html: block.html }}
        />
      );
    case "p":
      return (
        <p
          key={i}
          style={{ margin: "0 0 20px", lineHeight: 1.75 }}
          dangerouslySetInnerHTML={{ __html: block.html }}
        />
      );
    case "h2":
      return (
        <h2
          key={i}
          className="cp-display"
          style={{
            fontSize: "clamp(22px, 3vw, 32px)",
            margin: "48px 0 14px",
            letterSpacing: "-0.025em",
          }}
        >
          {block.text}
        </h2>
      );
    case "ul":
      return (
        <ul key={i} style={{ paddingLeft: 20, margin: "0 0 20px" }}>
          {block.items.map((item, j) => (
            <li
              key={j}
              style={{ marginBottom: 10, lineHeight: 1.65 }}
              dangerouslySetInnerHTML={{ __html: item }}
            />
          ))}
        </ul>
      );
    case "ol":
      return (
        <ol key={i} style={{ paddingLeft: 20, margin: "0 0 20px" }}>
          {block.items.map((item, j) => (
            <li
              key={j}
              style={{ marginBottom: 12, lineHeight: 1.65 }}
              dangerouslySetInnerHTML={{ __html: item }}
            />
          ))}
        </ol>
      );
    case "blockquote":
      return (
        <blockquote
          key={i}
          style={{
            margin: "36px 0",
            padding: "20px 28px",
            borderLeft: "3px solid var(--accent)",
            background: "var(--surface)",
            fontSize: "clamp(17px, 2vw, 21px)",
            fontFamily: "var(--font-display), Manrope, ui-sans-serif, system-ui, sans-serif",
            fontWeight: 500,
            letterSpacing: "-0.01em",
            lineHeight: 1.45,
            color: "var(--text)",
          }}
        >
          &ldquo;{block.text}&rdquo;
        </blockquote>
      );
  }
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) notFound();

  const relatedPosts = post.related
    .map((s) => posts.find((p) => p.slug === s))
    .filter(Boolean);

  return (
    <>
      <Nav page="writing" />

      {/* Breadcrumb */}
      <div className="px-6 md:px-12 pt-12 pb-0">
        <div className="cp-mono" style={{ color: "var(--text-muted)" }}>
          <Link href="/writing" className="cp-breadcrumb-link">
            Writing
          </Link>{" "}
          <span style={{ color: "var(--text-dim)" }}>/</span>{" "}
          <span style={{ color: "var(--text)" }}>
            {post.tag} · {post.n}
          </span>
        </div>
      </div>

      {/* Post header */}
      <div
        className="px-6 md:px-12 pt-8 pb-12"
        style={{ maxWidth: 960, margin: "0 auto" }}
      >
        <div className="cp-eyebrow mb-3">
          Essay · {post.read} · {post.date}
        </div>
        <h1
          className="cp-display"
          style={{
            fontSize: "clamp(2.25rem, 5.2vw, 4.5rem)",
            margin: 0,
            maxWidth: 880,
            lineHeight: 1.03,
          }}
        >
          {post.title}
        </h1>
        <p
          style={{
            marginTop: 20,
            fontSize: "clamp(16px, 2vw, 20px)",
            color: "var(--text-muted)",
            lineHeight: 1.55,
            maxWidth: 720,
            fontFamily: "var(--font-display), Manrope, ui-sans-serif, system-ui, sans-serif",
            fontWeight: 400,
            letterSpacing: "-0.01em",
          }}
        >
          {post.dek}
        </p>
        <div
          style={{
            marginTop: 28,
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            gap: 12,
            paddingBottom: 24,
            borderBottom: "1px solid var(--border)",
          }}
        >
          <Image
            src="/sam-small.jpeg"
            alt="Sam Limbu"
            width={44}
            height={44}
            style={{ borderRadius: "50%", objectFit: "cover", flexShrink: 0 }}
          />
          <div>
            <div
              style={{
                fontFamily: "var(--font-display), Manrope, ui-sans-serif, system-ui, sans-serif",
                fontWeight: 600,
                fontSize: 15,
              }}
            >
              Sam Limbu
            </div>
            <div className="cp-mono" style={{ color: "var(--text-muted)" }}>
              Founder, clupai · Melbourne
            </div>
          </div>
          <div style={{ flex: 1 }} />
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            {post.tags.map((tag) => (
              <span key={tag} className="cp-chip">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Body */}
      <div
        className="px-6 md:px-12 pb-20"
        style={{
          maxWidth: 760,
          margin: "0 auto",
          fontSize: "clamp(15px, 1.6vw, 18px)",
          lineHeight: 1.75,
          color: "var(--text)",
        }}
      >
        {post.content.map((block, i) => renderBlock(block, i))}
      </div>

      {/* Keep reading */}
      {relatedPosts.length > 0 && (
        <div
          className="px-6 md:px-12 py-14"
          style={{ borderTop: "1px solid var(--border)" }}
        >
          <div className="cp-mono mb-6">Keep reading</div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {relatedPosts.map((p) => (
              p && (
                <RelatedCard key={p.n} post={p} />
              )
            ))}
          </div>
        </div>
      )}

      <FinalCTA />
      <Footer />
    </>
  );
}

function RelatedCard({
  post,
}: {
  post: { n: string; title: string; read: string; slug: string; tag: string };
}) {
  return (
    <Link
      href={`/writing/${post.slug}`}
      className="cp-card"
      style={{ padding: "20px 22px", display: "block" }}
    >
      <div
        className="cp-num"
        style={{ color: "var(--accent)", fontSize: 18, letterSpacing: "-0.03em" }}
      >
        {post.n}
      </div>
      <div
        style={{
          fontFamily: "var(--font-display), Manrope, ui-sans-serif, system-ui, sans-serif",
          fontSize: "clamp(15px, 1.6vw, 18px)",
          fontWeight: 700,
          marginTop: 10,
          letterSpacing: "-0.02em",
          lineHeight: 1.2,
        }}
      >
        {post.title}
      </div>
      <div className="cp-mono mt-2" style={{ color: "var(--text-muted)" }}>
        {post.read}
      </div>
    </Link>
  );
}
