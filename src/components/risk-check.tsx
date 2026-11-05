"use client";

import { Turnstile, type TurnstileInstance } from "@marsidev/react-turnstile";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { type FormEvent, useCallback, useEffect, useLayoutEffect, useRef, useState, useSyncExternalStore } from "react";
import { writePrefill } from "@/lib/prefill";
import { encodeAnswers, questions } from "@/lib/risk-check";
import { track } from "@/lib/track";

const SAVE_KEY = "clupai-risk-check";
const SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? "";
const ADVANCE_MS = 140;
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

// The ground changes colour with each question, so moving on feels like moving on.
const GROUNDS = ["f-orange", "f-sage", "f-yellow"];

function Flow({ restore }: { restore: boolean })
{
  const router = useRouter();
  const [progress, setProgress] = useState<Progress>(() => (restore ? loadProgress() : START));
  const [picked, setPicked] = useState<number | null>(null);
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
    advance.current = window.setTimeout(() => {
      advance.current = undefined;
      setProgress((prev) => {
        const next = [...prev.answers];
        next[prev.step] = index;
        return { answers: next, step: prev.step + 1 };
      });
      setPicked(null);
    }, ADVANCE_MS);
  }, []);

  // A pick still waiting to advance would land on the wrong question, so going back cancels it.
  const back = useCallback(() => {
    window.clearTimeout(advance.current);
    advance.current = undefined;
    setPicked(null);
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

  return (
    <div className={`rc ${GROUNDS[step % GROUNDS.length]}`}>
      <div
        className="rc-progress"
        role="progressbar"
        aria-label="Progress through the check"
        aria-valuemin={0}
        aria-valuemax={questions.length}
        aria-valuenow={Math.min(step, questions.length)}
      >
        <i style={{ transform: `scaleX(${Math.min(step, questions.length) / questions.length})` }} />
      </div>

      {onDetails ? (
        <Details
          headingRef={headingRef}
          onBack={back}
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
        <div className="rc-body">
          <div>
            <h1 key={step} ref={headingRef} className="rc-q rc-q-enter" tabIndex={-1}>
              {questions[step]!.title}
            </h1>
            <div className="rc-foot">
              <p className="rc-step t-small">
                Question {step + 1} of {questions.length}
              </p>
              {step > 0 ? (
                <button type="button" className="rc-back" onClick={back}>
                  Back
                </button>
              ) : null}
            </div>
          </div>
          <div>
            <ul key={step} className="rc-answers rc-q-enter">
              {questions[step]!.answers.map((answer, i) => (
                <li key={answer.key}>
                  <button
                    type="button"
                    className="rc-answer"
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
        </div>
      )}
    </div>
  );
}

function Details({
  code,
  headingRef,
  onBack,
  onDone,
}: {
  code: string;
  headingRef: React.RefObject<HTMLHeadingElement | null>;
  onBack: () => void;
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
    <div className="rc-body">
      <div>
        <h1 ref={headingRef} className="rc-q rc-q-enter" tabIndex={-1}>
          Where do we send your result?
        </h1>
        <p className="t-lead" style={{ marginTop: 18, maxWidth: "24em" }}>
          You’ll see it straight away. We email you a copy to keep.
        </p>
        <div className="rc-foot">
          <p className="rc-step t-small">Last step</p>
          <button type="button" className="rc-back" onClick={onBack} disabled={sending}>
            Back
          </button>
        </div>
      </div>
      <div className="rc-q-enter">
        <form onSubmit={submit} style={{ maxWidth: "30rem" }}>
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
            <div style={{ marginBottom: 18 }}>
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
          <button type="submit" className="btn" disabled={sending || (Boolean(SITE_KEY) && !token && !gaveUpOnCheck)}>
            {sending ? "Working it out" : "See my result"}
          </button>
          <p className="t-small" style={{ marginTop: 16 }}>
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
