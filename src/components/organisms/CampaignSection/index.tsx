import { Button } from "@/components/atoms/Button";
import { ImageFrame } from "@/components/atoms/ImageFrame";
import { Reveal } from "@/components/atoms/Reveal";
import { Eyebrow, Heading, Text } from "@/components/atoms/Typography";
import type { NavLink, ProductImage } from "@/types";

export interface CampaignSectionProps {
  eyebrow: string;
  title: string;
  text: string;
  image: ProductImage;
  cta: NavLink;
  imagePosition?: string;
  id?: string;
}

/** Full-bleed campaign photography with centred copy (e.g. the bridal campaign). */
export function CampaignSection({ eyebrow, title, text, image, cta, imagePosition = "50% 50%", id = "campaign" }: CampaignSectionProps) {
  return (
    <section aria-labelledby={`${id}-title`} className="relative isolate flex min-h-[78svh] items-end overflow-hidden bg-noir text-pearl md:min-h-[88vh] md:items-center">
      <ImageFrame image={image} ratio="fill" sizes="100vw" position={imagePosition} className="-z-10 bg-noir" />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-t from-noir/80 via-noir/35 to-noir/20" />
      <div className="container-luxe py-20 md:py-28">
        <Reveal className="mx-auto flex max-w-[760px] flex-col items-center text-center">
          <Eyebrow className="text-gold">{eyebrow}</Eyebrow>
          <Heading id={`${id}-title`} size="xl" caps className="mt-6 text-pearl">
            {title}
          </Heading>
          <Text size="lg" tone="light" className="mt-6 max-w-[520px]">
            {text}
          </Text>
          <Button href={cta.href} variant="solid-light" size="lg" className="mt-10">
            {cta.label}
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
