"use client";

import { useEffect } from "react";

// Content starts visible in server HTML; motion never gates reading or focus.
export function PageMotion() {
  useEffect(() => {
    if (!window.matchMedia || !window.IntersectionObserver) return;
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const animations = new Set<{ complete: () => void }>();
    let disposed = false;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          observer.unobserve(entry.target);
          if (media.matches) continue;
          void import("motion/mini")
            .then(({ animate }) => {
              if (disposed || media.matches || !entry.target.isConnected)
                return;
              const animation = animate(
                entry.target as HTMLElement,
                { transform: ["translateY(10px)", "translateY(0px)"] },
                { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
              );
              animations.add(animation);
              void animation.then(() => animations.delete(animation));
            })
            .catch(() => {
              /* Static content remains readable if enhancement fails. */
            });
        }
      },
      { threshold: 0.12 },
    );
    const stop = () => {
      if (media.matches) {
        animations.forEach((animation) => animation.complete());
        animations.clear();
      }
    };
    document
      .querySelectorAll(".page-section .section-heading")
      .forEach((element) => observer.observe(element));
    media.addEventListener("change", stop);
    return () => {
      disposed = true;
      observer.disconnect();
      media.removeEventListener("change", stop);
      animations.forEach((animation) => animation.complete());
    };
  }, []);
  return null;
}
