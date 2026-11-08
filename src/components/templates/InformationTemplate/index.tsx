import type { ReactNode } from "react";
import { Button } from "@/components/atoms/Button";
import { Container } from "@/components/atoms/Container";
import { ImageFrame } from "@/components/atoms/ImageFrame";
import { PageHeader } from "@/components/organisms/PageHeader";
import type { InformationPage } from "@/types";

/** Long-form information page with an in-page section index. */
export function InformationTemplate({ page, breadcrumbLabel, aside }: { page: InformationPage; breadcrumbLabel?: string; aside?: ReactNode }) {
  return (
    <>
      <PageHeader
        eyebrow={page.eyebrow}
        title={page.title}
        intro={page.intro}
        breadcrumbs={[{ label: "Home", href: "/" }, { label: breadcrumbLabel ?? page.title }]}
      />
      {page.image && (
        <Container className="pb-16 md:pb-24">
          <ImageFrame image={page.image} ratio="21/9" priority sizes="100vw" className="max-md:aspect-[4/3]" />
        </Container>
      )}
      <Container className="pb-24 md:pb-32">
        <div className="grid gap-12 border-t border-line pt-12 lg:grid-cols-12 lg:gap-16 lg:pt-16">
          <nav aria-label="On this page" className="lg:col-span-3">
            <div className="lg:sticky lg:top-[140px]">
              <p className="eyebrow text-[0.625rem] text-gold-deep">On This Page</p>
              <ol className="mt-5 flex flex-wrap gap-x-6 gap-y-3 lg:flex-col">
                {page.sections.map((s) => (
                  <li key={s.id}>
                    <a href={`#${s.id}`} className="link-underline font-serif text-[1.125rem] text-espresso">
                      {s.title}
                    </a>
                  </li>
                ))}
              </ol>
              {aside && <div className="mt-10 hidden lg:block">{aside}</div>}
            </div>
          </nav>
          <div className="flex flex-col gap-16 lg:col-span-8 lg:col-start-5">
            {page.sections.map((s, i) => (
              <section key={s.id} id={s.id} aria-labelledby={`${s.id}-title`} className="scroll-mt-[150px]">
                <p className="font-serif text-[0.9375rem] italic text-gold-deep">{String(i + 1).padStart(2, "0")}</p>
                <h2 id={`${s.id}-title`} className="mt-2 font-serif text-[2rem] font-light leading-tight md:text-[2.375rem]">
                  {s.title}
                </h2>
                {s.intro && <p className="mt-5 text-[1rem] leading-[1.8] text-stone">{s.intro}</p>}
                {s.items && (
                  <dl className="mt-8 divide-y divide-line border-y border-line">
                    {s.items.map((item) => (
                      <div key={item.title} className="grid gap-2 py-6 sm:grid-cols-3 sm:gap-8">
                        <dt className="eyebrow text-[0.6875rem] text-espresso">{item.title}</dt>
                        <dd className="text-[0.9375rem] leading-[1.8] text-stone sm:col-span-2">{item.text}</dd>
                      </div>
                    ))}
                  </dl>
                )}
                {s.paragraphs?.map((p) => (
                  <p key={p.slice(0, 30)} className="mt-5 text-[0.9375rem] leading-[1.9] text-stone">
                    {p}
                  </p>
                ))}
              </section>
            ))}
            <div className="flex flex-col items-start gap-5 bg-champagne/70 p-8 md:flex-row md:items-center md:justify-between md:p-10">
              <div>
                <p className="font-serif text-[1.5rem] font-light">Need personal assistance?</p>
                <p className="mt-1 text-[0.875rem] text-stone">Our client advisors are here to help, in boutique or online.</p>
              </div>
              <Button href="/contact" variant="outline" className="shrink-0">
                Contact Client Care
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}
