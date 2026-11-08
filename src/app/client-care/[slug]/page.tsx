import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { PageSkeleton } from "@/components/organisms/PageSkeleton";
import { InformationTemplate } from "@/components/templates/InformationTemplate";
import { clientCarePages, getClientCarePage } from "@/data/editorial";

export function generateStaticParams() {
  return clientCarePages.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/client-care/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const page = getClientCarePage(slug);
  return page ? { title: page.title, description: page.intro } : {};
}

async function ClientCareContent({ params }: { params: PageProps<"/client-care/[slug]">["params"] }) {
  const { slug } = await params;
  const page = getClientCarePage(slug);
  if (!page) notFound();
  return <InformationTemplate page={page} />;
}

export default function ClientCarePage({ params }: PageProps<"/client-care/[slug]">) {
  return (
    <Suspense fallback={<PageSkeleton variant="information" />}>
      <ClientCareContent params={params} />
    </Suspense>
  );
}
