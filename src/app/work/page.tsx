import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import CloseBand from "@/components/close-band";
import { caseBySlug, earlierCases, productCases, type CaseStudy } from "@/data/cases";
import { caseTone } from "@/data/tones";
import "../inner.css";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Software we’ve built for clients and for our own ventures, with the dates and what our part was. Most of it you can click today.",
  alternates: { canonical: "/work" },
};

const CHAPTERS = ["hoddle-melbourne", "king-double-glazing", "krishnaveni-school"]
  .map((s) => caseBySlug(s))
  .filter((c): c is CaseStudy => Boolean(c));

const SMALL = earlierCases.filter((c) => !CHAPTERS.includes(c));

const LINES: Record<string, string> = {
  "hoddle-melbourne": "Six weeks, then pitch day. It held.",
  "king-double-glazing": "75 to 99. Yes, I checked.",
  "krishnaveni-school": "Staff run this one. No emails to us.",
};

export default function WorkPage()
{
  return (
    <div className="pg tone-ink work">
      <header className="work-head">
        <h1 className="g-huge" data-squash>
          Work, with the dates on it.
        </h1>
        <p className="g-state">Every entry says when it happened and what our part was. Most of it you can click today.</p>
      </header>

      <section aria-label="Clients and ventures">
        {CHAPTERS.map((c, i) => (
          <article key={c.slug} className={`chap chap-${i} ${caseTone(c.slug)}`}>
            <h2 className="chap-name" data-letters>
              <Link href={`/work/${c.slug}`}>{c.name}</Link>
            </h2>
            <Link
              className="chap-pic"
              href={`/work/${c.slug}`}
              tabIndex={-1}
              aria-hidden="true"
              data-wipe
              data-perch={LINES[c.slug]}
              data-perch-x="0.9"
              data-perch-y="0.3"
              data-perch-colour={c.slug === "king-double-glazing" ? "ink" : "yellow"}
            >
              <Image src={c.picture.src} alt="" fill sizes="(max-width: 720px) 100vw, 60vw" loading={i === 0 ? "eager" : "lazy"} />
            </Link>
            <div className="chap-copy">
              <p className="chap-meta">
                {c.when}
                {c.took ? ` · ${c.took}` : ""} · {c.role} · {c.status}
              </p>
              <p className="g-lead">{c.line}</p>
              {c.testimonial ? (
                <blockquote className="chap-quote">
                  “{c.testimonial.quote}”<cite>{c.testimonial.name}, {c.testimonial.role}</cite>
                </blockquote>
              ) : null}
              <div className="row-links">
                <Link className="btn" href={`/work/${c.slug}`}>
                  Read how we built it
                </Link>
                {c.url ? (
                  <a className="ln-u" href={c.url.href} rel="noreferrer">
                    {c.url.label}
                  </a>
                ) : null}
              </div>
            </div>
          </article>
        ))}
      </section>

      <section className="work-own tone-paper" aria-labelledby="own-title">
        <div className="work-own-h">
          <h2 className="g-big" id="own-title" data-letters>
            Our own products.
          </h2>
          <Link className="ln-u" href="/products">
            See what’s released and what’s in the works
          </Link>
        </div>
        <div className="own-grid">
          {productCases.map((c, i) => (
            <Link key={c.slug} className={`own own-${i} ${caseTone(c.slug)}`} href={`/work/${c.slug}`}>
              <span className="own-name">{c.name}</span>
              <span className="own-line">{c.line}</span>
              <span className="own-meta">
                {c.when} · {c.status}
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="work-earlier" aria-labelledby="earlier-title">
        <h2 className="g-big" id="earlier-title" data-letters>
          Earlier work.
        </h2>
        <ul>
          {SMALL.map((c) => (
            <li key={c.slug}>
              <Link href={`/work/${c.slug}`}>
                <span className="er-name">{c.name}</span>
                <span className="er-line">
                  {c.line} {c.role}, {c.when}.
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <CloseBand title="What could sink your build?" tone="tone-blue" />
    </div>
  );
}
