import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Nav from "@/components/nav";
import Footer from "@/components/footer";
import FinalCTA from "@/components/final-cta";
import { CaseGallery } from "@/components/case-gallery";
import {
  visibleCases as cases,
  getCaseBySlug,
  type CaseStudy,
} from "@/data/cases";

export function generateStaticParams() {
  return cases.map((c) => ({ slug: c.slug }));
}

// Search snippets cut off around 160 characters; end on a whole word.
function summarise(text: string, max = 158) {
  if (text.length <= max) {
    return text;
  }
  const cut = text.slice(0, max);
  return `${cut.slice(0, cut.lastIndexOf(" ")).replace(/[\s,;:—–-]+$/, "")}…`;
}

// "King Double Glazing—\nrebrand, rebuild," + "conversion funnel."
// becomes "Rebrand, rebuild, conversion funnel." The client name is the h1.
function statement(c: CaseStudy) {
  const rest = c.headline.split("\n").slice(1).join(" ");
  const text = `${rest} ${c.headlineAccent}`.trim();
  return text.charAt(0).toUpperCase() + text.slice(1);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const c = getCaseBySlug(slug);
  if (!c) return {};

  const title = `${c.client} case study`;
  const description = summarise(c.description);

  return {
    title,
    description,
    alternates: { canonical: `/work/${c.slug}` },
    openGraph: {
      title: `${title} · clupai`,
      description,
      type: "article",
      url: `/work/${c.slug}`,
      images: c.thumbnail
        ? [{ url: c.thumbnail, alt: `${c.client} website on desktop` }]
        : undefined,
    },
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const c = getCaseBySlug(slug);
  if (!c) notFound();

  const index = cases.findIndex((x) => x.slug === c.slug);
  const next = cases[(index + 1) % cases.length];
  const phone = c.media?.find(
    (m) => m.type === "image" && m.src.includes("mobile")
  );
  const facts = c.meta.filter((m) => m.k !== "Stack");
  const stack = c.meta.find((m) => m.k === "Stack")?.v;

  return (
    <>
      <Nav page="work" />

      {/* Hero: who, what, and the real product, large */}
      <section className="cs-hero">
        <Link href="/work" className="cs-back">
          <ArrowLeft size={16} strokeWidth={1.75} aria-hidden="true" />
          All work
        </Link>
        <h1 className="cs-title">{c.client}</h1>
        <p className="cs-statement">{statement(c)}</p>

        <div className="cs-intro">
          <p className="cs-lede">{c.description}</p>
          <dl className="cs-facts">
            {facts.map((m) => (
              <div key={m.k}>
                <dt>{m.k}</dt>
                <dd>{m.v}</dd>
              </div>
            ))}
          </dl>
        </div>

        {c.thumbnail && (
          <div className="cs-stage">
            <div className="cs-shot">
              <Image
                src={c.thumbnail}
                alt={`${c.client} website on desktop`}
                fill
                preload
                sizes="(max-width: 768px) 100vw, (max-width: 1440px) 92vw, 1344px"
              />
            </div>
            {phone && (
              <div className="cs-phone">
                <div className="cs-phone-screen">
                  <Image
                    src={phone.src}
                    alt={`${c.client} website on a phone`}
                    fill
                    sizes="(max-width: 768px) 30vw, 240px"
                  />
                </div>
              </div>
            )}
          </div>
        )}
      </section>

      {/* Results */}
      <section className="result-band" aria-label="Results">
        {c.results.map(([label, stat, sub]) => (
          <div key={label} className="result-cell">
            <div
              className="cp-mono"
              style={{ color: "rgba(5,5,5,0.65)", marginBottom: 10 }}
            >
              {label}
            </div>
            <div className="cp-num result-stat">{stat}</div>
            <div style={{ marginTop: 6, color: "rgba(5,5,5,0.7)" }}>{sub}</div>
          </div>
        ))}
      </section>

      {/* The brief, beside the client's world */}
      <section className={`cs-block cs-brief${c.art ? "" : " cs-brief-solo"}`}>
        <div>
          <h2 className="cs-h2">The brief</h2>
          <blockquote className="cs-quote">
            <p>{c.brief.quote}</p>
            <footer>{c.brief.attribution}</footer>
          </blockquote>
        </div>
        {c.art && (
          <figure className="cs-art">
            <div className="cs-art-frame">
              <Image
                src={c.art.src}
                alt={c.art.alt}
                fill
                sizes="(max-width: 900px) 100vw, 46vw"
              />
            </div>
            <figcaption>{c.art.caption}</figcaption>
          </figure>
        )}
      </section>

      {/* What was in the way */}
      <section className="cs-problems">
        <h2 className="cs-h2">What was in the way</h2>
        <ul className="cs-problem-list">
          {c.problems.map((p) => (
            <li key={p}>{p}</li>
          ))}
        </ul>
      </section>

      {/* Decisions */}
      <section className="cs-block">
        <div className="cs-decisions-head">
          <h2 className="cs-h2">The calls that moved the outcome</h2>
          <p>Not the cosmetic stuff.</p>
        </div>
        <div className="cs-decision-list">
          {c.decisions.map(([h, b]) => (
            <article key={h} className="cs-decision">
              <h3>{h}</h3>
              <p>{b}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Gallery */}
      <section className="cs-block">
        <div className="cs-decisions-head">
          <h2 className="cs-h2">Screens, not mockups</h2>
          <p>Captured from the shipped product.</p>
        </div>
        <CaseGallery media={c.media} client={c.client} />
      </section>

      {/* Testimonial */}
      {c.testimonial && (
        <section className="cs-testimonial" aria-label="Client testimonial">
          <figure>
            <blockquote>
              <p>{c.testimonial.quote}</p>
            </blockquote>
            <figcaption>
              <span className="cs-testimonial-name">{c.testimonial.name}</span>
              <span>{c.testimonial.role}</span>
            </figcaption>
          </figure>
        </section>
      )}

      {/* Stack */}
      {stack && (
        <section className="cs-block cs-stack">
          <h2>Built with</h2>
          <p>{stack}</p>
        </section>
      )}

      {/* Next case study */}
      {next && next.slug !== c.slug && (
        <section className="cs-next" aria-label="Next case study">
          <Link href={`/work/${next.slug}`} className="cs-next-link">
            <span className="cs-next-copy">
              <span className="cs-next-label">Next case study</span>
              <span className="cs-next-title">{next.client}</span>
              <span className="cs-next-kind">
                {next.kind}
                <ArrowRight size={18} strokeWidth={1.75} aria-hidden="true" />
              </span>
            </span>
            {next.thumbnail && (
              <span className="cs-next-shot">
                <Image
                  src={next.thumbnail}
                  alt=""
                  fill
                  sizes="(max-width: 900px) 100vw, 45vw"
                />
              </span>
            )}
          </Link>
        </section>
      )}

      <FinalCTA />
      <Footer />
    </>
  );
}
