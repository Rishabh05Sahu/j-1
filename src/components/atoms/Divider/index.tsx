import { cn } from "@/lib/utils";

/** Hairline separator; the `ornament` variant adds a centred gold lozenge. */
export function Divider({
  variant = "line",
  tone = "default",
  className,
}: {
  variant?: "line" | "ornament";
  tone?: "default" | "light";
  className?: string;
}) {
  const line = tone === "light" ? "bg-pearl/20" : "bg-line";
  if (variant === "ornament") {
    return (
      <div role="separator" className={cn("flex items-center justify-center gap-4", className)}>
        <span className={cn("h-px w-12", line)} />
        <span className="size-1.5 rotate-45 bg-gold" />
        <span className={cn("h-px w-12", line)} />
      </div>
    );
  }
  return <hr className={cn("h-px w-full border-0", line, className)} />;
}
