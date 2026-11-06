"use client";

import { usePathname } from "next/navigation";
import { useEffect, useLayoutEffect, useRef } from "react";
import { loadRoute } from "@/motion/routes";

// Starts the site's motion as soon as the page has hydrated. Only these imports reach
// gsap, lenis and matter-js, so without html.m none of them is ever downloaded.
export default function SiteMotion()
{
  const pathname = usePathname();
  const destroy = useRef<(() => void) | null>(null);

  // Leaving a page tears its motion down before the next page paints.
  useLayoutEffect(() => {
    return () => {
      destroy.current?.();
      destroy.current = null;
      document.querySelector("main")?.removeAttribute("data-ready");
    };
  }, [pathname]);

  // Hydrated: the pictures that arrived before now can be marked (see IMG_WAIT in layout.tsx).
  useEffect(() => {
    const w = window as unknown as { __imgQ?: HTMLImageElement[] | null };
    const q = w.__imgQ;
    w.__imgQ = null;
    q?.forEach((img) => img.setAttribute("data-loaded", ""));
  }, []);

  useEffect(() => {
    if (!document.documentElement.classList.contains("m")) {
      return;
    }
    let cancelled = false;
    const start = () => {
      // This page's own motion code downloads alongside boot, not after it. boot asks for the same chunk.
      loadRoute(pathname).catch(() => {});
      import("@/motion/boot")
        .then(({ boot }) => {
          if (!cancelled) {
            destroy.current = boot(pathname);
          }
        })
        .catch(() => {
          document.documentElement.classList.remove("m");
        });
    };

    // No waiting for an idle moment: on a first load the loader is up until this has run.
    start();
    return () => {
      cancelled = true;
    };
  }, [pathname]);

  return null;
}
