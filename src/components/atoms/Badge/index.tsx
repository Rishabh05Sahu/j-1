import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Badge({
  children,
  tone = "default",
  className,
}: {
  children: ReactNode;
  tone?: "default" | "gold" | "dark" | "outline";
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex h-6 items-center px-2.5 text-[0.625rem] font-medium uppercase leading-none tracking-[0.2em]",
        tone === "default" && "bg-ivory/95 text-espresso",
        tone === "gold" && "bg-ivory/95 text-gold-deep",
        tone === "dark" && "bg-espresso text-pearl",
        tone === "outline" && "border border-line text-stone",
        className,
      )}
    >
      {children}
    </span>
  );
}
