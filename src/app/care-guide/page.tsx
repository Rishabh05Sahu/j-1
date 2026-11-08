import type { Metadata } from "next";
import { InformationTemplate } from "@/components/templates/InformationTemplate";
import { careGuidePage } from "@/data/editorial";

export const metadata: Metadata = {
  title: "Jewelry Care Guide",
  description: careGuidePage.intro,
};

export default function CareGuidePage() {
  return <InformationTemplate page={careGuidePage} breadcrumbLabel="Care Guide" />;
}
