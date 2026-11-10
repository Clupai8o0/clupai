import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CaseGallery } from "@/components/case-gallery";
import CloseBand from "@/components/close-band";
import LiveClip from "@/components/live-clip";
import { caseBySlug, cases } from "@/data/cases";
import { caseTone } from "@/data/tones";
import "../../inner.css";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams()
{
  return cases.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata>
{
  const { slug } = await params;
  const item = caseBySlug(slug);
  if (!item) {
    return {};
  }
  return {
    title: item.name,
    description: item.line,
    alternates: { canonical: `/work/${item.slug}` },
    openGraph: { title: `${item.name} · clupai`, description: item.line, images: [item.picture.src] },
  };
}

export default async function CasePage({ params }: Props)
{
  const { slug } = await params;
  const item = caseBySlug(slug);
  if (!item) {
    notFound();
  }

  const index = cases.indexOf(item);
  const next = cases[(index + 1) % cases.length]!;
  const gallery = item.media.filter((m) => m.src !== item.clip?.src);
  const quote = item.testimonial;
  const tone = caseTone(item.slug);

  return (
    <div className={`pg ${tone} case${item.status === "In the works" && !item.clear ? " is-wip" : ""}${item.clear ? " is-clear" : ""}`}>
      <header className="case-head">
        <h1 className="fit-name" style={{ "--len": item.name.length } as React.CSSProperties} data-squash>
          {item.name}
        </h1>
        <div className="case-lead">
          <p className="g-state">{item.line}</p>
          <div>
            <p className="chap-meta">
              {item.when}
              {item.took ? ` · ${item.took}` : ""} · {item.role} · {item.status}
            </p>
            {item.url ? (
              <a className="ln-u" href={item.url.href} rel="noreferrer">
                {item.url.label}
              </a>
            ) : null}
          </div>
        </div>
      </header>

      <figure className="case-fig">
        {item.clip ? (
          <LiveClip src={item.clip.src} poster={item.clip.poster} label={`${item.name} in use.`} />
        ) : (
          <Image src={item.picture.src} alt={item.picture.alt} fill sizes="100vw" loading="eager" />
        )}
      </figure>

      <section className="case-prob" aria-labelledby="problem-title">
        <h2 className="g-big" id="problem-title" data-letters>
          The problem.
        </h2>
        <div className="case-prob-t">
          {item.problem.map((p) => (
            <p className="g-state" key={p}>
              {p}
            </p>
          ))}
        </div>
        <dl className="case-facts">
          {item.facts.map((f) => (
            <div key={f.k}>
              <dt>{f.k}</dt>
              <dd>{f.v}</dd>
            </div>
          ))}
          {item.stack ? (
            <div>
              <dt>Built with</dt>
              <dd>{item.stack}</dd>
            </div>
          ) : null}
        </dl>
      </section>

      <section className="case-built tone-paper" aria-labelledby="built-title">
        <h2 className="g-big" id="built-title" data-letters>
          What we built.
        </h2>
        <div className="case-built-list">
          {item.built.map((b) => (
            <div key={b.title} className="case-b" data-rise>
              <h3>{b.title}</h3>
              <p className="g-lead">{b.body}</p>
            </div>
          ))}
        </div>
      </section>

      {quote ? (
        <section className="case-quote tone-ink" aria-labelledby="quote-title">
          <h2 className="sr-only" id="quote-title">
            In their words
          </h2>
          <blockquote data-rise>
            <p>“{quote.quote}”</p>
            <cite>
              {quote.name}, {quote.role}
            </cite>
          </blockquote>
        </section>
      ) : null}

      {gallery.length > 0 ? <CaseGallery media={gallery} client={item.name} /> : null}

      <section className={`case-next ${caseTone(next.slug)}`} aria-labelledby="next-title">
        <div className="case-next-t">
          <p className="chap-meta">Next case</p>
          <h2 className="g-big" id="next-title">
            <Link href={`/work/${next.slug}`}>{next.name}</Link>
          </h2>
          <p className="g-lead">{next.line}</p>
          <Link className="ln-u" href="/work">
            All work
          </Link>
        </div>
        <Link className={`case-next-pic${next.status === "In the works" && !next.clear ? " wip-next" : ""}`} href={`/work/${next.slug}`} tabIndex={-1} aria-hidden="true">
          <Image src={next.picture.src} alt="" fill sizes="(max-width: 720px) 100vw, 50vw" />
        </Link>
      </section>

      <CloseBand title="What could sink your build?" />
    </div>
  );
}
