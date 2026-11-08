import { Gift, RotateCcw, ShieldCheck, Truck, type LucideIcon } from "lucide-react";
import { trustPromises } from "@/data/editorial";
import { cn } from "@/lib/utils";

const icons: Record<(typeof trustPromises)[number]["icon"], LucideIcon> = {
  truck: Truck,
  shield: ShieldCheck,
  gift: Gift,
  rotate: RotateCcw,
};

/** The maison's service promises. `compact` stacks them for sidebars. */
export function TrustSection({ variant = "band", className }: { variant?: "band" | "compact"; className?: string }) {
  if (variant === "compact") {
    return (
      <ul className={cn("flex flex-col gap-4", className)}>
        {trustPromises.map((p) => {
          const Icon = icons[p.icon];
          return (
            <li key={p.title} className="flex items-start gap-4">
              <Icon aria-hidden="true" strokeWidth={1.1} className="mt-0.5 size-[18px] shrink-0 text-gold-deep" />
              <div>
                <p className="text-[0.8125rem] text-espresso">{p.title}</p>
                <p className="text-[0.75rem] text-stone">{p.text}</p>
              </div>
            </li>
          );
        })}
      </ul>
    );
  }

  return (
    <section aria-label="Our promises" className={cn("border-y border-line bg-ivory", className)}>
      <ul className="container-luxe grid grid-cols-2 gap-y-10 py-12 md:py-14 lg:grid-cols-4">
        {trustPromises.map((p) => {
          const Icon = icons[p.icon];
          return (
            <li key={p.title} className="flex flex-col items-center px-3 text-center">
              <Icon aria-hidden="true" strokeWidth={1} className="size-6 text-gold-deep" />
              <p className="eyebrow mt-5 text-[0.625rem] text-espresso">{p.title}</p>
              <p className="mt-2 text-[0.8125rem] text-stone">{p.text}</p>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
