import type { Metadata } from "next";
import Image from "next/image";
import CloseBand from "@/components/close-band";
import ReasonPanels from "@/components/reason-panels";
import Soft from "@/components/soft";
import "../inner.css";

export const metadata: Metadata = {
  title: "About",
  description:
    "Why Clupai sells a date instead of hours, who runs it, and how your build stays in the hands of the person who scoped it.",
  alternates: { canonical: "/about" },
};

export default function AboutPage()
{
  return (
    <div className="pg tone-yellow about">
      <header className="about-head">
        <h1 className="g-huge" data-squash>
          Why we sell a date.
        </h1>
        <p className="g-state">
          When you buy hours, the longer it takes, the more they earn. The only person who loses money when your launch
          slips is you. So we sell a date.
        </p>
      </header>

      <section className="about-founder" aria-labelledby="founder-title">
        <div className="about-photo" data-perch="That’s Sam. He answers for your date." data-perch-x="0.92" data-perch-side="left">
          <Image src="/sam.jpeg" alt="Samridh Limbu, founder of Clupai" fill sizes="(max-width: 720px) 100vw, 48vw" loading="eager" />
        </div>
        <div className="about-copy">
          <h2 className="g-big" id="founder-title">
            Samridh Limbu, founder.
          </h2>
          <p className="g-lead" data-rise>
            I’m in my final year of computer science at Deakin, finishing in June 2027. I built Hoddle during semester:
            six weeks, one developer, and second place at Study Melbourne Leadership 4Impact.
          </p>
          <p className="g-lead" data-rise="0.1">
            GovChat, one of our own products, was a GovHack 2025 winner. You’ll meet me on the call, and I’ll scope your
            build myself.
          </p>
        </div>
      </section>

      <section className="about-small tone-ink" aria-labelledby="small-title">
        <Soft name="scaffold" className="about-soft" />
        <h2 className="g-huge" id="small-title" data-letters>
          Why we’re small.
        </h2>
        <div className="about-small-t">
          <p className="g-state" data-rise>
            The person on your call scopes your build, then builds it or directs the build. At a big agency, the seller
            goes back to selling.
          </p>
          <p className="g-lead" data-rise="0.1">
            We add developers as each job needs them, and we only run as many builds as we can keep dates on. AI is why
            we’re fast. A developer still tests and signs off every change.
          </p>
        </div>
      </section>

      <section className="about-why" aria-labelledby="reasons-title">
        <h2 className="g-big" id="reasons-title" data-letters>
          What you get for it.
        </h2>
        <ReasonPanels />
      </section>

      <CloseBand title="See where your build stands." tone="tone-red" />
    </div>
  );
}
