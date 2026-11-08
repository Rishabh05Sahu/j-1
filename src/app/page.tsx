import type { Metadata } from "next";
import { HomeTemplate } from "@/components/templates/HomeTemplate";
import { homeContent, journalArticles } from "@/data/editorial";
import { getBestSellers } from "@/lib/product-utils";

export const metadata: Metadata = {
  title: { absolute: "AURELLE — Fine Jewelry Maison" },
  description:
    "Discover AURELLE: exceptional fine jewelry, natural diamonds, precious gemstones and bridal creations, handcrafted in our Mumbai atelier.",
};

export default function HomePage() {
  return <HomeTemplate content={homeContent} bestsellers={getBestSellers(4)} articles={journalArticles} />;
}
