"use client";

import { Lock, ShoppingBag } from "lucide-react";
import { useId, useState } from "react";
import { Button } from "@/components/atoms/Button";
import { Checkbox } from "@/components/atoms/Checkbox";
import { Container } from "@/components/atoms/Container";
import { Textarea } from "@/components/atoms/Input";
import { Spinner } from "@/components/atoms/Spinner";
import { Breadcrumbs } from "@/components/molecules/Breadcrumbs";
import { CartItem } from "@/components/molecules/CartItem";
import { EmptyState } from "@/components/molecules/EmptyState";
import { OrderSummary } from "@/components/organisms/OrderSummary";
import { ProductShowcase } from "@/components/organisms/ProductShowcase";
import { TrustSection } from "@/components/organisms/TrustSection";
import { useCart } from "@/hooks/useCart";
import { getBestSellers } from "@/lib/product-utils";
import { shippingFee } from "@/lib/shipping";

const recommendations = getBestSellers(8);

export function CartTemplate() {
  const { lines, count, subtotal, hydrated } = useCart();
  const [giftWrap, setGiftWrap] = useState(false);
  const [message, setMessage] = useState("");
  const noteId = useId();

  const inCart = new Set(lines.map((l) => l.productId));
  const suggestions = recommendations.filter((p) => !inCart.has(p.id)).slice(0, 4);

  return (
    <>
      <Container className="pb-20 pt-6 md:pb-28 md:pt-10">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Shopping Bag" }]} />
        <div className="mt-10 flex items-baseline justify-between border-b border-line pb-6 md:mt-14">
          <h1 className="font-serif text-[2.25rem] font-light leading-none md:text-[3rem]">Your Bag</h1>
          {count > 0 && <p className="text-[0.8125rem] text-stone">{count} {count === 1 ? "item" : "items"}</p>}
        </div>

        {!hydrated ? (
          <div className="flex justify-center py-24 text-stone">
            <Spinner label="Loading your bag" />
          </div>
        ) : lines.length === 0 ? (
          <EmptyState
            icon={<ShoppingBag strokeWidth={1} className="size-6" />}
            title="Your bag is empty"
            text="When you add a creation to your bag, it will appear here — ready whenever you are."
            actions={
              <>
                <Button href="/collections" variant="primary">
                  Explore the Collections
                </Button>
                <Button href="/wishlist" variant="outline">
                  View Wishlist
                </Button>
              </>
            }
            className="py-24"
          />
        ) : (
          <div className="mt-10 grid gap-12 lg:grid-cols-12 lg:gap-16">
            <ul className="flex flex-col divide-y divide-line lg:col-span-7 xl:col-span-8">
              {lines.map((line) => (
                <li key={line.key} className="animate-fade-in py-8 first:pt-0">
                  <CartItem line={line} variant="page" />
                </li>
              ))}
            </ul>

            <div className="lg:col-span-5 xl:col-span-4">
              <div className="flex flex-col gap-6 lg:sticky lg:top-[140px]">
                <OrderSummary lines={lines} subtotal={subtotal} shipping={shippingFee(subtotal)}>
                  <div className="border-t border-line pt-6">
                    <Checkbox
                      label="Add complimentary gift presentation"
                      checked={giftWrap}
                      onChange={(e) => setGiftWrap(e.target.checked)}
                    />
                    {giftWrap && (
                      <div className="mt-4 animate-fade-in">
                        <label htmlFor={noteId} className="eyebrow text-[0.625rem] text-stone">
                          Handwritten card message
                        </label>
                        <Textarea
                          id={noteId}
                          rows={3}
                          maxLength={200}
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          placeholder="Your message, written by hand on AURELLE stationery"
                          className="mt-2 text-[0.875rem]"
                        />
                        <p className="mt-1 text-right text-[0.6875rem] text-mute">{message.length}/200</p>
                      </div>
                    )}
                  </div>
                  <Button href="/checkout" variant="primary" size="lg" fullWidth className="mt-6">
                    Proceed to Checkout
                  </Button>
                  <p className="mt-4 flex items-center justify-center gap-2 text-[0.6875rem] text-mute">
                    <Lock aria-hidden="true" strokeWidth={1.25} className="size-3" />
                    Secure demonstration checkout — no payment is taken
                  </p>
                </OrderSummary>
                <div className="border border-line p-6">
                  <TrustSection variant="compact" />
                </div>
              </div>
            </div>
          </div>
        )}
      </Container>
      <ProductShowcase id="cart-suggestions" eyebrow="Complete the Look" title="You May Also Love" products={suggestions} className="border-t border-line" />
    </>
  );
}
