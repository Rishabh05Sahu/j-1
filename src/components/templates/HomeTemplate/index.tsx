import { AppointmentSection } from "@/components/organisms/AppointmentSection";
import { BrandStorySection } from "@/components/organisms/BrandStorySection";
import { CampaignSection } from "@/components/organisms/CampaignSection";
import { CategoryShowcase } from "@/components/organisms/CategoryShowcase";
import { CollectionShowcase } from "@/components/organisms/CollectionShowcase";
import { CraftsmanshipSection } from "@/components/organisms/CraftsmanshipSection";
import { HeroSection } from "@/components/organisms/HeroSection";
import { JournalSection } from "@/components/organisms/JournalSection";
import { NewsletterSection } from "@/components/organisms/NewsletterSection";
import { ProductShowcase } from "@/components/organisms/ProductShowcase";
import type { homeContent } from "@/data/editorial";
import type { JournalArticle, Product } from "@/types";

export interface HomeTemplateProps {
  content: typeof homeContent;
  bestsellers: Product[];
  articles: JournalArticle[];
}

/** Homepage composition — every section receives its content from the data layer. */
export function HomeTemplate({ content, bestsellers, articles }: HomeTemplateProps) {
  return (
    <>
      <HeroSection {...content.hero} imagePosition="50% 32%" />
      <CategoryShowcase {...content.categories} />
      <CollectionShowcase {...content.featuredCollection} />
      <ProductShowcase id="bestsellers" {...content.bestsellers} products={bestsellers} />
      <BrandStorySection {...content.brandStory} />
      <CraftsmanshipSection {...content.craftsmanship} />
      <CampaignSection id="bridal" {...content.bridal} imagePosition="50% 45%" />
      <JournalSection {...content.journal} articles={articles} />
      <AppointmentSection {...content.appointment} />
      <NewsletterSection {...content.newsletter} />
    </>
  );
}
