"use client";

import { Heart } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/atoms/Button";
import { ImageFrame } from "@/components/atoms/ImageFrame";
import { Price } from "@/components/atoms/Price";
import { EmptyState } from "@/components/molecules/EmptyState";
import { Drawer } from "@/components/molecules/Overlay";
import { useMoveToBag } from "@/hooks/useMoveToBag";
import { useUI } from "@/hooks/useUI";
import { useWishlist } from "@/hooks/useWishlist";
import { getProductsByIds } from "@/lib/product-utils";

export function WishlistDrawer() {
  const { wishlistOpen, close } = useUI();
  const { ids, count, removeFromWishlist } = useWishlist();
  const moveToBag = useMoveToBag();
  const products = getProductsByIds(ids);
  const onClose = () => close("wishlist");

  return (
    <Drawer
      open={wishlistOpen}
      onClose={onClose}
      title="Your Wishlist"
      eyebrow={count > 0 ? `${count} ${count === 1 ? "piece" : "pieces"}` : undefined}
      footer={
        products.length > 0 ? (
          <Button href="/wishlist" onClick={onClose} variant="outline" fullWidth>
            View Full Wishlist
          </Button>
        ) : undefined
      }
    >
      {products.length === 0 ? (
        <EmptyState
          icon={<Heart strokeWidth={1} className="size-6" />}
          title="Your wishlist awaits"
          text="Save the creations you love by selecting the heart on any piece."
          actions={
            <Button href="/collections" onClick={onClose} variant="primary">
              Discover Jewelry
            </Button>
          }
          className="py-24"
        />
      ) : (
        <ul className="flex flex-col divide-y divide-line px-5 py-2 sm:px-8">
          {products.map((p) => (
            <li key={p.id} className="flex animate-fade-in gap-4 py-6">
              <Link href={`/products/${p.slug}`} onClick={onClose} className="block w-24 shrink-0" tabIndex={-1} aria-hidden="true">
                <ImageFrame image={p.images[0]} ratio="4/5" sizes="96px" />
              </Link>
              <div className="flex min-w-0 flex-1 flex-col">
                <Link href={`/products/${p.slug}`} onClick={onClose} className="link-underline self-start font-serif text-[1.0625rem] leading-snug">
                  {p.name}
                </Link>
                <p className="mt-1 text-[0.75rem] text-stone">{p.subtitle}</p>
                <Price amount={p.price} size="sm" className="mt-2" />
                <div className="mt-auto flex items-center gap-5 pt-3">
                  {p.availability !== "sold-out" ? (
                    <button type="button" onClick={() => moveToBag(p)} className="link-underline-static eyebrow text-[0.625rem] text-espresso">
                      {p.sizes ? "Select Size" : "Move to Bag"}
                    </button>
                  ) : (
                    <span className="eyebrow text-[0.625rem] text-mute">Sold Out</span>
                  )}
                  <button
                    type="button"
                    onClick={() => removeFromWishlist(p.id)}
                    className="eyebrow text-[0.625rem] text-stone transition-colors hover:text-espresso"
                  >
                    Remove<span className="sr-only"> {p.name}</span>
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </Drawer>
  );
}
