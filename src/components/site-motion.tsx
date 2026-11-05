"use client";

import { usePathname } from "next/navigation";
import { useEffect, useLayoutEffect, useRef } from "react";

let loaded = false;

// Starts the site's motion once the browser has a moment. Only this import reaches
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

  useEffect(() => {
    if (!document.documentElement.classList.contains("m")) {
      return;
    }
    let cancelled = false;
    const start = () => {
      import("@/motion/boot")
        .then(({ boot }) => {
          loaded = true;
          if (!cancelled) {
            destroy.current = boot(pathname);
          }
        })
        .catch(() => {
          document.documentElement.classList.remove("m");
        });
    };

    if (loaded) {
      start();
      return () => {
        cancelled = true;
      };
    }
    if ("requestIdleCallback" in window) {
      const idle = window.requestIdleCallback(start, { timeout: 1500 });
      return () => {
        cancelled = true;
        window.cancelIdleCallback(idle);
      };
    }
    const timer = setTimeout(start, 200);
    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [pathname]);

  return null;
}
