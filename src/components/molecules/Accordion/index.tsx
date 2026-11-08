"use client";

import { Plus } from "lucide-react";
import { useId, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface AccordionItem {
  id: string;
  title: string;
  content: ReactNode;
}

/** Disclosure list with smooth height animation (grid-rows technique). */
export function Accordion({
  items,
  defaultOpen = [],
  className,
}: {
  items: AccordionItem[];
  defaultOpen?: string[];
  className?: string;
}) {
  const [open, setOpen] = useState<string[]>(defaultOpen);
  const baseId = useId();
  const toggle = (id: string) => setOpen((o) => (o.includes(id) ? o.filter((x) => x !== id) : [...o, id]));

  return (
    <div className={cn("border-t border-line", className)}>
      {items.map((item) => {
        const expanded = open.includes(item.id);
        const panelId = `${baseId}-${item.id}-panel`;
        const buttonId = `${baseId}-${item.id}-button`;
        return (
          <div key={item.id} className="border-b border-line">
            <h3>
              <button
                id={buttonId}
                type="button"
                aria-expanded={expanded}
                aria-controls={panelId}
                onClick={() => toggle(item.id)}
                className="group flex w-full items-center justify-between gap-6 py-5 text-left md:py-6"
              >
                <span className="eyebrow text-espresso transition-colors group-hover:text-gold-deep">{item.title}</span>
                <Plus
                  aria-hidden="true"
                  strokeWidth={1.1}
                  className={cn("size-4 shrink-0 text-stone transition-transform duration-500 ease-luxe", expanded && "rotate-45")}
                />
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              className={cn(
                "grid transition-[grid-template-rows,opacity] duration-500 ease-luxe",
                expanded ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
              )}
            >
              <div className="overflow-hidden" inert={!expanded}>
                <div className="pb-6 text-[0.875rem] leading-[1.8] text-stone md:pb-8">{item.content}</div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
