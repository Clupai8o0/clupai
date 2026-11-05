import type { Metadata } from "next";
import Link from "next/link";
import Soft from "@/components/soft";
import "../inner.css";

export const metadata: Metadata = {
  title: "Contact",
  description: "Email Clupai for referrals, partners, press and anything that isn’t a build.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage()
{
  return (
    <div className="pg tone-blue contact">
      <header className="contact-head">
        <h1 className="g-big" data-squash>
          Talk to us.
        </h1>
        <p className="contact-mail">
          <a href="mailto:hello@clupai.com" data-perch="It goes to a person." data-perch-x="0.9" data-perch-side="left">
            hello@clupai.com
          </a>
        </p>
        <p className="g-lead contact-note">
          For referrals, partners, press and anything that isn’t a build. We reply within one Australian business day.
        </p>
      </header>

      <section className="contact-build tone-ink" aria-labelledby="build-title">
        <Soft name="desk" className="contact-soft" />
        <div className="contact-build-t">
          <h2 className="g-big" id="build-title" data-letters>
            Got something to build?
          </h2>
          <p className="g-lead">Start with the Build Risk Check. It takes two minutes, and you can book a call with us at the end.</p>
          <Link className="btn js-start" href="/start" data-curtain="#ffe100">
            Start a project
          </Link>
        </div>
      </section>
    </div>
  );
}
