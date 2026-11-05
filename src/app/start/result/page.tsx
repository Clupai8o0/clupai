import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { FunnelBack, FunnelTop } from "@/components/funnel-chrome";
import { NotSentNote, ResultBooking, ScoreCount } from "@/components/result-parts";
import { bookingFieldsFor, decodeAnswers, encodeAnswers, questions, scoreAnswers } from "@/lib/risk-check";
import "../start.css";

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
  const params = await searchParams;
  // The no-JavaScript form sends q0 to q7, one field per question, instead of the joined code.
  const code = typeof params.r === "string" ? params.r : questions.map((_, i) => params[`q${i}`]).join("");
  const indexes = decodeAnswers(code);
  if (!indexes) {
    redirect("/start");
  }

  const result = scoreAnswers(indexes);
  const booking = bookingFieldsFor(result);

  return (
    <div className="fun fun-r" data-tower={encodeAnswers(indexes)} data-score={result.score}>
      <FunnelBack picture={2} />
      <FunnelTop label="Your result" />

      <div className="r-body">
        <section className="r-score" aria-labelledby="score-title">
          <h1 className="r-title" id="score-title">
            Your Build Risk Check.
          </h1>
          <div className="r-main">
            <ScoreCount score={result.score} />
            <div className="r-side">
              <p className="r-of">Out of 100, and higher is safer.</p>
              <p className="r-note">It’s worked out only from your answers, and we haven’t seen your project yet.</p>
              <NotSentNote />
            </div>
          </div>
        </section>

        <section className="r-risks" aria-labelledby="risks-title">
          <h2 className="r-h" id="risks-title">
            Your top three risks.
          </h2>
          <p className="r-note">
            Each one comes with something you can do this week, whether you ever talk to us or not.
          </p>
          {result.risks.map((risk) => (
            <article key={risk.area} className="r-risk">
              <h3>{risk.title}</h3>
              <p>{risk.means}</p>
              <p className="r-do">This week: {risk.thisWeek}</p>
            </article>
          ))}
        </section>

        {result.canBook ? (
          <section className="r-book" id="book" aria-labelledby="book-title">
            <h2 className="r-h" id="book-title">
              Talk it through in 30 minutes.
            </h2>
            <p className="r-note">
              You tell Samridh, our founder, where you’re stuck. You’ll hear straight whether we can build it and what
              scoping would look like. If we’re the wrong people, we’ll say so.
            </p>
            <div className="r-cal">
              <ResultBooking projectType={booking.projectType} budget={booking.budget} />
            </div>
          </section>
        ) : (
          <section className="r-book" aria-labelledby="no-title">
            <h2 className="r-h" id="no-title">
              We’re not the right fit yet.
            </h2>
            <p className="r-note">
              A custom build from us would be a stretch on under A$10k, and we’d rather tell you now than waste your
              month.
            </p>
            <p className="r-note">
              Start with the three things above. A no-code tool or a freelancer can test the idea for less. When your
              budget grows, come back and take the check again.
            </p>
          </section>
        )}

        <section className="r-more" aria-labelledby="more-title">
          <h2 className="r-h" id="more-title">
            See what we’ve shipped.
          </h2>
          <div className="r-links">
            <Link href="/work">Work, with the dates on it</Link>
            <Link href="/products">Our own products</Link>
            <Link href="/start">Take the check again</Link>
          </div>
        </section>
      </div>
    </div>
  );
}
