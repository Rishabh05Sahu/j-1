import type { Metadata } from "next";
import { CartTemplate } from "@/components/templates/CartTemplate";

export const metadata: Metadata = {
  title: "Shopping Bag",
  description: "Review the creations in your AURELLE shopping bag.",
  robots: { index: false },
};

export default function CartPage() {
  return <CartTemplate />;
}
