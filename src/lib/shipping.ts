import { brand } from "@/config/brand";

export type ShippingMethod = "standard" | "express";

export const shippingMethods: { value: ShippingMethod; title: string; description: string }[] = [
  {
    value: "standard",
    title: "Standard Insured Delivery",
    description: "3–5 business days across India. Signature required on delivery.",
  },
  {
    value: "express",
    title: "Complimentary Express Delivery",
    description: "1–2 business days in Mumbai, Delhi NCR and Bengaluru, by private courier.",
  },
];

/** Delivery fee for a given subtotal and method. */
export function shippingFee(subtotal: number, method: ShippingMethod = "standard") {
  if (subtotal === 0 || method === "express") return brand.expressShippingFee;
  return subtotal >= brand.freeShippingThreshold ? 0 : brand.standardShippingFee;
}
