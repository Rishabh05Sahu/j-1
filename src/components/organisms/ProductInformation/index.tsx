"use client";

import { ArrowRight, Gift, Hammer, Heart, ShieldCheck, Truck } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/atoms/Button";
import { Price } from "@/components/atoms/Price";
import { Eyebrow, Heading } from "@/components/atoms/Typography";
import { ProductSwatches } from "@/components/molecules/ProductSwatches";
import { QuantitySelector } from "@/components/molecules/QuantitySelector";
import { SizeSelector } from "@/components/molecules/SizeSelector";
import { collectionName } from "@/data/collections";
import { useCart } from "@/hooks/useCart";
import { useWishlist } from "@/hooks/useWishlist";
import { availabilityLabel } from "@/lib/product-utils";
import { cn } from "@/lib/utils";
import type { Metal, Product } from "@/types";

export interface ProductInformationProps {
  product: Product;
  variant?: "full" | "compact";
  /** Called after a successful add to bag (e.g. to close the quick view). */
  onAdded?: () => void;
}

/** The purchase panel: variant selection, quantity, add to bag and wishlist. */
export function ProductInformation({ product, variant = "full", onAdded }: ProductInformationProps) {
  const full = variant === "full";
  const { addToCart } = useCart();
  const { isWishlisted, toggleWishlist } = useWishlist();
  const [metal, setMetal] = useState<Metal>(product.metal);
  const [size, setSize] = useState<string>();
  const [quantity, setQuantity] = useState(1);
  const [sizeError, setSizeError] = useState(false);
  const [justAdded, setJustAdded] = useState(false);
  const sizeRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const [showSticky, setShowSticky] = useState(false);

  const saved = isWishlisted(product.id);
  const soldOut = product.availability === "sold-out";
  const isBangle = product.sizes?.some((s) => s.includes("."));
  const sizeLabel = product.category === "bracelets" ? (isBangle ? "Bangle Size" : "Length") : "Ring Size (Indian)";
  const subtitle = product.subtitle.replace(product.metal, metal);

  // Mobile sticky purchase bar appears once the main CTA scrolls out of view above.
  useEffect(() => {
    if (!full) return;
    const node = ctaRef.current;
    if (!node || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(([entry]) =>
      setShowSticky(!entry.isIntersecting && entry.boundingClientRect.top < 0),
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [full]);

  const handleAdd = () => {
    if (product.sizes && !size) {
      setSizeError(true);
      sizeRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    addToCart(product.id, { metal, size, quantity, reveal: full ? "drawer" : "toast" });
    setJustAdded(true);
    window.setTimeout(() => setJustAdded(false), 2200);
    onAdded?.();
  };

  const services = [
    { icon: Truck, text: "Complimentary insured delivery in 3–5 business days" },
    { icon: Gift, text: "Presented in the signature AURELLE keepsake box" },
    { icon: ShieldCheck, text: "Certificate of authenticity & lifetime care" },
  ];

  return (
    <div className={cn("flex flex-col", full ? "gap-8" : "gap-6")}>
      <div>
        <Eyebrow tone="gold" className="mb-3">
          <Link href={`/collections/${product.collection}`} className="link-underline">
            {collectionName(product.collection)} Collection
          </Link>
        </Eyebrow>
        <Heading as={full ? "h1" : "h2"} size={full ? "lg" : "md"} className="text-espresso">
          {product.name}
        </Heading>
        <p className="mt-3 text-[0.8125rem] tracking-[0.04em] text-stone">{subtitle}</p>
        <Price amount={product.price} compareAt={product.compareAtPrice} size="lg" className="mt-5 text-espresso" />
        <p className="mt-1 text-[0.6875rem] tracking-[0.04em] text-mute">Inclusive of all taxes</p>
      </div>

      <p className={cn("leading-[1.8] text-stone", full ? "text-[0.9375rem]" : "text-[0.875rem]")}>{product.description}</p>

      {product.availableMetals && product.availableMetals.length > 1 && (
        <div>
          <p className="eyebrow mb-4 text-[0.625rem] text-stone">
            Metal <span className="ml-2 normal-case tracking-[0.02em] text-espresso">{metal}</span>
          </p>
          <ProductSwatches metals={product.availableMetals} value={metal} onChange={setMetal} size="md" />
        </div>
      )}

      {product.sizes && (
        <div ref={sizeRef}>
          <div className="mb-4 flex items-center justify-between">
            <p className="eyebrow text-[0.625rem] text-stone">
              {sizeLabel} {size && <span className="ml-2 normal-case tracking-[0.02em] text-espresso">{size}</span>}
            </p>
            <Link href="/book-appointment" className="link-underline-static text-[0.6875rem] tracking-[0.04em] text-stone">
              Need help with sizing?
            </Link>
          </div>
          <SizeSelector
            sizes={product.sizes}
            value={size}
            label={sizeLabel}
            invalid={sizeError}
            onChange={(s) => {
              setSize(s);
              setSizeError(false);
            }}
          />
          {sizeError && (
            <p role="alert" className="mt-3 animate-fade-in text-[0.75rem] text-error">
              Please select a size to continue.
            </p>
          )}
        </div>
      )}

      <div ref={ctaRef} className="flex flex-col gap-3">
        {!soldOut && (
          <div className="flex items-center gap-3">
            <QuantitySelector value={quantity} onChange={setQuantity} />
            <p className="text-[0.75rem] text-stone">{availabilityLabel(product.availability)}</p>
          </div>
        )}
        <div className="flex gap-3">
          {soldOut ? (
            <Button href="/book-appointment" variant="primary" size="lg" fullWidth className="flex-1">
              Enquire with a Specialist
            </Button>
          ) : (
            <Button variant="primary" size="lg" className="flex-1" onClick={handleAdd}>
              {justAdded ? "Added to Bag" : "Add to Bag"}
            </Button>
          )}
          <button
            type="button"
            onClick={() => toggleWishlist(product.id)}
            aria-pressed={saved}
            aria-label={saved ? "Remove from wishlist" : "Save to wishlist"}
            className="flex size-14 shrink-0 items-center justify-center border border-line transition-colors duration-300 hover:border-espresso"
          >
            <Heart key={String(saved)} strokeWidth={1.1} className={cn("size-5", saved && "animate-heart-pop fill-espresso")} />
          </button>
        </div>
        {soldOut && <p className="text-[0.75rem] text-stone">This creation is currently unavailable. A specialist can source or commission it for you.</p>}
      </div>

      {full ? (
        <>
          <ul className="flex flex-col gap-3.5 border-y border-line py-6">
            {services.map(({ icon: Icon, text }) => (
              <li key={text} className="flex items-center gap-4 text-[0.8125rem] text-stone">
                <Icon aria-hidden="true" strokeWidth={1.1} className="size-[18px] shrink-0 text-gold-deep" />
                {text}
              </li>
            ))}
          </ul>

          <div>
            <h2 className="eyebrow mb-5 text-espresso">Specifications</h2>
            <dl className="grid grid-cols-[auto_1fr] gap-x-8 gap-y-3 text-[0.8125rem]">
              {product.details.map((d) => (
                <div key={d.label} className="contents">
                  <dt className="text-mute">{d.label}</dt>
                  <dd className="text-espresso">{d.value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="flex gap-4 bg-champagne/60 p-5">
            <Hammer aria-hidden="true" strokeWidth={1.1} className="mt-0.5 size-5 shrink-0 text-gold-deep" />
            <p className="text-[0.8125rem] leading-relaxed text-stone">
              Handcrafted in our Mumbai atelier. Every stone is set under magnification and every surface finished by a master
              polisher. <Link href="/craftsmanship" className="link-underline-static text-espresso">Discover our craft</Link>
            </p>
          </div>
        </>
      ) : (
        <Link href={`/products/${product.slug}`} className="eyebrow group inline-flex items-center gap-2 text-espresso">
          <span className="link-underline-static">View Full Details</span>
          <ArrowRight aria-hidden="true" strokeWidth={1.1} className="size-4 transition-transform duration-500 group-hover:translate-x-1" />
        </Link>
      )}

      {/* Sticky mobile purchase bar */}
      {full && !soldOut && (
        <div
          className={cn(
            "fixed inset-x-0 bottom-0 z-40 flex items-center gap-4 border-t border-line bg-ivory/95 px-5 py-3 backdrop-blur-md transition-transform duration-500 ease-luxe lg:hidden",
            showSticky ? "translate-y-0" : "translate-y-full",
          )}
          inert={!showSticky}
          aria-hidden={!showSticky}
        >
          <div className="min-w-0 flex-1">
            <p className="truncate font-serif text-[1rem] leading-tight">{product.name}</p>
            <Price amount={product.price} size="sm" className="text-stone" />
          </div>
          <Button variant="primary" size="md" onClick={handleAdd} className="shrink-0 px-6">
            Add to Bag
          </Button>
        </div>
      )}
    </div>
  );
}
