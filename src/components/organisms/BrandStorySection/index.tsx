import { ArrowRight } from "lucide-react";
import { Button } from "@/components/atoms/Button";
import { ImageFrame } from "@/components/atoms/ImageFrame";
import { Reveal } from "@/components/atoms/Reveal";
import { Eyebrow, Heading, Text } from "@/components/atoms/Typography";
import type { NavLink, ProductImage } from "@/types";

export interface BrandStorySectionProps {
  eyebrow: string;
  title: string;
  text: string;
  image: ProductImage;
  detailImage?: ProductImage;
  cta: NavLink;
  stats?: { value: string; label: string }[];
}

/** Dark, cinematic storytelling block with a full-height image. */
export function BrandStorySection({ eyebrow, title, text, image, detailImage, cta, stats }: BrandStorySectionProps) {
  return (
    <section aria-labelledby="brand-story-title" className="bg-noir text-pearl">
      <div className="grid lg:min-h-[88vh] lg:grid-cols-2">
        <div className="relative min-h-[70vh] lg:min-h-0">
          <ImageFrame image={image} ratio="fill" sizes="(min-width: 1024px) 50vw, 100vw" className="bg-noir" position="50% 40%" />
          <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-noir/50 to-transparent lg:bg-gradient-to-l lg:from-noir/40" />
        </div>
        <div className="flex items-center px-5 py-20 sm:px-[8vw] lg:px-[6vw] lg:py-28 xl:px-[7vw]">
          <div className="max-w-[520px]">
            <Reveal>
              <Eyebrow tone="gold" className="text-gold">
                {eyebrow}
              </Eyebrow>
              <Heading id="brand-story-title" size="xl" className="mt-6 text-pearl">
                {title}
              </Heading>
              <Text size="lg" tone="light" className="mt-8 text-pearl/75">
                {text}
              </Text>
              <Button href={cta.href} variant="light" className="mt-10" icon={<ArrowRight strokeWidth={1.1} className="size-4" />}>
                {cta.label}
              </Button>
            </Reveal>
            {stats && (
              <Reveal delay={200}>
                <dl className="mt-16 grid grid-cols-3 gap-6 border-t border-pearl/15 pt-10">
                  {stats.map((s) => (
                    <div key={s.label}>
                      <dt className="sr-only">{s.label}</dt>
                      <dd>
                        <span className="block font-serif text-[2rem] font-light leading-none text-pearl md:text-[2.5rem]">{s.value}</span>
                        <span className="mt-3 block text-[0.6875rem] uppercase leading-snug tracking-[0.16em] text-pearl/55">{s.label}</span>
                      </dd>
                    </div>
                  ))}
                </dl>
              </Reveal>
            )}
            {detailImage && (
              <Reveal delay={300} className="mt-14 hidden w-full max-w-[280px] xl:block">
                <ImageFrame image={detailImage} ratio="3/2" sizes="280px" className="bg-noir" />
              </Reveal>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
