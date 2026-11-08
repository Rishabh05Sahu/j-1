import { Reveal } from "@/components/atoms/Reveal";
import { EditorialCard } from "@/components/molecules/EditorialCard";
import { SectionHeading } from "@/components/molecules/SectionHeading";
import type { JournalArticle, NavLink } from "@/types";

export function JournalSection({
  eyebrow,
  title,
  articles,
  cta,
}: {
  eyebrow?: string;
  title: string;
  articles: JournalArticle[];
  cta?: NavLink;
}) {
  return (
    <section aria-labelledby="journal-title" className="section-y bg-ivory">
      <div className="container-luxe">
        <Reveal>
          <SectionHeading id="journal-title" eyebrow={eyebrow} title={title} align="left" caps size="md" action={cta} />
        </Reveal>
        <ul className="mt-12 grid gap-14 md:mt-16 md:grid-cols-3 md:gap-8 lg:gap-12">
          {articles.map((article, i) => (
            <li key={article.slug}>
              <Reveal delay={i * 120}>
                <EditorialCard article={article} />
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
