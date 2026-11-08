"use client";

import { SearchX, SlidersHorizontal } from "lucide-react";
import { useMemo, useState } from "react";
import { Button } from "@/components/atoms/Button";
import { Select } from "@/components/atoms/Select";
import { EmptyState } from "@/components/molecules/EmptyState";
import { FilterChip } from "@/components/molecules/FilterChip";
import { Drawer } from "@/components/molecules/Overlay";
import { FilterSidebar } from "@/components/organisms/FilterSidebar";
import { ProductGrid } from "@/components/organisms/ProductGrid";
import { namedCollections } from "@/data/collections";
import {
  AVAILABILITY,
  buildFilterGroups,
  CATEGORIES,
  countActiveFilters,
  emptyFilters,
  filterProducts,
  PRICE_RANGES,
  SORT_OPTIONS,
  sortProducts,
} from "@/lib/product-utils";
import type { FilterState, Product, SortOption } from "@/types";

const collectionLabels = Object.fromEntries(
  namedCollections.map((c) => [c.slug, c.title.replace(/^The | Collection$/g, "")]),
);

function labelFor(key: keyof FilterState, value: string) {
  switch (key) {
    case "categories":
      return CATEGORIES.find((c) => c.value === value)?.label ?? value;
    case "priceRanges":
      return PRICE_RANGES.find((r) => r.id === value)?.label ?? value;
    case "collections":
      return collectionLabels[value] ?? value;
    case "availability":
      return AVAILABILITY.find((a) => a.value === value)?.label ?? value;
    case "gemstones":
      return value === "None" ? "No Gemstone" : value;
    default:
      return value;
  }
}

export interface ProductListingProps {
  products: Product[];
  /** Label used in the result count, e.g. "creations". */
  noun?: [singular: string, plural: string];
  initialSort?: SortOption;
}

/** Filterable, sortable product listing used by collections and search. */
export function ProductListing({ products, noun = ["creation", "creations"], initialSort = "featured" }: ProductListingProps) {
  const [filters, setFilters] = useState<FilterState>(emptyFilters);
  const [sort, setSort] = useState<SortOption>(initialSort);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const groups = useMemo(() => buildFilterGroups(products, filters, collectionLabels), [products, filters]);
  const visible = useMemo(() => sortProducts(filterProducts(products, filters), sort), [products, filters, sort]);
  const activeCount = countActiveFilters(filters);

  const toggle = (key: keyof FilterState, value: string) =>
    setFilters((f) => {
      const list = f[key] as string[];
      return { ...f, [key]: list.includes(value) ? list.filter((v) => v !== value) : [...list, value] };
    });
  const clear = () => setFilters(emptyFilters());

  const chips = (Object.keys(filters) as (keyof FilterState)[]).flatMap((key) =>
    (filters[key] as string[]).map((value) => ({ key, value, label: labelFor(key, value) })),
  );

  const countLabel = `${visible.length} ${visible.length === 1 ? noun[0] : noun[1]}`;

  return (
    <div>
      {/* Toolbar */}
      <div className="flex items-center justify-between gap-4 border-y border-line py-3">
        <button
          type="button"
          onClick={() => setDrawerOpen(true)}
          className="eyebrow flex h-10 items-center gap-3 text-espresso transition-opacity hover:opacity-70"
          aria-haspopup="dialog"
        >
          <SlidersHorizontal aria-hidden="true" strokeWidth={1.1} className="size-4" />
          Filter
          {activeCount > 0 && (
            <span className="flex size-5 items-center justify-center rounded-full bg-espresso text-[0.625rem] tracking-normal text-pearl">
              {activeCount}
            </span>
          )}
        </button>
        <p className="hidden text-[0.8125rem] text-stone sm:block" aria-live="polite">
          {countLabel}
        </p>
        <div className="flex items-center gap-3">
          <label htmlFor="sort" className="eyebrow hidden text-[0.625rem] text-mute md:block">
            Sort by
          </label>
          <Select
            id="sort"
            variant="minimal"
            value={sort}
            onChange={(e) => setSort(e.target.value as SortOption)}
            options={SORT_OPTIONS}
            className="w-[168px] sm:w-[180px]"
            aria-label="Sort products"
          />
        </div>
      </div>

      <p className="mt-4 text-[0.8125rem] text-stone sm:hidden" aria-live="polite">
        {countLabel}
      </p>

      {chips.length > 0 && (
        <div className="mt-5 flex flex-wrap items-center gap-2">
          {chips.map((c) => (
            <FilterChip key={`${c.key}-${c.value}`} label={c.label} onRemove={() => toggle(c.key, c.value)} />
          ))}
          <button type="button" onClick={clear} className="link-underline-static ml-2 text-[0.75rem] text-stone hover:text-espresso">
            Clear all
          </button>
        </div>
      )}

      <div className="mt-10 md:mt-14">
        {visible.length === 0 ? (
          <EmptyState
            icon={<SearchX strokeWidth={1} className="size-6" />}
            title="No creations match"
            text="Try removing a filter or two to discover more of the collection."
            actions={
              <Button variant="outline" onClick={clear}>
                Clear All Filters
              </Button>
            }
          />
        ) : (
          <ProductGrid key={`${sort}-${JSON.stringify(filters)}`} products={visible} priorityCount={4} />
        )}
      </div>

      <Drawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        title="Filter"
        eyebrow={activeCount > 0 ? `${activeCount} selected` : undefined}
        side="left"
        width="sm:max-w-[400px]"
        footer={
          <div className="flex gap-3">
            <Button variant="outline" onClick={clear} disabled={activeCount === 0} className="flex-1 px-4">
              Clear All
            </Button>
            <Button variant="primary" onClick={() => setDrawerOpen(false)} className="flex-[1.4] px-4">
              View {visible.length}
            </Button>
          </div>
        }
      >
        <div className="px-5 py-6 sm:px-8">
          <FilterSidebar groups={groups} filters={filters} onToggle={toggle} />
        </div>
      </Drawer>
    </div>
  );
}
