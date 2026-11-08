import type { Metadata } from "next";
import { CollectionsOverviewTemplate } from "@/components/templates/CollectionsOverviewTemplate";
import { categoryCollections, curations, getCollectionBySlug, namedCollections } from "@/data/collections";
import { getProductsForCollection } from "@/lib/product-utils";

export const metadata: Metadata = {
  title: "The Collections",
  description:
    "Explore AURELLE fine jewelry by category and collection — rings, necklaces, earrings, bracelets and bridal creations.",
};

export default function CollectionsPage() {
  const all = [...categoryCollections, ...namedCollections];
  const counts = Object.fromEntries(all.map((c) => [c.slug, getProductsForCollection(c.slug).length]));

  return (
    <CollectionsOverviewTemplate
      categories={categoryCollections}
      collections={namedCollections}
      curations={curations}
      featured={getCollectionBySlug("eternal")!}
      counts={counts}
    />
  );
}
