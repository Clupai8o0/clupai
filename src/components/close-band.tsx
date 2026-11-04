import Link from "next/link";

export default function CloseBand({ title }: { title: string })
{
  return (
    <section className="close-band on-field" aria-labelledby="close-title">
      <div className="axis">
        <div className="l">
          <h2 className="t-head rise" id="close-title">
            {title}
          </h2>
        </div>
        <div className="r">
          <p className="t-lead" style={{ maxWidth: "30em" }}>
            Eight questions. You get a score, your top three risks, and one thing to do about each this week.
          </p>
          <div className="row">
            <Link className="btn btn--white" href="/start">
              Get your Build Risk Check
            </Link>
            <span className="t-small">Free. 2 minutes.</span>
          </div>
        </div>
      </div>
    </section>
  );
}
