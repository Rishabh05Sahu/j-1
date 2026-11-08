"use client";

import { ArrowRight, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { ImageFrame } from "@/components/atoms/ImageFrame";
import { Price } from "@/components/atoms/Price";
import { SearchInput } from "@/components/molecules/SearchInput";
import { popularSearches, searchCategoryShortcuts } from "@/data/navigation";
import { useDialog } from "@/hooks/useDialog";
import { useSearch } from "@/hooks/useSearch";
import { useUI } from "@/hooks/useUI";
import { categoryLabel, getBestSellers } from "@/lib/product-utils";
import { cn } from "@/lib/utils";
import type { Product } from "@/types";

const trending = getBestSellers(4);

export function SearchOverlay() {
  const { searchOpen, close } = useUI();
  const router = useRouter();
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const onClose = () => close("search");
  const panelRef = useDialog<HTMLDivElement>(searchOpen, onClose, inputRef);
  const { results, total, query: settled } = useSearch(query, 8);
  const hasQuery = query.trim().length > 0;

  const submit = (value: string) => {
    if (!value.trim()) return;
    onClose();
    router.push(`/search?q=${encodeURIComponent(value.trim())}`);
  };

  return (
    <div className={cn("fixed inset-0 z-[60]", !searchOpen && "pointer-events-none")} inert={!searchOpen} aria-hidden={!searchOpen}>
      <div
        aria-hidden="true"
        onClick={onClose}
        className={cn("absolute inset-0 bg-noir/40 transition-opacity duration-500", searchOpen ? "opacity-100" : "opacity-0")}
      />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Search"
        className={cn(
          "relative max-h-[100svh] overflow-y-auto bg-ivory transition-[opacity,transform] duration-[600ms] ease-luxe",
          searchOpen ? "translate-y-0 opacity-100" : "-translate-y-6 opacity-0",
        )}
      >
        <div className="container-luxe pb-12 pt-6 md:pb-16 md:pt-10">
          <div className="flex items-center justify-between">
            <p className="eyebrow text-stone">Search AURELLE</p>
            <button type="button" onClick={onClose} aria-label="Close search" className="-mr-2 flex size-11 items-center justify-center">
              <X strokeWidth={1.1} className="size-5" />
            </button>
          </div>

          <SearchInput
            ref={inputRef}
            id="overlay-search"
            size="lg"
            value={query}
            onValueChange={setQuery}
            onSubmit={submit}
            placeholder="Rings, diamonds, gold…"
            className="mt-4"
          />

          {!hasQuery ? (
            <div className="mt-10 grid gap-12 md:mt-12 md:grid-cols-12">
              <div className="md:col-span-4">
                <p className="eyebrow mb-5 text-[0.625rem] text-gold-deep">Popular Searches</p>
                <ul className="flex flex-wrap gap-2">
                  {popularSearches.map((term) => (
                    <li key={term}>
                      <button
                        type="button"
                        onClick={() => setQuery(term)}
                        className="h-9 border border-line px-4 text-[0.8125rem] text-espresso transition-colors hover:border-espresso"
                      >
                        {term}
                      </button>
                    </li>
                  ))}
                </ul>
                <p className="eyebrow mb-4 mt-10 text-[0.625rem] text-gold-deep">Categories</p>
                <ul className="grid grid-cols-2 gap-y-2.5">
                  {searchCategoryShortcuts.map((link) => (
                    <li key={link.href}>
                      <Link href={link.href} onClick={onClose} className="link-underline font-serif text-[1.25rem]">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="md:col-span-8">
                <p className="eyebrow mb-5 text-[0.625rem] text-gold-deep">Most Loved</p>
                <ResultGrid products={trending} onNavigate={onClose} />
              </div>
            </div>
          ) : (
            <div className="mt-8 md:mt-10">
              <div className="mb-6 flex items-baseline justify-between gap-4">
                <p className="text-[0.8125rem] text-stone" aria-live="polite">
                  {total === 0 ? "No results" : `${total} ${total === 1 ? "creation" : "creations"}`} for “{settled}”
                </p>
                {total > 0 && (
                  <button type="button" onClick={() => submit(query)} className="eyebrow group inline-flex items-center gap-2 text-espresso">
                    <span className="link-underline-static">View All Results</span>
                    <ArrowRight aria-hidden="true" strokeWidth={1.1} className="size-4 transition-transform duration-500 group-hover:translate-x-1" />
                  </button>
                )}
              </div>
              {total === 0 ? (
                <div className="animate-fade-in border-t border-line py-12 text-center">
                  <p className="font-serif text-[1.75rem] font-light">No creations match your search.</p>
                  <p className="mx-auto mt-3 max-w-md text-[0.875rem] text-stone">
                    Try a different term — a gemstone, a metal or a collection — or explore one of our suggestions.
                  </p>
                  <div className="mt-6 flex flex-wrap justify-center gap-2">
                    {popularSearches.slice(0, 4).map((term) => (
                      <button
                        key={term}
                        type="button"
                        onClick={() => setQuery(term)}
                        className="h-9 border border-line px-4 text-[0.8125rem] transition-colors hover:border-espresso"
                      >
                        {term}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <ResultGrid products={results} onNavigate={onClose} />
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function ResultGrid({ products, onNavigate }: { products: Product[]; onNavigate: () => void }) {
  return (
    <ul className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-4">
      {products.map((p, i) => (
        <li key={p.id} className="animate-fade-up" style={{ animationDelay: `${i * 40}ms` }}>
          <Link href={`/products/${p.slug}`} onClick={onNavigate} className="group/result block">
            <ImageFrame image={p.images[0]} ratio="4/5" sizes="(min-width: 640px) 20vw, 45vw" imgClassName="duration-[1200ms] group-hover/result:scale-[1.04]" />
            <p className="eyebrow mt-3 text-[0.5625rem] text-mute">{categoryLabel(p.category)}</p>
            <p className="mt-1 font-serif text-[1.0625rem] leading-snug">{p.name}</p>
            <Price amount={p.price} size="sm" className="mt-1 text-stone" />
          </Link>
        </li>
      ))}
    </ul>
  );
}
