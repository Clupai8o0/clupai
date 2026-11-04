import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Contact",
  description: "Email Clupai for referrals, partners, press and anything that isn’t a build.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage()
{
  return (
    <>
      <header className="page-head">
        <h1 className="page-title">Talk to us.</h1>
        <div className="axis page-lead">
          <div className="l" />
          <div className="r">
            <p className="t-state">
              <a className="tlink" href="mailto:hello@clupai.com">
                hello@clupai.com
              </a>
            </p>
            <p style={{ marginTop: 18, maxWidth: "30em" }}>
              For referrals, partners, press and anything that isn’t a build. We reply within one Australian business
              day.
            </p>
          </div>
        </div>
      </header>

      <section className="on-field sec" aria-labelledby="build-title">
        <div className="axis">
          <div className="l">
            <h2 className="t-head rise" id="build-title">
              Got something to build?
            </h2>
          </div>
          <div className="r stack rise" style={{ maxWidth: "calc(34em + var(--margin))" }}>
            <p>Start with the Build Risk Check. It takes two minutes, and you can book a call with us at the end.</p>
            <div>
              <Link className="btn btn--white" href="/start">
                Take the Build Risk Check
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
