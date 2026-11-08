import { Divider } from "@/components/atoms/Divider";
import { Reveal } from "@/components/atoms/Reveal";
import { Eyebrow, Heading, Text } from "@/components/atoms/Typography";
import { NewsletterForm } from "@/components/molecules/NewsletterForm";

export function NewsletterSection({ eyebrow, title, text }: { eyebrow?: string; title: string; text: string }) {
  return (
    <section aria-labelledby="newsletter-title" className="section-y border-t border-line bg-ivory">
      <Reveal className="container-luxe flex max-w-[640px] flex-col items-center text-center">
        {eyebrow && <Eyebrow tone="gold">{eyebrow}</Eyebrow>}
        <Heading id="newsletter-title" size="md" caps className="mt-5 text-espresso">
          {title}
        </Heading>
        <Divider variant="ornament" className="my-7" />
        <Text>{text}</Text>
        <NewsletterForm className="mt-10" />
      </Reveal>
    </section>
  );
}
