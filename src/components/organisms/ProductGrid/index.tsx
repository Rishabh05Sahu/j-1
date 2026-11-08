import { ProductCard } from "@/components/molecules/ProductCard";
import { cn } from "@/lib/utils";
import type { Product } from "@/types";

export interface ProductGridProps {
  products: Product[];
  columns?: 3 | 4;
  /** Number of leading cards whose images load eagerly (above the fold). */
  priorityCount?: number;
  className?: string;
}

/** Responsive product grid: 2 columns on mobile, 3 on tablet, up to 4 on desktop. */
export function ProductGrid({ products, columns = 4, priorityCount = 0, className }: ProductGridProps) {
  return (
    <ul
      className={cn(
        "grid grid-cols-2 gap-x-3 gap-y-12 sm:gap-x-5 md:grid-cols-3 md:gap-y-16 lg:gap-x-7",
        columns === 4 && "xl:grid-cols-4",
        className,
      )}
    >
      {products.map((product, i) => (
        <li key={product.id} className="animate-fade-up" style={{ animationDelay: `${Math.min(i, 8) * 60}ms` }}>
          <ProductCard product={product} priority={i < priorityCount} />
        </li>
      ))}
    </ul>
  );
}
