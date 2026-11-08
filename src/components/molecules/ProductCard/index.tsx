"use client";

import { Heart } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/atoms/Badge";
import { ImageFrame } from "@/components/atoms/ImageFrame";
import { Price } from "@/components/atoms/Price";
import { ProductSwatches } from "@/components/molecules/ProductSwatches";
import { useUI } from "@/hooks/useUI";
import { useWishlist } from "@/hooks/useWishlist";
import { categoryLabel, getProductBadge } from "@/lib/product-utils";
import { cn } from "@/lib/utils";
import type { Product } from "@/types";

export interface ProductCardProps {
  product: Product;
  priority?: boolean;
  sizes?: string;
  showDescription?: boolean;
  className?: string;
}

/**
 * Editorial product card: secondary image on hover, wishlist toggle,
 * quick view, a single relevant badge and metal swatches.
 */
export function ProductCard({
  product,
  priority,
  sizes = "(min-width: 1280px) 22vw, (min-width: 768px) 30vw, 48vw",
  showDescription = true,
  className,
}: ProductCardProps) {
  const { isWishlisted, toggleWishlist } = useWishlist();
  const { openQuickView } = useUI();
  const saved = isWishlisted(product.id);
  const badge = getProductBadge(product);
  const href = `/products/${product.slug}`;
  const [primary, secondary] = product.images;

  return (
    <article className={cn("group/card relative flex flex-col", className)}>
      <div className="relative overflow-hidden bg-champagne">
        <Link href={href} tabIndex={-1} aria-hidden="true" className="block">
          <ImageFrame
            image={primary}
            ratio="4/5"
            sizes={sizes}
            priority={priority}
            imgClassName="group-hover/card:scale-[1.035] duration-[1400ms]"
          />
          {secondary && (
            <ImageFrame
              image={secondary}
              ratio="fill"
              sizes={sizes}
              decorative
              className="opacity-0 transition-opacity duration-700 ease-luxe group-hover/card:opacity-100 [@media(hover:none)]:hidden"
              imgClassName="scale-[1.03] group-hover/card:scale-100 duration-[1400ms]"
            />
          )}
        </Link>

        {badge && (
          <Badge tone={badge === "New" ? "gold" : "default"} className="pointer-events-none absolute left-3 top-3 md:left-4 md:top-4">
            {badge}
          </Badge>
        )}

        <button
          type="button"
          onClick={() => toggleWishlist(product.id)}
          aria-pressed={saved}
          aria-label={saved ? `Remove ${product.name} from wishlist` : `Save ${product.name} to wishlist`}
          className="absolute right-2 top-2 flex size-9 items-center justify-center rounded-full bg-ivory/85 text-espresso backdrop-blur-sm transition-colors duration-300 hover:bg-white md:right-3 md:top-3"
        >
          <Heart
            key={String(saved)}
            strokeWidth={1.1}
            className={cn("size-[17px]", saved && "animate-heart-pop fill-espresso")}
          />
        </button>

        <button
          type="button"
          onClick={() => openQuickView(product.id)}
          className={cn(
            "eyebrow absolute inset-x-3 bottom-3 hidden h-11 items-center justify-center bg-ivory/95 text-espresso backdrop-blur-sm md:flex",
            "translate-y-3 opacity-0 transition-[opacity,transform,background-color] duration-500 ease-luxe hover:bg-white",
            "group-hover/card:translate-y-0 group-hover/card:opacity-100 focus-visible:translate-y-0 focus-visible:opacity-100",
          )}
        >
          Quick View<span className="sr-only">: {product.name}</span>
        </button>
      </div>

      <div className="flex flex-1 flex-col items-center px-1 pt-5 text-center md:pt-6">
        <p className="eyebrow text-[0.625rem] text-mute">{categoryLabel(product.category)}</p>
        <h3 className="mt-2 font-serif text-[1.0625rem] leading-snug md:text-[1.1875rem]">
          <Link href={href} className="link-underline">
            {product.name}
          </Link>
        </h3>
        {showDescription && (
          <p className="mt-1.5 line-clamp-1 hidden text-[0.8125rem] text-stone sm:block">{product.shortDescription}</p>
        )}
        <Price amount={product.price} compareAt={product.compareAtPrice} size="sm" className="mt-2.5 text-espresso" />
        {product.availableMetals && product.availableMetals.length > 1 && (
          <ProductSwatches metals={product.availableMetals} className="mt-3" />
        )}
      </div>
    </article>
  );
}
