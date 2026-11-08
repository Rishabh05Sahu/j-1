"use client";

import { Heart } from "lucide-react";
import { Button } from "@/components/atoms/Button";
import { Container } from "@/components/atoms/Container";
import { Spinner } from "@/components/atoms/Spinner";
import { EmptyState } from "@/components/molecules/EmptyState";
import { ProductCard } from "@/components/molecules/ProductCard";
import { PageHeader } from "@/components/organisms/PageHeader";
import { ProductShowcase } from "@/components/organisms/ProductShowcase";
import { useMoveToBag } from "@/hooks/useMoveToBag";
import { useWishlist } from "@/hooks/useWishlist";
import { getBestSellers, getProductsByIds } from "@/lib/product-utils";

const suggestions = getBestSellers(4);

export function WishlistTemplate() {
  const { ids, hydrated, removeFromWishlist } = useWishlist();
  const moveToBag = useMoveToBag();
  const products = getProductsByIds(ids);

  return (
    <>
      <PageHeader
        eyebrow="Saved for Later"
        title="Your Wishlist"
        intro={
          products.length > 0
            ? `${products.length} ${products.length === 1 ? "creation" : "creations"} you have fallen for. Your wishlist is saved on this device.`
            : "Keep the pieces you love in one place — to revisit, to share, or to gift."
        }
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Wishlist" }]}
      />
      <Container className="pb-24 md:pb-32">
        {!hydrated ? (
          <div className="flex justify-center py-20 text-stone">
            <Spinner label="Loading wishlist" />
          </div>
        ) : products.length === 0 ? (
          <EmptyState
            icon={<Heart strokeWidth={1} className="size-6" />}
            title="Your wishlist is empty"
            text="Select the heart on any creation to save it here."
            actions={
              <Button href="/collections" variant="primary">
                Discover Jewelry
              </Button>
            }
            className="border-t border-line"
          />
        ) : (
          <ul className="grid grid-cols-2 gap-x-3 gap-y-14 border-t border-line pt-12 sm:gap-x-5 md:grid-cols-3 lg:gap-x-7 xl:grid-cols-4">
            {products.map((p) => (
              <li key={p.id} className="flex animate-fade-in flex-col">
                <ProductCard product={p} showDescription={false} />
                <div className="mt-5 flex flex-col gap-2">
                  {p.availability === "sold-out" ? (
                    <Button href="/book-appointment" variant="outline" size="sm" fullWidth>
                      Enquire
                    </Button>
                  ) : (
                    <Button variant="primary" size="sm" fullWidth onClick={() => moveToBag(p)}>
                      {p.sizes ? "Select Size" : "Move to Bag"}
                    </Button>
                  )}
                  <button
                    type="button"
                    onClick={() => removeFromWishlist(p.id)}
                    className="eyebrow h-9 text-[0.625rem] text-stone transition-colors hover:text-espresso"
                  >
                    Remove<span className="sr-only"> {p.name}</span>
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </Container>
      {hydrated && products.length === 0 && (
        <ProductShowcase id="wishlist-suggestions" eyebrow="Inspiration" title="Most Loved Creations" products={suggestions} className="border-t border-line" />
      )}
    </>
  );
}
