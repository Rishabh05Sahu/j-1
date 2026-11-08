"use client";

import { X } from "lucide-react";
import { ImageFrame } from "@/components/atoms/ImageFrame";
import { useToast, useUI } from "@/hooks/useUI";

export function Toaster() {
  const { toasts, dismiss } = useToast();
  const { openCart, openWishlist } = useUI();

  return (
    <div
      aria-live="polite"
      aria-atomic="false"
      className="pointer-events-none fixed inset-x-4 bottom-4 z-[80] flex flex-col items-center gap-3 sm:inset-x-auto sm:bottom-6 sm:right-6 sm:items-end"
    >
      {toasts.map((t) => (
        <div
          key={t.id}
          role="status"
          className="pointer-events-auto flex w-full max-w-[380px] animate-fade-up items-center gap-4 bg-espresso p-3 pr-2 text-pearl shadow-[0_20px_50px_-20px_rgba(23,21,19,0.5)]"
        >
          {t.image && (
            <div className="w-12 shrink-0">
              <ImageFrame image={t.image} ratio="1/1" sizes="48px" decorative />
            </div>
          )}
          <div className="min-w-0 flex-1 py-1">
            <p className="eyebrow text-[0.625rem] text-gold">{t.title}</p>
            {t.description && <p className="mt-1 truncate font-serif text-[1rem]">{t.description}</p>}
          </div>
          {t.action && (
            <button
              type="button"
              onClick={() => {
                if (t.action?.type === "open-cart") openCart();
                else openWishlist();
                dismiss(t.id);
              }}
              className="link-underline-static shrink-0 text-[0.625rem] uppercase tracking-[0.18em] text-pearl"
            >
              {t.action.label}
            </button>
          )}
          <button
            type="button"
            onClick={() => dismiss(t.id)}
            aria-label="Dismiss notification"
            className="flex size-8 shrink-0 items-center justify-center text-pearl/60 transition-colors hover:text-pearl"
          >
            <X strokeWidth={1.25} className="size-4" />
          </button>
        </div>
      ))}
    </div>
  );
}
