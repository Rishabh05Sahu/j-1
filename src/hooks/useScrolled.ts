"use client";

import { useSyncExternalStore } from "react";

/** True once the page has scrolled beyond `threshold` pixels. */
export function useScrolled(threshold = 24) {
  return useSyncExternalStore(
    (cb) => {
      window.addEventListener("scroll", cb, { passive: true });
      return () => window.removeEventListener("scroll", cb);
    },
    () => window.scrollY > threshold,
    () => false,
  );
}
