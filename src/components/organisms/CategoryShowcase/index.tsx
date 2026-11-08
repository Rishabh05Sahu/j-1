import { Reveal } from "@/components/atoms/Reveal";
import { CategoryTile } from "@/components/molecules/CategoryTile";
import { SectionHeading } from "@/components/molecules/SectionHeading";
import type { ProductImage } from "@/types";

export interface CategoryShowcaseProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  items: { label: string; href: string; image: ProductImage }[];
}

/** Category discovery: a horizontal swipe rail on mobile, a five-up grid on desktop. */
export function CategoryShowcase({ eyebrow, title, subtitle, items }: CategoryShowcaseProps) {
  return (
    <section aria-labelledby="categories-title" className="section-y bg-ivory">
      <div className="container-luxe">
        <Reveal>
          <SectionHeading id="categories-title" eyebrow={eyebrow} title={title} subtitle={subtitle} />
        </Reveal>
      </div>
      <div className="container-luxe mt-12 md:mt-16">
        <ul className="no-scrollbar -mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 md:mx-0 md:grid md:grid-cols-5 md:gap-5 md:overflow-visible md:px-0 xl:gap-7">
          {items.map((item, i) => (
            <li key={item.href} className="w-[68vw] shrink-0 snap-start sm:w-[42vw] md:w-auto">
              <Reveal delay={i * 90}>
                <CategoryTile label={item.label} href={item.href} image={item.image} ratio="3/4" />
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
