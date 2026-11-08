import Link from "next/link";
import { ImageFrame } from "@/components/atoms/ImageFrame";
import { cn, formatDate } from "@/lib/utils";
import type { JournalArticle } from "@/types";

export function EditorialCard({ article, className }: { article: JournalArticle; className?: string }) {
  const href = `/journal/${article.slug}`;
  return (
    <article className={cn("group/editorial flex flex-col", className)}>
      <Link href={href} tabIndex={-1} aria-hidden="true" className="block">
        <ImageFrame
          image={article.image}
          ratio="4/5"
          sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 90vw"
          imgClassName="duration-[1600ms] group-hover/editorial:scale-[1.04]"
        />
      </Link>
      <div className="flex flex-1 flex-col pt-6">
        <p className="eyebrow text-[0.625rem] text-gold-deep">
          {article.category}
          <span className="mx-2 text-line">—</span>
          <span className="text-mute">{article.readingTime}</span>
        </p>
        <h3 className="mt-3 font-serif text-[1.5rem] leading-[1.2] md:text-[1.625rem]">
          <Link href={href} className="link-underline">
            {article.title}
          </Link>
        </h3>
        <p className="mt-3 text-[0.875rem] leading-relaxed text-stone">{article.excerpt}</p>
        <div className="mt-5 flex items-center justify-between">
          <Link href={href} className="link-underline-static eyebrow text-espresso">
            Read the Story<span className="sr-only">: {article.title}</span>
          </Link>
          <time dateTime={article.publishedAt} className="text-[0.75rem] text-mute">
            {formatDate(article.publishedAt, { month: "long", year: "numeric" })}
          </time>
        </div>
      </div>
    </article>
  );
}
