import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import CloseBand from "@/components/close-band";

export const metadata: Metadata = {
  title: "About",
  description:
    "Why Clupai sells a date instead of hours, who runs it, and how your build stays in the hands of the person who scoped it.",
  alternates: { canonical: "/about" },
};

const reasons = [
  {
    title: "A date in writing, with our money on it.",
    body: "Miss it and everything unpaid is cancelled. We finish the build for free.",
  },
  {
    title: "The same person, scope to launch.",
    body: "The person who sells it scopes it, then builds it or directs the build.",
  },
  {
    title: "Your code, from day one.",
    body: "It sits in your GitHub while we work. Hosting and domain go in your name.",
  },
];

export default function AboutPage()
{
  return (
    <>
      <header className="page-head">
        <h1 className="page-title">Why we sell a date.</h1>
        <div className="axis page-lead">
          <div className="l" />
          <div className="r">
            <p className="t-lead" style={{ maxWidth: "30em" }}>
              When you buy hours, the longer it takes, the more they earn. The only person who loses money when your
              launch slips is you. So we sell a date.
            </p>
          </div>
        </div>
      </header>

      <section className="sec" aria-labelledby="founder-title" style={{ paddingTop: 0 }}>
        <div className="axis">
          <div className="l rise">
            <div className="portrait">
              <Image src="/sam.jpeg" alt="Samridh Limbu, founder of Clupai" fill sizes="(max-width: 860px) 100vw, 42vw" />
            </div>
          </div>
          <div className="r stack rise" style={{ maxWidth: "calc(34em + var(--margin))" }}>
            <h2 className="t-head" id="founder-title">
              Samridh Limbu, founder.
            </h2>
            <p>
              I’m in my final year of computer science at Deakin, finishing in June 2027. I built Hoddle during
              semester: six weeks, one developer, and second place at Study Melbourne Leadership 4Impact.
            </p>
            <p>
              GovChat, one of our own products, was a GovHack 2025 winner. You’ll meet me on the call, and I’ll scope
              your build myself.
            </p>
          </div>
        </div>
      </section>

      <section className="sec" aria-labelledby="small-title">
        <div className="axis">
          <div className="l">
            <h2 className="t-head rise" id="small-title">
              Why we’re small.
            </h2>
          </div>
          <div className="r stack rise" style={{ maxWidth: "calc(34em + var(--margin))" }}>
            <p className="t-lead">
              The person on your call scopes your build, then builds it or directs the build. At a big agency, the
              seller goes back to selling.
            </p>
            <p>
              We add developers as each job needs them, and we only run as many builds as we can keep dates on. AI is
              why we’re fast. A developer still tests and signs off every change.
            </p>
          </div>
        </div>
      </section>

      <section className="on-ink sec" aria-labelledby="reasons-title">
        <div className="axis sec-head">
          <div className="l">
            <h2 className="t-head rise" id="reasons-title">
              What you get for it.
            </h2>
          </div>
        </div>
        {reasons.map((reason) => (
          <article key={reason.title} className="axis risk">
            <div className="l">
              <h3 className="rise">{reason.title}</h3>
            </div>
            <div className="r rise" style={{ maxWidth: "calc(34em + var(--margin))" }}>
              <p>{reason.body}</p>
            </div>
          </article>
        ))}
        <article className="axis risk">
          <div className="l">
            <h3 className="rise">Software you can click today.</h3>
          </div>
          <div className="r rise" style={{ maxWidth: "calc(34em + var(--margin))" }}>
            <p>
              Don’t take our word for it. Open{" "}
              <Link className="tlink" href="/work/hoddle-melbourne">
                Hoddle
              </Link>{" "}
              or{" "}
              <Link className="tlink" href="/work/king-double-glazing">
                King Double Glazing’s price tool
              </Link>{" "}
              and use them.
            </p>
          </div>
        </article>
      </section>

      <CloseBand title="See where your build stands." />
    </>
  );
}
