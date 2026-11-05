"use client";

import Image from "next/image";
import { type FormEvent, useCallback, useEffect, useRef, useState } from "react";
import { track } from "@/lib/track";

const TZ = "Australia/Melbourne";
// Cal.com's minimum notice is 4 hours. The extra 10 minutes covers its cache and filling in the form.
const MIN_NOTICE_MS = (4 * 60 + 10) * 60 * 1000;
const WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

type Slot = { time: string };
type SlotsMap = Record<string, Slot[]>;

export type BookingPrefill = {
  name?: string;
  email?: string;
  phone?: string;
  projectType?: string;
  budget?: string;
};

function daysInMonth(y: number, m: number)
{
  return new Date(y, m, 0).getDate();
}

function firstDayOffset(y: number, m: number)
{
  const d = new Date(y, m - 1, 1).getDay();
  return d === 0 ? 6 : d - 1;
}

function toDateStr(y: number, m: number, d: number)
{
  return `${y}-${String(m).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
}

function monthLabel(y: number, m: number)
{
  return new Date(y, m - 1).toLocaleDateString("en-AU", { month: "long", year: "numeric" });
}

function timeLabel(iso: string)
{
  return new Date(iso).toLocaleTimeString("en-AU", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
    timeZone: TZ,
  });
}

function dateLabel(dateStr: string)
{
  const [y, m, d] = dateStr.split("-").map(Number) as [number, number, number];
  return new Date(y, m - 1, d).toLocaleDateString("en-AU", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });
}

function bookableSlots(slots: SlotsMap, date: string)
{
  return (slots[date] ?? []).filter((slot) => new Date(slot.time).getTime() > Date.now() + MIN_NOTICE_MS);
}

export default function CalBooking({ prefill = {} }: { prefill?: BookingPrefill })
{
  const [today] = useState(() => new Date());
  const todayStr = toDateStr(today.getFullYear(), today.getMonth() + 1, today.getDate());

  const [viewY, setViewY] = useState(today.getFullYear());
  const [viewM, setViewM] = useState(today.getMonth() + 1);
  const [slots, setSlots] = useState<SlotsMap>({});
  const [loading, setLoading] = useState(true);
  const [loadFailed, setLoadFailed] = useState(false);

  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);

  const [name, setName] = useState(prefill.name ?? "");
  const [email, setEmail] = useState(prefill.email ?? "");
  const [phone, setPhone] = useState(prefill.phone ?? "");
  const [submitting, setSubmitting] = useState(false);
  const [submitErr, setSubmitErr] = useState<string | null>(null);
  const [booked, setBooked] = useState<{ date: string; slot: string; email: string } | null>(null);

  // Soonest first: open on the first day with a time left, and on next month if this one is full.
  const openedOnSoonest = useRef(false);
  const inFlight = useRef(false);

  useEffect(() => {
    let cancelled = false;
    fetch(`/api/cal/slots?month=${viewY}-${String(viewM).padStart(2, "0")}&tz=${encodeURIComponent(TZ)}`)
      .then((res) => res.json())
      .then((data: { data?: { slots?: SlotsMap } }) => {
        if (cancelled) {
          return;
        }
        const loaded = data?.data?.slots;
        if (!loaded) {
          setLoadFailed(true);
          return;
        }
        setLoadFailed(false);
        setSlots(loaded);
        if (!openedOnSoonest.current) {
          const soonest = Object.keys(loaded)
            .sort()
            .find((date) => date >= todayStr && bookableSlots(loaded, date).length > 0);
          if (soonest) {
            openedOnSoonest.current = true;
            setSelectedDate(soonest);
          } else if (viewY === today.getFullYear() && viewM === today.getMonth() + 1) {
            setViewY(viewM === 12 ? viewY + 1 : viewY);
            setViewM(viewM === 12 ? 1 : viewM + 1);
          } else {
            openedOnSoonest.current = true;
          }
        }
      })
      .catch(() => {
        if (!cancelled) {
          setLoadFailed(true);
        }
      })
      .finally(() => {
        if (!cancelled) {
          setLoading(false);
        }
      });
    return () => {
      cancelled = true;
    };
  }, [today, todayStr, viewM, viewY]);

  const moveMonth = useCallback(
    (delta: 1 | -1) => {
      const next = new Date(viewY, viewM - 1 + delta, 1);
      openedOnSoonest.current = true;
      setLoading(true);
      setViewY(next.getFullYear());
      setViewM(next.getMonth() + 1);
      setSelectedDate(null);
      setSelectedSlot(null);
    },
    [viewM, viewY],
  );

  async function submit(e: FormEvent)
  {
    e.preventDefault();
    if (!selectedDate || !selectedSlot || inFlight.current) {
      return;
    }
    inFlight.current = true;
    setSubmitting(true);
    setSubmitErr(null);
    try {
      const res = await fetch("/api/cal/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          start: selectedSlot,
          name,
          email,
          phone,
          projectType: prefill.projectType ?? "",
          budget: prefill.budget ?? "",
        }),
      });
      if (res.ok) {
        track("Schedule");
        setBooked({ date: selectedDate, slot: selectedSlot, email });
      } else {
        setSubmitErr("That didn’t go through. Try another time, or email hello@clupai.com.");
      }
    } catch {
      setSubmitErr("Your connection dropped. Please try again.");
    } finally {
      inFlight.current = false;
      setSubmitting(false);
    }
  }

  if (booked) {
    return (
      <div className="bk bk-done" data-ui>
        <h3 className="t-state">Request received.</h3>
        <p>
          {dateLabel(booked.date)} at {timeLabel(booked.slot)}, Melbourne time.
        </p>
        <p className="t-small" style={{ marginTop: 10 }}>
          We’ll confirm your time shortly. The calendar invite goes to {booked.email}.
        </p>
      </div>
    );
  }

  const days = daysInMonth(viewY, viewM);
  const offset = firstDayOffset(viewY, viewM);
  const canGoBack = !(viewY === today.getFullYear() && viewM === today.getMonth() + 1);
  const dateSlots = selectedDate ? bookableSlots(slots, selectedDate) : [];
  const hasTimes = Object.keys(slots).some((date) => date >= todayStr && bookableSlots(slots, date).length > 0);

  return (
    <div className="bk" data-ui>
      <div className="bk-head">
        <Image src="/sam-small.jpeg" alt="" width={48} height={48} />
        <div>
          <p className="bk-who">Samridh Limbu, Clupai</p>
          <p className="t-small">30 minutes on Google Meet, Melbourne time</p>
        </div>
      </div>

      {prefill.name || prefill.email ? (
        <p className="bk-note t-small">
          Your details are filled in{prefill.name ? `, ${prefill.name.split(" ")[0]}` : ""}. Just pick a time.
        </p>
      ) : null}

      {loadFailed ? (
        <p className="bk-note">
          We can’t load times right now. Email{" "}
          <a className="tlink" href="mailto:hello@clupai.com">
            hello@clupai.com
          </a>{" "}
          and we’ll sort one out.
        </p>
      ) : (
        <div className="bk-grid">
          <div>
            <div className="bk-month">
              <p className="bk-who">{monthLabel(viewY, viewM)}</p>
              <div className="bk-nav">
                <button
                  type="button"
                  onClick={() => moveMonth(-1)}
                  disabled={!canGoBack || submitting}
                  aria-label="Previous month"
                >
                  ‹
                </button>
                <button type="button" onClick={() => moveMonth(1)} disabled={submitting} aria-label="Next month">
                  ›
                </button>
              </div>
            </div>
            <div className="bk-days">
              {WEEKDAYS.map((d) => (
                <span key={d} className="bk-wd t-small" aria-hidden="true">
                  {d.charAt(0)}
                </span>
              ))}
              {Array.from({ length: offset }, (_, i) => (
                <span key={`gap${i}`} />
              ))}
              {Array.from({ length: days }, (_, i) => {
                const ds = toDateStr(viewY, viewM, i + 1);
                const open = ds >= todayStr && bookableSlots(slots, ds).length > 0;
                return (
                  <button
                    key={ds}
                    type="button"
                    className="bk-day"
                    disabled={!open || submitting}
                    aria-pressed={selectedDate === ds}
                    aria-label={dateLabel(ds)}
                    onClick={() => {
                      setSelectedDate(ds);
                      setSelectedSlot(null);
                    }}
                  >
                    {i + 1}
                  </button>
                );
              })}
            </div>
            {!loading && !hasTimes ? (
              <p className="t-small" style={{ marginTop: 12 }}>
                No times left this month. Try the next one.
              </p>
            ) : null}
          </div>

          <div>
            {selectedDate ? (
              <>
                <p className="bk-who" style={{ marginBottom: 12 }}>
                  {dateLabel(selectedDate)}
                </p>
                {dateSlots.length === 0 ? (
                  <p className="t-small">No times left on this day.</p>
                ) : (
                  <div className="bk-slots" data-lenis-prevent>
                    {dateSlots.map((slot) => (
                      <button
                        key={slot.time}
                        type="button"
                        className="bk-slot"
                        aria-pressed={selectedSlot === slot.time}
                        disabled={submitting}
                        onClick={() => setSelectedSlot(slot.time)}
                      >
                        {timeLabel(slot.time)}
                      </button>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <p className="t-small">{loading ? "Loading times" : "Pick a day to see times."}</p>
            )}
          </div>
        </div>
      )}

      {selectedSlot && selectedDate ? (
        <form className="bk-form" onSubmit={submit}>
          <div className="bk-fields">
            <div className="field">
              <label htmlFor="bk-name">Your name</label>
              <input
                id="bk-name"
                autoComplete="name"
                required
                readOnly={submitting}
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="field">
              <label htmlFor="bk-email">Email</label>
              <input
                id="bk-email"
                type="email"
                autoComplete="email"
                required
                readOnly={submitting}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="field">
              <label htmlFor="bk-phone">Mobile (optional)</label>
              <input
                id="bk-phone"
                type="tel"
                autoComplete="tel"
                readOnly={submitting}
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
          </div>
          {submitErr ? <p className="field-error">{submitErr}</p> : null}
          <button type="submit" className="btn" disabled={submitting} style={{ width: "100%", marginTop: 6 }}>
            {submitting ? "Booking" : `Book ${timeLabel(selectedSlot)}`}
          </button>
        </form>
      ) : null}
    </div>
  );
}
