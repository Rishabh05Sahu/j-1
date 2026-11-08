import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface IconButtonProps extends Omit<ComponentProps<"button">, "children"> {
  /** Accessible name — required because the button has no visible text. */
  label: string;
  icon: ReactNode;
  badge?: number;
  size?: "sm" | "md" | "lg";
  tone?: "default" | "light" | "surface";
}

const sizes = { sm: "size-9", md: "size-11", lg: "size-12" };
const tones = {
  default: "text-current hover:opacity-70",
  light: "text-pearl hover:text-white",
  surface: "bg-ivory/90 text-espresso backdrop-blur-sm hover:bg-white",
};

export function IconButton({ label, icon, badge, size = "md", tone = "default", className, ...rest }: IconButtonProps) {
  return (
    <button
      type="button"
      aria-label={badge ? `${label} (${badge})` : label}
      className={cn(
        "relative inline-flex shrink-0 items-center justify-center transition-[color,opacity,background-color] duration-300 ease-luxe",
        "disabled:pointer-events-none disabled:opacity-40",
        sizes[size],
        tones[tone],
        className,
      )}
      {...rest}
    >
      <span aria-hidden="true" className="inline-flex">
        {icon}
      </span>
      {badge !== undefined && badge > 0 && (
        <span
          aria-hidden="true"
          className="absolute right-0.5 top-1 flex h-4 min-w-4 animate-fade-in items-center justify-center rounded-full bg-gold px-1 text-[0.5625rem] font-medium leading-none tabular-nums text-white"
        >
          {badge > 99 ? "99+" : badge}
        </span>
      )}
    </button>
  );
}
