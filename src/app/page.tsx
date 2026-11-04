import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import DealBar from "@/components/deal-bar";
import LiveClip from "@/components/live-clip";
import PinnedWork from "@/components/pinned-work";
import { caseBySlug, clientCases, type CaseStudy } from "@/data/cases";
import { inWork, released } from "@/data/products";

export const metadata: Metadata = {
  title: { absolute: "Clupai · Your software live by the date we agree" },
  alternates: { canonical: "/" },
};

const TITLE: { text: string; breakAfter?: "d" | "m" }[] = [
  { text: "Your software live", breakAfter: "m" },
  { text: "by the date", breakAfter: "d" },
  { text: "we agree,", breakAfter: "m" },
  { text: "or you stop paying." },
];

const QUESTIONS = [
  {
    q: "Aren’t you too small for this?",
    a: "We’re small on purpose. The person on your call scopes your build, then builds it or directs the build. If we ever vanished, the code is already in your GitHub, so you’d lose a developer and keep the product. No client has used this guarantee yet.",
  },
  {
    q: "Aren’t you a student?",
    a: "Samridh is. Final year of computer science at Deakin, finishing June 2027. Hoddle went live during semester, and GovChat was a GovHack 2025 winner. Judge us on the software you can click and the date in the contract.",
  },
  {
    q: "Isn’t AI code junk?",
    a: "Unreviewed AI code often is. We use AI because it’s why we’re fast, and a developer tests and signs off every change. Pay any developer you trust to read the code. It’s yours to show them.",
  },
  {
    q: "I’m not technical. How will I know it’s working?",
    a: "You click it. The second payment only comes after a working version you’ve used yourself. As Tas at King Double Glazing put it: “I felt in control the whole way through.”",
  },
  {
    q: "Who owns the code?",
    a: "You do, once it’s paid for, and the contract says so. It sits in your GitHub from day one, with hosting and domain in your name. We’ll talk about keeping it running once you’re live.",
  },
];

export default function HomePage()
{
  const tempo = caseBySlug("tempo") as CaseStudy;
  const pinned = [...clientCases, tempo];

  return (
    <>
      <section aria-labelledby="hero-title">
        <div className="mosaic" aria-hidden="true">
          <div className="tile tile--wide-2 tile--tall-2">
            <LiveClip src="/work/hoddle/loop.mp4" poster="/work/hoddle/poster.jpg" label="" />
          </div>
          <div className="tile tile--note tile--cobalt">
            <strong>Hoddle, live in six weeks.</strong>
          </div>
          <div className="tile tile--wide-2 hide-s">
            <Image src="/work/kdg/new/estimate-options.webp" alt="" fill sizes="33vw" loading="eager" />
          </div>
          <div className="tile tile--tall-2 hide-s">
            <Image src="/products/tempo/log-mobile.webp" alt="" fill sizes="17vw" />
          </div>
          <div className="tile">
            <Image src="/products/kairos/week.webp" alt="" fill sizes="(max-width: 820px) 33vw, 17vw" />
          </div>
          <div className="tile tile--note tile--ink hide-s">
            <strong>King Double Glazing, live in five weeks.</strong>
          </div>
          <div className="tile hide-s">
            <Image src="/work/hoddle/new/home.webp" alt="" fill sizes="17vw" />
          </div>
        </div>

        <h1 className="hero-title" id="hero-title">
          {TITLE.map((part, i) => (
            <span key={part.text}>
              <span className="ln">
                <span style={{ "--i": i } as React.CSSProperties}>{part.text}</span>
              </span>
              {part.breakAfter === "d" ? <br className="br-d" /> : null}
              {part.breakAfter === "m" ? <br className="br-m" /> : null}{" "}
            </span>
          ))}
        </h1>

        <div className="axis hero-foot">
          <div className="l">
            <p className="t-small muted">Software built and launched by a fixed date.</p>
          </div>
          <div className="r">
            <p className="t-lead" style={{ maxWidth: "32em" }}>
              We build and launch first versions for non-technical founders in Australia. Fixed price, fixed date, and
              the code is yours.
            </p>
            <div className="cta-row">
              <Link className="btn" href="/start">
                Get your Build Risk Check
              </Link>
              <span className="btn-note">Free. 2 minutes.</span>
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="work-title">
        <div className="axis" style={{ paddingTop: "clamp(48px, 7vw, 112px)" }}>
          <div className="l">
            <h2 className="t-head rise" id="work-title">
              Live software, with the dates on it.
            </h2>
          </div>
        </div>
        <PinnedWork items={pinned} />
      </section>

      <section className="sec on-field" aria-labelledby="deal-title">
        <div className="axis">
          <div className="l">
            <h2 className="t-head rise" id="deal-title">
              Three payments, one date.
            </h2>
            <p style={{ marginTop: 22, maxWidth: "26em" }}>
              Miss the date and you stop paying. Scoping comes first and takes one to two weeks. You get a written
              scope, a clickable prototype, and a fixed price and date. They’re yours to keep, even if you go elsewhere.
            </p>
          </div>
          <div className="r">
            <DealBar />
          </div>
        </div>
        <div className="axis" style={{ marginTop: "clamp(56px, 7vw, 104px)" }}>
          <div className="l">
            <h3 className="t-state">The guarantee has three conditions.</h3>
          </div>
          <div className="r stack">
            <p className="t-lead">
              A signed scope. Replies from you within 48 hours. And any change to the scope resets the date and price,
              in writing.
            </p>
            <p>
              Miss the date and everything unpaid is cancelled. We finish it free, you keep what’s built, and money
              already paid stays paid. No client has used this guarantee yet.
            </p>
          </div>
        </div>
      </section>

      <section className="sec" aria-labelledby="why-title">
        <div className="axis">
          <div className="l">
            <h2 className="t-head rise" id="why-title">
              Four things to check first.
            </h2>
          </div>
          <div className="r reasons t-state rise">
            <p>
              A date in writing, with our money on it.{" "}
              <span className="crop">
                <Image src="/products/kairos/week.webp" alt="" width={160} height={80} />
              </span>{" "}
              The person who sells it to you scopes it, then builds it or directs the build.{" "}
              <span className="crop">
                <Image src="/sam-small.jpeg" alt="" width={160} height={80} style={{ objectPosition: "center 28%" }} />
              </span>
            </p>
            <p>
              Code in your GitHub from day one.{" "}
              <span className="crop">
                <Image src="/products/cstack/cover.webp" alt="" width={160} height={80} />
              </span>{" "}
              And software you can click today, including{" "}
              <a className="tlink" href="https://hoddle.org" rel="noreferrer">
                Hoddle
              </a>{" "}
              and{" "}
              <a className="tlink" href="https://kingdoubleglazing.com.au" rel="noreferrer">
                King Double Glazing
              </a>
              .{" "}
              <span className="crop">
                <Image src="/products/tempo/dashboard.webp" alt="" width={160} height={80} />
              </span>
            </p>
          </div>
        </div>
      </section>

      <section className="on-ink sec" aria-labelledby="ask-title">
        <div className="axis">
          <div className="l">
            <h2 className="t-head rise" id="ask-title">
              What you’re about to ask us.
            </h2>
          </div>
          <div className="r">
            <div className="answers">
              {QUESTIONS.map((item) => (
                <p key={item.q} className="rise">
                  <strong>{item.q}</strong> {item.a}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="sec" aria-labelledby="shipped-title">
        <div className="axis">
          <div className="l">
            <h2 className="t-head rise" id="shipped-title">
              Also shipped, and still shipping.
            </h2>
            <p style={{ marginTop: 18 }}>
              <Link className="tlink" href="/products">
                See every product we’ve made
              </Link>
            </p>
          </div>
          <div className="r names rise">
            <div>
              <h3>Released</h3>
              <ul>
                {released.map((p) => (
                  <li key={p.slug}>
                    <Link href={p.caseSlug ? `/work/${p.caseSlug}` : "/products"}>{p.name}</Link>
                    <span>{p.since}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3>Clients and ventures</h3>
              <ul>
                <li>
                  <Link href="/work/hoddle-melbourne">Hoddle Melbourne</Link>
                  <span>Mar 2026 → Apr 2026, co-founder</span>
                </li>
                <li>
                  <Link href="/work/king-double-glazing">King Double Glazing</Link>
                  <span>2026</span>
                </li>
                <li>
                  <Link href="/work/tapcraft">TapCraft</Link>
                  <span>Feb 2026 → Oct 2026, co-founder</span>
                </li>
                <li>
                  <Link href="/work/krishnaveni-school">Krishnaveni School</Link>
                  <span>2026, website</span>
                </li>
              </ul>
            </div>
            <div>
              <h3>In the works</h3>
              <ul>
                {inWork.map((p) => (
                  <li key={p.slug}>
                    <Link href={p.caseSlug ? `/work/${p.caseSlug}` : "/products#in-the-works"}>{p.name}</Link>
                    <span>{p.since}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="sam-title">
        <div className="axis">
          <div className="l">
            <div className="portrait rise">
              <Image src="/sam.jpeg" alt="Samridh Limbu, founder of Clupai" fill sizes="(max-width: 820px) 100vw, 42vw" />
            </div>
          </div>
          <div className="r" style={{ alignSelf: "center", paddingBlock: "32px" }}>
            <h2 className="t-head rise" id="sam-title">
              The person on your call answers for your date.
            </h2>
            <p className="t-lead" style={{ marginTop: 22, maxWidth: "30em" }}>
              I’m Samridh Limbu, founder of Clupai. I take your first call, scope your build, and put my name on the
              date.
            </p>
            <ul className="side-facts">
              <li>Melbourne, Australia</li>
              <li>A GovHack 2025 winner</li>
              <li>2nd at Study Melbourne Leadership 4Impact</li>
            </ul>
            <p style={{ marginTop: 18 }}>
              <Link className="tlink" href="/about">
                More about us
              </Link>
            </p>
          </div>
        </div>
      </section>

      <section aria-labelledby="close-title" style={{ marginTop: "var(--section)" }}>
        <div className="strip" aria-hidden="true">
          <div className="tile rise">
            <Image src="/products/tempo/dashboard.webp" alt="" fill sizes="33vw" />
          </div>
          <div className="tile rise rise-2">
            <Image src="/work/kdg/new/hero.webp" alt="" fill sizes="33vw" />
          </div>
          <div className="tile rise rise-3">
            <Image src="/products/morgue/desktop.webp" alt="" fill sizes="33vw" />
          </div>
        </div>
        <div className="close-band on-field">
          <div className="axis">
            <div className="l">
              <h2 className="t-head rise" id="close-title">
                Find out what could sink your build.
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
        </div>
      </section>
    </>
  );
}
