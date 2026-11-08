import { Clock, Mail, MapPin, Phone } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/atoms/Button";
import { SocialIcon } from "@/components/atoms/SocialIcon";
import { ContactForm } from "@/components/organisms/ContactForm";
import { ServiceTemplate } from "@/components/templates/ServiceTemplate";
import { brand } from "@/config/brand";
import { contactContent } from "@/data/editorial";

export const metadata: Metadata = {
  title: "Contact Us",
  description: contactContent.intro,
};

export default function ContactPage() {
  const aside = (
    <>
      <div className="flex flex-col gap-4 text-[0.875rem]">
        <a href={brand.contact.phoneHref} className="flex items-center gap-4 text-espresso">
          <Phone aria-hidden="true" strokeWidth={1.1} className="size-[18px] text-gold-deep" />
          {brand.contact.phone}
        </a>
        <a href={`mailto:${brand.contact.email}`} className="flex items-center gap-4 text-espresso">
          <Mail aria-hidden="true" strokeWidth={1.1} className="size-[18px] text-gold-deep" />
          {brand.contact.email}
        </a>
      </div>
      <div>
        <h3 className="eyebrow flex items-center gap-3 text-espresso">
          <Clock aria-hidden="true" strokeWidth={1.1} className="size-4 text-gold-deep" /> Client Care Hours
        </h3>
        <dl className="mt-4 grid grid-cols-[auto_1fr] gap-x-6 gap-y-2 text-[0.8125rem]">
          {brand.contact.hours.map((h) => (
            <div key={h.days} className="contents">
              <dt className="text-stone">{h.days}</dt>
              <dd>{h.time}</dd>
            </div>
          ))}
        </dl>
      </div>
      <div>
        <h3 className="eyebrow flex items-center gap-3 text-espresso">
          <MapPin aria-hidden="true" strokeWidth={1.1} className="size-4 text-gold-deep" /> Boutiques
        </h3>
        <ul className="mt-4 flex flex-col gap-4">
          {brand.boutiques.map((b) => (
            <li key={b.name} className="text-[0.8125rem]">
              <p className="font-serif text-[1.125rem]">{b.name}</p>
              <p className="text-stone">{b.address}</p>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h3 className="eyebrow text-espresso">Follow the Maison</h3>
        <div className="mt-4 flex gap-3">
          <a href={brand.social.instagram} target="_blank" rel="noreferrer" aria-label="AURELLE on Instagram" className="flex size-10 items-center justify-center border border-line transition-colors hover:border-espresso">
            <SocialIcon name="instagram" />
          </a>
          <a href={brand.social.pinterest} target="_blank" rel="noreferrer" aria-label="AURELLE on Pinterest" className="flex size-10 items-center justify-center border border-line transition-colors hover:border-espresso">
            <SocialIcon name="pinterest" />
          </a>
        </div>
      </div>
      <div className="bg-champagne/70 p-6">
        <p className="font-serif text-[1.375rem] font-light leading-snug">Prefer to meet in person?</p>
        <p className="mt-2 text-[0.8125rem] text-stone">Book a private consultation with an AURELLE specialist.</p>
        <Button href="/book-appointment" variant="outline" size="sm" className="mt-5">
          Book an Appointment
        </Button>
      </div>
      <ul className="flex flex-col gap-2 text-[0.8125rem]">
        {contactContent.quickLinks.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className="link-underline-static text-stone">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );

  return (
    <ServiceTemplate
      eyebrow={contactContent.eyebrow}
      title={contactContent.title}
      intro={contactContent.intro}
      breadcrumbLabel="Contact"
      image={contactContent.image}
      aside={aside}
      formTitle="Send Us a Message"
      form={<ContactForm subjects={contactContent.subjects} />}
    />
  );
}
