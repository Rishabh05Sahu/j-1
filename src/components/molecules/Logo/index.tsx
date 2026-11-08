import Link from "next/link";
import { brand } from "@/config/brand";
import { cn } from "@/lib/utils";

/** The AURELLE wordmark — a refined, widely tracked serif with an optional tagline. */
export function Logo({
  size = "md",
  withTagline = false,
  className,
  href = "/",
  onNavigate,
}: {
  size?: "sm" | "md" | "lg";
  withTagline?: boolean;
  className?: string;
  href?: string | null;
  onNavigate?: () => void;
}) {
  const mark = (
    <span className={cn("flex flex-col items-center leading-none", className)}>
      <span
        className={cn(
          "font-serif font-normal uppercase",
          size === "sm" && "text-[1.375rem] tracking-[0.3em]",
          size === "md" && "text-[1.375rem] tracking-[0.28em] md:text-[2rem] md:tracking-[0.34em]",
          size === "lg" && "text-[2.5rem] tracking-[0.36em] md:text-[3.25rem]",
        )}
      >
        {/* compensate trailing letter-spacing so the mark is optically centred */}
        <span className="-mr-[0.34em]">{brand.name}</span>
      </span>
      {withTagline && (
        <span className="mt-2 text-[0.5625rem] uppercase tracking-[0.42em] opacity-70">{brand.tagline}</span>
      )}
    </span>
  );

  if (href === null) return mark;
  return (
    <Link href={href} aria-label={`${brand.name} — home`} onClick={onNavigate} className="inline-flex">
      {mark}
    </Link>
  );
}
