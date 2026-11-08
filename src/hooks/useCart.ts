"use client";

import { use } from "react";
import { CartContext } from "@/providers/ShopProvider";

export function useCart() {
  const ctx = use(CartContext);
  if (!ctx) throw new Error("useCart must be used within <ShopProvider>");
  return ctx;
}
