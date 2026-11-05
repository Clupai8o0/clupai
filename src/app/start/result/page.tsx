import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { NotSentNote, ResultBooking, ScoreCount } from "@/components/result-parts";
import ScreenStrip from "@/components/screen-strip";
import { bookingFieldsFor, decodeAnswers, scoreAnswers } from "@/lib/risk-check";

export const metadata: Metadata = {
  title: "Your Build Risk Check",
  robots: { index: false, follow: false },
};

const RISK_TONES = ["f-sage", "f-yellow", "f-orange"];

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
      <section className="score f-orange" aria-labelledby="score-title">
        <div className="score-grid">
          <div className="score-copy">
            <h1 className="t-head" id="score-title">
              Your Build Risk Check.
            </h1>
            <p>
              Out of 100, and higher is safer. It’s worked out only from your answers, and we haven’t seen your project
              yet.
            </p>
            <NotSentNote />
          </div>
          <ScoreCount score={result.score} />
        </div>
      </section>

      <section aria-labelledby="risks-title">
        <div className="grid group-head">
          <h2 className="t-head rise" id="risks-title">
            Your top three risks.
          </h2>
          <p className="t-lead rise rise-2">
            Each one comes with something you can do this week, whether you ever talk to us or not.
          </p>
        </div>
        <div className="risks">
          {result.risks.map((risk, i) => (
            <article key={risk.area} className={`risk ${RISK_TONES[i % RISK_TONES.length]}`}>
              <h3 className="t-name rise">{risk.title}</h3>
              <div>
                <p className="rise rise-2">{risk.means}</p>
                <p className="do rise rise-3">This week: {risk.thisWeek}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {result.canBook ? (
        <section className="f-ink sec grid book-grid" id="book" aria-labelledby="book-title">
          <div>
            <h2 className="t-head rise" id="book-title">
              Talk it through in 30 minutes.
            </h2>
            <p>
              You tell Samridh, our founder, where you’re stuck. You’ll hear straight whether we can build it and what
              scoping would look like. If we’re the wrong people, we’ll say so.
            </p>
          </div>
          <div>
            <ResultBooking projectType={booking.projectType} budget={booking.budget} />
          </div>
        </section>
      ) : (
        <section className="f-ink sec grid case-grid" aria-labelledby="no-title">
          <h2 className="t-head rise" id="no-title">
            We’re not the right fit yet.
          </h2>
          <div className="stack">
            <p className="t-lead">
              A custom build from us would be a stretch on under A$10k, and we’d rather tell you now than waste your
              month.
            </p>
            <p>
              Start with the three things above. A no-code tool or a freelancer can test the idea for less. When your
              budget grows, come back and take the check again.
            </p>
          </div>
        </section>
      )}

      <section aria-labelledby="more-title">
        <div className="sec grid group-head">
          <h2 className="t-head rise" id="more-title">
            See what we’ve shipped.
          </h2>
          <div className="links">
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
        <ScreenStrip />
      </section>
    </>
  );
}
