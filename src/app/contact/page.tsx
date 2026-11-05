import type { Metadata } from "next";
import Link from "next/link";
import ScreenStrip from "@/components/screen-strip";

export const metadata: Metadata = {
  title: "Contact",
  description: "Email Clupai for referrals, partners, press and anything that isn’t a build.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage()
{
  return (
    <>
      <header className="head f-yellow">
        <h1 className="t-giant">Talk to us.</h1>
        <div className="head-lead">
          <p className="t-head">
            <a className="tlink" href="mailto:hello@clupai.com">
              hello@clupai.com
            </a>
          </p>
          <p className="t-lead">
            For referrals, partners, press and anything that isn’t a build. We reply within one Australian business day.
          </p>
        </div>
      </header>

      <section className="sec grid group-head f-orange" aria-labelledby="build-title">
        <h2 className="t-head rise" id="build-title">
          Got something to build?
        </h2>
        <div className="stack rise rise-2">
          <p>Start with the Build Risk Check. It takes two minutes, and you can book a call with us at the end.</p>
          <div>
            <Link className="btn" href="/start">
              Take the Build Risk Check
            </Link>
          </div>
        </div>
      </section>

      <ScreenStrip />
    </>
  );
}
