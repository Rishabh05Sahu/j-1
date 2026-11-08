"use client";

import { use } from "react";
import { WishlistContext } from "@/providers/ShopProvider";

export function useWishlist() {
  const ctx = use(WishlistContext);
  if (!ctx) throw new Error("useWishlist must be used within <ShopProvider>");
  return ctx;
}
