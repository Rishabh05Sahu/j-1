"use client";

import { useDeferredValue, useMemo } from "react";
import { searchProducts } from "@/lib/product-utils";

/** Filters the catalogue as the shopper types, deferring work to keep input responsive. */
export function useSearch(query: string, limit?: number) {
  const deferred = useDeferredValue(query);
  return useMemo(() => {
    const results = searchProducts(deferred);
    return {
      query: deferred,
      results: limit ? results.slice(0, limit) : results,
      total: results.length,
      isStale: deferred !== query,
    };
  }, [deferred, query, limit]);
}
