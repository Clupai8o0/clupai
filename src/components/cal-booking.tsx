"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";

const TZ = "Australia/Melbourne";
const DISPLAY = "var(--font-display), Manrope, ui-sans-serif, system-ui, sans-serif";
const MONO = 'var(--font-mono), "JetBrains Mono", ui-monospace, monospace';

// ─── Helpers ───────────────────────────────────────────────────────────────────

function daysInMonth(y: number, m: number) {
  return new Date(y, m, 0).getDate();
}

function firstDayOffset(y: number, m: number) {
  const d = new Date(y, m - 1, 1).getDay(); // 0=Sun
  return d === 0 ? 6 : d - 1; // Mon=0
}

function toDateStr(y: number, m: number, d: number) {
  return `${y}-${String(m).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
}

function monthLabel(y: number, m: number) {
  return new Date(y, m - 1).toLocaleDateString("en-AU", {
    month: "long",
    year: "numeric",
  });
}

function timeLabel(iso: string) {
  return new Date(iso).toLocaleTimeString("en-AU", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: TZ,
  });
}

function dateLabel(dateStr: string) {
  const [y, m, d] = dateStr.split("-").map(Number);
  return new Date(y, m - 1, d).toLocaleDateString("en-AU", {
    weekday: "short",
    day: "numeric",
    month: "long",
  });
}

// ─── Field components ──────────────────────────────────────────────────────────

function Label({ children }: { children: React.ReactNode }) {
  return (
    <label
      style={{
        fontFamily: MONO,
        fontSize: 10,
        letterSpacing: "0.08em",
        textTransform: "uppercase",
        color: "var(--text-muted)",
        display: "block",
        marginBottom: 6,
      }}
    >
      {children}
    </label>
  );
}

const inputBase: React.CSSProperties = {
  display: "block",
  width: "100%",
  background: "var(--bg)",
  border: "1px solid var(--border-2)",
  padding: "11px 13px",
  color: "var(--text)",
  fontFamily: DISPLAY,
  fontWeight: 500,
  fontSize: 14,
  borderRadius: "var(--radius)",
  outline: "none",
  transition: "border-color 0.15s",
};

function TextInput({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  required,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
  required?: boolean;
}) {
  const [focused, setFocused] = useState(false);
  return (
    <div>
      <Label>
        {label}
        {required && <span style={{ color: "var(--accent)", marginLeft: 3 }}>*</span>}
      </Label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{
          ...inputBase,
          borderColor: focused ? "var(--accent)" : "var(--border-2)",
        }}
      />
    </div>
  );
}

function SelectInput({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: string[];
}) {
  const [focused, setFocused] = useState(false);
  return (
    <div>
      <Label>{label}</Label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{
          ...inputBase,
          borderColor: focused ? "var(--accent)" : "var(--border-2)",
          color: value ? "var(--text)" : "var(--text-dim)",
          cursor: "pointer",
          appearance: "none",
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='10' viewBox='0 0 10 10'%3E%3Cpath d='M2 4l3 3 3-3' stroke='%236b6b6b' stroke-width='1.8' fill='none'/%3E%3C/svg%3E")`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "right 12px center",
          paddingRight: 32,
        }}
      >
        <option value="">Select...</option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </div>
  );
}

// ─── NavButton ─────────────────────────────────────────────────────────────────

function NavBtn({
  onClick,
  disabled,
  children,
}: {
  onClick: () => void;
  disabled?: boolean;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      style={{
        background: "transparent",
        border: "1px solid var(--border)",
        borderRadius: "var(--radius)",
        width: 28,
        height: 28,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.3 : 1,
        color: "var(--text)",
        padding: 0,
      }}
    >
      {children}
    </button>
  );
}

// ─── Types ─────────────────────────────────────────────────────────────────────

type Slot = { time: string };
type SlotsMap = Record<string, Slot[]>;

interface Form {
  name: string;
  email: string;
  projectType: string;
  budget: string;
  timeline: string;
  currentSite: string;
}

// ─── Main component ────────────────────────────────────────────────────────────

export default function CalBooking() {
  const today = new Date();
  const todayStr = toDateStr(today.getFullYear(), today.getMonth() + 1, today.getDate());

  const [viewY, setViewY] = useState(today.getFullYear());
  const [viewM, setViewM] = useState(today.getMonth() + 1);
  const [slots, setSlots] = useState<SlotsMap>({});
  const [loading, setLoading] = useState(true);
  const [slotsErr, setSlotsErr] = useState<string | null>(null);

  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);

  const [form, setForm] = useState<Form>({
    name: "",
    email: "",
    projectType: "",
    budget: "",
    timeline: "",
    currentSite: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitErr, setSubmitErr] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [bookedRef, setBookedRef] = useState("");

  const fetchSlots = useCallback(async (y: number, m: number) => {
    setLoading(true);
    setSlotsErr(null);
    try {
      const res = await fetch(
        `/api/cal/slots?month=${y}-${String(m).padStart(2, "0")}&tz=${encodeURIComponent(TZ)}`
      );
      const data = await res.json();
      if (data?.data?.slots) {
        setSlots(data.data.slots);
      } else {
        setSlotsErr(data?.detail ?? data?.error ?? "Could not load availability");
      }
    } catch {
      setSlotsErr("Network error");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSlots(viewY, viewM);
  }, [viewY, viewM, fetchSlots]);

  function prevMonth() {
    const [y, m] = viewM === 1 ? [viewY - 1, 12] : [viewY, viewM - 1];
    setViewY(y);
    setViewM(m);
    setSelectedDate(null);
    setSelectedSlot(null);
  }

  function nextMonth() {
    const [y, m] = viewM === 12 ? [viewY + 1, 1] : [viewY, viewM + 1];
    setViewY(y);
    setViewM(m);
    setSelectedDate(null);
    setSelectedSlot(null);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!selectedSlot) return;

    setSubmitting(true);
    setSubmitErr(null);

    try {
      const res = await fetch("/api/cal/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ start: selectedSlot, ...form }),
      });
      const data = await res.json();
      if (res.ok) {
        setBookedRef(data?.data?.uid ?? "confirmed");
        setSuccess(true);
      } else {
        setSubmitErr(data.error ?? "Booking failed — please email hello@clupai.com");
      }
    } catch {
      setSubmitErr("Network error — please try again");
    } finally {
      setSubmitting(false);
    }
  }

  const days = daysInMonth(viewY, viewM);
  const offset = firstDayOffset(viewY, viewM);
  const available = new Set(
    Object.keys(slots).filter((d) => (slots[d]?.length ?? 0) > 0)
  );
  const canPrev = !(viewY === today.getFullYear() && viewM === today.getMonth() + 1);
  const dateSlots = selectedDate ? (slots[selectedDate] ?? []) : [];

  const slotsScrollRef = useRef<HTMLDivElement>(null);
  const [slotsOverflow, setSlotsOverflow] = useState(false);

  useEffect(() => {
    const el = slotsScrollRef.current;
    if (!el) { setSlotsOverflow(false); return; }
    const check = () => setSlotsOverflow(el.scrollHeight > el.clientHeight);
    check();
    const ro = new ResizeObserver(check);
    ro.observe(el);
    return () => ro.disconnect();
  }, [dateSlots]);

  // ─── Success state ──────────────────────────────────────────────────────────

  if (success) {
    return (
      <div
        className="cp-card"
        style={{
          padding: "48px 32px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          gap: 20,
          minHeight: 320,
          justifyContent: "center",
        }}
      >
        <div
          style={{
            width: 52,
            height: 52,
            borderRadius: "50%",
            background: "rgba(77,163,255,0.08)",
            border: "1px solid var(--accent)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "var(--accent)",
          }}
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M4 10l5 5 7-8" />
          </svg>
        </div>
        <div>
          <div
            style={{
              fontFamily: DISPLAY,
              fontWeight: 700,
              fontSize: 24,
              letterSpacing: "-0.02em",
              marginBottom: 8,
            }}
          >
            You&apos;re booked in.
          </div>
          <div style={{ color: "var(--text-muted)", fontSize: 15, lineHeight: 1.5 }}>
            {selectedDate && selectedSlot && (
              <>{dateLabel(selectedDate)} · {timeLabel(selectedSlot)} AEST</>
            )}
          </div>
        </div>
        <p style={{ color: "var(--text-muted)", fontSize: 14, maxWidth: 300, margin: 0, lineHeight: 1.6 }}>
          Calendar invite sent to {form.email}. I&apos;ll have context from your
          answers before we speak.
        </p>
        <div className="cp-mono" style={{ color: "var(--text-dim)" }}>
          ref: {bookedRef}
        </div>
      </div>
    );
  }

  // ─── Calendar + booking form ────────────────────────────────────────────────

  return (
    <div className="cp-card" style={{ padding: 0, overflow: "hidden" }}>
      {/* Header */}
      <div
        style={{
          padding: "20px 24px",
          borderBottom: "1px solid var(--border)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 12,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <Image
            src="/sam-small.jpeg"
            alt="Sam Limbu"
            width={40}
            height={40}
            style={{ borderRadius: "50%", objectFit: "cover", flexShrink: 0 }}
          />
          <div>
            <div style={{ fontFamily: DISPLAY, fontWeight: 600 }}>
              Sam Limbu · clupai
            </div>
            <div className="cp-mono" style={{ color: "var(--text-muted)" }}>
              20 min · Google Meet · AEST
            </div>
          </div>
        </div>
        <div className="cp-mono" style={{ color: "var(--accent)" }}>
          cal.com/clupai/clupai-consultation
        </div>
      </div>

      {/* Calendar body */}
      <div style={{ padding: "28px 24px" }}>
        <div
          className="cp-cal-grid"
          style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}
        >
          {/* Month calendar */}
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: 14,
              }}
            >
              <span className="cp-mono">{monthLabel(viewY, viewM)}</span>
              <div style={{ display: "flex", gap: 4 }}>
                <NavBtn onClick={prevMonth} disabled={!canPrev}>
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M6 2L3 5l3 3" />
                  </svg>
                </NavBtn>
                <NavBtn onClick={nextMonth}>
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M4 2l3 3-3 3" />
                  </svg>
                </NavBtn>
              </div>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(7, 1fr)",
                gap: 2,
              }}
            >
              {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => (
                <div
                  key={i}
                  className="cp-mono"
                  style={{
                    textAlign: "center",
                    color: "var(--text-dim)",
                    fontSize: 10,
                    padding: "4px 0",
                  }}
                >
                  {d}
                </div>
              ))}

              {Array.from({ length: offset }, (_, i) => (
                <div key={`e${i}`} />
              ))}

              {Array.from({ length: days }, (_, i) => {
                const day = i + 1;
                const ds = toDateStr(viewY, viewM, day);
                const isAvail = available.has(ds);
                const isSel = selectedDate === ds;
                const isPast = ds < todayStr;
                const isToday = ds === todayStr;

                return (
                  <button
                    key={day}
                    type="button"
                    disabled={!isAvail || isPast}
                    onClick={() => {
                      if (!isAvail || isPast) return;
                      setSelectedDate(ds);
                      setSelectedSlot(null);
                    }}
                    style={{
                      padding: "8px 0",
                      textAlign: "center",
                      fontFamily: DISPLAY,
                      fontWeight: 500,
                      fontSize: 13,
                      borderRadius: 3,
                      background: isSel ? "var(--accent)" : "transparent",
                      color: isSel
                        ? "var(--accent-ink)"
                        : isAvail && !isPast
                        ? isToday
                          ? "var(--accent)"
                          : "var(--text)"
                        : "var(--text-dim)",
                      border: isToday && !isSel
                        ? "1px solid var(--border)"
                        : "1px solid transparent",
                      cursor: isAvail && !isPast ? "pointer" : "default",
                      opacity: isPast ? 0.3 : 1,
                      transition: "background 0.12s",
                    }}
                  >
                    {day}
                  </button>
                );
              })}
            </div>

            {loading && (
              <div
                className="cp-mono"
                style={{ marginTop: 10, color: "var(--text-dim)" }}
              >
                Loading...
              </div>
            )}
            {!loading && slotsErr && (
              <div
                className="cp-mono"
                style={{ marginTop: 10, color: "var(--accent)" }}
              >
                {slotsErr}
              </div>
            )}
            {!loading && !slotsErr && available.size === 0 && (
              <div
                className="cp-mono"
                style={{ marginTop: 10, color: "var(--text-dim)" }}
              >
                No slots this month
              </div>
            )}
          </div>

          {/* Time slots */}
          <div>
            {!selectedDate ? (
              <div
                className="cp-mono"
                style={{
                  color: "var(--text-dim)",
                  paddingTop: 32,
                  lineHeight: 1.6,
                }}
              >
                {!loading && available.size > 0
                  ? "Pick a date to see available times"
                  : ""}
              </div>
            ) : (
              <>
                <div className="cp-mono" style={{ marginBottom: 14 }}>
                  {dateLabel(selectedDate)} · AEST
                </div>
                {dateSlots.length === 0 ? (
                  <div className="cp-mono" style={{ color: "var(--text-dim)" }}>
                    No slots available
                  </div>
                ) : (
                  <div style={{ position: "relative" }}>
                    <div
                      ref={slotsScrollRef}
                      className="cp-slots-scroll"
                      style={{
                        maxHeight: 240,
                        overflowY: "auto",
                        display: "flex",
                        flexDirection: "column",
                        gap: 6,
                      }}
                    >
                      {dateSlots.map((slot) => {
                        const isSel = selectedSlot === slot.time;
                        return (
                          <button
                            key={slot.time}
                            type="button"
                            onClick={() => setSelectedSlot(slot.time)}
                            style={{
                              padding: "10px 14px",
                              textAlign: "left",
                              flexShrink: 0,
                              border: `1px solid ${isSel ? "var(--accent)" : "var(--border)"}`,
                              background: isSel ? "rgba(77,163,255,0.08)" : "transparent",
                              borderRadius: 3,
                              color: isSel ? "var(--accent)" : "var(--text)",
                              fontFamily: DISPLAY,
                              fontWeight: 500,
                              fontSize: 14,
                              cursor: "pointer",
                              transition: "border-color 0.12s, background 0.12s",
                            }}
                          >
                            {timeLabel(slot.time)}
                          </button>
                        );
                      })}
                    </div>
                    {slotsOverflow && (
                      <div
                        style={{
                          position: "absolute",
                          bottom: 0,
                          left: 0,
                          right: 0,
                          height: 48,
                          background: "linear-gradient(to bottom, transparent, var(--surface))",
                          pointerEvents: "none",
                        }}
                      />
                    )}
                  </div>
                )}
              </>
            )}
          </div>
        </div>

        {/* Booking form — shown when slot is chosen */}
        {selectedSlot && (
          <form
            onSubmit={handleSubmit}
            style={{
              marginTop: 28,
              paddingTop: 24,
              borderTop: "1px solid var(--border)",
            }}
          >
            <div className="cp-mono" style={{ marginBottom: 16 }}>
              A few quick things
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 12,
              }}
            >
              <TextInput
                label="Your name"
                value={form.name}
                onChange={(v) => setForm((f) => ({ ...f, name: v }))}
                placeholder="Jane Smith"
                required
              />
              <TextInput
                label="Email"
                type="email"
                value={form.email}
                onChange={(v) => setForm((f) => ({ ...f, email: v }))}
                placeholder="jane@example.com"
                required
              />
              <SelectInput
                label="Project type"
                value={form.projectType}
                onChange={(v) => setForm((f) => ({ ...f, projectType: v }))}
                options={[
                  "Website rebuild",
                  "New website",
                  "Google Ads",
                  "SEO",
                  "Automation",
                  "Mobile app",
                  "Not sure",
                ]}
              />
              <SelectInput
                label="Budget range"
                value={form.budget}
                onChange={(v) => setForm((f) => ({ ...f, budget: v }))}
                options={[
                  "Under $3k",
                  "$3k – $8k",
                  "$8k – $20k",
                  "$20k+",
                  "Not sure yet",
                ]}
              />
              <TextInput
                label="Timeline"
                value={form.timeline}
                onChange={(v) => setForm((f) => ({ ...f, timeline: v }))}
                placeholder="e.g. Next 2 months"
              />
              <TextInput
                label="Current site URL"
                value={form.currentSite}
                onChange={(v) => setForm((f) => ({ ...f, currentSite: v }))}
                placeholder="example.com.au"
              />
            </div>

            {submitErr && (
              <div
                style={{
                  marginTop: 12,
                  fontFamily: MONO,
                  fontSize: 10,
                  letterSpacing: "0.06em",
                  color: "#ff6b6b",
                  padding: "8px 10px",
                  background: "rgba(255,107,107,0.06)",
                  borderLeft: "2px solid #ff6b6b",
                }}
              >
                {submitErr}
              </div>
            )}

            <button
              type="submit"
              disabled={submitting || !form.name || !form.email}
              className="cp-btn cp-btn-primary cp-btn-lg"
              style={{
                marginTop: 16,
                width: "100%",
                justifyContent: "center",
                opacity:
                  submitting || !form.name || !form.email ? 0.55 : 1,
                cursor:
                  submitting || !form.name || !form.email
                    ? "not-allowed"
                    : "pointer",
              }}
            >
              {submitting
                ? "Booking..."
                : `Confirm ${dateLabel(selectedDate!)} · ${timeLabel(selectedSlot)} →`}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
