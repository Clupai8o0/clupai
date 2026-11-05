import Link from "next/link";

// The last thing on most pages: the question again, loud, on black.
export default function CloseBand({ title }: { title: string })
{
  return (
    <section className="cta f-ink" aria-labelledby="close-title">
      <h2 className="t-giant rise" id="close-title">
        {title}
      </h2>
      <div className="cta-row">
        <p className="t-lead rise rise-2">
          Free. 2 minutes. Eight questions, and you get a score, your top three risks, and one thing to do about each
          this week.
        </p>
        <Link className="btn rise rise-3" href="/start">
          Get your Build Risk Check
        </Link>
      </div>
    </section>
  );
}
