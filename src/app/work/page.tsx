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

const CLIENT_TONES = ["f-sage", "f-orange"];
const PRODUCT_TONES = ["f-ink", "f-yellow", "f-sage", "f-orange", "f-ink"];

function Row({
  item,
  tone,
  flip,
  loadFirst = false,
}: {
  item: CaseStudy;
  tone: string;
  flip: boolean;
  loadFirst?: boolean;
})
{
  return (
    <LedgerRow
      name={item.name}
      href={`/work/${item.slug}`}
      meta={[item.when, ...(item.took ? [item.took] : []), item.role]}
      tag={item.status === "In the works" ? item.status : undefined}
      line={item.line}
      picture={item.picture}
      clip={item.clip}
      tone={tone}
      flip={flip}
      loadFirst={loadFirst}
      links={[
        { href: `/work/${item.slug}`, label: "Read how we built it" },
        ...(item.url ? [item.url] : []),
      ]}
    >
      {item.testimonial ? (
        <blockquote className="rise rise-3">
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
      <header className="head f-yellow">
        <h1 className="t-giant">Work, with the dates on it.</h1>
        <div className="head-lead">
          <p className="t-lead">Every entry says when it happened and what our part was. Most of it you can click today.</p>
        </div>
      </header>

      <section aria-labelledby="clients-title">
        <div className="grid group-head">
          <h2 className="t-head rise" id="clients-title">
            Clients and ventures.
          </h2>
        </div>
        {clientCases.map((item, i) => (
          <Row
            key={item.slug}
            item={item}
            tone={CLIENT_TONES[i % CLIENT_TONES.length]!}
            flip={i % 2 === 1}
            loadFirst={i === 0}
          />
        ))}
      </section>

      <section aria-labelledby="own-title">
        <div className="grid group-head">
          <h2 className="t-head rise" id="own-title">
            Our own products.
          </h2>
          <p>
            <Link className="tlink" href="/products">
              See what’s released and what’s in the works
            </Link>
          </p>
        </div>
        {productCases.map((item, i) => (
          <Row key={item.slug} item={item} tone={PRODUCT_TONES[i % PRODUCT_TONES.length]!} flip={i % 2 === 1} />
        ))}
      </section>

      <section className="plain" aria-labelledby="earlier-title">
        <h2 className="t-head rise" id="earlier-title">
          Earlier work.
        </h2>
        {earlierCases.map((item) => (
          <Link key={item.slug} className="plain-item rise" href={`/work/${item.slug}`}>
            <h3 className="t-head">{item.name}</h3>
            <strong className="t-small">{item.when}</strong>
            <p className="plain-line">
              {item.line} <span className="t-small">{item.role}</span>
            </p>
          </Link>
        ))}
      </section>

      <CloseBand title="What could sink your build?" />
    </>
  );
}
