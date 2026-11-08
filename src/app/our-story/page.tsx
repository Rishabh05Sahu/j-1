import type { Metadata } from "next";
import { EditorialTemplate } from "@/components/templates/EditorialTemplate";
import { ourStoryPage } from "@/data/editorial";

export const metadata: Metadata = {
  title: "Our Story",
  description: ourStoryPage.intro,
};

export default function OurStoryPage() {
  return (
    <EditorialTemplate
      {...ourStoryPage}
      breadcrumbs={[{ label: "Home", href: "/" }, { label: "Our Story" }]}
    />
  );
}
