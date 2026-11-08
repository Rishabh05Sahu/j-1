import type { Metadata } from "next";
import { WishlistTemplate } from "@/components/templates/WishlistTemplate";

export const metadata: Metadata = {
  title: "Wishlist",
  description: "The AURELLE creations you have saved.",
  robots: { index: false },
};

export default function WishlistPage() {
  return <WishlistTemplate />;
}
