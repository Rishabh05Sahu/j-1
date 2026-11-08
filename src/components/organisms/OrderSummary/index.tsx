"use client";

import type { ReactNode } from "react";
import { Price } from "@/components/atoms/Price";
import { CartItem } from "@/components/molecules/CartItem";
import { formatPrice } from "@/lib/currency";
import { cn } from "@/lib/utils";
import type { CartLineDetailed } from "@/types";

export interface OrderSummaryProps {
  lines: CartLineDetailed[];
  subtotal: number;
  shipping: number;
  showLines?: boolean;
  title?: string;
  children?: ReactNode;
  className?: string;
}

/** Totals panel shared by the bag and checkout pages. */
export function OrderSummary({ lines, subtotal, shipping, showLines, title = "Order Summary", children, className }: OrderSummaryProps) {
  const total = subtotal + shipping;
  // Prices are tax-inclusive; show the GST component for transparency (3% on jewelry).
  const gst = Math.round(total - total / 1.03);

  return (
    <section aria-labelledby="summary-title" className={cn("bg-white/70 p-6 md:p-8", className)}>
      <h2 id="summary-title" className="eyebrow text-espresso">
        {title}
      </h2>

      {showLines && (
        <ul className="mt-6 flex flex-col gap-5 border-b border-line pb-6">
          {lines.map((line) => (
            <li key={line.key}>
              <CartItem line={line} variant="summary" />
            </li>
          ))}
        </ul>
      )}

      <dl className="mt-6 flex flex-col gap-3 text-[0.875rem]">
        <div className="flex justify-between">
          <dt className="text-stone">Subtotal</dt>
          <dd>
            <Price amount={subtotal} size="sm" />
          </dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-stone">Insured Delivery</dt>
          <dd className="text-[0.8125rem]">{shipping === 0 ? "Complimentary" : formatPrice(shipping)}</dd>
        </div>
        <div className="flex justify-between text-[0.75rem] text-mute">
          <dt>Includes GST (3%)</dt>
          <dd className="tabular-nums">{formatPrice(gst)}</dd>
        </div>
        <div className="mt-3 flex items-baseline justify-between border-t border-line pt-5">
          <dt className="eyebrow text-espresso">Total</dt>
          <dd>
            <Price amount={total} size="lg" />
          </dd>
        </div>
      </dl>
      {children && <div className="mt-8">{children}</div>}
    </section>
  );
}
