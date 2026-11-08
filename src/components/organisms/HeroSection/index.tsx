import { ArrowRight } from "lucide-react";
import { Button } from "@/components/atoms/Button";
import { ImageFrame } from "@/components/atoms/ImageFrame";
import type { NavLink, ProductImage } from "@/types";

export interface HeroSectionProps {
  eyebrow: string;
  title: string;
  text: string;
  image: ProductImage;
  primaryCta: NavLink;
  secondaryCta?: NavLink;
  /** CSS object-position used to art-direct the crop. */
  imagePosition?: string;
}

/** Near-full-screen cinematic hero. The header floats above it. */
export function HeroSection({ eyebrow, title, text, image, primaryCta, secondaryCta, imagePosition = "50% 30%" }: HeroSectionProps) {
  return (
    <section aria-labelledby="hero-title" className="relative isolate h-[92svh] min-h-[640px] max-h-[1080px] lg:min-h-[780px] overflow-hidden bg-noir text-pearl">
      <div className="absolute inset-0 -z-10 animate-hero-zoom">
        <ImageFrame image={image} ratio="fill" priority sizes="100vw" position={imagePosition} className="bg-noir" />
      </div>
      {/* Legibility gradients */}
      <div aria-hidden="true" className="absolute inset-x-0 top-0 -z-10 h-56 bg-gradient-to-b from-noir/60 to-transparent" />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-t from-noir/80 via-noir/25 to-transparent md:bg-gradient-to-r md:from-noir/75 md:via-noir/30 md:to-transparent" />

      <div className="container-luxe flex h-full items-end pb-16 pt-40 md:pb-[9vh] lg:pt-48">
        <div className="max-w-[640px]">
          <p className="eyebrow animate-fade-up text-gold [animation-delay:300ms]">{eyebrow}</p>
          <h1 id="hero-title" className="mt-5 animate-fade-up font-serif text-display font-light [animation-delay:450ms] md:mt-7">
            {title}
          </h1>
          <p className="mt-5 max-w-[460px] animate-fade-up text-[0.9375rem] leading-[1.8] text-pearl/80 [animation-delay:650ms] md:mt-7 md:text-[1.0625rem]">
            {text}
          </p>
          <div className="mt-8 flex animate-fade-up flex-col gap-3 [animation-delay:850ms] sm:flex-row sm:gap-4 md:mt-10">
            <Button href={primaryCta.href} variant="solid-light" size="lg" icon={<ArrowRight strokeWidth={1.1} className="size-4" />}>
              {primaryCta.label}
            </Button>
            {secondaryCta && (
              <Button href={secondaryCta.href} variant="light" size="lg">
                {secondaryCta.label}
              </Button>
            )}
          </div>
        </div>
      </div>

      <div aria-hidden="true" className="absolute bottom-8 right-[5vw] hidden animate-fade-in items-center gap-4 [animation-delay:1400ms] md:flex">
        <span className="eyebrow text-[0.5625rem] text-pearl/60">Scroll</span>
        <span className="h-px w-16 bg-pearl/40" />
      </div>
    </section>
  );
}
