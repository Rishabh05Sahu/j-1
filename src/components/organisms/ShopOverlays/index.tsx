"use client";

import { CartDrawer } from "@/components/organisms/CartDrawer";
import { MobileMenu } from "@/components/organisms/MobileMenu";
import { QuickViewModal } from "@/components/organisms/QuickViewModal";
import { SearchOverlay } from "@/components/organisms/SearchOverlay";
import { Toaster } from "@/components/organisms/Toaster";
import { WishlistDrawer } from "@/components/organisms/WishlistDrawer";

/** Global overlays mounted once in the root layout. */
export function ShopOverlays() {
  return (
    <>
      <MobileMenu />
      <SearchOverlay />
      <CartDrawer />
      <WishlistDrawer />
      <QuickViewModal />
      <Toaster />
    </>
  );
}
