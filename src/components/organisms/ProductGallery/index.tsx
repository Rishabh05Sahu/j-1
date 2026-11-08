"use client";

import { ChevronLeft, ChevronRight, Maximize2, ZoomIn, ZoomOut } from "lucide-react";
import Image from "next/image";
import { useRef, useState, type KeyboardEvent, type MouseEvent, type TouchEvent } from "react";
import { ImageFrame } from "@/components/atoms/ImageFrame";
import { Modal } from "@/components/molecules/Overlay";
import { cn } from "@/lib/utils";
import type { ProductImage } from "@/types";

export interface ProductGalleryProps {
  images: ProductImage[];
  productName: string;
  /** `compact` is used in the quick view (no lightbox, smaller thumbs). */
  variant?: "full" | "compact";
}

/**
 * Product photography: crossfading main image, thumbnails, arrow / swipe /
 * keyboard navigation and a full-screen lightbox with pointer-follow zoom.
 */
export function ProductGallery({ images, productName, variant = "full" }: ProductGalleryProps) {
  const [index, setIndex] = useState(0);
  const [lightbox, setLightbox] = useState(false);
  const touchX = useRef<number | null>(null);
  const count = images.length;
  const full = variant === "full";

  const go = (delta: number) => setIndex((i) => (i + delta + count) % count);

  const onTouchStart = (e: TouchEvent) => (touchX.current = e.touches[0].clientX);
  const onTouchEnd = (e: TouchEvent) => {
    if (touchX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchX.current;
    if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
    touchX.current = null;
  };
  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === "ArrowRight") go(1);
    if (e.key === "ArrowLeft") go(-1);
  };

  const arrow =
    "absolute top-1/2 z-10 flex size-11 -translate-y-1/2 items-center justify-center bg-ivory/85 text-espresso backdrop-blur-sm transition-[opacity,background-color] duration-500 hover:bg-ivory md:opacity-0 md:group-hover/gallery:opacity-100 focus-visible:opacity-100";

  return (
    <div className={cn("flex flex-col gap-3", full && "md:flex-row-reverse md:gap-5")}>
      {/* Main image */}
      <div
        className="group/gallery relative flex-1"
        role="region"
        aria-roledescription="carousel"
        aria-label={`${productName} images`}
        tabIndex={0}
        onKeyDown={onKeyDown}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <div className="relative aspect-[4/5] overflow-hidden bg-champagne">
          {images.map((image, i) => (
            <div
              key={image.src}
              aria-hidden={i !== index}
              className={cn(
                "absolute inset-0 transition-opacity duration-700 ease-luxe",
                i === index ? "opacity-100" : "pointer-events-none opacity-0",
              )}
            >
              <ImageFrame
                image={image}
                ratio="fill"
                priority={full && i === 0}
                sizes={full ? "(min-width: 1024px) 50vw, 100vw" : "(min-width: 768px) 45vw, 100vw"}
              />
            </div>
          ))}
          {full && (
            <button
              type="button"
              onClick={() => setLightbox(true)}
              className="absolute inset-0 z-[5] cursor-zoom-in"
              aria-label={`Enlarge image ${index + 1} of ${count}`}
            />
          )}
        </div>

        {count > 1 && (
          <>
            <button type="button" onClick={() => go(-1)} className={cn(arrow, "left-3")} aria-label="Previous image">
              <ChevronLeft strokeWidth={1.1} className="size-5" />
            </button>
            <button type="button" onClick={() => go(1)} className={cn(arrow, "right-3")} aria-label="Next image">
              <ChevronRight strokeWidth={1.1} className="size-5" />
            </button>
          </>
        )}

        {full && (
          <span className="pointer-events-none absolute bottom-4 right-4 z-10 hidden items-center gap-2 text-[0.6875rem] uppercase tracking-[0.16em] text-espresso/70 md:flex">
            <Maximize2 aria-hidden="true" strokeWidth={1.1} className="size-3.5" /> Click to enlarge
          </span>
        )}

        {/* Mobile position indicator */}
        {count > 1 && (
          <div className="absolute inset-x-0 bottom-4 z-10 flex justify-center gap-2 md:hidden" aria-hidden="true">
            {images.map((image, i) => (
              <span
                key={image.src}
                className={cn("h-px transition-all duration-500", i === index ? "w-8 bg-espresso" : "w-4 bg-espresso/30")}
              />
            ))}
          </div>
        )}
        <p className="sr-only" aria-live="polite">
          Image {index + 1} of {count}
        </p>
      </div>

      {/* Thumbnails */}
      {count > 1 && (
        <div
          className={cn(
            "no-scrollbar flex gap-2 overflow-x-auto",
            full ? "md:w-[76px] md:shrink-0 md:flex-col lg:w-[88px]" : "hidden sm:flex",
          )}
        >
          {images.map((image, i) => (
            <button
              key={image.src}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Show image ${i + 1}`}
              aria-current={i === index}
              className={cn(
                "relative w-16 shrink-0 transition-opacity duration-300 md:w-full",
                !full && "md:w-16",
                i === index ? "opacity-100" : "opacity-50 hover:opacity-90",
              )}
            >
              <ImageFrame image={image} ratio="4/5" sizes="96px" decorative priority={full && i === 0} />
              <span
                className={cn(
                  "absolute inset-x-0 bottom-0 h-px bg-espresso transition-transform duration-500 ease-luxe",
                  i === index ? "scale-x-100" : "scale-x-0",
                )}
              />
            </button>
          ))}
        </div>
      )}

      {full && (
        <Lightbox
          open={lightbox}
          onClose={() => setLightbox(false)}
          images={images}
          index={index}
          onIndexChange={setIndex}
          productName={productName}
        />
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ Lightbox */

function Lightbox({
  open,
  onClose,
  images,
  index,
  onIndexChange,
  productName,
}: {
  open: boolean;
  onClose: () => void;
  images: ProductImage[];
  index: number;
  onIndexChange: (i: number) => void;
  productName: string;
}) {
  const [zoomed, setZoomed] = useState(false);
  const [origin, setOrigin] = useState("50% 50%");
  const count = images.length;
  const go = (delta: number) => {
    setZoomed(false);
    onIndexChange((index + delta + count) % count);
  };

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!zoomed) return;
    const rect = e.currentTarget.getBoundingClientRect();
    setOrigin(`${((e.clientX - rect.left) / rect.width) * 100}% ${((e.clientY - rect.top) / rect.height) * 100}%`);
  };

  return (
    <Modal
      open={open}
      onClose={() => {
        setZoomed(false);
        onClose();
      }}
      title={`${productName} — image ${index + 1} of ${count}`}
      hideHeader
      size="full"
      backdrop="light"
      className="bg-ivory"
    >
      <div
        className="flex h-full flex-col"
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") go(1);
          if (e.key === "ArrowLeft") go(-1);
        }}
      >
        <div
          className={cn("relative flex-1 overflow-hidden", zoomed ? "cursor-zoom-out" : "cursor-zoom-in")}
          onMouseMove={onMove}
          onClick={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            setOrigin(`${((e.clientX - rect.left) / rect.width) * 100}% ${((e.clientY - rect.top) / rect.height) * 100}%`);
            setZoomed((z) => !z);
          }}
        >
          {open && (
            <Image
              key={images[index].src}
              src={images[index].src}
              alt={images[index].alt}
              fill
              sizes="100vw"
              className="animate-fade-in object-contain transition-transform duration-500 ease-luxe"
              style={{ transform: zoomed ? "scale(2.2)" : "scale(1)", transformOrigin: origin }}
            />
          )}
        </div>

        <div className="flex h-20 shrink-0 items-center justify-between border-t border-line px-4 sm:px-8">
          <button type="button" onClick={() => go(-1)} className="flex size-11 items-center justify-center" aria-label="Previous image">
            <ChevronLeft strokeWidth={1.1} className="size-5" />
          </button>
          <div className="flex items-center gap-6">
            <span className="text-[0.75rem] tabular-nums tracking-[0.16em] text-stone">
              {String(index + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
            </span>
            <button
              type="button"
              onClick={() => setZoomed((z) => !z)}
              className="eyebrow flex items-center gap-2 text-espresso"
              aria-pressed={zoomed}
            >
              {zoomed ? <ZoomOut aria-hidden="true" strokeWidth={1.1} className="size-4" /> : <ZoomIn aria-hidden="true" strokeWidth={1.1} className="size-4" />}
              {zoomed ? "Zoom Out" : "Zoom In"}
            </button>
          </div>
          <button type="button" onClick={() => go(1)} className="flex size-11 items-center justify-center" aria-label="Next image">
            <ChevronRight strokeWidth={1.1} className="size-5" />
          </button>
        </div>
      </div>
    </Modal>
  );
}
