"use client";

import { useEffect, useRef, useState } from "react";

/** Observes when an element enters the viewport. */
export function useInView<T extends Element>(options: IntersectionObserverInit & { once?: boolean } = {}) {
  const { once = false, root = null, rootMargin = "0px", threshold = 0 } = options;
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
        if (entry.isIntersecting && once) observer.disconnect();
      },
      { root, rootMargin, threshold },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [once, root, rootMargin, threshold]);

  return { ref, inView };
}
