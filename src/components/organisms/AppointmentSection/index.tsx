import { Calendar, MapPin, Video } from "lucide-react";
import { Button } from "@/components/atoms/Button";
import { ImageFrame } from "@/components/atoms/ImageFrame";
import { Reveal } from "@/components/atoms/Reveal";
import { Eyebrow, Heading, Text } from "@/components/atoms/Typography";
import type { NavLink, ProductImage } from "@/types";

export interface AppointmentSectionProps {
  eyebrow: string;
  title: string;
  text: string;
  image: ProductImage;
  cta: NavLink;
  secondaryCta?: NavLink;
}

const formats = [
  { icon: MapPin, label: "In Boutique" },
  { icon: Video, label: "Virtual" },
  { icon: Calendar, label: "At Your Convenience" },
];

export function AppointmentSection({ eyebrow, title, text, image, cta, secondaryCta }: AppointmentSectionProps) {
  return (
    <section aria-labelledby="appointment-title" className="bg-champagne">
      <div className="container-luxe grid items-center gap-12 py-16 md:py-24 lg:grid-cols-2 lg:gap-20 lg:py-0">
        <Reveal className="order-2 lg:order-1 lg:py-28">
          <Eyebrow tone="gold">{eyebrow}</Eyebrow>
          <Heading id="appointment-title" size="lg" caps className="mt-5 text-espresso">
            {title}
          </Heading>
          <Text size="lg" className="mt-6 max-w-[480px]">
            {text}
          </Text>
          <ul className="mt-10 flex flex-wrap gap-x-8 gap-y-4">
            {formats.map(({ icon: Icon, label }) => (
              <li key={label} className="flex items-center gap-3 text-[0.75rem] uppercase tracking-[0.16em] text-stone">
                <Icon aria-hidden="true" strokeWidth={1.1} className="size-4 text-gold-deep" />
                {label}
              </li>
            ))}
          </ul>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-8">
            <Button href={cta.href} variant="primary" size="lg">
              {cta.label}
            </Button>
            {secondaryCta && (
              <Button href={secondaryCta.href} variant="link" className="self-start text-espresso sm:self-auto">
                {secondaryCta.label}
              </Button>
            )}
          </div>
        </Reveal>
        <Reveal delay={150} className="order-1 lg:order-2">
          <ImageFrame image={image} ratio="4/5" sizes="(min-width: 1024px) 45vw, 100vw" className="lg:my-0 lg:aspect-[5/6]" />
        </Reveal>
      </div>
    </section>
  );
}
