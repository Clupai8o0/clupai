"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import type { MediaItem, ResultCell } from "@/data/cases"

const MONO = '"JetBrains Mono", var(--font-mono), monospace'

function VideoSlot({ src }: { src: string }) {
  const ref = useRef<HTMLVideoElement>(null)
  const [playing, setPlaying] = useState(false)

  const toggle = () => {
    const v = ref.current
    if (!v) return
    if (playing) { v.pause(); setPlaying(false) }
    else { v.play(); setPlaying(true) }
  }

  return (
    <div style={{ position: "relative", width: "100%" }}>
      <video
        ref={ref}
        muted
        loop
        playsInline
        src={src}
        style={{ width: "100%", display: "block" }}
      />
      <button
        onClick={toggle}
        aria-label={playing ? "Pause video" : "Play video"}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          background: playing ? "transparent" : "rgba(0,0,0,0.28)",
          border: "none",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "background 0.25s",
          padding: 0,
        }}
      >
        {!playing && (
          <div
            style={{
              width: 60,
              height: 60,
              borderRadius: "50%",
              background: "rgba(255,255,255,0.96)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 4px 24px rgba(0,0,0,0.28)",
            }}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <polygon points="7,4 17,10 7,16" fill="#050505" />
            </svg>
          </div>
        )}
      </button>
    </div>
  )
}

function Slot({
  item,
  h,
  fallback,
  onClick,
}: {
  item?: MediaItem
  h: number
  fallback: string
  onClick: () => void
}) {
  if (!item) {
    return (
      <div
        style={{
          height: h,
          background: "var(--surface)",
          border: "1px solid var(--border)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <span style={{ fontFamily: MONO, fontSize: 10, color: "var(--text-dim)" }}>
          {fallback}
        </span>
      </div>
    )
  }

  if (item.type === "video") {
    return <VideoSlot src={item.src} />
  }

  return (
    <img
      src={item.src}
      alt={item.label}
      style={{ width: "100%", display: "block", cursor: "zoom-in", height: h, objectFit: "cover" }}
      onClick={onClick}
    />
  )
}

export function CaseGallery({
  media,
  results,
  client,
}: {
  media?: MediaItem[]
  results: ResultCell[]
  client: string
}) {
  const [active, setActive] = useState<MediaItem | null>(null)

  const open = useCallback((item?: MediaItem) => { if (item) setActive(item) }, [])
  const close = useCallback(() => setActive(null), [])

  useEffect(() => {
    if (!active) return
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") close() }
    document.addEventListener("keydown", onKey)
    document.body.style.overflow = "hidden"
    return () => {
      document.removeEventListener("keydown", onKey)
      document.body.style.overflow = ""
    }
  }, [active, close])

  return (
    <>
      {/* Slot 01 — full width */}
      <figure style={{ margin: 0 }}>
        <Slot item={media?.[0]} h={760} fallback={`${client} · hero · desktop`} onClick={() => open(media?.[0])} />
        <div style={{ marginTop: 12, display: "flex", justifyContent: "space-between" }}>
          <span className="cp-mono" style={{ color: "var(--text-muted)" }}>
            01 / 06 · {media?.[0]?.label ?? "Home · 1440px"}
          </span>
          <span className="cp-mono" style={{ color: "var(--accent)" }}>
            {results[0][0]}: {results[0][1]}
          </span>
        </div>
      </figure>

      {/* Slots 02 + 03 — two column */}
      <div style={{ marginTop: 48, display: "grid", gridTemplateColumns: "360px 1fr", gap: 24, alignItems: "start" }}>
        <figure style={{ margin: 0 }}>
          <Slot item={media?.[1]} h={680} fallback={`${client} · mobile · 375px`} onClick={() => open(media?.[1])} />
          <div className="cp-mono" style={{ marginTop: 12, color: "var(--text-muted)" }}>
            02 · {media?.[1]?.label ?? "Mobile · 375px"}
          </div>
        </figure>
        <figure style={{ margin: 0 }}>
          <Slot item={media?.[2]} h={680} fallback={`${client} · key flow`} onClick={() => open(media?.[2])} />
          <div className="cp-mono" style={{ marginTop: 12, color: "var(--text-muted)" }}>
            03 · {media?.[2]?.label ?? "Key flow"}
          </div>
        </figure>
      </div>

      {/* Slots 04–06 — three column */}
      <div style={{ marginTop: 48, display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
        {([3, 4, 5] as const).map((idx) => (
          <figure key={idx} style={{ margin: 0 }}>
            <Slot item={media?.[idx]} h={420} fallback={`${client} · screen 0${idx + 1}`} onClick={() => open(media?.[idx])} />
            <div className="cp-mono" style={{ marginTop: 12, color: "var(--text-muted)" }}>
              0{idx + 1} · {media?.[idx]?.label ?? ""}
            </div>
          </figure>
        ))}
      </div>

      {/* Lightbox */}
      {active && (
        <div
          onClick={close}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.92)",
            zIndex: 200,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 32,
          }}
        >
          {/* stop clicks on the media from closing */}
          <div onClick={(e) => e.stopPropagation()} style={{ position: "relative", maxWidth: "90vw" }}>
            {active.type === "video" ? (
              <video
                muted
                loop
                playsInline
                controls
                src={active.src}
                style={{ maxWidth: "90vw", maxHeight: "85vh", display: "block" }}
              />
            ) : (
              <img
                src={active.src}
                alt={active.label}
                style={{ maxWidth: "90vw", maxHeight: "85vh", display: "block", objectFit: "contain" }}
              />
            )}
            <div style={{ marginTop: 10, display: "flex", justifyContent: "space-between" }}>
              <span style={{ fontFamily: MONO, fontSize: 10, color: "rgba(255,255,255,0.45)" }}>
                {active.label}
              </span>
              <span style={{ fontFamily: MONO, fontSize: 10, color: "rgba(255,255,255,0.25)" }}>
                esc to close
              </span>
            </div>
          </div>

          <button
            onClick={close}
            style={{
              position: "absolute",
              top: 20,
              right: 20,
              background: "none",
              border: "1px solid rgba(255,255,255,0.15)",
              color: "rgba(255,255,255,0.6)",
              fontFamily: MONO,
              fontSize: 11,
              padding: "5px 12px",
              cursor: "pointer",
              letterSpacing: "0.05em",
            }}
          >
            × close
          </button>
        </div>
      )}
    </>
  )
}
