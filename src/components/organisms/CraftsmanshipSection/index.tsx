import { Button } from "@/components/atoms/Button";
import { ImageFrame } from "@/components/atoms/ImageFrame";
import { Reveal } from "@/components/atoms/Reveal";
import { SectionHeading } from "@/components/molecules/SectionHeading";
import type { NavLink, ProductImage } from "@/types";

export interface CraftsmanshipSectionProps {
  eyebrow?: string;
  title: string;
  pillars: { title: string; text: string; image: ProductImage }[];
  cta?: NavLink;
}

/** Three-column editorial section communicating the maison's savoir-faire. */
export function CraftsmanshipSection({ eyebrow, title, pillars, cta }: CraftsmanshipSectionProps) {
  return (
    <section aria-labelledby="craft-title" className="section-y bg-ivory">
      <div className="container-luxe">
        <Reveal>
          <SectionHeading id="craft-title" eyebrow={eyebrow} title={title} />
        </Reveal>
        <ol className="mt-14 grid gap-14 md:mt-20 md:grid-cols-3 md:gap-8 lg:gap-14">
          {pillars.map((pillar, i) => (
            <li key={pillar.title}>
              <Reveal delay={i * 140} className="flex flex-col items-center text-center">
                <ImageFrame image={pillar.image} ratio="4/5" sizes="(min-width: 768px) 30vw, 90vw" className="w-full" />
                <span className="mt-8 font-serif text-[0.9375rem] italic text-gold-deep">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-3 font-serif text-[1.625rem] font-light leading-tight">{pillar.title}</h3>
                <p className="mt-4 max-w-[320px] text-[0.9375rem] leading-[1.8] text-stone">{pillar.text}</p>
              </Reveal>
            </li>
          ))}
        </ol>
        {cta && (
          <div className="mt-14 flex justify-center md:mt-20">
            <Button href={cta.href} variant="link" className="text-espresso">
              {cta.label}
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
