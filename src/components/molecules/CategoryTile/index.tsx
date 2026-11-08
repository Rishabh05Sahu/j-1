import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { ImageFrame, type AspectRatio } from "@/components/atoms/ImageFrame";
import { cn } from "@/lib/utils";
import type { ProductImage } from "@/types";

export function CategoryTile({
  label,
  href,
  image,
  eyebrow,
  ratio = "3/4",
  sizes = "(min-width: 1024px) 20vw, (min-width: 640px) 33vw, 70vw",
  className,
}: {
  label: string;
  href: string;
  image: ProductImage;
  eyebrow?: string;
  ratio?: AspectRatio;
  sizes?: string;
  className?: string;
}) {
  return (
    <Link href={href} className={cn("group/tile block", className)}>
      <ImageFrame
        image={image}
        ratio={ratio}
        sizes={sizes}
        imgClassName="duration-[1600ms] group-hover/tile:scale-[1.05]"
      />
      <div className="flex items-center justify-between gap-3 pt-4 md:pt-5">
        <div className="transition-transform duration-700 ease-luxe group-hover/tile:translate-x-1">
          {eyebrow && <p className="eyebrow mb-1.5 text-[0.625rem] text-mute">{eyebrow}</p>}
          <span className="link-underline font-serif text-[1.375rem] leading-none group-hover/tile:[background-position:0%_100%] group-hover/tile:[background-size:100%_1px] md:text-[1.5rem]">
            {label}
          </span>
        </div>
        <ArrowRight
          aria-hidden="true"
          strokeWidth={1}
          className="size-4 -translate-x-2 text-stone opacity-0 transition-all duration-700 ease-luxe group-hover/tile:translate-x-0 group-hover/tile:opacity-100"
        />
      </div>
    </Link>
  );
}
