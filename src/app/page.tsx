import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import CloseBand from "@/components/close-band";
import DealBar from "@/components/deal-bar";
import MovingLine from "@/components/moving-line";
import WorkFolders from "@/components/work-folders";
import { caseBySlug, clientCases, type CaseStudy } from "@/data/cases";
import { inWork, released } from "@/data/products";

export const metadata: Metadata = {
  title: { absolute: "Clupai · Your software live by the date we agree" },
  alternates: { canonical: "/" },
};

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

const CARDS = [
  { x: -1.46, y: "26px", r: "-6deg", tone: "f-orange", title: "A date in writing.", body: "With our money on it.", src: "/products/kairos/week.webp" },
  {
    x: -0.49,
    y: "-6px",
    r: "-2deg",
    tone: "f-sage",
    title: "The same person, scope to launch.",
    body: "The person who sells it scopes it, then builds it or directs the build.",
    src: "/sam-small.jpeg",
    face: true,
  },
  { x: 0.49, y: "-6px", r: "2deg", tone: "f-yellow", title: "Your code, from day one.", body: "It sits in your GitHub while we work.", src: "/products/cstack/cover.webp" },
];

const CLIENTS = [
  { name: "Hoddle Melbourne", href: "/work/hoddle-melbourne" },
  { name: "King Double Glazing", href: "/work/king-double-glazing" },
  { name: "TapCraft", href: "/work/tapcraft" },
  { name: "Krishnaveni School", href: "/work/krishnaveni-school" },
];

export default function HomePage()
{
  const tempo = caseBySlug("tempo") as CaseStudy;
  const folders = [...clientCases, tempo];

  return (
    <>
      <section className="hero f-orange" aria-labelledby="hero-title">
        <MovingLine words="Live software, Melbourne">
          <Image src="/sam.jpeg" alt="Samridh Limbu, founder of Clupai" fill sizes="(max-width: 820px) 70vw, 25vw" loading="eager" />
        </MovingLine>
        <div className="hero-copy">
          <h1 className="t-head" id="hero-title">
            Live by the date, or you stop paying.
          </h1>
          <p className="t-lead">
            We build and launch first versions for non-technical founders in Australia. Your software, live by the date
            we agree. Fixed price, and the code is yours.
          </p>
          <div className="hero-act">
            <Link className="btn" href="/start">
              Get your Build Risk Check
            </Link>
            <span className="t-small">Free. 2 minutes.</span>
          </div>
        </div>
      </section>

      <section aria-labelledby="work-title">
        <div className="grid work-intro">
          <h2 className="t-head rise" id="work-title">
            Live software, with the dates on it.
          </h2>
          <p className="t-lead rise rise-2">Each one says when it happened and what our part was.</p>
        </div>
        <WorkFolders items={folders} />
      </section>

      <section className="f-orange" aria-labelledby="deal-title">
        <div className="grid deal">
          <h2 className="t-giant rise" id="deal-title">
            No show,
            <br />
            no more pay.
          </h2>
          <div className="deal-l">
            <p className="t-lead rise">Three payments, one date.</p>
            <p className="rise rise-2">
              Miss the date and you stop paying. Scoping comes first and takes one to two weeks. You get a written scope,
              a clickable prototype, and a fixed price and date. They’re yours to keep, even if you go elsewhere.
            </p>
          </div>
          <div className="deal-r">
            <DealBar />
          </div>
        </div>
        <div className="f-white">
          <div className="grid terms-head">
            <h3 className="t-head rise">The guarantee has three conditions.</h3>
            <p className="rise rise-2">
              Miss the date and everything unpaid is cancelled. We finish it free, you keep what’s built, and money
              already paid stays paid. No client has used this guarantee yet.
            </p>
          </div>
          <div className="panels">
            <p className="f-ink rise">A signed scope.</p>
            <p className="f-sage rise rise-2">Replies from you within 48 hours.</p>
            <p className="f-yellow rise rise-3">Any change to the scope resets the date and price, in writing.</p>
          </div>
        </div>
      </section>

      <section className="fan f-ink" aria-labelledby="why-title">
        <div className="fan-stage">
          <h2 className="t-head" id="why-title">
            Four things to check first.
          </h2>
          <div className="fan-cards">
            {CARDS.map((c) => (
              <article
                key={c.title}
                className={`fan-card ${c.tone}`}
                style={{ "--x": c.x, "--y": c.y, "--r": c.r } as CSSProperties}
              >
                <h3 className="t-name">{c.title}</h3>
                <div className="fan-pic">
                  <Image src={c.src} alt="" fill sizes="340px" className={c.face ? "is-face" : undefined} />
                </div>
                <p>{c.body}</p>
              </article>
            ))}
            <article
              className="fan-card f-white"
              style={{ "--x": 1.46, "--y": "26px", "--r": "6deg" } as CSSProperties}
            >
              <h3 className="t-name">Software you can click.</h3>
              <div className="fan-pic">
                <Image src="/products/tempo/dashboard.webp" alt="" fill sizes="340px" />
              </div>
              <p>
                Today, including{" "}
                <a className="tlink" href="https://hoddle.org" rel="noreferrer">
                  Hoddle
                </a>{" "}
                and{" "}
                <a className="tlink" href="https://kingdoubleglazing.com.au" rel="noreferrer">
                  King Double Glazing
                </a>
                .
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="sec grid" aria-labelledby="ask-title">
        <div className="faq-head">
          <h2 className="t-head" id="ask-title">
            What you’ll ask us.
          </h2>
        </div>
        <div className="faq-tiles">
          {QUESTIONS.map((item, i) => (
            <details key={item.q} className="q rise" name="faq" open={i === 0}>
              <summary>
                <h3 className="t-name">{item.q}</h3>
                <span className="plus" aria-hidden="true" />
              </summary>
              <p>{item.a}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="bill-ground f-yellow" aria-labelledby="shipped-title">
        <div className="bill">
          <h2 className="t-head" id="shipped-title">
            Also shipped, and still shipping.
          </h2>
          <div className="bill-pic">
            <Image src="/products/kairos/today.webp" alt="Today’s plan in Kairos, one of our own products." fill sizes="(max-width: 820px) 90vw, 50vw" />
          </div>
          <div className="bill-group">
            <h3>Released</h3>
            <ul className="bill-names">
              {released.map((p) => (
                <li key={p.slug}>
                  <Link href={p.caseSlug ? `/work/${p.caseSlug}` : "/products"}>{p.name}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="bill-group">
            <h3>Clients and ventures</h3>
            <ul className="bill-names">
              {CLIENTS.map((c) => (
                <li key={c.href}>
                  <Link href={c.href}>{c.name}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="bill-group">
            <h3>In the works</h3>
            <ul className="bill-names">
              {inWork.map((p) => (
                <li key={p.slug}>
                  <Link href={p.caseSlug ? `/work/${p.caseSlug}` : "/products#in-the-works"}>{p.name}</Link>
                </li>
              ))}
            </ul>
          </div>
          <Link className="btn" href="/products">
            See every product we’ve made
          </Link>
        </div>
      </section>

      <section className="sam f-sage" aria-labelledby="sam-title">
        <div className="sam-pic">
          <Image src="/sam.jpeg" alt="Samridh Limbu, founder of Clupai" fill sizes="(max-width: 820px) 100vw, 58vw" />
        </div>
        <div className="sam-copy">
          <h2 className="t-head rise" id="sam-title">
            Who answers for your date.
          </h2>
          <p className="t-lead rise rise-2">
            I’m Samridh Limbu, founder of Clupai. I take your first call, scope your build, and put my name on the date.
          </p>
          <ul className="rise rise-3">
            <li>Melbourne, Australia</li>
            <li>A GovHack 2025 winner</li>
            <li>2nd at Study Melbourne Leadership 4Impact</li>
          </ul>
          <p className="rise rise-3">
            <Link className="tlink" href="/about">
              More about us
            </Link>
          </p>
        </div>
      </section>

      <CloseBand title="What could sink your build?" />
    </>
  );
}
