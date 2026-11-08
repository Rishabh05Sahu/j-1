"use client";

import { Minus, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

export function QuantitySelector({
  value,
  onChange,
  min = 1,
  max = 10,
  size = "md",
  label = "Quantity",
  className,
}: {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  size?: "sm" | "md";
  label?: string;
  className?: string;
}) {
  const btn = cn(
    "flex items-center justify-center text-stone transition-colors duration-300 hover:text-espresso disabled:opacity-30 disabled:hover:text-stone",
    size === "sm" ? "size-8" : "size-11",
  );
  return (
    <div
      role="group"
      aria-label={label}
      className={cn("inline-flex items-center border border-line", size === "sm" ? "h-8" : "h-12", className)}
    >
      <button type="button" className={btn} onClick={() => onChange(value - 1)} disabled={value <= min} aria-label={`Decrease ${label.toLowerCase()}`}>
        <Minus strokeWidth={1.25} className="size-3.5" />
      </button>
      <output
        key={value}
        aria-live="polite"
        className={cn("animate-fade-in text-center tabular-nums", size === "sm" ? "w-7 text-[0.8125rem]" : "w-10 text-[0.9375rem]")}
      >
        {value}
      </output>
      <button type="button" className={btn} onClick={() => onChange(value + 1)} disabled={value >= max} aria-label={`Increase ${label.toLowerCase()}`}>
        <Plus strokeWidth={1.25} className="size-3.5" />
      </button>
    </div>
  );
}
