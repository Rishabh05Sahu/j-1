"use client";

import { cn } from "@/lib/utils";
import type { Metal } from "@/types";

const swatchColors: Record<Metal, string> = {
  "18K Yellow Gold": "linear-gradient(135deg,#f1d79a 0%,#c9a45a 55%,#e8cc8a 100%)",
  "18K White Gold": "linear-gradient(135deg,#f4f4f2 0%,#d3d3d0 55%,#ecebe8 100%)",
  "18K Rose Gold": "linear-gradient(135deg,#f3cdbd 0%,#d29b84 55%,#ecc0ac 100%)",
  Platinum: "linear-gradient(135deg,#ecedee 0%,#b9bcbf 55%,#dfe1e3 100%)",
  "Sterling Silver": "linear-gradient(135deg,#f0f0f0 0%,#bfc1c3 55%,#e4e5e6 100%)",
};

export interface ProductSwatchesProps {
  metals: Metal[];
  value?: Metal;
  onChange?: (metal: Metal) => void;
  size?: "sm" | "md";
  className?: string;
}

/**
 * Precious-metal swatches. Display-only on product cards (sm), a
 * keyboard-accessible radio group on the product page (md).
 */
export function ProductSwatches({ metals, value, onChange, size = "sm", className }: ProductSwatchesProps) {
  if (!onChange) {
    return (
      <ul className={cn("flex items-center gap-1.5", className)} aria-label={`Available in ${metals.join(", ")}`}>
        {metals.map((m) => (
          <li key={m} aria-hidden="true" className="size-2.5 rounded-full ring-1 ring-black/10" style={{ background: swatchColors[m] }} />
        ))}
      </ul>
    );
  }

  return (
    <div role="radiogroup" aria-label="Metal" className={cn("flex flex-wrap items-center gap-3", className)}>
      {metals.map((m) => {
        const selected = value === m;
        return (
          <button
            key={m}
            type="button"
            role="radio"
            aria-checked={selected}
            aria-label={m}
            title={m}
            onClick={() => onChange(m)}
            className={cn(
              "relative flex items-center justify-center rounded-full transition-shadow duration-300",
              size === "md" ? "size-9" : "size-6",
              selected ? "ring-1 ring-espresso ring-offset-[3px] ring-offset-ivory" : "hover:ring-1 hover:ring-mute hover:ring-offset-[3px] hover:ring-offset-ivory",
            )}
          >
            <span className="size-full rounded-full ring-1 ring-black/10" style={{ background: swatchColors[m] }} />
          </button>
        );
      })}
    </div>
  );
}
