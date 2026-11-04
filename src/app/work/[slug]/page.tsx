import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CaseGallery } from "@/components/case-gallery";
import CloseBand from "@/components/close-band";
import LiveClip from "@/components/live-clip";
import { caseBySlug, cases } from "@/data/cases";

type Props = { params: Promise<{ slug: string }> };

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
    openGraph: { title: `${item.name} · Clupai`, description: item.line, images: [item.picture.src] },
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

  return (
    <>
      <header className="page-head">
        <h1 className="page-title">{item.name}</h1>
        <div className="axis page-lead">
          <div className="l">
            <p className="ledger-meta t-small" style={{ marginTop: 0 }}>
              <strong>{item.when}</strong>
              {item.took ? <span>{item.took}</span> : null}
              <span>{item.role}</span>
              <span className="tag">{item.status}</span>
            </p>
          </div>
          <div className="r">
            <p className="t-lead" style={{ maxWidth: "30em" }}>
              {item.line}
            </p>
            {item.url ? (
              <p style={{ marginTop: 14 }}>
                <a className="tlink" href={item.url.href} rel="noreferrer">
                  {item.url.label}
                </a>
              </p>
            ) : null}
          </div>
        </div>
      </header>

      <figure className="case-figure">
        {item.clip ? (
          <LiveClip src={item.clip.src} poster={item.clip.poster} label={`${item.name} in use.`} />
        ) : (
          <Image src={item.picture.src} alt={item.picture.alt} fill sizes="100vw" loading="eager" />
        )}
      </figure>

      <section className="sec" aria-labelledby="problem-title">
        <div className="axis">
          <div className="l">
            <h2 className="t-head rise" id="problem-title">
              The problem.
            </h2>
            <dl className="facts" style={{ marginTop: "clamp(24px, 3vw, 44px)" }}>
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
          </div>
          <div className="r stack t-lead rise" style={{ maxWidth: "calc(30em + var(--margin))" }}>
            {item.problem.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </div>
      </section>

      <section aria-labelledby="built-title" style={{ paddingBottom: "var(--section)" }}>
        <div className="axis">
          <div className="l">
            <h2 className="t-head rise" id="built-title">
              What we built.
            </h2>
          </div>
          <div className="r" style={{ maxWidth: "calc(36em + var(--margin))" }}>
            {item.built.map((b) => (
              <div key={b.title} className="built-item rise">
                <h3>{b.title}</h3>
                <p>{b.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {quote ? (
        <section className="sec on-field" aria-labelledby="quote-title">
          <div className="axis">
            <div className="l">
              <h2 className="t-head rise" id="quote-title">
                In their words.
              </h2>
            </div>
            <blockquote className="r big-quote rise">
              <p>“{quote.quote}”</p>
              <cite>
                {quote.name}, {quote.role}
              </cite>
            </blockquote>
          </div>
        </section>
      ) : null}

      {gallery.length > 0 ? <CaseGallery media={gallery} client={item.name} /> : null}

      <section className="sec" aria-labelledby="next-title">
        <div className="axis">
          <div className="l">
            <h2 className="t-head" id="next-title">
              <Link className="case-next" href={`/work/${next.slug}`}>
                Next: {next.name}
              </Link>
            </h2>
          </div>
          <div className="r" style={{ alignSelf: "end" }}>
            <p>{next.line}</p>
            <p style={{ marginTop: 10 }}>
              <Link className="tlink" href="/work">
                All work
              </Link>
            </p>
          </div>
        </div>
      </section>

      <CloseBand title="Find out what could sink your build." />
    </>
  );
}
