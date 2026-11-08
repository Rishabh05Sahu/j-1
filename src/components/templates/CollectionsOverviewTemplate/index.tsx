import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { ImageFrame } from "@/components/atoms/ImageFrame";
import { Reveal } from "@/components/atoms/Reveal";
import { CategoryTile } from "@/components/molecules/CategoryTile";
import { SectionHeading } from "@/components/molecules/SectionHeading";
import { CollectionShowcase } from "@/components/organisms/CollectionShowcase";
import { PageHeader } from "@/components/organisms/PageHeader";
import { cn } from "@/lib/utils";
import type { Collection } from "@/types";

export interface CollectionsOverviewTemplateProps {
  categories: Collection[];
  collections: Collection[];
  curations: Collection[];
  featured: Collection;
  counts: Record<string, number>;
}

export function CollectionsOverviewTemplate({ categories, collections, curations, featured, counts }: CollectionsOverviewTemplateProps) {
  return (
    <>
      <PageHeader
        eyebrow="The Maison"
        title="The Collections"
        intro="Each AURELLE collection begins with an idea — a shape, a stone, a feeling — and becomes a family of pieces designed to be worn together for a lifetime."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Collections" }]}
      />

      <section aria-labelledby="by-category" className="container-luxe pb-20 md:pb-28">
        <h2 id="by-category" className="eyebrow mb-8 text-center text-stone">
          Shop by Category
        </h2>
        <ul className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-5 md:gap-6">
          {categories.map((c, i) => (
            <li
              key={c.slug}
              className={cn(i === 4 && "col-span-2 mx-auto w-[calc(50%-0.5rem)] md:col-span-1 md:mx-0 md:w-auto")}
            >
              <Reveal delay={i * 80}>
                <CategoryTile
                  label={c.title}
                  href={`/collections/${c.slug}`}
                  image={c.image}
                  eyebrow={`${counts[c.slug] ?? 0} pieces`}
                  ratio="3/4"
                />
              </Reveal>
            </li>
          ))}
        </ul>
      </section>

      <CollectionShowcase
        eyebrow="The Signature"
        title={featured.title}
        text={featured.description}
        detail={featured.story}
        image={featured.image}
        cta={{ label: "Discover the Collection", href: `/collections/${featured.slug}` }}
      />

      <section aria-labelledby="signature-collections" className="section-y">
        <div className="container-luxe">
          <SectionHeading id="signature-collections" eyebrow="Signature Collections" title="Families of Enduring Design" />
          <ul className="mt-14 grid gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3 md:mt-20">
            {collections
              .filter((c) => c.slug !== featured.slug)
              .map((c, i) => (
                <li key={c.slug}>
                  <Reveal delay={(i % 3) * 100}>
                    <Link href={`/collections/${c.slug}`} className="group/col block">
                      <ImageFrame
                        image={c.image}
                        ratio="4/5"
                        sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 90vw"
                        imgClassName="duration-[1600ms] group-hover/col:scale-[1.04]"
                      />
                      <div className="mt-6 flex items-start justify-between gap-4">
                        <div>
                          <p className="eyebrow text-[0.625rem] text-mute">{counts[c.slug] ?? 0} pieces</p>
                          <h3 className="mt-2 font-serif text-[1.75rem] font-light leading-tight">{c.title}</h3>
                          <p className="mt-2 max-w-[340px] text-[0.875rem] leading-relaxed text-stone">{c.description}</p>
                        </div>
                        <ArrowRight
                          aria-hidden="true"
                          strokeWidth={1}
                          className="mt-8 size-5 shrink-0 text-stone transition-transform duration-500 group-hover/col:translate-x-1"
                        />
                      </div>
                    </Link>
                  </Reveal>
                </li>
              ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="curations" className="section-y bg-champagne/60">
        <div className="container-luxe">
          <SectionHeading id="curations" eyebrow="Curated" title="Ways to Discover" />
          <ul className="mt-12 grid grid-cols-2 gap-x-4 gap-y-10 md:mt-16 md:grid-cols-5 md:gap-6">
            {curations.map((c, i) => (
              <li key={c.slug}>
                <Reveal delay={i * 80}>
                  <CategoryTile label={c.title} href={`/collections/${c.slug}`} image={c.image} eyebrow={c.eyebrow} ratio="1/1" />
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
