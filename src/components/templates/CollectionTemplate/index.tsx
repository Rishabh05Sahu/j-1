import { Container } from "@/components/atoms/Container";
import { AppointmentSection } from "@/components/organisms/AppointmentSection";
import { PageHeader } from "@/components/organisms/PageHeader";
import { ProductListing } from "@/components/organisms/ProductListing";
import { TrustSection } from "@/components/organisms/TrustSection";
import { homeContent } from "@/data/editorial";
import { pluralize } from "@/lib/utils";
import type { Collection, Product } from "@/types";

export interface CollectionTemplateProps {
  collection: Collection;
  products: Product[];
}

export function CollectionTemplate({ collection, products }: CollectionTemplateProps) {
  return (
    <>
      <PageHeader
        eyebrow={collection.eyebrow}
        title={collection.title}
        intro={collection.story ?? collection.description}
        image={collection.image}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Collections", href: "/collections" },
          { label: collection.title },
        ]}
        meta={<p className="eyebrow text-[0.625rem] text-mute">{pluralize(products.length, "Creation")}</p>}
      />
      <Container as="section" aria-label={`${collection.title} products`} className="pb-24 pt-10 md:pb-32 md:pt-14">
        <ProductListing products={products} />
      </Container>
      <TrustSection />
      <AppointmentSection {...homeContent.appointment} />
    </>
  );
}
