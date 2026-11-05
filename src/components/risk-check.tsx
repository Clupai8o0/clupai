"use client";

import { Turnstile, type TurnstileInstance } from "@marsidev/react-turnstile";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { type FormEvent, useCallback, useEffect, useLayoutEffect, useRef, useState, useSyncExternalStore } from "react";
import { FunnelBack, FunnelTop } from "@/components/funnel-chrome";
import { writePrefill } from "@/lib/prefill";
import { encodeAnswers, questions } from "@/lib/risk-check";
import { track } from "@/lib/track";

const SAVE_KEY = "clupai-risk-check";
const SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? "";
const ADVANCE_MS = 140;
// With motion on, the block has to land and the question has to leave first.
const ADVANCE_MOTION_MS = 620;
// If the bot check hasn't answered by now, it's blocked or broken. Let them through; the server decides.
const TURNSTILE_WAIT_MS = 10000;
const noopSubscribe = () => () => undefined;

type Progress = { answers: number[]; step: number };

const START: Progress = { answers: [], step: 0 };

// A toy or answer on the home page lands here with ?what=<key>: that answer is question one, done.
function answerFromLink(saved: Progress): Progress
{
  const what = new URLSearchParams(window.location.search).get("what");
  const picked = questions[0]!.answers.findIndex((a) => a.key === what);
  if (picked < 0 || saved.answers[0] === picked) {
    return saved;
  }
  return { answers: [picked], step: 1 };
}

function loadProgress(): Progress
{
  try {
    const saved: unknown = JSON.parse(window.localStorage.getItem(SAVE_KEY) ?? "null");
    if (typeof saved !== "object" || saved === null) {
      return START;
    }
    const { answers, step } = saved as Partial<Progress>;
    const valid =
      Array.isArray(answers) &&
      answers.length <= questions.length &&
      answers.every((a, i) => Number.isInteger(a) && a >= 0 && a < questions[i]!.answers.length) &&
      Number.isInteger(step) &&
      (step as number) >= 0 &&
      (step as number) <= answers.length;
    return valid ? { answers: answers as number[], step: step as number } : START;
  } catch {
    return START;
  }
}

function Flow({ restore }: { restore: boolean })
{
  const router = useRouter();
  const [progress, setProgress] = useState<Progress>(() => (restore ? loadProgress() : START));
  const [picked, setPicked] = useState<number | null>(null);
  const [moved, setMoved] = useState(false);
  const [sending, setSending] = useState(false);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const firstRender = useRef(true);
  const advance = useRef<number | undefined>(undefined);

  const { answers, step } = progress;
  const onDetails = step >= questions.length;

  // Not in useState: on a client-side navigation the address bar only changes after the first render.
  useLayoutEffect(() => {
    if (restore) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- the address bar is outside React, and a layout effect paints no wrong question first.
      setProgress(answerFromLink);
    }
  }, [restore]);

  // The server-rendered pass starts empty, so it must not write over saved progress.
  useEffect(() => {
    if (!restore) {
      return;
    }
    try {
      window.localStorage.setItem(SAVE_KEY, JSON.stringify(progress));
    } catch {
      // Without storage the check still works. It just won't survive a refresh.
    }
  }, [progress, restore]);

  // Each screen replaces the last, so focus and scroll have to move with it.
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    window.scrollTo(0, 0);
    headingRef.current?.focus({ preventScroll: true });
  }, [step]);

  // The ref locks straight away. State wouldn't: two key presses can land before a render.
  const choose = useCallback((index: number) => {
    if (advance.current !== undefined) {
      return;
    }
    setPicked(index);
    const wait = document.documentElement.classList.contains("m") ? ADVANCE_MOTION_MS : ADVANCE_MS;
    advance.current = window.setTimeout(() => {
      advance.current = undefined;
      setProgress((prev) => {
        const next = [...prev.answers];
        next[prev.step] = index;
        return { answers: next, step: prev.step + 1 };
      });
      setPicked(null);
      setMoved(true);
    }, wait);
  }, []);

  // A pick still waiting to advance would land on the wrong question, so going back cancels it.
  const back = useCallback(() => {
    window.clearTimeout(advance.current);
    advance.current = undefined;
    setPicked(null);
    setMoved(true);
    setProgress((prev) => ({ ...prev, step: Math.max(0, prev.step - 1) }));
  }, []);

  useEffect(() => {
    if (onDetails) {
      return;
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.repeat || e.metaKey || e.ctrlKey || e.altKey) {
        return;
      }
      if (e.key === "Backspace") {
        e.preventDefault();
        back();
        return;
      }
      const index = Number(e.key) - 1;
      if (Number.isInteger(index) && index >= 0 && index < questions[step]!.answers.length) {
        choose(index);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [back, choose, onDetails, step]);

  const code = encodeAnswers(answers.slice(0, questions.length));
  const done = Math.min(step, questions.length);
  // funnel.js builds the tower from this, so it stays right through Back, a reload and a late start.
  const tower = [...answers.slice(0, step), ...(picked === null ? [] : [picked])].join("");
  const label = onDetails ? "Last step" : `Question ${step + 1} of ${questions.length}`;
  const backButton = step > 0 ? (
    <button type="button" className="f-link" onClick={back} disabled={sending}>
      Back
    </button>
  ) : null;

  return (
    <div className="fun fun-q" data-tower={tower} data-moved={moved ? "" : undefined}>
      <FunnelBack picture={Math.min(2, Math.floor(step / 3))} />
      <FunnelTop label={label}>{backButton}</FunnelTop>
      <div
        className="f-bar"
        role="progressbar"
        aria-label="Progress through the check"
        aria-valuemin={0}
        aria-valuemax={questions.length}
        aria-valuenow={done}
      >
        <i style={{ transform: `scaleX(${done / questions.length})` }} />
      </div>

      <noscript>
        <NoScriptCheck />
      </noscript>

      {onDetails ? (
        <Details
          headingRef={headingRef}
          onSending={setSending}
          onDone={(path) => {
            try {
              window.localStorage.removeItem(SAVE_KEY);
            } catch {
              // Nothing to clear.
            }
            router.push(path);
          }}
          code={code}
        />
      ) : (
        <div key={step} className={`f-body f-live${picked === null ? "" : " is-leaving"}`}>
          {step === 0 ? (
            <p className="f-intro">
              Eight questions, two minutes. You get a score, your top three risks, and one thing to do about each this
              week.
            </p>
          ) : null}
          <h1 ref={headingRef} className="f-q" tabIndex={-1}>
            <span className="f-q-in">{questions[step]!.title}</span>
          </h1>
          <ul className="f-ans">
            {questions[step]!.answers.map((answer, i) => (
              <li key={answer.key}>
                <button
                  type="button"
                  className="ans"
                  aria-pressed={picked === null ? answers[step] === i : picked === i}
                  onClick={() => choose(i)}
                >
                  <span>{answer.label}</span>
                  <kbd aria-hidden="true">{i + 1}</kbd>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

// Without JavaScript there's no one-at-a-time flow, so all eight go on one page and the result page does the sum.
function NoScriptCheck()
{
  return (
    <form className="f-body f-plain" action="/start/result" method="get">
      <h1 className="f-q">Build Risk Check</h1>
      <p className="f-intro">
        Eight questions, two minutes. You get a score, your top three risks, and one thing to do about each this week.
        Nothing gets emailed from this version, so bookmark your result.
      </p>
      {questions.map((q, n) => (
        <fieldset key={q.id} className="f-set">
          <legend>{q.title}</legend>
          {q.answers.map((a, i) => (
            <label key={a.key}>
              <input type="radio" name={`q${n}`} value={i} required />
              <span>{a.label}</span>
            </label>
          ))}
        </fieldset>
      ))}
      <button type="submit" className="btn">
        See my result
      </button>
    </form>
  );
}

function Details({
  code,
  headingRef,
  onSending,
  onDone,
}: {
  code: string;
  headingRef: React.RefObject<HTMLHeadingElement | null>;
  onSending: (sending: boolean) => void;
  onDone: (path: string) => void;
})
{
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [website, setWebsite] = useState("");
  const [token, setToken] = useState("");
  const [sending, setSending] = useState(false);
  const [gaveUpOnCheck, setGaveUpOnCheck] = useState(false);
  const turnstileRef = useRef<TurnstileInstance>(null);
  const inFlight = useRef(false);

  useEffect(() => {
    if (!SITE_KEY) {
      return;
    }
    const timer = window.setTimeout(() => setGaveUpOnCheck(true), TURNSTILE_WAIT_MS);
    return () => window.clearTimeout(timer);
  }, []);

  async function submit(e: FormEvent)
  {
    e.preventDefault();
    if (inFlight.current) {
      return;
    }
    inFlight.current = true;
    setSending(true);
    onSending(true);
    let sent = false;
    try {
      const res = await fetch("/api/start-capture", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          code,
          name,
          email,
          phone,
          website,
          ...(SITE_KEY ? { turnstileToken: token } : {}),
        }),
      });
      if (res.ok) {
        const data = (await res.json()) as { sent?: boolean };
        sent = data.sent === true;
        track("Lead");
      }
    } catch {
      // They still get their result. The page says the email didn't go out.
    }
    writePrefill({ name, email, phone, notSent: !sent });
    onDone(`/start/result?r=${code}`);
  }

  return (
    <div className="f-body f-live">
      <h1 ref={headingRef} className="f-q" tabIndex={-1}>
        <span className="f-q-in">Where do we send your result?</span>
      </h1>
      <p className="f-intro">You’ll see it straight away. We email you a copy to keep.</p>
      <div className="f-details">
        <form onSubmit={submit} className="f-form">
          <div className="field">
            <label htmlFor="rc-name">Your name</label>
            <input
              id="rc-name"
              name="name"
              autoComplete="name"
              required
              maxLength={120}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="field">
            <label htmlFor="rc-email">Email</label>
            <input
              id="rc-email"
              name="email"
              type="email"
              autoComplete="email"
              required
              maxLength={254}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="field">
            <label htmlFor="rc-phone">Mobile (optional)</label>
            <input
              id="rc-phone"
              name="phone"
              type="tel"
              autoComplete="tel"
              maxLength={40}
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div className="hp" aria-hidden="true">
            <label htmlFor="rc-website">Website</label>
            <input
              id="rc-website"
              name="website"
              tabIndex={-1}
              autoComplete="off"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
            />
          </div>
          {SITE_KEY ? (
            <div className="f-wide">
              <Turnstile
                ref={turnstileRef}
                siteKey={SITE_KEY}
                onSuccess={setToken}
                onExpire={() => setToken("")}
                onError={() => setGaveUpOnCheck(true)}
                onTimeout={() => setGaveUpOnCheck(true)}
                onUnsupported={() => setGaveUpOnCheck(true)}
              />
            </div>
          ) : null}
          <button type="submit" className="btn f-send" disabled={sending || (Boolean(SITE_KEY) && !token && !gaveUpOnCheck)}>
            {sending ? "Working it out" : "See my result"}
          </button>
          <p className="f-small f-wide">
            We use this to send your result and to prepare if you book a call. See our{" "}
            <Link className="tlink" href="/privacy">
              privacy policy
            </Link>
            .
          </p>
        </form>
      </div>
    </div>
  );
}

// The server renders question one. Saved progress can only be read in the browser, so the
// flow remounts once the page is running there.
export default function RiskCheck()
{
  const inBrowser = useSyncExternalStore(
    noopSubscribe,
    () => true,
    () => false,
  );
  return <Flow key={inBrowser ? "browser" : "server"} restore={inBrowser} />;
}
