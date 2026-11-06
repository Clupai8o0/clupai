import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { CSSProperties } from "react";
import { caseBySlug } from "@/data/cases";
import { productBySlug, withPage } from "@/data/products";
import "../../inner.css";
import "../products.css";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams()
{
  return withPage.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata>
{
  const { slug } = await params;
  const p = productBySlug(slug);
  if (!p) {
    return {};
  }
  return {
    title: p.name,
    description: p.line,
    alternates: { canonical: `/products/${p.slug}` },
    openGraph: {
      title: `${p.name} · Clupai`,
      description: p.line,
      ...(p.status === "released" && p.image ? { images: [p.image.src] } : {}),
    },
  };
}

export default async function ProductPage({ params }: Props)
{
  const { slug } = await params;
  const p = productBySlug(slug);
  if (!p) {
    notFound();
  }
  const out = p.status === "released";
  const study = p.caseSlug ? caseBySlug(p.caseSlug) : undefined;
  const at = withPage.indexOf(p);
  const next = withPage[(at + 1) % withPage.length]!;

  return (
    <div className={`pg ${p.tone} prod`}>
      <div className="prod-top">
        <span>
          {p.code}. {out ? "Out now" : "In the works"}
        </span>
        <Link className="ln-u" href="/products">
          Back to the machine
        </Link>
      </div>
      <h1 className="fit-name" style={{ "--len": p.name.length } as CSSProperties} data-squash>
        {p.name}
      </h1>
      <div className="prod-grid">
        <div className="prod-l">
          <span className="prod-badge">{p.badge}</span>
          <p className="prod-since">{p.since}</p>
          <p className="g-state">{p.line}</p>
          {p.link ? (
            <a className="btn prod-go" href={p.link.href} rel="noreferrer">
              {p.link.label}
            </a>
          ) : (
            <p className="prod-note">Nothing to open yet.</p>
          )}
          <Link className="ln-u prod-more" href="/start">
            We can build yours too. Start a project.
          </Link>
        </div>
        {p.image ? (
          <div
            className={`prod-pic ${out ? "" : "blurred"}`}
          >
            <Image src={p.image.src} alt={p.image.alt} fill sizes="(max-width: 720px) 100vw, 62vw" loading="eager" />
            {out ? null : <span className="prod-tag">Blurred. Still being built.</span>}
          </div>
        ) : null}
      </div>

      {study ? (
        <section className="prod-more-s tone-ink" aria-labelledby="inside-title">
          <h2 className="g-big" id="inside-title" data-letters>
            What’s inside.
          </h2>
          <div className="prod-built">
            {study.built.map((b) => (
              <div key={b.title} data-rise>
                <h3>{b.title}</h3>
                <p className="g-lead">{b.body}</p>
              </div>
            ))}
          </div>
          <dl className="case-facts">
            {study.facts.map((f) => (
              <div key={f.k}>
                <dt>{f.k}</dt>
                <dd>{f.v}</dd>
              </div>
            ))}
          </dl>
          <Link className="btn" href={`/work/${study.slug}`}>
            {out ? "How we built it" : "Where it’s at"}
          </Link>
        </section>
      ) : null}

      <section className={`prod-next ${next.tone}`} aria-label="Next in the machine">
        <Link href={`/products/${next.slug}`}>
          <span className="chap-meta">Next, {next.code}</span>
          <span className="g-big">{next.name}</span>
        </Link>
      </section>
    </div>
  );
}
