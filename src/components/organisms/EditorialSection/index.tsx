import { Button } from "@/components/atoms/Button";
import { Divider } from "@/components/atoms/Divider";
import { ImageFrame } from "@/components/atoms/ImageFrame";
import { Reveal } from "@/components/atoms/Reveal";
import { Eyebrow, Heading } from "@/components/atoms/Typography";
import { cn } from "@/lib/utils";
import type { EditorialBlock } from "@/types";

/**
 * Renders data-driven editorial blocks. `width="article"` narrows the
 * reading measure for journal stories; `page` gives brand pages room for
 * alternating image/text spreads.
 */
export function EditorialSection({ blocks, width = "page" }: { blocks: EditorialBlock[]; width?: "page" | "article" }) {
  const prose = width === "article" ? "max-w-[720px]" : "max-w-[820px]";

  return (
    <div className="flex flex-col">
      {blocks.map((block, i) => {
        const key = `${block.type}-${i}`;
        switch (block.type) {
          case "lede":
            return (
              <Reveal key={key} className={cn("container-luxe py-16 md:py-24", prose)}>
                <p className="text-center font-serif text-[1.5rem] font-light leading-[1.5] text-espresso md:text-[2rem]">{block.text}</p>
              </Reveal>
            );
          case "heading":
            return (
              <div key={key} className={cn("container-luxe pt-10", prose)}>
                <Heading as="h2" size="md">
                  {block.text}
                </Heading>
              </div>
            );
          case "paragraph":
            return (
              <div key={key} className={cn("container-luxe pt-6", prose)}>
                <p className="text-[1rem] leading-[1.9] text-stone md:text-[1.0625rem]">{block.text}</p>
              </div>
            );
          case "quote":
            return (
              <Reveal key={key} className={cn("container-luxe py-16 md:py-20", prose)}>
                <figure className="text-center">
                  <Divider variant="ornament" className="mb-8" />
                  <blockquote className="font-serif text-[1.75rem] font-light italic leading-[1.35] text-espresso md:text-[2.375rem]">
                    “{block.text}”
                  </blockquote>
                  {block.cite && <figcaption className="eyebrow mt-6 text-mute">{block.cite}</figcaption>}
                </figure>
              </Reveal>
            );
          case "image":
            return (
              <Reveal key={key} as="figure" className="container-luxe max-w-[1100px] py-10 md:py-14">
                <ImageFrame image={block.image} ratio="3/2" sizes="(min-width: 1100px) 1100px, 100vw" />
                {block.caption && <figcaption className="mt-4 text-center text-[0.8125rem] italic text-mute">{block.caption}</figcaption>}
              </Reveal>
            );
          case "split":
            return (
              <section key={key} className="container-luxe py-12 md:py-20">
                <div className="grid items-center gap-10 md:grid-cols-12 md:gap-8">
                  <Reveal className={cn("md:col-span-6 lg:col-span-6", block.reverse && "md:order-2 md:col-start-7")}>
                    <ImageFrame image={block.image} ratio="4/5" sizes="(min-width: 768px) 48vw, 100vw" />
                  </Reveal>
                  <Reveal
                    delay={120}
                    className={cn("md:col-span-5 lg:col-span-4", block.reverse ? "md:order-1 md:col-start-1 lg:col-start-2" : "md:col-start-8 lg:col-start-8")}
                  >
                    {block.eyebrow && <Eyebrow tone="gold">{block.eyebrow}</Eyebrow>}
                    <Heading size="lg" className="mt-5">
                      {block.title}
                    </Heading>
                    {block.text.map((t) => (
                      <p key={t.slice(0, 24)} className="mt-6 text-[0.9375rem] leading-[1.9] text-stone">
                        {t}
                      </p>
                    ))}
                  </Reveal>
                </div>
              </section>
            );
          case "columns":
            return (
              <section key={key} className="mt-10 bg-champagne/60 py-20 md:py-28">
                <div className="container-luxe">
                  {(block.eyebrow || block.title) && (
                    <Reveal className="text-center">
                      {block.eyebrow && <Eyebrow tone="gold">{block.eyebrow}</Eyebrow>}
                      {block.title && (
                        <Heading size="lg" className="mt-4">
                          {block.title}
                        </Heading>
                      )}
                    </Reveal>
                  )}
                  <ul className="mt-14 grid gap-12 md:grid-cols-3 md:gap-10">
                    {block.items.map((item, j) => (
                      <li key={item.title}>
                        <Reveal delay={j * 120} className="text-center">
                          <span className="font-serif text-[0.9375rem] italic text-gold-deep">{String(j + 1).padStart(2, "0")}</span>
                          <h3 className="mt-3 font-serif text-[1.5rem] font-light">{item.title}</h3>
                          <p className="mx-auto mt-4 max-w-[320px] text-[0.9375rem] leading-[1.8] text-stone">{item.text}</p>
                        </Reveal>
                      </li>
                    ))}
                  </ul>
                </div>
              </section>
            );
          case "statement":
            return (
              <Reveal key={key} className={cn("container-luxe flex flex-col items-center py-20 text-center md:py-28", prose)}>
                {block.eyebrow && <Eyebrow tone="gold">{block.eyebrow}</Eyebrow>}
                <p className="mt-5 font-serif text-[1.75rem] font-light leading-[1.35] md:text-[2.5rem]">{block.text}</p>
                {block.cta && (
                  <Button href={block.cta.href} variant="outline" className="mt-10">
                    {block.cta.label}
                  </Button>
                )}
              </Reveal>
            );
          default:
            return null;
        }
      })}
    </div>
  );
}
