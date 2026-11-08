import type { ReactNode } from "react";
import { Divider } from "@/components/atoms/Divider";
import { cn } from "@/lib/utils";

export function EmptyState({
  icon,
  title,
  text,
  actions,
  className,
}: {
  icon?: ReactNode;
  title: string;
  text?: ReactNode;
  actions?: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex animate-fade-in flex-col items-center px-6 py-16 text-center", className)}>
      {icon && (
        <span className="mb-6 flex size-16 items-center justify-center rounded-full border border-line text-gold">{icon}</span>
      )}
      <h2 className="font-serif text-[1.75rem] font-light leading-tight md:text-[2.125rem]">{title}</h2>
      <Divider variant="ornament" className="my-5" />
      {text && <p className="max-w-[420px] text-[0.9375rem] leading-relaxed text-stone">{text}</p>}
      {actions && <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row">{actions}</div>}
    </div>
  );
}
