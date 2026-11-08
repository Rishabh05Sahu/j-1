import { cn } from "@/lib/utils";

export function AnnouncementBar({ message, collapsed }: { message: string; collapsed?: boolean }) {
  return (
    <div
      className={cn(
        "overflow-hidden bg-espresso text-pearl/90 transition-[height] duration-500 ease-luxe",
        collapsed ? "h-0" : "h-9",
      )}
      aria-hidden={collapsed || undefined}
    >
      <p className="flex h-9 items-center justify-center whitespace-nowrap px-4 text-center text-[0.5625rem] uppercase tracking-[0.12em] sm:text-[0.625rem] sm:tracking-[0.28em]">
        {message}
      </p>
    </div>
  );
}
