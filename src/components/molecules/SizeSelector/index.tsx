"use client";

import { cn } from "@/lib/utils";

export function SizeSelector({
  sizes,
  value,
  onChange,
  invalid,
  label = "Size",
  className,
}: {
  sizes: string[];
  value?: string;
  onChange: (size: string) => void;
  invalid?: boolean;
  label?: string;
  className?: string;
}) {
  return (
    <div role="radiogroup" aria-label={label} aria-invalid={invalid || undefined} className={cn("flex flex-wrap gap-2", className)}>
      {sizes.map((s) => {
        const selected = s === value;
        return (
          <button
            key={s}
            type="button"
            role="radio"
            aria-checked={selected}
            onClick={() => onChange(s)}
            className={cn(
              "flex h-11 min-w-11 items-center justify-center border px-3 text-[0.8125rem] tabular-nums transition-colors duration-300",
              selected
                ? "border-espresso bg-espresso text-pearl"
                : invalid
                  ? "border-error/50 text-espresso hover:border-espresso"
                  : "border-line text-espresso hover:border-espresso",
            )}
          >
            {s}
          </button>
        );
      })}
    </div>
  );
}
