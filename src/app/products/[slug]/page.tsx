import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { PageSkeleton } from "@/components/organisms/PageSkeleton";
import { ProductTemplate } from "@/components/templates/ProductTemplate";
import { products } from "@/data/products";
import { getProductBySlug, getRelatedProducts } from "@/lib/product-utils";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/products/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return {};
  return {
    title: product.name,
    description: `${product.subtitle}. ${product.description}`,
    openGraph: {
      title: `${product.name} | AURELLE`,
      description: product.description,
      images: [{ url: product.images[0].src, alt: product.images[0].alt }],
    },
  };
}

/** URL-specific content resolves inside Suspense so navigation stays instant. */
async function ProductContent({ params }: { params: PageProps<"/products/[slug]">["params"] }) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: product.images.map((i) => i.src),
    brand: { "@type": "Brand", name: "AURELLE" },
    material: product.metal,
    offers: {
      "@type": "Offer",
      priceCurrency: "INR",
      price: product.price,
      availability:
        product.availability === "sold-out" ? "https://schema.org/OutOfStock" : "https://schema.org/InStock",
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <ProductTemplate product={product} related={getRelatedProducts(product, 4)} />
    </>
  );
}

export default function ProductPage({ params }: PageProps<"/products/[slug]">) {
  return (
    <Suspense fallback={<PageSkeleton variant="product" />}>
      <ProductContent params={params} />
    </Suspense>
  );
}
