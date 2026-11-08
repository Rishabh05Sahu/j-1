"use client";

import { useCart } from "./useCart";
import { useUI } from "./useUI";
import { useWishlist } from "./useWishlist";
import type { Product } from "@/types";

/**
 * Moves a wishlist product to the bag. Pieces that need a size first open
 * the quick view so the shopper can choose one.
 */
export function useMoveToBag() {
  const { addToCart } = useCart();
  const { removeFromWishlist } = useWishlist();
  const { openQuickView } = useUI();

  return (product: Product) => {
    if (product.availability === "sold-out") return;
    if (product.sizes) {
      openQuickView(product.id);
      return;
    }
    addToCart(product.id, { reveal: "toast" });
    removeFromWishlist(product.id);
  };
}
