import { ArrowRight } from "lucide-react";
import { Button } from "@/components/atoms/Button";
import { Divider } from "@/components/atoms/Divider";
import { ImageFrame } from "@/components/atoms/ImageFrame";
import { Reveal } from "@/components/atoms/Reveal";
import { Eyebrow, Heading, Text } from "@/components/atoms/Typography";
import { cn } from "@/lib/utils";
import type { NavLink, ProductImage } from "@/types";

export interface CollectionShowcaseProps {
  eyebrow: string;
  title: string;
  text: string;
  detail?: string;
  image: ProductImage;
  secondaryImage?: ProductImage;
  cta: NavLink;
  reverse?: boolean;
  className?: string;
}

/** Editorial split layout introducing a featured collection. */
export function CollectionShowcase({ eyebrow, title, text, detail, image, secondaryImage, cta, reverse, className }: CollectionShowcaseProps) {
  return (
    <section aria-labelledby="featured-collection-title" className={cn("section-y bg-champagne/60", className)}>
      <div className="container-luxe grid items-center gap-12 lg:grid-cols-12 lg:gap-8">
        <Reveal className={cn("lg:col-span-7", reverse && "lg:order-2 lg:col-start-6")}>
          <ImageFrame image={image} ratio="4/5" sizes="(min-width: 1024px) 55vw, 100vw" className="lg:aspect-[6/7]" />
        </Reveal>
        <div className={cn("lg:col-span-4", reverse ? "lg:order-1 lg:col-start-1" : "lg:col-start-9")}>
          <Reveal delay={150}>
            <Eyebrow tone="gold">{eyebrow}</Eyebrow>
            <Heading id="featured-collection-title" size="lg" caps className="mt-5 text-espresso">
              {title}
            </Heading>
            <Divider variant="ornament" className="my-8 justify-start [&>span:first-child]:hidden" />
            <Text size="lg" tone="default" className="font-serif text-[1.25rem] italic leading-[1.6] md:text-[1.375rem]">
              {text}
            </Text>
            {detail && <Text className="mt-5">{detail}</Text>}
            <Button href={cta.href} variant="outline" className="mt-10" icon={<ArrowRight strokeWidth={1.1} className="size-4" />}>
              {cta.label}
            </Button>
          </Reveal>
          {secondaryImage && (
            <Reveal delay={300} className="mt-14 hidden w-44 lg:block">
              <ImageFrame image={secondaryImage} ratio="4/5" sizes="180px" />
            </Reveal>
          )}
        </div>
      </div>
    </section>
  );
}
