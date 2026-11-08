"use client";

import { use } from "react";
import { ToastContext, UIContext } from "@/providers/ShopProvider";

export function useUI() {
  const ctx = use(UIContext);
  if (!ctx) throw new Error("useUI must be used within <ShopProvider>");
  return ctx;
}

export function useToast() {
  const ctx = use(ToastContext);
  if (!ctx) throw new Error("useToast must be used within <ShopProvider>");
  return ctx;
}
