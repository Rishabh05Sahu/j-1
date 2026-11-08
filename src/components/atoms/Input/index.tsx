import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

const fieldBase =
  "w-full rounded-none bg-transparent text-[0.9375rem] text-espresso placeholder:text-mute outline-none transition-colors duration-300 ease-luxe disabled:opacity-50";

export const inputClasses = cn(
  fieldBase,
  "h-12 border-b border-line px-0 focus:border-espresso focus-visible:outline-none aria-[invalid=true]:border-error",
);

export function Input({ className, ...props }: ComponentProps<"input">) {
  return <input className={cn(inputClasses, className)} {...props} />;
}

export function Textarea({ className, rows = 4, ...props }: ComponentProps<"textarea">) {
  return (
    <textarea
      rows={rows}
      className={cn(
        fieldBase,
        "resize-y border border-line px-4 py-3 leading-relaxed focus:border-espresso focus-visible:outline-none aria-[invalid=true]:border-error",
        className,
      )}
      {...props}
    />
  );
}
