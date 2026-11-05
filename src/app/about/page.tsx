import type { Metadata } from "next";
import Image from "next/image";
import CloseBand from "@/components/close-band";
import ReasonPanels from "@/components/reason-panels";

export const metadata: Metadata = {
  title: "About",
  description:
    "Why Clupai sells a date instead of hours, who runs it, and how your build stays in the hands of the person who scoped it.",
  alternates: { canonical: "/about" },
};

export default function AboutPage()
{
  return (
    <>
      <header className="head f-orange">
        <h1 className="t-giant">Why we sell a date.</h1>
        <div className="head-lead">
          <p className="t-lead">
            When you buy hours, the longer it takes, the more they earn. The only person who loses money when your
            launch slips is you. So we sell a date.
          </p>
        </div>
      </header>

      <section className="split f-sage" aria-labelledby="founder-title">
        <div className="split-pic">
          <Image src="/sam.jpeg" alt="Samridh Limbu, founder of Clupai" fill sizes="(max-width: 820px) 100vw, 50vw" loading="eager" />
        </div>
        <div className="split-copy">
          <h2 className="t-head rise" id="founder-title">
            Samridh Limbu, founder.
          </h2>
          <p className="rise rise-2">
            I’m in my final year of computer science at Deakin, finishing in June 2027. I built Hoddle during semester:
            six weeks, one developer, and second place at Study Melbourne Leadership 4Impact.
          </p>
          <p className="rise rise-3">
            GovChat, one of our own products, was a GovHack 2025 winner. You’ll meet me on the call, and I’ll scope your
            build myself.
          </p>
        </div>
      </section>

      <section className="sec grid group-head" aria-labelledby="small-title">
        <h2 className="t-head rise" id="small-title">
          Why we’re small.
        </h2>
        <div className="stack rise rise-2">
          <p className="t-lead">
            The person on your call scopes your build, then builds it or directs the build. At a big agency, the seller
            goes back to selling.
          </p>
          <p>
            We add developers as each job needs them, and we only run as many builds as we can keep dates on. AI is why
            we’re fast. A developer still tests and signs off every change.
          </p>
        </div>
      </section>

      <section aria-labelledby="reasons-title">
        <div className="grid acc-intro" style={{ paddingTop: 0 }}>
          <h2 className="t-head rise" id="reasons-title">
            What you get for it.
          </h2>
        </div>
        <ReasonPanels />
      </section>

      <CloseBand title="See where your build stands." />
    </>
  );
}
