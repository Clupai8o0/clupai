import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CaseGallery } from "@/components/case-gallery";
import CloseBand from "@/components/close-band";
import LiveClip from "@/components/live-clip";
import ScreenStrip from "@/components/screen-strip";
import { caseBySlug, cases } from "@/data/cases";

type Props = { params: Promise<{ slug: string }> };

const TONES = ["f-sage", "f-yellow", "f-orange"];

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
  const tone = TONES[index % TONES.length]!;
  const nextTone = TONES[(index + 1) % TONES.length]!;

  return (
    <>
      <header className={`head ${tone}`}>
        <h1 className="t-giant">{item.name}</h1>
        <div className="head-lead">
          <p className="meta t-small">
            <strong>{item.when}</strong>
            {item.took ? <span>{item.took}</span> : null}
            <span>{item.role}</span>
            <span className="tag">{item.status}</span>
          </p>
          <div>
            <p className="t-lead">{item.line}</p>
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

      <section className="sec grid case-grid" aria-labelledby="problem-title">
        <div>
          <h2 className="t-head rise" id="problem-title">
            The problem.
          </h2>
          <dl className="facts">
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
        <div className="stack t-lead rise rise-2">
          {item.problem.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
      </section>

      <section className="grid case-grid" aria-labelledby="built-title" style={{ paddingBottom: "var(--section)" }}>
        <h2 className="t-head rise" id="built-title">
          What we built.
        </h2>
        <div>
          {item.built.map((b) => (
            <div key={b.title} className="built-item rise">
              <h3 className="t-name">{b.title}</h3>
              <p>{b.body}</p>
            </div>
          ))}
        </div>
      </section>

      {quote ? (
        <section className="sec grid case-grid f-ink" aria-labelledby="quote-title">
          <h2 className="t-head rise" id="quote-title">
            In their words.
          </h2>
          <blockquote className="big-quote rise rise-2">
            <p>“{quote.quote}”</p>
            <cite>
              {quote.name}, {quote.role}
            </cite>
          </blockquote>
        </section>
      ) : null}

      {gallery.length > 0 ? <CaseGallery media={gallery} client={item.name} /> : null}

      <section className={`case-next ${nextTone}`} aria-labelledby="next-title">
        <div className="case-next-copy">
          <h2 className="t-head rise" id="next-title">
            <Link href={`/work/${next.slug}`}>{next.name}</Link>
          </h2>
          <p className="rise rise-2">{next.line}</p>
          <div className="links rise rise-3">
            <Link className="btn" href={`/work/${next.slug}`}>
              Next case
            </Link>
            <Link className="tlink" href="/work">
              All work
            </Link>
          </div>
        </div>
        <Link className="case-next-pic" href={`/work/${next.slug}`} tabIndex={-1} aria-hidden="true">
          <Image src={next.picture.src} alt="" fill sizes="(max-width: 1099px) 100vw, 50vw" />
        </Link>
      </section>

      <ScreenStrip except={[item.slug, next.slug]} />

      <CloseBand title="What could sink your build?" />
    </>
  );
}
