import type { Metadata } from "next";
import Link from "next/link";
import CloseBand from "@/components/close-band";
import HowTower from "@/components/how-tower";
import Soft from "@/components/soft";
import { QUESTIONS } from "@/data/offer";
import "../home.css";
import "../inner.css";

export const metadata: Metadata = {
  title: "How it works",
  description:
    "How a Clupai build runs from scope to launch, when each payment is due, and what happens if we miss the date.",
  alternates: { canonical: "/how-it-works" },
};

const CONDITIONS = [
  { tone: "tone-ink", text: "You’ve signed the scope." },
  { tone: "tone-yellow", text: "You answer us within 48 hours." },
  { tone: "tone-paper", text: "If the scope changes, we agree a new date and price in writing." },
];

export default function HowItWorksPage()
{
  return (
    <div className="pg tone-blue hiw">
      <header className="hiw-head">
        <Soft name="calendar" className="hiw-soft" />
        <h1 className="g-huge" data-squash>
          How it works.
        </h1>
        <p className="g-state">A build takes four steps and you pay in three parts. The launch date goes in the contract, and if we miss it, you stop paying.</p>
      </header>

      <h2 className="sr-only">The four steps and the payments</h2>
      <div className="home">
        <HowTower />
      </div>

      <section className="hiw-guar tone-red" aria-labelledby="guar-title">
        <h2 className="g-huge" id="guar-title" data-letters>
          The guarantee has three conditions.
        </h2>
        <p className="g-state" data-rise>
          If we miss the date, whatever you haven’t paid is cancelled. We still finish the build for free and you keep
          all of it. Money you’ve already paid isn’t refunded.
        </p>
        <div className="hiw-conds">
          {CONDITIONS.map((c, i) => (
            <p key={c.text} className={`hiw-cond ${c.tone}`} data-rise={i * 0.1}>
              {c.text}
            </p>
          ))}
        </div>
        <p className="hiw-yet">
          No client has used this guarantee yet.
        </p>
        <p className="hiw-fine">
          It applies as written in your signed agreement. Our{" "}
          <Link className="ln-u" href="/terms">
            terms
          </Link>{" "}
          say the same.
        </p>
      </section>

      <div className="home">
        <section className="faq" id="faq" aria-labelledby="faq-h">
          <div className="faq-side">
            <h2 id="faq-h">What you’ll ask us.</h2>
            <Soft name="blocks" className="faq-soft" />
          </div>
          <div className="faq-list">
            {QUESTIONS.map((f, i) => (
              <details key={f.q} name="faq" open={i === 0}>
                <summary>{f.q}</summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
        </section>
      </div>

      <CloseBand title="What could sink your build?" tone="tone-yellow" />
    </div>
  );
}
