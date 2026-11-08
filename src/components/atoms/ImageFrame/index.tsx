"use client";

import Image from "next/image";
import { useCallback, useState } from "react";
import { cn } from "@/lib/utils";
import type { ProductImage } from "@/types";

export type AspectRatio = "1/1" | "4/5" | "3/4" | "2/3" | "4/3" | "3/2" | "16/9" | "21/9" | "fill";

const ratios: Record<AspectRatio, string> = {
  "1/1": "relative aspect-square",
  "4/5": "relative aspect-[4/5]",
  "3/4": "relative aspect-[3/4]",
  "2/3": "relative aspect-[2/3]",
  "4/3": "relative aspect-[4/3]",
  "3/2": "relative aspect-[3/2]",
  "16/9": "relative aspect-video",
  "21/9": "relative aspect-[21/9]",
  fill: "absolute inset-0",
};

export interface ImageFrameProps {
  image: ProductImage;
  ratio?: AspectRatio;
  sizes?: string;
  priority?: boolean;
  className?: string;
  imgClassName?: string;
  /** CSS object-position, e.g. "50% 30%". */
  position?: string;
  /** Decorative images get an empty alt. */
  decorative?: boolean;
}

/**
 * Optimised image with a reserved aspect ratio (no layout shift),
 * a soft shimmer while loading, a slow fade-in, and an elegant
 * monogram fallback if the source fails.
 */
export function ImageFrame({
  image,
  ratio = "4/5",
  sizes = "(min-width: 1024px) 25vw, 50vw",
  priority,
  className,
  imgClassName,
  position,
  decorative,
}: ImageFrameProps) {
  const [status, setStatus] = useState<"loading" | "loaded" | "error">("loading");

  // Images served from cache can finish before hydration — detect that.
  const measure = useCallback((node: HTMLImageElement | null) => {
    if (node?.complete && node.naturalWidth > 0) setStatus("loaded");
  }, []);

  return (
    <div className={cn("overflow-hidden bg-champagne", ratios[ratio], className)}>
      {status === "loading" && <div aria-hidden="true" className="skeleton absolute inset-0" />}
      {status === "error" ? (
        <div
          role={decorative ? undefined : "img"}
          aria-label={decorative ? undefined : image.alt}
          className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-champagne"
        >
          <span className="font-serif text-4xl font-light tracking-[0.2em] text-gold">A</span>
          <span className="eyebrow text-mute">Aurelle</span>
        </div>
      ) : (
        <Image
          ref={measure}
          src={image.src}
          alt={decorative ? "" : image.alt}
          fill
          sizes={sizes}
          preload={priority}
          loading={priority ? "eager" : undefined}
          fetchPriority={priority ? "high" : undefined}
          onLoad={() => setStatus("loaded")}
          onError={() => setStatus("error")}
          style={position ? { objectPosition: position } : undefined}
          className={cn(
            "object-cover transition-[opacity,transform] duration-[900ms] ease-luxe",
            status === "loaded" || priority ? "opacity-100" : "opacity-0",
            imgClassName,
          )}
        />
      )}
    </div>
  );
}
