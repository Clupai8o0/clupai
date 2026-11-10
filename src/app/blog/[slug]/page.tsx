import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import CloseBand from "@/components/close-band";
import { caseBySlug } from "@/data/cases";
import { postBySlug, posts, readingMinutes, sortedPosts, type PostBlock } from "@/data/posts";
import { caseTone } from "@/data/tones";
import "../../inner.css";
import "../blog.css";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams()
{
  return posts.map((p) => ({ slug: p.slug }));
}

function formatPostDate(iso: string): string
{
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export async function generateMetadata({ params }: Props): Promise<Metadata>
{
  const { slug } = await params;
  const post = postBySlug(slug);
  if (!post) {
    return {};
  }
  return {
    title: post.title,
    description: post.line,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      publishedTime: post.date,
      title: `${post.title} · clupai`,
      description: post.line,
      ...(post.cover ? { images: [post.cover.src] } : {}),
    },
  };
}

function renderBlock(block: PostBlock, index: number): ReactNode
{
  switch (block.type) {
    case "p":
      return <p key={index}>{block.text}</p>;
    case "h2":
      return <h2 key={index}>{block.text}</h2>;
    case "list":
      return (
        <ul key={index}>
          {block.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      );
    case "quote":
      return (
        <blockquote key={index}>
          <p>{block.text}</p>
          {block.cite ? <cite>{block.cite}</cite> : null}
        </blockquote>
      );
    case "image":
      return (
        <figure key={index} className="post-body-fig" data-reveal>
          <Image
            src={block.src}
            alt={block.alt}
            width={1600}
            height={1000}
            style={{ width: "100%", height: "auto" }}
            sizes="(max-width: 899px) 100vw, 840px"
          />
          {block.caption ? <figcaption>{block.caption}</figcaption> : null}
        </figure>
      );
    case "facts":
      return (
        <dl key={index} className="case-facts">
          {block.items.map((f) => (
            <div key={f.k}>
              <dt>{f.k}</dt>
              <dd>{f.v}</dd>
            </div>
          ))}
        </dl>
      );
    case "link": {
      if (block.href.startsWith("http")) {
        return (
          <p key={index}>
            <a className="ln-u" href={block.href} rel="noreferrer">
              {block.label}
            </a>
          </p>
        );
      }
      return (
        <p key={index}>
          <Link className="ln-u" href={block.href}>
            {block.label}
          </Link>
        </p>
      );
    }
    default: {
      const _exhaustive: never = block;
      return _exhaustive;
    }
  }
}

export default async function BlogPostPage({ params }: Props)
{
  const { slug } = await params;
  const post = postBySlug(slug);
  if (!post) {
    notFound();
  }

  const caseStudy = post.caseSlug ? caseBySlug(post.caseSlug) : undefined;
  const at = sortedPosts.findIndex((p) => p.slug === post.slug);
  const next = sortedPosts.length > 1 ? sortedPosts[(at + 1) % sortedPosts.length]! : null;

  return (
    <div className={`pg ${post.tone} post`}>
      <header className="post-head">
        <p className="chap-meta">
          {formatPostDate(post.date)} · {readingMinutes(post)} min read
        </p>
        <h1 className="post-title" data-squash>
          {post.title}
        </h1>
        <p className="g-state">{post.line}</p>
        {post.cover ? (
          <figure className="post-cover" data-reveal>
            <Image
              src={post.cover.src}
              alt={post.cover.alt}
              fill
              sizes="100vw"
              loading="eager"
            />
          </figure>
        ) : null}
      </header>

      <section className="post-body tone-paper" aria-label="Article">
        <div className="post-body-inner">{post.body.map((block, i) => renderBlock(block, i))}</div>
      </section>

      {caseStudy && post.caseSlug ? (
        <section className={`post-case ${caseTone(post.caseSlug)}`} aria-labelledby="from-work-title" data-rise>
          <p className="chap-meta" id="from-work-label">
            From the work
          </p>
          <h2 className="g-big" id="from-work-title">
            {caseStudy.name}
          </h2>
          <p className="g-lead">{caseStudy.line}</p>
          <Link className="btn" href={`/work/${post.caseSlug}`}>
            Read the case study
          </Link>
        </section>
      ) : null}

      {next ? (
        <section className={`post-next ${next.tone}`} aria-labelledby="next-post-title">
          <p className="chap-meta">Next post</p>
          <h2 className="g-big" id="next-post-title">
            <Link href={`/blog/${next.slug}`}>{next.title}</Link>
          </h2>
          <p className="g-lead">{next.line}</p>
        </section>
      ) : null}

      <CloseBand title="What could sink your build?" />
    </div>
  );
}
