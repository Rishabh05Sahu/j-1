"use client";

import { ShoppingBag } from "lucide-react";
import { Button } from "@/components/atoms/Button";
import { Price } from "@/components/atoms/Price";
import { CartItem } from "@/components/molecules/CartItem";
import { EmptyState } from "@/components/molecules/EmptyState";
import { Drawer } from "@/components/molecules/Overlay";
import { brand } from "@/config/brand";
import { useCart } from "@/hooks/useCart";
import { useUI } from "@/hooks/useUI";
import { formatPrice } from "@/lib/currency";

export function CartDrawer() {
  const { cartOpen, close } = useUI();
  const { lines, count, subtotal } = useCart();
  const onClose = () => close("cart");
  const remaining = brand.freeShippingThreshold - subtotal;

  return (
    <Drawer
      open={cartOpen}
      onClose={onClose}
      title="Your Bag"
      eyebrow={count > 0 ? `${count} ${count === 1 ? "item" : "items"}` : undefined}
      footer={
        lines.length > 0 ? (
          <div className="flex flex-col gap-4">
            <div className="flex items-baseline justify-between">
              <span className="eyebrow text-espresso">Subtotal</span>
              <Price amount={subtotal} size="lg" />
            </div>
            <p className="-mt-2 text-[0.75rem] text-stone">Taxes included. Delivery calculated at checkout.</p>
            <Button href="/checkout" onClick={onClose} variant="primary" size="lg" fullWidth>
              Proceed to Checkout
            </Button>
            <Button href="/cart" onClick={onClose} variant="outline" size="md" fullWidth>
              View Bag
            </Button>
          </div>
        ) : undefined
      }
    >
      {lines.length === 0 ? (
        <EmptyState
          icon={<ShoppingBag strokeWidth={1} className="size-6" />}
          title="Your bag is empty"
          text="Discover creations designed to celebrate life's most meaningful moments."
          actions={
            <Button href="/collections" onClick={onClose} variant="primary">
              Explore the Collections
            </Button>
          }
          className="py-24"
        />
      ) : (
        <div className="px-5 py-6 sm:px-8">
          <p className="mb-6 bg-champagne/70 px-4 py-3 text-center text-[0.75rem] tracking-[0.02em] text-stone">
            {remaining > 0
              ? `You are ${formatPrice(remaining)} away from complimentary insured delivery.`
              : "Your order qualifies for complimentary insured delivery."}
          </p>
          <ul className="flex flex-col divide-y divide-line">
            {lines.map((line) => (
              <li key={line.key} className="animate-fade-in py-6 first:pt-0">
                <CartItem line={line} onNavigate={onClose} />
              </li>
            ))}
          </ul>
        </div>
      )}
    </Drawer>
  );
}
