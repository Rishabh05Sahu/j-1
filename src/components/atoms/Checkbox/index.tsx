import { Check } from "lucide-react";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ChoiceProps extends Omit<ComponentProps<"input">, "type"> {
  label: ReactNode;
  meta?: ReactNode;
}

const control =
  "peer absolute inset-0 cursor-pointer appearance-none border border-mute transition-colors duration-300 checked:border-espresso focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-gold";

export function Checkbox({ label, meta, className, ...props }: ChoiceProps) {
  return (
    <label className={cn("group flex min-h-11 cursor-pointer items-center gap-3 py-1.5 text-[0.875rem]", className)}>
      <span className="relative flex size-4 shrink-0 items-center justify-center">
        <input type="checkbox" className={cn(control, "checked:bg-espresso")} {...props} />
        <Check
          aria-hidden="true"
          strokeWidth={2}
          className="pointer-events-none relative size-3 text-pearl opacity-0 transition-opacity duration-200 peer-checked:opacity-100"
        />
      </span>
      <span className="flex-1 text-espresso transition-colors duration-300 group-hover:text-gold-deep">{label}</span>
      {meta !== undefined && <span className="text-[0.75rem] tabular-nums text-mute">{meta}</span>}
    </label>
  );
}

export function Radio({ label, meta, className, ...props }: ChoiceProps) {
  return (
    <label className={cn("group flex min-h-11 cursor-pointer items-center gap-3 py-1.5 text-[0.875rem]", className)}>
      <span className="relative flex size-4 shrink-0 items-center justify-center">
        <input type="radio" className={cn(control, "rounded-full")} {...props} />
        <span
          aria-hidden="true"
          className="pointer-events-none relative size-2 rounded-full bg-espresso opacity-0 transition-opacity duration-200 peer-checked:opacity-100"
        />
      </span>
      <span className="flex-1 text-espresso">{label}</span>
      {meta !== undefined && <span className="text-[0.75rem] text-mute">{meta}</span>}
    </label>
  );
}
