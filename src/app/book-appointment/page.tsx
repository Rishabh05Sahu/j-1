import { Check } from "lucide-react";
import type { Metadata } from "next";
import { AppointmentForm } from "@/components/organisms/AppointmentForm";
import { ServiceTemplate } from "@/components/templates/ServiceTemplate";
import { brand } from "@/config/brand";
import { appointmentContent } from "@/data/editorial";
import { testimonials } from "@/data/testimonials";

export const metadata: Metadata = {
  title: "Book an Appointment",
  description: appointmentContent.intro,
};

export default function BookAppointmentPage() {
  const testimonial = testimonials[0];
  const aside = (
    <>
      <div>
        <h3 className="eyebrow text-espresso">Your Consultation</h3>
        <ul className="mt-5 flex flex-col gap-3">
          {appointmentContent.benefits.map((b) => (
            <li key={b} className="flex items-start gap-3 text-[0.875rem] text-stone">
              <Check aria-hidden="true" strokeWidth={1.25} className="mt-1 size-4 shrink-0 text-gold-deep" />
              {b}
            </li>
          ))}
        </ul>
      </div>
      <figure className="border-l border-gold pl-6">
        <blockquote className="font-serif text-[1.25rem] font-light italic leading-snug">“{testimonial.quote}”</blockquote>
        <figcaption className="eyebrow mt-4 text-[0.625rem] text-mute">
          {testimonial.author}, {testimonial.location}
        </figcaption>
      </figure>
      <div className="text-[0.8125rem] text-stone">
        <p>Prefer to speak to someone now?</p>
        <a href={brand.contact.phoneHref} className="link-underline-static mt-1 inline-block text-espresso">
          {brand.contact.phone}
        </a>
      </div>
    </>
  );

  return (
    <ServiceTemplate
      eyebrow={appointmentContent.eyebrow}
      title={appointmentContent.title}
      intro={appointmentContent.intro}
      breadcrumbLabel="Book an Appointment"
      image={appointmentContent.image}
      aside={aside}
      formTitle="Request Your Appointment"
      form={
        <AppointmentForm
          interests={appointmentContent.interests}
          timeSlots={appointmentContent.timeSlots}
          locations={appointmentContent.locations}
        />
      }
    />
  );
}
