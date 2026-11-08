"use client";

import { Check, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/atoms/Button";
import { Container } from "@/components/atoms/Container";
import { Divider } from "@/components/atoms/Divider";
import { Spinner } from "@/components/atoms/Spinner";
import { EmptyState } from "@/components/molecules/EmptyState";
import { Logo } from "@/components/molecules/Logo";
import { CheckoutForm, type CheckoutValues, type PaymentMethod } from "@/components/organisms/CheckoutForm";
import { OrderSummary } from "@/components/organisms/OrderSummary";
import { TrustSection } from "@/components/organisms/TrustSection";
import { useCart } from "@/hooks/useCart";
import { shippingFee, shippingMethods, type ShippingMethod } from "@/lib/shipping";
import { createOrderReference } from "@/lib/utils";
import type { CartLineDetailed } from "@/types";

interface Confirmation {
  reference: string;
  values: CheckoutValues;
  lines: CartLineDetailed[];
  subtotal: number;
  shipping: number;
  method: ShippingMethod;
  payment: PaymentMethod;
}

const paymentLabels: Record<PaymentMethod, string> = { card: "Credit / Debit Card", upi: "UPI", netbanking: "Net Banking" };

export function CheckoutTemplate() {
  const { lines, subtotal, hydrated, clearCart } = useCart();
  const [method, setMethod] = useState<ShippingMethod>("standard");
  const [payment, setPayment] = useState<PaymentMethod>("card");
  const [confirmation, setConfirmation] = useState<Confirmation | null>(null);
  const shipping = shippingFee(subtotal, method);

  const complete = (values: CheckoutValues) => {
    setConfirmation({ reference: createOrderReference(), values, lines, subtotal, shipping, method, payment });
    clearCart();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (confirmation) return <OrderConfirmation confirmation={confirmation} />;

  return (
    <Container className="pb-24 pt-6 md:pb-32 md:pt-10">
      <div className="flex flex-col items-center border-b border-line pb-8 text-center">
        <p className="eyebrow text-gold-deep">Secure Checkout</p>
        <h1 className="mt-3 font-serif text-[2.25rem] font-light leading-none md:text-[3rem]">Checkout</h1>
        <nav aria-label="Checkout steps" className="mt-6 text-[0.6875rem] uppercase tracking-[0.16em] text-mute">
          <Link href="/cart" className="link-underline inline-block py-3">Bag</Link>
          <span className="mx-3 text-line">/</span>
          <span className="text-espresso" aria-current="step">Details & Payment</span>
          <span className="mx-3 text-line">/</span>
          <span>Confirmation</span>
        </nav>
      </div>

      {!hydrated ? (
        <div className="flex justify-center py-24 text-stone">
          <Spinner label="Loading checkout" />
        </div>
      ) : lines.length === 0 ? (
        <EmptyState
          icon={<ShoppingBag strokeWidth={1} className="size-6" />}
          title="Your bag is empty"
          text="Add a creation to your bag to begin checkout."
          actions={
            <Button href="/collections" variant="primary">
              Explore the Collections
            </Button>
          }
          className="py-24"
        />
      ) : (
        <div className="mt-12 grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="order-2 lg:order-1 lg:col-span-7">
            <CheckoutForm
              subtotal={subtotal}
              shipping={method}
              onShippingChange={setMethod}
              payment={payment}
              onPaymentChange={setPayment}
              onComplete={complete}
            />
          </div>
          <aside className="order-1 lg:order-2 lg:col-span-5">
            <div className="flex flex-col gap-6 lg:sticky lg:top-[140px]">
              <OrderSummary lines={lines} subtotal={subtotal} shipping={shipping} showLines title={`Your Order (${lines.length})`} />
              <div className="hidden border border-line p-6 lg:block">
                <TrustSection variant="compact" />
              </div>
            </div>
          </aside>
        </div>
      )}
    </Container>
  );
}

function OrderConfirmation({ confirmation }: { confirmation: Confirmation }) {
  const { reference, values, lines, subtotal, shipping, method, payment } = confirmation;
  const firstName = values.fullName.trim().split(" ")[0];

  return (
    <Container size="narrow" className="pb-24 pt-10 md:pb-32 md:pt-16">
      <div className="flex animate-fade-up flex-col items-center text-center">
        <Logo href={null} size="sm" className="text-gold-deep" />
        <span className="mt-10 flex size-16 items-center justify-center rounded-full border border-gold/60">
          <Check strokeWidth={1} className="size-6 text-gold-deep" />
        </span>
        <p className="eyebrow mt-8 text-gold-deep">Order Confirmed</p>
        <h1 className="mt-4 font-serif text-[2.5rem] font-light leading-[1.1] md:text-[3.5rem]">Thank you, {firstName}.</h1>
        <Divider variant="ornament" className="my-7" />
        <p className="max-w-[520px] text-[0.9375rem] leading-relaxed text-stone">
          Your order <strong className="font-medium text-espresso">{reference}</strong> has been received. A confirmation has
          been sent to {values.email}, and your client advisor will be in touch to arrange insured delivery.
        </p>
        <p className="mt-3 text-[0.75rem] text-mute">This is a demonstration — no payment was taken and nothing will be shipped.</p>
      </div>

      <div className="mt-14 grid gap-8 md:grid-cols-2">
        <OrderSummary lines={lines} subtotal={subtotal} shipping={shipping} showLines title="Order Details" />
        <div className="flex flex-col gap-8 border border-line p-6 md:p-8">
          <div>
            <h2 className="eyebrow text-espresso">Delivering To</h2>
            <address className="mt-4 text-[0.875rem] not-italic leading-relaxed text-stone">
              {values.fullName}
              <br />
              {values.address}
              {values.area && (
                <>
                  <br />
                  {values.area}
                </>
              )}
              <br />
              {values.city}, {values.state} {values.pin}
              <br />
              India · {values.phone}
            </address>
          </div>
          <div>
            <h2 className="eyebrow text-espresso">Delivery</h2>
            <p className="mt-3 text-[0.875rem] text-stone">{shippingMethods.find((m) => m.value === method)?.title}</p>
          </div>
          <div>
            <h2 className="eyebrow text-espresso">Payment</h2>
            <p className="mt-3 text-[0.875rem] text-stone">{paymentLabels[payment]} (simulated)</p>
          </div>
        </div>
      </div>

      <div className="mt-14 flex flex-col items-center justify-center gap-4 sm:flex-row">
        <Button href="/collections" variant="primary">
          Continue Shopping
        </Button>
        <Button href="/account" variant="outline">
          View Account
        </Button>
      </div>
    </Container>
  );
}
