"use client";

import Link from "next/link";
import { ImageFrame } from "@/components/atoms/ImageFrame";
import { Price } from "@/components/atoms/Price";
import { QuantitySelector } from "@/components/molecules/QuantitySelector";
import { useCart } from "@/hooks/useCart";
import { cn } from "@/lib/utils";
import type { CartLineDetailed } from "@/types";

export function CartItem({
  line,
  variant = "drawer",
  onNavigate,
}: {
  line: CartLineDetailed;
  variant?: "drawer" | "page" | "summary";
  onNavigate?: () => void;
}) {
  const { updateQuantity, removeFromCart } = useCart();
  const { product } = line;
  const href = `/products/${product.slug}`;
  const variantText = [line.metal, line.size && `Size ${line.size}`].filter(Boolean).join(" · ");

  if (variant === "summary") {
    return (
      <div className="flex gap-4">
        <div className="relative w-16 shrink-0">
          <ImageFrame image={product.images[0]} ratio="4/5" sizes="64px" />
          <span className="absolute -right-2 -top-2 flex size-5 items-center justify-center rounded-full bg-espresso text-[0.625rem] text-pearl">
            {line.quantity}
          </span>
        </div>
        <div className="flex min-w-0 flex-1 justify-between gap-3">
          <div className="min-w-0">
            <p className="font-serif text-[1rem] leading-snug">{product.name}</p>
            {variantText && <p className="mt-1 text-[0.75rem] text-stone">{variantText}</p>}
          </div>
          <Price amount={line.lineTotal} size="sm" className="shrink-0" />
        </div>
      </div>
    );
  }

  const isPage = variant === "page";

  return (
    <div className={cn("flex gap-4 sm:gap-6", isPage && "md:gap-8")}>
      <Link href={href} onClick={onNavigate} className={cn("block shrink-0", isPage ? "w-24 sm:w-32 md:w-40" : "w-24")} tabIndex={-1} aria-hidden="true">
        <ImageFrame image={product.images[0]} ratio="4/5" sizes={isPage ? "160px" : "96px"} />
      </Link>
      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex justify-between gap-4">
          <div className="min-w-0">
            <Link href={href} onClick={onNavigate} className={cn("link-underline font-serif leading-snug", isPage ? "text-[1.25rem] md:text-[1.375rem]" : "text-[1.0625rem]")}>
              {product.name}
            </Link>
            {variantText && <p className="mt-1.5 text-[0.75rem] tracking-[0.02em] text-stone">{variantText}</p>}
            {product.availability === "made-to-order" && (
              <p className="mt-1 text-[0.75rem] text-gold-deep">Made to order · dispatches in 3–4 weeks</p>
            )}
          </div>
          <Price amount={line.lineTotal} size="sm" className="shrink-0 pt-0.5" />
        </div>
        <div className="mt-auto flex items-center justify-between gap-4 pt-4">
          <QuantitySelector
            value={line.quantity}
            onChange={(q) => updateQuantity(line.key, q)}
            size="sm"
            label={`Quantity for ${product.name}`}
          />
          <button
            type="button"
            onClick={() => removeFromCart(line.key)}
            className="link-underline-static text-[0.6875rem] uppercase tracking-[0.16em] text-stone transition-colors hover:text-espresso"
          >
            Remove<span className="sr-only"> {product.name}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
