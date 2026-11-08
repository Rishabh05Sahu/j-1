"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { Container } from "@/components/atoms/Container";
import { Eyebrow, Heading } from "@/components/atoms/Typography";
import { SearchInput } from "@/components/molecules/SearchInput";
import { ProductListing } from "@/components/organisms/ProductListing";
import { ProductShowcase } from "@/components/organisms/ProductShowcase";
import { popularSearches } from "@/data/navigation";
import { useSearch } from "@/hooks/useSearch";
import { getBestSellers } from "@/lib/product-utils";

const suggestions = getBestSellers(4);

/** Search results page. The query is kept in the URL (?q=) so results are shareable. */
export function SearchTemplate() {
  const params = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const urlQuery = params.get("q") ?? "";
  const [query, setQuery] = useState(urlQuery);
  const [syncedFrom, setSyncedFrom] = useState(urlQuery);

  // Follow external URL changes (e.g. a new search submitted from the header overlay).
  if (urlQuery !== syncedFrom) {
    setSyncedFrom(urlQuery);
    setQuery(urlQuery);
  }

  const { results, query: settled } = useSearch(query);

  const update = (value: string) => {
    setQuery(value);
    const next = value.trim() ? `?q=${encodeURIComponent(value)}` : "";
    setSyncedFrom(value.trim() ? value : "");
    router.replace(`${pathname}${next}`, { scroll: false });
  };

  const hasQuery = settled.trim().length > 0;

  return (
    <>
      <Container className="pb-10 pt-10 md:pt-16">
        <div className="mx-auto max-w-[860px] text-center">
          <Eyebrow tone="gold">Search</Eyebrow>
          <Heading as="h1" size="xl" className="mt-4">
            {hasQuery ? <>Results for “{settled.trim()}”</> : "Find Your Piece"}
          </Heading>
          <SearchInput
            id="page-search"
            size="lg"
            value={query}
            onValueChange={update}
            onSubmit={update}
            placeholder="Search by name, gemstone, metal…"
            className="mt-10 text-left"
          />
          <ul className="mt-6 flex flex-wrap justify-center gap-2">
            {popularSearches.map((term) => (
              <li key={term}>
                <button
                  type="button"
                  onClick={() => update(term)}
                  className="h-9 border border-line px-4 text-[0.8125rem] transition-colors hover:border-espresso"
                >
                  {term}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </Container>

      {hasQuery ? (
        <Container className="pb-24 md:pb-32">
          {results.length > 0 ? (
            <ProductListing key={settled} products={results} noun={["result", "results"]} />
          ) : (
            <div className="animate-fade-in border-t border-line py-20 text-center">
              <p className="font-serif text-[2rem] font-light">No creations match “{settled.trim()}”.</p>
              <p className="mx-auto mt-4 max-w-md text-[0.9375rem] text-stone">
                Try searching for a gemstone, a metal or a collection name — or let a specialist help you find it.
              </p>
            </div>
          )}
        </Container>
      ) : null}

      {(!hasQuery || results.length === 0) && (
        <ProductShowcase id="search-suggestions" eyebrow="You May Like" title="Most Loved Creations" products={suggestions} className="border-t border-line" />
      )}
    </>
  );
}
