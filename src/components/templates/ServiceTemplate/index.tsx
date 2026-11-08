import type { ReactNode } from "react";
import { Container } from "@/components/atoms/Container";
import { ImageFrame } from "@/components/atoms/ImageFrame";
import { PageHeader } from "@/components/organisms/PageHeader";
import type { ProductImage } from "@/types";

export interface ServiceTemplateProps {
  eyebrow: string;
  title: string;
  intro: string;
  breadcrumbLabel: string;
  image: ProductImage;
  /** Supporting information shown beside the form. */
  aside: ReactNode;
  /** The interactive form organism. */
  form: ReactNode;
  formTitle: string;
}

/** Layout for client-service pages (contact, book an appointment). */
export function ServiceTemplate({ eyebrow, title, intro, breadcrumbLabel, image, aside, form, formTitle }: ServiceTemplateProps) {
  return (
    <>
      <PageHeader
        eyebrow={eyebrow}
        title={title}
        intro={intro}
        breadcrumbs={[{ label: "Home", href: "/" }, { label: breadcrumbLabel }]}
      />
      <Container className="pb-24 md:pb-32">
        <div className="grid gap-14 border-t border-line pt-12 lg:grid-cols-12 lg:gap-16 lg:pt-16">
          <aside className="flex flex-col gap-10 lg:col-span-4">
            <ImageFrame image={image} ratio="4/5" sizes="(min-width: 1024px) 30vw, 100vw" className="hidden lg:block" />
            {aside}
          </aside>
          <section aria-labelledby="form-title" className="lg:col-span-7 lg:col-start-6">
            <h2 id="form-title" className="mb-10 font-serif text-[2rem] font-light leading-tight md:text-[2.5rem]">
              {formTitle}
            </h2>
            {form}
          </section>
        </div>
      </Container>
    </>
  );
}
