"use client";

import { Checkbox } from "@/components/atoms/Checkbox";
import type { FilterGroups } from "@/lib/product-utils";
import type { FilterOption, FilterState } from "@/types";

const GROUPS: { key: keyof FilterState; title: string }[] = [
  { key: "categories", title: "Category" },
  { key: "priceRanges", title: "Price" },
  { key: "metals", title: "Metal" },
  { key: "gemstones", title: "Gemstone" },
  { key: "collections", title: "Collection" },
  { key: "availability", title: "Availability" },
];

export interface FilterSidebarProps {
  groups: FilterGroups;
  filters: FilterState;
  onToggle: (key: keyof FilterState, value: string) => void;
}

/** Faceted filters with live counts. Facets with a single option are hidden. */
export function FilterSidebar({ groups, filters, onToggle }: FilterSidebarProps) {
  return (
    <div className="flex flex-col divide-y divide-line">
      {GROUPS.map(({ key, title }) => {
        const options = groups[key] as FilterOption[];
        const selected = filters[key] as string[];
        if (options.length < 2 && selected.length === 0) return null;
        return (
          <fieldset key={key} className="py-6 first:pt-0">
            <legend className="eyebrow mb-4 float-left w-full text-espresso">
              {title}
              {selected.length > 0 && <span className="ml-2 text-gold-deep">({selected.length})</span>}
            </legend>
            <div className="clear-both flex flex-col">
              {options.map((o) => (
                <Checkbox
                  key={o.value}
                  label={o.label}
                  meta={o.count}
                  checked={selected.includes(o.value)}
                  onChange={() => onToggle(key, o.value)}
                  disabled={o.count === 0 && !selected.includes(o.value)}
                />
              ))}
            </div>
          </fieldset>
        );
      })}
    </div>
  );
}
