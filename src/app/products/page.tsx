import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import CloseBand from "@/components/close-band";
import LedgerRow from "@/components/ledger-row";
import { caseBySlug } from "@/data/cases";
import { inWork, released } from "@/data/products";

export const metadata: Metadata = {
  title: "Products",
  description:
    "Software we made for ourselves: what’s out now, and what’s still in the works. Built the same way we build for founders.",
  alternates: { canonical: "/products" },
};

const RELEASED_TONES = ["f-orange", "f-yellow", "f-sage"];
const POSTER_TONES = ["f-yellow", "f-orange"];

export default function ProductsPage()
{
  let posters = 0;

  return (
    <>
      <header className="head f-sage">
        <h1 className="t-giant">Software we made for ourselves.</h1>
        <div className="head-lead">
          <div>
            <p className="t-lead">
              We build our own products the same way we build yours. Some are out. Some are still in the works.
            </p>
            <div className="links">
              <a className="tlink" href="#released">
                Released ({released.length})
              </a>
              <a className="tlink" href="#in-the-works">
                In the works ({inWork.length})
              </a>
            </div>
          </div>
        </div>
      </header>

      <section id="released" aria-labelledby="released-title">
        <div className="grid group-head">
          <h2 className="t-head rise" id="released-title">
            Released.
          </h2>
        </div>
        {released.map((p, i) => (
          <LedgerRow
            key={p.slug}
            name={p.name}
            href={p.caseSlug ? `/work/${p.caseSlug}` : undefined}
            meta={[p.since]}
            tag={p.badge}
            line={p.line}
            picture={p.image as { src: string; alt: string }}
            clip={p.caseSlug ? caseBySlug(p.caseSlug)?.clip : undefined}
            tone={RELEASED_TONES[i % RELEASED_TONES.length]!}
            flip={i % 2 === 1}
            loadFirst={i === 0}
            links={[
              ...(p.link ? [{ ...p.link, primary: true }] : []),
              ...(p.caseSlug ? [{ href: `/work/${p.caseSlug}`, label: "How we built it" }] : []),
            ]}
          />
        ))}
      </section>

      <section className="f-ink" id="in-the-works" aria-labelledby="works-title">
        <div className="grid works-head">
          <h2 className="t-head rise" id="works-title">
            In the works.
          </h2>
          <p className="t-lead rise rise-2">What’s on the bench right now, and how far along each one is.</p>
        </div>
        <div className="works-mosaic">
          {inWork.map((p) => (
            <article key={p.slug}>
              {p.image ? (
                <div className="works-pic">
                  <Image src={p.image.src} alt={p.image.alt} fill sizes="(max-width: 820px) 100vw, 58vw" />
                </div>
              ) : (
                <div className={`works-pic works-pic--flat ${POSTER_TONES[posters++ % POSTER_TONES.length]}`}>
                  <p className="t-head">{p.poster}</p>
                </div>
              )}
              <div className="works-entry">
                <h3 className="t-name rise">
                  {p.caseSlug ? <Link href={`/work/${p.caseSlug}`}>{p.name}</Link> : p.name}
                </h3>
                <p className="meta t-small rise rise-2">
                  <strong>{p.since}</strong>
                  <span className="tag">{p.badge}</span>
                </p>
                <p className="rise rise-2">{p.line}</p>
                {p.link || p.caseSlug ? (
                  <div className="links rise rise-3">
                    {p.link ? (
                      <a className="tlink" href={p.link.href} rel="noreferrer">
                        {p.link.label}
                      </a>
                    ) : null}
                    {p.caseSlug ? (
                      <Link className="tlink" href={`/work/${p.caseSlug}`}>
                        Where it’s at
                      </Link>
                    ) : null}
                  </div>
                ) : null}
              </div>
            </article>
          ))}
        </div>
      </section>

      <CloseBand title="Got one of your own to build?" />
    </>
  );
}
