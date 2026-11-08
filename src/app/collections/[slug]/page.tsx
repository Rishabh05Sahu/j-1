import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { PageSkeleton } from "@/components/organisms/PageSkeleton";
import { CollectionTemplate } from "@/components/templates/CollectionTemplate";
import { collections, getCollectionBySlug } from "@/data/collections";
import { getProductsForCollection } from "@/lib/product-utils";

export function generateStaticParams() {
  return collections.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: PageProps<"/collections/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const collection = getCollectionBySlug(slug);
  if (!collection) return {};
  return {
    title: collection.title,
    description: collection.description,
    openGraph: { title: `${collection.title} | AURELLE`, description: collection.description, images: [collection.image.src] },
  };
}

async function CollectionContent({ params }: { params: PageProps<"/collections/[slug]">["params"] }) {
  const { slug } = await params;
  const collection = getCollectionBySlug(slug);
  if (!collection) notFound();
  return <CollectionTemplate collection={collection} products={getProductsForCollection(slug)} />;
}

export default function CollectionPage({ params }: PageProps<"/collections/[slug]">) {
  return (
    <Suspense fallback={<PageSkeleton variant="listing" />}>
      <CollectionContent params={params} />
    </Suspense>
  );
}
