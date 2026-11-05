import type { Metadata } from "next";
import Link from "next/link";
import ScreenStrip from "@/components/screen-strip";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: false },
};

export default function NotFound()
{
  return (
    <>
      <header className="head f-yellow">
        <h1 className="t-giant">This page isn’t here.</h1>
        <div className="head-lead">
          <div>
            <p className="t-lead">It may have moved when we rebuilt the site. These will get you back on track.</p>
            <div className="links">
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
      <ScreenStrip />
    </>
  );
}
