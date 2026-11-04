import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { NotSentNote, ResultBooking, ScoreCount } from "@/components/result-parts";
import { bookingFieldsFor, decodeAnswers, scoreAnswers } from "@/lib/risk-check";

export const metadata: Metadata = {
  title: "Your Build Risk Check",
  robots: { index: false, follow: false },
};

export default async function ResultPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
})
{
  const { r } = await searchParams;
  const indexes = decodeAnswers(typeof r === "string" ? r : null);
  if (!indexes) {
    redirect("/start");
  }

  const result = scoreAnswers(indexes);
  const booking = bookingFieldsFor(result);

  return (
    <>
      <section className="on-field score-page" aria-labelledby="score-title">
        <div className="axis">
          <div className="l">
            <h1 className="t-head" id="score-title">
              Your Build Risk Check.
            </h1>
            <p style={{ marginTop: 18, maxWidth: "24em" }}>
              Out of 100, and higher is safer. It’s worked out only from your answers, and we haven’t seen your project
              yet.
            </p>
            <NotSentNote />
          </div>
          <div className="r">
            <ScoreCount score={result.score} />
          </div>
        </div>
      </section>

      <section className="sec" aria-labelledby="risks-title">
        <div className="axis sec-head">
          <div className="l">
            <h2 className="t-head rise" id="risks-title">
              Your top three risks.
            </h2>
          </div>
          <div className="r" style={{ alignSelf: "end" }}>
            <p className="t-lead" style={{ maxWidth: "30em" }}>
              Each one comes with something you can do this week, whether you ever talk to us or not.
            </p>
          </div>
        </div>
        {result.risks.map((risk) => (
          <article key={risk.area} className="axis risk">
            <div className="l">
              <h3 className="rise">{risk.title}</h3>
            </div>
            <div className="r rise" style={{ maxWidth: "calc(34em + var(--margin))" }}>
              <p>{risk.means}</p>
              <p className="do">This week: {risk.thisWeek}</p>
            </div>
          </article>
        ))}
      </section>

      {result.canBook ? (
        <section className="on-ink sec" id="book" aria-labelledby="book-title">
          <div className="axis">
            <div className="l">
              <h2 className="t-head rise" id="book-title">
                Talk it through in 30 minutes.
              </h2>
              <p style={{ marginTop: 18, maxWidth: "26em" }}>
                You tell Samridh, our founder, where you’re stuck. You’ll hear straight whether we can build it and what
                scoping would look like. If we’re the wrong people, we’ll say so.
              </p>
            </div>
            <div className="r">
              <ResultBooking projectType={booking.projectType} budget={booking.budget} />
            </div>
          </div>
        </section>
      ) : (
        <section className="on-ink sec" aria-labelledby="no-title">
          <div className="axis">
            <div className="l">
              <h2 className="t-head rise" id="no-title">
                We’re not the right fit yet.
              </h2>
            </div>
            <div className="r stack" style={{ maxWidth: "calc(34em + var(--margin))" }}>
              <p className="t-lead">
                A custom build from us would be a stretch on under A$10k, and we’d rather tell you now than waste your
                month.
              </p>
              <p>
                Start with the three things above. A no-code tool or a freelancer can test the idea for less. When your
                budget grows, come back and take the check again.
              </p>
            </div>
          </div>
        </section>
      )}

      <section className="sec" aria-labelledby="more-title">
        <div className="axis">
          <div className="l">
            <h2 className="t-head rise" id="more-title">
              See what we’ve shipped.
            </h2>
          </div>
          <div className="r" style={{ alignSelf: "end" }}>
            <div className="ledger-links" style={{ marginTop: 0 }}>
              <Link className="tlink" href="/work">
                Work, with the dates on it
              </Link>
              <Link className="tlink" href="/products">
                Our own products
              </Link>
              <Link className="tlink" href="/start">
                Take the check again
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
