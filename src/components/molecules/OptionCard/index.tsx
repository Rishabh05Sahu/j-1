import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** A radio input presented as a selectable card (shipping, payment, etc.). */
export function OptionCard({
  name,
  value,
  checked,
  onChange,
  title,
  description,
  meta,
  icon,
  className,
}: {
  name: string;
  value: string;
  checked: boolean;
  onChange: (value: string) => void;
  title: ReactNode;
  description?: ReactNode;
  meta?: ReactNode;
  icon?: ReactNode;
  className?: string;
}) {
  return (
    <label
      className={cn(
        "relative flex cursor-pointer items-start gap-4 border px-5 py-4 transition-colors duration-300",
        checked ? "border-espresso bg-white/70" : "border-line hover:border-mute",
        "has-[:focus-visible]:outline has-[:focus-visible]:outline-1 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-gold",
        className,
      )}
    >
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={() => onChange(value)}
        className="peer sr-only"
      />
      <span
        aria-hidden="true"
        className={cn(
          "mt-1 flex size-4 shrink-0 items-center justify-center rounded-full border transition-colors",
          checked ? "border-espresso" : "border-mute",
        )}
      >
        <span className={cn("size-2 rounded-full bg-espresso transition-opacity", checked ? "opacity-100" : "opacity-0")} />
      </span>
      {icon && <span className="mt-0.5 shrink-0 text-stone">{icon}</span>}
      <span className="flex min-w-0 flex-1 flex-col">
        <span className="text-[0.9375rem] text-espresso">{title}</span>
        {description && <span className="mt-1 text-[0.8125rem] leading-relaxed text-stone">{description}</span>}
      </span>
      {meta && <span className="shrink-0 text-[0.8125rem] text-espresso">{meta}</span>}
    </label>
  );
}
