import type { Metadata } from "next";
import Link from "next/link";
import CloseBand from "@/components/close-band";
import LedgerRow from "@/components/ledger-row";
import { clientCases, earlierCases, productCases, type CaseStudy } from "@/data/cases";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Software for clients and for our own ventures, each one with its dates and our part in it. Click any of it.",
  alternates: { canonical: "/work" },
};

function Row({ item, loadFirst = false }: { item: CaseStudy; loadFirst?: boolean })
{
  return (
    <LedgerRow
      name={item.name}
      href={`/work/${item.slug}`}
      meta={[item.when, ...(item.took ? [item.took] : []), item.role]}
      tag={item.status === "In the works" ? item.status : undefined}
      line={item.line}
      picture={item.picture}
      loadFirst={loadFirst}
      links={[
        { href: `/work/${item.slug}`, label: "Read how we built it" },
        ...(item.url ? [item.url] : []),
      ]}
    >
      {item.testimonial ? (
        <blockquote>
          <p>“{item.testimonial.quote}”</p>
          <cite>
            {item.testimonial.name}, {item.testimonial.role}
          </cite>
        </blockquote>
      ) : null}
    </LedgerRow>
  );
}

export default function WorkPage()
{
  return (
    <>
      <header className="page-head">
        <h1 className="page-title">Work, with the dates on it.</h1>
        <div className="axis page-lead">
          <div className="l" />
          <div className="r">
            <p className="t-lead" style={{ maxWidth: "30em" }}>
              Every entry says when it happened and what our part was. Most of it you can click today.
            </p>
          </div>
        </div>
      </header>

      <section aria-labelledby="clients-title">
        <div className="work-sub" style={{ paddingTop: 0, paddingInline: "var(--margin)" }}>
          <h2 className="t-head rise" id="clients-title">
            Clients and ventures.
          </h2>
        </div>
        {clientCases.map((item, i) => (
          <Row key={item.slug} item={item} loadFirst={i === 0} />
        ))}
      </section>

      <section aria-labelledby="own-title">
        <div className="work-sub axis" style={{ paddingInline: 0 }}>
          <div className="l">
            <h2 className="t-head rise" id="own-title">
              Our own products.
            </h2>
          </div>
          <div className="r" style={{ alignSelf: "end" }}>
            <Link className="tlink" href="/products">
              See what’s released and what’s in the works
            </Link>
          </div>
        </div>
        {productCases.map((item) => (
          <Row key={item.slug} item={item} />
        ))}
      </section>

      <section className="sec" aria-labelledby="earlier-title">
        <div className="axis">
          <div className="l">
            <h2 className="t-head rise" id="earlier-title">
              Earlier work.
            </h2>
          </div>
          <div className="r earlier rise">
            {earlierCases.map((item) => (
              <div key={item.slug}>
                <h3>
                  <Link href={`/work/${item.slug}`}>{item.name}</Link>
                </h3>
                <p className="ledger-meta t-small">
                  <strong>{item.when}</strong>
                  <span>{item.role}</span>
                </p>
                <p style={{ marginTop: 10 }}>{item.line}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CloseBand title="Find out what could sink your build." />
    </>
  );
}
