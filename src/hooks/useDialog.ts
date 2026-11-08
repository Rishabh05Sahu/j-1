"use client";

import { useEffect, useRef, type RefObject } from "react";

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

let lockCount = 0;

/**
 * Accessible dialog behaviour: Escape to close, focus trapping,
 * initial focus, scroll locking and focus restoration on close.
 */
export function useDialog<T extends HTMLElement>(
  open: boolean,
  onClose: () => void,
  initialFocus?: RefObject<HTMLElement | null>,
): RefObject<T | null> {
  const ref = useRef<T>(null);
  const onCloseRef = useRef(onClose);

  useEffect(() => {
    onCloseRef.current = onClose;
  });

  useEffect(() => {
    if (!open) return;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const root = document.documentElement;
    lockCount += 1;
    root.setAttribute("data-scroll-locked", "");

    const focusTimer = window.setTimeout(() => {
      const target = initialFocus?.current ?? ref.current?.querySelector<HTMLElement>(FOCUSABLE) ?? ref.current;
      target?.focus({ preventScroll: true });
    }, 60);

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.stopPropagation();
        onCloseRef.current();
        return;
      }
      if (e.key !== "Tab" || !ref.current) return;
      const nodes = Array.from(ref.current.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
        (n) => n.offsetParent !== null || n === document.activeElement,
      );
      if (nodes.length === 0) return;
      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);

    return () => {
      window.clearTimeout(focusTimer);
      document.removeEventListener("keydown", onKeyDown);
      lockCount = Math.max(0, lockCount - 1);
      if (lockCount === 0) root.removeAttribute("data-scroll-locked");
      previouslyFocused?.focus?.({ preventScroll: true });
    };
  }, [open, initialFocus]);

  return ref;
}
