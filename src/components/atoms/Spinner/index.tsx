import { cn } from "@/lib/utils";

export function Spinner({ className, label = "Loading" }: { className?: string; label?: string }) {
  return (
    <span role="status" className={cn("inline-flex items-center", className)}>
      <span
        aria-hidden="true"
        className="block size-4 animate-spin rounded-full border border-current border-r-transparent"
      />
      <span className="sr-only">{label}</span>
    </span>
  );
}
