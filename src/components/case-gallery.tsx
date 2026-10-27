"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import Image from "next/image"
import { X } from "lucide-react"
import type { MediaItem } from "@/data/cases"

function VideoSlot({ item, ratio }: { item: MediaItem; ratio: string }) {
  const ref = useRef<HTMLVideoElement>(null)
  const [playing, setPlaying] = useState(false)

  const toggle = () => {
    const v = ref.current
    if (!v) return
    if (playing) { v.pause(); setPlaying(false) }
    else { v.play(); setPlaying(true) }
  }

  return (
    <div className="cg-frame" style={{ aspectRatio: ratio }}>
      <video
        ref={ref}
        muted
        loop
        playsInline
        preload="metadata"
        // #t= makes Safari paint the first frame before playback
        src={`${item.src}#t=0.1`}
        style={{ width: "100%", height: "100%", display: "block", objectFit: "cover" }}
      />
      <button
        type="button"
        onClick={toggle}
        aria-label={playing ? `Pause: ${item.label}` : `Play: ${item.label}`}
        className={`cg-play${playing ? " cg-play-on" : ""}`}
      >
        {!playing && (
          <span className="cg-play-dot" aria-hidden="true">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <polygon points="7,4 17,10 7,16" fill="#050505" />
            </svg>
          </span>
        )}
      </button>
    </div>
  )
}

function Slot({
  item,
  ratio = "16/9",
  sizes,
  onOpen,
}: {
  item: MediaItem
  ratio?: string
  sizes: string
  onOpen: (item: MediaItem) => void
}) {
  if (item.type === "video") {
    return <VideoSlot item={item} ratio={ratio} />
  }

  return (
    <button
      type="button"
      className="cg-frame cg-image"
      style={{ aspectRatio: ratio }}
      onClick={() => onOpen(item)}
      aria-label={`Enlarge: ${item.label}`}
    >
      <Image src={item.src} alt={item.label} fill sizes={sizes} />
    </button>
  )
}

function Shot({
  item,
  ratio,
  sizes,
  onOpen,
}: {
  item?: MediaItem
  ratio?: string
  sizes: string
  onOpen: (item: MediaItem) => void
}) {
  if (!item) return null
  return (
    <figure className="cg-figure">
      <Slot item={item} ratio={ratio} sizes={sizes} onOpen={onOpen} />
      <figcaption className="cg-cap">{item.label}</figcaption>
    </figure>
  )
}

export function CaseGallery({
  media,
  client,
}: {
  media?: MediaItem[]
  client: string
}) {
  const [active, setActive] = useState<MediaItem | null>(null)
  const closeRef = useRef<HTMLButtonElement>(null)
  const openerRef = useRef<HTMLElement | null>(null)

  const open = useCallback((item: MediaItem) => {
    openerRef.current = document.activeElement as HTMLElement | null
    setActive(item)
  }, [])
  const close = useCallback(() => setActive(null), [])

  useEffect(() => {
    if (!active) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close()
      // The close button is the dialog's only control, so Tab stays on it
      if (e.key === "Tab") { e.preventDefault(); closeRef.current?.focus() }
    }
    document.addEventListener("keydown", onKey)
    document.body.style.overflow = "hidden"
    closeRef.current?.focus()
    const opener = openerRef.current
    return () => {
      document.removeEventListener("keydown", onKey)
      document.body.style.overflow = ""
      opener?.focus()
    }
  }, [active, close])

  if (!media?.length) return null

  return (
    <div className="cg">
      {/* Lead: the main flow, full width */}
      <Shot item={media[0]} sizes="(max-width: 768px) 100vw, 1344px" onOpen={open} />

      {/* Phone beside a key flow */}
      {(media[1] || media[2]) && (
        <div className="cg-pair">
          <Shot item={media[1]} ratio="9/16" sizes="(max-width: 768px) 70vw, 360px" onOpen={open} />
          <Shot item={media[2]} sizes="(max-width: 768px) 100vw, 900px" onOpen={open} />
        </div>
      )}

      {/* The rest, three across */}
      {media.length > 3 && (
        <div className="cg-trio">
          {media.slice(3, 6).map((item) => (
            <Shot
              key={item.src}
              item={item}
              sizes="(max-width: 900px) 100vw, 440px"
              onOpen={open}
            />
          ))}
        </div>
      )}

      {/* Lightbox */}
      {active && (
        <div
          className="cg-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={`${client}: ${active.label}`}
          onClick={close}
        >
          {/* stop clicks on the media from closing */}
          <figure className="cg-lightbox-inner" onClick={(e) => e.stopPropagation()}>
            {/* eslint-disable-next-line @next/next/no-img-element -- full-size original at its natural ratio */}
            <img src={active.src} alt={active.label} />
            <figcaption>
              <span>{active.label}</span>
              <span>Esc to close</span>
            </figcaption>
          </figure>
          <button ref={closeRef} type="button" className="cg-close" onClick={close} aria-label="Close">
            <X size={18} strokeWidth={1.75} aria-hidden="true" />
          </button>
        </div>
      )}
    </div>
  )
}
