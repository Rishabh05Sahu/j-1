import { formatPrice } from "@/lib/currency";
import { cn } from "@/lib/utils";

export function Price({
  amount,
  compareAt,
  className,
  size = "md",
}: {
  amount: number;
  compareAt?: number;
  className?: string;
  size?: "sm" | "md" | "lg";
}) {
  return (
    <span
      className={cn(
        "inline-flex items-baseline gap-2 tabular-nums tracking-[0.02em]",
        size === "sm" && "text-[0.8125rem]",
        size === "md" && "text-[0.9375rem]",
        size === "lg" && "text-[1.25rem] md:text-[1.375rem]",
        className,
      )}
    >
      <span>{formatPrice(amount)}</span>
      {compareAt && compareAt > amount && (
        <span className="text-mute line-through">
          <span className="sr-only">Previously </span>
          {formatPrice(compareAt)}
        </span>
      )}
    </span>
  );
}
