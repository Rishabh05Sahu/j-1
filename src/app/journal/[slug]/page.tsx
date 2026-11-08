import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { PageSkeleton } from "@/components/organisms/PageSkeleton";
import { JournalSection } from "@/components/organisms/JournalSection";
import { EditorialTemplate } from "@/components/templates/EditorialTemplate";
import { getArticleBySlug, journalArticles } from "@/data/editorial";
import { formatDate } from "@/lib/utils";

export function generateStaticParams() {
  return journalArticles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: PageProps<"/journal/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return {};
  return {
    title: article.title,
    description: article.excerpt,
    openGraph: { type: "article", title: article.title, description: article.excerpt, images: [article.image.src] },
  };
}

async function ArticleContent({ params }: { params: PageProps<"/journal/[slug]">["params"] }) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) notFound();
  const more = journalArticles.filter((a) => a.slug !== slug);

  return (
    <EditorialTemplate
      eyebrow={article.category}
      title={article.title}
      intro={article.excerpt}
      heroImage={article.image}
      blocks={article.body}
      width="article"
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Journal", href: "/journal" },
        { label: article.title },
      ]}
      meta={
        <p className="text-[0.75rem] uppercase tracking-[0.18em] text-pearl/70">
          <time dateTime={article.publishedAt}>{formatDate(article.publishedAt)}</time>
          <span className="mx-3">·</span>
          {article.readingTime}
        </p>
      }
      after={<div className="border-t border-line"><JournalSection eyebrow="Continue Reading" title="More from the Journal" articles={more} cta={{ label: "All Stories", href: "/journal" }} /></div>}
    />
  );
}

export default function JournalArticlePage({ params }: PageProps<"/journal/[slug]">) {
  return (
    <Suspense fallback={<PageSkeleton variant="editorial" />}>
      <ArticleContent params={params} />
    </Suspense>
  );
}
