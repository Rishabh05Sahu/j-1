import type { Metadata } from "next";
import { CheckoutTemplate } from "@/components/templates/CheckoutTemplate";

export const metadata: Metadata = {
  title: "Checkout",
  description: "Complete your AURELLE order (demonstration checkout — no payment is taken).",
  robots: { index: false },
};

export default function CheckoutPage() {
  return <CheckoutTemplate />;
}
