import { X } from "lucide-react";
import { cn } from "@/lib/utils";

export function FilterChip({ label, onRemove, className }: { label: string; onRemove: () => void; className?: string }) {
  return (
    <button
      type="button"
      onClick={onRemove}
      aria-label={`Remove filter: ${label}`}
      className={cn(
        "group inline-flex h-8 items-center gap-2 border border-line bg-white/60 px-3 text-[0.75rem] tracking-[0.04em] text-espresso transition-colors duration-300 hover:border-espresso",
        className,
      )}
    >
      {label}
      <X aria-hidden="true" strokeWidth={1.25} className="size-3 text-stone transition-transform duration-300 group-hover:rotate-90" />
    </button>
  );
}
