import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import CloseBand from "@/components/close-band";
import LedgerRow from "@/components/ledger-row";
import { inWork, released } from "@/data/products";

export const metadata: Metadata = {
  title: "Products",
  description:
    "Software we made for ourselves: what’s out now, and what’s still in the works. Built the same way we build for founders.",
  alternates: { canonical: "/products" },
};

export default function ProductsPage()
{
  return (
    <>
      <header className="page-head">
        <h1 className="page-title">Software we made for ourselves.</h1>
        <div className="axis page-lead">
          <div className="l" />
          <div className="r">
            <p className="t-lead" style={{ maxWidth: "30em" }}>
              We build our own products the same way we build yours. Some are out. Some are still in the works.
            </p>
            <div className="ledger-links">
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
        <div className="work-sub" style={{ paddingTop: "clamp(32px, 5vw, 72px)", paddingInline: "var(--margin)" }}>
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
            loadFirst={i === 0}
            links={[
              ...(p.link ? [{ ...p.link, primary: true }] : []),
              ...(p.caseSlug ? [{ href: `/work/${p.caseSlug}`, label: "How we built it" }] : []),
            ]}
          />
        ))}
      </section>

      <section className="on-ink" id="in-the-works" aria-labelledby="works-title" style={{ marginTop: "var(--section)" }}>
        <div className="axis sec-head" style={{ paddingTop: "var(--section)" }}>
          <div className="l">
            <h2 className="t-head rise" id="works-title">
              In the works.
            </h2>
          </div>
          <div className="r">
            <p className="t-lead" style={{ maxWidth: "30em" }}>
              What’s on the bench right now, and how far along each one is.
            </p>
          </div>
        </div>
        <div className="works-mosaic">
          {inWork.map((p) => (
            <article key={p.slug}>
              {p.image ? (
                <div className="works-pic rise">
                  <Image src={p.image.src} alt={p.image.alt} fill sizes="(max-width: 720px) 100vw, 50vw" />
                </div>
              ) : (
                <div className="works-pic works-pic--flat rise">
                  <p className="t-head">{p.poster}</p>
                </div>
              )}
              <div className="works-entry">
                <h3 className="t-name">
                  {p.caseSlug ? <Link href={`/work/${p.caseSlug}`}>{p.name}</Link> : p.name}
                </h3>
                <p className="ledger-meta t-small">
                  <strong>{p.since}</strong>
                  <span className="tag">{p.badge}</span>
                </p>
                <p>{p.line}</p>
                {p.link || p.caseSlug ? (
                  <div className="ledger-links">
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
