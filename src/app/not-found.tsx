import type { Metadata } from "next";
import Link from "next/link";
import "./inner.css";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: false },
};

const FALLEN = ["c", "l", "u", "p", "a", "i"];

export default function NotFound()
{
  return (
    <div className="pg tone-red lost" data-perch="Nothing here. I checked." data-perch-mood="dizzy" data-perch-x="0.86" data-perch-y="0.82">
      <div className="lost-copy">
        <h1 className="g-huge">This page isn’t here.</h1>
        <p className="g-lead">It may have moved when we rebuilt the site. These will get you back on track.</p>
        <div className="row-links">
          <Link className="btn" href="/start" data-curtain="#ffe100">
            Start a project
          </Link>
          <Link className="ln-u" href="/work">
            See our work
          </Link>
          <Link className="ln-u" href="/">
            Go to the home page
          </Link>
        </div>
      </div>
      <div className="lost-floor" aria-hidden="true">
        {FALLEN.map((l, i) => (
          <span key={`${l}${i}`} className={`fl fl-${i}`} data-fall>
            {l}
          </span>
        ))}
      </div>
    </div>
  );
}
