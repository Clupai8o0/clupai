"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import type { MediaItem } from "@/data/cases";

function VideoTile({ item, lead }: { item: MediaItem; lead: boolean })
{
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  function toggle()
  {
    const video = ref.current;
    if (!video) {
      return;
    }
    if (playing) {
      video.pause();
      setPlaying(false);
    } else {
      video.play().catch(() => setPlaying(false));
      setPlaying(true);
    }
  }

  return (
    <button
      type="button"
      className={`cg-item cg-item--video${lead ? " cg-item--lead" : ""}`}
      onClick={toggle}
      aria-label={`${playing ? "Pause" : "Play"}: ${item.label}`}
    >
      <video ref={ref} src={item.src} poster={item.poster} muted loop playsInline preload="none" />
      {playing ? null : (
        <span className="cg-play">
          <span>Play</span>
        </span>
      )}
      <span className="cg-label">{item.label}</span>
    </button>
  );
}

// Real screens, gutterless. Pictures open full size; videos play in place.
export function CaseGallery({ media, client }: { media: MediaItem[]; client: string })
{
  const [active, setActive] = useState<MediaItem | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const openerRef = useRef<HTMLElement | null>(null);

  const close = useCallback(() => setActive(null), []);

  useEffect(() => {
    if (!active) {
      return;
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        close();
      }
      // The close button is the dialog's only control, so Tab stays on it.
      if (e.key === "Tab") {
        e.preventDefault();
        closeRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const opener = openerRef.current;
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      opener?.focus();
    };
  }, [active, close]);

  // An odd count would leave a hole in the grid, so the first tile takes the full width.
  const leadFirst = media.length % 2 === 1;

  return (
    <div className="cg-grid">
      {media.map((item, i) => {
        const lead = leadFirst && i === 0;
        if (item.type === "video") {
          return <VideoTile key={item.src} item={item} lead={lead} />;
        }
        return (
          <button
            key={item.src}
            type="button"
            className={`cg-item${lead ? " cg-item--lead" : ""}`}
            onClick={() => {
              openerRef.current = document.activeElement as HTMLElement | null;
              setActive(item);
            }}
            aria-label={`Enlarge: ${item.label}`}
          >
            <Image src={item.src} alt={item.label} fill sizes={lead ? "100vw" : "(max-width: 680px) 100vw, 50vw"} />
            <span className="cg-label">{item.label}</span>
          </button>
        );
      })}

      {active ? (
        <div className="cg-lightbox" role="dialog" aria-modal="true" aria-label={`${client}: ${active.label}`} onClick={close}>
          {/* eslint-disable-next-line @next/next/no-img-element -- full-size original at its natural ratio */}
          <img src={active.src} alt={active.label} onClick={(e) => e.stopPropagation()} />
          <button ref={closeRef} type="button" className="cg-close" onClick={close}>
            Close
          </button>
        </div>
      ) : null}
    </div>
  );
}
