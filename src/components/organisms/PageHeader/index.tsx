import type { ReactNode } from "react";
import { Divider } from "@/components/atoms/Divider";
import { ImageFrame } from "@/components/atoms/ImageFrame";
import { Eyebrow, Heading, Text } from "@/components/atoms/Typography";
import { Breadcrumbs, type Crumb } from "@/components/molecules/Breadcrumbs";
import { cn } from "@/lib/utils";
import type { ProductImage } from "@/types";

export interface PageHeaderProps {
  eyebrow?: string;
  title: string;
  intro?: ReactNode;
  breadcrumbs?: Crumb[];
  image?: ProductImage;
  meta?: ReactNode;
  className?: string;
}

/**
 * Page introduction. With an image it becomes a refined split banner
 * (used for collection pages); without, a centred editorial title.
 */
export function PageHeader({ eyebrow, title, intro, breadcrumbs, image, meta, className }: PageHeaderProps) {
  if (image) {
    return (
      <header className={cn("bg-champagne/60", className)}>
        <div className="container-luxe grid items-stretch gap-10 py-10 md:grid-cols-12 md:gap-8 md:py-0">
          <div className="flex flex-col justify-between md:col-span-6 md:py-14 lg:col-span-5 lg:py-16">
            {breadcrumbs && <Breadcrumbs items={breadcrumbs} />}
            <div className="mt-10 animate-fade-up md:mt-16">
              {eyebrow && <Eyebrow tone="gold">{eyebrow}</Eyebrow>}
              <Heading as="h1" size="xl" className="mt-4 text-espresso">
                {title}
              </Heading>
              {intro && (
                <Text size="lg" className="mt-6 max-w-[460px]">
                  {intro}
                </Text>
              )}
              {meta && <div className="mt-8">{meta}</div>}
            </div>
          </div>
          <div className="relative md:col-span-6 md:col-start-7 lg:col-span-7 lg:col-start-6">
            <ImageFrame
              image={image}
              ratio="4/3"
              priority
              sizes="(min-width: 768px) 55vw, 100vw"
              className="animate-fade-in md:absolute md:inset-0 md:aspect-auto md:h-full"
            />
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className={cn("container-luxe pb-12 pt-10 md:pb-16 md:pt-14", className)}>
      {breadcrumbs && <Breadcrumbs items={breadcrumbs} className="mb-10 md:mb-14" />}
      <div className="mx-auto flex max-w-[760px] animate-fade-up flex-col items-center text-center">
        {eyebrow && <Eyebrow tone="gold">{eyebrow}</Eyebrow>}
        <Heading as="h1" size="xl" className="mt-4 text-espresso">
          {title}
        </Heading>
        <Divider variant="ornament" className="my-7" />
        {intro && <Text size="lg">{intro}</Text>}
        {meta && <div className="mt-6">{meta}</div>}
      </div>
    </header>
  );
}
