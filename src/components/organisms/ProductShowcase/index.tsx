import { Button } from "@/components/atoms/Button";
import { Reveal } from "@/components/atoms/Reveal";
import { ProductCard } from "@/components/molecules/ProductCard";
import { SectionHeading } from "@/components/molecules/SectionHeading";
import { cn } from "@/lib/utils";
import type { NavLink, Product } from "@/types";

export interface ProductShowcaseProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  products: Product[];
  cta?: NavLink;
  align?: "center" | "left";
  className?: string;
  id?: string;
}

/** A titled row of product cards (bestsellers, related products…). */
export function ProductShowcase({ eyebrow, title, subtitle, products, cta, align = "center", className, id = "showcase" }: ProductShowcaseProps) {
  if (products.length === 0) return null;
  return (
    <section aria-labelledby={`${id}-title`} className={cn("section-y", className)}>
      <div className="container-luxe">
        <Reveal>
          <SectionHeading
            id={`${id}-title`}
            eyebrow={eyebrow}
            title={title}
            subtitle={subtitle}
            align={align}
            action={align === "left" ? cta : undefined}
          />
        </Reveal>
        <ul className="mt-12 grid grid-cols-2 gap-x-3 gap-y-12 sm:gap-x-5 md:mt-16 lg:grid-cols-4 lg:gap-x-7">
          {products.map((product, i) => (
            <li key={product.id}>
              <Reveal delay={i * 100}>
                <ProductCard product={product} sizes="(min-width: 1024px) 23vw, 48vw" />
              </Reveal>
            </li>
          ))}
        </ul>
        {cta && align === "center" && (
          <div className="mt-14 flex justify-center md:mt-20">
            <Button href={cta.href} variant="outline">
              {cta.label}
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
