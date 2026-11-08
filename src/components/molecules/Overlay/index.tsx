"use client";

import { X } from "lucide-react";
import { useId, type ReactNode, type RefObject } from "react";
import { IconButton } from "@/components/atoms/IconButton";
import { useDialog } from "@/hooks/useDialog";
import { cn } from "@/lib/utils";

interface OverlayBaseProps {
  open: boolean;
  onClose: () => void;
  /** Visible title; also used as the dialog's accessible name. */
  title: ReactNode;
  /** Hide the visual header (title stays available to screen readers). */
  hideHeader?: boolean;
  initialFocus?: RefObject<HTMLElement | null>;
  className?: string;
  children: ReactNode;
}

function Backdrop({ open, onClose, tone = "dark" }: { open: boolean; onClose: () => void; tone?: "dark" | "light" }) {
  return (
    <div
      aria-hidden="true"
      onClick={onClose}
      className={cn(
        "absolute inset-0 transition-opacity duration-500 ease-luxe",
        tone === "dark" ? "bg-noir/45" : "bg-ivory/70 backdrop-blur-[2px]",
        open ? "opacity-100" : "opacity-0",
      )}
    />
  );
}

/* ------------------------------------------------------------------ Drawer */

export interface DrawerProps extends OverlayBaseProps {
  side?: "right" | "left";
  footer?: ReactNode;
  width?: string;
  eyebrow?: ReactNode;
}

/** Slide-in side panel with focus trap, Escape to close and scroll lock. */
export function Drawer({
  open,
  onClose,
  title,
  eyebrow,
  hideHeader,
  side = "right",
  footer,
  width = "sm:max-w-[460px]",
  initialFocus,
  className,
  children,
}: DrawerProps) {
  const ref = useDialog<HTMLDivElement>(open, onClose, initialFocus);
  const titleId = useId();

  return (
    <div className={cn("fixed inset-0 z-[60]", !open && "pointer-events-none")} inert={!open} aria-hidden={!open}>
      <Backdrop open={open} onClose={onClose} />
      <div
        ref={ref}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className={cn(
          "absolute inset-y-0 flex w-full flex-col bg-ivory shadow-[0_0_60px_rgba(23,21,19,0.12)] transition-transform duration-[650ms] ease-luxe",
          width,
          side === "right" ? "right-0" : "left-0",
          open ? "translate-x-0" : side === "right" ? "translate-x-full" : "-translate-x-full",
          className,
        )}
      >
        <div
          className={cn(
            "flex h-16 shrink-0 items-center justify-between border-b border-line px-5 sm:h-[72px] sm:px-8",
            hideHeader && "sr-only",
          )}
        >
          <div className="flex items-baseline gap-3">
            <h2 id={titleId} className="eyebrow text-espresso">
              {title}
            </h2>
            {eyebrow && <span className="text-[0.75rem] text-mute">{eyebrow}</span>}
          </div>
          <IconButton label="Close" icon={<X strokeWidth={1.25} className="size-5" />} onClick={onClose} className="-mr-3" />
        </div>
        <div className="flex-1 overflow-y-auto overscroll-contain">{children}</div>
        {footer && <div className="shrink-0 border-t border-line bg-ivory px-5 py-5 sm:px-8 sm:py-6">{footer}</div>}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ Modal */

export interface ModalProps extends OverlayBaseProps {
  size?: "md" | "lg" | "full";
  backdrop?: "dark" | "light";
}

/** Centred dialog with fade and scale. `full` is used for the image lightbox. */
export function Modal({
  open,
  onClose,
  title,
  hideHeader,
  size = "lg",
  backdrop = "dark",
  initialFocus,
  className,
  children,
}: ModalProps) {
  const ref = useDialog<HTMLDivElement>(open, onClose, initialFocus);
  const titleId = useId();

  return (
    <div
      className={cn(
        "fixed inset-0 z-[70] flex items-center justify-center",
        size !== "full" && "p-0 sm:p-6",
        !open && "pointer-events-none",
      )}
      inert={!open}
      aria-hidden={!open}
    >
      <Backdrop open={open} onClose={onClose} tone={backdrop} />
      <div
        ref={ref}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className={cn(
          "relative flex flex-col bg-ivory transition-[opacity,transform] duration-500 ease-luxe",
          size === "md" && "max-h-[100svh] w-full max-w-[560px] sm:max-h-[90vh]",
          size === "lg" && "h-[100svh] w-full max-w-[1080px] sm:h-auto sm:max-h-[90vh]",
          size === "full" && "h-full w-full",
          open ? "scale-100 opacity-100" : "scale-[0.97] opacity-0",
          className,
        )}
      >
        <div className={cn("flex h-14 shrink-0 items-center justify-between px-5 sm:px-6", hideHeader && "sr-only")}>
          <h2 id={titleId} className="eyebrow text-espresso">
            {title}
          </h2>
        </div>
        <div className="absolute right-2 top-2 z-20 sm:right-3 sm:top-3">
          <IconButton
            label="Close"
            icon={<X strokeWidth={1.25} className="size-5" />}
            onClick={onClose}
            tone="surface"
            className="rounded-full"
          />
        </div>
        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain">{children}</div>
      </div>
    </div>
  );
}
