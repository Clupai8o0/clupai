import Link from "next/link";

// The last thing on most pages: the question again, loud. The tone comes from the page.
export default function CloseBand({ title, tone = "tone-ink" }: { title: string; tone?: string })
{
  return (
    <section className={`band ${tone}`} aria-labelledby="close-title">
      <h2 className="g-big" id="close-title" data-letters>
        {title}
      </h2>
      <div className="band-row">
        <p className="g-lead">
          The Build Risk Check is free and takes two minutes. Answer eight questions and see the three biggest risks to
          your build.
        </p>
        <Link className="btn js-start" href="/start" data-curtain="#ffe100">
          Start a project
        </Link>
      </div>
    </section>
  );
}
