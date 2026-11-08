import type { ReactNode } from "react";
import { ImageFrame } from "@/components/atoms/ImageFrame";
import { Breadcrumbs, type Crumb } from "@/components/molecules/Breadcrumbs";
import { EditorialSection } from "@/components/organisms/EditorialSection";
import type { EditorialBlock, ProductImage } from "@/types";

export interface EditorialTemplateProps {
  eyebrow: string;
  title: string;
  intro?: string;
  heroImage: ProductImage;
  blocks: EditorialBlock[];
  breadcrumbs?: Crumb[];
  meta?: ReactNode;
  width?: "page" | "article";
  /** Content rendered after the story (e.g. related articles). */
  after?: ReactNode;
}

/** Cinematic editorial layout used for brand pages and journal stories. */
export function EditorialTemplate({ eyebrow, title, intro, heroImage, blocks, breadcrumbs, meta, width = "page", after }: EditorialTemplateProps) {
  return (
    <article>
      <header className="relative isolate flex min-h-[72svh] items-end overflow-hidden bg-noir text-pearl md:min-h-[78vh]">
        <div className="absolute inset-0 -z-10 animate-hero-zoom">
          <ImageFrame image={heroImage} ratio="fill" priority sizes="100vw" position="50% 35%" className="bg-noir" />
        </div>
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-t from-noir/85 via-noir/35 to-noir/10" />
        <div className="container-luxe pb-14 pt-40 md:pb-20 lg:pt-52">
          {breadcrumbs && (
            <Breadcrumbs items={breadcrumbs} className="mb-10 animate-fade-in [&_a]:text-pearl/70 [&_li]:text-pearl/60 [&_span[aria-current]]:text-pearl/90" />
          )}
          <div className="max-w-[860px]">
            <p className="eyebrow animate-fade-up text-gold [animation-delay:200ms]">{eyebrow}</p>
            <h1 className="mt-5 animate-fade-up font-serif text-display font-light [animation-delay:350ms]">{title}</h1>
            {intro && (
              <p className="mt-6 max-w-[600px] animate-fade-up text-[1rem] leading-[1.8] text-pearl/80 [animation-delay:550ms] md:text-[1.125rem]">
                {intro}
              </p>
            )}
            {meta && <div className="mt-8 animate-fade-in [animation-delay:700ms]">{meta}</div>}
          </div>
        </div>
      </header>
      <div className="pb-10">
        <EditorialSection blocks={blocks} width={width} />
      </div>
      {after}
    </article>
  );
}
