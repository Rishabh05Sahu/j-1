import { Container } from "@/components/atoms/Container";
import { Accordion } from "@/components/molecules/Accordion";
import { Breadcrumbs } from "@/components/molecules/Breadcrumbs";
import { ProductGallery } from "@/components/organisms/ProductGallery";
import { ProductInformation } from "@/components/organisms/ProductInformation";
import { ProductShowcase } from "@/components/organisms/ProductShowcase";
import { RecentlyViewed } from "@/components/organisms/RecentlyViewed";
import { TrustSection } from "@/components/organisms/TrustSection";
import { productServiceCopy } from "@/data/editorial";
import { categoryLabel } from "@/lib/product-utils";
import type { Product } from "@/types";

export interface ProductTemplateProps {
  product: Product;
  related: Product[];
}

export function ProductTemplate({ product, related }: ProductTemplateProps) {
  const accordion = [
    {
      id: "details",
      title: "Product Details",
      content: (
        <>
          <p>{product.description}</p>
          <ul className="mt-4 list-inside list-disc marker:text-gold">
            {product.details.slice(0, 5).map((d) => (
              <li key={d.label}>
                {d.label}: {d.value}
              </li>
            ))}
          </ul>
        </>
      ),
    },
    { id: "materials", title: "Materials & Craftsmanship", content: <p>{productServiceCopy.materials}</p> },
    { id: "shipping", title: "Shipping & Delivery", content: <p>{productServiceCopy.shipping}</p> },
    { id: "returns", title: "Returns & Exchanges", content: <p>{productServiceCopy.returns}</p> },
    { id: "care", title: "Jewelry Care", content: <p>{productServiceCopy.care}</p> },
  ];

  return (
    <>
      <Container className="pb-20 pt-6 md:pb-28 md:pt-10">
        <Breadcrumbs
          className="mb-6 md:mb-10"
          items={[
            { label: "Home", href: "/" },
            { label: categoryLabel(product.category), href: `/collections/${product.category}` },
            { label: product.name },
          ]}
        />
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12 xl:gap-16">
          <div className="-mx-5 sm:mx-0 lg:col-span-7">
            <div className="lg:sticky lg:top-[140px]">
              <ProductGallery images={product.images} productName={product.name} />
            </div>
          </div>
          <div className="lg:col-span-5 lg:pt-4">
            <ProductInformation product={product} />
            <Accordion items={accordion} className="mt-10" />
          </div>
        </div>
      </Container>

      <TrustSection />
      <ProductShowcase id="related" eyebrow="Curated for You" title="You May Also Love" products={related} />
      <RecentlyViewed currentId={product.id} />
    </>
  );
}
