import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: false },
};

export default function NotFound()
{
  return (
    <header className="page-head">
      <h1 className="page-title">This page isn’t here.</h1>
      <div className="axis page-lead">
        <div className="l" />
        <div className="r">
          <p className="t-lead" style={{ maxWidth: "30em" }}>
            It may have moved when we rebuilt the site. These will get you back on track.
          </p>
          <div className="ledger-links">
            <Link className="btn" href="/start">
              Take the Build Risk Check
            </Link>
            <Link className="tlink" href="/work">
              See our work
            </Link>
            <Link className="tlink" href="/">
              Go to the home page
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
