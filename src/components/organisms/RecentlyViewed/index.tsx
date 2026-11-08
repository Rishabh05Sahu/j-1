"use client";

import { useEffect } from "react";
import { ProductCard } from "@/components/molecules/ProductCard";
import { SectionHeading } from "@/components/molecules/SectionHeading";
import { useWishlist } from "@/hooks/useWishlist";
import { getProductsByIds } from "@/lib/product-utils";

/**
 * Records the current product as viewed and shows previously viewed pieces.
 * Reads from browser storage, so it renders nothing on the server.
 */
export function RecentlyViewed({ currentId, title = "Recently Viewed" }: { currentId?: string; title?: string }) {
  const { recentlyViewed, trackView } = useWishlist();

  useEffect(() => {
    if (currentId) trackView(currentId);
    // trackView identity changes whenever the store updates; track once per product.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentId]);

  const products = getProductsByIds(recentlyViewed.filter((id) => id !== currentId)).slice(0, 4);
  if (products.length === 0) return null;

  return (
    <section aria-labelledby="recent-title" className="section-y border-t border-line">
      <div className="container-luxe">
        <SectionHeading id="recent-title" title={title} size="md" />
        <ul className="mt-12 grid grid-cols-2 gap-x-3 gap-y-12 sm:gap-x-5 lg:grid-cols-4 lg:gap-x-7">
          {products.map((p) => (
            <li key={p.id} className="animate-fade-in">
              <ProductCard product={p} showDescription={false} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
