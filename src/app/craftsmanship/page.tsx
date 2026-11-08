import type { Metadata } from "next";
import { EditorialTemplate } from "@/components/templates/EditorialTemplate";
import { craftsmanshipPage } from "@/data/editorial";

export const metadata: Metadata = {
  title: "Craftsmanship",
  description: craftsmanshipPage.intro,
};

export default function CraftsmanshipPage() {
  return (
    <EditorialTemplate
      {...craftsmanshipPage}
      breadcrumbs={[{ label: "Home", href: "/" }, { label: "Craftsmanship" }]}
    />
  );
}
