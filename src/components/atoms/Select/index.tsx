import { ChevronDown } from "lucide-react";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

export interface SelectProps extends ComponentProps<"select"> {
  options: { value: string; label: string }[];
  placeholder?: string;
  variant?: "underline" | "minimal";
}

export function Select({ options, placeholder, variant = "underline", className, ...props }: SelectProps) {
  return (
    <div className={cn("relative", className)}>
      <select
        className={cn(
          "w-full cursor-pointer appearance-none rounded-none bg-transparent pr-8 text-espresso outline-none transition-colors duration-300",
          variant === "underline" &&
            "h-12 border-b border-line text-[0.9375rem] focus:border-espresso aria-[invalid=true]:border-error",
          variant === "minimal" && "h-10 text-[0.8125rem] tracking-[0.04em]",
        )}
        {...props}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
      <ChevronDown
        aria-hidden="true"
        strokeWidth={1.25}
        className="pointer-events-none absolute right-0 top-1/2 size-4 -translate-y-1/2 text-stone"
      />
    </div>
  );
}
