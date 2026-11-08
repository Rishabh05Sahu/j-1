import type { Metadata } from "next";
import { Container } from "@/components/atoms/Container";
import { Reveal } from "@/components/atoms/Reveal";
import { EditorialCard } from "@/components/molecules/EditorialCard";
import { NewsletterSection } from "@/components/organisms/NewsletterSection";
import { PageHeader } from "@/components/organisms/PageHeader";
import { homeContent, journalArticles } from "@/data/editorial";

export const metadata: Metadata = {
  title: "The Journal",
  description: "Stories, expertise and inspiration from the AURELLE maison.",
};

export default function JournalPage() {
  return (
    <>
      <PageHeader
        eyebrow="Stories & Expertise"
        title="The AURELLE Journal"
        intro="Notes from our ateliers and gemologists — on diamonds, precious metals and the jewels that carry our stories."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Journal" }]}
      />
      <Container className="pb-24 md:pb-32">
        <ul className="grid gap-14 border-t border-line pt-12 md:grid-cols-3 md:gap-8 lg:gap-12">
          {journalArticles.map((article, i) => (
            <li key={article.slug}>
              <Reveal delay={i * 120}>
                <EditorialCard article={article} />
              </Reveal>
            </li>
          ))}
        </ul>
      </Container>
      <NewsletterSection {...homeContent.newsletter} />
    </>
  );
}
