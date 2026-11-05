import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import Soft from "@/components/soft";
import { StaticWord } from "@/components/wordmark";
import "./home.css";

export const metadata: Metadata = {
  title: { absolute: "Clupai · Your software live by the date we agree" },
  alternates: { canonical: "/" },
};

const ANSWERS = [
  { key: "platform", label: "A platform or marketplace", colour: "#4da3ff" },
  { key: "customer-app", label: "An app for customers", colour: "#ffe100" },
  { key: "business-tool", label: "A tool for my business", colour: "#c8102e" },
  { key: "not-sure", label: "Not sure yet", colour: "#f3f1ec" },
];

const BOARD = [
  { name: "Hoddle Melbourne", what: "A mentoring platform for international students", part: "Co-founder and CTO", when: "Apr 2026", status: "Live", img: "/work/hoddle/new/home.webp", href: "/work/hoddle-melbourne" },
  { name: "King Double Glazing", what: "A brand, a site and an instant price tool", part: "Built for a client", when: "2026", status: "Live", img: "/work/kdg/new/hero.webp", href: "/work/king-double-glazing" },
  { name: "Krishnaveni School", what: "A school website its staff run themselves", part: "Built for a client", when: "2026", status: "Live", img: "/work/krishnaveni/homepage.webp", href: "/work/krishnaveni-school" },
  { name: "Tempo", what: "Log your workouts and see your progress", part: "Our own product", when: "Aug 2026", status: "Released", img: "/products/tempo/dashboard.webp", href: "/work/tempo" },
  { name: "cstack", what: "Keeps AI coding tools from clashing", part: "Our own product", when: "Sep 2026", status: "Released", img: "/products/cstack/cover.webp", href: "/work/cstack" },
  { name: "Acknowledgement Force", what: "Blocks your Mac until you read your own rules", part: "Our own product", when: "May 2026", status: "Released", img: "/products/force/preview.webp", href: "/work/acknowledgement-force" },
  { name: "Kairos", what: "Paste your notes and it books your tasks", part: "Our own product", when: "Rebuilding", status: "In the works", img: "/products/kairos/week.webp", href: "/work/kairos" },
  { name: "morgue", what: "Web animations your AI tools can rebuild", part: "Our own product", when: "Waitlist", status: "In the works", img: "/products/morgue/desktop.webp", href: "/products" },
  { name: "GovChat", what: "Find Australian government data in plain English", part: "Our own product", when: "Demo offline", status: "In the works", img: "/products/govchat/trust.webp", href: "/work/govchat" },
];

const FILLS = [
  ["#4da3ff", "#070707"],
  ["#ffe100", "#070707"],
  ["#c8102e", "#ffffff"],
  ["#f3f1ec", "#070707"],
];

const STATUS_ICON: Record<string, string> = { Live: "st-live", Released: "st-rel", "In the works": "st-wip" };

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

const RISK_CHECK = "Eight questions, two minutes. You get a score, your top three risks, and one thing to do about each this week.";

export default function HomePage()
{
  return (
    <div className="home">
      <section className="stage" id="stage" aria-label="What we do">
        <Soft name="tram" phone="walker" className="soft-hero" eager />
        <div className="hero-top">
          <h1>
            <span className="ln">
              <span>We build and launch</span>
            </span>{" "}
            <span className="ln">
              <span>software for founders.</span>
            </span>
          </h1>
          <div className="hero-sub">
            <p>A development agency in Melbourne. Your software, live by the date we agree, or you stop paying.</p>
            <Link className="btn js-start" href="/start" data-curtain="#ffe100">
              Start a project
            </Link>
          </div>
        </div>

        <StaticWord className="static-word" />

        <div className="ch ch-hoddle">
          <div className="win" id="win-hoddle" />
        </div>

        <div className="film pre" id="film">
          <Image className="cut" src="/work/kdg/new/hero.webp" alt="" fill sizes="100vw" loading="eager" />
          <Image className="cut" src="/work/krishnaveni/homepage.webp" alt="" fill sizes="100vw" />
          <Image className="cut" src="/work/hoddle/new/matching.webp" alt="" fill sizes="100vw" />
          <Image className="cut" src="/work/kdg/gallery.webp" alt="" fill sizes="100vw" />
          <Image className="cut cut-home cut-home-d" src="/work/hoddle/new/home.webp" alt="Hoddle’s home page." fill sizes="100vw" />
          <Image className="cut cut-home cut-home-p" src="/work/hoddle/new/phone-home.webp" alt="Hoddle’s home page." fill sizes="100vw" />
          <video id="v-hoddle" data-src="/work/hoddle/loop.mp4" data-poster="/work/hoddle/poster.jpg" muted loop playsInline preload="none" aria-hidden="true" />
        </div>

        <div className="ch-text pre" id="t-hoddle">
          <h2 className="ch-name hd-name">Hoddle</h2>
          <p className="what hd-line">A mentoring platform for first-year international students in Melbourne.</p>
          <div className="hd-facts">
            <p className="fact">
              <span>Our part</span>Co-founder and CTO
            </p>
            <p className="fact">
              <span>Took</span>Six weeks
            </p>
            <p className="fact">
              <span>Status</span>Live
            </p>
          </div>
          <blockquote className="quote hd-quote">
            “Usually the website is the cherry on top, but for us, Hoddle became the cake.”
            <cite>Chirag P Agarwal, co-founder, Hoddle Melbourne</cite>
          </blockquote>
        </div>

        <div className="wordmark pre" id="wordmark" role="img" aria-label="clupai">
          <div className="w-group w-clup" />
          <div className="w-group w-ai" />
        </div>

        <div className="ch ch-kdg pre" id="ch-kdg">
          <h2 className="ch-name kd-name">King Double Glazing</h2>
          <div className="kd-film">
            <Image src="/work/kdg/new/hero.webp" alt="The King Double Glazing home page." fill sizes="(max-width: 720px) 100vw, 50vw" />
            <video id="v-kdg" data-src="/work/kdg/loop.mp4" data-poster="/work/kdg/poster.jpg" muted loop playsInline preload="none" aria-hidden="true" />
          </div>
          <div className="kd-num" id="kd-num">
            75<i> → </i>
            <span id="kd-val">99</span>
          </div>
          <div className="kd-side">
            <p className="fact">
              <span>Google’s desktop score</span>A new brand, a new site and an instant price tool, in five weeks. Live.
            </p>
            <blockquote className="quote">
              “The calculator came out exactly how I had it in my head.”
              <cite>Tas, King Double Glazing, Melbourne</cite>
            </blockquote>
          </div>
        </div>

        <div className="ch ch-school pre" id="ch-school">
          <div className="sc-pic" id="sc-pic">
            <Image src="/work/krishnaveni/homepage.webp" alt="The Krishnaveni School home page." fill sizes="(max-width: 720px) 100vw, 58vw" />
          </div>
          <h2 className="ch-name sc-name">Krishnaveni School</h2>
          <div className="sc-copy">
            <blockquote className="quote">
              “What we asked for, he delivered. Then he delivered more.”
              <cite>Krishnaveni School, India</cite>
            </blockquote>
            <p className="fact">
              <span>Built for a client, live</span>A school website its staff can run on their own.
            </p>
          </div>
        </div>
      </section>

      <section className="promise" id="promise" aria-label="Our promise">
        <Soft name="blinds" className="soft-promise" />
        <p className="promise-t" id="promise-t">
          <span className="fw">Your</span> <span className="fw">software</span> <span className="fw">live</span>{" "}
          <span className="fw">by</span> <span className="fw">the</span>{" "}
          <span className="chip c-y">
            <i className="chip-bg" />
            <span className="fw">date</span>
          </span>{" "}
          <span className="fw">we</span> <span className="fw">agree,</span> <span className="fw">or</span>{" "}
          <span className="fw">you</span>{" "}
          <span className="chip c-r" id="chip-stop">
            <i className="chip-bg" />
            <span className="fw">stop</span> <span className="fw">paying.</span>
          </span>
        </p>
        <div className="promise-end">
          <span>In writing, in the contract. Here’s how it works.</span>
        </div>
      </section>

      <section className="how" id="how" aria-label="How it works">
        <div className="how-l">
          <article className="st st1">
            <h3>Scope</h3>
            <p>Scoping comes first and takes one to two weeks. It’s paid, and it comes off the build. You get a written scope, a clickable prototype, and a fixed price and date. They’re yours to keep, even if you go elsewhere.</p>
          </article>
          <article className="st st2 pre">
            <h3>Sign</h3>
            <p>You have a scope, a prototype, a price and a date. You sign and pay 50%. Your code sits in your GitHub from day one.</p>
          </article>
          <article className="st st3 pre">
            <h3>Click</h3>
            <p>First working version. You click it before you pay the next 30%.</p>
          </article>
          <article className="st st4 pre">
            <h3>Live</h3>
            <p>Live, by the date we agreed. That’s when the last 20% is due.</p>
          </article>
          <article className="st st5 pre">
            <h3>Miss the date?</h3>
            <p className="big">Everything unpaid is cancelled. We finish it free, you keep what’s built, and money already paid stays paid.</p>
            <ul>
              <li>It needs a signed scope.</li>
              <li>It needs replies from you within 48 hours.</li>
              <li>Any change to the scope resets the date and price, in writing.</li>
            </ul>
            <p className="small">No client has used this guarantee yet.</p>
          </article>
        </div>
        <div className="how-r" id="how-r">
          <div className="twr" id="twr">
            <div className="tw tw-20 pre">
              <div className="tw-i i-20">
                <b>20%</b>
                <span className="tw-t">Live</span>
                <div className="flag" id="flag">
                  <i>Live</i>
                </div>
                <div className="stick">Cancelled</div>
              </div>
            </div>
            <div className="tw tw-30 pre">
              <div className="tw-i i-30">
                <b>30%</b>
                <span className="tw-t">You’ve clicked it</span>
                <div className="stick">Cancelled</div>
              </div>
            </div>
            <div className="tw tw-50 pre">
              <div className="tw-i">
                <b>50%</b>
                <span className="tw-t">You sign</span>
                <div className="stick st-a" id="stick-paid">
                  Paid stays paid
                </div>
                <div className="stick st-b" id="stick-free">
                  We finish it free
                </div>
              </div>
            </div>
            <div className="tw-pad">Scoping comes off the build</div>
          </div>
          <button className="miss pre" id="miss" type="button" disabled>
            Miss the date
          </button>
        </div>
        <div className="how-fall" id="how-fall" />
      </section>

      <section className="ask" id="ask" aria-labelledby="ask-h">
        <Soft name="i-sun" className="soft-ask" />
        <h2 id="ask-h">What are you building?</h2>
        <p className="ask-sub">{RISK_CHECK}</p>
        <div className="toys">
          {ANSWERS.map((a, i) => (
            <Link key={a.key} className={`toy toy-${i} pre`} href={`/start?what=${a.key}`} data-curtain={a.colour} draggable={false}>
              <i className="toy-bg" />
              <span className="lbl-w">
                <span className="lbl">{a.label}</span>
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="board" id="board" aria-labelledby="board-h">
        <h2 className="board-h" id="board-h">
          Everything we’ve launched, and what’s next.
        </h2>
        <div className="board-head" aria-hidden="true">
          <span>Project</span>
          <span>What it is</span>
          <span>Our part</span>
          <span>When</span>
          <span>Status</span>
        </div>
        <div className="b-rows">
          {BOARD.map((r, i) => (
            <Link
              key={r.name}
              className="b-row"
              href={r.href}
              data-img={r.img}
              data-status={r.status}
              style={{ "--fill": FILLS[i % 4]![0], "--on": FILLS[i % 4]![1] } as CSSProperties}
            >
              <span className="r-name js-scr">{r.name}</span>
              <span className="r-dim r-what">{r.what}</span>
              <span className="r-dim r-part">{r.part}</span>
              <span className="r-dim r-when js-scr">{r.when}</span>
              <span className={`r-st ${r.status === "Live" ? "is-live" : ""}`}>
                <i className={`st-i ${STATUS_ICON[r.status]}`} />
                <span className="js-scr">{r.status}</span>
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="founder" id="founder" aria-label="Who answers for your date">
        <div className="founder-pic" id="founder-pic">
          <div className="founder-img">
            <Image src="/sam.jpeg" alt="Samridh Limbu, founder of Clupai" fill sizes="(max-width: 720px) 100vw, 46vw" />
          </div>
        </div>
        <div className="founder-copy">
          <p className="founder-q">“I take your first call, scope your build, and put my name on the date.”</p>
          <p className="founder-meta">
            <b>Samridh Limbu, founder</b>
            Melbourne, Australia
            <br />A GovHack 2025 winner
            <br />
            2nd at Study Melbourne Leadership 4Impact
          </p>
        </div>
      </section>

      <section className="faq" id="faq" aria-labelledby="faq-h">
        <div className="faq-side">
          <h2 id="faq-h">What you’ll ask us.</h2>
          <Soft name="calendar" className="faq-soft" />
        </div>
        <div className="faq-list">
          {QUESTIONS.map((f, i) => (
            <details key={f.q} name="faq" open={i === 0}>
              <summary>{f.q}</summary>
              <p>{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="close" id="close" aria-labelledby="close-t">
        <div className="close-ask">
          <div>
            <h2 className="close-t" id="close-t">
              Start a project.
            </h2>
            <p className="close-sub">{RISK_CHECK}</p>
            <Soft name="i-red" className="close-soft" />
          </div>
          <div>
            <p className="close-q">What are you building?</p>
            <ul className="close-ans">
              {ANSWERS.map((a) => (
                <li key={a.key}>
                  <Link className="close-btn" href={`/start?what=${a.key}`} data-curtain="#4da3ff">
                    {a.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="close-end" id="close-end">
          <Soft name="van" className="soft-end" />
          <StaticWord className="static-word" />
          <div className="end-word" id="end-word" role="img" aria-label="clupai" />
        </div>
      </section>
    </div>
  );
}
